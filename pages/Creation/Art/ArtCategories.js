// // import React, { useEffect, useState, useRef } from 'react';
// // import { View, Image, Text, StyleSheet, SafeAreaView, TextInput, FlatList, Alert, TouchableOpacity, ScrollView, ImageBackground, } from 'react-native';
// // import HomeHeaderRoundBottom from '../../../component/HomeHeaderRoundBottom';
// // import { baseUrl, shop_eat_cart, user_payment_method, shop_eat_orders, shop_eat_cart_book_dining, shop_eat_cart_book_table, shop_eat_cart_id, shop_eat_business_id, shop_eat_menu_userid, requestPostApi, requestGetApi, shop_eat, connect_people_create_post, connect_people_newPost, art_getCollection, requestPostApiMedia, art_PostCollection, postApiWithToken2, art_HomePage } from '../../../WebApi/Service'
// // import { useSelector, useDispatch } from 'react-redux';
// // import Loader from '../../../WebApi/Loader';
// // import SearchInput2 from '../../../component/SearchInput2';
// // import SearchInputEnt from '../../../component/SearchInputEnt';
// // import FashionSearch from './components/FashionSearch';
// // import SerchInput from '../../../component/SerchInput';
// // import { dimensions, Mycolors } from '../../../utility/Mycolors';
// // import { ImageSlider, ImageCarousel } from "react-native-image-slider-banner";
// // import MyButtons from '../../../component/MyButtons';
// // import MultiSlider from '@ptomasroos/react-native-multi-slider';
// // import Modal from 'react-native-modal';
// // import Toast from 'react-native-simple-toast'
// // import LinearGradient from 'react-native-linear-gradient'
// // import AppIntroSlider from 'react-native-app-intro-slider';
// // import IconFontAwesome from 'react-native-vector-icons/FontAwesome';

// // import VideoPlayer from 'react-native-video-player'
// // import { createThumbnail } from "react-native-create-thumbnail";
// // import ViewMoreText from 'react-native-view-more-text';
// // import { Screen } from 'react-native-screens';

// // const ArtCategories = (props, route) => {
// //     const dispatch = useDispatch();
// //     const User = useSelector(state => state.user.user_details)
// //     console.log('User', User.token);
// //     const [categoryData, setCategoryData] = useState([])
// //     const [articleData, setArticleData] = useState([])
// //     const [searchValue, setsearchValue] = useState('')
// //     const [scrollEnabled, setScrollEnabled] = useState(false)
// //     const myTextInput = useRef()
// //     const [multiSliderValue, setMultiSliderValue] = useState([0, 100])
// //     const [showChooseMilesModal, setShowChooseMilesModal] = useState(false)
// //     const [loading, setLoading] = useState(false)
// //     const [showModal, setShowModal] = useState({ isVisible: false, data: null });
// //     const [showVideoModal, setShowVideoModal] = useState(false)
// //     const [selectedVideo, setSelectedVideo] = useState({})
// //     const [showReportModal, setShowReportModal] = useState(false)
// //     const [selectedReasonId, setSelectedReasonId] = useState(null)
// //     const [loading2, setLoading2] = useState('')
// //     const [modlevisual5, setmodlevisual5] = useState(false)
// //     const [reportReasonData, setReportReasonData] = useState([
// //         {
// //             id: '1',
// //             name: 'I just don’t like it',
// //             description: '',
// //             selected: true
// //         },
// //         {
// //             id: '2',
// //             name: 'Nudity or pornography',
// //             description: '',
// //             selected: false
// //         },
// //         {
// //             id: '3',
// //             name: 'Hate speech or symbols',
// //             description: 'Racist, homophobic or sexist slurs',
// //             selected: false
// //         },
// //         {
// //             id: '4',
// //             name: 'Violence or threat of violence',
// //             description: `Graphic injury, unlawful activity, dangerous or criminal organizations`,
// //             selected: false
// //         },
// //         {
// //             id: '5',
// //             name: 'Sale or promotion of firearms',
// //             description: '',
// //             selected: false
// //         },
// //         {
// //             id: '6',
// //             name: 'Sale or promotion of drugs',
// //             description: '',
// //             selected: false
// //         },
// //         {
// //             id: '7',
// //             name: 'Harassment or bullying',
// //             description: '',
// //             selected: false
// //         },
// //         {
// //             id: '8',
// //             name: 'Intellectual property violation',
// //             description: 'Copyright or trademark infringement',
// //             selected: false
// //         },
// //     ])
// //     const [videoDetails, setVideoDetails] = useState([
// //         { url: `http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4` },
// //         { url: `http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4` },
// //         { url: `http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4` },
// //     ])
// //     const [classesList, setClassesList] = useState([
// //         {
// //             id: '1',
// //             title: 'Graphic Design Class',
// //             price: 949,
// //             desc: ['Get 2x deeper dust removal with unique foam je technology', 'Recommended for ACs serviced more than 6 months ago'],
// //             distance: '3 kms away',
// //             img: require('../../../assets/images/service-product-image.png'),
// //         },
// //         {
// //             id: '2',
// //             title: 'Graphic Design Class',
// //             price: 949,
// //             desc: ['Get 2x deeper dust removal with unique foam je technology', 'Recommended for ACs serviced more than 6 months ago'],
// //             distance: '3 kms away',
// //             img: require('../../../assets/images/service-product-image.png'),
// //         },
// //         {
// //             id: '3',
// //             title: 'Graphic Design Class',
// //             price: 949,
// //             desc: ['Get 2x deeper dust removal with unique foam je technology', 'Recommended for ACs serviced more than 6 months ago'],
// //             distance: '3 kms away',
// //             img: require('../../../assets/images/service-product-image.png'),
// //         },
// //     ])
// //     const [aroundTheWorldData, setAroundTheWorldData] = useState([
// //         {
// //             id: '1',
// //             name: 'Leslie Alexander',
// //             desc: '',
// //             time: '14 hours ago',
// //             img: require('../../../assets/images/fashion-around-the-world-image.png'),
// //             likes: '4k',
// //             dislikes: '1k',
// //         },
// //         {
// //             id: '2',
// //             name: 'Leslie Alexander',
// //             desc: '',
// //             time: '14 hours ago',
// //             img: require('../../../assets/images/fashion-around-the-world-image.png'),
// //             likes: '4k',
// //             dislikes: '1k',
// //         },
// //         {
// //             id: '3',
// //             name: 'Leslie Alexander',
// //             desc: '',
// //             time: '14 hours ago',
// //             img: require('../../../assets/images/fashion-around-the-world-image.png'),
// //             likes: '4k',
// //             dislikes: '1k',
// //         },
// //     ])
// //     const [courseData, setCourseData] = useState([
// //         {
// //             id: '1',
// //             title: 'Celebrity Style',
// //             desc: '',
// //             time: '',
// //             img: require('../../../assets/images/fashion-celebrity-style.png'),
// //         },
// //         {
// //             id: '2',
// //             title: 'Street Style',
// //             desc: '',
// //             time: '',
// //             img: require('../../../assets/images/fashion-celebrity-style.png'),
// //         },
// //         {
// //             id: '3',
// //             title: 'Models',
// //             desc: '',
// //             time: '',
// //             img: require('../../../assets/images/fashion-celebrity-style.png'),
// //         },
// //     ])
// //     const [upData, setupData] = useState([
// //         {
// //             id: '1',
// //             catId: '1',
// //             title: 'Intel 3rd Gen Motherboard',
// //             desc: '',
// //             price: '$140.00',
// //             time: '',
// //             img: require('../../../assets/images/intel_motherboard.png'),
// //         },
// //         {
// //             id: '2',
// //             catId: '2',
// //             title: 'Intel 3rd Gen Motherboard',
// //             desc: '',
// //             price: '$140.00',
// //             time: '',
// //             img: require('../../../assets/images/intel_motherboard.png'),
// //         },
// //         {
// //             id: '3',
// //             catId: '3',
// //             title: 'Intel 3rd Gen Motherboard',
// //             desc: '',
// //             price: '$140.00',
// //             time: '',
// //             img: require('../../../assets/images/intel_motherboard.png'),
// //         },
// //         {
// //             id: '4',
// //             catId: '4',
// //             title: 'Intel 3rd Gen Motherboard',
// //             desc: '',
// //             price: '$140.00',
// //             time: '',
// //             img: require('../../../assets/images/intel_motherboard.png'),
// //         },
// //         {
// //             id: '5',
// //             catId: '1',
// //             title: 'Intel 3rd Gen Motherboard',
// //             desc: '',
// //             price: '$140.00',
// //             time: '',
// //             img: require('../../../assets/images/intel_motherboard.png'),
// //         },
// //         {
// //             id: '6',
// //             catId: '2',
// //             title: 'Intel 3rd Gen Motherboard',
// //             desc: '',
// //             price: '$140.00',
// //             time: '',
// //             img: require('../../../assets/images/intel_motherboard.png'),
// //         },
// //         {
// //             id: '7',
// //             catId: '3',
// //             title: 'Intel 3rd Gen Motherboard',
// //             desc: '',
// //             price: '$140.00',
// //             time: '',
// //             img: require('../../../assets/images/intel_motherboard.png'),
// //         },
// //     ])
// //     const [ctegoryData, setCategorydata] = useState('')
// //     const [selectedCategory, setSelectedCategory] = useState({})
// //     console.log('selected category', selectedCategory);
// //     const [introSliderData] = useState([
// //         // require('../../assets/Group75972.png'),
// //         { key: 'one', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5a5uCP-n4teeW2SApcIqUrcQApev8ZVCJkA&usqp=CAU', title: 'Art-Aficionado Tim Newton on How to Collect Art', status: 'Fine Art', date: 'March 4, 2022' },
// //         { key: 'two', image: 'https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg', title: 'Art-Aficionado Tim Newton on How to Collect Art', status: 'Fine Art', date: 'March 4, 2022' },
// //         { key: 'three', image: 'https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510__340.jpg', title: 'Art-Aficionado Tim Newton on How to Collect Art', status: 'Fine Art', date: 'March 4, 2022' }
// //     ])
// //     useEffect(() => {
// //         ArtCategory()
// //         //HomePage()

// //         const id = props.route.params.cat_name
// //         if (props.route.params.from == 'seach') {
// //             HomePage()
// //         } else { HomePage2(id) }
// //         console.log('param', id);

// //         setSelectedCategory(id)
// //     }, [])
// //     const ArtCategory = async () => {
// //         setLoading(true)
// //         var fUrl = art_getCollection
// //         var urls = '?module_id=' + '53'
// //         console.log('my url---------->', urls)
// //         if (urls != undefined) {
// //             fUrl = fUrl + urls
// //         }
// //         // console.log("LIKE CLICK:::",isSaved);
// //         const { responseJson, err } = await requestGetApi(fUrl, '', 'GET', User.token)
// //         setLoading(false)
// //         console.log('response afer click of items', responseJson)
// //         if (responseJson.headers.success == 1) {
// //             console.log('the res after sucess of category', responseJson.body.data)
// //             setCategoryData(responseJson.body.data)

// //             // Toast.show({ text1: responseJson.headers.message });
// //         } else {

// //             setalert_sms(err)
// //             setMy_Alert(true)
// //         }
// //     }
// //     const multiSliderValuesChange = (values) => { setMultiSliderValue(values) }
// //     useEffect(() => {

// //     }, [])

// //     const _renderItem = ({ item }) => {
// //         return (
// //             <>
// //                 <View style={{ flexDirection: 'row' }}>
// //                     <Image source={{ uri: item.image }} style={{ width: '100%', height: 227, borderRadius: 10, alignSelf: 'center' }} />
// //                     <View style={{ position: 'absolute', left: 10, width: '80%', top: 120 }}>
// //                         <Text style={{ color: 'white', fontSize: 18, fontWeight: '400' }}>{item.title}</Text>
// //                         <Text style={{ color: '#29913C', fontWeight: '400', fontSize: 14 }}>{item.status}</Text>
// //                         <Text style={{ color: 'white', fontWeight: '400', fontSize: 14 }}>{item.date}</Text>
// //                     </View>
// //                 </View>
// //             </>
// //         );
// //     }
// //     const renderPagination = (activeIndex) => {
// //         return (
// //             <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
// //                 {introSliderData.map((_, index) => (
// //                     <View
// //                         key={index}
// //                         style={{
// //                             backgroundColor: activeIndex === index ? '#29913C' : '#D9D9D9',
// //                             height: 9,
// //                             width: 9,
// //                             borderRadius: 30,
// //                             marginHorizontal: 5,
// //                         }}
// //                     />
// //                 ))}
// //             </View>
// //         );
// //     };
// //     const removeCategoryFilter = () => {
// //         // setSelectedCategory({})
// //         HomePage(true)
// //         // getDropdownData()
// //     }
// //     const HomePage = async (removeFilter = false) => {
// //         console.log('removeFilter', removeFilter);
// //         setLoading(true)
// //         console.log('iiiiiiitemm');
// //         // var fUrl = art_HomePage
// //         // var urls = '?category=' + item.name
// //         // console.log('my url---------->', fUrl)
// //         // if (urls != undefined) {
// //         //     fUrl = fUrl + urls
// //         // }
// //         // console.log('my url---------->', fUrl)

// //         const { responseJson, err } = await requestGetApi(art_HomePage, '', 'GET', User.token)
// //         setLoading(false)
// //         console.log('the res Home==>>', responseJson)
// //         if (responseJson.headers.success == 1) {
// //             console.log('the rsponse of article agter selection', responseJson.body.articles)
// //             if (removeFilter) { setSelectedCategory({}) }
// //             // setArticleData(responseJson.body.articles)
// //             generateThumb(responseJson.body.articles)
// //             const latestRecordsArray = responseJson.body.articles.slice(0, 3);

// //             // Update the state with the latest records
// //             setLatestRecords(latestRecordsArray);
// //             console.log('remove filter', selectedCategory);

// //             // Toast.show({ text1: responseJson.headers.message });
// //         } else {

// //             setalert_sms(err)
// //             setMy_Alert(true)
// //         }
// //     }
// //     const HomePage2 = async (item) => {
// //         console.log(item, 'my item slected home 2');
// //         setLoading(true)
// //         console.log('iiiiiiitemmintiate', item);
// //         var fUrl = art_HomePage
// //         var urls = '&category=' + item.name
// //         console.log('my url---------->', fUrl)
// //         if (urls != undefined) {
// //             fUrl = fUrl + urls
// //         }
// //         console.log('my urln home page---------->', fUrl)

// //         const { responseJson, err } = await requestGetApi(fUrl, '', 'GET', User.token)
// //         setLoading(false)
// //         console.log('the res of home2', responseJson)
// //         if (responseJson.headers.success == 1) {
// //             console.log('the rsponse of article agter selection of 2 home', responseJson.body.total)
// //             if (responseJson.body.total
// //                 == 0) {
// //                 setArticleData([])
// //             } else {
// //                 generateThumb(responseJson.body.articles)

// //             }
// //         } else {

// //             setalert_sms(err)
// //             setMy_Alert(true)
// //         }
// //     }
// //     const isDataEmpty = () => {

// //         if (articleData?.length === 0) {
// //             return true
// //         } else {
// //             return false
// //         }


// //     }

// //     const generateThumb = async (item) => {
// //         setLoading2(true)

// //         const allData = await Promise.all(
// //             item.map?.(async (el) => {
// //                 if (!el.files) {
// //                     return { ...el, type: "none" };
// //                 }
// //                 else if (el.files.find((js) => js.post_type == "Image")) {
// //                     return {
// //                         ...el,
// //                         type: "image",
// //                     };
// //                 } else {
// //                     console.log("createThumbnail will be called at categories", el.files[0].file_url);
// //                     const thumb = await createThumbnail({
// //                         url: el.files[0].file_url,
// //                         timeStamp: 1000, // Specify the time position for the thumbnail (in milliseconds)
// //                     });
// //                     return {
// //                         ...el,
// //                         thumb,
// //                         type: "video",
// //                     };
// //                 }
// //             })

// //         );


// //         console.log("allData categories", allData);
// //         const data = allData
// //         console.log(data, 'data111');
// //         //setCategorydata(data);
// //         setArticleData(data)

// //         // console.log('llllllllffff');
// //         // const getSquare = async (file) => {
// //         //   console.log(file.files[0].file_url, 'file');
// //         //   const thumbnail = await createThumbnail({
// //         //     url: file.files[0].file_url,
// //         //     timeStamp: 10000, // Specify the time position for the thumbnail (in milliseconds)
// //         //   });
// //         //   console.log('articleDatathumbnail', url)
// //         //   return thumbnail

// //         // }
// //         // const printSquares = async () => {
// //         //   const nums =
// //         //     item.filter(el => {
// //         //       if (!el.files) {
// //         //         return false
// //         //       } else {
// //         //         if (el.files.find(js => js.post_type == 'Video')) {
// //         //           return true
// //         //         } else {
// //         //           return false
// //         //         }
// //         //       }
// //         //     })
// //         //   const promiseArray = nums.map(x => getSquare(x));
// //         //   const resolvedPromises = await Promise.all(promiseArray);
// //         //   console.log(resolvedPromises, 'hhhhhhh');
// //         // };
// //         // printSquares();
// //         setLoading2(false)
// //     };
// //     return (
// //         <SafeAreaView scrollEnabled={scrollEnabled} style={{ height: '100%', backgroundColor: '#F8F8F8' }}>
// //             <ScrollView>
// //                 <HomeHeaderRoundBottom height={100} extraStyle={{ paddingtop: 10, paddingBottom: 25 }} paddingHorizontal={15} borderBottomLeftRadius={20} borderBottomRightRadius={20} backgroundColor='#29913C'
// //                     press1={() => { props.navigation.goBack() }} img1={require('../../../assets/images/service-header-back-button.png')} img1width={25} img1height={18}
// //                     press2={() => { }} title2={'Art'} fontWeight={'500'} img2height={20} color={'#fff'}
// //                     press3={() => { props.navigation.navigate('ArtNotifications') }} img3={require('../../../assets/images/fashion-bell-icon.png')} img3width={25} img3height={22} />

// //                 <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 10, marginTop: 20, }}>
// //                     <Text style={{ color: Mycolors.Black, fontWeight: '500', width: '50%' }} >Pick from a wide range of categories</Text>
// //                     <View style={{ flexDirection: 'row', alignItems: 'center' }}>
// //                         {Object.keys(selectedCategory)?.length > 0 ?
// //                             <TouchableOpacity onPress={removeCategoryFilter} style={styles.refreshView}>
// //                                 <Image source={require('../../../assets/Art/ArtFile.png')} style={{ height: 30, width: 30 }}></Image>
// //                                 <Text style={{ color: '#fff', fontSize: 12, fontWeight: '400', marginLeft: 10 }} >Clear</Text>
// //                             </TouchableOpacity>
// //                             :
// //                             null
// //                         }
// //                         <TouchableOpacity onPress={() => { setmodlevisual5(true) }}>
// //                             <Text style={{ color: '#29913C', fontWeight: '500', textDecorationLine: "underline", textDecorationColor: '#29913C' }} >View All</Text>
// //                         </TouchableOpacity>
// //                     </View>
// //                 </View>
// //                 <View style={{ width: '100%', alignSelf: 'center', marginTop: 20, height: 140 }}>
// //                     <FlatList
// //                         data={categoryData}
// //                         horizontal={true}
// //                         style={{ marginBottom: 20 }}
// //                         showsHorizontalScrollIndicator={false}
// //                         // numColumns={2}
// //                         renderItem={({ item, index }) => {
// //                             return (
// //                                 <View style={[{ width: 100, marginHorizontal: 5, overflow: 'hidden', }, selectedCategory?.name
// //                                     === item?.name
// //                                     ? styles.categorySelectedStyle : styles.categoryUnSelectedStyle]}>
// //                                     <TouchableOpacity style={{ width: 100, height: 80, backgroundColor: '#F8F8F8', alignSelf: 'center', }}
// //                                         onPress={() => {
// //                                             HomePage2(item)
// //                                             setSelectedCategory(item)

// //                                         }}>
// //                                         <Image source={{ uri: item.image }} style={{ width: "100%", height: "100%", alignSelf: 'center', borderRadius: 7 }} resizeMode='stretch'></Image>
// //                                     </TouchableOpacity>
// //                                     <View style={{}}>
// //                                         <Text style={{
// //                                             fontSize: 11, color: (selectedCategory?.name
// //                                                 === item?.name) ? '#29913C' : Mycolors.Black, marginTop: 5, textAlign: 'center', fontWeight: 'bold'
// //                                         }}>{item?.name}</Text>
// //                                     </View>
// //                                 </View>
// //                             )
// //                         }}
// //                     // keyExtractor={item => item.id}
// //                     />
// //                 </View>
// //                 <View style={{ width: dimensions.SCREEN_WIDTH * 0.9, alignSelf: 'center', marginTop: 10 }}>
// //                     <FlatList
// //                         data={articleData}
// //                         showsHorizontalScrollIndicator={true}

// //                         renderItem={({ item, index }) => {
// //                             if (item.files && item.files.length > 0 && item.files[0].file_url) {
// //                                 console.log('my video url:', item.files[0].file_url);
// //                                 // Render your item or do something with the file URL
// //                             } else {
// //                                 console.log('No file URL found for item:', item);
// //                                 // Handle the case where the file URL is missing or undefined
// //                             }
// //                             return (

// //                                 <View style={{ width: dimensions.SCREEN_WIDTH * 0.9, marginRight: 15, marginBottom: 20 }}
// //                                     onPress={() => { }}>
// //                                     <TouchableOpacity onPress={() => props.navigation.navigate('ArtPost', { id: item.id })}>
// //                                         {item.type == 'video' ?

// //                                             <VideoPlayer
// //                                                 resizeMode="contain"
// //                                                 video={{
// //                                                     uri: item.files[0].file_url
// //                                                 }}
// //                                                 style={{ borderRadius: 10, borderWidth: 2, }}
// //                                                 videoWidth={dimensions.SCREEN_WIDTH}
// //                                                 videoHeight={227}
// //                                                 autoplay={false}
// //                                                 thumbnail={{ uri: item.thumb.path }}
// //                                                 endWithThumbnail
// //                                                 disableControlsAutoHide
// //                                                 customStyles={{
// //                                                     thumbnail: { width: '100%', height: 227, borderRadius: 10, alignSelf: 'center', resizeMode: 'cover' },
// //                                                     videoWrapper: { width: dimensions.SCREEN_WIDTH, height: 227, },
// //                                                     // wrapper: { width: '100%', height: 227 },
// //                                                 }}
// //                                             />



// //                                             : <Image source={{ uri: item.cover_photo }} style={{ width: dimensions.SCREEN_WIDTH * 0.9, height: 227, borderRadius: 10 }} resizeMode='stretch'></Image>}
// //                                     </TouchableOpacity>

// //                                     {/* <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 10 }}>
// //                       <View style={{ flexDirection: 'row', alignItems: 'center' }}>
// //                         <Image source={require('../../../assets/images/dating-home-header-left-image.png')} style={{ height: 40, width: 40, borderRadius: 20 }} />
// //                         <Text style={{ fontSize: 12, fontWeight: '400', color: '#000', marginLeft: 10, }}>{item.username
// //                         }</Text>
// //                       </View>
// //                       <Text style={{ fontSize: 12, fontWeight: '400', color: '#B2B7B9' }}>{item.time}</Text>
// //                     </View> */}

// //                                     <ViewMoreText
// //                                         numberOfLines={3}
// //                                         renderViewMore={(onPress) => {
// //                                             return (
// //                                                 <Text onPress={onPress} style={{ fontSize: 14, color: '#0089CF', textDecorationLine: "underline" }}>View more</Text>
// //                                             )
// //                                         }}
// //                                         renderViewLess={(onPress) => {
// //                                             return (
// //                                                 <Text onPress={onPress} style={{ fontSize: 14, color: '#0089CF', textDecorationLine: "underline" }}>View less</Text>
// //                                             )
// //                                         }}
// //                                         textStyle={{ textAlign: 'left', width: '93%', marginLeft: 5, marginTop: 4 }}
// //                                     >
// //                                         <Text style={{ fontSize: 16, fontWeight: '400', color: '#000000' }}>
// //                                             {item.description
// //                                             }
// //                                         </Text>
// //                                     </ViewMoreText>
// //                                     <View>
// //                                         <Text style={{ fontSize: 12, fontWeight: '400', color: '#B4BBC6', textAlign: 'left', marginLeft: 6, marginTop: 4 }}>
// //                                             {new Date(item.created_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
// //                                         </Text>
// //                                     </View>

// //                                     {/* <View style={styles.buttonsRow}>
// //                       <TouchableOpacity style={styles.buttonView} onPress={() =>
// //                         Likepost(item.module_id
// //                         )

// //                         // console.log('my like clicked')
// //                       } >
// //                         <Image

// //                           source={
// //                             isLiked
// //                               ? require('../../../assets/images/fashion-dislike-button.png') // Use dislike image
// //                               : require('../../../assets/images/fashion-like-button.png') // Use like image
// //                           }
// //                           style={{ height: 20, width: 20 }} />
// //                         <Text style={styles.buttonText}>{item.likes}</Text>
// //                       </TouchableOpacity>
// //                       <TouchableOpacity style={styles.buttonView}>
// //                         <Image source={require('../../../assets/images/fashion-dislike-button.png')} style={{ height: 20, width: 20 }} />
// //                         <Text style={styles.buttonText}>{item.dislikes}</Text>
// //                       </TouchableOpacity>
// //                       <TouchableOpacity style={styles.buttonView}>
// //                         <Image source={require('../../../assets/images/fashion-share-button.png')} style={{ height: 20, width: 20 }} />
// //                         <Text style={styles.buttonText}>Share</Text>
// //                       </TouchableOpacity>
// //                       <TouchableOpacity onPress={() => { setShowReportModal(true) }} style={styles.buttonView}>
// //                         <Image source={require('../../../assets/images/fashion-report-button.png')} style={{ height: 20, width: 20 }} />
// //                         <Text style={styles.buttonText}>Report</Text>
// //                       </TouchableOpacity>
// //                     </View> */}

// //                                 </View>
// //                             )
// //                         }}
// //                         keyExtractor={item => item.id}

// //                     />
// //                     {isDataEmpty() ?
// //                         <>
// //                             <Image source={require('../../../assets/Art/noOrderArt.png')} style={{ alignSelf: 'center', height: 270, width: 270 }}></Image>
// //                             <Text style={{ color: 'black', alignSelf: 'center' }}>No posts found</Text>
// //                         </>
// //                         : null}
// //                 </View>
// //             </ScrollView>
// //             <Modal
// //                 isVisible={modlevisual5}
// //                 swipeDirection="down"
// //                 onSwipeComplete={(e) => {
// //                     setmodlevisual5(false)
// //                 }}
// //                 scrollTo={() => { }}
// //                 onBackdropPress={() => setmodlevisual5(false)}
// //                 scrollOffset={1}
// //                 propagateSwipe={true}
// //                 coverScreen={false}
// //                 backdropColor='transparent'
// //                 style={{ justifyContent: 'flex-end', margin: 0, backgroundColor: 'rgba(0,0,0,0.5)' }}
// //             >
// //                 <View style={{ height: '80%', backgroundColor: '#fff', borderTopLeftRadius: 15, borderTopRightRadius: 15, padding: 20 }}>
// //                     <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled={true}>

// //                         <Text style={{ color: Mycolors.Black, fontWeight: '500', fontSize: 22, textAlign: 'center' }} >Pick from a wide range of categories</Text>

// //                         <View style={{ width: '100%', alignSelf: 'center', marginTop: 20 }}>
// //                             <FlatList
// //                                 data={categoryData}
// //                                 // horizontal={true}
// //                                 // showsHorizontalScrollIndicator={false}
// //                                 // numColumns={2}
// //                                 renderItem={({ item, index }) => {
// //                                     return (
// //                                         <TouchableOpacity
// //                                             style={[{
// //                                                 width: '96%', marginHorizontal: 10, flexDirection: 'row', alignItems: 'center', borderRadius: 10, marginBottom: 20,
// //                                                 padding: 7,
// //                                                 overflow: 'hidden',
// //                                                 // borderWidth:1, borderColor:'black'
// //                                                 // shadowColor: '#E0E0E0',
// //                                                 // shadowOffset: {
// //                                                 //     width: 0,
// //                                                 //     height: 3
// //                                                 // },
// //                                                 // shadowRadius: 5,
// //                                                 // shadowOpacity: 0.6,
// //                                                 // elevation: 3,
// //                                             }, selectedCategory?.name === item?.name ? styles.categorySelectedStyle : styles.categoryUnSelectedStyle]}
// //                                             onPress={() => {
// //                                                 setSelectedCategory(item);

// //                                                 HomePage2(item)

// //                                                 setmodlevisual5(false)
// //                                             }}
// //                                         >
// //                                             <Image source={{ uri: item.image }} style={{ width: '20%', height: 60, borderRadius: 7, }} resizeMode='contain' ></Image>
// //                                             <View style={{ justifyContent: 'center', alignItems: 'center', width: "60%" }}>
// //                                                 <Text style={{ fontSize: 16, color: (selectedCategory?.name === item?.name) ? '#29913C' : '#455A64', marginTop: 5, textAlign: 'center', fontWeight: 'bold' }}>{item?.name}</Text>
// //                                             </View>
// //                                         </TouchableOpacity>
// //                                         // <View style={{ width: 100, marginHorizontal: 5 }}>
// //                                         //   <TouchableOpacity style={{ width: 100, height: 80, backgroundColor: '#F8F8F8', alignSelf: 'center' }}
// //                                         //     onPress={() => { setSelectedCategory(item) }}>
// //                                         //     <Image source={{ uri: item.category_image }} style={{ width: "100%", height: "100%", alignSelf: 'center', borderRadius: 7 }}></Image>
// //                                         //   </TouchableOpacity>
// //                                         //   <View style={{}}>
// //                                         //     <Text style={{ fontSize: 11, color: (selectedCategory?.category_id === item?.category_id) ? '#835E23' : Mycolors.Black, marginTop: 5, textAlign: 'center', fontWeight: 'bold' }}>{item?.category_name}</Text>
// //                                         //   </View>
// //                                         // </View>
// //                                     )
// //                                 }}
// //                             // keyExtractor={item => item.id}
// //                             />
// //                         </View>


// //                         <View style={{ width: 100, height: 30 }} />
// //                     </ScrollView>

// //                 </View >
// //             </Modal >
// //             {loading || loading2 ? <Loader /> : null}
// //         </SafeAreaView >
// //     );
// // }
// // const styles = StyleSheet.create({
// //     unselectedTabText: {
// //         fontSize: 14,
// //         fontWeight: '500',
// //         color: '#263238'
// //     },
// //     requestCallView: {
// //         marginTop: 10,
// //         width: 140,
// //         height: 30,
// //         borderRadius: 15,
// //         backgroundColor: '#29913C',
// //         alignItems: 'center',
// //         justifyContent: 'center',
// //         shadowColor: '#6D2F91',
// //         shadowOffset: { width: 3, height: 3 },
// //         shadowRadius: 5,
// //         shadowOpacity: 0.17,
// //         elevation: 2
// //     },
// //     VideoThumbWrapper: {
// //         position: 'relative',
// //         // width: '48%',
// //         // marginRight: 8,
// //         marginBottom: 4,

// //         width: dimensions.SCREEN_WIDTH / 1.5,
// //         height: 160,
// //         marginRight: 20,
// //         borderRadius: 15,
// //         // shadowColor:'#000',
// //         // shadowOffset: {width: 0,height: 3},
// //         // shadowRadius: 1,
// //         // shadowOpacity: 0.03,
// //         // elevation: 1,
// //     },
// //     PlayIconContainer: {
// //         position: 'absolute',
// //         top: 0,
// //         bottom: 0,
// //         left: 0,
// //         right: 0,
// //         zIndex: 1,
// //     },
// //     PlayIconWrapper: {
// //         flex: 1,
// //         flexDirection: 'column',
// //         justifyContent: 'center',
// //         alignItems: 'center',
// //     },
// //     BackGroundImage: {
// //         width: '100%',
// //         height: 160,
// //         justifyContent: 'center',
// //         borderRadius: 15
// //     },
// //     buttonsRow: {
// //         flexDirection: 'row',
// //         justifyContent: 'space-between',
// //         alignItems: 'center',
// //         marginTop: 20
// //     },
// //     buttonView: {
// //         flexDirection: 'row',
// //         alignItems: 'center'
// //     },
// //     buttonText: {
// //         fontSize: 10,
// //         fontWeight: '500',
// //         color: '#8F93A0',
// //         marginLeft: 5
// //     },
// //     reasonView: {
// //         alignSelf: 'center',
// //         flexDirection: 'row',
// //         alignItems: 'center',
// //         backgroundColor: '#fff',
// //         marginBottom: 15,
// //         // paddingVertical:10,
// //         paddingHorizontal: 10,
// //         width: '90%',
// //         height: 60,
// //     },
// //     selectedReasonView: {
// //         alignSelf: 'center',
// //         flexDirection: 'row',
// //         alignItems: 'center',
// //         backgroundColor: '#fff',
// //         marginBottom: 15,
// //         // paddingVertical:10,
// //         paddingHorizontal: 10,
// //         width: '90%',
// //         height: 60,
// //         borderColor: '#E7F7FF',
// //         borderWidth: 1,
// //         shadowColor: '#455A64',
// //         shadowOffset: { width: 3, height: 3 },
// //         shadowRadius: 5,
// //         shadowOpacity: 0.10,
// //         elevation: 1
// //     },
// //     reportButtonView: {
// //         height: 60,
// //         width: '90%',
// //         alignSelf: 'center',
// //         backgroundColor: '#0089CF',
// //         alignItems: 'center',
// //         justifyContent: 'center',
// //         borderRadius: 5,
// //         marginBottom: 30,
// //         shadowColor: '#000',
// //         shadowOffset: { width: 3, height: 3 },
// //         shadowRadius: 5,
// //         shadowOpacity: 0.10,
// //         elevation: 2
// //     },
// //     contMap: {
// //         flex: 1,
// //         justifyContent: 'center',
// //         alignItems: 'center',
// //         marginBottom: '20%',
// //         alignSelf: 'center',
// //         marginHorizontal: 20
// //     },
// //     categorySelectedStyle: {
// //         borderWidth: 2,
// //         borderColor: '#29913C',
// //         borderRadius: 10
// //     },
// //     categoryUnSelectedStyle: {
// //         borderWidth: 2,
// //         borderColor: '#B2B7B9',
// //         borderRadius: 10
// //     },
// //     refreshView: {
// //         flexDirection: 'row',
// //         alignItems: 'center',
// //         // width: '25%',
// //         // marginTop: 10,
// //         marginRight: 10,
// //         backgroundColor: '#29913C',
// //         paddingVertical: 10,
// //         paddingHorizontal: 20,
// //         borderRadius: 50
// //     },
// // });
// // export default ArtCategories


// import React, { useEffect, useState, useRef } from 'react';
// import { View, Image, Text, StyleSheet, SafeAreaView, TextInput, FlatList, Alert, TouchableOpacity, ScrollView, ImageBackground, } from 'react-native';
// import HomeHeaderRoundBottom from '../../../component/HomeHeaderRoundBottom';
// import { baseUrl, shop_eat_cart, user_payment_method, shop_eat_orders, shop_eat_cart_book_dining, shop_eat_cart_book_table, shop_eat_cart_id, shop_eat_business_id, shop_eat_menu_userid, requestPostApi, requestGetApi, shop_eat, connect_people_create_post, connect_people_newPost, art_getCollection, requestPostApiMedia, art_PostCollection, postApiWithToken2, art_HomePage } from '../../../WebApi/Service'
// import { useSelector, useDispatch } from 'react-redux';
// import Loader from '../../../WebApi/Loader';
// import SearchInput2 from '../../../component/SearchInput2';
// import SearchInputEnt from '../../../component/SearchInputEnt';
// import FashionSearch from './components/FashionSearch';
// import SerchInput from '../../../component/SerchInput';
// import { dimensions, Mycolors } from '../../../utility/Mycolors';
// import { ImageSlider, ImageCarousel } from "react-native-image-slider-banner";
// import MyButtons from '../../../component/MyButtons';
// import MultiSlider from '@ptomasroos/react-native-multi-slider';
// import Modal from 'react-native-modal';
// import Toast from 'react-native-simple-toast'
// import LinearGradient from 'react-native-linear-gradient'
// import AppIntroSlider from 'react-native-app-intro-slider';
// import IconFontAwesome from 'react-native-vector-icons/FontAwesome';

// import VideoPlayer from 'react-native-video-player'
// import { createThumbnail } from "react-native-create-thumbnail";
// import ViewMoreText from 'react-native-view-more-text';
// import { Screen } from 'react-native-screens';

// const ArtCategories = (props, route) => {
//     const dispatch = useDispatch();
//     const User = useSelector(state => state.user.user_details)
//     console.log('User', User.token);
//     const [categoryData, setCategoryData] = useState([])
//     const [articleData, setArticleData] = useState([])
//     const [searchValue, setsearchValue] = useState('')
//     const [scrollEnabled, setScrollEnabled] = useState(false)
//     const myTextInput = useRef()
//     const [multiSliderValue, setMultiSliderValue] = useState([0, 100])
//     const [showChooseMilesModal, setShowChooseMilesModal] = useState(false)
//     const [loading, setLoading] = useState(false)
//     const [showModal, setShowModal] = useState({ isVisible: false, data: null });
//     const [showVideoModal, setShowVideoModal] = useState(false)
//     const [selectedVideo, setSelectedVideo] = useState({})
//     const [showReportModal, setShowReportModal] = useState(false)
//     const [selectedReasonId, setSelectedReasonId] = useState(null)
//     const [loading2, setLoading2] = useState('')
//     const [modlevisual5, setmodlevisual5] = useState(false)
//     const [reportReasonData, setReportReasonData] = useState([
//         {
//             id: '1',
//             name: 'I just don’t like it',
//             description: '',
//             selected: true
//         },
//         {
//             id: '2',
//             name: 'Nudity or pornography',
//             description: '',
//             selected: false
//         },
//         {
//             id: '3',
//             name: 'Hate speech or symbols',
//             description: 'Racist, homophobic or sexist slurs',
//             selected: false
//         },
//         {
//             id: '4',
//             name: 'Violence or threat of violence',
//             description: `Graphic injury, unlawful activity, dangerous or criminal organizations`,
//             selected: false
//         },
//         {
//             id: '5',
//             name: 'Sale or promotion of firearms',
//             description: '',
//             selected: false
//         },
//         {
//             id: '6',
//             name: 'Sale or promotion of drugs',
//             description: '',
//             selected: false
//         },
//         {
//             id: '7',
//             name: 'Harassment or bullying',
//             description: '',
//             selected: false
//         },
//         {
//             id: '8',
//             name: 'Intellectual property violation',
//             description: 'Copyright or trademark infringement',
//             selected: false
//         },
//     ])
//     const [videoDetails, setVideoDetails] = useState([
//         { url: `http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4` },
//         { url: `http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4` },
//         { url: `http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4` },
//     ])
//     const [classesList, setClassesList] = useState([
//         {
//             id: '1',
//             title: 'Graphic Design Class',
//             price: 949,
//             desc: ['Get 2x deeper dust removal with unique foam je technology', 'Recommended for ACs serviced more than 6 months ago'],
//             distance: '3 kms away',
//             img: require('../../../assets/images/service-product-image.png'),
//         },
//         {
//             id: '2',
//             title: 'Graphic Design Class',
//             price: 949,
//             desc: ['Get 2x deeper dust removal with unique foam je technology', 'Recommended for ACs serviced more than 6 months ago'],
//             distance: '3 kms away',
//             img: require('../../../assets/images/service-product-image.png'),
//         },
//         {
//             id: '3',
//             title: 'Graphic Design Class',
//             price: 949,
//             desc: ['Get 2x deeper dust removal with unique foam je technology', 'Recommended for ACs serviced more than 6 months ago'],
//             distance: '3 kms away',
//             img: require('../../../assets/images/service-product-image.png'),
//         },
//     ])
//     const [aroundTheWorldData, setAroundTheWorldData] = useState([
//         {
//             id: '1',
//             name: 'Leslie Alexander',
//             desc: '',
//             time: '14 hours ago',
//             img: require('../../../assets/images/fashion-around-the-world-image.png'),
//             likes: '4k',
//             dislikes: '1k',
//         },
//         {
//             id: '2',
//             name: 'Leslie Alexander',
//             desc: '',
//             time: '14 hours ago',
//             img: require('../../../assets/images/fashion-around-the-world-image.png'),
//             likes: '4k',
//             dislikes: '1k',
//         },
//         {
//             id: '3',
//             name: 'Leslie Alexander',
//             desc: '',
//             time: '14 hours ago',
//             img: require('../../../assets/images/fashion-around-the-world-image.png'),
//             likes: '4k',
//             dislikes: '1k',
//         },
//     ])
//     const [courseData, setCourseData] = useState([
//         {
//             id: '1',
//             title: 'Celebrity Style',
//             desc: '',
//             time: '',
//             img: require('../../../assets/images/fashion-celebrity-style.png'),
//         },
//         {
//             id: '2',
//             title: 'Street Style',
//             desc: '',
//             time: '',
//             img: require('../../../assets/images/fashion-celebrity-style.png'),
//         },
//         {
//             id: '3',
//             title: 'Models',
//             desc: '',
//             time: '',
//             img: require('../../../assets/images/fashion-celebrity-style.png'),
//         },
//     ])
//     const [upData, setupData] = useState([
//         {
//             id: '1',
//             catId: '1',
//             title: 'Intel 3rd Gen Motherboard',
//             desc: '',
//             price: '$140.00',
//             time: '',
//             img: require('../../../assets/images/intel_motherboard.png'),
//         },
//         {
//             id: '2',
//             catId: '2',
//             title: 'Intel 3rd Gen Motherboard',
//             desc: '',
//             price: '$140.00',
//             time: '',
//             img: require('../../../assets/images/intel_motherboard.png'),
//         },
//         {
//             id: '3',
//             catId: '3',
//             title: 'Intel 3rd Gen Motherboard',
//             desc: '',
//             price: '$140.00',
//             time: '',
//             img: require('../../../assets/images/intel_motherboard.png'),
//         },
//         {
//             id: '4',
//             catId: '4',
//             title: 'Intel 3rd Gen Motherboard',
//             desc: '',
//             price: '$140.00',
//             time: '',
//             img: require('../../../assets/images/intel_motherboard.png'),
//         },
//         {
//             id: '5',
//             catId: '1',
//             title: 'Intel 3rd Gen Motherboard',
//             desc: '',
//             price: '$140.00',
//             time: '',
//             img: require('../../../assets/images/intel_motherboard.png'),
//         },
//         {
//             id: '6',
//             catId: '2',
//             title: 'Intel 3rd Gen Motherboard',
//             desc: '',
//             price: '$140.00',
//             time: '',
//             img: require('../../../assets/images/intel_motherboard.png'),
//         },
//         {
//             id: '7',
//             catId: '3',
//             title: 'Intel 3rd Gen Motherboard',
//             desc: '',
//             price: '$140.00',
//             time: '',
//             img: require('../../../assets/images/intel_motherboard.png'),
//         },
//     ])
//     const [ctegoryData, setCategorydata] = useState('')
//     const [selectedCategory, setSelectedCategory] = useState({})
//     console.log('selected category', selectedCategory);
//     const [introSliderData] = useState([
//         // require('../../assets/Group75972.png'),
//         { key: 'one', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5a5uCP-n4teeW2SApcIqUrcQApev8ZVCJkA&usqp=CAU', title: 'Art-Aficionado Tim Newton on How to Collect Art', status: 'Fine Art', date: 'March 4, 2022' },
//         { key: 'two', image: 'https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg', title: 'Art-Aficionado Tim Newton on How to Collect Art', status: 'Fine Art', date: 'March 4, 2022' },
//         { key: 'three', image: 'https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510__340.jpg', title: 'Art-Aficionado Tim Newton on How to Collect Art', status: 'Fine Art', date: 'March 4, 2022' }
//     ])
//     useEffect(() => {
//         ArtCategory()
//         //HomePage()

//         const id = props.route.params.cat_name
//         if (props.route.params.from == 'seach') {
//             HomePage()
//         } else { HomePage2(id) }
//         console.log('param', id);

//         setSelectedCategory(id)
//     }, [])
//     const ArtCategory = async () => {
//         setLoading(true)
//         var fUrl = art_getCollection
//         var urls = '?module_id=' + '53'
//         console.log('my url---------->', urls)
//         if (urls != undefined) {
//             fUrl = fUrl + urls
//         }
//         // console.log("LIKE CLICK:::",isSaved);
//         const { responseJson, err } = await requestGetApi(fUrl, '', 'GET', User.token)
//         setLoading(false)
//         console.log('response afer click of items', responseJson)
//         if (responseJson.headers.success == 1) {
//             console.log('the res after sucess of category', responseJson.body.data)
//             setCategoryData(responseJson.body.data)

//             // Toast.show({ text1: responseJson.headers.message });
//         } else {

//             setalert_sms(err)
//             setMy_Alert(true)
//         }
//     }
//     const multiSliderValuesChange = (values) => { setMultiSliderValue(values) }
//     useEffect(() => {

//     }, [])

//     const _renderItem = ({ item }) => {
//         return (
//             <>
//                 <View style={{ flexDirection: 'row' }}>
//                     <Image source={{ uri: item.image }} style={{ width: '100%', height: 227, borderRadius: 10, alignSelf: 'center' }} />
//                     <View style={{ position: 'absolute', left: 10, width: '80%', top: 120 }}>
//                         <Text style={{ color: 'white', fontSize: 18, fontWeight: '400' }}>{item.title}</Text>
//                         <Text style={{ color: '#29913C', fontWeight: '400', fontSize: 14 }}>{item.status}</Text>
//                         <Text style={{ color: 'white', fontWeight: '400', fontSize: 14 }}>{item.date}</Text>
//                     </View>
//                 </View>
//             </>
//         );
//     }
//     const renderPagination = (activeIndex) => {
//         return (
//             <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
//                 {introSliderData.map((_, index) => (
//                     <View
//                         key={index}
//                         style={{
//                             backgroundColor: activeIndex === index ? '#29913C' : '#D9D9D9',
//                             height: 9,
//                             width: 9,
//                             borderRadius: 30,
//                             marginHorizontal: 5,
//                         }}
//                     />
//                 ))}
//             </View>
//         );
//     };
//     const removeCategoryFilter = () => {
//         // setSelectedCategory({})
//         HomePage(true)
//         // getDropdownData()
//     }
//     const HomePage = async (removeFilter = false) => {
//         console.log('removeFilter', removeFilter);
//         setLoading(true)
//         console.log('iiiiiiitemm');
//         // var fUrl = art_HomePage
//         // var urls = '?category=' + item.name
//         // console.log('my url---------->', fUrl)
//         // if (urls != undefined) {
//         //     fUrl = fUrl + urls
//         // }
//         // console.log('my url---------->', fUrl)

//         const { responseJson, err } = await requestGetApi(art_HomePage, '', 'GET', User.token)
//         setLoading(false)
//         console.log('the res Home==>>', responseJson)
//         if (responseJson.headers.success == 1) {
//             console.log('the rsponse of article agter selection', responseJson.body.articles)
//             if (removeFilter) { setSelectedCategory({}) }
//             // setArticleData(responseJson.body.articles)
//             generateThumb(responseJson.body.articles)
//             const latestRecordsArray = responseJson.body.articles.slice(0, 3);

//             // Update the state with the latest records
//             setLatestRecords(latestRecordsArray);
//             console.log('remove filter', selectedCategory);

//             // Toast.show({ text1: responseJson.headers.message });
//         } else {

//             setalert_sms(err)
//             setMy_Alert(true)
//         }
//     }
//     const HomePage2 = async (item) => {
//         console.log(item, 'my item slected home 2');
//         setLoading(true)
//         console.log('iiiiiiitemmintiate', item);
//         var fUrl = art_HomePage
//         var urls = '&category=' + item.name
//         console.log('my url---------->', fUrl)
//         if (urls != undefined) {
//             fUrl = fUrl + urls
//         }
//         console.log('my urln home page---------->', fUrl)

//         const { responseJson, err } = await requestGetApi(fUrl, '', 'GET', User.token)
//         setLoading(false)
//         console.log('the res of home2', responseJson)
//         if (responseJson.headers.success == 1) {
//             console.log('the rsponse of article agter selection of 2 home', responseJson.body.total)
//             if (responseJson.body.total
//                 == 0) {
//                 setArticleData([])
//             } else {
//                 generateThumb(responseJson.body.articles)

//             }
//         } else {

//             setalert_sms(err)
//             setMy_Alert(true)
//         }
//     }
//     const isDataEmpty = () => {

//         if (articleData?.length === 0) {
//             return true
//         } else {
//             return false
//         }


//     }

//     const generateThumb = async (item) => {
//         setLoading2(true)

//         const allData = await Promise.all(
//             item.map?.(async (el) => {
//                 if (!el.files) {
//                     return { ...el, type: "none" };
//                 }
//                 else if (el.files.find((js) => js.post_type == "Image")) {
//                     return {
//                         ...el,
//                         type: "image",
//                     };
//                 } else {
//                     console.log("createThumbnail will be called at categories", el.files[0].file_url);
//                     const thumb = await createThumbnail({
//                         url: el.files[0].file_url,
//                         timeStamp: 1000, // Specify the time position for the thumbnail (in milliseconds)
//                     });
//                     return {
//                         ...el,
//                         thumb,
//                         type: "video",
//                     };
//                 }
//             })

//         );


//         console.log("allData categories", allData);
//         const data = allData
//         console.log(data, 'data111');
//         //setCategorydata(data);
//         setArticleData(data)

//         // console.log('llllllllffff');
//         // const getSquare = async (file) => {
//         //   console.log(file.files[0].file_url, 'file');
//         //   const thumbnail = await createThumbnail({
//         //     url: file.files[0].file_url,
//         //     timeStamp: 10000, // Specify the time position for the thumbnail (in milliseconds)
//         //   });
//         //   console.log('articleDatathumbnail', url)
//         //   return thumbnail

//         // }
//         // const printSquares = async () => {
//         //   const nums =
//         //     item.filter(el => {
//         //       if (!el.files) {
//         //         return false
//         //       } else {
//         //         if (el.files.find(js => js.post_type == 'Video')) {
//         //           return true
//         //         } else {
//         //           return false
//         //         }
//         //       }
//         //     })
//         //   const promiseArray = nums.map(x => getSquare(x));
//         //   const resolvedPromises = await Promise.all(promiseArray);
//         //   console.log(resolvedPromises, 'hhhhhhh');
//         // };
//         // printSquares();
//         setLoading2(false)
//     };
//     return (
//         <SafeAreaView scrollEnabled={scrollEnabled} style={{ height: '100%', backgroundColor: '#F8F8F8' }}>
//             <ScrollView>
//                 <HomeHeaderRoundBottom height={100} extraStyle={{ paddingtop: 10, paddingBottom: 25 }} paddingHorizontal={15} borderBottomLeftRadius={20} borderBottomRightRadius={20} backgroundColor='#29913C'
//                     press1={() => { props.navigation.goBack() }} img1={require('../../../assets/images/service-header-back-button.png')} img1width={25} img1height={18}
//                     press2={() => { }} title2={'Art'} fontWeight={'500'} img2height={20} color={'#fff'}
//                     press3={() => { props.navigation.navigate('ArtNotifications') }} img3={require('../../../assets/images/fashion-bell-icon.png')} img3width={25} img3height={22} />

//                 <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 10, marginTop: 20, }}>
//                     <Text style={{ color: Mycolors.Black, fontWeight: '500', width: '50%' }} >Pick from a wide range of categories</Text>
//                     <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//                         {Object.keys(selectedCategory)?.length > 0 ?
//                             <TouchableOpacity onPress={removeCategoryFilter} style={styles.refreshView}>
//                                 <Image source={require('../../../assets/Art/ArtFile.png')} style={{ height: 30, width: 30 }}></Image>
//                                 <Text style={{ color: '#fff', fontSize: 12, fontWeight: '400', marginLeft: 10 }} >Clear</Text>
//                             </TouchableOpacity>
//                             :
//                             null
//                         }
//                         <TouchableOpacity onPress={() => { setmodlevisual5(true) }}>
//                             <Text style={{ color: '#29913C', fontWeight: '500', textDecorationLine: "underline", textDecorationColor: '#29913C' }} >View All</Text>
//                         </TouchableOpacity>
//                     </View>
//                 </View>
//                 <View style={{ width: '100%', alignSelf: 'center', marginTop: 20, height: 140 }}>
//                     <FlatList
//                         data={categoryData}
//                         horizontal={true}
//                         style={{ marginBottom: 20 }}
//                         showsHorizontalScrollIndicator={false}
//                         // numColumns={2}
//                         renderItem={({ item, index }) => {
//                             return (
//                                 <View style={[{ width: 100, marginHorizontal: 5, overflow: 'hidden', }, selectedCategory?.name
//                                     === item?.name
//                                     ? styles.categorySelectedStyle : styles.categoryUnSelectedStyle]}>
//                                     <TouchableOpacity style={{ width: 100, height: 80, backgroundColor: '#F8F8F8', alignSelf: 'center', }}
//                                         onPress={() => {
//                                             HomePage2(item)
//                                             setSelectedCategory(item)

//                                         }}>
//                                         <Image source={{ uri: item.image }} style={{ width: "100%", height: "100%", alignSelf: 'center', borderRadius: 7 }} resizeMode='stretch'></Image>
//                                     </TouchableOpacity>
//                                     <View style={{}}>
//                                         <Text style={{
//                                             fontSize: 11, color: (selectedCategory?.name
//                                                 === item?.name) ? '#29913C' : Mycolors.Black, marginTop: 5, textAlign: 'center', fontWeight: 'bold'
//                                         }}>{item?.name}</Text>
//                                     </View>
//                                 </View>
//                             )
//                         }}
//                     // keyExtractor={item => item.id}
//                     />
//                 </View>
//                 <View style={{ width: dimensions.SCREEN_WIDTH * 0.9, alignSelf: 'center', marginTop: 10 }}>
//                     <FlatList
//                         data={articleData}
//                         showsHorizontalScrollIndicator={true}

//                         renderItem={({ item, index }) => {
//                             if (item.files && item.files.length > 0 && item.files[0].file_url) {
//                                 console.log('my video url:', item.files[0].file_url);
//                                 // Render your item or do something with the file URL
//                             } else {
//                                 console.log('No file URL found for item:', item);
//                                 // Handle the case where the file URL is missing or undefined
//                             }
//                             return (

//                                 <View style={{ width: dimensions.SCREEN_WIDTH * 0.9, marginRight: 15, marginBottom: 20 }}
//                                     onPress={() => { }}>
//                                     <TouchableOpacity onPress={() => props.navigation.navigate('ArtPost', { id: item.id })}>
//                                         {item.type == 'video' ?

//                                             <VideoPlayer
//                                                 resizeMode="contain"
//                                                 video={{
//                                                     uri: item.files[0].file_url
//                                                 }}
//                                                 style={{ borderRadius: 10, borderWidth: 2, }}
//                                                 videoWidth={dimensions.SCREEN_WIDTH}
//                                                 videoHeight={227}
//                                                 autoplay={false}
//                                                 thumbnail={{ uri: item.thumb.path }}
//                                                 endWithThumbnail
//                                                 disableControlsAutoHide
//                                                 customStyles={{
//                                                     thumbnail: { width: '100%', height: 227, borderRadius: 10, alignSelf: 'center', resizeMode: 'cover' },
//                                                     videoWrapper: { width: dimensions.SCREEN_WIDTH, height: 227, },
//                                                     // wrapper: { width: '100%', height: 227 },
//                                                 }}
//                                             />



//                                             : <Image source={{ uri: item.cover_photo }} style={{ width: dimensions.SCREEN_WIDTH * 0.9, height: 227, borderRadius: 10 }} resizeMode='stretch'></Image>}
//                                     </TouchableOpacity>



//                                     <ViewMoreText
//                                         numberOfLines={3}
//                                         renderViewMore={(onPress) => {
//                                             return (
//                                                 <Text onPress={onPress} style={{ fontSize: 14, color: '#0089CF', textDecorationLine: "underline" }}>View more</Text>
//                                             )
//                                         }}
//                                         renderViewLess={(onPress) => {
//                                             return (
//                                                 <Text onPress={onPress} style={{ fontSize: 14, color: '#0089CF', textDecorationLine: "underline" }}>View less</Text>
//                                             )
//                                         }}
//                                         textStyle={{ textAlign: 'left', width: '93%', marginLeft: 5, marginTop: 4 }}
//                                     >
//                                         <Text style={{ fontSize: 16, fontWeight: '400', color: '#000000' }}>
//                                             {item.description
//                                             }
//                                         </Text>
//                                     </ViewMoreText>
//                                     <View>
//                                         <Text style={{ fontSize: 12, fontWeight: '400', color: '#B4BBC6', textAlign: 'left', marginLeft: 6, marginTop: 4 }}>
//                                             {new Date(item.created_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                                         </Text>
//                                     </View>

//                                     {/* <View style={styles.buttonsRow}>
//                       <TouchableOpacity style={styles.buttonView} onPress={() =>
//                         Likepost(item.module_id
//                         )

//                         // console.log('my like clicked')
//                       } >
//                         <Image

//                           source={
//                             isLiked
//                               ? require('../../../assets/images/fashion-dislike-button.png') // Use dislike image
//                               : require('../../../assets/images/fashion-like-button.png') // Use like image
//                           }
//                           style={{ height: 20, width: 20 }} />
//                         <Text style={styles.buttonText}>{item.likes}</Text>
//                       </TouchableOpacity>
//                       <TouchableOpacity style={styles.buttonView}>
//                         <Image source={require('../../../assets/images/fashion-dislike-button.png')} style={{ height: 20, width: 20 }} />
//                         <Text style={styles.buttonText}>{item.dislikes}</Text>
//                       </TouchableOpacity>
//                       <TouchableOpacity style={styles.buttonView}>
//                         <Image source={require('../../../assets/images/fashion-share-button.png')} style={{ height: 20, width: 20 }} />
//                         <Text style={styles.buttonText}>Share</Text>
//                       </TouchableOpacity>
//                       <TouchableOpacity onPress={() => { setShowReportModal(true) }} style={styles.buttonView}>
//                         <Image source={require('../../../assets/images/fashion-report-button.png')} style={{ height: 20, width: 20 }} />
//                         <Text style={styles.buttonText}>Report</Text>
//                       </TouchableOpacity>
//                     </View> */}

//                                 </View>
//                             )
//                         }}
//                         keyExtractor={item => item.id}

//                     />
//                     {isDataEmpty() ?
//                         <>
//                             <Image source={require('../../../assets/Art/noOrderArt.png')} style={{ alignSelf: 'center', height: 270, width: 270 }}></Image>
//                             <Text style={{ color: 'black', alignSelf: 'center' }}>No posts found</Text>
//                         </>
//                         : null}
//                 </View>
//             </ScrollView>
//             <Modal
//                 isVisible={modlevisual5}
//                 swipeDirection="down"
//                 onSwipeComplete={(e) => {
//                     setmodlevisual5(false)
//                 }}
//                 scrollTo={() => { }}
//                 onBackdropPress={() => setmodlevisual5(false)}
//                 scrollOffset={1}
//                 propagateSwipe={true}
//                 coverScreen={false}
//                 backdropColor='transparent'
//                 style={{ justifyContent: 'flex-end', margin: 0, backgroundColor: 'rgba(0,0,0,0.5)' }}
//             >
//                 <View style={{ height: '80%', backgroundColor: '#fff', borderTopLeftRadius: 15, borderTopRightRadius: 15, padding: 20 }}>
//                     <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled={true}>

//                         <Text style={{ color: Mycolors.Black, fontWeight: '500', fontSize: 22, textAlign: 'center' }} >Pick from a wide range of categories</Text>

//                         <View style={{ width: '100%', alignSelf: 'center', marginTop: 20 }}>
//                             <FlatList
//                                 data={categoryData}
//                                 // horizontal={true}
//                                 // showsHorizontalScrollIndicator={false}
//                                 // numColumns={2}
//                                 renderItem={({ item, index }) => {
//                                     return (
//                                         <TouchableOpacity
//                                             style={[{
//                                                 width: '96%', marginHorizontal: 10, flexDirection: 'row', alignItems: 'center', borderRadius: 10, marginBottom: 20,
//                                                 padding: 7,
//                                                 overflow: 'hidden',
//                                                 // borderWidth:1, borderColor:'black'
//                                                 // shadowColor: '#E0E0E0',
//                                                 // shadowOffset: {
//                                                 //     width: 0,
//                                                 //     height: 3
//                                                 // },
//                                                 // shadowRadius: 5,
//                                                 // shadowOpacity: 0.6,
//                                                 // elevation: 3,
//                                             }, selectedCategory?.name === item?.name ? styles.categorySelectedStyle : styles.categoryUnSelectedStyle]}
//                                             onPress={() => {
//                                                 setSelectedCategory(item);

//                                                 HomePage2(item)

//                                                 setmodlevisual5(false)
//                                             }}
//                                         >
//                                             <Image source={{ uri: item.image }} style={{ width: '20%', height: 60, borderRadius: 7, }} resizeMode='contain' ></Image>
//                                             <View style={{ justifyContent: 'center', alignItems: 'center', width: "60%" }}>
//                                                 <Text style={{ fontSize: 16, color: (selectedCategory?.name === item?.name) ? '#29913C' : '#455A64', marginTop: 5, textAlign: 'center', fontWeight: 'bold' }}>{item?.name}</Text>
//                                             </View>
//                                         </TouchableOpacity>
//                                         // <View style={{ width: 100, marginHorizontal: 5 }}>
//                                         //   <TouchableOpacity style={{ width: 100, height: 80, backgroundColor: '#F8F8F8', alignSelf: 'center' }}
//                                         //     onPress={() => { setSelectedCategory(item) }}>
//                                         //     <Image source={{ uri: item.category_image }} style={{ width: "100%", height: "100%", alignSelf: 'center', borderRadius: 7 }}></Image>
//                                         //   </TouchableOpacity>
//                                         //   <View style={{}}>
//                                         //     <Text style={{ fontSize: 11, color: (selectedCategory?.category_id === item?.category_id) ? '#835E23' : Mycolors.Black, marginTop: 5, textAlign: 'center', fontWeight: 'bold' }}>{item?.category_name}</Text>
//                                         //   </View>
//                                         // </View>
//                                     )
//                                 }}
//                             // keyExtractor={item => item.id}
//                             />
//                         </View>


//                         <View style={{ width: 100, height: 30 }} />
//                     </ScrollView>

//                 </View >
//             </Modal >
//             {loading || loading2 ? <Loader /> : null}
//         </SafeAreaView >
//     );
// }
// const styles = StyleSheet.create({
//     unselectedTabText: {
//         fontSize: 14,
//         fontWeight: '500',
//         color: '#263238'
//     },
//     requestCallView: {
//         marginTop: 10,
//         width: 140,
//         height: 30,
//         borderRadius: 15,
//         backgroundColor: '#29913C',
//         alignItems: 'center',
//         justifyContent: 'center',
//         shadowColor: '#6D2F91',
//         shadowOffset: { width: 3, height: 3 },
//         shadowRadius: 5,
//         shadowOpacity: 0.17,
//         elevation: 2
//     },
//     VideoThumbWrapper: {
//         position: 'relative',
//         // width: '48%',
//         // marginRight: 8,
//         marginBottom: 4,

//         width: dimensions.SCREEN_WIDTH / 1.5,
//         height: 160,
//         marginRight: 20,
//         borderRadius: 15,
//         // shadowColor:'#000',
//         // shadowOffset: {width: 0,height: 3},
//         // shadowRadius: 1,
//         // shadowOpacity: 0.03,
//         // elevation: 1,
//     },
//     PlayIconContainer: {
//         position: 'absolute',
//         top: 0,
//         bottom: 0,
//         left: 0,
//         right: 0,
//         zIndex: 1,
//     },
//     PlayIconWrapper: {
//         flex: 1,
//         flexDirection: 'column',
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     BackGroundImage: {
//         width: '100%',
//         height: 160,
//         justifyContent: 'center',
//         borderRadius: 15
//     },
//     buttonsRow: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         marginTop: 20
//     },
//     buttonView: {
//         flexDirection: 'row',
//         alignItems: 'center'
//     },
//     buttonText: {
//         fontSize: 10,
//         fontWeight: '500',
//         color: '#8F93A0',
//         marginLeft: 5
//     },
//     reasonView: {
//         alignSelf: 'center',
//         flexDirection: 'row',
//         alignItems: 'center',
//         backgroundColor: '#fff',
//         marginBottom: 15,
//         // paddingVertical:10,
//         paddingHorizontal: 10,
//         width: '90%',
//         height: 60,
//     },
//     selectedReasonView: {
//         alignSelf: 'center',
//         flexDirection: 'row',
//         alignItems: 'center',
//         backgroundColor: '#fff',
//         marginBottom: 15,
//         // paddingVertical:10,
//         paddingHorizontal: 10,
//         width: '90%',
//         height: 60,
//         borderColor: '#E7F7FF',
//         borderWidth: 1,
//         shadowColor: '#455A64',
//         shadowOffset: { width: 3, height: 3 },
//         shadowRadius: 5,
//         shadowOpacity: 0.10,
//         elevation: 1
//     },
//     reportButtonView: {
//         height: 60,
//         width: '90%',
//         alignSelf: 'center',
//         backgroundColor: '#0089CF',
//         alignItems: 'center',
//         justifyContent: 'center',
//         borderRadius: 5,
//         marginBottom: 30,
//         shadowColor: '#000',
//         shadowOffset: { width: 3, height: 3 },
//         shadowRadius: 5,
//         shadowOpacity: 0.10,
//         elevation: 2
//     },
//     contMap: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         marginBottom: '20%',
//         alignSelf: 'center',
//         marginHorizontal: 20
//     },
//     categorySelectedStyle: {
//         borderWidth: 2,
//         borderColor: '#29913C',
//         borderRadius: 10
//     },
//     categoryUnSelectedStyle: {
//         borderWidth: 2,
//         borderColor: '#B2B7B9',
//         borderRadius: 10
//     },
//     refreshView: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         // width: '25%',
//         // marginTop: 10,
//         marginRight: 10,
//         backgroundColor: '#29913C',
//         paddingVertical: 10,
//         paddingHorizontal: 20,
//         borderRadius: 50
//     },
// });
// export default ArtCategories

// import React, { useEffect, useState, useRef } from 'react';
// import { View, Image, Text, StyleSheet, SafeAreaView, TextInput, FlatList, Alert, TouchableOpacity, ScrollView, ImageBackground, } from 'react-native';
// import HomeHeaderRoundBottom from '../../../component/HomeHeaderRoundBottom';
// import { baseUrl, shop_eat_cart, user_payment_method, shop_eat_orders, shop_eat_cart_book_dining, shop_eat_cart_book_table, shop_eat_cart_id, shop_eat_business_id, shop_eat_menu_userid, requestPostApi, requestGetApi, shop_eat, connect_people_create_post, connect_people_newPost, art_getCollection, requestPostApiMedia, art_PostCollection, postApiWithToken2, art_HomePage } from '../../../WebApi/Service'
// import { useSelector, useDispatch } from 'react-redux';
// import Loader from '../../../WebApi/Loader';
// import SearchInput2 from '../../../component/SearchInput2';
// import SearchInputEnt from '../../../component/SearchInputEnt';
// import FashionSearch from './components/FashionSearch';
// import SerchInput from '../../../component/SerchInput';
// import { dimensions, Mycolors } from '../../../utility/Mycolors';
// import { ImageSlider, ImageCarousel } from "react-native-image-slider-banner";
// import MyButtons from '../../../component/MyButtons';
// import MultiSlider from '@ptomasroos/react-native-multi-slider';
// import Modal from 'react-native-modal';
// import Toast from 'react-native-simple-toast'
// import LinearGradient from 'react-native-linear-gradient'
// import AppIntroSlider from 'react-native-app-intro-slider';
// import IconFontAwesome from 'react-native-vector-icons/FontAwesome';

// import VideoPlayer from 'react-native-video-player'
// import { createThumbnail } from "react-native-create-thumbnail";
// import ViewMoreText from 'react-native-view-more-text';
// import { Screen } from 'react-native-screens';

// const ArtCategories = (props, route) => {
//     const dispatch = useDispatch();
//     const User = useSelector(state => state.user.user_details)
//     console.log('User', User.token);
//     const [categoryData, setCategoryData] = useState([])
//     const [articleData, setArticleData] = useState([])
//     const [searchValue, setsearchValue] = useState('')
//     const [scrollEnabled, setScrollEnabled] = useState(false)
//     const myTextInput = useRef()
//     const [multiSliderValue, setMultiSliderValue] = useState([0, 100])
//     const [showChooseMilesModal, setShowChooseMilesModal] = useState(false)
//     const [loading, setLoading] = useState(false)
//     const [showModal, setShowModal] = useState({ isVisible: false, data: null });
//     const [showVideoModal, setShowVideoModal] = useState(false)
//     const [selectedVideo, setSelectedVideo] = useState({})
//     const [showReportModal, setShowReportModal] = useState(false)
//     const [selectedReasonId, setSelectedReasonId] = useState(null)
//     const [loading2, setLoading2] = useState('')
//     const [modlevisual5, setmodlevisual5] = useState(false)
//     const [reportReasonData, setReportReasonData] = useState([
//         {
//             id: '1',
//             name: 'I just don’t like it',
//             description: '',
//             selected: true
//         },
//         {
//             id: '2',
//             name: 'Nudity or pornography',
//             description: '',
//             selected: false
//         },
//         {
//             id: '3',
//             name: 'Hate speech or symbols',
//             description: 'Racist, homophobic or sexist slurs',
//             selected: false
//         },
//         {
//             id: '4',
//             name: 'Violence or threat of violence',
//             description: `Graphic injury, unlawful activity, dangerous or criminal organizations`,
//             selected: false
//         },
//         {
//             id: '5',
//             name: 'Sale or promotion of firearms',
//             description: '',
//             selected: false
//         },
//         {
//             id: '6',
//             name: 'Sale or promotion of drugs',
//             description: '',
//             selected: false
//         },
//         {
//             id: '7',
//             name: 'Harassment or bullying',
//             description: '',
//             selected: false
//         },
//         {
//             id: '8',
//             name: 'Intellectual property violation',
//             description: 'Copyright or trademark infringement',
//             selected: false
//         },
//     ])
//     const [videoDetails, setVideoDetails] = useState([
//         { url: `http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4` },
//         { url: `http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4` },
//         { url: `http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4` },
//     ])
//     const [classesList, setClassesList] = useState([
//         {
//             id: '1',
//             title: 'Graphic Design Class',
//             price: 949,
//             desc: ['Get 2x deeper dust removal with unique foam je technology', 'Recommended for ACs serviced more than 6 months ago'],
//             distance: '3 kms away',
//             img: require('../../../assets/images/service-product-image.png'),
//         },
//         {
//             id: '2',
//             title: 'Graphic Design Class',
//             price: 949,
//             desc: ['Get 2x deeper dust removal with unique foam je technology', 'Recommended for ACs serviced more than 6 months ago'],
//             distance: '3 kms away',
//             img: require('../../../assets/images/service-product-image.png'),
//         },
//         {
//             id: '3',
//             title: 'Graphic Design Class',
//             price: 949,
//             desc: ['Get 2x deeper dust removal with unique foam je technology', 'Recommended for ACs serviced more than 6 months ago'],
//             distance: '3 kms away',
//             img: require('../../../assets/images/service-product-image.png'),
//         },
//     ])
//     const [aroundTheWorldData, setAroundTheWorldData] = useState([
//         {
//             id: '1',
//             name: 'Leslie Alexander',
//             desc: '',
//             time: '14 hours ago',
//             img: require('../../../assets/images/fashion-around-the-world-image.png'),
//             likes: '4k',
//             dislikes: '1k',
//         },
//         {
//             id: '2',
//             name: 'Leslie Alexander',
//             desc: '',
//             time: '14 hours ago',
//             img: require('../../../assets/images/fashion-around-the-world-image.png'),
//             likes: '4k',
//             dislikes: '1k',
//         },
//         {
//             id: '3',
//             name: 'Leslie Alexander',
//             desc: '',
//             time: '14 hours ago',
//             img: require('../../../assets/images/fashion-around-the-world-image.png'),
//             likes: '4k',
//             dislikes: '1k',
//         },
//     ])
//     const [courseData, setCourseData] = useState([
//         {
//             id: '1',
//             title: 'Celebrity Style',
//             desc: '',
//             time: '',
//             img: require('../../../assets/images/fashion-celebrity-style.png'),
//         },
//         {
//             id: '2',
//             title: 'Street Style',
//             desc: '',
//             time: '',
//             img: require('../../../assets/images/fashion-celebrity-style.png'),
//         },
//         {
//             id: '3',
//             title: 'Models',
//             desc: '',
//             time: '',
//             img: require('../../../assets/images/fashion-celebrity-style.png'),
//         },
//     ])
//     const [upData, setupData] = useState([
//         {
//             id: '1',
//             catId: '1',
//             title: 'Intel 3rd Gen Motherboard',
//             desc: '',
//             price: '$140.00',
//             time: '',
//             img: require('../../../assets/images/intel_motherboard.png'),
//         },
//         {
//             id: '2',
//             catId: '2',
//             title: 'Intel 3rd Gen Motherboard',
//             desc: '',
//             price: '$140.00',
//             time: '',
//             img: require('../../../assets/images/intel_motherboard.png'),
//         },
//         {
//             id: '3',
//             catId: '3',
//             title: 'Intel 3rd Gen Motherboard',
//             desc: '',
//             price: '$140.00',
//             time: '',
//             img: require('../../../assets/images/intel_motherboard.png'),
//         },
//         {
//             id: '4',
//             catId: '4',
//             title: 'Intel 3rd Gen Motherboard',
//             desc: '',
//             price: '$140.00',
//             time: '',
//             img: require('../../../assets/images/intel_motherboard.png'),
//         },
//         {
//             id: '5',
//             catId: '1',
//             title: 'Intel 3rd Gen Motherboard',
//             desc: '',
//             price: '$140.00',
//             time: '',
//             img: require('../../../assets/images/intel_motherboard.png'),
//         },
//         {
//             id: '6',
//             catId: '2',
//             title: 'Intel 3rd Gen Motherboard',
//             desc: '',
//             price: '$140.00',
//             time: '',
//             img: require('../../../assets/images/intel_motherboard.png'),
//         },
//         {
//             id: '7',
//             catId: '3',
//             title: 'Intel 3rd Gen Motherboard',
//             desc: '',
//             price: '$140.00',
//             time: '',
//             img: require('../../../assets/images/intel_motherboard.png'),
//         },
//     ])
//     const [ctegoryData, setCategorydata] = useState('')
//     const [selectedCategory, setSelectedCategory] = useState({})
//     console.log('selected category', selectedCategory);
//     const [introSliderData] = useState([
//         // require('../../assets/Group75972.png'),
//         { key: 'one', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5a5uCP-n4teeW2SApcIqUrcQApev8ZVCJkA&usqp=CAU', title: 'Art-Aficionado Tim Newton on How to Collect Art', status: 'Fine Art', date: 'March 4, 2022' },
//         { key: 'two', image: 'https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg', title: 'Art-Aficionado Tim Newton on How to Collect Art', status: 'Fine Art', date: 'March 4, 2022' },
//         { key: 'three', image: 'https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510__340.jpg', title: 'Art-Aficionado Tim Newton on How to Collect Art', status: 'Fine Art', date: 'March 4, 2022' }
//     ])
//     useEffect(() => {
//         ArtCategory()
//         //HomePage()

//         const id = props.route.params.cat_name
//         if (props.route.params.from == 'seach') {
//             HomePage()
//         } else { HomePage2(id) }
//         console.log('param', id);

//         setSelectedCategory(id)
//     }, [])
//     const ArtCategory = async () => {
//         setLoading(true)
//         var fUrl = art_getCollection
//         var urls = '?module_id=' + '53'
//         console.log('my url---------->', urls)
//         if (urls != undefined) {
//             fUrl = fUrl + urls
//         }
//         // console.log("LIKE CLICK:::",isSaved);
//         const { responseJson, err } = await requestGetApi(fUrl, '', 'GET', User.token)
//         setLoading(false)
//         console.log('response afer click of items', responseJson)
//         if (responseJson.headers.success == 1) {
//             console.log('the res after sucess of category', responseJson.body.data)
//             setCategoryData(responseJson.body.data)

//             // Toast.show({ text1: responseJson.headers.message });
//         } else {

//             setalert_sms(err)
//             setMy_Alert(true)
//         }
//     }
//     const multiSliderValuesChange = (values) => { setMultiSliderValue(values) }
//     useEffect(() => {

//     }, [])

//     const _renderItem = ({ item }) => {
//         return (
//             <>
//                 <View style={{ flexDirection: 'row' }}>
//                     <Image source={{ uri: item.image }} style={{ width: '100%', height: 227, borderRadius: 10, alignSelf: 'center' }} />
//                     <View style={{ position: 'absolute', left: 10, width: '80%', top: 120 }}>
//                         <Text style={{ color: 'white', fontSize: 18, fontWeight: '400' }}>{item.title}</Text>
//                         <Text style={{ color: '#29913C', fontWeight: '400', fontSize: 14 }}>{item.status}</Text>
//                         <Text style={{ color: 'white', fontWeight: '400', fontSize: 14 }}>{item.date}</Text>
//                     </View>
//                 </View>
//             </>
//         );
//     }
//     const renderPagination = (activeIndex) => {
//         return (
//             <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
//                 {introSliderData.map((_, index) => (
//                     <View
//                         key={index}
//                         style={{
//                             backgroundColor: activeIndex === index ? '#29913C' : '#D9D9D9',
//                             height: 9,
//                             width: 9,
//                             borderRadius: 30,
//                             marginHorizontal: 5,
//                         }}
//                     />
//                 ))}
//             </View>
//         );
//     };
//     const removeCategoryFilter = () => {
//         // setSelectedCategory({})
//         HomePage(true)
//         // getDropdownData()
//     }
//     const HomePage = async (removeFilter = false) => {
//         console.log('removeFilter', removeFilter);
//         setLoading(true)
//         console.log('iiiiiiitemm');
//         // var fUrl = art_HomePage
//         // var urls = '?category=' + item.name
//         // console.log('my url---------->', fUrl)
//         // if (urls != undefined) {
//         //     fUrl = fUrl + urls
//         // }
//         // console.log('my url---------->', fUrl)

//         const { responseJson, err } = await requestGetApi(art_HomePage, '', 'GET', User.token)
//         setLoading(false)
//         console.log('the res Home==>>', responseJson)
//         if (responseJson.headers.success == 1) {
//             console.log('the rsponse of article agter selection', responseJson.body.articles)
//             if (removeFilter) { setSelectedCategory({}) }
//             // setArticleData(responseJson.body.articles)
//             generateThumb(responseJson.body.articles)
//             const latestRecordsArray = responseJson.body.articles.slice(0, 3);

//             // Update the state with the latest records
//             setLatestRecords(latestRecordsArray);
//             console.log('remove filter', selectedCategory);

//             // Toast.show({ text1: responseJson.headers.message });
//         } else {

//             setalert_sms(err)
//             setMy_Alert(true)
//         }
//     }
//     const HomePage2 = async (item) => {
//         console.log(item, 'my item slected home 2');
//         setLoading(true)
//         console.log('iiiiiiitemmintiate', item);
//         var fUrl = art_HomePage
//         var urls = '&category=' + item.name
//         console.log('my url---------->', fUrl)
//         if (urls != undefined) {
//             fUrl = fUrl + urls
//         }
//         console.log('my urln home page---------->', fUrl)

//         const { responseJson, err } = await requestGetApi(fUrl, '', 'GET', User.token)
//         setLoading(false)
//         console.log('the res of home2', responseJson)
//         if (responseJson.headers.success == 1) {
//             console.log('the rsponse of article agter selection of 2 home', responseJson.body.total)
//             if (responseJson.body.total
//                 == 0) {
//                 setArticleData([])
//             } else {
//                 generateThumb(responseJson.body.articles)

//             }
//         } else {

//             setalert_sms(err)
//             setMy_Alert(true)
//         }
//     }
//     const isDataEmpty = () => {

//         if (articleData?.length === 0) {
//             return true
//         } else {
//             return false
//         }


//     }

//     const generateThumb = async (item) => {
//         setLoading2(true)

//         const allData = await Promise.all(
//             item.map?.(async (el) => {
//                 if (!el.files) {
//                     return { ...el, type: "none" };
//                 }
//                 else if (el.files.find((js) => js.post_type == "Image")) {
//                     return {
//                         ...el,
//                         type: "image",
//                     };
//                 } else {
//                     console.log("createThumbnail will be called at categories", el.files[0].file_url);
//                     const thumb = await createThumbnail({
//                         url: el.files[0].file_url,
//                         timeStamp: 1000, // Specify the time position for the thumbnail (in milliseconds)
//                     });
//                     return {
//                         ...el,
//                         thumb,
//                         type: "video",
//                     };
//                 }
//             })

//         );


//         console.log("allData categories", allData);
//         const data = allData
//         console.log(data, 'data111');
//         //setCategorydata(data);
//         setArticleData(data)

//         // console.log('llllllllffff');
//         // const getSquare = async (file) => {
//         //   console.log(file.files[0].file_url, 'file');
//         //   const thumbnail = await createThumbnail({
//         //     url: file.files[0].file_url,
//         //     timeStamp: 10000, // Specify the time position for the thumbnail (in milliseconds)
//         //   });
//         //   console.log('articleDatathumbnail', url)
//         //   return thumbnail

//         // }
//         // const printSquares = async () => {
//         //   const nums =
//         //     item.filter(el => {
//         //       if (!el.files) {
//         //         return false
//         //       } else {
//         //         if (el.files.find(js => js.post_type == 'Video')) {
//         //           return true
//         //         } else {
//         //           return false
//         //         }
//         //       }
//         //     })
//         //   const promiseArray = nums.map(x => getSquare(x));
//         //   const resolvedPromises = await Promise.all(promiseArray);
//         //   console.log(resolvedPromises, 'hhhhhhh');
//         // };
//         // printSquares();
//         setLoading2(false)
//     };
//     return (
//         <SafeAreaView scrollEnabled={scrollEnabled} style={{ height: '100%', backgroundColor: '#F8F8F8' }}>
//             <ScrollView>
//                 <HomeHeaderRoundBottom height={100} extraStyle={{ paddingtop: 10, paddingBottom: 25 }} paddingHorizontal={15} borderBottomLeftRadius={20} borderBottomRightRadius={20} backgroundColor='#29913C'
//                     press1={() => { props.navigation.goBack() }} img1={require('../../../assets/images/service-header-back-button.png')} img1width={25} img1height={18}
//                     press2={() => { }} title2={'Art'} fontWeight={'500'} img2height={20} color={'#fff'}
//                     press3={() => { props.navigation.navigate('ArtNotifications') }} img3={require('../../../assets/images/fashion-bell-icon.png')} img3width={25} img3height={22} />

//                 <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 10, marginTop: 20, }}>
//                     <Text style={{ color: Mycolors.Black, fontWeight: '500', width: '50%' }} >Pick from a wide range of categories</Text>
//                     <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//                         {Object.keys(selectedCategory)?.length > 0 ?
//                             <TouchableOpacity onPress={removeCategoryFilter} style={styles.refreshView}>
//                                 <Image source={require('../../../assets/Art/ArtFile.png')} style={{ height: 30, width: 30 }}></Image>
//                                 <Text style={{ color: '#fff', fontSize: 12, fontWeight: '400', marginLeft: 10 }} >Clear</Text>
//                             </TouchableOpacity>
//                             :
//                             null
//                         }
//                         <TouchableOpacity onPress={() => { setmodlevisual5(true) }}>
//                             <Text style={{ color: '#29913C', fontWeight: '500', textDecorationLine: "underline", textDecorationColor: '#29913C' }} >View All</Text>
//                         </TouchableOpacity>
//                     </View>
//                 </View>
//                 <View style={{ width: '100%', alignSelf: 'center', marginTop: 20, height: 140 }}>
//                     <FlatList
//                         data={categoryData}
//                         horizontal={true}
//                         style={{ marginBottom: 20 }}
//                         showsHorizontalScrollIndicator={false}
//                         // numColumns={2}
//                         renderItem={({ item, index }) => {
//                             return (
//                                 <View style={[{ width: 100, marginHorizontal: 5, overflow: 'hidden', }, selectedCategory?.name
//                                     === item?.name
//                                     ? styles.categorySelectedStyle : styles.categoryUnSelectedStyle]}>
//                                     <TouchableOpacity style={{ width: 100, height: 80, backgroundColor: '#F8F8F8', alignSelf: 'center', }}
//                                         onPress={() => {
//                                             HomePage2(item)
//                                             setSelectedCategory(item)

//                                         }}>
//                                         <Image source={{ uri: item.image }} style={{ width: "100%", height: "100%", alignSelf: 'center', borderRadius: 7 }} resizeMode='stretch'></Image>
//                                     </TouchableOpacity>
//                                     <View style={{}}>
//                                         <Text style={{
//                                             fontSize: 11, color: (selectedCategory?.name
//                                                 === item?.name) ? '#29913C' : Mycolors.Black, marginTop: 5, textAlign: 'center', fontWeight: 'bold'
//                                         }}>{item?.name}</Text>
//                                     </View>
//                                 </View>
//                             )
//                         }}
//                     // keyExtractor={item => item.id}
//                     />
//                 </View>
//                 <View style={{ width: dimensions.SCREEN_WIDTH * 0.9, alignSelf: 'center', marginTop: 10 }}>
//                     <FlatList
//                         data={articleData}
//                         showsHorizontalScrollIndicator={true}

//                         renderItem={({ item, index }) => {
//                             if (item.files && item.files.length > 0 && item.files[0].file_url) {
//                                 console.log('my video url:', item.files[0].file_url);
//                                 // Render your item or do something with the file URL
//                             } else {
//                                 console.log('No file URL found for item:', item);
//                                 // Handle the case where the file URL is missing or undefined
//                             }
//                             return (

//                                 <View style={{ width: dimensions.SCREEN_WIDTH * 0.9, marginRight: 15, marginBottom: 20 }}
//                                     onPress={() => { }}>
//                                     <TouchableOpacity onPress={() => props.navigation.navigate('ArtPost', { id: item.id })}>
//                                         {item.type == 'video' ?

//                                             <VideoPlayer
//                                                 resizeMode="contain"
//                                                 video={{
//                                                     uri: item.files[0].file_url
//                                                 }}
//                                                 style={{ borderRadius: 10, borderWidth: 2, }}
//                                                 videoWidth={dimensions.SCREEN_WIDTH}
//                                                 videoHeight={227}
//                                                 autoplay={false}
//                                                 thumbnail={{ uri: item.thumb.path }}
//                                                 endWithThumbnail
//                                                 disableControlsAutoHide
//                                                 customStyles={{
//                                                     thumbnail: { width: '100%', height: 227, borderRadius: 10, alignSelf: 'center', resizeMode: 'cover' },
//                                                     videoWrapper: { width: dimensions.SCREEN_WIDTH, height: 227, },
//                                                     // wrapper: { width: '100%', height: 227 },
//                                                 }}
//                                             />



//                                             : <Image source={{ uri: item.cover_photo }} style={{ width: dimensions.SCREEN_WIDTH * 0.9, height: 227, borderRadius: 10 }} resizeMode='stretch'></Image>}
//                                     </TouchableOpacity>

//                                     {/* <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 10 }}>
//                       <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//                         <Image source={require('../../../assets/images/dating-home-header-left-image.png')} style={{ height: 40, width: 40, borderRadius: 20 }} />
//                         <Text style={{ fontSize: 12, fontWeight: '400', color: '#000', marginLeft: 10, }}>{item.username
//                         }</Text>
//                       </View>
//                       <Text style={{ fontSize: 12, fontWeight: '400', color: '#B2B7B9' }}>{item.time}</Text>
//                     </View> */}

//                                     <ViewMoreText
//                                         numberOfLines={3}
//                                         renderViewMore={(onPress) => {
//                                             return (
//                                                 <Text onPress={onPress} style={{ fontSize: 14, color: '#0089CF', textDecorationLine: "underline" }}>View more</Text>
//                                             )
//                                         }}
//                                         renderViewLess={(onPress) => {
//                                             return (
//                                                 <Text onPress={onPress} style={{ fontSize: 14, color: '#0089CF', textDecorationLine: "underline" }}>View less</Text>
//                                             )
//                                         }}
//                                         textStyle={{ textAlign: 'left', width: '93%', marginLeft: 5, marginTop: 4 }}
//                                     >
//                                         <Text style={{ fontSize: 16, fontWeight: '400', color: '#000000' }}>
//                                             {item.description
//                                             }
//                                         </Text>
//                                     </ViewMoreText>
//                                     <View>
//                                         <Text style={{ fontSize: 12, fontWeight: '400', color: '#B4BBC6', textAlign: 'left', marginLeft: 6, marginTop: 4 }}>
//                                             {new Date(item.created_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                                         </Text>
//                                     </View>

//                                     {/* <View style={styles.buttonsRow}>
//                       <TouchableOpacity style={styles.buttonView} onPress={() =>
//                         Likepost(item.module_id
//                         )

//                         // console.log('my like clicked')
//                       } >
//                         <Image

//                           source={
//                             isLiked
//                               ? require('../../../assets/images/fashion-dislike-button.png') // Use dislike image
//                               : require('../../../assets/images/fashion-like-button.png') // Use like image
//                           }
//                           style={{ height: 20, width: 20 }} />
//                         <Text style={styles.buttonText}>{item.likes}</Text>
//                       </TouchableOpacity>
//                       <TouchableOpacity style={styles.buttonView}>
//                         <Image source={require('../../../assets/images/fashion-dislike-button.png')} style={{ height: 20, width: 20 }} />
//                         <Text style={styles.buttonText}>{item.dislikes}</Text>
//                       </TouchableOpacity>
//                       <TouchableOpacity style={styles.buttonView}>
//                         <Image source={require('../../../assets/images/fashion-share-button.png')} style={{ height: 20, width: 20 }} />
//                         <Text style={styles.buttonText}>Share</Text>
//                       </TouchableOpacity>
//                       <TouchableOpacity onPress={() => { setShowReportModal(true) }} style={styles.buttonView}>
//                         <Image source={require('../../../assets/images/fashion-report-button.png')} style={{ height: 20, width: 20 }} />
//                         <Text style={styles.buttonText}>Report</Text>
//                       </TouchableOpacity>
//                     </View> */}

//                                 </View>
//                             )
//                         }}
//                         keyExtractor={item => item.id}

//                     />
//                     {isDataEmpty() ?
//                         <>
//                             <Image source={require('../../../assets/Art/noOrderArt.png')} style={{ alignSelf: 'center', height: 270, width: 270 }}></Image>
//                             <Text style={{ color: 'black', alignSelf: 'center' }}>No posts found</Text>
//                         </>
//                         : null}
//                 </View>
//             </ScrollView>
//             <Modal
//                 isVisible={modlevisual5}
//                 swipeDirection="down"
//                 onSwipeComplete={(e) => {
//                     setmodlevisual5(false)
//                 }}
//                 scrollTo={() => { }}
//                 onBackdropPress={() => setmodlevisual5(false)}
//                 scrollOffset={1}
//                 propagateSwipe={true}
//                 coverScreen={false}
//                 backdropColor='transparent'
//                 style={{ justifyContent: 'flex-end', margin: 0, backgroundColor: 'rgba(0,0,0,0.5)' }}
//             >
//                 <View style={{ height: '80%', backgroundColor: '#fff', borderTopLeftRadius: 15, borderTopRightRadius: 15, padding: 20 }}>
//                     <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled={true}>

//                         <Text style={{ color: Mycolors.Black, fontWeight: '500', fontSize: 22, textAlign: 'center' }} >Pick from a wide range of categories</Text>

//                         <View style={{ width: '100%', alignSelf: 'center', marginTop: 20 }}>
//                             <FlatList
//                                 data={categoryData}
//                                 // horizontal={true}
//                                 // showsHorizontalScrollIndicator={false}
//                                 // numColumns={2}
//                                 renderItem={({ item, index }) => {
//                                     return (
//                                         <TouchableOpacity
//                                             style={[{
//                                                 width: '96%', marginHorizontal: 10, flexDirection: 'row', alignItems: 'center', borderRadius: 10, marginBottom: 20,
//                                                 padding: 7,
//                                                 overflow: 'hidden',
//                                                 // borderWidth:1, borderColor:'black'
//                                                 // shadowColor: '#E0E0E0',
//                                                 // shadowOffset: {
//                                                 //     width: 0,
//                                                 //     height: 3
//                                                 // },
//                                                 // shadowRadius: 5,
//                                                 // shadowOpacity: 0.6,
//                                                 // elevation: 3,
//                                             }, selectedCategory?.name === item?.name ? styles.categorySelectedStyle : styles.categoryUnSelectedStyle]}
//                                             onPress={() => {
//                                                 setSelectedCategory(item);

//                                                 HomePage2(item)

//                                                 setmodlevisual5(false)
//                                             }}
//                                         >
//                                             <Image source={{ uri: item.image }} style={{ width: '20%', height: 60, borderRadius: 7, }} resizeMode='contain' ></Image>
//                                             <View style={{ justifyContent: 'center', alignItems: 'center', width: "60%" }}>
//                                                 <Text style={{ fontSize: 16, color: (selectedCategory?.name === item?.name) ? '#29913C' : '#455A64', marginTop: 5, textAlign: 'center', fontWeight: 'bold' }}>{item?.name}</Text>
//                                             </View>
//                                         </TouchableOpacity>
//                                         // <View style={{ width: 100, marginHorizontal: 5 }}>
//                                         //   <TouchableOpacity style={{ width: 100, height: 80, backgroundColor: '#F8F8F8', alignSelf: 'center' }}
//                                         //     onPress={() => { setSelectedCategory(item) }}>
//                                         //     <Image source={{ uri: item.category_image }} style={{ width: "100%", height: "100%", alignSelf: 'center', borderRadius: 7 }}></Image>
//                                         //   </TouchableOpacity>
//                                         //   <View style={{}}>
//                                         //     <Text style={{ fontSize: 11, color: (selectedCategory?.category_id === item?.category_id) ? '#835E23' : Mycolors.Black, marginTop: 5, textAlign: 'center', fontWeight: 'bold' }}>{item?.category_name}</Text>
//                                         //   </View>
//                                         // </View>
//                                     )
//                                 }}
//                             // keyExtractor={item => item.id}
//                             />
//                         </View>


//                         <View style={{ width: 100, height: 30 }} />
//                     </ScrollView>

//                 </View >
//             </Modal >
//             {loading || loading2 ? <Loader /> : null}
//         </SafeAreaView >
//     );
// }
// const styles = StyleSheet.create({
//     unselectedTabText: {
//         fontSize: 14,
//         fontWeight: '500',
//         color: '#263238'
//     },
//     requestCallView: {
//         marginTop: 10,
//         width: 140,
//         height: 30,
//         borderRadius: 15,
//         backgroundColor: '#29913C',
//         alignItems: 'center',
//         justifyContent: 'center',
//         shadowColor: '#6D2F91',
//         shadowOffset: { width: 3, height: 3 },
//         shadowRadius: 5,
//         shadowOpacity: 0.17,
//         elevation: 2
//     },
//     VideoThumbWrapper: {
//         position: 'relative',
//         // width: '48%',
//         // marginRight: 8,
//         marginBottom: 4,

//         width: dimensions.SCREEN_WIDTH / 1.5,
//         height: 160,
//         marginRight: 20,
//         borderRadius: 15,
//         // shadowColor:'#000',
//         // shadowOffset: {width: 0,height: 3},
//         // shadowRadius: 1,
//         // shadowOpacity: 0.03,
//         // elevation: 1,
//     },
//     PlayIconContainer: {
//         position: 'absolute',
//         top: 0,
//         bottom: 0,
//         left: 0,
//         right: 0,
//         zIndex: 1,
//     },
//     PlayIconWrapper: {
//         flex: 1,
//         flexDirection: 'column',
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     BackGroundImage: {
//         width: '100%',
//         height: 160,
//         justifyContent: 'center',
//         borderRadius: 15
//     },
//     buttonsRow: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         marginTop: 20
//     },
//     buttonView: {
//         flexDirection: 'row',
//         alignItems: 'center'
//     },
//     buttonText: {
//         fontSize: 10,
//         fontWeight: '500',
//         color: '#8F93A0',
//         marginLeft: 5
//     },
//     reasonView: {
//         alignSelf: 'center',
//         flexDirection: 'row',
//         alignItems: 'center',
//         backgroundColor: '#fff',
//         marginBottom: 15,
//         // paddingVertical:10,
//         paddingHorizontal: 10,
//         width: '90%',
//         height: 60,
//     },
//     selectedReasonView: {
//         alignSelf: 'center',
//         flexDirection: 'row',
//         alignItems: 'center',
//         backgroundColor: '#fff',
//         marginBottom: 15,
//         // paddingVertical:10,
//         paddingHorizontal: 10,
//         width: '90%',
//         height: 60,
//         borderColor: '#E7F7FF',
//         borderWidth: 1,
//         shadowColor: '#455A64',
//         shadowOffset: { width: 3, height: 3 },
//         shadowRadius: 5,
//         shadowOpacity: 0.10,
//         elevation: 1
//     },
//     reportButtonView: {
//         height: 60,
//         width: '90%',
//         alignSelf: 'center',
//         backgroundColor: '#0089CF',
//         alignItems: 'center',
//         justifyContent: 'center',
//         borderRadius: 5,
//         marginBottom: 30,
//         shadowColor: '#000',
//         shadowOffset: { width: 3, height: 3 },
//         shadowRadius: 5,
//         shadowOpacity: 0.10,
//         elevation: 2
//     },
//     contMap: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         marginBottom: '20%',
//         alignSelf: 'center',
//         marginHorizontal: 20
//     },
//     categorySelectedStyle: {
//         borderWidth: 2,
//         borderColor: '#29913C',
//         borderRadius: 10
//     },
//     categoryUnSelectedStyle: {
//         borderWidth: 2,
//         borderColor: '#B2B7B9',
//         borderRadius: 10
//     },
//     refreshView: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         // width: '25%',
//         // marginTop: 10,
//         marginRight: 10,
//         backgroundColor: '#29913C',
//         paddingVertical: 10,
//         paddingHorizontal: 20,
//         borderRadius: 50
//     },
// });
// export default ArtCategories


import React, { useEffect, useState, useRef } from 'react';
import { View, Image, Text, StyleSheet, SafeAreaView, TextInput, FlatList, Alert, TouchableOpacity, ScrollView, ImageBackground, } from 'react-native';
import HomeHeaderRoundBottom from '../../../component/HomeHeaderRoundBottom';
import { baseUrl, shop_eat_cart, user_payment_method, shop_eat_orders, shop_eat_cart_book_dining, shop_eat_cart_book_table, shop_eat_cart_id, shop_eat_business_id, shop_eat_menu_userid, requestPostApi, requestGetApi, shop_eat, connect_people_create_post, connect_people_newPost, art_getCollection, requestPostApiMedia, art_PostCollection, postApiWithToken2, art_HomePage, creation_startup } from '../../../WebApi/Service'
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../../../WebApi/Loader';
import SearchInput2 from '../../../component/SearchInput2';
import SearchInputEnt from '../../../component/SearchInputEnt';
import FashionSearch from './components/FashionSearch';
import SerchInput from '../../../component/SerchInput';
import { dimensions, Mycolors } from '../../../utility/Mycolors';
import { ImageSlider, ImageCarousel } from "react-native-image-slider-banner";
import MyButtons from '../../../component/MyButtons';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import Modal from 'react-native-modal';
import Toast from 'react-native-simple-toast'
import LinearGradient from 'react-native-linear-gradient'
import AppIntroSlider from 'react-native-app-intro-slider';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';

import VideoPlayer from 'react-native-video-player'
import { createThumbnail } from "react-native-create-thumbnail";
import ViewMoreText from 'react-native-view-more-text';
import { Screen } from 'react-native-screens';

const ArtCategories = (props, route) => {
    const dispatch = useDispatch();
    const User = useSelector(state => state.user.user_details)
    console.log('User', User.token);
    const [categoryData, setCategoryData] = useState([])
    const [articleData, setArticleData] = useState([])
    const [searchValue, setsearchValue] = useState('')
    const [scrollEnabled, setScrollEnabled] = useState(false)
    const myTextInput = useRef()
    const [multiSliderValue, setMultiSliderValue] = useState([0, 100])
    const [showChooseMilesModal, setShowChooseMilesModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const [showModal, setShowModal] = useState({ isVisible: false, data: null });
    const [showVideoModal, setShowVideoModal] = useState(false)
    const [selectedVideo, setSelectedVideo] = useState({})
    const [showReportModal, setShowReportModal] = useState(false)
    const [selectedReasonId, setSelectedReasonId] = useState(null)
    const [loading2, setLoading2] = useState('')
    const [modlevisual5, setmodlevisual5] = useState(false)
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
    const [ctegoryData, setCategorydata] = useState('')
    const [selectedCategory, setSelectedCategory] = useState({})
    console.log('selected category', selectedCategory);
    const [introSliderData] = useState([
        // require('../../assets/Group75972.png'),
        { key: 'one', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5a5uCP-n4teeW2SApcIqUrcQApev8ZVCJkA&usqp=CAU', title: 'Art-Aficionado Tim Newton on How to Collect Art', status: 'Fine Art', date: 'March 4, 2022' },
        { key: 'two', image: 'https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg', title: 'Art-Aficionado Tim Newton on How to Collect Art', status: 'Fine Art', date: 'March 4, 2022' },
        { key: 'three', image: 'https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510__340.jpg', title: 'Art-Aficionado Tim Newton on How to Collect Art', status: 'Fine Art', date: 'March 4, 2022' }
    ])
    useEffect(() => {
        ArtCategory()
        //HomePage()

        const id = props.route.params.cat_name
        if (props.route.params.from == 'seach') {
            HomePage()
        } else { HomePage2(id) }
        console.log('param', id);

        setSelectedCategory(id)
    }, [])
    const ArtCategory = async () => {
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
            setCategoryData(responseJson.body.data)

            // Toast.show({ text1: responseJson.headers.message });
        } else {

            setalert_sms(err)
            setMy_Alert(true)
        }
    }
    const multiSliderValuesChange = (values) => { setMultiSliderValue(values) }
    useEffect(() => {

    }, [])

    const _renderItem = ({ item }) => {
        return (
            <>
                <View style={{ flexDirection: 'row' }}>
                    <Image source={{ uri: item.image }} style={{ width: '100%', height: 227, borderRadius: 10, alignSelf: 'center' }} />
                    <View style={{ position: 'absolute', left: 10, width: '80%', top: 120 }}>
                        <Text style={{ color: 'white', fontSize: 18, fontWeight: '400' }}>{item.title}</Text>
                        <Text style={{ color: '#29913C', fontWeight: '400', fontSize: 14 }}>{item.status}</Text>
                        <Text style={{ color: 'white', fontWeight: '400', fontSize: 14 }}>{item.date}</Text>
                    </View>
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
    const removeCategoryFilter = () => {
        // setSelectedCategory({})
        HomePage(true)
        // getDropdownData()
    }
    const HomePage = async (removeFilter = false) => {
        console.log('removeFilter', removeFilter);
        setLoading(true)
        console.log('iiiiiiitemm');
        // var fUrl = art_HomePage
        // var urls = '?category=' + item.name
        // console.log('my url---------->', fUrl)
        // if (urls != undefined) {
        //     fUrl = fUrl + urls
        // }
        // console.log('my url---------->', fUrl)

        const { responseJson, err } = await requestGetApi(art_HomePage, '', 'GET', User.token)
        setLoading(false)
        console.log('the res Home==>>', responseJson)
        if (responseJson.headers.success == 1) {
            console.log('the rsponse of article agter selection', responseJson.body.articles)
            if (removeFilter) { setSelectedCategory({}) }
            // setArticleData(responseJson.body.articles)
            generateThumb(responseJson.body.articles)
            const latestRecordsArray = responseJson.body.articles.slice(0, 3);

            // Update the state with the latest records
            setLatestRecords(latestRecordsArray);
            console.log('remove filter', selectedCategory);

            // Toast.show({ text1: responseJson.headers.message });
        } else {

            setalert_sms(err)
            setMy_Alert(true)
        }
    }
    const HomePage2 = async (item) => {
        console.log(item, 'my item slected home 2');
        setLoading(true)
        console.log('iiiiiiitemmintiate', item);
        var fUrl = art_HomePage
        var urls = '&category=' + item.name
        console.log('my url---------->', fUrl)
        if (urls != undefined) {
            fUrl = fUrl + urls
        }
        console.log('my urln home page---------->', fUrl)

        const { responseJson, err } = await requestGetApi(fUrl, '', 'GET', User.token)
        setLoading(false)
        console.log('the res of home2', responseJson)
        if (responseJson.headers.success == 1) {
            console.log('the rsponse of article agter selection of 2 home', responseJson.body.total)
            if (responseJson.body.total
                == 0) {
                setArticleData([])
            } else {
                generateThumb(responseJson.body.articles)

            }
        } else {

            setalert_sms(err)
            setMy_Alert(true)
        }
    }
    const isDataEmpty = () => {

        if (articleData?.length === 0) {
            return true
        } else {
            return false
        }


    }

    const generateThumb = async (item) => {
        setLoading2(true)

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
                    console.log("createThumbnail will be called at categories", el.files[0].file_url);
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


        console.log("allData categories", allData);
        const data = allData
        console.log(data, 'data111');
        //setCategorydata(data);
        setArticleData(data)

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

    return (
        <SafeAreaView scrollEnabled={scrollEnabled} style={{ height: '100%', backgroundColor: '#F8F8F8' }}>
            {/* <ScrollView> */}
            <HomeHeaderRoundBottom height={100} extraStyle={{ paddingtop: 10, paddingBottom: 25 }} paddingHorizontal={15} borderBottomLeftRadius={20} borderBottomRightRadius={20} backgroundColor='#29913C'
                press1={() => { props.navigation.goBack() }} img1={require('../../../assets/images/service-header-back-button.png')} img1width={25} img1height={18}
                press2={() => { }} title2={'Art'} fontWeight={'500'} img2height={20} color={'#fff'}
                press3={() => { props.navigation.navigate('ArtNotifications') }} img3={require('../../../assets/images/fashion-bell-icon.png')} img3width={25} img3height={22} />

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 10, marginTop: 20, }}>
                <Text style={{ color: Mycolors.Black, fontWeight: '500', width: '50%' }} >Pick from a wide range of categories</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {Object.keys(selectedCategory)?.length > 0 ?
                        <TouchableOpacity onPress={removeCategoryFilter} style={styles.refreshView}>
                            <Image source={require('../../../assets/Art/ArtFile.png')} style={{ height: 30, width: 30 }}></Image>
                            <Text style={{ color: '#fff', fontSize: 12, fontWeight: '400', marginLeft: 10 }} >Clear</Text>
                        </TouchableOpacity>
                        :
                        null
                    }
                    <TouchableOpacity onPress={() => { setmodlevisual5(true) }}>
                        <Text style={{ color: '#29913C', fontWeight: '500', textDecorationLine: "underline", textDecorationColor: '#29913C' }} >View All</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ width: '100%', alignSelf: 'center', marginTop: 20, height: 140 }}>
                <FlatList
                    data={categoryData}
                    horizontal={true}
                    style={{ marginBottom: 20 }}
                    showsHorizontalScrollIndicator={false}
                    // numColumns={2}
                    renderItem={({ item, index }) => {
                        return (
                            <View style={[{ width: 100, marginHorizontal: 5, overflow: 'hidden', }, selectedCategory?.name
                                === item?.name
                                ? styles.categorySelectedStyle : styles.categoryUnSelectedStyle]}>
                                <TouchableOpacity style={{ width: 100, height: 80, backgroundColor: '#F8F8F8', alignSelf: 'center', }}
                                    onPress={() => {
                                        HomePage2(item)
                                        setSelectedCategory(item)

                                    }}>
                                    <Image source={{ uri: item.image }} style={{ width: "100%", height: "100%", alignSelf: 'center', borderRadius: 7 }} resizeMode='stretch'></Image>
                                </TouchableOpacity>
                                <View style={{}}>
                                    <Text style={{
                                        fontSize: 11, color: (selectedCategory?.name
                                            === item?.name) ? '#29913C' : Mycolors.Black, marginTop: 5, textAlign: 'center', fontWeight: 'bold'
                                    }}>{item?.name}</Text>
                                </View>
                            </View>
                        )
                    }}
                // keyExtractor={item => item.id}
                />
            </View>
            <View style={{ width: dimensions.SCREEN_WIDTH * 0.9, alignSelf: 'center', marginTop: 10 }}>
                <FlatList
                    data={articleData}
                    showsHorizontalScrollIndicator={true}
                    onEndReachedThreshold={0.9}
                    onEndReached={handleLoadMore}
                    renderItem={({ item, index }) => {
                        console.log('item of categories', item.totalLikes);
                        if (item.files && item.files.length > 0 && item.files[0].file_url) {
                            console.log('my video url:', item.files[0].file_url);
                            // Render your item or do something with the file URL
                        } else {
                            console.log('No file URL found for item:', item);
                            // Handle the case where the file URL is missing or undefined
                        }
                        return (

                            //             <View style={{ width: dimensions.SCREEN_WIDTH * 0.9, marginRight: 15, marginBottom: 20 }}
                            //                 onPress={() => { }}>
                            //                 <TouchableOpacity onPress={() => props.navigation.navigate('ArtPost', { id: item.id })}>
                            //                     {item.type == 'video' ?

                            //                         <VideoPlayer
                            //                             resizeMode="contain"
                            //                             video={{
                            //                                 uri: item.files[0].file_url
                            //                             }}
                            //                             style={{ borderRadius: 10, borderWidth: 2, }}
                            //                             videoWidth={dimensions.SCREEN_WIDTH}
                            //                             videoHeight={227}
                            //                             autoplay={false}
                            //                             thumbnail={{ uri: item.thumb.path }}
                            //                             endWithThumbnail
                            //                             disableControlsAutoHide
                            //                             customStyles={{
                            //                                 thumbnail: { width: '100%', height: 227, borderRadius: 10, alignSelf: 'center', resizeMode: 'cover' },
                            //                                 videoWrapper: { width: dimensions.SCREEN_WIDTH, height: 227, },
                            //                                 // wrapper: { width: '100%', height: 227 },
                            //                             }}
                            //                         />



                            //                         : <Image source={{ uri: item.cover_photo }} style={{ width: dimensions.SCREEN_WIDTH * 0.9, height: 227, borderRadius: 10 }} resizeMode='stretch'></Image>}
                            //                 </TouchableOpacity>



                            //                 <ViewMoreText
                            //                     numberOfLines={3}
                            //                     renderViewMore={(onPress) => {
                            //                         return (
                            //                             <Text onPress={onPress} style={{ fontSize: 14, color: '#0089CF', textDecorationLine: "underline" }}>View more</Text>
                            //                         )
                            //                     }}
                            //                     renderViewLess={(onPress) => {
                            //                         return (
                            //                             <Text onPress={onPress} style={{ fontSize: 14, color: '#0089CF', textDecorationLine: "underline" }}>View less</Text>
                            //                         )
                            //                     }}
                            //                     textStyle={{ textAlign: 'left', width: '93%', marginLeft: 5, marginTop: 4 }}
                            //                 >
                            //                     <Text style={{ fontSize: 16, fontWeight: '400', color: '#000000' }}>
                            //                         {item.description
                            //                         }
                            //                     </Text>
                            //                 </ViewMoreText>
                            //                 <View>
                            //                     <Text style={{ fontSize: 12, fontWeight: '400', color: '#B4BBC6', textAlign: 'left', marginLeft: 6, marginTop: 4 }}>
                            //                         {new Date(item.created_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            //                     </Text>
                            //                 </View>

                            //                 {/* <View style={styles.buttonsRow}>
                            //   <TouchableOpacity style={styles.buttonView} onPress={() =>
                            //     Likepost(item.module_id
                            //     )

                            //     // console.log('my like clicked')
                            //   } >
                            //     <Image

                            //       source={
                            //         isLiked
                            //           ? require('../../../assets/images/fashion-dislike-button.png') // Use dislike image
                            //           : require('../../../assets/images/fashion-like-button.png') // Use like image
                            //       }
                            //       style={{ height: 20, width: 20 }} />
                            //     <Text style={styles.buttonText}>{item.likes}</Text>
                            //   </TouchableOpacity>
                            //   <TouchableOpacity style={styles.buttonView}>
                            //     <Image source={require('../../../assets/images/fashion-dislike-button.png')} style={{ height: 20, width: 20 }} />
                            //     <Text style={styles.buttonText}>{item.dislikes}</Text>
                            //   </TouchableOpacity>
                            //   <TouchableOpacity style={styles.buttonView}>
                            //     <Image source={require('../../../assets/images/fashion-share-button.png')} style={{ height: 20, width: 20 }} />
                            //     <Text style={styles.buttonText}>Share</Text>
                            //   </TouchableOpacity>
                            //   <TouchableOpacity onPress={() => { setShowReportModal(true) }} style={styles.buttonView}>
                            //     <Image source={require('../../../assets/images/fashion-report-button.png')} style={{ height: 20, width: 20 }} />
                            //     <Text style={styles.buttonText}>Report</Text>
                            //   </TouchableOpacity>
                            // </View> */}

                            //             </View>
                            <View>

                                <TouchableOpacity onPress={() => {
                                    props.navigation.navigate('ArtPost', { id: item.id })
                                }}
                                    style={{ width: '95.5%', marginVertical: 10, borderRadius: 30, }}>
                                    <View style={styles.flatlistMainView}>

                                        <View style={styles.followingImageView}>
                                            <TouchableOpacity
                                            >

                                                {item.user_profile_image
                                                    ? (
                                                        <Image
                                                            source={{
                                                                uri: item.user_profile_image

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
                                                <TouchableOpacity onPress={() => {


                                                }}>
                                                    <Text style={{ fontSize: 14, fontWeight: '600', color: '#455A64' }}>  {item.username

                                                    }</Text>
                                                </TouchableOpacity>

                                            </View>
                                        </View>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                            {/* <TouchableOpacity onPress={() => { setThreedotclickdata(item.userid), setShowModal(true) }} style={[styles.rightButtonsView, { marginRight: 12, marginLeft: -10 }]}> */}
                                            {/* <TouchableOpacity
                                                onPress={() => {

                                                    // setEditItemId(item.id);
                                                    // setEditModal({
                                                    //     active: true,
                                                    //     id: item.id,

                                                    // });
                                                    setProfileModal({
                                                        active: true,
                                                        id_article: item[0].article_id,
                                                        category: item.category_id,
                                                        description: item.description
                                                    })

                                                    setSelectedId(item[0].article_id);
                                                    setSelectedCategoryy(item.category_id);
                                                    setdesc(item[0].description)

                                                    setTile(item[0].title)
                                                }}
                                                style={[styles.rightButtonsView, { marginRight: 12, marginLeft: -10 }]}
                                            >
                                                <Image source={require('../../../assets/images/people-three-dots.png')} style={{ width: 20, height: 20 }} resizeMode='contain' />
                                            </TouchableOpacity> */}

                                        </View>

                                    </View>

                                    {/* addd new view heree */}
                                    <View style={{ width: dimensions.SCREEN_WIDTH, alignSelf: 'center', }}>
                                        <View style={{ justifyContent: 'flex-start', }}>
                                            <ScrollView horizontal contentContainerStyle={styles.scrollViewContent}>
                                                {item.type == 'video' ? (
                                                    <VideoPlayer
                                                        resizeMode="contain"
                                                        video={{ uri: item?.files?.[0]?.file_url }}
                                                        style={styles.videoPlayer}
                                                        videoWidth={dimensions.SCREEN_WIDTH}
                                                        videoHeight={200}
                                                        autoplay={false}
                                                        thumbnail={{ uri: item.thumb?.path }}
                                                        endWithThumbnail
                                                        disableControlsAutoHide
                                                        customStyles={{
                                                            thumbnail: { width: dimensions.SCREEN_WIDTH, height: 200, alignSelf: 'center' },
                                                            videoWrapper: { width: dimensions.SCREEN_WIDTH, height: 200 },
                                                            controls: { width: '80%', alignSelf: 'center' },
                                                        }}
                                                    />) :
                                                    // (
                                                    //     <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                                    //         {item?.files?.map((image, index) => (
                                                    //             <Image
                                                    //                 source={{ uri: `${image.file_url}` }}
                                                    //                 style={styles.image}
                                                    //                 resizeMode='stretch'
                                                    //             // key={index}
                                                    //             />
                                                    //         ))}
                                                    //     </ScrollView>
                                                    // )
                                                    <View style={{ width: dimensions.SCREEN_WIDTH, height: 200, }}>

                                                        <Image
                                                            source={{ uri: `${item.cover_photo}` }}
                                                            style={styles.image}
                                                            resizeMode='stretch'
                                                        // key={index}
                                                        />

                                                    </View>
                                                }

                                            </ScrollView>
                                        </View>
                                    </View>


                                    <View style={styles.flatlistMainBottomView}>



                                        {
                                            <View>

                                                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }} onPress={() => {

                                                    // props.navigation.navigate('LikedUserList', { postid: item.id })
                                                }}>

                                                    <View style={{
                                                        flexDirection: 'row',
                                                        alignItems: 'center',
                                                        justifyContent: 'space-between',
                                                        width: dimensions.SCREEN_WIDTH * 0.82, marginTop: -15, marginBottom: 10
                                                    }}>
                                                        <Text style={styles.descriptionTextrrrr}>{item.headline}</Text>
                                                        <Text style={styles.createdTimeText}>{item.created_date}</Text>
                                                    </View>
                                                </TouchableOpacity>
                                                <View style={styles.flatlistBottomView}>
                                                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                                        < View style={styles.buttonsContainer} >
                                                            <TouchableOpacity style={styles.buttonView}>
                                                                <Image
                                                                    source={require('../../../assets/images/fashion-dark-like-button.png')}
                                                                    style={styles.buttonIcon}
                                                                />
                                                                <Text style={styles.buttonText}>{item.totalLikes} Likes</Text>

                                                            </TouchableOpacity>
                                                            <TouchableOpacity style={styles.buttonView}>
                                                                <Image
                                                                    source={require('../../../assets/images/fashion-dark-dislike-button.png')}
                                                                    style={styles.buttonIcon}
                                                                />
                                                                <Text style={styles.buttonText}>{item.totalDislikes} Dislikes</Text>
                                                            </TouchableOpacity>
                                                            <TouchableOpacity style={styles.buttonView}>
                                                                <Image
                                                                    source={require('../../../assets/People/commentPostPeople.png')}
                                                                    style={styles.buttonIcon}
                                                                />
                                                                <Text style={styles.buttonText}>{item.totalComments
                                                                } Comments</Text>
                                                            </TouchableOpacity>
                                                        </View>
                                                    </View>
                                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                        <View style={{ marginRight: 10 }}>

                                                        </View>

                                                    </View>
                                                </View>
                                            </View>
                                        }
                                    </View>
                                </TouchableOpacity>
                            </View>

                        )
                    }}
                    keyExtractor={item => item.id}

                />
                {isDataEmpty() ?
                    <>
                        <Image source={require('../../../assets/Art/noOrderArt.png')} style={{ alignSelf: 'center', height: 270, width: 270 }}></Image>
                        <Text style={{ color: 'black', alignSelf: 'center' }}>No posts found</Text>
                    </>
                    : null}
            </View>
            {/* </ScrollView> */}
            <Modal
                isVisible={modlevisual5}
                swipeDirection="down"
                onSwipeComplete={(e) => {
                    setmodlevisual5(false)
                }}
                scrollTo={() => { }}
                onBackdropPress={() => setmodlevisual5(false)}
                scrollOffset={1}
                propagateSwipe={true}
                coverScreen={false}
                backdropColor='transparent'
                style={{ justifyContent: 'flex-end', margin: 0, backgroundColor: 'rgba(0,0,0,0.5)' }}
            >
                <View style={{ height: '80%', backgroundColor: '#fff', borderTopLeftRadius: 15, borderTopRightRadius: 15, padding: 20 }}>
                    <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled={true}>

                        <Text style={{ color: Mycolors.Black, fontWeight: '500', fontSize: 22, textAlign: 'center' }} >Pick from a wide range of categories</Text>

                        <View style={{ width: '100%', alignSelf: 'center', marginTop: 20 }}>
                            <FlatList
                                data={categoryData}
                                // horizontal={true}
                                // showsHorizontalScrollIndicator={false}
                                // numColumns={2}
                                renderItem={({ item, index }) => {
                                    return (
                                        <TouchableOpacity
                                            style={[{
                                                width: '96%', marginHorizontal: 10, flexDirection: 'row', alignItems: 'center', borderRadius: 10, marginBottom: 20,
                                                padding: 7,
                                                overflow: 'hidden',
                                                // borderWidth:1, borderColor:'black'
                                                // shadowColor: '#E0E0E0',
                                                // shadowOffset: {
                                                //     width: 0,
                                                //     height: 3
                                                // },
                                                // shadowRadius: 5,
                                                // shadowOpacity: 0.6,
                                                // elevation: 3,
                                            }, selectedCategory?.name === item?.name ? styles.categorySelectedStyle : styles.categoryUnSelectedStyle]}
                                            onPress={() => {
                                                setSelectedCategory(item);

                                                HomePage2(item)

                                                setmodlevisual5(false)
                                            }}
                                        >
                                            <Image source={{ uri: item.image }} style={{ width: '20%', height: 60, borderRadius: 7, }} resizeMode='contain' ></Image>
                                            <View style={{ justifyContent: 'center', alignItems: 'center', width: "60%" }}>
                                                <Text style={{ fontSize: 16, color: (selectedCategory?.name === item?.name) ? '#29913C' : '#455A64', marginTop: 5, textAlign: 'center', fontWeight: 'bold' }}>{item?.name}</Text>
                                            </View>
                                        </TouchableOpacity>
                                        // <View style={{ width: 100, marginHorizontal: 5 }}>
                                        //   <TouchableOpacity style={{ width: 100, height: 80, backgroundColor: '#F8F8F8', alignSelf: 'center' }}
                                        //     onPress={() => { setSelectedCategory(item) }}>
                                        //     <Image source={{ uri: item.category_image }} style={{ width: "100%", height: "100%", alignSelf: 'center', borderRadius: 7 }}></Image>
                                        //   </TouchableOpacity>
                                        //   <View style={{}}>
                                        //     <Text style={{ fontSize: 11, color: (selectedCategory?.category_id === item?.category_id) ? '#835E23' : Mycolors.Black, marginTop: 5, textAlign: 'center', fontWeight: 'bold' }}>{item?.category_name}</Text>
                                        //   </View>
                                        // </View>
                                    )
                                }}
                            // keyExtractor={item => item.id}
                            />
                        </View>


                        <View style={{ width: 100, height: 30 }} />
                    </ScrollView>

                </View >
            </Modal >
            {loading || loading2 ? <Loader /> : null}
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
        marginTop: 20
    },
    buttonView: {
        flexDirection: 'row',
        alignItems: 'center'
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
        backgroundColor: '#0089CF',
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
    contMap: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '20%',
        alignSelf: 'center',
        marginHorizontal: 20
    },
    categorySelectedStyle: {
        borderWidth: 2,
        borderColor: '#29913C',
        borderRadius: 10
    },
    categoryUnSelectedStyle: {
        borderWidth: 2,
        borderColor: '#B2B7B9',
        borderRadius: 10
    },
    refreshView: {
        flexDirection: 'row',
        alignItems: 'center',
        // width: '25%',
        // marginTop: 10,
        marginRight: 10,
        backgroundColor: '#29913C',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 50
    },
    flatlistMainView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        paddingHorizontal: 15,
        paddingVertical: 10,
        width: dimensions.SCREEN_WIDTH * 0.9,
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
        backgroundColor: '#fff',
        paddingVertical: 15,
        paddingHorizontal: 20,
        width: dimensions.SCREEN_WIDTH * 0.9,
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderLeftColor: '#EAEBEB',
        borderRightColor: '#EAEBEB',
        borderBottomColor: '#EAEBEB',

    },
    flatlistBottomView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        //  marginBottom: 12
    },
    textContainerrrr: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: dimensions.SCREEN_WIDTH * 0.82,


    },
    descriptionTextrrrr: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#263238',
    },
    createdTimeText: {
        fontSize: 12,
        fontWeight: '500',
        color: '#263238',
        textAlign: 'right',
    },
    scrollViewContent: {
        alignItems: 'center',
    },
    image: {
        width: dimensions.SCREEN_WIDTH * 1,
        height: '99%',
        alignSelf: 'center',
        //  backgroundColor: 'red',
        justifyContent: 'center',


    },
    buttonsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 0, // Add margin between text and buttons
        // Align buttons with the text,


    },
    buttonView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 20, // Add margin between buttons

    },
    buttonIcon: {
        height: 20,
        width: 20,
    },
    buttonText: {
        marginLeft: 5, // Add spacing between icon and text
        fontSize: 14,
        color: '#263238',
    },
    topRightImage: {
        position: 'absolute',
        top: 10, // Adjust the top position as needed
        right: 10, // Adjust the right position as needed
        width: 30,
        height: 30,
        resizeMode: 'contain',
        backgroundColor: 'red'

    }, topRightImageContainer: {
        position: 'absolute',
        top: 30, // Adjust the top position as needed
        right: 30, // Adjust the right position as needed
        zIndex: 999,
        backgroundColor: 'transparent'
    },
});
export default ArtCategories