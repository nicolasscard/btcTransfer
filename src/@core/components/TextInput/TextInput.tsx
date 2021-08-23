import React from 'react';
import { TextInputProps} from 'react-native';
import { TextInput as Input} from 'react-native-paper';
import useConfigTheme from '@hooks/useConfigTheme';
import useStyles from './styles';
import { Field } from 'redux-form';

interface Props extends TextInputProps { 
  input: Field,
  label?: string,
  error?: boolean,
  touched?: boolean,
}

const TextInput: React.FC<Props> = (Props) => {
  const { configTheme } = useConfigTheme();
  const styles = useStyles(configTheme);


  return (
    <Input
      {...Props.input} 
      label={Props.label}
      value={Props.value}
      onChangeText={Props.onChangeText}
      error={Props.error && Props.touched}
      autoCapitalize={'none'}
      style={styles.textInput}
      keyboardType={Props.keyboardType}
      secureTextEntry={Props.secureTextEntry}
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
