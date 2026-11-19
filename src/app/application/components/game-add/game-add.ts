import { Component, inject , OnInit, signal  } from '@angular/core';
import { Category } from '../../models/category';
import { Game } from '../../models/game';
import { form, FormField, FormRoot, } from '@angular/forms/signals';
import { JsonPipe } from '@angular/common';
import { GameService } from '../../services/game-service';
@Component({
  imports: [FormField,FormRoot, JsonPipe],
  selector: 'app-game-add',
  styleUrl: './game-add.css',
  templateUrl: './game-add.html',
})
export class GameAdd implements OnInit {
 private readonly gameService = inject(GameService);
  games = this.gameService.games;

  categories = Object.values(Category);

  readonly gameModel = signal<Game>({
    id: "",
    name: "",
    price: 0,
    madeIn: "Tunisie",
    category: Category.Puzzle,
    isNew: true,
    shops: []
  });

  readonly gameForm = form(this.gameModel);

  ngOnInit(): void {
    this.gameService.getGames().subscribe();
  }

  onSubmit() {
    console.log(this.gameModel());
    let { id, ...newGame } = this.gameModel();
    this.gameService.addGame(newGame).subscribe();
  }
}
