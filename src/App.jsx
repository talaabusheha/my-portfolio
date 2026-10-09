import { ThemeProvider } from './context/ThemeProvider';
import Portfolio from './Portfolio';
import CustomCursor from './Customcursor';

export default function App() {
  return (
    <ThemeProvider>
      <CustomCursor />
      <Portfolio />
    </ThemeProvider>
  );
}