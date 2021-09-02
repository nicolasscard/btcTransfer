import React from 'react';
import { Text, View, KeyboardTypeOptions } from 'react-native';
import { Field, reduxForm, InjectedFormProps, submit, isInvalid, isSubmitting } from 'redux-form';
import { ScrollView } from 'react-native-gesture-handler';
import { Button } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';

import useConfigTheme from '@hooks/useConfigTheme';
import useStyles from './styles';

import { TextInput } from '@components/index';

type RenderFieldProps = {
  input: Field,
  placeholder: string,
  meta: { touched: boolean, error: string, warning: string },
  secureTextEntry: boolean,
  keyboardType: KeyboardTypeOptions,
  showPassword: boolean
}

 const validate = (values: { mail: string, password: string }) => {
  let errors = {mail: '', password: '' };
  if (!values.mail) {
    errors.mail = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.mail)) {
    errors.mail = 'Invalid email address'
  }
  if (!values.password) {
    errors.password = 'Required'
  } else if (values.password.length < 4) {
    errors.password = 'Must be at last 4 characters'
  }
  return errors;
}

const warn = (values: {}) => {
  const warnings = {}
  return warnings;
}

const renderField = (Props: RenderFieldProps) => {
  const { input, placeholder, secureTextEntry, keyboardType, showPassword, meta: { touched, error, warning } } = Props;
  
  const { configTheme } = useConfigTheme();
  const styles = useStyles(configTheme);

  return (
    <View>
      <TextInput
        input={input}
        value={input.value}
        label={placeholder} 
        error={(error != '' && error != undefined)}
        touched={touched}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        showPassword={showPassword}
      />

      {touched && (
        (error && <Text style={styles.errorText}>{error}</Text>) 
        || 
        (warning && <Text style={styles.errorText}>{warning}</Text>)
      )} 
    </View>
  );
}

const LoginForm: React.FC<InjectedFormProps> = (Props) => {
  const { configTheme } = useConfigTheme();
  const styles = useStyles(configTheme);
     // get validators and submitting states from form
     const dispatch = useDispatch();
     const isInvalidd = useSelector((state) => isInvalid('loginForm')(state));
     const isSubmittingg = useSelector((state) => isSubmitting('loginForm')(state));

    return (
      <ScrollView style={{ flex: 1 }}>
          <Field
            name='mail'
            label='mail'
            type='email'
            component={renderField}
            placeholder={'email'}
            keyboardType={'email-address'}
            />
          <Field
            name='password'
            label='password'
            type='text'
            component={renderField}
            placeholder={'password'}
            secureTextEntry={true}
            showPassword={true}
          />       
          <Button 
            onPress={() => dispatch(submit('loginForm'))} 
            style={{ 
              ...styles.primaryButton, 
              backgroundColor: isInvalidd || isSubmittingg ? configTheme.disabled : configTheme.primaryButton
            }}
            labelStyle={{ fontSize: 12, color: configTheme.textButtonPrimary }}
            loading={false}
            disabled={isInvalidd || isSubmittingg}
          >
            Login
          </Button>
       </ScrollView>
    );
}

// export default Form;
export default reduxForm({
  form: 'loginForm', // a unique identifier for this form
  validate, // <--- validation function given to redux-form
  warn, // <--- warning function given to redux-form
})(LoginForm)
