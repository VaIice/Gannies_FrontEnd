import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyles = createGlobalStyle` 
${reset}
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
  li {
    list-style: none;
  }
  button{
    background: none;
    border: none;
    padding: 0;
    font: inherit;
    cursor: pointer;
    outline: inherit;
  }
  h1, h2, h3, h4, h5, h6 {
    font-family: inherit;
    font-weight: normal;
    font-size: inherit;
    margin: 0;
  }
  html {
    font-size: 10px;
  }
`;

export default GlobalStyles;
