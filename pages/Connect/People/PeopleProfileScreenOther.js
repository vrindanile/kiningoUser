import React, { useEffect, useState, useRef } from 'react';
import { View, Image, Text, StyleSheet, SafeAreaView, TextInput, FlatList, Alert, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import HomeHeaderRoundBottom from '../../../component/HomeHeaderRoundBottom';
import SearchInput2 from '../../../component/SearchInput2';
import SearchInputEnt from '../../../component/SearchInputEnt';
import ImagePicker from 'react-native-image-crop-picker';

import SerchInput from '../../../component/SerchInput';
import { dimensions, Mycolors } from '../../../utility/Mycolors';
import { ImageSlider, ImageCarousel } from "react-native-image-slider-banner";
import MyButtons from '../../../component/MyButtons';
import Modal from 'react-native-modal';
import Toast from 'react-native-toast-message';
import LinearGradient from 'react-native-linear-gradient'
import VideoPlayer from 'react-native-video-player'
import { createThumbnail } from "react-native-create-thumbnail";
import Loader from '../../../WebApi/Loader';
import PostsModal from './modals/PostsModal';
import ProfileScreenMoreModal from './modals/ProfileScreenMoreModal';
// import VideoPlayer from 'react-native-video-player'
import { saveUserResult, saveUserToken, setVenderDetail, onLogoutUser, savepeoplemoduleuserdata } from '../../../redux/actions/user_action';
import { connect_people_block_user, connect_people_react_post, connect_people_save_post, connect_people_user_profile, requestGetApi, requestPostApi, connect_edit_profile, connect_people_like_post, connect_people_home_page } from '../../../WebApi/Service';
import { useSelector, useDispatch } from 'react-redux';
import { log } from 'react-native-reanimated';

const PeopleProfileScreenOther = (props, route) => {
  const User = useSelector(state => state.user.user_details);
  const Userpeople = useSelector(state => state.user.people_user);
  const [loading, setLoading] = useState(false);
  const [searchValue, setsearchValue] = useState('')
  const [scrollEnabled, setScrollEnabled] = useState(false)
  const myTextInput = useRef()
  const [multiSliderValue, setMultiSliderValue] = useState([0, 100])
  const [firstname, setFirName] = useState('')
  // console.log('fis', firstname);
  const [lastname, setSecName] = useState('')

  const [showPostsModal, setShowPostsModal] = useState(false)
  const [showMoreModal, setShowMoreModal] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState(1)
  const [startFromIndex, setStartFromIndex] = useState(0)
  const [isLiked, setIsLiked] = useState('false');
  const [originalData, setOriginalData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [userdata, setUserdata] = useState('');
  const [userMess, setUSerMess] = useState('')
  const [followStatus, setFoolowStatus] = useState('')
  const [following, setFollowi] = useState('')
  const [postCount, setPostC] = useState('')
  const [foolCount, setFollCount] = useState('')
  const [uploadedpost, setUploadpostdata] = useState([]);
  const [userID, setUserId] = useState(props?.route?.params?.userID)
  const [statusFoll, setStatusFoll] = useState('')
  const [profileImg, setProfileImg] = useState('')
  const [fullname, setFullName] = useState('')
  const [upData, setupData] = useState([
    {
      id: '1',
      name: 'Aryav Nadkarni',
      desc: 'Amazing footbal shorts caption this',
      numViews: '183K',
      numComments: '183',
      time: '',
      type: 'image',
      source: require('../../../assets/images/people-one-post-image.png'),
    },
    {
      id: '2',
      name: 'Aryav Nadkarni',
      desc: 'Amazing footbal shorts caption this',
      numViews: '183K',
      numComments: '183',
      time: '',
      type: 'image',
      type: 'video',
      source: `http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4`,
    },
    {
      id: '3',
      name: 'Aryav Nadkarni',
      desc: 'Amazing footbal shorts caption this',
      numViews: '183K',
      numComments: '183',
      time: '',
      type: 'image',
      source: require('../../../assets/images/people-one-post-image.png'),
    },
    {
      id: '4',
      name: 'Aryav Nadkarni',
      desc: 'Amazing footbal shorts caption this',
      numViews: '183K',
      numComments: '183',
      time: '',
      type: 'image',
      source: require('../../../assets/images/people-one-post-image.png'),
    },
    {
      id: '5',
      name: 'Aryav Nadkarni',
      desc: 'Amazing footbal shorts caption this',
      numViews: '183K',
      numComments: '183',
      time: '',
      type: 'image',
      source: require('../../../assets/images/people-one-post-image.png'),
    },
    {
      id: '6',
      name: 'Aryav Nadkarni',
      desc: 'Amazing footbal shorts caption this',
      numViews: '183K',
      numComments: '183',
      time: '',
      type: 'image',
      source: require('../../../assets/images/people-one-post-image.png'),
    },
    {
      id: '7',
      name: 'Aryav Nadkarni',
      desc: 'Amazing footbal shorts caption this',
      numViews: '183K',
      numComments: '183',
      time: '',
      type: 'image',
      type: 'video',
      source: `http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4`,
    },
    {
      id: '8',
      name: 'Aryav Nadkarni',
      desc: 'Amazing footbal shorts caption this',
      numViews: '183K',
      numComments: '183',
      time: '',
      type: 'image',
      source: require('../../../assets/images/people-one-post-image.png'),
    }, {
      id: '9',
      name: 'Aryav Nadkarni',
      desc: 'Amazing footbal shorts caption this',
      numViews: '183K',
      numComments: '183',
      time: '',
      type: 'image',
      source: require('../../../assets/images/people-one-post-image.png'),
    }, {
      id: '10',
      name: 'Aryav Nadkarni',
      desc: 'Amazing footbal shorts caption this',
      numViews: '183K',
      numComments: '183',
      time: '',
      type: 'image',
      source: require('../../../assets/images/people-one-post-image.png'),
    }, {
      id: '11',
      name: 'Aryav Nadkarni',
      desc: 'Amazing footbal shorts caption this',
      numViews: '183K',
      numComments: '183',
      time: '',
      type: 'image',
      source: require('../../../assets/images/people-one-post-image.png'),
    },

  ])
  const [buttonText, setButtonText] = useState('Block');

  const [userId, setUSerId] = useState('')
  const [status, setStatus] = useState('block');
  const [imageSource, setImageSource] = useState(require('../../../assets/images/people-block.png'));

  const multiSliderValuesChange = (values) => { setMultiSliderValue(values) }
  useEffect(() => {
    // const tet = props.route.params.userID;
    // console.log(props.route.params.userID, '==========')

    // setUserId(tet)
    // Userprofile()
    // PeopleHome()

  }, [])
  // useEffect(() => {
  //   const unsubscribe = props.navigation.addListener('blur', () => {
  //     setShowMoreModal(false)
  //   });
  //   return unsubscribe;
  // }, [props.navigation]);
  const Likepost = async (items) => {
    // console.log("LIKE CLICK:::", isLiked);

    setLoading(true)
    var data = {
      post_id: items,
      reaction_type: "like"
    }
    // console.log('====================================');
    console.log(data);
    // console.log('====================================');
    const { responseJson, err } = await requestPostApi(connect_people_like_post, data, 'POST', User.token)
    setLoading(false)
    console.log('the res==>>', responseJson)
    if (responseJson.headers.success == 1) {
      //PeopleHome()
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
    console.log('====================================', userMess);
    console.log(data);
    console.log('====================================');
    const { responseJson, err } = await requestPostApi(connect_people_dislike_post, data, 'POST', User.token)
    setLoading(false)
    console.log('the res==>>', responseJson)
    if (responseJson.headers.success == 1) {
      // PeopleHome()
      // Toast.show({ text1: responseJson.headers.message });
    } else {

      setalert_sms(err)
      setMy_Alert(true)
    }
  }

  const handlePress = () => {
    const newStatus = status === 'block' ? 'unblock' : 'block';
    setStatus(newStatus);

    const newImageSource = imageSource === require('../../../assets/images/people-block.png')
      ? require('../../../assets/Prohibit.png')
      : require('../../../assets/images/people-block.png');
    setImageSource(newImageSource);
    const newButtonText = newStatus === 'block' ? 'Block' : 'Unblock';
    setButtonText(newButtonText);
    // Call your API or perform any other necessary actions here.
    BlockButton()
  };
  const generateThumb = async (data) => {
    console.log('generateThumb------');
    setLoading(true)
    try {

      const updatedData = data.map(async el => {
        if (el.post_type === 'video') {
          const resp = await createThumbnail({
            // url: `http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4`,
            url: el.video_url
            ,
            timeStamp: 10000,
            // cacheName: `http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4`

          })
          console.log('-------------------');
          const promise1 = Promise.resolve(resp)
          promise1.then((value) => {
            console.log(value, 'valueeeee');
            console.log('responsre tumbh', resp);
            return { ...el, thumbnail: resp.path }

          });

        } else {
          return el
        }
      })
      //  setupData([...updatedData])
      setOriginalData([...updatedData])
      setFilteredData([...updatedData])
      console.log('filter data 2', updatedData);
    } catch (error) {
      console.log('thumbnail creating error', error);
    }
    setLoading(false)
  }

  const onChangeFilter = (newFilter) => {
    console.log('setFilter data1', originalData);
    // if (newFilter === selectedFilter) {
    //   return
    // }

    setSelectedFilter(newFilter)
    if (newFilter === 1) {
      setFilteredData([...originalData])
    } else if (newFilter === 2) {
      console.log('filter22', originalData?.filter(el => el?.post_type === 'image'));
      setFilteredData(originalData?.filter(el => el?.post_type === 'image'))
    } else if (newFilter === 3) {
      console.log('filter33', originalData?.filter(el => el?.post_type === 'video'));
      setFilteredData(originalData?.filter(el => el?.post_type === 'video'))
    }
  }
  const Userprofile = async () => {
    console.log('i want to check')

    // console.log("PeopleProfileScreenMog:::", responseJson.data.userProfleDetails.userid);
    setLoading(true)
    const { responseJson, err } = await requestGetApi(connect_people_user_profile + userID, '', 'GET', User.token)

    setLoading(false)
    console.log('the res  mmmm==>>', responseJson.data)
    if (responseJson.success == 1) {
      console.log('jjjjjjjjjjjjjjjjjjjjjjjj', responseJson.data.userProfleDetails.userid)

      setProfileImg(responseJson.data.userProfleDetails.image_url)
      setUserdata(responseJson.data.posts)
      setFirName(responseJson.data.userProfleDetails.first_name
      )
      setUSerMess(responseJson.data.userProfleDetails.userid)
      setFullName(responseJson.data.userProfleDetails.username)
      setSecName(responseJson.data.userProfleDetails.last_name)
      setFollCount(responseJson.data.followersCount
      )
      setFoolowStatus(responseJson.data.isFollowing)
      setFollowi(responseJson.data.followingsCount)
      setPostC(responseJson.data.postsCount
      )

      setUploadpostdata(responseJson.data.posts)
      const data = responseJson.data.posts.filter(el => el.post_type != null)
      console.log('data profile1', data);
      setOriginalData(data)
      setFilteredData(data)

      // generateThumb(responseJson.data.posts)
      console.log("response iiiiiiiii", nameAgeList[0].userid);
      setStatusFoll(responseJson.data.isFollowing)
      const nameAgeList = responseJson.data.posts.map(({ post_id, userid, ...rest }) => ({ post_id, userid, ...rest }));

      // Accessing the userid for the first object in the nameAgeList array
      const userId = nameAgeList[0].userid;
      const status = nameAgeList
      console.log('my status', status);
      setUSerId(responseJson.data.userProfleDetails.userid)
      console.log('origial data-----------', responseJson.data.userProfleDetails.userid

      );




      // console.log("response hOME post", responseJson.data.posts);
      // Toast.show({ text1: responseJson.headers.message });
    } else {

      setalert_sms(err)
      setMy_Alert(true)
    }
  }
  const isDataEmpty = () => {
    if (filteredData.length == 0) {
      return true
    } else {

      return false

    }
  }
  const BlockButton = async () => {
    //  console.log("LIKE CLICK:::",isLiked);

    setLoading(true)
    var data = {
      blocked_id: userID,
      blocked_type: status
    }
    // console.log('====================================');
    // console.log(data);
    console.log('====================================',);
    const { responseJson, err } = await requestPostApi(connect_people_block_user, data, 'POST', User.token)
    setLoading(false)
    console.log('the res==>>', responseJson)
    if (responseJson.headers.success == 1) {
      // setIsLiked('true')
      Toast.show({ text1: responseJson.headers.message });
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
          press2={() => { }} title2={'People'} fontWeight={'500'} fontSize={16} img2height={20} color='#455A64'
          press3={() => { }} img3width={25} img3height={25} borderBottomLeftRadius={25} borderBottomRightRadius={25} />
        <View style={{ width: '90%', alignSelf: 'center', marginTop: 20 }}>

          <LinearGradient
            colors={['rgba(255, 255, 255, 1)', 'rgba(249, 249, 249, 1)']}
            style={styles.descriptionView}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ flex: 1 }}>
                {/* <Image source={require('../../../assets/images/people-following-person.png')} /> */}
                {profileImg ? (
                  <Image
                    source={{
                      uri: profileImg
                    }}
                    style={{ width: 35, height: 35, borderRadius: 90, marginLeft: 12 }}
                    resizeMode="contain"
                  />
                ) : (
                  <Image
                    source={require('../../../assets/blankProfile.png')}
                    style={{ width: 35, height: 35, borderRadius: 30 }}
                  />
                )}

              </View>
              {/* <View style={styles.descriptionView}> */}
              <View style={{ flex: 5 }}>
                <View style={styles.imageRowView}>

                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {console.log('hhhhhhhh-----------', `${firstname}`)}
                    <Text style={{ fontSize: 14, fontWeight: '600', color: '#455A64' }}>{`${firstname} ${lastname}`}</Text>
                  </View>

                  <View style={styles.followingView}>
                    <Text style={{ fontSize: 14, fontWeight: '400', color: '#455A64' }}>
                      {followStatus ? 'Following' : 'Follow'}
                    </Text>

                  </View>

                  <TouchableOpacity style={styles.threeDotsView} onPress={() => { setShowMoreModal(true) }}>
                    <Image source={require('../../../assets/images/people-three-dots.png')} style={{ width: 20, height: 20 }} resizeMode='contain' />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', marginTop: 10 }}>
              <LinearGradient
                colors={['rgba(255, 255, 255, 1)', 'rgba(249, 249, 249, 1)']}
                style={[styles.numView, { marginRight: 10 }]}
              >
                <Text style={styles.numValue}>{postCount}</Text>
                <Text style={styles.numText}>Posts</Text>
              </LinearGradient>
              <LinearGradient
                colors={['rgba(255, 255, 255, 1)', 'rgba(249, 249, 249, 1)']}
                style={[styles.numView, { marginRight: 10 }]}
              >
                <TouchableOpacity onPress={() => props.navigation.navigate('PeopleFollowers', { gotoFollowersTab: 'yes', firstname: firstname, lastname: lastname, userId: userMess })} style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={styles.numValue}>{foolCount}</Text>
                  <Text style={styles.numText}>Followers</Text>
                </TouchableOpacity>
              </LinearGradient>
              <LinearGradient
                colors={['rgba(255, 255, 255, 1)', 'rgba(249, 249, 249, 1)']}
                style={styles.numView}
              >
                <TouchableOpacity onPress={() => props.navigation.navigate('PeopleFollowers', { gotoFollowersTab: 'no', firstname: firstname, lastname: lastname, userId: userMess })} style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={styles.numValue}>{following}</Text>
                  <Text style={styles.numText}>Following</Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>

            {/* <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-evenly', marginTop:20}}> */}
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 20, marginHorizontal: 30 }}>
              <TouchableOpacity style={[styles.blueButtonSuperView, { backgroundColor: '#43BA5E' }]} onPress={() => {
                props.navigation.navigate('PeopleChat', { UserId: userMess, fullname: fullname }
                )
              }}>
                <View style={styles.blueButtonSubView}>
                  <Image source={require('../../../assets/images/people-message2.png')} />
                  <Text style={styles.blueButtonText}>Message</Text>
                </View>
              </TouchableOpacity>

              {/* <TouchableOpacity style={styles.blueButtonSuperView}>
                <View style={styles.blueButtonSubView}>
                  <Image source={require('../../../assets/images/people-block.png')} />
                  <Text style={styles.blueButtonText}>Block</Text>
                </View>
              </TouchableOpacity> */}
              <TouchableOpacity style={[styles.blueButtonSuperView, { backgroundColor: '#DA3335' }]} onPress={handlePress}>
                <View style={[styles.blueButtonSubView, {}]}>
                  <Image source={imageSource} />
                  <Text style={styles.blueButtonText}>{buttonText}</Text>
                </View>
              </TouchableOpacity>
            </View>
            {/* </View> */}
          </LinearGradient>

          <View style={styles.allFiltersRow}>
            <View style={styles.filter1View}>
              <TouchableOpacity onPress={() => onChangeFilter(1)}>
                {console.log('filter value', selectedFilter)}
                <Image source={selectedFilter == 1 ? require('../../../assets/images/people-all-filter-selected.png') : require('../../../assets/images/people-all-filter.png')} />
              </TouchableOpacity>
            </View>
            <View style={styles.filter2View}>
              <TouchableOpacity onPress={() => onChangeFilter(2)}>
                <Image source={selectedFilter == 2 ? require('../../../assets/images/people-image-filter-selected.png') : require('../../../assets/images/people-image-filter.png')} />
              </TouchableOpacity>
            </View>
            <View style={styles.filter3View}>
              <TouchableOpacity onPress={() => onChangeFilter(3)}>
                <Image source={selectedFilter == 3 ? require('../../../assets/images/people-video-filter-selected.png') : require('../../../assets/images/people-video-filter.png')} />
              </TouchableOpacity>
            </View>
          </View>

          {/* {upData?.filter(el=>el.type === 'video').map(item=>{
      return (
        <VideoPlayer
          video={{ uri: item.source }}
          videoWidth={1600}
          videoHeight={900}
          thumbnail={{ uri: item.thumbnail }}
      />
      )
    })} */}

          <View style={{ marginTop: 10 }}>
            <FlatList
              data={filteredData}
              showsHorizontalScrollIndicator={false}
              numColumns={3}
              style={{ alignSelf: filteredData?.length < 3 ? 'flex-start' : 'center' }}
              renderItem={({ item, index }) => {
                console.log('itemmmmmm1------->', item.image_url);
                return (
                  <View style={{ width: 120, marginHorizontal: index % 3 == 1 ? 5 : 0, height: 120, marginBottom: 5 }}>
                    <TouchableOpacity style={{ width: '100%', height: 'auto', backgroundColor: '#F8F8F8', alignSelf: 'center' }}
                      onPress={() => { setStartFromIndex(index); setShowPostsModal(true); }}>
                      {item.post_type === 'image' ?
                        <Image source={{ uri: `${item.image_url}` }} style={{ width: '100%', height: '100%', alignSelf: 'center', }} resizeMode='contain' ></Image>
                        :
                        // <ImageBackground source={{ uri: item.thumbnail }} style={{ width: '100%', height: '100%', alignSelf: 'center', justifyContent: 'center' }} resizeMode='cover' >
                        //   <Image source={require('../../../assets/images/people-play-button.png')} style={{ width: '30%', height: '30%', alignSelf: 'center', }} resizeMode='contain' ></Image>
                        // </ImageBackground>
                        <VideoPlayer
                          video={{ uri: item.source }}
                          videoWidth={'100%'}
                          videoHeight={'80%'}
                          thumbnail={{ uri: item.video_url }}
                          endWithThumbnail
                          disableControlsAutoHide
                          customStyles={{
                            thumbnail: { width: '100%', height: '80%' },
                            // videoWrapper: {width: dimensions.SCREEN_WIDTH, height:300},
                            wrapper: { alignSelf: 'center' },
                          }}
                        />
                      }
                    </TouchableOpacity>
                  </View>
                )
              }}
              keyExtractor={item => item.id}
            />
            {isDataEmpty() ?
              <Text style={{ color: 'black', alignSelf: 'center' }}>No video found</Text>
              : null}
          </View>

        </View>
        <View style={{ height: 100 }} />

      </ScrollView>

      <PostsModal
        isVisible={showPostsModal}
        setIsVisible={setShowPostsModal}
        data={filteredData}
        startFromIndex={startFromIndex}
        additionalParam={userID}
      />
      <ProfileScreenMoreModal
        isVisible={showMoreModal}
        setIsVisible={setShowMoreModal}
      />
      {loading ? <Loader /> : null}
    </SafeAreaView >
  );
}
const styles = StyleSheet.create({
  descriptionView: {
    backgroundColor: '#fff',
    paddingTop: 10,
    paddingHorizontal: 10,
    paddingBottom: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 0.03,
    elevation: 1,
  },
  imageRowView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  followingView: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 20,
    shadowColor: '#0089CF',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 0.1,
    elevation: 5,
  },
  numView: {
    alignItems: 'center',
    width: 90,
    height: 90,
    justifyContent: 'center',
    borderRadius: 15,
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 0.03,
    elevation: 1,
  },
  numValue: {
    fontSize: 20,
    fontWeight: '500',
    color: '#455A64'
  },
  numText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#455A64'
  },
  blueButtonView: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0089CF',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    shadowColor: '#0089CF',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 0.1,
    elevation: 1,
  },
  blueButtonSuperView: {
    justifyContent: 'center',
    backgroundColor: '#0089CF',
    width: 120,
    height: 40,
    borderRadius: 20,
    shadowColor: '#0089CF',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 0.1,
    elevation: 1,
  },
  blueButtonSubView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    justifyContent: 'center'
  },
  blueButtonText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#fff',
    marginLeft: 10
  },
  allFiltersRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    paddingHorizontal: 20
  },
  filter1View: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  filter2View: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  filter3View: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  threeDotsView: {
    backgroundColor: '#F8F8F8',
    padding: 10,
    borderRadius: 20
  },
});
export default PeopleProfileScreenOther 