import React, { useContext, useState, useEffect } from "react";
import MapView, { Marker, Callout, MapCallout } from "react-native-maps";
import styled from "styled-components";

import { LocationContext } from "../../../services/location/location.context";
import { RestaurantsContext } from "../../../services/restaurants/restaurants.context";

import { Search } from "../components/search.component";

import { MapCalloutComponent } from "../components/map-callout.component";

const Map = styled(MapView)`
    height: 100%;
    width: 100%;
`;

export const MapScreen = ({ navigation }) => {
    const { location } = useContext(LocationContext);
    const { restaurants = [] } = useContext(RestaurantsContext);

    const [latDelta, setLatDelta] = useState(0);

    const { lat, lng, viewport } = location;

    useEffect(() => {
        const northeastLat = location.viewport.northeast.lat;
        const southwestLat = location.viewport.southwest.lat;

        setLatDelta(northeastLat - southwestLat);
    }, [location, viewport]);

    return (
        <>
            <Search />
            <Map
                region={{
                    latitude: lat,
                    longitude: lng,
                    latitudeDelta: latDelta,
                    longitudeDelta: 0.02,
                }}
            >
                {restaurants.map((restaurant) => {
                    return (
                        <Marker
                            key={restaurant.name}
                            title={restaurant.name}
                            coordinate={{
                                latitude: restaurant.geometry.location.lat,
                                longitude: restaurant.geometry.location.lng,
                            }}
                        >
                            <Callout
                                onPress={() => {
                                    navigation.navigate("RestaurantDetail", {
                                        restaurant,
                                    });
                                }}
                            >
                                <MapCalloutComponent restaurant={restaurant} />
                            </Callout>
                        </Marker>
                    );
                })}
            </Map>
        </>
    );
};