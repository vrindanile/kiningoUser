
import React, { useEffect, useState, useRef } from 'react';
import { View, Image, Text, StyleSheet, SafeAreaView, TextInput, FlatList, Alert, TouchableOpacity, ScrollView, ImageBackground, } from 'react-native';
import HomeHeaderRoundBottom from '../../../component/HomeHeaderRoundBottom';
import SearchInput2 from '../../../component/SearchInput2';
import SearchInputEnt from '../../../component/SearchInputEnt';
import FashionSearch from './components/FashionSearch';
import SerchInput from '../../../component/SerchInput';
import { dimensions, Mycolors } from '../../../utility/Mycolors';
import messaging from '@react-native-firebase/messaging';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../../../WebApi/Loader';
import { baseUrl, shop_eat_cart, user_payment_method, shop_eat_orders, shop_eat_cart_book_dining, shop_eat_cart_book_table, shop_eat_cart_id, shop_eat_business_id, shop_eat_menu_userid, requestPostApi, requestGetApi, shop_eat, connect_people_create_post, connect_people_newPost, art_getCollection, requestPostApiMedia, art_PostCollection, postApiWithToken2, art_HomePage, art_likeDislike, post_suggestion, get_suggestion, get_reportSuggestion, post_reportSuggestion } from '../../../WebApi/Service'
import LinearGradient from 'react-native-linear-gradient'
import { ImageSlider, ImageCarousel } from "react-native-image-slider-banner";
import MyButtons from '../../../component/MyButtons';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import Modal from 'react-native-modal';
import Toast from 'react-native-toast-message';

import AppIntroSlider from 'react-native-app-intro-slider';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
// import Loader from '../../../WebApi/Loader';
// import VideoPlayer from 'react-native-video-player'
import { createThumbnail } from "react-native-create-thumbnail";
import ViewMoreText from 'react-native-view-more-text';
import VideoPlayer from 'react-native-video-player'
import PostModal from './components/PostModal';
import ArtSearch from './components/ArtSearch'
import Video from 'react-native-video';
import { log } from 'react-native-reanimated';


const ArtHome = (props) => {
  const dispatch = useDispatch();
  const User = useSelector(state => state.user.user_details)
  console.log('User', User);
  const player = useRef(null);
  const [searchValue, setsearchValue] = useState('')
  const [scrollEnabled, setScrollEnabled] = useState(false)
  const myTextInput = useRef()
  const [multiSliderValue, setMultiSliderValue] = useState([0, 100])
  const [showChooseMilesModal, setShowChooseMilesModal] = useState(false)
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
  const [categoryData, setCategorydata] = useState([])
  const [isLiked, setIsLiked] = useState(false);
  const [latestRecords, setLatestRecords] = useState([]);
  const [getSuggested, setGetSuggested] = useState('')
  const [categories, setCategories] = useState('')
  const [profileModal, setProfileModal] = useState('')
  const [reportGet, setReportGet] = useState('')
  const [myArticle, setMyArticle] = useState('')
  const [reportReasonData, setReportReasonData] = useState([
    {
      id: '1',
      name: 'I just don’t like it',
      description: '',
      selected: true
    },
    {
      id: '2',
      name: 'Nudity or pornography',
      description: '',
      selected: false
    },
    {
      id: '3',
      name: 'Hate speech or symbols',
      description: 'Racist, homophobic or sexist slurs',
      selected: false
    },
    {
      id: '4',
      name: 'Violence or threat of violence',
      description: `Graphic injury, unlawful activity, dangerous or criminal organizations`,
      selected: false
    },
    {
      id: '5',
      name: 'Sale or promotion of firearms',
      description: '',
      selected: false
    },
    {
      id: '6',
      name: 'Sale or promotion of drugs',
      description: '',
      selected: false
    },
    {
      id: '7',
      name: 'Harassment or bullying',
      description: '',
      selected: false
    },
    {
      id: '8',
      name: 'Intellectual property violation',
      description: 'Copyright or trademark infringement',
      selected: false
    },
  ])
  const [videoDetails, setVideoDetails] = useState([
    { url: `http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4` },
    { url: `http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4` },
    { url: `http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4` },
  ])
  const [classesList, setClassesList] = useState([
    {
      id: '1',
      title: 'Graphic Design Class',
      price: 949,
      desc: ['Get 2x deeper dust removal with unique foam je technology', 'Recommended for ACs serviced more than 6 months ago'],
      distance: '3 kms away',
      img: require('../../../assets/images/service-product-image.png'),
    },
    {
      id: '2',
      title: 'Graphic Design Class',
      price: 949,
      desc: ['Get 2x deeper dust removal with unique foam je technology', 'Recommended for ACs serviced more than 6 months ago'],
      distance: '3 kms away',
      img: require('../../../assets/images/service-product-image.png'),
    },
    {
      id: '3',
      title: 'Graphic Design Class',
      price: 949,
      desc: ['Get 2x deeper dust removal with unique foam je technology', 'Recommended for ACs serviced more than 6 months ago'],
      distance: '3 kms away',
      img: require('../../../assets/images/service-product-image.png'),
    },
  ])
  const [aroundTheWorldData, setAroundTheWorldData] = useState([
    {
      id: '1',
      name: 'Leslie Alexander',
      desc: '',
      time: '14 hours ago',
      img: require('../../../assets/images/fashion-around-the-world-image.png'),
      likes: '4k',
      dislikes: '1k',
    },
    {
      id: '2',
      name: 'Leslie Alexander',
      desc: '',
      time: '14 hours ago',
      img: require('../../../assets/images/fashion-around-the-world-image.png'),
      likes: '4k',
      dislikes: '1k',
    },
    {
      id: '3',
      name: 'Leslie Alexander',
      desc: '',
      time: '14 hours ago',
      img: require('../../../assets/images/fashion-around-the-world-image.png'),
      likes: '4k',
      dislikes: '1k',
    },
  ])
  const [courseData, setCourseData] = useState([
    {
      id: '1',
      title: 'Celebrity Style',
      desc: '',
      time: '',
      img: require('../../../assets/images/fashion-celebrity-style.png'),
    },
    {
      id: '2',
      title: 'Street Style',
      desc: '',
      time: '',
      img: require('../../../assets/images/fashion-celebrity-style.png'),
    },
    {
      id: '3',
      title: 'Models',
      desc: '',
      time: '',
      img: require('../../../assets/images/fashion-celebrity-style.png'),
    },
  ])
  const [upData, setupData] = useState([
    {
      id: '1',
      catId: '1',
      title: 'Intel 3rd Gen Motherboard',
      desc: '',
      price: '$140.00',
      time: '',
      img: require('../../../assets/images/intel_motherboard.png'),
    },
    {
      id: '2',
      catId: '2',
      title: 'Intel 3rd Gen Motherboard',
      desc: '',
      price: '$140.00',
      time: '',
      img: require('../../../assets/images/intel_motherboard.png'),
    },
    {
      id: '3',
      catId: '3',
      title: 'Intel 3rd Gen Motherboard',
      desc: '',
      price: '$140.00',
      time: '',
      img: require('../../../assets/images/intel_motherboard.png'),
    },
    {
      id: '4',
      catId: '4',
      title: 'Intel 3rd Gen Motherboard',
      desc: '',
      price: '$140.00',
      time: '',
      img: require('../../../assets/images/intel_motherboard.png'),
    },
    {
      id: '5',
      catId: '1',
      title: 'Intel 3rd Gen Motherboard',
      desc: '',
      price: '$140.00',
      time: '',
      img: require('../../../assets/images/intel_motherboard.png'),
    },
    {
      id: '6',
      catId: '2',
      title: 'Intel 3rd Gen Motherboard',
      desc: '',
      price: '$140.00',
      time: '',
      img: require('../../../assets/images/intel_motherboard.png'),
    },
    {
      id: '7',
      catId: '3',
      title: 'Intel 3rd Gen Motherboard',
      desc: '',
      price: '$140.00',
      time: '',
      img: require('../../../assets/images/intel_motherboard.png'),
    },
  ])
  const [thumb, setThumb] = useState('')
  const [selectedID, setSelectedID] = useState('')
  const [startFromIndex, setStartFromIndex] = useState(0)
  const [introSliderData] = useState([
    // require('../../assets/Group75972.png'),
    { key: 'one', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5a5uCP-n4teeW2SApcIqUrcQApev8ZVCJkA&usqp=CAU', title: 'Art-Aficionado Tim Newton on How to Collect Art', status: 'Fine Art', date: 'March 4, 2022' },
    { key: 'two', image: 'https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg', title: 'Art-Aficionado Tim Newton on How to Collect Art', status: 'Fine Art', date: 'March 4, 2022' },
    { key: 'three', image: 'https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510__340.jpg', title: 'Art-Aficionado Tim Newton on How to Collect Art', status: 'Fine Art', date: 'March 4, 2022' }
  ])


  messaging().onMessage(remoteMessage => {
    const data = remoteMessage;
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
    const data = remoteMessage.data;
    console.log('Notification caused app to open from the background state:', remoteMessage);
    // if (remoteMessage.notification.title === 'Kinengo') {
    //   if (remoteMessage.notification.body === 'Order Delivered Successfully!') {
    //     setalert_sms3('Do you want to rate order?');
    //     setMy_Alert3(true);
    //     setRemoteMessageData(remoteMessage.data);
    //   } else {
    //     props.navigation.navigate('ShopMyOrderDetails', { data: remoteMessage.data });
    //   }
    // } else if (remoteMessage.notification.body === 'new message') {
    //   props.navigation.navigate('ShopMyOrderDetails', { data: remoteMessage.data });
    //   dispatch(setMessageCount(mapdata.messagecount + 1));
    // }
  });

  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      console.log('====================================');
      console.log(remoteMessage, 'my message after notification');
      console.log('====================================');
      // if (remoteMessage.notification.title === 'Kinengo') {
      //   if (remoteMessage.notification.body === 'Order Delivered Successfully!') {
      //     setalert_sms3('Do you want to rate order?');
      //     setMy_Alert3(true);
      //     setRemoteMessageData(remoteMessage.data);
      //   } else {
      //     props.navigation.navigate('ShopMyOrderDetails', { data: remoteMessage.data });
      //   }
      // } else if (remoteMessage.notification.body === 'new message') {
      //   dispatch(setMessageCount(mapdata.messagecount + 1));
      //   props.navigation.navigate('ShopMyOrderDetails', { data: remoteMessage.data });
      // }
    });



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
      // console.log('my user id of state----->', userID);
    });
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [props]);




  const Likepost = async (items) => {
    console.log('kkkkk', items);


    setLoading(true)
    var data = {
      object_id: items,
      object_type: 'article',
      reaction_type: "like"
    }
    console.log('====================================');
    console.log(data);
    console.log('====================================');
    const { responseJson, err } = await requestPostApi(art_likeDislike, data, 'POST', User.token)
    setLoading(false)
    console.log('the res like==>>', responseJson)
    // setIsLiked(!isLiked);
    if (responseJson.headers.success == 1) {
      ArtCategory()
      // Toast.show({ text1: responseJson.headers.message });
    } else {

      setalert_sms(err)
      setMy_Alert(true)
    }
  }
  const Dislikepost = async (items) => {
    console.log('kkkkk', items);


    setLoading(true)
    var data = {
      object_id: items,
      object_type: 'article',
      reaction_type: "dislike"
    }
    console.log('====================================');
    console.log(data);
    console.log('====================================');
    const { responseJson, err } = await requestPostApi(art_likeDislike, data, 'POST', User.token)
    setLoading(false)
    console.log('the res dislike==>>', responseJson)
    // setIsLiked(!isLiked);
    if (responseJson.headers.success == 1) {
      ArtCategory()
      // Toast.show({ text1: responseJson.headers.message });
    } else {

      setalert_sms(err)
      setMy_Alert(true)
    }
  }
  const _renderItem = ({ item }) => {

    // let videoUrl = null; // Declare and initialize the videoUrl variable
    console.log('item of home sugggggg', item);
    return (
      <>
        <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'center', }}>
          {item.type === 'video' ?
            <TouchableOpacity style={{ width: '100%', height: 227, borderRadius: 10, alignSelf: 'center', resizeMode: 'cover' }} onPress={() => { setShowPostsModal(true), setSelectedID(item.id) }} >
              <VideoPlayer
                resizeMode="contain"
                // video={{ uri: videoUrl }}
                style={{ borderRadius: 10, borderWidth: 2, }}
                videoWidth={'100%'}
                videoHeight={227}
                autoplay={false}
                thumbnail={{ uri: item.thumb.path }}
                endWithThumbnail
                disableControlsAutoHide
                customStyles={{
                  thumbnail: { width: '100%', height: 227, borderRadius: 10, alignSelf: 'center', resizeMode: 'cover' },
                  // videoWrapper: { width: dimensions.SCREEN_WIDTH / 2.5, height: 90, },
                  wrapper: { width: '100%', height: 227 },
                }}
              />
            </TouchableOpacity>
            :
            <TouchableOpacity onPress={() => { props.navigation.navigate('ArtPost', { id: item.id }) }} style={{ width: '100%', height: 227, alignSelf: 'center', backgroundColor: 'red', borderRadius: 10 }}>
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
              backgroundColor: 'rgba(41, 145, 60, 0.5)', borderBottomLeftRadius: 10, borderBottomRightRadius: 10
            }}

          >

            <Text numberOfLines={1} style={{ color: 'white', fontSize: 16, fontWeight: '400', width: '95%', alignSelf: 'center', lineHeight: 30 }}>{item.headline
            }</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ color: 'white', fontWeight: '400', fontSize: 14, marginHorizontal: 10, marginTop: 3 }}>Category: {item.category
              }</Text>
              <Text style={{ color: 'white', fontWeight: '400', fontSize: 12, marginHorizontal: 10, marginTop: 3 }}>{item.created_date}</Text>
            </View>
          </View>
          {/* </LinearGradient> */}
        </View >
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
              backgroundColor: activeIndex === index ? '#29913C' : '#D9D9D9',
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
  const ArtCategory = async () => {
    setLoading(true)

    console.log('my url---------->', art_HomePage)

    const { responseJson, err } = await requestGetApi(art_HomePage, '', 'GET', User.token)
    setLoading(false)
    console.log('the res Home after hit==>>', responseJson)
    if (responseJson.headers.success == 1) {
      console.log('the res after sucess', responseJson.body.articles)
      // setCategorydata(responseJson.body.articles)
      generateThumb(responseJson.body.articles)
      const latestRecordsArray = responseJson.body.articles.slice(0, 3);

      // Update the state with the latest records
      setLatestRecords(latestRecordsArray);
      // Toast.show({ text1: responseJson.headers.message });
    } else {

      setalert_sms(err)
      setMy_Alert(true)
    }
  }


  const generateThumb = async (item) => {
    setLoading2(true)
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
          return { ...el, type: "none" };
        }
        else if (el.files.find((js) => js.post_type == "Image")) {
          return {
            ...el,
            type: "image",
          };
        } else {
          console.log("createThumbnail will be called", el.files[0].file_url);
          const thumb = await createThumbnail({
            url: el.files[0].file_url,
            timeStamp: 1000, // Specify the time position for the thumbnail (in milliseconds)
          });
          return {
            ...el,
            thumb,
            type: "video",
          };
        }
      })

    );


    console.log("allData", allData);
    const data = allData
    console.log(data, 'data111');
    setCategorydata(data);

    // console.log('llllllllffff');
    // const getSquare = async (file) => {
    //   console.log(file.files[0].file_url, 'file');
    //   const thumbnail = await createThumbnail({
    //     url: file.files[0].file_url,
    //     timeStamp: 10000, // Specify the time position for the thumbnail (in milliseconds)
    //   });
    //   console.log('articleDatathumbnail', url)
    //   return thumbnail

    // }
    // const printSquares = async () => {
    //   const nums =
    //     item.filter(el => {
    //       if (!el.files) {
    //         return false
    //       } else {
    //         if (el.files.find(js => js.post_type == 'Video')) {
    //           return true
    //         } else {
    //           return false
    //         }
    //       }
    //     })
    //   const promiseArray = nums.map(x => getSquare(x));
    //   const resolvedPromises = await Promise.all(promiseArray);
    //   console.log(resolvedPromises, 'hhhhhhh');
    // };
    // printSquares();
    setLoading2(false)
  };


  // fr suggested 

  const generateThum = async (item) => {
    console.log('my thum for suggested', item);
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
          return { ...el, type: "none" };
        }
        else if (el.files.find((js) => js.post_type == "Image")) {
          return {
            ...el,
            type: "image",
          };
        } else {
          console.log("createThumbnail will be called for suggested post  ", el.files[0].file_url);
          const thumb = await createThumbnail({
            url: el.files[0].file_url,
            timeStamp: 1000, // Specify the time position for the thumbnail (in milliseconds)
          });
          console.log('out of thumb function');
          return {
            ...el,
            thumb,
            type: "video",
          };
        }
      })

    );


    console.log("allDatafor suggeste drecom", allData);
    const data = allData
    console.log(data, 'data111 uuuuu');
    setGetSuggested(data)

    // console.log('llllllllffff');
    // const getSquare = async (file) => {
    //   console.log(file.files[0].file_url, 'file');
    //   const thumbnail = await createThumbnail({
    //     url: file.files[0].file_url,
    //     timeStamp: 10000, // Specify the time position for the thumbnail (in milliseconds)
    //   });
    //   console.log('articleDatathumbnail', url)
    //   return thumbnail

    // }
    // const printSquares = async () => {
    //   const nums =
    //     item.filter(el => {
    //       if (!el.files) {
    //         return false
    //       } else {
    //         if (el.files.find(js => js.post_type == 'Video')) {
    //           return true
    //         } else {
    //           return false
    //         }
    //       }
    //     })
    //   const promiseArray = nums.map(x => getSquare(x));
    //   const resolvedPromises = await Promise.all(promiseArray);
    //   console.log(resolvedPromises, 'hhhhhhh');
    // };
    // printSquares();
    setLoading3(false)
  };



  const Categories = async () => {
    setLoading(true)
    var fUrl = art_getCollection
    var urls = '?module_id=' + '53'
    console.log('my url---------->', urls)
    if (urls != undefined) {
      fUrl = fUrl + urls
    }
    // console.log("LIKE CLICK:::",isSaved);
    const { responseJson, err } = await requestGetApi(fUrl, '', 'GET', User.token)
    setLoading(false)
    console.log('response afer click of items', responseJson)
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
    var fUrl = post_suggestion
    var urls = 53
    console.log('my url---------->', urls)
    if (urls != undefined) {
      fUrl = fUrl + urls
    }
    console.log('my url post', fUrl)
    var data = {
      "object_type": "article",
      "object_id": items
    }
    console.log('====================================');
    console.log(data, 'my data of post');
    console.log('====================================');
    const { responseJson, err } = await requestPostApi(fUrl, data, 'POST', User.token)
    setLoading(false)
    console.log('Post suggestion of art', responseJson)
    // setIsLiked(!isLiked);
    if (responseJson.headers.success == 1) {
      //ArtCategory()
      // Toast.show({ text1: responseJson.headers.message });
    } else {
      console.log(responseJson.headers.message, errmshhh);
      setalert_sms(err)
      setMy_Alert(true)
    }
  }

  const getSuggestion = async () => {
    setLoading(true)
    var fUrl = get_suggestion
    var urls = 53
    console.log('my url---------->', urls)
    if (urls != undefined) {
      fUrl = fUrl + urls
    }
    console.log(' get suggestion url', fUrl)

    console.log('my url---------->', fUrl)

    const { responseJson, err } = await requestGetApi(fUrl, '', 'GET', User.token)
    setLoading(false)
    console.log('the res of get suggest post', responseJson)
    if (responseJson.headers.success == 1) {
      console.log('the res after sucess of post suggested1111', responseJson.body.data)
      //setGetSuggested(responseJson.body)
      generateThum(responseJson.body.data)
      // setCategorydata(responseJson.body.articles)
      // generateThumb(responseJson.body.articles)
      // const latestRecordsArray = responseJson.body.articles.slice(0, 3);

      // // Update the state with the latest records
      // setLatestRecords(latestRecordsArray);
      // Toast.show({ text1: responseJson.headers.message });
    } else {

      setalert_sms(err)
      setMy_Alert(true)
    }
  }

  const getReport = async () => {
    setLoading(true)
    const { responseJson, err } = await requestGetApi(get_reportSuggestion, '', 'GET', User.token)
    setLoading(false)
    console.log('the res of get suggest post', responseJson)
    if (responseJson.headers.success == 1) {
      console.log('the res after sucess report get', responseJson.body.data)
      setReportGet(responseJson.body.data)

    } else {

      setalert_sms(err)
      setMy_Alert(true)
    }
  }

  const postReport = async (items) => {
    console.log('kkkkk', items);
    if (selectedReasonId === null) {
      Toast.show({ text1: 'Select a reason for report' });
      return; // Exit the function to prevent further execution
    }

    setLoading(true);
    var fUrl = post_reportSuggestion;
    var urls = myArticle;
    console.log('my url---------->', urls);
    if (urls !== undefined) {
      fUrl = fUrl + urls;
    }
    var data = {
      report_id: items,
      comment: ""
    };

    const { responseJson, err } = await requestPostApi(fUrl, data, 'POST', User.token);
    setLoading(false);
    console.log('the res of report', responseJson);
    setShowReportModal(false);

    if (responseJson.headers.success === 1) {
      Toast.show({ text1: responseJson.headers.message });
      setSelectedReasonId(null);
      console.log('report post article', responseJson);
    } else {
      setalert_sms(err);
      setMy_Alert(true);
    }
  }


  return (
    <SafeAreaView scrollEnabled={scrollEnabled} style={{ backgroundColor: '#F8F8F8' }}>
      <ScrollView>
        <HomeHeaderRoundBottom height={100} extraStyle={{ paddingtop: 10, paddingBottom: 25 }} paddingHorizontal={15} borderBottomLeftRadius={20} borderBottomRightRadius={20} backgroundColor='#29913C'
          press1={() => { props.navigation.goBack() }} img1={require('../../../assets/images/service-header-back-button.png')} img1width={25} img1height={18}
          press2={() => { }} title2={'Art'} fontWeight={'500'} img2height={20} color={'#fff'}
          press3={() => { props.navigation.navigate('ArtNotifications') }} img3={require('../../../assets/images/fashion-bell-icon.png')} img3width={25} img3height={22}
          press4={() => { props.navigation.navigate('MyProfile') }} img4={require('../../../assets/People/PeopleProfileIConModal.png')} img4width={25} img4height={22}
        />
        <View style={{ top: -20, width: '90%', alignSelf: 'center' }} >

          <ArtSearch marginTop={0}
            // serchValue={searchValue}

            searchIcon={require('../../../assets/Art/CreationArtSearch.png')}
            // onChangeText={(e) => { setsearchValue(e) }}
            press={() => { props.navigation.navigate('ArtCategories', { cat_name: {}, from: 'seach' }) }}
            // presssearch={() => { Alert.alert('Search Pressed') }}
            paddingLeft={20} />

        </View>

        <View style={{
          flex: 1, width: '90%',
          marginLeft: 'auto',
          marginRight: 'auto',
          backgroundColor: '#F8F8F8'
        }}>
          <View style={{ width: dimensions.SCREEN_WIDTH * 0.9, alignSelf: 'flex-start', marginTop: 0, marginBottom: 10, marginTop: 10 }}>
            <FlatList
              data={categories}
              showsHorizontalScrollIndicator={true}
              horizontal
              renderItem={({ item, index }) => {
                return (

                  <TouchableOpacity style={{ height: 140, marginRight: 15, overflow: 'hidden', position: 'relative', alignItems: 'center', paddingHorizontal: 10, width: 140, borderRadius: 10 }}
                    onPress={() => { props.navigation.navigate('ArtCategories', { cat_name: item, from: 'bycategory' }) }}>
                    <Image source={{ uri: item.image }} style={{ width: dimensions.SCREEN_WIDTH / 2.8, height: 160 }} resizeMode='stretch'></Image>
                    <LinearGradient
                      colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.43)']}
                      style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, zIndex: 1, }}
                    >
                      <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center', }}>
                        <Text style={{ fontSize: 14, fontWeight: '500', color: '#fff', bottom: 20 }}>{item?.name}</Text>
                      </View>
                    </LinearGradient>
                  </TouchableOpacity>
                )
              }}
              keyExtractor={item => item.id}
            />
          </View>

          <View style={{ marginTop: 20, width: '100%', justifyContent: 'center', alignItems: 'center', }}>
            {categoryData.length > 0 ?

              <AppIntroSlider

                // data={categoryData.filter(el => el.type !== 'none').slice(0, 3)}
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
            <TouchableOpacity onPress={() => { props.navigation.navigate('ArtViewAll') }}>
              <Text style={{ fontSize: 13, fontWeight: '400', color: '#29913C' }}>View all</Text>
            </TouchableOpacity>
          </View>

          <View style={{ width: dimensions.SCREEN_WIDTH * 0.9, alignSelf: 'flex-start', marginTop: 10, height: 300, }}>

            <ScrollView nestedScrollEnabled={true}>
              <FlatList
                //data={categoryData.slice(4, 11)}
                data={categoryData}

                showsHorizontalScrollIndicator={true}

                renderItem={({ item, index }) => {
                  console.log('category item', item)
                  let videoUrl = null; // Declare and initialize the videoUrl variable

                  if (item.type === "video") {
                    // Get the video URL from the files array
                    videoUrl = item.files[0]?.file_url; // Assuming the URL is stored in the 'url' property of the file object
                  }
                  console.log();
                  return (

                    <>
                      <TouchableOpacity style={{ width: dimensions.SCREEN_WIDTH, marginRight: 15, flexDirection: 'row', marginBottom: 20, }}
                        onPress={() => {
                          postsuugestion(item.id)
                          props.navigation.navigate('ArtPost', { id: item.id })

                        }}>
                        <TouchableOpacity onPress={() => {
                          setStartFromIndex(index);
                          setSelectedID(item.id)
                          item.type === "video" ? setShowPostsModal(true) : null
                        }}>
                          {item.type == 'video' ?
                            <VideoPlayer
                              resizeMode="contain"
                              video={{ uri: videoUrl }}
                              style={{ borderRadius: 10, borderWidth: 2, }}
                              videoWidth={dimensions.SCREEN_WIDTH / 2.5}
                              videoHeight={100}
                              autoplay={false}
                              thumbnail={{ uri: item.thumb.path }}
                              endWithThumbnail
                              disableControlsAutoHide
                              customStyles={{
                                thumbnail: { width: dimensions.SCREEN_WIDTH / 2.5, height: 105 },
                                // videoWrapper: { width: dimensions.SCREEN_WIDTH / 2.5, height: 90, },
                                wrapper: { width: dimensions.SCREEN_WIDTH / 2.5, height: 90 },
                              }}
                            />
                            : <Image source={{
                              uri: item.cover_photo
                            }} style={{ width: dimensions.SCREEN_WIDTH / 2.5, height: 105, borderRadius: 10, }} resizeMode='stretch'></Image>}

                        </TouchableOpacity>
                        <View style={{ flexDirection: 'column', width: '90%' }}>
                          <View style={{ width: '50%', marginTop: 4, marginLeft: 7, justifyContent: 'flex-start' }}>
                            <Text numberOfLines={2} style={{ fontSize: 14, fontWeight: '400', color: '#000000' }} >
                              {item.headline}
                            </Text>
                          </View>

                          <View style={{ flexDirection: 'row', marginTop: 8, alignItems: 'center', justifyContent: 'space-between', width: '40%' }}>
                            <Text style={{ fontSize: 12, fontWeight: '400', color: 'black', marginLeft: 6, }}>By :- <Text style={{ fontSize: 12, fontWeight: '400', color: '#B4BBC6', marginLeft: 6, }}>{item.username}</Text></Text>
                            {/* <View style={{ height: 14, borderLeftColor: '#B2B7B9', borderLeftWidth: 1, justifyContent: 'center' }} /> */}


                          </View>
                          <Text style={{ fontSize: 12, fontWeight: '400', color: 'black', marginLeft: 6, }}>Created at:- <Text style={{ fontSize: 12, fontWeight: '400', color: '#B4BBC6', textAlign: 'left', }}>
                            {/* {new Date(item.created_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} */}
                            {item.created_date}
                            {/* {item.created_date.slice(11, 16)} */}
                          </Text></Text>
                          <View style={styles.buttonsRow}>
                            <TouchableOpacity style={styles.buttonView} onPress={() =>
                              Likepost(item.id
                              )

                              // console.log('my like clicked')
                            } >
                              <Image

                                source={
                                  item.totalLikes <= 0
                                    ?
                                    require('../../../assets/images/fashion-dark-like-button.png') // Use dislike image
                                    : require('../../../assets/Art/LikeActiveArt.png')}
                                // Use like image

                                style={{ height: 20, width: 20 }} />
                              <Text style={styles.buttonText}>{item.totalLikes}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.buttonView} onPress={() => Dislikepost(item.id
                            )} >
                              <Image source={
                                item.totalDislikes
                                  <= 0
                                  ? require('../../../assets/images/fashion-dark-dislike-button.png')
                                  // Use dislike image
                                  : require

                                    ('../../../assets/Art/DislikeActiveArt.png') // Use like image
                              } // Use like image
                                style={{ height: 20, width: 20 }} />
                              <Text style={styles.buttonText}>{item.totalDislikes}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.buttonView}>
                              <Image source={require('../../../assets/images/fashion-share-button.png')} style={{ height: 20, width: 20 }} />
                              <Text style={styles.buttonText}>Share</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { setShowReportModal(true), setMyArticle(item.id) }} style={styles.buttonView}>
                              <Image source={require('../../../assets/images/fashion-report-button.png')} style={{ height: 20, width: 20 }} />
                              <Text style={styles.buttonText}>Report</Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </TouchableOpacity >
                      <View style={{ borderBottomWidth: 1, borderBottomColor: '#D9D9D9', height: 1, width: '100%', marginBottom: 20 }}></View>
                    </>
                  )
                }}
                keyExtractor={item => item.id}
              />
            </ScrollView>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10, marginTop: 35 }}>
            <Text style={{ fontSize: 16, fontWeight: '500', color: '#263238' }}>Recommended for you</Text>
            <TouchableOpacity onPress={() => { props.navigation.navigate('AllSuggested') }} >
              <Text style={{ fontSize: 13, fontWeight: '400', color: '#29913C' }}>View all</Text>
            </TouchableOpacity>
          </View>

          <View style={{ width: dimensions.SCREEN_WIDTH * 0.9, alignSelf: 'flex-start', marginTop: 0, marginBottom: 10, marginTop: 10 }}>
            {console.log('jjjjjjjjcheck', getSuggested)
            }
            {getSuggested.length > 0 ? (
              <FlatList
                data={getSuggested}
                showsHorizontalScrollIndicator={true}
                horizontal
                renderItem={({ item, index }) => {
                  console.log(item, 'my update bu thumb')

                  return (

                    <TouchableOpacity style={{ width: dimensions.SCREEN_WIDTH / 1.5, height: 160, marginRight: 15 }}
                      onPress={() => { props.navigation.navigate('ArtPost', { id: item.id, }) }}>

                      {item.type == 'video' ?
                        // <Image source={{ uri: item.thumb.path }} style={{ width: dimensions.SCREEN_WIDTH / 2.5, height: 105, borderRadius: 10, }}></Image> 
                        <VideoPlayer
                          resizeMode="contain"
                          // video={{ uri: videoUrl }}
                          style={{ borderRadius: 10, borderWidth: 2, }}
                          videoWidth={dimensions.SCREEN_WIDTH / 1.5}
                          videoHeight={160}
                          autoplay={false}
                          thumbnail={{ uri: item.thumb.path }}
                          endWithThumbnail
                          disableControlsAutoHide
                          customStyles={{
                            thumbnail: { width: dimensions.SCREEN_WIDTH / 1.5, height: 160 },
                            // videoWrapper: { width: dimensions.SCREEN_WIDTH / 2.5, height: 90, },
                            wrapper: { width: dimensions.SCREEN_WIDTH / 1.5, height: 160 },
                          }}
                        />
                        :
                        <Image source={{ uri: item.cover_photo }} style={{ width: dimensions.SCREEN_WIDTH / 1.5, height: 160, borderRadius: 10 }}></Image>

                        // {/* <Image source={{ uri: item.cover_photo }} style={{ width: dimensions.SCREEN_WIDTH / 1.5, height: 160, borderRadius: 10 }}></Image> */}
                      }
                    </TouchableOpacity>
                  )
                }}
                keyExtractor={item => item.id}
              />
            ) : (

              <FlatList
                data={categoryData.sort((a, b) => new Date(a.created_date) - new Date(b.created_date))}
                //data={categoryData}
                showsHorizontalScrollIndicator={true}
                horizontal
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item, index }) => {
                  console.log(item, 'my updated by thumb on data');
                  return (
                    <TouchableOpacity
                      style={{ width: dimensions.SCREEN_WIDTH / 1.5, height: 160, marginRight: 15 }}
                      onPress={() => {
                        props.navigation.navigate('ArtPost', { id: item.id });
                      }}
                    >
                      {item.type === 'video' ? (
                        <VideoPlayer
                          resizeMode="contain"
                          style={{ borderRadius: 10, borderWidth: 2 }}
                          videoWidth={dimensions.SCREEN_WIDTH / 1.5}
                          videoHeight={160}
                          autoplay={false}
                          thumbnail={{ uri: item.thumb.path }}
                          endWithThumbnail
                          disableControlsAutoHide
                          customStyles={{
                            thumbnail: { width: dimensions.SCREEN_WIDTH / 1.5, height: 160 },
                            wrapper: { width: dimensions.SCREEN_WIDTH / 1.5, height: 160 },
                          }}
                        />
                      ) : (
                        <Image
                          source={{ uri: item.cover_photo }}
                          style={{ width: dimensions.SCREEN_WIDTH / 1.5, height: 160, borderRadius: 10 }}
                        />
                      )}
                    </TouchableOpacity>
                  );
                }}
              />)}
          </View>


          <View style={{ height: 10 }} />


        </View>


        <View style={{ height: 100 }} />
      </ScrollView>

      {/* <TouchableOpacity onPress={()=>props.navigation.navigate('ShopProdCart')} style={{width:'80%',height:60,flexDirection:'row',justifyContent:'flex-end',position:'absolute',bottom:40, right:20, shadowColor: '#FFD037', shadowOffset: {width: 0,height: 3},shadowRadius: 1,shadowOpacity: 0.1,elevation: 5}}> */}
      {!showReportModal && (<TouchableOpacity onPress={() => { props.navigation.navigate('ArtUpload') }} style={{ bottom: 60, right: 20, position: 'absolute', alignSelf: 'flex-end', width: 80, height: 80, borderRadius: 80 / 2, backgroundColor: '#29913C', justifyContent: 'center', alignItems: 'center', shadowColor: '#FFD037', shadowOffset: { width: 0, height: 3 }, shadowRadius: 1, shadowOpacity: 0.1, elevation: 5 }}>
        <Image source={require('../../../assets/images/fashion-upload-icon.png')} style={{ width: 40, height: 40 }} />
      </TouchableOpacity>)}
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
                console.log('item.report_id', item.report_id);
                return (
                  <TouchableOpacity key={item.report_id} onPress={() => setSelectedReasonId(item.report_id)} style={selectedReasonId === item.report_id ? styles.selectedReasonView : styles.reasonView}>
                    <Image source={selectedReasonId === item.report_id ? require('../../../assets/images/fastion-selected-reason-icon.png') : require('../../../assets/images/fastion-reason-icon.png')} style={{ tintColor: '#29913C' }} />
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

      {/* <Modal
        animationType="fade"
        transparent={true}
        visible={showPostsModal}
        onRequestClose={() => {
          setShowPostsModal(false);
        }}>
        <View
          style={styles.shippingView}>
          <ScrollView>
            <View
              style={{
                // width: "100%",
                // borderRadius: 20,
                // marginTop: 115,
                // justifyContent: "center",
                // alignItems: 'center',
                // shadowColor: '#000',
                // shadowOffset: {
                //   width: 0,
                //   height: 2,
                // },
                // shadowOpacity: 0.25,
                // shadowRadius: 4,
                // elevation: 6,

              }}>

              <View style={{
                backgroundColor: '#FFFFFF',


                borderRadius: 32,
                alignItems: 'center',
                flexDirection: 'column'
              }}>
                <TouchableOpacity onPress={() => { setIsVisible(false) }}
                  style={{ position: "absolute", width: 13, borderRadius: 35, height: 13, right: 20, top: 20 }}>
                  <Image
                    source={require('../../..//assets/images/dating-reject-image.png')}
                    style={{
                      width: 13,
                      height: 13, alignSelf: 'center'
                    }}

                  />
                </TouchableOpacity>

                <TouchableOpacity style={{ marginTop: 15, marginHorizontal: 20, height: 25, flexDirection: "row", justifyContent: "center", alignItems: 'center' }}>
                  <Text style={{ marginTop: 2, marginLeft: 10, textAlign: 'center', fontSize: 20, color: '#263238', fontWeight: '500', fontFamily: 'Cera Pro' }}></Text>


                </TouchableOpacity>
                <View style={{ width: 53, height: 53, borderRadius: 8, marginTop: 28 }}>
                </View>
                <View style={{
                  marginTop: -39
                }}>


                </View>
                <View style={{

                }}>


                </View>
                <View style={{ justifyContent: "center", alignItems: "center", marginBottom: 20, flexDirection: 'row', height: 45, marginHorizontal: 20, marginTop: 30 }}>
                  <TouchableOpacity
                  // onPress={() => onReciever()
                  //     // navigation.navigate('Sucess')
                  // }
                  >
                    <View style={{ justifyContent: 'center', width: 286, flex: 1, backgroundColor: '#0F265B', borderRadius: 7 }}>
                      <Text style={{ color: 'white', fontFamily: 'Avenir', fontWeight: '400', fontSize: 14, alignSelf: 'center' }}>Submit </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </Modal> */}



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
    backgroundColor: '#29913C',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 3, height: 3 },
    shadowRadius: 5,
    shadowOpacity: 0.10,
    elevation: 2
  }
});
export default ArtHome 