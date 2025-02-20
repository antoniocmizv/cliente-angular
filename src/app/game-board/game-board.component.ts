// filepath: /c:/.../src/app/game-board/game-board.component.ts
import { Component, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { GameConnectionService } from '../services/game-connection.service';
import { Ui } from '../helpers/Ui';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class GameBoardComponent implements AfterViewInit {
  private ui!: Ui;

  constructor(private gameConn: GameConnectionService) {}

  ngAfterViewInit(): void {
    const boardData = {
      size: 10,
      elements: [] // datos reales del tablero
    };
    const players : any  = [] ; // datos reales de jugadores
    const currentPlayer = this.gameConn.gameService.player || "defaultPlayerId";

    // Crea la instancia pasando el servicio inyectado
    this.ui = new Ui(boardData, players, currentPlayer, this.gameConn);
    this.ui.renderBoard(players);
  }
}
