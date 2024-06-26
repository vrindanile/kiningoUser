//external imports
import {
    ActivityIndicator,
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native"
import React, { useEffect, useState } from "react"
//internal imports
import CustomHeader from "../Constants/CustomHeader"
// import NotificationService from "../../service/NotificationService"
import Toast from 'react-native-toast-message'
import { requestGetApi, get_memberList, add_members, invite_user, requestPostApi, request_list, home_details, home_detailTask, taskHideUnhide, getUserNotification, readNotification, clear_notification } from '../../../WebApi/Service'
import { useIsFocused } from "@react-navigation/native";
import { useSelector, useDispatch } from 'react-redux';
// getUserNotification
import NotificationTab from "./NotificationTab"
import SubmitButton from "../Constants/SubmitButton"
// import { colors } from "../../constants/ColorConstant"
import { Mycolors } from "../../../utility/Mycolors"
const NotificationExpanse = ({ navigation }) => {
    const isFocus = useIsFocused()
    const [allNotifications, setAllNotifications] = useState([])
    const [pageLoader, setPageLoader] = useState(false)
    const User = useSelector(state => state.user.user_details)
    console.log('my user---->>>', User);
    useEffect(() => {

        console.log('notification token-------->>>', User.token)
        // setPageLoader(true)
        getData()
    }, [isFocus])

    // function for get all notification data on api call
    const getDataa = () => {
        // NotificationService.getNotification()
        //     .then(response => {
        //         setPageLoader(false)
        //         setAllNotifications(response.data.notification)
        //     })
        //     .catch(error => {
        //         setPageLoader(false)
        //         console.log(error)
        //     })
    }

    const getData = async () => {
        console.log('all memeneee')
        // setPageLoader(true)
        var url = getUserNotification
        var murl = `?module_id=61`
        url = url + murl
        const { responseJson, err } = await requestGetApi(url, '', 'GET', User.token)


        // setMyGroupList(responseJson.body)
        if (responseJson.headers.success == true) {
            // setPageLoader(false)
            if (responseJson.body.data.userNotification.length > 0) {
                setAllNotifications(responseJson.body.data.userNotification)

            } else {
                setAllNotifications([])

            }
        } else {

            setalert_sms(err)
            setMy_Alert(true)
        }
    }


    // function for read notification on api call
    const handleReadNotificationn = notificationId => {
        // NotificationService.getReadNotification(notificationId)
        //     .then(response => {
        //         setPageLoader(false)
        //         getData() //for refresh the data
        //     })
        //     .catch(error => {
        //         setPageLoader(false)
        //         console.log(error)
        //     })
    }

    const handleReadNotification = async (notificationId) => {
        console.log('read notification', notificationId)
        setPageLoader(true)

        const { responseJson, err } = await requestPostApi(readNotification + notificationId, '', 'PUT', User.token)

        console.log('response of read notification details', responseJson)
        // setMyGroupList(responseJson.body)
        if (responseJson.headers.success == true) {
            setPageLoader(false)
            getData()
            // setPageLoader(false)
            // setAllNotifications(responseJson.body.userNotification)
        } else {
            setPageLoader(false)
            setalert_sms(err)
            setMy_Alert(true)
        }

    }
    // function for clear notification on api call
    const handleClearNotification = async () => {
        setPageLoader(true)
        // NotificationService.getClearAllNotification()
        //     .then(response => {
        //         getData() //for refresh the data
        //         setPageLoader(false)
        //     })
        //     .catch(error => {
        //         setPageLoader(false)
        //         console.log(error)
        //     })
        // setPageLoader(true)
        var url = clear_notification
        var murl = `?module_id=61`
        url = url + murl
        const { responseJson, err } = await requestGetApi(url, '', 'GET', User.token)

        console.log('response of clear notifications', responseJson)
        // setMyGroupList(responseJson.body)
        if (responseJson.headers.success == true) {
            getData() //for refresh the data
            setPageLoader(false)
            // setPageLoader(false)
            Toast.show({ text1: responseJson?.headers?.message });
            setAllNotifications([])
        } else {
            setPageLoader(false)
            // setalert_sms(err)
            // setMy_Alert(true)
        }
    }

    const redirection = async () => {
        console.log('item from redirection of the redirection---->>',);
    }
    // list for notification tab
    const renderNotificationItems = ({ item }) => {
        console.log('mu notifications for groups------>>>', item)
        return (
            <NotificationTab
                items={item}
                navigation={navigation}
                viewNotificationClick={handleReadNotification}
                handelRedirection={redirection}
            />
        )
    }

    return (
        <View style={styles.container}>
            {/* header section */}
            <CustomHeader
                headerText={"Notifications"}
                backButton={{
                    visible: true,
                    onClick: () => {
                        navigation.goBack()
                    }
                }}
            />

            {/* body section */}
            {!pageLoader ? (
                allNotifications?.length > 0 ? (
                    <View style={styles.body}>
                        {/* clear all button section  */}
                        <TouchableOpacity
                            style={styles.clearAllContainer}
                            onPress={() => {
                                handleClearNotification()
                            }}
                        >
                            <Text style={styles.clearAllText}>Clear all</Text>
                        </TouchableOpacity>

                        {/* my groups list  */}
                        <FlatList
                            data={allNotifications}
                            scrollEnabled={true}
                            renderItem={renderNotificationItems}
                            listKey={"myGroupList"}
                            keyExtractor={(item, index) => String(index)}
                        />
                    </View>
                ) : (
                    <View style={styles.noDataContainer}>
                        <View style={styles.noNotificationImage}>
                            <Image
                                resizeMode="contain"
                                style={styles.image}
                                source={require("../../../assets/Remindably/nonotification.png")}
                            />
                        </View>

                        <Text style={styles.heading}>No Notifications Yet</Text>
                        <Text style={styles.subHeading}>
                            You have Currently no notifications. We'll notify you when
                            something new arrives!
                        </Text>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <SubmitButton
                                buttonText={"Back to home"}
                                submitButton={() => navigation.goBack()}
                            />
                        </TouchableOpacity>
                    </View>
                )
            ) : (
                <View style={styles.loaderContainer}>
                    <ActivityIndicator size="large" color={Mycolors.THEME_ORANGE} />
                </View>
            )}
        </View>
    )
}

export default NotificationExpanse

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    body: {
        height: "90%",
        padding: 10
    },
    noDataContainer: {
        backgroundColor: Mycolors.WHITE,
        height: "90%",
        padding: 30
    },
    noNotificationImage: {
        alignSelf: "center",
        height: 220,
        justifyContent: "center",
        marginVertical: 20,
        width: 220
    },
    image: { height: "100%", width: "100%" },
    heading: {
        color: Mycolors.THEME_ORANGE,
        fontSize: 22,
        fontWeight: "500",
        padding: 5,
        textAlign: "center"
    },
    subHeading: {
        color: Mycolors.THEME_BLACK,
        fontSize: 18,
        fontWeight: "300",
        marginBottom: 10,
        paddingHorizontal: 10,
        textAlign: "center"
    },
    clearAllContainer: {
        alignSelf: "flex-end",
        justifyContent: "center"
    },
    clearAllText: {
        color: Mycolors.THEME_ORANGE,
        fontSize: 14,
        fontWeight: "500",
        padding: 5,
        textDecorationColor: Mycolors.THEME_ORANGE,
        textDecorationLine: "underline",
        textDecorationStyle: "solid"
    },
    loaderContainer: {
        alignSelf: "center",
        height: "90%",
        justifyContent: "center"
    }
})
