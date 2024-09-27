import { StyleSheet } from 'react-native';

import { Palette, scaledSize, scaleHeight, scaleWidth } from '@src/utils';

export const loginStyles = ({ backgroundColor, textColor, red }: Palette) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      flex: 1,
      justifyContent: 'center',
    },
    content: {
      backgroundColor: backgroundColor,
      borderRadius: scaledSize(30),
      flex: 2,
      paddingHorizontal: scaleWidth(15),
      paddingTop: scaleHeight(25),
      top: -scaleHeight(25),
    },
    fieldContainer: {},
    header: {
      backgroundColor: textColor,
      flex: 1,
    },
    inputContainer: {
      marginVertical: scaleHeight(10),
    },
    input: {
      color: textColor,
    },
    loginBtn: {
      marginTop: scaleHeight(15),
    },
    signupBtn: {
      marginTop: scaleHeight(15),
      backgroundColor: red,
    },
  });
