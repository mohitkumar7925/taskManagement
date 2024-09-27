import { StyleSheet } from 'react-native';

import {
  Palette,
  scaled,
  scaledSize,
  scaleHeight,
  scaleWidth,
} from '@src/utils';

export const todoListStyles = ({
  backgroundColor,
  borderColor,
  secondaryColor,
  primaryColor,
  cardColor,
}: Palette) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: scaleWidth(10),
    },
    contentContainer: {
      paddingBottom: 40,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    header: {
      fontWeight: 'bold',
      marginBottom: scaleHeight(10),
    },
    todoCard: {
      backgroundColor: cardColor,
      padding: scaleWidth(10),
      borderRadius: scaledSize(10),
      marginTop: scaleHeight(10),
    },
    todoText: {
      fontSize: scaledSize(18),
      fontWeight: 'bold',
      marginTop: 5,
      marginBottom: scaleHeight(10),
    },
    todoDescription: {
      marginBottom: scaleHeight(20),
    },
    buttons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    button: {
      flexDirection: 'row',
      backgroundColor: backgroundColor,
      padding: scaleWidth(8),
      borderRadius: scaledSize(8),
      alignItems: 'center',
      // flex: 1,
      // marginRight: scaleWidth(10),
      borderColor: borderColor,
      borderWidth: 1.5,
      justifyContent: 'center',
    },
    buttonText: {
      fontSize: scaledSize(15),
      marginLeft: scaleWidth(10),
    },
  });
