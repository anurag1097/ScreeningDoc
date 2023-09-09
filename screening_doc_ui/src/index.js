import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';

const theme = createTheme();

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <BrowserRouter>
        <CssBaseline />
        <App />
    </BrowserRouter>
  </ThemeProvider>,
  document.getElementById('root')
);

