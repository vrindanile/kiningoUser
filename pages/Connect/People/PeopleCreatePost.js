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
import { View, Image, Text, StyleSheet, SafeAreaView, TextInput, FlatList, Alert, TouchableOpacity, ScrollView, ImageBackground, Keyboard, Platform, Dimensions, PermissionsAndroid, Button } from 'react-native';
import HomeHeaderRoundBottom from '../../../component/HomeHeaderRoundBottom';
import SearchInput2 from '../../../component/SearchInput2';
import SearchInputEnt from '../../../component/SearchInputEnt';
import SerchInput from '../../../component/SerchInput';
import { dimensions, Mycolors } from '../../../utility/Mycolors';
import { ImageSlider, ImageCarousel } from "react-native-image-slider-banner";
// import ImagePicker from 'react-native-image-picker'
import MyButtons from '../../../component/MyButtons';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import Modal from 'react-native-modal';
import Toast from 'react-native-toast-message'
import LinearGradient from 'react-native-linear-gradient'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import VideoPlayer from 'react-native-video-player'

import Loader from '../../../WebApi/Loader';
import { baseUrl, shop_eat_cart, user_payment_method, shop_eat_orders, shop_eat_cart_book_dining, shop_eat_cart_book_table, shop_eat_cart_id, shop_eat_business_id, shop_eat_menu_userid, requestPostApi, requestGetApi, shop_eat, connect_people_create_post, connect_people_newPost } from '../../../WebApi/Service'
import { useSelector, useDispatch } from 'react-redux';
import { androidCameraPermission } from './Permissions';
import axios from 'axios';
import Video from 'react-native-video';
import { log } from 'react-native-reanimated';
import DocumentPicker from 'react-native-document-picker';
//mport { setCurentAdderss } from 'src/redux/actions/latLongAction';
import ImagePicker from 'react-native-image-crop-picker';
const image1 = require('../../../assets/images/people-following-person.png')

const PeopleCreatePost = (props) => {
  const User = useSelector(state => state.user.user_details)
  const windowWidth = Dimensions.get('window').width;
  const imageWidth = (windowWidth - 40) / 2; // Adjust the spacing and image width as needed

  console.log("user", User);
  const [searchValue, setsearchValue] = useState('')
  const [scrollEnabled, setScrollEnabled] = useState(false)
  const myTextInput = useRef()
  const [userMessage, setUserMessage] = useState('')
  const [multiSliderValue, setMultiSliderValue] = useState([0, 100])
  const [showChooseMilesModal, setShowChooseMilesModal] = useState(false)
  const [capturedVideo, setcapturedVideo] = useState('')
  const [firstimagevalue, setFirstimagevalue] = useState('');
  const [videoURI, setVideoURI] = useState(null);
  const [modlevisual, setmodlevisual] = useState(false);
  const [pick1, setpick1] = useState('')
  const [filepath1, setfilepath1] = useState(null)
  const [My_Alert, setMy_Alert] = useState(false)
  const [alert_sms, setalert_sms] = useState('')
  const [selectedimageindex, setSelectedImageIndex] = useState(null);
  const [loading, setLoading] = useState(false);
  const [disableContainer, setDisableContainer] = useState(false);

  const [descrbe, setdescrbe] = useState('');
  const [image, setImage] = useState([])
  console.log('my state', image);
  const [images, setImages] = useState([]);
  const [allimages, setAllImages] = useState([]);
  const [pick, setPick] = useState(null);
  const [filepath, setFilepath] = useState(null);
  const [videoSelected, setVideoSelected] = useState(false);
  const [videos, setVideos] = useState([]);
  const [currentSelection, setcurrentSelection] = useState('All')
  const [disableImageSelection, setDisableImageSelection] = useState(false);
  const [disableVideoSelection, setDisableVideoSelection] = useState(false);
  const [idArray, setidArray] = useState([])
  const [photo, setPhoto] = useState('')
  const [disableButton, setDisableButton] = useState(false);
  const [picker, setPicker] = useState('')
  const [videoInfo, setVideoInfo] = useState([]);
  const [isVideoSelected, setIsVideoSelected] = useState(false);
  const [videoUri, setVideoUri] = useState(null);
  useEffect(() => {
    console.log('image111---->>>', image);
  }, [])

  ///////modal view
  const openModal = (index) => {
    console.log('indexx', index);
    setSelectedImageIndex(index);

    setmodlevisual(true);
  };
  // my photooo  function

  const opencamera = () => {
    setmodlevisual(false);

    const options = {
      mediaType: 'photo',
      cameraType: 'back',
      saveToPhotos: true,
    };

    launchCamera(options, (response) => {
      if (!response.didCancel && !response.errorCode) {
        const photo = {
          uri: response.assets[0].uri,
          type: response.assets[0].type,
          name: `/${response.assets[0].fileName}`,
        };
        Savepost(photo)
        setImage((prevImages) => [...prevImages, photo]);
        setImages((prevImages) => {
          const updatedImages = [...prevImages];
          updatedImages[selectedimageindex] = photo;
          return updatedImages;
        });
      }
    });
  };

  const openLibrary = async () => {

    setmodlevisual(false);

    const options = {
      mediaType: 'photo',
    };

    launchImageLibrary(options, (response) => {
      if (!response.didCancel && !response.errorCode) {
        console.log(response, 'my response of image');
        const myImage = {
          uri: response.assets[0].uri,
          type: response.assets[0].type,
          name: response.assets[0].fileName,
          name: response.assets[0].fileName.slice(
            response.assets[0].fileName.lastIndexOf('/'),
            response.assets[0].fileName.length,
          )
        };
        const newImageUri = "file://" + myImage.uri.replace("file:///", "");
        const newPhoto = {
          ...myImage,
          uri: newImageUri,
        };

        console.log(newPhoto, 'myImage');

        console.log(newPhoto, 'myImage');
        setPhoto(newPhoto)
        //   setImage((prevImages) => [...prevImages, myImage]);
        var abc = image
        abc.push(newPhoto)
        setImage(abc)
        console.log(myImage, 'response---------------------------');

        Savepost(myImage)
        setImages((prevImages) => {
          const updatedImages = [...prevImages];
          updatedImages[selectedimageindex] = myImage;
          return updatedImages;
        });
      }
    });
  };
  // const onSelectImage = async () => {
  //   const permissionStatus = await androidCameraPermission()
  //   if (permissionStatus || Platform.OS == 'ios') {
  //     Alert.alert(
  //       'choose Picture',
  //       'choose an option',
  //       [
  //         { text: 'camera', onPress: onCamera },
  //         { text: 'Gallery', onPress: onGallery },
  //         { text: 'Cancel', onPress: () => { } }
  //       ]
  //     )
  //   } else {
  //     Alert.alert(
  //       'choose Picture',
  //       'choose an option',
  //       [
  //         { text: 'camera', onPress: onCamera },
  //         { text: 'Gallery', onPress: onGallery },
  //         { text: 'Cancel', onPress: () => { } }
  //       ]
  //     )
  //   }
  // }
  // const onCamera = () => {
  //   ImagePicker.openCamera({
  //     width: 300,
  //     height: 400,
  //     cropping: true,
  //   }).then(image => {
  //     console.log(image);
  //   });
  // }
  //////save position: 

  const Savepost = async (img) => {
    console.log("pick UPLOAD", pick);
    const formData = new FormData();
    formData.append('file_position', selectedimageindex + 1);
    formData.append('file', img);
    const headers = {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${User.token}`,
    };
    const url = 'http://54.153.75.225/backend/api/v1/connect/people/save-file';

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: formData,
      });

      const responseJson = await response.json();
      console.log(responseJson, 'my response');
      if (responseJson.headers.success == 1) {
        //  props.navigation.goBack('')
        console.log(responseJson.body.id, 'my id')
        setidArray([...idArray, responseJson.body.id])

        console.log('array----->', idArray);
        Toast.show({ text1: responseJson.headers.message });
      } else {

        setalert_sms(err)
        setMy_Alert(true)
      }


    } catch (error) {
      console.log('Error uploading data:', error);
    }
    // if (pick === '' || descrbe === '') {
    //   Alert.alert('Please select all required fields');
    // } else {
    //   const formData = new FormData();
    //   formData.append('post_description', descrbe);
    //   formData.append('file', {
    //     uri: pick.uri,
    //     type: pick.type,
    //     name: pick.name,
    //   });

    //   setLoading(true);
    //   console.log('data', formData);
    //   const { responseJson, err } = await requestPostApi(connect_people_create_post, formdata, 'POST', User.token)
    //   setLoading(false)
    //   console.log(responseJson, 'my response');
    //   //   console.log('the Createpost==>>', responseJson)
    //   // Send the formData object to the backend using your preferred method (e.g., Axios, fetch).
    //   // Make sure to handle the response and any errors appropriately.

    //   setLoading(false);
    // }
  }




  /  ///////my real function
  // const openLibrary1 = async () => {

  //   let options = {
  //     // title: 'Video Picker', 
  //     mediaType: 'video',
  //     // storageOptions:{
  //     //   skipBackup:true,
  //     //   path:'images'
  //     // }
  //     durationLimit: 30,
  //     title: 'Select Image/Video',
  //     customButtons: [
  //       {
  //         name: 'customOptionKey',
  //         title: 'Choose Photo from Custom Option'
  //       },
  //     ],
  //     maxWidth: 500,
  //     maxHeight: 500,
  //     storageOptions: {
  //       skipBackup: true,
  //       path: 'images',
  //     },
  //     multiple: false,
  //   };

  //   launchImageLibrary(options, (image) => {
  //     setImage(image)
  //     console.log('my new image state---------->', image);
  //     if (!image.didCancel) {
  //       console.log('the ddd==', image.assets[0].uri)
  //       setVideoSelected(true);
  //       var photo = {
  //         uri: image.assets[0].uri,
  //         type: image.assets[0].type,
  //         name: image.assets[0].fileName
  //       };
  //       // changeProfileImg(image)
  //       console.log("image", photo);
  //       setpick(photo)
  //       setfilepath(image)

  //     }
  //   })


  // }

  // const openLibrary1 = async () => {
  //   let options = {
  //     mediaType: 'video',
  //     durationLimit: 30,
  //     title: 'Select Image/Video',
  //     customButtons: [
  //       {
  //         name: 'customOptionKey',
  //         title: 'Choose Photo from Custom Option'
  //       },
  //     ],
  //     maxWidth: 500,
  //     maxHeight: 500,
  //     storageOptions: {
  //       skipBackup: true,
  //       path: 'images',
  //     },
  //     multiple: false,
  //   };

  //   try {
  //     const image = await launchImageLibrary(options);
  //     if (!image.didCancel) {
  //       console.log('Selected image:', image.assets[0].uri);
  //       setVideoSelected(true);
  //       setDisableContainer(true);
  //       // setFilePath(image.assets[0].uri);
  //     }
  //   } catch (error) {
  //     console.log('Error selecting image:', error);
  //   }
  // };
  // const openImageModal = (index) => {

  //   if (currentSelection == 'All' || currentSelection == 'image') {

  //     openModal(index)
  //   } else {
  //     Toast.show({ text1: 'Delete Video to select image ' });
  //   }
  // }

  const openVideoModal = () => {

    if (picker.length == 0) {

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
      setmodlevisual(true)

    }
    else {
      Toast.show({ text1: 'Delete Video to select image ' });
    }

  }
  const openLibrary1 = async () => {
    let options = {
      mediaType: 'video',
      durationLimit: 30,
      title: 'Select Video',
      customButtons: [
        {
          name: 'customOptionKey',
          title: 'Choose Video from Custom Option',
        },
      ],
      maxWidth: 500,
      maxHeight: 500,


    };

    try {
      launchImageLibrary(options, (response) => {
        if (!response.didCancel && !response.errorCode) {
          const video = {
            uri: response.assets[0].uri,
            type: response.assets[0].type,
            name: response.assets[0].fileName,
          };

          console.log('Selected video:', video);
          setVideos([video]);
          Savepost(video)
          // Handle the selected video here
        }
      });
    } catch (error) {
      console.log('Error selecting video:', error);
    }
  };

  const ff = async () => {
    console.log('kkkkk');
  }
  // const pickvideo = async () => {

  //   let options = {
  //     title: 'Select Image',
  //     mediaType: 'video',
  //     customButtons: [
  //       {
  //         name: 'customOptionKey',
  //         title: 'Choose Photo from Custom Option'
  //       },
  //     ],
  //     storageOptions: {
  //       skipBackup: true,
  //       path: 'images',
  //     },
  //   };

  //   ImagePicker.showImagePicker(
  //     options,

  //     response => {
  //       console.log('pick video');
  //       if (response.didCancel) {
  //         console.log('User cancelled video picker');
  //       } else if (response.error) {
  //         console.log('ImagePicker Error: ', response.error);
  //       } else if (response.customButton) {
  //         console.log('User tapped custom button: ', response.customButton);
  //       } else {
  //         // You can access the selected video using the following properties:
  //         console.log('Video path:', response.path);
  //         console.log('Video URI:', response.uri);
  //         console.log('Video type:', response.type);
  //         console.log('Video duration:', response.duration);
  //         console.log('Video size:', response.fileSize);
  //       }
  //     }
  //   );
  // }
  // const openLibrary1 = async () => {
  //   let options = {
  //     mediaType: 'video',
  //     durationLimit: 30,
  //     title: 'Select Video',
  //     customButtons: [
  //       {
  //         name: 'customOptionKey',
  //         title: 'Choose Video from Custom Option'
  //       },
  //     ],
  //     maxWidth: 500,
  //     maxHeight: 500,
  //     storageOptions: {
  //       skipBackup: true,
  //       path: 'videos',
  //     },
  //     multiple: false,
  //   };

  //   try {
  //     const video = await launchImageLibrary(options);

  //     if (!video.didCancel) {
  //       console.log('Selected vide:', typeof (video.assets[0]));

  //       setVideos([video.assets[0]]);
  //       setDisableContainer(true);
  //       setDisableImageSelection(true); // Disable image selection after video is selected
  //     }
  //   } catch (error) {
  //     console.log('Error selecting video:', error);
  //   }
  // };
  const deleteImage = (index) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
    setDisableContainer(false);
    { updatedImages.length == 0 ? setcurrentSelection('All') : null }
  };

  const DeleteProfileImages = async (id) => {
    // console.log("DeleteProfileImages=>", id);
    setLoading(true);

    const { responseJson, err } = await requestPostApi(
      connect_dating_delete_profile_image + id,
      "",
      "DELETE",
      User.token
    );
    setLoading(false);
    // console.log("the res==>>DeleteProfileImages=>", responseJson);
    if (responseJson.headers.success == 1) {
      // GetProfileImages()
      // console.log("the res==>>GetProfileImages", responseJson.body);

    } else {
      setalert_sms(err);
      setMy_Alert(true);
    }

  };

  // const Createpost = async () => {
  //   console.log('describe', descrbe);
  //   const formData = new FormData();
  //   console.log('my ')
  //   formData.append('post_description', descrbe);
  //   console.log('lll')
  //   // if (image.length > 0) {
  //   //   console.log(image, 'image');
  //   //   image.map((item, index) => {
  //   // if (image.length > 0) {
  //   //   image.map((item, index) => {
  //   //     const imageName = item.path.slice(
  //   //       item.path.lastIndexOf('/'),
  //   //       item.path.length,
  //   //     );
  //   //     formData.append(`files[]`, {
  //   //       name: imageName,
  //   //       type: item.mime,
  //   //       uri: item.path,
  //   //     });
  //   //   });
  //   // }

  //   //     formData.append('file' + index, item);
  //   //     console.log(image, 'item----')
  //   //   });
  //   // }
  //   console.log(image, 'photo check');
  //   // for (let i = 0; i < image.length; i++) {
  //   //   console.log(image.assets[0], 'kkkkkkjjjj')
  //   //   formData.append('files', image[i])
  //   // }
  //   image.forEach((item, i) => {
  //     // formData.append("files", {
  //     //   uri: item.uri,
  //     //   type: item.type,
  //     //   name: item.name

  //     // });
  //     // formData.append('files', {
  //     //   uri: item.uri,
  //     //   type: `image/${item.type}`,
  //     //   name: '\'' + item.name + '\'',
  //     // })


  //     const imageName = item.path.slice(
  //       item.path.lastIndexOf('/'),
  //       item.path.length,
  //     );
  //     formData.append(`files[]`, {
  //       name: imageName,
  //       type: item.mime,
  //       uri: item.path,
  //     });
  //   });



  //   // formData.append('files', image);
  //   console.log('formdata', formData);

  //   const headers = {
  //     Accept: 'application/json',
  //     'Content-Type': 'multipart/form-data',
  //     'Authorization': `Bearer ${User.token}`,
  //     Accept: '*/*',
  //   };
  //   const url = 'http://54.153.75.225/backend/api/v1/connect/people/add-new-post';

  //   try {
  //     console.log('try block');
  //     const response = await fetch(url, {
  //       method: 'POST',
  //       headers,
  //       body: formData,
  //     });
  //     const responseJson = await response.json();
  //     console.log(responseJson, 'my response');
  //     if (responseJson.headers.success == 1) {
  //       props.navigation.goBack('')
  //       Toast.show({ text1: responseJson.headers.message });
  //     } else {
  //       setalert_sms(err)
  //       setMy_Alert(true)
  //     }
  //   } catch (error) {
  //     console.log('Error uploading data:', error);
  //   }
  // }


  const Createpost = async images => {

    try {
      const data = new FormData();
      console.log('my sate updated', currentSelection);
      data.append(`post_description`, descrbe)


      // const imageName = videoInfo[0].uri.slice(
      //   videoInfo[0].uri.lastIndexOf('/'),
      //   videoInfo[0].uri.length,
      // );
      if (currentSelection == 'video') {
        data.append(`files`, {
          name: videoInfo[0].name,
          type: videoInfo[0].type,
          uri: videoInfo[0].uri,
        });
      } else {
        if (picker.length > 0) {
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
      }
      console.log(data, 'data');
      const { response, status } = await axios

        .post(
          'http://54.153.75.225/backend/api/v1/connect/people/add-new-post',
          data,

          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${User.token}`,
              Accept: '*/*',
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
      console.log(response, status);
      if (status === true) {
        props.navigation.navigate('PeopleHome')
      } else {
        console.log(response.headers.message);
      }

    } catch (error) {
      console.error('error in TestingUploading', error);
    }
  };







  // const Createpost = async e => {
  //   console.log('buttttonnnnnn----------');

  //   const feedBackData = new FormData();
  //   console.log('image-------->', image);
  //   if (pick.length > 0) {
  //     image.map((e, index) => {
  //       var imageName = e.path.slice(
  //         e.path.lastIndexOf('/'),
  //         e.path.length,
  //       );
  //       feedBackData.append(`image[${index}]`, {
  //         name: imageName,
  //         type: e.mime,
  //         uri: e.path,
  //       });
  //     });
  //   }
  //   feedBackData.append('category', 'envelope');
  //   feedBackData.append('description', email);
  //   feedBackData.append('pickup_address', `${googleLatLng.lat}, ${googleLatLng.lng}`);
  //   feedBackData.append('destination_address', `${destiGoogleLatLng.lat}, ${destiGoogleLatLng.lng}`);
  //   feedBackData.append('is_type', id);

  //   console.warn('formdata-------->', JSON.stringify(feedBackData))




  //   try {
  //     const usertkn = await AsyncStorage.getItem("authToken");
  //     console.log('userToken--------------->', usertkn);
  //     axios({
  //       url: "https://nileprojects.in/roadman/dev/api/request-category-package",
  //       method: 'POST',
  //       data: feedBackData,
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //         "Authorization": `Bearer ${usertkn}`,
  //         Accept: '*/*',
  //       }
  //     },)
  //       .then(function (response) {
  //         console.log('iiiiiiiiiiiiiiii');
  //         setLoading(false)
  //         console.log('------------');
  //         console.log('response data----->', response.data)
  //         console.log('----ll-----');
  //         if (response.data.status === true) {
  //           console.log('jjjjj');
  //           navigation.navigate('ReciverDetail', {
  //             text: response.data.data.pickup_order_id,

  //             id: id
  //           })
  //         }
  //         else {
  //           alert(response.data.message)
  //           console.log(error)
  //         }
  //       })

  //   } catch (error) {
  //     setLoading(false)
  //     // setIsLoading(false)
  //     // alert("An error has occurred");
  //     console.warn(error, '--------------------------', error.response.data)


  //   }


  // }


  // const Createpost = async () => {
  //   var myHeaders = new Headers();
  //   myHeaders.append(
  //     'Accept', 'application/json',
  //     'content-type', 'multipart/form-data');
  //   myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiI0NyIsImlhdCI6MTY4NjMxNDkyNSwiZXhwIjoxNzE3ODUwOTI1fQ.4d4lpWtyTUImM1idQDI6zDHTuVBrKHBKV0DaRshzs0w");

  //   var formdata = new FormData();
  //   formdata.append("files", image);
  //   // formdata.append("files", fileInput.files[0], "/C:/Users/VRINDA GUPTA/Downloads/fotor_2023-6-6_19_12_39.jpg");
  //   formdata.append("post_description", "image with longer name");

  //   var requestOptions = {
  //     method: 'POST',
  //     headers: myHeaders,
  //     body: formdata,
  //     redirect: 'follow'
  //   };
  //   console.log(requestOptions, 'requestOptions');
  //   fetch("http://54.153.75.225/backend/api/v1/connect/people/add-new-post", requestOptions)
  //     .then(response => response.text())

  //     .then(result => console.log(result, 'result'))

  //     .catch(error => console.log('error', error));


  // }



  // const Createpost = async () => {

  //   // formData.append('post_description', descrbe);
  //   // console.log("DISLIKE CLICK:::", isLiked);

  //   setLoading(true)
  //   var data = {
  //     "file_type": "image",
  //     "post_description": descrbe,
  //     "status": 1,
  //     "filesId": idArray
  //   }
  //   console.log('====================================');
  //   console.log(data);
  //   console.log('====================================');
  //   const { responseJson, err } = await requestPostApi(connect_people_newPost, data, 'POST', User.token)
  //   setLoading(false)
  //   console.log('the res==>>', responseJson)
  //   if (responseJson.headers.success == 1) {
  //     // PeopleHome()
  //     // Toast.show({ text1: responseJson.headers.message });
  //   } else {

  //     setalert_sms(err)
  //     setMy_Alert(true)
  //   }
  // }

  const deleteVideo = (index) => {
    const updatedVideos = [...videos];
    updatedVideos.splice(index, 1);
    setVideos(updatedVideos);

    { updatedVideos.length == 0 ? setcurrentSelection('All') : null }
  };

  const changeProfileImg = async (image) => {
    console.log('kkkkkkkk---------------');
    setLoading(true)
    const feedBackData = new FormData();
    console.log('image--------?????????????>', image);
    ;
    if (image != '') {
      console.log('image???????????????');
      var imageName = image.path.slice(
        image.path.lastIndexOf('/'),
        image.path.length,
      );
      console.log('jjjjj');
      feedBackData.append('post_description', descrbe);
      feedBackData.append('file', {
        name: imageName,
        type: image.mime,
        uri: image.path,
      });
    }
    console.log('formdata-------->', JSON.stringify(feedBackData))
    try {
      axios({
        url: "http://54.153.75.225/backend/api/v1/connect/people/add-new-post",
        method: 'POST',
        data: feedBackData,
        headers: {
          'Content-Type': 'multipart/form-data',
          "Authorization": `Bearer ${User.token}`,
          Accept: '*/*',
        }
      },)
        .then(function (response) {
          // setIsLoading(false)
          setLoading(false)
          console.log('res of submition------>', response.data)
          if (response.data.status === true) {
            console.log('user edit jsonValue', jsonValue);
          }
        })
    } catch (error) {
      setLoading(false)
      // setIsLoading(false)
      // alert("An error has occurred");
      console.warn(error, '--------------------------', error.response.data)
    }
  }
  const onGallery = async () => {
    console.log('picker');
    try {
      let value = await ImagePicker.openPicker({
        width: 1080,
        height: 1080,
        cropping: true,
        mediaType: 'photo',
        compressImageQuality: 1,
        compressImageMaxHeight: 1080 / 2,
        compressImageMaxWidth: 1080 / 2,
        multiple: true
      }).then(images => {
        console.log('---------then block------->', images);
        setPicker(images);
        setcurrentSelection('image')
        setmodlevisual(false)
      });
    } catch (error) {
      console.log('error in openLibrary', error);
    }
  };

  //////image picker 
  const onSelectImage = async () => {

    const permissionStatus = await androidCameraPermission()
    if (permissionStatus) {
      console.log('jjjjjalert');
      Alert.alert(
        'choose Picture',
        'choose an option',
        [
          { text: 'camera', onPress: onCamera },
          { text: 'Gallery', onPress: onGallery },
          { text: 'Cancel', onPress: () => { } }
        ]
      )
    } else {
      Alert.alert(
        'choose Picture',
        'choose an option',
        [
          { text: 'camera', onPress: onCamera },
          { text: 'Gallery', onPress: onGallery },
          { text: 'Cancel', onPress: () => { } }
        ]
      )
    }
  }
  const onCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image)
      setPicker(image);
      setcurrentSelection('image')
      setmodlevisual(false)

    });
  }

  const handleVideoUpload = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.video],
      });

      // The selected video can be accessed using 'res.uri'
      console.log('Selected Video URI:', res[0].uri);
      setVideoUri(res[0].uri);
      setVideoInfo(res);
      setIsVideoSelected(true);

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










  return (
    <SafeAreaView scrollEnabled={scrollEnabled} style={{ backgroundColor: '#F8F8F8' }}>
      <ScrollView>
        <HomeHeaderRoundBottom height={80} paddingHorizontal={15} backgroundColor='#fff'
          press1={() => { props.navigation.goBack() }} img1={require('../../../assets/images/events_arrow.png')} img1width={25} img1height={20}
          press2={() => { }} title2={'Create Post'} fontWeight={'500'} img2height={20} color='#455A64'
          press3={() => { }} img3width={25} img3height={25} borderBottomLeftRadius={25} borderBottomRightRadius={25} />
        <View style={{ width: '90%', alignSelf: 'center', marginTop: 20 }}>



          <View style={{ width: '100%', alignSelf: 'center', marginTop: 20, backgroundColor: '#F8F8F8' }}>

            <View style={styles.rowWithImageView}>

              <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                {/* <Image source={image1} /> */}
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

            <View style={{ marginTop: 10, }}>
              <TextInput
                //  value={reson}
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

            {/* <View style={styles.container}>
              <View style={styles.row}>
                {[...Array(2)].map((_, index) => (
                  <View key={index} style={[styles.imageContainer, { marginRight: index === 0 ? 10 : 0 }]}>
                    {images[index] ? (
                      <Image source={{ uri: images[index].uri }} style={styles.image} />
                    ) : (
                      <TouchableOpacity onPress={() => openModal(index)} style={styles.plusButton}>
                        <Image
                          source={require('../../../assets/images/dating-upload-plus-icon.png')}
                          style={styles.plusIcon}
                        />
                      </TouchableOpacity>
                    )}
                  </View>
                ))}
              </View>
              <View style={styles.row}>
                {[...Array(3)].map((_, index) => (
                  <View key={index + 2} style={[styles.imageContainer, { marginRight: index !== 2 ? 10 : 0 }]}>
                    {images[index + 2] ? (
                      <Image source={{ uri: images[index + 2].uri }} style={styles.image} />
                    ) : (
                      <TouchableOpacity onPress={() => openModal(index + 2)} style={styles.plusButton}>
                        <Image
                          source={require('../../../assets/images/dating-upload-plus-icon.png')}
                          style={styles.plusIcon}
                        />
                      </TouchableOpacity>
                    )}
                  </View>
                ))}
              </View>
            </View> */}
            {/* <View style={styles.container}>
              <View style={styles.row}>
                {[...Array(3)].map((_, index) => (
                  <View key={index + 2} style={[styles.imageContainer, index === 2 && styles.lastImageContainer]}>
                    {images[index + 2] ? (
                      <Image source={{ uri: images[index + 2].uri }} style={styles.image} />
                    ) : (
                      <TouchableOpacity onPress={() => openModal(index + 2)} style={styles.plusButton}>
                        <Image
                          source={require('../../../assets/images/dating-upload-plus-icon.png')}
                          style={styles.plusIcon}
                        />
                      </TouchableOpacity>
                    )}
                  </View>
                ))}
              </View>
            </View> */}

            {/* correct code */}
            {/* <View style={styles.container}>
              <View style={styles.row}>
                {[...Array(2)].map((_, index) => (
                  <View key={index} style={[styles.imageContainer, { marginRight: index === 0 ? 10 : 0 }]}>
                    {images[index] ? (
                      <ImageBackground source={{ uri: images[index].uri }} style={styles.image} />
                    ) : (
                      <TouchableOpacity onPress={() => openModal(index)} style={styles.plusButton}>
                        <Image
                          source={require('../../../assets/images/dating-upload-plus-icon.png')}
                          style={styles.plusIcon}
                        />
                      </TouchableOpacity>
                    )}
                  </View>
                ))}
              </View>
              <View style={styles.row}>
                {[...Array(3)].map((_, index) => (
                  <View
                    key={index + 2}
                    style={[styles.imageContainer, { marginRight: index !== 2 ? 10 : 0, flex: index === 2 ? 0.67 : 1 }]}
                  >
                    {images[index + 2] ? (
                      <ImageBackground source={{ uri: images[index + 2].uri }} style={styles.image} />
                    ) : (
                      <TouchableOpacity onPress={() => openModal(index + 2)} style={styles.plusButton}>
                        <Image
                          source={require('../../../assets/images/dating-upload-plus-icon.png')}
                          style={styles.plusIcon}
                        />
                      </TouchableOpacity>
                    )}
                  </View>
                ))}
              </View>
            </View> */}

            {/* <View style={styles.container}>
              <View style={styles.row}>
                {[...Array(2)].map((_, index) => (
                  <View key={index} style={[styles.imageContainer, { marginRight: index === 0 ? 10 : 0 }]}>
                    {images[index] ? (
                      <ImageBackground source={{ uri: images[index].uri }} style={styles.image}>
                        <TouchableOpacity onPress={() => deleteImage(index)} style={styles.deleteButton}>
                          <Image
                            source={require('../../../assets/cutRed.png')}
                            style={styles.deleteIcon}
                          />
                        </TouchableOpacity>
                      </ImageBackground>
                    ) : (
                      <TouchableOpacity onPress={() => openModal(index)} style={styles.plusButton}>
                        <Image
                          source={require('../../../assets/images/dating-upload-plus-icon.png')}
                          style={styles.plusIcon}
                        />
                      </TouchableOpacity>
                    )}
                  </View>
                ))}
              </View>
              <View style={styles.row}>
                {[...Array(3)].map((_, index) => (
                  <View
                    key={index + 2}
                    style={[styles.imageContainer, { marginRight: index !== 2 ? 10 : 0, flex: index === 2 ? 0.67 : 1, position: 'relative' }]}
                  >
                    {images[index + 2] ? (
                      <ImageBackground source={{ uri: images[index + 2].uri }} style={styles.image}>
                        <TouchableOpacity onPress={() => deleteImage(index + 2)} style={styles.deleteButton}>
                          <Image
                            source={require('../../../assets/People/BookmarkSimple.png')}
                            style={styles.deleteIcon}
                          />
                        </TouchableOpacity>
                      </ImageBackground>
                    ) : (
                      <TouchableOpacity onPress={() => openModal(index + 2)} style={styles.plusButton}>
                        <Image
                          source={require('../../../assets/images/dating-upload-plus-icon.png')}
                          style={styles.plusIcon}
                        />
                      </TouchableOpacity>
                    )}
                    {images[index + 2] && (
                      <TouchableOpacity onPress={() => deleteImage(index + 2)} style={styles.deleteButton}>
                        <Image
                          source={require('../../../assets/People/BookmarkSimple.png')}
                          style={styles.deleteIcon}
                        />
                      </TouchableOpacity>
                    )}
                  </View>
                ))}
              </View>
            </View> */}



            {/* my new design scrollView */}
            {/* <ScrollView horizontal showsHorizontalScrollIndicator={false} >
              <View style={styles.container}>
                <View style={styles.row}>
                  {[...Array(5)].map((_, index) => (
                    <View
                      key={index}
                      style={[
                        styles.imageContainer,
                        { marginRight: index !== 4 ? 10 : 0, flex: index === 4 ? 0.67 : 1, position: 'relative' },
                      ]}
                    >
                      {images[index] ? (
                        <ImageBackground source={{ uri: images[index].uri }} style={styles.image}>
                          <TouchableOpacity onPress={() => deleteImage(index)} style={styles.deleteButton}>
                            <Image source={require('../../../assets/cutRed.png')} style={styles.deleteIcon} />
                          </TouchableOpacity>
                        </ImageBackground>
                      ) : (
                        <TouchableOpacity onPress={() => openModal(index)} style={styles.plusButton}>
                          <Image
                            source={require('../../../assets/images/dating-upload-plus-icon.png')}
                            style={styles.plusIcon}
                          />
                        </TouchableOpacity>
                      )}
                      {images[index] && (
                        <TouchableOpacity onPress={() => deleteImage(index)} style={styles.deleteButton}>
                          <Image source={require('../../../assets/cutRed.png')} style={styles.deleteIcon} />
                        </TouchableOpacity>
                      )}
                    </View>
                  ))}
                </View>
              </View>
            </ScrollView> */}

            {/* final with designing part */}
            <View style={{ marginTop: 23 }}>
              <Text style={{ fontSize: 16, fontWeight: '600', color: '#455A64', marginLeft: 8 }}>Select Image </Text>
            </View>
            <View style={{

              height: 30
            }}>

              <Text style={{ fontFamily: 'Cera Pro', fontWeight: '400', fontSize: 13, color: '#0F265B', marginLeft: 8 }}>(You can only select 5 imges)</Text>
            </View>
            <TouchableOpacity
              //onPress={openImagePicker}
              // onPress={onSelectImage}
              onPress={openImageModal}
            >

              <View style={{ borderRadius: 6, left: -3, marginVertical: 0, marginLeft: 10 }}>
                <TouchableOpacity

                  // onPress={onSelectImage}
                  onPress={openImageModal}

                  style={styles.plusButton}>
                  <Image
                    source={require('../../../assets/images/dating-upload-plus-icon.png')}
                    style={styles.plusIcon}
                  />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
            {/* <ScrollView style={{ width: '100%' }}> */}
            {/* <View style={{ paddingVertical: '3%', alignSelf: 'center', flexDirection: 'row', }} >
              {picker.length > 0 ? (
                picker.map((y, index) => {
                  console.log('images  yyyyyyy--------->', y);
                  return (
                    <>
                      < View style={styles.uploadedImageBox}>
                        <Image
                          source={{
                            uri: y?.path ? y?.path : null,
                          }}
                          style={styles.imagePickerStyle}
                        />
                        <TouchableOpacity onPress={() => {
                          const updated = (picker.filter(el => el.path !== y.path))
                          setPicker([...updated])

                        }} style={{ position: 'absolute', marginTop: 76, right: 30 }}>
                          <Image
                            style={{ width: 19, height: 19, }}
                            source={require('../../../assets/cutRed.png')}
                          />
                        </TouchableOpacity>
                      </View>
                    </>
                  )
                }))
                :
                null
              }
            </View> */}
            {/* </ScrollView> */}


            <ScrollView horizontal>
              <View style={{ flexDirection: 'row', paddingVertical: '6%' }}>
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
                          style={styles.deleteButton}
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
                  null
                )}
              </View>
            </ScrollView>
            {/* <View style={styles.container}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.row}>
                  {[...Array(5)].map((_, index) => (
                    <View
                      key={index}
                      style={[
                        styles.imageContainer,
                        { marginRight: index !== 4 ? 10 : 0, flex: index === 4 ? 0.67 : 1 },
                      ]}
                    >
                      {images[index] && (
                        <ImageBackground source={{ uri: images[index].uri }} style={styles.image}>
                          <TouchableOpacity onPress={() => deleteImage(index)} style={styles.deleteButton}>
                            <Image source={require('../../../assets/cutRed.png')} style={styles.deleteIcon} />
                          </TouchableOpacity>
                        </ImageBackground>
                      )}
                      <View style={styles.plusContainer}>
                        {!images[index] && (
                          <TouchableOpacity onPress={() => openImageModal(index)} style={styles.plusButton}>
                            <Image
                              source={require('../../../assets/images/dating-upload-plus-icon.png')}
                              style={styles.plusIcon}
                            />
                          </TouchableOpacity>
                        )}
                      </View>
                      <View style={styles.plusContaine}>
                        {!images[index] && (
                          <TouchableOpacity style={styles.plusButto}>
                            <Image
                              source={require('../../../assets/camera.png')}
                              style={styles.plusIco}
                            />
                          </TouchableOpacity>
                        )}
                      </View>
                    </View>
                  ))}
                </View>
                {images.length > 0 && (
                  <View style={styles.deleteAllContainer}>
                    <TouchableOpacity onPress={() => deleteAllImages()} style={styles.deleteAllButton}>
                      <Image source={require('../../../assets/People/BookmarkSimple.png')} style={styles.deleteAllIcon} />
                    </TouchableOpacity>
                  </View>
                )}
              </ScrollView>
            </View> */}

            {/* <View style={styles.container}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.row}>
                  {[...Array(5)].map((_, index) => (
                    <View
                      key={index}
                      style={[
                        styles.imageContainer,
                        { marginRight: index !== 4 ? 10 : 0, flex: index === 4 ? 0.67 : 1 },
                      ]}
                    >
                      {images[index] && (
                        <ImageBackground source={{ uri: images[index].uri }} style={styles.image}>
                          <TouchableOpacity onPress={() => deleteImage(index)} style={styles.deleteButton}>
                            <Image source={require('../../../assets/cutRed.png')} style={styles.deleteIcon} />
                          </TouchableOpacity>
                        </ImageBackground>
                      )}

                      <View style={styles.plusContainer}>
                        {!images[index] && (
                          <TouchableOpacity onPress={() => openModal(index)} style={styles.plusButton}>
                            <Image
                              source={require('../../../assets/images/dating-upload-plus-icon.png')}
                              style={styles.plusIcon}
                            />
                          </TouchableOpacity>
                        )}
                      </View>
                      <View style={styles.plusContaine}>
                        {!images[index] && (
                          <TouchableOpacity onPress={() => openModal(index)} style={styles.plusButto}>
                            <Image
                              source={require('../../../assets/camera.png')}
                              style={styles.plusIco}
                            />
                          </TouchableOpacity>
                        )}
                      </View>
                    </View>
                  ))}
                </View>
                {images.length > 0 && (
                  <View style={styles.deleteAllContainer}>
                    <TouchableOpacity onPress={() => deleteImage(index)} style={styles.deleteAllButton}>
                      <Image source={require('../../../assets/cutRed.png')} style={styles.deleteAllIcon} />
                    </TouchableOpacity>
                  </View>
                )}
              </ScrollView>
            </View>

            <LinearGradient
              colors={['rgba(255, 255, 255, 1)', 'rgba(249, 249, 249, 1)']}
              style={styles.uploadImageView}>
              <TouchableOpacity onPress={() => { openLibrary1() }} style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={styles.imageView}>
                  <Image source={require('../../../assets/images/people-upload-photo-video.png')} />
                </View>
                <Text style={styles.imageText}>Video</Text>
              </TouchableOpacity>

             


              <TouchableOpacity onPress={() => { openLibrary1() }}>
                <Image source={require('../../../assets/images/people-right-arrow.png')} />
              </TouchableOpacity>

            </LinearGradient> */}

            {/* <View style={styles.container}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={[styles.row, disableContainer && styles.disabledContainer]}>

                  {[...Array(5)].map((_, index) => (
                    <View
                      key={index}
                      style={[
                        styles.imageContainer,
                        { marginRight: index !== 4 ? 10 : 0, flex: index === 4 ? 0.67 : 1 },
                      ]}
                    >
                      {images[index] && (
                        <ImageBackground source={{ uri: images[index].uri }} style={styles.image}>
                          <TouchableOpacity onPress={() => deleteImage(index)} style={styles.deleteButton}>
                            <Image source={require('../../../assets/cutRed.png')} style={styles.deleteIcon} />
                          </TouchableOpacity>
                        </ImageBackground>
                      )}

                      <View style={styles.plusContainer}>
                        {!images[index] && !videoSelected ? ( // Check if image is not selected and video is not selected
                          <TouchableOpacity onPress={() => openModal(index)} style={[styles.plusButton, disableContainer && styles.disabledButton]}
                            disabled={disableContainer}>
                            <Image
                              source={require('../../../assets/images/dating-upload-plus-icon.png')}
                              style={styles.plusIcon}
                            />
                          </TouchableOpacity>
                        ) : (
                          <TouchableOpacity style={styles.plusButtonDisabled} disabled>
                            <Image
                              source={require('../../../assets/images/dating-upload-plus-icon.png')}
                              style={[styles.plusIcon, styles.plusIconDisabled]}
                            />
                          </TouchableOpacity>
                        )}
                      </View>

                      <View style={styles.plusContaine}>
                        {!images[index] && !videoSelected && ( // Check if image is not selected and video is not selected
                          <TouchableOpacity onPress={() => openModal(index)} style={styles.plusButto}>
                            <Image source={require('../../../assets/camera.png')} style={styles.plusIco} />
                          </TouchableOpacity>
                        )}
                      </View>
                    </View>
                  ))}
                </View>

                {images.length > 0 && (
                  <View style={styles.deleteAllContainer}>
                    <TouchableOpacity onPress={() => deleteImage(index)} style={styles.deleteAllButton}>
                      <Image source={require('../../../assets/cutRed.png')} style={styles.deleteAllIcon} />
                    </TouchableOpacity>
                  </View>
                )}
              </ScrollView>
            </View> */}
            <View style={{ marginTop: 23 }}>
              <Text style={{ fontSize: 16, fontWeight: '600', color: '#455A64', marginLeft: 7 }}>Select Video </Text>
            </View>

            <View style={{ marginTop: 10 }}>
              <TouchableOpacity onPress={openVideoModal} style={styles.plusButton}>
                <Image
                  source={require('../../../assets/images/dating-upload-plus-icon.png')}
                  style={styles.plusIcon}
                />
              </TouchableOpacity>
            </View>
            {/* <View style={styles.container}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.row}>

                  {[...Array(1)].map((_, index) => (
                    <View
                      key={index}
                      style={[
                        styles.imageContainer,
                        { marginRight: index !== 4 ? 10 : 0, flex: index === 4 ? 0.67 : 1 },
                      ]}
                    >

                      {videos[index] && (
                        <ImageBackground source={{ uri: videos[index].uri }} style={styles.image}>
                          <TouchableOpacity onPress={() => deleteVideo(index)} style={styles.deleteButton}>
                            <Image source={require('../../../assets/cutRed.png')} style={styles.deleteIcon} />
                          </TouchableOpacity>
                        </ImageBackground>

                      )
                      }

                      <View style={styles.plusContainer}>
                        {!videos[index] && (
                          <TouchableOpacity onPress={openVideoModal} style={styles.plusButton}>
                            <Image
                              source={require('../../../assets/images/dating-upload-plus-icon.png')}
                              style={styles.plusIcon}
                            />
                          </TouchableOpacity>
                        )}

                      </View>

                      <View style={styles.plusContaine}>
                        {!videos[index] && (
                          <TouchableOpacity style={styles.plusButto}>
                            <Image
                              source={require('../../../assets/camera.png')}
                              style={styles.plusIco}
                            />
                          </TouchableOpacity>
                        )}
                      </View>
                    </View>
                  ))}
                </View>
                {images.length > 0 && (
                  <View style={styles.deleteAllContainer}>
                    <TouchableOpacity onPress={() => deleteAllImages()} style={styles.deleteAllButton}>
                      <Image source={require('../../../assets/People/BookmarkSimple.png')} style={styles.deleteAllIcon} />
                    </TouchableOpacity>
                  </View>
                )}
              </ScrollView>
            </View> */}

            {/* <TouchableOpacity onPress={onSelectImage} style={{ width: '100%', height: 50, backgroundColor: 'pink' }}>

            </TouchableOpacity> */}

            {/* <LinearGradient
              colors={['rgba(255, 255, 255, 1)', 'rgba(249, 249, 249, 1)']}
              style={styles.uploadImageView}
              pointerEvents={videoSelected || images.length > 0 ? 'none' : 'auto'}
            >
              {videoSelected || images.length > 0 && (
                <View style={styles.disabledOverlay} />
              )}

              <TouchableOpacity onPress={() => (videoSelected || images.length > 0 ? null : openLibrary1())} style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={styles.imageView}>
                  <Image source={require('../../../assets/images/people-upload-photo-video.png')} />
                </View>
                <Text style={styles.imageText}>Video</Text>
              </TouchableOpacity>

             

              <TouchableOpacity onPress={() => (videoSelected || images.length > 0 ? null : openLibrary1())}>
                <Image source={require('../../../assets/images/people-right-arrow.png')} />
              </TouchableOpacity>

            </LinearGradient> */}


            <View style={{ marginLeft: 30, marginVertical: '5%' }}>
              <View style={{ height: 70, width: 80, position: 'relative', marginRight: 29 }}>
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
                      style={styles.deleteIcon}
                      source={require('../../../assets/cutRed.png')}
                    />
                  </TouchableOpacity>
                )}
              </View>
            </View>
            {/* <Video source={{uri:videoInfo}} */}

          </View>
        </View>
        <View style={{ height: 100 }} />
        <View style={{ width: '90%', height: 60, flexDirection: 'row', justifyContent: 'space-between', bottom: 60, alignSelf: 'center', zIndex: 999 }}>
          <MyButtons title="Post" height={50} width={'100%'} borderRadius={5} press={() => { Createpost() }} fontSize={13}
            titlecolor={Mycolors.BG_COLOR} marginVertical={0} backgroundColor={'#0089CF'} />
        </View>
      </ScrollView>
      <Modal
        isVisible={modlevisual}
        swipeDirection="down"
        onSwipeComplete={() => setmodlevisual(false)}
        coverScreen={false}
        backdropColor="transparent"
        style={{ justifyContent: 'flex-end', margin: 0 }}
      >
        <View style={{ height: 150, backgroundColor: Mycolors.BG_COLOR, borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 20, margin: 0, bottom: 0 }}>
          <View style={styles.mainView}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
              <TouchableOpacity style={{ width: 150, height: 150 }} onPress={onGallery}>
                <Image source={require('../../../assets/gallery.png')} style={{ width: 40, height: 40, alignSelf: 'center' }} />
                <Text style={{ textAlign: 'center', color: Mycolors.TEXT_COLOR }}>Open Library</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ width: 150, height: 150 }} onPress={onCamera}>
                <Image source={require('../../../assets/camera.png')} style={{ width: 40, height: 35, alignSelf: 'center' }} />
                <Text style={{ textAlign: 'center', color: Mycolors.TEXT_COLOR }}>Open Camera</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
    image: {
      height: '100%',
      width: '100%',
      borderWidth: 2,
      borderRadius: 10,
    },
    shadowRadius: 5,
    shadowOpacity: 0.05,
    elevation: 2,
  },
  uploadedImageBox: {
    height: 70,
    width: 80,
    position: 'relative',
    marginRight: 29
  },
  eyeView: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0089CF',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  disabledContainer: {
    opacity: 0.5,

  },

  // Add any specific styling for the disabled button
  // For example, you can set a different background color
  // backgroundColor: '#E0E0E0',
  disabledButton: {
    opacity: 0.5,
    backgroundColor: '#0089CF',

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
    marginTop: 12,
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
  uploadImageViewDisabled: {
    backgroundColor: '#E0E0E0',
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
  },
  // container: {

  //   padding: 10,


  // },
  // row: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   marginBottom: 10,

  // },
  // imageContainer: {
  //   width: 110,
  //   height: 110,
  //   borderRadius: 10,
  //   overflow: 'hidden',
  //   backgroundColor: '#0089CF'
  // },
  // image: {
  //   width: '100%',
  //   height: '100%',
  // },
  // plusButton: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  // plusIcon: {
  //   width: 50,
  //   height: 50,
  // },
  // lastImageContainer: {
  //   flex: 1,
  // },
  // deleteButton: {
  //   position: 'absolute',
  //   top: 5,
  //   right: 5,
  //   backgroundColor: 'rgba(0, 0, 0, 0.7)',
  //   borderRadius: 15,
  //   padding: 5,
  //   // Your delete button styles here
  // },
  // deleteIcon: {
  //   width: 20,
  //   height: 20,
  //   resizeMode: 'contain',
  //   // Your delete icon styles here
  // },
  container: {
    flex: 1,
    paddingHorizontal: 7,
    height: 140,
    width: '100%',

  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    width: 120,
    height: 100,
    borderRadius: 10,
    overflow: 'visible',
    backgroundColor: '#E0E0E0',

    position: 'relative',
    zIndex: 2
  },
  image: {
    width: '100%',
    height: '100%',

  },
  deleteButton: {
    position: 'absolute',
    top: 5,
    right: 5,

  },
  deleteButtonn: {
    position: 'absolute',
    top: 5,
    left: 100,

  },
  deleteIcon: {
    // backgroundColor: 'red',
    width: 20,
    height: 20,
    borderRadius: 10,
    right: -12,
    alignItems: 'center',
    backgroundColor: 'white',
    top: -12
  },
  plusContainer: {
    position: 'absolute',
    top: 75,
    alignSelf: 'center',
    width: 40,
    height: 40,
    overflow: 'visible',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
  },

  disabledOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(224, 224, 224, 0.5)',
  },
  plusContaine: {
    position: 'absolute',
    top: 25,
    alignSelf: 'center',
    width: 40,
    height: 40,
    overflow: 'visible',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,

  },
  plusButton: {
    backgroundColor: '#0089CF',
    width: 40,
    height: 40,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 2
  },
  plusButto: {

    width: '50%',
    height: 40,

    justifyContent: 'center',
    alignItems: 'center',
  },
  plusIcon: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
  },
  plusIco: {
    width: 60,
    height: 40,
    resizeMode: 'contain',

  },
  deleteAllContainer: {
    position: 'absolute',
    top: -10,
    right: -20,
    alignSelf: 'center',
    width: 40,
    height: 40,
    overflow: 'visible',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100
  },
  deleteAllButton: {

    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteAllIcon: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
  },
  imagePickerStyle: {
    height: '100%',
    width: '100%',
    borderWidth: 2,
    borderRadius: 10,
  },
});






export default PeopleCreatePost 