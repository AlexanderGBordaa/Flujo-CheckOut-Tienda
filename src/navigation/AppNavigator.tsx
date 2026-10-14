import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { ShoppingCartScreen } from '../screens/ShoppingCartScreen';
import { SecurePaymentScreen } from '../screens/SecurePaymentScreen';
import { AddAddressScreen } from '../screens/AddAddressScreen';
import { SavedAddressesScreen } from '../screens/SavedAddressesScreen';
import { OrderConfirmationScreen } from '../screens/OrderConfirmationScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="ShoppingCart"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        contentStyle: { backgroundColor: '#FFFFFF' },
      }}
    >
      <Stack.Screen name="ShoppingCart" component={ShoppingCartScreen} />
      <Stack.Screen name="SecurePayment" component={SecurePaymentScreen} />
      <Stack.Screen name="AddAddress" component={AddAddressScreen} />
      <Stack.Screen name="SavedAddresses" component={SavedAddressesScreen} />
      <Stack.Screen
        name="OrderConfirmation"
        component={OrderConfirmationScreen}
        options={{ gestureEnabled: false }}
      />
    </Stack.Navigator>
  );
};
