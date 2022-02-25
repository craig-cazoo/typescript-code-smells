import { Game } from "./Game";

describe("TicTacToe game", () => {
  let game: Game;

  beforeEach(() => {
    game = new Game();
  });

  it("should not allow a player to play in last played position", () => {
    game.Play({ X: 0, Y: 0 });
    expect(() => game.Play({ X: 0, Y: 0 })).toThrow();
  });

  it("should not allow a player to play in any played position", () => {
    game.Play({ X: 0, Y: 0 });
    game.Play({ X: 1, Y: 0 });
    expect(() => game.Play({ X: 0, Y: 0 })).toThrow();
  });

  it("should declare player X as winner if it plays three in top column", () => {
    game.Play({ X: 0, Y: 0 });
    game.Play({ X: 1, Y: 0 });
    game.Play({ X: 0, Y: 1 });
    game.Play({ X: 1, Y: 1 });
    game.Play({ X: 0, Y: 2 });

    var winner = game.Winner();

    expect(winner).toBe("X");
  });

  it("should declare player O as winner if it plays three in top column", () => {
    game.Play({ X: 1, Y: 0 });
    game.Play({ X: 0, Y: 0 });
    game.Play({ X: 1, Y: 1 });
    game.Play({ X: 0, Y: 1 });
    game.Play({ X: 2, Y: 2 });
    game.Play({ X: 0, Y: 2 });

    var winner = game.Winner();

    expect(winner).toBe("O");
  });

  it("should declare player X as winner if it plays three in middle column", () => {
    game.Play({ X: 1, Y: 0 });
    game.Play({ X: 0, Y: 0 });
    game.Play({ X: 1, Y: 1 });
    game.Play({ X: 0, Y: 1 });
    game.Play({ X: 1, Y: 2 });

    var winner = game.Winner();

    expect(winner).toBe("X");
  });

  it("should declare player O as winner if it plays three in middle column", () => {
    game.Play({ X: 0, Y: 0 });
    game.Play({ X: 1, Y: 0 });
    game.Play({ X: 2, Y: 1 });
    game.Play({ X: 1, Y: 1 });
    game.Play({ X: 2, Y: 2 });
    game.Play({ X: 1, Y: 2 });

    var winner = game.Winner();

    expect(winner).toBe("O");
  });

  it("should declare player X as winner if it plays three in bottom column", () => {
    game.Play({ X: 2, Y: 0 });
    game.Play({ X: 0, Y: 0 });
    game.Play({ X: 2, Y: 1 });
    game.Play({ X: 0, Y: 1 });
    game.Play({ X: 2, Y: 2 });

    var winner = game.Winner();

    expect(winner).toBe("X");
  });

  it("should de player O as winner if it plays three in bottom column", () => {
    game.Play({ X: 0, Y: 0 });
    game.Play({ X: 2, Y: 0 });
    game.Play({ X: 1, Y: 1 });
    game.Play({ X: 2, Y: 1 });
    game.Play({ X: 0, Y: 1 });
    game.Play({ X: 2, Y: 2 });

    var winner = game.Winner();

    expect(winner).toBe("O");
  });

  it.skip("should declare player X as winner if it plays three in left row", () => {
    game.Play({ X: 0, Y: 0 });
    game.Play({ X: 0, Y: 1 });
    game.Play({ X: 1, Y: 0 });
    game.Play({ X: 1, Y: 1 });
    game.Play({ X: 2, Y: 0 });

    var winner = game.Winner();

    expect(winner).toBe("X");
  });
});
