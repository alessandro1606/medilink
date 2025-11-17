import ExamsView from './view/ExamsView.js';
import HomeView from './view/HomeView.js';
import PlanosView from './view/PlanosView.js';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator ();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={defaultOptions}>
        <Stack.Screen name="home" component={HomeView} options={homeOptions} />
        <Stack.Screen name="exams" component={ExamsView} options={examsOptions} />
        <Stack.Screen name="planos" component={PlanosView} options={examsOptions} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const defaultOptions = {
  headerStyle: {
    backgroundColor: '#24CBAF',
  },
  headerTintColor: 'blue',
};

const homeOptions = {
  headerShown: false,
};

const examsOptions = {
  title: 'Exames',
};