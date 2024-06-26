

// import React, { useEffect, useState, useRef } from 'react';
// import { View, Image, Text, StyleSheet, SafeAreaView, FlatList, Alert, TouchableOpacity, ScrollView, ImageBackground, } from 'react-native';
// import HomeHeaderRoundBottom from './components/HomeHeaderRoundBottom';
// import SearchInput2 from '../../../component/SearchInput2';
// import SearchInputEnt from '../../../component/SearchInputEnt';
// import FashionSearch from './components/FashionSearch';
// import SerchInput from '../../../component/SerchInput';
// import { dimensions, Mycolors } from '../../../utility/Mycolors';
// import { TextInput } from "react-native-paper";
// import { WebView } from 'react-native-webview';
// import { ImageSlider, ImageCarousel } from "react-native-image-slider-banner";
// import DynamicTextInput from './components/DynamicTextInput';
// import ImagePicker from 'react-native-image-crop-picker';
// import { baseUrl, shop_eat_cart, user_payment_method, shop_eat_orders, shop_eat_cart_book_dining, shop_eat_cart_book_table, shop_eat_cart_id, shop_eat_business_id, shop_eat_menu_userid, requestPostApi, requestGetApi, shop_eat, connect_people_create_post, connect_people_newPost, art_getCollection, requestPostApiMedia, art_PostCollection, postApiWithToken2, creation_categories } from '../../../WebApi/Service'
// import DocumentPicker from 'react-native-document-picker';
// import { Thumbnail } from 'react-native-thumbnail-video';
// import MyButtons from '../../../component/MyButtons';
// import MultiSlider from '@ptomasroos/react-native-multi-slider';
// import Modal from 'react-native-modal';
// import Toast from 'react-native-toast-message'
// import LinearGradient from 'react-native-linear-gradient'
// import AppIntroSlider from 'react-native-app-intro-slider';
// import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
// import Video from 'react-native-video';
// // import { Thumbnail } from 'react-native-thumbnail-video';

// import { androidCameraPermission } from '../../Connect/People/Permissions';
// import { useSelector, useDispatch } from 'react-redux';
// import Loader from '../../../WebApi/Loader';
// import VideoPlayer from 'react-native-video-player'
// import { createThumbnail } from "react-native-create-thumbnail";
// import ViewMoreText from 'react-native-view-more-text';
// import axios from 'axios';
// const InventionUpload = (props) => {
//   const dispatch = useDispatch();
//   const User = useSelector(state => state.user.user_details)
//   console.log('User', User.token);
//   const [searchValue, setsearchValue] = useState('')
//   const [scrollEnabled, setScrollEnabled] = useState(false)
//   const myTextInput = useRef()
//   const [multiSliderValue, setMultiSliderValue] = useState([0, 100])

//   const [showChooseMilesModal, setShowChooseMilesModal] = useState(false)
//   const [selectedCategory, setSelectedCategory] = useState(null)
//   const [loading, setLoading] = useState(false)
//   const [showModal, setShowModal] = useState({ isVisible: false, data: null });
//   const [picker, setPicker] = useState([])
//   const [showVideoModal, setShowVideoModal] = useState(false)
//   const [selectedVideo, setSelectedVideo] = useState({})
//   const [showReportModal, setShowReportModal] = useState(false)
//   const [selectedReasonId, setSelectedReasonId] = useState(null)
//   const [modlevisual5, setmodlevisual5] = useState(false)
//   const [headingTitle, setHeadingTitle] = useState('')
//   const [price, setPrice] = useState('')
//   console.log('price for ammounr', price);
//   const [newsArticle, setNewsArticle] = useState('')
//   const [showFundraiserInput, setShowFundraiserInput] = useState(false);
//   const [fundraiserValue, setFundraiserValue] = useState('');
//   const [selectedButton, setSelectedButton] = useState('Informational')
//   const handleFundraiserClick = () => {
//     setShowFundraiserInput(true); setSelectedButton('Fundraiser')
//   };

//   const handleFundraiserInputChange = text => {
//     setFundraiserValue(text);
//     setSelectedButton('Information')
//   };
//   const [reportReasonData, setReportReasonData] = useState([
//     {
//       id: '1',
//       name: 'I just don’t like it',
//       description: '',
//       selected: true
//     },
//     {
//       id: '2',
//       name: 'Nudity or pornography',
//       description: '',
//       selected: false
//     },
//     {
//       id: '3',
//       name: 'Hate speech or symbols',
//       description: 'Racist, homophobic or sexist slurs',
//       selected: false
//     },
//     {
//       id: '4',
//       name: 'Violence or threat of violence',
//       description: `Graphic injury, unlawful activity, dangerous or criminal organizations`,
//       selected: false
//     },
//     {
//       id: '5',
//       name: 'Sale or promotion of firearms',
//       description: '',
//       selected: false
//     },
//     {
//       id: '6',
//       name: 'Sale or promotion of drugs',
//       description: '',
//       selected: false
//     },
//     {
//       id: '7',
//       name: 'Harassment or bullying',
//       description: '',
//       selected: false
//     },
//     {
//       id: '8',
//       name: 'Intellectual property violation',
//       description: 'Copyright or trademark infringement',
//       selected: false
//     },
//   ])
//   const [videoInfo, setVideoInfo] = useState([]);
//   const [upData, setupData] = useState([
//     {
//       id: '1',
//       catId: '1',
//       title: 'Intel 3rd Gen Motherboard',
//       desc: '',
//       price: '$140.00',
//       time: '',
//       img: require('../../../assets/images/intel_motherboard.png'),
//     },
//     {
//       id: '2',
//       catId: '2',
//       title: 'Intel 3rd Gen Motherboard',
//       desc: '',
//       price: '$140.00',
//       time: '',
//       img: require('../../../assets/images/intel_motherboard.png'),
//     },
//     {
//       id: '3',
//       catId: '3',
//       title: 'Intel 3rd Gen Motherboard',
//       desc: '',
//       price: '$140.00',
//       time: '',
//       img: require('../../../assets/images/intel_motherboard.png'),
//     },
//     {
//       id: '4',
//       catId: '4',
//       title: 'Intel 3rd Gen Motherboard',
//       desc: '',
//       price: '$140.00',
//       time: '',
//       img: require('../../../assets/images/intel_motherboard.png'),
//     },
//     {
//       id: '5',
//       catId: '1',
//       title: 'Intel 3rd Gen Motherboard',
//       desc: '',
//       price: '$140.00',
//       time: '',
//       img: require('../../../assets/images/intel_motherboard.png'),
//     },
//     {
//       id: '6',
//       catId: '2',
//       title: 'Intel 3rd Gen Motherboard',
//       desc: '',
//       price: '$140.00',
//       time: '',
//       img: require('../../../assets/images/intel_motherboard.png'),
//     },
//     {
//       id: '7',
//       catId: '3',
//       title: 'Intel 3rd Gen Motherboard',
//       desc: '',
//       price: '$140.00',
//       time: '',
//       img: require('../../../assets/images/intel_motherboard.png'),
//     },
//   ])
//   const types = [
//     {
//       id: '1',
//       name: 'Information'
//     },
//     {
//       id: '2',
//       name: 'Fundraiser'
//     }
//   ]
//   const [currentSelection, setcurrentSelection] = useState('All')
//   const [modlevisual, setmodlevisual] = useState(false);
//   const [categoryData, setCategorydata] = useState('')
//   const [selectorModal, setSelectorModal] = useState('')
//   const [updatedLength, setUpdatedLength] = useState(1)
//   const [symbol, setSymbol] = useState("\u0024")
//   console.log(updatedLength, 'updatedLength');
//   const [inputs, setInputs] = useState([{ id: 1, value: '' }]);
//   const handleInformationalClick = () => {
//     setShowFundraiserInput(false);
//     setSelectedButton('Informational');
//   };

//   const addInput = () => {
//     const newId = inputs.length + 1;
//     console.log('my new id fff', newId);
//     setInputs([...inputs, { id: newId, value: '' }]);
//   };

//   const handleInputChange = (id, text) => {
//     const updatedInputs = inputs.map(input =>
//       input.id === id ? { ...input, value: text } : input
//     );
//     setInputs(updatedInputs);
//   };
//   const multiSliderValuesChange = (values) => { setMultiSliderValue(values) }
//   useEffect(() => {
//     thumbnail()
//     console.log('jj my inputs', inputs)
//   }, [])

//   useEffect(() => {
//     ArtCategory()
//     thumbnail()
//   }, [])
//   const openVideoModal = () => {

//     if (picker.length == 0) {
//       setSelectorModal(false)

//       console.log(picker.length, 'picker length');
//       setcurrentSelection('video')
//       handleVideoUpload()

//       // pickvideo()
//     } else {
//       Toast.show({ text1: 'Delete image to upload  video ' });
//     }
//   }
//   const openImageModal = (index) => {
//     console.log('video info', videoInfo);
//     if (videoInfo.length == 0) {
//       setSelectorModal(false)
//       setmodlevisual(true)

//     }
//     else {
//       Toast.show({ text1: 'Delete Video to select image ' });
//     }

//   }
//   const ArtCategory = async () => {
//     setLoading(true)
//     var fUrl = creation_categories
//     var urls = '?module_id=' + '59'
//     console.log('my url---------->', urls)
//     if (urls != undefined) {
//       fUrl = fUrl + urls
//     }
//     // console.log("LIKE CLICK:::",isSaved);
//     const { responseJson, err } = await requestGetApi(fUrl, '', 'GET', User.token)
//     setLoading(false)
//     console.log('the res Home==>>', responseJson)
//     if (responseJson.headers.success == 1) {
//       console.log('the res after sucess', responseJson.body.data)
//       setCategorydata(responseJson.body.data)
//       // Toast.show({ text1: responseJson.headers.message });
//     } else {

//       setalert_sms(err)
//       setMy_Alert(true)
//     }
//   }
//   const openSelectorModal = (index) => {
//     console.log('my image')
//     setSelectorModal(true)
//   }
//   const onGallery = async () => {
//     console.log('picker');
//     try {
//       let value = await ImagePicker.openPicker({
//         width: 1080,
//         height: 1080,
//         cropping: true,
//         mediaType: 'photo',
//         compressImageQuality: 1,
//         compressImageMaxHeight: 1080 / 2,
//         compressImageMaxWidth: 1080 / 2,
//         multiple: true
//       }).then(images => {
//         console.log('---------then block------->', images);
//         setPicker([...picker, ...images]);
//         // setPicker(images);
//         setcurrentSelection('image')
//         setmodlevisual(false)
//       });
//     } catch (error) {
//       console.log('error in openLibrary', error);
//     }
//   };

//   const onCamera = () => {
//     ImagePicker.openCamera({
//       width: 300,
//       height: 400,
//       cropping: true,
//     }).then(image => {
//       console.log(image, 'camera image')
//       setPicker([...picker, image]);
//       // setPicker(image);
//       setUpdatedLength(1)
//       setcurrentSelection('camera_image')
//       setmodlevisual(false)

//     });
//   }
//   const handleAmountChange = (text) => {
//     // Remove any non-numeric characters and set the value with the "$" symbol
//     setPrice('$' + text.replace(/[^0-9]/g, ''));
//     // onChangeText = {(e) => setHeadingTitle(e)}


//   };
//   const handleVideoUpload = async () => {
//     try {
//       const res = await DocumentPicker.pick({
//         type: [DocumentPicker.types.video],
//       });

//       // The selected video can be accessed using 'res.uri'
//       console.log('Selected Video URI:', res[0].uri);
//       //setVideoUri(res[0].uri);
//       setmodlevisual(false)
//       setVideoInfo(res);
//       setSelectorModal(false)

//       //setIsVideoSelected(true);

//       // Add your upload logic here
//       // You can use a network library (e.g., axios) to send the video to the server
//     } catch (err) {
//       if (DocumentPicker.isCancel(err)) {
//         // User canceled the picker
//         console.log('User canceled video picker');
//       } else {
//         // Error occurred while picking the video
//         console.log('Error picking video:', err);
//       }
//     }
//   };

//   const Createpost = async () => {
//     console.log(picker, picker.length, 'picker check camera');
//     if (selectedCategory === null) {
//       Toast.show({ text1: 'Please select category' });
//     }
//     else if (headingTitle?.trim()?.length === 0 || headingTitle?.trim()?.length < 25) {
//       Toast.show({ text1: 'Please enter title upto 25 characters' });
//     }
//     else if (newsArticle?.trim()?.length === 0 || newsArticle?.trim()?.length < 150) {

//       Toast.show({ text1: 'Please enter description upto 150 characters' });
//     }
//     else if (picker.length == 0 && videoInfo.length == 0) {
//       console.log('kkkkkrrrr', picker.length);
//       Toast.show({ text1: 'Please upload photo or video' });
//     }
//     else if (picker == 'undefined' && videoInfo.length == 0) {
//       console.log('cl of phtoto by camera', picker == 0 || videoInfo.length == 0);
//       Toast.show({ text1: 'Please upload photo or video ' });
//     }
//     else {
//       try {
//         console.log('hhhhh to');
//         setLoading(true)
//         const data = new FormData();
//         data.append(`headline`, headingTitle)
//         data.append(`description`, newsArticle)
//         data.append(`status`, 1)
//         data.append(`category_id`, selectedCategory.id)
//         data.append(`module_id`, 59)
//         data.append(`type`, selectedButton)
//         data.append(`project_estimate`, price)
//         console.log('data', data);
//         if (currentSelection == 'video') {
//           data.append(`files`, {
//             name: videoInfo[0].name,
//             type: videoInfo[0].type,
//             uri: videoInfo[0].uri,
//           });
//         } else {
//           if (picker.length > 0) {
//             console.log('picker gallery');
//             picker.map((item, index) => {
//               const imageName = item.path.slice(
//                 item.path.lastIndexOf('/'),
//                 item.path.length,
//               );
//               data.append(`files`, {
//                 name: imageName,
//                 type: item.mime,
//                 uri: item.path,
//               });
//             });
//           }
//           else if (picker.length == undefined) {
//             console.log('picker undefined');
//             const imageName = picker.path.slice(
//               picker.path.lastIndexOf('/'),
//               picker.path.length,
//             );
//             data.append(`files`, {
//               name: imageName,
//               type: picker.mime,
//               uri: picker.path,
//             });
//           }
//         }

//         console.log(data, 'data');
//         const { response, status } = await axios

//           .post(
//             'http://54.153.75.225/backend/api/v1/creation/invention/create-article',
//             data,

//             {
//               headers: {
//                 'Content-Type': 'multipart/form-data',
//                 Authorization: `Bearer ${User.token}`,
//               },
//             },
//           )
//           .then(res => {

//             return {
//               response: res.data,
//               status: true,
//             };

//           }
//           )

//           .catch(err => {
//             return {
//               response: err,
//               status: false,
//             };
//           });
//         console.log(response, status, 'myyyyy response');

//         if (status === true) {

//           props.navigation.navigate('InventionHome')
//           Toast.show({ text1: response.headers.message });
//         } else {
//           console.log(response.headers.message);

//         }
//         setLoading('false')
//       } catch (error) {
//         console.error('error in TestingUploading', response.headers.messagerror);
//       }
//     }
//   };
//   const handleCrop = async () => {
//     // Handle cropping for each selected image individually
//     const croppedImages = [];
//     for (const image of picker) {
//       try {
//         const croppedImage = await ImagePicker.openCropper({
//           path: image.path,
//           width: 300,
//           height: 400,
//           cropperCircleOverlay: false,
//           cropperToolbarTitle: "Crop Image",
//         });
//         croppedImages.push(croppedImage);
//       } catch (error) {
//         console.log(error);
//       }
//     }
//     setPicker(croppedImages);
//     console.log(croppedImages);
//     // Here, you can handle the cropped images as needed (e.g., display, upload, etc.).
//   };
//   const thumbnail = async () => {
//     console.log('function caleed for thumbnail');
//     createThumbnail({
//       url: 'https://www.youtube.com/embed/XmGO4O2vpJw',
//       timeStamp: 10000,
//     })
//       .then(response => console.log(response, 'my thumbnail generated'))
//       .catch(err => console.log({ err }));

//   }
//   return (
//     <SafeAreaView scrollEnabled={scrollEnabled} style={{ height: '100%', backgroundColor: '#F8F8F8' }}>
//       <ScrollView>
//         <HomeHeaderRoundBottom height={100} paddingHorizontal={15} borderBottomLeftRadius={20} borderBottomRightRadius={20} backgroundColor='#FFC40C'
//           press1={() => { props.navigation.goBack() }} img1={require('../../../assets/images/service-header-back-button.png')} img1width={25} img1height={18}
//           press2={() => { }} title2={'Upload'} fontWeight={'500'} img2height={20} color={'#fff'}
//           press3={() => { props.navigation.navigate('InventionNotifications') }} img3={require('../../../assets/images/fashion-bell-icon.png')} img3width={25} img3height={22} />

//         <View style={{ width: '85%', alignSelf: 'center', marginTop: 30 }}>
//           <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
//             <Text style={{ fontSize: 16, fontWeight: '500', color: '#263238', marginBottom: 5 }}>Choose Category</Text>
//             <TouchableOpacity onPress={() => { setmodlevisual5(true) }}>
//               <Text style={{ fontSize: 16, fontWeight: '500', color: '#FFC40C', marginBottom: 5 }}>View All</Text>
//             </TouchableOpacity>
//           </View>

//           <View style={{ width: dimensions.SCREEN_WIDTH * 0.9, alignSelf: 'flex-start', marginTop: 0, marginBottom: 10, marginTop: 10 }}>
//             <FlatList
//               data={categoryData}
//               showsHorizontalScrollIndicator={true}
//               horizontal
//               renderItem={({ item, index }) => {
//                 return (

//                   <TouchableOpacity style={[{ width: dimensions.SCREEN_WIDTH / 3, height: 140, marginRight: 15, borderRadius: 10, overflow: 'hidden', position: 'relative', alignItems: 'center', borderRadius: 15, paddingHorizontal: 10, }, selectedCategory?.name
//                     === item?.name
//                     ? styles.categorySelectedStyle : null]}
//                     onPress={() => { setSelectedCategory(item) }}>
//                     <Image source={{ uri: item.image }} style={{ width: dimensions.SCREEN_WIDTH / 2.8, height: 160 }} resizeMode='stretch'></Image>
//                     <LinearGradient
//                       colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.43)']}
//                       style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, zIndex: 1, }}
//                     >

//                       <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center', }}>
//                         <Text style={{
//                           fontSize: 14, fontWeight: '500', color: (selectedCategory?.name
//                             === item?.name) ? 'white' : 'white', bottom: 20
//                         }}>{item.name}</Text>
//                       </View>
//                       {/* } */}
//                     </LinearGradient>
//                   </TouchableOpacity>
//                 )
//               }}
//               keyExtractor={item => item.id}
//             />
//           </View>
//           {/* <View
//             style={{
//               width: '97%',
//               paddingLeft: 0,
//               fontSize: 13,
//               height: 'auto',
//               fontWeight: '400',
//               color: '#000000',
//               marginVertical: 22,
//               flexDirection: 'column',  // Change flexDirection to 'column'
//               alignItems: 'center',
//             }}
//           >
//             <View
//               style={{
//                 backgroundColor: 'white',
//                 flexDirection: 'row',
//                 justifyContent: 'space-between',
//                 alignItems: 'center',
//                 width: '100%',   // Make the yellow view take the full width
//                 height: 50,
//                 borderWidth: 1,
//                 borderColor: '#FFC40C',
//                 borderRadius: 4,
//                 marginHorizontal: 12
//               }}
//             >

//               <TouchableOpacity style={{ alignItems: 'center', width: '50%' }} onPress={handleFundraiserClick}>
//                 <Text style={{ textAlign: 'center' }}>Informational</Text>
//               </TouchableOpacity>
//               <View style={{ height: 32, width: 1, backgroundColor: '#000000' }}>

//               </View>
//               <TouchableOpacity style={{ marginHorizontal: 12, alignItems: 'center', width: '50%' }} onPress={() => setShowFundraiserInput(false)}>
//                 <Text>Fundraiser</Text>
//               </TouchableOpacity>
//             </View>

//             {showFundraiserInput ? (
//               <TextInput
//                 mode="outlined"
//                 label="Startup title"
//                 maxLength={50}
//                 underlineColor="red"
//                 underlineColorAndroid="transparent"
//                 keyboardType="number-pad"
//                 value={headingTitle}
//                 textColor="#000000"
//                 onChangeText={(e) => setHeadingTitle(e)}
//                 outlineStyle={{ borderColor: '#dbdbd9' }}
//                 style={{
//                   width: '97%',
//                   paddingLeft: 0,
//                   fontSize: 13,
//                   height: 50,
//                   fontWeight: '400',
//                   color: '#000000',
//                 }}
//               />
//             ) : <Text style={{ fontSize: 14, color: 'gray', marginVertical: 12, textAlign: 'center', }}>Create interactive posts to increase your reach among community.</Text>}
//           </View> */}
//           <View
//             style={{
//               width: '97%',
//               paddingLeft: 0,
//               fontSize: 13,
//               height: 'auto',
//               fontWeight: '400',
//               color: '#000000',
//               marginVertical: 22,
//               flexDirection: 'column',
//               alignItems: 'center',
//             }}
//           >
//             <View
//               style={{
//                 backgroundColor: 'white',
//                 flexDirection: 'row',
//                 justifyContent: 'space-between',
//                 alignItems: 'center',
//                 width: '100%',
//                 height: 50,
//                 borderWidth: 1,
//                 borderColor: '#FFC40C',
//                 borderRadius: 4,
//                 marginHorizontal: 12,
//               }}
//             >
//               <TouchableOpacity
//                 style={{
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   width: '50%',
//                   height: 47,
//                   backgroundColor: selectedButton === 'Informational' ? '#FFC40C' : 'white',
//                 }}
//                 onPress={handleInformationalClick}
//               >
//                 <Text style={{ textAlign: 'center', color: selectedButton === 'Informational' ? 'white' : '#000000' }}>Informational</Text>
//               </TouchableOpacity>

//               <TouchableOpacity
//                 style={{
//                   alignItems: 'center',
//                   justifyContent: 'center',

//                   height: 47,
//                   width: '50%',
//                   backgroundColor: selectedButton === 'Fundraiser' ? '#FFC40C' : 'white',
//                 }}
//                 onPress={handleFundraiserClick}
//               >
//                 <Text style={{ color: selectedButton === 'Fundraiser' ? 'white' : '#000000' }}>Fundraiser</Text>
//               </TouchableOpacity>
//             </View>

//             {selectedButton === 'Fundraiser' ? ( // Use selectedButton state to conditionally render the input field
//               <>
//                 <Text style={{ fontSize: 14, color: 'gray', marginVertical: 12, textAlign: 'center' }}>
//                   Launch your campaign and raise funds from our backers
//                 </Text>

//               </>
//             ) : (
//               <Text style={{ fontSize: 14, color: 'gray', marginVertical: 12, textAlign: 'center' }}>
//                 Create interactive posts to increase your reach among the community.
//               </Text>
//             )}
//           </View>
//           <TextInput
//             mode="outlined"
//             label="Invention title"
//             maxLength={50}
//             underlineColor="red"
//             underlineColorAndroid="transparent"
//             keyboardType="default"
//             value={headingTitle}

//             theme={{ colors: { primary: "#FFC40C" } }}
//             textColor="#000000"
//             onChangeText={(e) => setHeadingTitle(e)}
//             outlineStyle={{ borderColor: '#dbdbd9' }}
//             style={[
//               styles.input,
//               {
//                 width: "97%",
//                 paddingLeft: 0,
//                 fontSize: 13,

//                 fontWeight: "400",
//                 color: "#000000",

//               },
//             ]}
//           />


//           {/* <View style={{
//             height: '30%',
//             overflow: "hidden",
//             width: dimensions.SCREEN_WIDTH * 0.9,
//             borderRadius: 20,
//             justifyContent: 'center',
//             alignSelf: "auto", marginTop: 30

//           }}>
//             <WebView
//               source={{ uri: 'https://www.youtube.com/embed/XmGO4O2vpJw' }}
//             />


//           </View> */}
//           {/* <View>
//             {inputs.map(input => (



//               <TextInput
//                 outlineStyle={{ borderColor: '#dbdbd9', }}
//                 theme={{ colors: { primary: "#FFC40C" } }}
//                 underlineColor="red"
//                 textColor="#000000"
//                 underlineColorAndroid="transparent"
//                 keyboardType="default"
//                 mode="outlined"
//                 key={input.id}
//                 placeholder="Enter Url"
//                 value={input.value}
//                 onChangeText={text => handleInputChange(input.id, text)}
//                 style={[
//                   styles.input,
//                   {
//                     width: "97%",
//                     paddingLeft: 0,
//                     fontSize: 13,
//                     height: 60,
//                     fontWeight: "400",
//                     color: "#000000",
//                   },
//                 ]}
//               />
//             ))}
//             <TouchableOpacity
//               onPress={addInput}
//               style={{
//                 height: 30,
//                 width: 30,
//                 backgroundColor: 'yellow',
//                 borderRadius: 20,
//               }}
//             >
//               <Text
//                 style={{
//                   alignSelf: 'center',
//                   justifyContent: 'center',
//                   textAlign: 'center',
//                   marginTop: 3,
//                 }}
//               >
//                 +
//               </Text>
//             </TouchableOpacity>
//           </View> */}
//           {/* <TextInput
//             value={newsArticle}
//             onChangeText={(e) => setNewsArticle(e)}
//             placeholder={'Describe something about Startup ...'}
//             placeholderTextColor="#8F93A0"
//             multiline={true}
//             textAlignVertical='top'
//             // maxLength={500}
//             // keyboardType="number-pad"
//             autoCapitalize='none'
//             style={styles.newsArticleStyle}
//           /> */}

//           <TextInput
//             mode="outlined"
//             label="Describe something about Invention ..."
//             multiline   // Set multiline prop to true
//             numberOfLines={4} // Adjust the initial number of visible lines
//             maxLength={500}
//             outlineColor="red"
//             outlineStyle={{ borderColor: '#dbdbd9' }}
//             underlineColorAndroid="transparent"
//             keyboardType="default" // You might want to use "default" keyboardType for multiline input
//             value={newsArticle}
//             onChangeText={(e) => setNewsArticle(e)}
//             textColor="#000000"
//             theme={{ colors: { primary: "#FFC40C" } }}
//             style={[
//               styles.input,
//               {
//                 width: "97%",
//                 paddingLeft: 0,
//                 fontSize: 13,
//                 // Adjust the height for multiline input
//                 fontWeight: "400",
//                 color: "#000000",
//               },
//             ]}
//           />
//           {/* {selectedButton === 'Fundraiser' ? ( // Use selectedButton state to conditionally render the input field */}
//           <>

//             {selectedButton == 'Fundraiser' ? (
//               <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
//                 <TextInput
//                   mode="outlined"
//                   label="Enter Amount to be raised"
//                   underlineColor="red"
//                   underlineColorAndroid="transparent"
//                   keyboardType="number-pad"
//                   value={price.toString()}
//                   textColor="#000000"
//                   theme={{ colors: { primary: '#FFC40C' } }}
//                   onChangeText={(e) => {
//                     // Parse the numeric value and store it in the state
//                     setPrice(e.replace(/[^0-9]/g, ''));
//                   }}
//                   outlineStyle={{ borderColor: '#dbdbd9' }}
//                   style={{
//                     width: '97%',
//                     fontWeight: '400',
//                     color: '#000000',
//                     flex: 1,
//                     fontSize: 13,
//                     fontWeight: '400',
//                     color: '#000000',
//                     paddingLeft: 10,
//                   }}
//                   prefix="$" // Dollar sign as a prefix
//                 />
//               </View>
//             ) : null}
//           </>
//           {/* ) : (
//             null
//           )} */}
//           <View
//             style={{
//               justifyContent: "flex-start",
//               alignItems: "flex-start",
//               width: "100%",
//               height: 110,
//             }}
//           >
//             <ScrollView horizontal>
//               <View style={picker.length || videoInfo?.length > 0 ? styles.myImage : styles.myImagePicker}>
//                 {/* {console.log(picker.length, 'picker.length')}
//               {picker.length > 0 ? (
//                 picker.map((y, index) => {
//                   console.log('images yyyyyyy--------->', y);
//                   return (
//                     <View key={index} style={styles.uploadedImageBox}>
//                       <Image
//                         source={{
//                           uri: y?.path ? y?.path : null,
//                         }}
//                         style={styles.imagePickerStyle}
//                       />
//                       <TouchableOpacity
//                         onPress={() => {
//                           const updated = picker.filter(el => el.path !== y.path);
//                           setPicker(updated);
//                           console.log('Updated', updated.length);
//                           { updated.length == 0 ? setcurrentSelection('All') : null }

//                         }}
//                         style={{
//                           position: 'absolute',


//                         }}
//                       >
//                         <Image
//                           style={styles.deleteIcon}
//                           source={require('../../../assets/cutRed.png')}
//                         />
//                       </TouchableOpacity>
//                     </View>
//                   );
//                 })
//               ) : (
//                 <View style={{ height: 70, width: 80, position: 'relative', marginRight: 29, marginTop: 22 }}>
//                   {videoInfo?.length > 0 && videoInfo[0]?.uri && (
//                     <Video
//                       source={{ uri: videoInfo[0]?.uri }}
//                       style={{ width: 90, height: 90 }}

//                       resizeMode="cover"
//                     />
//                   )}
//                   {videoInfo?.length > 0 && videoInfo[0]?.uri && (
//                     <TouchableOpacity
//                       onPress={() => {
//                         setVideoInfo([]);

//                       }}
//                       style={styles.deleteButtonn}
//                     >
//                       <Image
//                         style={{
//                           width: 20,
//                           height: 20,
//                           borderRadius: 10,
//                           left: 78,
//                           alignItems: 'center',
//                           backgroundColor: 'white',
//                           top: -98,

//                         }}
//                         source={require('../../../assets/cutRed.png')}
//                       />
//                     </TouchableOpacity>
//                   )}
//                 </View>
//               )} */}


//                 <>
//                   {picker.length > 0 ?
//                     (picker.map((y, index) => {
//                       console.log('images yyyyyyy hhhhh--------->', y.path);
//                       return (
//                         <View>
//                           <View key={index} style={styles.uploadedImageBox}>
//                             <Image
//                               source={{
//                                 uri: y?.path ? y?.path : null,
//                               }}
//                               style={styles.imagePickerStyle}
//                             />

//                             <TouchableOpacity
//                               onPress={() => {
//                                 const updated = picker.filter(el => el.path !== y.path);
//                                 setPicker(updated);
//                                 console.log('Updated gallery', updated.length);
//                                 { updated.length == 0 ? setcurrentSelection('All') : null }
//                                 Toast.show({ text1: 'Image has been deleted' });
//                               }}
//                               style={{
//                                 position: 'absolute'
//                               }}
//                             >
//                               <Image
//                                 style={styles.deleteIcon}
//                                 source={require('../../../assets/cutRed.png')}
//                               />
//                             </TouchableOpacity>
//                           </View>

//                         </View>
//                       );
//                     })
//                     ) : (
//                       <View style={{ height: 70, width: 80, position: 'relative', marginRight: 29, marginTop: 22 }}>
//                         {videoInfo?.length > 0 && videoInfo[0]?.uri && (
//                           <Video
//                             source={{ uri: videoInfo[0]?.uri }}
//                             style={{ width: 90, height: 90 }}
//                             resizeMode="cover"
//                           />
//                         )}
//                         {videoInfo?.length > 0 && videoInfo[0]?.uri && (
//                           <TouchableOpacity
//                             onPress={() => {
//                               setVideoInfo([]);
//                               Toast.show({ text1: 'Video has been deleted' });
//                             }}
//                             style={styles.deleteButtonn}
//                           >
//                             <Image
//                               style={{
//                                 width: 20,
//                                 height: 20,
//                                 borderRadius: 10,
//                                 left: 78,
//                                 alignItems: 'center',
//                                 backgroundColor: 'white',
//                                 top: -98,
//                               }}
//                               source={require('../../../assets/cutRed.png')}
//                             />
//                           </TouchableOpacity>
//                         )}
//                       </View>
//                     )}







//                 </>

//               </View>
//             </ScrollView>
//           </View>
//           {picker.length > 0 ? <TouchableOpacity style={styles.uploadButtonView} onPress={() => { handleCrop() }}>
//             {/* <Image source={require('../../../assets/images/fashion-upload-screen-upload-button.png')} /> */}
//             <Text style={{ fontSize: 14, fontWeight: '500', color: '#263238', }}>Crop Images</Text>
//           </TouchableOpacity> : null}
//           {picker.length > 0 ? <TouchableOpacity style={styles.uploadButtonView} onPress={openSelectorModal}>
//             <Image source={require('../../../assets/images/fashion-upload-screen-upload-button.png')} />
//             <Text style={{ fontSize: 14, fontWeight: '500', color: '#263238', }}>Upload Photos or Video</Text>
//           </TouchableOpacity> : <TouchableOpacity style={styles.uploadButton} onPress={openSelectorModal}>
//             <Image source={require('../../../assets/images/fashion-upload-screen-upload-button.png')} />
//             <Text style={{ fontSize: 14, fontWeight: '500', color: '#263238', }}>Upload Photos or Video</Text>
//           </TouchableOpacity>}

//           <TouchableOpacity style={styles.saveButtonView} onPress={() => { Createpost() }}>
//             <Text style={{ fontSize: 15, fontWeight: '500', color: '#fff', }}>Save</Text>
//           </TouchableOpacity>

//           <View style={{ height: 10 }} />


//         </View>
//         <View style={{ height: 100 }} />
//       </ScrollView>
//       <Modal
//         isVisible={showReportModal}
//         swipeDirection="down"
//         onBackdropPress={() => setShowReportModal(false)}
//         onSwipeComplete={(e) => {
//           setShowReportModal(false)
//         }}
//         scrollTo={() => { }}
//         scrollOffset={1}
//         propagateSwipe={true}
//         coverScreen={false}
//         backdropColor='transparent'
//         style={{ justifyContent: 'flex-end', margin: 0, backgroundColor: 'rgba(0,0,0,0.5)' }}
//       >
//         <View style={{ height: '90%', backgroundColor: '#fff', borderTopLeftRadius: 30, borderTopRightRadius: 30 }}>
//           <Text style={{ fontSize: 18, fontWeight: '700', color: '#455A64', textAlign: 'center', marginBottom: 20, marginTop: 30 }}>Report</Text>
//           <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled={true}>

//             <FlatList
//               data={reportReasonData}
//               showsHorizontalScrollIndicator={false}
//               numColumns={1}
//               keyExtractor={item => item.id}
//               style={{ marginBottom: 10 }}
//               renderItem={({ item, index }) => {
//                 return (
//                   <TouchableOpacity key={item.id} onPress={() => setSelectedReasonId(item.id)} style={selectedReasonId === item.id ? styles.selectedReasonView : styles.reasonView}>
//                     <Image source={selectedReasonId === item.id ? require('../../../assets/images/fastion-selected-reason-icon.png') : require('../../../assets/images/fastion-reason-icon.png')} />
//                     <View style={{ marginLeft: 10 }}>
//                       <Text style={{ fontSize: 14, lineHeight: 14, fontWeight: '400', color: '#455A64' }}>{item.name}</Text>
//                       {item.description ?
//                         <Text style={{ fontSize: 12, lineHeight: 12, fontWeight: '400', color: '#C5C6C9', marginTop: 2 }}>{item.description}</Text>
//                         : null}
//                     </View>
//                   </TouchableOpacity>
//                 )
//               }}
//             />

//             <TouchableOpacity style={styles.reportButtonView}>
//               <Text style={{ fontSize: 15, fontWeight: '500', color: '#fff', }}>Report</Text>
//             </TouchableOpacity>

//           </ScrollView>

//         </View>
//       </Modal>

//       <Modal
//         isVisible={modlevisual5}
//         swipeDirection="down"
//         onSwipeComplete={(e) => {
//           setmodlevisual5(false)
//         }}
//         scrollTo={() => { }}
//         onBackdropPress={() => setmodlevisual5(false)}
//         scrollOffset={1}
//         propagateSwipe={true}
//         coverScreen={false}
//         backdropColor='transparent'
//         style={{ justifyContent: 'flex-end', margin: 0, backgroundColor: 'rgba(0,0,0,0.5)' }}
//       >
//         <View style={{ height: '80%', backgroundColor: '#fff', borderTopLeftRadius: 15, borderTopRightRadius: 15, padding: 20 }}>
//           <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled={true}>

//             <Text style={{ color: Mycolors.Black, fontWeight: '500', fontSize: 22, textAlign: 'center' }} >Pick from a wide range of categories</Text>

//             <View style={{ width: '100%', alignSelf: 'center', marginTop: 20 }}>
//               <FlatList
//                 data={categoryData}
//                 // horizontal={true}
//                 // showsHorizontalScrollIndicator={false}
//                 // numColumns={2}
//                 renderItem={({ item, index }) => {
//                   return (
//                     <TouchableOpacity
//                       style={[{
//                         width: '96%', marginHorizontal: 10, flexDirection: 'row', alignItems: 'center', borderRadius: 10, marginBottom: 20,
//                         padding: 7,
//                         overflow: 'hidden',
//                         // borderWidth:1, borderColor:'black'
//                         // shadowColor: '#E0E0E0',
//                         // shadowOffset: {
//                         //     width: 0,
//                         //     height: 3
//                         // },
//                         // shadowRadius: 5,
//                         // shadowOpacity: 0.6,
//                         // elevation: 3,
//                       }, selectedCategory?.name === item?.name ? styles.categorySelectedStyle : styles.categoryUnSelectedStyle]}
//                       onPress={() => {
//                         setSelectedCategory(item);

//                         // HomePage2(false, item)

//                         setmodlevisual5(false)
//                       }}
//                     >
//                       <Image source={{ uri: item.image }} style={{ width: '20%', height: 60, borderRadius: 7, }} resizeMode='contain' ></Image>
//                       <View style={{ justifyContent: 'center', alignItems: 'center', width: "60%" }}>
//                         <Text style={{
//                           fontSize: 16, color: (selectedCategory?.name === item?.name) ? '#ED1C24' : '#455A64', marginTop: 5, textAlign: 'center', fontWeight: 'bold'
//                         }}>{item?.name}</Text>
//                       </View>
//                     </TouchableOpacity>
//                     // <View style={{ width: 100, marginHorizontal: 5 }}>
//                     //   <TouchableOpacity style={{ width: 100, height: 80, backgroundColor: '#F8F8F8', alignSelf: 'center' }}
//                     //     onPress={() => { setSelectedCategory(item) }}>
//                     //     <Image source={{ uri: item.category_image }} style={{ width: "100%", height: "100%", alignSelf: 'center', borderRadius: 7 }}></Image>
//                     //   </TouchableOpacity>
//                     //   <View style={{}}>
//                     //     <Text style={{ fontSize: 11, color: (selectedCategory?.category_id === item?.category_id) ? '#835E23' : Mycolors.Black, marginTop: 5, textAlign: 'center', fontWeight: 'bold' }}>{item?.category_name}</Text>
//                     //   </View>
//                     // </View>
//                   )
//                 }}
//               // keyExtractor={item => item.id}
//               />
//             </View>


//             <View style={{ width: 100, height: 30 }} />
//           </ScrollView>

//         </View >
//       </Modal >
//       {/* selector modal */}
//       <Modal
//         isVisible={modlevisual}
//         swipeDirection="down"
//         onSwipeComplete={() => setmodlevisual(false)}
//         coverScreen={false}
//         onBackdropPress={() => setmodlevisual(false)}
//         scrollOffset={1}
//         propagateSwipe={true}

//         backdropColor='rgba(0,0,0,0.5)'
//         style={{ justifyContent: 'flex-end', margin: 0 }}
//       >
//         <View style={{ height: 150, backgroundColor: Mycolors.BG_COLOR, borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 20, margin: 0, bottom: 0 }}>
//           <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '100%', marginTop: 25 }}>
//             <TouchableOpacity style={{ height: 150 }} onPress={onGallery}>
//               <Image source={require('../../../assets/Art/GalleryCreation.png')} style={{ width: 40, height: 40, alignSelf: 'center', tintColor: '#FFC40C' }} />
//               <Text style={{ color: Mycolors.TEXT_COLOR }}>Open Library</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={{ height: 150 }} onPress={onCamera}>
//               <Image source={require('../../../assets/Art/cameraCreation.png')} style={{ width: 40, height: 35, alignSelf: 'center', tintColor: '#FFC40C' }} />
//               <Text style={{ color: Mycolors.TEXT_COLOR, marginTop: 5, }}>Open Camera</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//       <Modal
//         isVisible={selectorModal}
//         swipeDirection="down"
//         onSwipeComplete={() => setSelectorModal(false)}
//         coverScreen={false}
//         onBackdropPress={() => setSelectorModal(false)}
//         scrollOffset={1}
//         propagateSwipe={true}

//         backdropColor='rgba(0,0,0,0.5)'
//         style={{ justifyContent: 'flex-end', margin: 0 }}
//       >
//         <View style={{ height: 150, backgroundColor: Mycolors.BG_COLOR, borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 20, margin: 0, bottom: 0 }}>
//           <View style={styles.mainView}>
//             <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', }}>
//               <TouchableOpacity style={{ width: 150, height: 150, }} onPress={openImageModal}>
//                 <Image source={require('../../../assets/Art/cameraCreation.png')} style={{ width: 40, height: 40, alignSelf: 'center', tintColor: '#FFC40C' }} />
//                 <Text style={{ textAlign: 'center', color: Mycolors.TEXT_COLOR }}>Select Photos</Text>
//               </TouchableOpacity>
//               <TouchableOpacity style={{ width: 150, height: 150 }} onPress={openVideoModal} >
//                 <Image source={require('../../../assets/Art/VideoCamera.png')} style={{ width: 40, height: 35, alignSelf: 'center', tintColor: '#FFC40C' }} />
//                 <Text style={{ textAlign: 'center', color: Mycolors.TEXT_COLOR }}>Select Videos</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </Modal>
//       {loading ? <Loader /> : null}
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
//   uploadedImageBox: {
//     height: 70,
//     width: 80,
//     position: 'relative',
//     marginRight: 29,

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
//     marginTop: 20
//   },
//   buttonView: {
//     flexDirection: 'row',
//     alignItems: 'center'
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
//   uploadButtonView: {
//     marginTop: 20,
//     height: 60,
//     width: '100%',
//     alignSelf: 'center',
//     backgroundColor: 'rgba(255, 255, 255, 0.13)',
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderWidth: 1,
//     borderColor: '#263238',
//     borderStyle: 'dashed',
//     borderRadius: 5,
//     marginBottom: 30,
//     backgroundColor: '#fff',
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 3
//     },


//     shadowRadius: 5,
//     shadowOpacity: 0.10,
//     elevation: 5,
//   },
//   uploadButton: {
//     marginTop: 10,

//     height: 60,
//     width: '100%',
//     alignSelf: 'center',
//     backgroundColor: 'rgba(255, 255, 255, 0.13)',
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderWidth: 1,
//     borderColor: '#263238',
//     borderStyle: 'dashed',
//     borderRadius: 5,
//     marginBottom: 30,
//     backgroundColor: '#fff',
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 3
//     },


//     shadowRadius: 5,
//     shadowOpacity: 0.10,
//     elevation: 5,
//   },
//   headingTitleStyle: {
//     paddingLeft: 15,
//     width: '100%',
//     fontSize: 13,
//     borderColor: '#dbdbd9',
//     borderWidth: 1,
//     backgroundColor: '#fff',
//     color: '#fff',
//     marginTop: 20,
//     height: 60,
//     borderRadius: 5,
//     paddingHorizontal: 15,
//     paddingVertical: 10,
//     color: Mycolors.Black,
//     shadowColor: '#DFDDDD',
//     shadowOffset: { width: 3, height: 3 },
//     shadowRadius: 5,
//     shadowOpacity: 0.05,
//     elevation: 1
//   },
//   deleteButton: {
//     position: 'absolute',
//     top: 5,
//     right: 5,

//   },
//   newsArticleStyle: {
//     paddingLeft: 15,
//     width: '100%',
//     fontSize: 13,
//     borderColor: '#dbdbd9',
//     borderWidth: 1,
//     backgroundColor: '#fff',
//     color: '#fff',
//     marginTop: 20,
//     height: 168,
//     borderRadius: 5,
//     paddingHorizontal: 15,
//     paddingVertical: 10,
//     color: Mycolors.Black,
//     shadowColor: '#DFDDDD',
//     shadowOffset: { width: 3, height: 3 },
//     shadowRadius: 5,
//     shadowOpacity: 0.05,
//     elevation: 1
//   },
//   saveButtonView: {
//     marginTop: 55,
//     height: 60,
//     width: '100%',
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
//   imagePickerStyle: {
//     height: '100%',
//     width: '100%',
//     borderWidth: 2,
//     borderRadius: 10,
//     marginTop: 10,

//   },
//   deleteIcon: {
//     // backgroundColor: 'red',
//     width: 20,
//     height: 20,
//     borderRadius: 10,
//     left: 70,
//     alignItems: 'center',
//     backgroundColor: 'white',
//     top: 1
//   },
//   categorySelectedStyle: {
//     borderWidth: 2,
//     borderColor: '#FFC40C',
//     borderRadius: 10
//   },
//   deleteButtonn: {
//     width: 20,
//     height: 20,
//     borderRadius: 10,
//     right: -12,
//     alignItems: 'center',
//     backgroundColor: 'white',
//     top: 1,

//   },
//   myImage: {
//     flexDirection: "row",
//     marginTop: 0,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   myImagePicker: { flexDirection: 'row', paddingVertical: '6%', height: 100, marginTop: 10 },
//   mainView: { justifyContent: 'center', alignItems: 'center', height: 200, width: '100%', alignItems: 'center' },
//   categoryUnSelectedStyle: {
//     borderWidth: 2,
//     borderColor: '#B2B7B9',
//     borderRadius: 10
//   },
//   input: {

//     // borderColor: '#dbdbd9',
//     // borderWidth: 1,
//     // backgroundColor: '#fff',
//     // color: '#fff',


//     // paddingHorizontal: 15,
//     // paddingVertical: 10,
//     // color: Mycolors.Black,
//     marginTop: 20


//   }
// });
// export default InventionUpload


import React, { useEffect, useState, useRef } from 'react';
import { View, Image, Text, StyleSheet, SafeAreaView, FlatList, Alert, TouchableOpacity, ScrollView, ImageBackground, } from 'react-native';
import HomeHeaderRoundBottom from './components/HomeHeaderRoundBottom';
import SearchInput2 from '../../../component/SearchInput2';
import SearchInputEnt from '../../../component/SearchInputEnt';
import FashionSearch from './components/FashionSearch';
import SerchInput from '../../../component/SerchInput';
import { dimensions, Mycolors } from '../../../utility/Mycolors';
import { TextInput } from "react-native-paper";
import { WebView } from 'react-native-webview';
import { ImageSlider, ImageCarousel } from "react-native-image-slider-banner";
// import DynamicTextInput from './components/DynamicTextInput';
import ImagePicker from 'react-native-image-crop-picker';
import { baseUrl, shop_eat_cart, user_payment_method, shop_eat_orders, shop_eat_cart_book_dining, shop_eat_cart_book_table, shop_eat_cart_id, shop_eat_business_id, shop_eat_menu_userid, requestPostApi, requestGetApi, shop_eat, connect_people_create_post, connect_people_newPost, art_getCollection, requestPostApiMedia, art_PostCollection, postApiWithToken2, creation_categories } from '../../../WebApi/Service'
import DocumentPicker from 'react-native-document-picker';
import { Thumbnail } from 'react-native-thumbnail-video';
import MyButtons from '../../../component/MyButtons';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import Modal from 'react-native-modal';
import Toast from 'react-native-toast-message'
import LinearGradient from 'react-native-linear-gradient'
import AppIntroSlider from 'react-native-app-intro-slider';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import Video from 'react-native-video';
// import { Thumbnail } from 'react-native-thumbnail-video';

import { androidCameraPermission } from '../../Connect/People/Permissions';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../../../WebApi/Loader';
import VideoPlayer from 'react-native-video-player'
import { createThumbnail } from "react-native-create-thumbnail";
import ViewMoreText from 'react-native-view-more-text';
import axios from 'axios';
const StartupUpload = (props) => {
  const dispatch = useDispatch();
  const User = useSelector(state => state.user.user_details)
  console.log('User', User.token);
  const [searchValue, setsearchValue] = useState('')
  const [scrollEnabled, setScrollEnabled] = useState(false)
  const myTextInput = useRef()
  const [multiSliderValue, setMultiSliderValue] = useState([0, 100])

  const [showChooseMilesModal, setShowChooseMilesModal] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState({ isVisible: false, data: null });
  const [picker, setPicker] = useState([])
  const [showVideoModal, setShowVideoModal] = useState(false)
  const [selectedVideo, setSelectedVideo] = useState({})
  const [showReportModal, setShowReportModal] = useState(false)
  const [selectedReasonId, setSelectedReasonId] = useState(null)
  const [modlevisual5, setmodlevisual5] = useState(false)
  const [headingTitle, setHeadingTitle] = useState('')
  const [price, setPrice] = useState('')
  console.log('price for ammounr', price);
  const [newsArticle, setNewsArticle] = useState('')
  const [showFundraiserInput, setShowFundraiserInput] = useState(false);
  const [fundraiserValue, setFundraiserValue] = useState('');
  const [selectedButton, setSelectedButton] = useState('Informational')
  const handleFundraiserClick = () => {
    setShowFundraiserInput(true); setSelectedButton('Fundraiser')
  };

  const handleFundraiserInputChange = text => {
    setFundraiserValue(text);
    setSelectedButton('Information')
  };
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
  const [videoInfo, setVideoInfo] = useState([]);
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
  const types = [
    {
      id: '1',
      name: 'Information'
    },
    {
      id: '2',
      name: 'Fundraiser'
    }
  ]
  const [currentSelection, setcurrentSelection] = useState('All')
  const [modlevisual, setmodlevisual] = useState(false);
  const [categoryData, setCategorydata] = useState('')
  const [selectorModal, setSelectorModal] = useState('')
  const [updatedLength, setUpdatedLength] = useState(1)
  const [isTyping, setIsTyping] = useState(false);

  const [symbol, setSymbol] = useState("\u0024")
  console.log(updatedLength, 'updatedLength');
  const [inputs, setInputs] = useState([{ id: 1, value: '' }]);
  const handleInformationalClick = () => {
    setShowFundraiserInput(false);
    setSelectedButton('Informational');
  };

  const addInput = () => {
    const newId = inputs.length + 1;
    console.log('my new id fff', newId);
    setInputs([...inputs, { id: newId, value: '' }]);
  };

  const handleInputChange = (id, text) => {
    const updatedInputs = inputs.map(input =>
      input.id === id ? { ...input, value: text } : input
    );
    setInputs(updatedInputs);
  };
  const handleTextInputChange = (text) => {
    setIsTyping(true);
    setPrice(text.replace(/[^0-9]/g, ''));
  };
  const multiSliderValuesChange = (values) => { setMultiSliderValue(values) }
  useEffect(() => {
    thumbnail()
    console.log('jj my inputs', inputs)
  }, [])

  useEffect(() => {
    ArtCategory()
    thumbnail()
  }, [])
  const openVideoModal = () => {

    if (picker.length == 0) {
      setSelectorModal(false)

      console.log(picker.length, 'picker length');
      setcurrentSelection('video')
      handleVideoUpload()

      // pickvideo()
    } else {
      Toast.show({ text1: 'Delete image to upload  video ' });
    }
  }
  const openImageModal = (index) => {
    console.log('video info', videoInfo);
    if (videoInfo.length == 0) {
      setSelectorModal(false)
      setmodlevisual(true)

    }
    else {
      Toast.show({ text1: 'Delete Video to select image ' });
    }

  }
  const ArtCategory = async () => {
    setLoading(true)
    var fUrl = creation_categories
    var urls = '?module_id=' + '57'
    console.log('my url---------->', urls)
    if (urls != undefined) {
      fUrl = fUrl + urls
    }
    // console.log("LIKE CLICK:::",isSaved);
    const { responseJson, err } = await requestGetApi(fUrl, '', 'GET', User.token)
    setLoading(false)
    console.log('the res Home==>>', responseJson)
    if (responseJson.headers.success == 1) {
      console.log('the res after sucess', responseJson.body.data)
      setCategorydata(responseJson.body.data)
      // Toast.show({ text1: responseJson.headers.message });
    } else {

      setalert_sms(err)
      setMy_Alert(true)
    }
  }
  const openSelectorModal = (index) => {
    console.log('my image')
    setSelectorModal(true)
  }
  const onGallery = async () => {
    console.log('picker');
    try {
      let images = await ImagePicker.openPicker({
        width: 1080,
        height: 1080,
        cropping: true,
        mediaType: 'photo',
        compressImageQuality: 1,
        compressImageMaxHeight: 1080 / 2,
        compressImageMaxWidth: 1080 / 2,
        multiple: true
      });
      const totalSelectedImages = picker.length + images.length;
      if (totalSelectedImages > 5) {
        Toast.show({ text1: 'You can select up to 5 images' });
        setmodlevisual(false);
      } else {
        console.log('---------then block------->', images);
        setPicker([...picker, ...images]);
        setcurrentSelection('image');
        setmodlevisual(false);
      }
    } catch (error) {
      console.log('error in openLibrary', error);
    }
  };

  const onCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image, 'camera image')
      setPicker([...picker, image]);
      // setPicker(image);
      setUpdatedLength(1)
      setcurrentSelection('camera_image')
      setmodlevisual(false)

    });
  }
  const handleAmountChange = (text) => {
    // Remove any non-numeric characters and set the value with the "$" symbol
    setPrice('$' + text.replace(/[^0-9]/g, ''));
    // onChangeText = {(e) => setHeadingTitle(e)}


  };
  const handleVideoUpload = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.video],
      });

      // The selected video can be accessed using 'res.uri'
      console.log('Selected Video URI:', res[0].uri);
      //setVideoUri(res[0].uri);
      setmodlevisual(false)
      setVideoInfo(res);
      setSelectorModal(false)

      //setIsVideoSelected(true);

      // Add your upload logic here
      // You can use a network library (e.g., axios) to send the video to the server
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User canceled the picker
        console.log('User canceled video picker');
      } else {
        // Error occurred while picking the video
        console.log('Error picking video:', err);
      }
    }
  };

  const Createpost = async () => {
    console.log(picker, picker.length, 'picker check camera');
    if (selectedCategory === null) {
      Toast.show({ text1: 'Please select category' });
    }
    else if (headingTitle?.trim()?.length === 0 || headingTitle?.trim()?.length < 25) {
      Toast.show({ text1: 'Please enter title upto 25 characters' });
    }
    else if (newsArticle?.trim()?.length === 0 || newsArticle?.trim()?.length < 150) {

      Toast.show({ text1: 'Please enter description upto 150 characters' });
    }
    else if (picker.length == 0 && videoInfo.length == 0) {
      console.log('kkkkkrrrr', picker.length);
      Toast.show({ text1: 'Please upload photo or video' });
    }
    else if (picker == 'undefined' && videoInfo.length == 0) {
      console.log('cl of phtoto by camera', picker == 0 || videoInfo.length == 0);
      Toast.show({ text1: 'Please upload photo or video ' });
    }
    else {
      try {
        console.log('hhhhh to');
        setLoading(true)
        const data = new FormData();
        data.append(`headline`, headingTitle)
        data.append(`description`, newsArticle)
        data.append(`status`, 1)
        data.append(`category_id`, selectedCategory.id)
        data.append(`module_id`, 57)
        data.append(`type`, selectedButton)
        data.append(`project_estimate`, price)
        console.log('data', data);
        if (currentSelection == 'video') {
          data.append(`files`, {
            name: videoInfo[0].name,
            type: videoInfo[0].type,
            uri: videoInfo[0].uri,
          });
        } else {
          if (picker.length > 0) {
            console.log('picker gallery');
            picker.map((item, index) => {
              const imageName = item.path.slice(
                item.path.lastIndexOf('/'),
                item.path.length,
              );
              data.append(`files`, {
                name: imageName,
                type: item.mime,
                uri: item.path,
              });
            });
          }
          else if (picker.length == undefined) {
            console.log('picker undefined');
            const imageName = picker.path.slice(
              picker.path.lastIndexOf('/'),
              picker.path.length,
            );
            data.append(`files`, {
              name: imageName,
              type: picker.mime,
              uri: picker.path,
            });
          }
        }

        console.log(data, 'data');
        const { response, status } = await axios

          .post(
            'http://54.153.75.225/backend/api/v1/creation/invention/create-article',
            data,

            {
              headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${User.token}`,
              },
            },
          )
          .then(res => {

            return {
              response: res.data,
              status: true,
            };

          }
          )

          .catch(err => {
            return {
              response: err,
              status: false,
            };
          });
        console.log(response, status, 'myyyyy response');

        if (status === true) {

          props.navigation.navigate('StartupHome')
          Toast.show({ text1: response.headers.message });
        } else {
          console.log(response.headers.message);

        }
        setLoading('false')
      } catch (error) {
        console.error('error in TestingUploading', response.headers.messagerror);
      }
    }
  };
  const handleCrop = async () => {
    // Handle cropping for each selected image individually
    const croppedImages = [];
    for (const image of picker) {
      try {
        const croppedImage = await ImagePicker.openCropper({
          path: image.path,
          width: 300,
          height: 400,
          cropperCircleOverlay: false,
          cropperToolbarTitle: "Crop Image",
        });
        croppedImages.push(croppedImage);
      } catch (error) {
        console.log(error);
      }
    }
    setPicker(croppedImages);
    console.log(croppedImages);
    // Here, you can handle the cropped images as needed (e.g., display, upload, etc.).
  };
  const thumbnail = async () => {
    console.log('function caleed for thumbnail');
    createThumbnail({
      url: 'https://www.youtube.com/embed/XmGO4O2vpJw',
      timeStamp: 10000,
    })
      .then(response => console.log(response, 'my thumbnail generated'))
      .catch(err => console.log({ err }));

  }
  return (
    <SafeAreaView scrollEnabled={scrollEnabled} style={{ height: '100%', backgroundColor: '#F8F8F8' }}>
      <ScrollView>
        <HomeHeaderRoundBottom height={100} paddingHorizontal={15} borderBottomLeftRadius={20} borderBottomRightRadius={20} backgroundColor='#FFC40C'
          press1={() => { props.navigation.goBack() }} img1={require('../../../assets/images/service-header-back-button.png')} img1width={25} img1height={18}
          press2={() => { }} title2={'Upload'} fontWeight={'500'} img2height={20} color={'#fff'}
          press3={() => { props.navigation.navigate('StartupNotifications') }} img3={require('../../../assets/images/fashion-bell-icon.png')} img3width={25} img3height={22} />

        <View style={{ width: '85%', alignSelf: 'center', marginTop: 30 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ fontSize: 16, fontWeight: '500', color: '#263238', marginBottom: 5 }}>Choose Category</Text>
            <TouchableOpacity onPress={() => { setmodlevisual5(true) }}>
              <Text style={{ fontSize: 16, fontWeight: '500', color: '#FFC40C', marginBottom: 5 }}>View All</Text>
            </TouchableOpacity>
          </View>

          <View style={{ width: dimensions.SCREEN_WIDTH * 0.9, alignSelf: 'flex-start', marginTop: 0, marginBottom: 10, marginTop: 10 }}>
            <FlatList
              data={categoryData}
              showsHorizontalScrollIndicator={true}
              horizontal
              renderItem={({ item, index }) => {
                return (

                  <TouchableOpacity style={[{ width: dimensions.SCREEN_WIDTH / 3, height: 140, marginRight: 15, borderRadius: 10, overflow: 'hidden', position: 'relative', alignItems: 'center', borderRadius: 15, paddingHorizontal: 10, }, selectedCategory?.name
                    === item?.name
                    ? styles.categorySelectedStyle : null]}
                    onPress={() => { setSelectedCategory(item) }}>
                    <Image source={{ uri: item.image }} style={{ width: dimensions.SCREEN_WIDTH / 2.8, height: 160 }} resizeMode='stretch'></Image>
                    <LinearGradient
                      colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.43)']}
                      style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, zIndex: 1, }}
                    >

                      <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center', }}>
                        <Text style={{
                          fontSize: 14, fontWeight: '500', color: (selectedCategory?.name
                            === item?.name) ? 'white' : 'white', bottom: 20
                        }}>{item.name}</Text>
                      </View>
                      {/* } */}
                    </LinearGradient>
                  </TouchableOpacity>
                )
              }}
              keyExtractor={item => item.id}
            />
          </View>
          {/* <View
            style={{
              width: '97%',
              paddingLeft: 0,
              fontSize: 13,
              height: 'auto',
              fontWeight: '400',
              color: '#000000',
              marginVertical: 22,
              flexDirection: 'column',  // Change flexDirection to 'column'
              alignItems: 'center',
            }}
          >
            <View
              style={{
                backgroundColor: 'white',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',   // Make the yellow view take the full width
                height: 50,
                borderWidth: 1,
                borderColor: '#FFC40C',
                borderRadius: 4,
                marginHorizontal: 12
              }}
            >

              <TouchableOpacity style={{ alignItems: 'center', width: '50%' }} onPress={handleFundraiserClick}>
                <Text style={{ textAlign: 'center' }}>Informational</Text>
              </TouchableOpacity>
              <View style={{ height: 32, width: 1, backgroundColor: '#000000' }}>

              </View>
              <TouchableOpacity style={{ marginHorizontal: 12, alignItems: 'center', width: '50%' }} onPress={() => setShowFundraiserInput(false)}>
                <Text>Fundraiser</Text>
              </TouchableOpacity>
            </View>

            {showFundraiserInput ? (
              <TextInput
                mode="outlined"
                label="Startup title"
                maxLength={50}
                underlineColor="red"
                underlineColorAndroid="transparent"
                keyboardType="number-pad"
                value={headingTitle}
                textColor="#000000"
                onChangeText={(e) => setHeadingTitle(e)}
                outlineStyle={{ borderColor: '#dbdbd9' }}
                style={{
                  width: '97%',
                  paddingLeft: 0,
                  fontSize: 13,
                  height: 50,
                  fontWeight: '400',
                  color: '#000000',
                }}
              />
            ) : <Text style={{ fontSize: 14, color: 'gray', marginVertical: 12, textAlign: 'center', }}>Create interactive posts to increase your reach among community.</Text>}
          </View> */}
          <View
            style={{
              width: '97%',
              paddingLeft: 0,
              fontSize: 13,
              height: 'auto',
              fontWeight: '400',
              color: '#000000',
              marginVertical: 22,
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <View
              style={{
                backgroundColor: 'white',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                height: 50,
                borderWidth: 1,
                borderColor: '#FFC40C',
                borderRadius: 4,
                marginHorizontal: 12,
              }}
            >
              <TouchableOpacity
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '50%',
                  height: 47,
                  backgroundColor: selectedButton === 'Informational' ? '#FFC40C' : 'white',
                }}
                onPress={handleInformationalClick}
              >
                <Text style={{ textAlign: 'center', color: selectedButton === 'Informational' ? 'white' : '#000000' }}>Informational</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',

                  height: 47,
                  width: '50%',
                  backgroundColor: selectedButton === 'Fundraiser' ? '#FFC40C' : 'white',
                }}
                onPress={handleFundraiserClick}
              >
                <Text style={{ color: selectedButton === 'Fundraiser' ? 'white' : '#000000' }}>Fundraiser</Text>
              </TouchableOpacity>
            </View>

            {selectedButton === 'Fundraiser' ? ( // Use selectedButton state to conditionally render the input field
              <>
                <Text style={{ fontSize: 14, color: 'gray', marginVertical: 12, textAlign: 'center' }}>
                  Launch your campaign and raise funds from our backers
                </Text>

              </>
            ) : (
              <Text style={{ fontSize: 14, color: 'gray', marginVertical: 12, textAlign: 'center' }}>
                Create interactive posts to increase your reach among the community.
              </Text>
            )}
          </View>
          <TextInput
            mode="outlined"
            label="Invention title"
            maxLength={50}
            underlineColor="red"
            underlineColorAndroid="transparent"
            keyboardType="default"
            value={headingTitle}

            theme={{ colors: { primary: "#FFC40C" } }}
            textColor="#000000"
            onChangeText={(e) => setHeadingTitle(e)}
            outlineStyle={{ borderColor: '#dbdbd9' }}
            style={[
              styles.input,
              {
                width: "97%",
                paddingLeft: 0,
                fontSize: 13,

                fontWeight: "400",
                color: "#000000",

              },
            ]}
          />


          {/* <View style={{
            height: '30%',
            overflow: "hidden",
            width: dimensions.SCREEN_WIDTH * 0.9,
            borderRadius: 20,
            justifyContent: 'center',
            alignSelf: "auto", marginTop: 30

          }}>
            <WebView
              source={{ uri: 'https://www.youtube.com/embed/XmGO4O2vpJw' }}
            />


          </View> */}
          {/* <View>
            {inputs.map(input => (



              <TextInput
                outlineStyle={{ borderColor: '#dbdbd9', }}
                theme={{ colors: { primary: "#FFC40C" } }}
                underlineColor="red"
                textColor="#000000"
                underlineColorAndroid="transparent"
                keyboardType="default"
                mode="outlined"
                key={input.id}
                placeholder="Enter Url"
                value={input.value}
                onChangeText={text => handleInputChange(input.id, text)}
                style={[
                  styles.input,
                  {
                    width: "97%",
                    paddingLeft: 0,
                    fontSize: 13,
                    height: 60,
                    fontWeight: "400",
                    color: "#000000",
                  },
                ]}
              />
            ))}
            <TouchableOpacity
              onPress={addInput}
              style={{
                height: 30,
                width: 30,
                backgroundColor: 'yellow',
                borderRadius: 20,
              }}
            >
              <Text
                style={{
                  alignSelf: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  marginTop: 3,
                }}
              >
                +
              </Text>
            </TouchableOpacity>
          </View> */}
          {/* <TextInput
            value={newsArticle}
            onChangeText={(e) => setNewsArticle(e)}
            placeholder={'Describe something about Startup ...'}
            placeholderTextColor="#8F93A0"
            multiline={true}
            textAlignVertical='top'
            // maxLength={500}
            // keyboardType="number-pad"
            autoCapitalize='none'
            style={styles.newsArticleStyle}
          /> */}

          <TextInput
            mode="outlined"
            label="Describe something about Invention ..."
            multiline   // Set multiline prop to true
            numberOfLines={4} // Adjust the initial number of visible lines
            maxLength={500}
            outlineColor="red"
            outlineStyle={{ borderColor: '#dbdbd9' }}
            underlineColorAndroid="transparent"
            keyboardType="default" // You might want to use "default" keyboardType for multiline input
            value={newsArticle}
            onChangeText={(e) => setNewsArticle(e)}
            textColor="#000000"
            theme={{ colors: { primary: "#FFC40C" } }}
            style={[
              styles.input,
              {
                width: "97%",
                paddingLeft: 0,
                fontSize: 13,
                // Adjust the height for multiline input
                fontWeight: "400",
                color: "#000000",
              },
            ]}
          />
          {/* {selectedButton === 'Fundraiser' ? ( // Use selectedButton state to conditionally render the input field */}
          <>

            {selectedButton == 'Fundraiser' ? (
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
                <TextInput
                  mode="outlined"
                  label="Enter Amount to be raised"
                  underlineColor="red"
                  underlineColorAndroid="transparent"
                  keyboardType="number-pad"
                  value={price.toString()}
                  textColor="#000000"
                  theme={{ colors: { primary: '#FFC40C' } }}
                  onChangeText={handleTextInputChange}
                  outlineStyle={{ borderColor: '#dbdbd9' }}
                  style={{
                    flex: 1,
                    fontSize: 13,
                    color: '#000000',
                    paddingLeft: isTyping ? 30 : 0, // Adjust the padding based on whether typing has started
                  }}
                />
                {isTyping && (
                  <Text
                    style={{
                      position: 'absolute',
                      left: 30, // Adjust the left position as needed
                      top: 23, // Adjust the top position as needed
                      fontSize: 13,
                      color: '#000000',
                    }}
                  >
                    $
                  </Text>
                )}
              </View>
            ) : null}
          </>
          {/* ) : (
            null
          )} */}
          <View
            style={{
              justifyContent: "flex-start",
              alignItems: "flex-start",
              width: "100%",
              height: 110,
            }}
          >
            <ScrollView horizontal>
              <View style={picker.length || videoInfo?.length > 0 ? styles.myImage : styles.myImagePicker}>
                {/* {console.log(picker.length, 'picker.length')}
              {picker.length > 0 ? (
                picker.map((y, index) => {
                  console.log('images yyyyyyy--------->', y);
                  return (
                    <View key={index} style={styles.uploadedImageBox}>
                      <Image
                        source={{
                          uri: y?.path ? y?.path : null,
                        }}
                        style={styles.imagePickerStyle}
                      />
                      <TouchableOpacity
                        onPress={() => {
                          const updated = picker.filter(el => el.path !== y.path);
                          setPicker(updated);
                          console.log('Updated', updated.length);
                          { updated.length == 0 ? setcurrentSelection('All') : null }

                        }}
                        style={{
                          position: 'absolute',


                        }}
                      >
                        <Image
                          style={styles.deleteIcon}
                          source={require('../../../assets/cutRed.png')}
                        />
                      </TouchableOpacity>
                    </View>
                  );
                })
              ) : (
                <View style={{ height: 70, width: 80, position: 'relative', marginRight: 29, marginTop: 22 }}>
                  {videoInfo?.length > 0 && videoInfo[0]?.uri && (
                    <Video
                      source={{ uri: videoInfo[0]?.uri }}
                      style={{ width: 90, height: 90 }}

                      resizeMode="cover"
                    />
                  )}
                  {videoInfo?.length > 0 && videoInfo[0]?.uri && (
                    <TouchableOpacity
                      onPress={() => {
                        setVideoInfo([]);

                      }}
                      style={styles.deleteButtonn}
                    >
                      <Image
                        style={{
                          width: 20,
                          height: 20,
                          borderRadius: 10,
                          left: 78,
                          alignItems: 'center',
                          backgroundColor: 'white',
                          top: -98,

                        }}
                        source={require('../../../assets/cutRed.png')}
                      />
                    </TouchableOpacity>
                  )}
                </View>
              )} */}


                <>
                  {picker.length > 0 ?
                    (picker.slice(0, 5).map((y, index) => {
                      console.log('images yyyyyyy hhhhh--------->', y.path);
                      return (
                        <View>
                          <View key={index} style={styles.uploadedImageBox}>
                            <Image
                              source={{
                                uri: y?.path ? y?.path : null,
                              }}
                              style={styles.imagePickerStyle}
                            />

                            <TouchableOpacity
                              onPress={() => {
                                const updated = picker.filter(el => el.path !== y.path);
                                setPicker(updated);
                                console.log('Updated gallery', updated.length);
                                { updated.length == 0 ? setcurrentSelection('All') : null }
                                Toast.show({ text1: 'Image has been deleted' });
                              }}
                              style={{
                                position: 'absolute'
                              }}
                            >
                              <Image
                                style={styles.deleteIcon}
                                source={require('../../../assets/cutRed.png')}
                              />
                            </TouchableOpacity>
                          </View>

                        </View>
                      );
                    })
                    ) : (
                      <View style={{ height: 70, width: 80, position: 'relative', marginRight: 29, marginTop: 22 }}>
                        {videoInfo?.length > 0 && videoInfo[0]?.uri && (
                          <Video
                            source={{ uri: videoInfo[0]?.uri }}
                            style={{ width: 90, height: 90 }}
                            resizeMode="cover"
                          />
                        )}
                        {videoInfo?.length > 0 && videoInfo[0]?.uri && (
                          <TouchableOpacity
                            onPress={() => {
                              setVideoInfo([]);
                              Toast.show({ text1: 'Video has been deleted' });
                            }}
                            style={styles.deleteButtonn}
                          >
                            <Image
                              style={{
                                width: 20,
                                height: 20,
                                borderRadius: 10,
                                left: 78,
                                alignItems: 'center',
                                backgroundColor: 'white',
                                top: -98,
                              }}
                              source={require('../../../assets/cutRed.png')}
                            />
                          </TouchableOpacity>
                        )}
                      </View>
                    )}







                </>

              </View>
            </ScrollView>
          </View>
          {picker.length > 0 ? <TouchableOpacity style={styles.uploadButtonView} onPress={() => { handleCrop() }}>
            {/* <Image source={require('../../../assets/images/fashion-upload-screen-upload-button.png')} /> */}
            <Text style={{ fontSize: 14, fontWeight: '500', color: '#263238', }}>Crop Images</Text>
          </TouchableOpacity> : null}

          {picker.length > 0 ? <TouchableOpacity style={styles.uploadButtonView} onPress={openSelectorModal}>
            <Image source={require('../../../assets/images/fashion-upload-screen-upload-button.png')} />
            <Text style={{ fontSize: 14, fontWeight: '500', color: '#263238', }}>Upload Photos or Video</Text>
          </TouchableOpacity> :

            picker.length === 5 ? null

              :

              <TouchableOpacity style={styles.uploadButton} onPress={openSelectorModal}>
                <Image source={require('../../../assets/images/fashion-upload-screen-upload-button.png')} />
                <Text style={{ fontSize: 14, fontWeight: '500', color: '#263238', }}>Upload Photos or Video</Text>
              </TouchableOpacity>


          }

          <TouchableOpacity style={styles.saveButtonView} onPress={() => { Createpost() }}>
            <Text style={{ fontSize: 15, fontWeight: '500', color: '#fff', }}>Save</Text>
          </TouchableOpacity>

          <View style={{ height: 10 }} />


        </View>
        <View style={{ height: 100 }} />
      </ScrollView>
      <Modal
        isVisible={showReportModal}
        swipeDirection="down"
        onBackdropPress={() => setShowReportModal(false)}
        onSwipeComplete={(e) => {
          setShowReportModal(false)
        }}
        scrollTo={() => { }}
        scrollOffset={1}
        propagateSwipe={true}
        coverScreen={false}
        backdropColor='transparent'
        style={{ justifyContent: 'flex-end', margin: 0, backgroundColor: 'rgba(0,0,0,0.5)' }}
      >
        <View style={{ height: '90%', backgroundColor: '#fff', borderTopLeftRadius: 30, borderTopRightRadius: 30 }}>
          <Text style={{ fontSize: 18, fontWeight: '700', color: '#455A64', textAlign: 'center', marginBottom: 20, marginTop: 30 }}>Report</Text>
          <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled={true}>

            <FlatList
              data={reportReasonData}
              showsHorizontalScrollIndicator={false}
              numColumns={1}
              keyExtractor={item => item.id}
              style={{ marginBottom: 10 }}
              renderItem={({ item, index }) => {
                return (
                  <TouchableOpacity key={item.id} onPress={() => setSelectedReasonId(item.id)} style={selectedReasonId === item.id ? styles.selectedReasonView : styles.reasonView}>
                    <Image source={selectedReasonId === item.id ? require('../../../assets/images/fastion-selected-reason-icon.png') : require('../../../assets/images/fastion-reason-icon.png')} />
                    <View style={{ marginLeft: 10 }}>
                      <Text style={{ fontSize: 14, lineHeight: 14, fontWeight: '400', color: '#455A64' }}>{item.name}</Text>
                      {item.description ?
                        <Text style={{ fontSize: 12, lineHeight: 12, fontWeight: '400', color: '#C5C6C9', marginTop: 2 }}>{item.description}</Text>
                        : null}
                    </View>
                  </TouchableOpacity>
                )
              }}
            />

            <TouchableOpacity style={styles.reportButtonView}>
              <Text style={{ fontSize: 15, fontWeight: '500', color: '#fff', }}>Report</Text>
            </TouchableOpacity>

          </ScrollView>

        </View>
      </Modal>

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

                        // HomePage2(false, item)

                        setmodlevisual5(false)
                      }}
                    >
                      <Image source={{ uri: item.image }} style={{ width: '20%', height: 60, borderRadius: 7, }} resizeMode='contain' ></Image>
                      <View style={{ justifyContent: 'center', alignItems: 'center', width: "60%" }}>
                        <Text style={{
                          fontSize: 16, color: (selectedCategory?.name === item?.name) ? '#ED1C24' : '#455A64', marginTop: 5, textAlign: 'center', fontWeight: 'bold'
                        }}>{item?.name}</Text>
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
      {/* selector modal */}
      <Modal
        isVisible={modlevisual}
        swipeDirection="down"
        onSwipeComplete={() => setmodlevisual(false)}
        coverScreen={false}
        onBackdropPress={() => setmodlevisual(false)}
        scrollOffset={1}
        propagateSwipe={true}

        backdropColor='rgba(0,0,0,0.5)'
        style={{ justifyContent: 'flex-end', margin: 0 }}
      >
        <View style={{ height: 150, backgroundColor: Mycolors.BG_COLOR, borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 20, margin: 0, bottom: 0 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '100%', marginTop: 25 }}>
            <TouchableOpacity style={{ height: 150 }} onPress={onGallery}>
              <Image source={require('../../../assets/Art/GalleryCreation.png')} style={{ width: 40, height: 40, alignSelf: 'center', tintColor: '#FFC40C' }} />
              <Text style={{ color: Mycolors.TEXT_COLOR }}>Open Library</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ height: 150 }} onPress={onCamera}>
              <Image source={require('../../../assets/Art/cameraCreation.png')} style={{ width: 40, height: 35, alignSelf: 'center', tintColor: '#FFC40C' }} />
              <Text style={{ color: Mycolors.TEXT_COLOR, marginTop: 5, }}>Open Camera</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        isVisible={selectorModal}
        swipeDirection="down"
        onSwipeComplete={() => setSelectorModal(false)}
        coverScreen={false}
        onBackdropPress={() => setSelectorModal(false)}
        scrollOffset={1}
        propagateSwipe={true}

        backdropColor='rgba(0,0,0,0.5)'
        style={{ justifyContent: 'flex-end', margin: 0 }}
      >
        <View style={{ height: 150, backgroundColor: Mycolors.BG_COLOR, borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 20, margin: 0, bottom: 0 }}>
          <View style={styles.mainView}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', }}>
              <TouchableOpacity style={{ width: 150, height: 150, }} onPress={openImageModal}>
                <Image source={require('../../../assets/Art/cameraCreation.png')} style={{ width: 40, height: 40, alignSelf: 'center', tintColor: '#FFC40C' }} />
                <Text style={{ textAlign: 'center', color: Mycolors.TEXT_COLOR }}>Select Photos</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ width: 150, height: 150 }} onPress={openVideoModal} >
                <Image source={require('../../../assets/Art/VideoCamera.png')} style={{ width: 40, height: 35, alignSelf: 'center', tintColor: '#FFC40C' }} />
                <Text style={{ textAlign: 'center', color: Mycolors.TEXT_COLOR }}>Select Videos</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      {loading ? <Loader /> : null}
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
  uploadedImageBox: {
    height: 70,
    width: 80,
    position: 'relative',
    marginRight: 29,

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
  uploadButtonView: {
    marginTop: 20,
    height: 60,
    width: '100%',
    alignSelf: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.13)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#263238',
    borderStyle: 'dashed',
    borderRadius: 5,
    marginBottom: 30,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3
    },


    shadowRadius: 5,
    shadowOpacity: 0.10,
    elevation: 5,
  },
  uploadButton: {
    marginTop: 10,

    height: 60,
    width: '100%',
    alignSelf: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.13)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#263238',
    borderStyle: 'dashed',
    borderRadius: 5,
    marginBottom: 30,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3
    },


    shadowRadius: 5,
    shadowOpacity: 0.10,
    elevation: 5,
  },
  headingTitleStyle: {
    paddingLeft: 15,
    width: '100%',
    fontSize: 13,
    borderColor: '#dbdbd9',
    borderWidth: 1,
    backgroundColor: '#fff',
    color: '#fff',
    marginTop: 20,
    height: 60,
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 10,
    color: Mycolors.Black,
    shadowColor: '#DFDDDD',
    shadowOffset: { width: 3, height: 3 },
    shadowRadius: 5,
    shadowOpacity: 0.05,
    elevation: 1
  },
  deleteButton: {
    position: 'absolute',
    top: 5,
    right: 5,

  },
  newsArticleStyle: {
    paddingLeft: 15,
    width: '100%',
    fontSize: 13,
    borderColor: '#dbdbd9',
    borderWidth: 1,
    backgroundColor: '#fff',
    color: '#fff',
    marginTop: 20,
    height: 168,
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 10,
    color: Mycolors.Black,
    shadowColor: '#DFDDDD',
    shadowOffset: { width: 3, height: 3 },
    shadowRadius: 5,
    shadowOpacity: 0.05,
    elevation: 1
  },
  saveButtonView: {
    marginTop: 55,
    height: 60,
    width: '100%',
    alignSelf: 'center',
    backgroundColor: '#FFC40C',
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
  imagePickerStyle: {
    height: '100%',
    width: '100%',
    borderWidth: 2,
    borderRadius: 10,
    marginTop: 10,

  },
  deleteIcon: {
    // backgroundColor: 'red',
    width: 20,
    height: 20,
    borderRadius: 10,
    left: 70,
    alignItems: 'center',
    backgroundColor: 'white',
    top: 1
  },
  categorySelectedStyle: {
    borderWidth: 2,
    borderColor: '#FFC40C',
    borderRadius: 10
  },
  deleteButtonn: {
    width: 20,
    height: 20,
    borderRadius: 10,
    right: -12,
    alignItems: 'center',
    backgroundColor: 'white',
    top: 1,

  },
  myImage: {
    flexDirection: "row",
    marginTop: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  myImagePicker: { flexDirection: 'row', paddingVertical: '6%', height: 100, marginTop: 10 },
  mainView: { justifyContent: 'center', alignItems: 'center', height: 200, width: '100%', alignItems: 'center' },
  categoryUnSelectedStyle: {
    borderWidth: 2,
    borderColor: '#B2B7B9',
    borderRadius: 10
  },
  input: {

    // borderColor: '#dbdbd9',
    // borderWidth: 1,
    // backgroundColor: '#fff',
    // color: '#fff',


    // paddingHorizontal: 15,
    // paddingVertical: 10,
    // color: Mycolors.Black,
    marginTop: 20


  }
});
export default StartupUpload