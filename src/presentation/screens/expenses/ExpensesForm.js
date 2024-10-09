import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import * as ImagePicker from 'expo-image-picker';
import { Dropdown } from 'react-native-element-dropdown';
import DateTimePicker from '@react-native-community/datetimepicker';
import LocationC from '../../componets/LocationC';
import { fetchSitios, fetchTipoGastos, createGasto } from '../../../services/ExpensesService';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';

const validationSchema = Yup.object().shape({
  fecha: Yup.string().required('Fecha es requerida'),
  hora: Yup.string().required('Hora es requerida'),
  tipoGastos: Yup.string().required('Tipo de gastos es requerido'),
  costos: Yup.number().required('Costos son requeridos').positive('Debe ser un número positivo').integer('Debe ser un número entero'),
  sitio: Yup.string().required('Sitio es requerido'),
  descripcion: Yup.string().required('Descripción es requerida'),
  localizacion: Yup.string().required('Localización es requerida'),
  comprobantes: Yup.array().min(1, 'Se requiere al menos una imagen'), 
});

const FormExpenses = () => {
  const [isFocus, setIsFocus] = useState(false);
  const [sitios, setSitios] = useState([]);
  const [tiposGastos, setTiposGastos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const sitiosData = await fetchSitios();
        const tiposGastosData = await fetchTipoGastos();
        setSitios(sitiosData);
        setTiposGastos(tiposGastosData);
      } catch (error) {
        console.error('Error loading initial data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialData();
  }, []);

  const handleImagePicker = async (setFieldValue, currentUris) => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    const galleryPermissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
  
    if (permissionResult.granted && galleryPermissionResult.granted) {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        allowsMultipleSelection: true, 
      });
  
      if (!result.canceled) {
        const newUris = result.assets.map(asset => asset.uri); 
        setFieldValue('comprobantes', [...currentUris, ...newUris]); 
      }
    } else {
      alert('Se requieren permisos para acceder a la cámara y galería.');
    }
  };

  const handleSubmitForm = async (values) => {
    try {
      const formData = new FormData();
      formData.append('fecha', values.fecha);
      formData.append('hora', values.hora);
      formData.append('tipoGastos', values.tipoGastos);
      formData.append('costos', values.costos);
      formData.append('sitio', values.sitio);
      formData.append('descripcion', values.descripcion);
      formData.append('localizacion', values.localizacion);

      // Enviar cada comprobante como un archivo
      values.comprobantes.forEach((uri, index) => {
        formData.append(`comprobantes[${index}]`, {
          uri,
          type: 'image/jpeg',
          name: `image${index}.jpg`, 
        });
      });

      const response = await createGasto(formData); 
      console.log('Gasto creado:', response);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Formik
          initialValues={{
            fecha: '',
            hora: '',
            tipoGastos: '',
            costos: '',
            sitio: '',
            comprobantes: [], 
            descripcion: '',
            localizacion: '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmitForm}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => (
            <View style={styles.container}>
              <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                <View style={styles.inputContainer}>
                  <TextInput
                    placeholder="Seleccione fecha"
                    value={values.fecha}
                    onBlur={handleBlur('fecha')}
                    editable={false}
                    style={styles.backgroundInput}
                  />
                </View>
              </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  value={new Date()}
                  mode="date"
                  display="default"
                  onChange={(event, selectedDate) => {
                    const currentDate = selectedDate || new Date();
                    setFieldValue('fecha', currentDate.toISOString().split('T')[0]);
                    setShowDatePicker(false);
                  }}
                />
              )}
              {errors.fecha && touched.fecha && <Text style={styles.error}>{errors.fecha}</Text>}

              <TouchableOpacity onPress={() => setShowTimePicker(true)}>
                <View style={styles.inputContainer}>
                  <TextInput
                    placeholder="Seleccione hora"
                    value={values.hora}
                    onBlur={handleBlur('hora')}
                    editable={false}
                    style={styles.backgroundInput}
                  />
                </View>
              </TouchableOpacity>
              {showTimePicker && (
                <DateTimePicker
                  value={new Date()}
                  mode="time"
                  display="default"
                  onChange={(event, selectedTime) => {
                    const currentTime = selectedTime || new Date();
                    setFieldValue('hora', currentTime.toLocaleTimeString());
                    setShowTimePicker(false);
                  }}
                />
              )}
              {errors.hora && touched.hora && <Text style={styles.error}>{errors.hora}</Text>}

              <Dropdown
                placeholder="Seleccione tipo de gastos"
                data={tiposGastos.map(tipo => ({ label: tipo.nombre, value: tipo.id }))}
                labelField="label"
                valueField="value"
                value={values.tipoGastos}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                  setFieldValue('tipoGastos', item.value);
                  setIsFocus(false);
                }}
                style={[styles.dropdown, { zIndex: 100 }]}
                search
              />
              {errors.tipoGastos && touched.tipoGastos && <Text style={styles.error}>{errors.tipoGastos}</Text>}

              <View style={[styles.searchSection, styles.backgroundInput]}>
                <Text style={styles.Icon}>$</Text>
                <TextInput
                  placeholder="Costos"
                  onChangeText={handleChange('costos')}
                  onBlur={handleBlur('costos')}
                  value={values.costos}
                  keyboardType="numeric"
                />
              </View>
              {errors.costos && touched.costos && <Text style={styles.error}>{errors.costos}</Text>}

              <Dropdown
                placeholder="Seleccione sitio"
                data={sitios.map(sitio => ({ label: sitio.nombre, value: sitio.id }))}
                labelField="label"
                valueField="value"
                value={values.sitio}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                  setFieldValue('sitio', item.value);
                  setIsFocus(false);
                }}
                style={[styles.dropdown, { zIndex: 100 }]}
                search
              />
              {errors.sitio && touched.sitio && <Text style={styles.error}>{errors.sitio}</Text>}

              <TextInput
                placeholder="Descripción"
                onChangeText={handleChange('descripcion')}
                onBlur={handleBlur('descripcion')}
                value={values.descripcion}
                style={styles.backgroundInput}
              />
              {errors.descripcion && touched.descripcion && <Text style={styles.error}>{errors.descripcion}</Text>}

              <TouchableOpacity onPress={() => handleImagePicker(setFieldValue, values.comprobantes)}>
                <View style={[styles.searchSection, styles.backgroundInput, styles.center, styles.borderRadius]}>
                  <TextInput
                    placeholder="Seleccionar archivos"
                    value={values.comprobantes.length > 0 ? `${values.comprobantes.length} imágenes seleccionadas` : ''}
                    editable={false}
                  />
                  <AntDesign
                    style={[styles.Icon, styles.paddingLeft_10]}
                    color={isFocus ? 'blue' : 'black'}
                    name="upload"
                    size={20}
                  />
                </View>
              </TouchableOpacity>
              {values.comprobantes.map((uri, index) => (
                <Image key={index} source={{ uri }} style={styles.imagePreview} />
              ))}

              <LocationC />

              <Button onPress={handleSubmit} title="Enviar" />
            </View>
          )}
        </Formik>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    gap: 20,
  },
  paddingLeft_10: {
    paddingLeft: 10,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    color: 'red',
  },
  borderRadius: {
    borderRadius: 10,
  },
  imagePreview: {
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
    borderWidth: 0.3,
    borderRadius: 8,
    paddingHorizontal: 8,
    zIndex: 100,
  },
  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  Icon: {
    paddingRight: 5,
    color: 'black',
    fontWeight: 'bold',
  },
  contentContainer: {
    paddingBottom: 20,
  },
});

export default FormExpenses;
