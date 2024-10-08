import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import * as ImagePicker from 'expo-image-picker';
import { Dropdown } from 'react-native-element-dropdown';
import { AntDesign } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import LocationC from '../../componets/LocationC';

const validationSchema = Yup.object().shape({
  fecha: Yup.string().required('Fecha es requerida'),
  hora: Yup.string().required('Hora es requerida'),
  tipoGastos: Yup.string().required('Tipo de gastos es requerido'),
  costos: Yup.number().required('Costos son requeridos').positive().integer(),
  sitio: Yup.string().required('Sitio es requerido'),
  descripcion: Yup.string().required('Descripción es requerida'),
  localizacion: Yup.string().required('Localización es requerida'),
});

const ExpensesScreen = () => {
  const [isFocus, setIsFocus] = useState(false);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [latitud, setLatitud] = useState('');
  const [longitud, setLongitud] = useState('');

  const handleImagePicker = async (setFieldValue) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setFieldValue('comprobante', result.assets[0].uri);
    }
  };

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const handleLocationSelect = (coords) => {
    console.log('Selected location:', coords);
  };

  return (
    <Formik
      initialValues={{
        fecha: '',
        hora: '',
        tipoGastos: '',
        costos: '',
        sitio: '',
        comprobante: '',
        descripcion: '',
        localizacion: '',
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => console.log(values)}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => (
        <View style={styles.container}>

          {showDatePicker && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                onChangeDate(event, selectedDate);
                setFieldValue('fecha', selectedDate ? selectedDate.toLocaleDateString() : '');
              }}
            />
          )}

          <TextInput
            value={values.fecha || "Fecha"}
            style={styles.backgroundInput}
            onFocus={() => setShowDatePicker(true)}
          />
          {errors.fecha && touched.fecha && <Text style={styles.error}>{errors.fecha}</Text>}

          <TextInput
            placeholder="Hora"
            onChangeText={handleChange('hora')}
            onBlur={handleBlur('hora')}
            value={values.hora}
            style={styles.backgroundInput}
          />
          {errors.hora && touched.hora && <Text style={styles.error}>{errors.hora}</Text>}

          <Dropdown
            placeholder="Seleccione tipo de gastos"
            data={[
              { label: 'Alimentación', value: 'alimentacion' },
              { label: 'Transporte', value: 'transporte' },
              { label: 'Hospedaje', value: 'hospedaje' },
            ]}
            labelField="label"
            valueField="value"
            value={values.tipoGastos}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              handleChange('tipoGastos')(item.value);
              setIsFocus(false);
            }}
            style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
            searchPlaceholder="Buscar..."
            search
            renderLeftIcon={() => (
              <AntDesign
                style={styles.icon}
                color={isFocus ? 'blue' : 'black'}
                name="Safety"
                size={20}
              />
            )}
          />
          {errors.tipoGastos && touched.tipoGastos && <Text style={styles.error}>{errors.tipoGastos}</Text>}

          <View style={[styles.searchSection, styles.backgroundInput]}>
            <Text style={styles.searchIcon}>$</Text>
            <TextInput
              placeholder="Costos"
              keyboardType="numeric"
              onChangeText={handleChange('costos')}
              onBlur={handleBlur('costos')}
              value={values.costos}
              style={[styles.input]}
            />
          </View>
          {errors.costos && touched.costos && <Text style={styles.error}>{errors.costos}</Text>}

          <Dropdown
            placeholder="Sitio"
            data={[
              { label: 'Sitio 1', value: 'sitio1', lat: '37.78825', lng: '-122.4324' },
              { label: 'Sitio 2', value: 'sitio2', lat: '37.78835', lng: '-122.4320' },
              { label: 'Sitio 3', value: 'sitio3', lat: '37.78845', lng: '-122.4315' },
            ]}
            labelField="label"
            valueField="value"
            value={values.sitio}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              handleChange('sitio')(item.value);
              setLatitud(item.lat); 
              setLongitud(item.lng); 
              setIsFocus(false);
            }}
            style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
            searchPlaceholder="Buscar..."
            search
            renderLeftIcon={() => (
              <AntDesign
                style={styles.icon}
                color={isFocus ? 'blue' : 'black'}
                name="Safety"
                size={20}
              />
            )}
          />
          {errors.sitio && touched.sitio && <Text style={styles.error}>{errors.sitio}</Text>}

          <Button title="Subir comprobante   +" onPress={() => handleImagePicker(setFieldValue)} />
          {values.comprobante ? (
            <Image source={{ uri: values.comprobante }} style={styles.image} />
          ) : null}

          <TextInput
            placeholder="Descripción"
            onChangeText={handleChange('descripcion')}
            onBlur={handleBlur('descripcion')}
            value={values.descripcion}
            style={styles.backgroundInput}
          />
          {errors.descripcion && touched.descripcion && <Text style={styles.error}>{errors.descripcion}</Text>}

          <TextInput
            placeholder="Localización"
            onChangeText={handleChange('localizacion')}
            onBlur={handleBlur('localizacion')}
            value={values.localizacion}
            style={styles.backgroundInput}
          />
          {errors.localizacion && touched.localizacion && <Text style={styles.error}>{errors.localizacion}</Text>}

          <LocationC onLocationSelect={handleLocationSelect} />

          <Button onPress={handleSubmit} title="Enviar" />
        </View>
      )}
      
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    gap: 20,
  },
  error: {
    color: 'red',
  },
  image: {
    width: 100,
    height: 100,
    marginVertical: 10,
  },
  backgroundInput: {
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#dfe8ef',
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  searchSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchIcon: {
    padding: 5,
  },
  input: {
    flex: 1,
    backgroundInput: '#fff',
    color: '#424242',
  },
});

export default ExpensesScreen;
