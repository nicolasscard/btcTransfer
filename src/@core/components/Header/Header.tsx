import React from 'react';
import { View, Text, ImageSourcePropType, ImageBackground, StatusBar, Platform } from 'react-native';
import useConfigTheme from '@hooks/useConfigTheme';
import {useStyles} from './styles';
import LinearGradient from 'react-native-linear-gradient';
import { Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

const backgroundImg2x: ImageSourcePropType = require("@assets/media/background2x.png");

interface Props {
  title?: String,
  description?: String,
  headerStyle: headerStyle,
  leaderLeft?: React.ReactNode,
  navigation?: any
 }

 export enum headerStyle {
  "blue",
  "violet"
}

const Header: React.FC<Props> = (Props) => {
  const { configTheme } = useConfigTheme();
  const styles = useStyles(configTheme);
  const isBlue = Props.headerStyle == headerStyle.blue;
  const height = isBlue ? (Platform.OS == 'ios' ? 170 : 150) : (Platform.OS == 'ios' ? 95 : 75);

  const statusBar = () => {
    const grandientColor = isBlue ? configTheme.gradientBlue : configTheme.gradientViolet;

    return (
      <LinearGradient 
        start={{x: 0, y: 0}} end={{x: 1, y: 0}}
        colors={grandientColor}  
        style={styles.statusBar}
      >
        <StatusBar 
          translucent={true} 
          backgroundColor={'transparent'} 
          barStyle={'light-content'}
        />
      </LinearGradient >
    );
  }

  const headerChilds = () => {
    return (
      <View style={{ flexDirection: 'row', paddingTop: Platform.OS == 'android' ? 5 : 0 }}>
        <View style={styles.view}>
            {Props.navigation &&
              <Button 
                onPress={() => Props.navigation.goBack()} 
                style={{ alignItems: 'center', justifyContent: 'center',  }}
                loading={false}
                disabled={false}
                icon={() => <Icon name="arrow-back-ios" size={20} color="white" />}
                >
                </Button>
            }
        </View>
        <View style={{  flex: 0.8, }}>
          <Text style={styles.title}> {Props.title} </Text>
          
          {Props.description &&
            <Text style={styles.descriptionText}>
              {Props.description}
            </Text>
          }
        </View>
      </View>
    );
  }
  
  
  return (
    <View style={{ height: height  }}> 
      {statusBar()}

      {isBlue
        ? <ImageBackground 
            source={backgroundImg2x}
            style={{ flex: 1 }}
          >
            <View style={styles.imageBackgroundView}>
              {headerChilds()}
            </View>
          </ImageBackground>
        : <LinearGradient 
            start={{x: 0, y: 0}} end={{x: 1, y: 0}}
            colors={configTheme.gradientViolet}  
            style={{ flex: 1 }}
          >
            <View style={{ flex: 1, justifyContent: 'flex-start' }}>
              {headerChilds()}
            </View>
          </LinearGradient>
      }
    </View>
  );
}

export default Header;
