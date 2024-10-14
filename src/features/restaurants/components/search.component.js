import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { View } from "react-native";
import { Searchbar } from 'react-native-paper';

import { LocationContext } from "../../../services/location/location.context";

const SearchContainer = styled(View)`
    padding: ${props => props.theme.space[3]};
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const StyledSearchbar = styled(Searchbar)`
    background-color: ${(props) => props.theme.colors.ui.quaternary};
    elevation: 0;
`;

export const Search = ({ isFavouritesToggled, onFavouritesToggle}) => {
    const { keyword, search } = useContext(LocationContext);
    const [searchKeyword, setSearchKeyword] = useState(keyword);

    useEffect(() => {
        setSearchKeyword(keyword);
    }, [keyword]);

    return (
        <SearchContainer>
            <StyledSearchbar
                icon={isFavouritesToggled ? "heart" : "heart-outline"}
                onIconPress={onFavouritesToggle}
                placeholder="Search for a location"
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