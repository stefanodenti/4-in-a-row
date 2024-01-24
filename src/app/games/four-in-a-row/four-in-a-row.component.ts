import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
  ViewChild,
  computed,
  effect,
  input,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FourInARowSettings, PlayerScore } from './models/four-in-a-row.model';
import { Room, User } from '../../core/models/room.model';
import { ModalService } from '../../core/service/modal.service';
import { ModalComponent } from '../../core/components/modal/modal.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FourInARowScoreComponent } from './components/four-in-a-row-score/four-in-a-row-score.component';

@Component({
  selector: 'app-four-in-a-row',
  standalone: true,
  templateUrl: './four-in-a-row.component.html',
  styleUrl: './four-in-a-row.component.scss',
  imports: [CommonModule, FontAwesomeModule, FourInARowScoreComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FourInARowComponent {
  @ViewChild('winnerModal') winnerModal: TemplateRef<HTMLElement> | undefined;
  @ViewChild('drawModal') drawModal: TemplateRef<HTMLElement> | undefined;

  room = input<Room>();

  @Input() set state(event: 'start' | 'stop' | 'restart') {
    console.log(event);
    if (event === 'stop') {
      this.initializeBoard();
      this.gameReady.set(false);
      this.isMatchOver = true;
    } else if (event === 'restart' || event === 'start') {
      this.restartGame();
    }
  }
  @Output() endGame: EventEmitter<void> = new EventEmitter<void>();
  currentPlayer = signal<User | undefined>(undefined);
  playerScore = signal<PlayerScore[]>([]);
  gameReady = signal<boolean>(false);

  board: number[][] = [];

  winner: User | undefined;
  isMatchOver: boolean = true;
  isTokenFalling: boolean = false;

  modal: ModalComponent | undefined;

  constructor(private modalService: ModalService) {
    effect(
      () => {
        console.log('EFFECT', this.room());
        if (
          this.board.length !== this.room()?.settings.rows ||
          this.board[0].length !== this.room()?.settings.columns
        ) {
          console.log('Board changed!');
          this.initializeBoard();
        }

        if (this.room()?.players && this.playerScore().length === 0) {
          this.playerScore.set([
            {
              player: this.room()?.players[0]!,
              score: 0,
            },
            {
              player: this.room()?.players[1]!,
              score: 0,
            },
          ]);
        }
      },
      {
        allowSignalWrites: true,
      }
    );
  }

  initializeBoard() {
    this.board = [];
    for (let i = 0; i < this.room()?.settings.rows; i++) {
      this.board[i] = [];
      for (let j = 0; j < this.room()?.settings.columns; j++) {
        this.board[i][j] = 0;
      }
    }
  }

  trackByCell(row: number, col: number) {
    return `${row}-${col}`;
  }

  restartGame() {
    this.initializeBoard();
    this.gameReady.set(true);
    this.currentPlayer.set(this.playerScore()[0].player);
    this.isMatchOver = false;
    if (this.modal) this.modal.close();
  }

  updateScore() {
    this.playerScore.update((playerScore) => {
      return playerScore.map((player) => {
        if (player.player.id === this.currentPlayer()?.id) {
          return { ...player, score: player.score + 1 };
        }
        return player;
      });
    });
  }

  checkHorizontal(row: number, col: number): boolean {
    const player = this.board[row][col];
    let count = 1;
    let i = col - 1;

    while (i >= 0 && this.board[row][i] === player) {
      count++;
      i--;
    }

    i = col + 1;
    while (i < this.room()?.settings.columns && this.board[row][i] === player) {
      count++;
      i++;
    }

    return count >= 4;
  }

  checkVertical(row: number, col: number): boolean {
    const player = this.board[row][col];
    let count = 1;
    let i = row - 1;

    while (i >= 0 && this.board[i][col] === player) {
      count++;
      i--;
    }

    return count >= 4;
  }

  checkDiagonal(row: number, col: number): boolean {
    const player = this.board[row][col];

    // Controllo diagonale da sinistra a destra (\)
    let count = 1;
    let i = row - 1;
    let j = col - 1;

    while (i >= 0 && j >= 0 && this.board[i][j] === player) {
      count++;
      i--;
      j--;
    }

    i = row + 1;
    j = col + 1;
    while (
      i < this.room()?.settings.rows &&
      j < this.room()?.settings.columns &&
      this.board[i][j] === player
    ) {
      count++;
      i++;
      j++;
    }

    if (count >= 4) {
      return true;
    }

    // Controllo diagonale da destra a sinistra (/)
    count = 1;
    i = row - 1;
    j = col + 1;

    while (
      i >= 0 &&
      j < this.room()?.settings.columns &&
      this.board[i][j] === player
    ) {
      count++;
      i--;
      j++;
    }

    i = row + 1;
    j = col - 1;
    while (
      i < this.room()?.settings.rows &&
      j >= 0 &&
      this.board[i][j] === player
    ) {
      count++;
      i++;
      j--;
    }

    return count >= 4;
  }

  checkForWin(row: number, col: number): boolean {
    return (
      this.checkHorizontal(row, col) ||
      this.checkVertical(row, col) ||
      this.checkDiagonal(row, col)
    );
  }

  makeMove(col: number) {
    console.log(
      col,
      this.isMatchOver,
      this.isTokenFalling,
      this.room()?.settings.rows
    );
    if (this.isMatchOver || this.isTokenFalling) {
      return;
    }

    for (let i = 0; i <= this.room()?.settings.rows - 1; i++) {
      if (this.board[i][col] === 0) {
        const currentCellPlayer = this.currentPlayer();
        if (!currentCellPlayer) return;

        this.isTokenFalling = true;

        this.board[i][col] =
          this.playerScore()[0].player.id === currentCellPlayer.id ? 1 : 2; //TODO Come possiamo fare meglio?
        // Mostra il gettone dopo un breve ritardo per l'animazione di caduta
        setTimeout(() => {
          this.isTokenFalling = false; // Resetta il flag per permettere di effettuare una nuova mossa
        }, 500);

        if (
          this.checkForWin(i, col) ||
          this.checkVertical(i, col) ||
          this.checkDiagonal(i, col)
        ) {
          this.updateScore();
          this.winner = currentCellPlayer;
          this.winnerModal
            ? (this.modal = this.modalService.openModal(this.winnerModal))
            : alert(`Giocatore ${this.winner?.username} ha vinto!`); // Mostra il risultato con un ritardo per mostrare prima il gettone
          this.isMatchOver = true;
          this.gameReady.set(false);
          this.initializeBoard();
          this.endGame.emit();
        } else {
          let fullColumns = true;
          for (let j = 0; j < this.room()?.settings.columns; j++) {
            if (this.board[this.room()?.settings.columns - 1][j] === 0) {
              fullColumns = false;
              break;
            }
          }

          if (fullColumns) {
            this.drawModal
              ? this.modalService.openModal(this.drawModal)
              : alert('La griglia è piena, nessuno ha vinto.');
            this.isMatchOver = true;
            this.gameReady.set(false);
            this.initializeBoard();
            this.endGame.emit();
          } else {
            // Cambia il giocatore corrente
            const currentPlayerIndex = this.playerScore().findIndex(
              (player) => player.player.id === currentCellPlayer.id
            );
            const nextPlayerIndex =
              (currentPlayerIndex + 1) % this.playerScore().length;
            this.currentPlayer.set(this.playerScore()[nextPlayerIndex].player);
          }
        }

        return;
      }
    }
  }
}
