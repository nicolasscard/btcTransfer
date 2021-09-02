import React, { useState } from 'react';
import { TextInputProps, View} from 'react-native';
import { TextInput as Input} from 'react-native-paper';
import { Field } from 'redux-form';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import useConfigTheme from '@hooks/useConfigTheme';
import useStyles from './styles';

interface Props extends TextInputProps { 
  input: Field,
  label?: string,
  error?: boolean,
  touched?: boolean,
  showPassword?: boolean,
}

const TextInput: React.FC<Props> = (Props) => {
  const { configTheme } = useConfigTheme();
  const styles = useStyles(configTheme);

  const [hidePassword, setHidePassword] = useState<boolean>(true)

  return (
    <View style={{ alignItems: 'center', flex: 1, flexDirection: 'row' }}>
      <Input
        {...Props.input} 
        label={Props.label}
        value={Props.value}
        onChangeText={Props.onChangeText}
        error={Props.error && Props.touched}
        autoCapitalize={'none'}
        style={styles.textInput}
        keyboardType={Props.keyboardType}
        secureTextEntry={hidePassword}
        theme={{ 
          colors: { 
            text: configTheme.textInputText, 
            primary: configTheme.primary, 
            placeholder: configTheme.textSecondary,
            error: configTheme.error
          },
        }}
      />
      {Props.showPassword &&
        <MaterialCommunityIcons 
          name="eye-outline" 
          color={configTheme.primary} 
          size={25} 
          onPress={() => setHidePassword(!hidePassword)}
        />
      }
    </View>
  );
}

export default TextInput;
