import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack'



import CookingPost from '../pages/Creation/Cooking/CookingPost';
import StartupPost from '../pages/Creation/Startup/StatrtupPost';
import CookingUpload from '../pages/Creation/Cooking/CookingUpload';
import StartupUpload from '../pages/Creation/Startup/StartupUpload';
import CookingCategories from '../pages/Creation/Cooking/CookingCategories';
import StartupCategories from '../pages/Creation/Startup/SatrtupCategories';
import CookingViewAll from '../pages/Creation/Cooking/CookingViewAll';
import StartupViewAll from '../pages/Creation/Startup/StartupViewAll';
import CookingProfile from '../pages/Creation/Cooking/CookingProfile';
import StartupProfile from '../pages/Creation/Startup/StartupProfile';
import CookingEditArticle from '../pages/Creation/Cooking/CookingEditArticle';
import StartupEditArticle from '../pages/Creation/Startup/SatrtupEditArticle';
import AllCookingSuggested from '../pages/Creation/Cooking/AllCookingSuggested';
import AllSatrtupSuggested from '../pages/Creation/Startup/AllSatrtupSuggested';
import CookingNotifications from '../pages/Creation/Cooking/CookingNotifications';
import StartupNotifications from '../pages/Creation/Startup/SatrtupNotifications';
import CookingHome from '../pages/Creation/Cooking/CookingHome';
import StartupHome from '../pages/Creation/Startup/StartupHome';
import AllInventionSuggested from '../pages/Creation/InventionCreation/AllInventionSuggested';
import InventionCategories from '../pages/Creation/InventionCreation/InventionCategories';
import InventionEditArticle from '../pages/Creation/InventionCreation/InventionEditArticle';
import InventionHome from '../pages/Creation/InventionCreation/InventionHome';
import InventionNotifications from '../pages/Creation/InventionCreation/InventionNotifications';
import InventionPost from '../pages/Creation/InventionCreation/InventionPost';
import InventionUpload from '../pages/Creation/InventionCreation/InventionUpload';
import InventionViewAll from '../pages/Creation/InventionCreation/InventionViewAll';
import InventionProfile from '../pages/Creation/InventionCreation/InvetionProfile';
import Payment from '../pages/Creation/InventionCreation/Payment'
import InventionPaymentHistory from '../pages/Creation/InventionCreation/InentionPaymentHistory';
import InventionFundRaiserAll from '../pages/Creation/InventionCreation/InventionFundRaiserAll';
// import InventionNotifications from '../pages/Creation/InventionCreation/InventionNotifications';
const CreationInvention = (props) => {

    const Stack = createNativeStackNavigator();

    return (

        <Stack.Navigator
            screenOptions={{ headerShown: false, }}
        >
            <Stack.Screen component={InventionHome} name="InventionHome" />
            <Stack.Screen component={AllInventionSuggested} name="AllInventionSuggested" />
            <Stack.Screen component={InventionCategories} name="InventionCategories" />
            <Stack.Screen component={InventionEditArticle} name="InventionEditArticle" />
            <Stack.Screen component={InventionNotifications} name="InventionNotifications" />
            <Stack.Screen component={InventionPost} name="InventionPost" />
            <Stack.Screen component={InventionUpload} name="InventionUpload" />
            <Stack.Screen component={InventionViewAll} name="InventionViewAll" />
            <Stack.Screen component={InventionProfile} name="InventionProfile" />
            <Stack.Screen component={Payment} name="Payment" />
            <Stack.Screen component={InventionPaymentHistory} name="InventionPaymentHistory" />
            <Stack.Screen component={InventionFundRaiserAll} name="InventionFundRaiserAll" />


        </Stack.Navigator>

    )
}




export default CreationInvention