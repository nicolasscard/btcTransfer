import React from 'react';
import { Text, View, KeyboardTypeOptions } from 'react-native';
import { Field, Form, reduxForm, InjectedFormProps } from 'redux-form';
import { UserState } from '@reducers/user/reducer';

import useConfigTheme from '@hooks/useConfigTheme';
import useStyles from './styles';

import { TextInput } from '@components/index';
import { emailTxt, passwordTxt } from '@assets/Texts/CreateAccount';
import { ScrollView } from 'react-native-gesture-handler';

import { Button } from 'react-native-paper';
import { submit, isInvalid, isSubmitting } from 'redux-form';

import { useDispatch, useSelector } from 'react-redux';

type RenderFieldProps = {
  input: Field,
  placeholder: string,
  meta: { touched: boolean, error: string, warning: string },
  secureTextEntry: boolean,
  keyboardType: KeyboardTypeOptions
}

 const validate = (values: UserState) => {
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

// const renderField = (Props: RenderFieldProps) => {
const renderField: React.FC<RenderFieldProps> = (Props) => {
  const { input, placeholder, secureTextEntry, keyboardType, meta: { touched, error, warning } } = Props;
  
  const { configTheme } = useConfigTheme();
  const styles = useStyles(configTheme);
// console.log('touched')
// console.log(touched)
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
      />

      { touched && (
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
     const isInvalidd = useSelector((state) => isInvalid('Form')(state));
     const isSubmittingg = useSelector((state) => isSubmitting('Form')(state));

    return (
      <ScrollView style={{  flex: 1,  }}>
        <View style={{  flex: 1, justifyContent: 'space-between', }}>
          <View style={{  flex: 1, }}>

            <Field
              name='mail'
              label='mail'
              type='email'
              component={renderField}
              placeholder={emailTxt}
              keyboardType={'email-address'}
              
              />
            <Field
              name='password'
              label='password'
              type='text'
              component={renderField}
              placeholder={passwordTxt}
              secureTextEntry={true}
              />       

          </View>
        <View style={{  justifyContent: 'center',  alignItems: 'center',  }}>
          <Button 
              mode="contained" 
              onPress={() => {
                dispatch(submit('Form'))
              }} 
              style={styles.button}
              labelStyle={{ fontSize: 12 }}
              loading={false}
              disabled={isInvalidd || isSubmittingg}
              >
              Login
          </Button>
        </View>
        </View>
       </ScrollView>
    )
}

// export default Form;
export default reduxForm({
  form: 'Form', // a unique identifier for this form
  validate, // <--- validation function given to redux-form
  warn, // <--- warning function given to redux-form
})(LoginForm)
