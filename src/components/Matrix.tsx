import { css } from "@emotion/css";
import styled from "@emotion/styled";
import { useMemo } from "react";
import Matrix from "../libs/matrix";

const MatrixComponent = ({ rows, cols }: { rows: number; cols: number }) => {
  const matrix = useMemo(() => new Matrix(rows, cols), [rows, cols]);

  matrix.logMatrix();

  return (
    <div
      className={css`
        position: relative;
        border: 1px solid black;
        width: fit-content;
        height: fit-content;
        margin: 0 auto;
      `}
    >
      <div
        id="matrix-container"
        className={css`
          background-color: #8a7e85;
        `}
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

      <DividerContainer>
        <div
          className={css`
            position: relative;
            width: 100%;
            height: 100%;
          `}
        >
          <Rows>
            {new Array(matrix.getSize().rows - 1).fill(null).map((_) => (
              <RowDivider />
            ))}
          </Rows>

          <Cols>
            {new Array(matrix.getSize().cols - 1).fill(null).map((_) => (
              <ColDivider />
            ))}
          </Cols>
        </div>
      </DividerContainer>
    </div>
  );
};

const DividerContainer = styled.div`
  width: 100%;
  height: 100%;
  /* background-color: rgba(255, 255, 255, 0.5); */

  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
`;

const DividerList = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;

  display: flex;
  justify-content: space-evenly;
`;

export const Rows = styled(DividerList)`
  flex-direction: column;
`;

export const Cols = styled(DividerList)``;

export const RowDivider = styled.div<{
  show?: boolean;
  divided?: boolean;
}>`
  width: 100%;
  /* height: 7px; */
  border-top: 5px dashed rgba(255, 255, 255, 0.2);
  /* background-color: white; */

  transition: 0.1s;
`;

export const ColDivider = styled.div<{
  show?: boolean;
  divided?: boolean;
}>`
  height: 100%;
  /* width: 7px; */
  /* background-color: white; */
  border-left: 5px dashed rgba(255, 255, 255, 0.2);

  transition: 0.1s;
`;

export default MatrixComponent;
