import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import { contents, useColor } from '@src/context';
import {
  Palette,
  scaled,
  scaledSize,
  scaleHeight,
  scaleWidth,
} from '@src/utils';
import { AnimatedTouchableOpacity, Text } from '@app/blueprints';
import { Icons, SVGIcons } from '@src/assets';
import { Icon, SvgIcon } from '../AppIcon/AppIcon';
import Header from '../Header/Header';

export type BaseLayoutProps = React.PropsWithChildren & {
  style?: StyleProp<ViewStyle>;
};

export const BaseLayout = React.memo(({ children, style }: BaseLayoutProps) => {
  const { appTheme, color } = useColor();
  const styles = baseLayoutStyles(color);

  return (
    <SafeAreaView style={[styles.safeAreaStyle, style]}>
      <StatusBar
        barStyle={appTheme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={color.backgroundColor}
      />
      {children}
    </SafeAreaView>
  );
});

export const baseLayoutStyles = ({ backgroundColor, primaryColor }: Palette) =>
  StyleSheet.create({
    safeAreaStyle: {
      backgroundColor: backgroundColor,
      flex: 1,
    },
    debugIcon: {
      ...scaled(25),
      tintColor: primaryColor,
    },
    headerContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: scaleHeight(10),
    },
    headerLabelContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    newsImage: {
      borderRadius: scaledSize(5),
      height: scaleHeight(95),
      width: scaleWidth(120),
    },
    newsItemContainer: {
      backgroundColor,
      borderRadius: scaledSize(5),
      flex: 1,
      flexDirection: 'row',
      marginBottom: scaleHeight(5),
      marginTop: scaleHeight(5),
    },
    newsTextView: {
      flex: 1,
      padding: scaledSize(5),
    },
    settingBtn: {
      position: 'absolute',
      left: scaleWidth(20),
    },
  });
