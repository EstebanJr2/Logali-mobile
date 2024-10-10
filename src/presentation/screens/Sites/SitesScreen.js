import { useNavigation } from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { fetchSites } from '../../../services/SitesServices';

const SitesScreen = () => {

  const [sites, setSites] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const loadSites = async () => {
      try {
        const sitesData = await fetchSites();
        console.log('Sites data:', sitesData)
        setSites(sitesData);
      } catch (error) {
        console.error('Error loading sites:', error);
      } finally {
        setIsLoading(false);
      }
    }

    loadSites();
  }, [])

  const renderSitesItem = ({ item }) => (
    <TouchableOpacity
      style={styles.Item}
      onPress={() => navigation.navigate('SitesDetails', { sities: item })}
    >
      <Text style={styles.Text}>{item.Sitio}</Text>
      <Text style={styles.Text}>{item.ID}</Text>
    </TouchableOpacity>
  );

  if (isLoading) {
    return <Text>Cargando Sitios...</Text>
  }
  
  return (
    <View style={styles.container}>
      <FlatList
        data={sites}
        renderItem={renderSitesItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  Item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  Text: {
    fontSize: 16,
    color: 'black'
  },
});


export default SitesScreen;
