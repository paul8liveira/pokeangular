import { Component, OnInit } from '@angular/core';
import { ApiService, Pokemon } from 'src/app/services/api.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit {
  public pokemon$: Observable<Pokemon> = null;
  private pokemonId: number;
  
  constructor(private apiService: ApiService, private route: ActivatedRoute) { 
    this.route.params.subscribe(params => this.pokemonId = +params['id']);
  }

  ngOnInit() {
    this.pokemon$ = this.apiService.fetchPokemonById(this.pokemonId);
  }

}
