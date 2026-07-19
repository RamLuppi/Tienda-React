import { createGlobalStyle } from "styled-components";
import { theme } from "./theme";

export const GlobalStyle = createGlobalStyle`
  * { box-sizing: border-box; }

  body {
    margin: 0;
    background-color: ${theme.color.bg};
    color: ${theme.color.ink};
    font-family: ${theme.font.body};
  }

  h1, h2, h3, h4, h5 {
    font-family: ${theme.font.display};
    letter-spacing: -0.01em;
  }

  a:focus-visible,
  button:focus-visible,
  input:focus-visible,
  textarea:focus-visible {
    outline: 2px solid ${theme.color.primary};
    outline-offset: 2px;
  }
`;
