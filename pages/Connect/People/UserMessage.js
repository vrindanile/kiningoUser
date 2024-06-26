import React, { useEffect, useState, useRef } from 'react';
import { View, Image, Text, StyleSheet, SafeAreaView, TextInput, FlatList, Alert, TouchableOpacity, ScrollView, ImageBackground, Keyboard } from 'react-native';
import HomeHeaderRoundBottom from '../../../component/HomeHeaderRoundBottom';
import SearchInput2 from '../../../component/SearchInput2';
import SearchInputEnt from '../../../component/SearchInputEnt';
import SerchInput from '../../../component/SerchInput';
import { dimensions, Mycolors } from '../../../utility/Mycolors';
import { ImageSlider, ImageCarousel } from "react-native-image-slider-banner";
import MyButtons from '../../../component/MyButtons';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import Modal from 'react-native-modal';
import Toast from 'react-native-simple-toast'
import LinearGradient from 'react-native-linear-gradient'
import { connect_people_block_user, connect_people_react_post, connect_people_save_post, connect_people_user_profile, requestGetApi, requestPostApi, connect_people_user_followersList, connect_people_user_followingList } from '../../../WebApi/Service';
import Loader from '../../../WebApi/Loader';
import { useSelector, useDispatch } from 'react-redux';
const image1 = require('../../../assets/images/people-following-person.png')
const image2 = require('../../../assets/images/people-sender-image.png')

const UserMessage = (props, route) => {
    const User = useSelector(state => state.user.user_details);
    const Userpeople = useSelector(state => state.user.people_user);
    // console.log('myyy user------->', User.first_name);
    const [changeTab, setChangeTab] = useState(typeof props.route.params?.gotoFollowersTab === 'string' && props.route.params?.gotoFollowersTab === 'no' ? true : false)
    const [searchValue, setsearchValue] = useState('')
    const [scrollEnabled, setScrollEnabled] = useState(false)
    const [followerSearch, setFollowerSearch] = useState('')
    const myTextInput = useRef()
    const [userMessage, setUserMessage] = useState('')
    const [multiSliderValue, setMultiSliderValue] = useState([0, 100])
    const [showChooseMilesModal, setShowChooseMilesModal] = useState(false)
    const [searchTerm, setSearchTerm] = useState('');
    const [isFollowersTabSelected, setIsFollowersTabSelected] = useState(changeTab ? false : true)
    const [loading, setLoading] = useState(false);
    const [userfollowingdata, setUserfollowingdata] = useState('')
    const [userID, setUserId] = useState(props.route.params.userID)
    const [upData, setupData] = useState([
        {
            id: '1',
            name: 'Chetan Manne',
            img: require('../../../assets/images/comment-person-image.png'),
            numFollowers: '1.1M',
            numFollowing: '536',
            numPosts: '12K'
        },
        {
            id: '2',
            name: 'Parth Shinge',
            img: require('../../../assets/images/comment-person-image.png'),
            numFollowers: '1.1M',
            numFollowing: '536',
            numPosts: '12K'
        },
        {
            id: '3',
            name: 'Naumika Nair',
            img: require('../../../assets/images/comment-person-image.png'),
            numFollowers: '1.1M',
            numFollowing: '536',
            numPosts: '12K'
        },
    ])
    const [upData2, setupData2] = useState([
        {
            id: '1',
            name: 'Chetan Manne2',
            img: require('../../../assets/images/comment-person-image.png'),
            numFollowers: '1.1M',
            numFollowing: '536',
            numPosts: '12K'
        },
        {
            id: '2',
            name: 'Parth Shinge2',
            img: require('../../../assets/images/comment-person-image.png'),
            numFollowers: '1.1M',
            numFollowing: '536',
            numPosts: '12K'
        },
        {
            id: '3',
            name: 'Naumika Nair2',
            img: require('../../../assets/images/comment-person-image.png'),
            numFollowers: '1.1M',
            numFollowing: '536',
            numPosts: '12K'
        },
    ])
    const [userdata, setUserdata] = useState('');
    const UserFollowers = async () => {
        setLoading(true)
        console.log("PeopleProfileScreen:::", Userpeople.userid);
        const { responseJson, err } = await requestGetApi(connect_people_user_followersList + userID, '', 'GET', User.token)
        setLoading(false)
        console.log('the res==>>', responseJson.data)
        if (responseJson.success == 1) {
            setUserdata(responseJson.data)
            //setUploadpostdata(responseJson.data.posts)
            console.log("response followers", responseJson.data);
            console.log("response followers post", responseJson.data.posts);
            // Toast.show({ text1: responseJson.headers.message });
        } else {

            setalert_sms(err)
            setMy_Alert(true)
        }
    }
    const UserFollowing = async () => {
        setLoading(true)
        console.log("PeopleProfileScreen:::", Userpeople.userid);
        const { responseJson, err } = await requestGetApi(connect_people_user_followingList + userID, '', 'GET', User.token)
        setLoading(false)
        console.log('the res==>>', responseJson)
        if (responseJson.success == 1) {
            setUserfollowingdata(responseJson.data)
            //setUploadpostdata(responseJson.data.posts)
            console.log("response followers", responseJson.data);
            console.log("response followers post", responseJson.data.posts);
            // Toast.show({ text1: responseJson.headers.message });
        } else {

            setalert_sms(err)
            setMy_Alert(true)
        }
    }
    const getData = async () => {
        setLoading(true)
        //'?name='+searchValue.text+'&lat='+lat+'&long='+long
        var fUrl = connect_people_user_followingList + Userpeople.userid
        var urls = '?name=' + searchValue
        console.log('my url---------->', urls)
        if (urls != undefined) {
            fUrl = fUrl + urls
        }
        const { responseJson, err } = await requestGetApi(fUrl, '', 'GET', User.token)
        setLoading(false)
        console.log('the res get shop_eat_business ==>>', responseJson.data)
        if (responseJson.success == 1) {
            setUserdata(responseJson.data)
            //setresData(responseJson.body)
        } else {
            setalert_sms(err)
            setMy_Alert(true)
        }

    }

    const getDataFollowing = async () => {
        setLoading(true)
        //'?name='+searchValue.text+'&lat='+lat+'&long='+long
        var fUrl = connect_people_user_followingList + Userpeople.userid
        var urls = '?name=' + searchValue
        console.log('my url---------->', urls)
        if (urls != undefined) {
            fUrl = fUrl + urls
        }
        const { responseJson, err } = await requestGetApi(fUrl, '', 'GET', User.token)
        setLoading(false)
        console.log('the res followin people ==>>', responseJson)
        if (responseJson.success == 1) {
            setUserfollowingdata(responseJson.data)
            //setresData(responseJson.body)
        } else {
            setalert_sms(err)
            setMy_Alert(true)
        }

    }
    const isDataEmpty = () => {
        if (isFollowersTabSelected) {
            if (userdata?.length === 0) {
                return true
            } else {
                return false
            }
        } else {
            if (userfollowingdata?.length === 0) {
                return true
            } else {
                return false
            }
        }
    }
    useEffect(() => {
        console.log('muuuuuuuu-------------???', props.route.params.userID)
        setUserId(props.route.params.userID)
        UserFollowers()
        // UserFollowing()
        // generateThumb()
    }, [])
    return (
        <SafeAreaView scrollEnabled={scrollEnabled} style={{}}>
            <ScrollView>
                <View style={{ flexDirection: 'row', alignItems: 'center', height: 80, padding: 20, borderBottomLeftRadius: 25, borderBottomRightRadius: 25, backgroundColor: 'white' }}>
                    <TouchableOpacity onPress={() => { props.navigation.goBack() }}>
                        <Image source={require('../../../assets/images/events_arrow.png')} style={{ width: 25, height: 20 }} />
                    </TouchableOpacity>

                    <Text style={{ fontSize: 14, fontWeight: '500', color: '#455A64', marginLeft: '30%', fontSize: 16 }}>{User.first_name}</Text>
                    <Text style={{ fontSize: 14, fontWeight: '500', color: '#455A64', fontSize: 16, left: 5 }}>{User.last_name} </Text>
                </View>
                <View style={{ width: '90%', alignSelf: 'center', marginTop: 20 }}>

                    {/* <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginBottom: 20 }}>
                        <TouchableOpacity style={isFollowersTabSelected ? styles.selectedTabView : styles.unSelectedTabView} onPress={() => {
                            !isFollowersTabSelected && setIsFollowersTabSelected(true)
                            UserFollowers()
                        }}>
                            <Text style={styles.tabText}>Followers</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={isFollowersTabSelected ? styles.unSelectedTabView : styles.selectedTabView} onPress={() => {
                            isFollowersTabSelected && setIsFollowersTabSelected(false)
                            UserFollowing()
                        }}>
                            <Text style={styles.tabText}>Following</Text>
                        </TouchableOpacity>
                    </View> */}

                    <View style={styles.searchView}>
                        <View style={styles.searchLeftSubView}>
                            <TextInput
                                placeholder="Search"
                                placeholderTextColor={'#B2B7B9'}
                                value={setsearchValue}
                                onChangeText={e => {
                                    setsearchValue(e)
                                    if (e == '') {
                                        if (isFollowersTabSelected) {
                                            UserFollowers()
                                        } else {
                                            UserFollowing()
                                        }
                                    }
                                }

                                }
                                style={styles.input}

                            />

                        </View>
                        {isFollowersTabSelected ? <TouchableOpacity onPress={() => { getData() }}>
                            <Image source={require('../../../assets/images/people-search.png')} style={{ width: 50, height: 50 }} />
                        </TouchableOpacity> : <TouchableOpacity onPress={() => { getDataFollowing() }}>
                            <Image source={require('../../../assets/images/people-search.png')} style={{ width: 50, height: 50 }} /></TouchableOpacity>}
                    </View>

                    <View style={{ width: '100%', alignSelf: 'center', marginTop: 20, }}>
                        <FlatList
                            data={userdata}
                            showsHorizontalScrollIndicator={false}
                            numColumns={1}
                            renderItem={({ item, index }) => {
                                console.log('image11', item)
                                return (
                                    // <View style={{ width: '100%', marginHorizontal: 5, marginBottom: 20 }}>
                                    //     <LinearGradient
                                    //         colors={['rgba(255, 255, 255, 1)', 'rgba(249, 249, 249, 1)']}
                                    //         style={styles.flatlistMainView}
                                    //     >
                                    //         {/* <View style={styles.flatlistMainView}> */}
                                    //         <Image source={require('../../../assets/images/comment-person-image.png')} />
                                    //         <View style={{ marginLeft: 10, justifyContent: 'space-between' }}>
                                    //             <TouchableOpacity onPress={() => props.navigation.navigate('PeopleProfileScreen')} style={{ flexDirection: 'row' }}>
                                    //                 <Text style={{ fontSize: 14, fontWeight: '500', color: '#455A64' }}>{item.first_name}</Text>
                                    //                 <Text style={{ fontSize: 14, fontWeight: '500', color: '#455A64', marginLeft: 5 }}>{item.last_name} </Text>
                                    //             </TouchableOpacity>


                                    //             <View>

                                    //             </View>
                                    //         </View>

                                    //         {/* </View> */}
                                    //     </LinearGradient>
                                    // </View>
                                    // <View style={{ width: '100%', marginHorizontal: 5, marginBottom: 20 }}>
                                    //     <LinearGradient
                                    //         colors={['rgba(255, 255, 255, 1)', 'rgba(249, 249, 249, 1)']}
                                    //         style={styles.flatlistMainView}
                                    //     >
                                    //         <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    //             <Image source={require('../../../assets/images/comment-person-image.png')} />

                                    //             <View style={{ marginLeft: 10, justifyContent: 'center', flex: 1 }}>
                                    //                 <TouchableOpacity onPress={() => props.navigation.navigate('PeopleProfileScreen')} style={{ flexDirection: 'row' }}>
                                    //                     <Text style={{ fontSize: 14, fontWeight: '500', color: '#455A64' }}>{item.first_name}</Text>
                                    //                     <Text style={{ fontSize: 14, fontWeight: '500', color: 'green', marginLeft: 5 }}>{item.last_name} </Text>
                                    //                 </TouchableOpacity>
                                    //             </View>

                                    //             <View style={{ width: 40, height: 40, backgroundColor: 'red' }} />
                                    //         </View>
                                    //     </LinearGradient>
                                    // </View>
                                    <View style={{ width: '100%', marginHorizontal: 5, }}>
                                        <LinearGradient
                                            colors={['rgba(255, 255, 255, 1)', 'rgba(249, 249, 249, 1)']}
                                            style={styles.flatlistMainView}
                                        >
                                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', alignSelf: 'center' }}>
                                                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                                    {/* <Image source={require('../../../assets/images/comment-person-image.png')} /> */}
                                                    {item.profile_image_url ? (
                                                        <Image
                                                            source={{
                                                                uri: item.profile_image_url
                                                            }}
                                                            style={{ width: 35, height: 35, borderRadius: 90, }}
                                                            resizeMode="contain"
                                                        />
                                                    ) : (
                                                        <Image
                                                            source={require('../../../assets/blankProfile.png')}
                                                            style={{ width: 35, height: 35, borderRadius: 40 }}
                                                        />
                                                    )}
                                                    <View style={{ marginLeft: 20, width: '52%', }}>
                                                        <TouchableOpacity onPress={() => props.navigation.navigate('PeopleChat', { UserId: item.userid, fullname: item.username })} style={{ flexDirection: 'row', }}>
                                                            <Text style={{ fontSize: 14, fontWeight: '500', color: '#455A64', alignSelf: 'center', }}>{item.first_name}</Text>
                                                            <Text style={{ fontSize: 14, fontWeight: '500', color: '#455A64', marginLeft: 5 }}>{item.last_name} </Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>


                                            </View>
                                        </LinearGradient>
                                    </View>
                                )
                            }}
                            keyExtractor={item => item.id}

                        />
                        {isDataEmpty() ?
                            <Text style={{ color: 'black', alignSelf: 'center' }}>No data </Text>
                            : null}
                    </View>






                </View>
                {/* <View style={{ height: 100 }} /> */}

            </ScrollView>
            {loading ? <Loader /> : null}
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    flatlistMainView: {
        flexDirection: 'row',
        backgroundColor: 'white',
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderRadius: 10,
        marginTop: 5,
        marginBottom: 5,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#EDEEEE',

        // flexDirection: 'row',
        // alignItems: 'center',
        // justifyContent: 'space-between',
        // backgroundColor: '#fff',
        // paddingHorizontal: 15,
        // paddingVertical: 10,
        // width: dimensions.SCREEN_WIDTH * 0.9,
        // borderTopLeftRadius: 20,
        // borderTopRightRadius: 20,
        // borderBottomWidth: 1,
        // borderLeftColor: '#EDEEEE',
        // borderRightColor: '#EDEEEE',
        // marginBottom: 20

    },
    numberView: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    numberStyle: {
        fontSize: 14,
        fontWeight: '300',
        color: '#000'
    },
    searchView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: 50,
    },
    searchLeftSubView: {
        width: '83%',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingVertical: 5,
        paddingLeft: 10,
        borderRadius: 10,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 5,
        shadowOpacity: 0.05,
        elevation: 5,
    },
    input: {
        paddingLeft: 10,
        fontSize: 14,
        fontWeight: '300',
        color: '#000',
        flex: 7
    },
    selectedTabView: {
        backgroundColor: '#fff',
        borderRadius: 20,
        // paddingHorizontal:20,
        paddingVertical: 10,
        width: '45%',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#0089CF',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 5,
        shadowOpacity: 1.0,
        elevation: 5,
    },
    unSelectedTabView: {
        // paddingHorizontal:20,
        paddingVertical: 10,
        width: '45%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    tabText: {
        fontSize: 14,
        fontWeight: '400',
        color: '#455A64'
    }
});
export default UserMessage 