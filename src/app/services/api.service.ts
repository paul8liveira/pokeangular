import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

export interface Pokemon {
  name: string;
  url: string;
  number: number;
}
export interface PokeAPIResult {
  count: number;
  next: string;
  previous: string;
  results: Pokemon[];
};

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiURL = 'https://pokeapi.co/api/v2';
  private spriteUrl: string = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon';

  constructor(private http: HttpClient) { }

  public fetchPokemons(): Observable<Pokemon[]> {
    const params = new HttpParams()
      .set('limit', '151');
    
    return this.http.get<PokeAPIResult>(`${this.apiURL}/pokemon`, { params }).pipe(
      map(apiData => apiData.results
        .map((results, i) => {
          return <Pokemon>{
            name: results.name,
            url: results.url,
            number: i + 1,
          }
        })
      )
    );
  }

  public fetchPokemonById(id: number): Observable<any> {    
    return this.http.get<any>(`${this.apiURL}/pokemon/${id}`).pipe(
      switchMap(
        pokemon => this.fetchPokemonSpecies(pokemon.id).pipe(
          map(m => {
            return {...pokemon, flavorText: m }
          })
        )
      )
    );
  }  

  private fetchPokemonSpecies(id: number) {
    return this.http.get<any>(`${this.apiURL}/pokemon-species/${id}`).pipe(
      map(result => result.flavor_text_entries
        .find(f => f.language.name === 'en' && f.version.name === 'firered')),
      map(m => m.flavor_text)       
    );    
  }

  public pokemonImage(pokemonId: number) {
    return `${this.spriteUrl}/${pokemonId}.png`;
  }  
}
