import React, { useEffect, useState, useRef } from "react";
import {
    View,
    Image,
    Text,
    StyleSheet,
    SafeAreaView,
    TextInput,
    FlatList,
    Alert,
    TouchableOpacity,
    ScrollView,
    ImageBackground,
    Platform,
    TouchableWithoutFeedback
} from "react-native";
import HomeHeaderRoundBottom from "../../../component/HomeHeaderRoundBottom";
// import SearchInput2 from "../../../component/SearchInput2";
// import SearchInputEnt from "../../../component/SearchInputEnt";
// import ServiceSearch from "./Components/ServiceSearch";
// import SerchInput from "../../../component/SerchInput";
import { dimensions, Mycolors } from "../../../utility/Mycolors";
import { ImageSlider, ImageCarousel } from "react-native-image-slider-banner";
import MyButtons from "../../../component/MyButtons";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import Modal from "react-native-modal";
import DatePicker from "react-native-datepicker";
import DateTimePicker from "@react-native-community/datetimepicker";
import LinearGradient from "react-native-linear-gradient";
import AppIntroSlider from "react-native-app-intro-slider";
import IconFontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Loader from "../../../WebApi/Loader";
import moment from "moment";
import Toast from "react-native-toast-message";
import { useSelector, useDispatch } from "react-redux";
import {
    common_category_attribute_type,
    deal_c2c_favorites_car,
    deal_services_my_bookinglist,
    deal_services_request_accepted,
    deal_services_request_list,
    requestGetApi,
    requestPostApi,
    inevtion_transaction
} from "../../../WebApi/Service";

const StartupPaymentHistory = (props) => {
    const User = useSelector((state) => state.user.user_details);
    const [loading, setLoading] = useState(false);
    const [myService, setMyService] = useState([]);
    const [orderDate, setOrderDate] = useState("");
    // console.log(orderDate, 'orderDate');
    const [showda, setshowda] = useState(false);

    const [searchValue, setsearchValue] = useState("");
    const [scrollEnabled, setScrollEnabled] = useState(false);
    const myTextInput = useRef();
    const [multiSliderValue, setMultiSliderValue] = useState([0, 100]);
    const [showChooseMilesModal, setShowChooseMilesModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("1");
    const [showFilterModal, setShowFilterModal] = useState(false);
    const [isChangesort, setChangeSort] = useState("");
    const [statusValue, setStatusValue] = useState("");
    const [transactionData, setTransactionData] = useState([])
    console.log('my trnasaction daya', transactionData);
    const [orderTypeValue, setOrderTypeValue] = useState("");
    const [orderTypeData, setOrderTypeData] = useState([
        { label: "Received", value: "0" },
        { label: "Contributed", value: "1" },
        // { label: "Cancelled", value: "2" },
    ]);
    const multiSliderValuesChange = (values) => {
        setMultiSliderValue(values);
    };
    useEffect(() => {
        // GetMyServicesStatus();
        GetMyServicesStatus()
    }, []);
    const GetMyServicesStatus = async () => {
        setLoading(true)
        var fUrl = inevtion_transaction
        var urls = User.userid
        var murl = '?module_id=' + '57'

        // console.log('my url---------->', urls)
        if (urls != undefined) {
            fUrl = fUrl + urls + murl
        }

        console.log("LIKE CLICK for cooking:::", fUrl, responseJson);
        const { responseJson, err } = await requestGetApi(fUrl, '', 'GET', User.token)
        setLoading(false)

        console.log('the res after sucess oa', responseJson)



        if (responseJson.headers.success === 1) {
            setTransactionData(responseJson.body.data);
        }
        else {
            setalert_sms(err);
            setMy_Alert(true);
        }

    }
    // const GetMyServicesStatus = async () => {
    //     setLoading(true);
    //     var fUrl = inevtion_transaction
    //     var urls = User.userid
    //     var murl = '?module_id=' + '59'
    //     console.log('my url---------->', urls)
    //     if (urls != undefined) {
    //         fUrl = fUrl + urls + murl
    //     }

    //     console.log("LIKE CLICK for cooking:::", fUrl);

    //     const { responseJson, err } = await requestGetApi(
    //         fUrl,

    //         "GET",
    //         User.token
    //     );
    //     setLoading(false);
    //     console.log('the res==>>GetmatchesProfile', responseJson)
    //     if (responseJson?.headers?.success == 1) {
    //         setMyService(responseJson?.body);
    //     } else {
    //         // Toast.show({ text1: responseJson?.headers?.message });
    //         // setalert_sms(responseJson.headers.message);
    //         // setMy_Alert(true)
    //     }
    // };

    const objToQueryString = obj => {
        // console.log('objjjjj', obj);
        const keyValuePairs = [];
        for (const key in obj) {

            keyValuePairs.push(

                encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]),
            );
        }
        return keyValuePairs.length == 0 ? '' : '?' + keyValuePairs.join('&');
    };
    // function objToQueryString(inputObject) {
    //     var arrayurl = "";
    //     for (const key in inputObject) {
    //         if (Object.prototype.hasOwnProperty.call(inputObject, key)) {
    //             // const value = inputObject[key];
    //             const outputString = Object.keys(inputObject)
    //                 .map((key) => `${key}=${JSON.stringify(inputObject[key])}`)
    //                 .join("&");
    //             arrayurl = `${outputString}`;

    //         }
    //     }
    //     console.log(`${arrayurl} is an array.`);
    //     return `?${arrayurl}`;
    // }
    const GetMyServicesFilter = async () => {
        setShowFilterModal(false);
        var fUrl = inevtion_transaction
        var urls = User.userid

        // console.log('my url---------->', urls)
        if (urls != undefined) {
            fUrl = fUrl + urls

        }
        console.log("my furls", fUrl);

        // console.log("....Filter GetMyServicesFilter......", statusValue);
        var Date = moment(orderDate).format("YYYY-MM-DD");
        // console.log(statusValue, 'my console ');
        var murl = '57'
        const inputData = {}

        if (orderTypeValue != "") {
            inputData.status = orderTypeValue
            //console.log('my date---', orderTypeValue);
        }
        if (orderDate != "") {
            //console.log('kkk', inputData.date = Date);
            inputData.specificDate = Date
        }

        if (murl != "") {
            //console.log('kkk', inputData.date = Date);
            inputData.module_id = murl
        }
        const outputString = objToQueryString(inputData);
        console.log("....Filter urlS......", outputString, inputData);
        setLoading(true);
        const { responseJson, err } = await requestGetApi(
            fUrl + outputString,
            "",
            "GET",
            User.token
        );
        setLoading(false);
        console.log("the res==>>GetMyServicesFilter", responseJson?.body, fUrl + outputString);
        if (responseJson?.headers?.success == 1) {
            // setMyService(responseJson?.body)
            ;
            console.log("the res==>> ", responseJson?.body, fUrl + outputString);

            setTransactionData(responseJson.body.data);
            // setStatusValue("");
            // setOrderDate("");
            // setOrderTypeValue("");
        } else {
            Toast.show({ text1: responseJson?.headers?.message });
            // setalert_sms(responseJson.headers.message);
            // setMy_Alert(true)
        }
    };

    const _renderItem = ({ item }) => {
        return (
            <Image
                source={{ uri: item.image }}
                style={{
                    width: "100%",
                    height: 170,
                    borderRadius: 20,
                    alignSelf: "center",
                }}
            />
            // <View key={item.key} style={styles.slide}>
            //   <Text style={styles.title}>{item.title}</Text>
            //   <Text style={styles.text}>{item.text}</Text>
            // </View>
        );
    };

    return (
        <SafeAreaView
            scrollEnabled={scrollEnabled}
            style={{ height: "100%", backgroundColor: "#F8F8F8" }}
        >
            <ScrollView>
                <HomeHeaderRoundBottom height={100} extraStyle={{ paddingtop: 10, paddingBottom: 25 }} paddingHorizontal={15} borderBottomLeftRadius={20} borderBottomRightRadius={20} backgroundColor='#FFC40C'
                    press1={() => { props.navigation.goBack() }} img1={require('../../../assets/images/service-header-back-button.png')} img1width={25} img1height={18}
                    press2={() => { }} title2={'Transaction History'} fontWeight={'500'} img2height={20} color={'#fff'}
                    press3={() => { props.navigation.navigate('StartupNotifications') }} img3={require('../../../assets/images/fashion-bell-icon.png')} img3width={25} img3height={22} />

                <View style={{ marginTop: 15, width: "90%", alignSelf: "center" }}>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <View style={{ width: "83%" }}>
                            <View
                                style={{
                                    width: "100%",
                                    height: 60,
                                    backgroundColor: "#fff",
                                    alignSelf: "center",
                                    flexDirection: "row",
                                    shadowColor: "#000",
                                    shadowOffset: {
                                        width: 0,
                                        height: 3,
                                    },
                                    shadowRadius: 1,
                                    shadowOpacity: 0.3,
                                    // justifyContent: 'center',
                                    alignItems: "center",
                                    elevation: 5,
                                    borderRadius: 5,
                                    alignSelf: "center",
                                    marginTop: "auto",
                                }}
                            >
                                <View
                                    style={{
                                        width: "100%",
                                        flexWrap: "wrap",
                                        flexDirection: "row",
                                        marginLeft: 5,
                                    }}
                                >
                                    {orderDate ? (
                                        <View
                                            style={{
                                                flexDirection: "row",
                                                backgroundColor: "#FFC40C",
                                                padding: 7,
                                                borderRadius: 10,
                                                margin: 4,
                                                justifyContent: "center",
                                                alignItems: "center",
                                            }}
                                        >
                                            <Text style={{ fontSize: 15, color: "white", fontWeight: '600' }}>
                                                {moment(orderDate).format("YYYY-MM-DD")}
                                            </Text>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    if (orderDate != "") {
                                                        // setOrderTypeValue("");
                                                        setOrderDate("");
                                                    }
                                                    GetMyServicesStatus();

                                                    // GetMyServicesFilter()
                                                    // GetMyServicesStatus();


                                                }}
                                                style={styles.showMeImageView}
                                            >
                                                <Image
                                                    source={require("../../../assets/Art/filterCalendar.png")}
                                                    style={styles.showMeImage}
                                                    resizeMode="contain"
                                                />
                                            </TouchableOpacity>
                                        </View>
                                    )
                                        :

                                        (
                                            <View style={{ marginLeft: 16 }}>
                                                {
                                                    orderTypeValue == '' ?
                                                        <Text
                                                            style={{
                                                                fontSize: 14,
                                                                fontWeight: "300",
                                                                color: "#455A64",
                                                            }}
                                                        >
                                                            Select filter
                                                        </Text>
                                                        :
                                                        null
                                                }

                                            </View>
                                        )}
                                    {
                                        orderTypeValue != '' ? (
                                            <View
                                                style={{
                                                    flexDirection: "row",
                                                    backgroundColor: "#FFC40C",
                                                    padding: 7,
                                                    borderRadius: 10,
                                                    margin: 4,
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                }}
                                            >
                                                <Text style={{ fontSize: 15, color: "white", fontWeight: '600' }}>
                                                    {orderTypeValue}
                                                </Text>
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        if (orderTypeValue != "") {
                                                            setOrderTypeValue("");
                                                            // setOrderDate("");
                                                        }
                                                        // else if(orderDate == "" && orderTypeValue == ""){
                                                        //   GetMyServicesStatus();
                                                        // }
                                                        GetMyServicesStatus();
                                                        // GetMyServicesFilter()


                                                    }}
                                                    style={styles.showMeImageView}
                                                >
                                                    <Image
                                                        source={require("../../../assets/Art/filterCalendar.png")}
                                                        style={styles.showMeImage}
                                                        resizeMode="contain"
                                                    />
                                                </TouchableOpacity>
                                            </View>
                                        )
                                            :
                                            null
                                    }

                                </View>
                            </View>
                        </View>
                        <View
                            style={{
                                width: "15%",
                                flexDirection: "row",
                                justifyContent: "flex-end",
                            }}
                        >
                            <TouchableOpacity
                                onPress={() => {
                                    setShowFilterModal(true);
                                }}
                                style={{
                                    // backgroundColor: Mycolors.STARTUP,
                                    height: 50,
                                    width: 50,
                                    // borderRadius: 10,
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <Image
                                    source={require("../../../assets/Art/FilterType.png")}
                                    style={{ width: 65, height: 80, top: 7 }}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ height: 10 }} />
                    {transactionData === undefined || transactionData.length === 0 ? (

                        <>
                            <Image source={require('../../../assets/Art/NoPostStartup.png')} style={{ alignSelf: 'center', justifyContent: 'center', marginTop: '30%' }}></Image>
                            <Text style={{ textAlign: 'center', fontSize: 16, color: 'black', marginTop: 12 }}>
                                No data found
                            </Text>
                        </>
                    ) : (
                        <View style={{ width: "95%", alignSelf: "center", marginTop: 20 }}>
                            <FlatList
                                data={transactionData}
                                numColumns={1}
                                renderItem={({ item, index }) => {
                                    console.log('transactionffff kkk', item);
                                    return (
                                        <TouchableOpacity onPress={() => { props.navigation.navigate('StartupPost', { id: item.article_id }) }}>
                                            <LinearGradient
                                                key={index}
                                                colors={[
                                                    "rgba(255, 255, 255, 1)",
                                                    "rgba(249, 249, 249, 1)",
                                                ]}
                                                style={{
                                                    width: dimensions.SCREEN_WIDTH * 0.85,
                                                    backgroundColor: "#fff",
                                                    borderRadius: 15,
                                                    padding: 10,
                                                    paddingBottom: 15,
                                                    marginBottom: 20,
                                                    alignSelf: "center",
                                                    shadowColor: "#000",
                                                    shadowOffset: { width: 0, height: 3 },
                                                    shadowRadius: 1,
                                                    shadowOpacity: 0.0,
                                                    elevation: 0.00,
                                                }}

                                            >
                                                {/* <View style={{width:dimensions.SCREEN_WIDTH*0.85, backgroundColor:'#fff',borderRadius:15, padding:10, paddingBottom:30,marginBottom:20, alignSelf:'center'}}> */}
                                                <View style={{ flexDirection: "row" }}>
                                                    <View
                                                        style={{
                                                            flex: 1,
                                                            justifyContent: "center",
                                                            alignItems: "center",

                                                        }}
                                                    >
                                                        {/* <Image
                                                            source={{
                                                                uri: `${item?.profile_Image_attribute_value != null
                                                                    ? item?.profile_Image_attribute_value
                                                                    : 'data:image/jpeg;base64,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'
                                                                    }`,
                                                            }}
                                                            style={{
                                                                width: 50,
                                                                height: 50,
                                                                borderRadius: 50 / 2,
                                                                backgroundColor: 'gray'
                                                            }}
                                                        /> */}
                                                        <Image
                                                            source={{
                                                                uri: item?.profile_Image_attribute_value || null,
                                                            }}
                                                            style={{
                                                                width: 50,
                                                                height: 50,
                                                                borderRadius: 50 / 2,
                                                                backgroundColor: 'gray',
                                                            }}
                                                        />
                                                    </View>

                                                    <View
                                                        style={{
                                                            flex: 6,
                                                            marginLeft: 5,
                                                            flexDirection: "row",
                                                            justifyContent: "space-between",
                                                            alignItems: "center",
                                                        }}
                                                    >
                                                        <Text
                                                            style={{
                                                                fontSize: 14,
                                                                fontWeight: "500",
                                                                color: "#455A64",
                                                            }}
                                                        >
                                                            {item.username}
                                                        </Text>

                                                        <View
                                                            style={{
                                                                flexDirection: "row",
                                                                alignItems: "center",
                                                            }}
                                                        >
                                                            <View style={styles.completedCircle} />
                                                            <Text
                                                                style={{
                                                                    fontSize: 14,
                                                                    fontWeight: "400",
                                                                    color: "#29913C",
                                                                }}
                                                            >
                                                                {item.status}
                                                            </Text>
                                                        </View>



                                                    </View>
                                                </View>

                                                <View style={styles.seperatorView} />

                                                <View style={{ flexDirection: "row", width: "100%" }}>
                                                    <View style={{
                                                        width: 60,
                                                        height: 60,
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                    }}>
                                                        <Image
                                                            source={{
                                                                uri: `${item?.article_cover_photo != null
                                                                    ? item?.article_cover_photo
                                                                    : 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAIsAiwMBIgACEQEDEQH/xAAbAAEAAwEBAQEAAAAAAAAAAAAABQYHAQQDAv/EADoQAAIBAwEDCAYIBwAAAAAAAAABAgMEEQUGITEHEhNBUWFxgRQyUpGhwSIjQmJysbLRFRYzkqLh8P/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwDcQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA813eUrVfTeZdUFxYHpOOSisyaXiyBuNUuKrxDFKPYuPvPFKUpvM22+95As7uaC41qf9yP1GrTn6k4y8HkqoAtoK1Rvbmi1zKra7Jb0SdpqtOo1Guujk+vqf7ASQOZR0AAAAAAAAAAea+uVa27nxk90V2sD46lfq3+rpb6rXlEgpNzk5Sbcnxb6xKUpScpPMm8t9pwAROtbQ6fo8Wq9Tn1+qhTac/PsXieDbbW6mlWUKFpPm3VxnEuuEFxa79+F59hmkpSnJynJylJ5bby2Bcq3KDc9I+h0+godSnUbfyJTSNt7O8qKlfU/Q5vhNzzT83ux/28zgAbhCUZwU4NSjJZTTymjpmWx+uVtNv6VrXqt2daai4S+w3uTXZv4mnAe3T7+VvJU6jbpfpJ6MlJKUWmmspoqZK6NdNS9HqPc/U/YCYAAAAAAAAIDV63S3bgvVprHn1k9JqMXJ8EslUlLnycnxk8gcOnABmnKFUctoFBt4p0IJebbKyWflClSlry6OpCUlRjGoovLi03uffhorAABprigAlJ+tnet6ZtttPpLelUf2oRl70Ykkm0nuT4s222nTnb0pUZxnTcFzZReU13MD6HYycJKUd0k8o4ALTb1VWowqL7SyfQjtEnzrWUW/Un8CRAAAAAAPldPFtVf3H+RVy1VY8+lOPbFoqoAAAY1rXS/wAZvumzz/SJ5z+J4+GDy45u+XHqRcdv9DdOrU1mlUXMqShGpTxvUsYTXuRTHl8QDeW2wAANT2H6T+WbTpM8Z83Ps854M60XS6msahCzpVI03KLk5yWVFLjuNetLeFpaUbal6lGnGnHPYlgD6gACX0HhW8V8yWIvQo4o1ZdssfD/AGSgAAAAAAK1f0XRu6kcbm+cvBllI3WLZ1KSrQWZU+PegIQHTgEdtDYfxLRrq1WOfKGYZ9pb18UY/wCKwa9qOv6Vp85Uru8hGolvhHMpLxSzgyKWHJ44ZA4dUeuW5HA22BduTiy59W61CW5RXQ014738veXsomw+t6Zp+m1La9uVRqyrOSUovGMJccY6i806kKtONSlOM6clmMovKfmB+gD1adbek3CyvoQ3y/YCa06j0NpTi1iTWX4s9IAAA4B0AADj3o6AKftdcQ2etXe+j1q9ByxinH1H959S7zL9X2t1PUswp1HaUHwp0ZNN+MuL+BvtalTr0p0q0I1Kc1zZQmsqS7Gusy3a3kzqwlUvNnPpwby7OUsNfgb/ACfvAzZtvOd7e8H1r21a1ryo3VKpRqReJQqRcZe5nzlLIHAAAPdpmqX+mzUrK5nTjnLg3mD8Y8GeAs+zWxOr6+6c+idpZcXcVo4yvux4vx4d4Fm2V2onrl7T0+VjUVxJf1KW+CXW5eyveaXaW8baiqcd74yl2sj9ndnbDZ6z9HsKe+WOlrS3zqPtb+XBEuAAAAAAAAAAAAAAeHVNI07VqXR6jZULiK4dJDLj4PivIqd9yXaHXk5WtW7tX7MZqcf8k38S9ADM5cklLP0NZqJd9um/1HotuSfTovNzqV3UXZTjGHyZogAr+kbGbP6TKNS206lOtHeqtf6ySfam+HkWDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH/9k='
                                                                    }`,
                                                            }}
                                                            style={{
                                                                width: 50,
                                                                height: 50,
                                                                borderRadius: 50 / 2,
                                                                backgroundColor: 'gray'
                                                            }}
                                                        />
                                                    </View>

                                                    <View
                                                        style={{
                                                            width: "76%",
                                                            marginLeft: 10,
                                                            marginTop: 2,
                                                        }}
                                                    >
                                                        <View
                                                            style={{
                                                                width: "100%",
                                                                flexDirection: "row",
                                                                justifyContent: "space-between",
                                                                marginTop: 5,
                                                                marginBottom: 3,
                                                            }}
                                                        >
                                                            <View
                                                                style={{ width: "70%", alignSelf: "center" }}
                                                            >
                                                                <Text
                                                                    numberOfLines={1}
                                                                    style={styles.unselectedTabText}
                                                                >
                                                                    {item?.headline}
                                                                </Text>
                                                            </View>
                                                            {/* <View>
                                                        <Text
                                                            style={{
                                                                fontSize: 11,
                                                                fontWeight: "400",
                                                                color: "#455A64",

                                                            }}
                                                        >
                                                            {item?.created_date.slice(0, 10)}
                                                        </Text>
                                                    </View> */}
                                                        </View>
                                                        <Text
                                                            numberOfLines={1}
                                                            style={{
                                                                fontSize: 14,
                                                                fontWeight: "400",
                                                                color: "gray",
                                                            }}
                                                        >
                                                            {item?.description}
                                                        </Text>
                                                        <View
                                                            style={{
                                                                flexDirection: "row",
                                                                alignItems: "center",
                                                                marginTop: 5,
                                                                justifyContent: 'space-between',


                                                            }}
                                                        >
                                                            <Text style={styles.unselectedTabText}>
                                                                {item.status === "Contributed" ? `$${item?.contribution_amount}` : `$${item?.received_amount}`}
                                                            </Text>
                                                            <Text
                                                                style={{
                                                                    fontSize: 10,
                                                                    fontWeight: "400",
                                                                    color: "#455A64",

                                                                }}
                                                            >
                                                                {item?.transaction_date}
                                                            </Text>
                                                        </View>
                                                    </View>
                                                </View>

                                                {/* </View> */}
                                            </LinearGradient>
                                        </TouchableOpacity>
                                    );
                                }}
                                keyExtractor={(item, index) => index.toString()}
                            />
                        </View>

                    )}

                </View>
                <View style={{ height: 40 }} />
            </ScrollView>

            <Modal
                isVisible={showFilterModal}
                swipeDirection="down"
                onBackdropPress={() => setShowFilterModal(false)}
                onSwipeComplete={(e) => {
                    setShowFilterModal(false);
                }}
                scrollTo={() => { }}
                scrollOffset={1}
                propagateSwipe={true}
                coverScreen={false}
                backdropColor="transparent"
                style={{
                    justifyContent: "flex-end",
                    margin: 0,
                    backgroundColor: "rgba(0,0,0,0.5)",
                    flex: 1,
                }}
            >
                <View
                    style={{
                        height: "55%",
                        backgroundColor: "#ffff",
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                        zIndex: -999,
                        paddingTop: 15,
                    }}
                >
                    <View
                        style={{ justifyContent: "center", alignItems: "center", top: -8 }}
                    >
                        <View
                            style={{
                                borderBottomColor: "#bab6b6",
                                borderBottomWidth: 4,
                                width: 40,
                                justifyContent: "center",
                                alignItems: "center",
                                borderRadius: 20,
                            }}
                        />
                    </View>

                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "flex-start",
                            height: 40,
                            // paddingHorizontal: 10,
                            marginTop: 7,
                            marginHorizontal: 20,
                        }}
                    >
                        <View
                            style={{ justifyContent: "flex-start", alignItems: "center" }}
                        >
                            <Text
                                style={{ fontSize: 20, fontWeight: "600", color: "#000000" }}
                            >
                                Choose Filter
                            </Text>
                        </View>
                    </View>
                    {/* <View style={{ borderBottomColor: '#DBDBDB', borderBottomWidth: 1, width: dimensions.SCREEN_WIDTH, }} /> */}

                    {/* <View style={{ borderBottomColor: '#DBDBDB', borderBottomWidth: 1, width: dimensions.SCREEN_WIDTH }} /> */}

                    <View
                        style={{
                            width: dimensions.SCREEN_WIDTH * 0.9,
                            // left: -6,
                            marginTop: 10,
                            justifyContent: "center",
                            alignItems: "center",
                            marginHorizontal: 20,
                        }}
                    >
                        <View
                            style={{
                                width: "100%",
                                height: 50,
                                backgroundColor: "#FFFFFF",
                                borderRadius: 10,
                                flexDirection: "row",
                                justifyContent: "space-between",

                                borderColor: "#E0E0E0",
                                borderWidth: 1,
                                shadowColor: "#000",
                                shadowOffset: {
                                    width: 0,
                                    height: 3,
                                },
                                shadowRadius: 1,
                                shadowOpacity: 0.1,

                                elevation: 3,
                            }}
                        >
                            <View style={{}}>
                                {Platform.OS == "ios" ? (
                                    <DatePicker
                                        customStyles={{
                                            dateInput: { borderColor: "transparent" },
                                            dateText: { color: Mycolors.GrayColor },
                                            dateIcon: styles.dateIcon,
                                            dateplaceholder: {
                                                alignContent: "flex-start",
                                            },
                                            placeholderText: {
                                                fontSize: 15,
                                                color: Mycolors.GrayColor,

                                                left: Platform.OS == "ios" ? -30 : 5,
                                            },
                                            zIndex: 99999,
                                        }}
                                        showIcon={false}
                                        androidMode={"spinner"}
                                        readOnly={true}
                                        style={[
                                            styles.datePickerSelectInput,
                                            {
                                                fontSize: 11,
                                                color: Mycolors.GrayColor,
                                                left: Platform.OS == "ios" ? 15 : 10,
                                            },
                                        ]}
                                        date={orderDate}
                                        mode="date"
                                        placeholder={"Pick a Date"}
                                        maximumDate={new Date()}
                                        format="YYYY-MM-DD"
                                        confirmBtnText="Confirm"
                                        cancelBtnText="Cancel"

                                        onDateChange={(date) => {
                                            // console.log("datae isss==>>", date);
                                            setOrderDate(date);
                                        }}
                                    />
                                ) : showda ? (
                                    <View>
                                        <DateTimePicker
                                            value={new Date()}
                                            mode="spinner"
                                            // is24Hour={true}
                                            display="spinner"
                                            dateFormat="YYYY-MM-DD"
                                            maximumDate={new Date()}
                                            onChange={(event, sTime) => {
                                                setshowda(false);
                                                // console.log("SelectDATE.....", sTime.toDateString());
                                                setOrderDate(sTime);
                                                // console.log(event);
                                            }}
                                        />
                                    </View>
                                ) : (
                                    <TouchableOpacity
                                        style={{
                                            width: "100%",
                                            height: 50,
                                            justifyContent: "center",
                                            backgroundColor: Mycolors.HEADERCOLOR,
                                            borderColor: "transparent",
                                            zIndex: -999,
                                            borderRadius: 5,
                                        }}
                                    >
                                        <Text
                                            style={{ fontSize: 15, color: "#000", left: 10 }}
                                            onPress={() => {
                                                setshowda(true);
                                            }}
                                        >
                                            {orderDate
                                                ? moment(orderDate).format("YYYY-MM-DD")
                                                :
                                                "Select Date"}
                                        </Text>
                                    </TouchableOpacity>
                                )}
                            </View>
                            <TouchableOpacity
                                onPress={() => {
                                    setshowda(true);
                                }}
                                style={{
                                    justifyContent: "center",
                                    marginRight: 9,
                                    alignItems: "center",
                                }}
                            >
                                <Image
                                    source={require("../../../assets/images/calendar.png")}
                                    style={{ width: 24, height: 24, alignSelf: "center" }}
                                />
                            </TouchableOpacity>
                        </View>
                        <View
                            style={{
                                justifyContent: "flex-start",
                                alignItems: "flex-start",
                                width: dimensions.SCREEN_WIDTH * 0.9,
                                marginTop: 15,
                                marginBottom: 10,
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 16,
                                    fontWeight: "500",
                                    color: Mycolors.Black,
                                }}
                            >
                                Status Type
                            </Text>
                        </View>
                        <View
                            style={{
                                justifyContent: "flex-start",
                                alignItems: "flex-start",
                                width: dimensions.SCREEN_WIDTH * 0.9,
                                marginTop: 1,

                            }}
                        >

                            <FlatList
                                data={orderTypeData}

                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item, index }) => {
                                    // console.log(item, 'item111');
                                    return (
                                        <TouchableOpacity key={index}
                                            onPress={() => {
                                                setOrderTypeValue(item?.label);
                                                setStatusValue(item?.value)
                                            }}
                                        >
                                            <View
                                                style={[styles.radioButtonContainer, { width: "80%" }]}
                                            >
                                                <MaterialCommunityIcons
                                                    name={
                                                        item.label === orderTypeValue
                                                            ? "circle-slice-8"
                                                            : "circle-outline"
                                                    }
                                                    color={"#FFC40C"}
                                                    size={24}
                                                />
                                                <Text
                                                    style={{
                                                        color: "#455A64",
                                                        fontWeight: "600",
                                                        fontSize: 14,
                                                        marginLeft: 6,
                                                    }}
                                                >
                                                    {item?.label}
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
                                    );
                                }}
                            />
                        </View>

                    </View>

                    <View
                        style={{
                            width: "96%",
                            flexDirection: "row",
                            paddingVertical: 7,
                            justifyContent: "space-between",
                            marginHorizontal: 10,
                            marginTop: 20,
                        }}
                    >
                        <TouchableOpacity
                            onPress={() => {
                                setShowFilterModal(false);
                                setOrderDate("");
                                setOrderTypeValue("");
                                GetMyServicesStatus();
                            }}
                            style={styles.clearallButtonStyle}
                        >
                            <Text
                                style={{
                                    fontSize: 13,
                                    fontWeight: "bold",
                                    color: "#3e5869",
                                    alignSelf: "center",
                                }}
                            >
                                Clear all
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                GetMyServicesFilter();
                            }}
                            style={styles.applyButtonStyle}
                        >
                            <Text style={{ fontSize: 13, fontWeight: "bold", color: "#fff" }}>
                                Apply
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ height: 20 }} />
                </View>
            </Modal>
            {loading ? <Loader /> : null}
        </SafeAreaView >
    );
};
const styles = StyleSheet.create({
    bookingsView: {
        position: "absolute",
        bottom: 20,
        right: 20,
        paddingVertical: 20,
        paddingHorizontal: 10,
        // marginTop:30,
        borderRadius: 25,
        backgroundColor: "#6D2F91",
        // width:'30%',
        alignSelf: "center",
        // height:100,
        // width:100,
        // justifyContent:'center',
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowRadius: 1,
        shadowOpacity: 0.1,
        justifyContent: "center",
        elevation: 1,
    },
    radioButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5
    },
    bookingsText: {
        fontSize: 14,
        fontWeight: "500",
        color: "#fff",
        marginTop: 5,
    },
    unselectedTabText: {
        fontSize: 14,
        fontWeight: "500",
        color: "#263238",
    },
    bulletPoints: {
        fontSize: 12,
        fontWeight: "400",
        color: "#263238",
    },
    addView: {
        marginTop: 10,
        width: 90,
        height: 30,
        borderRadius: 15,
        backgroundColor: "#ED1C24",
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#6D2F91",
        shadowOffset: { width: 3, height: 3 },
        shadowRadius: 5,
        shadowOpacity: 0.17,
        elevation: 2,
    },
    seperatorView: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: "#6D2F92",
        marginVertical: 15,
    },
    completedCircle: {
        backgroundColor: "#29913C",
        width: 15,
        height: 15,
        borderRadius: 15 / 2,
        marginRight: 5,
    },
    cancelledCircle: {
        backgroundColor: "#ED1C24",
        width: 15,
        height: 15,
        borderRadius: 15 / 2,
        marginRight: 5,
    },
    pendingCircle: {
        backgroundColor: "#808080",
        width: 15,
        height: 15,
        borderRadius: 15 / 2,
        marginRight: 5,
    },
    clearallButtonStyle: {
        width: "45%",
        height: 50,
        borderRadius: 5,
        alignSelf: "center",
        borderColor: "#FFC40C",
        borderWidth: 2,
        backgroundColor: "#FFFF",
        justifyContent: "center",
        alignItems: "center",

        // shadowColor: '#00EE57',
        // shadowOffset: { width: 0, height: 3 },
        // shadowRadius: 1,
        // shadowOpacity: 0.2,
        // elevation: 2,
    },
    applyButtonStyle: {
        width: "50%",
        height: 50,
        borderRadius: 5,
        alignSelf: "center",
        backgroundColor: "#FFC40C",
        justifyContent: "center",
        alignItems: "center",
    },
    showMeImageView: {
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor:'red',
        height: 22,
        width: 22,
        borderRadius: 20 / 2,
        marginLeft: 3,

    },
    showMeImage: {
        height: 10,
        width: 10,
        tintColor: 'white'
    },
});
export default StartupPaymentHistory;
