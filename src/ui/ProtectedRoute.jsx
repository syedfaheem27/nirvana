import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProtectedRoute = ({ children }) => {
  //1. If we have an active user
  const { isGettingUser, isAuthenticated } = useUser();
  const navigate = useNavigate();

  //2. If we don't have an active userm redirtect to login
  useEffect(() => {
    if (!isAuthenticated && !isGettingUser) {
      navigate("/login");
    }
  }, [isAuthenticated, isGettingUser, navigate]);

  //3. Add a loading spinner while authorizing
  if (isGettingUser)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  //4.If we have an active user, then render all the children
  if (isAuthenticated) return children;
};

export default ProtectedRoute;
