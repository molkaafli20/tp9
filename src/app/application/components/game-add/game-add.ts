import { Component, inject, OnInit, signal } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { form, FormField, FormRoot, min, pattern, required } from '@angular/forms/signals';
import { Category } from '../../models/category';
import { Game } from '../../models/game';
import { GameService } from '../../services/game-service';

@Component({
  imports: [FormField, FormRoot, JsonPipe],
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

  readonly gameForm = form(this.gameModel, path => {
    required(path.name, { message: "Nom obligatoire" }),
    pattern(path.name, /^[A-Z].+$/, { message: "Le nom doit commencer par une majuscule" }),
    required(path.price, { message: "Le prix est obligatoire" }),
    min(path.price, 0.1, { message: "Le prix doit être supérieur à 0.1 DT" })
  });

  ngOnInit(): void {
    this.gameService.getGames().subscribe();
  }

  onSubmit() {
    console.log(this.gameModel());
    let { id, ...newGame } = this.gameModel();
    this.gameService.addGame(newGame).subscribe(
      () => this.resetForm()
    );
  }

    resetForm() {
    this.gameModel.set({
      id: "",
      name: "",
      price: 0,
      madeIn: "Tunisie",
      category: Category.Puzzle,
      isNew: true,
      shops: []
    });
    this.gameForm().reset();
  }
}
