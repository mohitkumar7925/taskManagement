import { ColorSchemeName } from 'react-native';

export const color = {
  dark: {
    backgroundColor: '#212121', // light grey
    primaryColor: '#00a0c0', // bright blue
    secondaryColor: '#dcdcdc', // dark grey
    textColor: '#f8f9fa', // off-white
    textSecondaryColor: '#212121',
    borderColor: '#EBEAED',
    red: 'red',
    textLightColor: '#6c757d',
    cardColor: '#ADD8E6',
  },
  light: {
    backgroundColor: '#f8f9fa', // grey
    primaryColor: '#00a0c0', // blue
    secondaryColor: '#6c757d', // off-white
    textColor: '#343a40', // dark grey
    textSecondaryColor: '#f8f9fa',
    borderColor: '#EBEAED',
    red: 'red',
    textLightColor: '#6c757d',
    cardColor: '#ADD8E6',
  },
};

export type Palette = (typeof color)[keyof typeof color];

export type Theme = ColorSchemeName | keyof typeof color;
