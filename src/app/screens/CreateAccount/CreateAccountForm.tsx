import React from 'react';
import { Text, View, ImageSourcePropType} from 'react-native';
import { Field, reduxForm, InjectedFormProps, } from 'redux-form';
import { account } from './AccountSlice';

import useConfigTheme from '@hooks/useConfigTheme';
import useStyles from './styles';

import { ImageTextInput } from '@components/index';
import { firstNameTxt, lastNameTxt, emailTxt, passwordTxt } from '@assets/Texts/CreateAccount';
import { ScrollView } from 'react-native-gesture-handler';

type Props = {
  input: Field,
  placeholder: string,
  meta: { touched: boolean, error: string, warning: string },
  source: ImageSourcePropType,
  secureTextEntry: boolean
}

const personIcon: ImageSourcePropType = require("@assets/media/person2x.png");
  const emailIcon: ImageSourcePropType = require("@assets/media/emailIcon.png");
  const passwordIcon: ImageSourcePropType = require("@assets/media/passwordIcon.png");

 const validate = (values: account) => {
  let errors: account = {firstName: '', lastName: '', email: '', password: '' };
  if (!values.firstName) {
    errors.firstName = 'Required';
  } 
  if (!values.lastName) {
    errors.lastName = 'Required';
  } 
  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
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

const renderField: React.FC<Props> = (Props) => {
  const { configTheme } = useConfigTheme();
  const styles = useStyles(configTheme);
  const { source, input, placeholder, secureTextEntry, meta: { touched, error, warning } } = Props;

  return (
    <View>
      <ImageTextInput
        input={input}
        value={input.value}
        source={source}
        label={placeholder} 
        error={(error != '' && error != undefined)}
        touched={touched}
        secureTextEntry={secureTextEntry}
      />

      { touched && (
        (error && <Text style={styles.errorText}>{error}</Text>) 
        || 
        (warning && <Text style={styles.errorText}>{warning}</Text>)
      )} 
    </View>
  )
}

const CreateAccountForm: React.FC<InjectedFormProps> = (Props) => {
    return (
      <ScrollView style={{  flex: 1 }}>
        <Field
          name='firstName'
          label='firstName'
          type='text'
          component={renderField}
          placeholder={firstNameTxt}
          source={personIcon}
        />
        <Field
          name='lastName'
          label='lastName'
          type='text'
          component={renderField}
          placeholder={lastNameTxt}
          source={personIcon}
        />
        <Field
          name='email'
          label='email'
          type='email'
          component={renderField}
          placeholder={emailTxt}
          source={emailIcon}
        />
        <Field
          name='password'
          label='password'
          type='text'
          component={renderField}
          placeholder={passwordTxt}
          source={passwordIcon}
          secureTextEntry={true}
        />       
      </ScrollView>
    )
}

// export default Form;
export default reduxForm({
  form: 'Form', // a unique identifier for this form
  validate, // <--- validation function given to redux-form
  warn, // <--- warning function given to redux-form
})(CreateAccountForm)
