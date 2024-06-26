
import {
    ActivityIndicator,
    FlatList,
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    ScrollView
} from "react-native"
import LinearGradient from "react-native-linear-gradient"
import React, { useEffect, useRef, useState } from "react"

//internal imports
// import CommonToast from "../../constants/CommonToast"
// import CreateGroupModal from "./CreateGroupModal"
import CreateGroupModal from "../groups/CreateGroupModal"
import { useSelector, useDispatch } from 'react-redux';
// import CustomHeader from "../../constants/CustomHeader"
// import GroupServices from "../../service/GroupServices"
import Toast from 'react-native-toast-message'
import MyGroupsTab from "../groups/MyGroupsTab"
import { requestGetApi, get_task, requestPostApi, markasComplete, markasincomplete } from '../../../../WebApi/Service'
// import { colors } from "../../constants/ColorConstant"
import { Mycolors } from "../../../../utility/Mycolors"
import CustomHeader from "../../Constants/CustomHeaader"
import { useIsFocused } from '@react-navigation/native';
import MyTaskTab from "./MyTaskTab";
import DeleteAlertModal from "./DeleteAlertModal";
const MyTask = ({ navigation, route }) => {
    const scrollViewRef = useRef();
    const [createGroupVisible, setCreateGroupVisible] = useState(false)
    const [myGroupList, setMyGroupList] = useState([])
    const [noData, setNoData] = useState(false)
    console.log('nnnnn', noData);
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [pageLoader, setPageLoader] = useState(false)
    const [searchText, setSearchText] = useState("")
    const isFocused = useIsFocused();
    const toastRef = useRef()
    //state for modal complet
    const [markCompleteModal, setMarkCompleteModal] = useState(false)
    const [markInCompleteModal, setMarkInCompleteModal] = useState(false)
    //state for task 
    const [taskId, setTaskId] = useState(0)
    //stae for schedule
    const [timeValue, setTimeValue] = useState("")
    const User = useSelector(state => state.user.user_details)
    console.log('User', User.token);
    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            console.log('value of no dtaa', noData);
            console.log(route.params, 'myy listing');
            Categories('',)
            // setSearchText("")
            // setPageLoader(true)
            // function for get all my group data on api call
            // GroupServices.getMyGroups()
            //     .then(response => {
            //         setPageLoader(false)
            //         setMyGroupList(response.data.mygroups)
            //     })
            //     .catch(error => {
            //         setPageLoader(false)
            //         console.log(error)
            //     })
        })
        return unsubscribe
    }, [navigation])
    useEffect(() => {
        if (isFocused) {
            setSearchText('');
        }
    }, [isFocused]);
    const handleLoadMore = () => {
        console.log('is homePAge2 is called', page <= lastPage);
        console.log('my last page---->>', lastPage, page);
        if (page < lastPage) {

            console.log('page of my startup page',);
            Categories('', true)
        } else {

            console.log('Reached last page');
            return
            // Handle the case where you've reached the last page
            // You can display a message or perform other actions here if needed

        }
    };
    // useFocusEffect(
    //     React.useCallback(() => {
    //         // Clear the search text when the screen is focused
    //         setSearchText('');
    //     }, [])
    // );
    // function for search all my group data on api call
    // const searchGroup = text => {
    //     setPageLoader(true)

    //     GroupServices.getSearchMyGroups(text)
    //         .then(response => {
    //             if (response.data.mygroups.length > 0) {
    //                 setNoData(false)
    //                 setMyGroupList(response.data.mygroups)
    //                 setPageLoader(false)
    //             } else {
    //                 setMyGroupList(response.data.mygroups)
    //                 setPageLoader(false)
    //                 setNoData(true)
    //             }
    //         })
    //         .catch(error => {
    //             console.log(error)
    //         })
    // }
    const searchGroup = async (text) => {
        console.log('searchhhhhh')
        setPageLoader(true)
        var fUrl = get_task
        var urls = '?search=' + text
        console.log('my url---------->', urls)
        if (urls != undefined) {
            fUrl = fUrl + urls
        }
        console.log("saaaaaccc::: of my url", fUrl);

        const { responseJson, err } = await requestGetApi(fUrl, '', 'GET', User.token)
        setPageLoader(false)
        console.log('the res after search', responseJson.headers.message == 'success')
        setMyGroupList(responseJson.body)
        if (responseJson.body.length > 0) {
            console.log('my search from + button------>>>>', responseJson.body)
            setNoData(false)
            setMyGroupList(responseJson.body)
            setPageLoader(false)
            // setSearchText('')
        } else {
            setMyGroupList(responseJson.body)
            setPageLoader(false)
            setNoData(true)
        }
    }

    // function for close modal on create group close click
    const onGroupCloseClick = () => {
        setCreateGroupVisible(!createGroupVisible)
    }

    // navigation on group details page after create group
    const onGroupCreateClick = groupDetails => {
        console.log('does my function reached tonrew edit page');
        setCreateGroupVisible(!createGroupVisible)
        navigation.navigate(
            "GroupDetails",
            {
                data: groupDetails?.groupid,

            }
        )
    }


    // list for my group
    const renderGroupsItems = ({ item }) => {
        return (
            <MyGroupsTab items={item} navigation={navigation} title={"MYGROUPS"} />
        )
    }
    const Categoriesd = async () => {
        console.log('categories called')
        setPageLoader(true)
        var fUrl = get_task
        const { responseJson, err } = await requestGetApi(fUrl, '', 'GET', User.token)
        setPageLoader(false)
        console.log('response afer click of items my task', responseJson.body)
        setMyGroupList(responseJson.body)
        if (responseJson.headers.success == 1) {
            console.log('the res after sucess of category', responseJson.body)

        } else {

            setalert_sms(err)
            setMy_Alert(true)
        }
    }


    const Categories = async (text, getnwPage = false) => {
        console.log('all memeneee')
        setPageLoader(true)
        const newpage = getnwPage ? page + 1 : 1;

        console.log('my new getnewpage', newpage);
        // Update the fUrl with the new page value
        var fUrl = get_task + `?page=${newpage}&limit=10`;
        var urls = '&search=' + text
        if (urls != undefined) {
            fUrl = fUrl + urls
        }
        const { responseJson, err } = await requestGetApi(fUrl, '', 'GET', User.token)
        console.log('response of get taskkkkkss', fUrl)
        if (responseJson.headers.success == true) {
            if (!getnwPage) {
                console.log('for data 10', responseJson.body);
                setPageLoader(false)
                console.log('response afer click of items my task', responseJson.body.lastPage)
                setNoData(false)
                setMyGroupList(responseJson.body.data)
                setLastPage(responseJson.body.lastPage);
            } else {
                console.log('does i rach in the else block');
                console.log('for data 4', responseJson.body.data);
                console.log('does it reach to yyyyyy');
                setPageLoader(false)
                setNoData(false)
                setMyGroupList((myGroupList) => [...myGroupList, ...responseJson.body.data]);
                setPage(newpage);
            }
        } else {
            setPageLoader(false)
            setNoData(true)
            setMyGroupList([])
            setalert_sms(err)
            setMy_Alert(true)
        }
    }


    //navigation to detail screen for tabclick
    const handleTaskTabClick = taskData => {
        {
            taskData?.tasktype === "T"
                ? navigation.navigate(
                    "TaskDetails",
                    { id: taskData?.id, group: null, type: 'mytask' }
                )
                : taskData?.tasktype === "R"
                    ? navigation.navigate(
                        "RoutineDetails",
                        { id: taskData?.id }
                    )
                    : null
        }
    }


    const handleMarkComplete = (id, value) => {
        console.log('handelMArkcompleet---->', id, value)
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
        console.log('my data--->', data);
        const { responseJson, err } = await requestPostApi(markasComplete, data, 'POST', User.token)
        // setPageLoader(false)
        console.log('response of complete', responseJson)
        // setMyGroupList(responseJson.body)
        if (responseJson.headers.success == true) {
            Toast.show({ text1: responseJson.headers.message });
            console.log('handel mark as incomplete ', responseJson.body)
            Categories('')
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
            Categories('')
            // getData(taskId)
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
                headerText={"My Tasks"}
                backButton={{
                    visible: true,
                    onClick: () => {
                        navigation.navigate("Home")
                    }
                }}
            />
            {/* search box */}
            <View style={styles.searchBoxContainer}>
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="Search task by name"
                        placeholderTextColor={Mycolors.textGray}
                        style={styles.searchInput}
                        value={searchText}
                        onChangeText={text => {
                            setSearchText(text)
                            Categories(text,)
                        }}
                    />
                </View>
                <View style={styles.searchContainer}>
                    <Image
                        resizeMode="contain"
                        source={require("../../../../assets/Remindably/searchIcon.png")}
                    />
                </View>
            </View>

            {/* body section */}
            {!pageLoader ? (
                myGroupList?.length > 0 ? (
                    // <View style={styles.body}>
                    //     {/* my groups list  */}
                    //     <View style={{ height: "90%" }}>
                    //         <FlatList
                    //             data={myGroupList}
                    //             scrollEnabled={true}
                    //             renderItem={renderGroupsItems}
                    //             listKey={"myGroupList"}
                    //             keyExtractor={(item, index) => String(index)}
                    //         />
                    //     </View>
                    <View style={{}}>
                        <ScrollView nestedScrollEnabled={true} scroolToEnd={true} ref={scrollViewRef}
                            onScroll={(event) => {
                                const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
                                const isAtEnd = layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;
                                if (isAtEnd) {
                                    // console.log('is function reached on end')
                                    handleLoadMore();
                                }
                            }}>
                            {myGroupList.map(item => {
                                return (
                                    <MyTaskTab
                                        data={item}
                                        onTaskTabClick={handleTaskTabClick}
                                        // hideClick={handleHideClick}
                                        // unHideClick={HandleUnHideClick}
                                        handleMarkComplete={handleMarkComplete}
                                        handleMarkInComplete={handleMarkInComplete}
                                    />
                                )
                            })}
                        </ScrollView>
                    </View>
                ) : (
                    <View style={styles.noDataContainer}>

                        {!noData ? (
                            <Text style={styles.noDataText}>
                                No Group created yet. {"\n"}Click on the "+" icon to create a
                                Group.
                            </Text>
                        ) : (
                            <Text style={styles.noDataText}>No result found</Text>
                        )}
                    </View>
                )
            ) : (
                <View style={styles.loaderContainer}>
                    <ActivityIndicator size="large" color={Mycolors.THEME_ORANGE} />
                </View>
            )}

            {/* create notes icon  */}
            {/* <LinearGradient
                colors={["#F28520", "#F5BD35"]}
                style={styles.createIconContainer}
            >
                <TouchableOpacity
                    onPress={() => {
                        // handleCreateClick();
                        setCreateGroupVisible(!createGroupVisible)
                    }}
                >
                    <Image
                        style={styles.createIconImage}
                        resizeMode="contain"
                        source={require("../../../../assets/Remindably/Plus.png")}
                    />
                </TouchableOpacity>
            </LinearGradient> */}

            {/* Modal for create group */}
            <CreateGroupModal
                visibleModal={createGroupVisible}
                setVisibility={setCreateGroupVisible}
                close={setCreateGroupVisible}
                onClose={() => {
                    onGroupCloseClick()
                }}
                onCreateClick={groupDetails => {
                    onGroupCreateClick(groupDetails)
                }}
                navigation={navigation}
            />

            {/* toaster message for error response from API  */}
            {/* <CommonToast ref={toastRef} /> */}
            <DeleteAlertModal
                visibleModal={markCompleteModal}
                onRequestClosed={() => {
                    setMarkCompleteModal(false)
                }}
                onPressRightButton={handleCompleteTask}
                subHeading={"Are you sure you want to complete this task ?"}
            />
            <DeleteAlertModal
                visibleModal={markInCompleteModal}
                onRequestClosed={() => {
                    setMarkInCompleteModal(false)
                }}
                onPressRightButton={handleInCompleteTask}
                subHeading={"Are you sure you want to incomplete this task ?"}
            />
        </View >

    )

}

export default MyTask

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    body: {
        padding: 10
    },
    searchBoxContainer: {
        flexDirection: "row",
        height: 65,
        justifyContent: "space-between",
        padding: 10
    },
    inputContainer: {
        borderRadius: 8,
        width: "84%"
    },
    searchInput: {
        backgroundColor: Mycolors.WHITE,
        borderRadius: 8,
        color: Mycolors.BLACK,
        fontSize: 16,
        padding: 10,
        paddingLeft: 10
    },
    searchContainer: {
        alignItems: "center",
        backgroundColor: Mycolors.THEME_ORANGE,
        borderRadius: 10,
        justifyContent: "center",
        width: "14%"
    },
    createIconContainer: {
        alignItems: "center",
        backgroundColor: Mycolors.WHITE,
        borderRadius: 100,
        bottom: 60,
        height: 60,
        justifyContent: "center",
        padding: 20,
        position: "absolute",
        right: 25,
        width: 60,
        zIndex: 1
    },
    createIconImage: {
        borderRadius: 100,
        height: 25,
        width: 25
    },
    loaderContainer: {
        alignSelf: "center",
        flex: 1,
        justifyContent: "center"
    },
    noDataContainer: {
        alignItems: "center",
        flex: 1,
        justifyContent: "center"
    },
    noDataText: {
        color: Mycolors.THEME_BLACK,
        fontSize: 20,
        fontWeight: "500",
        textAlign: "center"
    }
})
