import { Component } from '@angular/core';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-controls',
  template: `
    <button (click)="gameService.movePlayer('advance')">Avanzar</button>
    <button (click)="gameService.movePlayer('rotate')">Rotar</button>
    <button (click)="gameService.movePlayer('shoot')">Disparar</button>
  `
})
export class ControlsComponent {
  constructor(public gameService: GameService) {}
}
