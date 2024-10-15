import styled from "styled-components/native";
import { Button, TextInput } from "react-native-paper";
import { colors } from "../../../infrastructure/theme/colors";

export const AccountBackground = styled.ImageBackground.attrs({
    source: require("../../../../assets/home_bg.jpg"),
})`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.6);
`;

export const AccountCover = styled.View`
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.2);
`;

export const AccountContainer = styled.View`
    background-color: rgba(255, 255, 255, 0.85);
    padding: ${(props) => props.theme.space[4]};
    margin-top: ${(props) => props.theme.space[2]};
    border-radius: 15px;
    width: 90%;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
`;

export const AuthButton = styled(Button).attrs({
    color: colors.brand.primary,
})`
    padding: ${(props) => props.theme.space[2]};
    border-radius: 10px;
    font-size: 16px; 
    shadow-color: #000; 
    shadow-offset: 0px 2px;
    shadow-opacity: 0.8;
    shadow-radius: 4px;
    elevation: 5; 
`;

export const AuthInput = styled(TextInput)`
    width: 100%;
    margin-bottom: ${(props) => props.theme.space[3]};
    border-radius: 8px;
    background-color: rgba(255, 255, 255, 0.9);
`;

export const Title = styled.Text`
    font-size: 34px;
    color: ${colors.brand.primary};
    font-weight: bold;
    margin-bottom: ${(props) => props.theme.space[4]};
    text-align: center;
`;

export const ErrorContainer = styled.View`
    max-width: 300px;
    align-items: center;
    align-self: center;
    margin-top: ${(props) => props.theme.space[2]};
    margin-bottom: ${(props) => props.theme.space[2]};
`;
