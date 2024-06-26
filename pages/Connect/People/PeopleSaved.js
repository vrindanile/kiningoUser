import React, { useEffect, useState, useRef } from 'react';
import { View, Image, Text, StyleSheet, SafeAreaView, TextInput, FlatList, Alert, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import HomeHeaderRoundBottom from '../../../component/HomeHeaderRoundBottom';
import SearchInput2 from '../../../component/SearchInput2';
import Loader from '../../../WebApi/Loader';
import { connect_people_dislike_post, connect_people_follow_user, connect_people_home_page, connect_people_like_post, connect_people_react_post, connect_people_save_post, connect_people_unfollow_user, requestGetApi, requestPostApi, connect_search_post } from '../../../WebApi/Service';
import SearchInputEnt from '../../../component/SearchInputEnt';
import SerchInput from '../../../component/SerchInput';
import { dimensions, Mycolors } from '../../../utility/Mycolors';
import { ImageSlider, ImageCarousel } from "react-native-image-slider-banner";
import MyButtons from '../../../component/MyButtons';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import Modal from 'react-native-modal';
import Toast from 'react-native-simple-toast'
import ViewMoreText from 'react-native-view-more-text';
import ReadMoreComponent from './Components/ReadMoreComponent';
import { saveUserResult, saveUserToken, setVenderDetail, onLogoutUser, savepeoplemoduleuserdata } from '../../../redux/actions/user_action';
import { useSelector, useDispatch } from 'react-redux';
const PeopleSaved = (props) => {
  const dispatch = useDispatch();
  const User = useSelector(state => state.user.user_details)
  const [searchValue, setsearchValue] = useState('')
  const [scrollEnabled, setScrollEnabled] = useState(false)
  const myTextInput = useRef()
  const [multiSliderValue, setMultiSliderValue] = useState([0, 100])
  const [showChooseMilesModal, setShowChooseMilesModal] = useState(false)
  const [loading, setLoading] = useState(false);
  const [isLiked, setIsLiked] = useState('false');
  const [savePost, setSavedPosts] = useState()
  const [upData, setupData] = useState([
    {
      id: '1',
      name: 'Aryav Nadkarni',
      desc: 'Amazing footbal shorts caption this',
      numViews: '183K',
      numComments: '183',
      time: '',
      img: require('../../../assets/images/images.png'),
    },
    {
      id: '2',
      name: 'Aryav Nadkarni',
      desc: 'Amazing footbal shorts caption this',
      numViews: '183K',
      numComments: '183',
      time: '',
      img: require('../../../assets/images/images.png'),
    },
    {
      id: '3',
      name: 'Aryav Nadkarni',
      desc: 'Amazing footbal shorts caption this',
      numViews: '183K',
      numComments: '183',
      time: '',
      img: require('../../../assets/images/images.png'),
    },
    {
      id: '4',
      name: 'Aryav Nadkarni',
      desc: 'Amazing footbal shorts caption this',
      numViews: '183K',
      numComments: '183',
      time: '',
      img: require('../../../assets/images/images.png'),
    },

  ])
  const multiSliderValuesChange = (values) => { setMultiSliderValue(values) }
  useEffect(() => {
    PeopleHome()
  }, [])

  // const PeopleHome = async () => {
  //   setLoading(true)
  //   // console.log("LIKE CLICK:::",isSaved);
  //   const { responseJson, err } = await requestGetApi(connect_people_home_page, '', 'GET', User.token)
  //   setLoading(false)
  //   console.log('the res hhhhhh==>>', responseJson)

  //   if (responseJson.headers.success == 1) {
  //     // setUserdata(responseJson.data)

  //     // setUserid(nameAgeList[0].rest.userid)
  //     // setHomedata(responseJson.body.posts)

  //     const filteredPosts = responseJson.body.posts.filter(post => post.is_saved === true);
  //     setSavedPosts(filteredPosts);
  //     // dispatch(savepeoplemoduleuserdata(responseJson.body.posts[0]))
  //     console.log("response saved screen", filteredPosts);
  //     // Toast.show({ text1: responseJson.headers.message });
  //   } else {

  //     setalert_sms(err)
  //     setMy_Alert(true)
  //   }
  // }
  const PeopleHome = async () => {
    setLoading(true);

    try {
      const { responseJson, err } = await requestGetApi(connect_people_home_page, '', 'GET', User.token);

      setLoading(false);
      console.log('the res hhhhhh==>>', responseJson);

      if (responseJson.headers.success === 1) {
        const filteredPosts = responseJson.body.posts.filter(post => post.is_saved);
        setSavedPosts(filteredPosts);

        console.log("response saved screen", filteredPosts);
      } else {
        setalert_sms(err);
        setMy_Alert(true);
      }
    } catch (error) {
      console.log('Error occurred:', error);
      // Handle the error
    }
  };
  const Likepost = async (items) => {
    console.log("LIKE CLICK:::", isLiked);

    setLoading(true)
    var data = {
      post_id: items,
      reaction_type: "like"
    }
    console.log('====================================');
    console.log(data);
    console.log('====================================');
    const { responseJson, err } = await requestPostApi(connect_people_like_post, data, 'POST', User.token)
    setLoading(false)
    console.log('the res==>>', responseJson)
    if (responseJson.headers.success == 1) {
      PeopleHome()
      // Toast.show({ text1: responseJson.headers.message });
    } else {

      setalert_sms(err)
      setMy_Alert(true)
    }
  }

  const Dislikepost = async (items) => {
    console.log("DISLIKE CLICK:::", isLiked);

    setLoading(true)
    var data = {
      post_id: items,
      reaction_type: "dislike"
    }
    console.log('====================================');
    console.log(data);
    console.log('====================================');
    const { responseJson, err } = await requestPostApi(connect_people_dislike_post, data, 'POST', User.token)
    setLoading(false)
    console.log('the res==>>', responseJson)
    if (responseJson.headers.success == 1) {
      PeopleHome()
      // Toast.show({ text1: responseJson.headers.message });
    } else {

      setalert_sms(err)
      setMy_Alert(true)
    }
  }

  return (
    <SafeAreaView scrollEnabled={scrollEnabled} style={{ backgroundColor: '#F8F8F8' }}>
      <ScrollView>
        <HomeHeaderRoundBottom height={80} paddingHorizontal={15} backgroundColor='#fff'
          press1={() => { props.navigation.goBack() }} img1={require('../../../assets/images/events_arrow.png')} img1width={25} img1height={20}
          press2={() => { }} title2={'Saved'} fontWeight={'500'} fontSize={16} img2height={20} color='#455A64'
          press3={() => { }} img3width={25} img3height={25} borderBottomLeftRadius={25} borderBottomRightRadius={25} />
        <View style={{ width: '90%', alignSelf: 'center', marginTop: 20 }}>


          <View style={{ marginTop: 5, }}>
            <FlatList
              data={savePost}
              showsHorizontalScrollIndicator={false}
              numColumns={1}
              style={{ alignSelf: 'center' }}
              renderItem={({ item, index }) => {
                return (
                  <View style={{ width: '100%', marginVertical: 10, borderRadius: 30 }}>
                    <View style={styles.flatlistMainView}>

                      <View style={styles.followingImageView}>
                        <TouchableOpacity onPress={() => props.navigation.navigate('PeopleProfileScreenOther', { userID: item.userid })}>
                          {/* <Image source={require('../../../assets/images/people-following-person.png')} /> */}
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
                        </TouchableOpacity>
                        <View style={styles.followingView}>
                          <TouchableOpacity onPress={() => props.navigation.navigate('PeopleProfileScreenOther', { userID: item.userid })}>
                            <Text style={{ fontSize: 14, fontWeight: '600', color: '#455A64' }}>{item.first_name + ' ' + item.last_name}</Text>
                          </TouchableOpacity>
                          <Text style={{ fontSize: 13, fontWeight: '400', color: '#B2B7B9', marginTop: 2 }}>Following</Text>
                        </View>
                      </View>

                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={[styles.rightButtonsView, { marginRight: 10, backgroundColor: 'white' }]}>
                          <Image source={''} style={{ width: 20, height: 20 }} resizeMode='contain' />
                        </View>
                        <View style={styles.rightButtonsView}>
                          <Image source={require('../../../assets/images/people-bookmark-selected.png')} style={{ width: 20, height: 20 }} resizeMode='contain' />
                        </View>
                      </View>

                    </View>
                    {/* <TouchableOpacity style={{ width: dimensions.SCREEN_WIDTH, height: 200, backgroundColor: '#F8F8F8', alignSelf: 'center' }}
                    // onPress={()=>{props.navigation.navigate('FoodDetails')}}>
                    >
                      <Image source={item.img} style={{ width: '100%', height: '100%', alignSelf: 'center', }}></Image>
                    </TouchableOpacity> */}
                    {
                      item.post_media === 'image' ?
                        <TouchableOpacity style={styles.imageView}
                          // onPress={()=>{navigation.navigate('FoodDetails')}}>
                          onPress={() => { }}>
                          <Image
                            source={{ uri: `${item.image_url}` }}
                            style={{
                              width: '100%',
                              height: '100%',
                              alignSelf: 'center',
                            }}
                          ></Image>
                          {/* <Image source={item.source} style={{width:'100%',height:'100%',alignSelf:'center',}}></Image> */}
                        </TouchableOpacity>
                        :
                        <VideoPlayer
                          resizeMode="contain"
                          video={{ uri: item.video_url }}
                          videoWidth={dimensions.SCREEN_WIDTH * 0.9}
                          videoHeight={200}
                          autoplay={false}
                          // thumbnail={{ uri: item.thumbnail }}
                          endWithThumbnail
                          disableControlsAutoHide
                          customStyles={{
                            // thumbnail: { width: dimensions.SCREEN_WIDTH * 0.9, height: 300 },
                            // videoWrapper: {width: dimensions.SCREEN_WIDTH, height:300},
                            wrapper: { width: dimensions.SCREEN_WIDTH * 0.9, },
                          }}
                        />
                    }

                    <View style={styles.flatlistMainBottomView}>

                      <View style={styles.flatlistBottomView}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', right: 9 }}>
                          {/* <TouchableOpacity onPress={() => { true ? props.navigation.navigate('PeopleMessages') : props.navigation.navigate('PeopleFollowers') }} style={{ marginRight: 10 }}>
                            <Image source={require('../../../assets/images/people-like.png')} style={{ width: 25, height: 25 }} />
                          </TouchableOpacity> */}
                          <TouchableOpacity onPress={() => { item.is_liked ? Dislikepost(item.id) : Likepost(item.id) }} style={{ marginRight: 10 }}>
                            <Image source={item.is_liked ? require('../../../assets/images/people-sel-heart.png') : require('../../../assets/images/people-like.png')} style={{ width: 25, height: 25 }} />
                          </TouchableOpacity>
                          <TouchableOpacity onPress={() => props.navigation.navigate('PeopleComments', { data: item })} style={{ marginRight: 10 }}>
                            <Image source={require('../../../assets/images/people-comment.png')} style={{ width: 25, height: 25 }} />
                          </TouchableOpacity>
                          {/* <TouchableOpacity onPress={() => props.navigation.navigate('PeopleChat')} style={{ marginRight: 10 }}>
                            <Image source={require('../../../assets/images/people-message.png')} style={{ width: 25, height: 25 }} />
                          </TouchableOpacity> */}
                          <TouchableOpacity onPress={() =>
                            //MycustomonShare()
                            props.navigation.navigate('PeopleMessageList', { userID: item.userid })
                          } style={{ marginRight: 10 }}>
                            <Image source={require('../../../assets/People/SharePostPeople.png')} style={{ width: 25, height: 25 }} />
                          </TouchableOpacity>
                        </View>
                        <Text style={styles.text1}></Text>
                      </View>

                      {/* <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                        <Image source={require('../../../assets/images/people-liked-by.png')} style={{ width: 30, height: 30 }} resizeMode='contain' />
                        <Text style={[styles.text1, { marginLeft: 10 }]}>Liked by Jerry paul and 23.3 K others</Text>
                      </View> */}
                      {
                        item.num_of_liked_users > 0 ?
                          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }} onPress={() => {

                            props.navigation.navigate('LikedUserList', { postid: item.id })
                          }}>
                            {/* <Image source={require('../../../assets/images/people-liked-by.png')} style={{ width: 30, height: 30 }} resizeMode='contain' /> */}
                            {/* <Image source={require('../../../assets/blankProfile.png')} style={{ width: 35, height: 35, borderRadius: 30 }} /> */}
                            <Text style={[styles.text1, {}]}>
                              Liked by {item.last_liked_user}
                              {item.num_of_liked_users.length > 1 ? ` and ${item.num_of_liked_users} others` : ''}
                            </Text>
                          </TouchableOpacity>
                          :
                          null
                      }

                      {
                        item.post_description != null ?
                          <View style={{ flex: 1, top: 3, right: 5 }}>
                            {/* <Text style={styles.text1}>Amazing football shorts caption this<Text style={{color:'#B2B7B9'}}>…More</Text></Text> */}
                            {item.post_description?.length > 50 ?
                              <ReadMoreComponent text={item.post_description} /> :
                              <Text style={{
                                fontSize: 12,
                                fontWeight: '400',
                                color: '#455A64',
                              }}>{item.post_description}</Text>

                            }
                          </View>
                          :
                          null
                      }

                      {/* <TouchableOpacity onPress={() => props.navigation.navigate('PeopleComments')} style={{ marginTop: 5 }}>
                        <Text style={{ fontSize: 12, fontWeight: '400', color: '#0089CF' }}>View all 183 comments</Text>
                      </TouchableOpacity> */}
                      {
                        item.num_of_comments > 0 ?
                          <TouchableOpacity onPress={() => props.navigation.navigate('PeopleComments', { data: item })} style={{ marginTop: 5 }}>
                            <Text style={{ fontSize: 12, fontWeight: '400', color: '#0089CF' }}>View all {item.num_of_comments} comments</Text>
                          </TouchableOpacity>
                          :
                          null

                      }

                      {/* <View style={{ marginTop: 10 }}>
                        <Text style={{ fontSize: 10, fontWeight: '400', color: '#B2B7B9' }}>23 min ago</Text>
                      </View> */}
                      <View style={{ marginTop: 10, left: 2 }}>
                        <Text style={{ fontSize: 10, fontWeight: '400', color: '#B2B7B9' }}>{item.created_date.slice(11, 16)} min ago</Text>
                      </View>
                    </View>
                  </View>
                )
              }}
              keyExtractor={item => item.id}
            />
          </View>






        </View>
        <View style={{ height: 100 }} />

      </ScrollView>
      {
        loading ?
          <Loader />
          : null
      }
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  topButtonView: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    shadowColor: '#0089CF',
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 1,
    shadowOpacity: 0.1,
    elevation: 5,
  },
  createPostView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: 50,
  },
  createPostLeftSubView: {
    width: '83%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 5,
    paddingLeft: 10,
    borderRadius: 10,
  },
  createPostText: {
    color: '#B2B7B9',
    fontSize: 14,
    fontWeight: '300',
    marginLeft: 10
  },
  flatlistMainView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 10,
    width: '90%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  rightButtonsView: {
    backgroundColor: '#F8F8F8',
    padding: 10,
    borderRadius: 20
  },
  followingImageView: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  followingView: {
    justifyContent: 'center',
    marginLeft: 10
  },
  flatlistMainBottomView: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 20,
    width: '90%',
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20
  },
  flatlistBottomView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text1: {
    fontSize: 13,
    fontWeight: '400',
    color: '#455A64',

  },
  imageView: {
    width: dimensions.SCREEN_WIDTH,
    height: 200,
    backgroundColor: '#F8F8F8',
    alignSelf: 'center'
  },
});
export default PeopleSaved 