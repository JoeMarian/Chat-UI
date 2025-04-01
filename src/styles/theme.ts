import { createTheme } from '@mui/material';
import { useStore } from '../store/useStore';

const theme = (isDarkMode: boolean) => {
  const fontSize = useStore.getState().fontSize;

  return createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
    },
    typography: {
      fontSize: fontSize,
      fontFamily: [
        'Roboto',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Arial',
        'sans-serif',
      ].join(','),
    },
  });
};

export default theme; 