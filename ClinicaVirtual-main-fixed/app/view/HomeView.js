import { View, StyleSheet } from 'react-native';
import Button from '../components/Button.js';
import Header from './HeaderView.js';

export default function HomeView({ navigation }) {
  return (
    <View style={styles.container}>
      <Header />

      <View style={styles.buttons}>
        <Button
          title="exames"
          color="#1F3B73"
          onPress={() => navigation.navigate('exams')}
        />
        <Button
          title="Planos disponíveis"
          color="#1F3B73"
          onPress={() => navigation.navigate('planos')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E2EFF9', // fundo alterado
  },
  buttons: {
    justifyContent: 'space-evenly',
    flex: 1,
    padding: 20,
  },
});
