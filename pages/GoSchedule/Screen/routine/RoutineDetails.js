//external imports
import {
    ActivityIndicator,
    FlatList,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native"
import axios from "axios";
import Toast from 'react-native-toast-message'
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage"
import React, { useEffect, useRef, useState } from "react"
import moment from "moment"
//internal imports
import AddedTimeTab from "../groups/AddedTimeTab"
import AllTimeWithComplete from "../groups/AllTimeWithComplete"
import CommentsOnRoutine from "./CommentsOnRoutine"
// import CommonToast from "../../constants/CommonToast"
import CustomHeader from "../../Constants/CustomHeaader"
import DeleteAlertModal from "../groups/DeleteAlertModal"
// import GroupServices from "../../service/GroupServices"
// import RoutineService from "../../service/RoutineService"
import ShareRoutineModal from "./ShareRoutineModal"
import SharedRoutineSuccessModal from "./SharedRoutineSuccessModal"
import { requestGetApi, get_memberList, add_members, invite_user, requestPostApi, request_list, home_details, home_detailTask, taskHideUnhide, getRoutines, detailRoutine, markasComplete, markasincomplete, delete_myTask, shareRoutine } from '../../../../WebApi/Service'
import { useSelector, useDispatch } from 'react-redux';
import SubmitButton from "../../Constants/SubmitButton"
// import { colors } from "../../constants/ColorConstant"
import { Mycolors } from "../../../../utility/Mycolors"
// detailRoutine



const RoutineDetails = ({ navigation, route }) => {
    const isFocus = useIsFocused()
    const User = useSelector(state => state.user.user_details)
    const [buttonLoader, setButtonLoader] = useState(false)
    const [commentCount, setCommentCount] = useState(0)
    const [deleteModal, setDeleteModal] = useState(false)
    const [groupCount, setGroupCount] = useState(0)
    const [markCompleteModal, setMarkCompleteModal] = useState(false)
    const [markInCompleteModal, setMarkInCompleteModal] = useState(false)
    const [myUserId, setMyUserId] = useState()
    const [pageLoader, setPageLoader] = useState(false)
    const [routineComments, setRoutineComments] = useState([])
    const [routineDetails, setRoutineDetails] = useState({})
    const [routineId, setRoutineId] = useState(route?.params?.id)
    const [shareRoutineModal, setShareRoutineModal] = useState(false)
    const [sharedRoutineSuccessModal, setSharedRoutineSuccessModal] = useState(
        false
    )
    const [timeValue, setTimeValue] = useState("")
    const toastRef = useRef()

    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            console.log('jjjjjj my neww detail------>>>', route?.params?.id)
            setRoutineId(route?.params?.id)
            getDetails(route?.params?.id)
            getComments(route?.params?.id)

        })
        return unsubscribe
    }, [isFocus, routineId])

    // function for get routine data on api call
    const getDetail = async () => {
        // user id for delete and edit icon
        const token = await AsyncStorage.getItem("userId")
        setMyUserId(token)

        let data = {
            routineid: routineId
        }
        setPageLoader(true)
        // RoutineService.postRoutineDetails(data)
        //     .then(response => {
        //         setPageLoader(false)
        //         setRoutineDetails(response.data.routines)
        //     })
        //     .catch(error => {
        //         setPageLoader(false)
        //         console.log(error)
        //     })
    }
    const getDetails = async (text) => {
        console.log('mu search textttt', routineId)
        var url = detailRoutine
        var murl = text
        if (murl != 'undefined') {
            var url = url + murl
        }
        setPageLoader(true)
        const data = {
            search: text
        }

        const { responseJson, err } = await requestGetApi(url, '', 'GET', User.token)
        // 
        console.log('response of detail routinesss---??', responseJson.body.subtitle
        )
        // setMyGroupList(responseJson.body)
        if (responseJson.headers.success == true) {
            setPageLoader(false)
            setRoutineDetails(responseJson.body)
            // setMyRoutines(responseJson.body)

        } else {

            setalert_sms(err)
            setMy_Alert(true)
        }
    }
    // function for get routine comment data on api call
    const getComment = () => {
        let data = {
            routineid: routineId
        }
        // RoutineService.postAllCommentOnRoutine(data)
        //     .then(response => {
        //         setRoutineComments(response.data.commentdetails)
        //         setCommentCount(response.data.commentsCount)
        //     })
        //     .catch(error => {
        //         console.log(error)
        //     })
    }

    const getComments = async (text) => {
        console.log('mu search textttt getData for comments', text)
        var url = detailRoutine
        var murl = text
        if (murl != 'undefined') {
            var url = url + murl
        }
        setPageLoader(true)

        const { responseJson, err } = await requestGetApi(url, '', 'GET', User.token)
        // 
        console.log('response of detail routinesss cim comments amit---??', responseJson.body.commentDetails)
        // setMyGroupList(responseJson.body)
        if (responseJson.headers.success == true) {
            setPageLoader(false)
            setRoutineComments(responseJson.body.commentDetails)
            //         setCommentCount(response.data.commentsCount)
            // setTaskName(responseJson.body.title)
            // setRoutineDetails(responseJson.body)
            // setAllComments(responseJson.body.commentDetails)
            // setMyRoutines(responseJson.body)

        } else {

            setalert_sms(err)
            setMy_Alert(true)
        }
    }



    // navigation on routine details on tab click
    const handleViewCommentsClick = id => {
        navigation.navigate(
            "RoutineAllComments",

            {
                data: id,
                flow: "MYROUTINE"

            })
    }

    // list for comments on routine
    const renderCommentsRoutine = ({ item }) => {
        return (
            <CommentsOnRoutine
                data={item}
                viewCommentsClick={handleViewCommentsClick}
                routineId={routineDetails?.routineid}
            />
        )
    }

    // function for open modal on share routine click
    const handleSubmit = () => {
        setShareRoutineModal(true)
    }

    // function for close modal on share routine click
    const handleShareRoutineModalClose = () => {
        setShareRoutineModal(false)
    }

    // function for share button click on api call to share routine
    const handleShareRoutineSubmitClick = async (list) => {
        console.log('my te,ms for succes fdimnn-->', routineId, list);
        if (list.length === 0) {
            // If the list is empty, you can handle it here (e.g., show an error message).
            Toast.show({ text1: 'Please select group' });
            return;
        }

        setButtonLoader(true)
        try {
            const feedBackData = new FormData()
            feedBackData.append("task_id", routineId)
            // list.map((e, index) => {
            //     feedBackData.append(`group_id[${index}]`, e)
            // })
            list.forEach((value, index) => {
                feedBackData.append('group_id[]', value);
            })
            setGroupCount(list.length)
            // shareRoutine
            // RoutineService.postShareRoutine(feedBackData)
            //     .then(response => {
            //         setButtonLoader(false)
            //         setShareRoutineModal(false)
            //         setSharedRoutineSuccessModal(true)
            //     })
            //     .catch(error => {
            //         setButtonLoader(false)
            //         console.log(error)
            //     })
            console.log('my data members??????????????', feedBackData)
            var url = 'http://54.153.75.225/backend/api/v1/goaccounting/share-routine'

            console.log('my data final')
            const response = await axios.post(url, feedBackData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${User.token}`,
                },
            });

            console.log('Response:', response);

            if (response.status === 200) {
                console.log('Post shared succesfulll---->>>>', response.data);
                setShareRoutineModal(false)
                Toast.show({ text1: response.data.headers.message });

                // Handle success
            } else {
                console.log('Error creating post:', response.data.headers.message);
                // Handle error
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    }

    // function for close modal for routine share successfully
    const handleShareRoutineSuccessModalClose = () => {
        setSharedRoutineSuccessModal(false)
    }

    // function for close modal for routine share successfully submit click
    const handleShareRoutineSuccessSubmitClick = () => {
        setSharedRoutineSuccessModal(false)
    }

    // list for added time
    const renderAddedTime = ({ item }) => {
        return <AddedTimeTab items={item} />
    }

    // list for  time with complete icon
    const renderAddedTimeWithComplete = ({ item }) => {
        return (
            <AllTimeWithComplete
                items={item}
                handleMarkComplete={handleMarkComplete}
                handleMarkInComplete={handleMarkInComplete}
            />
        )
    }

    // function for delete button click on api call
    const handleDeleter = () => {
        setDeleteModal(false)
        // GroupServices.getDeleteTask(routineId)
        //     .then(response => {
        //         toastRef.current.getToast(response.data.message, "success")
        //         navigation.goBack()
        //     })
        //     .catch(error => {
        //         console.log(error)
        //     })
    }
    const handleDelete = async () => {
        console.log('delte called routine')
        setPageLoader(true)
        var fUrl = delete_myTask + routineId

        console.log('furlsssssssssss->>>>>>>>>>>', fUrl)
        // setDeleteModal(false)
        const { responseJson, err } = await requestPostApi(delete_myTask + routineId, '', 'DELETE', User.token)
        setPageLoader(false)
        console.log('response of deleted comments fro the api--->>>>', responseJson.headers.success == true)
        // setMyGroupList(responseJson.body)
        if (responseJson.headers.success == true) {
            setDeleteModal(false)
            setPageLoader(true)
            console.log('the res after deelted of task article', responseJson.headers.message)
            // Toast.show({ text1: response.data.headers.message });
            navigation.goBack()
            Toast.show({ text1: responseJson.headers.message })
            // setRecentlyMemberLoader(false)
            // setRecentlyAddedMemberList(responseJson.body)

        } else {

            setalert_sms(err)
            setMy_Alert(true)
        }
    }
    // function for open modal on mark complete icon click
    const handleMarkComplete = value => {
        setMarkCompleteModal(true)
        setTimeValue(value)
    }

    // function for close modal on mark complete icon click api call
    // const handleCompleteTask = () => {
    //     setMarkCompleteModal(false)
    //     const data = {
    //         taskid: routineId,
    //         time: timeValue
    //     }
    //     // GroupServices.postCompleteTask(data)
    //     //     .then(response => {
    //     //         toastRef.current.getToast(response.data.message, "success")
    //     //         navigation.goBack()
    //     //     })
    //     //     .catch(error => {
    //     //         console.log(error)
    //     //     })
    // }
    // const handleCompleteTask = () => {
    //     setMarkCompleteModal(false)
    //     const data = {
    //         taskid: routineId,
    //         time: timeValue
    //     }
    //     // GroupServices.postCompleteTask(data)
    //     //     .then(response => {
    //     //         toastRef.current.getToast(response.data.message, "success")
    //     //         getTask() //for refresh the tasks
    //     //     })
    //     //     .catch(error => {
    //     //         console.log(error)
    //     //     })
    // }
    const handleCompleteTask = async () => {
        setMarkCompleteModal(false)
        const data = {
            taskid: routineId,
            time: timeValue
        }

        const { responseJson, err } = await requestPostApi(markasComplete, data, 'POST', User.token)
        // setPageLoader(false)
        console.log('response of complete', responseJson)
        // setMyGroupList(responseJson.body)
        if (responseJson.headers.success == true) {
            console.log('the res after deelted of task article', responseJson.body)
            navigation.goBack()
            // setRecentlyMemberLoader(false)
            // setRecentlyAddedMemberList(responseJson.body)

        } else {

            setalert_sms(err)
            setMy_Alert(true)
        }

    }

    // function for open modal on mark in complete icon click
    const handleMarkInComplete = value => {
        setMarkInCompleteModal(true)
        setTimeValue(value)
    }

    // function for close modal on mark incomplete icon click api call
    const handleInCompleteTaskk = () => {
        setMarkInCompleteModal(false)
        const data = {
            taskid: routineId,
            time: timeValue
        }
        // GroupServices.postInCompleteTask(data)
        //     .then(response => {
        //         toastRef.current.getToast(response.data.message, "success")
        //         navigation.goBack()
        //     })
        //     .catch(error => {
        //         console.log(error)
        //     })
    }

    const handleInCompleteTask = async () => {
        setMarkInCompleteModal(false)
        const data = {
            taskid: routineId,
            time: timeValue
        }

        const { responseJson, err } = await requestPostApi(markasincomplete, data, 'POST', User.token)
        // setPageLoader(false)
        console.log('response of incompletetask', responseJson)
        // setMyGroupList(responseJson.body)
        if (responseJson.headers.success == true) {
            console.log('the res after deelted of task article', responseJson.body)
            navigation.goBack()
            // setRecentlyMemberLoader(false)
            // setRecentlyAddedMemberList(responseJson.body)

        } else {

            setalert_sms(err)
            setMy_Alert(true)
        }

    }

    return (
        <View style={styles.container}>
            {/* header section */}
            <CustomHeader
                headerText={"Routine Details"}
                backButton={{
                    visible: true,
                    onClick: () => {
                        navigation.goBack()
                    }
                }}
            />
            {/* body section */}
            {!pageLoader ? (
                <View style={styles.body}>
                    {/* details container */}
                    <View style={styles.detailsContainer}>
                        <View style={styles.direction}>
                            {/* preference section */}
                            <View style={styles.preferenceContainer}>
                                <View style={styles.preferenceIcon}>
                                    {routineDetails?.preferenceicon ? (
                                        <Image
                                            style={{ height: 45, width: 45 }}
                                            resizeMode="contain"
                                            source={{
                                                uri: `${routineDetails?.preferenceicon}`
                                            }}
                                        />
                                    ) : null}
                                </View>
                                <View style={styles.nameContainer}>
                                    <Text style={styles.preferenceTitle}>
                                        {routineDetails?.title}
                                    </Text>

                                    {/* routine type */}
                                    <Text style={styles.routineType}>
                                        {routineDetails?.routinetype}
                                    </Text>
                                </View>
                            </View>

                            {/* display complete, edit and delete icon basis of customer id match  */}
                            <View style={styles.iconsContainer}>
                                {User.userid == routineDetails?.routineCreatedBy ? (
                                    <View style={styles.direction}>
                                        {/* edit Icon  */}
                                        <TouchableOpacity
                                            style={styles.editContainer}
                                            onPress={() => {
                                                navigation.navigate(
                                                    "EditRoutine",
                                                    {
                                                        data: routineDetails,
                                                        id: routineId
                                                    }
                                                )
                                            }}
                                        >
                                            <Image
                                                resizeMode="contain"
                                                style={{ width: 18, height: 18 }}
                                                source={require("../../../../assets/Remindably/editIcon.png")}
                                            />
                                        </TouchableOpacity>

                                        {/* delete Icon  */}
                                        <TouchableOpacity
                                            style={styles.editContainer}
                                            onPress={() => {
                                                setDeleteModal(true)
                                            }}
                                        >
                                            <Image
                                                resizeMode="contain"
                                                style={{ width: 18, height: 18 }}
                                                source={require("../../../../assets/Remindably/Trash.png")}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                ) : null}
                            </View>
                        </View>

                        {/* title and sub title container */}
                        <View style={styles.titleContainer}>
                            <Text style={styles.routineTitle}>{routineDetails?.title}</Text>
                            <Text style={styles.routineSubTitle}>
                                {routineDetails?.subtitle}
                            </Text>
                        </View>

                        {/* date time section */}
                        <View style={styles.dateTimeContainer}>
                            <View style={styles.direction}>
                                <Image
                                    resizeMode="contain"
                                    tintColor={Mycolors.GRAY}
                                    style={{ height: 15, width: 15 }}
                                    source={require("../../../../assets/Remindably/CalendarBlank.png")}
                                />
                                <Text style={styles.date}>
                                    {moment(routineDetails?.createddate).format("ddd Do MMM")}
                                </Text>
                            </View>

                            {/* time section */}
                            {User.userid == routineDetails?.routineCreatedBy ? (
                                <FlatList
                                    horizontal={true}
                                    showsHorizontalScrollIndicator={false}
                                    data={routineDetails?.time}
                                    renderItem={renderAddedTimeWithComplete}
                                    keyExtractor={(item, index) => String(index)}
                                />
                            ) : (
                                <FlatList
                                    horizontal={true}
                                    showsHorizontalScrollIndicator={false}
                                    data={routineDetails?.time}
                                    renderItem={renderAddedTime}
                                    keyExtractor={(item, index) => String(index)}
                                />
                            )}
                        </View>

                        {/* description section */}
                        <View style={styles.descriptionContainer}>
                            <ScrollView nestedScrollEnabled={true}>
                                <Text style={styles.descriptionText}>
                                    {routineDetails?.description}
                                </Text>
                            </ScrollView>
                        </View>
                    </View>

                    {/* Comments section */}
                    <View style={styles.commentLabelContainer}>
                        <Text style={styles.commentCount}>Comments ({routineComments?.length})</Text>
                        <TouchableOpacity
                            style={styles.createRoutineContainer}
                            onPress={() => {
                                navigation.navigate("RoutineAllComments",
                                    {
                                        data: routineId,
                                        flow: "MYROUTINE"
                                    }
                                )
                            }}
                        >
                            <Text style={styles.createRoutineText}>Add Comment</Text>
                            <View style={styles.createRoutineIcon}>
                                <Image
                                    resizeMode="contain"
                                    style={styles.image}
                                    source={require("../../../../assets/Remindably/editIcon.png")}
                                />
                            </View>
                        </TouchableOpacity>
                    </View>

                    {/* other users comments on this task */}
                    {console.log('routineComments?.length', routineComments?.length, routineComments)}
                    {routineComments?.length > 0 ?
                        (
                            <View style={styles.commentContainer}>
                                <ScrollView style={{ height: '60%' }}>
                                    <FlatList
                                        data={routineComments}
                                        scrollEnabled={false}
                                        renderItem={renderCommentsRoutine}
                                        keyExtractor={(item, index) => String(index)}
                                    />
                                </ScrollView>
                                {/* view all comments */}
                                <TouchableOpacity
                                    style={styles.createRoutineContainer}
                                    onPress={() => {
                                        navigation.navigate("RoutineAllComments",
                                            {
                                                data: routineDetails?.routineid,
                                                flow: "MYROUTINE"
                                            }
                                        )
                                    }}
                                >
                                    <Text style={styles.createRoutineText}>View All Comments</Text>
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <View style={styles.noCommentContainer}>
                                <Image
                                    resizeMode="contain"
                                    style={styles.noCommentImage}
                                    source={require("../../../../assets/Remindably/noCommentImage.png")}
                                />
                                <Text style={styles.noCommentText}>No comments available!</Text>
                            </View>
                        )}

                    {/* save group button */}
                    <TouchableOpacity style={styles.submitButtonContainer} onPress={() => handleSubmit()}>
                        <SubmitButton
                            loader={buttonLoader}
                            buttonText={"Share Routine"}
                            submitButton={handleSubmit}
                        />
                    </TouchableOpacity>
                </View>
            ) : (
                <View style={styles.loaderContainer}>
                    <ActivityIndicator size="large" color={Mycolors.THEME_ORANGE} />
                </View>
            )}

            {/* Delete alert modal for delete routine */}
            <DeleteAlertModal
                visibleModal={deleteModal}
                onRequestClosed={() => {
                    setDeleteModal(false)
                }}
                onPressRightButton={() => {
                    handleDelete()
                }}
                subHeading={"Are you sure you want to delete this routine ?"}
            />

            {/* Delete alert modal for routine mark complete */}
            <DeleteAlertModal
                visibleModal={markCompleteModal}
                onRequestClosed={() => {
                    setMarkCompleteModal(false)
                }}
                onPressRightButton={handleCompleteTask}
                subHeading={"Are you sure you want to complete this routine ?"}
            />

            {/* Delete alert modal for routine mark complete */}
            <DeleteAlertModal
                visibleModal={markInCompleteModal}
                onRequestClosed={() => {
                    setMarkInCompleteModal(false)
                }}
                onPressRightButton={handleInCompleteTask}
                subHeading={"Are you sure you want to incomplete this routine ?"}
            />

            {/* Share Routine Modal */}
            <ShareRoutineModal
                visibleModal={shareRoutineModal}
                onClose={handleShareRoutineModalClose}
                onSubmitClick={handleShareRoutineSubmitClick}
                routineData={routineDetails}
                buttonLoader={buttonLoader}
            />

            {/* Share Routine Success Modal */}
            <SharedRoutineSuccessModal
                groupCount={groupCount}
                visibleModal={sharedRoutineSuccessModal}
                onClose={handleShareRoutineSuccessModalClose}
                onSubmitClick={handleShareRoutineSuccessSubmitClick}
            />

            {/* toaster message for error response from API */}
            {/* <CommonToast ref={toastRef} /> */}
        </View>
    )
}
export default RoutineDetails

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    body: {
        margin: 10,
        padding: 10
    },
    detailsContainer: {
        backgroundColor: Mycolors.WHITE,
        borderRadius: 15,
        marginBottom: 10,
        padding: 10
    },
    direction: {
        flexDirection: "row"
    },
    preferenceContainer: {
        alignItems: "center",
        flexDirection: "row",
        height: 65
    },
    preferenceIcon: {
        alignItems: "center",
        backgroundColor: Mycolors.brightGray,
        borderRadius: 50,
        height: 63,
        justifyContent: "center",
        width: 63
    },
    nameContainer: {
        paddingHorizontal: 8,
        width: "63%"
    },
    preferenceTitle: {
        color: Mycolors.THEME_ORANGE,
        fontSize: 16,
        fontWeight: "500",
        paddingBottom: 5
    },
    routineType: {
        color: Mycolors.GRAY,
        fontSize: 12,
        fontWeight: "400"
    },
    titleContainer: {
        height: "auto",
        paddingVertical: 10,
        width: "100%"
    },
    createRoutineContainer: {
        alignItems: "center",
        backgroundColor: Mycolors.THEME_ORANGE,
        borderRadius: 20,
        flexDirection: "row",
        height: 32,
        justifyContent: "center",
        width: 127,
        marginVertical: 20,

    },
    routineTitle: {
        color: Mycolors.THEME_ORANGE,
        fontSize: 14,
        fontWeight: "500"
    },
    routineSubTitle: {
        color: Mycolors.THEME_BLACK,
        fontSize: 12,
        fontWeight: "400"
    },
    dateTimeContainer: {
        width: "95%"
    },
    iconsContainer: { width: "20%" },
    editContainer: {
        alignItems: "center",
        borderRadius: 50,
        justifyContent: "center",
        marginHorizontal: 3,
        padding: 3
    },
    date: {
        color: Mycolors.GRAY,
        fontSize: 12,
        marginBottom: 5,
        paddingLeft: 5
    },
    descriptionContainer: {
        height: "auto",
        marginVertical: 5,
        maxHeight: 150,
        padding: 5
    },
    descriptionText: {
        color: Mycolors.THEME_BLACK,
        fontSize: 14,
        padding: 15,
        textAlign: "justify"
    },
    commentLabelContainer: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    commentCount: {
        color: Mycolors.THEME_BLACK,
        fontSize: 14,
        fontWeight: "400",
        paddingVertical: 10
    },
    createRoutineContainer: {
        alignItems: "center",
        backgroundColor: Mycolors.THEME_ORANGE,
        borderRadius: 20,
        flexDirection: "row",
        height: 32,
        justifyContent: "center",
        width: 127
    },
    createRoutineIcon: {
        backgroundColor: Mycolors.WHITE,
        borderRadius: 50,
        height: 24,
        padding: 3,
        width: 24
    },
    image: {
        borderRadius: 50,
        height: "100%",
        width: "100%"
    },
    createRoutineText: {
        color: Mycolors.WHITE,
        fontSize: 12,
        fontWeight: "400",
        paddingRight: 5
    },
    commentContainer: { height: "33%" },
    noCommentContainer: {
        alignContent: "center",
        alignItems: "center",
        height: "28%",
        justifyContent: "center"
    },
    noCommentImage: {
        height: 135,
        width: 135
    },
    noCommentText: {
        color: Mycolors.THEME_BLACK,
        fontSize: 18,
        fontWeight: "400"
    },
    submitButtonContainer: { marginVertical: 25 },
    loaderContainer: {
        alignSelf: "center",
        height: "83%",
        justifyContent: "center"
    }
})
