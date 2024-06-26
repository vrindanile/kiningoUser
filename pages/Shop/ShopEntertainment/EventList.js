// import React, { useEffect,useState ,useRef} from 'react';
// import {View,Image,Text,StyleSheet,SafeAreaView,TextInput,FlatList,Alert,TouchableOpacity, ScrollView, ImageBackground} from 'react-native';
// import HomeHeader from '../../../component/HomeHeader';
// import SearchInput2 from '../../../component/SearchInput2';
// import SearchInputEnt from '../../../component/SearchInputEnt';
// import SerchInput from '../../../component/SerchInput';
// import { dimensions, Mycolors } from '../../../utility/Mycolors';
// import { ImageSlider,ImageCarousel } from "react-native-image-slider-banner";
// import MyButtons from '../../../component/MyButtons';
// import {shop_entertainment_home, requestGetApi, requestPostApi } from '../../../WebApi/Service';
// import { useSelector, useDispatch } from 'react-redux';


// const ShopEntertainment = (props) => {
//   const [searchValue,setsearchValue]=useState('')
//   const User = useSelector(state => state.user.user_details)
//   const [loading, setLoading] = useState(false)
//   const [upData,setupData]=useState([
//     {
//       id: '1',
//       title: 'Hair Cut',
//       desc:'',
//       time:'',
//       img:require('../../../assets/images/images.png'),
//     },
//     {
//       id: '2',
//       title: 'Shaving',
//       desc:'',
//       time:'',
//       img:require('../../../assets/images/images.png'),
//     },
//     {
//       id: '3',
//       title: 'Facial',
//       desc:'',
//       time:'',
//       img:require('../../../assets/images/images.png'),
//     },
//     {
//       id: '4',
//       title: 'Hair Color',
//       desc:'',
//       time:'',
//       img:require('../../../assets/images/images.png'),
//     },
//     {
//       id: '5',
//       title: 'Hair wash',
//       desc:'',
//       time:'',
//       img:require('../../../assets/images/images.png'),
//     },
//     {
//       id: '6',
//       title: 'Beard style',
//       desc:'',
//       time:'',
//       img:require('../../../assets/images/images.png'),
//     },
//     {
//       id: '7',
//       title: 'Facial',
//       desc:'',
//       time:'',
//       img:require('../../../assets/images/images.png'),
//     },
//   ])
//   const [orderData, setorderData] = useState([])
//   useEffect(()=>{
//     myorderList()
//  },[])

//  const myorderList = async () => {

//   // return
//   setLoading(true)

//   const { responseJson, err } = await requestGetApi(shop_entertainment_home, '', 'GET', User.token)
//   setLoading(false)
//   console.log('the res shop_eat_orders ==>>', responseJson.body.vendors)
//   if (responseJson.headers.success == 1) {
//     setorderData(responseJson.body.vendors)
//   } else {
//     // setorderData(null)
//     // setrelode(!relode)
//   }

// }

//   return(
//     <SafeAreaView style={{}}>
//       <ScrollView>
//     <HomeHeader height={60}  paddingHorizontal={15}
//    press1={()=>{props.navigation.goBack()}} img1={require('../../../assets/arrow.png')} img1width={18} img1height={15} 
//    press2={()=>{}} title2={'Entertainment'} fontWeight={'500'} img2height={20}
//    press3={()=>{}} img3width={25} img3height={25} />
// <View style={{width:'95%',alignSelf:'center',backgroundColor:'rgba(0,0,0,0.025)',borderRadius:10,borderBottomColor:'rgba(0,0,0,0.5)',borderBottomWidth:0.2}}>
//   <HomeHeader height={40}  paddingHorizontal={15}
//    press1={()=>{}} img1={require('../../../assets/images/ent_location_image.png')} img1width={11} img1height={15} 
//    press2={()=>{}} title2={'New Yark USA'} fontWeight={'500'} img2height={20} right={dimensions.SCREEN_WIDTH*26/100} fontSize={10} color={Mycolors.GrayColor}
//    press3={()=>{}} img3={require('../../../assets/images/shape_32.png')} img3width={25} img3height={25} />
// </View>

// <View style={{width:'96%',alignSelf:'center'}}>
// <SearchInputEnt marginTop={10} placeholder={'Restaurant Name. Cuisine, Dishes'} 
// serchValue={searchValue} 
// onChangeText={(e)=>{setsearchValue(e)}} 
// press={()=>{Alert.alert('Hi')}}
// presssearch={()=>{Alert.alert('Search Pressed')}}
// paddingLeft={50}/>


//   {/* <View style={{height:140,borderRadius:10,overflow:'hidden',marginVertical:10,width:'98%',alignSelf:'center'}}>
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

//   {/* <View style={{width:'95%',flexDirection:'row',justifyContent:'space-between',alignSelf:'center',marginTop:20}}>
// <Text style={{color:Mycolors.Black,fontWeight:'500'}}>Explore Nearby</Text>
// <Text style={{color:Mycolors.RED,fontWeight:'500',textDecorationLine: "underline"}} 
//  onPress={()=>{}}>View More</Text>
// </View> */}

// <View style={{width:'100%',alignSelf:'center',marginTop:20}}>
//           <FlatList
//                   data={orderData}
//                   // horizontal={true}
//                   showsHorizontalScrollIndicator={false}
//                   numColumns={2}
//                   renderItem={({item,index})=>{
//                     return(
//       //  <View style={{width:dimensions.SCREEN_WIDTH/2.2,marginHorizontal:5}}>
//       //     <TouchableOpacity style={{width:dimensions.SCREEN_WIDTH/2.2,height:170,backgroundColor:Mycolors.LogininputBox,alignSelf:'center'}}
//       //     onPress={()=>{props.navigation.navigate('PlaceDetails')}}>
//       //     <Image source={item.img} style={{width:'100%',height:'100%',alignSelf:'center',borderRadius:7}}></Image>
//       //     </TouchableOpacity>
//       //     <View style={{}}>
//       //     <Text style={{fontSize:11,color:Mycolors.Black,marginTop:5,textAlign:'left',fontWeight:'bold'}}>Cafe 36</Text>
//       //     </View>
//       //     <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',padding:5,top:-10}}>
//       //     <Text style={{fontSize:9,color:Mycolors.DARK_GREY,marginTop:5,textAlign:'left',}}>Cafe</Text>
//       //     <TouchableOpacity style={{width:25,height:25,borderRadius:5,backgroundColor:'#fff',shadowColor: '#000',
//       // shadowOffset: {
//       //   width: 0,
//       //   height: 3
//       // },
//       // shadowRadius: 1,
//       // shadowOpacity: 0.3,
//       // justifyContent: 'center',
//       // elevation: 5,}}>
//       //     <Image source={require('../../../assets/images/layer_9.png')} style={{width:10,height:15,alignSelf:'center'}}></Image>
//       //     </TouchableOpacity>
//       //     </View>
//       //   </View>
//       <View style={{ width: 176, marginHorizontal: 6,marginTop:12,
//         // borderColor:'#DEDEDE',borderWidth:1,
//         borderRadius:15,backgroundColor:'#FFFF', }}>
//           <TouchableOpacity style={{ width: "100%", height: 130, backgroundColor: Mycolors.LogininputBox, alignSelf: 'center' ,padding:1}}
//             onPress={() => {
//               props.navigation.navigate('PlaceDetails',{data:item})
//             }}>
//             <Image source={{uri:item.banner_image}} style={{ width: '100%', height: '100%', alignSelf: 'center', borderRadius: 8, resizeMode: 'stretch' }}></Image>
//           </TouchableOpacity>
//           <View style={{left: 9 }}>
//             <Text style={{ fontSize: 12, color: Mycolors.Black, marginTop: 2, fontWeight: 'bold', left: 2 }}>{item.name}</Text>
//             <Text style={{ fontSize: 12, color: '#9B9B9B', marginTop: 2, fontWeight: '500', left: 2,fontStyle: 'italic',}}>Cuisine Name: Italian +2</Text>
//           </View>
//           <View style={{ padding: 5,left: 5,top:-3 }}>
//             <View style={{ flexDirection: 'row', }}>
//   {item.rating > 0 ? 
//             <View style={{ flexDirection: 'row', }}>
//               <Image source={require('../../../assets/Star.png')} style={{ width: 13, height: 13 }}></Image>
//               <Text style={{ fontSize: 12, color: Mycolors.Black, left: 2 }}>{Number(item.rating).toFixed(1)}</Text>
//              </View>
// : 
// <Text style={{ fontSize: 11, color: Mycolors.Black, left: 2 }}>No Rating Yet</Text>
// }
//               <View style={{backgroundColor:'transparent',height:4,width:4,justifyContent:"center",alignItems:"center",marginHorizontal:9,borderRadius:4/2,marginTop:7}} />
//              {item.tentative_time ?
//               <Image source={require('../../../assets/Clock.png')} style={{ width: 13, height: 13, marginLeft: -1, top: 1 }}></Image>
//             : null
//             }
//               <Text style={{ fontSize: 12, color: Mycolors.Black, left: 2 }}>{item.tentative_time}</Text>
//             </View>

//           </View>
//         </View>
//                     )
//                   }}
//                   keyExtractor={item => item.id}
//                 />
//          </View>

//  </View>
// <View style={{height:100}} />

// </ScrollView>
// <View style={{width:'80%',height:60,flexDirection:'row',justifyContent:'space-between',position:'absolute',bottom:20,alignSelf:'center'}}>
// <MyButtons title="Purchased Tickets" height={45} width={'100%'} borderRadius={10} alignSelf="center" press={()=>{props.navigation.navigate('ShopEntPurchasedTickets')}} fontSize={11}
//   titlecolor={Mycolors.BG_COLOR} backgroundColor={Mycolors.ServiceHeader}/>
// </View>
//     </SafeAreaView>
//      );
//   }
// const styles = StyleSheet.create({

// });
// export default ShopEntertainment 






import React, { useEffect, useState, useRef } from 'react';
import { RefreshControl, View, Image, Text, StyleSheet, SafeAreaView, TextInput, FlatList, Alert, TouchableOpacity, ScrollView, ImageBackground, StatusBar, Platform } from 'react-native';
import HomeHeader from '../../../component/HomeHeader';
import SearchInput2 from '../../../component/SearchInput2';
import SerchInput from '../../../component/SerchInput';
import { dimensions, Mycolors } from '../../../utility/Mycolors';
import { ImageSlider, ImageCarousel } from "react-native-image-slider-banner";
import MyButtons from '../../../component/MyButtons';
import { baseUrl, login, shop_eat_business, shop_entertainment_home, requestPostApi, requestGetApi, shop_eat } from '../../../WebApi/Service'
import Loader from '../../../WebApi/Loader';
import Toast from 'react-native-toast-message';
import MyAlert from '../../../component/MyAlert';
import { useSelector, useDispatch } from 'react-redux';
import { saveUserResult, saveUserToken, setVenderDetail, onLogoutUser, setUserType } from '../../../redux/actions/user_action';
import { setRestorentLocation } from '../../../redux/actions/latLongAction';
import GetLocation from 'react-native-get-location'
import Geocoder from "react-native-geocoding";
import { GoogleApiKey } from '../../../WebApi/GoogleApiKey';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { log } from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import { setNotificationData, setMessageCount } from '../../../redux/actions/latLongAction';
const data = [
    {
        id: '1',
        title: 'fun games',
        img: require('../../../assets/images/images.png'),
        location: 'street 114/B,Noida',
        review: '4.0',
        categories: 'entertainment',
        tickets: '1000+ orders served',
    },
    {
        id: '2',
        title: 'playstation ',
        img: require('../../../assets/images/images.png'),
        location: 'street 114/B,Noida',
        review: '4.0',
        categories: 'entertainment',
        tickets: '1000+ orders served',
    }

]


const EventList = (props) => {
    const [searchValue, setsearchValue] = useState('')
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false)
    const [My_Alert, setMy_Alert] = useState(false)
    const [alert_sms, setalert_sms] = useState('')
    const [My_Alert2, setMy_Alert2] = useState(false)
    const [alert_sms2, setalert_sms2] = useState('')
    const [My_Alert3, setMy_Alert3] = useState(false)
    const [alert_sms3, setalert_sms3] = useState('')

    return (
        <SafeAreaView style={{}}>
            <ScrollView
                style={{ flexGrow: 1 }}
                nestedScrollEnabled={true}
                // refreshControl={
                //     <RefreshControl
                //         refreshing={refreshing}
                //         onRefresh={onRefresh}
                //     />
                // }
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                <View>
                    <HomeHeader height={60} paddingHorizontal={15}
                        press1={() => { props.navigation.goBack() }} img1={require('../../../assets/arrow.png')} img1width={18} img1height={15}
                        press2={() => { }} title2={'Event List'} fontWeight={'500'} img2height={20}
                        press3={() => { }} img3width={25} img3height={25} />
                    {/* {cartCount != '0' ?
                        <View style={{ position: 'absolute', right: 8, top: 8, width: 20, height: 20, borderRadius: 20, backgroundColor: 'red', justifyContent: 'center', zIndex: 999 }}>
                            <Text style={{ fontSize: 11, textAlign: 'center', color: '#fff' }}>{cartCount}</Text>
                        </View>
                        : null
                    } */}
                    <View style={{
                        flex: 1, width: '90%',
                        marginLeft: 'auto',
                        marginRight: 'auto',

                    }}>

                        <SearchInput2 marginTop={10} placeholder={'Search Events'}
                            serchValue={searchValue}
                            onChangeText={(e) => {
                                // setsearchValue(e)
                                // homePageSearch()
                                if (e.text.length == 0) {
                                    // AllVenders()
                                }
                            }}
                            press={() => { Alert.alert('Hi') }}
                            presssearch={() => { }}
                            paddingLeft={15}

                        />
                    </View>
                    <View style={{ width: '100%', alignSelf: 'center', marginTop: 20 }}>
                        {
                            data.map((item, index) => {
                                return (

                                    <View style={{
                                        width: '90%', marginHorizontal: 5, alignSelf: 'center', backgroundColor: '#fff', marginVertical: 10, borderRadius: 7,
                                        shadowColor: '#000',
                                        shadowOffset: {
                                            width: 0,
                                            height: 3
                                        },
                                        shadowRadius: 1,
                                        shadowOpacity: 0.3,
                                        justifyContent: 'center',
                                        elevation: 5, paddingBottom: 15
                                    }}>
                                        <TouchableOpacity

                                            style={{ width: '100%', height: 180, backgroundColor: Mycolors.LogininputBox, alignSelf: 'center' }}
                                            onPress={() => {
                                                // props.navigation.navigate('FoodDetails', { data: item })
                                                // dispatch(setVenderDetail(item))
                                                props.navigation.navigate('PlaceDetails', { data: item })
                                            }}>
                                            <Image source={item.img} style={{ width: '100%', height: '100%', alignSelf: 'center', borderTopLeftRadius: 7, borderTopRightRadius: 7, resizeMode: 'stretch' }} resizeMode={'stretch'}></Image>

                                            {/* <View style={{ position: 'absolute', bottom: -5, left: 5, width: 80, height: 60 }}>
                                                <Image source={require('../../../assets/images/coupon.png')} style={{ width: '100%', height: '100%', alignSelf: 'center', resizeMode: 'stretch' }} resizeMode={'stretch'}></Image>
                                            </View> */}
                                        </TouchableOpacity>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5, paddingHorizontal: 9 }}>
                                            <View style={{}}>
                                                <Text style={{ fontSize: 16, color: Mycolors.Black, marginTop: 5, textAlign: 'left', fontWeight: '500', left: 7, }}>{item.title}</Text>
                                                <Text style={{ fontSize: 12, color: Mycolors.Black, marginTop: 5, textAlign: 'left', fontWeight: '500', left: 7 }}>{item.location}</Text>
                                                <Text style={{ fontSize: 12, color: Mycolors.Black, marginTop: 5, textAlign: 'left', fontWeight: '500', left: 7, }}>{item.categories}</Text>

                                            </View>
                                            <View style={{ padding: 5, alignItems: 'flex-end' }}>
                                                <TouchableOpacity style={{
                                                    width: 50, height: 28, borderRadius: 5, backgroundColor: 'red',
                                                    shadowColor: '#000',
                                                    shadowOffset: {
                                                        width: 0,
                                                        height: 3
                                                    },
                                                    shadowRadius: 1,
                                                    shadowOpacity: 0.3,
                                                    justifyContent: 'center',
                                                    elevation: 5, flexDirection: 'row', alignItems: 'center'
                                                }}>

                                                    <Text style={{ fontSize: 14, textAlign: 'left', fontWeight: 'bold', marginHorizontal: 4, color: '#fff', top: 1 }}>4.0</Text>
                                                    <Image source={require('../../../assets/Star.png')} style={{ width: 13, height: 13, alignSelf: 'center', marginRight: 4 }}></Image>
                                                </TouchableOpacity>

                                                <Text style={{ fontSize: 11, color: Mycolors.ORANGE, marginTop: 5, textAlign: 'left', fontWeight: '500', }}>1000+ orders served.</Text>

                                            </View>

                                        </View>

                                    </View>
                                )
                            })

                        }

                    </View>

                </View>




                <View style={{ height: 100 }} />

            </ScrollView>

            {loading ? <Loader /> : null}
            {My_Alert ? <MyAlert sms={alert_sms} okPress={() => { setMy_Alert(false) }} /> : null}

            {My_Alert2 ? <MyAlert sms={alert_sms2} sms2={'Logout'} okPress={() => { logoutDriver() }} canclePress={() => { setMy_Alert2(false) }} /> : null}

            {My_Alert3 ? <MyAlert sms={alert_sms3} okPress={rateOrder} canclePress={() => { setMy_Alert3(false) }} /> : null}

        </SafeAreaView>
    );
}
const styles = StyleSheet.create({

});
export default EventList 