/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context'
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/pages/home';
import EmployeeList from './src/pages/empList';
import EmployeeDetails from './src/pages/empDetails';

const App: () => React$Node = () => {
  return (

        <NavigationContainer>
          <MyStack />
        </NavigationContainer>
      // </SafeAreaView>
  );
};

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Employee" component={HomeScreen} />
      <Stack.Screen name="EmpList" component={EmployeeList} />
      <Stack.Screen name="Details" component={EmployeeDetails} />
    </Stack.Navigator>
  );
}
export default App;
