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
import { connect_people_dislike_post, connect_people_follow_user, connect_people_home_page, connect_people_like_post, connect_people_react_post, connect_people_save_post, connect_people_unfollow_user, requestGetApi, requestPostApi, connect_search_post, connect_search_users } from '../../../WebApi/Service';
import Loader from '../../../WebApi/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { saveUserResult, saveUserToken, setVenderDetail, onLogoutUser, savepeoplemoduleuserdata } from '../../../redux/actions/user_action';
import Header from './Components/Header';
import { useSelector, useDispatch } from 'react-redux';
import Share from 'react-native-share';
const image1 = require('../../../assets/images/people-following-person.png')
const onlinePersonImageWidth = 50
const onlineDotWidth = 12

const PeopleMessages = (props) => {
  const dispatch = useDispatch();
  const User = useSelector(state => state.user.user_details)
  const [searchValue, setsearchValue] = useState('')
  const [loading, setLoading] = useState(false);
  const [scrollEnabled, setScrollEnabled] = useState(false)
  const myTextInput = useRef()
  const [userMessage, setUserMessage] = useState('')
  const [multiSliderValue, setMultiSliderValue] = useState([0, 100])
  const [showChooseMilesModal, setShowChooseMilesModal] = useState(false)
  const [homeData, setHomedata] = useState('')

  const [upData, setupData] = useState([
    {
      id: '1',
      name: 'Chetan Manne',
      isOnline: true,
      message: 'Nice video jane liked…. Recent message short preview',
      img: require('../../../assets/images/comment-person-image.png'),
    },
    {
      id: '2',
      name: 'Chetan Manne',
      isOnline: false,
      message: 'Nice video jane liked…. Recent message short preview',
      img: require('../../../assets/images/comment-person-image.png'),
    },
    {
      id: '3',
      name: 'Chetan Manne',
      isOnline: true,
      message: 'Nice video jane liked…. Recent message short preview',
      img: require('../../../assets/images/comment-person-image.png'),
    },
    {
      id: '4',
      name: 'Chetan Manne',
      isOnline: false,
      message: 'Nice video jane liked…. Recent message short preview',
      img: require('../../../assets/images/comment-person-image.png'),
    },
  ])
  // const isDataEmpty = () => {

  //   if (homeData?.length === 0) {
  //     return true
  //   } else {
  //     return false


  //   }
  // }
  const PeopleHome = async () => {
    setLoading(true)
    // console.log("LIKE CLICK:::",isSaved);
    const { responseJson, err } = await requestGetApi(connect_search_users, '', 'GET', User.token)
    setLoading(false)
    console.log('the res search==>>', responseJson.body.data)
    if (responseJson.headers.success == 1) {
      setHomedata(responseJson.body.data)
      // dispatch(savepeoplemoduleuserdata(responseJson.body.posts[0]))
      //  console.log("response hOME", responseJson.body);
      //Toast.show({ text1: responseJson.headers.message });
    } else {

      console.log(err);
    }
  }
  const getData = async () => {
    setLoading(true)
    //'?name='+searchValue.text+'&lat='+lat+'&long='+long
    var fUrl = connect_search_users
    var urls = '?username=' + searchValue
    console.log('mu url---------?', urls);
    console.log('my url---------->', urls)
    if (urls != undefined) {
      fUrl = fUrl + urls
    }
    const { responseJson, err } = await requestGetApi(fUrl, '', 'GET', User.token)
    setLoading(false)
    console.log('the res get shop_eat_business ==>>', responseJson.body.data)
    if (responseJson.headers.success == 1) {
      console.log(responseJson?.body?.posts, 'my get data');
      setHomedata(responseJson?.body?.data)

      //setresData(responseJson.body)
    } else {
      // setalert_sms(err)
      // setMy_Alert(true)

    }

  }
  const isDataEmpty = () => {

    if (homeData?.length === 0) {
      return true
    } else {
      return false
    }

  }
  useEffect(() => {
    PeopleHome()
  }, [])
  return (
    <SafeAreaView scrollEnabled={scrollEnabled} style={{}}>
      <ScrollView>
        <View style={{ flexDirection: 'row', alignItems: 'center', height: 80, padding: 20, borderBottomLeftRadius: 25, borderBottomRightRadius: 25, backgroundColor: 'white' }}>
          <TouchableOpacity onPress={() => { props.navigation.goBack() }}>
            <Image source={require('../../../assets/images/events_arrow.png')} style={{ width: 25, height: 20 }} />
          </TouchableOpacity>

          <Text style={{ fontSize: 16, fontWeight: '600', color: '#455A64', marginLeft: '35%' }}>Search</Text>
        </View>
        <View style={{ width: '90%', alignSelf: 'center', marginTop: 20 }}>


          <View style={styles.searchView}>
            <View style={styles.searchLeftSubView}>
              <TextInput
                value={searchValue}
                onChangeText={e => {
                  setsearchValue(e)

                  if (e == '') {
                    PeopleHome()
                  }
                }
                }

                placeholder="Search"

                placeholderTextColor={'#B2B7B9'}
                style={styles.input}
              />
            </View>
            <TouchableOpacity onPress={() => { getData() }}>
              <Image source={require('../../../assets/images/people-search.png')} style={{ width: 50, height: 50 }} />
            </TouchableOpacity>
          </View>

          <View style={{ width: '100%', alignSelf: 'center', marginTop: 20, }}>
            <FlatList
              data={homeData}

              showsHorizontalScrollIndicator={false}
              numColumns={1}
              renderItem={({ item, index }) => {

                //   console.log('homeData================', item);
                return (
                  <View style={{ width: '100%', marginHorizontal: 5, marginBottom: 20 }}>
                    <LinearGradient
                      colors={['rgba(255, 255, 255, 1)', 'rgba(249, 249, 249, 1)']}
                      style={styles.flatlistMainView}
                    >
                      {/* <View style={styles.flatlistMainView}> */}
                      <View>
                        {/* <Image source={require('../../../assets/blankProfile.png')}


                          style={styles.onlinePerson}
                          //style={{ height: 30, width: 30, borderRadius: 30 }}



                          resizeMode='contain' /> */}
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
                        {item.isOnline ?
                          <View style={styles.onlineDot} />
                          : null}
                      </View>
                      <View style={{ marginLeft: 15, justifyContent: 'space-between' }}>
                        {/* <Text style={{ fontSize: 14, fontWeight: '500', color: '#455A64' }}>{item.name}</Text> */}
                        <View style={{ flexDirection: 'row' }}>
                          <Text style={{ fontSize: 14, fontWeight: '500', color: '#455A64' }}>{item.username}</Text>

                        </View>
                        <View style={{ width: '95%', flexDirection: 'row' }}>
                          <Text style={{ fontSize: 14, fontWeight: '500', color: '#455A64' }}>{item.first_name}</Text>
                          <Text style={{ fontSize: 14, fontWeight: '500', color: '#455A64', marginLeft: 5 }}>{item.last_name}</Text>
                        </View>
                      </View>

                      {/* </View> */}
                    </LinearGradient>
                  </View>
                )
              }}
              keyExtractor={item => item.id}
            />
            {isDataEmpty() ?
              <Text style={{ color: 'black', alignSelf: 'center' }}>No data found</Text>
              : null}
          </View>






        </View>
        <View style={{ height: 100 }} />
        {loading ?
          <Loader />
          : null}
      </ScrollView>

    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  flatlistMainView: {
    flexDirection: 'row',
    // backgroundColor:'#fff', 
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderColor: '#E0E0E0'
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
  onlinePerson: {
    width: onlinePersonImageWidth,
    height: onlinePersonImageWidth,
    borderRadius: 30
  },
  onlineDot: {
    backgroundColor: '#29913C',
    width: onlineDotWidth,
    height: onlineDotWidth,
    position: 'absolute',
    borderRadius: onlineDotWidth / 2,
    left: onlinePersonImageWidth - 8,
    top: onlinePersonImageWidth / 2 - 3,
    borderWidth: 2,
    borderColor: '#fff'
  }
});
export default PeopleMessages 