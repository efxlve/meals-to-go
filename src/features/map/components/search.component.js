import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { View } from "react-native";
import { Searchbar } from 'react-native-paper';

import { LocationContext } from "../../../services/location/location.context";

const SearchContainer = styled(View)`
    padding: ${props => props.theme.space[3]};
    position: absolute;
    z-index: 999;
    width: 100%;
    top: 30px;
    left: 0;
    right: 0;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const StyledSearchbar = styled(Searchbar)`
    background-color: ${(props) => props.theme.colors.ui.quaternary};
    elevation: 0;
`;

export const Search = () => {
    const { keyword, search } = useContext(LocationContext);
    const [searchKeyword, setSearchKeyword] = useState(keyword);

    useEffect(() => {
        setSearchKeyword(keyword);
    }, [keyword]);

    return (
        <SearchContainer>
            <StyledSearchbar
                placeholder="Search for a location"
                icon="map"
                value={searchKeyword}
                onSubmitEditing={() => {
                    search(searchKeyword);
                }}
                onChangeText={(text) => {
                    setSearchKeyword(text);
                }}
            />
        </SearchContainer>
    );
};