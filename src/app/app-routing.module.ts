import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharacterListComponent } from './components/character-list/character-list.component';
import { CharacterDetailComponent } from './components/character-detail/character-detail.component';

const routes: Routes = [
  { path: '', component: CharacterListComponent },
  { path: 'dragon-ball', component: CharacterListComponent, data: { series: 'Dragon Ball' } },
  { path: 'one-piece', component: CharacterListComponent, data: { series: 'One Piece' } },
  { path: 'naruto', component: CharacterListComponent, data: { series: 'Naruto' } },
  { path: 'characters/:id', component: CharacterDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
