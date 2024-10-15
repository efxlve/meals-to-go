import React from "react";
import ExpoStatusBar from 'expo-status-bar/build/ExpoStatusBar';
import { ThemeProvider } from "styled-components";

import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useFonts as useOswald, Oswald_400Regular } from '@expo-google-fonts/oswald';
import { useFonts as useLato, Lato_400Regular } from '@expo-google-fonts/lato';

import { theme } from './src/infrastructure/theme';
import { Navigation } from "./src/infrastructure/navigation";

import { AuthenticationContextProvider } from "./src/services/authentication/authentication.context";

const firebaseConfig = {
  apiKey: "AIzaSyCsAScw1-gPStN6D2qoOyB-gyWxX38nPho",
  authDomain: "mealstogo-df785.firebaseapp.com",
  projectId: "mealstogo-df785",
  storageBucket: "mealstogo-df785.appspot.com",
  messagingSenderId: "448654409608",
  appId: "1:448654409608:web:dd954e1d051f8b85a6043d"
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export default function App() {
  const [oswaldLoaded] = useOswald({
    Oswald_400Regular
  });

  const [latoLoaded] = useLato({
    Lato_400Regular
  });

  if (!oswaldLoaded || !latoLoaded) {
    return null;
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <AuthenticationContextProvider>
          <Navigation />
        </AuthenticationContextProvider>
      </ThemeProvider>
      <ExpoStatusBar style="auto" />
    </>
  );
}