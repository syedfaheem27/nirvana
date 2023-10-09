import styled from "styled-components";
import ButtonIcon from "./ButtonIcon";
import { HiOutlineUser } from "react-icons/hi2";
import LogOut from "../features/authentication/LogOut";
import { useNavigate } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";

const StyledHeaderMenu = styled.ul`
  display: flex;
  gap: 0.6rem;
`;
const HeaderMenu = () => {
  const navigate = useNavigate();
  return (
    <StyledHeaderMenu>
      <ButtonIcon onClick={() => navigate("/account")}>
        <HiOutlineUser />
      </ButtonIcon>
      <DarkModeToggle />
      <LogOut />
    </StyledHeaderMenu>
  );
};

export default HeaderMenu;
