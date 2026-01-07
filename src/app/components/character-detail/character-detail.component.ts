import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimeApiService } from 'src/app/services/anime-api.service';
import { Character } from 'src/app/models/character.model';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.scss']
})
export class CharacterDetailComponent implements OnInit {
  character: Character | null = null;
  loading = true;
  backRoute = '/';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: AnimeApiService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    // Prendi il returnUrl dai query params, default alla home
    this.backRoute = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    
    if (id) {
      this.loadCharacter(id);
    }
  }

  loadCharacter(id: string): void {
    this.loading = true;
    this.apiService.getCharacterById(id).subscribe({
      next: (data) => {
        this.character = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading character:', error);
        this.loading = false;
      }
    });
  }
}
