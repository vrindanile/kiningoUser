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
import StartupFundRaiserAll from '../pages/Creation/Startup/StartupFundraiserAll';
import Payment from '../pages/Creation/Startup/Payment';
import StartupPaymentHistory from '../pages/Creation/Startup/StartupPaymentHistory';
const CreationSatrtup = (props) => {

    const Stack = createNativeStackNavigator();

    return (

        <Stack.Navigator
            screenOptions={{ headerShown: false, }}
        >
            <Stack.Screen component={StartupHome} name="StartupHome" />
            <Stack.Screen component={StartupPost} name="StartupPost" />
            <Stack.Screen component={StartupUpload} name="StartupUpload" />
            <Stack.Screen component={StartupCategories} name="StartupCategories" />
            <Stack.Screen component={StartupViewAll} name="StartupViewAll" />
            <Stack.Screen component={StartupProfile} name="StartupProfile" />
            <Stack.Screen component={StartupEditArticle} name="StartupEditArticle" />
            <Stack.Screen component={AllSatrtupSuggested} name="AllSatrtupSuggested" />
            <Stack.Screen component={StartupNotifications} name="StartupNotifications" />
            <Stack.Screen component={Payment} name="Payment" />
            <Stack.Screen component={StartupFundRaiserAll} name="StartupFundRaiserAll" />
            <Stack.Screen component={StartupPaymentHistory} name="StartupPaymentHistory" />


        </Stack.Navigator>

    )
}




export default CreationSatrtup