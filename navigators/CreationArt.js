import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack'


import ArtHome from '../pages/Creation/Art/ArtHome';
import ArtPost from '../pages/Creation/Art/ArtPost';
import ArtUpload from '../pages/Creation/Art/ArtUpload';
import ArtCategories from '../pages/Creation/Art/ArtCategories';
import ArtViewAll from '../pages/Creation/Art/ArtViewAll';
import MyProfile from '../pages/Creation/Art/MyProfile';
import EditArticle from '../pages/Creation/Art/EditArticle';
import AllSuggested from '../pages/Creation/Art/AllSuggested';
import ArtNotifications from '../pages/Creation/Art/ArtNotifications';
const CreationArt = (props) => {

    const Stack = createNativeStackNavigator();

    return (

        <Stack.Navigator
            screenOptions={{ headerShown: false, }}
        >
            <Stack.Screen component={ArtHome} name="ArtHome" />
            <Stack.Screen component={ArtPost} name="ArtPost" />
            <Stack.Screen component={ArtUpload} name="ArtUpload" />
            <Stack.Screen component={ArtCategories} name="ArtCategories" />
            <Stack.Screen component={ArtViewAll} name="ArtViewAll" />
            <Stack.Screen component={MyProfile} name="MyProfile" />
            <Stack.Screen component={EditArticle} name="EditArticle" />
            <Stack.Screen component={AllSuggested} name="AllSuggested" />
            <Stack.Screen component={ArtNotifications} name="ArtNotifications" />


        </Stack.Navigator>

    )
}




export default CreationArt