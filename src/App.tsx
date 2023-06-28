import "./styles.css";
import styled from "@emotion/styled";
import Matrix from "./components/Matrix";

export default function App() {
  return (
    <Container className="App">
      <Matrix rows={5} cols={5} />
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
