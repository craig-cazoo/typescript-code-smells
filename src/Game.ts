type Symbol = "X" | "O" | " ";

export class Game {
  private _lastSymbol: Symbol = ' ';
  private _board: Board = new Board();

  public Play(symbol: Symbol, x: number, y: number): void {
    //if first move
    if (this._lastSymbol == ' ') {
      if (symbol == 'O') {
        throw new Error("Invalid first player");
      }
    }
    //if not first move but player repeated
    else if (symbol == this._lastSymbol) {
      throw new Error("Invalid next player");
    }
    //if not first move but play on an already played tile
    else if (this._board.TileAt(x, y).Symbol != ' ') {
      throw new Error("Invalid position");
    }

    // update game state
    this._lastSymbol = symbol;
    this._board.AddTileAt(symbol, x, y);
  }

  public Winner(): Symbol {
    for (let x = 0; x < 3; x++) {
      if (this._board.TileAt(x, 0).Symbol != ' ') {
        if (this._board.TileAt(x, 0).Symbol ==
          this._board.TileAt(x, 1).Symbol &&
          this._board.TileAt(x, 2).Symbol == this._board.TileAt(x, 1).Symbol) {
          return this._board.TileAt(x, 0).Symbol;
        }
      }
    }

    return ' ';
  }
}

interface Tile {
  X: number;
  Y: number;
  Symbol: Symbol;
}

class Board {
  private _plays: Tile[] = [];

  constructor() {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const tile: Tile = {X: i, Y: j, Symbol: " "};
        this._plays.push(tile);
      }
    }
  }

  public TileAt(x: number, y: number): Tile {
    return this._plays.find((t: Tile) => t.X == x && t.Y == y)!
  }

  public AddTileAt(symbol: Symbol, x: number, y: number): void {
    this._plays.find((t: Tile) => t.X == x && t.Y == y)!.Symbol = symbol;
  }
}