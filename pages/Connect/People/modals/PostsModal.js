// import React, { useEffect, pnguseState, useRef, useState } from 'react';
// import {
//   View,
//   Image,
//   Text,
//   StyleSheet,
//   SafeAreaView,
//   TextInput,
//   FlatList,
//   Alert,
//   TouchableOpacity,
//   ScrollView,
//   ImageBackground,
// } from 'react-native';
// import Modal from 'react-native-modal';
// import Toast from 'react-native-toast-message';
// import { dimensions, Mycolors } from '../../../../utility/Mycolors';
// import VideoPlayer from 'react-native-video-player'
// import { useNavigation } from '@react-navigation/native';
// import ReadMoreComponent from '../Components/ReadMoreComponent';
// import { connect_people_react_post, connect_people_save_post, requestGetApi, requestPostApi, connect_people_like_post, connect_people_dislike_post, connect_people_home_page } from '../../../../WebApi/Service';
// import Loader from '../../../../WebApi/Loader';

// import { useSelector, useDispatch } from 'react-redux';

// const PostsModal = ({ isVisible, setIsVisible, data, startFromIndex = 0 }) => {
//   const User = useSelector(state => state.user.user_details)
//   const [loading, setLoading] = useState(false);
//   const navigation = useNavigation();
//   const [initialIndex, setInitialIndex] = useState(null);
//   const [isSaved, setIsSaved] = useState(false);
//   const [isLiked, setIsLiked] = useState(false);
//   const [homedata, setHomedata] = useState('')
//   const [item, setItem] = useState({ id: 1, is_saved: false });

//   // let flatListRef = useRef();
//   // const scrollRef = useRef({ flatListRef: undefined });
//   const ref = useRef(null)
//   //   let refFlatList = null;
//   //   useEffect(()=>{
//   //         refFlatList.current && refFlatList.current.scrollToIndex({animated: true, index:10 })
//   //   },[])
//   const handleToggleSave = () => {
//     setIsSaved((prevIsSaved) => !prevIsSaved);
//   };
//   const PeopleHome = async () => {
//     setLoading(true)
//     // console.log("LIKE CLICK:::",isSaved);
//     const { responseJson, err } = await requestGetApi(connect_people_home_page, '', 'GET', User.token)
//     setLoading(false)
//     console.log('the res==>>', responseJson.body.posts)
//     if (responseJson.headers.success == 1) {
//       setHomedata(responseJson.body.posts)
//       // dispatch(savepeoplemoduleuserdata(responseJson.body.posts[0]))
//       //  console.log("response hOME", responseJson.body);
//       //Toast.show({ text1: responseJson.headers.message });
//     } else {

//       console.log(err);
//     }
//   }
//   useEffect(() => {

//     PeopleHome()
//   }, [])
//   useEffect(() => {

//     ref.current && ref.current.scrollToIndex({ index: initialIndex })
//   }, [initialIndex])

//   const Savepost = async (items) => {
//     setLoading(true)
//     console.log("LIKE CLICK:::", items);
//     const { responseJson, err } = await requestPostApi(connect_people_save_post + items, '', 'POST', User.token)
//     setLoading(false)
//     console.log('the save response ', responseJson)
//     if (responseJson.headers.success == 1) {
//       // PeopleHome()
//       Toast.show({ text1: responseJson.headers.message });
//       setItem((prevState) => ({
//         ...prevState,
//         is_saved: !prevState.is_saved
//       }));
//     } else {

//       setalert_sms(err)
//       setMy_Alert(true)
//     }
//   }
//   const Likepost = async (items) => {
//     console.log("LIKE CLICK:::", isLiked);

//     setLoading(true)
//     var data = {
//       post_id: items,
//       reaction_type: "like"
//     }
//     console.log('====================================');
//     console.log(data);
//     console.log('====================================');
//     const { responseJson, err } = await requestPostApi(connect_people_like_post, data, 'POST', User.token)
//     setLoading(false)
//     console.log('the res==>>', responseJson)
//     if (responseJson.headers.success == 1) {
//       //PeopleHome()
//       // Toast.show({ text1: responseJson.headers.message });
//     } else {

//       setalert_sms(err)
//       setMy_Alert(true)
//     }
//   }

//   const Dislikepost = async (items) => {
//     console.log("DISLIKE CLICK:::", isLiked);

//     setLoading(true)
//     var data = {
//       post_id: items,
//       reaction_type: "dislike"
//     }
//     console.log('====================================');
//     console.log(data);
//     console.log('====================================');
//     const { responseJson, err } = await requestPostApi(connect_people_dislike_post, data, 'POST', User.token)
//     setLoading(false)
//     console.log('the res==>>', responseJson)
//     if (responseJson.headers.success == 1) {
//       //  PeopleHome()
//       // Toast.show({ text1: responseJson.headers.message });
//     } else {

//       setalert_sms(err)
//       setMy_Alert(true)
//     }
//   }
//   return (
//     <>
//       <Modal
//         isVisible={isVisible}
//         swipeDirection="down"
//         onBackdropPress={() => setIsVisible(false)}
//         onSwipeComplete={e => {
//           setIsVisible(false);
//         }}
//         scrollTo={() => { }}
//         scrollOffset={1}
//         propagateSwipe={true}
//         coverScreen={false}
//         onShow={() => setInitialIndex(startFromIndex)}
//         //   onShow={()=>{
//         //     scrollRef.current?.flatListRef.scrollToIndex(10);
//         //   }}
//         backdropColor="transparent"
//         style={{
//           justifyContent: 'flex-end',
//           margin: 0,
//           backgroundColor: 'rgba(0,0,0,0.5)',
//         }}>
//         <View
//           style={{
//             height: '100%',
//             backgroundColor: '#F8F8F8',
//             borderTopLeftRadius: 30,
//             borderTopRightRadius: 30,
//             paddingVertical: 20,
//           }}>
//           <View
//             style={{
//               flexDirection: 'row',
//               width: '90%',
//               alignSelf: 'center',
//             }}>
//             <TouchableOpacity onPress={() => setIsVisible(false)} style={{ width: 25, height: 20, justifyContent: 'center' }}>
//               <Image source={require('../../../../assets/images/events_arrow.png')} style={{ width: '100%', height: '100%', alignSelf: 'center' }} />
//             </TouchableOpacity>
//             <Text
//               style={{
//                 color: '#455A64',
//                 fontWeight: '500',
//                 fontSize: 14,
//                 marginBottom: 20,
//                 marginLeft: 20,
//               }}>
//               Posts
//             </Text>
//           </View>
//           <ScrollView
//             showsVerticalScrollIndicator={false}
//             nestedScrollEnabled={true}>
//             <View style={{ width: '90%', alignSelf: 'center', marginTop: 20 }}>
//               {/* <View style={{alignItems: 'center'}}> */}
//               <View style={{}}>
//                 <FlatList
//                   data={homedata}
//                   showsHorizontalScrollIndicator={false}
//                   numColumns={1}
//                   style={{ alignSelf: 'center' }}
//                   renderItem={({ item, index }) => {
//                     //console.log('no of comments', item);
//                     return (

//                       <View style={{ width: '100%', marginVertical: 10, borderRadius: 30, alignSelf: 'center' }}>
//                         <View style={styles.flatlistMainView}>

//                           <View style={styles.followingImageView}>
//                             <TouchableOpacity onPress={() => navigation.navigate('PeopleProfileScreen')}>
//                               <Image source={require('../../../../assets/images/people-following-person.png')} />
//                             </TouchableOpacity>
//                             <View style={styles.followingView}>
//                               <TouchableOpacity onPress={() => navigation.navigate('PeopleProfileScreen')}>
//                                 <Text style={{ fontSize: 14, fontWeight: '600', color: '#455A64' }}>{item.name}</Text>
//                               </TouchableOpacity>
//                               <Text style={{ fontSize: 13, fontWeight: '400', color: '#B2B7B9', marginTop: 2 }}>Following</Text>
//                             </View>
//                           </View>

//                           <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//                             <View style={[styles.rightButtonsView, { marginRight: 10 }]}>
//                               <Image source={require('../../../../assets/images/people-three-dots.png')} style={{ width: 20, height: 20 }} resizeMode='contain' />
//                             </View>
//                             {/* <View style={styles.rightButtonsView}>
//                 <Image source={require('../../../../assets/images/people-bookmark.png')} style={{width:20, height:20}} resizeMode='contain'/>
//               </View> */}
//                           </View>

//                         </View>
//                         {item.type === 'image' ?
//                           <TouchableOpacity style={styles.imageView}
//                             // onPress={()=>{navigation.navigate('FoodDetails')}}>
//                             onPress={() => { }}>
//                             <Image
//                               source={item.source}
//                               style={{
//                                 width: '100%',
//                                 height: '100%',
//                                 alignSelf: 'center',
//                               }}
//                               resizeMode="cover"></Image>
//                             {/* <Image source={item.source} style={{width:'100%',height:'100%',alignSelf:'center',}}></Image> */}
//                           </TouchableOpacity>
//                           :
//                           <VideoPlayer
//                             video={{ uri: item.source }}
//                             videoWidth={dimensions.SCREEN_WIDTH * 0.9}
//                             videoHeight={300}
//                             thumbnail={{ uri: item.thumbnail }}
//                             endWithThumbnail
//                             disableControlsAutoHide
//                             customStyles={{
//                               thumbnail: { width: dimensions.SCREEN_WIDTH * 0.9, height: 300 },
//                               // videoWrapper: {width: dimensions.SCREEN_WIDTH, height:300},
//                               wrapper: { alignSelf: 'center' },
//                             }}
//                           />
//                         }
//                         <View style={styles.flatlistMainBottomView}>

//                           <View style={styles.flatlistBottomView}>
//                             <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//                               {/* <TouchableOpacity onPress={() => { }} style={{ marginRight: 10 }}>
//                                 <Image source={require('../../../../assets/images/people-like.png')} style={{ width: 25, height: 25 }} />
//                               </TouchableOpacity> */}
//                               <TouchableOpacity
//                                 onPress={() => {
//                                   if (isLiked) {
//                                     Dislikepost(item.id);
//                                   } else {
//                                     Likepost(item.id);
//                                   }
//                                   setIsLiked(!isLiked); // Toggle the liked status
//                                 }}
//                                 style={{ marginRight: 10 }}
//                               >
//                                 <Image
//                                   source={isLiked ? require('../../../../assets/images/people-sel-heart.png') : require('../../../../assets/images/people-like.png')}
//                                   style={{ width: 25, height: 25 }}
//                                 />
//                               </TouchableOpacity>
//                               <TouchableOpacity onPress={() => navigation.navigate('PeopleComments', { data: item })} style={{ marginRight: 10 }}>
//                                 <Image source={require('../../../../assets/images/people-comment.png')} style={{ width: 25, height: 25 }} />
//                               </TouchableOpacity>
//                               <TouchableOpacity onPress={() => navigation.navigate('PeopleChat')} style={{ marginRight: 10 }}>
//                                 <Image source={require('../../../../assets/images/people-message.png')} style={{ width: 25, height: 25 }} />
//                               </TouchableOpacity>
//                             </View>
//                             <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//                               <View style={{ marginRight: 10 }}>
//                                 <Text style={styles.text1}>183K views</Text>
//                               </View>
//                               {/* <TouchableOpacity onPress={() => { Savepost(item.id), isSaved == 'false' ? setIsSaved('true') : setIsSaved('false') }} style={styles.rightButtonsView}>
//                                 <Image source={require('../../../../assets/images/people-bookmark.png')} style={{ width: 20, height: 20 }} resizeMode='contain' />
//                               </TouchableOpacity> */}
//                               {/* <TouchableOpacity onPress={() => { Savepost(item.id) }} style={styles.rightButtonsView}>
//                                 <Image source={!item.is_saved ? require('../../../../assets/images/people-bookmark.png') : require('../../../../assets/images/people-bookmark-selected.png')} style={{ width: 20, height: 20 }} resizeMode='contain' />
//                               </TouchableOpacity> */}
//                               <TouchableOpacity onPress={() => { Savepost(item.id) }} style={styles.rightButtonsView}>
//                                 <Image
//                                   source={!item.is_saved ? require('../../../../assets/images/people-bookmark.png') : require('../../../../assets/images/people-bookmark-selected.png')}
//                                   style={{ width: 20, height: 20 }}
//                                   resizeMode='contain'
//                                 />
//                               </TouchableOpacity>
//                             </View>
//                           </View>

//                           {/* <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
//                             <Image source={require('../../../../assets/images/people-liked-by.png')} style={{ width: 30, height: 30 }} resizeMode='contain' />
//                             <Text style={[styles.text1, { marginLeft: 10 }]}>Liked by Jerry paul and 23.3 K others</Text>
//                           </View> */}
//                           {
//                             item.num_of_liked_users > 0 ?
//                               <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
//                                 <Image source={require('../../../../assets/images/people-liked-by.png')} style={{ width: 30, height: 30 }} resizeMode='contain' />
//                                 <Text style={[styles.text1, { marginLeft: 10 }]}>Liked by {item.last_liked_user} and {item.num_of_liked_users} others</Text>
//                               </View>
//                               :
//                               null
//                           }
//                           {/* <View style={{ marginTop: 10 }}>
//                             <ReadMoreComponent text={item.post_description} />

//                           </View> */}
//                           {
//                             item.post_description != null ?
//                               <View style={{ flex: 1 }}>
//                                 {/* <Text style={styles.text1}>Amazing football shorts caption this<Text style={{ color: '#B2B7B9' }}>…More</Text></Text> */}
//                                 <ReadMoreComponent text={item.post_description} />
//                               </View>
//                               :
//                               null
//                           }
//                           {/* <TouchableOpacity onPress={() => navigation.navigate('PeopleComments')} style={{ marginTop: 5 }}>
//                             <Text style={{ fontSize: 12, fontWeight: '400', color: '#0089CF' }}>{item.num_of_comments}</Text>
//                           </TouchableOpacity> */}
//                           {

//                             item.num_of_comments > 0 ?


//                               <TouchableOpacity onPress={() => { navigation.navigate('PeopleComments', { data: item }) }} style={{ marginTop: 5 }}>
//                                 <Text style={{ fontSize: 12, fontWeight: '400', color: '#0089CF' }}>View all {item.num_of_comments} comments</Text>
//                               </TouchableOpacity>
//                               :
//                               null

//                           }
//                           <View style={{ marginTop: 10 }}>
//                             <Text style={{ fontSize: 10, fontWeight: '400', color: '#B2B7B9' }}>23 min ago</Text>
//                           </View>
//                         </View>
//                       </View>
//                     )
//                   }}
//                   keyExtractor={item => item.id}
//                 />
//               </View>
//             </View>

//             {/* <View style={{width:100,height:100}} /> */}
//           </ScrollView>
//         </View>
//       </Modal>
//       {loading ?
//         <Loader />
//         : null}
//     </>
//   );
// };
// const styles = StyleSheet.create({
//   flatlistMainView: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     backgroundColor: '#fff',
//     paddingHorizontal: 15,
//     paddingVertical: 10,
//     // width:'90%', 
//     width: dimensions.SCREEN_WIDTH * 0.9,
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     alignSelf: 'center'
//   },
//   followingImageView: {
//     flexDirection: 'row',
//     alignItems: 'center'
//   },
//   followingView: {
//     justifyContent: 'center',
//     marginLeft: 10
//   },
//   flatlistMainBottomView: {
//     backgroundColor: '#fff',
//     paddingVertical: 15,
//     paddingHorizontal: 15,
//     // width:'90%', 
//     width: dimensions.SCREEN_WIDTH * 0.9,
//     borderBottomRightRadius: 20,
//     borderBottomLeftRadius: 20,
//     alignSelf: 'center'
//   },
//   flatlistBottomView: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   text1: {
//     fontSize: 12,
//     fontWeight: '400',
//     color: '#455A64'
//   },
//   imageView: {
//     width: '100%',
//     height: 200,
//     backgroundColor: '#F8F8F8',
//     alignSelf: 'center'
//   },
//   rightButtonsView: {
//     backgroundColor: '#F8F8F8',
//     padding: 10,
//     borderRadius: 20
//   },
// })
// export default PostsModal;

import React, { useEffect, pnguseState, useRef, useState } from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  FlatList,
  Alert,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from 'react-native';
import Modal from 'react-native-modal';
import Toast from 'react-native-toast-message';
import { dimensions, Mycolors } from '../../../../utility/Mycolors';
import VideoPlayer from 'react-native-video-player'
import { useNavigation } from '@react-navigation/native';
import ReadMoreComponent from '../Components/ReadMoreComponent';
import { connect_people_react_post, connect_people_save_post, requestGetApi, requestPostApi, connect_people_like_post, connect_people_dislike_post, connect_people_home_page } from '../../../../WebApi/Service';
import Loader from '../../../../WebApi/Loader';

import { useSelector, useDispatch } from 'react-redux';

const PostsModal = ({ isVisible, setIsVisible, data, startFromIndex = 0, additionalParam }) => {
  const User = useSelector(state => state.user.user_details)
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const [initialIndex, setInitialIndex] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [homedata, setHomedata] = useState('')
  const [tet, setTet] = useState(null);
  const [item, setItem] = useState({ id: 1, is_saved: false });
  const [likedStatuses, setLikedStatuses] = useState(Array(homedata.length).fill(false))
  const [savedStatuses, setSavedStatuses] = useState({});
  // let flatListRef = useRef();
  // const scrollRef = useRef({ flatListRef: undefined });
  const ref = useRef(null)
  //   let refFlatList = null;
  //   useEffect(()=>{
  //         refFlatList.current && refFlatList.current.scrollToIndex({animated: true, index:10 })
  //   },[])
  const handleToggleSave = () => {
    setIsSaved((prevIsSaved) => !prevIsSaved);
  };
  // const toggleSave = async (itemId) => {
  //   setSavedStatuses((prevState) => ({
  //     ...prevState,
  //     [itemId]: !prevState[itemId]
  //   }));

  //   try {
  //     if (savedStatuses[itemId]) {
  //       await Savepost(itemId);
  //     } else {
  //       // Handle the logic for the case when the item is un-saved, if needed
  //     }
  //   } catch (error) {
  //     console.error('An error occurred while updating save status:', error);
  //     // Handle the error as needed
  //   }
  // };
  const toggleSave = async (item) => {
    const updatedHomedata = homedata.map((data) => {
      if (data.id === item.id) {
        return {
          ...data,
          saved: !data.saved
        };
      }
      return data;
    });
    setHomedata(updatedHomedata);

    try {
      if (item.saved) {
        await Savepost(item.id);
      } else {
        // Handle the logic for the case when the item is un-saved, if needed
      }
    } catch (error) {
      console.error('An error occurred while updating save status:', error);
      // Handle the error as needed
    }
  };
  const toggleLike = async (itemId) => {
    const updatedLikedStatuses = [...likedStatuses];
    updatedLikedStatuses[itemId] = !updatedLikedStatuses[itemId];
    setLikedStatuses(updatedLikedStatuses);

    try {
      if (updatedLikedStatuses[itemId]) {
        await Likepost(homedata[itemId].id);
      } else {
        await Dislikepost(homedata[itemId].id);
      }
    } catch (error) {
      console.error('An error occurred while updating like status:', error);
      // Handle the error as needed
    }
  };
  const PeopleHome = async () => {
    setLoading(true)
    var fUrl = connect_people_home_page
    var urls = '?user_id=' + tet
    console.log('my url---------->', urls)
    if (urls != undefined) {
      fUrl = fUrl + urls
    }
    console.log("LIKE CLICK:::", fUrl);
    const { responseJson, err } = await requestGetApi(fUrl, '', 'GET', User.token)
    setLoading(false)
    console.log('the res  profile modal==>>', responseJson.body.posts)
    if (responseJson.headers.success == 1) {
      setHomedata(responseJson.body.posts)
      // dispatch(savepeoplemoduleuserdata(responseJson.body.posts[0]))
      //  console.log("response hOME", responseJson.body);
      //Toast.show({ text1: responseJson.headers.message });
    } else {

      console.log(err);
    }
  }

  //   React.useEffect(() => {
  //     const unsubscribe = navigation.addListener('focus', () => {
  //         // The screen is focused
  //         // Call any action
  //        edit()
  //     });
  //     // Return the function to unsubscribe from the event so it gets removed on unmount
  //     return unsubscribe;
  // }, [navigation]);
  useEffect(() => {
    console.log(additionalParam, 'additionalParam');
    setTet(additionalParam);

    PeopleHome(tet)
  }, [additionalParam, tet])
  useEffect(() => {

    ref.current && ref.current.scrollToIndex({ index: initialIndex })
  }, [initialIndex])

  const Savepost = async (items) => {
    setLoading(true)
    console.log("LIKE CLICK:::", items);
    const { responseJson, err } = await requestPostApi(connect_people_save_post + items, '', 'POST', User.token)
    setLoading(false)
    console.log('the save response ', responseJson)
    if (responseJson.headers.success == 1) {
      Toast.show({ text1: responseJson.headers.message });
      PeopleHome()

      setItem((prevState) => ({
        ...prevState,
        is_saved: !prevState.is_saved
      }));
    } else {

      setalert_sms(err)
      setMy_Alert(true)
    }
  }
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
      //Toast.show({ text1: responseJson.headers.message });
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
      //Toast.show({ text1: responseJson.headers.message });
    } else {

      setalert_sms(err)
      setMy_Alert(true)
    }
  }
  return (
    <>
      <Modal
        isVisible={isVisible}
        swipeDirection="down"
        onBackdropPress={() => setIsVisible(false)}
        onSwipeComplete={e => {
          setIsVisible(false);
        }}
        scrollTo={() => { }}
        scrollOffset={1}
        propagateSwipe={true}
        coverScreen={true}
        onShow={() => setInitialIndex(startFromIndex)}
        //   onShow={()=>{
        //     scrollRef.current?.flatListRef.scrollToIndex(10);
        //   }}
        backdropColor="transparent"
        style={{
          justifyContent: 'flex-end',
          margin: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}>
        <View
          style={{
            height: '100%',
            backgroundColor: '#F8F8F8',
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            paddingVertical: 20,
            marginTop: 60
          }}>
          <View
            style={{
              flexDirection: 'row',
              width: '90%',
              alignSelf: 'center',
            }}>
            <TouchableOpacity onPress={() => setIsVisible(false)} style={{ width: 25, height: 20, justifyContent: 'center' }}>
              <Image source={require('../../../../assets/images/events_arrow.png')} style={{ width: '100%', height: '100%', alignSelf: 'center' }} />
            </TouchableOpacity>
            <Text
              style={{
                color: '#455A64',
                fontWeight: '500',
                fontSize: 14,
                marginBottom: 20,
                marginLeft: 20,
              }}>
              Posts
            </Text>
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled={true}>
            <View style={{ width: '90%', alignSelf: 'center', marginTop: 20 }}>
              {/* <View style={{alignItems: 'center'}}> */}
              <View style={{}}>
                <FlatList
                  data={homedata}
                  showsHorizontalScrollIndicator={false}
                  numColumns={1}
                  style={{ alignSelf: 'center' }}
                  renderItem={({ item, index }) => {
                    console.log('no of comments',
                      item);
                    return (

                      <View style={{ width: '100%', marginVertical: 10, borderRadius: 30, alignSelf: 'center' }}>
                        <View style={styles.flatlistMainView}>

                          <View style={styles.followingImageView}>
                            <TouchableOpacity onPress={() => navigation.navigate('PeopleProfileScreen')}>
                              {/* <Image source={require('../../../../assets/images/people-following-person.png')} /> */}
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
                                  source={require('../../../../assets/blankProfile.png')}
                                  style={{ width: 35, height: 35, borderRadius: 40 }}
                                />
                              )}
                            </TouchableOpacity>
                            <View style={styles.followingView}>
                              <TouchableOpacity onPress={() => navigation.navigate('PeopleProfileScreen')}>
                                {/* <Text style={{ fontSize: 14, fontWeight: '600', color: '#455A64' }}>{item.name}</Text> */}
                                <Text style={{ fontSize: 14, fontWeight: '600', color: '#455A64' }}>{item.first_name + ' ' + item.last_name}</Text>
                              </TouchableOpacity>
                              <Text style={{ fontSize: 13, fontWeight: '400', color: '#B2B7B9', marginTop: 2 }}>

                                {item.is_following ? 'Following' : 'Follow'}

                              </Text>
                            </View>
                          </View>

                          <TouchableOpacity
                            key={item.id}
                            onPress={() => {
                              toggleSave(item);
                            }} style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={[styles.rightButtonsView, { marginRight: 10 }]}>
                              <Image
                                source={item.is_saved ? require('../../../../assets/People/savePostPepleSelected.png') : require('../../../../assets/People/BookmarkSimple.png')}
                                style={{ width: 20, height: 20 }}
                                resizeMode='contain'
                              />
                            </View>
                            {/* <View style={styles.rightButtonsView}>
                <Image source={require('../../../../assets/images/people-bookmark.png')} style={{width:20, height:20}} resizeMode='contain'/>
              </View> */}
                          </TouchableOpacity>

                        </View>
                        {item.post_type === 'image' ?
                          <TouchableOpacity style={styles.imageView}
                            // onPress={()=>{navigation.navigate('FoodDetails')}}>
                            onPress={() => { }}>
                            <Image
                              source={{
                                uri: item.image_url
                              }}
                              style={{
                                width: '100%',
                                height: '100%',
                                alignSelf: 'center',
                              }}
                              resizeMode="cover"></Image>
                            {/* <Image source={item.source} style={{width:'100%',height:'100%',alignSelf:'center',}}></Image> */}
                          </TouchableOpacity>
                          :
                          <TouchableOpacity>
                            <VideoPlayer
                              video={{ uri: item.source }}
                              videoWidth={dimensions.SCREEN_WIDTH * 0.9}
                              videoHeight={300}
                              thumbnail={{ uri: item.video_url }}
                              endWithThumbnail
                              disableControlsAutoHide
                              customStyles={{
                                thumbnail: { width: dimensions.SCREEN_WIDTH * 0.9, height: 300 },
                                // videoWrapper: {width: dimensions.SCREEN_WIDTH, height:300},
                                wrapper: { alignSelf: 'center' },
                              }}
                            />
                          </TouchableOpacity>
                        }
                        <View style={styles.flatlistMainBottomView}>

                          <View style={styles.flatlistBottomView}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 14 }}>
                              {/* <TouchableOpacity onPress={() => { }} style={{ marginRight: 10 }}>
                                <Image source={require('../../../../assets/images/people-like.png')} style={{ width: 25, height: 25 }} />
                              </TouchableOpacity> */}
                              {/* <TouchableOpacity
                                onPress={() => {
                                  if (isLiked) {
                                    Dislikepost(item.id);
                                  } else {
                                    Likepost(item.id);
                                  }
                                  setIsLiked(!isLiked); // Toggle the liked status
                                }}
                                style={{ marginRight: 10 }}
                              >
                                <Image
                                  source={isLiked ? require('../../../../assets/images/people-sel-heart.png') : require('../../../../assets/images/people-like.png')}
                                  style={{ width: 25, height: 25 }}
                                />
                              </TouchableOpacity> */}
                              <TouchableOpacity
                                key={item.id}
                                onPress={() => {
                                  toggleLike(index);
                                }}
                                style={{ marginRight: 10 }}
                              >
                                <Image
                                  source={
                                    item.is_liked
                                      ? require('../../../../assets/People/LikePEoplePost.png')
                                      : require('../../../../assets/People/likeUnselctedPeople.png')
                                  }
                                  style={{ width: 25, height: 25 }}
                                />
                              </TouchableOpacity>




                              <TouchableOpacity onPress={() => navigation.navigate('PeopleComments', { data: item })} style={{ marginRight: 10 }}>
                                <Image source={require('../../../../assets/People/commentPostPeople.png')} style={{ width: 25, height: 25 }} />
                              </TouchableOpacity>


                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                              <View style={{ marginRight: 3 }}>
                                <Text style={styles.text1}></Text>
                              </View>
                              {/* <TouchableOpacity onPress={() => { Savepost(item.id), isSaved == 'false' ? setIsSaved('true') : setIsSaved('false') }} style={styles.rightButtonsView}>
                                <Image source={require('../../../../assets/images/people-bookmark.png')} style={{ width: 20, height: 20 }} resizeMode='contain' />
                              </TouchableOpacity> */}
                              {/* <TouchableOpacity onPress={() => { Savepost(item.id) }} style={styles.rightButtonsView}>
                                <Image source={!item.is_saved ? require('../../../../assets/images/people-bookmark.png') : require('../../../../assets/images/people-bookmark-selected.png')} style={{ width: 20, height: 20 }} resizeMode='contain' />
                              </TouchableOpacity> */}
                              {/* <TouchableOpacity onPress={() => {
                                Savepost(item.id)

                                setIsSaved(!isSaved); // Toggle the liked status
                              }} style={styles.rightButtonsView}>
                                <Image
                                  source={item.isSaved ? require('../../../../assets/images/people-bookmark.png') : require('../../../../assets/images/people-bookmark-selected.png')}
                                  style={{ width: 20, height: 20 }}
                                  resizeMode='contain'
                                />
                              </TouchableOpacity> */}

                              {/* <TouchableOpacity
                                key={item.id}
                                onPress={() => {
                                  toggleSave(item);
                                }}
                                style={styles.rightButtonsView}
                              >
                                <Image
                                  source={item.is_saved ? require('../../../../assets/People/savePostPepleSelected.png') : require('../../../../assets/People/BookmarkSimple.png')}
                                  style={{ width: 20, height: 20 }}
                                  resizeMode='contain'
                                />
                              </TouchableOpacity> */}
                            </View>
                          </View>

                          {/* <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                            <Image source={require('../../../../assets/images/people-liked-by.png')} style={{ width: 30, height: 30 }} resizeMode='contain' />
                            <Text style={[styles.text1, { marginLeft: 10 }]}>Liked by Jerry paul and 23.3 K others</Text>
                          </View> */}
                          {/* {
                            item.num_of_liked_users > 0 ?
                              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                                <Image source={require('../../../../assets/images/people-liked-by.png')} style={{ width: 30, height: 30 }} resizeMode='contain' />
                                <Text style={[styles.text1, { marginLeft: 10 }]}>Liked by {item.last_liked_user} and {item.num_of_liked_users} others</Text>
                              </View>
                              :
                              null
                          } */}
                          {
                            item.num_of_liked_users > 0 ?
                              <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }} onPress={() => {

                                navigation.navigate('LikedUserList', { postid: item.id })
                              }}>
                                {/* <Image source={require('../../../assets/images/people-liked-by.png')} style={{ width: 30, height: 30 }} resizeMode='contain' /> */}

                                <Text style={[styles.text1, { marginLeft: 2 }]}>
                                  Liked by {item.last_liked_user}
                                  {item.num_of_liked_users.length > 1 ? ` and ${item.num_of_liked_users} others` : ''}
                                </Text>
                              </TouchableOpacity>
                              :
                              null
                          }
                          {/* <View style={{ marginTop: 10 }}>
                            <ReadMoreComponent text={item.post_description} />

                          </View> */}
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
                          {/* <TouchableOpacity onPress={() => navigation.navigate('PeopleComments')} style={{ marginTop: 5 }}>
                            <Text style={{ fontSize: 12, fontWeight: '400', color: '#0089CF' }}>{item.num_of_comments}</Text>
                          </TouchableOpacity> */}
                          {

                            item.num_of_comments > 0 ?


                              <TouchableOpacity onPress={() => { navigation.navigate('PeopleComments', { data: item }) }} style={{ marginTop: 5, marginLeft: 2 }}>
                                <Text style={{ fontSize: 12, fontWeight: '400', color: '#0089CF' }}>View all {item.num_of_comments} comments</Text>
                              </TouchableOpacity>
                              :
                              null

                          }
                          <View style={{ marginTop: 10, marginLeft: 2 }}>
                            <Text style={{ fontSize: 10, fontWeight: '400', color: '#B2B7B9' }}>23 min ago</Text>
                          </View>
                        </View>
                      </View>
                    )
                  }}
                  keyExtractor={item => item.id}
                />
              </View>
            </View>

            {/* <View style={{width:100,height:100}} /> */}
          </ScrollView>
        </View>
      </Modal>
      {loading ?
        <Loader />
        : null}
    </>
  );
};
const styles = StyleSheet.create({
  flatlistMainView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 10,
    // width:'90%', 
    width: dimensions.SCREEN_WIDTH * 0.9,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignSelf: 'center',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderLeftColor: '#EAEBEB',
    borderRightColor: '#EAEBEB',
    borderBottomColor: '#EAEBEB'

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
    paddingHorizontal: 15,
    // width:'90%', 
    width: dimensions.SCREEN_WIDTH * 0.9,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    alignSelf: 'center',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderLeftColor: '#EAEBEB',
    borderRightColor: '#EAEBEB',
    borderBottomColor: '#EAEBEB'
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
    width: '100%',
    height: 200,
    backgroundColor: '#F8F8F8',
    alignSelf: 'center'
  },
  rightButtonsView: {
    backgroundColor: '#F8F8F8',
    padding: 10,
    borderRadius: 20
  },
})
export default PostsModal;