
import CssBaseline from '@mui/material/CssBaseline'
import Container from '@mui/material/Container'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography' 
import CarList from './components/CarList'


function App() {
  

  return (
    <>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Car Shop
          </Typography>

        </Toolbar>
      </AppBar>
      <Container maxWidth="md" sx={{ mt: 4 }}>
      <CarList />
      </Container>  
    </>
  )
}

export default App
