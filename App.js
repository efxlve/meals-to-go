import { StatusBar, SafeAreaView, StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.search}>
          <Text>search</Text>
        </View>
        <View style={styles.list}>
          <Text>list</Text>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    marginTop: StatusBar.currentHeight
  },
  search : {
    padding: 16, 
    backgroundColor: "green" 
  },
  list: {
    flex: 1, 
    padding: 16, 
    backgroundColor: "blue"
  }
});
