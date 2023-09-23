import { styled } from "styled-components";
import { GlobalStyles } from "./styles/globalStyles";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Heading from "./ui/Heading";
import Row from "./ui/Row";

function App() {
  const StyledApp = styled.div`
    /* background-color: orangered; */
    padding: 1rem 2rem;
  `;
  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <Row>
          <Heading as="h1">Nirvana</Heading>

          <Row type="horizontal">
            <Heading as="h3">Check In and Out</Heading>
            <div>
              <Button onClick={() => alert("Check in")}>Check In</Button>
              <Button
                variation="secondary"
                size="small"
                onClick={() => alert("Check out")}
              >
                Check Out
              </Button>
            </div>
          </Row>

          <Row>
            <Heading as="h4">Forms</Heading>
            <form>
              <Input type="number" placeholder="Number of guests" />
              <Input type="number" placeholder="Number of guests" />
            </form>
          </Row>
        </Row>
      </StyledApp>
    </>
  );
}

export default App;
