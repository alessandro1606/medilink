import { Image, StyleSheet, Text, View } from 'react-native';

export default function HeaderView() {
  return (
    <View style={styles.header}>
      <Image style={styles.img} source={require('../../assets/images/logo.jpg')} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    backgroundColor: '#A7C7E7',
    padding: 30,
    elevation: 11,
    gap: 10,
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    color: 'white',
  },
  img: {
    width: 120,
    height: 120,
    borderRadius: 100,
  },
});