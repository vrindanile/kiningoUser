// // import React, { useEffect, useState, useRef } from 'react';
// // import { View, Image, Text, StyleSheet, SafeAreaView, TextInput, FlatList, Alert, TouchableOpacity, ScrollView, ImageBackground, Keyboard, Platform } from 'react-native';
// // import HomeHeaderRoundBottom from '../../../component/HomeHeaderRoundBottom';
// // import SearchInput2 from '../../../component/SearchInput2';
// // import SearchInputEnt from '../../../component/SearchInputEnt';
// // import SerchInput from '../../../component/SerchInput';
// // import { dimensions, Mycolors } from '../../../utility/Mycolors';
// // import { ImageSlider, ImageCarousel } from "react-native-image-slider-banner";
// // import MyButtons from '../../../component/MyButtons';
// // import MultiSlider from '@ptomasroos/react-native-multi-slider';
// // import Modal from 'react-native-modal';
// // import Toast from 'react-native-toast-message'
// // import LinearGradient from 'react-native-linear-gradient'
// // //import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
// // // import ImagePicker, { launchCamera, launchImageLibrary } from 'react-native-image-picker';
// // import VideoPlayer from 'react-native-video-player'
// // import { PermissionsAndroid } from 'react-native';
// // import Loader from '../../../WebApi/Loader';
// // import ImagePicker from 'react-native-image-picker';
// // import RNFetchBlob from 'rn-fetch-blob';
// // import { baseUrl, shop_eat_cart, user_payment_method, shop_eat_orders, shop_eat_cart_book_dining, shop_eat_cart_book_table, shop_eat_cart_id, shop_eat_business_id, shop_eat_menu_userid, requestPostApi, requestGetApi, shop_eat, connect_people_create_post, connect_edit_testing_img } from '../../../WebApi/Service'
// // import { useSelector, useDispatch } from 'react-redux';

// // const image1 = require('../../../assets/images/people-following-person.png')

// // const PeopleCreatePost = (props) => {
// //   const User = useSelector(state => state.user.user_details)
// //   const [searchValue, setsearchValue] = useState('')
// //   const [scrollEnabled, setScrollEnabled] = useState(false)
// //   const myTextInput = useRef()
// //   const [userMessage, setUserMessage] = useState('')
// //   const [multiSliderValue, setMultiSliderValue] = useState([0, 100])
// //   const [showChooseMilesModal, setShowChooseMilesModal] = useState(false)
// //   const [pick, setpick] = useState('')
// //   const [capturedVideo, setcapturedVideo] = useState('')
// //   const [filepath, setfilepath] = useState(null)
// //   const [pick1, setpick1] = useState('')
// //   const [filepath1, setfilepath1] = useState(null)
// //   const [My_Alert, setMy_Alert] = useState(false)
// //   const [alert_sms, setalert_sms] = useState('')
// //   const [loading, setLoading] = useState(false);
// //   const [descrbe, setdescrbe] = useState('');
// //   const [image, setImage] = useState('');
// //   const [image2, setimage2] = useState('')

// //   const [isimageChange, setisimageChange] = useState(false);
// //   const [profileImg, setProfileImg] = useState(
// //     '')
// //   useEffect(() => {

// //   }, [])


// //   // const openLibrary = async () => {

// //   //   let options = {
// //   //     // title: 'Video Picker',
// //   //     mediaType: 'mixed',
// //   //     // storageOptions:{
// //   //     //   skipBackup:true,
// //   //     //   path:'images'
// //   //     // }
// //   //     durationLimit: 30,
// //   //     title: 'Select Image/Video',
// //   //     customButtons: [
// //   //       {
// //   //         name: 'customOptionKey',
// //   //         title: 'Choose Photo from Custom Option'
// //   //       },
// //   //     ],
// //   //     maxWidth: 500,
// //   //     maxHeight: 500,
// //   //     storageOptions: {
// //   //       skipBackup: true,
// //   //       path: 'images',
// //   //     },
// //   //   };

// //   //   launchImageLibrary(options, (image) => {
// //   //     if (!image.didCancel) {
// //   //       console.log('the ddd==', image.assets[0].uri)
// //   //       var photo = {
// //   //         uri: image.assets[0].uri,
// //   //         type: "image/jpeg",
// //   //         name: image.assets[0].fileName
// //   //       };
// //   //       console.log("image", photo);
// //   //       setpick(photo)
// //   //       setfilepath(image)
// //   //     }
// //   //   })


// //   // }
// //   const openLibrary = async () => {
// //     try {
// //       let value = await ImagePicker.openPicker({
// //         width: 1080,
// //         height: 1080,
// //         cropping: true,
// //         mediaType: 'photo',
// //         compressImageQuality: 1,
// //         compressImageMaxHeight: 1080 / 2,
// //         compressImageMaxWidth: 1080 / 2,
// //       }).then(image => {
// //         setImage(image);
// //         setimage2(image?.path)
// //         setisimageChange(true)
// //         console.log('imagre set-------////////', image?.path);
// //         changeProfileImg(image)
// //       });
// //     } catch (error) {
// //       console.log('error in openLibrary', error);
// //     }
// //   };
// //   const requestCameraPermission = async () => {
// //     if (Platform.OS === 'ios') {
// //       opencamera();
// //     } else {
// //       try {
// //         const granted = await PermissionsAndroid.request(
// //           PermissionsAndroid.PERMISSIONS.CAMERA,
// //           {
// //             title: 'Storage Permission Required',
// //             message:
// //               'Application needs access to your storage to access camera',
// //           },
// //         );
// //         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
// //           opencamera();
// //           console.log('Storage Permission Granted.');
// //         } else {
// //           Alert.alert('Error', 'Storage Permission Not Granted');
// //         }
// //       } catch (err) {
// //         // To handle permission related exception
// //         console.log('ERROR' + err);
// //       }
// //     }
// //   };
// //   // const opencamera = async () => {
// //   //   let options = {
// //   //     title: 'Select Image',
// //   //     customButtons: [
// //   //       {
// //   //         name: 'customOptionKey',
// //   //         title: 'Choose Photo from Custom Option'
// //   //       },
// //   //     ],
// //   //     maxWidth: 500,
// //   //     maxHeight: 500,
// //   //     storageOptions: {
// //   //       skipBackup: true,
// //   //       path: 'images',
// //   //     },
// //   //   };

// //   //   // let options = {
// //   //   //   title: 'Select Image',
// //   //   //   customButtons: [
// //   //   //     {
// //   //   //       name: 'customOptionKey',
// //   //   //       title: 'Choose Photo from Custom Option'
// //   //   //     },
// //   //   //   ],
// //   //   //   mediaType:'video',
// //   //   //   maxWidth: 500,
// //   //   //   maxHeight: 500,
// //   //   //   storageOptions: {
// //   //   //     skipBackup: true,
// //   //   //     path: 'images',
// //   //   //   },
// //   //   // };

// //   //   launchCamera(options, (image) => {
// //   //     if (!image.didCancel) {
// //   //       console.log('the ddd==', image)
// //   //       var photo = {
// //   //         uri: image.assets[0].uri,
// //   //         type: image.assets[0].type,
// //   //         name: image.assets[0].fileName
// //   //       };
// //   //       console.log("imageCamera", photo);

// //   //       setpick(photo)
// //   //       setfilepath(image)
// //   //     }

// //   //   })

// //   // }


// //   // const opencamera = async () => {
// //   //   let options = {
// //   //     title: 'Select Image',
// //   //     customButtons: [
// //   //       {
// //   //         name: 'customOptionKey',
// //   //         title: 'Choose Photo from Custom Option',
// //   //       },
// //   //     ],
// //   //     maxWidth: 500,
// //   //     maxHeight: 500,
// //   //     storageOptions: {
// //   //       skipBackup: true,
// //   //       path: 'images',
// //   //     },
// //   //   };

// //   //   ImagePicker.launchCamera(options, (response) => {
// //   //     if (!response.didCancel) {
// //   //       // Convert URI to base64
// //   //       convertToBase64(response.uri);
// //   //     }
// //   //   });
// //   // };

// //   // const convertToBase64 = (uri) => {
// //   //   RNFetchBlob.fs.readFile(uri, 'base64')
// //   //     .then((data) => {
// //   //       const base64Image = `data:image/jpeg;base64,${data}`;
// //   //       console.log('Base64 Image:', base64Image);

// //   //       // Send the base64 image to the backend
// //   //       sendImageToBackend(base64Image);
// //   //     })
// //   //     .catch((error) => {
// //   //       console.log('Error converting image to base64:', error);
// //   //     });
// //   // };



// //   // const Createpost = async () => {

// //   //   console.log("pick UPLOAD", pick);
// //   //   if (pick == '' || descrbe == '') {
// //   //     Alert.alert('please selected required field')
// //   //   } else {
// //   //     let formdata = new FormData();
// //   //     formdata.append('post_description', descrbe);
// //   //     formdata.append('file', JSON.stringify(pick));
// //   //     setLoading(true);
// //   //     console.log("data.......", formdata);
// //   //     const { responseJson, err } = await requestPostApi(connect_people_create_post, formdata, 'POST', User.token)
// //   //     setLoading(false)
// //   //     console.log('the Createpost==>>', responseJson)
// //   //     if (responseJson.headers.success == 1) {

// //   //       props.navigation.goBack('')
// //   //       Toast.show({ text1: responseJson.headers.message });
// //   //     } else {

// //   //       setalert_sms(err)
// //   //       setMy_Alert(true)
// //   //     }
// //   //   }

// //   // }
// //   // const Createpost = async (base64Image) => {

// //   //   console.log("pick UPLOAD", pick);
// //   //   if (pick == '' || descrbe == '') {
// //   //     Alert.alert('please selected required field')
// //   //   } else {
// //   //     let formdata = new FormData();
// //   //     formdata.append('post_description', descrbe);
// //   //     formdata.append('file', base64Image);
// //   //     setLoading(true);
// //   //     console.log("data.......", formdata);
// //   //     const { responseJson, err } = await requestPostApi(connect_edit_testing_img, formdata, 'POST', User.token)
// //   //     setLoading(false)
// //   //     console.log('the Createpost==???????????>>', responseJson)
// //   //     if (responseJson.headers.success == 1) {

// //   //       //props.navigation.goBack('')
// //   //       //Toast.show({ text1: responseJson.headers.message });
// //   //     } else {

// //   //       setalert_sms(err)
// //   //       setMy_Alert(true)
// //   //     }
// //   //   }

// //   // }



// //   /////////////my new component
// //   // const Createpost = async () => {
// //   //   if (descrbe === '') {
// //   //     Alert.alert('Please enter a post description');
// //   //     return;
// //   //   }

// //   //   setLoading(true);

// //   //   try {
// //   //     const image = await ImagePicker.openCamera({
// //   //       width: 500,
// //   //       height: 500,
// //   //       cropping: true,
// //   //     });

// //   //     const base64Image = await convertToBase64(image.path);

// //   //     let formdata = new FormData();
// //   //     formdata.append('post_description', descrbe);
// //   //     formdata.append('file', base64Image);

// //   //     console.log('data....', formdata);

// //   //     const response = await fetch(connect_edit_testing_img, {
// //   //       method: 'POST',
// //   //       headers: {
// //   //         Authorization: User.token,
// //   //         'Content-Type': 'multipart/form-data',
// //   //       },
// //   //       body: formdata,
// //   //     });

// //   //     const responseJson = await response.json();
// //   //     setLoading(false);

// //   //     console.log('Createpost response:', responseJson);

// //   //     if (responseJson.headers.success == 1) {
// //   //       // Success case handling
// //   //     } else {
// //   //       setalert_sms(err);
// //   //       setMy_Alert(true);
// //   //     }
// //   //   } catch (error) {
// //   //     console.log('Error creating post:', error);
// //   //     setLoading(false);
// //   //     // Error case handling
// //   //   }
// //   // };

// //   // const convertToBase64 = (path) => {
// //   //   return new Promise((resolve, reject) => {
// //   //     RNFetchBlob.fs.readFile(path, 'base64')
// //   //       .then((data) => {
// //   //         const base64Image = `data:image/jpeg;base64,${data}`;
// //   //         resolve(base64Image);
// //   //       })
// //   //       .catch((error) => {
// //   //         console.log('Error converting image to base64:', error);
// //   //         reject(error);
// //   //       });
// //   //   });
// //   // };
// //   const opencamera = async () => {
// //     let options = {
// //       title: 'Select Image',
// //       customButtons: [
// //         {
// //           name: 'customOptionKey',
// //           title: 'Choose Photo from Custom Option',
// //         },
// //       ],
// //       maxWidth: 500,
// //       maxHeight: 500,
// //       storageOptions: {
// //         skipBackup: true,
// //         path: 'images',
// //       },
// //     };

// //     ImagePicker.launchCamera(options, async (response) => {
// //       if (!response.didCancel) {
// //         try {
// //           const base64Image = await convertToBase64(response.uri);
// //           // Do something with the base64Image, e.g., send it to the server

// //           console.log('Base64 image:', base64Image);
// //         } catch (error) {
// //           console.log('Error converting image to base64:', error);
// //         }
// //       }
// //     });
// //   };

// //   const convertToBase64 = (path) => {
// //     return new Promise((resolve, reject) => {
// //       RNFetchBlob.fs
// //         .readFile(path, 'base64')
// //         .then((data) => {
// //           const base64Image = `data:image/jpeg;base64,${data}`;
// //           resolve(base64Image);
// //         })
// //         .catch((error) => {
// //           console.log('Error converting image to base64:', error);
// //           reject(error);
// //         });
// //     });
// //   };
// //   return (
// //     <SafeAreaView scrollEnabled={scrollEnabled} style={{ backgroundColor: '#F8F8F8' }}>
// //       <ScrollView>
// //         <HomeHeaderRoundBottom height={80} paddingHorizontal={15} backgroundColor='#fff'
// //           press1={() => { props.navigation.goBack() }} img1={require('../../../assets/images/events_arrow.png')} img1width={25} img1height={20}
// //           press2={() => { }} title2={'Create Post'} fontWeight={'500'} img2height={20} color='#455A64'
// //           press3={() => { }} img3width={25} img3height={25} borderBottomLeftRadius={25} borderBottomRightRadius={25} />
// //         <View style={{ width: '90%', alignSelf: 'center', marginTop: 20 }}>



// //           <View style={{ width: '100%', alignSelf: 'center', marginTop: 20, backgroundColor: '#F8F8F8' }}>

// //             <View style={styles.rowWithImageView}>

// //               <View style={{ flexDirection: 'row', alignItems: 'center', }}>
// //                 <Image source={image1} />
// //                 <Text style={{ fontSize: 14, fontWeight: '600', color: '#455A64', marginLeft: 10 }}>Aayav Nadkarni</Text>
// //               </View>

// //               <TouchableOpacity onPress={() => { props.navigation.navigate('PeopleProfileScreen') }} style={styles.eyeView}>
// //                 <Image source={require('../../../assets/images/people-eye-image.png')} />
// //                 <Text style={{ fontSize: 14, fontWeight: '400', color: '#fff', marginLeft: 10 }}>View Profile</Text>
// //               </TouchableOpacity>
// //             </View>

// //             <View style={{ marginTop: 10, marginBottom: 20 }}>
// //               <TextInput
// //                 //  value={reson}
// //                 onChangeText={(e) => setdescrbe(e)}
// //                 placeholder={`What's on your mind`}
// //                 placeholderTextColor="#bbbbbb"
// //                 multiline={true}
// //                 textAlignVertical='top'
// //                 // maxLength={500}
// //                 // keyboardType="number-pad"
// //                 autoCapitalize='none'
// //                 style={[styles.input]}
// //               />
// //             </View>

// //             <LinearGradient
// //               colors={['rgba(255, 255, 255, 1)', 'rgba(249, 249, 249, 1)']}
// //               style={styles.uploadImageView}>
// //               <TouchableOpacity onPress={() => { openLibrary() }} style={{ flexDirection: 'row', alignItems: 'center' }}>
// //                 <View style={styles.imageView}>
// //                   <Image source={require('../../../assets/images/people-upload-photo-video.png')} />
// //                 </View>
// //                 <Text style={styles.imageText}>Photo/Video</Text>
// //               </TouchableOpacity>
// //               <TouchableOpacity onPress={() => { openLibrary() }}>
// //                 <Image source={require('../../../assets/images/people-right-arrow.png')} />
// //               </TouchableOpacity>

// //             </LinearGradient>
// //             {/* <Image style={{ height: 80, width: 80 }} source={{ uri: pick.uri }} /> */}
// //             <LinearGradient
// //               colors={['rgba(255, 255, 255, 1)', 'rgba(249, 249, 249, 1)']}
// //               style={[styles.uploadImageView, { marginTop: 10 }]}>
// //               <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => { requestCameraPermission() }}>
// //                 <View style={styles.imageView}>
// //                   <Image source={require('../../../assets/images/people-camera-image.png')} />
// //                 </View>
// //                 <Text style={styles.imageText}>Camera</Text>
// //               </TouchableOpacity>
// //               <TouchableOpacity onPress={() => { requestCameraPermission() }}>
// //                 <Image source={require('../../../assets/images/people-right-arrow.png')} />
// //               </TouchableOpacity>
// //             </LinearGradient>

// //           </View>






// //         </View>
// //         <View style={{ height: 100 }} />
// //         <View style={{ width: '90%', height: 60, flexDirection: 'row', justifyContent: 'space-between', bottom: 60, alignSelf: 'center', zIndex: 999 }}>
// //           <MyButtons title="Post" height={50} width={'100%'} borderRadius={5} press={() => { Createpost() }} fontSize={13}
// //             titlecolor={Mycolors.BG_COLOR} marginVertical={0} backgroundColor={'#0089CF'} />

// //         </View>
// //       </ScrollView>

// //       {loading ?
// //         <Loader />
// //         : null}
// //     </SafeAreaView>
// //   );
// // }
// // const styles = StyleSheet.create({
// //   searchView: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-between',
// //     alignItems: 'center',
// //     width: '100%',
// //     height: 50,
// //   },
// //   searchLeftSubView: {
// //     width: '83%',
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     backgroundColor: '#fff',
// //     paddingVertical: 5,
// //     paddingLeft: 10,
// //     borderRadius: 10,
// //     shadowColor: '#000000',
// //     shadowOffset: {
// //       width: 0,
// //       height: 3
// //     },
// //     shadowRadius: 5,
// //     shadowOpacity: 0.05,
// //     elevation: 5,
// //   },
// //   rowWithImageView: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     justifyContent: 'space-between',
// //     backgroundColor: '#fff',
// //     padding: 10,
// //     borderRadius: 10,
// //     shadowColor: '#000000',
// //     shadowOffset: {
// //       width: 0,
// //       height: 3
// //     },
// //     shadowRadius: 5,
// //     shadowOpacity: 0.05,
// //     elevation: 2,
// //   },
// //   eyeView: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     backgroundColor: '#0089CF',
// //     borderRadius: 20,
// //     paddingVertical: 10,
// //     paddingHorizontal: 12,
// //   },
// //   input: {
// //     paddingLeft: 15,
// //     width: '100%',
// //     fontSize: 14,
// //     backgroundColor: '#fff',
// //     height: 200,
// //     borderRadius: 5,
// //     paddingHorizontal: 15,
// //     paddingVertical: 10,
// //     color: Mycolors.Black,
// //     borderRadius: 10,
// //     shadowColor: '#000000',
// //     shadowOffset: {
// //       width: 0,
// //       height: 3
// //     },
// //     shadowRadius: 5,
// //     shadowOpacity: 0.05,
// //     elevation: 2,
// //   },
// //   uploadImageView: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     justifyContent: 'space-between',
// //     backgroundColor: '#fff',
// //     borderRadius: 10,
// //     paddingVertical: 10,
// //     paddingHorizontal: 20,
// //     shadowColor: '#000000',
// //     shadowOffset: {
// //       width: 0,
// //       height: 3
// //     },
// //     shadowRadius: 5,
// //     shadowOpacity: 0.03,
// //     elevation: 1,
// //   },
// //   imageView: {
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     backgroundColor: '#F8F8F8',
// //     padding: 10,
// //     width: 60,
// //     height: 60,
// //     borderRadius: 30,
// //   },
// //   imageText: {
// //     fontSize: 14,
// //     fontWeight: '500',
// //     color: '#455A64',
// //     marginLeft: 10
// //   }
// // });
// // export default PeopleCreatePost




// import React, { useEffect, useState, useRef } from 'react';
// import { View, Image, Text, StyleSheet, SafeAreaView, TextInput, FlatList, Alert, TouchableOpacity, ScrollView, ImageBackground, Keyboard, Platform } from 'react-native';
// import HomeHeaderRoundBottom from '../../../component/HomeHeaderRoundBottom';
// import SearchInput2 from '../../../component/SearchInput2';
// import SearchInputEnt from '../../../component/SearchInputEnt';
// import SerchInput from '../../../component/SerchInput';
// import { dimensions, Mycolors } from '../../../utility/Mycolors';
// import { ImageSlider, ImageCarousel } from "react-native-image-slider-banner";
// import MyButtons from '../../../component/MyButtons';
// import MultiSlider from '@ptomasroos/react-native-multi-slider';
// import Modal from 'react-native-modal';
// import Toast from 'react-native-toast-message'
// import LinearGradient from 'react-native-linear-gradient'
// import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
// import VideoPlayer from 'react-native-video-player'
// import { PermissionsAndroid } from 'react-native';
// import Loader from '../../../WebApi/Loader'

// import RNFetchBlob from 'rn-fetch-blob';
// import { baseUrl, shop_eat_cart, user_payment_method, shop_eat_orders, shop_eat_cart_book_dining, shop_eat_cart_book_table, shop_eat_cart_id, shop_eat_business_id, shop_eat_menu_userid, requestPostApi, requestGetApi, shop_eat, connect_people_create_post, connect_edit_testing_img } from '../../../WebApi/Service'
// import { useSelector, useDispatch } from 'react-redux';

// const image1 = require('../../../assets/images/people-following-person.png')
// const { fs } = RNFetchBlob;
// const PeopleCreatePost = (props) => {
//   const User = useSelector(state => state.user.user_details)
//   const [searchValue, setsearchValue] = useState('')
//   const [scrollEnabled, setScrollEnabled] = useState(false)
//   const myTextInput = useRef()
//   const [userMessage, setUserMessage] = useState('')
//   const [multiSliderValue, setMultiSliderValue] = useState([0, 100])
//   const [showChooseMilesModal, setShowChooseMilesModal] = useState(false)
//   const [pick, setpick] = useState('')
//   const [capturedVideo, setcapturedVideo] = useState('')
//   const [filepath, setfilepath] = useState(null)
//   const [pick1, setpick1] = useState('')
//   const [filepath1, setfilepath1] = useState(null)
//   const [My_Alert, setMy_Alert] = useState(false)
//   const [alert_sms, setalert_sms] = useState('')
//   const [loading, setLoading] = useState(false);
//   const [descrbe, setdescrbe] = useState('');
//   useEffect(() => {

//   }, [])


//   // const openLibrary = async () => {

//   //   let options = {
//   //     // title: 'Video Picker',
//   //     mediaType: 'mixed',
//   //     // storageOptions:{
//   //     //   skipBackup:true,
//   //     //   path:'images'
//   //     // }
//   //     durationLimit: 30,
//   //     title: 'Select Image/Video',
//   //     customButtons: [
//   //       {
//   //         name: 'customOptionKey',
//   //         title: 'Choose Photo from Custom Option'
//   //       },
//   //     ],
//   //     maxWidth: 500,
//   //     maxHeight: 500,
//   //     storageOptions: {
//   //       skipBackup: true,
//   //       path: 'images',
//   //     },
//   //   };

//   //   launchImageLibrary(options, (image) => {
//   //     if (!image.didCancel) {
//   //       console.log('the ddd==', image.assets[0].uri)
//   //       var photo = {
//   //         uri: image.assets[0].uri,

//   //         type: image.assets[0].type,
//   //         name: image.assets[0].fileName
//   //       };
//   //       console.log("image", photo);

//   //       setpick(photo)
//   //       setfilepath(image)
//   //     }
//   //   })


//   // }





//   const openLibrary = async () => {
//     let options = {
//       // title: 'Video Picker',
//       mediaType: 'mixed',
//       // storageOptions:{
//       //   skipBackup:true,
//       //   path:'images'
//       // }
//       durationLimit: 30,
//       title: 'Select Image/Video',
//       customButtons: [
//         {
//           name: 'customOptionKey',
//           title: 'Choose Photo from Custom Option',
//         },
//       ],
//       maxWidth: 500,
//       maxHeight: 500,
//       storageOptions: {
//         skipBackup: true,
//         path: 'images',
//       },
//     };

//     launchImageLibrary(options, async (image) => {
//       if (!image.didCancel) {
//         console.log('the ddd==', image.assets[0].uri);

//         // Convert URI to base64
//         //  const base64Data = await uriToBase64(image.assets[0].uri);
//         //console.log('Base64 data:', base64Data);

//         var photo = {
//           uri: image.assets[0].uri,
//           type: image.assets[0].type,
//           name: image.assets[0].fileName,
//           base64: base64Data, // Add base64 data to the photo object
//         };

//         console.log("image", photo);
//         setpick(photo);
//         setfilepath(image);
//       }
//     });
//   };

//   const uriToBase64 = async (uri) => {
//     const response = await fetch(uri);
//     const blob = await response.blob();

//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.onloadend = () => resolve(reader.result);
//       reader.onerror = reject;
//       reader.readAsDataURL(blob);
//     });
//   };
//   const requestCameraPermission = async () => {
//     if (Platform.OS === 'ios') {
//       opencamera();
//     } else {
//       try {
//         const granted = await PermissionsAndroid.request(
//           PermissionsAndroid.PERMISSIONS.CAMERA,
//           {
//             title: 'Storage Permission Required',
//             message:
//               'Application needs access to your storage to access camera',
//           },
//         );
//         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//           opencamera();
//           console.log('Storage Permission Granted.');
//         } else {
//           Alert.alert('Error', 'Storage Permission Not Granted');
//         }
//       } catch (err) {
//         // To handle permission related exception
//         console.log('ERROR' + err);
//       }
//     }
//   };
//   const opencamera = async () => {
//     let options = {
//       title: 'Select Image',
//       customButtons: [
//         {
//           name: 'customOptionKey',
//           title: 'Choose Photo from Custom Option'
//         },
//       ],
//       maxWidth: 500,
//       maxHeight: 500,
//       storageOptions: {
//         skipBackup: true,
//         path: 'images',
//       },
//     };

//     // let options = {
//     //   title: 'Select Image',
//     //   customButtons: [
//     //     {
//     //       name: 'customOptionKey',
//     //       title: 'Choose Photo from Custom Option'
//     //     },
//     //   ],
//     //   mediaType:'video',
//     //   maxWidth: 500,
//     //   maxHeight: 500,
//     //   storageOptions: {
//     //     skipBackup: true,
//     //     path: 'images',
//     //   },
//     // };

//     // launchCamera(options, (image) => {
//     //   if (!image.didCancel) {
//     //     console.log('the ddd==', image)
//     //     var photo = {
//     //       uri: image.assets[0].uri,
//     //       type: image.assets[0].type,
//     //       name: image.assets[0].fileName
//     //     };
//     //     console.log("imageCamera", photo);
//     //     setpick(photo)
//     //     setfilepath(image)
//     //   }

//     // })
//     // const opencamera = async () => {
//     //   let options = {
//     //     mediaType: 'photo',
//     //     maxWidth: 500,
//     //     maxHeight: 500,
//     //     includeBase64: true,
//     //   };

//     //   launchCamera(options, async (response) => {
//     //     if (!response.didCancel) {
//     //       try {
//     //         const base64Image = await convertToBase64(response.assets[0].uri);
//     //         // Do something with the base64Image, e.g., send it to the server

//     //         console.log('Base64 image:', base64Image);
//     //       } catch (error) {
//     //         console.log('Error converting image to base64:', error);
//     //       }
//     //     }
//     //   });
//     // };

//     // const convertToBase64 = (path) => {
//     //   return new Promise((resolve, reject) => {
//     //     RNFetchBlob.fs
//     //       .readFile(path, 'base64')
//     //       .then((data) => {
//     //         const base64Image = `data:image/jpeg;base64,${data}`;
//     //         resolve(base64Image);
//     //       })
//     //       .catch((error) => {
//     //         console.log('Error converting image to base64:', error);
//     //         reject(error);
//     //       });
//     //   });
//     // };
//     {
//       let options = {
//         mediaType: 'photo',
//         maxWidth: 500,
//         maxHeight: 500,
//         includeBase64: true,
//       };

//       launchCamera(options, async (response) => {
//         if (!response.didCancel) {
//           try {
//             const base64Image = await convertToBase64(response.assets[0].uri);
//             // Do something with the base64Image, e.g., send it to the server

//             console.log('Base64 image:', base64Image);
//             // setpick(base64Image)
//           } catch (error) {
//             console.log('Error converting image to base64:', error);
//           }
//         }
//       });
//     };

//     const convertToBase64 = (path) => {
//       return new Promise((resolve, reject) => {
//         RNFetchBlob.fs
//           .readFile(path, 'base64')
//           .then((data) => {
//             const base64Image = `data:image/jpeg;base64,${data}`;
//             resolve(base64Image);
//           })
//           .catch((error) => {
//             console.log('Error converting image to base64:', error);
//             reject(error);
//           });
//       });
//     };
//   }

//   // const Createpost = async () => {

//   //   console.log("pick UPLOAD", pick);
//   //   if (pick == '' || descrbe == '') {
//   //     Alert.alert('please selected required field')
//   //   } else {
//   //     let formdata = new FormData();
//   //     formdata.append('post_description', descrbe);
//   //     formdata.append('file', pick);
//   //     setLoading(true);
//   //     console.log("data.......", formdata);
//   //     const { responseJson, err } = await requestPostApi(connect_people_create_post, formdata, 'POST', User.token)
//   //     setLoading(false)
//   //     console.log('the Createpost==>>', responseJson)
//   //     if (responseJson.headers.success == 1) {
//   //       props.navigation.goBack('')
//   //       Toast.show({ text1: responseJson.headers.message });
//   //     } else {

//   //       setalert_sms(err)
//   //       setMy_Alert(true)
//   //     }
//   //   }

//   // }
//   const Createpost = async () => {
//     console.log("pick UPLOAD", pick);
//     if (pick == '' || descrbe == '') {
//       Alert.alert('Please select required field');
//     } else {
//       let formdata = new FormData();
//       formdata.append('post_description', descrbe);
//       try {
//         const fileBlob = await fileURItoFile(pick.uri, pick.filename);
//         console.log('my fileeee----->', fileBlob);
//         formdata.append('file', fileBlob);
//       } catch (error) {
//         console.error('Error converting file URI to Blob object:', error);
//         // Handle the error condition
//         return;
//       }
//       setLoading(true);
//       console.log("data.......", formdata);
//       const { responseJson, err } = await requestPostApi(
//         connect_edit_testing_img,
//         formdata,
//         'POST',
//         User.token
//       );
//       setLoading(false);
//       console.log('the Createpost==>>', responseJson);
//       if (responseJson.headers.success == 1) {
//         props.navigation.goBack('');
//         Toast.show({ text1: responseJson.headers.message });
//       } else {
//         setalert_sms(err);
//         setMy_Alert(true);
//       }
//     }
//   }

//   async function fileURItoFile(uri, filename) {
//     try {
//       const base64 = await fs.readFile(uri, 'base64');
//       const type = base64.split(';')[0].split(':')[1];
//       const data = base64.replace(/^data:image\/\w+;base64,/, '');
//       const filePath = `${RNFetchBlob.fs.dirs.CacheDir}/${filename}`;
//       await fs.writeFile(filePath, data, 'base64');

//       const blob = {
//         uri: filePath,
//         name: filename,
//         type: type,
//       };
//       console.log('blob------------>', blob);
//       return blob;
//     } catch (error) {
//       console.error('Error converting file URI to Blob object:', error);
//       throw error;
//     }
//   }
//   return (
//     <SafeAreaView scrollEnabled={scrollEnabled} style={{ backgroundColor: '#F8F8F8' }}>
//       <ScrollView>
//         <HomeHeaderRoundBottom height={80} paddingHorizontal={15} backgroundColor='#fff'
//           press1={() => { props.navigation.goBack() }} img1={require('../../../assets/images/events_arrow.png')} img1width={25} img1height={20}
//           press2={() => { }} title2={'Create Post'} fontWeight={'500'} img2height={20} color='#455A64'
//           press3={() => { }} img3width={25} img3height={25} borderBottomLeftRadius={25} borderBottomRightRadius={25} />
//         <View style={{ width: '90%', alignSelf: 'center', marginTop: 20 }}>



//           <View style={{ width: '100%', alignSelf: 'center', marginTop: 20, backgroundColor: '#F8F8F8' }}>

//             <View style={styles.rowWithImageView}>

//               <View style={{ flexDirection: 'row', alignItems: 'center', }}>
//                 
//                 <Text style={{ fontSize: 14, fontWeight: '600', color: '#455A64', marginLeft: 10 }}>Saurabh Saneja</Text>
//               </View>

//               <TouchableOpacity onPress={() => { props.navigation.navigate('PeopleProfileScreen') }} style={styles.eyeView}>
//                 <Image source={require('../../../assets/images/people-eye-image.png')} />
//                 <Text style={{ fontSize: 14, fontWeight: '400', color: '#fff', marginLeft: 10 }}>View Profile</Text>
//               </TouchableOpacity>
//             </View>

//             <View style={{ marginTop: 10, marginBottom: 20 }}>
//               <TextInput
//                 //  value={reson}
//                 onChangeText={(e) => setdescrbe(e)}
//                 placeholder={`What's on your mind`}
//                 placeholderTextColor="#bbbbbb"
//                 multiline={true}
//                 textAlignVertical='top'
//                 // maxLength={500}
//                 // keyboardType="number-pad"
//                 autoCapitalize='none'
//                 style={[styles.input]}
//               />
//             </View>

//             <LinearGradient
//               colors={['rgba(255, 255, 255, 1)', 'rgba(249, 249, 249, 1)']}
//               style={styles.uploadImageView}>
//               <TouchableOpacity onPress={() => { openLibrary() }} style={{ flexDirection: 'row', alignItems: 'center' }}>
//                 <View style={styles.imageView}>
//                   <Image source={require('../../../assets/images/people-upload-photo-video.png')} />
//                 </View>
//                 <Text style={styles.imageText}>Photo/Video</Text>
//               </TouchableOpacity>
//               <TouchableOpacity onPress={() => { openLibrary() }}>
//                 <Image source={require('../../../assets/images/people-right-arrow.png')} />
//               </TouchableOpacity>

//             </LinearGradient>
//             {/* <Image style={{ height: 80, width: 80 }} source={{ uri: pick.uri }} /> */}
//             <LinearGradient
//               colors={['rgba(255, 255, 255, 1)', 'rgba(249, 249, 249, 1)']}
//               style={[styles.uploadImageView, { marginTop: 10 }]}>
//               <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => { requestCameraPermission() }}>
//                 <View style={styles.imageView}>
//                   <Image source={require('../../../assets/images/people-camera-image.png')} />
//                 </View>
//                 <Text style={styles.imageText}>Camera</Text>
//               </TouchableOpacity>
//               <TouchableOpacity onPress={() => { requestCameraPermission() }}>
//                 <Image source={require('../../../assets/images/people-right-arrow.png')} />
//               </TouchableOpacity>
//             </LinearGradient>

//           </View>






//         </View>
//         <View style={{ height: 100 }} />
//         <View style={{ width: '90%', height: 60, flexDirection: 'row', justifyContent: 'space-between', bottom: 60, alignSelf: 'center', zIndex: 999 }}>
//           <MyButtons title="Post" height={50} width={'100%'} borderRadius={5} press={() => { Createpost() }} fontSize={13}
//             titlecolor={Mycolors.BG_COLOR} marginVertical={0} backgroundColor={'#0089CF'} />

//         </View>
//       </ScrollView>

//       {loading ?
//         <Loader />
//         : null}
//     </SafeAreaView>
//   );
// }
// const styles = StyleSheet.create({
//   searchView: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     width: '100%',
//     height: 50,
//   },
//   searchLeftSubView: {
//     width: '83%',
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     paddingVertical: 5,
//     paddingLeft: 10,
//     borderRadius: 10,
//     shadowColor: '#000000',
//     shadowOffset: {
//       width: 0,
//       height: 3
//     },
//     shadowRadius: 5,
//     shadowOpacity: 0.05,
//     elevation: 5,
//   },
//   rowWithImageView: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     backgroundColor: '#fff',
//     padding: 10,
//     borderRadius: 10,
//     shadowColor: '#000000',
//     shadowOffset: {
//       width: 0,
//       height: 3
//     },
//     shadowRadius: 5,
//     shadowOpacity: 0.05,
//     elevation: 2,
//   },
//   eyeView: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#0089CF',
//     borderRadius: 20,
//     paddingVertical: 10,
//     paddingHorizontal: 12,
//   },
//   input: {
//     paddingLeft: 15,
//     width: '100%',
//     fontSize: 14,
//     backgroundColor: '#fff',
//     height: 200,
//     borderRadius: 5,
//     paddingHorizontal: 15,
//     paddingVertical: 10,
//     color: Mycolors.Black,
//     borderRadius: 10,
//     shadowColor: '#000000',
//     shadowOffset: {
//       width: 0,
//       height: 3
//     },
//     shadowRadius: 5,
//     shadowOpacity: 0.05,
//     elevation: 2,
//   },
//   uploadImageView: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     shadowColor: '#000000',
//     shadowOffset: {
//       width: 0,
//       height: 3
//     },
//     shadowRadius: 5,
//     shadowOpacity: 0.03,
//     elevation: 1,
//   },
//   imageView: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F8F8F8',
//     padding: 10,
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//   },
//   imageText: {
//     fontSize: 14,
//     fontWeight: '500',
//     color: '#455A64',
//     marginLeft: 10
//   }
// });
// export default PeopleCreatePost 




import React, { useEffect, useState, useRef } from 'react';
import { View, Image, Text, StyleSheet, SafeAreaView, TextInput, FlatList, Alert, TouchableOpacity, ScrollView, ImageBackground, Keyboard, Platform } from 'react-native';
import HomeHeaderRoundBottom from '../../../component/HomeHeaderRoundBottom';
import SearchInput2 from '../../../component/SearchInput2';
import SearchInputEnt from '../../../component/SearchInputEnt';
import SerchInput from '../../../component/SerchInput';
import { dimensions, Mycolors } from '../../../utility/Mycolors';
import { ImageSlider, ImageCarousel } from "react-native-image-slider-banner";
import MyButtons from '../../../component/MyButtons';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import Modal from 'react-native-modal';
import Toast from 'react-native-toast-message'
import LinearGradient from 'react-native-linear-gradient'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import VideoPlayer from 'react-native-video-player'
import { PermissionsAndroid } from 'react-native';
import Loader from '../../../WebApi/Loader';
import { baseUrl, shop_eat_cart, user_payment_method, shop_eat_orders, shop_eat_cart_book_dining, shop_eat_cart_book_table, shop_eat_cart_id, shop_eat_business_id, shop_eat_menu_userid, requestPostApi, requestGetApi, shop_eat, connect_people_create_post, connect_edit_post } from '../../../WebApi/Service'
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
const image1 = require('../../../assets/images/people-following-person.png')

const EditPost = (props, route) => {
    const User = useSelector(state => state.user.user_details)
    console.log("user", User);
    const [searchValue, setsearchValue] = useState('')
    const [scrollEnabled, setScrollEnabled] = useState(false)
    const myTextInput = useRef()
    const [userMessage, setUserMessage] = useState('')
    const [multiSliderValue, setMultiSliderValue] = useState([0, 100])
    const [showChooseMilesModal, setShowChooseMilesModal] = useState(false)
    const [pick, setpick] = useState('')
    const [capturedVideo, setcapturedVideo] = useState('')
    const [filepath, setfilepath] = useState(null)
    const [pick1, setpick1] = useState('')
    const [filepath1, setfilepath1] = useState(null)
    const [My_Alert, setMy_Alert] = useState(false)
    const [alert_sms, setalert_sms] = useState('')
    const [loading, setLoading] = useState(false);
    const [descrbe, setdescrbe] = useState('');
    const [id, setId] = useState(props.route.params.id)
    const [image, setImage] = useState('')
    useEffect(() => {
        console.log('image---->>>');
        const tet = props.route.params.id;
        console.log(props.route.params.id, '==========')
        setId(props.route.params.id)
        Createpos()
    }, [])

    ///////my real function
    const openLibrary = async () => {

        let options = {
            // title: 'Video Picker', 
            mediaType: 'mixed',
            // storageOptions:{
            //   skipBackup:true,
            //   path:'images'
            // }
            durationLimit: 30,
            title: 'Select Image/Video',
            customButtons: [
                {
                    name: 'customOptionKey',
                    title: 'Choose Photo from Custom Option'
                },
            ],
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };

        launchImageLibrary(options, (image) => {
            setImage(image)
            console.log('my new image state---------->', image);
            if (!image.didCancel) {
                console.log('the ddd==', image.assets[0].uri)
                var photo = {
                    uri: image.assets[0].uri,
                    type: image.assets[0].type,
                    name: image.assets[0].fileName
                };
                // changeProfileImg(image)
                console.log("image", photo);
                setpick(photo)
                setfilepath(image)
            }
        })


    }


    // const openLibrary = () => {
    //   let options = {
    //     mediaType: 'photo',
    //     storageOptions: {
    //       skipBackup: true,
    //       path: 'images',
    //     },
    //   };

    //   launchImageLibrary(options, async (response) => {
    //     if (!response.didCancel) {
    //       let photoPath = response.uri;

    //       // Convert local image URI to base64 string
    //       if (Platform.OS === 'android' && response.uri.startsWith('file://')) {
    //         try {
    //           const fileBase64 = await RNFS.readFile(photoPath, 'base64');
    //           photoPath = `data:${response.type};base64,${fileBase64}`;
    //         } catch (error) {
    //           console.log('Error converting image to base64:', error);
    //         }
    //       }

    //       const photo = {
    //         uri: photoPath,
    //         type: response.type,
    //         name: response.fileName,
    //       };

    //       console.log('image', photo);
    //       setpick(photo);
    //       setfilepath(response);
    //     }
    //   });
    // };




    ////////kkkkk//////////
    // const openLibrary = () => {
    //   let options = {
    //     mediaType: 'photo',
    //     storageOptions: {
    //       skipBackup: true,
    //       path: 'images',
    //     },
    //   };

    //   ImagePicker.launchImageLibrary(options, (response) => {
    //     if (!response.didCancel) {
    //       const photo = {
    //         uri: response.uri,
    //         type: response.type,
    //         name: response.fileName,
    //       };
    //       console.log('image', photo);
    //       setpick(photo);
    //       setfilepath(response);
    //     }
    //   });
    // };
    const requestCameraPermission = async () => {
        if (Platform.OS === 'ios') {
            opencamera();
        } else {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.CAMERA,
                    {
                        title: 'Storage Permission Required',
                        message:
                            'Application needs access to your storage to access camera',
                    },
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    opencamera();
                    console.log('Storage Permission Granted.');
                } else {
                    Alert.alert('Error', 'Storage Permission Not Granted');
                }
            } catch (err) {
                // To handle permission related exception
                console.log('ERROR' + err);
            }
        }
    };
    // const opencamera = async () => {
    //     let options = {
    //         title: 'Select Image',
    //         customButtons: [
    //             {
    //                 name: 'customOptionKey',
    //                 title: 'Choose Photo from Custom Option'
    //             },
    //         ],
    //         maxWidth: 500,
    //         maxHeight: 500,
    //         storageOptions: {
    //             skipBackup: true,
    //             path: 'images',
    //         },
    //     };

    //     // let options = {
    //     //   title: 'Select Image',
    //     //   customButtons: [
    //     //     {
    //     //       name: 'customOptionKey',
    //     //       title: 'Choose Photo from Custom Option'
    //     //     },
    //     //   ],
    //     //   mediaType:'video',
    //     //   maxWidth: 500,
    //     //   maxHeight: 500,
    //     //   storageOptions: {
    //     //     skipBackup: true,
    //     //     path: 'images',
    //     //   },
    //     // };

    //     launchCamera(options, (image) => {

    //         if (!image.didCancel) {
    //             console.log('the ddd==', image)
    //             var photo = {
    //                 uri: image.assets[0].uri,
    //                 type: image.assets[0].type,
    //                 name: image.assets[0].fileName
    //             };

    //             console.log("imageCamera", photo);
    //             setpick(photo)
    //             setfilepath(image)
    //         }

    //     })

    // }

    // const Createpost = async () => {
    //   console.log("pick UPLOAD", pick);

    //   if (pick === '' || descrbe === '') {
    //     Alert.alert('Please select all required fields');
    //   } else {
    //     const formData = new FormData();
    //     formData.append('post_description', descrbe);
    //     formData.append('file', {
    //       uri: pick.uri,
    //       type: pick.type,
    //       name: pick.name,
    //     });

    //     setLoading(true);
    //     console.log('data', formData);
    //     const { responseJson, err } = await requestPostApi(connect_people_create_post, formdata, 'POST', User.token)
    //     setLoading(false)
    //     console.log(responseJson, 'my response');
    //     //   console.log('the Createpost==>>', responseJson)
    //     // Send the formData object to the backend using your preferred method (e.g., Axios, fetch).
    //     // Make sure to handle the response and any errors appropriately.

    //     setLoading(false);
    //   }
    // }


    // const Createpost = async () => {
    //     console.log("pick UPLOAD", pick);
    //     const formData = new FormData();
    //     formData.append('post_description', descrbe);
    //     formData.append('file', pick);
    //     const headers = {
    //         'Content-Type': 'multipart/form-data',
    //         Authorization: `Bearer ${User.token}`,
    //     };
    //     const url = 'http://54.153.75.225/backend/api/v1/connect/people/create-post';

    //     try {
    //         const response = await fetch(url, {
    //             method: 'POST',
    //             headers,
    //             body: formData,
    //         });

    //         const responseJson = await response.json();
    //         console.log(responseJson, 'my response');
    //         if (responseJson.headers.success == 1) {
    //             props.navigation.goBack('')
    //             Toast.show({ text1: responseJson.headers.message });
    //         } else {

    //             setalert_sms(err)
    //             setMy_Alert(true)
    //         }


    //     } catch (error) {
    //         console.log('Error uploading data:', error);
    //     }
    //     // if (pick === '' || descrbe === '') {
    //     //   Alert.alert('Please select all required fields');
    //     // } else {
    //     //   const formData = new FormData();
    //     //   formData.append('post_description', descrbe);
    //     //   formData.append('file', {
    //     //     uri: pick.uri,
    //     //     type: pick.type,
    //     //     name: pick.name,
    //     //   });

    //     //   setLoading(true);
    //     //   console.log('data', formData);
    //     //   const { responseJson, err } = await requestPostApi(connect_people_create_post, formdata, 'POST', User.token)
    //     //   setLoading(false)
    //     //   console.log(responseJson, 'my response');
    //     //   //   console.log('the Createpost==>>', responseJson)
    //     //   // Send the formData object to the backend using your preferred method (e.g., Axios, fetch).
    //     //   // Make sure to handle the response and any errors appropriately.

    //     //   setLoading(false);
    //     // }
    // }
    const Createpost = async () => {
        setLoading(true)
        console.log('llll')
        const data = { post_description: descrbe }
        const { responseJson, err } = await requestPostApi(connect_edit_post + id, data, 'PUT', User.token)

        console.log('the edit post', responseJson)
        if (responseJson.success == 1) {
            // setUserid(nameAgeList[0].rest.userid)
            props.navigation.navigate('PeopleHome')

            // setLoading(false)
            //Toast.show({ text1: responseJson.headers.message });

        } else {

            setalert_sms(err)
            setMy_Alert(true)

        }
        setLoading(false)
    }

    const Createpos = async () => {
        setLoading(true)
        console.log('llll')
        const data = {}
        const { responseJson, err } = await requestPostApi(connect_edit_post + id, data, 'PUT', User.token)

        console.log('the edit post', responseJson.post.post_description)
        if (responseJson.success == 1) {
            // setUserid(nameAgeList[0].rest.userid)

            setdescrbe(responseJson.post.post_description)
            // setLoading(false)
            //Toast.show({ text1: responseJson.headers.message });

        } else {

            setalert_sms(err)
            setMy_Alert(true)

        }
        setLoading(false)
    }

    // const changeProfileImg = async (image) => {
    //     console.log('kkkkkkkk---------------');
    //     setLoading(true)
    //     const feedBackData = new FormData();
    //     console.log('image--------?????????????>', image);
    //     ;

    //     console.log('formdata-------->', JSON.stringify(feedBackData))
    //     try {
    //         axios({
    //             url: "http://54.153.75.225/backend/api/v1/connect/people/update-post/id",
    //             method: 'PUT',
    //             data: feedBackData,
    //             headers: {
    //                 'Content-Type': 'multipart/form-data',
    //                 "Authorization": `Bearer ${User.token}`,
    //                 Accept: '*/*',
    //             }
    //         },)
    //             .then(function (response) {
    //                 // setIsLoading(false)
    //                 setLoading(false)
    //                 console.log('res of submition------>', response.data)
    //                 if (response.data.status === true) {
    //                     console.log('user edit jsonValue', jsonValue);
    //                 }
    //             })
    //     } catch (error) {
    //         setLoading(false)
    //         // setIsLoading(false)
    //         // alert("An error has occurred");
    //         console.warn(error, '--------------------------', error.response.data)
    //     }
    // }

    return (
        <SafeAreaView scrollEnabled={scrollEnabled} style={{ backgroundColor: '#F8F8F8' }}>
            <ScrollView>
                <HomeHeaderRoundBottom height={80} paddingHorizontal={15} backgroundColor='#fff'
                    press1={() => { props.navigation.goBack() }} img1={require('../../../assets/images/events_arrow.png')} img1width={25} img1height={20}
                    press2={() => { }} title2={'Edit Post'} fontWeight={'500'} img2height={20} color='#455A64'
                    press3={() => { }} img3width={25} img3height={25} borderBottomLeftRadius={25} borderBottomRightRadius={25} />
                <View style={{ width: '90%', alignSelf: 'center', marginTop: 20 }}>



                    <View style={{ width: '100%', alignSelf: 'center', marginTop: 20, backgroundColor: '#F8F8F8' }}>

                        <View style={styles.rowWithImageView}>

                            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                {User.profile_image_url ?
                                    <Image source={{
                                        uri: User.profile_image_url
                                    }} style={{
                                        width: 50,
                                        height: 50,
                                        borderRadius: 100 / 2,
                                    }} /> : <Image
                                        source={require('../../../assets/blankProfile.png')}
                                        style={{ width: 35, height: 35, borderRadius: 40 }}
                                    />}
                                {/* <Text style={{ fontSize: 14, fontWeight: '600', color: '#455A64', marginLeft: 10 }}>Aayav Nadkarni</Text> */}
                                <Text style={{ fontSize: 14, fontWeight: '600', color: '#455A64', marginLeft: 10 }}>{`${User.first_name} ${User.last_name}`}</Text>
                            </View>

                            <TouchableOpacity onPress={() => { props.navigation.navigate('PeopleProfileScreen') }} style={styles.eyeView}>
                                <Image source={require('../../../assets/images/people-eye-image.png')} />
                                <Text style={{ fontSize: 14, fontWeight: '400', color: '#fff', marginLeft: 10 }}>View Profile</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{ marginTop: 10, marginBottom: 20 }}>
                            <TextInput
                                value={descrbe}
                                onChangeText={(e) => setdescrbe(e)}
                                placeholder={`What's on your mind`}
                                placeholderTextColor="#bbbbbb"
                                multiline={true}
                                textAlignVertical='top'
                                // maxLength={500}
                                // keyboardType="number-pad"
                                autoCapitalize='none'
                                style={[styles.input]}
                            />
                        </View>

                        {/* <LinearGradient
                            colors={['rgba(255, 255, 255, 1)', 'rgba(249, 249, 249, 1)']}
                            style={styles.uploadImageView}>
                            <TouchableOpacity onPress={() => { openLibrary() }} style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <View style={styles.imageView}>
                                    <Image source={require('../../../assets/images/people-upload-photo-video.png')} />
                                </View>
                                <Text style={styles.imageText}>Photo/Video</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { openLibrary() }}>
                                <Image source={require('../../../assets/images/people-right-arrow.png')} />
                            </TouchableOpacity>

                        </LinearGradient>

                        <LinearGradient
                            colors={['rgba(255, 255, 255, 1)', 'rgba(249, 249, 249, 1)']}
                            style={[styles.uploadImageView, { marginTop: 10 }]}>
                            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => { requestCameraPermission() }}>
                                <View style={styles.imageView}>
                                    <Image source={require('../../../assets/images/people-camera-image.png')} />
                                </View>
                                <Text style={styles.imageText}>Camera</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { requestCameraPermission() }}>
                                <Image source={require('../../../assets/images/people-right-arrow.png')} />
                            </TouchableOpacity>
                        </LinearGradient> */}

                    </View>






                </View>
                <View style={{ height: 100 }} />
                <View style={{ width: '90%', height: 60, flexDirection: 'row', justifyContent: 'space-between', bottom: 20, alignSelf: 'center', zIndex: 999 }}>
                    <MyButtons title="Edit" height={50} width={'100%'} borderRadius={5} press={() => { Createpost() }} fontSize={13}
                        titlecolor={Mycolors.BG_COLOR} marginVertical={0} backgroundColor={'#0089CF'} />

                </View>
            </ScrollView>

            {loading ?
                <Loader />
                : null}
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
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
    rowWithImageView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 10,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 5,
        shadowOpacity: 0.05,
        elevation: 2,
    },
    eyeView: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#0089CF',
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 12,
    },
    input: {
        paddingLeft: 15,
        width: '100%',
        fontSize: 14,
        backgroundColor: '#fff',
        height: 200,
        borderRadius: 5,
        paddingHorizontal: 15,
        paddingVertical: 10,
        color: Mycolors.Black,
        borderRadius: 10,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 5,
        shadowOpacity: 0.05,
        elevation: 2,
    },
    uploadImageView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 5,
        shadowOpacity: 0.03,
        elevation: 1,
    },
    imageView: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F8F8F8',
        padding: 10,
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    imageText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#455A64',
        marginLeft: 10
    }
});
export default EditPost 