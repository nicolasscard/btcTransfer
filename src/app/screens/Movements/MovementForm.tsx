import React from 'react';
import { Text, View, KeyboardTypeOptions } from 'react-native';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';

import useConfigTheme from '@hooks/useConfigTheme';
import useStyles from './styles';

import { TextInput } from '@components/index';
import { UserData } from '@reducers/user/model';
import { ScrollView } from 'react-native-gesture-handler';

import { Button } from 'react-native-paper';
import { submit, isInvalid, isSubmitting } from 'redux-form';

import { useDispatch, useSelector } from 'react-redux';

type RenderFieldProps = {
  input: Field,
  placeholder: string,
  meta: { touched: boolean, error: string, warning: string },
  secureTextEntry: boolean,
  keyboardType: KeyboardTypeOptions,
  loggedUser: UserData | null,
  fasterFee: number,
}

 const validate = (values: { btcAddress: string, btcAmount: string }, props: CustomProps) => {
   const btcAmount = Math.abs(parseFloat(values.btcAmount));
  let errors = {btcAddress: '', btcAmount: '' };
  if (!values.btcAddress) {
    errors.btcAddress = 'Required';
  } else if (values.btcAddress.length != 34) {
    errors.btcAddress = 'Must be exactly 34 characters'
  }
  if (!values.btcAmount) {
    errors.btcAmount = 'Required'
  } else if (props.loggedUser && btcAmount >= (props.loggedUser.btcBalance - props.fasterFee)) {
    errors.btcAmount = 'Insufficient balance'
  }
  return errors;
}

const warn = (values: {}) => {
  const warnings = {}
  return warnings;
}

const renderField = (Props: RenderFieldProps) => {
  const { input, placeholder, secureTextEntry, keyboardType, meta: { touched, error, warning } } = Props;
  
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
      />

      {touched && (
        (error && <Text style={styles.errorText}>{error}</Text>) 
        || 
        (warning && <Text style={styles.errorText}>{warning}</Text>)
      )} 
    </View>
  );
}

type CustomProps = {
  loggedUser: UserData | null,
  fasterFee: number
}

const MovementForm: React.FC<InjectedFormProps<{}, CustomProps> & CustomProps> = (props) => {
  const { configTheme } = useConfigTheme();
  const styles = useStyles(configTheme);
     // get validators and submitting states from form
     const dispatch = useDispatch();
     const isInvalidd = useSelector((state) => isInvalid('movementForm')(state));
     const isSubmittingg = useSelector((state) => isSubmitting('movementForm')(state));

    return (
      <ScrollView style={{  flex: 1  }}>
          <Field
            name='btcAddress'
            label='BTC Address'
            component={renderField}
            placeholder={'BTC Address'}
            />
          <Field
            name='btcAmount'
            label='BTC Amount to send'
            component={renderField}
            placeholder={'BTC Amount to send'}
            keyboardType={'numeric'}
          />
          <Text style={{ paddingLeft: 15, paddingTop: 5, fontSize: 15 }}>
            {`Network commission: ${props.fasterFee}`}
          </Text>       
          <Button 
            onPress={() => dispatch(submit('movementForm'))} 
            style={{ 
              ...styles.primaryButton, 
              backgroundColor: isInvalidd || isSubmittingg ? configTheme.disabled : configTheme.primaryButton
            }}
            labelStyle={{ fontSize: 12, color: configTheme.textButtonPrimary }}
            loading={false}
            disabled={isInvalidd || isSubmittingg}
          >
            Send BTC
          </Button>
       </ScrollView>
    );
}

// export default Form;
export default reduxForm<{}, CustomProps>({
  form: 'movementForm', // a unique identifier for this form
  validate, // <--- validation function given to redux-form
  warn, // <--- warning function given to redux-form
})(MovementForm)
