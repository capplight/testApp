import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import {Auth} from 'aws-amplify';
import CustomNav from '../../components/CustomNav';

const HomeScreen = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const url = 'https://jsonplaceholder.typicode.com/posts ';

  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(json => setData(json))
      .catch(error => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <CustomNav />
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        {loading ? (
          <Text>Loading...</Text>
        ) : (
          data.map(post => (
            <View style={styles.container}>
              <Text style={styles.title}>{post.title}</Text>
              <Text style={styles.body}>{post.body}</Text>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    height: 300,
    width: 350,
    borderWidth: 5,
    borderColor: 'blue',
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 5,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  body: {
    fontSize: 15,
    color: 'blue',
  },
});

export default HomeScreen;
