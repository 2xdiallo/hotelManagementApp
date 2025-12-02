import styled from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Heading from "./ui/Heading";

import Row from "./ui/Row";

function App() {
  const StyleApp = styled.main`
    background-color: var(--color-grey-0);
    text-align: center;
    display: flex;
    flex-direction: column;
  `;

  return (
    <>
      <GlobalStyles />
      <StyleApp>
        <Row type="vertical">
          <Row type="hoizontal">
            <Heading as="h1">The Wild Oasis</Heading>

            <div>
              <Heading as="h2"> Check In and Out</Heading>

              <Button
                variation="primary"
                size="medium"
                onClick={() => alert("clicked... ")}
              >
                Check In
              </Button>
              <Button
                variation="secondary"
                size="small"
                onClick={() => alert("Clicked...")}
              >
                Check Out
              </Button>
            </div>
          </Row>
          <Row type="vertical">
            <Heading as="h3">Form</Heading>
            <form>
              <Input type="text" placeholder="Number of guests" />
              <Input type="text" placeholder="Number of guests" />
            </form>
          </Row>
        </Row>
      </StyleApp>
    </>
  );
}

export default App;
