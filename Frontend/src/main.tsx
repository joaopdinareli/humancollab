import { StrictMode, useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider, createTheme, CssBaseline, IconButton } from '@mui/material'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import LoginPage from './Login.tsx'

function App() {
  const [mode, setMode] = useState<'light' | 'dark'>('light')
  const theme = useMemo(() => createTheme({
    palette: {
      mode,
      primary: { main: '#06677F' },
      background: { default: mode === 'light' ? '#F5FAFD' : '#121212' },
    },
  }), [mode])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div style={{ position: 'absolute', top: 16, left: 16, zIndex: 999 }}>
        <IconButton onClick={() => setMode(m => m === 'light' ? 'dark' : 'light')} color="inherit">
          {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </div>
      <LoginPage />
    </ThemeProvider>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
