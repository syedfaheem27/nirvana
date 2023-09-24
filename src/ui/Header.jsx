import { styled } from "styled-components";

const StyledHeader = styled.header`
  background: var(--color-grey-0);
  padding: 1.6rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);
`;

const Header = () => {
  return <StyledHeader>Header</StyledHeader>;
};

export default Header;
