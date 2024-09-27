import { useColor } from '@src/context';
import React from 'react';
import { View, StyleSheet, Switch } from 'react-native';
import { Text } from '../Text/Text';

// Define the prop types for the component
interface SwitchButtonProps {
  label?: string; // Optional label for the switch
  value: boolean; // Value for the switch state (on/off)
  onValueChange: (value: boolean) => void; // Callback function when the value changes
  trackColor?: {
    false: string;
    true: string;
  };
  thumbColor?: string;
}

export const SwitchButton: React.FC<SwitchButtonProps> = ({
  label = 'Switch',
  value,
  onValueChange,
  trackColor = { false: '#767577', true: '#999' },
  thumbColor = '#f4f3f4',
}) => {
  const { color } = useColor();
  return (
    <View style={styles.container}>
      <Text preset="h3" style={styles.text}>
        {label}
      </Text>
      <Switch
        trackColor={trackColor}
        thumbColor={value ? '#000' : thumbColor}
        ios_backgroundColor="#3e3e3e"
        onValueChange={onValueChange}
        value={value}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  text: {
    fontSize: 14,
    marginRight: 10,
  },
});
