import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Character } from 'src/app/models/character.model';

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.scss']
})
export class SearchFilterComponent implements OnInit, OnChanges {
  @Output() filterChange = new EventEmitter<any>();
  @Input() selectedSeries: string | null = null;
  @Input() characters: Character[] = [];
  
  filterForm: FormGroup;
  
  seriesList = ['Dragon Ball', 'One Piece', 'Naruto'];
  affiliations: string[] = [];

  constructor(private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      name: [''],
      series: [''],
      affiliation: ['']
    });
  }

  ngOnInit(): void {
    this.filterForm.valueChanges.subscribe(values => {
      this.filterChange.emit(values);
    });
    this.updateAffiliations();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['characters'] || changes['selectedSeries']) {
      this.updateAffiliations();
    }
  }

  private updateAffiliations(): void {
    if (!this.characters || this.characters.length === 0) {
      this.affiliations = [];
      return;
    }

    // Filtra i personaggi in base alla serie selezionata
    let filteredCharacters = this.characters;
    if (this.selectedSeries) {
      filteredCharacters = this.characters.filter(c => c.series === this.selectedSeries);
    }

    // Estrai tutte le affiliazioni uniche
    const affiliationSet = new Set<string>();
    filteredCharacters.forEach(char => {
      if (char.affiliation && char.affiliation.trim() !== '') {
        affiliationSet.add(char.affiliation);
      }
    });

    // Converti in array e ordina
    this.affiliations = Array.from(affiliationSet).sort();
  }

  resetFilters(): void {
    this.filterForm.reset();
  }
}
