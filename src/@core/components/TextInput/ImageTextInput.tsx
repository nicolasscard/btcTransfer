import React from 'react';
import { View, ImageSourcePropType, TextInputProps, Image } from 'react-native';
import { TextInput as Input } from 'react-native-paper';
import useConfigTheme from '@hooks/useConfigTheme';
import useStyles from './styles';
import { Field } from 'redux-form';

interface Props extends TextInputProps { 
  input: Field,
  source: ImageSourcePropType,
  name?: string,
  label?: string,
  value: string,
  error?: boolean,
  touched?: boolean,
  secureTextEntry?: boolean,
}

const ImageTextInput: React.FC<Props> = (Props) => {
  const { configTheme } = useConfigTheme();
  const styles = useStyles(configTheme);

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Image 
        source={Props.source}
        style={{ 
          ...styles.image, 
          tintColor: configTheme.textInputTitle 
        }}
      />

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
    </View> 
  );
}

export default ImageTextInput;
