import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import Layar
import KalkulatorScreen from './screens/KalkulatorScreen';
import DetailScreen from './screens/DetailScreen';

// Membuat Stack Navigator
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    // NavigationContainer harus membungkus seluruh struktur navigasi
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Kalkulator"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#1E90FF',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        {/* Layar 1: Kalkulator */}
        <Stack.Screen 
          name="Kalkulator" 
          component={KalkulatorScreen} 
          options={{ title: 'Hitung IMT' }}
        />
        
        {/* Layar 2: Detail Hasil */}
        <Stack.Screen 
          name="Detail" 
          component={DetailScreen} 
          options={{ title: 'Rincian IMT' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;