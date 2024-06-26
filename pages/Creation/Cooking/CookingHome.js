

// import React, { useEffect, useState, useRef } from 'react';
// import { View, Image, Text, StyleSheet, SafeAreaView, TextInput, FlatList, Alert, TouchableOpacity, ScrollView, ImageBackground, ActivityIndicator } from 'react-native';
// import HomeHeaderRoundBottom from './components/HomeHeaderRoundBottm';
// import SearchInput2 from '../../../component/SearchInput2';
// import SearchInputEnt from '../../../component/SearchInputEnt';
// import FashionSearch from './components/FashionSearch';
// import SerchInput from '../../../component/SerchInput';
// import { dimensions, Mycolors } from '../../../utility/Mycolors';
// import messaging from '@react-native-firebase/messaging';
// import { useSelector, useDispatch } from 'react-redux';
// import Loader from '../../../WebApi/Loader';
// import { baseUrl, shop_eat_cart, user_payment_method, shop_eat_orders, shop_eat_cart_book_dining, shop_eat_cart_book_table, shop_eat_cart_id, shop_eat_business_id, shop_eat_menu_userid, requestPostApi, requestGetApi, shop_eat, connect_people_create_post, connect_people_newPost, art_getCollection, requestPostApiMedia, art_PostCollection, postApiWithToken2, art_HomePage, art_likeDislike, post_suggestion, get_suggestion, get_reportSuggestion, post_reportSuggestion, creation_home, creation_categories, creation_react, creation_get_report, creation_post_report, creation_addView, creation_getView, creation_addComments, creation_getNotifications } from '../../../WebApi/Service'
// import { setcookingnotificationcount } from '../../../redux/actions/user_action';
// import LinearGradient from 'react-native-linear-gradient'
// import { ImageSlider, ImageCarousel } from "react-native-image-slider-banner";
// import MyButtons from '../../../component/MyButtons';
// import MultiSlider from '@ptomasroos/react-native-multi-slider';
// import Modal from 'react-native-modal';
// import Toast from 'react-native-toast-message';

// import AppIntroSlider from 'react-native-app-intro-slider';
// import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
// import { createThumbnail } from "react-native-create-thumbnail";
// import ViewMoreText from 'react-native-view-more-text';
// import VideoPlayer from 'react-native-video-player'
// import PostModal from './components/PostModal';
// import ArtSearch from './components/ArtSearch'
// import Video from 'react-native-video';
// import { log } from 'react-native-reanimated';
// import { VideoModel } from '../../../component/VideoModel';

// const CookingHome = (props) => {
//   const scrollViewRef = useRef();
//   const dispatch = useDispatch();

//   const User = useSelector(state => state.user.user_details)
//   console.log(User, 'my user');
//   const chatindictor = useSelector(state => state.user.cooking_counter);

//   const player = useRef(null);
//   const [searchValue, setsearchValue] = useState('')
//   const [scrollEnabled, setScrollEnabled] = useState(false)
//   const myTextInput = useRef()
//   const [multiSliderValue, setMultiSliderValue] = useState([0, 100])
//   const [showChooseMilesModal, setShowChooseMilesModal] = useState(false)
//   const [showModalVideo, setShowModalVideo] = useState({ isVisible: false, data: null })
//   const [selectedCategory, setSelectedCategory] = useState('1')
//   const [loading, setLoading] = useState(false)
//   const [loading2, setLoading2] = useState(false)
//   const [loading3, setLoading3] = useState(false)
//   const [showPostsModal, setShowPostsModal] = useState(false)
//   const [showModal, setShowModal] = useState({ isVisible: false, data: null });
//   const [showVideoModal, setShowVideoModal] = useState(false)
//   const [selectedVideo, setSelectedVideo] = useState({})
//   const [showReportModal, setShowReportModal] = useState(false)
//   const [selectedReasonId, setSelectedReasonId] = useState(null)
//   const [showBottomLoader, setShowBottomLoader] = useState(false);
//   const [categoryData, setCategorydata] = useState([])
//   const [isLiked, setIsLiked] = useState(false);
//   const [latestRecords, setLatestRecords] = useState([]);
//   const [getSuggested, setGetSuggested] = useState('')
//   const [categories, setCategories] = useState('')
//   const [profileModal, setProfileModal] = useState('')
//   const [reportGet, setReportGet] = useState('')
//   const [myArticle, setMyArticle] = useState('')
//   const [page, setPage] = useState(1);
//   const [thumb, setThumb] = useState('')
//   const [selectedID, setSelectedID] = useState('')
//   const [startFromIndex, setStartFromIndex] = useState(0)
//   const [introSliderData] = useState([
//     // require('../../assets/Group75972.png'),
//     { key: 'one', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5a5uCP-n4teeW2SApcIqUrcQApev8ZVCJkA&usqp=CAU', title: 'Art-Aficionado Tim Newton on How to Collect Art', status: 'Fine Art', date: 'March 4, 2022' },
//     { key: 'two', image: 'https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg', title: 'Art-Aficionado Tim Newton on How to Collect Art', status: 'Fine Art', date: 'March 4, 2022' },
//     { key: 'three', image: 'https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510__340.jpg', title: 'Art-Aficionado Tim Newton on How to Collect Art', status: 'Fine Art', date: 'March 4, 2022' }
//   ])


//   messaging().onMessage(remoteMessage => {
//     const data = remoteMessage;
//     if (data && Object.keys(data).length !== 0) {
//       dispatch(setcookingnotificationcount(1));
//     } else {
//       null
//     }
//     // console.log('onMessage remoteMessage', remoteMessage);
//     // if (remoteMessage.notification.body === 'Order Delivered Successfully!') {
//     //   setalert_sms3('Do you want to rate order?');
//     //   setMy_Alert3(true);
//     //   setRemoteMessageData(remoteMessage.data);
//     // } else if (remoteMessage.notification.body === 'new message') {
//     //   // Handle new message scenario
//     //   // dispatch(setMessageCount(mapdata.messagecount + 1));
//     //   // props.navigation.navigate('ShopMyOrderDetails', { data: remoteMessage.data });
//     // }
//   });

//   messaging().onNotificationOpenedApp(remoteMessage => {

//     const data = remoteMessage;
//     console.log('when app is closed',);
//     if (data && Object.keys(data).length !== 0) {
//       dispatch(setcookingnotificationcount(1));
//     } else {
//       null
//     }
//   });

//   messaging()
//     .getInitialNotification()
//     .then(remoteMessage => {
//       const data = remoteMessage;
//       console.log('when app is clodee',);
//       if (data && Object.keys(data).length !== 0) {
//         dispatch(setcookingnotificationcount(1));
//       } else {
//         null
//       }
//     });

//   const getAllNotificationsList = async () => {
//     console.log('notification function called');
//     setLoading(true)

//     const { responseJson, err } = await requestGetApi(creation_getNotifications + 51, '', 'GET', User.token)
//     setLoading(false)
//     console.log('the res in_cart notification_list ==>>', responseJson)
//     if (responseJson.headers.success == 1) {
//       console.log('my data lenght', responseJson.body.data.length);

//       console.log('my notifications art home', responseJson.body.data.length != 0);
//       responseJson.body.data.length != 0 ? console.log('o is called') : console.log('1 is called');
//       const hasStatusZero = responseJson.body.data.some((item) => item.status === 0);
//       console.log('item for notification', (hasStatusZero ? 1 : 0))
//       dispatch(setcookingnotificationcount(hasStatusZero ? 1 : 0));
//       // responseJson.body.data.length != 0 ? dispatch(setcookingnotificationcount(1)) : dispatch(setcookingnotificationcount(0))

//     } else {
//       setalert_sms(err)
//       setMy_Alert(true)
//     }
//   };


//   // messaging().onMessage(remoteMessage => {
//   //   const data = remoteMessage;
//   //   console.log('onMessage remoteMessage', remoteMessage);
//   //   // if (remoteMessage.notification.body === 'Order Delivered Successfully!') {
//   //   //   setalert_sms3('Do you want to rate order?');
//   //   //   setMy_Alert3(true);
//   //   //   setRemoteMessageData(remoteMessage.data);
//   //   // } else if (remoteMessage.notification.body === 'new message') {
//   //   //   // Handle new message scenario
//   //   //   // dispatch(setMessageCount(mapdata.messagecount + 1));
//   //   //   // props.navigation.navigate('ShopMyOrderDetails', { data: remoteMessage.data });
//   //   // }
//   // });

//   // messaging().onNotificationOpenedApp(remoteMessage => {
//   //   const data = remoteMessage.data;
//   //   console.log('Notification caused app to open from the background state:', remoteMessage);
//   //   // if (remoteMessage.notification.title === 'Kinengo') {
//   //   //   if (remoteMessage.notification.body === 'Order Delivered Successfully!') {
//   //   //     setalert_sms3('Do you want to rate order?');
//   //   //     setMy_Alert3(true);
//   //   //     setRemoteMessageData(remoteMessage.data);
//   //   //   } else {
//   //   //     props.navigation.navigate('ShopMyOrderDetails', { data: remoteMessage.data });
//   //   //   }
//   //   // } else if (remoteMessage.notification.body === 'new message') {
//   //   //   props.navigation.navigate('ShopMyOrderDetails', { data: remoteMessage.data });
//   //   //   dispatch(setMessageCount(mapdata.messagecount + 1));
//   //   // }
//   // });

//   // messaging()
//   //   .getInitialNotification()
//   //   .then(remoteMessage => {
//   //     console.log('====================================');
//   //     console.log(remoteMessage, 'my message after notification');
//   //     console.log('====================================');
//   //     // if (remoteMessage.notification.title === 'Kinengo') {
//   //     //   if (remoteMessage.notification.body === 'Order Delivered Successfully!') {
//   //     //     setalert_sms3('Do you want to rate order?');
//   //     //     setMy_Alert3(true);
//   //     //     setRemoteMessageData(remoteMessage.data);
//   //     //   } else {
//   //     //     props.navigation.navigate('ShopMyOrderDetails', { data: remoteMessage.data });
//   //     //   }
//   //     // } else if (remoteMessage.notification.body === 'new message') {
//   //     //   dispatch(setMessageCount(mapdata.messagecount + 1));
//   //     //   props.navigation.navigate('ShopMyOrderDetails', { data: remoteMessage.data });
//   //     // }
//   //   });

//   const multiSliderValuesChange = (values) => { setMultiSliderValue(values) }
//   // useEffect(() => {
//   //   ArtCategory()
//   //   Categories()
//   //   // generateThumb()
//   // }, [])
//   React.useEffect(() => {
//     const unsubscribe = props.navigation.addListener('focus', () => {
//       // The screen is focused
//       // Call any action

//       ArtCategory()
//       Categories()
//       getSuggestion()
//       getReport()
//       getAllNotificationsList()
//       // console.log('my user id of state----->', userID);
//     });
//     // Return the function to unsubscribe from the event so it gets removed on unmount
//     return unsubscribe;
//   }, [props, page]);


//   useEffect(() => {
//     // Function to handle notifications received while the app is in the foreground
//     const onNotificationReceived = async (remoteMessage) => {
//       console.log('Notification received while the app is in the foreground:', remoteMessage);
//       // Update the Redux state based on the received notification
//       // You can extract the necessary data from remoteMessage and dispatch the actions accordingly
//       if (remoteMessage && Object.keys(remoteMessage).length !== 0) {
//         dispatch(setcookingnotificationcount(1)); // Assuming "setcookingnotificationcount" is your action creator
//       }
//     };

//     // Set up the event listener for handling notifications received while the app is in the foreground
//     const unsubscribeForeground = messaging().onMessage(onNotificationReceived);

//     // Function to check if the app was opened by tapping on a notification
//     const checkInitialNotification = async () => {
//       try {
//         const remoteMessage = await messaging().getInitialNotification();
//         if (remoteMessage) {
//           console.log('App opened by tapping on a notification:', remoteMessage);
//           // Handle the notification data as needed
//           // Update the Redux state based on the received notification
//           // You can extract the necessary data from remoteMessage and dispatch the actions accordingly
//           if (remoteMessage && Object.keys(remoteMessage).length !== 0) {
//             dispatch(setcookingnotificationcount(1)); // Assuming "setcookingnotificationcount" is your action creator
//           }
//         } else {
//           console.log('App not opened by a notification.');
//         }
//       } catch (error) {
//         console.error('Error retrieving initial notification:', error);
//       }
//     };

//     // Request permission for receiving notifications
//     const requestUserPermission = async () => {
//       // ... (your existing permission request code)
//     };

//     // Clean up the event listeners when the component unmounts
//     return () => {
//       unsubscribeForeground();
//     };
//   }, [dispatch]);

//   const scrollToTop = () => {
//     scrollRef?.current?.scrollToOffset({ animated: true, offset: 0 });
//   };

//   const Likepost = async (id) => {
//     console.log('my post is liked or not', id);
//     setLoading(true)
//     var data = {
//       object_id: id,
//       object_type: 'article',
//       reaction_type: "like"
//     }
//     const { responseJson, err } = await requestPostApi(creation_react + 51, data, 'POST', User.token)
//     setLoading(false)
//     if (responseJson.headers.success == 1) {
//       // console.log('the res like of comments==>>', responseJson, User.token)
//       // ArtCategory()
//       // GetComments()
//       console.log('like is need to be called');
//       ArtCategory()
//       //Toast.show({ text1: responseJson.headers.message });
//     } else {

//       setalert_sms(err)
//       setMy_Alert(true)
//     }
//   }

//   const Dislikepost = async (id) => {
//     console.log('my post is liked or not', id);
//     setLoading(true)
//     var data = {
//       object_id: id,
//       object_type: 'article',
//       reaction_type: "dislike"
//     }
//     const { responseJson, err } = await requestPostApi(creation_react + 51, data, 'POST', User.token)
//     setLoading(false)
//     if (responseJson.headers.success == 1) {
//       // console.log('the res like of comments==>>', responseJson, User.token)
//       // ArtCategory()
//       // GetComments()
//       console.log('dislike is need to be called');
//       ArtCategory()
//       GetComments()
//       //Toast.show({ text1: responseJson.headers.message });
//     } else {

//       setalert_sms(err)
//       setMy_Alert(true)
//     }
//   }
//   const _renderItem = ({ item }) => {
//     console.log('item', item);
//     // let videoUrl = null; // Declare and initialize the videoUrl variable
//     // console.log('item of home sugggggg', item);
//     return (
//       <>
//         <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'center', }}>
//           {item.type === 'video' ?
//             <TouchableOpacity style={{ width: '100%', height: 227, borderRadius: 10, alignSelf: 'center', resizeMode: 'cover' }} onPress={() => {
//               setShowModal({
//                 isVisible: true,
//                 data: item.files[0],
//               }), setSelectedID(item.id)
//             }} >
//               {/* <VideoPlayer
//                 resizeMode="contain"
//                 // video={{ uri: videoUrl }}
//                 style={{ borderRadius: 10, borderWidth: 2, }}
//                 videoWidth={'100%'}
//                 videoHeight={227}
//                 autoplay={false}
//                 thumbnail={{ uri: item.thumb.path }}
//                 endWithThumbnail
//                 disableControlsAutoHide
//                 customStyles={{
//                   thumbnail: { width: '100%', height: 227, borderRadius: 10, alignSelf: 'center', resizeMode: 'cover' },
//                   // videoWrapper: { width: dimensions.SCREEN_WIDTH / 2.5, height: 90, },
//                   wrapper: { width: '100%', height: 227 },
//                 }}
//               /> */}
//               <ImageBackground source={{ uri: item.thumb.path }} style={{
//                 width: '100%', height: 227, alignSelf: 'center', justifyContent: 'center', borderRadius: 10,
//                 overflow: 'hidden',
//               }} resizeMode='cover' >
//                 <Image source={require('../../../assets/images/people-play-button.png')} style={{ width: '20%', height: '20%', alignSelf: 'center', }} resizeMode='contain' ></Image>
//               </ImageBackground>
//             </TouchableOpacity>
//             :
//             <TouchableOpacity onPress={() => { props.navigation.navigate('CookingPost', { id: item.id }) }} style={{ width: '100%', height: 227, alignSelf: 'center', borderRadius: 10 }}>
//               <Image source={{
//                 uri:

//                   item.cover_photo
//               }} style={{ width: '100%', height: '100%', borderRadius: 10, }} />
//             </TouchableOpacity>}
//           {/* <LinearGradient
//             colors={['#29913C', 'transparent']}
//             style={{
//               height: 75, width: '100%', paddingHorizontal: 15,
//               justifyContent: 'center', position: 'absolute', bottom: 0, overflow: 'hidden',
//             }}
//             start={{ x: 0.2, y: 0 }}
//             end={{ x: 1, y: 0 }}
//           > */}
//           <View
//             style={{
//               height: 75, width: '100%', paddingHorizontal: 15,
//               justifyContent: 'center', position: 'absolute', bottom: 0, overflow: 'hidden',
//               backgroundColor: 'rgba(237, 28, 36, 0.5)', borderBottomLeftRadius: 10, borderBottomRightRadius: 10
//             }}

//           >

//             <Text numberOfLines={1} style={{ color: 'white', fontSize: 16, fontWeight: '400', width: '95%', alignSelf: 'center', lineHeight: 30 }}>{item.headline
//             }</Text>
//             <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
//               <Text style={{ color: 'white', fontWeight: '400', fontSize: 14, marginHorizontal: 10, marginTop: 3 }}>Category: {item.category
//               }</Text>
//               <Text style={{ color: 'white', fontWeight: '400', fontSize: 12, marginHorizontal: 10, marginTop: 3 }}>{item.created_date}</Text>
//             </View>
//           </View>
//           {/* </LinearGradient> */}
//         </View >
//       </>
//     );
//   }
//   const renderPagination = (activeIndex) => {
//     return (
//       <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
//         {introSliderData.map((_, index) => (
//           <View
//             key={index}
//             style={{
//               backgroundColor: activeIndex === index ? '#ED1C24' : '#D9D9D9',
//               height: 9,
//               width: 9,
//               borderRadius: 30,
//               marginHorizontal: 5,
//             }}
//           />
//         ))}
//       </View>
//     );
//   };
//   // const ArtCategory = async (getnwPage = false) => {
//   //   console.log('my art is called');
//   //   setLoading(true)

//   //   var fUrl = creation_home;
//   //   const newpage = getnwPage ? page + 1 : page
//   //   getnwPage ? setPage(newpage) : null

//   //   fUrl += '?page_no=' + page + `&limit=10`

//   //   // console.log('my url art ---------->', fUrl);

//   //   const { responseJson, err } = await requestGetApi(fUrl, '', 'GET', User.token)
//   //   setLoading(false)
//   //   // console.log('the res of cooking after hit==>>', responseJson.body.articles)
//   //   if (responseJson.headers.success == 1) {
//   //     // console.log('my page value', page);
//   //     if (!getnwPage) {
//   //       //generateThumb(responseJson.body.articles)
//   //       console.log('for data 10', responseJson.body.articles, page);
//   //       generateThumb(responseJson.body.articles)
//   //     } else {

//   //       // generateThumb([...categoryData, ...responseJson.body.articles])
//   //       // console.log('for data 4', responseJson.body.articles, page);
//   //       generateThumb([...categoryData, ...responseJson.body.articles])
//   //     }
//   //     setPage(page + 1)
//   //     ///add condition over here
//   //     console.log('my url art ---------->', fUrl);
//   //     // setCategorydata(responseJson.body.articles)
//   //     // generateThumb(responseJson.body.articles)
//   //     const latestRecordsArray = responseJson.body.articles.slice(0, 3);

//   //     // Update the state with the latest records
//   //     setLatestRecords(latestRecordsArray);
//   //     // Toast.show({ text1: responseJson.headers.message });
//   //   } else {

//   //     setalert_sms(err)
//   //     setMy_Alert(true)
//   //   }
//   // }

//   // my updated art category

//   //my fived data
//   // const ArtCategory = async (getnwPage = false) => {
//   //   console.log('my art is called');
//   //   console.log('Current page:', page); // Add a debug log for the current page
//   //   setLoading(true);
//   //   // Calculate the new page value based on the getnwPage parameter
//   //   const newpage = getnwPage ? page + 1 : page;
//   //   console.log('my new getnewpage', newpage)


//   //   // Update the page state only when getnwPage is true
//   //   if (getnwPage) {
//   //     setPage(newpage);
//   //   }

//   //   // Update the fUrl with the new page value
//   //   var fUrl = creation_home + `?page_no=${newpage}&limit=10`;

//   //   try {
//   //     // Make the API request to fetch data
//   //     const { responseJson } = await requestGetApi(fUrl, '', 'GET', User.token);
//   //     setLoading(false);

//   //     if (responseJson.headers.success == 1) {
//   //       if (!getnwPage) {
//   //         console.log('for data 10', responseJson.body.articles, newpage);
//   //         generateThumb(responseJson.body.articles);
//   //       } else {
//   //         console.log('for data 4', responseJson.body.articles, newpage);

//   //         generateThumb([...categoryData, ...responseJson.body.articles]);
//   //       }

//   //       // Update the page state only when getnwPage is true
//   //       if (getnwPage) {
//   //         setPage(newpage + 1);
//   //       }

//   //       const latestRecordsArray = responseJson.body.articles.slice(0, 3);
//   //       setLatestRecords(latestRecordsArray);
//   //     } else {
//   //       setalert_sms(err);
//   //       setMy_Alert(true);
//   //     }
//   //   } catch (error) {
//   //     console.error('Error occurred during fetching data:', error);
//   //     setLoading(false);
//   //   }
//   // };



//   const ArtCategory = async (getnwPage = false) => {
//     console.log('my art is called');
//     console.log('Current page:', page); // Add a debug log for the current page
//     setLoading(true);

//     // Calculate the new page value based on the getnwPage parameter
//     const newpage = getnwPage ? page + 1 : 1;
//     console.log('my new getnewpage', newpage);

//     // Update the fUrl with the new page value
//     var fUrl = creation_home + `?page_no=${newpage}&limit=10`;

//     try {
//       // Make the API request to fetch data
//       const { responseJson } = await requestGetApi(fUrl, '', 'GET', User.token);
//       setLoading(false);
//       console.log('responseJson.body.articles', responseJson.body.articles);

//       if (responseJson.headers.success == 1) {
//         if (!getnwPage) {
//           console.log('for data 10', responseJson.body.articles, newpage);
//           generateThumb(responseJson.body.articles);
//         } else {
//           console.log('for data 4', responseJson.body.articles, newpage);

//           // Check if responseJson.body.articles is not undefined or empty before updating the page state
//           if (responseJson.body.articles && responseJson.body.articles.length > 0) {
//             generateThumb([...categoryData, ...responseJson.body.articles]);
//             setPage(newpage);
//           }
//         }

//         const latestRecordsArray = responseJson.body.articles.slice(0, 3);
//         setLatestRecords(latestRecordsArray);
//       } else {
//         setalert_sms(err);
//         setMy_Alert(true);
//       }
//     } catch (error) {
//       console.error('Error occurred during fetching data:', error);
//       setLoading(false);
//     }
//   };

//   const generateThumb = async (item) => {
//     // console.log('myh page updatedddddddd', item);
//     setLoading2(true)
//     const allData = await Promise.all(
//       item.map?.(async (el) => {
//         if (!el.files) {
//           return { ...el, type: "none" };
//         }
//         else if (el.files.find((js) => js.post_type == "Image")) {
//           return {
//             ...el,
//             type: "image",
//           };
//         } else {
//           // console.log("createThumbnail will be called", el.files[0].file_url);
//           const thumb = await createThumbnail({
//             url: el.files[0].file_url,
//             timeStamp: 1000, // Specify the time position for the thumbnail (in milliseconds)
//           });
//           return {
//             ...el,
//             thumb,
//             type: "video",
//           };
//         }
//       })

//     );


//     // console.log("allData cooking------->>>>", allData);
//     const data = allData
//     // console.log(data, 'data111');
//     setCategorydata(data);

//     // console.log('llllllllffff');
//     // const getSquare = async (file) => {
//     //   console.log(file.files[0].file_url, 'file');
//     //   const thumbnail = await createThumbnail({
//     //     url: file.files[0].file_url,
//     //     timeStamp: 10000, // Specify the time position for the thumbnail (in milliseconds)
//     //   });
//     //   console.log('articleDatathumbnail', url)
//     //   return thumbnail

//     // }
//     // const printSquares = async () => {
//     //   const nums =
//     //     item.filter(el => {
//     //       if (!el.files) {
//     //         return false
//     //       } else {
//     //         if (el.files.find(js => js.post_type == 'Video')) {
//     //           return true
//     //         } else {
//     //           return false
//     //         }
//     //       }
//     //     })
//     //   const promiseArray = nums.map(x => getSquare(x));
//     //   const resolvedPromises = await Promise.all(promiseArray);
//     //   console.log(resolvedPromises, 'hhhhhhh');
//     // };
//     // printSquares();
//     setLoading2(false)
//   };


//   const generateThum = async (item) => {
//     // console.log('my thum for suggested', item);
//     setLoading3(true)
//     // const videos = item.filter(el => {
//     //   if (!el.files) {
//     //     return false
//     //   } else {
//     //     if (el.files.find(js => js.post_type == 'Video')) {
//     //       return true
//     //     } else {
//     //       return false
//     //     }
//     //   }
//     // })

//     const allData = await Promise.all(
//       item.map?.(async (el) => {
//         if (!el.files) {
//           return { ...el, type: "none" };
//         }
//         else if (el.files.find((js) => js.post_type == "Image")) {
//           return {
//             ...el,
//             type: "image",
//           };
//         } else {
//           // console.log("createThumbnail will be called for suggested post  ", el.files[0].file_url);
//           const thumb = await createThumbnail({
//             url: el.files[0].file_url,
//             timeStamp: 1000, // Specify the time position for the thumbnail (in milliseconds)
//           });
//           // console.log('out of thumb function');
//           return {
//             ...el,
//             thumb,
//             type: "video",
//           };
//         }
//       })

//     );


//     // console.log("allDatafor suggeste drecom", allData);
//     const data = allData
//     // console.log(data, 'data111 uuuuu');
//     setGetSuggested(data)

//     setLoading3(false)
//   };



//   const Categories = async () => {
//     setLoading(true)
//     var fUrl = creation_categories
//     var urls = '?module_id=' + '51'
//     //  console.log('my url---------->', urls)
//     if (urls != undefined) {
//       fUrl = fUrl + urls
//     }
//     // console.log("LIKE CLICK:::",isSaved);
//     const { responseJson, err } = await requestGetApi(fUrl, '', 'GET', User.token)
//     setLoading(false)
//     // console.log('response afer click of items', responseJson)
//     if (responseJson.headers.success == 1) {
//       // console.log('the res after sucess of category', responseJson.body.data)
//       setCategories(responseJson.body.data)

//       // Toast.show({ text1: responseJson.headers.message });
//     } else {

//       setalert_sms(err)
//       setMy_Alert(true)
//     }
//   }

//   /////post suggested hit
//   const postsuugestion = async (items) => {
//     // console.log('kkkkk for post suggestion', items);


//     setLoading(true)

//     var fUrl = creation_addView
//     var urls = items
//     // console.log('my url---------->', urls)
//     if (urls != undefined) {
//       fUrl = fUrl + urls
//     }
//     // console.log('my url post', fUrl)
//     var data = {
//       "object_type": "article",
//       "object_id": 51
//     }
//     // console.log('====================================');
//     // console.log(data, 'my data of post');
//     // console.log('====================================');
//     const { responseJson, err } = await requestPostApi(fUrl, data, 'POST', User.token)
//     setLoading(false)
//     // console.log('Post suggestion of cooking', responseJson)
//     // setIsLiked(!isLiked);
//     if (responseJson.headers.success == 1) {
//       //ArtCategory()
//       // Toast.show({ text1: responseJson.headers.message });
//     } else {
//       // console.log(responseJson.headers.message, errmshhh);
//       setalert_sms(err)
//       setMy_Alert(true)
//     }
//   }

//   const getSuggestion = async () => {
//     setLoading(true)
//     var fUrl = creation_getView
//     var urls = 51
//     // console.log('my url---------->', urls)
//     if (urls != undefined) {
//       fUrl = fUrl + urls
//     }
//     // console.log(' get suggestion url', fUrl)

//     // console.log('my url---------->', fUrl)

//     const { responseJson, err } = await requestGetApi(fUrl, '', 'GET', User.token)
//     setLoading(false)
//     // console.log('the res of suggested cooking post', responseJson)
//     if (responseJson.headers.success == 1) {
//       // console.log('the res after sucess of post suggested1111', responseJson.body.data)
//       //setGetSuggested(responseJson.body)
//       generateThum(responseJson.body.data)
//       // setCategorydata(responseJson.body.articles)
//       // generateThumb(responseJson.body.articles)
//       // const latestRecordsArray = responseJson.body.articles.slice(0, 3);

//       // // Update the state with the latest records
//       // setLatestRecords(latestRecordsArray);
//       // Toast.show({ text1: responseJson.headers.message });
//     } else {

//       setalert_sms(err)
//       setMy_Alert(true)
//     }
//   }

//   const getReport = async () => {
//     setLoading(true)
//     const { responseJson, err } = await requestGetApi(creation_get_report, '', 'GET', User.token)
//     setLoading(false)
//     // console.log('the res of get suggest post from cooking', responseJson)
//     if (responseJson.headers.success == 1) {
//       // console.log('the res after sucess report get', responseJson.body.data)
//       setReportGet(responseJson.body.data)

//     } else {

//       setalert_sms(err)
//       setMy_Alert(true)
//     }
//   }

//   const postReport = async (items) => {
//     // console.log('kkkkk', items);
//     if (selectedReasonId === null) {
//       Toast.show({ text1: 'Select a reason for report' });
//       return; // Exit the function to prevent further execution
//     }

//     setLoading(true);
//     var fUrl = creation_post_report;
//     var urls = myArticle;
//     // console.log('my url---------->', urls);
//     if (urls !== undefined) {
//       fUrl = fUrl + urls;
//     }
//     var data = {
//       report_id: items,
//       comment: ""
//     };

//     const { responseJson, err } = await requestPostApi(fUrl, data, 'POST', User.token);
//     setLoading(false);
//     // console.log('the res of report from cooking', responseJson);
//     setShowReportModal(false);

//     if (responseJson.headers.success === 1) {
//       Toast.show({ text1: responseJson.headers.message });
//       setSelectedReasonId(null);
//       // console.log('report post article', responseJson);
//     } else {
//       setalert_sms(err);
//       setMy_Alert(true);
//     }
//   }
//   const handleLoadMore = () => {

//     // console.log('handel more caledd???????');
//     ArtCategory(true)
//   };
//   const renderFooter = () => {
//     // console.log('render fotter called?????');
//     return loading ? (
//       <View style={{ marginTop: 10, alignItems: "center" }}>
//         <ActivityIndicator size="large" color="#1f1f1f" />
//       </View>
//     ) : null;
//   };
//   const toggleModal = (state) => {
//     console.log('state', state);
//     setShowModal({
//       isVisible: state.isVisible,
//       data: state.data,
//     });
//   };
//   return (
//     <SafeAreaView scrollEnabled={scrollEnabled} style={{ backgroundColor: '#F8F8F8', }}>
//       <ScrollView style={{ zIndex: -999 }} showsVerticalScrollIndicator={false}
//         showsHorizontalScrollIndicator={false}>
//         <HomeHeaderRoundBottom height={100} extraStyle={{ paddingtop: 10, paddingBottom: 25 }} paddingHorizontal={15} borderBottomLeftRadius={20} borderBottomRightRadius={20} backgroundColor='#ED1C24'
//           press1={() => { props.navigation.goBack() }} img1={require('../../../assets/images/service-header-back-button.png')} img1width={25} img1height={18}
//           press2={() => { }} title2={'Cooking'} fontWeight={'500'} img2height={20} color={'#fff'}
//           press3={() => { props.navigation.navigate('CookingNotifications') }} img3={require('../../../assets/images/fashion-bell-icon.png')} img3width={25} img3height={22}
//           press4={() => { props.navigation.navigate('CookingProfile') }} img4={require('../../../assets/People/PeopleProfileIConModal.png')} img4width={25} img4height={22}
//         />
//         <View style={{ top: -20, width: '90%', alignSelf: 'center' }} >

//           <ArtSearch marginTop={0}
//             // serchValue={searchValue}

//             searchIcon={require('../../../assets/Art/CreationArtSearch.png')}
//             // onChangeText={(e) => { setsearchValue(e) }}
//             press={() => { props.navigation.navigate('CookingCategories', { cat_name: {}, from: 'seach' }) }}
//             // presssearch={() => { Alert.alert('Search Pressed') }}
//             paddingLeft={20} />

//         </View>

//         <View style={{
//           flex: 1, width: '90%',
//           marginLeft: 'auto',
//           marginRight: 'auto',
//           backgroundColor: '#F8F8F8'
//         }}>
//           <View style={{ width: dimensions.SCREEN_WIDTH * 0.9, alignSelf: 'flex-start', marginTop: 0, marginBottom: 10, marginTop: 10, zIndex: 999 }}>
//             <FlatList
//               data={categories}
//               showsHorizontalScrollIndicator={true}

//               horizontal
//               renderItem={({ item, index }) => {
//                 return (

//                   <TouchableOpacity style={{ height: 140, marginRight: 15, overflow: 'hidden', position: 'relative', alignItems: 'center', paddingHorizontal: 10, width: 140, borderRadius: 10 }}
//                     onPress={() => { props.navigation.navigate('CookingCategories', { cat_name: item, from: 'bycategory' }) }}>
//                     <Image source={{ uri: item.image }} style={{ width: dimensions.SCREEN_WIDTH / 2.8, height: 160 }} resizeMode='stretch'></Image>
//                     <LinearGradient
//                       colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.43)']}
//                       style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, zIndex: 1, }}
//                     >
//                       <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center', }}>
//                         <Text style={{ fontSize: 14, fontWeight: '500', color: '#fff', bottom: 20 }}>{item?.name}</Text>
//                       </View>
//                     </LinearGradient>
//                   </TouchableOpacity>
//                 )
//               }}
//               keyExtractor={item => item.id}
//             />
//           </View>

//           <View style={{ marginTop: 20, width: '100%', justifyContent: 'center', alignItems: 'center', }}>
//             {categoryData.length > 0 ?

//               <AppIntroSlider
//                 data={categoryData.slice(0, 3)}
//                 renderItem={_renderItem}
//                 renderDoneButton={() => <View />}
//                 renderNextButton={() => <View />}
//                 activeDotStyle={{
//                   backgroundColor: '#29913C',
//                   height: 9,
//                   width: 9,
//                   borderRadius: 30,
//                   position: 'absolute',
//                   top: 20,
//                 }}
//                 dotStyle={{
//                   backgroundColor: '#fff',
//                   height: 9,
//                   width: 9,
//                   borderRadius: 30,
//                   position: 'absolute',
//                   top: 20,
//                 }}
//                 renderPagination={renderPagination}
//                 keyExtractor={(item) => item.id}
//               />
//               : null}
//           </View>

//           <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 20, marginBottom: 10 }}>
//             <Text style={{ fontSize: 16, fontWeight: '500', color: '#263238' }}>Around the world</Text>
//             <TouchableOpacity onPress={() => { props.navigation.navigate('CookingViewAll') }}>
//               <Text style={{ fontSize: 13, fontWeight: '400', color: '#ED1C24' }}>View all</Text>
//             </TouchableOpacity>
//           </View>

//           <View style={{ width: dimensions.SCREEN_WIDTH * 0.9, alignSelf: 'flex-start', marginTop: 10, height: 300, zIndex: 999 }}>

//             <ScrollView showsVerticalScrollIndicator={false}
//               showsHorizontalScrollIndicator={false} nestedScrollEnabled={true} scroolToEnd={true} ref={scrollViewRef}
//               onScroll={(event) => {
//                 const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
//                 const isAtEnd = layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;
//                 if (isAtEnd) {
//                   // console.log('is function reached on end')
//                   handleLoadMore();
//                 }
//               }}
//             >
//               <View>
//                 <FlatList

//                   style={{}}
//                   data={categoryData.slice(4)}
//                   // data={categoryData}
//                   // ref={scrollRef}
//                   showsHorizontalScrollIndicator={true}
//                   // onEndReachedThreshold={0.9}
//                   // onEndReached={
//                   //   handleLoadMore
//                   // }
//                   //ListFooterComponent={renderFooter}
//                   // ListFooterComponent={() => (<Text style={{ fontSize: 30, textAlign: "center", marginBottom: 20, fontWeight: 'bold', color: 'black' }}>Load More</Text>)}

//                   renderItem={({ item, index }) => {
//                     console.log('category item', item)
//                     let videoUrl = null; // Declare and initialize the videoUrl variable

//                     if (item.type === "video") {
//                       // Get the video URL from the files array
//                       videoUrl = item.files[0]?.file_url; // Assuming the URL is stored in the 'url' property of the file object
//                     }
//                     // console.log();
//                     return (

//                       <>
//                         <TouchableOpacity style={{ width: dimensions.SCREEN_WIDTH, marginRight: 15, flexDirection: 'row', marginBottom: 20, }}
//                           onPress={() => {
//                             postsuugestion(item.id)
//                             props.navigation.navigate('CookingPost', { id: item.id })

//                           }}>
//                           <TouchableOpacity onPress={() => {
//                             setStartFromIndex(index);
//                             setSelectedID(item.id)
//                             item.type === "video" ? setShowModal({
//                               isVisible: true,
//                               data: item.files[0],
//                             }) : props.navigation.navigate('CookingPost', { id: item.id })

//                           }}>
//                             {item.type == 'video' ?
//                               // <VideoPlayer
//                               //   resizeMode="contain"
//                               //   // video={{ uri: videoUrl }}
//                               //   style={{ borderRadius: 10, borderWidth: 2, }}
//                               //   videoWidth={dimensions.SCREEN_WIDTH / 2.5}
//                               //   videoHeight={100}
//                               //   autoplay={false}
//                               //   thumbnail={{ uri: item.thumb.path }}
//                               //   endWithThumbnail
//                               //   disableControlsAutoHide
//                               //   customStyles={{
//                               //     thumbnail: { width: dimensions.SCREEN_WIDTH / 2.5, height: 105 },
//                               //     // videoWrapper: { width: dimensions.SCREEN_WIDTH / 2.5, height: 90, },
//                               //     // wrapper: { width: dimensions.SCREEN_WIDTH / 2.5, height: 90 },
//                               //   }}
//                               // />
//                               <ImageBackground source={{ uri: item.thumb.path }} style={{
//                                 width: dimensions.SCREEN_WIDTH / 2.5, height: 105, alignSelf: 'center', justifyContent: 'center', borderRadius: 10,
//                                 overflow: 'hidden',
//                               }} resizeMode='cover' >
//                                 <Image source={require('../../../assets/images/people-play-button.png')} style={{ width: '20%', height: '20%', alignSelf: 'center', }} resizeMode='contain' ></Image>
//                               </ImageBackground>
//                               : <Image source={{
//                                 uri: item.cover_photo
//                               }} style={{ width: dimensions.SCREEN_WIDTH / 2.5, height: 105, borderRadius: 10, }} resizeMode='cover'></Image>}

//                           </TouchableOpacity>
//                           <View style={{ flexDirection: 'column', width: '90%' }}>
//                             <View style={{ width: '50%', marginTop: 4, marginLeft: 7, justifyContent: 'flex-start' }}>
//                               <Text numberOfLines={2} style={{ fontSize: 14, fontWeight: '400', color: '#000000' }} >
//                                 {item.headline}
//                               </Text>
//                             </View>
//                             <Text style={{ fontSize: 12, fontWeight: '400', color: 'black', marginLeft: 6, marginTop: 8 }}>Category :- <Text style={{ fontSize: 12, fontWeight: '400', color: '#B4BBC6', marginLeft: 6, }}>{item.category
//                             }</Text></Text>
//                             <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '40%' }}>

//                               <Text style={{ fontSize: 12, fontWeight: '400', color: 'black', marginLeft: 6, }}><Text style={{ fontSize: 12, fontWeight: '400', color: '#B4BBC6', marginLeft: 6, }}>{item.username}</Text></Text>
//                               {/* <View style={{ height: 14, borderLeftColor: '#B2B7B9', borderLeftWidth: 1, justifyContent: 'center' }} /> */}


//                             </View>
//                             <Text style={{ fontSize: 12, fontWeight: '400', color: 'black', marginLeft: 6, }}>Published Date :- <Text style={{ fontSize: 12, fontWeight: '400', color: '#B4BBC6', textAlign: 'left', }}>
//                               {/* {new Date(item.created_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} */}
//                               {item.created_date}
//                               {/* {item.created_date.slice(11, 16)} */}
//                             </Text></Text>
//                             <View style={styles.buttonsRow}>
//                               <TouchableOpacity style={styles.buttonView} onPress={() =>
//                                 Likepost(item.id
//                                 )

//                                 // console.log('my like clicked')
//                               } >
//                                 <Image

//                                   source={
//                                     item.totalLikes <= 0
//                                       ?
//                                       require('../../../assets/images/fashion-dark-like-button.png') // Use dislike image
//                                       : require('../../../assets/Art/ThumbsUpCooking.png')}
//                                   // Use like image

//                                   style={{ height: 20, width: 20 }} />
//                                 <Text style={styles.buttonText}>{item.totalLikes}</Text>
//                               </TouchableOpacity>
//                               <TouchableOpacity style={styles.buttonView} onPress={() => Dislikepost(item.id
//                               )} >
//                                 <Image source={
//                                   item.totalDislikes
//                                     <= 0
//                                     ? require('../../../assets/images/fashion-dark-dislike-button.png')
//                                     // Use dislike image
//                                     : require

//                                       ('../../../assets/Art/ThumbsDownCooking.png') // Use like image
//                                 } // Use like image
//                                   style={{ height: 20, width: 20 }} />
//                                 <Text style={styles.buttonText}>{item.totalDislikes}</Text>
//                               </TouchableOpacity>
//                               <TouchableOpacity style={styles.buttonView}>
//                                 <Image source={require('../../../assets/images/fashion-share-button.png')} style={{ height: 20, width: 20 }} />
//                                 <Text style={styles.buttonText}>Share</Text>
//                               </TouchableOpacity>
//                               <TouchableOpacity onPress={() => { setShowReportModal(true), setMyArticle(item.id) }} style={styles.buttonView}>
//                                 <Image source={require('../../../assets/images/fashion-report-button.png')} style={{ height: 20, width: 20 }} />
//                                 <Text style={styles.buttonText}>Report</Text>
//                               </TouchableOpacity>
//                             </View>
//                           </View>
//                         </TouchableOpacity >
//                         <View style={{ borderBottomWidth: 1, borderBottomColor: '#D9D9D9', height: 1, width: '100%', marginBottom: 20 }}></View>
//                       </>
//                     )
//                   }}
//                   keyExtractor={item => item.id}

//                 />
//               </View>
//             </ScrollView>
//           </View>

//           <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10, marginTop: 35 }}>
//             <Text style={{ fontSize: 16, fontWeight: '500', color: '#263238' }}>Recommended for you</Text>
//             <TouchableOpacity onPress={() => {



//               props.navigation.navigate('AllCookingSuggested')
//             }} >
//               <Text style={{ fontSize: 13, fontWeight: '400', color: '#ED1C24' }}>View all</Text>
//             </TouchableOpacity>
//           </View>

//           <View style={{ width: dimensions.SCREEN_WIDTH * 0.9, alignSelf: 'flex-start', marginTop: 0, marginBottom: 10, marginTop: 10 }}>
//             {/* {console.log('jjjjjjjjcheck', getSuggested)
//             } */}
//             {getSuggested.length > 0 ? (
//               <FlatList
//                 data={getSuggested}
//                 showsHorizontalScrollIndicator={true}
//                 horizontal
//                 renderItem={({ item, index }) => {
//                   console.log(item, 'my updated get suggested')

//                   return (
//                     <>
//                       <View style={{ width: dimensions.SCREEN_WIDTH / 1.5, height: 160, marginRight: 15, backgroundColor: 'red' }}
//                       // onPress={() => {

//                       //   item.type == 'video' ? setShowModal({
//                       //     isVisible: true,
//                       //     data: item.files[0],
//                       //   }) : props.navigation.navigate('CookingPost', { id: item.id })


//                       // props.navigation.navigate('CookingPost', { id: item.id, })

//                       // }}

//                       >

//                         {
//                           item.type == 'video' ?
//                             <TouchableOpacity onPress={() => setShowModal({
//                               isVisible: true,
//                               data: item.files[0],
//                             })}>
//                               <ImageBackground source={{ uri: item.thumb.path }} style={{
//                                 width: dimensions.SCREEN_WIDTH / 1.5, height: 160, alignSelf: 'center', justifyContent: 'center', borderRadius: 10,
//                                 overflow: 'hidden',
//                               }} resizeMode='cover' >
//                                 <TouchableOpacity onPress={() => setShowModal({
//                                   isVisible: true,
//                                   data: item.files[0],
//                                 })}>
//                                   <Image source={require('../../../assets/images/people-play-button.png')} style={{ width: '20%', height: '20%', alignSelf: 'center', }} resizeMode='contain' ></Image>
//                                 </TouchableOpacity>
//                               </ImageBackground>
//                             </TouchableOpacity>
//                             :
//                             <Image source={{ uri: item.cover_photo }} style={{ width: dimensions.SCREEN_WIDTH / 1.5, height: 160, borderRadius: 10 }}></Image>

//                           // {/* <Image source={{ uri: item.cover_photo }} style={{ width: dimensions.SCREEN_WIDTH / 1.5, height: 160, borderRadius: 10 }}></Image> */}
//                         }
//                       </View >
//                       <View style={styles.flatlistMainBottomView}>

//                       </View >
//                     </>
//                   )
//                 }}
//                 keyExtractor={item => item.id}
//               />
//             ) : (

//               <FlatList
//                 data={categoryData.sort((a, b) => new Date(a.created_date) - new Date(b.created_date))}
//                 //data={categoryData}
//                 showsHorizontalScrollIndicator={true}
//                 horizontal
//                 keyExtractor={(item) => item.id.toString()}
//                 renderItem={({ item, index }) => {
//                   // console.log(item, 'my updated by thumb on data');
//                   return (
//                     <View onPress={() => {
//                       props.navigation.navigate('CookingPost', { id: item.id })
//                     }}
//                       style={{ width: dimensions.SCREEN_WIDTH / 1.5, height: 500, marginRight: 15 }}>
//                       <View style={{}}>


//                         <View style={{ flexDirection: 'row', alignItems: 'center', }}>

//                         </View>

//                       </View>

//                       {/* addd new view heree */}
//                       <View style={{ width: dimensions.SCREEN_WIDTH / 1.5, alignSelf: 'center', }}>
//                         <View style={{ justifyContent: 'flex-start', }}>
//                           <ScrollView horizontal contentContainerStyle={styles.scrollViewContent}>

//                             {item.type == 'video' ?
//                               <TouchableOpacity onPress={() => setShowModal({
//                                 isVisible: true,
//                                 data: item.files[0],
//                               })}>
//                                 <ImageBackground source={{ uri: item.thumb.path }} style={{
//                                   width: dimensions.SCREEN_WIDTH / 1.5, height: 160, alignSelf: 'center', justifyContent: 'center', borderRadius: 10,
//                                   overflow: 'hidden',
//                                 }} resizeMode='cover' >
//                                   <Image source={require('../../../assets/images/people-play-button.png')} style={{ width: '20%', height: '20%', alignSelf: 'center', }} resizeMode='contain' ></Image>
//                                 </ImageBackground>
//                               </TouchableOpacity>
//                               :
//                               <TouchableOpacity onPress={() => {
//                                 props.navigation.navigate('CookingPost', { id: item.id })
//                               }}>
//                                 <Image source={{ uri: item.cover_photo }} style={{ width: dimensions.SCREEN_WIDTH / 1.5, height: 160, borderRadius: 10 }}></Image>
//                               </TouchableOpacity>
//                               // {/* <Image source={{ uri: item.cover_photo }} style={{ width: dimensions.SCREEN_WIDTH / 1.5, height: 160, borderRadius: 10 }}></Image> */}
//                             }

//                           </ScrollView>
//                         </View>
//                       </View>


//                       <TouchableOpacity style={styles.flatlistMainBottomView} onPress={() => {
//                         props.navigation.navigate('CookingPost', { id: item.id })
//                       }}>
//                         {
//                           <View style={{ flexDirection: 'row', width: '60%', }}>
//                             <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2, marginBottom: 5 }} onPress={() => {

//                               // props.navigation.navigate('LikedUserList', { postid: item.id })
//                             }}>


//                             </TouchableOpacity>

//                           </View>


//                         }
//                         <View style={styles.flatlistBottomView}>
//                           <View style={{ flexDirection: 'row', alignItems: 'center', }}>
//                             < View style={styles.buttonsContainer} >
//                               <View style={{
//                                 flexDirection: 'row',
//                                 justifyContent: 'space-between',
//                                 alignItems: 'center',


//                                 width: '100%'
//                               }}>


//                                 <Text numberOfLines={2} style={{
//                                   fontSize: 14,
//                                   fontWeight: '500',
//                                   color: 'black',
//                                   marginLeft: 5,
//                                   width: '59%'
//                                 }}>{item.headline} </Text>
//                                 <View style={{ backgroundColor: '#ED1C24', height: 35, width: 35, borderRadius: 20, alignSelf: 'center' }} >
//                                   <Image source={require('../../../assets/arrow_right_black.png')} style={{ height: 30, width: 30, tintColor: 'white', justifyContent: 'center', alignItems: 'center', alignSelf: 'center', marginTop: 2, marginLeft: 3 }} ></Image>
//                                 </View>
//                               </View>


//                             </View>
//                           </View>
//                           <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//                             <View style={{ marginRight: 10 }}>

//                             </View>

//                           </View>
//                         </View>


//                       </TouchableOpacity>
//                     </View>
//                   );
//                 }}
//               />)}
//           </View>


//           <View style={{ height: 10 }} />


//         </View>


//         <View style={{ height: 100 }} />
//         {/* </ScrollView> */}

//         {/* <TouchableOpacity onPress={()=>props.navigation.navigate('ShopProdCart')} style={{width:'80%',height:60,flexDirection:'row',justifyContent:'flex-end',position:'absolute',bottom:40, right:20, shadowColor: '#FFD037', shadowOffset: {width: 0,height: 3},shadowRadius: 1,shadowOpacity: 0.1,elevation: 5}}> */}


//       </ScrollView>
//       {
//         !showReportModal && (<TouchableOpacity onPress={() => { props.navigation.navigate('CookingUpload') }} style={{ bottom: 60, right: 20, position: 'absolute', alignSelf: 'flex-end', width: 80, height: 80, borderRadius: 80 / 2, backgroundColor: '#ED1C24', justifyContent: 'center', alignItems: 'center', shadowColor: '#FFD037', shadowOffset: { width: 0, height: 3 }, shadowRadius: 1, shadowOpacity: 0.1, elevation: 5 }}>
//           <Image source={require('../../../assets/images/fashion-upload-icon.png')} style={{ width: 40, height: 40 }} />
//         </TouchableOpacity>)
//       }
//       {/* </TouchableOpacity> */}

//       {loading || loading2 ? <Loader /> : null}
//       <Modal
//         isVisible={showReportModal}
//         swipeDirection="down"
//         onBackdropPress={() => { setShowReportModal(false), setSelectedReasonId(null) }}
//         onSwipeComplete={(e) => {
//           setShowReportModal(false)
//           setSelectedReasonId(null);
//         }}
//         scrollTo={() => { }}
//         scrollOffset={1}
//         propagateSwipe={true}
//         coverScreen={false}
//         backdropColor='transparent'
//         style={{ justifyContent: 'flex-end', margin: 0, backgroundColor: 'rgba(0,0,0,0.5)' }}
//       >
//         <View style={{ height: 'auto', backgroundColor: '#fff', borderTopLeftRadius: 30, borderTopRightRadius: 30 }}>
//           <Text style={{ fontSize: 20, fontWeight: '700', color: '#455A64', textAlign: 'center', marginBottom: 20, marginTop: 30 }}>Report</Text>
//           <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled={true}>

//             <FlatList
//               data={reportGet}
//               showsHorizontalScrollIndicator={false}
//               numColumns={1}
//               keyExtractor={item => item.id}
//               style={{ marginBottom: 10 }}
//               renderItem={({ item, index }) => {
//                 // console.log('item.report_id', item.report_id);
//                 return (
//                   <TouchableOpacity key={item.report_id} onPress={() => setSelectedReasonId(item.report_id)} style={selectedReasonId === item.report_id ? styles.selectedReasonView : styles.reasonView}>
//                     <Image source={selectedReasonId === item.report_id ? require('../../../assets/images/fastion-selected-reason-icon.png') : require('../../../assets/images/fastion-reason-icon.png')} style={{ tintColor: '#ED1C24' }} />
//                     <View style={{ marginLeft: 10 }}>
//                       <Text style={{ fontSize: 14, lineHeight: 14, fontWeight: '400', color: '#455A64' }}>{item.feedback}</Text>
//                       {item.description ?
//                         <Text style={{ fontSize: 12, lineHeight: 12, fontWeight: '400', color: '#C5C6C9', marginTop: 2 }}>{item.description}</Text>
//                         : null}
//                     </View>
//                   </TouchableOpacity>
//                 )
//               }}
//             />

//             <TouchableOpacity onPress={() => { postReport(selectedReasonId) }} style={styles.reportButtonView}>
//               <Text style={{ fontSize: 15, fontWeight: '500', color: '#fff', }}>Report</Text>
//             </TouchableOpacity>

//           </ScrollView>

//         </View>
//       </Modal>
//       {console.log('showModal?.data', showModal?.data)}
//       {
//         showModal.isVisible ? (

//           <VideoModel
//             isVisible={showModal.isVisible}
//             toggleModal={toggleModal}
//             videoDetail={{ ...showModal?.data, url: showModal?.data?.file_url }}
//             {...props}
//           />
//         ) : null
//       }

//       <PostModal
//         isVisible={showPostsModal}
//         setIsVisible={setShowPostsModal}
//         startFromIndex={startFromIndex}
//         data={categoryData}
//         id={selectedID}
//       />

//     </SafeAreaView >
//   );
// }
// const styles = StyleSheet.create({
//   unselectedTabText: {
//     fontSize: 14,
//     fontWeight: '500',
//     color: '#263238'
//   },
//   requestCallView: {
//     marginTop: 10,
//     width: 140,
//     height: 30,
//     borderRadius: 15,
//     backgroundColor: '#29913C',
//     alignItems: 'center',
//     justifyContent: 'center',
//     shadowColor: '#6D2F91',
//     shadowOffset: { width: 3, height: 3 },
//     shadowRadius: 5,
//     shadowOpacity: 0.17,
//     elevation: 2
//   },
//   VideoThumbWrapper: {
//     position: 'relative',
//     // width: '48%',
//     // marginRight: 8,
//     marginBottom: 4,

//     width: dimensions.SCREEN_WIDTH / 1.5,
//     height: 160,
//     marginRight: 20,
//     borderRadius: 15,
//     // shadowColor:'#000',
//     // shadowOffset: {width: 0,height: 3},
//     // shadowRadius: 1,
//     // shadowOpacity: 0.03,
//     // elevation: 1,
//   },
//   PlayIconContainer: {
//     position: 'absolute',
//     top: 0,
//     bottom: 0,
//     left: 0,
//     right: 0,
//     zIndex: 1,
//   },
//   PlayIconWrapper: {
//     flex: 1,
//     flexDirection: 'column',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   BackGroundImage: {
//     width: '100%',
//     height: 160,
//     justifyContent: 'center',
//     borderRadius: 15
//   },
//   buttonsRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginTop: 20,
//     width: '53%',
//     marginLeft: 6
//   },
//   buttonView: {
//     flexDirection: 'row',
//     alignItems: 'center'
//   },
//   shippingView: {

//     height: 688,
//     backgroundColor: 'white',
//     borderRadius: 10,
//     width: 596,
//     padding: 10,
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderWidth: 1,
//     borderColor: '#545454'
//   },
//   buttonText: {
//     fontSize: 10,
//     fontWeight: '500',
//     color: '#8F93A0',
//     marginLeft: 5
//   },
//   reasonView: {
//     alignSelf: 'center',
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     marginBottom: 15,
//     // paddingVertical:10,
//     paddingHorizontal: 10,
//     width: '90%',
//     height: 60,
//   },
//   selectedReasonView: {
//     alignSelf: 'center',
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     marginBottom: 15,
//     // paddingVertical:10,
//     paddingHorizontal: 10,
//     width: '90%',
//     height: 60,
//     borderColor: '#E7F7FF',
//     borderWidth: 1,
//     shadowColor: '#455A64',
//     shadowOffset: { width: 3, height: 3 },
//     shadowRadius: 5,
//     shadowOpacity: 0.10,
//     elevation: 1
//   },
//   reportButtonView: {
//     height: 60,
//     width: '90%',
//     alignSelf: 'center',
//     backgroundColor: '#ED1C24',
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderRadius: 5,
//     marginBottom: 30,
//     shadowColor: '#000',
//     shadowOffset: { width: 3, height: 3 },
//     shadowRadius: 5,
//     shadowOpacity: 0.10,
//     elevation: 2
//   },
//   flatlistMainBottomView: {
//     backgroundColor: '#fff',
//     paddingVertical: 15,
//     paddingHorizontal: 20,
//     width: dimensions.SCREEN_WIDTH * 0.9,
//     borderBottomRightRadius: 20,
//     borderBottomLeftRadius: 20,
//     borderLeftWidth: 1,
//     borderRightWidth: 1,
//     borderBottomWidth: 1,
//     borderLeftColor: '#EAEBEB',
//     borderRightColor: '#EAEBEB',
//     borderBottomColor: '#EAEBEB',

//   },

//   flatlistMainView: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     backgroundColor: 'pink',
//     paddingHorizontal: 15,
//     paddingVertical: 10,
//     width: dimensions.SCREEN_WIDTH / 1.5,
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     borderBottomWidth: 1,
//     borderLeftColor: '#EDEEEE',
//     borderRightColor: '#EDEEEE',
//     borderBottomColor: '#EDEEEE'

//   },
//   followingImageView: {
//     flexDirection: 'row',
//     alignItems: 'center',

//   },
//   followingView: {
//     justifyContent: 'center',
//     marginLeft: 10
//   },
//   flatlistMainBottomView: {
//     backgroundColor: '#fff',
//     paddingVertical: 15,
//     paddingHorizontal: 20,
//     width: dimensions.SCREEN_WIDTH / 1.5,
//     borderBottomRightRadius: 20,
//     borderBottomLeftRadius: 20,
//     borderLeftWidth: 0.5,
//     borderRightWidth: 0.5,
//     borderBottomWidth: 0.5,
//     borderLeftColor: '#ED1C24',
//     borderRightColor: '#ED1C24',
//     borderBottomColor: '#ED1C24',

//   },
//   flatlistBottomView: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',

//     //  marginBottom: 12
//   },
//   buttonsContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',

//     marginTop: 0, // Add margin between text and buttons
//     // Align buttons with the text,


//   },
// });
// export default CookingHome








// // import React, { useEffect,useState ,useRef} from 'react';
// // import {View,Image,Text,StyleSheet,SafeAreaView,TextInput,FlatList,Alert,TouchableOpacity, ScrollView, ImageBackground} from 'react-native';
// // import HomeHeaderRoundBottom from '../../../component/HomeHeaderRoundBottom';
// // import SearchInput2 from '../../../component/SearchInput2';
// // import SearchInputEnt from '../../../component/SearchInputEnt';
// // import FashionSearch from './components/FashionSearch';
// // import SerchInput from '../../../component/SerchInput';
// // import { dimensions, Mycolors } from '../../../utility/Mycolors';
// // import { ImageSlider,ImageCarousel } from "react-native-image-slider-banner";
// // import MyButtons from '../../../component/MyButtons';
// // import MultiSlider from '@ptomasroos/react-native-multi-slider';
// // import Modal from 'react-native-modal';
// // import Toast from 'react-native-simple-toast'
// // import LinearGradient from 'react-native-linear-gradient'
// // import AppIntroSlider from 'react-native-app-intro-slider';
// // import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
// // import Loader from '../../../WebApi/Loader';
// // import VideoPlayer from 'react-native-video-player'
// // import { createThumbnail } from "react-native-create-thumbnail";
// // import ViewMoreText from 'react-native-view-more-text';

// // const FashionHome = (props) => {
// //   const [searchValue,setsearchValue]=useState('')
// //   const [scrollEnabled, setScrollEnabled] = useState(false)
// //   const myTextInput = useRef()
// //   const [multiSliderValue, setMultiSliderValue] = useState([0, 100])
// //   const [showChooseMilesModal, setShowChooseMilesModal] = useState(false)
// //   const [selectedCategory, setSelectedCategory]=useState('1')
// //   const [loading, setLoading] = useState(false)
// //   const [showModal, setShowModal] = useState({isVisible: false, data: null});
// //   const [showVideoModal, setShowVideoModal] = useState(false)
// //   const [selectedVideo, setSelectedVideo] = useState({})
// //   const [showReportModal, setShowReportModal] = useState(false)
// //   const [selectedReasonId, setSelectedReasonId]=useState(null)
// //   const [reportReasonData, setReportReasonData]=useState([
// //     {
// //       id: '1',
// //       name: 'I just don’t like it',
// //       description: '',
// //       selected: true
// //     },
// //     {
// //       id: '2',
// //       name: 'Nudity or pornography',
// //       description: '',
// //       selected: false
// //     },
// //     {
// //       id: '3',
// //       name: 'Hate speech or symbols',
// //       description: 'Racist, homophobic or sexist slurs',
// //       selected: false
// //     },
// //     {
// //       id: '4',
// //       name: 'Violence or threat of violence',
// //       description: `Graphic injury, unlawful activity, dangerous or criminal organizations`,
// //       selected: false
// //     },
// //     {
// //       id: '5',
// //       name: 'Sale or promotion of firearms',
// //       description: '',
// //       selected: false
// //     },
// //     {
// //       id: '6',
// //       name: 'Sale or promotion of drugs',
// //       description: '',
// //       selected: false
// //     },
// //     {
// //       id: '7',
// //       name: 'Harassment or bullying',
// //       description: '',
// //       selected: false
// //     },
// //     {
// //       id: '8',
// //       name: 'Intellectual property violation',
// //       description: 'Copyright or trademark infringement',
// //       selected: false
// //     },
// //   ])
// //   const [videoDetails, setVideoDetails] = useState([
// //     {url: `http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4`},
// //     {url: `http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4`},
// //     {url: `http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4`},
// //   ])
// // const [classesList, setClassesList]=useState([
// //   {
// //       id: '1',
// //       title: 'Graphic Design Class',
// //       price:949,
// //       desc:['Get 2x deeper dust removal with unique foam je technology', 'Recommended for ACs serviced more than 6 months ago'],
// //       distance:'3 kms away',
// //       img:require('../../../assets/images/service-product-image.png'),
// //   },
// //   {
// //       id: '2',
// //       title: 'Graphic Design Class',
// //       price:949,
// //       desc:['Get 2x deeper dust removal with unique foam je technology', 'Recommended for ACs serviced more than 6 months ago'],
// //       distance:'3 kms away',
// //       img:require('../../../assets/images/service-product-image.png'),
// //   },
// //   {
// //       id: '3',
// //       title: 'Graphic Design Class',
// //       price:949,
// //       desc:['Get 2x deeper dust removal with unique foam je technology', 'Recommended for ACs serviced more than 6 months ago'],
// //       distance:'3 kms away',
// //       img:require('../../../assets/images/service-product-image.png'),
// //   },
// // ])
// //   const [aroundTheWorldData, setAroundTheWorldData]=useState([
// //     {
// //       id: '1',
// //       name: 'Leslie Alexander',
// //       desc:'',
// //       time:'14 hours ago',
// //       img:require('../../../assets/images/fashion-around-the-world-image.png'),
// //       likes: '4k',
// //       dislikes: '1k',
// //     },
// //     {
// //       id: '2',
// //       name: 'Leslie Alexander',
// //       desc:'',
// //       time:'14 hours ago',
// //       img:require('../../../assets/images/fashion-around-the-world-image.png'),
// //       likes: '4k',
// //       dislikes: '1k',
// //     },
// //     {
// //       id: '3',
// //       name: 'Leslie Alexander',
// //       desc:'',
// //       time:'14 hours ago',
// //       img:require('../../../assets/images/fashion-around-the-world-image.png'),
// //       likes: '4k',
// //       dislikes: '1k',
// //     },
// //   ])
// //   const [courseData, setCourseData]=useState([
// //     {
// //       id: '1',
// //       title: 'Celebrity Style',
// //       desc:'',
// //       time:'',
// //       img:require('../../../assets/images/fashion-celebrity-style.png'),
// //     },
// //     {
// //       id: '2',
// //       title: 'Street Style',
// //       desc:'',
// //       time:'',
// //       img:require('../../../assets/images/fashion-celebrity-style.png'),
// //     },
// //     {
// //       id: '3',
// //       title: 'Models',
// //       desc:'',
// //       time:'',
// //       img:require('../../../assets/images/fashion-celebrity-style.png'),
// //     },
// //   ])
// //   const [upData,setupData]=useState([
// //     {
// //       id: '1',
// //       catId: '1',
// //       title: 'Intel 3rd Gen Motherboard',
// //       desc:'',
// //       price:'$140.00',
// //       time:'',
// //       img:require('../../../assets/images/intel_motherboard.png'),
// //     },
// //     {
// //       id: '2',
// //       catId: '2',
// //       title: 'Intel 3rd Gen Motherboard',
// //       desc:'',
// //       price:'$140.00',
// //       time:'',
// //       img:require('../../../assets/images/intel_motherboard.png'),
// //     },
// //     {
// //       id: '3',
// //       catId: '3',
// //       title: 'Intel 3rd Gen Motherboard',
// //       desc:'',
// //       price:'$140.00',
// //       time:'',
// //       img:require('../../../assets/images/intel_motherboard.png'),
// //     },
// //     {
// //       id: '4',
// //       catId: '4',
// //       title: 'Intel 3rd Gen Motherboard',
// //       desc:'',
// //       price:'$140.00',
// //       time:'',
// //       img:require('../../../assets/images/intel_motherboard.png'),
// //     },
// //     {
// //       id: '5',
// //       catId: '1',
// //       title: 'Intel 3rd Gen Motherboard',
// //       desc:'',
// //       price:'$140.00',
// //       time:'',
// //       img:require('../../../assets/images/intel_motherboard.png'),
// //     },
// //     {
// //       id: '6',
// //       catId: '2',
// //       title: 'Intel 3rd Gen Motherboard',
// //       desc:'',
// //       price:'$140.00',
// //       time:'',
// //       img:require('../../../assets/images/intel_motherboard.png'),
// //     },
// //     {
// //       id: '7',
// //       catId: '3',
// //       title: 'Intel 3rd Gen Motherboard',
// //       desc:'',
// //       price:'$140.00',
// //       time:'',
// //       img:require('../../../assets/images/intel_motherboard.png'),
// //     },
// //   ])
// //   const multiSliderValuesChange = (values) => {setMultiSliderValue(values)}
// //   useEffect(()=>{

// //  },[])

// //  const _renderItem = ({ item }) => {
// //   return (
// //       <Image source={{uri: item.image}} style={{width:'100%',height:170, borderRadius:20, alignSelf:'center'}}/>
// //     // <View key={item.key} style={styles.slide}>
// //     //   <Text style={styles.title}>{item.title}</Text>
// //     //   <Text style={styles.text}>{item.text}</Text>
// //     // </View>
// //   );
// // }

// //   return(
// //     <SafeAreaView scrollEnabled={scrollEnabled} style={{height:'100%', backgroundColor: '#F8F8F8'}}>
// //       <ScrollView>
// //       <HomeHeaderRoundBottom height={100} extraStyle={{paddingtop:10, paddingBottom:25}}  paddingHorizontal={15} borderBottomLeftRadius={20} borderBottomRightRadius={20} backgroundColor='#0089CF'
// //    press1={()=>{props.navigation.goBack()}} img1={require('../../../assets/images/service-header-back-button.png')} img1width={25} img1height={18}
// //    press2={()=>{}} title2={'Fashion'} fontWeight={'500'} img2height={20} color={'#fff'}
// //    press3={()=>{}} img3={require('../../../assets/images/fashion-bell-icon.png')} img3width={25} img3height={22} />

// // <View style={{width:'85%',alignSelf:'center'}}>
// // <View style={{top:-20}}>
// //     <FashionSearch marginTop={0} placeholder={'Search here'}
// //     serchValue={searchValue}
// //     searchIcon={require('../../../assets/images/fashion-search-icon.png')}
// //     onChangeText={(e)=>{setsearchValue(e)}}
// //     press={()=>{Alert.alert('Hi')}}
// //     presssearch={()=>{Alert.alert('Search Pressed')}}
// //     paddingLeft={20}/>
// // </View>

// // <View style={{width:dimensions.SCREEN_WIDTH*0.9,alignSelf:'flex-start',marginTop:0, marginBottom:10, marginTop:10}}>
// //           <FlatList
// //                   data={courseData}
// //                   showsHorizontalScrollIndicator={true}
// //                   horizontal
// //                   renderItem={({item,index})=>{
// //                     return(

// //           <TouchableOpacity style={{width:dimensions.SCREEN_WIDTH/2.8,height:160,marginRight:15, borderRadius:10,overflow:'hidden',position: 'relative', alignItems:'center', borderRadius:15, paddingHorizontal:10}}
// //           onPress={()=>{}}>
// //           <Image source={item.img} style={{width:dimensions.SCREEN_WIDTH/2.8,height:160}} resizeMode='contain'></Image>
// //           <LinearGradient
// //           colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.43)']}
// //           style={{position: 'absolute',top: 0,bottom: 0,left: 0,right: 0,zIndex: 1, }}
// //          >
// //             <View style={{flex: 1,flexDirection: 'column',justifyContent: 'flex-end',alignItems: 'center',}}>
// //               <Text style={{fontSize:14,fontWeight:'500',color:'#fff',bottom:20}}>{item.title}</Text>
// //             </View>
// //          </LinearGradient>
// //           </TouchableOpacity>
// //                     )
// //                   }}
// //                   keyExtractor={item => item.id}
// //                 />
// //          </View>

// //          <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between', marginTop:20, marginBottom:10}}>
// //    <Text style={{fontSize:16,fontWeight:'500',color:'#263238'}}>Around the world</Text>
// //    <TouchableOpacity onPress={()=>{}}>
// //      <Text style={{fontSize:13,fontWeight:'400',color:'#0089CF'}}>View all</Text>
// //    </TouchableOpacity>
// // </View>

// // <View style={{width:dimensions.SCREEN_WIDTH*0.9,alignSelf:'flex-start', marginTop:10}}>
// //           <FlatList
// //                   data={aroundTheWorldData}
// //                   showsHorizontalScrollIndicator={true}
// //                   horizontal
// //                   renderItem={({item,index})=>{
// //                     return(

// //           <View style={{width:dimensions.SCREEN_WIDTH/1.5,marginRight:15}}
// //           onPress={()=>{}}>
// //           <TouchableOpacity onPress={()=>{props.navigation.navigate('FashionPost')}}>
// //             <Image source={item.img} style={{width:dimensions.SCREEN_WIDTH/1.5,height:160, borderRadius:4}}></Image>
// //           </TouchableOpacity>

// //           <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between', marginVertical:10}}>
// //             <View style={{flexDirection:'row', alignItems:'center'}}>
// //               <Image source={require('../../../assets/images/dating-home-header-left-image.png')} style={{height:40, width:40, borderRadius:20}}  />
// //               <Text style={{fontSize:12,fontWeight:'400',color:'#000', marginLeft:10,}}>{item.name}</Text>
// //             </View>
// //               <Text style={{fontSize:12,fontWeight:'400',color:'#B2B7B9'}}>{item.time}</Text>
// //           </View>

// //           <ViewMoreText
// //             numberOfLines={3}
// //             renderViewMore={(onPress)=>{
// //               return(
// //                 <Text onPress={onPress} style={{fontSize:14,color:'#0089CF',textDecorationLine: "underline"}}>View more</Text>
// //               )
// //             }}
// //             renderViewLess={(onPress)=>{
// //               return(
// //                 <Text onPress={onPress} style={{fontSize:14,color:'#0089CF',textDecorationLine: "underline"}}>View less</Text>
// //               )
// //             }}
// //             textStyle={{textAlign: 'left',width:'95%'}}
// //           >
// //             <Text style={{fontSize:14,fontWeight:'400', color:'#455A64'}}>
// //             In publishing and graphic design, Lorem ipsum is a place-
// //             holder text commonly used to demonstrate the visual form
// //             of a document or a typeface without relying on meaningful
// //             of a document or a typeface without relying on meaningful
// //             content.
// //             </Text>
// //           </ViewMoreText>

// //           <View style={styles.buttonsRow}>
// //             <TouchableOpacity style={styles.buttonView}>
// //               <Image source={require('../../../assets/images/fashion-like-button.png')} style={{height:20, width:20}} />
// //               <Text style={styles.buttonText}>{item.likes}</Text>
// //             </TouchableOpacity>
// //             <TouchableOpacity style={styles.buttonView}>
// //               <Image source={require('../../../assets/images/fashion-dislike-button.png')} style={{height:20, width:20}} />
// //               <Text style={styles.buttonText}>{item.dislikes}</Text>
// //             </TouchableOpacity>
// //             <TouchableOpacity style={styles.buttonView}>
// //               <Image source={require('../../../assets/images/fashion-share-button.png')} style={{height:20, width:20}} />
// //               <Text style={styles.buttonText}>Share</Text>
// //             </TouchableOpacity>
// //             <TouchableOpacity onPress={()=>{setShowReportModal(true)}} style={styles.buttonView}>
// //               <Image source={require('../../../assets/images/fashion-report-button.png')} style={{height:20, width:20}} />
// //               <Text style={styles.buttonText}>Report</Text>
// //             </TouchableOpacity>
// //           </View>

// //           </View>
// //                     )
// //                   }}
// //                   keyExtractor={item => item.id}
// //                 />
// //          </View>

// // <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between', marginBottom:10, marginTop:35}}>
// //    <Text style={{fontSize:16,fontWeight:'500',color:'#263238'}}>Recommended for you</Text>
// //    <TouchableOpacity onPress={()=>{}}>
// //      <Text style={{fontSize:13,fontWeight:'400',color:'#0089CF'}}>View all</Text>
// //    </TouchableOpacity>
// // </View>

// // <View style={{width:dimensions.SCREEN_WIDTH*0.9,alignSelf:'flex-start',marginTop:0, marginBottom:10, marginTop:10}}>
// //           <FlatList
// //                   data={aroundTheWorldData}
// //                   showsHorizontalScrollIndicator={true}
// //                   horizontal
// //                   renderItem={({item,index})=>{
// //                     return(

// //           <View style={{width:dimensions.SCREEN_WIDTH/1.5,height:160,marginRight:15}}
// //           onPress={()=>{}}>
// //           <Image source={item.img} style={{width:dimensions.SCREEN_WIDTH/1.5,height:160, borderRadius:4}}></Image>

// //           </View>
// //                     )
// //                   }}
// //                   keyExtractor={item => item.id}
// //                 />
// //          </View>


// //   <View style={{height:10}}/>


// //  </View>
// // <View style={{height:100}} />
// // </ScrollView>
// // {/* <TouchableOpacity onPress={()=>props.navigation.navigate('ShopProdCart')} style={{width:'80%',height:60,flexDirection:'row',justifyContent:'flex-end',position:'absolute',bottom:40, right:20, shadowColor: '#FFD037', shadowOffset: {width: 0,height: 3},shadowRadius: 1,shadowOpacity: 0.1,elevation: 5}}> */}
// // <TouchableOpacity onPress={()=>{props.navigation.navigate('FashionUpload')}} style={{bottom:60,right:20,position:'absolute',alignSelf:'flex-end',width:80, height:80, borderRadius:80/2, backgroundColor:'#0089CF', justifyContent:'center', alignItems:'center', shadowColor: '#FFD037', shadowOffset: {width: 0,height: 3},shadowRadius: 1,shadowOpacity: 0.1,elevation: 5}}>
// //   <Image source={require('../../../assets/images/fashion-upload-icon.png')} style={{width:40,height:40 }}/>
// // </TouchableOpacity>
// // {/* </TouchableOpacity> */}
// // {loading ? <Loader /> : null}
// // <Modal
// //         isVisible={showReportModal}
// //         swipeDirection="down"
// //         onBackdropPress={()=>setShowReportModal(false)}
// //         onSwipeComplete={(e) => {
// //           setShowReportModal(false)
// //         }}
// //           scrollTo={() => {}}
// //           scrollOffset={1}
// //           propagateSwipe={true}
// //         coverScreen={false}
// //         backdropColor='transparent'
// //         style={{ justifyContent: 'flex-end', margin: 0, backgroundColor: 'rgba(0,0,0,0.5)' }}
// //       >
// //         <View style={{ height: '90%', backgroundColor: '#fff', borderTopLeftRadius: 30, borderTopRightRadius: 30 }}>
// //           <Text style={{fontSize:18, fontWeight:'700', color:'#455A64',textAlign:'center',marginBottom:20, marginTop:30}}>Report</Text>
// //           <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled={true}>

// //             <FlatList
// //               data={reportReasonData}
// //               showsHorizontalScrollIndicator={false}
// //               numColumns={1}
// //               keyExtractor={item => item.id}
// //               style={{marginBottom:10}}
// //               renderItem={({item,index})=>{
// //                 return(
// //                   <TouchableOpacity key={item.id} onPress={()=>setSelectedReasonId(item.id)} style={selectedReasonId === item.id ? styles.selectedReasonView : styles.reasonView}>
// //                     <Image source={selectedReasonId === item.id ? require('../../../assets/images/fastion-selected-reason-icon.png') :require('../../../assets/images/fastion-reason-icon.png')} />
// //                     <View style={{marginLeft:10}}>
// //                       <Text style={{fontSize:14, lineHeight:14, fontWeight:'400', color:'#455A64'}}>{item.name}</Text>
// //                       {item.description ?
// //                       <Text style={{fontSize:12, lineHeight:12, fontWeight:'400', color:'#C5C6C9', marginTop:2}}>{item.description}</Text>
// //                       :null}
// //                     </View>
// //                   </TouchableOpacity>
// //                   )
// //                 }}
// //               />

// //             <TouchableOpacity style={styles.reportButtonView}>
// //               <Text style={{fontSize:15, fontWeight:'500', color:'#fff',}}>Report</Text>
// //             </TouchableOpacity>

// //             </ScrollView>

// //             </View>
// // </Modal>
// //     </SafeAreaView>
// //      );
// //   }
// // const styles = StyleSheet.create({
// //   unselectedTabText:{
// //     fontSize:14,
// //     fontWeight:'500',
// //     color: '#263238'
// //   },
// //   requestCallView:{
// //     marginTop:10,
// //     width:140,
// //     height:30,
// //     borderRadius:15,
// //     backgroundColor:'#29913C',
// //     alignItems:'center',
// //     justifyContent:'center',
// //     shadowColor:'#6D2F91',
// //     shadowOffset: {width:3,height:3},
// //     shadowRadius: 5,
// //     shadowOpacity: 0.17,
// //     elevation: 2
// //   },
// //   VideoThumbWrapper: {
// //     position: 'relative',
// //     // width: '48%',
// //     // marginRight: 8,
// //     marginBottom: 4,

// //     width:dimensions.SCREEN_WIDTH/1.5,
// //     height:160,
// //     marginRight: 20,
// //     borderRadius:15,
// //     // shadowColor:'#000',
// //     // shadowOffset: {width: 0,height: 3},
// //     // shadowRadius: 1,
// //     // shadowOpacity: 0.03,
// //     // elevation: 1,
// //   },
// //   PlayIconContainer: {
// //     position: 'absolute',
// //     top: 0,
// //     bottom: 0,
// //     left: 0,
// //     right: 0,
// //     zIndex: 1,
// //   },
// //   PlayIconWrapper: {
// //     flex: 1,
// //     flexDirection: 'column',
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //   },
// //   BackGroundImage: {
// //     width: '100%',
// //     height: 160,
// //     justifyContent: 'center',
// //     borderRadius:15
// //   },
// //   buttonsRow:{
// //     flexDirection:'row',
// //     justifyContent:'space-between',
// //     alignItems:'center',
// //     marginTop:20
// //   },
// //   buttonView:{
// //     flexDirection:'row',
// //     alignItems:'center'
// //   },
// //   buttonText:{
// //     fontSize:10,
// //     fontWeight:'500',
// //     color:'#8F93A0',
// //     marginLeft:5
// //   },
// //   reasonView:{
// //     alignSelf:'center',
// //     flexDirection:'row',
// //     alignItems:'center',
// //     backgroundColor:'#fff',
// //     marginBottom:15,
// //     // paddingVertical:10,
// //     paddingHorizontal:10,
// //     width:'90%',
// //     height:60,
// //   },
// //   selectedReasonView:{
// //     alignSelf:'center',
// //     flexDirection:'row',
// //     alignItems:'center',
// //     backgroundColor:'#fff',
// //     marginBottom:15,
// //     // paddingVertical:10,
// //     paddingHorizontal:10,
// //     width:'90%',
// //     height:60,
// //     borderColor:'#E7F7FF',
// //     borderWidth:1,
// //     shadowColor:'#455A64',
// //     shadowOffset: {width:3,height:3},
// //     shadowRadius: 5,
// //     shadowOpacity: 0.10,
// //     elevation: 1
// //   },
// //   reportButtonView:{
// //     height:60,
// //     width:'90%',
// //     alignSelf:'center',
// //     backgroundColor:'#0089CF',
// //     alignItems:'center',
// //     justifyContent:'center',
// //     borderRadius:5,
// //     marginBottom:30,
// //     shadowColor:'#000',
// //     shadowOffset: {width:3,height:3},
// //     shadowRadius: 5,
// //     shadowOpacity: 0.10,
// //     elevation: 2
// //   }
// // });
// // export default FashionHome

// import React, { useEffect, useState, useRef } from 'react';
// import { View, Image, Text, StyleSheet, SafeAreaView, TextInput, FlatList, Alert, TouchableOpacity, ScrollView, ImageBackground, ActivityIndicator } from 'react-native';
// import HomeHeaderRoundBottom from './components/HomeHeaderRoundBottom';
// import SearchInput2 from '../../../component/SearchInput2';
// import SearchInputEnt from '../../../component/SearchInputEnt';
// import FashionSearch from './components/FashionSearch';
// import SerchInput from '../../../component/SerchInput';
// import { dimensions, Mycolors } from '../../../utility/Mycolors';
// import messaging from '@react-native-firebase/messaging';
// import { useSelector, useDispatch } from 'react-redux';
// import Loader from '../../../WebApi/Loader';
// import { baseUrl, shop_eat_cart, user_payment_method, shop_eat_orders, shop_eat_cart_book_dining, shop_eat_cart_book_table, shop_eat_cart_id, shop_eat_business_id, shop_eat_menu_userid, requestPostApi, requestGetApi, shop_eat, connect_people_create_post, connect_people_newPost, art_getCollection, requestPostApiMedia, art_PostCollection, postApiWithToken2, art_HomePage, art_likeDislike, post_suggestion, get_suggestion, get_reportSuggestion, post_reportSuggestion, creation_home, creation_categories, creation_react, creation_get_report, creation_post_report, creation_addView, creation_getView, creation_addComments, creation_getNotifications, creation_startup, creation_Fashion } from '../../../WebApi/Service'
// import { setcookingnotificationcount } from '../../../redux/actions/user_action';
// import LinearGradient from 'react-native-linear-gradient'
// import { ImageSlider, ImageCarousel } from "react-native-image-slider-banner";
// import MyButtons from '../../../component/MyButtons';
// import MultiSlider from '@ptomasroos/react-native-multi-slider';
// import Modal from 'react-native-modal';
// import Toast from 'react-native-toast-message';

// import AppIntroSlider from 'react-native-app-intro-slider';
// import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
// import { createThumbnail } from "react-native-create-thumbnail";
// import ViewMoreText from 'react-native-view-more-text';
// import VideoPlayer from 'react-native-video-player'
// import PostModal from './components/PostModal';
// import ArtSearch from './components/ArtSearch'
// import Video from 'react-native-video';
// import { log } from 'react-native-reanimated';
// import { VideoModel } from '../../../component/VideoModel';

// const FashionHome = (props) => {
//   const scrollViewRef = useRef();
//   const dispatch = useDispatch();

//   const User = useSelector(state => state.user.user_details)
//   console.log(User, 'my user');
//   const chatindictor = useSelector(state => state.user.cooking_counter);

//   const player = useRef(null);
//   const [searchValue, setsearchValue] = useState('')
//   const [scrollEnabled, setScrollEnabled] = useState(false)
//   const myTextInput = useRef()
//   const [multiSliderValue, setMultiSliderValue] = useState([0, 100])
//   const [showChooseMilesModal, setShowChooseMilesModal] = useState(false)
//   const [showModalVideo, setShowModalVideo] = useState({ isVisible: false, data: null })
//   const [selectedCategory, setSelectedCategory] = useState('1')
//   const [loading, setLoading] = useState(false)
//   const [loading2, setLoading2] = useState(false)
//   const [loading3, setLoading3] = useState(false)
//   const [showPostsModal, setShowPostsModal] = useState(false)
//   const [showModal, setShowModal] = useState({ isVisible: false, data: null });
//   const [showVideoModal, setShowVideoModal] = useState(false)
//   const [selectedVideo, setSelectedVideo] = useState({})
//   const [showReportModal, setShowReportModal] = useState(false)
//   const [selectedReasonId, setSelectedReasonId] = useState(null)
//   const [showBottomLoader, setShowBottomLoader] = useState(false);
//   const [categoryData, setCategorydata] = useState([])
//   const [isLiked, setIsLiked] = useState(false);
//   const [latestRecords, setLatestRecords] = useState([]);
//   const [getSuggested, setGetSuggested] = useState('')
//   const [categories, setCategories] = useState('')
//   const [profileModal, setProfileModal] = useState('')
//   const [reportGet, setReportGet] = useState('')
//   const [myArticle, setMyArticle] = useState('')
//   const [page, setPage] = useState(1);
//   const [thumb, setThumb] = useState('')
//   const [selectedID, setSelectedID] = useState('')
//   const [startFromIndex, setStartFromIndex] = useState(0)
//   const [introSliderData] = useState([
//     // require('../../assets/Group75972.png'),
//     { key: 'one', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5a5uCP-n4teeW2SApcIqUrcQApev8ZVCJkA&usqp=CAU', title: 'Art-Aficionado Tim Newton on How to Collect Art', status: 'Fine Art', date: 'March 4, 2022' },
//     { key: 'two', image: 'https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg', title: 'Art-Aficionado Tim Newton on How to Collect Art', status: 'Fine Art', date: 'March 4, 2022' },
//     { key: 'three', image: 'https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510__340.jpg', title: 'Art-Aficionado Tim Newton on How to Collect Art', status: 'Fine Art', date: 'March 4, 2022' }
//   ])


//   messaging().onMessage(remoteMessage => {
//     const data = remoteMessage;
//     if (data && Object.keys(data).length !== 0) {
//       dispatch(setcookingnotificationcount(1));
//     } else {
//       null
//     }
//     // console.log('onMessage remoteMessage', remoteMessage);
//     // if (remoteMessage.notification.body === 'Order Delivered Successfully!') {
//     //   setalert_sms3('Do you want to rate order?');
//     //   setMy_Alert3(true);
//     //   setRemoteMessageData(remoteMessage.data);
//     // } else if (remoteMessage.notification.body === 'new message') {
//     //   // Handle new message scenario
//     //   // dispatch(setMessageCount(mapdata.messagecount + 1));
//     //   // props.navigation.navigate('ShopMyOrderDetails', { data: remoteMessage.data });
//     // }
//   });

//   messaging().onNotificationOpenedApp(remoteMessage => {

//     const data = remoteMessage;
//     console.log('when app is closed',);
//     if (data && Object.keys(data).length !== 0) {
//       dispatch(setcookingnotificationcount(1));
//     } else {
//       null
//     }
//   });

//   messaging()
//     .getInitialNotification()
//     .then(remoteMessage => {
//       const data = remoteMessage;
//       console.log('when app is clodee',);
//       if (data && Object.keys(data).length !== 0) {
//         dispatch(setcookingnotificationcount(1));
//       } else {
//         null
//       }
//     });

//   const getAllNotificationsList = async () => {
//     console.log('notification function called');
//     setLoading(true)

//     const { responseJson, err } = await requestGetApi(creation_getNotifications + 52, '', 'GET', User.token)
//     setLoading(false)
//     console.log('the res in_cart notification_list ==>>', responseJson)
//     if (responseJson.headers.success == 1) {
//       console.log('my data lenght', responseJson.body.data.length);

//       console.log('my notifications art home', responseJson.body.data.length != 0);
//       responseJson.body.data.length != 0 ? console.log('o is called') : console.log('1 is called');
//       const hasStatusZero = responseJson.body.data.some((item) => item.status === 0);
//       console.log('item for notification status', (hasStatusZero ? 0 : 1))
//       dispatch(setcookingnotificationcount(hasStatusZero ? 0 : 1));
//       // responseJson.body.data.length != 0 ? dispatch(setcookingnotificationcount(1)) : dispatch(setcookingnotificationcount(0))

//     } else {
//       setalert_sms(err)
//       setMy_Alert(true)
//     }
//   };


//   // messaging().onMessage(remoteMessage => {
//   //   const data = remoteMessage;
//   //   console.log('onMessage remoteMessage', remoteMessage);
//   //   // if (remoteMessage.notification.body === 'Order Delivered Successfully!') {
//   //   //   setalert_sms3('Do you want to rate order?');
//   //   //   setMy_Alert3(true);
//   //   //   setRemoteMessageData(remoteMessage.data);
//   //   // } else if (remoteMessage.notification.body === 'new message') {
//   //   //   // Handle new message scenario
//   //   //   // dispatch(setMessageCount(mapdata.messagecount + 1));
//   //   //   // props.navigation.navigate('ShopMyOrderDetails', { data: remoteMessage.data });
//   //   // }
//   // });

//   // messaging().onNotificationOpenedApp(remoteMessage => {
//   //   const data = remoteMessage.data;
//   //   console.log('Notification caused app to open from the background state:', remoteMessage);
//   //   // if (remoteMessage.notification.title === 'Kinengo') {
//   //   //   if (remoteMessage.notification.body === 'Order Delivered Successfully!') {
//   //   //     setalert_sms3('Do you want to rate order?');
//   //   //     setMy_Alert3(true);
//   //   //     setRemoteMessageData(remoteMessage.data);
//   //   //   } else {
//   //   //     props.navigation.navigate('ShopMyOrderDetails', { data: remoteMessage.data });
//   //   //   }
//   //   // } else if (remoteMessage.notification.body === 'new message') {
//   //   //   props.navigation.navigate('ShopMyOrderDetails', { data: remoteMessage.data });
//   //   //   dispatch(setMessageCount(mapdata.messagecount + 1));
//   //   // }
//   // });

//   // messaging()
//   //   .getInitialNotification()
//   //   .then(remoteMessage => {
//   //     console.log('====================================');
//   //     console.log(remoteMessage, 'my message after notification');
//   //     console.log('====================================');
//   //     // if (remoteMessage.notification.title === 'Kinengo') {
//   //     //   if (remoteMessage.notification.body === 'Order Delivered Successfully!') {
//   //     //     setalert_sms3('Do you want to rate order?');
//   //     //     setMy_Alert3(true);
//   //     //     setRemoteMessageData(remoteMessage.data);
//   //     //   } else {
//   //     //     props.navigation.navigate('ShopMyOrderDetails', { data: remoteMessage.data });
//   //     //   }
//   //     // } else if (remoteMessage.notification.body === 'new message') {
//   //     //   dispatch(setMessageCount(mapdata.messagecount + 1));
//   //     //   props.navigation.navigate('ShopMyOrderDetails', { data: remoteMessage.data });
//   //     // }
//   //   });

//   const multiSliderValuesChange = (values) => { setMultiSliderValue(values) }
//   // useEffect(() => {
//   //   ArtCategory()
//   //   Categories()
//   //   // generateThumb()
//   // }, [])
//   React.useEffect(() => {
//     const unsubscribe = props.navigation.addListener('focus', () => {
//       // The screen is focused
//       // Call any action

//       ArtCategory()
//       Categories()
//       getSuggestion()
//       getReport()
//       getAllNotificationsList()
//       // console.log('my user id of state----->', userID);
//     });
//     // Return the function to unsubscribe from the event so it gets removed on unmount
//     return unsubscribe;
//   }, [props, page]);


//   useEffect(() => {
//     // Function to handle notifications received while the app is in the foreground
//     const onNotificationReceived = async (remoteMessage) => {
//       console.log('Notification received while the app is in the foreground:', remoteMessage);
//       // Update the Redux state based on the received notification
//       // You can extract the necessary data from remoteMessage and dispatch the actions accordingly
//       if (remoteMessage && Object.keys(remoteMessage).length !== 0) {
//         dispatch(setcookingnotificationcount(1)); // Assuming "setcookingnotificationcount" is your action creator
//       }
//     };

//     // Set up the event listener for handling notifications received while the app is in the foreground
//     const unsubscribeForeground = messaging().onMessage(onNotificationReceived);

//     // Function to check if the app was opened by tapping on a notification
//     const checkInitialNotification = async () => {
//       try {
//         const remoteMessage = await messaging().getInitialNotification();
//         if (remoteMessage) {
//           console.log('App opened by tapping on a notification:', remoteMessage);
//           // Handle the notification data as needed
//           // Update the Redux state based on the received notification
//           // You can extract the necessary data from remoteMessage and dispatch the actions accordingly
//           if (remoteMessage && Object.keys(remoteMessage).length !== 0) {
//             dispatch(setcookingnotificationcount(1)); // Assuming "setcookingnotificationcount" is your action creator
//           }
//         } else {
//           console.log('App not opened by a notification.');
//         }
//       } catch (error) {
//         console.error('Error retrieving initial notification:', error);
//       }
//     };

//     // Request permission for receiving notifications
//     const requestUserPermission = async () => {
//       // ... (your existing permission request code)
//     };

//     // Clean up the event listeners when the component unmounts
//     return () => {
//       unsubscribeForeground();
//     };
//   }, [dispatch]);

//   const scrollToTop = () => {
//     scrollRef?.current?.scrollToOffset({ animated: true, offset: 0 });
//   };

//   const Likepost = async (id) => {
//     console.log('my post is liked or not', id);
//     setLoading(true)
//     var data = {
//       object_id: id,
//       object_type: 'article',
//       reaction_type: "like"
//     }
//     const { responseJson, err } = await requestPostApi(creation_react + 57, data, 'POST', User.token)
//     setLoading(false)
//     if (responseJson.headers.success == 1) {
//       // console.log('the res like of comments==>>', responseJson, User.token)
//       // ArtCategory()
//       // GetComments()
//       console.log('like is need to be called');
//       ArtCategory()
//       //Toast.show({ text1: responseJson.headers.message });
//     } else {

//       setalert_sms(err)
//       setMy_Alert(true)
//     }
//   }

//   const Dislikepost = async (id) => {
//     console.log('my post is liked or not', id);
//     setLoading(true)
//     var data = {
//       object_id: id,
//       object_type: 'article',
//       reaction_type: "dislike"
//     }
//     const { responseJson, err } = await requestPostApi(creation_react + 57, data, 'POST', User.token)
//     setLoading(false)
//     if (responseJson.headers.success == 1) {
//       // console.log('the res like of comments==>>', responseJson, User.token)
//       // ArtCategory()
//       // GetComments()
//       console.log('dislike is need to be called');
//       ArtCategory()
//       GetComments()
//       //Toast.show({ text1: responseJson.headers.message });
//     } else {

//       setalert_sms(err)
//       setMy_Alert(true)
//     }
//   }
//   const _renderItem = ({ item }) => {
//     console.log('item', item);
//     // let videoUrl = null; // Declare and initialize the videoUrl variable
//     // console.log('item of home sugggggg', item);
//     return (
//       <>
//         <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'center', }}>
//           {item.type === 'video' ?
//             <TouchableOpacity style={{ width: '100%', height: 227, borderRadius: 10, alignSelf: 'center', resizeMode: 'cover' }}
//               onPress={() => {
//                 //   setShowModal({
//                 //     isVisible: true,
//                 //     data: item.files[0],
//                 //   }), setSelectedID(item.id)
//                 // }}
//                 { props.navigation.navigate('FashionPost', { id: item.id }) }
//               }}
//             >

//               <ImageBackground source={{ uri: item.thumb.path }} style={{
//                 width: '100%', height: 227, alignSelf: 'center', justifyContent: 'center', borderRadius: 10,
//                 overflow: 'hidden',
//               }} resizeMode='cover' >
//                 <Image source={require('../../../assets/images/people-play-button.png')} style={{ width: '20%', height: '20%', alignSelf: 'center', }} resizeMode='contain' ></Image>
//               </ImageBackground>
//             </TouchableOpacity>
//             :
//             <TouchableOpacity onPress={() => { props.navigation.navigate('FashionPost', { id: item.id }) }} style={{ width: '100%', height: 227, alignSelf: 'center', borderRadius: 10 }}>
//               <Image source={{
//                 uri:

//                   item.cover_photo
//               }} style={{ width: '100%', height: '100%', borderRadius: 10, }} />
//             </TouchableOpacity>}
//           {/* <LinearGradient
//             colors={['#29913C', 'transparent']}
//             style={{
//               height: 75, width: '100%', paddingHorizontal: 15,
//               justifyContent: 'center', position: 'absolute', bottom: 0, overflow: 'hidden',
//             }}
//             start={{ x: 0.2, y: 0 }}
//             end={{ x: 1, y: 0 }}
//           > */}
//           <View
//             style={{
//               height: 75, width: '100%', paddingHorizontal: 15,
//               justifyContent: 'center', position: 'absolute', bottom: 0, overflow: 'hidden',
//               backgroundColor: 'rgba(0, 137, 207, 0.5)', borderBottomLeftRadius: 10, borderBottomRightRadius: 10
//             }}

//           >

//             <Text numberOfLines={1} style={{ color: 'white', fontSize: 16, fontWeight: '400', width: '100%', alignSelf: 'center', lineHeight: 30 }}>{item.headline
//             }</Text>
//             <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', }}>
//               <Text style={{ color: 'white', fontWeight: '400', fontSize: 14, marginTop: 3, width: '65%' }}>
//                 Category:
//                 &nbsp;{item.category}
//               </Text>
//               <View style={{ width: '30%' }}>
//                 <Text style={{ color: 'white', fontWeight: '400', fontSize: 12, marginTop: 3, textAlign: 'right' }}>
//                   {item.created_date.slice(0, 11)}

//                 </Text>
//               </View>
//             </View>
//           </View>
//           {/* </LinearGradient> */}
//         </View >
//       </>
//     );
//   }
//   const renderPagination = (activeIndex) => {
//     return (
//       <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
//         {introSliderData.map((_, index) => (
//           <View
//             key={index}
//             style={{
//               backgroundColor: activeIndex === index ? '#0089CF' : '#D9D9D9',
//               height: 9,
//               width: 9,
//               borderRadius: 30,
//               marginHorizontal: 5,
//             }}
//           />
//         ))}
//       </View>
//     );
//   };

//   const ArtCategory = async (getnwPage = false) => {
//     console.log('my art is called');
//     console.log('Current page:', page); // Add a debug log for the current page
//     setLoading(true);

//     // Calculate the new page value based on the getnwPage parameter
//     const newpage = getnwPage ? page + 1 : 1;
//     console.log('my new getnewpage', newpage);

//     // Update the fUrl with the new page value
//     var fUrl = creation_Fashion + `?page_no=${newpage}&limit=10`;

//     try {
//       // Make the API request to fetch data
//       const { responseJson } = await requestGetApi(fUrl, '', 'GET', User.token);
//       setLoading(false);
//       console.log('responseJson.body.articles', responseJson.body.articles);

//       if (responseJson.headers.success == 1) {
//         if (!getnwPage) {
//           console.log('for data 10', responseJson.body.articles, newpage);
//           generateThumb(responseJson.body.articles);
//         } else {
//           console.log('for data 4', responseJson.body.articles, newpage);

//           // Check if responseJson.body.articles is not undefined or empty before updating the page state
//           if (responseJson.body.articles && responseJson.body.articles.length > 0) {
//             generateThumb([...categoryData, ...responseJson.body.articles]);
//             setPage(newpage);
//           }
//         }

//         const latestRecordsArray = responseJson.body.articles.slice(0, 3);
//         setLatestRecords(latestRecordsArray);
//       } else {
//         setalert_sms(err);
//         setMy_Alert(true);
//       }
//     } catch (error) {
//       console.error('Error occurred during fetching data:', error);
//       setLoading(false);
//     }
//   };


//   const generateThumb = async (item) => {
//     setLoading2(true);

//     try {
//       const allData = await Promise.all(
//         item.map?.(async (el) => {
//           if (!el.files) {
//             return { ...el, type: "none" };
//           } else if (el.files.find((js) => js.post_type == "Image")) {
//             return {
//               ...el,
//               type: "image",
//             };
//           } else {
//             const thumb = await createThumbnail({
//               url: el.files[0].file_url,
//               timeStamp: 1000,
//             });
//             return {
//               ...el,
//               thumb,
//               type: "video",
//             };
//           }
//         })
//       );

//       const data = allData;
//       setCategorydata(data);
//     } catch (error) {
//       console.error("Error generating thumbnails:", error);
//     } finally {
//       setLoading2(false);
//     }
//   };



//   const generateThum = async (item) => {
//     // console.log('my thum for suggested', item);
//     setLoading3(true)
//     // const videos = item.filter(el => {
//     //   if (!el.files) {
//     //     return false
//     //   } else {
//     //     if (el.files.find(js => js.post_type == 'Video')) {
//     //       return true
//     //     } else {
//     //       return false
//     //     }
//     //   }
//     // })

//     const allData = await Promise.all(
//       item.map?.(async (el) => {
//         if (!el.files) {
//           return { ...el, type: "none" };
//         }
//         else if (el.files.find((js) => js.post_type == "Image")) {
//           return {
//             ...el,
//             type: "image",
//           };
//         } else {
//           // console.log("createThumbnail will be called for suggested post  ", el.files[0].file_url);
//           const thumb = await createThumbnail({
//             url: el.files[0].file_url,
//             timeStamp: 1000, // Specify the time position for the thumbnail (in milliseconds)
//           });
//           // console.log('out of thumb function');
//           return {
//             ...el,
//             thumb,
//             type: "video",
//           };
//         }
//       })

//     );


//     // console.log("allDatafor suggeste drecom", allData);
//     const data = allData
//     // console.log(data, 'data111 uuuuu');
//     setGetSuggested(data)

//     setLoading3(false)
//   };



//   const Categories = async () => {
//     setLoading(true)
//     var fUrl = creation_categories
//     var urls = '?module_id=' + '52'
//     //  console.log('my url---------->', urls)
//     if (urls != undefined) {
//       fUrl = fUrl + urls
//     }
//     // console.log("LIKE CLICK:::",isSaved);
//     const { responseJson, err } = await requestGetApi(fUrl, '', 'GET', User.token)
//     setLoading(false)
//     // console.log('response afer click of items', responseJson)
//     if (responseJson.headers.success == 1) {
//       console.log('the res after sucess of category', responseJson.body.data)
//       setCategories(responseJson.body.data)

//       // Toast.show({ text1: responseJson.headers.message });
//     } else {

//       setalert_sms(err)
//       setMy_Alert(true)
//     }
//   }

//   /////post suggested hit
//   const postsuugestion = async (items) => {
//     // console.log('kkkkk for post suggestion', items);


//     setLoading(true)

//     var fUrl = creation_addView
//     var urls = items
//     // console.log('my url---------->', urls)
//     if (urls != undefined) {
//       fUrl = fUrl + urls
//     }
//     // console.log('my url post', fUrl)
//     var data = {
//       "object_type": "article",
//       "object_id": 57
//     }
//     // console.log('====================================');
//     // console.log(data, 'my data of post');
//     // console.log('====================================');
//     const { responseJson, err } = await requestPostApi(fUrl, data, 'POST', User.token)
//     setLoading(false)
//     // console.log('Post suggestion of cooking', responseJson)
//     // setIsLiked(!isLiked);
//     if (responseJson.headers.success == 1) {
//       //ArtCategory()
//       // Toast.show({ text1: responseJson.headers.message });
//     } else {
//       // console.log(responseJson.headers.message, errmshhh);
//       setalert_sms(err)
//       setMy_Alert(true)
//     }
//   }

//   const getSuggestion = async () => {
//     setLoading(true)
//     var fUrl = creation_getView
//     var urls = 57
//     // console.log('my url---------->', urls)
//     if (urls != undefined) {
//       fUrl = fUrl + urls
//     }
//     // console.log(' get suggestion url', fUrl)

//     // console.log('my url---------->', fUrl)

//     const { responseJson, err } = await requestGetApi(fUrl, '', 'GET', User.token)
//     setLoading(false)
//     // console.log('the res of suggested cooking post', responseJson)
//     if (responseJson.headers.success == 1) {
//       // console.log('the res after sucess of post suggested1111', responseJson.body.data)
//       //setGetSuggested(responseJson.body)
//       generateThum(responseJson.body.data)
//       // setCategorydata(responseJson.body.articles)
//       // generateThumb(responseJson.body.articles)
//       // const latestRecordsArray = responseJson.body.articles.slice(0, 3);

//       // // Update the state with the latest records
//       // setLatestRecords(latestRecordsArray);
//       // Toast.show({ text1: responseJson.headers.message });
//     } else {

//       setalert_sms(err)
//       setMy_Alert(true)
//     }
//   }

//   const getReport = async () => {
//     setLoading(true)
//     const { responseJson, err } = await requestGetApi(creation_get_report, '', 'GET', User.token)
//     setLoading(false)
//     // console.log('the res of get suggest post from cooking', responseJson)
//     if (responseJson.headers.success == 1) {
//       // console.log('the res after sucess report get', responseJson.body.data)
//       setReportGet(responseJson.body.data)

//     } else {

//       setalert_sms(err)
//       setMy_Alert(true)
//     }
//   }

//   const postReport = async (items) => {
//     // console.log('kkkkk', items);
//     if (selectedReasonId === null) {
//       Toast.show({ text1: 'Select a reason for report' });
//       return; // Exit the function to prevent further execution
//     }

//     setLoading(true);
//     var fUrl = creation_post_report;
//     var urls = myArticle;
//     // console.log('my url---------->', urls);
//     if (urls !== undefined) {
//       fUrl = fUrl + urls;
//     }
//     var data = {
//       report_id: items,
//       comment: ""
//     };

//     const { responseJson, err } = await requestPostApi(fUrl, data, 'POST', User.token);
//     setLoading(false);
//     // console.log('the res of report from cooking', responseJson);
//     setShowReportModal(false);

//     if (responseJson.headers.success === 1) {
//       Toast.show({ text1: responseJson.headers.message });
//       setSelectedReasonId(null);
//       // console.log('report post article', responseJson);
//     } else {
//       setalert_sms(err);
//       setMy_Alert(true);
//     }
//   }
//   const handleLoadMore = () => {

//     // console.log('handel more caledd???????');
//     ArtCategory(true)
//   };
//   const renderFooter = () => {
//     // console.log('render fotter called?????');
//     return loading ? (
//       <View style={{ marginTop: 10, alignItems: "center" }}>
//         <ActivityIndicator size="large" color="#1f1f1f" />
//       </View>
//     ) : null;
//   };
//   const toggleModal = (state) => {
//     console.log('state', state);
//     setShowModal({
//       isVisible: state.isVisible,
//       data: state.data,
//     });
//   };
//   return (
//     <SafeAreaView scrollEnabled={scrollEnabled} style={{ backgroundColor: '#F8F8F8', }}>
//       <ScrollView style={{
//         zIndex: -999,
//       }} showsVerticalScrollIndicator={false}
//         showsHorizontalScrollIndicator={false} >
//         <HomeHeaderRoundBottom height={100} extraStyle={{ paddingtop: 10, paddingBottom: 25 }} paddingHorizontal={15} borderBottomLeftRadius={20} borderBottomRightRadius={20} backgroundColor='#0089CF'
//           press1={() => { props.navigation.goBack() }} img1={require('../../../assets/images/service-header-back-button.png')} img1width={25} img1height={18}
//           press2={() => { }} title2={'Fashion'} fontWeight={'500'} img2height={20} color={'#fff'}
//           press3={() => { props.navigation.navigate('FashionNotification') }} img3={require('../../../assets/images/fashion-bell-icon.png')} img3width={25} img3height={22}
//           press4={() => { props.navigation.navigate('FashionProfile') }} img4={require('../../../assets/People/PeopleProfileIConModal.png')} img4width={25} img4height={22}
//         />
//         <View style={{ top: -20, width: '90%', alignSelf: 'center' }} >

//           <ArtSearch marginTop={0}
//             // serchValue={searchValue}

//             searchIcon={require('../../../assets/Art/CreationArtSearch.png')}
//             // onChangeText={(e) => { setsearchValue(e) }}
//             press={() => { props.navigation.navigate('FashionCategories', { cat_name: {}, from: 'seach' }) }}
//             // presssearch={() => { Alert.alert('Search Pressed') }}
//             paddingLeft={20} />

//         </View>

//         <View style={{
//           flex: 1, width: '90%',
//           marginLeft: 'auto',
//           marginRight: 'auto',
//           backgroundColor: '#F8F8F8',

//         }}>
//           <View style={{ width: dimensions.SCREEN_WIDTH * 0.9, alignSelf: 'flex-start', marginTop: 0, marginBottom: 10, marginTop: 10, zIndex: 999 }}>
//             <FlatList
//               data={categories}
//               showsHorizontalScrollIndicator={true}

//               horizontal
//               renderItem={({ item, index }) => {
//                 return (

//                   <TouchableOpacity
//                     style={{
//                       height: 140,
//                       marginRight: 15,
//                       position: 'relative',
//                       width: 140,
//                       borderRadius: 10,
//                       overflow: 'hidden', // Clip content that exceeds the borderRadius
//                     }}
//                     onPress={() => {
//                       props.navigation.navigate('FashionCategories', { cat_name: item, from: 'bycategory' });
//                     }}
//                   >
//                     <LinearGradient
//                       colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.43)']}
//                       style={{
//                         width: '100%',
//                         height: '100%',
//                         position: 'absolute',
//                         zIndex: 1,
//                         borderRadius: 10, // Apply the borderRadius to the LinearGradient
//                       }}
//                     >
//                       <View
//                         style={{
//                           flex: 1,
//                           flexDirection: 'column',
//                           justifyContent: 'flex-end',
//                           alignItems: 'center',
//                           marginBottom: 20,
//                         }}
//                       >
//                         <Text style={{ fontSize: 14, fontWeight: '500', color: '#fff' }}>{item?.name}</Text>
//                       </View>
//                     </LinearGradient>
//                     <Image
//                       source={{ uri: item.image }}
//                       style={{
//                         width: '100%',
//                         height: '100%',
//                         position: 'absolute',
//                         borderRadius: 10, // Apply the same borderRadius to the image
//                       }}
//                       resizeMode='cover'
//                     />
//                   </TouchableOpacity>
//                 )
//               }}
//               keyExtractor={item => item.id}
//             />
//           </View>

//           <View style={{ marginTop: 20, width: '100%', justifyContent: 'center', alignItems: 'center', }}>
//             {categoryData.length > 0 ?

//               <AppIntroSlider
//                 data={categoryData.slice(0, 3)}
//                 renderItem={_renderItem}
//                 renderDoneButton={() => <View />}
//                 renderNextButton={() => <View />}
//                 activeDotStyle={{
//                   backgroundColor: '#29913C',
//                   height: 9,
//                   width: 9,
//                   borderRadius: 30,
//                   position: 'absolute',
//                   top: 20,
//                 }}
//                 dotStyle={{
//                   backgroundColor: '#fff',
//                   height: 9,
//                   width: 9,
//                   borderRadius: 30,
//                   position: 'absolute',
//                   top: 20,
//                 }}
//                 renderPagination={renderPagination}
//                 keyExtractor={(item) => item.id}
//               />
//               : null}
//           </View>

//           <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 20, marginBottom: 10 }}>
//             <Text style={{ fontSize: 16, fontWeight: '500', color: '#263238' }}>Around the world</Text>
//             <TouchableOpacity onPress={() => { props.navigation.navigate('FashionViewAll') }}>
//               <Text style={{ fontSize: 13, fontWeight: '400', color: '#0089CF' }}>View all</Text>
//             </TouchableOpacity>
//           </View>

//           <View style={{ width: dimensions.SCREEN_WIDTH * 0.9, alignSelf: 'flex-start', marginTop: 10, height: 300, zIndex: 999 }}>

//             <ScrollView showsVerticalScrollIndicator={false}
//               showsHorizontalScrollIndicator={false} nestedScrollEnabled={true} scroolToEnd={true} ref={scrollViewRef}
//               onScroll={(event) => {
//                 const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
//                 const isAtEnd = layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;
//                 if (isAtEnd) {
//                   // console.log('is function reached on end')
//                   handleLoadMore();
//                 }
//               }}
//             >
//               <View>
//                 <FlatList

//                   style={{}}
//                   data={categoryData.slice(4)}
//                   // data={categoryData}
//                   // ref={scrollRef}
//                   showsHorizontalScrollIndicator={true}
//                   // onEndReachedThreshold={0.9}
//                   // onEndReached={
//                   //   handleLoadMore
//                   // }
//                   //ListFooterComponent={renderFooter}
//                   // ListFooterComponent={() => (<Text style={{ fontSize: 30, textAlign: "center", marginBottom: 20, fontWeight: 'bold', color: 'black' }}>Load More</Text>)}

//                   renderItem={({ item, index }) => {
//                     console.log('category item', item)
//                     let videoUrl = null; // Declare and initialize the videoUrl variable

//                     if (item.type === "video") {
//                       // Get the video URL from the files array
//                       videoUrl = item.files[0]?.file_url; // Assuming the URL is stored in the 'url' property of the file object
//                     }
//                     // console.log();
//                     return (

//                       <>
//                         <TouchableOpacity style={{ width: dimensions.SCREEN_WIDTH, marginRight: 15, flexDirection: 'row', marginBottom: 20, }}
//                           onPress={() => {
//                             postsuugestion(item.id)
//                             props.navigation.navigate('FashionPost', { id: item.id })

//                           }}>
//                           <TouchableOpacity onPress={() => {
//                             setStartFromIndex(index);
//                             setSelectedID(item.id)
//                             item.type === "video" ? setShowModal({
//                               isVisible: true,
//                               data: item.files[0],
//                             }) : props.navigation.navigate('FashionPost', { id: item.id })

//                           }}>
//                             {item.type == 'video' ?
//                               // <VideoPlayer
//                               //   resizeMode="contain"
//                               //   // video={{ uri: videoUrl }}
//                               //   style={{ borderRadius: 10, borderWidth: 2, }}
//                               //   videoWidth={dimensions.SCREEN_WIDTH / 2.5}
//                               //   videoHeight={100}
//                               //   autoplay={false}
//                               //   thumbnail={{ uri: item.thumb.path }}
//                               //   endWithThumbnail
//                               //   disableControlsAutoHide
//                               //   customStyles={{
//                               //     thumbnail: { width: dimensions.SCREEN_WIDTH / 2.5, height: 105 },
//                               //     // videoWrapper: { width: dimensions.SCREEN_WIDTH / 2.5, height: 90, },
//                               //     // wrapper: { width: dimensions.SCREEN_WIDTH / 2.5, height: 90 },
//                               //   }}
//                               // />
//                               <ImageBackground source={{ uri: item.thumb.path }} style={{
//                                 width: dimensions.SCREEN_WIDTH / 2.5, height: 105, alignSelf: 'center', justifyContent: 'center', borderRadius: 10,
//                                 overflow: 'hidden',
//                               }} resizeMode='cover' >
//                                 <Image source={require('../../../assets/images/people-play-button.png')} style={{ width: '20%', height: '20%', alignSelf: 'center', }} resizeMode='contain' ></Image>
//                               </ImageBackground>
//                               : <Image source={{
//                                 uri: item.cover_photo
//                               }} style={{ width: dimensions.SCREEN_WIDTH / 2.5, height: 105, borderRadius: 10, }} resizeMode='cover'></Image>}

//                           </TouchableOpacity>
//                           <View style={{ flexDirection: 'column', width: dimensions.SCREEN_WIDTH / 2, }}>
//                             <View style={{ flex: 1, marginTop: 4, marginLeft: 7, width: dimensions.SCREEN_WIDTH / 2.2, }}>
//                               <Text numberOfLines={2} style={{ fontSize: 14, fontWeight: '400', color: '#000000' }}>
//                                 {item.headline}
//                               </Text>
//                             </View>
//                             <View style={{ flexDirection: 'row', marginTop: 8, width: dimensions.SCREEN_WIDTH / 2.1, }}>
//                               <Text style={{ fontSize: 12, fontWeight: '400', color: 'black', paddingHorizontal: 9 }}>
//                                 Category:
//                               </Text>
//                               <Text style={{ fontSize: 12, fontWeight: '400', color: '#0089CF', flexShrink: 1 }}>
//                                 {item.category}
//                               </Text>
//                             </View>
//                             <View style={{ flexDirection: 'row', marginTop: 2, width: dimensions.SCREEN_WIDTH / 2.1, }}>
//                               <Text style={{ fontSize: 12, fontWeight: '400', color: 'black', paddingHorizontal: 9 }}>
//                                 Author :
//                               </Text>
//                               <Text style={{ fontSize: 12, fontWeight: '400', color: '#B4BBC6', marginLeft: 6, width: dimensions.SCREEN_WIDTH / 2.1 }}>
//                                 {item.username}
//                               </Text>
//                             </View>
//                             <Text style={{ fontSize: 12, fontWeight: '400', color: 'black', marginLeft: 6, width: dimensions.SCREEN_WIDTH / 2.1 }}>
//                               Published Date: <Text style={{ fontSize: 12, fontWeight: '400', color: '#B4BBC6', textAlign: 'left', }}>{item.created_date.slice(0, 11)}</Text>
//                             </Text>
//                             <View style={styles.buttonsRow}>
//                               {/* Your TouchableOpacity components */}
//                             </View>
//                           </View>
//                         </TouchableOpacity >
//                         <View style={{ borderBottomWidth: 1, borderBottomColor: '#D9D9D9', height: 1, width: '100%', marginBottom: 20 }}></View>
//                       </>
//                     )
//                   }}
//                   keyExtractor={item => item.id}

//                 />
//               </View>
//             </ScrollView>
//           </View>

//           <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10, marginTop: 35 }}>
//             <Text style={{ fontSize: 16, fontWeight: '500', color: '#263238' }}>Recommended for you</Text>
//             <TouchableOpacity onPress={() => {



//               props.navigation.navigate('AllFashionSuggested')
//             }} >
//               <Text style={{ fontSize: 13, fontWeight: '400', color: '#0089CF' }}>View all</Text>
//             </TouchableOpacity>
//           </View>

//           <View style={{ width: dimensions.SCREEN_WIDTH * 0.9, alignSelf: 'flex-start', marginTop: 0, marginBottom: 10, marginTop: 10, height: 300 }}>
//             {/* {console.log('jjjjjjjjcheck', getSuggested)
//             } */}
//             {getSuggested.length > 0 ? (
//               <FlatList
//                 data={getSuggested}
//                 showsHorizontalScrollIndicator={true}
//                 horizontal
//                 renderItem={({ item, index }) => {
//                   console.log(item, 'my updated get suggested')

//                   return (
//                     <>
//                       <View style={{ width: dimensions.SCREEN_WIDTH / 1.5, height: 160, marginRight: 15, backgroundColor: 'red' }}
//                       // onPress={() => {

//                       //   item.type == 'video' ? setShowModal({
//                       //     isVisible: true,
//                       //     data: item.files[0],
//                       //   }) : props.navigation.navigate('CookingPost', { id: item.id })


//                       // props.navigation.navigate('CookingPost', { id: item.id, })

//                       // }}

//                       >

//                         {
//                           item.type == 'video' ?
//                             <TouchableOpacity onPress={() => setShowModal({
//                               isVisible: true,
//                               data: item.files[0],
//                             })}>
//                               <ImageBackground source={{ uri: item.thumb.path }} style={{
//                                 width: dimensions.SCREEN_WIDTH / 1.5, height: 160, alignSelf: 'center', justifyContent: 'center', borderRadius: 10,
//                                 overflow: 'hidden',
//                               }} resizeMode='cover' >
//                                 <TouchableOpacity onPress={() => setShowModal({
//                                   isVisible: true,
//                                   data: item.files[0],
//                                 })}>
//                                   <Image source={require('../../../assets/images/people-play-button.png')} style={{ width: '20%', height: '20%', alignSelf: 'center', }} resizeMode='contain' ></Image>
//                                 </TouchableOpacity>
//                               </ImageBackground>
//                             </TouchableOpacity>
//                             :
//                             <Image source={{ uri: item.cover_photo }} style={{ width: dimensions.SCREEN_WIDTH / 1.5, height: 160, borderRadius: 10 }}></Image>

//                           // {/* <Image source={{ uri: item.cover_photo }} style={{ width: dimensions.SCREEN_WIDTH / 1.5, height: 160, borderRadius: 10 }}></Image> */}
//                         }
//                       </View >
//                       <View style={styles.flatlistMainBottomView}>

//                       </View >
//                     </>
//                   )
//                 }}
//                 keyExtractor={item => item.id}
//               />
//             ) : (

//               <FlatList
//                 data={categoryData.sort((a, b) => new Date(a.created_date) - new Date(b.created_date))}
//                 //data={categoryData}
//                 showsHorizontalScrollIndicator={true}
//                 horizontal
//                 keyExtractor={(item) => item.id.toString()}
//                 renderItem={({ item, index }) => {
//                   // console.log(item, 'my updated by thumb on data');
//                   return (
//                     <View onPress={() => {
//                       props.navigation.navigate('FashionPost', { id: item.id })
//                     }}
//                       style={{ width: dimensions.SCREEN_WIDTH / 1.5, height: 500, marginRight: 15 }}>
//                       <View style={{}}>


//                         <View style={{ flexDirection: 'row', alignItems: 'center', }}>

//                         </View>

//                       </View>

//                       {/* addd new view heree */}
//                       <View style={{ width: dimensions.SCREEN_WIDTH / 1.5, alignSelf: 'center', }}>
//                         <View style={{ justifyContent: 'flex-start', }}>
//                           <ScrollView horizontal contentContainerStyle={styles.scrollViewContent}>

//                             {item.type == 'video' ?
//                               <TouchableOpacity onPress={() => setShowModal({
//                                 isVisible: true,
//                                 data: item.files[0],
//                               })}>
//                                 <ImageBackground source={{ uri: item.thumb.path }} style={{
//                                   width: dimensions.SCREEN_WIDTH / 1.5, height: 160, alignSelf: 'center', justifyContent: 'center', borderRadius: 10,
//                                   overflow: 'hidden',
//                                 }} resizeMode='cover' >
//                                   <Image source={require('../../../assets/images/people-play-button.png')} style={{ width: '20%', height: '20%', alignSelf: 'center', }} resizeMode='contain' ></Image>
//                                 </ImageBackground>
//                               </TouchableOpacity>
//                               :
//                               <TouchableOpacity onPress={() => {
//                                 props.navigation.navigate('FashionPost', { id: item.id })
//                               }}>
//                                 <Image source={{ uri: item.cover_photo }} style={{ width: dimensions.SCREEN_WIDTH / 1.5, height: 160, borderRadius: 10 }}></Image>
//                               </TouchableOpacity>
//                               // {/* <Image source={{ uri: item.cover_photo }} style={{ width: dimensions.SCREEN_WIDTH / 1.5, height: 160, borderRadius: 10 }}></Image> */}
//                             }

//                           </ScrollView>
//                         </View>
//                       </View>


//                       <TouchableOpacity style={styles.flatlistMainBottomView} onPress={() => {
//                         props.navigation.navigate('FashionPost', { id: item.id })
//                       }}>
//                         {
//                           <View style={{ flexDirection: 'row', width: '60%', }}>
//                             <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2, marginBottom: 5 }} onPress={() => {

//                               // props.navigation.navigate('LikedUserList', { postid: item.id })
//                             }}>


//                             </TouchableOpacity>

//                           </View>


//                         }
//                         <View style={styles.flatlistBottomView}>
//                           {/* <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'pink', width: '100%' }}> */}
//                           < View style={styles.buttonsContainer} >
//                             <View style={{
//                               flexDirection: 'row',
//                               justifyContent: 'space-between',
//                               alignItems: 'center',
//                               width: '100%',

//                             }}>


//                               <Text numberOfLines={2} style={{
//                                 fontSize: 14,
//                                 fontWeight: '500',
//                                 color: 'black',

//                                 width: '65%',
//                                 textAlign: 'left'
//                               }}>{item.headline} </Text>
//                               <View style={{ backgroundColor: '#0089CF', height: 35, width: 35, borderRadius: 20, alignSelf: 'center' }} >
//                                 <Image source={require('../../../assets/arrow_right_black.png')} style={{ height: 30, width: 30, tintColor: 'white', justifyContent: 'center', alignItems: 'center', alignSelf: 'center', marginTop: 2, marginLeft: 3 }} ></Image>
//                               </View>
//                             </View>


//                           </View>
//                           {/* </View> */}
//                           <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//                             <View style={{ marginRight: 10 }}>

//                             </View>

//                           </View>
//                         </View>


//                       </TouchableOpacity>
//                     </View>
//                   );
//                 }}
//               />)}
//           </View>


//           <View style={{ height: 10 }} />


//         </View>


//         {/* <View style={{ height: 100 }} /> */}
//         {/* </ScrollView> */}

//         {/* <TouchableOpacity onPress={()=>props.navigation.navigate('ShopProdCart')} style={{width:'80%',height:60,flexDirection:'row',justifyContent:'flex-end',position:'absolute',bottom:40, right:20, shadowColor: '#FFD037', shadowOffset: {width: 0,height: 3},shadowRadius: 1,shadowOpacity: 0.1,elevation: 5}}> */}


//       </ScrollView>
//       {
//         !showReportModal && (<TouchableOpacity onPress={() => { props.navigation.navigate('FashionUpload') }} style={{ bottom: 60, right: 20, position: 'absolute', alignSelf: 'flex-end', width: 80, height: 80, borderRadius: 80 / 2, backgroundColor: '#0089CF', justifyContent: 'center', alignItems: 'center', shadowColor: '#FFD037', shadowOffset: { width: 0, height: 3 }, shadowRadius: 1, shadowOpacity: 0.1, elevation: 5 }}>
//           <Image source={require('../../../assets/images/fashion-upload-icon.png')} style={{ width: 40, height: 40 }} />
//         </TouchableOpacity>)
//       }
//       {/* </TouchableOpacity> */}

//       {loading || loading2 ? <Loader /> : null}
//       <Modal
//         isVisible={showReportModal}
//         swipeDirection="down"
//         onBackdropPress={() => { setShowReportModal(false), setSelectedReasonId(null) }}
//         onSwipeComplete={(e) => {
//           setShowReportModal(false)
//           setSelectedReasonId(null);
//         }}
//         scrollTo={() => { }}
//         scrollOffset={1}
//         propagateSwipe={true}
//         coverScreen={false}
//         backdropColor='transparent'
//         style={{ justifyContent: 'flex-end', margin: 0, backgroundColor: 'rgba(0,0,0,0.5)' }}
//       >
//         <View style={{ height: 'auto', backgroundColor: '#fff', borderTopLeftRadius: 30, borderTopRightRadius: 30 }}>
//           <Text style={{ fontSize: 20, fontWeight: '700', color: '#455A64', textAlign: 'center', marginBottom: 20, marginTop: 30 }}>Report</Text>
//           <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled={true}>

//             <FlatList
//               data={reportGet}
//               showsHorizontalScrollIndicator={false}
//               numColumns={1}
//               keyExtractor={item => item.id}
//               style={{ marginBottom: 10 }}
//               renderItem={({ item, index }) => {
//                 // console.log('item.report_id', item.report_id);
//                 return (
//                   <TouchableOpacity key={item.report_id} onPress={() => setSelectedReasonId(item.report_id)} style={selectedReasonId === item.report_id ? styles.selectedReasonView : styles.reasonView}>
//                     <Image source={selectedReasonId === item.report_id ? require('../../../assets/images/fastion-selected-reason-icon.png') : require('../../../assets/images/fastion-reason-icon.png')} style={{ tintColor: '#0089CF' }} />
//                     <View style={{ marginLeft: 10 }}>
//                       <Text style={{ fontSize: 14, lineHeight: 14, fontWeight: '400', color: '#455A64' }}>{item.feedback}</Text>
//                       {item.description ?
//                         <Text style={{ fontSize: 12, lineHeight: 12, fontWeight: '400', color: '#C5C6C9', marginTop: 2 }}>{item.description}</Text>
//                         : null}
//                     </View>
//                   </TouchableOpacity>
//                 )
//               }}
//             />

//             <TouchableOpacity onPress={() => { postReport(selectedReasonId) }} style={styles.reportButtonView}>
//               <Text style={{ fontSize: 15, fontWeight: '500', color: '#fff', }}>Report</Text>
//             </TouchableOpacity>

//           </ScrollView>

//         </View>
//       </Modal>
//       {console.log('showModal?.data', showModal?.data)}
//       {
//         showModal.isVisible ? (

//           <VideoModel
//             isVisible={showModal.isVisible}
//             toggleModal={toggleModal}
//             videoDetail={{ ...showModal?.data, url: showModal?.data?.file_url }}
//             {...props}
//           />
//         ) : null
//       }

//       <PostModal
//         isVisible={showPostsModal}
//         setIsVisible={setShowPostsModal}
//         startFromIndex={startFromIndex}
//         data={categoryData}
//         id={selectedID}
//       />

//     </SafeAreaView >
//   );
// }
// const styles = StyleSheet.create({
//   unselectedTabText: {
//     fontSize: 14,
//     fontWeight: '500',
//     color: '#263238'
//   },
//   requestCallView: {
//     marginTop: 10,
//     width: 140,
//     height: 30,
//     borderRadius: 15,
//     backgroundColor: '#29913C',
//     alignItems: 'center',
//     justifyContent: 'center',
//     shadowColor: '#6D2F91',
//     shadowOffset: { width: 3, height: 3 },
//     shadowRadius: 5,
//     shadowOpacity: 0.17,
//     elevation: 2
//   },
//   VideoThumbWrapper: {
//     position: 'relative',
//     // width: '48%',
//     // marginRight: 8,
//     marginBottom: 4,

//     width: dimensions.SCREEN_WIDTH / 1.5,
//     height: 160,
//     marginRight: 20,
//     borderRadius: 15,
//     // shadowColor:'#000',
//     // shadowOffset: {width: 0,height: 3},
//     // shadowRadius: 1,
//     // shadowOpacity: 0.03,
//     // elevation: 1,
//   },
//   PlayIconContainer: {
//     position: 'absolute',
//     top: 0,
//     bottom: 0,
//     left: 0,
//     right: 0,
//     zIndex: 1,
//   },
//   PlayIconWrapper: {
//     flex: 1,
//     flexDirection: 'column',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   BackGroundImage: {
//     width: '100%',
//     height: 160,
//     justifyContent: 'center',
//     borderRadius: 15
//   },
//   buttonsRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginTop: 20,
//     width: '53%',
//     marginLeft: 6
//   },
//   buttonView: {
//     flexDirection: 'row',
//     alignItems: 'center'
//   },
//   shippingView: {

//     height: 688,
//     backgroundColor: 'white',
//     borderRadius: 10,
//     width: 596,
//     padding: 10,
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderWidth: 1,
//     borderColor: '#545454'
//   },
//   buttonText: {
//     fontSize: 10,
//     fontWeight: '500',
//     color: '#8F93A0',
//     marginLeft: 5
//   },
//   reasonView: {
//     alignSelf: 'center',
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     marginBottom: 15,
//     // paddingVertical:10,
//     paddingHorizontal: 10,
//     width: '90%',
//     height: 60,
//   },
//   selectedReasonView: {
//     alignSelf: 'center',
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     marginBottom: 15,
//     // paddingVertical:10,
//     paddingHorizontal: 10,
//     width: '90%',
//     height: 60,
//     borderColor: '#E7F7FF',
//     borderWidth: 1,
//     shadowColor: '#455A64',
//     shadowOffset: { width: 3, height: 3 },
//     shadowRadius: 5,
//     shadowOpacity: 0.10,
//     elevation: 1
//   },
//   reportButtonView: {
//     height: 60,
//     width: '90%',
//     alignSelf: 'center',
//     backgroundColor: '#0089CF',
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderRadius: 5,
//     marginBottom: 30,
//     shadowColor: '#000',
//     shadowOffset: { width: 3, height: 3 },
//     shadowRadius: 5,
//     shadowOpacity: 0.10,
//     elevation: 2
//   },
//   flatlistMainBottomView: {
//     backgroundColor: '#fff',
//     paddingVertical: 15,
//     backdropColor: 'red',
//     width: dimensions.SCREEN_WIDTH,
//     borderBottomRightRadius: 20,
//     borderBottomLeftRadius: 20,
//     borderLeftWidth: 1,
//     borderRightWidth: 1,
//     borderBottomWidth: 1,
//     borderLeftColor: '#EAEBEB',
//     borderRightColor: '#EAEBEB',
//     borderBottomColor: '#EAEBEB',

//   },

//   flatlistMainView: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     backgroundColor: 'pink',
//     paddingHorizontal: 15,
//     paddingVertical: 10,
//     width: dimensions.SCREEN_WIDTH / 1.5,
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     borderBottomWidth: 1,
//     borderLeftColor: '#EDEEEE',
//     borderRightColor: '#EDEEEE',
//     borderBottomColor: '#EDEEEE'

//   },
//   followingImageView: {
//     flexDirection: 'row',
//     alignItems: 'center',

//   },
//   followingView: {
//     justifyContent: 'center',
//     marginLeft: 10
//   },
//   flatlistMainBottomView: {
//     backgroundColor: '#fff',
//     paddingVertical: 15,
//     paddingHorizontal: 5,
//     width: dimensions.SCREEN_WIDTH / 1.5,
//     borderBottomRightRadius: 20,
//     borderBottomLeftRadius: 20,
//     borderLeftWidth: 0.5,
//     borderRightWidth: 0.5,
//     borderBottomWidth: 0.5,
//     borderLeftColor: '#0089CF',
//     borderRightColor: '#0089CF',
//     borderBottomColor: '#0089CF',

//   },
//   flatlistBottomView: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',

//     width: '100%',
//     marginLeft: 0
//     //  marginBottom: 12
//   },
//   buttonsContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',

//     width: '100%',
//     justifyContent: 'space-between',
//     marginTop: -12, // Add margin between text and buttons
//     // Align buttons with the texts backgroundColor: 'pink'


//   },
// });
// export default FashionHome



// import React, { useEffect, useState, useRef } from 'react';
// import { View, Image, Text, StyleSheet, SafeAreaView, TextInput, FlatList, Alert, TouchableOpacity, ScrollView, ImageBackground, ActivityIndicator } from 'react-native';
// import HomeHeaderRoundBottom from './components/HomeHeaderRoundBottom';
// import SearchInput2 from '../../../component/SearchInput2';
// import SearchInputEnt from '../../../component/SearchInputEnt';
// import FashionSearch from './components/FashionSearch';
// import SerchInput from '../../../component/SerchInput';
// import { dimensions, Mycolors } from '../../../utility/Mycolors';
// import messaging from '@react-native-firebase/messaging';
// import { useSelector, useDispatch } from 'react-redux';
// import Loader from '../../../WebApi/Loader';
// import { baseUrl, shop_eat_cart, user_payment_method, shop_eat_orders, shop_eat_cart_book_dining, shop_eat_cart_book_table, shop_eat_cart_id, shop_eat_business_id, shop_eat_menu_userid, requestPostApi, requestGetApi, shop_eat, connect_people_create_post, connect_people_newPost, art_getCollection, requestPostApiMedia, art_PostCollection, postApiWithToken2, art_HomePage, art_likeDislike, post_suggestion, get_suggestion, get_reportSuggestion, post_reportSuggestion, creation_home, creation_categories, creation_react, creation_get_report, creation_post_report, creation_addView, creation_getView, creation_addComments, creation_getNotifications, creation_startup, creation_Invention, invention_home, invention_suggested } from '../../../WebApi/Service'
// import { setcookingnotificationcount } from '../../../redux/actions/user_action';
// import LinearGradient from 'react-native-linear-gradient'
// import { ImageSlider, ImageCarousel } from "react-native-image-slider-banner";
// import MyButtons from '../../../component/MyButtons';
// import MultiSlider from '@ptomasroos/react-native-multi-slider';
// import Modal from 'react-native-modal';
// import Toast from 'react-native-toast-message';

// import AppIntroSlider from 'react-native-app-intro-slider';
// import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
// import { createThumbnail } from "react-native-create-thumbnail";
// import ViewMoreText from 'react-native-view-more-text';
// import VideoPlayer from 'react-native-video-player'
// import PostModal from './components/PostModal';
// import ArtSearch from './components/ArtSearch'
// import Video from 'react-native-video';
// import { log } from 'react-native-reanimated';
// import { VideoModel } from '../../../component/VideoModel';
// import ProgressBar from 'react-native-progress/Bar'
// const InventionHome = (props) => {
//   const scrollViewRef = useRef();
//   const dispatch = useDispatch();

//   const User = useSelector(state => state.user.user_details)
//   console.log(User, 'my user');
//   const chatindictor = useSelector(state => state.user.cooking_counter);

//   const player = useRef(null);
//   const [searchValue, setsearchValue] = useState('')
//   const [scrollEnabled, setScrollEnabled] = useState(false)
//   const myTextInput = useRef()
//   const [multiSliderValue, setMultiSliderValue] = useState([0, 100])
//   const [showChooseMilesModal, setShowChooseMilesModal] = useState(false)
//   const [showModalVideo, setShowModalVideo] = useState({ isVisible: false, data: null })
//   const [selectedCategory, setSelectedCategory] = useState('1')
//   const [loading, setLoading] = useState(false)
//   const [loading2, setLoading2] = useState(false)
//   const [loading3, setLoading3] = useState(false)
//   const [showPostsModal, setShowPostsModal] = useState(false)
//   const [showModal, setShowModal] = useState({ isVisible: false, data: null });
//   const [showVideoModal, setShowVideoModal] = useState(false)
//   const [selectedVideo, setSelectedVideo] = useState({})
//   const [showReportModal, setShowReportModal] = useState(false)
//   const [selectedReasonId, setSelectedReasonId] = useState(null)
//   const [showBottomLoader, setShowBottomLoader] = useState(false);
//   const [categoryData, setCategorydata] = useState([])
//   const [isLiked, setIsLiked] = useState(false);
//   const [latestRecords, setLatestRecords] = useState([]);
//   const [getSuggested, setGetSuggested] = useState('')
//   const [categories, setCategories] = useState('')
//   const [profileModal, setProfileModal] = useState('')
//   const [reportGet, setReportGet] = useState('')
//   const [myArticle, setMyArticle] = useState('')
//   const [page, setPage] = useState(1);
//   const [thumb, setThumb] = useState('')
//   const [selectedID, setSelectedID] = useState('')
//   const [startFromIndex, setStartFromIndex] = useState(0)
//   const [totalAmount, setTotalAmount] = useState(1000)
//   const [typeArticle, setTypeArticle] = useState('Fundraiser')
//   const [raisedAmount, setRaisedAmount] = useState(200)
//   const progress = raisedAmount / totalAmount;
//   console.log('progess ammaount', (progress * 100).toFixed(0));
//   const calculatedProgress = progress * 100;
//   const formattedProgress = calculatedProgress.toFixed(0);

//   const [introSliderData] = useState([
//     // require('../../assets/Group75972.png'),
//     { key: 'one', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5a5uCP-n4teeW2SApcIqUrcQApev8ZVCJkA&usqp=CAU', title: 'Art-Aficionado Tim Newton on How to Collect Art', status: 'Fine Art', date: 'March 4, 2022' },
//     { key: 'two', image: 'https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg', title: 'Art-Aficionado Tim Newton on How to Collect Art', status: 'Fine Art', date: 'March 4, 2022' },
//     { key: 'three', image: 'https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510__340.jpg', title: 'Art-Aficionado Tim Newton on How to Collect Art', status: 'Fine Art', date: 'March 4, 2022' }
//   ])


//   messaging().onMessage(remoteMessage => {
//     const data = remoteMessage;
//     if (data && Object.keys(data).length !== 0) {
//       dispatch(setcookingnotificationcount(1));
//     } else {
//       null
//     }
//     console.log('onMessage remoteMessage', remoteMessage);
//     // if (remoteMessage.notification.body === 'Order Delivered Successfully!') {
//     //   setalert_sms3('Do you want to rate order?');
//     //   setMy_Alert3(true);
//     //   setRemoteMessageData(remoteMessage.data);
//     // } else if (remoteMessage.notification.body === 'new message') {
//     //   // Handle new message scenario
//     //   // dispatch(setMessageCount(mapdata.messagecount + 1));
//     //   // props.navigation.navigate('ShopMyOrderDetails', { data: remoteMessage.data });
//     // }
//   });

//   messaging().onNotificationOpenedApp(remoteMessage => {

//     const data = remoteMessage;
//     console.log('when app is closed',);
//     if (data && Object.keys(data).length !== 0) {
//       dispatch(setcookingnotificationcount(1));
//     } else {
//       null
//     }
//   });

//   messaging()
//     .getInitialNotification()
//     .then(remoteMessage => {
//       const data = remoteMessage;
//       console.log('when app is clodee',);
//       if (data && Object.keys(data).length !== 0) {
//         dispatch(setcookingnotificationcount(1));
//       } else {
//         null
//       }
//     });

//   const getAllNotificationsList = async () => {
//     console.log('notification function called');
//     setLoading(true)

//     const { responseJson, err } = await requestGetApi(creation_getNotifications + 57, '', 'GET', User.token)
//     setLoading(false)
//     console.log('the res in_cart notification_list ==>>', responseJson)
//     if (responseJson.headers.success == 1) {
//       console.log('my data lenght', responseJson.body.data.length);

//       console.log('my notifications art home', responseJson.body.data.length != 0);
//       responseJson.body.data.length != 0 ? console.log('o is called') : console.log('1 is called');
//       const hasStatusZero = responseJson.body.data.some((item) => item.status === 0);
//       console.log('item for notification status', (hasStatusZero))
//       dispatch(setcookingnotificationcount(hasStatusZero ? 0 : 1));
//       // responseJson.body.data.length != 0 ? dispatch(setcookingnotificationcount(1)) : dispatch(setcookingnotificationcount(0))

//     } else {
//       setalert_sms(err)
//       setMy_Alert(true)
//     }
//   };


//   // messaging().onMessage(remoteMessage => {
//   //   const data = remoteMessage;
//   //   console.log('onMessage remoteMessage', remoteMessage);
//   //   // if (remoteMessage.notification.body === 'Order Delivered Successfully!') {
//   //   //   setalert_sms3('Do you want to rate order?');
//   //   //   setMy_Alert3(true);
//   //   //   setRemoteMessageData(remoteMessage.data);
//   //   // } else if (remoteMessage.notification.body === 'new message') {
//   //   //   // Handle new message scenario
//   //   //   // dispatch(setMessageCount(mapdata.messagecount + 1));
//   //   //   // props.navigation.navigate('ShopMyOrderDetails', { data: remoteMessage.data });
//   //   // }
//   // });

//   // messaging().onNotificationOpenedApp(remoteMessage => {
//   //   const data = remoteMessage.data;
//   //   console.log('Notification caused app to open from the background state:', remoteMessage);
//   //   // if (remoteMessage.notification.title === 'Kinengo') {
//   //   //   if (remoteMessage.notification.body === 'Order Delivered Successfully!') {
//   //   //     setalert_sms3('Do you want to rate order?');
//   //   //     setMy_Alert3(true);
//   //   //     setRemoteMessageData(remoteMessage.data);
//   //   //   } else {
//   //   //     props.navigation.navigate('ShopMyOrderDetails', { data: remoteMessage.data });
//   //   //   }
//   //   // } else if (remoteMessage.notification.body === 'new message') {
//   //   //   props.navigation.navigate('ShopMyOrderDetails', { data: remoteMessage.data });
//   //   //   dispatch(setMessageCount(mapdata.messagecount + 1));
//   //   // }
//   // });

//   // messaging()
//   //   .getInitialNotification()
//   //   .then(remoteMessage => {
//   //     console.log('====================================');
//   //     console.log(remoteMessage, 'my message after notification');
//   //     console.log('====================================');
//   //     // if (remoteMessage.notification.title === 'Kinengo') {
//   //     //   if (remoteMessage.notification.body === 'Order Delivered Successfully!') {
//   //     //     setalert_sms3('Do you want to rate order?');
//   //     //     setMy_Alert3(true);
//   //     //     setRemoteMessageData(remoteMessage.data);
//   //     //   } else {
//   //     //     props.navigation.navigate('ShopMyOrderDetails', { data: remoteMessage.data });
//   //     //   }
//   //     // } else if (remoteMessage.notification.body === 'new message') {
//   //     //   dispatch(setMessageCount(mapdata.messagecount + 1));
//   //     //   props.navigation.navigate('ShopMyOrderDetails', { data: remoteMessage.data });
//   //     // }
//   //   });

//   const multiSliderValuesChange = (values) => { setMultiSliderValue(values) }
//   // useEffect(() => {
//   //   ArtCategory()
//   //   Categories()
//   //   // generateThumb()
//   // }, [])
//   React.useEffect(() => {
//     const unsubscribe = props.navigation.addListener('focus', () => {
//       // The screen is focused
//       // Call any action

//       ArtCategory()
//       Categories()
//       getSuggestion()
//       getReport()
//       getAllNotificationsList()
//       // console.log('my user id of state----->', userID);
//     });
//     // Return the function to unsubscribe from the event so it gets removed on unmount
//     return unsubscribe;
//   }, [props, page]);


//   // useEffect(() => {
//   //   // Function to handle notifications received while the app is in the foreground
//   //   const onNotificationReceived = async (remoteMessage) => {
//   //     console.log('Notification received while the app is in the foreground:', remoteMessage);
//   //     // Update the Redux state based on the received notification
//   //     // You can extract the necessary data from remoteMessage and dispatch the actions accordingly
//   //     if (remoteMessage && Object.keys(remoteMessage).length !== 0) {
//   //       dispatch(setcookingnotificationcount(1)); // Assuming "setcookingnotificationcount" is your action creator
//   //     }
//   //   };

//   //   // Set up the event listener for handling notifications received while the app is in the foreground
//   //   const unsubscribeForeground = messaging().onMessage(onNotificationReceived);

//   //   // Function to check if the app was opened by tapping on a notification
//   //   const checkInitialNotification = async () => {
//   //     try {
//   //       const remoteMessage = await messaging().getInitialNotification();
//   //       if (remoteMessage) {
//   //         console.log('App opened by tapping on a notification:', remoteMessage);
//   //         // Handle the notification data as needed
//   //         // Update the Redux state based on the received notification
//   //         // You can extract the necessary data from remoteMessage and dispatch the actions accordingly
//   //         if (remoteMessage && Object.keys(remoteMessage).length !== 0) {
//   //           dispatch(setcookingnotificationcount(1)); // Assuming "setcookingnotificationcount" is your action creator
//   //         }
//   //       } else {
//   //         console.log('App not opened by a notification.');
//   //       }
//   //     } catch (error) {
//   //       console.error('Error retrieving initial notification:', error);
//   //     }
//   //   };

//   //   // Request permission for receiving notifications
//   //   const requestUserPermission = async () => {
//   //     // ... (your existing permission request code)
//   //   };

//   //   // Clean up the event listeners when the component unmounts
//   //   return () => {
//   //     unsubscribeForeground();
//   //   };
//   // }, [dispatch]);



//   const scrollToTop = () => {
//     scrollRef?.current?.scrollToOffset({ animated: true, offset: 0 });
//   };

//   const Likepost = async (id) => {
//     console.log('my post is liked or not', id);
//     setLoading(true)
//     var data = {
//       object_id: id,
//       object_type: 'article',
//       reaction_type: "like"
//     }
//     const { responseJson, err } = await requestPostApi(creation_react + 57, data, 'POST', User.token)
//     setLoading(false)
//     if (responseJson.headers.success == 1) {
//       // console.log('the res like of comments==>>', responseJson, User.token)
//       // ArtCategory()
//       // GetComments()
//       console.log('like is need to be called');
//       ArtCategory()
//       //Toast.show({ text1: responseJson.headers.message });
//     } else {

//       setalert_sms(err)
//       setMy_Alert(true)
//     }
//   }

//   const Dislikepost = async (id) => {
//     console.log('my post is liked or not', id);
//     setLoading(true)
//     var data = {
//       object_id: id,
//       object_type: 'article',
//       reaction_type: "dislike"
//     }
//     const { responseJson, err } = await requestPostApi(creation_react + 57, data, 'POST', User.token)
//     setLoading(false)
//     if (responseJson.headers.success == 1) {
//       // console.log('the res like of comments==>>', responseJson, User.token)
//       // ArtCategory()
//       // GetComments()
//       console.log('dislike is need to be called');
//       ArtCategory()
//       GetComments()
//       //Toast.show({ text1: responseJson.headers.message });
//     } else {

//       setalert_sms(err)
//       setMy_Alert(true)
//     }
//   }
//   const _renderItem = ({ item }) => {
//     console.log('item for slicking of 3 data', item);
//     // let videoUrl = null; // Declare and initialize the videoUrl variable
//     // console.log('item of home sugggggg', item);
//     return (
//       <>
//         <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'center', }}>
//           {item.type === 'video' ?
//             <TouchableOpacity style={{ width: '100%', height: 227, borderRadius: 10, alignSelf: 'center', resizeMode: 'cover' }}
//               onPress={() => {
//                 //   setShowModal({
//                 //     isVisible: true,
//                 //     data: item.files[0],
//                 //   }), setSelectedID(item.id)
//                 // }} 
//                 { props.navigation.navigate('InventionPost', { id: item.id }) }
//               }}
//             >

//               <ImageBackground source={{ uri: item.thumb.path }} style={{
//                 width: '100%', height: 227, alignSelf: 'center', justifyContent: 'center', borderRadius: 10,
//                 overflow: 'hidden',
//               }} resizeMode='cover' >
//                 <Image source={require('../../../assets/images/people-play-button.png')} style={{ width: '20%', height: '20%', alignSelf: 'center', }} resizeMode='contain' ></Image>
//               </ImageBackground>
//             </TouchableOpacity>
//             :
//             <TouchableOpacity onPress={() => { props.navigation.navigate('InventionPost', { id: item.id }) }} style={{ width: '100%', height: 227, alignSelf: 'center', borderRadius: 10 }}>
//               <Image source={{
//                 uri:

//                   item.cover_photo
//               }} style={{ width: '100%', height: '100%', borderRadius: 10, }} />
//             </TouchableOpacity>}
//           {/* <LinearGradient
//             colors={['#29913C', 'transparent']}
//             style={{
//               height: 75, width: '100%', paddingHorizontal: 15,
//               justifyContent: 'center', position: 'absolute', bottom: 0, overflow: 'hidden',
//             }}
//             start={{ x: 0.2, y: 0 }}
//             end={{ x: 1, y: 0 }}
//           > */}
//           <View
//             style={{
//               height: 75, width: '100%', paddingHorizontal: 15,
//               justifyContent: 'center', position: 'absolute', bottom: 0, overflow: 'hidden',
//               backgroundColor: 'rgba(255, 196, 12, 0.5)', borderBottomLeftRadius: 10, borderBottomRightRadius: 10
//             }}

//           >

//             <Text numberOfLines={1} style={{ color: 'white', fontSize: 16, fontWeight: '400', width: '100%', alignSelf: 'center', lineHeight: 30 }}>{item.headline
//             }</Text>

//             <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', }}>

//               <Text numberOfLines={1} style={{ color: 'white', fontWeight: '400', fontSize: 14, marginTop: 3, width: '65%', }}>Category: {item.category
//               }


//               </Text>
//               <View style={{ width: '30%' }}>
//                 <Text style={{ color: 'white', fontWeight: '400', fontSize: 12, marginTop: 3, textAlign: 'right' }}>
//                   {item.created_date.slice(0, 11)}

//                 </Text>
//               </View>
//             </View>
//           </View>
//           {/* </LinearGradient> */}
//         </View >
//       </>
//     );
//   }
//   const renderPagination = (activeIndex) => {
//     return (
//       <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
//         {introSliderData.map((_, index) => (
//           <View
//             key={index}
//             style={{
//               backgroundColor: activeIndex === index ? '#FFC40C' : '#D9D9D9',
//               height: 9,
//               width: 9,
//               borderRadius: 30,
//               marginHorizontal: 5,
//             }}
//           />
//         ))}
//       </View>
//     );
//   };
//   // invention_suggested
//   const ArtCategory = async (getnwPage = false) => {
//     console.log('my art is called');
//     console.log('Current page:', page); // Add a debug log for the current page
//     setLoading(true);

//     // Calculate the new page value based on the getnwPage parameter
//     const newpage = getnwPage ? page + 1 : 1;
//     console.log('my new getnewpage', newpage);

//     // Update the fUrl with the new page value
//     var fUrl = invention_home + `?page_no=${newpage}&limit=10`;

//     try {
//       // Make the API request to fetch data
//       const { responseJson } = await requestGetApi(fUrl, '', 'GET', User.token);
//       setLoading(false);
//       console.log('responseJson.body.articles for invention', responseJson.body.articles);

//       if (responseJson.headers.success == 1) {
//         if (!getnwPage) {
//           console.log('for data 10', responseJson.body.articles);
//           generateThumb(responseJson.body.articles);
//         } else {
//           console.log('for data 4', responseJson.body.articles, newpage);

//           // Check if responseJson.body.articles is not undefined or empty before updating the page state
//           if (responseJson.body.articles && responseJson.body.articles.length > 0) {
//             generateThumb([...categoryData, ...responseJson.body.articles]);
//             setPage(newpage);
//           }
//         }

//         const latestRecordsArray = responseJson.body.articles.slice(0, 3);
//         setLatestRecords(latestRecordsArray);
//       } else {
//         setalert_sms(err);
//         setMy_Alert(true);
//       }
//     } catch (error) {
//       console.error('Error occurred during fetching data:', error);
//       setLoading(false);
//     }
//   };


//   const generateThumb = async (item) => {
//     console.log('type for the fundraiser', item);
//     setLoading2(true);

//     try {
//       const allData = await Promise.all(
//         item.map?.(async (el) => {
//           if (!el.files) {
//             return { ...el, type: "none", post_type: item.type };
//           } else if (el.files.find((js) => js.post_type == "Image")) {
//             return {
//               ...el,
//               type: "image",
//               post_type: el.type
//             };
//           } else {
//             const thumb = await createThumbnail({
//               url: el.files[0].file_url,
//               timeStamp: 1000,
//             });
//             return {
//               ...el,
//               thumb,
//               type: "video",
//               post_type: el.type


//             };
//           }
//         })
//       );

//       const data = allData;
//       console.log(' funfdraise data', data);
//       setCategorydata(data);

//     } catch (error) {
//       console.error("Error generating thumbnails:", error);
//     } finally {
//       setLoading2(false);
//     }
//   };



//   const generateThum = async (item) => {
//     // console.log('my thum for suggested', item);
//     setLoading3(true)
//     // const videos = item.filter(el => {
//     //   if (!el.files) {
//     //     return false
//     //   } else {
//     //     if (el.files.find(js => js.post_type == 'Video')) {
//     //       return true
//     //     } else {
//     //       return false
//     //     }
//     //   }
//     // })

//     const allData = await Promise.all(
//       item.map?.(async (el) => {
//         if (!el.files) {
//           return { ...el, type: "none" };
//         }
//         else if (el.files.find((js) => js.post_type == "Image")) {
//           return {
//             ...el,
//             type: "image",
//           };
//         } else {
//           // console.log("createThumbnail will be called for suggested post  ", el.files[0].file_url);
//           const thumb = await createThumbnail({
//             url: el.files[0].file_url,
//             timeStamp: 1000, // Specify the time position for the thumbnail (in milliseconds)
//           });
//           // console.log('out of thumb function');
//           return {
//             ...el,
//             thumb,
//             type: "video",
//           };
//         }
//       })

//     );


//     // console.log("allDatafor suggeste drecom", allData);
//     const data = allData
//     console.log(allData, 'data111 uuuuu');
//     setGetSuggested(data)

//     setLoading3(false)
//   };



//   const Categories = async () => {
//     setLoading(true)
//     var fUrl = creation_categories
//     var urls = '?module_id=' + '59'
//     //  console.log('my url---------->', urls)
//     if (urls != undefined) {
//       fUrl = fUrl + urls
//     }
//     // console.log("LIKE CLICK:::",isSaved);
//     const { responseJson, err } = await requestGetApi(fUrl, '', 'GET', User.token)
//     setLoading(false)
//     // console.log('response afer click of items', responseJson)
//     if (responseJson.headers.success == 1) {
//       console.log('the res after sucess of category', responseJson.body.data)
//       setCategories(responseJson.body.data)

//       // Toast.show({ text1: responseJson.headers.message });
//     } else {

//       setalert_sms(err)
//       setMy_Alert(true)
//     }
//   }

//   /////post suggested hit
//   const postsuugestion = async (items) => {
//     // console.log('kkkkk for post suggestion', items);
//     setLoading(true)
//     var fUrl = creation_addView
//     var urls = items
//     // console.log('my url---------->', urls)
//     if (urls != undefined) {
//       fUrl = fUrl + urls
//     }
//     // console.log('my url post', fUrl)
//     var data = {
//       "object_type": "article",
//       "object_id": 59
//     }
//     // console.log('====================================');
//     // console.log(data, 'my data of post');
//     // console.log('====================================');
//     const { responseJson, err } = await requestPostApi(fUrl, data, 'POST', User.token)
//     setLoading(false)
//     console.log('Post suggestion of cooking', responseJson)
//     // setIsLiked(!isLiked);
//     if (responseJson.headers.success == 1) {
//       //ArtCategory()
//       // Toast.show({ text1: responseJson.headers.message });
//     } else {
//       // console.log(responseJson.headers.message, errmshhh);
//       setalert_sms(err)
//       setMy_Alert(true)
//     }
//   }

//   const getSuggestion = async () => {
//     setLoading(true)
//     var fUrl = invention_suggested
//     // var urls = 57
//     // console.log('my url---------->', urls)
//     // if (urls != undefined) {
//     //   fUrl = fUrl + urls
//     // }
//     // console.log(' get suggestion url', fUrl)

//     // console.log('my url---------->', fUrl)

//     const { responseJson, err } = await requestGetApi(fUrl, '', 'GET', User.token)
//     setLoading(false)
//     // console.log('the res of suggested cooking post', responseJson)
//     if (responseJson.headers.success == 1) {
//       console.log('the res after sucess of post suggested1111', responseJson.body.data)
//       //setGetSuggested(responseJson.body)
//       generateThum(responseJson.body.data)
//       // setCategorydata(responseJson.body.articles)
//       // generateThumb(responseJson.body.articles)
//       // const latestRecordsArray = responseJson.body.articles.slice(0, 3);

//       // // Update the state with the latest records
//       // setLatestRecords(latestRecordsArray);
//       // Toast.show({ text1: responseJson.headers.message });
//     } else {

//       setalert_sms(err)
//       setMy_Alert(true)
//     }
//   }

//   const getReport = async () => {
//     setLoading(true)
//     const { responseJson, err } = await requestGetApi(creation_get_report, '', 'GET', User.token)
//     setLoading(false)
//     // console.log('the res of get suggest post from cooking', responseJson)
//     if (responseJson.headers.success == 1) {
//       // console.log('the res after sucess report get', responseJson.body.data)
//       setReportGet(responseJson.body.data)

//     } else {

//       setalert_sms(err)
//       setMy_Alert(true)
//     }
//   }

//   const postReport = async (items) => {
//     // console.log('kkkkk', items);
//     if (selectedReasonId === null) {
//       Toast.show({ text1: 'Select a reason for report' });
//       return; // Exit the function to prevent further execution
//     }

//     setLoading(true);
//     var fUrl = creation_post_report;
//     var urls = myArticle;
//     // console.log('my url---------->', urls);
//     if (urls !== undefined) {
//       fUrl = fUrl + urls;
//     }
//     var data = {
//       report_id: items,
//       comment: ""
//     };

//     const { responseJson, err } = await requestPostApi(fUrl, data, 'POST', User.token);
//     setLoading(false);
//     // console.log('the res of report from cooking', responseJson);
//     setShowReportModal(false);

//     if (responseJson.headers.success === 1) {
//       Toast.show({ text1: responseJson.headers.message });
//       setSelectedReasonId(null);
//       // console.log('report post article', responseJson);
//     } else {
//       setalert_sms(err);
//       setMy_Alert(true);
//     }
//   }

//   const handleLoadMore = () => {

//     // console.log('handel more caledd???????');
//     ArtCategory(true)
//   };
//   const renderFooter = () => {
//     // console.log('render fotter called?????');
//     return loading ? (
//       <View style={{ marginTop: 10, alignItems: "center" }}>
//         <ActivityIndicator size="large" color="#1f1f1f" />
//       </View>
//     ) : null;
//   };
//   const toggleModal = (state) => {
//     console.log('state', state);
//     setShowModal({
//       isVisible: state.isVisible,
//       data: state.data,
//     });
//   };

//   const daysLeft = () => {
//     const creatdDate = new Date();
//     console.log(createdDate, 'llllllllcreatedDate');
//     const expiryDat = new Date(responseJson.body.data.expiry_date);

//     // Calculate the time difference in milliseconds
//     const timeDifference = expiryDat - creatdDate;

//     // Convert milliseconds to days
//     const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
//     console.log('daysDifference', daysDifference);
//     setDays(daysDifference)

//   }

//   return (
//     <SafeAreaView scrollEnabled={scrollEnabled} style={{ backgroundColor: '#F8F8F8', }}>
//       <ScrollView style={{
//         // zIndex: -999,
//       }} showsVerticalScrollIndicator={false}
//         showsHorizontalScrollIndicator={false} >
//         <HomeHeaderRoundBottom height={100} extraStyle={{ paddingtop: 10, paddingBottom: 25 }} paddingHorizontal={15} borderBottomLeftRadius={20} borderBottomRightRadius={20} backgroundColor='#FFC40C'
//           press1={() => { props.navigation.goBack() }} img1={require('../../../assets/images/service-header-back-button.png')} img1width={25} img1height={18}
//           press2={() => { }} title2={'Invention'} fontWeight={'500'} img2height={20} color={'#fff'}
//           press3={() => { props.navigation.navigate('InventionNotifications') }} img3={require('../../../assets/images/fashion-bell-icon.png')} img3width={25} img3height={22}
//           press4={() => { props.navigation.navigate('InventionProfile') }} img4={require('../../../assets/People/PeopleProfileIConModal.png')} img4width={25} img4height={22}
//         />
//         <View style={{ top: -20, width: '90%', alignSelf: 'center' }} >

//           <ArtSearch marginTop={0}
//             // serchValue={searchValue}

//             searchIcon={require('../../../assets/Art/CreationArtSearch.png')}
//             // onChangeText={(e) => { setsearchValue(e) }}
//             press={() => { props.navigation.navigate('InventionCategories', { cat_name: {}, from: 'seach' }) }}
//             // presssearch={() => { Alert.alert('Search Pressed') }}
//             paddingLeft={20} />

//         </View>

//         <View style={{
//           flex: 1, width: '90%',
//           marginLeft: 'auto',
//           marginRight: 'auto',
//           backgroundColor: '#F8F8F8',

//         }}>
//           <View style={{ width: dimensions.SCREEN_WIDTH * 0.9, alignSelf: 'flex-start', marginTop: 0, marginBottom: 10, marginTop: 10, zIndex: 999 }}>
//             <FlatList
//               data={categories}
//               showsHorizontalScrollIndicator={true}

//               horizontal
//               renderItem={({ item, index }) => {
//                 console.log('item for render item', item)
//                 return (

//                   <TouchableOpacity
//                     style={{
//                       height: 140,
//                       marginRight: 15,
//                       position: 'relative',
//                       width: 140,
//                       borderRadius: 10,
//                       overflow: 'hidden', // Clip content that exceeds the borderRadius
//                     }}
//                     onPress={() => {
//                       props.navigation.navigate('InventionCategories', { cat_name: item, from: 'bycategory' });
//                     }}
//                   >
//                     <LinearGradient
//                       colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.43)']}
//                       style={{
//                         width: '100%',
//                         height: '100%',
//                         position: 'absolute',
//                         zIndex: 1,
//                         borderRadius: 10, // Apply the borderRadius to the LinearGradient
//                       }}
//                     >
//                       <View
//                         style={{
//                           flex: 1,
//                           flexDirection: 'column',
//                           justifyContent: 'flex-end',
//                           alignItems: 'center',
//                           marginBottom: 20,
//                         }}
//                       >
//                         <Text style={{ fontSize: 14, fontWeight: '500', color: '#fff' }}>{item?.name}</Text>
//                       </View>
//                     </LinearGradient>
//                     <Image
//                       source={{ uri: item.image }}
//                       style={{
//                         width: '100%',
//                         height: '100%',
//                         position: 'absolute',
//                         borderRadius: 10, // Apply the same borderRadius to the image
//                       }}
//                       resizeMode='cover'
//                     />
//                   </TouchableOpacity>
//                 )
//               }}
//               keyExtractor={item => item.id}
//             />
//           </View>

//           <View style={{ marginTop: 20, width: '100%', justifyContent: 'center', alignItems: 'center', }}>
//             {categoryData.length > 0 ?

//               <AppIntroSlider
//                 data={categoryData.slice(0, 3)}
//                 renderItem={_renderItem}
//                 renderDoneButton={() => <View />}
//                 renderNextButton={() => <View />}
//                 activeDotStyle={{
//                   backgroundColor: '#29913C',
//                   height: 9,
//                   width: 9,
//                   borderRadius: 30,
//                   position: 'absolute',
//                   top: 20,
//                 }}
//                 dotStyle={{
//                   backgroundColor: '#fff',
//                   height: 9,
//                   width: 9,
//                   borderRadius: 30,
//                   position: 'absolute',
//                   top: 20,
//                 }}
//                 renderPagination={renderPagination}
//                 keyExtractor={(item) => item.id}
//               />
//               : null}
//           </View>
//           <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10, marginTop: 35 }}>
//             <Text style={{ fontSize: 16, fontWeight: '500', color: '#263238' }}>Fundraiser</Text>
//             <TouchableOpacity onPress={() => {



//               props.navigation.navigate('InventionFundRaiserAll')
//             }} >
//               <Text style={{ fontSize: 13, fontWeight: '400', color: '#FFC40C' }}>View all</Text>
//             </TouchableOpacity>
//           </View>

//           <View style={{ width: dimensions.SCREEN_WIDTH * 0.9, alignSelf: 'flex-start', marginTop: 0, marginBottom: 10, marginTop: 10, height: 330 }}>
//             {console.log('jjjjjjjjchec k categoryData', categoryData)
//             }

//             {categoryData.length == 0 ? <>
//               <Image source={require('../../../assets/Art/NoPostStartup.png')} style={{ alignSelf: 'center', justifyContent: 'center', marginTop: '30%' }}></Image>
//               <Text style={{ textAlign: 'center', fontSize: 16, color: 'black', marginTop: 12 }}>
//                 No data found
//               </Text>
//             </>
//               : <FlatList
//                 data={categoryData.filter(el => el.post_type === 'Fundraiser')}
//                 //data={categoryData}
//                 showsHorizontalScrollIndicator={true}
//                 horizontal
//                 keyExtractor={(item) => item.id.toString()}
//                 renderItem={({ item, index }) => {
//                   console.log(item, 'fundraiser values');
//                   return (
//                     <View onPress={() => {
//                       props.navigation.navigate('InventionPost', { id: item.id })
//                     }}
//                       style={{ width: dimensions.SCREEN_WIDTH / 1.5, height: 500, marginRight: 15 }}>
//                       <View style={{}}>


//                         <View style={{ flexDirection: 'row', alignItems: 'center', }}>

//                         </View>

//                       </View>

//                       {/* addd new view heree */}
//                       <View style={{ width: dimensions.SCREEN_WIDTH / 1.5, alignSelf: 'center', }}>
//                         <View style={{ justifyContent: 'flex-start', }}>
//                           <ScrollView horizontal contentContainerStyle={styles.scrollViewContent}>

//                             {item.type == 'video' ?
//                               <TouchableOpacity onPress={() => setShowModal({
//                                 isVisible: true,
//                                 data: item.files[0],
//                               })}>
//                                 <ImageBackground source={{ uri: item.thumb.path }} style={{
//                                   width: dimensions.SCREEN_WIDTH / 1.5, height: 160, alignSelf: 'center', justifyContent: 'center', borderRadius: 10,
//                                   overflow: 'hidden',
//                                 }} resizeMode='cover' >
//                                   <Image source={require('../../../assets/images/people-play-button.png')} style={{ width: '20%', height: '20%', alignSelf: 'center', }} resizeMode='contain' ></Image>
//                                 </ImageBackground>
//                               </TouchableOpacity>
//                               :
//                               <TouchableOpacity onPress={() => {
//                                 props.navigation.navigate('InventionPost', { id: item.id })
//                               }}>
//                                 <Image source={{ uri: item.cover_photo }} style={{ width: dimensions.SCREEN_WIDTH / 1.5, height: 160, borderRadius: 10 }}></Image>
//                               </TouchableOpacity>
//                               // {/* <Image source={{ uri: item.cover_photo }} style={{ width: dimensions.SCREEN_WIDTH / 1.5, height: 160, borderRadius: 10 }}></Image> */}
//                             }

//                           </ScrollView>
//                         </View>
//                       </View>


//                       <TouchableOpacity style={styles.flatlistMainBottomView} onPress={() => {
//                         props.navigation.navigate('InventionPost', { id: item.id })
//                       }}>
//                         {
//                           <View style={{ flexDirection: 'row', width: '60%', }}>
//                             <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2, marginBottom: 5 }} onPress={() => {

//                               // props.navigation.navigate('LikedUserList', { postid: item.id })
//                             }}>


//                             </TouchableOpacity>

//                           </View>


//                         }
//                         <View style={styles.flatlistBottomView}>
//                           {/* <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'pink', width: '100%' }}> */}
//                           < View style={styles.buttonsContainer} >
//                             <View style={{
//                               flexDirection: 'row',
//                               justifyContent: 'space-between',
//                               alignItems: 'center',
//                               width: '95%',

//                             }}>


//                               <Text numberOfLines={2} style={{
//                                 fontSize: 14,
//                                 fontWeight: '500',
//                                 color: 'black',

//                                 width: '65%',
//                                 textAlign: 'left',
//                                 marginVertical: 8

//                               }}>{item.headline} </Text>
//                               <View style={{ alignSelf: 'center', width: '30%', textAlign: 'top', textAlign: 'right' }} >
//                                 <Text style={{ fontSize: 14, fontWeight: '400', color: '#FFC40C', flexShrink: 1, textAlign: 'right' }}>
//                                   {item.category}
//                                 </Text>


//                               </View>


//                             </View>

//                             {item.post_type == 'Fundraiser' ? < View >
//                               <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, paddingVertical: 3, width: dimensions.SCREEN_WIDTH * 0.60 }}>
//                                 <Text style={{ fontSize: 14, color: 'black', fontWeight: '500' }}>{item.total_amount_raised} <Text style={{ fontSize: 14, color: 'gray', fontWeight: '400' }}> USD</Text></Text>
//                                 <Text style={{ fontSize: 14, color: 'black', fontWeight: '500' }}>{item.totalLikes} <Text style={{ fontSize: 14, color: 'gray', fontWeight: '400' }}>backers</Text></Text>
//                               </View>
//                               <ProgressBar height={15} width={dimensions.SCREEN_WIDTH * 0.60} backgroundColor={'#E0E0E0'} borderColor={'#E0E0E0'} progress={item.total_amount_raised / item.project_estimate} color={'#FFC40C'} borderRadius={10} />
//                               <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 3, paddingHorizontal: 3 }}>
//                                 <Text style={{ fontWeight: '400', fontSize: 14, color: 'black' }}>{((item.total_amount_raised / item.project_estimate) * 100).toFixed(0)}% of {'$' + item.project_estimate} <Text style={{ fontSize: 14, color: 'black', fontWeight: '500', }}></Text></Text>
//                                 <Text style={{ fontSize: 14, color: 'black', fontWeight: '500' }}>{Math.floor(Math.floor((new Date(item.expiry_date)) - new Date()) / (1000 * 60 * 60 * 24))}<Text style={{ fontSize: 14, color: 'gray', fontWeight: '400' }}> days left</Text> </Text>

//                               </View>
//                             </View> : null
//                             }
//                           </View>
//                           {/* </View> */}
//                           <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//                             <View style={{ marginRight: 10 }}>

//                             </View>

//                           </View>
//                         </View>


//                       </TouchableOpacity>
//                     </View>
//                   );
//                 }}
//               />}
//           </View>
//           <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 20, marginBottom: 10 }}>
//             <Text style={{ fontSize: 16, fontWeight: '500', color: '#263238' }}>Around the world</Text>
//             <TouchableOpacity onPress={() => { props.navigation.navigate('InventionViewAll') }}>
//               <Text style={{ fontSize: 13, fontWeight: '400', color: '#FFC40C' }}>View all</Text>
//             </TouchableOpacity>
//           </View>

//           <View style={{ width: dimensions.SCREEN_WIDTH * 0.9, alignSelf: 'flex-start', marginTop: 10, height: 300, zIndex: 999 }}>

//             <ScrollView showsVerticalScrollIndicator={false}
//               showsHorizontalScrollIndicator={false} nestedScrollEnabled={true} scroolToEnd={true} ref={scrollViewRef}
//               onScroll={(event) => {
//                 const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
//                 const isAtEnd = layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;
//                 if (isAtEnd) {
//                   // console.log('is function reached on end')
//                   handleLoadMore();
//                 }
//               }}
//             >
//               <View>
//                 {categoryData.length == 0 ?

//                   <>
//                     <Image source={require('../../../assets/Art/NoPostStartup.png')} style={{ alignSelf: 'center', justifyContent: 'center', marginTop: '30%' }}></Image>
//                     <Text style={{ textAlign: 'center', fontSize: 16, color: 'black', marginTop: 12 }}>
//                       No data found
//                     </Text>
//                   </>
//                   : <FlatList

//                     style={{}}
//                     data={categoryData}
//                     // data={categoryData}
//                     // ref={scrollRef}
//                     showsHorizontalScrollIndicator={true}
//                     // onEndReachedThreshold={0.9}
//                     // onEndReached={
//                     //   handleLoadMore
//                     // }
//                     //ListFooterComponent={renderFooter}
//                     // ListFooterComponent={() => (<Text style={{ fontSize: 30, textAlign: "center", marginBottom: 20, fontWeight: 'bold', color: 'black' }}>Load More</Text>)}

//                     renderItem={({ item, index }) => {
//                       console.log('category item for around the world', item.post_type)
//                       let videoUrl = null; // Declare and initialize the videoUrl variable

//                       if (item.type === "video") {
//                         // Get the video URL from the files array
//                         videoUrl = item.files[0]?.file_url; // Assuming the URL is stored in the 'url' property of the file object
//                       }
//                       // console.log();
//                       return (

//                         <>
//                           <TouchableOpacity style={{ width: dimensions.SCREEN_WIDTH, marginRight: 15, flexDirection: 'row', marginBottom: 20, }}
//                             onPress={() => {
//                               postsuugestion(item.id)
//                               props.navigation.navigate('InventionPost', { id: item.id })

//                             }}>
//                             <TouchableOpacity onPress={() => {
//                               setStartFromIndex(index);
//                               setSelectedID(item.id)
//                               item.type === "video" ? setShowModal({
//                                 isVisible: true,
//                                 data: item.files[0],
//                               }) : props.navigation.navigate('InventionsPost', { id: item.id })

//                             }}>
//                               {item.type == 'video' ?

//                                 <ImageBackground source={{ uri: item.thumb.path }} style={{
//                                   width: dimensions.SCREEN_WIDTH / 2.5, height: 105, alignSelf: 'center', justifyContent: 'center', borderRadius: 10,
//                                   overflow: 'hidden',
//                                 }} resizeMode='cover' >
//                                   <Image source={require('../../../assets/images/people-play-button.png')} style={{ width: '20%', height: '20%', alignSelf: 'center', }} resizeMode='contain' ></Image>
//                                 </ImageBackground>
//                                 : <Image source={{
//                                   uri: item.cover_photo
//                                 }} style={{ width: dimensions.SCREEN_WIDTH / 2.5, height: 105, borderRadius: 10, }} resizeMode='cover'></Image>}

//                             </TouchableOpacity>
//                             <View style={{ flexDirection: 'column', width: dimensions.SCREEN_WIDTH / 2, }}>
//                               <View style={{ flex: 1, marginTop: 4, marginLeft: 7, width: dimensions.SCREEN_WIDTH / 2.2, }}>
//                                 <Text numberOfLines={2} style={{ fontSize: 14, fontWeight: '400', color: '#000000' }}>
//                                   {item.headline}
//                                 </Text>
//                               </View>
//                               <Text style={{ fontSize: 12, fontWeight: '400', color: '#FFC40C', paddingHorizontal: 9, marginVertical: 4 }}>{item.post_type}</Text>
//                               <View style={{ flexDirection: 'row', width: dimensions.SCREEN_WIDTH / 2.1, }}>

//                                 <Text style={{ fontSize: 12, fontWeight: '400', color: 'black', paddingHorizontal: 9 }}>
//                                   Category :
//                                 </Text>
//                                 <Text style={{ fontSize: 12, fontWeight: '400', color: '#FFC40C', flexShrink: 1 }}>
//                                   {item.category}
//                                 </Text>
//                               </View>
//                               {/* <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
//                               <Text style={{ fontSize: 12, fontWeight: '400', color: 'black', marginLeft: 6 }}>
//                                 <Text style={{ fontSize: 12, fontWeight: '400', color: '#B4BBC6', marginLeft: 6, width: dimensions.SCREEN_WIDTH / 2.1 }}>Author: {item.username}</Text>
//                               </Text>
//                             </View> */}
//                               <View style={{ flexDirection: 'row', marginTop: 2, width: dimensions.SCREEN_WIDTH / 2.1, }}>
//                                 <Text style={{ fontSize: 12, fontWeight: '400', color: 'black', paddingHorizontal: 9 }}>
//                                   Author :
//                                 </Text>
//                                 <Text style={{ fontSize: 12, fontWeight: '400', color: '#B4BBC6', marginLeft: 6, width: dimensions.SCREEN_WIDTH / 2.1 }}>
//                                   {item.username}
//                                 </Text>
//                               </View>
//                               <Text style={{ fontSize: 12, fontWeight: '400', color: 'black', marginLeft: 6, width: dimensions.SCREEN_WIDTH / 2.1, paddingHorizontal: 5 }}>
//                                 Published Date: <Text style={{ fontSize: 12, fontWeight: '400', color: '#B4BBC6', textAlign: 'left', }}>{item.created_date.slice(0, 11)}</Text>
//                               </Text>

//                               <View style={styles.buttonsRow}>
//                                 {/* Your TouchableOpacity components */}
//                               </View>
//                             </View>
//                           </TouchableOpacity >
//                           <View style={{ borderBottomWidth: 1, borderBottomColor: '#D9D9D9', height: 1, width: '100%', marginBottom: 20 }}></View>
//                         </>
//                       )
//                     }}
//                     keyExtractor={item => item.id}

//                   />}
//               </View>
//             </ScrollView>
//           </View>

//           <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10, marginTop: 35 }}>
//             <Text style={{ fontSize: 16, fontWeight: '500', color: '#263238' }}>Recommended for you</Text>
//             <TouchableOpacity onPress={() => {



//               props.navigation.navigate('AllInventionSuggested')
//             }} >
//               <Text style={{ fontSize: 13, fontWeight: '400', color: '#FFC40C' }}>View all</Text>
//             </TouchableOpacity>
//           </View>

//           <View style={{
//             width: dimensions.SCREEN_WIDTH * 0.9, alignSelf: 'flex-start', marginTop: 0, marginBottom: 10, marginTop: 10, height: 350,
//           }}>
//             {/* {console.log('jjjjjjjjcheck', getSuggested)
//             } */}
//             {getSuggested.length == 0 ?

//               // <FlatList
//               //   data={categoryData}
//               //   //data={categoryData}
//               //   showsHorizontalScrollIndicator={true}
//               //   horizontal
//               //   keyExtractor={(item) => item.id.toString()}
//               //   renderItem={({ item, index }) => {
//               //     console.log(item.total_amount_raised, 'my updated by thumb on data');
//               //     return (
//               //       <View onPress={() => {
//               //         props.navigation.navigate('InventionPost', { id: item.id })
//               //       }}
//               //         style={{ width: dimensions.SCREEN_WIDTH / 1.5, height: 500, marginRight: 15 }}>
//               //         <View style={{}}>


//               //           <View style={{ flexDirection: 'row', alignItems: 'center', }}>

//               //           </View>

//               //         </View>

//               //         {/* addd new view heree */}
//               //         <View style={{ width: dimensions.SCREEN_WIDTH / 1.5, alignSelf: 'center', }}>
//               //           <View style={{ justifyContent: 'flex-start', }}>
//               //             <ScrollView horizontal contentContainerStyle={styles.scrollViewContent}>

//               //               {item.type == 'video' ?
//               //                 <TouchableOpacity onPress={() => setShowModal({
//               //                   isVisible: true,
//               //                   data: item.files[0],
//               //                 })}>
//               //                   <ImageBackground source={{ uri: item.thumb.path }} style={{
//               //                     width: dimensions.SCREEN_WIDTH / 1.5, height: 160, alignSelf: 'center', justifyContent: 'center', borderRadius: 10,
//               //                     overflow: 'hidden',
//               //                   }} resizeMode='cover' >
//               //                     <Image source={require('../../../assets/images/people-play-button.png')} style={{ width: '20%', height: '20%', alignSelf: 'center', }} resizeMode='contain' ></Image>
//               //                   </ImageBackground>
//               //                 </TouchableOpacity>
//               //                 :
//               //                 <TouchableOpacity onPress={() => {
//               //                   props.navigation.navigate('InventionPost', { id: item.id })
//               //                 }}>
//               //                   <Image source={{ uri: item.cover_photo }} style={{ width: dimensions.SCREEN_WIDTH / 1.5, height: 160, borderRadius: 10 }}></Image>
//               //                 </TouchableOpacity>
//               //                 // {/* <Image source={{ uri: item.cover_photo }} style={{ width: dimensions.SCREEN_WIDTH / 1.5, height: 160, borderRadius: 10 }}></Image> */}
//               //               }

//               //             </ScrollView>
//               //           </View>
//               //         </View>


//               //         <TouchableOpacity style={styles.flatlistMainBottomView} onPress={() => {
//               //           props.navigation.navigate('InventionPost', { id: item.id })
//               //         }}>
//               //           {
//               //             <View style={{ flexDirection: 'row', width: '60%', }}>
//               //               <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2, marginBottom: 5 }} onPress={() => {

//               //                 // props.navigation.navigate('LikedUserList', { postid: item.id })
//               //               }}>


//               //               </TouchableOpacity>

//               //             </View>


//               //           }
//               //           <View style={{
//               //             flexDirection: 'row',
//               //             alignItems: 'center',
//               //             justifyContent: 'space-between',

//               //             height: 80
//               //           }}>
//               //             {/* <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'pink', width: '100%' }}> */}
//               //             < View style={{
//               //               alignItems: 'center',

//               //               width: '100%',
//               //               justifyContent: 'space-between',
//               //               marginTop: -12,
//               //             }} >
//               //               <View style={{
//               //                 flexDirection: 'row',
//               //                 justifyContent: 'space-between',
//               //                 alignItems: 'center',
//               //                 width: '95%',

//               //               }}>


//               //                 <Text numberOfLines={2} style={{
//               //                   fontSize: 14,
//               //                   fontWeight: '500',
//               //                   color: 'black',
//               //                   marginTop: 12,
//               //                   width: '65%',
//               //                   textAlign: 'left',

//               //                 }}>{item.headline} </Text>
//               //                 <View style={{ alignSelf: 'center', width: '30%', textAlign: 'top', textAlign: 'right' }} >
//               //                   <Text style={{ fontSize: 14, fontWeight: '400', color: '#FFC40C', flexShrink: 1, textAlign: 'right' }}>
//               //                     {item.category}
//               //                   </Text>


//               //                 </View>


//               //               </View>

//               //               {item.post_type == 'Fundraiser' ? < View >
//               //                 <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, paddingVertical: 3, width: dimensions.SCREEN_WIDTH * 0.60 }}>
//               //                   <Text style={{ fontSize: 14, color: 'black', fontWeight: '500' }}>{item.total_amount_raised} <Text style={{ fontSize: 14, color: 'gray', fontWeight: '400' }}> USD</Text></Text>
//               //                   <Text style={{ fontSize: 14, color: 'black', fontWeight: '500' }}>{item.totalLikes} <Text style={{ fontSize: 14, color: 'gray', fontWeight: '400' }}>backers</Text></Text>
//               //                 </View>
//               //                 <ProgressBar height={15} width={dimensions.SCREEN_WIDTH * 0.60} backgroundColor={'#E0E0E0'} borderColor={'#E0E0E0'} progress={item.total_amount_raised / item.project_estimate} color={'#FFC40C'} borderRadius={10} />
//               //                 <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 3, paddingHorizontal: 3 }}>
//               //                   <Text style={{ fontWeight: '400', fontSize: 14, color: 'black' }}>{((item.total_amount_raised / item.project_estimate) * 100).toFixed(0)}% of {'$' + item.project_estimate} <Text style={{ fontSize: 14, color: 'black', fontWeight: '500', }}></Text></Text>
//               //                   <Text style={{ fontSize: 14, color: 'black', fontWeight: '500' }}>{Math.floor(Math.floor((new Date(item.expiry_date)) - new Date()) / (1000 * 60 * 60 * 24))}<Text style={{ fontSize: 14, color: 'gray', fontWeight: '400' }}> days left</Text> </Text>

//               //                 </View>
//               //               </View> : null
//               //               }

//               //             </View>

//               //             {/* </View> */}
//               //             <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//               //               <View style={{ marginRight: 10 }}>

//               //               </View>

//               //             </View>
//               //           </View>
//               //           <View style={{ flexDirection: 'row' }}>
//               //             <View >
//               //               <View style={{ flexDirection: 'row', }}>
//               //                 {item.post_type != 'Fundraiser' ? < View style={{
//               //                   alignItems: 'center',

//               //                   width: '100%',
//               //                   justifyContent: 'space-between',
//               //                   marginTop: -12, flexDirection: 'row'
//               //                 }} >
//               //                   <View style={styles.buttonView}>
//               //                     <Image
//               //                       source={require('../../../assets/images/fashion-dark-like-button.png')}
//               //                       style={styles.buttonIcon}
//               //                     />

//               //                     <Text style={styles.buttonText}>{item.totalLikes} Likes</Text>

//               //                   </View>
//               //                   <View style={styles.buttonView}>
//               //                     <Image
//               //                       source={require('../../../assets/images/fashion-dark-dislike-button.png')}
//               //                       style={styles.buttonIcon}
//               //                     />

//               //                     <Text style={styles.buttonText}>{item.totalDislikes} Dislikes</Text>
//               //                   </View>
//               //                   <View style={styles.buttonView}>
//               //                     <Image
//               //                       source={require('../../../assets/People/commentPostPeople.png')}
//               //                       style={styles.buttonIcon}
//               //                     />

//               //                     <Text style={styles.buttonText}>{item.totalComments
//               //                     } Comments</Text>
//               //                   </View>
//               //                 </View> : null}
//               //               </View>
//               //               <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//               //                 <View style={{ marginRight: 10 }}>

//               //                 </View>

//               //               </View>
//               //             </View>
//               //           </View>

//               //         </TouchableOpacity>
//               //       </View>
//               //     );
//               //   }}
//               // />
//               <FlatList
//                 showsVerticalScrollIndicator={false}
//                 horizontal
//                 data={categoryData}
//                 showsHorizontalScrollIndicator={false}
//                 numColumns={1}
//                 style={{}}

//                 // ListFooterComponent={renderFooter}

//                 renderItem={({ item, index }) => {
//                   console.log(item.post_type
//                     , 'my itemsssss for profilee');
//                   item?.files?.map((image, index) => (
//                     // console.log(item, 'my file url')
//                     {}
//                   )
//                   )
//                   return (

//                     <View
//                       // onPress={() => {
//                       //     props.navigation.navigate('StartupPost', { id: item.id })
//                       // }}
//                       style={{ width: dimensions.SCREEN_WIDTH / 1.5, height: 'auto', marginRight: 15, }}>


//                       {/* addd new view heree */}
//                       <View style={{ width: dimensions.SCREEN_WIDTH, }}>
//                         <View style={{ width: dimensions.SCREEN_WIDTH / 1.5, }}>
//                           <View style={{ justifyContent: 'flex-start', }}>
//                             <ScrollView horizontal contentContainerStyle={styles.scrollViewContent}>

//                               {item.type == 'video' ?
//                                 <TouchableOpacity onPress={() => setShowModal({
//                                   isVisible: true,
//                                   data: item.files[0],
//                                 })}>
//                                   <ImageBackground source={{ uri: item.thumb.path }} style={{
//                                     width: dimensions.SCREEN_WIDTH / 1.5, height: 160, alignSelf: 'center', justifyContent: 'center', borderRadius: 10,
//                                     overflow: 'hidden',
//                                   }} resizeMode='cover' >
//                                     <Image source={require('../../../assets/images/people-play-button.png')} style={{ width: '20%', height: '20%', alignSelf: 'center', }} resizeMode='contain' ></Image>
//                                   </ImageBackground>
//                                 </TouchableOpacity>
//                                 :
//                                 <TouchableOpacity onPress={() => {
//                                   props.navigation.navigate('InventionPost', { id: item.id })
//                                 }}>
//                                   <Image source={{ uri: item.cover_photo }} style={{ width: dimensions.SCREEN_WIDTH / 1.5, height: 160, borderRadius: 10 }}></Image>
//                                 </TouchableOpacity>
//                                 // {/* <Image source={{ uri: item.cover_photo }} style={{ width: dimensions.SCREEN_WIDTH / 1.5, height: 160, borderRadius: 10 }}></Image> */}
//                               }

//                             </ScrollView>
//                           </View>
//                         </View>

//                       </View>


//                       <TouchableOpacity style={styles.flatlistMainBottomView} onPress={() => {
//                         props.navigation.navigate('InventionPost', { id: item.id })
//                       }}>
//                         {
//                           <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 10, justifyContent: 'center', width: '93%' }}>
//                             <View style={{ flexDirection: 'row', alignItems: 'center', }} >
//                               <View style={{
//                                 flexDirection: 'row',
//                                 justifyContent: 'space-between',
//                                 width: '100%',
//                                 marginVertical: 7

//                               }}>
//                                 <Text numberOfLines={2} style={{

//                                   width: '59%', fontSize: 14,
//                                   fontWeight: '400',
//                                   color: '#263238',

//                                   justifyContent: 'flex-start',
//                                   textAlign: 'left',



//                                 }}>

//                                   {item.headline}

//                                 </Text>
//                                 <Text style={{ width: '35%', textAlign: 'right', color: '#FFC40C' }}>
//                                   {item.category}

//                                 </Text>
//                               </View>
//                             </View>
//                           </View>

//                         }
//                         <View style={{ flexDirection: 'row' }}>
//                           <View style={{
//                             flexDirection: 'row',
//                             alignItems: 'center',
//                             justifyContent: 'space-between',
//                             marginBottom: 12,
//                             marginVertical: 4
//                           }}>
//                             <View style={{ flexDirection: 'row', alignItems: 'center', }}>
//                               {item.post_type != 'Fundraiser' ? < View style={{
//                                 alignItems: 'center',
//                                 flexDirection: 'row',
//                                 width: '80%',
//                                 justifyContent: 'space-between',
//                                 marginTop: 2,

//                                 marginHorizontal: 12
//                               }} >
//                                 <View style={{
//                                   flexDirection: 'row',
//                                   alignItems: 'center',
//                                 }}>
//                                   <Image
//                                     source={require('../../../assets/images/fashion-dark-like-button.png')}
//                                     style={styles.buttonIcon}
//                                   />

//                                   <Text style={styles.buttonText}>{item.totalLikes} Likes</Text>

//                                 </View>
//                                 <View style={styles.buttonView}>
//                                   <Image
//                                     source={require('../../../assets/images/fashion-dark-dislike-button.png')}
//                                     style={styles.buttonIcon}
//                                   />

//                                   <Text style={styles.buttonText}>{item.totalDislikes} Dislikes</Text>
//                                 </View>
//                                 <View style={styles.buttonView}>
//                                   <Image
//                                     source={require('../../../assets/People/commentPostPeople.png')}
//                                     style={styles.buttonIcon}
//                                   />

//                                   <Text style={styles.buttonText}>{item.totalComments
//                                   } Comments</Text>
//                                 </View>
//                               </View> : null}
//                             </View>
//                             <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//                               <View style={{ marginRight: 10 }}>

//                               </View>

//                             </View>
//                           </View>
//                         </View>
//                         {item.post_type == 'Fundraiser' ? < View >
//                           <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: dimensions.SCREEN_WIDTH * 0.66, paddingHorizontal: 12, }}>
//                             <Text style={{ fontSize: 14, color: 'black', fontWeight: '500' }}>{item.project_estimate} <Text style={{ fontSize: 14, color: 'gray', fontWeight: '400' }}> USD</Text></Text>
//                             <Text style={{ fontSize: 14, color: 'black', fontWeight: '500' }}>{3} <Text style={{ fontSize: 14, color: 'gray', fontWeight: '400' }}>backers</Text></Text>
//                           </View>
//                           <ProgressBar height={15} width={dimensions.SCREEN_WIDTH * 0.60} backgroundColor={'#E0E0E0'} borderColor={'#E0E0E0'} progress={item.total_amount_raised / item.project_estimate} color={'#FFC40C'} borderRadius={10} marginLeft={12} />
//                           <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: dimensions.SCREEN_WIDTH * 0.67, paddingVertical: 3, paddingHorizontal: 15, marginBottom: 12 }}>
//                             <Text style={{ fontWeight: '400', fontSize: 14, color: 'black' }}>{((item.total_amount_raised / item.project_estimate) * 100).toFixed(0)}% of {'$' + item.project_estimate} <Text style={{ fontSize: 14, color: 'black', fontWeight: '500', }}></Text></Text>
//                             <Text style={{ fontSize: 14, color: 'black', fontWeight: '500' }}>{Math.floor(Math.floor((new Date(item.expiry_date)) - new Date()) / (1000 * 60 * 60 * 24))}<Text style={{ fontSize: 14, color: 'gray', fontWeight: '400' }}> days left</Text> </Text>
//                           </View>
//                         </View> : null
//                         }

//                       </TouchableOpacity>
//                     </View>
//                   )
//                 }
//                 }
//                 keyExtractor={item => item.id}
//               />






//               :



//               <FlatList
//                 data={getSuggested}
//                 //data={categoryData}
//                 showsHorizontalScrollIndicator={true}
//                 horizontal
//                 keyExtractor={(item) => item.id.toString()}
//                 renderItem={({ item, index }) => {
//                   console.log(item.total_amount_raised, 'my updated by thumb on data');
//                   return (
//                     <View onPress={() => {
//                       props.navigation.navigate('InventionPost', { id: item.id })
//                     }}
//                       style={{ width: dimensions.SCREEN_WIDTH / 1.5, height: 500, marginRight: 15 }}>
//                       <View style={{}}>


//                         <View style={{ flexDirection: 'row', alignItems: 'center', }}>

//                         </View>

//                       </View>

//                       {/* addd new view heree */}
//                       <View style={{ width: dimensions.SCREEN_WIDTH / 1.5, alignSelf: 'center', }}>
//                         <View style={{ justifyContent: 'flex-start', }}>
//                           <ScrollView horizontal contentContainerStyle={styles.scrollViewContent}>

//                             {item.type == 'video' ?
//                               <TouchableOpacity onPress={() => setShowModal({
//                                 isVisible: true,
//                                 data: item.files[0],
//                               })}>
//                                 <ImageBackground source={{ uri: item.thumb.path }} style={{
//                                   width: dimensions.SCREEN_WIDTH / 1.5, height: 160, alignSelf: 'center', justifyContent: 'center', borderRadius: 10,
//                                   overflow: 'hidden',
//                                 }} resizeMode='cover' >
//                                   <Image source={require('../../../assets/images/people-play-button.png')} style={{ width: '20%', height: '20%', alignSelf: 'center', }} resizeMode='contain' ></Image>
//                                 </ImageBackground>
//                               </TouchableOpacity>
//                               :
//                               <TouchableOpacity onPress={() => {
//                                 props.navigation.navigate('InventionPost', { id: item.id })
//                               }}>
//                                 <Image source={{ uri: item.cover_photo }} style={{ width: dimensions.SCREEN_WIDTH / 1.5, height: 160, borderRadius: 10 }}></Image>
//                               </TouchableOpacity>
//                               // {/* <Image source={{ uri: item.cover_photo }} style={{ width: dimensions.SCREEN_WIDTH / 1.5, height: 160, borderRadius: 10 }}></Image> */}
//                             }

//                           </ScrollView>
//                         </View>
//                       </View>


//                       <TouchableOpacity style={styles.flatlistMainBottomView} onPress={() => {
//                         props.navigation.navigate('InventionPost', { id: item.id })
//                       }}>
//                         {
//                           <View style={{ flexDirection: 'row', width: '60%', }}>
//                             <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2, marginBottom: 5 }} onPress={() => {

//                               // props.navigation.navigate('LikedUserList', { postid: item.id })
//                             }}>


//                             </TouchableOpacity>

//                           </View>


//                         }
//                         <View style={{
//                           flexDirection: 'row',
//                           alignItems: 'center',
//                           justifyContent: 'space-between',

//                           height: 80
//                         }}>
//                           {/* <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'pink', width: '100%' }}> */}
//                           < View style={{
//                             alignItems: 'center',

//                             width: '100%',
//                             justifyContent: 'space-between',
//                             marginTop: -12,
//                           }} >
//                             <View style={{
//                               flexDirection: 'row',
//                               justifyContent: 'space-between',
//                               alignItems: 'center',
//                               width: '95%',

//                             }}>


//                               <Text numberOfLines={2} style={{
//                                 fontSize: 14,
//                                 fontWeight: '500',
//                                 color: 'black',
//                                 marginTop: 12,
//                                 width: '65%',
//                                 textAlign: 'left',

//                               }}>{item.headline} </Text>
//                               <View style={{ alignSelf: 'center', width: '30%', textAlign: 'top', textAlign: 'right' }} >
//                                 <Text style={{ fontSize: 14, fontWeight: '400', color: '#FFC40C', flexShrink: 1, textAlign: 'right' }}>
//                                   {item.category}
//                                 </Text>


//                               </View>


//                             </View>

//                             {item.post_type == 'Fundraiser' ? < View >
//                               <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, paddingVertical: 3, width: dimensions.SCREEN_WIDTH * 0.60 }}>
//                                 <Text style={{ fontSize: 14, color: 'black', fontWeight: '500' }}>{item.total_amount_raised} <Text style={{ fontSize: 14, color: 'gray', fontWeight: '400' }}> USD</Text></Text>
//                                 <Text style={{ fontSize: 14, color: 'black', fontWeight: '500' }}>{item.totalLikes} <Text style={{ fontSize: 14, color: 'gray', fontWeight: '400' }}>backers</Text></Text>
//                               </View>
//                               <ProgressBar height={15} width={dimensions.SCREEN_WIDTH * 0.60} backgroundColor={'#E0E0E0'} borderColor={'#E0E0E0'} progress={item.total_amount_raised / item.project_estimate} color={'#FFC40C'} borderRadius={10} />
//                               <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 3, paddingHorizontal: 3 }}>
//                                 <Text style={{ fontWeight: '400', fontSize: 14, color: 'black' }}>{((item.total_amount_raised / item.project_estimate) * 100).toFixed(0)}% of {'$' + item.project_estimate} <Text style={{ fontSize: 14, color: 'black', fontWeight: '500', }}></Text></Text>
//                                 <Text style={{ fontSize: 14, color: 'black', fontWeight: '500' }}>{Math.floor(Math.floor((new Date(item.expiry_date)) - new Date()) / (1000 * 60 * 60 * 24))}<Text style={{ fontSize: 14, color: 'gray', fontWeight: '400' }}> days left</Text> </Text>

//                               </View>
//                             </View> : null
//                             }

//                           </View>

//                           {/* </View> */}
//                           <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//                             <View style={{ marginRight: 10 }}>

//                             </View>

//                           </View>
//                         </View>
//                         <View style={{ flexDirection: 'row' }}>
//                           <View >
//                             <View style={{ flexDirection: 'row', }}>
//                               {item.post_type != 'Fundraiser' ? < View style={{
//                                 alignItems: 'center',

//                                 width: '100%',
//                                 justifyContent: 'space-between',
//                                 marginTop: -12, flexDirection: 'row'
//                               }} >
//                                 <View style={styles.buttonView}>
//                                   <Image
//                                     source={require('../../../assets/images/fashion-dark-like-button.png')}
//                                     style={styles.buttonIcon}
//                                   />

//                                   <Text style={styles.buttonText}>{item.totalLikes} Likes</Text>

//                                 </View>
//                                 <View style={styles.buttonView}>
//                                   <Image
//                                     source={require('../../../assets/images/fashion-dark-dislike-button.png')}
//                                     style={styles.buttonIcon}
//                                   />

//                                   <Text style={styles.buttonText}>{item.totalDislikes} Dislikes</Text>
//                                 </View>
//                                 <View style={styles.buttonView}>
//                                   <Image
//                                     source={require('../../../assets/People/commentPostPeople.png')}
//                                     style={styles.buttonIcon}
//                                   />

//                                   <Text style={styles.buttonText}>{item.totalComments
//                                   } Comments</Text>
//                                 </View>
//                               </View> : null}
//                             </View>
//                             <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//                               <View style={{ marginRight: 10 }}>

//                               </View>

//                             </View>
//                           </View>
//                         </View>

//                       </TouchableOpacity>
//                     </View>
//                   );
//                 }}
//               />}
//           </View>





//         </View>


//         {/* <View style={{ height: 100 }} /> */}
//         {/* </ScrollView> */}

//         {/* <TouchableOpacity onPress={()=>props.navigation.navigate('ShopProdCart')} style={{width:'80%',height:60,flexDirection:'row',justifyContent:'flex-end',position:'absolute',bottom:40, right:20, shadowColor: '#FFD037', shadowOffset: {width: 0,height: 3},shadowRadius: 1,shadowOpacity: 0.1,elevation: 5}}> */}


//       </ScrollView >
//       {
//         !showReportModal && (<TouchableOpacity onPress={() => { props.navigation.navigate('InventionUpload') }} style={{ bottom: 60, right: 20, position: 'absolute', alignSelf: 'flex-end', width: 80, height: 80, borderRadius: 80 / 2, backgroundColor: '#FFC40C', justifyContent: 'center', alignItems: 'center', shadowColor: '#FFD037', shadowOffset: { width: 0, height: 3 }, shadowRadius: 1, shadowOpacity: 0.1, elevation: 5 }}>
//           <Image source={require('../../../assets/images/fashion-upload-icon.png')} style={{ width: 40, height: 40 }} />
//         </TouchableOpacity>)
//       }
//       {/* </TouchableOpacity> */}

//       {loading || loading2 ? <Loader /> : null}
//       <Modal
//         isVisible={showReportModal}
//         swipeDirection="down"
//         onBackdropPress={() => { setShowReportModal(false), setSelectedReasonId(null) }}
//         onSwipeComplete={(e) => {
//           setShowReportModal(false)
//           setSelectedReasonId(null);
//         }}
//         scrollTo={() => { }}
//         scrollOffset={1}
//         propagateSwipe={true}
//         coverScreen={false}
//         backdropColor='transparent'
//         style={{ justifyContent: 'flex-end', margin: 0, backgroundColor: 'rgba(0,0,0,0.5)' }}
//       >
//         <View style={{ height: 'auto', backgroundColor: '#fff', borderTopLeftRadius: 30, borderTopRightRadius: 30 }}>
//           <Text style={{ fontSize: 20, fontWeight: '700', color: '#455A64', textAlign: 'center', marginBottom: 20, marginTop: 30 }}>Report</Text>
//           <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled={true}>

//             <FlatList
//               data={reportGet}
//               showsHorizontalScrollIndicator={false}
//               numColumns={1}
//               keyExtractor={item => item.id}
//               style={{ marginBottom: 10 }}
//               renderItem={({ item, index }) => {
//                 // console.log('item.report_id', item.report_id);
//                 return (
//                   <TouchableOpacity key={item.report_id} onPress={() => setSelectedReasonId(item.report_id)} style={selectedReasonId === item.report_id ? styles.selectedReasonView : styles.reasonView}>
//                     <Image source={selectedReasonId === item.report_id ? require('../../../assets/images/fastion-selected-reason-icon.png') : require('../../../assets/images/fastion-reason-icon.png')} style={{ tintColor: '#FFC40C' }} />
//                     <View style={{ marginLeft: 10 }}>
//                       <Text style={{ fontSize: 14, lineHeight: 14, fontWeight: '400', color: '#455A64' }}>{item.feedback}</Text>
//                       {item.description ?
//                         <Text style={{ fontSize: 12, lineHeight: 12, fontWeight: '400', color: '#C5C6C9', marginTop: 2 }}>{item.description}</Text>
//                         : null}
//                     </View>
//                   </TouchableOpacity>
//                 )
//               }}
//             />

//             <TouchableOpacity onPress={() => { postReport(selectedReasonId) }} style={styles.reportButtonView}>
//               <Text style={{ fontSize: 15, fontWeight: '500', color: '#fff', }}>Report</Text>
//             </TouchableOpacity>

//           </ScrollView>

//         </View>
//       </Modal>
//       {console.log('showModal?.data', showModal?.data)}
//       {
//         showModal.isVisible ? (

//           <VideoModel
//             isVisible={showModal.isVisible}
//             toggleModal={toggleModal}
//             videoDetail={{ ...showModal?.data, url: showModal?.data?.file_url }}
//             {...props}
//           />
//         ) : null
//       }

//       <PostModal
//         isVisible={showPostsModal}
//         setIsVisible={setShowPostsModal}
//         startFromIndex={startFromIndex}
//         data={categoryData}
//         id={selectedID}
//       />

//     </SafeAreaView >
//   );
// }
// const styles = StyleSheet.create({
//   unselectedTabText: {
//     fontSize: 14,
//     fontWeight: '500',
//     color: '#263238'
//   },
//   requestCallView: {
//     marginTop: 10,
//     width: 140,
//     height: 30,
//     borderRadius: 15,
//     backgroundColor: '#29913C',
//     alignItems: 'center',
//     justifyContent: 'center',
//     shadowColor: '#6D2F91',
//     shadowOffset: { width: 3, height: 3 },
//     shadowRadius: 5,
//     shadowOpacity: 0.17,
//     elevation: 2
//   },
//   VideoThumbWrapper: {
//     position: 'relative',
//     // width: '48%',
//     // marginRight: 8,
//     marginBottom: 4,

//     width: dimensions.SCREEN_WIDTH / 1.5,
//     height: 160,
//     marginRight: 20,
//     borderRadius: 15,
//     // shadowColor:'#000',
//     // shadowOffset: {width: 0,height: 3},
//     // shadowRadius: 1,
//     // shadowOpacity: 0.03,
//     // elevation: 1,
//   },
//   PlayIconContainer: {
//     position: 'absolute',
//     top: 0,
//     bottom: 0,
//     left: 0,
//     right: 0,
//     zIndex: 1,
//   },
//   PlayIconWrapper: {
//     flex: 1,
//     flexDirection: 'column',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   BackGroundImage: {
//     width: '100%',
//     height: 160,
//     justifyContent: 'center',
//     borderRadius: 15
//   },
//   buttonsRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginTop: 20,
//     width: '53%',
//     marginLeft: 6
//   },
//   buttonView: {
//     flexDirection: 'row',
//     alignItems: 'center'
//   },
//   shippingView: {

//     height: 688,
//     backgroundColor: 'white',
//     borderRadius: 10,
//     width: 596,
//     padding: 10,
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderWidth: 1,
//     borderColor: '#545454'
//   },
//   buttonText: {
//     fontSize: 10,
//     fontWeight: '500',
//     color: '#8F93A0',
//     marginLeft: 5
//   },
//   reasonView: {
//     alignSelf: 'center',
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     marginBottom: 15,
//     // paddingVertical:10,
//     paddingHorizontal: 10,
//     width: '90%',
//     height: 60,
//   },
//   selectedReasonView: {
//     alignSelf: 'center',
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     marginBottom: 15,
//     // paddingVertical:10,
//     paddingHorizontal: 10,
//     width: '90%',
//     height: 60,
//     borderColor: '#E7F7FF',
//     borderWidth: 1,
//     shadowColor: '#455A64',
//     shadowOffset: { width: 3, height: 3 },
//     shadowRadius: 5,
//     shadowOpacity: 0.10,
//     elevation: 1
//   },
//   reportButtonView: {
//     height: 60,
//     width: '90%',
//     alignSelf: 'center',
//     backgroundColor: '#FFC40C',
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderRadius: 5,
//     marginBottom: 30,
//     shadowColor: '#000',
//     shadowOffset: { width: 3, height: 3 },
//     shadowRadius: 5,
//     shadowOpacity: 0.10,
//     elevation: 2
//   },
//   flatlistMainBottomView: {
//     backgroundColor: '#fff',
//     paddingVertical: 15,
//     backdropColor: 'red',
//     width: dimensions.SCREEN_WIDTH,
//     borderBottomRightRadius: 20,
//     borderBottomLeftRadius: 20,
//     borderLeftWidth: 1,
//     borderRightWidth: 1,
//     borderBottomWidth: 1,
//     borderLeftColor: '#EAEBEB',
//     borderRightColor: '#EAEBEB',
//     borderBottomColor: '#EAEBEB',


//   },

//   flatlistMainView: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     backgroundColor: 'pink',
//     paddingHorizontal: 15,
//     paddingVertical: 10,
//     width: dimensions.SCREEN_WIDTH / 1.5,
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     borderBottomWidth: 1,
//     borderLeftColor: '#EDEEEE',
//     borderRightColor: '#EDEEEE',
//     borderBottomColor: '#EDEEEE'

//   },
//   followingImageView: {
//     flexDirection: 'row',
//     alignItems: 'center',

//   },
//   followingView: {
//     justifyContent: 'center',
//     marginLeft: 10
//   },
//   flatlistMainBottomView: {
//     backgroundColor: 'white',
//     height: 150,
//     paddingHorizontal: 5,
//     width: dimensions.SCREEN_WIDTH / 1.5,
//     borderBottomRightRadius: 20,
//     borderBottomLeftRadius: 20,
//     borderLeftWidth: 0.5,
//     borderRightWidth: 0.5,
//     borderBottomWidth: 0.5,
//     borderLeftColor: '#FFC40C',
//     borderRightColor: '#FFC40C',
//     borderBottomColor: '#FFC40C',


//   },
//   flatlistBottomView: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     marginBottom: 12,
//     marginVertical: 4
//   },
//   buttonsContainer: {

//     alignItems: 'center',

//     width: '100%',
//     justifyContent: 'space-between',
//     marginTop: -12, // Add margin between text and buttons
//     // Align buttons with the texts backgroundColor: 'pink'


//   },
//   buttonIcon: {
//     height: 20,
//     width: 20,
//     marginLeft: 5
//   },
// });
// export default InventionHome





import React, { useEffect, useState, useRef } from 'react';
import { View, Image, Text, StyleSheet, SafeAreaView, TextInput, FlatList, Alert, TouchableOpacity, ScrollView, ImageBackground, ActivityIndicator } from 'react-native';
import HomeHeaderRoundBottom from '../../../component/HomeHeaderRoundBottom';
import SearchInput2 from '../../../component/SearchInput2';
import SearchInputEnt from '../../../component/SearchInputEnt';
import FashionSearch from './components/FashionSearch';
import SerchInput from '../../../component/SerchInput';
import { dimensions, Mycolors } from '../../../utility/Mycolors';
import messaging from '@react-native-firebase/messaging';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../../../WebApi/Loader';
import { requestPostApi, requestGetApi, creation_categories, creation_react, creation_get_report, creation_post_report, creation_addView, creation_getNotifications, invention_suggested, creation_Fashion, creation_getView, creation_home } from '../../../WebApi/Service'
import { setcookingnotificationcount } from '../../../redux/actions/user_action';
import LinearGradient from 'react-native-linear-gradient'
import { ImageSlider, ImageCarousel } from "react-native-image-slider-banner";
import MyButtons from '../../../component/MyButtons';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import moment from 'moment';
import Modal from 'react-native-modal';
import Toast from 'react-native-toast-message';
import AppIntroSlider from 'react-native-app-intro-slider';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import { createThumbnail } from "react-native-create-thumbnail";
import ViewMoreText from 'react-native-view-more-text';
import VideoPlayer from 'react-native-video-player'
import PostModal from './components/PostModal';
import ArtSearch from './components/ArtSearch'
import Video from 'react-native-video';
import { log } from 'react-native-reanimated';
import { VideoModel } from '../../../component/VideoModel';
import ProgressBar from 'react-native-progress/Bar'
const CookingHome = (props) => {
  const scrollViewRef = useRef();
  const dispatch = useDispatch();

  const User = useSelector(state => state.user.user_details)
  console.log(User, 'my user');
  const chatindictor = useSelector(state => state.user.cooking_counter);

  const player = useRef(null);
  const [searchValue, setsearchValue] = useState('')
  const [scrollEnabled, setScrollEnabled] = useState(false)
  const myTextInput = useRef()
  const [multiSliderValue, setMultiSliderValue] = useState([0, 100])
  const [showChooseMilesModal, setShowChooseMilesModal] = useState(false)
  const [showModalVideo, setShowModalVideo] = useState({ isVisible: false, data: null })
  const [selectedCategory, setSelectedCategory] = useState('1')
  const [loading, setLoading] = useState(false)
  const [loading2, setLoading2] = useState(false)
  const [loading3, setLoading3] = useState(false)
  const [showPostsModal, setShowPostsModal] = useState(false)
  const [showModal, setShowModal] = useState({ isVisible: false, data: null });
  const [showVideoModal, setShowVideoModal] = useState(false)
  const [selectedVideo, setSelectedVideo] = useState({})
  const [showReportModal, setShowReportModal] = useState(false)
  const [selectedReasonId, setSelectedReasonId] = useState(null)
  const [showBottomLoader, setShowBottomLoader] = useState(false);
  const [categoryData, setCategorydata] = useState([])
  const [isLiked, setIsLiked] = useState(false);
  const [latestRecords, setLatestRecords] = useState([]);
  const [getSuggested, setGetSuggested] = useState('')
  const [categories, setCategories] = useState('')
  const [profileModal, setProfileModal] = useState('')
  const [reportGet, setReportGet] = useState('')
  const [myArticle, setMyArticle] = useState('')
  const [page, setPage] = useState(1);
  const [thumb, setThumb] = useState('')
  const [selectedID, setSelectedID] = useState('')
  const [startFromIndex, setStartFromIndex] = useState(0)
  const [totalAmount, setTotalAmount] = useState(1000)
  const [typeArticle, setTypeArticle] = useState('Fundraiser')
  const [raisedAmount, setRaisedAmount] = useState(200)
  const progress = raisedAmount / totalAmount;
  console.log('progess ammaount', (progress * 100).toFixed(0));
  const calculatedProgress = progress * 100;
  const formattedProgress = calculatedProgress.toFixed(0);

  const [introSliderData] = useState([
    // require('../../assets/Group75972.png'),
    { key: 'one', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5a5uCP-n4teeW2SApcIqUrcQApev8ZVCJkA&usqp=CAU', title: 'Art-Aficionado Tim Newton on How to Collect Art', status: 'Fine Art', date: 'March 4, 2022' },
    { key: 'two', image: 'https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg', title: 'Art-Aficionado Tim Newton on How to Collect Art', status: 'Fine Art', date: 'March 4, 2022' },
    { key: 'three', image: 'https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510__340.jpg', title: 'Art-Aficionado Tim Newton on How to Collect Art', status: 'Fine Art', date: 'March 4, 2022' }
  ])


  messaging().onMessage(remoteMessage => {
    const data = remoteMessage;
    if (data && Object.keys(data).length !== 0) {
      dispatch(setcookingnotificationcount(1));
    } else {
      null
    }
    console.log('onMessage remoteMessage', remoteMessage);
    // if (remoteMessage.notification.body === 'Order Delivered Successfully!') {
    //   setalert_sms3('Do you want to rate order?');
    //   setMy_Alert3(true);
    //   setRemoteMessageData(remoteMessage.data);
    // } else if (remoteMessage.notification.body === 'new message') {
    //   // Handle new message scenario
    //   // dispatch(setMessageCount(mapdata.messagecount + 1));
    //   // props.navigation.navigate('ShopMyOrderDetails', { data: remoteMessage.data });
    // }
  });

  messaging().onNotificationOpenedApp(remoteMessage => {

    const data = remoteMessage;
    console.log('when app is closed',);
    if (data && Object.keys(data).length !== 0) {
      dispatch(setcookingnotificationcount(1));
    } else {
      null
    }
  });

  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      const data = remoteMessage;
      console.log('when app is clodee',);
      if (data && Object.keys(data).length !== 0) {
        dispatch(setcookingnotificationcount(1));
      } else {
        null
      }
    });

  const getAllNotificationsList = async () => {
    console.log('notification function called');
    setLoading(true)

    const { responseJson, err } = await requestGetApi(creation_getNotifications + 52, '', 'GET', User.token)
    setLoading(false)
    console.log('the res in_cart notification_list ==>>', responseJson)
    if (responseJson.headers.success == 1) {
      console.log('my data lenght', responseJson.body.data.length);

      console.log('my notifications art home', responseJson.body.data.length != 0);
      responseJson.body.data.length != 0 ? console.log('o is called') : console.log('1 is called');
      const hasStatusZero = responseJson.body.data.some((item) => item.status === 0);
      console.log('item for notification status', (hasStatusZero))
      dispatch(setcookingnotificationcount(hasStatusZero ? 0 : 1));
      // responseJson.body.data.length != 0 ? dispatch(setcookingnotificationcount(1)) : dispatch(setcookingnotificationcount(0))

    } else {
      setalert_sms(err)
      setMy_Alert(true)
    }
  };



  const multiSliderValuesChange = (values) => { setMultiSliderValue(values) }
  // useEffect(() => {
  //   ArtCategory()
  //   Categories()
  //   // generateThumb()
  // }, [])
  React.useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      // The screen is focused
      // Call any action

      ArtCategory()
      Categories()
      getSuggestion()
      getReport()
      getAllNotificationsList()
      // console.log('my user id of state----->', userID);
    });
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [props, page]);



  const scrollToTop = () => {
    scrollRef?.current?.scrollToOffset({ animated: true, offset: 0 });
  };


  const _renderItem = ({ item }) => {
    console.log('item for slicking of 3 data', item);
    // let videoUrl = null; // Declare and initialize the videoUrl variable
    // console.log('item of home sugggggg', item);
    return (
      <>
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row', width: dimensions.SCREEN_WIDTH * 0.93, flex: 1 }}>
            {item.type === 'video' ?
              <TouchableOpacity style={{ width: '100%', height: 227, borderRadius: 10, alignSelf: 'center', resizeMode: 'cover', }}
                onPress={() => {
                  //   setShowModal({
                  //     isVisible: true,
                  //     data: item.files[0],
                  //   }), setSelectedID(item.id)
                  // }} 
                  { props.navigation.navigate('CookingPost', { id: item.id }) }
                }}
              >

                <ImageBackground source={{ uri: item.thumb.path }} style={{
                  width: '100%', height: 227, alignSelf: 'center', justifyContent: 'center', borderRadius: 10,
                  overflow: 'hidden',
                }} resizeMode='cover' >
                  <Image source={require('../../../assets/images/people-play-button.png')} style={{ width: '20%', height: '20%', alignSelf: 'center', }} resizeMode='contain' ></Image>
                </ImageBackground>
              </TouchableOpacity>
              :
              <TouchableOpacity onPress={() => { props.navigation.navigate('CookingPost', { id: item.id }) }} style={{ width: '100%', height: 227, alignSelf: 'center', borderRadius: 10, }}>
                <Image source={{
                  uri:

                    item.cover_photo
                }} style={{ width: '100%', height: '100%', borderRadius: 10, }} />
              </TouchableOpacity>}
            {/* <LinearGradient
            colors={['#29913C', 'transparent']}
            style={{
              height: 75, width: '100%', paddingHorizontal: 15,
              justifyContent: 'center', position: 'absolute', bottom: 0, overflow: 'hidden',
            }}
            start={{ x: 0.2, y: 0 }}
            end={{ x: 1, y: 0 }}
          > */}
            <View
              style={{
                height: 75, width: '100%', paddingHorizontal: 15,
                justifyContent: 'center', position: 'absolute', bottom: 0, overflow: 'hidden',
                backgroundColor: 'rgba(237, 28, 36, 0.5)', borderBottomLeftRadius: 10, borderBottomRightRadius: 10
              }}

            >

              <Text numberOfLines={1} style={{ color: 'white', fontSize: 16, fontWeight: '400', width: '100%', alignSelf: 'center', lineHeight: 30 }}>{item.headline
              }</Text>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', }}>

                <Text numberOfLines={1} style={{ color: 'white', fontWeight: '400', fontSize: 14, marginTop: 3, width: '65%', }}>Category: {item.category
                }


                </Text>
                <View style={{ width: '30%' }}>
                  <Text style={{ color: 'white', fontWeight: '400', fontSize: 12, marginTop: 3, textAlign: 'right' }}>
                    {item.created_date.slice(0, 11)}

                  </Text>
                </View>
              </View>
            </View>
            {/* </LinearGradient> */}
          </View >
        </View>
      </>
    );
  }
  const renderPagination = (activeIndex) => {
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
        {introSliderData.map((_, index) => (
          <View
            key={index}
            style={{
              backgroundColor: activeIndex === index ? '#ED1C24' : '#D9D9D9',
              height: 9,
              width: 9,
              borderRadius: 30,
              marginHorizontal: 5,
            }}
          />
        ))}
      </View>
    );
  };
  // invention_suggested
  const ArtCategory = async (getnwPage = false) => {
    console.log('my art is called');
    console.log('Current page:', page); // Add a debug log for the current page
    setLoading(true);

    // Calculate the new page value based on the getnwPage parameter
    const newpage = getnwPage ? page + 1 : 1;
    console.log('my new getnewpage', newpage);

    // Update the fUrl with the new page value
    var fUrl = creation_home + `?page_no=${newpage}&limit=10`;
    try {
      // Make the API request to fetch data
      const { responseJson } = await requestGetApi(fUrl, '', 'GET', User.token);
      setLoading(false);
      console.log('responseJson.body.articles for invention', responseJson.body.articles);

      if (responseJson.headers.success == 1) {
        if (!getnwPage) {
          console.log('for data 10', responseJson.body.articles);
          generateThumb(responseJson.body.articles);
        } else {
          console.log('');
          console.log('for data 4', responseJson.body.articles, newpage);

          // Check if responseJson.body.articles is not undefined or empty before updating the page state
          if (responseJson.body.articles && responseJson.body.articles.length > 0) {
            generateThumb([...categoryData, ...responseJson.body.articles]);
            console.log('my new page in the else condition--->>', newpage);
            setPage(newpage);
          }
        }

        const latestRecordsArray = responseJson.body.articles.slice(0, 3);
        setLatestRecords(latestRecordsArray);
      } else {
        setalert_sms(err);
        setMy_Alert(true);
      }
    } catch (error) {
      console.error('Error occurred during fetching data:', error);
      setLoading(false);
    }
  };


  const generateThumb = async (item) => {
    console.log('type for the fundraiser', item);
    setLoading2(true);

    try {
      const allData = await Promise.all(
        item.map?.(async (el) => {
          if (!el.files) {
            return { ...el, type: "none", post_type: item.type };
          } else if (el.files.find((js) => js.post_type == "Image")) {
            return {
              ...el,
              type: "image",
              post_type: el.type
            };
          } else {
            const thumb = await createThumbnail({
              url: el.files[0].file_url,
              timeStamp: 1000,
            });
            return {
              ...el,
              thumb,
              type: "video",
              post_type: el.type


            };
          }
        })
      );

      const data = allData;
      console.log(' funfdraise data', data);
      setCategorydata(data);

    } catch (error) {
      console.error("Error generating thumbnails:", error);
    } finally {
      setLoading2(false);
    }
  };



  const generateThum = async (item) => {
    // console.log('my thum for suggested', item);
    setLoading3(true)
    // const videos = item.filter(el => {
    //   if (!el.files) {
    //     return false
    //   } else {
    //     if (el.files.find(js => js.post_type == 'Video')) {
    //       return true
    //     } else {
    //       return false
    //     }
    //   }
    // })

    const allData = await Promise.all(
      item.map?.(async (el) => {
        if (!el.files) {
          return { ...el, type: "none", post_type: el.type };
        }
        else if (el.files.find((js) => js.post_type == "Image")) {
          return {
            ...el,
            type: "image",
            post_type: el.type
          };
        } else {
          // console.log("createThumbnail will be called for suggested post  ", el.files[0].file_url);
          const thumb = await createThumbnail({
            url: el.files[0].file_url,
            timeStamp: 1000, // Specify the time position for the thumbnail (in milliseconds)
          });
          // console.log('out of thumb function');
          return {
            ...el,
            thumb,
            type: "video",
            post_type: el.type
          };
        }
      })

    );


    // console.log("allDatafor suggeste drecom", allData);
    const data = allData
    console.log(allData, 'data111 uuuuu');
    setGetSuggested(data)

    setLoading3(false)
  };



  const Categories = async () => {
    setLoading(true)
    var fUrl = creation_categories
    var urls = '?module_id=' + '51'
    //  console.log('my url---------->', urls)
    if (urls != undefined) {
      fUrl = fUrl + urls
    }
    // console.log("LIKE CLICK:::",isSaved);
    const { responseJson, err } = await requestGetApi(fUrl, '', 'GET', User.token)
    setLoading(false)
    // console.log('response afer click of items', responseJson)
    if (responseJson.headers.success == 1) {
      console.log('the res after sucess of category', responseJson.body.data)
      setCategories(responseJson.body.data)

      // Toast.show({ text1: responseJson.headers.message });
    } else {

      setalert_sms(err)
      setMy_Alert(true)
    }
  }

  /////post suggested hit
  const postsuugestion = async (items) => {
    console.log('kkkkk for post suggestion', items);
    setLoading(true)
    var fUrl = creation_addView
    var urls = 52
    // console.log('my url---------->', urls)
    if (urls != undefined) {
      fUrl = fUrl + urls
    }
    // console.log('my url post', fUrl)
    var data = {
      "object_type": "article",
      "object_id": items
    }
    // console.log('====================================');
    // console.log(data, 'my data of post');
    // console.log('====================================');
    const { responseJson, err } = await requestPostApi(fUrl, data, 'POST', User.token)
    setLoading(false)
    console.log('Post suggestion of cooking', responseJson)
    // setIsLiked(!isLiked);
    if (responseJson.headers.success == 1) {
      //ArtCategory()
      // Toast.show({ text1: responseJson.headers.message });
    } else {
      // console.log(responseJson.headers.message, errmshhh);
      setalert_sms(err)
      setMy_Alert(true)
    }
  }

  const getSuggestion = async () => {
    setLoading(true)
    var fUrl = invention_suggested


    var urls = 52
    console.log('my url---------->', urls)
    if (urls != undefined) {
      fUrl = fUrl + urls
    }
    console.log(' get suggestion url', fUrl)

    console.log('my url---------->', fUrl)

    const { responseJson, err } = await requestGetApi(fUrl, '', 'GET', User.token)
    setLoading(false)
    console.log('the res of suggested cooking post', responseJson)
    if (responseJson.headers.success == 1) {
      console.log('the res after sucess of post suggested1111', responseJson.body.data)

      generateThum(responseJson.body.data)

    } else {

      setalert_sms(err)
      setMy_Alert(true)
    }
  }

  const getReport = async () => {
    setLoading(true)
    const { responseJson, err } = await requestGetApi(creation_get_report, '', 'GET', User.token)
    setLoading(false)
    // console.log('the res of get suggest post from cooking', responseJson)
    if (responseJson.headers.success == 1) {
      // console.log('the res after sucess report get', responseJson.body.data)
      setReportGet(responseJson.body.data)

    } else {

      setalert_sms(err)
      setMy_Alert(true)
    }
  }

  const postReport = async (items) => {
    // console.log('kkkkk', items);
    if (selectedReasonId === null) {
      Toast.show({ text1: 'Select a reason for report' });
      return; // Exit the function to prevent further execution
    }

    setLoading(true);
    var fUrl = creation_post_report;
    var urls = myArticle;
    // console.log('my url---------->', urls);
    if (urls !== undefined) {
      fUrl = fUrl + urls;
    }
    var data = {
      report_id: items,
      comment: ""
    };

    const { responseJson, err } = await requestPostApi(fUrl, data, 'POST', User.token);
    setLoading(false);
    // console.log('the res of report from cooking', responseJson);
    setShowReportModal(false);

    if (responseJson.headers.success === 1) {
      Toast.show({ text1: responseJson.headers.message });
      setSelectedReasonId(null);
      // console.log('report post article', responseJson);
    } else {
      setalert_sms(err);
      setMy_Alert(true);
    }
  }

  const handleLoadMore = () => {

    // console.log('handel more caledd???????');
    ArtCategory(true)
  };
  const renderFooter = () => {
    // console.log('render fotter called?????');
    return loading ? (
      <View style={{ marginTop: 10, alignItems: "center" }}>
        <ActivityIndicator size="large" color="#1f1f1f" />
      </View>
    ) : null;
  };
  const toggleModal = (state) => {
    console.log('state', state);
    setShowModal({
      isVisible: state.isVisible,
      data: state.data,
    });
  };

  const daysLeft = () => {
    const creatdDate = new Date();
    console.log(createdDate, 'llllllllcreatedDate');
    const expiryDat = new Date(responseJson.body.data.expiry_date);

    // Calculate the time difference in milliseconds
    const timeDifference = expiryDat - creatdDate;

    // Convert milliseconds to days
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    console.log('daysDifference', daysDifference);
    setDays(daysDifference)

  }

  return (
    <SafeAreaView scrollEnabled={scrollEnabled} style={{ backgroundColor: '#F8F8F8', }}>
      <ScrollView style={{
        // zIndex: -999,
      }} showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false} >
        <HomeHeaderRoundBottom height={100} extraStyle={{ paddingtop: 10, paddingBottom: 25 }} paddingHorizontal={15} borderBottomLeftRadius={20} borderBottomRightRadius={20} backgroundColor='#ED1C24'
          press1={() => { props.navigation.goBack() }} img1={require('../../../assets/images/service-header-back-button.png')} img1width={25} img1height={18}
          press2={() => { }} title2={'Cooking'} fontWeight={'500'} img2height={20} color={'#fff'}
          press3={() => { props.navigation.navigate('CookingNotification') }} img3={require('../../../assets/images/fashion-bell-icon.png')} img3width={25} img3height={22}
          press4={() => { props.navigation.navigate('CookingProfile') }} img4={require('../../../assets/People/PeopleProfileIConModal.png')} img4width={25} img4height={22}
        />
        <View style={{ top: -20, width: '90%', alignSelf: 'center' }} >

          <ArtSearch marginTop={0}
            // serchValue={searchValue}

            searchIcon={require('../../../assets/Art/CreationArtSearch.png')}
            // onChangeText={(e) => { setsearchValue(e) }}
            press={() => { props.navigation.navigate('CookingCategories', { cat_name: {}, from: 'seach' }) }}
            // presssearch={() => { Alert.alert('Search Pressed') }}
            paddingLeft={20} />

        </View>

        <View style={{
          flex: 1, width: '90%',
          marginLeft: 'auto',
          marginRight: 'auto',
          backgroundColor: '#F8F8F8',

        }}>
          <View style={{ width: dimensions.SCREEN_WIDTH * 0.9, alignSelf: 'flex-start', marginTop: 0, marginBottom: 10, marginTop: 10, zIndex: 999 }}>
            <FlatList
              data={categories}
              showsHorizontalScrollIndicator={true}

              horizontal
              renderItem={({ item, index }) => {
                console.log('item for render item', item)
                return (

                  <TouchableOpacity
                    style={{
                      height: 140,
                      marginRight: 15,
                      position: 'relative',
                      width: 140,
                      borderRadius: 10,
                      overflow: 'hidden', // Clip content that exceeds the borderRadius
                    }}
                    onPress={() => {
                      props.navigation.navigate('CookingCategories', { cat_name: item, from: 'bycategory' });
                    }}
                  >
                    <LinearGradient
                      colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.43)']}
                      style={{
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                        zIndex: 1,
                        borderRadius: 10, // Apply the borderRadius to the LinearGradient
                      }}
                    >
                      <View
                        style={{
                          flex: 1,
                          flexDirection: 'column',
                          justifyContent: 'flex-end',
                          alignItems: 'center',
                          marginBottom: 20,
                        }}
                      >
                        <Text style={{ fontSize: 14, fontWeight: '500', color: '#fff' }}>{item?.name}</Text>
                      </View>
                    </LinearGradient>
                    <Image
                      source={{ uri: item.image }}
                      style={{
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                        borderRadius: 10, // Apply the same borderRadius to the image
                      }}
                      resizeMode='cover'
                    />
                  </TouchableOpacity>
                )
              }}
              keyExtractor={item => item.id}
            />
          </View>

          <View style={{ marginTop: 20, width: dimensions.SCREEN_WIDTH * 0.95, }}>
            {categoryData.length > 0 ?

              <AppIntroSlider
                data={categoryData.slice(0, 3)}
                renderItem={_renderItem}
                renderDoneButton={() => <View />}
                renderNextButton={() => <View />}
                activeDotStyle={{
                  backgroundColor: '#29913C',
                  height: 9,
                  width: 9,
                  borderRadius: 30,
                  position: 'absolute',
                  top: 20,
                }}
                dotStyle={{
                  backgroundColor: '#fff',
                  height: 9,
                  width: 9,
                  borderRadius: 30,
                  position: 'absolute',
                  top: 20,
                }}
                renderPagination={renderPagination}
                keyExtractor={(item) => item.id}
              />
              : null}
          </View>



          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 20, marginBottom: 10 }}>
            <Text style={{ fontSize: 16, fontWeight: '500', color: '#263238' }}>Around the world</Text>
            <TouchableOpacity onPress={() => { props.navigation.navigate('CookingViewAll') }}>
              <Text style={{ fontSize: 13, fontWeight: '400', color: '#ED1C24' }}>View all</Text>
            </TouchableOpacity>
          </View>

          <View style={{ width: dimensions.SCREEN_WIDTH * 0.9, alignSelf: 'flex-start', marginTop: 10, height: 300, zIndex: 999 }}>

            <ScrollView showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false} nestedScrollEnabled={true} scroolToEnd={true} ref={scrollViewRef}
              onScroll={(event) => {
                const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
                const isAtEnd = layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;
                if (isAtEnd) {
                  // console.log('is function reached on end')
                  handleLoadMore();
                }
              }}
            >
              <View>
                {categoryData.length == 0 ?

                  <>
                    <Image source={require('../../../assets/Art/PostCookingFound.png')} style={{ alignSelf: 'center', justifyContent: 'center', marginTop: '30%' }}></Image>
                    <Text style={{ textAlign: 'center', fontSize: 16, color: 'black', marginTop: 12 }}>
                      No data found
                    </Text>
                  </>
                  : <FlatList

                    style={{}}
                    data={categoryData}
                    // data={categoryData}
                    // ref={scrollRef}
                    showsHorizontalScrollIndicator={true}
                    // onEndReachedThreshold={0.9}
                    // onEndReached={
                    //   handleLoadMore
                    // }
                    //ListFooterComponent={renderFooter}
                    // ListFooterComponent={() => (<Text style={{ fontSize: 30, textAlign: "center", marginBottom: 20, fontWeight: 'bold', color: 'black' }}>Load More</Text>)}

                    renderItem={({ item, index }) => {
                      console.log('category item for around the world', item.post_type)
                      let videoUrl = null; // Declare and initialize the videoUrl variable

                      if (item.type === "video") {
                        // Get the video URL from the files array
                        videoUrl = item.files[0]?.file_url; // Assuming the URL is stored in the 'url' property of the file object
                      }
                      // console.log();
                      return (

                        <>
                          <TouchableOpacity style={{ width: dimensions.SCREEN_WIDTH, marginRight: 15, flexDirection: 'row', marginBottom: 20, }}
                            onPress={() => {
                              postsuugestion(item.id)
                              props.navigation.navigate('FashionPost', { id: item.id })

                            }}>
                            <TouchableOpacity onPress={() => {
                              setStartFromIndex(index);
                              setSelectedID(item.id)
                              item.type === "video" ? setShowModal({
                                isVisible: true,
                                data: item.files[0],
                              }) : props.navigation.navigate('CookingPost', { id: item.id })

                            }}>
                              {item.type == 'video' ?

                                <ImageBackground source={{ uri: item.thumb.path }} style={{
                                  width: dimensions.SCREEN_WIDTH / 2.5, height: 105, alignSelf: 'center', justifyContent: 'center', borderRadius: 10,
                                  overflow: 'hidden',
                                }} resizeMode='cover' >
                                  <Image source={require('../../../assets/images/people-play-button.png')} style={{ width: '20%', height: '20%', alignSelf: 'center', }} resizeMode='contain' ></Image>
                                </ImageBackground>
                                : <Image source={{
                                  uri: item.cover_photo
                                }} style={{ width: dimensions.SCREEN_WIDTH / 2.5, height: 105, borderRadius: 10, }} resizeMode='cover'></Image>}

                            </TouchableOpacity>
                            <View style={{ flexDirection: 'column', width: dimensions.SCREEN_WIDTH / 2, }}>
                              <View style={{ flex: 1, marginTop: 4, marginLeft: 7, width: dimensions.SCREEN_WIDTH / 2.2, }}>
                                <Text numberOfLines={2} style={{ fontSize: 14, fontWeight: '400', color: '#000000' }}>
                                  {item.headline}
                                </Text>
                              </View>
                              <Text style={{ fontSize: 12, fontWeight: '400', color: '#ED1C24', paddingHorizontal: 9, marginVertical: 4 }}>{item.post_type}</Text>
                              <View style={{ flexDirection: 'row', width: dimensions.SCREEN_WIDTH / 2.1, }}>

                                <Text style={{ fontSize: 12, fontWeight: '400', color: 'black', paddingHorizontal: 9 }}>
                                  Category :
                                </Text>
                                <Text style={{ fontSize: 12, fontWeight: '400', color: '#ED1C24', flexShrink: 1 }}>
                                  {item.category}
                                </Text>
                              </View>
                              {/* <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                              <Text style={{ fontSize: 12, fontWeight: '400', color: 'black', marginLeft: 6 }}>
                                <Text style={{ fontSize: 12, fontWeight: '400', color: '#B4BBC6', marginLeft: 6, width: dimensions.SCREEN_WIDTH / 2.1 }}>Author: {item.username}</Text>
                              </Text>
                            </View> */}
                              <View style={{ flexDirection: 'row', marginTop: 2, width: dimensions.SCREEN_WIDTH / 2.1, }}>
                                <Text style={{ fontSize: 12, fontWeight: '400', color: 'black', paddingHorizontal: 9 }}>
                                  Author :
                                </Text>
                                <Text style={{ fontSize: 12, fontWeight: '400', color: '#B4BBC6', marginLeft: 6, width: dimensions.SCREEN_WIDTH / 2.1 }}>
                                  {item.username}
                                </Text>
                              </View>
                              <Text style={{ fontSize: 12, fontWeight: '400', color: 'black', marginLeft: 6, width: dimensions.SCREEN_WIDTH / 2.1, paddingHorizontal: 5 }}>
                                Published Date: <Text style={{ fontSize: 12, fontWeight: '400', color: '#B4BBC6', textAlign: 'left', }}>{item.created_date.slice(0, 11)}</Text>
                              </Text>

                              <View style={styles.buttonsRow}>
                                {/* Your TouchableOpacity components */}
                              </View>
                            </View>
                          </TouchableOpacity >
                          <View style={{ borderBottomWidth: 1, borderBottomColor: '#D9D9D9', height: 1, width: '100%', marginBottom: 20 }}></View>
                        </>
                      )
                    }}
                    keyExtractor={item => item.id}

                  />}
              </View>
            </ScrollView>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10, marginTop: 35 }}>
            <Text style={{ fontSize: 16, fontWeight: '500', color: '#263238' }}>Recommended for you</Text>
            <TouchableOpacity onPress={() => {
              props.navigation.navigate('AllCookingSuggested')
            }} >
              <Text style={{ fontSize: 13, fontWeight: '400', color: '#ED1C24' }}>View all</Text>
            </TouchableOpacity>
          </View>

          <View style={{
            width: dimensions.SCREEN_WIDTH * 0.9, alignSelf: 'flex-start', marginTop: 0, marginBottom: 10, marginTop: 10, height: 350,
          }}>
            {/* {console.log('jjjjjjjjcheck', getSuggested)
            } */}
            {getSuggested.length != 0 ?

              <FlatList
                showsVerticalScrollIndicator={false}
                horizontal
                data={getSuggested}
                showsHorizontalScrollIndicator={false}
                numColumns={1}
                style={{}}

                // ListFooterComponent={renderFooter}

                renderItem={({ item, index }) => {
                  console.log(item
                    , 'my flatList suggested');
                  item?.files?.map((image, index) => (
                    console.log(item, 'my file url')

                  )
                  )
                  return (

                    <View
                      // onPress={() => {
                      //     props.navigation.navigate('StartupPost', { id: item.id })
                      // }}
                      style={{ width: dimensions.SCREEN_WIDTH / 1.5, height: 'auto', marginRight: 15, }}>


                      {/* addd new view heree */}
                      <View style={{ width: dimensions.SCREEN_WIDTH, }}>
                        <View style={{ width: dimensions.SCREEN_WIDTH / 1.5, }}>
                          <View style={{ justifyContent: 'flex-start', }}>
                            <ScrollView horizontal contentContainerStyle={styles.scrollViewContent}>

                              {item.type == 'video' ?
                                <TouchableOpacity onPress={() => setShowModal({
                                  isVisible: true,
                                  data: item.files[0],
                                })}>
                                  <ImageBackground source={{ uri: item.thumb.path }} style={{
                                    width: dimensions.SCREEN_WIDTH / 1.5, height: 160, alignSelf: 'center', justifyContent: 'center', borderRadius: 10,
                                    overflow: 'hidden',
                                  }} resizeMode='cover' >
                                    <Image source={require('../../../assets/images/people-play-button.png')} style={{ width: '20%', height: '20%', alignSelf: 'center', }} resizeMode='contain' ></Image>
                                  </ImageBackground>
                                </TouchableOpacity>
                                :
                                <TouchableOpacity onPress={() => {
                                  props.navigation.navigate('CookingPost', { id: item.id })
                                }}>
                                  <Image source={{ uri: item.cover_photo }} style={{ width: dimensions.SCREEN_WIDTH / 1.5, height: 160, borderRadius: 10 }}></Image>
                                </TouchableOpacity>
                                // {/* <Image source={{ uri: item.cover_photo }} style={{ width: dimensions.SCREEN_WIDTH / 1.5, height: 160, borderRadius: 10 }}></Image> */}
                              }

                            </ScrollView>
                          </View>
                        </View>

                      </View>


                      <TouchableOpacity style={styles.flatlistMainBottomView} onPress={() => {
                        props.navigation.navigate('CookingPost', { id: item.id })
                      }}>
                        {
                          <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 10, justifyContent: 'center', width: '93%', }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', }} >
                              <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                width: '100%',
                                marginVertical: 7,
                              }}>
                                <Text numberOfLines={2} style={{
                                  width: '59%', fontSize: 14,
                                  fontWeight: '400',
                                  color: '#263238',
                                  justifyContent: 'flex-start',
                                  textAlign: 'left',
                                }}>
                                  {item.headline}
                                </Text>
                                <Text style={{ width: '35%', textAlign: 'right', color: '#ED1C24' }}>
                                  {item.category}
                                </Text>
                              </View>
                            </View>
                          </View>
                        }
                        <View style={{ flexDirection: 'row', width: '80%', marginTop: 23 }}>


                          {item.post_type != 'Fundraiser' ? < View style={{
                            flexDirection: 'row', width: '80%',

                          }} >
                            <View style={{
                              flexDirection: 'row',
                              alignItems: 'center',

                            }}>
                              <Image
                                source={require('../../../assets/images/fashion-dark-like-button.png')}
                                style={styles.buttonIcon}
                              />

                              <Text style={{
                                fontSize: 12,
                                fontWeight: '500',
                                color: '#455A64',
                                marginLeft: 5
                              }}>{item.totalLikes} Likes</Text>

                            </View>
                            <View style={styles.buttonView}>
                              <Image
                                source={require('../../../assets/images/fashion-dark-dislike-button.png')}
                                style={styles.buttonIcon}
                              />

                              <Text style={{
                                fontSize: 12,
                                fontWeight: '500',
                                color: '#455A64',
                                marginLeft: 5
                              }}>{item.totalDislikes} Dislikes</Text>
                            </View>
                            <View style={styles.buttonView}>
                              <Image
                                source={require('../../../assets/People/commentPostPeople.png')}
                                style={styles.buttonIcon}
                              />

                              <Text style={{
                                fontSize: 12,
                                fontWeight: '500',
                                color: '#455A64',
                                marginLeft: 5
                              }}>{item.totalComments
                                } Comments</Text>
                            </View>
                          </View> : null}

                          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ marginRight: 10 }}>
                            </View>
                          </View>
                        </View>


                        {
                          item.post_type
                            == 'Fundraiser' ? < View >
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: dimensions.SCREEN_WIDTH * 0.66, paddingHorizontal: 12, }}>
                              <Text style={{ fontSize: 14, color: 'black', fontWeight: '500' }}>{item.project_estimate} <Text style={{ fontSize: 14, color: 'gray', fontWeight: '400' }}> USD</Text></Text>
                              <Text style={{ fontSize: 14, color: 'black', fontWeight: '500' }}>{item.totalLikes} <Text style={{ fontSize: 14, color: 'gray', fontWeight: '400' }}>Backers</Text></Text>
                            </View>
                            <ProgressBar height={15} width={dimensions.SCREEN_WIDTH * 0.60} backgroundColor={'#E0E0E0'} borderColor={'#E0E0E0'} progress={item.total_amount_raised / item.project_estimate} color={'#ED1C24'} borderRadius={10} marginLeft={12} />
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: dimensions.SCREEN_WIDTH * 0.67, paddingVertical: 3, paddingHorizontal: 15, marginBottom: 12 }}>
                              <Text style={{ fontWeight: '400', fontSize: 14, color: 'black' }}>{((item.total_amount_raised / item.project_estimate) * 100).toFixed(0)}% of {'$' + item.project_estimate} <Text style={{ fontSize: 14, color: 'black', fontWeight: '500', }}></Text></Text>
                              <Text style={{ fontSize: 14, color: 'black', fontWeight: '500' }}>{Math.floor(moment(item.expiry_date).diff(moment(), 'days'))}<Text style={{ fontSize: 14, color: 'gray', fontWeight: '400' }}> Days left</Text> </Text>
                            </View>
                          </View> : null
                        }

                      </TouchableOpacity>
                    </View>
                  )
                }
                }
                keyExtractor={item => item.id}
              />





              :

              <>
                <Image source={require('../../../assets/Art/PostCookingFound.png')} style={{ alignSelf: 'center', justifyContent: 'center', marginTop: '30%' }}></Image>
                <Text style={{ textAlign: 'center', fontSize: 16, color: 'black', marginTop: 12 }}>
                  No data found
                </Text>
              </>

              // <FlatList
              //   data={getSuggested}
              //   //data={categoryData}
              //   showsHorizontalScrollIndicator={true}
              //   horizontal
              //   keyExtractor={(item) => item.id.toString()}
              //   renderItem={({ item, index }) => {
              //     console.log(item.total_amount_raised, 'my updated by thumb on data');
              //     return (
              //       <View onPress={() => {
              //         props.navigation.navigate('InventionPost', { id: item.id })
              //       }}
              //         style={{ width: dimensions.SCREEN_WIDTH / 1.5, height: 500, marginRight: 15 }}>
              //         <View style={{}}>


              //           <View style={{ flexDirection: 'row', alignItems: 'center', }}>

              //           </View>

              //         </View>

              //         {/* addd new view heree */}
              //         <View style={{ width: dimensions.SCREEN_WIDTH / 1.5, alignSelf: 'center', }}>
              //           <View style={{ justifyContent: 'flex-start', }}>
              //             <ScrollView horizontal contentContainerStyle={styles.scrollViewContent}>

              //               {item.type == 'video' ?
              //                 <TouchableOpacity onPress={() => setShowModal({
              //                   isVisible: true,
              //                   data: item.files[0],
              //                 })}>
              //                   <ImageBackground source={{ uri: item.thumb.path }} style={{
              //                     width: dimensions.SCREEN_WIDTH / 1.5, height: 160, alignSelf: 'center', justifyContent: 'center', borderRadius: 10,
              //                     overflow: 'hidden',
              //                   }} resizeMode='cover' >
              //                     <Image source={require('../../../assets/images/people-play-button.png')} style={{ width: '20%', height: '20%', alignSelf: 'center', }} resizeMode='contain' ></Image>
              //                   </ImageBackground>
              //                 </TouchableOpacity>
              //                 :
              //                 <TouchableOpacity onPress={() => {
              //                   props.navigation.navigate('InventionPost', { id: item.id })
              //                 }}>
              //                   <Image source={{ uri: item.cover_photo }} style={{ width: dimensions.SCREEN_WIDTH / 1.5, height: 160, borderRadius: 10 }}></Image>
              //                 </TouchableOpacity>
              //                 // {/* <Image source={{ uri: item.cover_photo }} style={{ width: dimensions.SCREEN_WIDTH / 1.5, height: 160, borderRadius: 10 }}></Image> */}
              //               }

              //             </ScrollView>
              //           </View>
              //         </View>


              //         <TouchableOpacity style={styles.flatlistMainBottomView} onPress={() => {
              //           props.navigation.navigate('InventionPost', { id: item.id })
              //         }}>
              //           {
              //             <View style={{ flexDirection: 'row', width: '60%', }}>
              //               <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2, marginBottom: 5 }} onPress={() => {

              //                 // props.navigation.navigate('LikedUserList', { postid: item.id })
              //               }}>


              //               </TouchableOpacity>

              //             </View>


              //           }
              //           <View style={{
              //             flexDirection: 'row',
              //             alignItems: 'center',
              //             justifyContent: 'space-between',

              //             height: 80
              //           }}>
              //             {/* <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'pink', width: '100%' }}> */}
              //             < View style={{
              //               alignItems: 'center',

              //               width: '100%',
              //               justifyContent: 'space-between',
              //               marginTop: -12,
              //             }} >
              //               <View style={{
              //                 flexDirection: 'row',
              //                 justifyContent: 'space-between',
              //                 alignItems: 'center',
              //                 width: '95%',

              //               }}>


              //                 <Text numberOfLines={2} style={{
              //                   fontSize: 14,
              //                   fontWeight: '500',
              //                   color: 'black',
              //                   marginTop: 12,
              //                   width: '65%',
              //                   textAlign: 'left',

              //                 }}>{item.headline} </Text>
              //                 <View style={{ alignSelf: 'center', width: '30%', textAlign: 'top', textAlign: 'right' }} >
              //                   <Text style={{ fontSize: 14, fontWeight: '400', color: '#FFC40C', flexShrink: 1, textAlign: 'right' }}>
              //                     {item.category}
              //                   </Text>


              //                 </View>


              //               </View>

              //               {item.post_type == 'Fundraiser' ? < View >
              //                 <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, paddingVertical: 3, width: dimensions.SCREEN_WIDTH * 0.60 }}>
              //                   <Text style={{ fontSize: 14, color: 'black', fontWeight: '500' }}>{item.total_amount_raised} <Text style={{ fontSize: 14, color: 'gray', fontWeight: '400' }}> USD</Text></Text>
              //                   <Text style={{ fontSize: 14, color: 'black', fontWeight: '500' }}>{item.totalLikes} <Text style={{ fontSize: 14, color: 'gray', fontWeight: '400' }}>backers</Text></Text>
              //                 </View>
              //                 <ProgressBar height={15} width={dimensions.SCREEN_WIDTH * 0.60} backgroundColor={'#E0E0E0'} borderColor={'#E0E0E0'} progress={item.total_amount_raised / item.project_estimate} color={'#FFC40C'} borderRadius={10} />
              //                 <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 3, paddingHorizontal: 3 }}>
              //                   <Text style={{ fontWeight: '400', fontSize: 14, color: 'black' }}>{((item.total_amount_raised / item.project_estimate) * 100).toFixed(0)}% of {'$' + item.project_estimate} <Text style={{ fontSize: 14, color: 'black', fontWeight: '500', }}></Text></Text>
              //                   <Text style={{ fontSize: 14, color: 'black', fontWeight: '500' }}>{Math.floor(Math.floor((new Date(item.expiry_date)) - new Date()) / (1000 * 60 * 60 * 24))}<Text style={{ fontSize: 14, color: 'gray', fontWeight: '400' }}> days left</Text> </Text>

              //                 </View>
              //               </View> : null
              //               }

              //             </View>

              //             {/* </View> */}
              //             <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              //               <View style={{ marginRight: 10 }}>

              //               </View>

              //             </View>
              //           </View>
              //           <View style={{ flexDirection: 'row' }}>
              //             <View >
              //               <View style={{ flexDirection: 'row', }}>
              //                 {item.post_type != 'Fundraiser' ? < View style={{
              //                   alignItems: 'center',

              //                   width: '100%',
              //                   justifyContent: 'space-between',
              //                   marginTop: -12, flexDirection: 'row'
              //                 }} >
              //                   <View style={styles.buttonView}>
              //                     <Image
              //                       source={require('../../../assets/images/fashion-dark-like-button.png')}
              //                       style={styles.buttonIcon}
              //                     />

              //                     <Text style={styles.buttonText}>{item.totalLikes} Likes</Text>

              //                   </View>
              //                   <View style={styles.buttonView}>
              //                     <Image
              //                       source={require('../../../assets/images/fashion-dark-dislike-button.png')}
              //                       style={styles.buttonIcon}
              //                     />

              //                     <Text style={styles.buttonText}>{item.totalDislikes} Dislikes</Text>
              //                   </View>
              //                   <View style={styles.buttonView}>
              //                     <Image
              //                       source={require('../../../assets/People/commentPostPeople.png')}
              //                       style={styles.buttonIcon}
              //                     />

              //                     <Text style={styles.buttonText}>{item.totalComments
              //                     } Comments</Text>
              //                   </View>
              //                 </View> : null}
              //               </View>
              //               <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              //                 <View style={{ marginRight: 10 }}>

              //                 </View>

              //               </View>
              //             </View>
              //           </View>

              //         </TouchableOpacity>
              //       </View>
              //     );
              //   }}
              // />




            }
          </View>





        </View>


        {/* <View style={{ height: 100 }} /> */}
        {/* </ScrollView> */}

        {/* <TouchableOpacity onPress={()=>props.navigation.navigate('ShopProdCart')} style={{width:'80%',height:60,flexDirection:'row',justifyContent:'flex-end',position:'absolute',bottom:40, right:20, shadowColor: '#FFD037', shadowOffset: {width: 0,height: 3},shadowRadius: 1,shadowOpacity: 0.1,elevation: 5}}> */}


      </ScrollView >
      {
        !showReportModal && (<TouchableOpacity onPress={() => { props.navigation.navigate('CookingUpload') }} style={{ bottom: 60, right: 20, position: 'absolute', alignSelf: 'flex-end', width: 80, height: 80, borderRadius: 80 / 2, backgroundColor: '#ED1C24', justifyContent: 'center', alignItems: 'center', shadowColor: '#FFD037', shadowOffset: { width: 0, height: 3 }, shadowRadius: 1, shadowOpacity: 0.1, elevation: 5 }}>
          <Image source={require('../../../assets/images/fashion-upload-icon.png')} style={{ width: 40, height: 40 }} />
        </TouchableOpacity>)
      }
      {/* </TouchableOpacity> */}

      {loading || loading2 ? <Loader /> : null}
      <Modal
        isVisible={showReportModal}
        swipeDirection="down"
        onBackdropPress={() => { setShowReportModal(false), setSelectedReasonId(null) }}
        onSwipeComplete={(e) => {
          setShowReportModal(false)
          setSelectedReasonId(null);
        }}
        scrollTo={() => { }}
        scrollOffset={1}
        propagateSwipe={true}
        coverScreen={false}
        backdropColor='transparent'
        style={{ justifyContent: 'flex-end', margin: 0, backgroundColor: 'rgba(0,0,0,0.5)' }}
      >
        <View style={{ height: 'auto', backgroundColor: '#fff', borderTopLeftRadius: 30, borderTopRightRadius: 30 }}>
          <Text style={{ fontSize: 20, fontWeight: '700', color: '#455A64', textAlign: 'center', marginBottom: 20, marginTop: 30 }}>Report</Text>
          <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled={true}>

            <FlatList
              data={reportGet}
              showsHorizontalScrollIndicator={false}
              numColumns={1}
              keyExtractor={item => item.id}
              style={{ marginBottom: 10 }}
              renderItem={({ item, index }) => {
                // console.log('item.report_id', item.report_id);
                return (
                  <TouchableOpacity key={item.report_id} onPress={() => setSelectedReasonId(item.report_id)} style={selectedReasonId === item.report_id ? styles.selectedReasonView : styles.reasonView}>
                    <Image source={selectedReasonId === item.report_id ? require('../../../assets/images/fastion-selected-reason-icon.png') : require('../../../assets/images/fastion-reason-icon.png')} style={{ tintColor: '#ED1C24' }} />
                    <View style={{ marginLeft: 10 }}>
                      <Text style={{ fontSize: 14, lineHeight: 14, fontWeight: '400', color: '#455A64' }}>{item.feedback}</Text>
                      {item.description ?
                        <Text style={{ fontSize: 12, lineHeight: 12, fontWeight: '400', color: '#C5C6C9', marginTop: 2 }}>{item.description}</Text>
                        : null}
                    </View>
                  </TouchableOpacity>
                )
              }}
            />

            <TouchableOpacity onPress={() => { postReport(selectedReasonId) }} style={styles.reportButtonView}>
              <Text style={{ fontSize: 15, fontWeight: '500', color: '#fff', }}>Report</Text>
            </TouchableOpacity>

          </ScrollView>

        </View>
      </Modal>
      {console.log('showModal?.data', showModal?.data)}
      {
        showModal.isVisible ? (

          <VideoModel
            isVisible={showModal.isVisible}
            toggleModal={toggleModal}
            videoDetail={{ ...showModal?.data, url: showModal?.data?.file_url }}
            {...props}
          />
        ) : null
      }

      <PostModal
        isVisible={showPostsModal}
        setIsVisible={setShowPostsModal}
        startFromIndex={startFromIndex}
        data={categoryData}
        id={selectedID}
      />

    </SafeAreaView >
  );
}
const styles = StyleSheet.create({
  unselectedTabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#263238'
  },
  requestCallView: {
    marginTop: 10,
    width: 140,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#29913C',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#6D2F91',
    shadowOffset: { width: 3, height: 3 },
    shadowRadius: 5,
    shadowOpacity: 0.17,
    elevation: 2
  },
  VideoThumbWrapper: {
    position: 'relative',
    // width: '48%',
    // marginRight: 8,
    marginBottom: 4,

    width: dimensions.SCREEN_WIDTH / 1.5,
    height: 160,
    marginRight: 20,
    borderRadius: 15,
    // shadowColor:'#000',
    // shadowOffset: {width: 0,height: 3},
    // shadowRadius: 1,
    // shadowOpacity: 0.03,
    // elevation: 1,
  },
  PlayIconContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  PlayIconWrapper: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  BackGroundImage: {
    width: '100%',
    height: 160,
    justifyContent: 'center',
    borderRadius: 15
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    width: '53%',
    marginLeft: 6
  },
  buttonView: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  shippingView: {

    height: 688,
    backgroundColor: 'white',
    borderRadius: 10,
    width: 596,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#545454'
  },
  buttonText: {
    fontSize: 10,
    fontWeight: '500',
    color: '#8F93A0',
    marginLeft: 5
  },
  reasonView: {
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginBottom: 15,
    // paddingVertical:10,
    paddingHorizontal: 10,
    width: '90%',
    height: 60,
  },
  selectedReasonView: {
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginBottom: 15,
    // paddingVertical:10,
    paddingHorizontal: 10,
    width: '90%',
    height: 60,
    borderColor: '#E7F7FF',
    borderWidth: 1,
    shadowColor: '#455A64',
    shadowOffset: { width: 3, height: 3 },
    shadowRadius: 5,
    shadowOpacity: 0.10,
    elevation: 1
  },
  reportButtonView: {
    height: 60,
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#ED1C24',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 3, height: 3 },
    shadowRadius: 5,
    shadowOpacity: 0.10,
    elevation: 2
  },
  flatlistMainBottomView: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    backdropColor: 'red',
    width: dimensions.SCREEN_WIDTH,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderLeftColor: '#EAEBEB',
    borderRightColor: '#EAEBEB',
    borderBottomColor: '#EAEBEB',


  },

  flatlistMainView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'pink',
    paddingHorizontal: 15,
    paddingVertical: 10,
    width: dimensions.SCREEN_WIDTH / 1.5,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomWidth: 1,
    borderLeftColor: '#EDEEEE',
    borderRightColor: '#EDEEEE',
    borderBottomColor: '#EDEEEE'

  },
  followingImageView: {
    flexDirection: 'row',
    alignItems: 'center',

  },
  followingView: {
    justifyContent: 'center',
    marginLeft: 10
  },
  flatlistMainBottomView: {
    backgroundColor: 'white',
    height: 150,
    paddingHorizontal: 5,
    width: dimensions.SCREEN_WIDTH / 1.5,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    borderBottomWidth: 0.5,
    borderLeftColor: '#ED1C24',
    borderRightColor: '#ED1C24',
    borderBottomColor: '#ED1C24',


  },
  flatlistBottomView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
    marginVertical: 4
  },
  buttonsContainer: {

    alignItems: 'center',

    width: '100%',
    justifyContent: 'space-between',
    marginTop: -12, // Add margin between text and buttons
    // Align buttons with the texts backgroundColor: 'pink'


  },
  buttonIcon: {
    height: 20,
    width: 20,
    marginLeft: 5
  },
});
export default CookingHome








































































































