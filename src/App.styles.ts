import styled, { createGlobalStyle } from 'styled-components';
import BGImage from './images/bg.jpg';

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html {
    height: 100%;
  }

  body {
    background-image: url(${BGImage});
    background-size: cover;
    padding: 24px;
    margin: 0;
    display: flex;
    justify-content: center;
    font-family: sans-serif;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  > p {
    color: #fff;
  }

  .score {
    color: #fff;
    font-size: 2rem;
    margin: 0;
  }

  h1 {
    background-image: linear-gradient(180deg, #fff, #87f1ff);
    background-size: 100%;
    background-clip: text;
    filter: drop-shadow(2px 2px black);
    font-size: 5rem;
    text-align: center;
    margin: 24px;
    color: transparent;
  }

  .start, .next {
    cursor: pointer;
    background-image: linear-gradient(180deg, #fff, #ffcc91);
    border: 2px solid #d38558;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
    height: 48px;
    margin: 24px 0;
    padding: 0 36px;
  }

  .start {
    max-width: 240px;
  }
`;
