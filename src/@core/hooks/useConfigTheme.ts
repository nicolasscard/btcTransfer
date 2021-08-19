import { useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';

export interface ConfigEntity {
  primary: string;
  secondary: string;
  gradientBlue: (string | number)[];
  gradientViolet: (string | number)[];
  backgroundScreens: string;
  backgroundHeaders: string;
  textLight: string;
  textDark: string;
  textPrimary: string;
  textSecondary: string;
  textButtonPrimary: string;
  textButtonSecondary: string;
  textInputTitle: string;
  textInputText: string;
  card: string;
  error: string;
  primaryButton: string;
  alingContentCenter?: Alings;
  alingContentBetweenRow: Alings;
}

interface Alings {
  justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
}

export default () => {
  const isDarkMode = useColorScheme();

  const [mode, setMode] = useState<string | null | undefined>(isDarkMode)

  const [configTheme, setConfigTheme] = useState<ConfigEntity>({
    primary: '#17BFDD', 
    secondary: '#F25FBB',
    gradientBlue: ["#00DCEC","#00B7D5"],
    gradientViolet: ["#8D24C4","#500F71"],
    backgroundScreens: '#FFFFFF',
    backgroundHeaders: '#202020',
    textLight: 'white',
    textDark: 'black',
    textPrimary: '#17BFDD',
    textSecondary: '#9C9C9C',
    textButtonPrimary: 'white',
    textButtonSecondary: '#7000AD',
    textInputTitle: '#D8D8D8',
    textInputText: '#17BFDD',
    card: 'white',
    error: '#FF0000',
    primaryButton: '#5FBA20',
    alingContentCenter: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    alingContentBetweenRow: {
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  })

  useEffect(() => {
    if (mode === 'dark') {
      setConfigTheme({
        ...configTheme,
      })
    } else {
      setConfigTheme({
        ...configTheme,
      })
    }
  }, [mode])

  const setTheme = (theme: string) => setMode(theme);

  return {
    mode,
    configTheme,
    setTheme,
  }
}