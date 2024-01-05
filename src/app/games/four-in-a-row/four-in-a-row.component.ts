import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-four-in-a-row',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './four-in-a-row.component.html',
  styleUrl: './four-in-a-row.component.scss',
})
export class FourInARowComponent {
  rows: number = 6;
  cols: number = 13;
  currentPlayer: number = 1;
  board: number[][] = [];
  playerOneScore: number = 0;
  playerTwoScore: number = 0;
  isMatchOver: boolean = true;
  isTokenFalling: boolean = false;
  gameReady: boolean = false;

  ngOnInit() {
    this.initializeBoard();
  }

  initializeBoard() {
    this.board = [];
    for (let i = 0; i < this.rows; i++) {
      this.board[i] = [];
      for (let j = 0; j < this.cols; j++) {
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
  }

  updateScore() {
    if (this.currentPlayer === 1) {
      this.playerOneScore++;
    } else {
      this.playerTwoScore++;
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
    while (i < this.cols && this.board[row][i] === player) {
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
    while (i < this.rows && j < this.cols && this.board[i][j] === player) {
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

    while (i >= 0 && j < this.cols && this.board[i][j] === player) {
      count++;
      i--;
      j++;
    }

    i = row + 1;
    j = col - 1;
    while (i < this.rows && j >= 0 && this.board[i][j] === player) {
      count++;
      i++;
      j--;
    }

    return count >= 4;
  }

  checkForWin(row: number, col: number): boolean {
    // Implementa qui la logica per controllare se c'è una vittoria
    // in base alla mossa effettuata nella riga e colonna specificate.
    // Controlla orizzontale, verticale e diagonale per una sequenza di 4 gettoni dello stesso giocatore.
    // Restituisce true se c'è una vittoria, altrimenti false.
    return (
      this.checkHorizontal(row, col) ||
      this.checkVertical(row, col) ||
      this.checkDiagonal(row, col)
    );
  }

  makeMove(col: number) {
    if (this.isMatchOver || this.isTokenFalling) {
      return;
    }

    for (let i = 0; i <= this.rows - 1; i++) {
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
            alert(`Giocatore ${currentCellPlayer} ha vinto!`); // Mostra il risultato con un ritardo per mostrare prima il gettone
          });
          this.isMatchOver = true;
        } else {
          let fullColumns = true;
          for (let j = 0; j < this.cols; j++) {
            if (this.board[this.rows - 1][j] === 0) {
              fullColumns = false;
              break;
            }
          }

          if (fullColumns) {
            alert('La griglia è piena, nessuno ha vinto.');
            this.isMatchOver = true;
          } else {
            this.currentPlayer = currentCellPlayer === 1 ? 2 : 1;
          }
        }

        return;
      }
    }
  }
}
