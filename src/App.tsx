import "./styles.css";
import styled from "@emotion/styled";
import Matrix from "./components/Matrix";
import Corners from "./components/Corners";
import useCorners from "./hooks/useCorners";

export default function App() {
  const corners = useCorners();

  return (
    <Container className="App">
      <Matrix rows={5} cols={5} />
      {corners.visible && <Corners />}
    </Container>
  );
}

const Container = styled.div`
  background-color: #ecfff2;
  display: grid;
  place-items: center;

  width: 100vw;
  height: 100vh;
`;
