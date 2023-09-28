import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { styled } from "styled-components";

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
`;

const StyledMain = styled.main`
  background: var(--color-grey-50);
  padding: 4rem 5.2rem 6.4rem;
`;

const StyledContainer = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.6rem;
`;
const AppLayout = () => {
  return (
    <StyledAppLayout>
      <Header />
      <Sidebar />
      <StyledMain>
        <StyledContainer>
          <Outlet />
        </StyledContainer>
      </StyledMain>
    </StyledAppLayout>
  );
};

export default AppLayout;
