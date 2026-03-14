export type Player = 'X' | 'O';
export type CellValue = Player | null;
export type Board = CellValue[];

export type OutcomeCounts = {
  xWins: number;
  oWins: number;
  draws: number;
  total: number;
};

export type Probabilities = {
  xWin: number;
  oWin: number;
  draw: number;
};

export type AnalysisResult = {
  probabilities: Probabilities;
  bestMove: number | null;
  counts: OutcomeCounts;
};

export type WinnerInfo = {
  winner: Player;
  line: [number, number, number];
};

const winningLines: [number, number, number][] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const memo = new Map<string, OutcomeCounts>();

export function checkWinner(board: Board): WinnerInfo | null {
  for (const [a, b, c] of winningLines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], line: [a, b, c] } as WinnerInfo;
    }
  }
  return null;
}

export function getAvailableMoves(board: Board): number[] {
  return board
    .map((cell, index) => (cell === null ? index : null))
    .filter((index): index is number => index !== null);
}

export function getNextPlayer(board: Board): Player {
  const xCount = board.filter((cell) => cell === 'X').length;
  const oCount = board.filter((cell) => cell === 'O').length;
  return xCount <= oCount ? 'X' : 'O';
}

function createKey(board: Board, currentPlayer: Player): string {
  return `${board.map((cell) => cell ?? '-').join('')}_${currentPlayer}`;
}

/**
 * Recursively enumerates every possible game continuation from the current state.
 *
 * The function returns raw outcome counts rather than probabilities so parent calls can
 * aggregate children by summing counts. Probabilities are computed only once at the end.
 * Memoization avoids recomputing identical subtrees for equivalent board+turn states.
 */
export function simulateGame(board: Board, currentPlayer: Player): OutcomeCounts {
  const key = createKey(board, currentPlayer);
  const cached = memo.get(key);
  if (cached) {
    return cached;
  }

  const winnerInfo = checkWinner(board);
  if (winnerInfo) {
    const terminal = {
      xWins: winnerInfo.winner === 'X' ? 1 : 0,
      oWins: winnerInfo.winner === 'O' ? 1 : 0,
      draws: 0,
      total: 1,
    };
    memo.set(key, terminal);
    return terminal;
  }

  const moves = getAvailableMoves(board);
  if (moves.length === 0) {
    const drawState = { xWins: 0, oWins: 0, draws: 1, total: 1 };
    memo.set(key, drawState);
    return drawState;
  }

  const aggregate: OutcomeCounts = { xWins: 0, oWins: 0, draws: 0, total: 0 };

  for (const move of moves) {
    const nextBoard = [...board];
    nextBoard[move] = currentPlayer;

    const nextPlayer: Player = currentPlayer === 'X' ? 'O' : 'X';
    const outcome = simulateGame(nextBoard, nextPlayer);

    aggregate.xWins += outcome.xWins;
    aggregate.oWins += outcome.oWins;
    aggregate.draws += outcome.draws;
    aggregate.total += outcome.total;
  }

  memo.set(key, aggregate);
  return aggregate;
}

export function countsToProbabilities(counts: OutcomeCounts): Probabilities {
  if (counts.total === 0) {
    return { xWin: 0, oWin: 0, draw: 0 };
  }

  return {
    xWin: counts.xWins / counts.total,
    oWin: counts.oWins / counts.total,
    draw: counts.draws / counts.total,
  };
}

/**
 * Calculates probabilities for the current position and chooses a best move.
 * Best move policy: maximize current player's eventual win probability.
 */
export function calculateProbabilities(board: Board): AnalysisResult {
  const winnerInfo = checkWinner(board);
  if (winnerInfo) {
    const terminalCounts: OutcomeCounts = {
      xWins: winnerInfo.winner === 'X' ? 1 : 0,
      oWins: winnerInfo.winner === 'O' ? 1 : 0,
      draws: 0,
      total: 1,
    };
    return {
      probabilities: countsToProbabilities(terminalCounts),
      bestMove: null,
      counts: terminalCounts,
    };
  }

  const availableMoves = getAvailableMoves(board);
  if (availableMoves.length === 0) {
    const drawCounts: OutcomeCounts = { xWins: 0, oWins: 0, draws: 1, total: 1 };
    return {
      probabilities: countsToProbabilities(drawCounts),
      bestMove: null,
      counts: drawCounts,
    };
  }

  const currentPlayer = getNextPlayer(board);
  const overallCounts = simulateGame(board, currentPlayer);
  const overallProbabilities = countsToProbabilities(overallCounts);

  let bestMove: number | null = null;
  let bestWinProbability = -1;

  for (const move of availableMoves) {
    const nextBoard = [...board];
    nextBoard[move] = currentPlayer;
    const childCounts = simulateGame(nextBoard, currentPlayer === 'X' ? 'O' : 'X');
    const childProbabilities = countsToProbabilities(childCounts);

    const score = currentPlayer === 'X' ? childProbabilities.xWin : childProbabilities.oWin;

    if (score > bestWinProbability) {
      bestWinProbability = score;
      bestMove = move;
    }
  }

  return {
    probabilities: overallProbabilities,
    bestMove,
    counts: overallCounts,
  };
}

export function formatPercent(value: number): string {
  return `${Math.round(value * 100)}%`;
}
