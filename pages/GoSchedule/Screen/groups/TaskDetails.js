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
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect, useRef, useState } from "react"
import moment from "moment"
//internal imports
import AddedTimeTab from "./AddedTimeTab"
import AllTimeWithComplete from "./AllTimeWithComplete"
import CommentsOnRoutine from "../routine/CommentsOnRoutine"
import Toast from 'react-native-toast-message'
//   import CommonToast from "../../constants/CommonToast"
import CustomHeader from "../../Constants/CustomHeaader"
import DeleteAlertModal from "./DeleteAlertModal"

import NotesImages from "../notes/NotesImages"
import RecentlyAddedMembersTab from "./RecentlyAddedMembersTab"
import { useIsFocused } from "@react-navigation/native";
import { get_details, requestGetApi, get_task, recent_members, group_detail, requestPostApi, delete_myTask, markasComplete, markasincomplete } from '../../../../WebApi/Service'
// group_detail
// import { colors } from "../../constants/ColorConstant"
import { Mycolors } from "../../../../utility/Mycolors"
const TaskDetails = ({ navigation, route }) => {
    const isFocus = useIsFocused()
    const [commentCount, setCommentCount] = useState(0)
    const [deleteModal, setDeleteModal] = useState(false)
    const [markCompleteModal, setMarkCompleteModal] = useState(false)
    const [markInCompleteModal, setMarkInCompleteModal] = useState(false)
    const [myUserId, setMyUserId] = useState()
    const [pageLoader, setPageLoader] = useState(false)
    const [taskComments, setTaskComments] = useState([])
    const [taskDetails, setTaskDetails] = useState({ id: 1 })
    const [taskId, setTaskId] = useState(route?.params?.id)
    const [timeValue, setTimeValue] = useState("")
    const [groupId, setGroupId] = useState('')
    const toastRef = useRef()
    const User = useSelector(state => state.user.user_details)
    console.log('User', User.userid);


    // jjjjjjjjjjjjjj
    // useEffect(() => {
    //     console.log('my task idkkkkk --------?', route?.params?.id);
    //     setTaskId(route?.params?.id)
    //     setGroupId(route?.params.group)
    //     const unsubscribe = navigation.addListener("focus", () => {

    //         // console.log('my task id--------?', route?.params.group);

    //         getData()
    //         getComments()
    //     })
    //     return unsubscribe
    // }, [isFocus])
    // llllllllllllll

    useEffect(() => {
        console.log('my group details');
        const unsubscribe = navigation.addListener("focus", () => {
            console.log('my task idkkkkk for new --------?', route?.params);
            setTaskId(route?.params?.id)
            setGroupId(route?.params?.group)
            getData(route?.params?.id)
            getComments(route?.params?.id)
        })
        return unsubscribe
    }, [isFocus])
    const clearState = () => {
        setDeleteModal(false)
    }
    // function for get all task details on api call
    const getDat = async () => {
        // user id for delete and edit icon
        const token = await AsyncStorage.getItem("userId")
        setMyUserId(token)

        setPageLoader(true)
        // GroupServices.getTasksDetails(taskId)
        //     .then(response => {
        //         setPageLoader(false)
        //         setTaskDetails(response.data.taskdetails)
        //     })
        //     .catch(error => {
        //         setPageLoader(false)
        //         console.log(error)
        //     })
    }
    const getData = async (item) => {
        console.log('task called', item)
        setPageLoader(true)

        const { responseJson, err } = await requestGetApi(group_detail + item, '', 'GET', User.token)
        setPageLoader(false)

        if (responseJson.headers.success == 1) {
            console.log('the res after task article', responseJson.body)
            // setGroupName(responseJson.body.name)
            // setGroupDetails(responseJson.body)
            setTaskDetails(responseJson.body)

        } else {

            setalert_sms(err)
            setMy_Alert(true)
        }
    }

    // function for get all comments data on api call
    const getComment = () => {
        const data = {
            taskid: taskId,
            tasktype: "T"
        }
        // GroupServices.postAllCommentsOnTask(data)
        //     .then(response => {
        //         setTaskComments(response.data.taskdetails.commentdetails)
        //         setCommentCount(response.data.taskdetails.commentsCount)
        //     })
        //     .catch(error => {
        //         console.log(error)
        //     })
    }

    const getComments = async (id) => {
        console.log('task comments called')
        setPageLoader(true)
        // setFeedbackImage([])
        // setPicker([])
        const { responseJson, err } = await requestGetApi(group_detail + id, '', 'GET', User.token)
        setPageLoader(false)
        // console.log('response of specific article', responseJson)
        // setMyGroupList(responseJson.body)
        if (responseJson.headers.success == 1) {
            console.log('the res after sucess of task comments------------???', responseJson.body.commentDetails
            )
            const images = responseJson.body.taskimages.map(imageObj => imageObj.images);

            // Filter out null or empty values (images with no URL) and set the images in the state
            // setCommentsImage(images.filter(image => image));

            // Filter out null values (comments with no images) and set the images in the state
            // setCommentsImage(images.filter(image => image !== null));
            setTaskComments(responseJson.body.commentDetails)
            // setTaskName(responseJson.body.name)
            // setAllCommentCount(response.data.taskdetails.commentsCount)
            // setTaskComments("")
            // setCommentsImage(response.data.taskdetails.images)
            // setGroupDetails(responseJson.body)
            // setAllTask(responseJson.body)

        } else {

            setalert_sms(err)
            setMy_Alert(true)
        }
    }

    // navigation on task details on tab click
    const handleViewCommentsClick = id => {
        console.log('my commnts details', id);
        navigation.navigate(
            "TaskAllComments",
            {
                data: id,

                group: route?.params?.group,
                flow: "TASKDETAILS"
            }
        )
    }

    // list for comments on task details
    const renderCommentsRoutine = ({ item }) => {
        console.log('item renderCommentsRoutine', item);
        return (
            <CommentsOnRoutine
                data={item}
                viewCommentsClick={handleViewCommentsClick}
                routineId={taskDetails?.id}
            />
        )
    }

    // list for images on task details
    const renderAddedTaskImages = ({ item }) => {
        return <NotesImages notesImages={item} />
    }

    // list for added time on task details
    const renderAddedTime = ({ item }) => {
        return <AddedTimeTab items={item} />
    }

    // list for all time with on task details
    const renderAddedTimeWithComplete = ({ item }) => {
        return (
            <AllTimeWithComplete
                items={item}
                handleMarkComplete={handleMarkComplete}
                handleMarkInComplete={handleMarkInComplete}
            />
        )
    }

    // function for delete button click on api call to delete task
    const handleDelet = () => {
        setDeleteModal(false)
        // GroupServices.getDeleteTask(taskId)
        //     .then(response => {
        //         toastRef.current.getToast(response.data.message, "success")
        //         navigation.goBack()
        //     })
        //     .catch(error => {
        //         console.log(error)
        //     })
    }


    const handleDelete = async () => {
        console.log('delte called')
        setPageLoader(true)
        var fUrl = delete_myTask + taskId

        console.log('furlsssssssssss->>>>>>>>>>>', fUrl)
        const { responseJson, err } = await requestPostApi(delete_myTask + taskId, '', 'DELETE', User.token)
        setPageLoader(false)
        console.log('response of recentMEmbers', responseJson)
        // setMyGroupList(responseJson.body)
        if (responseJson.headers.success == true) {
            console.log('the res after deelted of task article', groupId)
            navigation.navigate('GroupDetails', { data: groupId })
            Toast.show({ text1: responseJson.headers.message });
            clearState()
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
    const handleCompleteTaskk = () => {
        setMarkCompleteModal(false)
        const data = {
            taskid: taskId,
            time: timeValue
        }
        // GroupServices.postCompleteTask(data)
        //     .then(response => {
        //         toastRef.current.getToast(response.data.message, "success")
        //         navigation.goBack()
        //     })
        //     .catch(error => {
        //         console.log(error)
        //     })
    }
    const handleCompleteTask = async () => {
        setMarkCompleteModal(false)
        const data = {
            taskid: taskId,
            time: timeValue
        }

        const { responseJson, err } = await requestPostApi(markasComplete, data, 'POST', User.token)
        // setPageLoader(false)
        console.log('response of complete', responseJson)
        // setMyGroupList(responseJson.body)
        if (responseJson.headers.success == true) {
            console.log('the res after deelted of task article', responseJson.body)
            // getData(taskId)
            // navigation.goBack()
            Toast.show({ text1: responseJson.headers.message });
            getData(taskId)
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
            taskid: taskId,
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
            taskid: taskId,
            time: timeValue
        }

        const { responseJson, err } = await requestPostApi(markasincomplete, data, 'POST', User.token)
        // setPageLoader(false)
        console.log('response of incompletetask', responseJson)
        // setMyGroupList(responseJson.body)
        if (responseJson.headers.success == true) {
            console.log('the res after deelted of task article', responseJson.body)
            // navigation.goBack()
            Toast.show({ text1: responseJson.headers.message });
            getData(taskId)
            // setRecentlyMemberLoader(false)
            // setRecentlyAddedMemberList(responseJson.body)

        } else {

            setalert_sms(err)
            setMy_Alert(true)
        }

    }
    // list for recently added member click
    const renderAddedMembers = ({ item }) => {
        return <RecentlyAddedMembersTab item={item} />
    }

    return (
        <View style={styles.container}>
            {/* header section */}
            <CustomHeader
                headerText={"Task Details"}
                backButton={{
                    visible: true,

                    onClick: () => {
                        clearState()
                        console.log('my navigation.navigate====', route?.params?.group);
                        route?.params?.type ? navigation.navigate('MyTask', { data: groupId }) : navigation.navigate('GroupDetails', { data: groupId })
                    }
                }}
            />

            {/* body section */}
            {!pageLoader ? (
                <View style={styles.body}>
                    {/* details container */}
                    <View style={styles.detailsContainer}>
                        <View style={styles.direction}>
                            {/* title and sub priority section  */}
                            <View style={styles.titleContainer}>
                                <Text style={styles.taskName}>{taskDetails?.name}</Text>
                                {taskDetails?.priority === "H" ? (
                                    <Text style={styles.priority}>High priority</Text>
                                ) : taskDetails?.priority === "M" ? (
                                    <Text style={styles.priority}>Medium priority</Text>
                                ) : taskDetails?.priority === "L" ? (
                                    <Text style={styles.priority}>Low priority</Text>
                                ) : null}
                            </View>

                            {/* display complete, edit and delete icon basis of customer id match  */}
                            <View style={styles.iconsContainer}>
                                {console.log('taskDetails?.taskCreatedBy check item', taskDetails?.taskCreatedBy)}
                                {User.userid == taskDetails?.taskCreatedBy ? (
                                    <View style={styles.direction}>
                                        {/* edit icon  */}
                                        <TouchableOpacity
                                            style={styles.editContainer}
                                            onPress={() => {
                                                navigation.navigate(
                                                    "EditTask",
                                                    {
                                                        data: taskDetails,
                                                        group: groupId
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

                                        {/* delete icon  */}
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

                        {/* date time section  */}
                        <View style={styles.dateTimeContainer}>
                            <View style={styles.direction}>
                                <Image
                                    resizeMode="contain"
                                    tintColor={Mycolors.GRAY}
                                    style={{ height: 15, width: 15 }}
                                    source={require("../../../../assets/Remindably/CalendarBlank.png")}
                                />
                                <Text style={styles.date}>
                                    {moment(taskDetails?.datetime).format("ddd Do MMM")}
                                </Text>
                            </View>

                            {/* time section  */}
                            {User.userid == taskDetails?.taskCreatedBy ? (
                                <FlatList
                                    horizontal={true}
                                    showsHorizontalScrollIndicator={false}
                                    data={taskDetails?.time}
                                    renderItem={renderAddedTimeWithComplete}
                                    keyExtractor={(item, index) => String(index)}
                                />
                            ) : (
                                <FlatList
                                    horizontal={true}
                                    showsHorizontalScrollIndicator={false}
                                    data={taskDetails?.time}
                                    renderItem={renderAddedTime}
                                    keyExtractor={(item, index) => String(index)}
                                />
                            )}

                            {/* description section  */}
                            {taskDetails?.description ? (
                                <View style={styles.descriptionContainer}>
                                    <ScrollView nestedScrollEnabled={true}>
                                        <Text style={styles.descriptionText}>
                                            {taskDetails?.description}
                                        </Text>
                                    </ScrollView>
                                </View>
                            ) : null}

                            {/* task image section  */}
                            {taskDetails?.taskimages?.length > 0 ? (
                                <View style={{ marginVertical: 10 }}>
                                    <FlatList
                                        data={taskDetails?.taskimages}
                                        horizontal={true}
                                        showsHorizontalScrollIndicator={false}
                                        renderItem={renderAddedTaskImages}
                                        keyExtractor={(item, index) => String(index)}
                                    />
                                </View>
                            ) : null}
                        </View>
                    </View>

                    <Text style={styles.commentCount}>Assigned Members</Text>
                    {console.log('taskDetails?.taskassignmembers', taskDetails?.taskassignmembers)}
                    {taskDetails?.taskassignmembers?.length > 0 ? (
                        <View style={{ height: "auto" }}>
                            <FlatList
                                data={taskDetails?.taskassignmembers}
                                renderItem={renderAddedMembers}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                keyExtractor={(item, index) => String(index)}
                            />
                        </View>
                    ) : (
                        <View style={styles.noMembersContainer}>
                            <Text style={styles.noMembersText}>No members assigned</Text>
                        </View>
                    )}

                    {/* Comments section */}
                    <View style={styles.commentLabelContainer}>
                        <Text style={styles.commentCount}>Comments ({taskComments?.length})</Text>
                        {console.log('taskDetails?.id', taskDetails?.id)}
                        <TouchableOpacity
                            style={styles.createRoutineContainer}
                            onPress={() => {
                                console.log('my details for comments----->>>', taskDetails?.id);

                                navigation.navigate("TaskAllComments",
                                    {
                                        data: taskDetails?.id,

                                        group: route?.params?.group,
                                        flow: "TASKDETAILS"
                                    }
                                )
                            }}
                        >
                            <Text style={styles.createRoutineText}> Add Comment</Text>
                            <View style={styles.createRoutineIcon}>
                                <Image
                                    resizeMode="contain"
                                    style={styles.image}
                                    source={require("../../../../assets/Remindably/editIcon.png")}
                                />
                            </View>
                        </TouchableOpacity>
                    </View>

                    {/* other users comments on this task*/}
                    {taskComments?.length > 0 ? (
                        <View style={styles.commentContainer}>
                            <ScrollView style={{ height: '70%' }}>
                                <FlatList
                                    data={taskComments}
                                    scrollEnabled={false}
                                    renderItem={renderCommentsRoutine}
                                    keyExtractor={(item, index) => String(index)}
                                />
                            </ScrollView>
                            {/* view all comments  */}
                            <TouchableOpacity
                                style={styles.createRoutineContainer}
                                onPress={() => {
                                    navigation.navigate(
                                        "TaskAllComments",
                                        {
                                            data: taskDetails?.id,
                                            group: route?.params?.group,
                                            flow: "TASKDETAILS"
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
                </View>
            ) : (
                <View style={styles.loaderContainer}>
                    <ActivityIndicator size="large" color={Mycolors.THEME_ORANGE} />
                </View>
            )}

            {/* Delete alert modal for delete task */}
            <DeleteAlertModal
                visibleModal={deleteModal}
                onRequestClosed={() => {
                    setDeleteModal(false)
                }}
                onPressRightButton={() => {
                    handleDelete()
                }}
                subHeading={"Are you sure you want to delete this task ?"}
            />

            {/* Delete alert modal for task mark complete */}
            <DeleteAlertModal
                visibleModal={markCompleteModal}
                onRequestClosed={() => {
                    setMarkCompleteModal(false)
                }}
                onPressRightButton={handleCompleteTask}
                subHeading={"Are you sure you want to complete this task ?"}
            />

            {/* Delete alert modal for task mark complete */}
            <DeleteAlertModal
                visibleModal={markInCompleteModal}
                onRequestClosed={() => {
                    setMarkInCompleteModal(false)
                }}
                onPressRightButton={handleInCompleteTask}
                subHeading={"Are you sure you want to incomplete this task ?"}
            />

            {/* toaster message for error response from API */}
            {/* <CommonToast ref={toastRef} /> */}
        </View>
    )
}
export default TaskDetails

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
    titleContainer: {
        height: "auto",
        width: "80%"
    },
    taskName: {
        color: Mycolors.THEME_ORANGE,
        fontSize: 16,
        fontWeight: "500"
    },
    priority: {
        color: Mycolors.GRAY,
        fontSize: 12,
        fontWeight: "400",
        paddingVertical: 5
    },
    iconsContainer: {
        height: 30,
        width: "20%"
    },
    editContainer: {
        alignItems: "center",
        borderRadius: 50,
        justifyContent: "center",
        marginHorizontal: 3,
        padding: 3
    },
    dateTimeContainer: {
        marginVertical: 3,
        width: "95%"
    },
    date: {
        color: Mycolors.GRAY,
        fontSize: 12,
        marginBottom: 5,
        paddingLeft: 5
    },
    descriptionContainer: {
        height: "auto",
        marginVertical: 10,
        maxHeight: 130,
        padding: 10
    },
    descriptionText: {
        color: Mycolors.THEME_BLACK,
        fontSize: 14,
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
    commentContainer: { height: "53%" },
    noCommentContainer: {
        alignContent: "center",
        alignItems: "center",
        height: "35%",
        justifyContent: "center"
    },
    noCommentImage: {
        height: 135,
        width: 135
    },
    noCommentText: {
        color: Mycolors.THEME_BLACK,
        fontSize: 18,
        fontWeight: "400",
        padding: 20
    },
    submitButtonContainer: { marginVertical: 20 },
    loaderContainer: {
        alignSelf: "center",
        height: "83%",
        justifyContent: "center"
    },
    noMembersContainer: {
        alignContent: "center",
        alignItems: "center",
        height: "auto",
        justifyContent: "center"
    },
    noMembersText: {
        color: Mycolors.THEME_BLACK,
        fontSize: 18,
        fontWeight: "400",
        padding: 20
    }
})
