import React from 'react';
import { ThemeProvider } from './context/ThemeProvider';
import Portfolio from './Portfolio';
import CustomCursor from './Customcursor';
import PortfolioAIAssistant from './components/ai/PortfolioAIAssistant';

export default function App() {
  return (
    <ThemeProvider>
      <CustomCursor />
      <Portfolio />
      <PortfolioAIAssistant />
    </ThemeProvider>
  );
}