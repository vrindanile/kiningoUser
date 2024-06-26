//external imports
import {
    ActivityIndicator,
    FlatList,
    Image,
    PermissionsAndroid,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native"
import Geolocation from "react-native-geolocation-service"
import React, { useEffect, useRef, useState } from "react"
import moment from "moment"
//internal imports
// home_details
import { requestGetApi, get_memberList, add_members, invite_user, requestPostApi, request_list, home_details, home_detailTask, taskHideUnhide, markasincomplete, markasComplete } from '../../../../WebApi/Service'
import { useSelector, useDispatch } from 'react-redux';
// import AddedExpensesTab from "../ExpenseManagment/AddedExpensesTab"
// import CommonToast from "../../constants/CommonToast"
// import CommonToast from "../../Constants/CommonToast"
import CustomHeader from "../../Constants/CustomHeaader"
// import DeleteAlertModal from "../groups/DeleteAlertModal"
import DeleteAlertModal from "../../groups/DeleteAlertModal"
// import GroupServices from "../../service/GroupServices"
import GroupTab from "./GroupTab"
import Toast from 'react-native-toast-message'
// import HomeScreenService from "../../service/HomeScreenService"
import TaskTab from "./TaskTab"
// import { colors } from "../../constants/ColorConstant"
import { Mycolors } from "../../../../utility/Mycolors"

const Home = ({ navigation }) => {
    const scrollRef = useRef();
    const scrollViewRef = useRef();
    const [eventCount, setEventCount] = useState(0)
    const [groupList, setGroupList] = useState([])
    const [hideTaskList, setHideTaskList] = useState([])
    const [isHide, setIsHide] = useState(false)
    const [markCompleteModal, setMarkCompleteModal] = useState(false)
    const [markHideModal, setMarkHideModal] = useState(false)
    const [markInCompleteModal, setMarkInCompleteModal] = useState(false)
    const [markUnHideModal, setMarkUnHideModal] = useState(false)
    const [pageLoader, setPageLoader] = useState(false)
    const [postCount, setPostCount] = useState(0)
    const [taskId, setTaskId] = useState(0)
    const [timeValue, setTimeValue] = useState("")
    const [unHideTaskList, setUnHideTaskList] = useState([])
    const [upComingExpenses, setUpComingExpenses] = useState([])
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const toastRef = useRef()
    const User = useSelector(state => state.user.user_details)
    console.log('user details----->>>>', User);
    const [region, setRegion] = useState({
        latitude: 0,
        latitudeDelta: 0.015,
        longitude: 0,
        longitudeDelta: 0.0121
    })

    useEffect(() => {
        // navigation.navigate("DrawerNavigator", {
        //     screen: "BottomTabNavigator"
        // })
        const unsubscribe = navigation.addListener("focus", () => {
            setPageLoader(true)
            // getLocation()
            getData()
            getTask()
        })
        return unsubscribe
    }, [navigation])

    // function for open side menu
    const handleOpenDrawer = () => {
        navigation.openDrawer()
    }

    // function for get current location data on api call
    const getLocation = async () => {
        let granted = null
        if (Platform.OS === "android") {
            granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: "Remindably Permission",
                    message: "Remindably needs access to your location ",
                    buttonNegative: "Cancel",
                    buttonPositive: "OK"
                }
            )
        } else {
            await Geolocation.requestAuthorization("whenInUse")
        }
        if (
            granted === PermissionsAndroid.RESULTS.GRANTED ||
            Platform.OS === "ios"
        ) {
            Geolocation.getCurrentPosition(
                position => {
                    let metadata = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        latitudeDelta: 0.015,
                        longitudeDelta: 0.0121
                    }
                    setRegion(metadata)
                    getData(metadata)
                },
                error => {
                    console.log(error.code, error.message)
                },
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
            )
        }
    }

    // function for get all home details data on api call
    const getData = async () => {
        console.log('all memeneee')
        setPageLoader(true)
        console.log('does api reach to this point in getData home')
        const { responseJson, err } = await requestGetApi(home_details, '', 'GET', User.token)
        setPageLoader(false)
        console.log('response of counts of difftabs', responseJson)
        // setMyGroupList(responseJson.body)
        if (responseJson.headers.success == true) {
            console.log('grouplist from array---->>>', responseJson.body.data.groupList);
            setGroupList(responseJson.body.data.groupList)
            setPostCount(response?.data?.postcount)
            setEventCount(response?.data?.nearbyeventcounts)
        } else {

            setalert_sms(err)
            setMy_Alert(true)
        }
    }
    // function for get all task data on api call

    const getTask = async () => {
        console.log('all memeneee')
        setPageLoader(true)
        const { responseJson, err } = await requestGetApi(home_detailTask, '', 'GET', User.token)
        setPageLoader(false)
        console.log('response of home details tasks', responseJson.body.data.tasksList)
        // setMyGroupList(responseJson.body)
        if (responseJson.headers.success == true) {
            var newArray = responseJson.body.data.tasksList.filter(e => {
                {
                    return e.hidestatus == "0"
                }
            })

            console.log('my new array setUnHideTaskList--->>>', newArray);
            setUnHideTaskList(newArray)

            // for all hide tasks
            var newArray = responseJson.body.data.tasksList.filter(e => {
                {
                    return e.hidestatus == "1"
                }
            })
            console.log('my new array--->>>', newArray);
            setHideTaskList(newArray)


        } else {
            setPageLoader(false)
            setalert_sms(err)
            setMy_Alert(true)
        }
    }



    // navigation on my group, shared groups, my routine and shared routine
    const handleTabPress = title => {
        if (title === "My Groups") {
            navigation.navigate(
                "MyGroups",
                {
                    title: "My Groups",

                }
            )
        } else if (title === "Shared Groups") {
            navigation.navigate(
                "SharedGroups",
                { title: "Shared Groups" }
            )
        } else if (title === "My Routines") {
            navigation.navigate(
                "Routine",
                {
                    title: "My Routines",

                }
            )
            // navigation.navigate("BottomNavigator", {
            //     screen: "Routine",
            //     params: { title: "My Routines" }
            // })
        } else if (title === "Shared Routines") {
            navigation.navigate(
                "SharedRoutines",
                { title: "Shared Routines" }
            )
        } else {
            console.log('is navigation reaches');
            <View style={{ flexDirection: 'row', backgroundColor: 'red' }}><Text style={{ color: 'red', fontSize: 15, }}>llllll</Text></View>

            navigation.navigate("GoScheduleStack", {
                screen: "MyGroups",
                params: { title: "My Groups" }
            })
        }
    }
    // const handleTabPress = title => {
    //     navigation.navigate(
    //         "MyGroups",
    //         {
    //             title: "My Groups",

    //         }
    //     )
    // }

    // list for group tab
    const renderGroupItem = ({ item }) => {
        console.log('item for grouptab----->', item);
        // return <GroupTab items={item} tabPress={handleTabPress} />
        return <GroupTab items={item} tabPress={handleTabPress} />
    }

    // navigation on task details and routine details
    const handleTaskTabClick = taskData => {
        {
            taskData?.tasktype === "T"
                ? navigation.navigate(
                    "TaskDetails",
                    { id: taskData?.id, group: null }
                )
                : taskData?.tasktype === "R"
                    ? navigation.navigate(
                        "RoutineDetails",
                        { id: taskData?.id }
                    )
                    : null
        }
    }

    // function for open modal on hide click
    const handleHideClick = (id, value) => {
        setMarkHideModal(true)
        setTaskId(id)
        setTimeValue(value)
    }

    // function for hide click on api call to hide task
    const handleHideYesClickf = () => {
        setMarkHideModal(false)
        const data = {
            taskid: taskId,
            hidestatus: "1",
            time: timeValue
        }
        HomeScreenService.postHideTask(data)
            .then(response => {
                toastRef.current.getToast(response.data.message, "success")
                getTask() //for refresh the tasks
            })
            .catch(error => {
                console.log(error, "error")
            })
    }
    const handleHideYesClick = async () => {
        setMarkHideModal(false)
        console.log('all memeneee')
        setPageLoader(true)

        const data = {
            "taskid": taskId,
            "hidestatus": 1,
            "time": timeValue
        }
        console.log('my data--->>>>', data);
        const { responseJson, err } = await requestPostApi(taskHideUnhide + taskId, data, 'PUT', User.token)
        setPageLoader(false)

        // setMyGroupList(responseJson.body)
        if (responseJson.headers.success == true) {
            console.log('response of hide taask', responseJson.headers.message)
            Toast.show({ text1: responseJson.headers.message });
            getTask()
            // setGroupList(responseJson.body)
            // setPostCount(response?.data?.postcount)
            // setEventCount(response?.data?.nearbyeventcounts)
            // console.log('the res after sucess of specific members from the screen', responseJson)
            // const data = responseJson.body.map((el, index) => ({ ...el, memdId: (index + 1)?.toString() }))
            // setAllMembersData(data)
            // setGroupName(responseJson.body.name)
            // setGroupDetails(responseJson.body)

        } else {

            setalert_sms(err)
            setMy_Alert(true)
        }
    }

    // function for open modal on unHide click
    const HandleUnHideClick = (id, value) => {
        setMarkUnHideModal(true)
        setTaskId(id)
        setTimeValue(value)
    }

    // function for unHide click on api call to unHide task
    const handleUnHideYesClickk = () => {
        setMarkUnHideModal(false)
        const data = {
            taskid: taskId,
            hidestatus: "0",
            time: timeValue
        }
        HomeScreenService.postHideTask(data)
            .then(response => {
                toastRef.current.getToast(response.data.message, "success")
                getTask() //for refresh the tasks
            })
            .catch(error => {
                console.log(error, "error")
            })
    }
    const handleUnHideYesClick = async () => {
        setMarkUnHideModal(false)
        console.log('all memeneee')
        setPageLoader(true)

        const data = {
            "taskid": taskId,
            "hidestatus": 0,
            "time": timeValue
        }
        console.log('my data--->>>>', data);
        const { responseJson, err } = await requestPostApi(taskHideUnhide + taskId, data, 'PUT', User.token)
        setPageLoader(false)
        console.log('response of unhide taask', responseJson)

        // setMyGroupList(responseJson.body)
        if (responseJson.headers.success == true) {
            console.log('response of hide taask', responseJson.headers.message)
            Toast.show({ text1: responseJson.headers.message });
            getTask()
            // setGroupList(responseJson.body)
            // setPostCount(response?.data?.postcount)
            // setEventCount(response?.data?.nearbyeventcounts)
            // console.log('the res after sucess of specific members from the screen', responseJson)
            // const data = responseJson.body.map((el, index) => ({ ...el, memdId: (index + 1)?.toString() }))
            // setAllMembersData(data)
            // setGroupName(responseJson.body.name)
            // setGroupDetails(responseJson.body)

        } else {

            setalert_sms(err)
            setMy_Alert(true)
        }
    }
    // function for open modal on mark complete click
    const handleMarkComplete = (id, value) => {
        setMarkCompleteModal(true)
        setTaskId(id)
        setTimeValue(value)
    }

    // function for mark complete click on api call to complete task
    const handleCompleteTask = async () => {
        setMarkCompleteModal(false)
        const data = {
            taskid: taskId,
            time: timeValue
        }
        // GroupServices.postCompleteTask(data)
        //     .then(response => {
        //         toastRef.current.getToast(response.data.message, "success")
        //         getTask() //for refresh the tasks
        //     })
        //     .catch(error => {
        //         console.log(error)
        //     })
        const { responseJson, err } = await requestPostApi(markasComplete, data, 'POST', User.token)
        // setPageLoader(false)
        console.log('response of complete', responseJson)
        // setMyGroupList(responseJson.body)
        if (responseJson.headers.success == true) {
            Toast.show({ text1: responseJson.headers.message });
            console.log('handel mark as incomplete ', responseJson.body)
            getTask()

            // getData(taskId)
            // setRecentlyMemberLoader(false)
            // setRecentlyAddedMemberList(responseJson.body)
            // setRecentlyAddedMemberList(responseJson.body)

        } else {

            setalert_sms(err)
            setMy_Alert(true)
        }
    }

    // function for open modal on mark incomplete click
    const handleMarkInComplete = (id, value) => {
        setMarkInCompleteModal(true)
        setTaskId(id)
        setTimeValue(value)
    }

    // function for mark incomplete click on api call to incomplete task
    const handleInCompleteTask = async () => {
        setMarkInCompleteModal(false)
        console.log('my data for moddak--->>', taskId, timeValue);
        const data = {
            taskid: taskId,
            time: timeValue
        }
        // GroupServices.postInCompleteTask(data)
        //     .then(response => {
        //         toastRef.current.getToast(response.data.message, "success")
        //         getTask() //for refresh the tasks
        //     })
        //     .catch(error => {
        //         console.log(error)
        //     })
        const { responseJson, err } = await requestPostApi(markasincomplete, data, 'POST', User.token)
        // setPageLoader(false)
        console.log('response of incompletetask', responseJson)
        // setMyGroupList(responseJson.body)
        if (responseJson.headers.success == true) {
            Toast.show({ text1: responseJson.headers.message });
            console.log('handel mark as incomplete ', responseJson.body)
            getTask()

            // getData(taskId)
            // setRecentlyMemberLoader(false)
            // setRecentlyAddedMemberList(responseJson.body)

        } else {

            setalert_sms(err)
            setMy_Alert(true)
        }
    }

    // list for added expenses
    const renderAddedExpenses = ({ item }) => {
        return <AddedExpensesTab items={item} />
    }


    return (
        <View style={styles.container}>
            {/* header section */}
            <CustomHeader
                headerText={"Home"}
                drawerButton={{
                    visible: true,
                    onClick: () => {
                        handleOpenDrawer()
                    }
                }}
                bellButton={{
                    visible: true,
                    onClick: () => {
                        navigation.navigate(
                            "Notifications"
                        )
                    }
                }}
            />

            {/* body section */}
            {!pageLoader ? (
                <SafeAreaView style={styles.container}>
                    <ScrollView nestedScrollEnabled={true}>
                        {/* groups tab  */}
                        <View style={styles.groupTab}>
                            {console.log('my group listtttt---->>>', groupList)}
                            <FlatList
                                data={groupList}
                                renderItem={renderGroupItem}
                                numColumns={2}
                                keyExtractor={(item, index) => String(index)}
                            />
                        </View>

                        {/* expense management tab */}
                        <View style={styles.expenseContainer}>
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate("StackNavigation", {
                                        screen: "ExpenseManagement"
                                    })
                                }}
                                style={styles.expenseTab}
                            >
                                <View style={styles.expenseImage}>
                                    <Image
                                        style={{ height: 47, width: 47 }}
                                        resizeMode="cover"
                                        source={require("../../../../assets/Remindably/expensesIcon.png")}
                                    />
                                </View>
                                <Text style={styles.tabTitle}>Expenses</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate("StackNavigation", {
                                        screen: "BusinessCommunity"
                                    })
                                }}
                                style={styles.expenseTab}
                            >
                                {postCount > 0 ? (
                                    <Text style={styles.notificationText}>{postCount}</Text>
                                ) : null}

                                <View style={styles.expenseImage}>
                                    <Image
                                        style={{ height: 40, width: 40 }}
                                        resizeMode="cover"
                                        tintColor={Mycolors.THEME_ORANGE}
                                        source={require("../../../../assets/Remindably/businessIcon.png")}
                                    />
                                </View>
                                <Text style={styles.tabTitle}>Business/ Community</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate("StackNavigation", {
                                        screen: "EventManagement"
                                    })
                                }}
                                style={styles.expenseTab}
                            >
                                {eventCount > 0 ? (
                                    <Text style={styles.notificationText}>{eventCount}</Text>
                                ) : null}

                                <View style={styles.expenseImage}>
                                    <Image
                                        style={{ height: 47, width: 47 }}
                                        resizeMode="cover"
                                        source={require("../../../../assets/Remindably/eventIcon.png")}
                                    />
                                </View>
                                <Text style={styles.tabTitle}>Events</Text>
                            </TouchableOpacity>
                        </View>

                        {/* task tab */}
                        <View style={styles.myTasksContainer}>
                            <TouchableOpacity
                                onPress={() => {
                                    getTask()
                                    setIsHide(false)
                                }}
                            >
                                <Text style={styles.myTaskTitle}>
                                    My Tasks ({moment(new Date()).format("MMM DD, YYYY")})
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => {
                                    getTask()
                                    setIsHide(true)
                                }}
                            >
                                <Text style={styles.myTaskTitle}>Hidden Tasks </Text>
                            </TouchableOpacity>
                        </View>

                        {/* state according to hide and unHide status  */}
                        {console.log('my hidden', isHide)}
                        {isHide ? (

                            <>
                                {hideTaskList?.length > 0 ? (
                                    <View style={styles.taskContainer}>
                                        {console.log('my hidden task list----?>>>', hideTaskList)}
                                        <ScrollView nestedScrollEnabled={true}>
                                            {hideTaskList.map(item => {
                                                return (
                                                    <TaskTab
                                                        data={item}
                                                        onTaskTabClick={handleTaskTabClick}
                                                        hideClick={handleHideClick}
                                                        unHideClick={HandleUnHideClick}
                                                        handleMarkComplete={handleMarkComplete}
                                                        handleMarkInComplete={handleMarkInComplete}
                                                    />
                                                )
                                            })}
                                        </ScrollView>
                                    </View>
                                ) : (
                                    <View style={styles.noTaskContainer}>
                                        <Text style={styles.noTaskText}>
                                            No Hide Task Available
                                        </Text>
                                    </View>
                                )}
                            </>
                        ) : (

                            <>
                                {console.log('does it reach tothe unhidden', unHideTaskList)}
                                {unHideTaskList?.length > 0 ? (
                                    <View style={styles.taskContainer}>
                                        <ScrollView showsVerticalScrollIndicator={false}
                                            showsHorizontalScrollIndicator={false}
                                            nestedScrollEnabled={true}
                                        >
                                            {unHideTaskList.map(item => {
                                                console.log('my unhidden task list----???', item);
                                                return (
                                                    <TaskTab
                                                        data={item}
                                                        onTaskTabClick={handleTaskTabClick}
                                                        hideClick={handleHideClick}
                                                        unHideClick={HandleUnHideClick}
                                                        handleMarkComplete={handleMarkComplete}
                                                        handleMarkInComplete={handleMarkInComplete}
                                                    />
                                                )
                                            })}
                                        </ScrollView>
                                    </View>
                                ) : (
                                    <View style={styles.noTaskContainer}>
                                        <Text style={styles.noTaskText}>No Task Available</Text>
                                    </View>
                                )}
                            </>
                        )}

                    </ScrollView>
                </SafeAreaView>
            ) : (
                <View style={styles.loaderContainer}>
                    <ActivityIndicator size="large" color={Mycolors.THEME_ORANGE} />
                </View>
            )
            }

            {/* Delete alert modal for hide task */}
            <DeleteAlertModal
                visibleModal={markHideModal}
                onRequestClosed={() => {
                    setMarkHideModal(false)
                }}
                onPressRightButton={handleHideYesClick}
                subHeading={"Are you sure you want to hide ?"}
            />

            {/* Delete alert modal for un hide task */}
            <DeleteAlertModal
                visibleModal={markUnHideModal}
                onRequestClosed={() => {
                    setMarkUnHideModal(false)
                }}
                onPressRightButton={handleUnHideYesClick}
                subHeading={"Are you sure you want to unhide ?"}
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

            {/* Delete alert modal for task mark inComplete */}
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
        </View >
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    calendarDateView: {
        backgroundColor: Mycolors.WHITE,
        borderRadius: 5,
        flexDirection: "row",
        paddingHorizontal: 10,
        paddingVertical: 3
    },
    taskContainer: {
        height: 320,
        marginBottom: 10
    },
    myTaskTitle: {
        color: Mycolors.THEME_ORANGE,
        fontSize: 16,
        fontWeight: "500"
    },
    myTasksContainer: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 10,
        paddingHorizontal: 10
    },
    expenseContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 10,
        paddingHorizontal: 15,
        paddingVertical: 5
    },
    expenseTab: {
        backgroundColor: '#E0E0E0',

        borderRadius: 30,
        height: 110,
        justifyContent: "center",
        width: "32%"
    },
    tabTitle: {
        color: Mycolors.BLACK,
        fontSize: 12,
        fontWeight: "400",
        marginTop: 5,
        textAlign: "center"
    },
    expenseImage: {
        alignContent: "center",
        alignSelf: "center",
        borderRadius: 50
    },
    loaderContainer: {
        alignSelf: "center",
        flex: 1,
        justifyContent: "center"
    },
    groupTab: {
        marginTop: 10,
        paddingHorizontal: 5
    },
    noTaskContainer: {
        alignContent: "center",
        alignItems: "center",
        height: 320,
        justifyContent: "center"
    },
    noTaskText: {
        color: Mycolors.THEME_BLACK,
        fontSize: 18,
        fontWeight: "500",
        padding: 20
    },
    notificationText: {
        backgroundColor: Mycolors.RED,
        borderRadius: 50,
        color: Mycolors.WHITE,
        fontSize: 12,
        fontWeight: "500",
        height: 25,
        justifyContent: "center",
        padding: 3,
        position: "absolute",
        right: 3,
        textAlign: "center",
        top: 0,
        width: 25,
        zIndex: 1
    },
    textDirection: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 10
    },
    labelText: {
        color: Mycolors.THEME_BLACK,
        fontSize: 18,
        fontWeight: "500",
        paddingVertical: 5
    },
    addEditText: {
        color: Mycolors.THEME_ORANGE,
        fontSize: 14
    },
    expansesContainer: {
        alignContent: "center",
        alignItems: "center",
        alignSelf: "center",
        height: 160,
        justifyContent: "center",
        marginBottom: 20,
        marginVertical: 5
    },
    noExpansesText: {
        color: Mycolors.THEME_BLACK,
        fontSize: 18,
        fontWeight: "500",
        padding: 20
    }
})
