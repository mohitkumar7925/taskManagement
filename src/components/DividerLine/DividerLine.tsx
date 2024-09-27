// DividerLine.tsx
import { useColor } from '@src/context';
import { scaleHeight, screenWidth } from '@src/utils';
import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

interface DividerLineProps {
  color?: string;
  thickness?: number;
  marginVertical?: number;
}

const DividerLine: React.FC<DividerLineProps> = ({
  thickness = 2,
  marginVertical = scaleHeight(20),
}) => {
  const { color } = useColor();
  return (
    <View
      style={[
        styles.divider,
        {
          backgroundColor: color.borderColor,
          height: thickness,
          marginVertical,
          width: screenWidth,
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  divider: {
    alignSelf: 'center',
  },
});

export default DividerLine;
