import { useEffect, useReducer } from "react";
import { matrixReducer, generateNewMatrix, minas } from "./reducers/matrix";
import { UIReducer, getUIInitialState } from "./reducers/ui";
import { HiOutlineCog, HiOutlineInformationCircle } from "react-icons/hi";
import { useMediaQuery } from "beautiful-react-hooks";

const px = 32;

const App = () => {
  const [matrix, dispatch] = useReducer(matrixReducer, generateNewMatrix());
  const [ui, uiDispatch] = useReducer(UIReducer, getUIInitialState());
  const onMovil = useMediaQuery("(max-width: 768px)");
  useEffect(() => {
    const countIfWin = () => {
      let open = 0;
      matrix.forEach((row) => {
        row.forEach((col) => {
          open += col.active ? 1 : 0;
        });
      });
      uiDispatch({
        type: "win",
        payload: open === matrix.length * matrix[0].length - minas,
      });
    };
    countIfWin();
  }, [matrix]);
  const restart = () => {
    dispatch({
      type: "restart",
    });
  };
  const handleClick = (x: number, y: number) => {
    if (ui.win) return;
    dispatch({
      type: "click",
      payload: {
        x,
        y,
      },
    });
  };
  const toggleInstructions = () => {
    uiDispatch({
      type: "instructions",
      payload: !ui.instructions,
    });
  };
  const toggleConfig = () => {
    uiDispatch({
      type: "config",
      payload: !ui.config,
    });
  };
  return (
    <div
      style={{
        margin: "1rem auto",
        width: "90%",
        maxWidth: "1000px",
      }}
    >
      <header>
        <h1 style={{ textAlign: "center", margin: "2rem 0" }}>Quedé... 🤡</h1>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {!onMovil && (
            <button
              onClick={toggleInstructions}
              style={{
                margin: ".5rem",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "2rem",
              }}
            >
              <HiOutlineInformationCircle />
            </button>
          )}
          <button
            style={{
              margin: ".5rem",
              padding: ".3rem .7rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "1.15rem",
              fontWeight: "bold",
            }}
            onClick={restart}
          >
            restart
          </button>
          {!onMovil && (
            <button
              onClick={toggleConfig}
              style={{
                margin: ".5rem",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "2rem",
              }}
            >
              <HiOutlineCog />
            </button>
          )}
        </div>
      </header>
      <main
        style={{
          margin: "1rem 0",
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1rem",
        }}
      >
        <section>
          {ui.instructions && !onMovil && (
            <ul>
              <li>Tap on the game squares to test for find a clown.</li>
              <li>
                If you tap a clown, your lose, otherwise, will be unlocked ceils
                with numbers indicating the nummber of clowns around the ceil.
              </li>
              <li>Wins if tap all ceils without clown.</li>
            </ul>
          )}
        </section>
        <section
          id="matrix"
          style={{
            width: 9 * px,
            height: 9 * px,
            display: "grid",
            gridTemplateColumns: "repeat(9, 1fr)",
            gap: "1px",
            margin: "0 auto",
          }}
        >
          {matrix.map((row, i) =>
            row.map(({ value, active }, j) => {
              return (
                <div
                  key={`${i}${j}`}
                  style={{
                    background: active ? "#f4eee8" : "#325288",
                    color: active ? "#000" : "#f4eee8",
                    width: px,
                    height: px,
                    borderRadius: 3,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onClick={() => handleClick(i, j)}
                >
                  {/** style={{ display: active ? "block" : "none" }} */}
                  <p style={{ display: active || ui.win ? "block" : "none" }}>
                    {value === -1 ? "🤡" : value ? value : " "}
                  </p>
                </div>
              );
            })
          )}
        </section>
        <section>
          {ui.config && !onMovil && <p>settings comming soon...</p>}
        </section>
      </main>
      {ui.win && (
        <h1 style={{ textAlign: "center", margin: "1rem 0" }}>Ganaste!</h1>
      )}
      <footer>
        <p style={{ textAlign: "center", margin: "2rem 0" }}>
          Created by{" "}
          <a rel="stylesheet" href="https://www.github.com/luisrdevy">
            luisrdevy
          </a>
        </p>
      </footer>
    </div>
  );
};

export default App;
