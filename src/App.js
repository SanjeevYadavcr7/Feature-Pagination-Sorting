import React from 'react'
import theme from './styles/theme';
import Pagination from './feature/pagination/Pagination'
import { ThemeProvider } from '@material-ui/styles';


function App() {
  return (
    <ThemeProvider theme={theme}>
      <Pagination />
    </ThemeProvider>
  )
}

export default App
