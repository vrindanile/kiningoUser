// import React, { useEffect, useState, useRef } from 'react';
// import { View, Image, Text, StyleSheet, SafeAreaView, TextInput, FlatList, Alert, TouchableOpacity, ScrollView, ImageBackground, Keyboard } from 'react-native';
// import HomeHeaderRoundBottom from '../../../component/HomeHeaderRoundBottom';
// import SearchInput2 from '../../../component/SearchInput2';
// import SearchInputEnt from '../../../component/SearchInputEnt';
// import SerchInput from '../../../component/SerchInput';
// import { dimensions, Mycolors } from '../../../utility/Mycolors';
// import { ImageSlider, ImageCarousel } from "react-native-image-slider-banner";
// import MyButtons from '../../../component/MyButtons';
// import MultiSlider from '@ptomasroos/react-native-multi-slider';
// import Modal from 'react-native-modal';
// import Toast from 'react-native-simple-toast'

// const image1 = require('../../../assets/images/people-following-person.png')
// const image2 = require('../../../assets/images/people-sender-image.png')

// const PeopleMessage = (props) => {
//   const [searchValue, setsearchValue] = useState('')
//   const [scrollEnabled, setScrollEnabled] = useState(false)
//   const myTextInput = useRef()
//   const [userMessage, setUserMessage] = useState('')
//   const [multiSliderValue, setMultiSliderValue] = useState([0, 100])
//   const [showChooseMilesModal, setShowChooseMilesModal] = useState(false)
//   const [upData, setupData] = useState([
//     {
//       id: '1',
//       message: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...',
//       me: false,
//       time: '12:50 pm'
//     },
//     {
//       id: '2',
//       message: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...',
//       me: false,
//       time: '12:51 pm'
//     },
//     {
//       id: '2',
//       message: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...',
//       me: true,
//       time: '12:51 pm'
//     },
//     {
//       id: '2',
//       message: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...',
//       me: false,
//       time: '12:51 pm'
//     },
//     {
//       id: '2',
//       message: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...',
//       me: true,
//       time: '12:51 pm'
//     },

//   ])
//   const sendMessage = () => {
//     if (userMessage?.trim()?.length === 0) {
//       return
//     }
//     const lastId = upData?.length
//     setupData([...upData, {
//       id: String(lastId + 1),
//       message: userMessage,
//       me: true,
//       time: '6:00 pm'
//     }])
//     Keyboard.dismiss()
//     setUserMessage('')
//   }
//   const multiSliderValuesChange = (values) => { setMultiSliderValue(values) }
//   useEffect(() => {

//   }, [])


//   return (
//     <SafeAreaView scrollEnabled={scrollEnabled} style={{ backgroundColor: '#F8F8F8' }}>
//       <ScrollView>
//         <View style={{ flexDirection: 'row', alignItems: 'center', height: 80, backgroundColor: '#fff', padding: 20, borderBottomLeftRadius: 25, borderBottomRightRadius: 25 }}>
//           <TouchableOpacity onPress={() => { props.navigation.goBack() }}>
//             <Image source={require('../../../assets/images/events_arrow.png')} style={{ width: 25, height: 20 }} />
//           </TouchableOpacity>
//           <Image source={require('../../../assets/blankProfile.png')} style={{ marginLeft: 10, height: 28, width: 28, borderRadius: 30 }} />
//           <Text style={{ fontSize: 14, fontWeight: '600', color: '#455A64', marginLeft: 10 }}>Saurabh Saneja</Text>
//         </View>
//         <View style={{ width: '90%', alignSelf: 'center', marginTop: 20 }}>


//           <View style={{ width: '100%', alignSelf: 'center', marginTop: 20, backgroundColor: '#F8F8F8' }}>
//             <FlatList
//               data={upData}
//               showsHorizontalScrollIndicator={false}
//               numColumns={1}
//               renderItem={({ item, index }) => {
//                 return (
//                   <View style={{ width: '100%', marginHorizontal: 5, marginBottom: 20 }}>
//                     <View style={{ flexDirection: 'row', width: '80%', alignSelf: item.me ? 'flex-end' : 'flex-start' }}>
//                       {/* <Image source={item.me ? image2 : image1} style={{ width: 30, height: 30 }} /> */}
//                       <Image source={item.me ? image2 : image1} style={{ width: 30, height: 30 }} />
//                       <View style={{ width: '100%' }}>
//                         <View style={{ width: '85%', backgroundColor: '#fff', marginLeft: 10, padding: 10, borderRadius: 15, marginRight: 'auto' }}>
//                           <Text style={{ fontSize: 13, fontWeight: '400', color: '#455A64' }}>{item.message}</Text>
//                         </View>
//                         <Text style={{ fontSize: 10, fontWeight: '400', color: '#B2B7B9', marginLeft: 10, marginTop: 2 }}>{item.time}</Text>
//                       </View>
//                     </View>
//                   </View>
//                 )
//               }}
//               keyExtractor={item => item.id}
//             />
//           </View>






//         </View>
//         <View style={{ height: 100 }} />

//       </ScrollView>

//       <View style={styles.addCommentView}>
//         <TextInput
//           value={userMessage}
//           onChangeText={(text) => {
//             setUserMessage(text)
//           }}
//           placeholder="Type a message"
//           placeholderTextColor={'#B2B7B9'}
//           style={styles.input}
//           multiline
//         />
//         <TouchableOpacity onPress={sendMessage} style={styles.sendButtonView}>
//           <Text style={{ fontSize: 14, fontWeight: '500', color: '#fff' }}>Send</Text>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// }
// const styles = StyleSheet.create({
//   addCommentView: {
//     position: 'absolute',
//     bottom: 20,
//     width: '100%',
//     backgroundColor: '#fff',
//     padding: 15,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     // shadowColor: '#000',
//     // shadowOffset: {
//     //   width: 0,
//     //   height: 3
//     // },
//     // shadowRadius: 1,
//     // shadowOpacity: 0.3,
//     // elevation: 5,
//   },
//   input: {
//     paddingLeft: 20,
//     fontSize: 14,
//     fontWeight: '500',
//     color: '#000',
//     flex: 7
//   },
//   sendButtonView: {
//     backgroundColor: '#0089CF',
//     paddingHorizontal: 30,
//     paddingVertical: 10,
//     borderRadius: 20,
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center'
//   }
// });
// export default PeopleMessage 




import React, { useEffect, useState, useRef, useCallback } from 'react';
import { View, Image, Text, StyleSheet, TextInput, FlatList, Alert, TouchableOpacity, ScrollView, ImageBackground, Keyboard, KeyboardAvoidingView, ActivityIndicator } from 'react-native';
import HomeHeaderRoundBottom from '../../../component/HomeHeaderRoundBottom';
import SearchInput2 from '../../../component/SearchInput2';
import SearchInputEnt from '../../../component/SearchInputEnt';
import SerchInput from '../../../component/SerchInput';
import { dimensions, Mycolors } from '../../../utility/Mycolors';
import { ImageSlider, ImageCarousel } from "react-native-image-slider-banner";
import MyButtons from '../../../component/MyButtons';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import Modal from 'react-native-modal';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from 'react-redux';
import firestore from '@react-native-firebase/firestore';
//third parties
import moment from 'moment';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import Hyperlink from 'react-native-hyperlink';

const image1 = require('../../../assets/images/people-following-person.png')
const image2 = require('../../../assets/images/people-sender-image.png')

const PeopleMessage = (props) => {
  const dispatch = useDispatch();
  const User = useSelector(state => state.user.user_details)
  console.log('User', User);
  const flatListRef = useRef();
  const user_details = useSelector(state => state.user.user_details)
  const [searchValue, setsearchValue] = useState('');
  const [showLoader, setshowLoader] = useState(false);
  const [MessagesData, setMessagesData] = useState([]);
  const [UserId, setuid] = useState('')
  const [driver_id, setDriverid] = useState('')
  const [messages, setMessages] = useState([]);
  const [scrollEnabled, setScrollEnabled] = useState(false)
  const myTextInput = useRef()
  const [userMessage, setUserMessage] = useState('');
  const [ChatImage, setChatImage] = useState('');
  const [ChatDocument, setChatDocument] = useState('');
  const [message, setmessage] = useState('');
  const [multiSliderValue, setMultiSliderValue] = useState([0, 100])
  const [showChooseMilesModal, setShowChooseMilesModal] = useState(false)
  const [upData, setupData] = useState([
    {
      id: '1',
      message: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...',
      me: false,
      time: '12:50 pm'
    },
    {
      id: '2',
      message: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...',
      me: false,
      time: '12:51 pm'
    },
    {
      id: '2',
      message: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...',
      me: true,
      time: '12:51 pm'
    },
    {
      id: '2',
      message: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...',
      me: false,
      time: '12:51 pm'
    },
    {
      id: '2',
      message: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...',
      me: true,
      time: '12:51 pm'
    },

  ])

  //function : navigation function
  const gotoFullImageView = image => {
    navigation?.navigate(ScreenNames.FULL_IMAGE_VIEW, { image: image });
  };
  const gotoPdfView = image =>
    navigation.navigate(ScreenNames.VIEW_PDF, {
      pdfUrl: image,
      pdfTitle: 'Track Sheet',
      type: 'PDF',
    });
  //function : imp function
  const openModal = () => {
    Keyboard.dismiss();
    setShowAttachment(true);
  };

  //function : service function
  // const getUserDetail = async () => {
  //   try {
  //     const resp = await Server.getApiWithToken(
  //       userToken,
  //       Server.GET_USER_DETAIL,
  //     );
  //     if (resp?.data?.status) {
  //       setUserInfo(resp?.data?.data);
  //     }
  //   } catch (error) {
  //     console.log('error in getUserDetail', error);
  //   }
  // };

  // const resetChatCount = async () => {
  //   try {
  //     const data = {
  //       receiver_id: UserId,
  //     };
  //     const resp = await Server.postApiWithToken(
  //       userToken,
  //       Server.READ_MSG,
  //       data,
  //     );
  //     if (resp.data.status) {
  //       dispatch(UserAction.setChatCount(0));
  //     }
  //   } catch (error) {
  //     console.log('error in resetChatCount', error);
  //   }
  // };
  const sendMessage = async () => {
    if (message == '' && ChatImage == '' && ChatDocument == '') {
    } else {
      if (ChatImage == '' && ChatDocument == '') {
        try {
          const Data = {
            userId: driver_id,
            message: message,
            createdAt: new Date(),
          };
          firestore()
            .collection('PeopleConnect')
            .doc(docid)
            .collection('Messages')
            .add({ ...Data, createdAt: firestore.FieldValue.serverTimestamp() });
          const tempMsg = message;
          setmessage('');
          try {
            // const data = {
            //   receiver_id: UserId,
            //   msg: tempMsg,
            // };
            // await Server.postApiWithToken(userToken, Server.SEND_MSG, data);
          } catch (error) {
            console.log('error while api call ', error);
          }
        } catch (error) {
          console.log('error in sendMessage', error);
        }
      } else {
        setshowLoader(true);
        const formData = new FormData();
        if (ChatDocument == '') {
          const imageName = ChatImage.path.slice(
            ChatImage.path.lastIndexOf('/'),
            ChatImage.path.length,
          );
          formData.append('image', {
            name: imageName,
            type: ChatImage.mime,
            uri: ChatImage.path,
          });
        }
        // else {
        //   let documentPath = ChatDocument.uri;
        //   const docsName = ChatDocument.name;
        //   formData.append('image', {
        //     name: docsName,
        //     type: ChatDocument.type,
        //     uri: documentPath,
        //   });
        // }
        // formData.append('receiver_id', UserId);
        // formData.append('msg', message);
        // try {
        //   const resp = await Server.postApiWithToken(
        //     userToken,
        //     Server.SEND_MSG,
        //     formData,
        //   );
        //   if (resp.data.status) {
        //     const Data = {
        //       userId: driver_id,
        //       message: message,
        //       createdAt: new Date(),
        //       image: resp.data.url,
        //     };
        //     firestore()
        //       .collection('Chat')
        //       .doc(docid)
        //       .collection('Messages')
        //       .add({
        //         ...Data,
        //         createdAt: firestore.FieldValue.serverTimestamp(),
        //       });
        //     setmessage('');
        //     setChatImage('');
        //     setChatDocument('');
        //     setshowLoader(false);
        //   }
        // } catch (error) {
        //   console.log('error while uploading images ', error);
        //   setshowLoader(false);
        // }
      }
    }
  };
  // function : render function
  const chatRenderFunction = ({ item }) => {
    return (
      <View
        key={item.id}
        style={{
          marginVertical: 10,
          alignItems: driver_id == item?.userId ? 'flex-end' : 'flex-start',
        }}>
        <View
          style={{
            backgroundColor:
              driver_id == item?.userId ? 'white' : 'lightpink',
            borderRadius: 10,
            padding: 10,
          }}>
          {/* {item.image ? (
          <TouchableOpacity
            onPress={() =>
              item?.image?.includes('pdf')
                ? gotoPdfView(item.image)
                : gotoFullImageView(item.image)
            }>
            <Image
              source={{
                uri: item?.image?.includes('pdf')
                  ? pdfImageUrl
                  :pdfImageUrl //Server.BASE_URL + item.image,
              }}
              style={{
                height: 200,
                width: 200,
                borderRadius: 10,
                resizeMode: 'contain',
              }}
            />
          </TouchableOpacity>
        ) : null} */}
          {item?.message ? (
            <Hyperlink
              linkStyle={{ color: '#0000FF' }}
              onPress={(url, text) => Linking.openURL(url)}>
              <Text
                style={{
                  color:
                    driver_id == item?.userId ? 'black' : 'white',
                  fontWeight: 'bold',
                  // fontFamily: Fonts.SEMI_BOLD,
                }}>
                {item?.message}
              </Text>
            </Hyperlink>
          ) : null}
        </View>
        <View style={{}}>
          <Text
            style={{
              color:
                driver_id == item?.userId ? 'black' : 'black',
              fontWeight: 'bold',
              // fontFamily: Fonts.SEMI_BOLD,
              fontSize: 8,
              marginHorizontal: 5,
            }}>
            {moment(item.createdAt).format('lll')}
          </Text>
        </View>
      </View>
    );
  };
  const docid =
    driver_id > UserId ? UserId + "-" + driver_id : driver_id + "-" + UserId;

  //useEffect
  useEffect(() => {
    console.log("Reciver_id", props.route.params.UserId,);
    console.log('yyy', props.route.params.fullname);
    // resetChatCount();
    var UserId = user_details.userid
    var driver_id = props.route.params.UserId
    const docid =
      driver_id > UserId ? UserId + "-" + driver_id : driver_id + "-" + UserId;

    setuid(UserId)
    setDriverid(driver_id)


    const MessageRef = firestore()
      .collection('PeopleConnect')
      .doc(docid)
      .collection('Messages')
      .orderBy('createdAt', 'desc');
    const unSubscribe = MessageRef.onSnapshot(querySnap => {
      if (querySnap != null) {
        const AllMsg = querySnap.docs.map(docSnap => {
          const data = docSnap.data();
          if (data.createdAt) {
            return {
              ...docSnap.data(),
              createdAt: docSnap.data().createdAt.toDate(),
            };
          } else {
            return {
              ...docSnap.data(),
              createdAt: new Date(),
            };
          }
        });
        setMessagesData(AllMsg);
        console.log('====================================');
        console.log(AllMsg);
        console.log('====================================');
      } else {
        setMessagesData([]);
      }
    });
    // Stop listening for updates when no longer required
    return () => unSubscribe();
  }, [driver_id]);
  //useEffect
  useEffect(() => {
    // getUserDetail();

    return () => { };
  }, []);

  useEffect(() => {
    if (Platform.OS === 'ios') {
      PushNotificationIOS?.checkPermissions(async permissions => {
        if (!permissions?.badge) {
          try {
            await PushNotificationIOS?.requestPermissions();
          } catch (err) {
            console.log('error', err);
          }
        } else {
          PushNotificationIOS?.setApplicationIconBadgeNumber(0);
        }
      });
    }
    return () => { };
  }, []);

  // function : render function

  return (
    <SafeAreaView scrollEnabled={scrollEnabled} style={{ backgroundColor: '#E0E0E0', flex: 1 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', height: 60, padding: 14, justifyContent: 'space-between', width: "100%" }}>
        <TouchableOpacity onPress={() => { props.navigation.goBack() }}>
          <Image source={require('../../../assets/images/dating-back-arrow.png')} style={{ width: 25, height: 15, left: -5 }} resizeMode='contain' />
        </TouchableOpacity>

        <View style={{ justifyContent: 'center', alignItems: 'center', marginRight: 14 }}>
          <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#4a4c52', }}>{props.route.params.fullname}</Text>
        </View>
        <View style={{ justifyContent: 'center', alignItems: 'center', }}>
          {/* <Image source={require('../../../assets/images/dating-home-header-left-image.png')} style={{height:40, width:40, borderRadius:20, borderColor:'#e42f5e', borderWidth:2}}/> */}
        </View>

      </View>
      <View style={{ borderBottomColor: "#0089CF", borderWidth: 0.5, width: dimensions.SCREEN_WIDTH }} />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView>

          <View style={{ width: '90%', alignSelf: 'center', marginTop: 20 }}>


            <View


              style={{ width: '100%', alignSelf: 'center', marginTop: 20, backgroundColor: '#E0E0E0' }}

            >
              {MessagesData.length > 0 ? (
                <FlatList
                  inverted
                  ref={flatListRef}
                  //onContentSizeChange={() => flatListRef.current.scrollToEnd({ animated: false })}
                  //onLayout={() => flatListRef.current.scrollToEnd({ animated: false })}
                  showsVerticalScrollIndicator={false}
                  data={MessagesData}
                  renderItem={chatRenderFunction}
                  keyExtractor={(item, index) => index.toString()}
                />
              ) : (
                <>
                  {/* <Text style={{textAlign: 'center'}}>Say hi to start chat</Text> */}
                  <ActivityIndicator
                    animating={showLoader}
                    size="large"
                    color="#f39322"
                  />
                </>
              )}

            </View>
          </View>
          <View style={{ height: 100 }} />

        </ScrollView>
      </KeyboardAvoidingView>
      <View style={styles.addCommentContainer}>
        <View style={styles.addCommentView}>
          <TextInput
            value={message}
            onChangeText={(text) => {
              setmessage(text)
            }}
            placeholder="Type a message"
            placeholderTextColor={'#0089CF'}
            style={[styles.input, { width: '70%' }]}
            multiline
          />
          <View style={{ flexDirection: 'row', alignItems: 'center', width: '30%', justifyContent: 'flex-end' }}>
            {/* <TouchableOpacity onPress={sendMessage} style={styles.cameraButtonView}>
            <Image source={require('../../../assets/images/dating-camera-icon.png')}/>
        </TouchableOpacity> */}
            <TouchableOpacity onPress={sendMessage} style={styles.sendButtonView}>
              <Image source={require('../../../assets/People/ShareButtonChat.png')} style={styles.sendButton} resizeMode='contain' />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>

  );
}
const styles = StyleSheet.create({
  addCommentContainer: {
    position: 'absolute',
    bottom: 0,
    padding: 15,
    backgroundColor: '#fff5f7',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 0.5,
    borderTopColor: '#ffb0ba',
  },
  addCommentView: {
    width: '100%',
    backgroundColor: '#E0E0E0',
    // padding:15, 
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 12
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 3
    // },
    // shadowRadius: 1,
    // shadowOpacity: 0.3,
    // elevation: 5,
  },
  input: {
    paddingLeft: 20,
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
  },
  sendButtonView: {
    backgroundColor: '#E0E0E0',
    height: 50,
    width: 50,
    borderRadius: 50 / 2,
    // flex:1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  sendButton: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 20,
    width: 20,
    left: 3
  },
  cameraButtonView: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    // flex:1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  leftMessage: {
    fontSize: 13,
    fontWeight: '400',
    color: '#996673'
  },
  rightMessage: {
    fontSize: 13,
    fontWeight: '400',
    color: '#fff'
  },
});
export default PeopleMessage
