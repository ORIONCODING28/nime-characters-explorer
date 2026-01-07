import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Router, ActivatedRoute } from '@angular/router';
import { AnimeApiService } from 'src/app/services/anime-api.service';
import { Character } from 'src/app/models/character.model';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss']
})
export class CharacterListComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['series', 'image', 'name', 'race', 'gender', 'affiliation'];
  dataSource: MatTableDataSource<Character>;
  loading = true;
  allCharacters: Character[] = [];
  currentFilters: any = {};
  selectedSeries: string | null = null;
  
  // Pagination properties
  pageSize = 10;
  pageIndex = 0;

  constructor(
    private apiService: AnimeApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.dataSource = new MatTableDataSource<Character>([]);
  }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.selectedSeries = data['series'] || null;
      this.loadAllCharacters();
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  loadAllCharacters(): void {
    this.loading = true;
    this.apiService.getAllCharacters().subscribe({
      next: (characters) => {
        // Se è specificata una serie, filtra subito
        if (this.selectedSeries) {
          this.allCharacters = characters.filter(c => c.series === this.selectedSeries);
        } else {
          // Home page: mixa tutti i personaggi a gruppi di 3 per serie
          const dbChars = characters.filter(c => c.series === 'Dragon Ball');
          const opChars = characters.filter(c => c.series === 'One Piece');
          const narutoChars = characters.filter(c => c.series === 'Naruto');
          
          const mixed: Character[] = [];
          const maxLength = Math.max(dbChars.length, opChars.length, narutoChars.length);
          
          for (let i = 0; i < maxLength; i += 3) {
            // Aggiungi 3 Dragon Ball
            mixed.push(...dbChars.slice(i, i + 3));
            // Aggiungi 3 One Piece
            mixed.push(...opChars.slice(i, i + 3));
            // Aggiungi 3 Naruto
            mixed.push(...narutoChars.slice(i, i + 3));
          }
          
          this.allCharacters = mixed.filter(c => c !== undefined);
        }
        this.applyFilters();
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading characters:', error);
        this.loading = false;
      }
    });
  }

  onFilterChange(filters: any): void {
    this.currentFilters = filters;
    this.applyFilters();
  }

  applyFilters(): void {
    let filtered = [...this.allCharacters];

    // Filtra per nome
    if (this.currentFilters.name && this.currentFilters.name.trim() !== '') {
      const searchTerm = this.currentFilters.name.toLowerCase();
      filtered = filtered.filter(char => 
        char.name.toLowerCase().includes(searchTerm)
      );
    }

    // Filtra per serie
    if (this.currentFilters.series && this.currentFilters.series !== '') {
      filtered = filtered.filter(char => char.series === this.currentFilters.series);
    }

    // Filtra per race (solo Dragon Ball)
    if (this.currentFilters.race && this.currentFilters.race !== '') {
      filtered = filtered.filter(char => char.race === this.currentFilters.race);
    }

    // Filtra per gender
    if (this.currentFilters.gender && this.currentFilters.gender !== '') {
      filtered = filtered.filter(char => char.gender === this.currentFilters.gender);
    }

    // Filtra per affiliation
    if (this.currentFilters.affiliation && this.currentFilters.affiliation !== '') {
      filtered = filtered.filter(char => 
        char.affiliation?.toLowerCase().includes(this.currentFilters.affiliation.toLowerCase())
      );
    }

    this.dataSource.data = filtered;
    
    // Re-imposta paginator e sort dopo il filtraggio
    if (this.paginator) {
      this.paginator.firstPage();
    }
    
    setTimeout(() => {
      if (this.sort) {
        this.dataSource.sort = this.sort;
      }
      if (this.paginator) {
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  onRowClick(character: Character): void {
    // Passa la route corrente come query param per sapere dove tornare
    const returnUrl = this.selectedSeries ? this.router.url : '/';
    this.router.navigate(['/characters', character.id], { 
      queryParams: { returnUrl: returnUrl } 
    });
  }
  
  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }
  
  getPagedCharacters(): Character[] {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.dataSource.filteredData.slice(startIndex, endIndex);
  }

  sortData(sort: Sort): void {
    const data = this.dataSource.data.slice();
    if (!sort.active || sort.direction === '') {
      this.dataSource.data = data;
      return;
    }

    this.dataSource.data = data.sort((a: any, b: any) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'id': return this.compare(a.id, b.id, isAsc);
        case 'name': return this.compare(a.name, b.name, isAsc);
        case 'race': return this.compare(a.race, b.race, isAsc);
        case 'gender': return this.compare(a.gender, b.gender, isAsc);
        case 'ki': return this.compare(this.parseKi(a.ki), this.parseKi(b.ki), isAsc);
        case 'maxKi': return this.compare(this.parseKi(a.maxKi), this.parseKi(b.maxKi), isAsc);
        case 'affiliation': return this.compare(a.affiliation, b.affiliation, isAsc);
        default: return 0;
      }
    });
  }

  private compare(a: number | string, b: number | string, isAsc: boolean): number {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  private parseKi(ki: string): number {
    // Converte stringhe come "60.000.000" o "90 Septillion" in numeri comparabili
    const cleaned = ki.replace(/\./g, '').replace(/,/g, '');
    const num = parseFloat(cleaned);
    return isNaN(num) ? 0 : num;
  }
}
