//external imports
import React from "react"
import moment from "moment"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
//internal imports
// import { colors } from "../../constants/ColorConstant"
import Toast from 'react-native-toast-message'
import { Mycolors } from "../../../utility/Mycolors"
import { useNavigation } from '@react-navigation/native';
import { requestGetApi, get_memberList, add_members, invite_user, requestPostApi, request_list, home_details, home_detailTask, taskHideUnhide, markasincomplete, markasComplete, accept_groupRequest } from '../../../WebApi/Service'
import { useSelector, useDispatch } from 'react-redux';
const NotificationTab = ({ items, viewNotificationClick, }) => {
    // change date formate
    const navigation = useNavigation();
    const User = useSelector(state => state.user.user_details)
    const notificationTime = moment(items?.date)
        .startOf("second")
        .fromNow()
    const RequestReject = async (id) => {
        console.log("RejectedID......", id);

        // setLoading(true);
        const data = {
            status: 3, //0: Pending: 1: Accept, 2: Reject
        };
        const { responseJson, err } = await requestPostApi(
            accept_groupRequest + id,
            data,
            "PUT",
            User.token
        );
        // setLoading(false);
        console.log("the res==>>RequestReject", responseJson?.body);
        if (responseJson?.headers?.success == 1) {
            // GetMyServices();
            Toast.show({ text1: responseJson?.headers?.message });
            navigation.goBack()
        } else {
            Toast.show({ text1: responseJson?.headers?.message });
            navigation.goBack()
            // setalert_sms(responseJson.headers.message);
            // setMy_Alert(true)
        }
    };
    const RequestAccept = async (id) => {
        console.log("AcceptedID......", id);
        // setLoading(true);
        const data = {
            status: 2, //0: Pending: 1: Accept, 2: Reject
        };
        const { responseJson, err } = await requestPostApi(
            accept_groupRequest + id,
            data,
            "PUT",
            User.token
        );
        // setLoading(false);
        console.log("the res==>>RequestAccept", responseJson);
        if (responseJson?.headers?.success == 1) {

            { console.log('my succes response accept---->>', responseJson) }
            Toast.show({ text1: responseJson?.headers?.message });
            navigation.goBack()
            // GetMyServices();
        } else {
            Toast.show({ text1: responseJson?.headers?.message });
            navigation.goBack()
            // setalert_sms(responseJson.headers.message);
            // setMy_Alert(true)
        }
    };
    const handel = async (item) => {
        console.log('from the notification ab===>>', item.RedirectId);
        {
            item?.message.includes("task") ? navigation.navigate('TaskDetails', {
                id: item.RedirectId
            }) : item?.message.includes("routine") ? navigation.navigate('RoutineDetails', {
                id: item.RedirectId
            }) : item?.message.includes("group") ? navigation.navigate('GroupDetails', {
                data: item.RedirectId
            }) : item?.message.includes("notes") ? navigation.navigate('NotesDetails', {
                id: item.RedirectId
            }) : null


        }
    }

    return (
        <>
            {console.log('my notification tab----->>>', items)}
            {items.status === 1 ? (
                <TouchableOpacity
                    style={styles.container}
                    onPress={() => {
                        viewNotificationClick(items.id),
                            handel(items);
                    }}
                >
                    {/* group title  */}
                    <TouchableOpacity style={styles.nameContainer} onPress={() => {

                        handel(items);
                    }}>
                        <Text style={styles.date}>{items?.created_date}</Text>

                        <Text style={styles.notificationText}>{items?.message}</Text>
                        {items?.message.includes("wants you to join") ? (
                            <>
                                <View
                                    style={{
                                        flexDirection: "row",
                                        width: "100%",
                                        justifyContent: 'flex-end'
                                    }}
                                >

                                    <TouchableOpacity
                                        onPress={() => {
                                            RequestAccept(items?.id);
                                        }}
                                        style={[
                                            styles.addView,
                                            { backgroundColor: "#F28520", },
                                        ]}
                                    >
                                        <Text
                                            style={{
                                                fontSize: 14,
                                                fontWeight: "400",
                                                color: "#FFF",
                                                textAlign: 'center'
                                            }}
                                        >
                                            Accept
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => {
                                            RequestReject(items?.id);
                                        }}
                                        style={[styles.addView, { marginLeft: 15 }]}
                                    >
                                        <Text
                                            style={{
                                                fontSize: 14,
                                                fontWeight: "400",
                                                color: "#FFF",
                                                textAlign: 'center'
                                            }}
                                        >
                                            Reject
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </>
                        ) : null}
                    </TouchableOpacity>

                </TouchableOpacity>
            ) : (
                <TouchableOpacity style={styles.readContainer} onPress={() => {

                    handel(items);
                }}  >
                    {/* group title  */}
                    <View style={styles.nameContainer}>

                        <Text style={styles.date}>{items?.created_date}</Text>

                        <Text style={styles.notificationText}>{items?.message}</Text>
                        {items?.message.includes("join group") ? (
                            <>
                                <View
                                    style={{
                                        flexDirection: "row",
                                        justifyContent: "space-between",

                                        width: "100%",
                                        justifyContent: 'flex-end'

                                    }}
                                >
                                    <TouchableOpacity
                                        onPress={() => {
                                            RequestReject(items?.id);
                                        }}
                                        style={[styles.addView, { marginLeft: 15 }]}
                                    >
                                        <Text
                                            style={{
                                                fontSize: 14,
                                                fontWeight: "400",
                                                color: "#FFF",
                                                textAlign: 'center'
                                            }}
                                        >
                                            Reject
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => {
                                            RequestAccept(items?.id);
                                        }}
                                        style={[
                                            styles.addView,
                                            { backgroundColor: "#F28520", },
                                        ]}
                                    >
                                        <Text
                                            style={{
                                                fontSize: 14,
                                                fontWeight: "400",
                                                color: "#FFF",
                                                textAlign: 'center'
                                            }}
                                        >
                                            Accept
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </>
                        ) : null}
                    </View>

                </TouchableOpacity>
            )}
        </>
    )
}

export default NotificationTab

const styles = StyleSheet.create({
    container: {
        backgroundColor: Mycolors.WHITE,
        borderRadius: 15,
        flex: 1,
        flexDirection: "row",
        margin: 5,
        paddingHorizontal: 10,
        paddingVertical: 15
    },
    readContainer: {
        backgroundColor: Mycolors.brightGray,
        borderRadius: 15,
        flex: 1,
        flexDirection: "row",
        margin: 5,
        paddingHorizontal: 10,
        paddingVertical: 15
    },
    nameContainer: { width: "100%" },
    notificationText: {
        color: Mycolors.THEME_BLACK,
        fontSize: 16
    },
    date: {
        color: Mycolors.textGray,
        fontSize: 14,
        textAlign: "right"
    },
    addView: {
        marginTop: 10,
        // width: 90,
        // height: 30,
        borderRadius: 15,
        paddingHorizontal: 15,
        paddingVertical: 7,
        backgroundColor: "#ED1C24",
        alignSelf: "center",
        shadowColor: "#6D2F91",
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 5,
        shadowOpacity: 0.17,
        elevation: 2,

    },
})
