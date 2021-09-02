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
  money: string;
  margin: number;
  halfMargin: number;
}

export default () => {
  const isDarkMode = useColorScheme();

  const [mode, setMode] = useState<string | null | undefined>(isDarkMode)

  const [configTheme, setConfigTheme] = useState<ConfigEntity>({
    primary: '#6d07e6', 
    secondary: '#FFFFFF',
    backgroundScreens: '#FFFFFF',
    backgroundHeaders: '#6d07e6',
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
    money: '#F9D480',
    margin: 20,
    halfMargin: 10
  })

  useEffect(() => {
    setConfigTheme({ ...configTheme })
  }, [])

  const setTheme = (theme: string) => setMode(theme);

  return {
    mode,
    configTheme,
    setTheme,
  }
}
