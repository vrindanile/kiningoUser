import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack'


import Shop from '../pages/Shop/Shop';
import ShopEntertainment from '../pages/Shop/ShopEntertainment/ShopEntertainment';
import ShopEntPlaceDetails from '../pages/Shop/ShopEntertainment/ShopEntPlaceDetails';
import ShopEntPurchasedTickets from '../pages/Shop/ShopEntertainment/ShopEntPurchasedTickets';
import ShopEntReview from '../pages/Shop/ShopEntertainment/ShopEntReview';
import ShopEntPayment from '../pages/Shop/ShopEntertainment/ShopEntPayment';
import EntertainmentSearch from '../pages/Shop/ShopEntertainment/EntertainmentSearch';
import AllCategories from '../pages/Shop/ShopEntertainment/AllCategories';
import EventList from '../pages/Shop/ShopEntertainment/EventList';
import ExploreViewMore from '../pages/Shop/ShopEntertainment/ExploreViewMore';
import CuponDetail from '../pages/Shop/ShopEntertainment/CuponDetail';
import PlaceList from '../pages/Shop/ShopEntertainment/PlaceList';
import MyDetailsTicket from '../pages/Shop/ShopEntertainment/MyDetailsTicket';
import EntertainmentReview from '../pages/Shop/ShopEntertainment/EntertainmentReview';
import EntertainmentCart from '../pages/Shop/ShopEntertainment/EntertainmetCart';
import EntertainmentPayment from '../pages/Shop/ShopEntertainment/EntertainmentPayment';
const ShopEntertainmentStack = (props) => {

    const Stack = createNativeStackNavigator();

    return (

        <Stack.Navigator
            screenOptions={{ headerShown: false, }}
        >
            <Stack.Screen component={ShopEntertainment} name="ShopEntertainment" />
            <Stack.Screen component={ShopEntPlaceDetails} name="PlaceDetails" />
            <Stack.Screen component={ShopEntReview} name="ShopEntReview" />
            <Stack.Screen component={ShopEntPayment} name="ShopEntPayment" />
            <Stack.Screen component={ShopEntPurchasedTickets} name="ShopEntPurchasedTickets" />
            <Stack.Screen component={Shop} name="Shop" />
            <Stack.Screen component={EntertainmentSearch} name="EntertainmentSearch" />
            <Stack.Screen component={AllCategories} name="AllCategories" />
            <Stack.Screen component={EventList} name="EventList" />
            <Stack.Screen component={ExploreViewMore} name="ExploreViewMore" />
            <Stack.Screen component={CuponDetail} name="CuponDetail" />
            <Stack.Screen component={PlaceList} name="PlaceList" />
            <Stack.Screen component={MyDetailsTicket} name="MyDetailsTicket" />
            <Stack.Screen component={EntertainmentReview} name="EntertainmentReview" />
            <Stack.Screen component={EntertainmentCart} name="EntertainmentCart" />
            <Stack.Screen component={EntertainmentPayment} name="EntertainmentPayment" />
        </Stack.Navigator>

    )
}




export default ShopEntertainmentStack