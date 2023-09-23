import { css, styled } from "styled-components";

// const testCss = css`
//   color: white;
//   line-height: 1.8;
// `;

const Heading = styled.h1`
  ${(props) =>
    props.as === "h1" &&
    css`
      font-size: 4rem;
    `}

  ${(props) =>
    props.as === "h3" &&
    css`
      font-size: 3rem;
    `}

    ${(props) =>
    props.as === "h4" &&
    css`
      font-size: 2rem;
    `}

    line-height:1.4;
  font-weight: 600;
`;

export default Heading;
