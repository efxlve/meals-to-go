import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AppNavigator } from './app.navigator';
import { AuthNavigator } from './auth.navigator';

import { AuthenticationContext } from '../../services/authentication/authentication.context';

export const Navigation = () => {
    const { isAuthenticated } = useContext(AuthenticationContext);

    return (
        <NavigationContainer>
            {isAuthenticated ? <AppNavigator /> : <AuthNavigator />}
        </NavigationContainer>
    );
};