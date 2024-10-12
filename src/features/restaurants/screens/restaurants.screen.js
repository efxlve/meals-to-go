import React, { useContext } from "react";
import styled from "styled-components";
import { View, FlatList } from 'react-native';
import { ActivityIndicator } from "react-native-paper";

import { SafeArea } from "../../../components/utility/safe-area.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { RestaurantInfoCard } from "../components/restaurant-info-card.component";
import { Search } from "../components/search.component";

import { RestaurantsContext } from "../../../services/restaurants/restaurants.context";

const RestaurantList = styled(FlatList).attrs({
    contentContainerStyle: {
        padding: 16,
    },
})``;

const Loading = styled(ActivityIndicator)`
    margin-left: -15px;
`;

const LoadingContainer = styled(View)`
    position: absolute;
    top: 50%;
    left: 50%;
`;

export const RestaurantsScreen = () => {
    const { loading, error, restaurants } = useContext(RestaurantsContext);

    return (
        <SafeArea>
            {loading && (
                <LoadingContainer>
                <Loading animating={true} color="#64b5f6" />
                </LoadingContainer>
            )}
            <Search />
            <RestaurantList
                data={restaurants}
                renderItem={({ item }) => {
                    return (
                        <Spacer position="bottom" size="large">
                            <RestaurantInfoCard restaurant={item} />
                        </Spacer>
                    );
                }}
                keyExtractor={(item) => item.name}
            />
        </SafeArea>
    );
};