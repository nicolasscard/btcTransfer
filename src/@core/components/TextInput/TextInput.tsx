import React from 'react';
import { TextInput as Input} from 'react-native-paper';
import useConfigTheme from '@hooks/useConfigTheme';
import useStyles from './styles';

interface Props { 
  label: string,
  value: string,
  onChangeText: (value: string) => void,
  onFocus?: boolean,
  onBlur?: boolean,
  error?: boolean,
}

const TextInput: React.FC<Props> = (Props) => {
  const { configTheme } = useConfigTheme();
  const styles = useStyles(configTheme);

  return (
    <Input
      label={Props.label}
      value={Props.value}
      onChangeText={Props.onChangeText}
      error={Props.error}
      autoCapitalize={'none'}
      style={styles.textInput}
      theme={{ 
        colors: { 
          text: configTheme.primary, 
          primary: configTheme.textSecondary, 
          placeholder: configTheme.textInputTitle,
          error: configTheme.error
        },
      }}
    />
  );
}

export default TextInput;
