import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  ActivityIndicator,
  Alert,
  Dimensions,
  SafeAreaView,
} from 'react-native';

interface Post {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const Width = Dimensions.get('screen').width * 0.9;

const App: React.FC = () => {
  const [data, setData] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [textInputValue, setTextInputValue] = useState<string>('');

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(json => {
        console.log(json);
        setData(json);
        setLoading(false);
      })
      .catch(error => {
        console.error('API Error:', error);
        setLoading(false);
      });
  }, []);

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.text}>Hello, React Native!</Text>

        <Button
          title="React Native Button"
          onPress={() => Alert.alert('Pressed Button!')}
        />

        <TouchableOpacity
          style={styles.touchableOpacityButton}
          activeOpacity={0.5}
          onPress={() => Alert.alert('Pressed TouchableOpacity Button!')}>
          <Text style={styles.touchableOpacityButtonText}>
            TouchableOpacity Button
          </Text>
        </TouchableOpacity>

        <Image
          source={{uri: 'https://via.placeholder.com/200'}}
          // source={require('<Your Local Path>')}
          style={styles.image}
        />

        {textInputValue.length !== 0 ? (
          <View>
            <Text>{textInputValue}</Text>
          </View>
        ) : (
          <View>
            <Text>Please enter value in TextInput</Text>
          </View>
        )}

        <TextInput
          style={styles.textInput}
          placeholder="Enter value."
          value={textInputValue}
          onChangeText={text => setTextInputValue(text)}
        />

        {loading ? (
          <ActivityIndicator
            size="large"
            color="green"
            style={styles.spinner}
          />
        ) : (
          <View style={styles.dataContainer}>
            {data.map(post => (
              <View key={post.id} style={styles.postObje}>
                <Text style={styles.postObjeText}>{post.title}</Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  touchableOpacityButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  touchableOpacityButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  image: {
    width: 200,
    height: 200,
    marginVertical: 10,
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 4,
    marginVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
    width: Width / 1.5,
  },
  spinner: {
    marginVertical: 20,
  },
  dataContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  postObjeText: {
    fontSize: 16,
    marginVertical: 5,
    color: 'black',
    letterSpacing: 1.8,
  },
  postObje: {
    width: Width,
    marginVertical: 5,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'black',
  },
});

export default App;
