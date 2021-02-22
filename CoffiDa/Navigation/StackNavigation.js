import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../Components/HomeScreen';
import Location from '../Components/Location';
import ReviewsList from '../Components/ReviewsList';
import AddReview from '../Components/AddReview';
import SingleReview from '../Components/SingleReview';
import FavouriteLocations from '../Components/FavouriteLocations';

import AccountInfo from '../Components/AccountInfo';
import UpdateInfo from '../Components/UpdateInfo';

import LikedReviews from '../Components/LikedReviews';
import EditReview from '../Components/EditReview';
import MyReviews from '../Components/MyReviews';

const Stack = createStackNavigator();

const MainStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Location" component={Location} />
            <Stack.Screen name="ReviewsList" component={ReviewsList} />
            <Stack.Screen name="AddReview" component={AddReview} />
            <Stack.Screen name="SingleReview" component={SingleReview} />
        </Stack.Navigator>
    );
}

const AccountStack = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen name="AccountInformation" component={AccountInfo} />
            <Stack.Screen name="UpdateInfo" component={UpdateInfo} />
        </Stack.Navigator>
    );
}

const FavouriteLocationsStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="FavouriteLocations" component={FavouriteLocations}/>
            <Stack.Screen name="Location" component={Location} />
            <Stack.Screen name="ReviewsList" component={ReviewsList} />
            <Stack.Screen name="AddReview" component={AddReview} />
            <Stack.Screen name="SingleReview" component={SingleReview} />
        </Stack.Navigator>
    );
}

const LikedReviewsStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="LikedReviews" component={LikedReviews}/>
            <Stack.Screen name="SingleReview" component={SingleReview} />
        </Stack.Navigator>
    )
}

const MyReviewsStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="MyReviews" component={MyReviews}/>
            <Stack.Screen name="SingleReview" component={SingleReview} />
            <Stack.Screen name="EditReview" component={EditReview} />
        </Stack.Navigator>
    )
}



export { MainStack, AccountStack, FavouriteLocationsStack, LikedReviewsStack, MyReviewsStack };