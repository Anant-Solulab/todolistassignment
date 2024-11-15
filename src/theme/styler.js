import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
  }

  h1 {
    text-align: center;
    margin-top: 20px;
  }

  .todo-list {
    padding: 20px;
    margin: 20px;
    border-radius: 8px;
    background-color: ${({ theme }) => theme.todoBackground};
  }

  button {
    background-color: ${({ theme }) => theme.buttonBackground};
    color: ${({ theme }) => theme.buttonText};
    border: none;
    padding: 10px;
    cursor: pointer;
    margin: 20px;
    border-radius: 5px;
  }

  button:hover {
    opacity: 0.8;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    padding: 10px;
    margin: 5px 0;
    background-color: ${({ theme }) => theme.todoBackground};
    color: ${({ theme }) => theme.todoText};
    border: 1px solid ${({ theme }) => theme.border};
    border-radius: 5px;
  }
`;

export default GlobalStyle;
