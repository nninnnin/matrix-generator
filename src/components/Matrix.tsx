import { useMemo, useState, useEffect } from "react";
import { css } from "@emotion/css";
import styled from "@emotion/styled";
import Matrix from "../libs/matrix";
import { Divider } from "../libs/matrix";
import toggleSetValue from "../utils/toggleSetValue";

const MatrixComponent = ({ rows, cols }: { rows: number; cols: number }) => {
  const [divideMode, setDivideMode] = useState(false);
  const [divider, setDivider] = useState<Divider>({
    x_axis: new Set([]),
    y_axis: new Set([]),
  });

  const matrix = useMemo(() => new Matrix(rows, cols), [rows, cols]);

  const handleCheckerClick =
    (checkerType: "row" | "col", dividerIndex: number) => () => {
      if (checkerType === "row") {
        setDivider((prev) => ({
          ...prev,
          y_axis: toggleSetValue(prev.y_axis, dividerIndex),
        }));

        return;
      }

      setDivider((prev) => ({
        ...prev,
        x_axis: toggleSetValue(prev.x_axis, dividerIndex),
      }));
    };

  useEffect(() => {
    const divider = matrix.getDivider();

    setDivider(divider);
  }, [matrix]);

  return (
    <div
      className={css`
        position: relative;
        border: 1px solid gainsboro;
        width: fit-content;
        height: fit-content;
        margin: 0 auto;
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
        <DividerContainer>
          <div
            className={css`
              position: relative;
              width: 100%;
              height: 100%;
            `}
          >
            <Rows>
              {new Array(matrix.getSize().rows - 1)
                .fill(null)
                .map((_, index) => {
                  const dividerIndex = index + 1;
                  const isDivided = divider.y_axis.has(dividerIndex);

                  return (
                    <div
                      className={css`
                        position: relative;
                      `}
                    >
                      <RowDivider divided={isDivided} />
                      <RowChecker
                        checked={isDivided}
                        onClick={handleCheckerClick("row", dividerIndex)}
                      />
                    </div>
                  );
                })}
            </Rows>

            <Cols>
              {new Array(matrix.getSize().cols - 1)
                .fill(null)
                .map((_, index) => {
                  const dividerIndex = index + 1;
                  const isDivided = divider.x_axis.has(dividerIndex);

                  return (
                    <div
                      className={css`
                        position: relative;
                      `}
                    >
                      <ColDivider divided={isDivided} />
                      <ColChecker
                        checked={isDivided}
                        onClick={handleCheckerClick("col", dividerIndex)}
                      />
                    </div>
                  );
                })}
            </Cols>
          </div>
        </DividerContainer>
      )}
    </div>
  );
};

const DividerContainer = styled.div`
  width: 100%;
  height: 100%;

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
  divided: boolean;
}>`
  width: 100%;
  border-top: 5px dashed rgba(255, 255, 255, 0.2);

  ${({ divided }) =>
    divided &&
    `
    border-top-style: solid;
  `};

  transition: 0.1s;
`;

export const ColDivider = styled.div<{
  show?: boolean;
  divided: boolean;
}>`
  height: 100%;
  border-left: 5px dashed rgba(255, 255, 255, 0.2);

  ${({ divided }) => divided && `border-left-style: solid;`};

  transition: 0.1s;
`;

const Checker = styled.div<{ checked: boolean }>`
  width: 50px;
  height: 50px;
  background-color: ${({ checked }) => (checked ? "gainsboro" : "white")};
  border-radius: 50%;

  position: absolute;

  &:hover {
    background-color: gainsboro;
  }
`;

const RowChecker = styled(Checker)`
  top: 50%;
  right: 0;

  transform: translate(150%, -50%);
`;

const ColChecker = styled(Checker)`
  top: 0;
  left: 50%;

  transform: translate(-50%, -150%);
`;

export default MatrixComponent;
