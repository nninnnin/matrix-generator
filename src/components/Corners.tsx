import styled from "@emotion/styled";
import { cornerAtom } from "../hooks/useCorners";
import { useAtom } from "jotai";

const Corners = () => {
  const [corners] = useAtom(cornerAtom);

  return (
    <div>
      <Corner pos={"lt"} onClick={corners.handlers["lt"]}>
        <img src="/cancel.svg" width={32} />
      </Corner>
      <Corner pos={"rt"} onClick={corners.handlers["rt"]}>
        <img src="/confirm.svg" width={32} />
      </Corner>
      {/* <Corner pos={"lb"} />
      <Corner pos={"rb"} /> */}
    </div>
  );
};

const Corner = styled.div<{ pos: "lt" | "rt" | "lb" | "rb" }>`
  width: 50px;
  height: 50px;
  background-color: grey;

  position: fixed;

  display: grid;
  place-items: center;

  ${({ pos }) => {
    switch (pos) {
      case "rt":
        return `
          top: 0;
          right: 0;
          background-color: #80fc80;
        `;
      case "lt":
        return `
          top: 0;
          left: 0;
          background-color: #f59292;
        `;
      case "lb":
        return `
          bottom: 0;
          left: 0;
          background-color: blue;
        `;
      case "rb":
        return `
          bottom: 0;
          right: 0;
          background-color: yellow;c
        `;
    }
  }};
`;

export default Corners;
