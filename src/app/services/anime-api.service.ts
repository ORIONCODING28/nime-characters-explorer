import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Character } from '../models/character.model';

@Injectable({
  providedIn: 'root'
})
export class AnimeApiService {
  private dragonBallUrl = 'https://dragonball-api.com/api';
  private jikanApiUrl = 'https://api.jikan.moe/v4';

  constructor(private http: HttpClient) { }

  getAllCharacters(): Observable<Character[]> {
    return forkJoin([
      this.getDragonBallCharacters(),
      this.getOnePieceCharacters(),
      this.getNarutoCharacters()
    ]).pipe(
      map(([dbChars, opChars, narutoChars]) => {
        return [...dbChars, ...opChars, ...narutoChars];
      }),
      catchError(error => {
        console.error('Error loading characters:', error);
        return of([]);
      })
    );
  }

  private getDragonBallCharacters(): Observable<Character[]> {
    return this.http.get<any>(`${this.dragonBallUrl}/characters?limit=100`).pipe(
      map(response => response.items.map((char: any) => ({
        id: `db-${char.id}`,
        name: char.name,
        series: 'Dragon Ball' as const,
        ki: char.ki,
        maxKi: char.maxKi,
        race: char.race,
        gender: char.gender,
        description: char.description || 'Personaggio di Dragon Ball',
        image: char.image,
        affiliation: char.affiliation
      }))),
      catchError(() => of([]))
    );
  }

  private getOnePieceCharacters(): Observable<Character[]> {
    // Jikan API - One Piece Characters (anime ID 21)
    const onePieceAnimeId = 21;
    const url = `https://api.jikan.moe/v4/anime/${onePieceAnimeId}/characters`;
    
    return this.http.get<any>(url).pipe(
      map(response => {
        // Prendiamo tutti i personaggi disponibili
        const characters = response.data;
        
        return characters.map((item: any) => ({
          id: `op-${item.character.mal_id}`,
          name: item.character.name,
          race: item.role || 'Pirata',
          gender: 'Unknown',
          description: `${item.character.name} è uno dei personaggi di One Piece. Ruolo nella serie: ${item.role}.`,
          image: item.character.images?.jpg?.image_url || item.character.images?.webp?.image_url || '',
          affiliation: item.role === 'Main' ? 'Pirati di Cappello di Paglia' : 'Vario',
          series: 'One Piece' as const,
          crew: item.role === 'Main' ? 'Pirati di Cappello di Paglia' : undefined,
          bounty: undefined
        }));
      }),
      catchError(error => {
        console.error('Error loading One Piece characters from Jikan API:', error);
        // Fallback a dati statici in caso di errore
        const onePieceData: Character[] = [
      {
        id: 'op-1', name: 'Monkey D. Luffy', series: 'One Piece',
        description: 'Capitano dei Pirati di Cappello di Paglia e protagonista della serie. Ha mangiato il frutto Gom Gom e aspira a diventare il Re dei Pirati.',
        image: 'https://cdn.myanimelist.net/images/characters/9/310307.jpg',
        crew: 'Pirati di Cappello di Paglia', bounty: '3.000.000.000', affiliation: 'Pirati di Cappello di Paglia'
      },
      {
        id: 'op-2', name: 'Roronoa Zoro', series: 'One Piece',
        description: 'Spadaccino della ciurma di Cappello di Paglia, usa lo stile a tre spade. Aspira a diventare il miglior spadaccino del mondo.',
        image: 'https://cdn.myanimelist.net/images/characters/3/100534.jpg',
        crew: 'Pirati di Cappello di Paglia', bounty: '1.111.000.000', affiliation: 'Pirati di Cappello di Paglia'
      },
      {
        id: 'op-3', name: 'Nami', series: 'One Piece',
        description: 'Navigatrice dei Pirati di Cappello di Paglia, esperta di meteorologia e cartografia. Sogna di disegnare la mappa del mondo.',
        image: 'https://cdn.myanimelist.net/images/characters/10/310285.jpg',
        crew: 'Pirati di Cappello di Paglia', bounty: '366.000.000', affiliation: 'Pirati di Cappello di Paglia'
      },
      {
        id: 'op-4', name: 'Usopp', series: 'One Piece',
        description: 'Cecchino della ciurma, famoso per le sue bugie e la sua abilità con la fionda. Sogna di diventare un coraggioso guerriero del mare.',
        image: 'https://cdn.myanimelist.net/images/characters/13/253245.jpg',
        crew: 'Pirati di Cappello di Paglia', bounty: '500.000.000', affiliation: 'Pirati di Cappello di Paglia'
      },
      {
        id: 'op-5', name: 'Sanji', series: 'One Piece',
        description: 'Cuoco della ciurma, maestro del Black Leg Style. Sogna di trovare il leggendario All Blue.',
        image: 'https://cdn.myanimelist.net/images/characters/8/371718.jpg',
        crew: 'Pirati di Cappello di Paglia', bounty: '1.032.000.000', affiliation: 'Pirati di Cappello di Paglia'
      },
      {
        id: 'op-6', name: 'Tony Tony Chopper', series: 'One Piece',
        description: 'Medico della ciurma, una renna che ha mangiato il frutto Hito Hito. Sogna di curare tutte le malattie.',
        image: 'https://cdn.myanimelist.net/images/characters/9/310297.jpg',
        crew: 'Pirati di Cappello di Paglia', bounty: '1.000', affiliation: 'Pirati di Cappello di Paglia'
      },
      {
        id: 'op-7', name: 'Nico Robin', series: 'One Piece',
        description: 'Archeologa della ciurma, ha mangiato il frutto Fior Fior. Sogna di scoprire il vero secolo perduto.',
        image: 'https://cdn.myanimelist.net/images/characters/10/310289.jpg',
        crew: 'Pirati di Cappello di Paglia', bounty: '930.000.000', affiliation: 'Pirati di Cappello di Paglia'
      },
      {
        id: 'op-8', name: 'Franky', series: 'One Piece',
        description: 'Carpentiere della ciurma, un cyborg costruttore di navi. Sogna di costruire una nave che circumnavighi il mondo.',
        image: 'https://cdn.myanimelist.net/images/characters/11/253251.jpg',
        crew: 'Pirati di Cappello di Paglia', bounty: '394.000.000', affiliation: 'Pirati di Cappello di Paglia'
      },
      {
        id: 'op-9', name: 'Brook', series: 'One Piece',
        description: 'Musicista della ciurma, uno scheletro vivente grazie al frutto Yomi Yomi. Sogna di rivedere Laboon.',
        image: 'https://cdn.myanimelist.net/images/characters/6/253249.jpg',
        crew: 'Pirati di Cappello di Paglia', bounty: '383.000.000', affiliation: 'Pirati di Cappello di Paglia'
      },
      {
        id: 'op-10', name: 'Jinbe', series: 'One Piece',
        description: 'Timoniere della ciurma, un uomo-pesce maestro del karate acquatico. Ex-membro dei Pirati del Sole.',
        image: 'https://cdn.myanimelist.net/images/characters/3/284119.jpg',
        crew: 'Pirati di Cappello di Paglia', bounty: '1.100.000.000', affiliation: 'Pirati di Cappello di Paglia'
      },
      {
        id: 'op-11', name: 'Shanks', series: 'One Piece',
        description: 'Uno dei Quattro Imperatori, capitano dei Pirati del Rosso. Mentore di Luffy.',
        image: 'https://cdn.myanimelist.net/images/characters/5/96448.jpg',
        crew: 'Pirati del Rosso', bounty: '4.048.900.000', affiliation: 'Pirati del Rosso'
      },
      {
        id: 'op-12', name: 'Portgas D. Ace', series: 'One Piece',
        description: 'Fratello di Luffy, ex-comandante della seconda divisione dei Pirati di Barbabianca. Possedeva il frutto Mera Mera.',
        image: 'https://cdn.myanimelist.net/images/characters/8/100532.jpg',
        crew: 'Pirati di Barbabianca', bounty: '550.000.000', affiliation: 'Pirati di Barbabianca'
      },
      {
        id: 'op-13', name: 'Trafalgar D. Water Law', series: 'One Piece',
        description: 'Capitano dei Pirati Heart, chirurgo della morte. Possessore del frutto Ope Ope.',
        image: 'https://cdn.myanimelist.net/images/characters/11/428092.jpg',
        crew: 'Pirati Heart', bounty: '3.000.000.000', affiliation: 'Pirati Heart'
      },
      {
        id: 'op-14', name: 'Boa Hancock', series: 'One Piece',
        description: 'Imperatrice pirata di Amazon Lily, una delle Shichibukai. Possessore del frutto Mero Mero.',
        image: 'https://cdn.myanimelist.net/images/characters/10/69667.jpg',
        crew: 'Pirati Kuja', bounty: '1.659.000.000', affiliation: 'Amazon Lily'
      },
      {
        id: 'op-15', name: 'Dracule Mihawk', series: 'One Piece',
        description: 'Il più grande spadaccino del mondo, uno degli ex-Shichibukai. Rivale di Zoro.',
        image: 'https://cdn.myanimelist.net/images/characters/8/96449.jpg',
        crew: 'Nessuna', bounty: '3.590.000.000', affiliation: 'Ex-Shichibukai'
      }
    ];
    
        return of(onePieceData);
      })
    );
  }

  private getNarutoCharacters(): Observable<Character[]> {
    // Jikan API - Naruto Characters (anime ID 20)
    const narutoAnimeId = 20;
    const url = `https://api.jikan.moe/v4/anime/${narutoAnimeId}/characters`;
    
    return this.http.get<any>(url).pipe(
      map(response => {
        // Prendiamo tutti i personaggi disponibili
        const characters = response.data;
        
        return characters.map((item: any) => ({
          id: `naruto-${item.character.mal_id}`,
          name: item.character.name,
          race: 'Ninja',
          gender: 'Unknown',
          description: `${item.character.name} è uno dei personaggi di Naruto. Ruolo nella serie: ${item.role}.`,
          image: item.character.images?.jpg?.image_url || item.character.images?.webp?.image_url || '',
          affiliation: item.role === 'Main' ? 'Konoha' : 'Vario',
          series: 'Naruto' as const,
          village: item.role === 'Main' ? 'Konoha' : undefined,
          clan: undefined,
          rank: undefined
        }));
      }),
      catchError(error => {
        console.error('Error loading Naruto characters from Jikan API:', error);
        // Fallback a dati statici in caso di errore
        const narutoData: Character[] = [
      {
        id: 'naruto-1', name: 'Naruto Uzumaki', series: 'Naruto',
        description: 'Protagonista della serie, Jinchūriki della Volpe a Nove Code. Diventa il Settimo Hokage di Konoha.',
        image: 'https://cdn.myanimelist.net/images/characters/9/131317.jpg',
        clan: 'Uzumaki', rank: 'Hokage', village: 'Konoha', affiliation: 'Konoha'
      },
      {
        id: 'naruto-2', name: 'Sasuke Uchiha', series: 'Naruto',
        description: 'Membro del Clan Uchiha, rivale e migliore amico di Naruto. Possiede lo Sharingan e il Rinnegan.',
        image: 'https://cdn.myanimelist.net/images/characters/9/131315.jpg',
        clan: 'Uchiha', rank: 'Ninja rinnegato', village: 'Konoha', affiliation: 'Konoha'
      },
      {
        id: 'naruto-3', name: 'Sakura Haruno', series: 'Naruto',
        description: 'Kunoichi medica del Team 7, allieva di Tsunade. Possiede una forza straordinaria e abilità mediche eccezionali.',
        image: 'https://cdn.myanimelist.net/images/characters/9/69275.jpg',
        rank: 'Jōnin', village: 'Konoha', affiliation: 'Konoha'
      },
      {
        id: 'naruto-4', name: 'Kakashi Hatake', series: 'Naruto',
        description: 'Il Ninja Copiatore, maestro del Team 7. Sesto Hokage di Konoha, possiede lo Sharingan.',
        image: 'https://cdn.myanimelist.net/images/characters/7/284129.jpg',
        clan: 'Hatake', rank: 'Hokage', village: 'Konoha', affiliation: 'Konoha'
      },
      {
        id: 'naruto-5', name: 'Itachi Uchiha', series: 'Naruto',
        description: 'Fratello maggiore di Sasuke, genio del Clan Uchiha. Membro dell\'Akatsuki, sacrificò tutto per proteggere Konoha.',
        image: 'https://cdn.myanimelist.net/images/characters/9/131326.jpg',
        clan: 'Uchiha', rank: 'Nukenin', village: 'Konoha', affiliation: 'Akatsuki'
      },
      {
        id: 'naruto-6', name: 'Minato Namikaze', series: 'Naruto',
        description: 'Il Lampo Giallo di Konoha, Quarto Hokage e padre di Naruto. Creatore del Rasengan.',
        image: 'https://cdn.myanimelist.net/images/characters/10/354967.jpg',
        clan: 'Namikaze', rank: 'Hokage', village: 'Konoha', affiliation: 'Konoha'
      },
      {
        id: 'naruto-7', name: 'Jiraiya', series: 'Naruto',
        description: 'Uno dei Tre Ninja Leggendari, maestro di Naruto. Eremita delle Rane e autore di romanzi.',
        image: 'https://cdn.myanimelist.net/images/characters/7/284137.jpg',
        rank: 'Sannin', village: 'Konoha', affiliation: 'Konoha'
      },
      {
        id: 'naruto-8', name: 'Gaara', series: 'Naruto',
        description: 'Jinchūriki di Shukaku, diventa Quinto Kazekage del Villaggio della Sabbia. Amico di Naruto.',
        image: 'https://cdn.myanimelist.net/images/characters/7/303098.jpg',
        rank: 'Kazekage', village: 'Suna', affiliation: 'Suna'
      },
      {
        id: 'naruto-9', name: 'Rock Lee', series: 'Naruto',
        description: 'Ninja specializzato nel taijutsu, non può usare ninjutsu o genjutsu. Allievo di Might Guy.',
        image: 'https://cdn.myanimelist.net/images/characters/11/69277.jpg',
        rank: 'Jōnin', village: 'Konoha', affiliation: 'Konoha'
      },
      {
        id: 'naruto-10', name: 'Neji Hyūga', series: 'Naruto',
        description: 'Prodigio del Clan Hyūga, maestro del Byakugan e dello stile Gentle Fist. Sacrifica la sua vita per Naruto.',
        image: 'https://cdn.myanimelist.net/images/characters/5/69276.jpg',
        clan: 'Hyūga', rank: 'Jōnin', village: 'Konoha', affiliation: 'Konoha'
      },
      {
        id: 'naruto-11', name: 'Hinata Hyūga', series: 'Naruto',
        description: 'Erede del Clan Hyūga, moglie di Naruto e madre di Boruto. Possiede il Byakugan.',
        image: 'https://cdn.myanimelist.net/images/characters/4/69274.jpg',
        clan: 'Hyūga', rank: 'Jōnin', village: 'Konoha', affiliation: 'Konoha'
      },
      {
        id: 'naruto-12', name: 'Shikamaru Nara', series: 'Naruto',
        description: 'Genio strategico del Clan Nara, consigliere del Settimo Hokage. Maestro delle ombre.',
        image: 'https://cdn.myanimelist.net/images/characters/2/69278.jpg',
        clan: 'Nara', rank: 'Jōnin', village: 'Konoha', affiliation: 'Konoha'
      },
      {
        id: 'naruto-13', name: 'Madara Uchiha', series: 'Naruto',
        description: 'Co-fondatore di Konoha con Hashirama, uno dei ninja più potenti della storia. Antagonista principale.',
        image: 'https://cdn.myanimelist.net/images/characters/10/337209.jpg',
        clan: 'Uchiha', rank: 'Leggenda', village: 'Konoha', affiliation: 'Akatsuki'
      },
      {
        id: 'naruto-14', name: 'Obito Uchiha', series: 'Naruto',
        description: 'Ex-compagno di Kakashi, diventa Tobi dell\'Akatsuki. Possiede lo Sharingan e il Rinnegan.',
        image: 'https://cdn.myanimelist.net/images/characters/9/261891.jpg',
        clan: 'Uchiha', rank: 'Nukenin', village: 'Konoha', affiliation: 'Akatsuki'
      },
      {
        id: 'naruto-15', name: 'Pain (Nagato)', series: 'Naruto',
        description: 'Leader dell\'Akatsuki, possiede il Rinnegan. Ex-allievo di Jiraiya che cerca la pace attraverso il dolore.',
        image: 'https://cdn.myanimelist.net/images/characters/9/284143.jpg',
        clan: 'Uzumaki', rank: 'Leader', village: 'Ame', affiliation: 'Akatsuki'
      }
    ];
    
        return of(narutoData);
      })
    );
  }

  getCharacterById(id: string): Observable<Character | null> {
    return this.getAllCharacters().pipe(
      map(chars => chars.find(c => c.id === id) || null)
    );
  }
}
