import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack'


import PeopleHome from '../pages/Connect/People/PeopleHome';
import PeopleComments from '../pages/Connect/People/PeopleComments';
import PeopleChat from '../pages/Connect/People/PeopleChat';
import PeopleFollowers from '../pages/Connect/People/PeopleFollowers';
import PeopleMessages from '../pages/Connect/People/PeopleMessages';
import PeopleCreatePost from '../pages/Connect/People/PeopleCreatePost';
import PeopleProfileScreen from '../pages/Connect/People/PeopleProfileScreen';
import PeopleSaved from '../pages/Connect/People/PeopleSaved';
import ShopEat from '../pages/Shop/ShopEat/ShopEat';
import FoodDetails from '../pages/Shop/ShopEat/FoodDetails';
import ShopMyOrder from '../pages/Shop/ShopEat/ShopMyOrder';
import ShopReview from '../pages/Shop/ShopEat/ShopReview';
import ShopPayment from '../pages/Shop/ShopEat/ShopPayment';
import UserProfile from '../pages/Connect/People/UserProfile';
import PeopleProfileScreenOther from '../pages/Connect/People/PeopleProfileScreenOther';
import EditProfile from '../pages/Connect/People/EditProfile';
import LikedUserList from '../pages/Connect/People/LikedUserList';
import PeopleMessageList from '../pages/Connect/People/PeopleMessageList';
import UserMessage from '../pages/Connect/People/UserMessage';
import EditPost from '../pages/Connect/People/EditPost';
const ConnectPeopleStack = (props) => {

    const Stack = createNativeStackNavigator();

    return (

        <Stack.Navigator
            screenOptions={{ headerShown: false, }}
        >
            <Stack.Screen component={PeopleHome} name="PeopleHome" />
            <Stack.Screen component={PeopleComments} name="PeopleComments" />
            <Stack.Screen component={PeopleChat} name="PeopleChat" />
            <Stack.Screen component={PeopleFollowers} name="PeopleFollowers" />
            <Stack.Screen component={PeopleMessages} name="PeopleMessages" />
            <Stack.Screen component={PeopleCreatePost} name="PeopleCreatePost" />
            <Stack.Screen component={PeopleProfileScreen} name="PeopleProfileScreen" />
            <Stack.Screen component={PeopleSaved} name="PeopleSaved" />
            <Stack.Screen component={UserProfile} name="UserProfile" />
            <Stack.Screen component={PeopleProfileScreenOther} name="PeopleProfileScreenOther" />
            <Stack.Screen component={EditProfile} name="EditProfile" />
            <Stack.Screen component={LikedUserList} name="LikedUserList" />
            <Stack.Screen component={PeopleMessageList} name="PeopleMessageList" />
            <Stack.Screen component={UserMessage} name="UserMessage" />
            <Stack.Screen component={EditPost} name="EditPost" />


        </Stack.Navigator>

    )
}




export default ConnectPeopleStack