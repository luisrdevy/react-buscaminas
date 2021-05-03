const rows = 9;
const cols = 9;
export const minas = 10;

const dx = [0, 0, 1, -1, 1, -1, -1, 1];
const dy = [1, -1, 0, 0, 1, -1, 1, -1];

type matrixType = { active: boolean; value: number }[][];

type ActionType =
  | { type: "click"; payload: { x: number; y: number } }
  | { type: "restart" };

export const matrixReducer = (state: matrixType, action: ActionType) => {
  switch (action.type) {
    case "restart":
      return generateNewMatrix();
    case "click":
      const nextState = [...state];
      const { x, y } = action.payload;
      if (state[x][y].value === -1) {
        return pizzasFounded(nextState);
      } else if (state[x][y].value === 0) {
        return searchZeros(nextState, x, y);
      } else {
        nextState[x][y].active = true;
        return nextState;
      }
  }
};

const searchZeros = (nextState: matrixType, X: number, Y: number) => {
  const visited: boolean[][] = [];
  for (let i = 0; i < rows; ++i) {
    visited.push(Array.from(Array(cols), () => false));
  }
  const queue: number[] = [];
  let pop = 0;
  queue.push(X);
  queue.push(Y);

  while (pop < queue.length) {
    console.log("pop:", pop, "len:", queue.length);
    const x = queue[pop++];
    const y = queue[pop++];
    visited[x][y] = true;
    if (nextState[x][y].value >= 0) {
      nextState[x][y].active = true;
    }
    if (nextState[x][y].value === 0) {
      for (let i = 0; i < dx.length; ++i) {
        const xx = x + dx[i];
        const yy = y + dy[i];
        if (
          0 <= xx &&
          xx < rows &&
          0 <= yy &&
          yy < cols &&
          !visited[xx][yy] &&
          nextState[xx][yy].value >= 0
        ) {
          queue.push(xx);
          queue.push(yy);
          nextState[xx][yy].active = true;
          visited[xx][yy] = true;
        }
      }
    }
  }

  return nextState;
};

const pizzasFounded = (nextState: matrixType) => {
  nextState.forEach((row) => {
    row.forEach((cell) => {
      cell.active = true;
    });
  });
  return nextState;
};

export const generateNewMatrix = (): matrixType => {
  const state: matrixType = [];
  for (let i = 0; i < rows; ++i) {
    state.push(Array.from(Array(cols), () => ({ value: 0, active: false })));
  }
  let newMines = minas;
  while (newMines--) {
    let x = randomNumber(state.length);
    let y = randomNumber(state.length);
    while (state[x][y].value === -1) {
      x = randomNumber(state.length);
      y = randomNumber(state.length);
    }
    state[x][y].value = -1;
  }

  for (let i = 0; i < state.length; ++i) {
    for (let j = 0; j < state[0].length; ++j) {
      if (state[i][j].value === -1) {
        for (let k = 0; k < dx.length; ++k) {
          const x = i + dx[k];
          const y = j + dy[k];
          if (
            0 <= x &&
            x < state.length &&
            0 <= y &&
            y < state[0].length &&
            state[x][y].value !== -1
          ) {
            state[x][y].value++;
          }
        }
      }
    }
  }
  return state;
};

const randomNumber = (max: number): number => {
  return Math.floor(Math.random() * max);
};
