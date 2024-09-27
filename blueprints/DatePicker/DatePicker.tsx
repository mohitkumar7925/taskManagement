import React, { useState } from 'react';
import {
  View,
  Button,
  Platform,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { Field, FieldProps } from 'formik';
import { Text } from '../Text/Text';

type DatePickerProps = {
  date?: Date;
  onDateChange?: (selectedDate: Date) => void;
  mode?: 'date' | 'time';
  minimumDate?: Date;
  maximumDate?: Date;
  name: string;
};

export const DatePicker: React.FC<DatePickerProps> = ({
  date,
  onDateChange,
  mode = 'date',
  minimumDate,
  maximumDate,
  name,
}) => {
  const [show, setShow] = useState(false);

  const showDatePicker = () => {
    setShow(true);
  };

  return (
    <Field name={name}>
      {({ meta, form }: FieldProps) => {
        const date = meta?.value ? new Date(meta?.value) : new Date();
        return (
          <View>
            <TouchableOpacity onPress={showDatePicker} style={styles.button}>
              <Text preset="h4">{date.toDateString()}</Text>
            </TouchableOpacity>
            {show && (
              <DateTimePicker
                value={date}
                mode={mode}
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={(event: DateTimePickerEvent, selectedDate?: Date) => {
                  setShow(false);
                  if (selectedDate) {
                    form?.handleChange(name)(selectedDate.toString());
                  }
                }}
                minimumDate={minimumDate}
                maximumDate={maximumDate}
              />
            )}
          </View>
        );
      }}
    </Field>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    justifyContent: 'center',
  },
});
