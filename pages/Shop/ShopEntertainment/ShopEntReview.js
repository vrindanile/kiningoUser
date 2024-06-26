import React, { useEffect, useState, useRef } from 'react';
import { View, Image, Text, StyleSheet, SafeAreaView, TextInput, FlatList, Alert, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import HomeHeader from '../../../component/HomeHeader';
import SearchInput2 from '../../../component/SearchInput2';
import SerchInput from '../../../component/SerchInput';
import { dimensions, Mycolors } from '../../../utility/Mycolors';
import { ImageSlider, ImageCarousel } from "react-native-image-slider-banner";
import MyButtons from '../../../component/MyButtons';
import Modal from 'react-native-modal';
import DatePicker from 'react-native-datepicker';
import { Rating, AirbnbRating } from 'react-native-ratings';
// import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import ImagePicker from "react-native-image-crop-picker"
import { shop_entertainment_home, shop_entertainment_book_entertainment, shop_entertainment_vendor_id, requestGetApi, requestPostApi, vendor_detail, add_cart, update_card, add_review, requestPostApiImages } from '../../../WebApi/Service';
import { useSelector, useDispatch } from 'react-redux';


const ShopReview = (props) => {
  const User = useSelector(state => state.user.user_details)
  const person_Image = "https://images.unsplash.com/photo-1491349174775-aaafddd81942?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8cGVyc29ufGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
  const [checkitem, setcheckitem] = useState('')
  const [reson, setreson] = useState('')
  const [modlevisual, setmodlevisual] = useState(false);
  const [pick, setpick] = useState('')
  const [filepath, setfilepath] = useState(null)
  const [upData, setupData] = useState([
    {
      id: '1',
      title: 'Tasty Food',
      desc: 'Order placed by mistake',
      time: '',

    },
    {
      id: '2',
      title: 'Extremely Yummy Food',
      desc: 'Food preparation time was to late',
      time: '',

    },
    {
      id: '3',
      title: 'Average',
      desc: 'Restaurant manager behaviour was not good',
      time: '',

    },
    {
      id: '4',
      title: 'Not Good',
      desc: 'Changed my mind',
      time: '',

    },
    {
      id: '5',
      title: 'Bad',
      desc: 'Changed my mind',
      time: '',

    },

  ])
  const [splitBillImage, setSplitBillImage] = useState([])
  useEffect(() => {

  }, [])
  const requestCameraPermission = async () => {
    try {
      let value = await ImagePicker.openCamera({
        width: 1080,
        height: 1080,
        cropping: true,
        mediaType: "photo",
        compressImageQuality: 1,
        compressImageMaxHeight: 1080 / 2,
        compressImageMaxWidth: 1080 / 2
      }).then(image => {
        const img = {
          name: image.path.slice(
            image.path.lastIndexOf("/"),
            image.path.length
          ),
          uri: image.path,
          type: image.mime
        }
        setSplitBillImage([img])
        setCameraGalleryModal(false)
      })
    } catch (error) {
      setmodlevisual(false)
      console.log("error in openLibrary", error)
    }
  }

  // function for open gallery
  const openLibrary = async () => {
    try {
      let imageList = []
      let value = await ImagePicker.openPicker({
        width: 1080,
        height: 1080,
        cropping: true,
        multiple: true,
        mediaType: "photo",
        compressImageQuality: 1,
        compressImageMaxHeight: 1080 / 2,
        compressImageMaxWidth: 1080 / 2
      }).then(image => {
        image.map(e => {
          imageList.push({
            name: e.path.slice(e.path.lastIndexOf("/"), e.path.length),
            uri: e.path,
            type: e.mime
          })
        })
        setSplitBillImage(imageList)
        setmodlevisual(false)
      })
    } catch (error) {
      setmodlevisual(false)
      console.log("error in openLibrary", error)
    }
  }
  // const openLibrary = async () => {
  //   setmodlevisual(false)
  //   let options = {
  //     title: 'Select Image',
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
  //   };

  //   launchImageLibrary(options, (image) => {
  //     if (!image.didCancel) {
  //       console.log('the ddd==', image.assets[0].uri)
  //       var photo = {
  //         uri: image.assets[0].uri,
  //         type: "image/jpeg",
  //         name: image.assets[0].fileName
  //       };
  //       setpick(photo)
  //       setfilepath(image)
  //     }
  //   })


  // }

  // const opencamera = async () => {
  //   setmodlevisual(false)

  //   let options = {
  //     title: 'Select Image',
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
  //   };

  //   launchCamera(options, (image) => {
  //     if (!image.didCancel) {
  //       console.log('the ddd==', image)
  //       var photo = {
  //         uri: image.assets[0].uri,
  //         type: "image/jpeg",
  //         name: image.assets[0].fileName
  //       };
  //       setpick(photo)
  //       setfilepath(image)
  //     }

  //   })
  // }
  // const requestCameraPermission = async () => {
  //   opencamera()
  //   // try {
  //   //   const granted = await PermissionsAndroid.request(
  //   //     PermissionsAndroid.PERMISSIONS.CAMERA,
  //   //     {
  //   //       title: "App Camera Permission",
  //   //       message:"App needs access to your camera ",
  //   //       buttonNeutral: "Ask Me Later",
  //   //       buttonNegative: "Cancel",
  //   //       buttonPositive: "OK"
  //   //     }
  //   //   );
  //   //   console.log("CPermissionsAndroid.RESULTS",PermissionsAndroid.RESULTS.GRANTED);
  //   //   console.log("CPermissionsAndroid.RESULTS",granted);
  //   //   if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //   //     console.log("Camera permission given");
  //   //     opencamera()
  //   //   } else {
  //   //     console.log("Camera permission denied");
  //   //     // opencamera()
  //   //   }
  //   // } catch (err) {
  //   //   console.warn(err);
  //   // }
  // };
  // const submitRewiew = async () => {
  //   console.log('klklklkl submitReview');
  //   var data = {
  //     reviewimage: '',
  //     business_id: '20',
  //     items_review: [{
  //       entertainment_id: '115',
  //       rating: '2',
  //       comments: 'gggggg'
  //     }]

  //   }
  //   console.log('the form data==>>', data)
  //   const { responseJson, err } = await requestPostApi(add_review, data, 'POST', User.token)
  //   setLoading(false)
  //   console.log('the res shop_eat_cart_place_order==>>', responseJson)
  //   if (responseJson.headers.success == 1) {
  //     // setsubData()
  //     setvenderRating('0')
  //     setreson('')
  //     Toast.show({ text1: responseJson.headers.message })
  //     props.navigation.navigate('ShopMyOrder')
  //   } else {
  //     // setalert_sms(err)
  //     // setMy_Alert(true)
  //   }
  // };
  const submitRewiew = async () => {
    const data = new FormData()
    console.log('pick imagesss---->>', pick);
    // if (pick !== null) {
    //   pick.map((e, index) => {
    //     data.append('reviewimage', e)
    //   })
    // }
    if (splitBillImage !== null) {
      splitBillImage.map((e, index) => {
        data.append('reviewimage', e)
      })
    }

    data.append("business_id", '20',)
    // Append items_review array
    const itemsReview = [
      {
        entertainment_id: '115',
        rating: '2',
        comments: reson
      },
      // Add more objects as needed
    ];
    itemsReview.forEach((item, index) => {
      data.append(`items_review[${index}][entertainment_id]`, item.entertainment_id);
      data.append(`items_review[${index}][rating]`, item.rating);
      data.append(`items_review[${index}][comments]`, item.comments);
    });
    const { responseJson, err } = await requestPostApiImages(add_review, data, 'POST', User.token)
    console.log('response of edit expanse------>>', responseJson);
    if (responseJson.headers.success == 1) {
      setvenderRating('0')
      setreson('')
      Toast.show({ text1: responseJson.headers.message })
      props.navigation.navigate('ShopMyOrder')
    } else {
      setLoader(false)

    }
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F8F8F8' }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <HomeHeader height={60} paddingHorizontal={15} backgroundColor={'#fff'}
          press1={() => { props.navigation.goBack() }} img1={require('../../../assets/arrow.png')} img1width={18} img1height={15}
          press2={() => { }} title2={'Entertainment'} fontWeight={'500'} img2height={20}
          press3={() => { }} img3width={25} img3height={25} />

        <View style={{ width: '90%', alignSelf: 'center' }}>
          <Text style={{ fontWeight: '500', fontSize: 13, marginTop: 20, color: Mycolors.Black, lineHeight: 20 }}>What's your Rate?</Text>
          <View style={{ marginTop: 20, paddingHorizontal: 5, backgroundColor: '#F8F8F8', alignItems: 'flex-start' }}>
            <Rating
              // type='heart'
              ratingCount={5}
              imageSize={35}
              startingValue={3}
            // tintColor='#F8F8F8'
            // unSelectedColor={Mycolors.Black}
            // readonly={true}
            // showRating
            //onFinishRating={this.ratingCompleted}
            />
          </View>

          <Text style={{ fontWeight: '500', fontSize: 13, marginTop: 20, color: Mycolors.Black, lineHeight: 20 }}>Your comment</Text>

          <View style={{ width: '100%', height: 120, borderRadius: 2, marginTop: 10, alignSelf: 'center' }}>
            <TextInput
              value={reson}
              onChangeText={(e) => setreson(e)}
              placeholder={'Type here.....'}
              placeholderTextColor="#bbbbbb"
              multiline={true}
              // maxLength={500}
              // keyboardType="number-pad"
              autoCapitalize='none'
              style={[styles.input]}
            />

          </View>

          <Text style={{ fontWeight: '500', fontSize: 13, marginTop: 10, color: Mycolors.Black, lineHeight: 20 }}>Upload Photos</Text>

          <View style={{ width: '100%', height: 230, borderRadius: 2, marginTop: 10, marginBottom: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFF3FF', borderRadius: 7, padding: 5 }}>
            <View style={{ alignItems: 'center', borderColor: '#D6D1D1', borderWidth: 2, borderStyle: 'dashed', padding: 20, width: '100%', height: 220, borderRadius: 7 }}>

              <Image source={require('../../../assets/images/ent_camera_image.png')} style={{ width: 60, height: 48 }} resizeMode='cover' />

              <Text style={{ fontWeight: '500', fontSize: 16, marginTop: 20, color: Mycolors.Black, lineHeight: 20, textAlign: 'center' }}>{`Click Here To Upload A Driving\n License Photo`}</Text>

              <MyButtons title="Upload Photo" height={45} width={'70%'} borderRadius={20} press={() => { setmodlevisual(true) }} fontSize={12}
                titlecolor={Mycolors.BG_COLOR} marginVertical={20} backgroundColor={Mycolors.ServiceHeader} />

            </View>
          </View>
          {filepath ?
            <View style={{ width: 100, height: 100, borderColor: Mycolors.BG_COLOR, borderWidth: 1, borderRadius: 50, marginVertical: 10, top: 5 }}>
              <Image
                // source={filepath !=null ? {uri:filepath.assets[0].uri}  : { uri: props?.route?.params?.data?.profile_image!=''? props?.route?.params?.data?.profile_image : person_Image }}
                source={{ uri: filepath.assets[0].uri }}
                style={{
                  height: 100,
                  width: 100,
                  borderRadius: 7,
                  borderWidth: 0.1,
                  borderColor: Mycolors.BG_COLOR
                }}
              />
              <TouchableOpacity style={{ position: 'absolute', width: 36, height: 36, right: -15, top: -15, borderRadius: 18 }} onPress={() => { setfilepath(null) }}>
                <Image source={require('../../../assets/images/ent_delete_image.png')} style={{ height: 36, width: 36, alignSelf: 'center' }} />
              </TouchableOpacity>
            </View> : null}
          <View style={{ width: '100%', marginTop: 30 }}>
            <MyButtons title="Submit" height={50} width={'100%'} borderRadius={5} alignSelf="center" press={() => { submitRewiew() }} marginHorizontal={20} fontSize={14}
              titlecolor={Mycolors.BG_COLOR} backgroundColor={Mycolors.ServiceHeader} />
          </View>


        </View>
        <View style={{ height: 100 }} />
      </ScrollView>


      <Modal
        isVisible={modlevisual}
        swipeDirection="down"
        onSwipeComplete={(e) => {
          setmodlevisual(false)
        }}
        coverScreen={false}
        backdropColor='transparent'
        style={{ justifyContent: 'flex-end', margin: 0, }}
      >
        <View style={{ height: 150, backgroundColor: Mycolors.BG_COLOR, borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 20, margin: 0, bottom: 0 }}>
          <View style={styles.mainView}>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
              <TouchableOpacity style={{ width: 150, height: 150 }}
                onPress={() => { openLibrary() }}
              >
                <Image
                  source={require('../../../assets/images/gallery.png')}
                  style={{ width: 40, height: 40, alignSelf: 'center' }}
                />
                <Text style={{ textAlign: 'center', color: Mycolors.TEXT_COLOR }}>Open Library</Text>
              </TouchableOpacity>

              <TouchableOpacity style={{ width: 150, height: 150 }}
                onPress={() => { requestCameraPermission() }}
              >
                <Image
                  source={require('../../../assets/images/camera.png')}
                  style={{ width: 40, height: 35, alignSelf: 'center' }}
                />
                <Text style={{ textAlign: 'center', color: Mycolors.TEXT_COLOR }}>Open Camera</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  input: {
    paddingLeft: 15,
    width: '100%',
    fontSize: 13,
    borderColor: 'rgba(0,0,0,0.2)',
    borderWidth: 0.5,
    // backgroundColor: '#34333a',
    color: '#fff',
    height: 100,
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 10,
    color: Mycolors.Black
  },

});
export default ShopReview