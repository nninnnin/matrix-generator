import { useMemo, useState } from "react";
import { css } from "@emotion/css";

import Matrix from "../libs/matrix";
import MatrixDivider from "./MatrixDivider";
import useCorners from "../hooks/useCorners";

const MatrixComponent = ({ rows, cols }: { rows: number; cols: number }) => {
  const [divideMode, setDivideMode] = useState(false);
  const corners = useCorners();

  const matrix = useMemo(() => new Matrix(rows, cols), [rows, cols]);

  return (
    <div
      className={css`
        position: fixed;
        border: 1px solid gainsboro;
        width: fit-content;
        height: fit-content;
      `}
    >
      <div
        id="matrix-container"
        className={css`
          background-color: #8a7e85;
          transition: 0.23s;

          &:hover {
            opacity: 0.5;
          }
        `}
        onClick={() => {
          setDivideMode((prev) => !prev);
          corners.setVisibility(true);
          corners.setHandlers({
            lt: () => {
              corners.setVisibility(false);
              setDivideMode(false);
            },
            rt: () => {
              // matrix 객체 상태 변경
            },
          });
        }}
      >
        {matrix.getMatrix().map((row) => {
          return (
            <div
              id="row"
              style={{
                display: "flex",
              }}
            >
              {row.map((col) => (
                <div
                  id="cell"
                  style={{
                    width: "75px",
                    height: "75px",
                    display: "grid",
                    placeItems: "center",
                    lineHeight: "2.1em",
                  }}
                >
                  {col}
                </div>
              ))}
            </div>
          );
        })}
      </div>

      {divideMode && (
        <MatrixDivider
          matrixSize={matrix.getSize()}
          divider={matrix.getDivider()}
        />
      )}
    </div>
  );
};

export default MatrixComponent;
