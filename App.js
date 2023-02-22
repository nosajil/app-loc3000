import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/Home';
import { LogoTitle } from './src/LogoTitle';
import { StatusBar } from 'expo-status-bar';
import CarsList from './src/CarsList';
import CarItem from './src/CarItem'

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#2D4F6C',
          },
          headerTintColor: '#fff',
          headerTitleAlign: "center"
        }}
      >
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerTitle: () => <LogoTitle /> }}
        />
        <Stack.Screen
          name="CarsList"
          component={CarsList}
          options={{
            headerTitle: "Nos véhicules",
            headerBackTitle: "Accueil"
          }}
        />
        <Stack.Screen
          name="CarItem"
          component={CarItem}
          options={({ route }) => ({ title: route.params.item.name, headerBackTitle: "Retour" })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App