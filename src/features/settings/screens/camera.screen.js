import React, { useRef, useState, useContext } from "react";
import { TouchableOpacity, View } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import styled from "styled-components/native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Text } from "../../../components/typography/text.component";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";

const Container = styled.View`
    flex: 1;
    justify-content: center;
`;

const StyledCameraView = styled(CameraView)`
    flex: 1;
`;

const ButtonContainer = styled.View`
    position: absolute; 
    bottom: 30px; 
    flex: 1;
    flex-direction: row;
    background-color: transparent;
    margin: 64px;
    justify-content: center;
    align-items: center;
`;

const IconButton = styled(TouchableOpacity)`
    background-color: rgba(0, 0, 0, 0.3);
    padding: 10px;
    border-radius: 50px;
    margin: 0 40px;
`;

const CenteredText = styled(Text)`
    text-align: center;
`;

const PermissionButton = styled.TouchableOpacity`
    background-color: #007bff;
    padding: 10px 20px;
    border-radius: 10px;
    align-self: center;
    margin-top: 20px;
`;

const ButtonText = styled(Text)`
    color: white;
    font-weight: bold;
    font-size: 16px;
`;

const iconCamera = styled(MaterialIcons)`
    padding-right: 10px;
`;

export const CameraScreen = ({ navigation }) => {
    const [facing, setFacing] = useState('back');
    const [permission, requestPermission] = useCameraPermissions();
    const cameraRef = useRef(null);
    const { user } = useContext(AuthenticationContext);

    const snap = async () => {
        if (cameraRef.current && permission && permission.granted) {
            try {
                const photo = await cameraRef.current.takePictureAsync();
                AsyncStorage.setItem(`${user.uid}-photo`, photo.uri);
                navigation.goBack();
            } catch (error) {
                console.error('Failed to take photo:', error);
            }
        } else {
            console.log('Camera not ready or permission not granted');
        }
    };

    if (!permission) {
        return <View />;
    }

    if (!permission.granted) {
        return (
            <Container>
                <CenteredText>We need your permission to show the camera</CenteredText>
                <PermissionButton onPress={requestPermission}>
                    <ButtonText>Grant Permission</ButtonText>
                </PermissionButton>
            </Container>
        );
    }

    function toggleCameraFacing() {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    }

    return (
        <Container>
            <StyledCameraView facing={facing}>
                <ButtonContainer>
                    <IconButton onPress={snap}>
                        <MaterialIcons name="camera" size={42} color="white" />
                    </IconButton>
                    <IconButton onPress={toggleCameraFacing}>
                        <MaterialIcons name="flip-camera-ios" size={42} color="white" />
                    </IconButton>
                </ButtonContainer>
            </StyledCameraView>
        </Container>
    );
};