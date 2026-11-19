import { HttpClient } from '@angular/common/http';
import { inject, Service, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Game } from '../models/game';
const URL = 'http://localhost:3000/games';
@Service()
export class GameService {
    
  private readonly _http = inject(HttpClient);
  private readonly _games = signal<Game[]>([]);
  games = this._games.asReadonly();

  getGames(): Observable<Game[]> {
    return this._http.get<Game[]>(URL)
      .pipe(
        tap(allGames => this._games.set(allGames))
      );
  }

  addGame(g: Omit<Game, 'id'>): Observable<Game> {
    return this._http.post<Game>(URL, g)
      .pipe(
        tap((gameAdded: Game) => this._games.update(jeux => [...jeux, gameAdded]))
      );
  }
}

