import { GameConnectionService } from "../services/game-connection.service";

interface BoardElement {
  x: number;
  y: number;
}

interface Player {
  socketId: string;
  x: number;
  y: number;
  direction: string;
}

interface BoardData {
  size: number;
  elements: BoardElement[];
}

export class Ui {
  private size: number;
  private elements: BoardElement[];
  private players: Player[];
  private currentPlayer: string;
  private gameConn: GameConnectionService;

  constructor(boardData: BoardData, players: Player[], currentPlayer: string, gameConn: GameConnectionService) {
    this.size = boardData.size;
    this.elements = boardData.elements;
    this.players = players;
    this.currentPlayer = currentPlayer;
    this.gameConn = gameConn;
  }

  renderBoard(players: Player[], controlsEnabled: boolean = true): void {
    const boardContainer: HTMLElement | null = document.getElementById("board-container");
    if (!boardContainer) return;
    boardContainer.innerHTML = "";

    Array.from({ length: this.size }).forEach((_, i) => {
      const row = document.createElement("div");
      row.className = "board-row";
      Array.from({ length: this.size }).forEach((_, j) => {
        const cell = document.createElement("div");
        cell.className = "board-cell";
        const isBush = this.elements.some((bush) => bush.x === i && bush.y === j);

        const matchingPlayer = players.find((p) => p.x === i && p.y === j);
        if (isBush && matchingPlayer) {
          cell.classList.add("player-in-bush");
        } else if (isBush) {
          cell.classList.add("bush");
        } else if (matchingPlayer) {
          cell.classList.add("player", matchingPlayer.direction);
          console.log("Player", this.currentPlayer);
          console.log("Matching", matchingPlayer.socketId);
          if (matchingPlayer.socketId === this.currentPlayer) {
            cell.classList.add("current-player");
          }
        }
        row.appendChild(cell);
      });
      boardContainer.appendChild(row);
    });

    this.renderControls(boardContainer, controlsEnabled);
  }

  private renderControls(container: HTMLElement, enabled: boolean = true): void {
    const controls = document.createElement("div");
    controls.className = "controls";
    controls.innerHTML = `
      <button id="advance" ${!enabled ? "disabled" : ""}>Avanzar</button>
      <button id="rotate" ${!enabled ? "disabled" : ""}>Rotar</button>
      <button id="shoot" ${!enabled ? "disabled" : ""}>Disparar</button>
    `;
    container.appendChild(controls);

    if (enabled) {
      document.getElementById("advance")?.addEventListener("click", () => {
        console.log("El jugador " + this.currentPlayer + " avanza");
        this.gameConn.emit("movePlayer", {
          direction: "advance",
          playerId: this.currentPlayer,
        });
      });
      document.getElementById("rotate")?.addEventListener("click", () => {
        console.log("El jugador " + this.currentPlayer + " rota (horario)");
        this.gameConn.emit("rotatePlayer", {
          direction: "right",
          playerId: this.currentPlayer,
        });
      });
      document.getElementById("shoot")?.addEventListener("click", () => {
        console.log("El jugador " + this.currentPlayer + " ha disparado");
        this.gameConn.emit("shoot", { playerId: this.currentPlayer });
      });
    }
  }

  showGameOver(): void {
    alert("Game Over");
  }

  showRestartButton(): void {
    const container = document.getElementById("game-container");
    if (!container || document.getElementById("restart-button")) return;

    const btn = document.createElement("button");
    btn.id = "restart-button";
    btn.innerText = "Reiniciar partida";
    btn.addEventListener("click", () => {
      this.gameConn.emit("restartGame", {
        playerId: this.gameConn.gameService.player,
      });
      container.innerHTML = "";
    });
    container.appendChild(btn);
  }
}
