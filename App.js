import React from 'react';
import {Provider as PaperProvider, DefaultTheme} from "react-native-paper"

import AuthCheck from "./AuthCheck"


const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#1E287A',
    accent: '#E59E18',
  },
};

export default function App() {
  return(
    <PaperProvider theme={theme}>
      <AuthCheck />
    </PaperProvider>
  )
}
