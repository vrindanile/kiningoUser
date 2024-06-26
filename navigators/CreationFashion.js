import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack'


import FashionHome from '../pages/Creation/Fashion/FashionHome';
import FashionPost from '../pages/Creation/Fashion/FashionPost';
import FashionUpload from '../pages/Creation/Fashion/FashionUpload';
import FashionViewAll from '../pages/Creation/Fashion/FashionViewAll';
import FashionCategories from '../pages/Creation/Fashion/FashionCategories';
import AllFashionSuggested from '../pages/Creation/Fashion/AllFashionSuggested';
import FashionProfile from '../pages/Creation/Fashion/FashionProfile';
import FashionEditArticle from '../pages/Creation/Fashion/FashionEditArticle';
import FashionNotification from '../pages/Creation/Fashion/FashionNotification';
const CreationFashion = (props) => {

    const Stack = createNativeStackNavigator();

    return (

        <Stack.Navigator
            screenOptions={{ headerShown: false, }}
        >
            <Stack.Screen component={FashionHome} name="FashionHome" />
            <Stack.Screen component={FashionPost} name="FashionPost" />
            <Stack.Screen component={FashionUpload} name="FashionUpload" />
            <Stack.Screen component={FashionCategories} name="FashionCategories" />
            <Stack.Screen component={FashionViewAll} name="FashionViewAll" />
            <Stack.Screen component={AllFashionSuggested} name="AllFashionSuggested" />
            <Stack.Screen component={FashionProfile} name="FashionProfile" />
            <Stack.Screen component={FashionEditArticle} name="FashionEditArticle" />
            <Stack.Screen component={FashionNotification} name="FashionNotification" />


        </Stack.Navigator>

    )
}




export default CreationFashion