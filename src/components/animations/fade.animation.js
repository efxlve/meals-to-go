import React, { useRef, useEffect } from "react";
import { Animated } from "react-native";

export const FadeInView = ({ duration = 1000, children }) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration,
            useNativeDriver: true,
        }).start();
    }, [fadeAnim, duration]);

    return (
        <Animated.View
            style={{
                opacity: fadeAnim,
            }}
        >
            {children}
        </Animated.View>
    );
};