import React from 'react';
import { ImageSourcePropType, Image, StyleProp, ImageStyle } from 'react-native';
import useConfigTheme from '@hooks/useConfigTheme';
import useStyles from './styles';

interface Props { 
  source: ImageSourcePropType,
  tintColor?: string,
  focus?: boolean,
  style?: StyleProp<ImageStyle>
}

const ImageIcon: React.FC<Props> = (Props) => {
  const { configTheme } = useConfigTheme();
  const styles = useStyles(configTheme);

  return (
    <Image
      source={Props.source}
      style={{ 
        ...styles.image, 
        tintColor: Props.focus ? configTheme.textSecondary : configTheme.disabled 
      }}
    />
  );
}

export default ImageIcon;
