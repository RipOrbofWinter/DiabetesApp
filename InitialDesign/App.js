import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text } from 'react-native';
import Constants from 'expo-constants';

const DATA = [  { id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba', title: 'JoJo', Author: 'Doctor' },
                { id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63', title: 'Bier', Author: 'Patient'},
                { id: '58694a0f-3da1-471f-bd96-145571e29d72', title: 'Third Item', Author: 'Doctor'},
                { id: '58694a0f-3da1-471f-bd96-145571e29d72', title: '4de Item', Author: 'Doctor'},
                { id: '58694a0f-3da1-471f-bd96-145571e29d72', title: 'Wat een lang bericht zeg, zo hé Item', Author: 'Doctor'}
];

function Item({ title, Author, id}) {
  return (
    <View style={styles.item}>
      <Text style={styles.title + styles.Author}>{title}</Text>
      <Text style={styles.Author}>{Author}</Text>
      <Text style={styles.id}>{id}</Text>
    </View>
  );
}

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem = {
          ({ item }) => <Item 
                          title={item.title}
                          Author={item.Author}
                          id={item.id}
                        /> 
        }
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
    backgroundColor: 'black',
  },
  Author: {
    fontSize: 14,
  },
  id: {
    fontSize: 8,
  },
});