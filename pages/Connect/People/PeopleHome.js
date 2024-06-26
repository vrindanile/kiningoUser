// import React, { useEffect, useState, useRef } from 'react';
// import { View, Image, Text, StyleSheet, SafeAreaView, TextInput, FlatList, Alert, RefreshControl, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
// import HomeHeaderRoundBottom from '../../../component/HomeHeaderRoundBottom';
// import Header from './Components/Header';
// import SearchInput2 from '../../../component/SearchInput2';
// import SearchInputEnt from '../../../component/SearchInputEnt';
// import SerchInput from '../../../component/SerchInput';
// import { dimensions, Mycolors } from '../../../utility/Mycolors';
// import { ImageSlider, ImageCarousel } from "react-native-image-slider-banner";
// import MyButtons from '../../../component/MyButtons';
// import MultiSlider from '@ptomasroos/react-native-multi-slider';
// import Modal from 'react-native-modal';
// import Toast from 'react-native-toast-message';
// import ViewMoreText from 'react-native-view-more-text';
// import ReadMoreComponent from './Components/ReadMoreComponent';
// import VideoPlayer from 'react-native-video-player'
// import { connect_people_dislike_post, connect_people_follow_user, connect_people_home_page, connect_people_like_post, connect_people_react_post, connect_people_save_post, connect_people_unfollow_user, requestGetApi, requestPostApi, } from '../../../WebApi/Service';
// import Loader from '../../../WebApi/Loader';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { saveUserResult, saveUserToken, setVenderDetail, onLogoutUser, savepeoplemoduleuserdata } from '../../../redux/actions/user_action';

// import { useSelector, useDispatch } from 'react-redux';
// import Share from 'react-native-share';
// const PeopleHome = (props) => {
//   const dispatch = useDispatch();
//   const User = useSelector(state => state.user.user_details)
//   const [loading, setLoading] = useState(false);
//   const [searchValue, setsearchValue] = useState('')
//   const [scrollEnabled, setScrollEnabled] = useState(false)
//   const myTextInput = useRef()
//   const [multiSliderValue, setMultiSliderValue] = useState([0, 100])
//   const [showChooseMilesModal, setShowChooseMilesModal] = useState(false);
//   const [showModal, setShowModal] = useState(false)
//   const [homedata, setHomedata] = useState([])
//   const [isLiked, setIsLiked] = useState('false');
//   const [isSaved, setIsSaved] = useState('false');
//   const [threedotclickdata, setThreedotclickdata] = useState('')
//   const [My_Alert, setMy_Alert] = useState(false)
//   const [alert_sms, setalert_sms] = useState('')
//   const [upData, setupData] = useState([
//     {
//       id: '1',
//       name: 'Aryav Nadkarni',
//       desc: 'Amazing footbal shorts caption this',
//       numViews: '183K',
//       numComments: '183',
//       time: '',
//       img: require('../../../assets/images/images.png'),
//       isSaved: false,
//       isLiked: false
//     },
//     {
//       id: '2',
//       name: 'Aryav Nadkarni',
//       desc: 'Amazing footbal shorts caption this',
//       numViews: '183K',
//       numComments: '183',
//       time: '',
//       img: require('../../../assets/images/images.png'),
//       isSaved: false,
//       isLiked: false
//     },
//     {
//       id: '3',
//       name: 'Aryav Nadkarni',
//       desc: 'Amazing footbal shorts caption this',
//       numViews: '183K',
//       numComments: '183',
//       time: '',
//       img: require('../../../assets/images/images.png'),
//       isSaved: false,
//       isLiked: false
//     },
//     {
//       id: '4',
//       name: 'Aryav Nadkarni',
//       desc: 'Amazing footbal shorts caption this',
//       numViews: '183K',
//       numComments: '183',
//       time: '',
//       img: require('../../../assets/images/images.png'),
//       isSaved: false,
//       isLiked: false
//     },

//   ])
//   const multiSliderValuesChange = (values) => { setMultiSliderValue(values) }
//   useEffect(() => {
//     PeopleHome()
//   }, [])
//   const [refreshing, setRefreshing] = React.useState(false);
//   const checkcon = () => {
//     PeopleHome()
//   }
//   const wait = (timeout) => {
//     return new Promise(resolve => setTimeout(resolve, timeout));
//   }

//   const onRefresh = React.useCallback(() => {
//     checkcon()
//     wait(2000).then(() => {

//       setRefreshing(false)

//     });
//   }, []);

//   const MycustomonShare = async () => {
//     const shareOptions = {
//       title: 'KinenGo Contents',
//       icon: 'data:<data_type>/<file_extension>;base64,<base64_data>',
//       // type: 'data:image/png;base64,<imageInBase64>',
//       // message: "KinenGO App",
//       url: 'KinenGo',
//     }
//     try {
//       const shareResponse = await Share.open(shareOptions);

//       console.log(JSON.stringify(shareResponse));

//     }
//     catch (error) {
//       console.log('ERROR=>', error);
//     }
//   };
//   const changeSaved = (id) => {
//     const updataCopy = [...upData]
//     const updatedData = updataCopy?.map(el => el.id === id ? { ...el, isSaved: !el.isSaved } : el)
//     setupData([...updatedData])
//   }
//   const changeLiked = (id) => {
//     const updataCopy = [...upData]
//     const updatedData = updataCopy?.map(el => el.id === id ? { ...el, isLiked: !el.isLiked } : el)
//     setupData([...updatedData])
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
//       PeopleHome()
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
//       PeopleHome()
//       // Toast.show({ text1: responseJson.headers.message });
//     } else {

//       setalert_sms(err)
//       setMy_Alert(true)
//     }
//   }

//   const Savepost = async (items) => {
//     setLoading(true)
//     console.log("LIKE CLICK:::", items);
//     const { responseJson, err } = await requestPostApi(connect_people_save_post + items, '', 'POST', User.token)
//     setLoading(false)
//     console.log('the res==>>', responseJson)
//     if (responseJson.headers.success == 1) {
//       PeopleHome()
//       // Toast.show({ text1: responseJson.headers.message });
//     } else {

//       setalert_sms(err)
//       setMy_Alert(true)
//     }
//   }
//   const PeopleHome = async () => {
//     setLoading(true)
//     // console.log("LIKE CLICK:::",isSaved);
//     const { responseJson, err } = await requestGetApi(connect_people_home_page, '', 'GET', User.token)
//     setLoading(false)
//     console.log('the res==>>', responseJson)
//     if (responseJson.headers.success == 1) {
//       setHomedata(responseJson.body.posts)
//       dispatch(savepeoplemoduleuserdata(responseJson.body.posts[0]))
//       console.log("response hOME", responseJson.body.posts[0]);
//       // Toast.show({ text1: responseJson.headers.message });
//     } else {

//       setalert_sms(err)
//       setMy_Alert(true)
//     }
//   }
//   const Followuser = async () => {
//     console.log("Followuser CLICK:::", threedotclickdata);

//     setLoading(true)
//     var data = {
//       module_id: 47,
//       connect_type: "follow",
//       status: 1
//     }
//     console.log('====================================');
//     console.log(data);
//     console.log('====================================');
//     const { responseJson, err } = await requestPostApi(connect_people_follow_user + threedotclickdata, data, 'POST', User.token)
//     setLoading(false)
//     console.log('the Followuserres==>>', responseJson)
//     setShowModal('false')
//     // if (responseJson.headers.success == 1) {

//     //   Toast.show({ text1: responseJson.headers.message });
//     // } else {

//     //   setalert_sms(err)
//     //   setMy_Alert(true)
//     // }
//   }
//   const UnFollowuser = async () => {
//     console.log("UNFollowuser CLICK:::", threedotclickdata);

//     setLoading(true)
//     var data = {
//       module_id: 47,
//       connect_type: "unfollow",
//       status: 1
//     }
//     console.log('====================================');
//     console.log(data);
//     console.log('====================================');
//     const { responseJson, err } = await requestPostApi(connect_people_unfollow_user + threedotclickdata, data, 'POST', User.token)
//     setLoading(false)
//     console.log('the Followuserres==>>', responseJson)
//     setShowModal('false')
//     // if (responseJson.headers.success == 1) {

//     //   Toast.show({ text1: responseJson.headers.message });
//     // } else {

//     //   setalert_sms(err)
//     //   setMy_Alert(true)
//     // }
//   }
//   return (
//     <SafeAreaView scrollEnabled={scrollEnabled} style={{ backgroundColor: '#F8F8F8' }}>
//       <ScrollView
//         refreshControl={
//           <RefreshControl
//             refreshing={refreshing}
//             onRefresh={onRefresh}

//           />
//         }
//       >
//         <Header height={80} paddingHorizontal={15} backgroundColor='#fff'
//           press1={() => { }}
//           // img1={require('../../../assets/images/events_arrow.png')} 
//           img1width={25} img1height={20}
//           press2={() => { }} title2={'People'} fontWeight={'500'} img2height={20} color='#455A64'
//           press3={() => {
//             AsyncStorage.clear();
//             dispatch(onLogoutUser())
//           }} img3width={20} img3height={20} img3={require('../../../assets/dating-logout-image.png')}


//         />

//         <View style={{ width: '90%', alignSelf: 'center', marginTop: 20 }}>

//           {/* <View style={{flexDirection:'row', alignItems:'center',marginTop:400, marginBottom:400, height:100, backgroundColor:'red'}}>
//     <Image source={require('../../../assets/images/people-add-post.png')} style={{width:20, height:20}}/>
//     <Image source={require('../../../assets/images/people-add-post.png')} style={{width:20, height:20}}/>
//   </View> */}

//           <TouchableOpacity style={styles.createPostView} onPress={() => { props.navigation.navigate('PeopleMessages') }}>
//             <View style={styles.createPostLeftSubView}>
//               <Image source={require('../../../assets/images/people-add-post-image.png')} style={{ width: 35, height: 35 }} />
//               <Text style={styles.createPostText}>Search </Text>
//             </View>
//             <Image source={require('../../../assets/images/people-add-post.png')} style={{ width: 40, height: 40 }} />
//           </TouchableOpacity>

//           {/* <View style={{height:140,borderRadius:10,overflow:'hidden',marginVertical:10,width:'98%',alignSelf:'center'}}>
//      <ImageSlider 
//     //  localImg={true}
//     data={[
//         // require('../../assets/Group75972.png'),
//         {img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5a5uCP-n4teeW2SApcIqUrcQApev8ZVCJkA&usqp=CAU'},
//         {img: 'https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg'},
//         {img: 'https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510__340.jpg'}
//     ]}
//     onClick={(item, index) => {Alert.alert('hello'+index)}}
//     autoPlay={true}
//    // onItemChanged={(item) => console.log("item", item)}
//     closeIconColor="transparent"
// />
//    </View> */}


//           <View style={{ marginTop: 10, justifyContent: 'center', alignItems: 'center', width: '100%', }}>
//             <FlatList
//               data={homedata}
//               showsHorizontalScrollIndicator={false}
//               numColumns={1}
//               style={{}}
//               renderItem={({ item, index }) => {
//                 console.log('itemm??????????', item.userid);
//                 return (
//                   <View style={{ width: '95.5%', marginVertical: 10, borderRadius: 30, }}>
//                     <View style={styles.flatlistMainView}>

//                       <View style={styles.followingImageView}>
//                         <TouchableOpacity onPress={() => props.navigation.navigate

//                           //  ('PeopleProfileScreen')
//                           ('PeopleProfileScreenOther', { userID: item.userid })

//                         }>
//                           <Image source={require('../../../assets/images/people-following-person.png')} />
//                         </TouchableOpacity>
//                         <View style={styles.followingView}>
//                           <TouchableOpacity onPress={() => props.navigation.navigate

//                             //  ('PeopleProfileScreen')
//                             ('PeopleProfileScreenOther', { userID: item.userid })

//                           }>
//                             <Text style={{ fontSize: 14, fontWeight: '600', color: '#455A64' }}>{item.first_name + ' ' + item.last_name}</Text>
//                           </TouchableOpacity>
//                           <Text style={{ fontSize: 13, fontWeight: '400', color: '#B2B7B9', marginTop: 2 }}>Following</Text>
//                         </View>
//                       </View>

//                       <View style={{ flexDirection: 'row', alignItems: 'center', }}>
//                         <TouchableOpacity onPress={() => { setThreedotclickdata(item.userid), setShowModal(true) }} style={[styles.rightButtonsView, { marginRight: 4 }]}>
//                           <Image source={require('../../../assets/images/people-three-dots.png')} style={{ width: 20, height: 20 }} resizeMode='contain' />
//                         </TouchableOpacity>

//                       </View>

//                     </View>
//                     {/* <TouchableOpacity style={{ width: dimensions.SCREEN_WIDTH, height: 200, backgroundColor: '#F8F8F8', alignSelf: 'center' }}
//                       // onPress={()=>{props.navigation.navigate('FoodDetails')}}>
//                       onPress={() => { props.navigation.navigate('ShopProductAll') }}>
//                       <Image resizeMode='contain' source={{ uri: `${item.image_url}` }} style={{ width: '100%', height: '100%', alignSelf: 'center', }}></Image>
//                     </TouchableOpacity> */}


//                     {
//                       item.post_media === 'image' ?
//                         <TouchableOpacity style={styles.imageView}
//                           // onPress={()=>{navigation.navigate('FoodDetails')}}>
//                           onPress={() => { }}>
//                           <Image
//                             source={{ uri: `${item.image_url}` }}
//                             style={{
//                               width: '100%',
//                               height: '100%',
//                               alignSelf: 'center',
//                             }}
//                             resizeMode="contain"></Image>
//                           {/* <Image source={item.source} style={{width:'100%',height:'100%',alignSelf:'center',}}></Image> */}
//                         </TouchableOpacity>
//                         :
//                         <VideoPlayer
//                           resizeMode="contain"
//                           video={{ uri: item.video_url }}
//                           videoWidth={dimensions.SCREEN_WIDTH * 0.9}
//                           videoHeight={200}
//                           autoplay={false}
//                           // thumbnail={{ uri: item.thumbnail }}
//                           endWithThumbnail
//                           disableControlsAutoHide
//                           customStyles={{
//                             // thumbnail: { width: dimensions.SCREEN_WIDTH * 0.9, height: 300 },
//                             // videoWrapper: {width: dimensions.SCREEN_WIDTH, height:300},
//                             wrapper: { width: dimensions.SCREEN_WIDTH * 0.9, },
//                           }}
//                         />
//                     }


//                     <View style={styles.flatlistMainBottomView}>

//                       <View style={styles.flatlistBottomView}>
//                         <View style={{ flexDirection: 'row', alignItems: 'center' }}>


//                           <TouchableOpacity onPress={() => { item.is_liked ? Dislikepost(item.id) : Likepost(item.id) }} style={{ marginRight: 10 }}>
//                             <Image source={item.is_liked ? require('../../../assets/images/people-sel-heart.png') : require('../../../assets/images/people-like.png')} style={{ width: 25, height: 25 }} />
//                           </TouchableOpacity>


//                           <TouchableOpacity onPress={() => props.navigation.navigate('PeopleComments', { data: item })} style={{ marginRight: 10 }}>
//                             <Image source={require('../../../assets/images/people-comment.png')} style={{ width: 25, height: 25 }} />
//                           </TouchableOpacity>
//                           <TouchableOpacity onPress={() => MycustomonShare()
//                             // props.navigation.navigate('PeopleMessages')
//                           } style={{ marginRight: 10 }}>
//                             <Image source={require('../../../assets/ShareNetwork-black.png')} style={{ width: 25, height: 25 }} />
//                           </TouchableOpacity>
//                         </View>


//                         <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//                           <View style={{ marginRight: 10 }}>
//                             <Text style={styles.text1}>183K views</Text>
//                           </View>
//                           <TouchableOpacity onPress={() => { Savepost(item.id) }} style={styles.rightButtonsView}>
//                             <Image source={!item.is_saved ? require('../../../assets/images/people-bookmark.png') : require('../../../assets/images/people-bookmark-selected.png')} style={{ width: 20, height: 20 }} resizeMode='contain' />
//                           </TouchableOpacity>
//                         </View>
//                       </View>

//                       {
//                         item.num_of_liked_users > 0 ?
//                           <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
//                             <Image source={require('../../../assets/images/people-liked-by.png')} style={{ width: 30, height: 30 }} resizeMode='contain' />
//                             <Text style={[styles.text1, { marginLeft: 10 }]}>Liked by {item.last_liked_user} and {item.num_of_liked_users} others</Text>
//                           </View>
//                           :
//                           null
//                       }

//                       {
//                         item.post_description != null ?
//                           <View style={{ flex: 1 }}>
//                             {/* <Text style={styles.text1}>Amazing football shorts caption this<Text style={{color:'#B2B7B9'}}>…More</Text></Text> */}
//                             <ReadMoreComponent text={item.post_description} />
//                           </View>
//                           :
//                           null
//                       }

//                       {
//                         item.num_of_comments > 0 ?
//                           <TouchableOpacity onPress={() => props.navigation.navigate('PeopleComments')} style={{ marginTop: 5 }}>
//                             <Text style={{ fontSize: 12, fontWeight: '400', color: '#0089CF' }}>View all {item.num_of_comments} comments</Text>
//                           </TouchableOpacity>
//                           :
//                           null

//                       }


//                       <View style={{ marginTop: 10 }}>
//                         <Text style={{ fontSize: 10, fontWeight: '400', color: '#B2B7B9' }}>{item.created_date.slice(11, 16)} min ago</Text>
//                       </View>
//                     </View>
//                   </View>
//                 )
//               }}
//               keyExtractor={item => item.id}
//             />
//           </View>

//           <TouchableOpacity onPress={() => { props.navigation.navigate('PeopleCreatePost') }} style={{ position: 'absolute', marginTop: '129%', marginLeft: '83%' }}>
//             <Image source={require('../../../assets/addPlus.png')} style={{ width: 74, height: 74, overflow: 'hidden', borderRadius: 10, }}></Image>
//           </TouchableOpacity>


//           <TouchableOpacity onPress={() => { props.navigation.navigate('PeopleProfileScreenOther') }} style={{ position: 'absolute', marginTop: '179%', marginLeft: '83%' }}>
//             <Image source={require('../../../assets/addPlus.png')} style={{ width: 74, height: 74, overflow: 'hidden', borderRadius: 10, }}></Image>
//           </TouchableOpacity>

//         </View>
//         <View style={{ height: 100 }} />

//       </ScrollView>
//       <Modal
//         isVisible={showChooseMilesModal}
//         swipeDirection="down"
//         onBackdropPress={() => setShowChooseMilesModal(false)}
//         onSwipeComplete={(e) => {
//           setShowChooseMilesModal(false)
//         }}
//         scrollTo={() => { }}
//         scrollOffset={1}
//         propagateSwipe={true}
//         coverScreen={false}
//         backdropColor='transparent'
//         style={{ justifyContent: 'flex-end', margin: 0, backgroundColor: 'rgba(0,0,0,0.5)' }}
//       >
//         <View style={{ height: '50%', backgroundColor: '#fff', borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 20 }}>
//           <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled={true}>
//             <View style={{ alignItems: 'center' }}>
//               <Text style={{ color: Mycolors.Black, fontWeight: '500', marginBottom: 30, marginTop: 10 }}>Choose Miles</Text>
//               <MultiSlider
//                 // values={[multiSliderValue[0], multiSliderValue[1]]}
//                 values={[multiSliderValue[0]]}
//                 sliderLength={320}
//                 onValuesChange={multiSliderValuesChange}
//                 min={0}
//                 max={100}
//                 step={1}
//                 allowOverlap={false}
//                 minMarkerOverlapDistance={10}
//                 markerStyle={{
//                   ...Platform.select({
//                     ios: {
//                       height: 30,
//                       width: 30,
//                       shadowColor: '#000000',
//                       shadowOffset: {
//                         width: 0,
//                         height: 3
//                       },
//                       shadowRadius: 1,
//                       shadowOpacity: 0.1,
//                       borderColor: '#ED1C24',
//                       borderWidth: 1
//                     },
//                     android: {
//                       height: 30,
//                       width: 30,
//                       borderRadius: 50,
//                       backgroundColor: '#fff',
//                       borderColor: '#ED1C24',
//                       borderWidth: 1
//                     }
//                   })
//                 }}
//                 pressedMarkerStyle={{
//                   ...Platform.select({
//                     android: {
//                       height: 30,
//                       width: 30,
//                       borderRadius: 20,
//                       backgroundColor: '#ED1C24'
//                     }
//                   })
//                 }}
//                 selectedStyle={{ backgroundColor: '#ED1C24' }}
//                 trackStyle={{
//                   height: 5
//                 }}
//                 touchDimensions={{
//                   height: 40,
//                   width: 40,
//                   borderRadius: 20,
//                   slipDisplacement: 40
//                 }}
//               />
//               <View style={{
//                 flexDirection: 'row', alignItems: 'center', width: '95%',
//                 height: 60,
//                 paddingHorizontal: 20,
//                 backgroundColor: '#fff',
//                 alignSelf: 'center',
//                 shadowColor: 'rgba(0, 0, 0, 0.5)',
//                 shadowOffset: {
//                   width: 0,
//                   height: 3
//                 },
//                 shadowRadius: 1,
//                 shadowOpacity: 0.1,
//                 // overflow: 'hidden',
//                 elevation: 5,
//                 marginTop: 30,
//                 marginBottom: 30,
//               }}>
//                 <TextInput
//                   ref={myTextInput}
//                   value={String(multiSliderValue[0])}
//                   onChangeText={(e) => {
//                     const value = e.replace(/[^0-9]/g, '')
//                     if (Number(value) > 100) {
//                       Toast.show('Miles cannot be more than 100', Toast.SHORT)
//                     } else if (Number(value) < 0) {
//                       Toast.show('Miles cannot be less than 0', Toast.SHORT)
//                     } else {
//                       multiSliderValuesChange([Number(value)])
//                     }
//                   }}
//                   textAlignVertical={'center'}
//                   // onChangeText={(e) => console.log('e', e)}
//                   placeholder={'0'}
//                   placeholderTextColor="#263238"
//                   multiline={true}
//                   // maxLength={500}
//                   // keyboardType="number-pad"
//                   autoCapitalize='none'
//                   style={{
//                     color: '#263238',
//                     fontSize: 12,
//                     fontWeight: '500'
//                   }}
//                   keyboardType='numeric'
//                 />
//                 <Text onPress={() => { myTextInput.current.focus() }} style={{ color: '#263238', fontSize: 12, fontWeight: '500' }}> miles</Text>
//               </View>
//               {/* <Text style={{color:Mycolors.GrayColor,fontWeight:'600',fontSize:12,marginTop:9}} >{multiSliderValue[0]} miles</Text> */}
//             </View>

//             <View style={{ width: '95%', alignSelf: 'center' }}>
//               <MyButtons title="Save" height={50} width={'100%'} borderRadius={5} alignSelf="center" press={() => { props.navigation.navigate('ShopPayment') }} marginHorizontal={20} fontSize={11}
//                 titlecolor={Mycolors.BG_COLOR} backgroundColor={'#FFD037'} marginVertical={0} />
//             </View>

//             {/* <View style={{width:100,height:100}} /> */}
//           </ScrollView>

//         </View>
//       </Modal>

//       {/* three dot modal */}
//       <Modal
//         isVisible={showModal}
//         swipeDirection="down"
//         onBackdropPress={() => setShowModal(false)}
//         onSwipeComplete={e => {
//           setShowModal(false);
//         }}
//         scrollTo={() => { }}
//         scrollOffset={1}
//         propagateSwipe={true}
//         coverScreen={false}
//         backdropColor="transparent"
//         style={{
//           justifyContent: 'flex-end',
//           margin: 0,
//           backgroundColor: 'rgba(0,0,0,0.5)',
//         }}>
//         <View
//           style={{
//             height: '50%',
//             backgroundColor: '#FFF',
//             borderTopLeftRadius: 30,
//             borderTopRightRadius: 30,
//             paddingVertical: 20,
//           }}>

//           <ScrollView
//             showsVerticalScrollIndicator={false}
//             nestedScrollEnabled={true}>
//             <View style={{ width: '90%', alignSelf: 'center', marginTop: 20 }}>
//               <View style={{ backgroundColor: '#F8F8F8', paddingHorizontal: 10, paddingVertical: 20, borderRadius: 10 }}>
//                 <TouchableOpacity style={{ marginHorizontal: 20, flexDirection: 'row', alignItems: 'center' }} onPress={() => { Followuser() }}>
//                   {/* <Image source={require('../../../assets/images/people-bookmark.png')} style={{width:20, height:20}} resizeMode='contain'/> */}

//                   <Text style={styles.link}>Follow</Text>
//                 </TouchableOpacity>


//               </View>

//               <View style={{ backgroundColor: '#F8F8F8', paddingHorizontal: 10, paddingVertical: 20, borderRadius: 10, marginTop: 8 }}>


//                 <TouchableOpacity style={{ marginHorizontal: 20, flexDirection: 'row', alignItems: 'center' }} onPress={() => { UnFollowuser() }}>
//                   {/* <Image source={require('../../../assets/images/people-bookmark.png')} style={{width:20, height:20}} resizeMode='contain'/> */}
//                   <Text style={styles.link}>UnFollow</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>

//             <View style={{ width: 100, height: 100 }} />
//           </ScrollView>
//         </View>
//       </Modal>
//       {
//         loading ?
//           <Loader />
//           : null
//       }
//     </SafeAreaView >
//   );
// }
// const styles = StyleSheet.create({
//   topButtonView: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     borderRadius: 20,
//     paddingHorizontal: 15,
//     paddingVertical: 10,
//     shadowColor: '#0089CF',
//     shadowOffset: { width: 0, height: 3 },
//     shadowRadius: 1,
//     shadowOpacity: 0.1,
//     elevation: 5,
//   },
//   createPostView: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     width: '100%',
//     height: 50,
//   },
//   createPostLeftSubView: {
//     width: '83%',
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     paddingVertical: 5,
//     paddingLeft: 10,
//     borderRadius: 10,
//   },
//   createPostText: {
//     color: '#B2B7B9',
//     fontSize: 14,
//     fontWeight: '300',
//     marginLeft: 10
//   },
//   flatlistMainView: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     backgroundColor: '#fff',
//     paddingHorizontal: 15,
//     paddingVertical: 10,
//     width: dimensions.SCREEN_WIDTH * 0.9,
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//   },
//   rightButtonsView: {
//     backgroundColor: '#F8F8F8',
//     padding: 10,
//     borderRadius: 20
//   },
//   followingImageView: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: 'red'
//   },
//   followingView: {
//     justifyContent: 'center',
//     marginLeft: 10
//   },
//   flatlistMainBottomView: {
//     backgroundColor: '#fff',
//     paddingVertical: 15,
//     paddingHorizontal: 20,
//     width: dimensions.SCREEN_WIDTH * 0.9,
//     borderBottomRightRadius: 20,
//     borderBottomLeftRadius: 20
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
//     width: dimensions.SCREEN_WIDTH,
//     height: 200,
//     backgroundColor: '#F8F8F8',
//     alignSelf: 'center'
//   },
// });
// export default PeopleHome 


import React, { useEffect, useState, useRef } from 'react';
import { View, Image, Text, StyleSheet, SafeAreaView, TextInput, FlatList, Alert, RefreshControl, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import HomeHeaderRoundBottom from '../../../component/HomeHeaderRoundBottom';
import SearchInput2 from '../../../component/SearchInput2';
import SearchInputEnt from '../../../component/SearchInputEnt';
import SerchInput from '../../../component/SerchInput';
import { dimensions, Mycolors } from '../../../utility/Mycolors';
import { ImageSlider, ImageCarousel } from "react-native-image-slider-banner";
import MyButtons from '../../../component/MyButtons';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import Modal from 'react-native-modal';
import Toast from 'react-native-toast-message';
import ViewMoreText from 'react-native-view-more-text';
import ReadMoreComponent from './Components/ReadMoreComponent';
import VideoPlayer from 'react-native-video-player'
import { connect_people_dislike_post, connect_people_follow_user, connect_people_home_page, connect_people_like_post, connect_people_react_post, connect_people_save_post, connect_people_unfollow_user, requestGetApi, requestPostApi, connect_search_post, connect_people_user_profile, connect_people_newHomePage } from '../../../WebApi/Service';
import Loader from '../../../WebApi/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { saveUserResult, saveUserToken, setVenderDetail, onLogoutUser, savepeoplemoduleuserdata } from '../../../redux/actions/user_action';
import LikeUserModal from './modals/LikeUserModal';
import ImagePicker from 'react-native-image-crop-picker';
import { androidCameraPermission } from './Permissions';
import Header from './Components/Header';
import { useSelector, useDispatch } from 'react-redux';
import Share from 'react-native-share';
import PostsModal from './modals/PostsModal';
const PeopleHome = (props) => {
  const dispatch = useDispatch();
  const User = useSelector(state => state.user.user_details)
  console.log('User', User);
  const [loading, setLoading] = useState(false);
  const [searchValue, setsearchValue] = useState('')
  const [scrollEnabled, setScrollEnabled] = useState(false)
  const myTextInput = useRef()
  const [multiSliderValue, setMultiSliderValue] = useState([0, 100])
  const [showChooseMilesModal, setShowChooseMilesModal] = useState(false);
  const [showModal, setShowModal] = useState(false)
  const [editModal, setEditModal] = useState(false)
  const [profileModal, setProfileModal] = useState('')
  const [homedata, setHomedata] = useState([])
  const [isLiked, setIsLiked] = useState('false');
  const [isSaved, setIsSaved] = useState('false');
  const [editItemId, setEditItemId] = useState(null);
  const [threedotclickdata, setThreedotclickdata] = useState('')
  const [foolowStatus, setFoolowSttaus] = useState('')
  const [My_Alert, setMy_Alert] = useState(false)
  const [showLikedModal, setShowLikedModal] = useState(false)
  const [alert_sms, setalert_sms] = useState('')
  const [startFromIndex, setStartFromIndex] = useState(0)
  const [showPostsModal, setShowPostsModal] = useState(false)
  const [userID, setUserID] = useState('')
  const [newData, setNewData] = useState('')

  const [page, setPage] = useState(1); // Current page number
  const [limit, setLimit] = useState(10); // Number of items to fetch per page
  const [data, setData] = useState([]);

  const [upData, setupData] = useState([
    {
      id: '1',
      name: 'Aryav Nadkarni',
      desc: 'Amazing footbal shorts caption this',
      numViews: '183K',
      numComments: '183',
      time: '',
      img: require('../../../assets/images/images.png'),
      isSaved: false,
      isLiked: false
    },
    {
      id: '2',
      name: 'Aryav Nadkarni',
      desc: 'Amazing footbal shorts caption this',
      numViews: '183K',
      numComments: '183',
      time: '',
      img: require('../../../assets/images/images.png'),
      isSaved: false,
      isLiked: false
    },
    {
      id: '3',
      name: 'Aryav Nadkarni',
      desc: 'Amazing footbal shorts caption this',
      numViews: '183K',
      numComments: '183',
      time: '',
      img: require('../../../assets/images/images.png'),
      isSaved: false,
      isLiked: false
    },
    {
      id: '4',
      name: 'Aryav Nadkarni',
      desc: 'Amazing footbal shorts caption this',
      numViews: '183K',
      numComments: '183',
      time: '',
      img: require('../../../assets/images/images.png'),
      isSaved: false,
      isLiked: false
    },

  ])
  const multiSliderValuesChange = (values) => { setMultiSliderValue(values) }
  // useEffect(() => {
  //   PeopleHome()
  // }, [])
  React.useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      // The screen is focused
      // Call any action
      PeopleHome()

      // console.log('my user id of state----->', userID);
    });
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [props]);
  const [refreshing, setRefreshing] = React.useState(false);
  const checkcon = () => {
    PeopleHome()
  }
  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

  const onRefresh = React.useCallback(() => {
    checkcon()
    wait(2000).then(() => {

      setRefreshing(false)

    });
  }, []);

  const MycustomonShare = async () => {
    const shareOptions = {
      title: 'KinenGo Contents',
      icon: 'data:<data_type>/<file_extension>;base64,<base64_data>',
      // type: 'data:image/png;base64,<imageInBase64>',
      // message: "KinenGO App",
      url: 'KinenGo',
    }
    try {
      const shareResponse = await Share.open(shareOptions);

      console.log(JSON.stringify(shareResponse));

    }
    catch (error) {
      console.log('ERROR=>', error);
    }
  };
  const changeSaved = (id) => {
    const updataCopy = [...upData]
    const updatedData = updataCopy?.map(el => el.id === id ? { ...el, isSaved: !el.isSaved } : el)
    setupData([...updatedData])
  }
  const changeLiked = (id) => {
    const updataCopy = [...upData]
    const updatedData = updataCopy?.map(el => el.id === id ? { ...el, isLiked: !el.isLiked } : el)
    setupData([...updatedData])
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

  const Savepost = async (items) => {
    setLoading(true)
    console.log("LIKE CLICK:::", items);
    const { responseJson, err } = await requestPostApi(connect_people_save_post + items, '', 'POST', User.token)
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
  const PeopleHome = async () => {
    setLoading(true)
    // console.log("LIKE CLICK:::",isSaved);
    const { responseJson, err } = await requestGetApi(connect_people_newHomePage, '', 'GET', User.token)
    setLoading(false)
    console.log('the res Home==>>', responseJson)
    if (responseJson.headers.success == 1) {
      // setUserdata(responseJson.data)

      // setUserid(nameAgeList[0].rest.userid)



      setHomedata(responseJson.body.posts)
      setData((prevData) => [...prevData, ...responseJson.body.posts]);
      dispatch(savepeoplemoduleuserdata(responseJson.body.posts[0]))
      console.log("response hOME111------->", responseJson.body.posts);
      const nameAgeList = responseJson.body.posts.map(({ id, userid, images, ...rest }) => ({ id, userid, images, rest }));

      console.log('manelist arrays------->', nameAgeList)
      const imagesArray = nameAgeList.map(({ images }) => images);
      console.log('Images Array:', imagesArray);
      // let result = nameAgeList.map(({ images }) => images)
      // console.log('result', result);
      const result = nameAgeList.flatMap(({ images }) => images);
      console.log('Result:', result);
      // const postTypes = nameAgeList.flatMap(array => array.map(obj => obj.post_type));
      // console.log('Post Types:', postTypes);
      setNewData(result)
      console.log('my post type', imagesArray.post_type);
      // Toast.show({ text1: responseJson.headers.message });
    } else {

      setalert_sms(err)
      setMy_Alert(true)
    }
  }
  const Followuser = async () => {
    console.log("Followuser CLICK:::", threedotclickdata);

    setLoading(true)
    var data = {

      connect_type: "follow",
      status: 1
    }
    console.log('====================================');
    console.log(data);
    console.log('====================================');
    const { responseJson, err } = await requestPostApi(connect_people_follow_user + threedotclickdata, data, 'POST', User.token)
    setLoading(false)
    console.log('the Followuserres==>>', responseJson)
    setShowModal(false)
    if (responseJson.success == 1) {

      Toast.show({ text1: responseJson.message });
      PeopleHome()
    } else {

      setalert_sms(err)
      setMy_Alert(true)
    }
  }
  const UnFollowuser = async () => {
    console.log("UNFollowuser CLICK:::", threedotclickdata);

    setLoading(true)
    var data = {

      connect_type: "unfollow",
      status: 1
    }
    console.log('====================================');
    console.log(data);
    console.log('====================================');
    const { responseJson, err } = await requestGetApi(connect_people_unfollow_user + threedotclickdata, data, 'DELETE', User.token)
    setLoading(false)
    console.log('the Unfoolow==>>', responseJson)
    setShowModal(false)
    if (responseJson.success === 1) {
      PeopleHome();
      Toast.show({ text1: responseJson.message });
    } else if (responseJson.success === 0) {
      Toast.show({ text1: responseJson.message });
    } else {

      setalert_sms(err)
      setMy_Alert(true)
    }
  }


  // const UnFollowUser = async () => {
  //   console.log("UnFollowUser CLICK:::", threedotclickdata);

  //   setLoading(true);
  //   var data = {
  //     connect_type: "unfollow",
  //     status: 1
  //   };
  //   console.log('====================================');
  //   console.log(data);
  //   console.log('====================================');

  //   try {
  //     const { responseJson, err } = await requestGetApi(
  //       connect_people_unfollow_user + threedotclickdata,
  //       data,
  //       'DELETE',
  //       User.token
  //     );

  //     setLoading(false);
  //     setShowModal(false);

  //     if (responseJson && responseJson.success === 1) {
  //       PeopleHome();
  //       Toast.show({ text1: responseJson.message });
  //     } else if (responseJson && responseJson.success === 0) {
  //       Toast.show({ text1: responseJson.message });
  //     } else {
  //       setalert_sms(err);
  //       setMy_Alert(true);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     // Handle any error that occurred during the API call
  //     setLoading(false);
  //     setShowModal(false);
  //     // Display a generic error message
  //     Toast.show({ text1: 'An error occurred. Please try again later.' });
  //   }
  // };

  // useEffect(() => {
  //   fetchData();
  // }, [page]); // Call fetchData whenever the page changes

  return (
    <SafeAreaView scrollEnabled={scrollEnabled} style={{ backgroundColor: '#F8F8F8' }}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}

          />
        }
      >
        <Header height={80} paddingHorizontal={15} backgroundColor='#fff'
          press1={() => { }}
          // img1={require('../../../assets/images/events_arrow.png')} 
          img1width={25} img1height={20}
          press2={() => { }} title2={'People'} fontWeight={'700'} fontSize={15} img2height={20} color='#455A64'
          // press3={() => {
          //   AsyncStorage.clear();
          //   dispatch(onLogoutUser())
          // }} img3width={20} img3height={20} img3={require('../../../assets/dating-logout-image.png')}
          //
          press4={() => {
            setProfileModal(true)
          }} />

        <View style={{ width: '90%', alignSelf: 'center', marginTop: 20 }}>

          {/* <View style={{flexDirection:'row', alignItems:'center',marginTop:400, marginBottom:400, height:100, backgroundColor:'red'}}>
    <Image source={require('../../../assets/images/people-add-post.png')} style={{width:20, height:20}}/>
    <Image source={require('../../../assets/images/people-add-post.png')} style={{width:20, height:20}}/>
  </View> */}
          {/* <TouchableOpacity onPress={() => props.navigation.navigate

            ('EditProfile')}>
            <Text style={{ color: 'red' }}>jjjjjj</Text>
          </TouchableOpacity> */}
          <TouchableOpacity style={styles.createPostView} onPress={() => { props.navigation.navigate('PeopleMessages') }}>
            <View style={[styles.createPostLeftSubView, { height: 50 }]}>

              <Text style={styles.createPostText}>Search</Text>
            </View>
            <Image source={require('../../../assets/images/people-search.png')} style={{ width: 43, height: 48 }} />
          </TouchableOpacity>

          {/* <View style={{height:140,borderRadius:10,overflow:'hidden',marginVertical:10,width:'98%',alignSelf:'center'}}>
     <ImageSlider 
    //  localImg={true}
    data={[
        // require('../../assets/Group75972.png'),
        {img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5a5uCP-n4teeW2SApcIqUrcQApev8ZVCJkA&usqp=CAU'},
        {img: 'https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg'},
        {img: 'https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510__340.jpg'}
    ]}
    onClick={(item, index) => {Alert.alert('hello'+index)}}
    autoPlay={true}
   // onItemChanged={(item) => console.log("item", item)}
    closeIconColor="transparent"
/>
   </View> */}

          <View style={{ marginTop: 10, justifyContent: 'center', alignItems: 'center', width: '100%', }}>
            <FlatList
              data={homedata}
              showsHorizontalScrollIndicator={false}
              numColumns={1}
              style={{}}
              renderItem={({ item, index }) => {

                const imageUrls = item.images.map((image) => image.file_url);
                const postTypes = item.images.map((image) => image.post_type);

                console.log('Image URLs:', imageUrls);
                console.log('Post Types:', postTypes === ['Image']);

                // Rest of your code...

                const isImageType = postTypes.includes('Image');

                // setUserID(item.userid)
                // console.log('my iddddd------>', post_type);
                return (

                  <View style={{ width: '95.5%', marginVertical: 10, borderRadius: 30, }}>
                    <View style={styles.flatlistMainView}>

                      <View style={styles.followingImageView}>
                        <TouchableOpacity onPress={() => {
                          // item.userID === User.userid
                          // props.navigation.navigate
                          //   ('PeopleProfileScreenOther', { userID: item.userid })
                          if (item.userid == User.userid) {

                            props.navigation.navigate('PeopleProfileScreen');
                          } else {
                            props.navigation.navigate('PeopleProfileScreenOther', { userID: item.userid });
                          }
                        }}>

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
                          <TouchableOpacity onPress={() => {

                            if (item.userid == User.userid) {

                              props.navigation.navigate('PeopleProfileScreen');
                            } else {
                              props.navigation.navigate('PeopleProfileScreenOther', { userID: item.userid });
                            }
                          }}>
                            <Text style={{ fontSize: 14, fontWeight: '600', color: '#455A64' }}>{item.first_name + ' ' + item.last_name}</Text>
                          </TouchableOpacity>
                          {/* <Text style={{ fontSize: 13, fontWeight: '400', color: '#B2B7B9', marginTop: 2 }}>Following</Text> */}
                          {/* <Text style={{ fontSize: 13, fontWeight: '400', color: '#B2B7B9', marginTop: 2 }}>
                            {item.is_following ? 'Following' : 'Follow'}
                          </Text> */}
                          {item.userid !== User.userid ? (
                            <Text
                              style={{
                                fontSize: 13,
                                fontWeight: '400',
                                color: '#B2B7B9',
                                marginTop: 2,
                              }}
                            >
                              {item.is_following ? 'Following' : 'Follow'}
                            </Text>
                          ) : null}
                        </View>
                      </View>

                      <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                        {/* <TouchableOpacity onPress={() => { setThreedotclickdata(item.userid), setShowModal(true) }} style={[styles.rightButtonsView, { marginRight: 12, marginLeft: -10 }]}> */}
                        <TouchableOpacity
                          onPress={() => {
                            if (item.userid == User.userid) {
                              setEditItemId(item.id);
                              setEditModal({
                                active: true,
                                id: item.id,

                              });
                            } else {
                              setThreedotclickdata(item.userid);
                              setFoolowSttaus(item.is_following)
                              setShowModal(true);
                            }
                          }}
                          style={[styles.rightButtonsView, { marginRight: 12, marginLeft: -10 }]}
                        >
                          <Image source={require('../../../assets/images/people-three-dots.png')} style={{ width: 20, height: 20 }} resizeMode='contain' />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { Savepost(item.id) }} style={styles.rightButtonsView}>
                          <Image source={!item.is_saved ? require('../../../assets/People/BookmarkSimple.png') : require('../../../assets/People/savePostPepleSelected.png')} style={{ width: 20, height: 20 }} resizeMode='contain' />
                        </TouchableOpacity>
                      </View>

                    </View>
                    {/* <TouchableOpacity style={{ width: dimensions.SCREEN_WIDTH, height: 200, backgroundColor: '#F8F8F8', alignSelf: 'center' }}
                      // onPress={()=>{props.navigation.navigate('FoodDetails')}}>
                      onPress={() => { props.navigation.navigate('ShopProductAll') }}>
                      <Image resizeMode='contain' source={{ uri: `${item.image_url}` }} style={{ width: '100%', height: '100%', alignSelf: 'center', }}></Image>
                    </TouchableOpacity> */}


                    {
                      isImageType ?

                        <ScrollView horizontal >
                          {item.images.map((image, index) => (
                            <TouchableOpacity
                              key={index}
                              style={styles.imageView}
                              onPress={() => { }}
                            >
                              <Image
                                source={{ uri: image.file_url }}
                                style={{
                                  flex: 1,
                                  width: '100%',
                                  alignSelf: 'center',

                                  borderRadius: 8,
                                }}
                                resizeMode='contain'
                              />
                            </TouchableOpacity>
                          ))}
                        </ScrollView>
                        :
                        (
                          imageUrls.map((file_url, index) => (
                            <VideoPlayer
                              key={index}
                              resizeMode="contain"
                              video={{ uri: file_url }}
                              videoWidth={dimensions.SCREEN_WIDTH * 0.9}
                              videoHeight={200}
                              autoplay={false}
                              endWithThumbnail
                              disableControlsAutoHide
                              customStyles={{
                                wrapper: { width: dimensions.SCREEN_WIDTH * 0.9 },
                              }}
                            />
                          ))
                        )}



                    <View style={styles.flatlistMainBottomView}>

                      <View style={styles.flatlistBottomView}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', left: -8 }}>


                          <TouchableOpacity onPress={() => { item.is_liked ? Dislikepost(item.id) : Likepost(item.id) }} style={{ marginRight: 10 }}>
                            <Image source={item.is_liked ? require('../../../assets/People/LikePEoplePost.png') : require('../../../assets/People/likeUnselctedPeople.png')} style={{ width: 25, height: 25 }} />
                          </TouchableOpacity>


                          <TouchableOpacity onPress={() => props.navigation.navigate('PeopleComments', { data: item })} style={{ marginRight: 10 }}>
                            <Image source={require('../../../assets/People/commentPostPeople.png')} style={{ width: 25, height: 25 }} />
                          </TouchableOpacity>
                          <TouchableOpacity onPress={() =>
                            //MycustomonShare()
                            props.navigation.navigate('PeopleMessageList', { userID: item.userid, first_name: item.first_name, last_name: item.last_name })
                          } style={{ marginRight: 10 }}>
                            <Image source={require('../../../assets/People/SharePostPeople.png')} style={{ width: 25, height: 25 }} />
                          </TouchableOpacity>
                        </View>


                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <View style={{ marginRight: 10 }}>
                            {/* {item.id == 4 ? <Text style={styles.text1}>18K views</Text> : item.id == 6 ? <Text style={styles.text1}>1K views</Text> : <Text style={styles.text1}>183K views</Text>} */}
                          </View>

                        </View>
                      </View>

                      {
                        item.num_of_liked_users > 0 ?
                          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }} onPress={() => {

                            props.navigation.navigate('LikedUserList', { postid: item.id })
                          }}>
                            {/* <Image source={require('../../../assets/images/people-liked-by.png')} style={{ width: 30, height: 30 }} resizeMode='contain' /> */}

                            <Text style={[styles.text1, { right: 5 }]}>
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

                      {
                        item.num_of_comments > 0 ?
                          <TouchableOpacity onPress={() => props.navigation.navigate('PeopleComments', { data: item })} style={{ marginTop: 5, }}>
                            <Text style={{ fontSize: 12, fontWeight: '400', color: '#0089CF', right: 3 }}>View all {item.num_of_comments} comments</Text>
                          </TouchableOpacity>
                          :
                          null

                      }


                      <View style={{ marginTop: 10, right: 2 }}>
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
      <TouchableOpacity onPress={() => { props.navigation.navigate('PeopleCreatePost') }} style={{
        bottom: 100,
        right: -27,
        zIndex: 1,
        alignSelf: 'flex-end',
        transform: [{ translateX: -dimensions.SCREEN_WIDTH * 0.09 }],
      }}>
        <Image source={require('../../../assets/People/AddPostPople.png')} style={{ width: 74, height: 74, overflow: 'hidden', borderRadius: 10, }}></Image>
      </TouchableOpacity>
      <Modal
        isVisible={showChooseMilesModal}
        swipeDirection="down"
        onBackdropPress={() => setShowChooseMilesModal(false)}
        onSwipeComplete={(e) => {
          setShowChooseMilesModal(false)
        }}
        scrollTo={() => { }}
        scrollOffset={1}
        propagateSwipe={true}
        coverScreen={false}
        backdropColor='transparent'
        style={{ justifyContent: 'flex-end', margin: 0, backgroundColor: 'rgba(0,0,0,0.5)' }}
      >
        <View style={{ height: '50%', backgroundColor: '#fff', borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 20 }}>
          <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled={true}>
            <View style={{ alignItems: 'center' }}>
              <Text style={{ color: Mycolors.Black, fontWeight: '500', marginBottom: 30, marginTop: 10 }}>Choose Miles</Text>
              <MultiSlider
                // values={[multiSliderValue[0], multiSliderValue[1]]}
                values={[multiSliderValue[0]]}
                sliderLength={320}
                onValuesChange={multiSliderValuesChange}
                min={0}
                max={100}
                step={1}
                allowOverlap={false}
                minMarkerOverlapDistance={10}
                markerStyle={{
                  ...Platform.select({
                    ios: {
                      height: 30,
                      width: 30,
                      shadowColor: '#000000',
                      shadowOffset: {
                        width: 0,
                        height: 3
                      },
                      shadowRadius: 1,
                      shadowOpacity: 0.1,
                      borderColor: '#ED1C24',
                      borderWidth: 1
                    },
                    android: {
                      height: 30,
                      width: 30,
                      borderRadius: 50,
                      backgroundColor: '#fff',
                      borderColor: '#ED1C24',
                      borderWidth: 1
                    }
                  })
                }}
                pressedMarkerStyle={{
                  ...Platform.select({
                    android: {
                      height: 30,
                      width: 30,
                      borderRadius: 20,
                      backgroundColor: '#ED1C24'
                    }
                  })
                }}
                selectedStyle={{ backgroundColor: '#ED1C24' }}
                trackStyle={{
                  height: 5
                }}
                touchDimensions={{
                  height: 40,
                  width: 40,
                  borderRadius: 20,
                  slipDisplacement: 40
                }}
              />
              <View style={{
                flexDirection: 'row', alignItems: 'center', width: '95%',
                height: 60,
                paddingHorizontal: 20,
                backgroundColor: '#fff',
                alignSelf: 'center',
                shadowColor: 'rgba(0, 0, 0, 0.5)',
                shadowOffset: {
                  width: 0,
                  height: 3
                },
                shadowRadius: 1,
                shadowOpacity: 0.1,
                // overflow: 'hidden',
                elevation: 5,
                marginTop: 30,
                marginBottom: 30,
              }}>
                <TextInput
                  ref={myTextInput}
                  value={String(multiSliderValue[0])}
                  onChangeText={(e) => {
                    const value = e.replace(/[^0-9]/g, '')
                    if (Number(value) > 100) {
                      Toast.show('Miles cannot be more than 100', Toast.SHORT)
                    } else if (Number(value) < 0) {
                      Toast.show('Miles cannot be less than 0', Toast.SHORT)
                    } else {
                      multiSliderValuesChange([Number(value)])
                    }
                  }}
                  textAlignVertical={'center'}
                  // onChangeText={(e) => console.log('e', e)}
                  placeholder={'0'}
                  placeholderTextColor="#263238"
                  multiline={true}
                  // maxLength={500}
                  // keyboardType="number-pad"
                  autoCapitalize='none'
                  style={{
                    color: '#263238',
                    fontSize: 12,
                    fontWeight: '500'
                  }}
                  keyboardType='numeric'
                />
                <Text onPress={() => { myTextInput.current.focus() }} style={{ color: '#263238', fontSize: 12, fontWeight: '500' }}> miles</Text>
              </View>
              {/* <Text style={{color:Mycolors.GrayColor,fontWeight:'600',fontSize:12,marginTop:9}} >{multiSliderValue[0]} miles</Text> */}
            </View>

            <View style={{ width: '95%', alignSelf: 'center' }}>
              <MyButtons title="Save" height={50} width={'100%'} borderRadius={5} alignSelf="center" press={() => { props.navigation.navigate('ShopPayment') }} marginHorizontal={20} fontSize={11}
                titlecolor={Mycolors.BG_COLOR} backgroundColor={'#FFD037'} marginVertical={0} />
            </View>

            {/* <View style={{width:100,height:100}} /> */}
          </ScrollView>

        </View>
      </Modal>

      {/* three dot modal */}
      <Modal
        isVisible={showModal}
        swipeDirection="down"
        onBackdropPress={() => setShowModal(false)}
        onSwipeComplete={e => {
          setShowModal(false);
        }}
        scrollTo={() => { }}
        scrollOffset={1}
        propagateSwipe={true}
        coverScreen={false}
        backdropColor="transparent"
        style={{
          justifyContent: 'flex-end',
          margin: 0,
          backgroundColor: 'rgba(211, 211, 211, 0.7)',
        }}>
        <View
          style={{
            height: '50%',
            backgroundColor: '#FFF',
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            paddingVertical: 20,
          }}>

          <ScrollView
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled={true}>
            <View style={{ width: '90%', alignSelf: 'center', marginTop: 20 }}>
              {foolowStatus ?
                <View style={{ backgroundColor: '#F8F8F8', paddingHorizontal: 10, paddingVertical: 20, borderRadius: 10, marginTop: 8 }}>


                  <TouchableOpacity style={{ marginHorizontal: 20, flexDirection: 'row', alignItems: 'center' }} onPress={() => { UnFollowuser() }}>
                    {/* <Image source={require('../../../assets/images/people-bookmark.png')} style={{width:20, height:20}} resizeMode='contain'/> */}
                    <Text style={styles.link}>UnFollow</Text>
                  </TouchableOpacity>
                </View>
                :

                <View style={{ backgroundColor: '#F8F8F8', paddingHorizontal: 10, paddingVertical: 20, borderRadius: 10 }}>
                  <TouchableOpacity style={{ marginHorizontal: 20, flexDirection: 'row', alignItems: 'center' }} onPress={() => { Followuser() }}>
                    {/* <Image source={require('../../../assets/images/people-bookmark.png')} style={{width:20, height:20}} resizeMode='contain'/> */}

                    <Text style={styles.link}>Follow</Text>
                  </TouchableOpacity>


                </View>

              }
            </View>

            <View style={{ width: 100, height: 100 }} />
          </ScrollView>
        </View>
      </Modal>

      {/* edit profile modal */}

      <Modal
        isVisible={editModal}
        swipeDirection="down"
        onBackdropPress={() => setEditModal(false)}
        onSwipeComplete={e => {
          setEditModal(false);
        }}
        scrollTo={() => { }}
        scrollOffset={1}
        propagateSwipe={true}
        coverScreen={false}
        backdropColor="transparent"
        style={{
          justifyContent: 'flex-end',
          margin: 0,
          backgroundColor: 'rgba(211, 211, 211, 0.7)',
        }}>
        <View
          style={{
            height: '35%',
            backgroundColor: '#FFF',
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            paddingVertical: 20,
          }}>

          <ScrollView
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled={true}>
            <View style={{ width: '90%', alignSelf: 'center', marginTop: 20 }}>
              <View style={{ backgroundColor: '#F8F8F8', paddingHorizontal: 10, paddingVertical: 20, borderRadius: 10 }}>
                <TouchableOpacity style={{ marginHorizontal: 20, flexDirection: 'row', alignItems: 'center' }} onPress={() => { props.navigation.navigate('EditPost', { id: editItemId }), setEditModal(false) }}>
                  {/* <Image source={require('../../../assets/images/people-bookmark.png')} style={{width:20, height:20}} resizeMode='contain'/> */}

                  <Text style={{ fontSize: 14, color: 'black', }}>Edit</Text>

                </TouchableOpacity>


              </View>

              <View style={{
                backgroundColor: '#F8F8F8', paddingHorizontal: 10, paddingVertical: 20, borderRadius: 10, marginTop: 20
              }}>
                <TouchableOpacity style={{ marginHorizontal: 20, flexDirection: 'row', alignItems: 'center' }} onPress={() => { props.navigation.navigate('EditPost', { id: editItemId }), setEditModal(false) }}>
                  {/* <Image source={require('../../../assets/images/people-bookmark.png')} style={{width:20, height:20}} resizeMode='contain'/> */}

                  <Text style={{ fontSize: 14, color: 'black', }}>Delete Post</Text>

                </TouchableOpacity>


              </View>
            </View>

            <View style={{ width: 100, height: 100 }} />
          </ScrollView>
        </View >
      </Modal >


      {/* profile modal */}
      < Modal
        isVisible={profileModal}
        // swipeDirection="down"
        onBackdropPress={() => setProfileModal(false)}
        // onSwipeComplete={e => {
        //   setProfileModal(false);
        // }}

        style={{
          justifyContent: 'flex-start', // Update justifyContent to 'flex-start'
          margin: 0,
          height: 30,
          backgroundColor: 'transparent',
        }}>
        <View
          style={{
            height: '15%',
            backgroundColor: '#FFF',
            marginTop: '24%',
            width: '70%',
            alignSelf: 'flex-end',
            justifyContent: 'flex-end',
            right: 20,
            borderRadius: 20
          }}>

          <ScrollView
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled={true}>
            <View style={{ width: '90%', alignSelf: 'center', marginTop: 20 }}>
              {/* <View>
                <TouchableOpacity onPress={() => { setProfileModal(false) }} style={{ alignSelf: 'flex-end', width: 30, height: 25, marginTop: 9 }}>
                  <Image source={require('../../../assets/People/ModelClode.png')} style={{ alignSelf: 'flex-end' }}></Image></TouchableOpacity>
              </View> */}
              <View style={{ borderRadius: 10, }}>


                <TouchableOpacity style={{ marginHorizontal: 10, flexDirection: 'row', alignItems: 'center' }} onPress={() => {
                  props.navigation.navigate('PeopleProfileScreen');
                  setProfileModal(false);
                }}>
                  <Image source={require('../../../assets/People/PeopleProfileIConModal.png')} style={{ width: 34, height: 34 }} resizeMode='contain' />
                  <Text style={{ marginLeft: 4, fontSize: 14, left: 10, color: 'black' }}>My Profile</Text>
                </TouchableOpacity>
              </View >
              <View style={{ backgroundColor: '#EDEEEE', height: 1, width: '100%', marginTop: 5 }}>

              </View>
              <View style={{ marginTop: 10 }}>
                <TouchableOpacity style={{ marginHorizontal: 10, flexDirection: 'row', alignItems: 'center' }} onPress={() => {
                  AsyncStorage.clear();
                  dispatch(onLogoutUser())
                  setProfileModal(false);
                }}>
                  <Image source={require('../../../assets/People/PeopleLogoutIconModal.png')} style={{ width: 34, height: 34 }} resizeMode='contain' />

                  <Text style={{ fontSize: 14, left: 14, color: 'black' }}>Logout</Text>
                </TouchableOpacity>


              </View>


            </View>

            <View style={{ width: 100, height: 100 }} />
          </ScrollView>
        </View>
      </Modal >




    </SafeAreaView >
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
    width: '85%',
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
    width: dimensions.SCREEN_WIDTH * 0.9,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomWidth: 1,
    borderLeftColor: '#EDEEEE',
    borderRightColor: '#EDEEEE',
    borderBottomColor: '#EDEEEE'

  },
  rightButtonsView: {
    backgroundColor: '#F8F8F8',
    padding: 10,
    borderRadius: 20
  },
  followingImageView: {
    flexDirection: 'row',
    alignItems: 'center',

  },
  followingView: {
    justifyContent: 'center',
    marginLeft: 10
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    marginBottom: 20,
    marginRight: 20,
  },
  button: {
    width: 74,
    height: 74,
    overflow: 'hidden',
    borderRadius: 10,
    // Add any additional styles for your button container if needed
  },
  buttonImage: {
    width: 74,
    height: 74,
    // Add any additional styles for your button image if needed
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
    right: -12
  },
  imageView: {
    width: dimensions.SCREEN_WIDTH,
    height: 200,
    backgroundColor: '#F8F8F8',
    alignSelf: 'center',

  },
});
export default PeopleHome 