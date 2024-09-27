import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Icon, SvgIcon } from '../AppIcon/AppIcon';
import { contents, useAuth, useColor } from '@src/context';
import { Icons, SVGIcons } from '@src/assets';
import {
  Palette,
  scaled,
  scaledSize,
  scaleHeight,
  scaleWidth,
} from '@src/utils';
import { AnimatedTouchableOpacity, Text } from '@app/blueprints';
import { TxKeyPath } from '@src/i18n';

interface HeaderProps {
  onRightPress?: () => void;
  rightIcon?: Icons;
  title?: TxKeyPath;
}

const Header: React.FC<HeaderProps> = ({
  onRightPress,
  rightIcon,
  title = 'todo.todoHeader',
}) => {
  const { color } = useColor();
  const styles = headerStyles(color);
  const { logout } = useAuth();

  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerLabelContainer}>
        <SvgIcon
          pathFill={color.primaryColor}
          icon={SVGIcons.SYMBOL}
          {...scaled(25)}
        />
        <Text preset="h1"> {contents(title)}</Text>
      </View>
      {rightIcon && (
        <AnimatedTouchableOpacity
          onPress={onRightPress}
          containerStyle={styles.rightIcon}>
          <SvgIcon
            icon={SVGIcons.ADDCIRCLE}
            pathFill={color.primaryColor}
            {...scaled(25)}
          />
        </AnimatedTouchableOpacity>
      )}
      <AnimatedTouchableOpacity
        onPress={logout}
        containerStyle={styles.leftIcon}>
        <SvgIcon
          icon={SVGIcons.LOGOUT}
          pathFill={color.primaryColor}
          {...scaled(24)}
        />
      </AnimatedTouchableOpacity>
    </View>
  );
};

export const headerStyles = ({ backgroundColor, primaryColor }: Palette) =>
  StyleSheet.create({
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
    rightIcon: {
      position: 'absolute',
      right: scaleWidth(20),
    },
    leftIcon: {
      position: 'absolute',
      left: scaleWidth(20),
    },
  });

export default Header;
