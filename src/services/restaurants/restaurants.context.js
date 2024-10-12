import React, { createContext, useEffect, useState, useContext } from 'react';
import { restaurantsRequest, restaurantsTransform } from './restaurants.service';
import { LocationContext } from '../location/location.context';

export const RestaurantsContext = createContext();

export const RestaurantsContextProvider = ({ children }) => {
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { location } = useContext(LocationContext);

    const retrieveRestaurants = (location) => {
        setLoading(true);
        setRestaurants([]);
        setTimeout(() => {
            restaurantsRequest(location)
                .then(restaurantsTransform)
                .then((results) => {
                    setError(null);
                    setRestaurants(results);
                    setLoading(false);
                })
                .catch((err) => {
                    setError(err);
                    setLoading(false);
                });
        }, 2000);
    };

    useEffect(() => {
        if (!location) {
            return;
        }
        const locationString = `${location.lat},${location.lng}`;
        retrieveRestaurants(locationString);
    }, [location]);

    return (
        <RestaurantsContext.Provider value={{ restaurants, loading, error }}>
            {children}
        </RestaurantsContext.Provider>
    );
}