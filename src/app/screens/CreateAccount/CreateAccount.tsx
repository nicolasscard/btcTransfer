import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator} from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@core/Redux/store';
import { asyncSaveAccount } from './AccountSlice';

import useConfigTheme from '@hooks/useConfigTheme';
import useStyles from './styles';

import { Props } from '@navigation/stack.navigation';

import { Header, } from '@components/index';
import { headerStyle } from '@components/Header/Header';

import { Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { submit, isInvalid, isSubmitting } from 'redux-form';

import { 
  headerTittleTxt, 
  headerDescriptionTxt, 
  descriptionBottomTxt, 
  termsTxt,
  buttonTxt
 } from '@assets/Texts/CreateAccount';

import CreateAccountForm from './CreateAccountForm';

const CreateAccount: React.FC<Props> = ({ navigation, route }) => {
  //get redux values
  const loading = useSelector((state: RootState) => state.account.loading);
  const error = useSelector((state: RootState) => state.account.error);
  const account = useSelector((state: RootState) => state.account.account);
  const dispatch = useDispatch();
  
  useEffect(() => { 
    if (!loading && error == undefined &&
      account.email != '' && account.firstName != '' && account.lastName != '' && account.password != '' 
      ) {
      navigation.navigate('LinkYourBank');
    }
  }, [error, loading, account]);
  
  //get theme values
  const { configTheme } = useConfigTheme();
  const styles = useStyles(configTheme);
  
  // get validators and submitting states from form
  const isInvalidd = useSelector((state) => isInvalid('Form')(state));
  const isSubmittingg = useSelector((state) => isSubmitting('Form')(state));

  const onSubmit = async (values: any) => {
    await dispatch(asyncSaveAccount(values));
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <Header 
       title={headerTittleTxt} 
       description={headerDescriptionTxt} 
       headerStyle={headerStyle.blue}
      />

       <View style={{ padding: 25, flex: 1, justifyContent: 'space-between' }}>
        <CreateAccountForm onSubmit={onSubmit} />

        <View style={styles.bottomView}>
          <Text style={styles.descriptionText}>
            {descriptionBottomTxt}
            <Text
              onPress={() => navigation.navigate('Terms')} 
              style={{ ...styles.descriptionText, color: configTheme.primary}}>
              {termsTxt}
            </Text>
          </Text> 
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
            {buttonTxt}
          </Button>
        </View>     
      </View> 
      {loading &&
        <ActivityIndicator 
        size="large" 
        color={configTheme.primary} 
        style={styles.loader}
        />
      }
    </SafeAreaView>
  );
}

export default CreateAccount;
