import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import { LoginScreen } from "../../features/account/screens/login.screen";
import { RegisterScreen } from "../../features/account/screens/register.screen";
import { AccountScreen } from "../../features/account/screens/account.screen";

const Stack = createStackNavigator();

export const AuthNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Account" component={AccountScreen} />
        </Stack.Navigator>
    );
};