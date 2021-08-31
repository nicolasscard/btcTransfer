import { useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';

export interface ConfigEntity {
  primary: string;
  secondary: string;
  backgroundScreens: string;
  backgroundHeaders: string;
  textPrimary: string;
  textSecondary: string;
  textButtonPrimary: string;
  textButtonSecondary: string;
  disabled: string;
  textInputText: string;
  error: string;
  success: string;
  primaryButton: string;
  tabSecondary: string;
}

interface Alings {
  justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
}

export default () => {
  const isDarkMode = useColorScheme();

  const [mode, setMode] = useState<string | null | undefined>(isDarkMode)

  const [configTheme, setConfigTheme] = useState<ConfigEntity>({
    primary: '#6d07e6', 
    secondary: '#FFFFFF',
    backgroundScreens: '#FFFFFF',
    backgroundHeaders: '#202020',
    textPrimary: '#17BFDD',
    textSecondary: '#9C9C9C',
    textButtonPrimary: 'white',
    textButtonSecondary: '#6d07e6',
    textInputText: '#000000',
    disabled: '#E3E3E3',
    error: '#FF0000',
    success: '#009933',
    primaryButton: '#6d07e6',
    tabSecondary: '#9C9C9C',
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