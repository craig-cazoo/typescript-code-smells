type Symbol = "X" | "O" | " ";

export class Game {
  private _board: Board = new Board();
  private _currentPlayer: Symbol = "X";

  public Play(position: Position): void {
    this._board.setSymbol(position, this._currentPlayer);
    this._switchPlayer();
  }

  private _switchPlayer() {
    if (this._currentPlayer === "X") {
      this._currentPlayer = "O";
    } else {
      this._currentPlayer = "X";
    }
  }

  private winningStates: [Position, Position, Position][] = [
    [{X: 0, Y: 0}, {X: 0, Y: 1}, {X: 0, Y: 2}],
    [{X: 1, Y: 0}, {X: 1, Y: 1}, {X: 1, Y: 2}],
    [{X: 2, Y: 0}, {X: 2, Y: 1}, {X: 2, Y: 2}],
    [{X: 0, Y: 0}, {X: 1, Y: 0}, {X: 2, Y: 0}],
    [{X: 0, Y: 1}, {X: 1, Y: 1}, {X: 2, Y: 1}],
    [{X: 0, Y: 2}, {X: 1, Y: 2}, {X: 2, Y: 2}],
    [{X: 0, Y: 0}, {X: 1, Y: 1}, {X: 2, Y: 2}],
    [{X: 2, Y: 0}, {X: 1, Y: 1}, {X: 0, Y: 2}],
  ]

  private _checkIfWinningState(positions: Position[]): boolean {
    if (this._board.getSymbol(positions[0]) === " ") {
      return false;
    }

    return positions.every(
      (position) =>
        this._board.getSymbol(position) ===
        this._board.getSymbol(positions[0])
    );
  }

  public Winner(): Symbol {
    for (const winningState of this.winningStates) {
      if (this._checkIfWinningState(winningState)) {
        return this._board.getSymbol(winningState[0])
      }
    }

    return " ";
  }
}

interface Tile {
  Position: Position;
  Symbol: Symbol;
}

interface Position {
  X: number;
  Y: number;
}

class Board {
  private _plays: Tile[] = [];

  constructor() {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const tile: Tile = {Position: {X: i, Y: j}, Symbol: " "};
        this._plays.push(tile);
      }
    }
  }

  private TileAt(position: Position): Tile {
    return this._plays.find(
      (t: Tile) => t.Position.X == position.X && t.Position.Y == position.Y
    )!;
  }

  public getSymbol(position: Position): Symbol {
    return this.TileAt(position).Symbol;
  }

  public setSymbol(position: Position, symbol: Symbol): void {
    const playedTile = this.TileAt(position);

    if (playedTile.Symbol != " ") {
      throw new Error("Invalid position");
    }

    playedTile.Symbol = symbol;
  }
}
