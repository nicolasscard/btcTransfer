import React from 'react';
import { View, ImageSourcePropType, Text, Image} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '@components/index';
import { headerStyle } from '@components/Header/Header';
import useConfigTheme from '@hooks/useConfigTheme';
import useStyles from './styles';
import { headerTittleTxt, descriptionBodyTxt } from '@assets/Texts/Terms';
import { Props } from '@navigation/stack.navigation';

const illustrationMoney: ImageSourcePropType = require("@assets/media/illustrationMoney.png");
const flyingMoney: ImageSourcePropType = require("@assets/media/flyingMoney.png");

const Terms: React.FC<Props> = ({ navigation, route }) => {
  const { configTheme } = useConfigTheme();
  const styles = useStyles(configTheme);
  
  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
            <Header 
        title={headerTittleTxt} 
        headerStyle={headerStyle.violet}
        navigation={navigation}
    />
      <View style={{ paddingVertical: 30, justifyContent: 'center'  }}>
        <Image source={illustrationMoney} style={styles.image} />
        <Image
          source={flyingMoney}
          style={{ ...styles.image, position: 'absolute' }}
        />
      </View>
      <Text style={styles.descriptionText}>
        {descriptionBodyTxt}
      </Text>
    </SafeAreaView>
  )
}

export default Terms;
