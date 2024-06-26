import React, { useEffect, useState, useRef } from 'react';
import { RefreshControl, View, Image, Text, StyleSheet, SafeAreaView, TextInput, FlatList, Alert, TouchableOpacity, ScrollView, ImageBackground, StatusBar, Platform } from 'react-native';
import HomeHeader from '../../../component/HomeHeader';
import SearchInput2 from '../../../component/SearchInput2';
import SerchInput from '../../../component/SerchInput';
import { dimensions, Mycolors } from '../../../utility/Mycolors';
import { ImageSlider, ImageCarousel } from "react-native-image-slider-banner";
import MyButtons from '../../../component/MyButtons';

import Loader from '../../../WebApi/Loader';
import Toast from 'react-native-toast-message';
import MyAlert from '../../../component/MyAlert';
import { useSelector, useDispatch } from 'react-redux';
import { shop_entertainment_home, requestGetApi, shop_eat, vendor_places } from '../../../WebApi/Service'
import { saveUserResult, saveUserToken, setVenderDetail, onLogoutUser, setUserType } from '../../../redux/actions/user_action';
import { setRestorentLocation } from '../../../redux/actions/latLongAction';
import GetLocation from 'react-native-get-location'
import Geocoder from "react-native-geocoding";
import { GoogleApiKey } from '../../../WebApi/GoogleApiKey';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { log } from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import { setNotificationData, setMessageCount } from '../../../redux/actions/latLongAction';
const data = [
    {
        id: '1',
        title: 'fun games',
        img: require('../../../assets/images/images.png'),
        end_Date: 'street 114/B,Noida',
        start_Date: '4.0',
        price: '7888',
    },
    {
        id: '2',
        title: 'fun games',
        img: require('../../../assets/images/images.png'),
        end_Date: 'street 114/B,Noida',
        start_Date: '4.0',
        price: '7888',
    }

]
const PlaceList = (props, route) => {
    const [searchValue, setsearchValue] = useState('')
    const dispatch = useDispatch();
    const [noData, setNoData] = useState(false)
    const [loading, setLoading] = useState(false)
    const [My_Alert, setMy_Alert] = useState(false)
    const [alert_sms, setalert_sms] = useState('')
    const [My_Alert2, setMy_Alert2] = useState(false)
    const [alert_sms2, setalert_sms2] = useState('')
    const [My_Alert3, setMy_Alert3] = useState(false)
    const [alert_sms3, setalert_sms3] = useState('')
    const [resData, setresData] = useState([])
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const scrollRef = useRef();
    const User = useSelector(state => state.user.user_details)
    useEffect(() => {
        homePage('')
        setsearchValue('')
        const id = props?.route?.params?.data
        console.log('my placesss list----->>>', id);
    }, [])

    const homePage = async (text, getnwPage = false) => {
        // return
        const newpage = getnwPage ? page + 1 : 1;
        var url = vendor_places
        var murl = `?business_id=` + props?.route?.params?.data
        var ru = `&page=${newpage}&limit=10`
        var mu = `&search=` + text
        url = url + murl + ru
        if (mu != undefined) {
            url = url + mu
        }
        setLoading(true)
        const { responseJson, err } = await requestGetApi(url, '', 'GET', User.token)
        setLoading(false)
        console.log('the res placeListttt  after searchhhh==>>', responseJson?.body?.data)
        if (responseJson.headers.success == 1) {
            if (!getnwPage) {
                setLoading(false);
                setNoData(false);
                setresData(responseJson?.body?.data
                )
                setLastPage(responseJson.body.lastPage);
            } else {
                setLoading(false);
                setNoData(false);
                setresData((resData) => [...resData, ...responseJson?.body?.data]);
                console.log('i have reachedd to the point');
                setPage(newpage);
            }
        } else {
            setresData([])
            setLoading(false)
            setNoData(true)
        }
    }


    const renderGroupsItems = ({ item }) => {
        return (
            <View style={{
                width: '90%', marginHorizontal: 5, alignSelf: 'center', backgroundColor: 'white', marginVertical: 10, borderRadius: 7,
                shadowColor: '#000',
                shadowOffset: {
                    width: 0,
                    height: 3
                },
                shadowRadius: 1,
                shadowOpacity: 0.3,
                justifyContent: 'center',
                elevation: 5, paddingBottom: 15,
                height: 'auto'
            }}>
                <TouchableOpacity
                    style={{ width: '100%', height: 120, backgroundColor: Mycolors.LogininputBox, alignSelf: 'center', }}
                    onPress={() => {
                        // props.navigation.navigate('FoodDetails', { data: item })
                        // dispatch(setVenderDetail(item))
                        props.navigation.navigate('PlaceDetails', { data: item })
                    }}>
                    <Image source={{
                        uri: item?.EntertainmentImage[0]?.image
                    }} style={{ width: '100%', height: '100%', alignSelf: 'center', borderTopLeftRadius: 7, borderTopRightRadius: 7, resizeMode: 'stretch' }} resizeMode={'stretch'}></Image>
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5, paddingHorizontal: 9, }}>
                    <View style={{}}>
                        <Text style={{ fontSize: 16, color: Mycolors.Black, marginTop: 5, textAlign: 'left', fontWeight: '500', left: 7, }}>{item.name}</Text>
                        {/* <Text style={{ fontSize: 12, color: Mycolors.Black, marginTop: 5, textAlign: 'left', fontWeight: '500', left: 7 }}>{item.address_line}</Text> */}
                        <Text style={{ fontSize: 12, color: Mycolors.Black, marginTop: 5, textAlign: 'left', fontWeight: '500', left: 7, }}>{`${item.startdate}- ${item.enddate}`}</Text>
                    </View>
                    <View style={{ padding: 5, alignItems: 'flex-end' }}>
                        {/* <TouchableOpacity style={{
                            width: 50, height: 28, borderRadius: 5,
                            shadowColor: '#000',
                            shadowOffset: {
                                width: 0,
                                height: 3
                            },
                            shadowRadius: 1,
                            shadowOpacity: 0.3,
                            justifyContent: 'center',
                            elevation: 5, flexDirection: 'row', alignItems: 'center'
                        }}>
                            <Text style={{ fontSize: 14, textAlign: 'left', fontWeight: 'bold', marginHorizontal: 4, color: '#fff', top: 1 }}>{item.rating != null ? item.rating : '0'}</Text>
                            <Image source={require('../../../assets/Star.png')} style={{ width: 13, height: 13, alignSelf: 'center', marginRight: 4 }}></Image>
                        </TouchableOpacity> */}
                        <Text style={{ fontSize: 14, textAlign: 'left', fontWeight: 'bold', marginHorizontal: 4, color: 'red', top: 1 }}>{`$${item.child_price} - $${item.adult_price}`}</Text>
                        <Text style={{ fontSize: 11, color: Mycolors.ORANGE, marginTop: 5, textAlign: 'left', fontWeight: '500', }}>{`${item.total_orders} Tickets sold`}</Text>
                    </View>
                </View>
            </View>
        )
    }
    const handleLoadMore = async () => {
        console.log('is homePAge2 is called', lastPage);
        console.log('my last page---->>', lastPage, page);
        if (page < lastPage) {
            console.log('page of my startup page');
            await homePage('', true);
            console.log('Categories function completed. Updated state:', lastPage, page);
            // Continue with any additional logic after the async operation
        } else {
            console.log('Reached last page');

            // Handle the case where you've reached the last page
            // You can display a message or perform other actions here if needed
        }
    };
    return (
        <SafeAreaView style={{}}>
            <ScrollView
                style={{ flexGrow: 1 }}
                nestedScrollEnabled={true}
                // refreshControl={
                //     <RefreshControl
                //         refreshing={refreshing}
                //         onRefresh={onRefresh}
                //     />
                // }
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                <View>
                    <HomeHeader height={60} paddingHorizontal={15}
                        press1={() => { props.navigation.goBack() }} img1={require('../../../assets/arrow.png')} img1width={18} img1height={15}
                        press2={() => { }} title2={'Vendors List'} fontWeight={'500'} img2height={20}
                        press3={() => { }} img3width={25} img3height={25} />
                    {/* {cartCount != '0' ?
                        <View style={{ position: 'absolute', right: 8, top: 8, width: 20, height: 20, borderRadius: 20, backgroundColor: 'red', justifyContent: 'center', zIndex: 999 }}>
                            <Text style={{ fontSize: 11, textAlign: 'center', color: '#fff' }}>{cartCount}</Text>
                        </View>
                        : null
                    } */}
                    <View style={{
                        flex: 1, width: '90%',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                    }}>
                        <SearchInput2 marginTop={10} placeholder={'Search Vendors'}
                            serchValue={searchValue}
                            onChangeText={(e) => {
                                setsearchValue(e)
                                homePage(e.text)
                                // homePageSearch()
                                if (e.text.length == 0) {
                                    // AllVenders()
                                    homePage('')
                                }
                            }}
                            press={() => { Alert.alert('Hi') }}
                            presssearch={() => { }}
                            paddingLeft={15}

                        />
                    </View>
                    {!loading ? (
                        resData?.length > 0 ? (
                            <View style={{ width: '100%', alignSelf: 'center' }}>
                                <View style={{ marginTop: 20 }}>
                                    <FlatList
                                        ref={scrollRef}
                                        showsHorizontalScrollIndicator={true}
                                        onEndReachedThreshold={0.9}
                                        onEndReached={
                                            handleLoadMore
                                        }
                                        data={resData}
                                        scrollEnabled={true}
                                        renderItem={renderGroupsItems}
                                        listKey={"myGroupList"}
                                        keyExtractor={(item, index) => String(index)}
                                    />
                                </View>
                            </View>
                        ) : (
                            <View style={styles.noDataContainer}>
                                {!noData ? (
                                    <Text style={styles.noDataText}>
                                        No Vendors found. {"\n"}
                                    </Text>
                                ) : (
                                    <Text style={styles.noDataText}>No result found</Text>
                                )}
                            </View>
                        )

                    ) : null}
                </View>




                <View style={{ height: 100 }} />

            </ScrollView>

            {loading ? <Loader /> : null}
            {My_Alert ? <MyAlert sms={alert_sms} okPress={() => { setMy_Alert(false) }} /> : null}

            {My_Alert2 ? <MyAlert sms={alert_sms2} sms2={'Logout'} okPress={() => { logoutDriver() }} canclePress={() => { setMy_Alert2(false) }} /> : null}

            {My_Alert3 ? <MyAlert sms={alert_sms3} okPress={rateOrder} canclePress={() => { setMy_Alert3(false) }} /> : null}

        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    noDataContainer: {
        alignItems: "center",
        flex: 1,
        justifyContent: "center",

    },
    noDataText: {
        color: Mycolors.THEME_BLACK,
        fontSize: 20,
        fontWeight: "500",
        textAlign: "center"
    }
});
export default PlaceList 