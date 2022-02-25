type Symbol = "X" | "O" | " ";

export class Game {
  private _board: Board = new Board();
  private _currentPlayer: Symbol = "X";

  public Play(position: Position): void {
    this._board.AddTileAt({
      Symbol: this._currentPlayer,
      Position: position,
    });
    this._switchPlayer();
  }

  private _switchPlayer() {
    if (this._currentPlayer === "X") {
      this._currentPlayer = "O";
    } else {
      this._currentPlayer = "X";
    }
  }

  private _checkColumn(x: number): boolean {
    if (this._board.TileAt({ X: x, Y: 0 }).Symbol === " ") {
      return false;
    }

    return [0, 1, 2].every(
      (idx) =>
        this._board.TileAt({ X: x, Y: idx }).Symbol ===
        this._board.TileAt({ X: x, Y: 0 }).Symbol
    );
  }

  public Winner(): Symbol {
    for (let x = 0; x < 3; x++) {
      if (this._checkColumn(x)) {
        return this._board.TileAt({ X: x, Y: 0 }).Symbol;
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
        const tile: Tile = { Position: { X: i, Y: j }, Symbol: " " };
        this._plays.push(tile);
      }
    }
  }

  public TileAt(position: Position): Tile {
    return this._plays.find(
      (t: Tile) => t.Position.X == position.X && t.Position.Y == position.Y
    )!;
  }

  public AddTileAt(tile: Tile): void {
    const playedTile = this.TileAt(tile.Position);

    if (playedTile.Symbol != " ") {
      throw new Error("Invalid position");
    }

    playedTile.Symbol = tile.Symbol;
  }
}
