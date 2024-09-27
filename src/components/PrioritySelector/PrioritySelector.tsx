import React, { useState, useEffect, useCallback } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useFormikContext } from 'formik';
import { Text } from '@app/blueprints';

type PrioritySelectorProps = {
  name: string;
};

const priorities = [
  { label: 'Low', value: 'low' },
  { label: 'Medium', value: 'medium' },
  { label: 'High', value: 'high' },
];

const PrioritySelector: React.FC<PrioritySelectorProps> = ({ name }) => {
  const { values, setFieldValue, touched, errors } = useFormikContext<any>();
  const [selectedValue, setSelectedValue] = useState(
    values[name] || priorities[0]?.value
  );

  const handleSelect = useCallback(
    (priorityValue: string) => {
      setSelectedValue(priorityValue);
      setFieldValue(name, priorityValue);
    },
    [name, setFieldValue]
  );

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select Priority:</Text>
      <View style={styles.optionsContainer}>
        {priorities.map(priority => (
          <TouchableOpacity
            key={priority.value}
            activeOpacity={0.8}
            style={[
              styles.option,
              selectedValue === priority.value && styles.selectedOption,
            ]}
            onPress={() => handleSelect(priority.value)}>
            <Text
              style={[
                styles.optionText,
                selectedValue === priority.value && styles.selectedOptionText,
              ]}>
              {priority.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {touched[name] && errors[name] ? (
        <Text style={styles.error}>{errors[name] as string}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  label: {
    marginBottom: 5,
    fontSize: 16,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  option: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ccc',
    backgroundColor: '#f0f0f0',
  },
  selectedOption: {
    backgroundColor: '#007bff',
    borderColor: '#007bff',
  },
  optionText: {
    color: '#000',
    fontSize: 16,
  },
  selectedOptionText: {
    color: '#fff',
  },
  error: {
    fontSize: 12,
    color: 'red',
    marginTop: 5,
  },
});

export default PrioritySelector;

// import React, { useState } from 'react';
// import { View, TouchableOpacity, StyleSheet } from 'react-native';
// import { Field, FieldProps } from 'formik';
// import { Text } from '@app/blueprints';

// type PrioritySelectorProps = {
//   name: string;
// };

// const priorities = [
//   { label: 'Low', value: 'low' },
//   { label: 'Medium', value: 'medium' },
//   { label: 'High', value: 'high' },
// ];

// const PrioritySelector: React.FC<PrioritySelectorProps> = ({ name }) => {
//   const [selectedValue, setSelectedValue] = useState(priorities[0]?.value);
//   return (
//     <Field name={name}>
//       {({ form, meta }: FieldProps) => (
//         <View style={styles.container}>
//           <Text style={styles.label}>Select Priority:</Text>
//           <View style={styles.optionsContainer}>
//             {priorities.map(priority => (
//               <TouchableOpacity
//                 key={priority.value}
//                 activeOpacity={0.8}
//                 style={[
//                   styles.option,
//                   selectedValue === priority.value && styles.selectedOption,
//                 ]}
//                 onPress={() => {
//                   setSelectedValue(priority.value);
//                   form?.handleChange(name)(priority.value);
//                 }}>
//                 <Text
//                   style={[
//                     styles.optionText,
//                     selectedValue === priority.value &&
//                       styles.selectedOptionText,
//                   ]}>
//                   {priority.label}
//                 </Text>
//               </TouchableOpacity>
//             ))}
//           </View>
//           {meta.touched && meta.error ? (
//             <Text style={styles.error}>{meta.error}</Text>
//           ) : null}
//         </View>
//       )}
//     </Field>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     marginVertical: 10,
//   },
//   label: {
//     marginBottom: 5,
//     fontSize: 16,
//   },
//   optionsContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     marginTop: 10,
//   },
//   option: {
//     padding: 10,
//     borderWidth: 1,
//     borderRadius: 5,
//     borderColor: '#ccc',
//     backgroundColor: '#f0f0f0',
//   },
//   selectedOption: {
//     backgroundColor: '#007bff',
//     borderColor: '#007bff',
//   },
//   optionText: {
//     color: '#000',
//     fontSize: 16,
//   },
//   selectedOptionText: {
//     color: '#fff',
//   },
//   error: {
//     fontSize: 12,
//     color: 'red',
//     marginTop: 5,
//   },
// });

// export default PrioritySelector;
