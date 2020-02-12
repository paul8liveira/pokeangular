import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Observable, of } from 'rxjs';
import { Pokemon } from '../../services/api.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  public pokemons$: Observable<Pokemon[]>;
  private pokemonsList: Pokemon[] = null;
  
  constructor(public apiService: ApiService) { }

  ngOnInit() {
    this.pokemons$ = this.apiService.fetchPokemons()
      .pipe(
        tap(t => this.pokemonsList = t)
      );
  }

  public onSearchChange(event) {
    const { value } = event.target;
    this.pokemons$ = of(this.pokemonsList.filter(f => f.name.includes(value)));
  }

}
