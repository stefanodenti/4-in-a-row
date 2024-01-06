import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FourInARowSettings, PlayerScore } from './models/four-in-a-row.model';
import { User } from '../../core/models/room.model';
import { ModalService } from '../../core/service/modal.service';
import { ModalComponent } from '../../core/components/modal/modal.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-four-in-a-row',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './four-in-a-row.component.html',
  styleUrl: './four-in-a-row.component.scss',
})
export class FourInARowComponent {
  @ViewChild('winnerModal') winnerModal: TemplateRef<HTMLElement> | undefined;
  @ViewChild('drawModal') drawModal: TemplateRef<HTMLElement> | undefined;
  @Input() settings: FourInARowSettings = {
    rows: 9,
    columns: 9,
    winCondition: 4,
  };
  winner: User | undefined;
  @Input() set players(user: User[]) {
    this.playerOneScore = { player: user[0], score: 0 };
    this.playerTwoScore = { player: user[1], score: 0 };
  }
  @Input() set changeState(event: 'start' | 'stop' | 'restart') {
    console.log(event);
    if (event === 'start') {
      this.isMatchOver = false;
      this.initializeBoard();
    }
    if (event === 'stop') {
      this.initializeBoard();
      this.gameReady = false;
      this.isMatchOver = true;
    }
    if (event === 'restart') {
      this.restartGame();
    }
  }
  @Output() endGame: EventEmitter<void> = new EventEmitter<void>();
  currentPlayer: number = 1;
  board: number[][] = [];
  playerOneScore: PlayerScore | undefined;
  playerTwoScore: PlayerScore | undefined;
  isMatchOver: boolean = true;
  isTokenFalling: boolean = false;
  gameReady: boolean = false;
  modal: ModalComponent | undefined;
  constructor(private modalService: ModalService) {}

  initializeBoard() {
    this.board = [];
    for (let i = 0; i < this.settings.rows; i++) {
      this.board[i] = [];
      for (let j = 0; j < this.settings.columns; j++) {
        this.board[i][j] = 0;
      }
    }
    this.gameReady = true;
  }

  trackByCell(row: number, col: number) {
    return `${row}-${col}`;
  }

  restartGame() {
    this.initializeBoard();
    this.currentPlayer = 1;
    this.isMatchOver = false;
    if (this.modal) this.modal.close();
  }

  updateScore() {
    if (this.playerOneScore === undefined || this.playerTwoScore === undefined)
      return;
    if (this.currentPlayer === 1) {
      this.playerOneScore.score++;
    } else {
      this.playerTwoScore.score++;
    }
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
    while (i < this.settings.columns && this.board[row][i] === player) {
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
      i < this.settings.rows &&
      j < this.settings.columns &&
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

    while (i >= 0 && j < this.settings.columns && this.board[i][j] === player) {
      count++;
      i--;
      j++;
    }

    i = row + 1;
    j = col - 1;
    while (i < this.settings.rows && j >= 0 && this.board[i][j] === player) {
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
    console.log(col, this.isMatchOver, this.isTokenFalling, this.settings.rows);
    if (this.isMatchOver || this.isTokenFalling) {
      return;
    }

    for (let i = 0; i <= this.settings.rows - 1; i++) {
      if (this.board[i][col] === 0) {
        const currentCellPlayer = this.currentPlayer;

        this.isTokenFalling = true;

        this.board[i][col] = currentCellPlayer; // Mostra il gettone dopo un breve ritardo per l'animazione di caduta
        setTimeout(() => {
          this.isTokenFalling = false; // Resetta il flag per permettere di effettuare una nuova mossa
        }, 500);

        if (
          this.checkForWin(i, col) ||
          this.checkVertical(i, col) ||
          this.checkDiagonal(i, col)
        ) {
          this.updateScore();
          setTimeout(() => {
            this.winner =
              currentCellPlayer === 1
                ? this.playerOneScore?.player
                : this.playerTwoScore?.player;

            this.winnerModal
              ? (this.modal = this.modalService.openModal(this.winnerModal))
              : alert(`Giocatore ${this.winner?.username} ha vinto!`); // Mostra il risultato con un ritardo per mostrare prima il gettone
          });
          this.isMatchOver = true;
          this.initializeBoard();
          this.endGame.emit();
        } else {
          let fullColumns = true;
          for (let j = 0; j < this.settings.columns; j++) {
            if (this.board[this.settings.columns - 1][j] === 0) {
              fullColumns = false;
              break;
            }
          }

          if (fullColumns) {
            this.drawModal
              ? this.modalService.openModal(this.drawModal)
              : alert('La griglia è piena, nessuno ha vinto.');
            this.isMatchOver = true;
            this.initializeBoard();
            this.endGame.emit();
          } else {
            this.currentPlayer = currentCellPlayer === 1 ? 2 : 1;
          }
        }

        return;
      }
    }
  }
}
