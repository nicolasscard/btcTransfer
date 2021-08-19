import React, {  } from 'react';
import { View, ImageSourcePropType, Text, Image} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Header } from '@components/index';
import { headerStyle } from '@components/Header/Header';

import useConfigTheme from '@hooks/useConfigTheme';
import useStyles from './styles';

import { 
  headerTittleTxt, 
  tittleBodyTxt, 
  descriptionBodyTxt, 
  buttonTxt 
} from '@assets/Texts/LinkYourBank';
import { Button } from 'react-native-paper';

import { Props } from '@navigation/stack.navigation';

const bank: ImageSourcePropType = require("@assets/media/bank.png");
const bank2x: ImageSourcePropType = require("@assets/media/bank2x.png");

const LinkYourBank: React.FC<Props> = ({ navigation, route }) => {
  console.log(route);
  const { configTheme } = useConfigTheme();
  const styles = useStyles(configTheme);

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <Header 
          title={headerTittleTxt} 
          headerStyle={headerStyle.violet}
      />
      <View style={{ flex: 1, justifyContent: 'center'  }}>
        <Image source={bank} style={styles.image} />
        <Text style={styles.tittleText}>
          {tittleBodyTxt}
        </Text>        
        <Text style={styles.descriptionText}>
          {descriptionBodyTxt}
        </Text>

 
      </View>
        <Button 
            mode="contained" 
            onPress={() => navigation.navigate('LinkYourBank')} 
            style={styles.button}
            labelStyle={{ fontSize: 12 }}
            loading={false}
            disabled={false}
          >
            {buttonTxt}
          </Button>
    </SafeAreaView>
  )
}

export default LinkYourBank;
