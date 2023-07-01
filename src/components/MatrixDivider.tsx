import { useState } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/css";
import { Divider, Size as MatrixSize } from "../libs/matrix";
import toggleSetValue from "../utils/toggleSetValue";

interface Props {
  matrixSize: MatrixSize;
  divider: Divider;
}

const MatrixDivider = ({
  matrixSize: { rows, cols },
  divider: { x_axis, y_axis },
}: Props) => {
  const [divider, setDivider] = useState<Divider>({
    x_axis,
    y_axis,
  });

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

  return (
    <>
      <DividerContainer>
        <div
          className={css`
            position: relative;
            width: 100%;
            height: 100%;
          `}
        >
          <Rows>
            {new Array(rows - 1).fill(null).map((_, index) => {
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
            {new Array(cols - 1).fill(null).map((_, index) => {
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
    </>
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

export default MatrixDivider;
