// language: typescript
import { Ui } from "./Ui";
import { GameConnectionService } from "../services/game-connection.service";

interface Data {
  type: string;
  content: any;
}

export class GameService {
  private states = {
    WAITING: 0,
    PLAYING: 1,
    ENDED: 2
  };

  public player: any = null;
  private players: any[] = [];
  private state: number | null = null;
  private actionsList: Record<string, (content: any) => void> = {};
  private gameOverShown = false;
  private gameConn!: GameConnectionService; // nueva propiedad

  constructor() {
    this.state = this.states.WAITING;
    this.actionsList = {
      NEW_PLAYER: (content: any) => this.do_newPlayer(content),
      board: (content: any) => this.do_start(content),
      game: (content: any) => this.do_gameStart(content),
    };
  }

  // Método para asignar la conexión
  public setGameConnectionService(gameConn: GameConnectionService): void {
    this.gameConn = gameConn;
  }

  public setPlayer(player: any): void {
    this.player = player;
    this.players.push(player);
  }

  public do(data: Data): void {
    this.actionsList[data.type](data.content);
  }

  private do_newPlayer(content: any): void {
    console.log("ha llegado un jugador nuevo");
  }

  private do_start(content: any): void {
    console.log(content);
    console.log("ha llegado un start");
    console.log("soy el jugador desde el gameService " + this.player);
  }

  private do_gameStart(content: any): void {
    console.log("Iniciando juego con estado:", content);

    // Se pasa el gameConn correcto al crear la instancia de Ui
    const ui = new Ui(content.board, content.room.players, this.player, this.gameConn);

    const alivePlayers = content.room.players.filter((p: any) => p.state !== 4);
    this.players = alivePlayers;

    let controlsEnabled = true;
    const currentAlive = alivePlayers.find((p: any) => p.socketId === this.player);

    if (!currentAlive) {
      controlsEnabled = false;
      if (!this.gameOverShown) {
        ui.showGameOver(); // usa el método de instancia
        this.gameOverShown = true;
      }
    } else {
      this.gameOverShown = false;
    }

    if (content.state === this.states.ENDED) {
      this.state = this.states.ENDED;
      if (alivePlayers.length === 1 && alivePlayers[0].socketId === this.player) {
        ui.showRestartButton(); // usa el método de instancia
      }
    }

    ui.renderBoard(alivePlayers, controlsEnabled);
  }
}
