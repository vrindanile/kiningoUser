// external imports
import {
    ActivityIndicator,
    FlatList,
    Image,
    Keyboard,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native"
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect, useRef, useState } from "react"
// internal imports

import AddMemberOnGroupModal from "./AddMemberOnGroupModal"
import AddedTaskTab from "./AddedTaskTab"
// import CommonToast from "../../constants/CommonToast"
import CustomHeader from "../../Constants/CustomHeaader"
import DeleteAlertModal from "./DeleteAlertModal"
import EditGroupNameModal from "./EditGroupNameModal"
// import GroupServices from "../../service/GroupServices"
import ManageGroupModal from "./ManageGroupModal"
import RecentlyAddedMembersTab from "./RecentlyAddedMembersTab"
import RemoveGroupMemberModal from "./RemoveGroupMemberModal"

//import api from service file

import { get_details, requestGetApi, get_task, recent_members, manageGroup, requestPostApi, deleteGroup, deleteGroup_member } from '../../../../WebApi/Service'
import Toast from 'react-native-toast-message'
import { Mycolors } from "../../../../utility/Mycolors"
import { useIsFocused } from "@react-navigation/native";
//{ route, navigation, props }
const GroupDetails = (props) => {
    // console.log('my data for module id', props?.route?.params.data)
    const isFocus = useIsFocused()
    const [allTask, setAllTask] = useState([])
    const [deleteModal, setDeleteModal] = useState(false)
    const [editGroupNameModal, setEditGroupNameModal] = useState(false)
    const [groupDetails, setGroupDetails] = useState({})
    console.log('groupDetails', groupDetails);
    const [groupId, setGroupId] = useState(props?.route?.params?.data)
    const [groupName, setGroupName] = useState("")
    const [manageGroupModal, setManageGroupModal] = useState(false)
    const [memberIdModal, setMemberIdModal] = useState(false)
    const [myUserId, setMyUserId] = useState()
    const [pageLoader, setPageLoader] = useState(false)
    const [recentlyAddedMemberList, setRecentlyAddedMemberList] = useState([])
    const [recentlyMemberLoader, setRecentlyMemberLoader] = useState(false)
    const [removeMemberIdModal, setRemoveMemberIdModal] = useState(false)
    const toastRef = useRef()
    const User = useSelector(state => state.user.user_details)
    console.log('User', User);
    const ff = async () => {
        const savedUser = await AsyncStorage.getItem("groupId");
        console.log(savedUser, 'y id from async Storage');
    }

    useEffect(() => {

        const unsubscribe = props.navigation.addListener("focus", () => {

            ff()
            // getAllTask()
            getRecentlyAddMembers()
            //     setPageLoader(true)
            let id = props?.route?.params?.data
            console.log('my data for detail grouos', props?.route?.params)
            //76
            setGroupId(props?.route?.params?.data)
            getAllDetails(props?.route?.params?.data)
            //     getRecentlyAddMembers()
        })
        return unsubscribe
    }, [props.navigation, isFocus])

    // function for get recently added members data on api call
    const getRecentlyAddMember = () => {
        setRecentlyMemberLoader(true)
        const data = {
            group_id: groupId
        }

        // GroupServices.postRecentlyAddMembers(data)
        //     .then(response => {
        //         setRecentlyMemberLoader(false)
        //         setRecentlyAddedMemberList(response.data.users)
        //     })
        //     .catch(error => {
        //         setRecentlyMemberLoader(false)
        //         console.log(error, "error")
        //     })
    }
    const getRecentlyAddMembers = async () => {
        console.log('task called group_id', groupId)
        setPageLoader(true)
        var fUrl = recent_members
        var urls = '?group_id=' + groupId
        console.log('my url---------->', urls)
        if (urls != undefined) {
            fUrl = fUrl + urls
        }
        console.log('furlsssssssssss->>>>>>>>>>>', fUrl)
        const { responseJson, err } = await requestGetApi(fUrl, '', 'GET', User.token)
        setPageLoader(false)
        console.log('response of recentMEmbers', responseJson)
        // setMyGroupList(responseJson.body)
        if (responseJson.headers.success == true) {
            console.log('the res of recentely added members', responseJson.body)
            setRecentlyMemberLoader(false)
            // setRecentlyAddedMemberList(responseJson.body)

        } else {

            setalert_sms(err)
            setMy_Alert(true)
        }
    }

    const hh = async () => {
        // user id for edit group name by owner only
        const token = await AsyncStorage.getItem("userId")
        setMyUserId(token)

        // GroupServices.getGroupDetails(groupId)
        //     .then(response => {
        //         setPageLoader(false)
        //         setGroupDetails(response.data.group)
        //         setGroupName(response.data.group.name)
        //         setAllTask(response.data.details)
        //     })
        //     .catch(error => {
        //         setPageLoader(false)
        //         console.log(error)
        //     })
    }
    // function for get group details on api call
    const getAllDetails = async (id) => {
        // console.log('does it come from redirection id', id)
        // const id = groupId || route?.params?.data
        setPageLoader(true)
        var fUrl = get_details
        var murl = id
        if (murl != undefined) {
            fUrl = fUrl + murl
        }
        console.log('does it come from redirection url', fUrl);
        const { responseJson, err } = await requestGetApi(fUrl, '', 'GET', User.token)
        setPageLoader(false)
        console.log('does it come from redirection sucesss----?>>>', responseJson);
        if (responseJson.headers.success == true) {
            console.log('the res after sucess of specific article taskdetailsss redirection', responseJson.body.taskdetails)
            console.log('does it come from redirection');
            setAllTask(responseJson.body.taskdetails)
            setGroupName(responseJson.body.name)
            setGroupDetails(responseJson.body)
            setRecentlyAddedMemberList(responseJson.body.groupmembers)


        } else {

            setalert_sms(err)
            setMy_Alert(true)
        }
    }

    // const getAllTask = async () => {
    //     console.log('task called')
    //     setPageLoader(true)
    //     var fUrl = get_task

    //     const { responseJson, err } = await requestGetApi(fUrl, '', 'GET', User.token)
    //     setPageLoader(false)
    //     console.log('response of specific article', responseJson)
    //     // setMyGroupList(responseJson.body)
    //     if (responseJson.headers.success == true) {
    //         console.log('the res after sucess of task article', responseJson.body)
    //         // setGroupName(responseJson.body.name)
    //         // setGroupDetails(responseJson.body)
    //         // setAllTask(responseJson.body)

    //     } else {

    //         setalert_sms(err)
    //         setMy_Alert(true)
    //     }
    // }
    // function for close modal on manage group icon click
    const handleManageGroupModalClose = () => {
        setManageGroupModal(false)
    }

    // function for submit button click on api call to manage group
    const handleManageGroupSubmitClickk = (visibleGroup, isEdit) => {
        setManageGroupModal(false)

        var data = {
            visiblegroup: visibleGroup,
            isedit: isEdit,
            groupid: groupId
        }

        // GroupServices.postManageGroup(data)
        //     .then(response => {
        //         toastRef.current.getToast(response.data.message, "success")
        //         getAllDetails() //refresh the page
        //     })
        //     .catch(error => {
        //         console.log(error, "error")
        //     })
    }
    const handleManageGroupSubmitClick = async (visibleGroup, isEdit) => {
        console.log('isEdit data to be sent------>>>', visibleGroup)
        setManageGroupModal(false)
        setPageLoader(true)
        var data = {
            visiblegroup: visibleGroup ? 1 : 2,
            isedit: isEdit ? 1 : 2,
            groupid: groupId
        }
        console.log('my data of the edut group------>>>', data);
        var fUrl = manageGroup

        const { responseJson, err } = await requestPostApi(fUrl + groupId, data, 'PUT', User.token)

        console.log('response of manged froup', responseJson)
        // setMyGroupList(responseJson.body)
        if (responseJson.headers.success == true) {
            setPageLoader(false)
            Toast.show({ text1: responseJson.headers.message });
            // console.log('the res after sucess of task article', responseJson.body)
            // setGroupName(responseJson.body.name)
            // setGroupDetails(responseJson.body)
            getAllDetails(groupId)

        } else {

            setalert_sms(err)
            setMy_Alert(true)
        }
    }
    // function for close modal on delete group click
    const handleManageGroupDeleteClick = () => {
        setManageGroupModal(false)
        setDeleteModal(true)
    }

    // function for delete button click on api call to delete group
    const handleDeletee = () => {
        setDeleteModal(false)
        // GroupServices.getDeleteGroup(groupId)
        //     .then(response => {
        //         toastRef.current.getToast(response.data.message, "success")
        //         if (response.data.status === 1) {
        //             navigation.replace("DrawerNavigator", {
        //                 screen: "BottomNavigator",
        //                 params: {
        //                     screen: "Home"
        //                 }
        //             })
        //         } else if (response.data.status === 0) {
        //             toastRef.current.getToast(response.data.message, "warning")
        //         }
        //     })
        //     .catch(error => {
        //         console.log(error, "error")
        //     })
    }
    // const handleDelete = async () => {
    //     console.log('is deleted modal called');
    //     // setDeleteModal(false)
    //     var fUrl = deleteGroup

    //     const { responseJson, err } = await requestPostApi(fUrl + groupId, data, 'DELETE', User.token)
    //     // setPageLoader(false)
    //     console.log('response of delete group', responseJson)
    //     // setMyGroupList(responseJson.body)
    //     if (responseJson.headers.success == true) {
    //         // console.log('the res after sucess of task article', responseJson.body)
    //         // setGroupName(responseJson.body.name)
    //         // setGroupDetails(responseJson.body)
    //         props.navigation.goBack()
    //         getAllDetails()

    //     } else {

    //         setalert_sms(err)
    //         setMy_Alert(true)
    //     }
    // }


    const handleDelete = async () => {
        setDeleteModal(false)
        const { responseJson, err } = await requestPostApi(deleteGroup + groupId, '', 'DELETE', User.token)
        // setPageLoader(false)
        console.log('response of deleet froup', responseJson)
        // setMyGroupList(responseJson.body)
        if (responseJson.headers.success == true) {
            // props.navigation.goBack()
            Toast.show({ text1: responseJson.headers.message });
            // console.log('the res after sucess of task article', responseJson.body)
            // setGroupName(responseJson.body.name)
            // setGroupDetails(responseJson.body)
            // getAllDetails()

        } else {

            setalert_sms(err)
            setMy_Alert(true)
        }
    }
    // navigation on taskName, routine and notes click
    const handleViewTaskClick = (id, type) => {
        if (type === "T") {
            props.navigation.navigate(
                "TaskAllComments",
                {
                    data: id,
                    groupId: groupId
                }
            )
        } else if (type === "R") {
            props.navigation.navigate(
                "RoutineAllComments",
                {
                    data: id,
                    flow: "GROUPDETAILS"
                }
            )
        } else if (type === "N") {
            props.navigation.navigate("StackNavigation", {
                screen: "NotesAllComments",
                params: {
                    data: id
                }
            })
        }
    }

    // function for close member modal
    const handleMemberIdModalClose = () => {
        setMemberIdModal(false)
    }

    // function for submit button click on api call to add member on group
    const handleMemberIdAddClick = memberList => {
        console.log('my add group members');
        setMemberIdModal(false)
        setRecentlyMemberLoader(true)
        Toast.show({ text1: 'Member invited successfully' });

        const feedBackData = new FormData()
        feedBackData.append("group_id", groupId)
        memberList.map((e, index) => {
            console.log();
            feedBackData.append(`user_id[${index}]`, e)
        })

        // GroupServices.postAddMembers(feedBackData)
        //     .then(response => {
        //         toastRef.current.getToast(response.data.message, "success")
        //         // getRecentlyAddMembers() // refresh the member list
        //         getAllDetails() // refresh the page for member count
        //     })
        //     .catch(error => {
        //         setRecentlyMemberLoader(false)
        //         console.log("error", JSON.stringify(error))
        //     })
    }

    // function for submit button click on api call to remove members from group
    const handleRemoveMemberIdSubmitClickk = async memberList => {
        console.log('memberLists----->>>', memberList);
        Keyboard.dismiss()
        if (memberList.length == 0) {
            Toast.show({ text1: 'Plese select any member' });
            return;
        }
        setRemoveMemberIdModal(false)
        const data = new FormData()
        data.append("groupid", groupId)
        memberList.forEach((e, index) => {
            data.append('deletemembers', e)
        })
        console.log('my data send ----->>', data);
        console.log('does it reach utpo the request post api');
        const { responseJson, err } = await requestPostApi(deleteGroup_member, data, 'POST', User.token)
        setLoader(false)
        console.log('response of delete members', responseJson)
        // setMyGroupList(responseJson.body)
        if (responseJson.headers.success == true) {
            console.log('the res after sucess of delete of members', responseJson)
            Toast.show({ text1: responseJson.headers.message });
            // navigation.navigate('GroupDetails')
            // setAllMembersData(responseJson.body)
            // setGroupName(responseJson.body.name)
            // setGroupDetails(responseJson.body)

        } else {

            setalert_sms(err)
            setMy_Alert(true)
        }
        // GroupServices.postGroupMembersDelete(data)
        //     .then(response => {
        //         toastRef.current.getToast(response.data.message, "success")
        //         // getRecentlyAddMembers() // refresh the member list
        //         getAllDetails() // refresh the page for member count
        //     })
        //     .catch(error => {
        //         setRecentlyMemberLoader(false)
        //         console.log("error", JSON.stringify(error))
        //     })
    }
    const handleRemoveMemberIdSubmitClick = async (memberList) => {
        console.log('does it click on submit button');
        // allMembersData?.length > 0 ? null :
        //     Toast.show({ text1: ' No members available' })
        // console.log('member valiable');
        if (memberList.length == 0) {
            Toast.show({ text1: 'Plese select any member' });
            return;
        }
        setRemoveMemberIdModal(false)
        var data = {
            groupid: groupId,
            deletemembers: memberList
        }
        console.log('my array data ------->', data)
        const { responseJson, err } = await requestPostApi(deleteGroup_member, data, 'POST', User.token)
        console.log('response after deletion', responseJson)
        // Toast.show({ text1: responseJson.headers.message });
        getRecentlyAddMembers() // refresh the member list
        getAllDetails(props?.route?.params?.data)
        Toast.show({ text1: responseJson.headers.message })
        if (responseJson.headers.success == 1) {
            console.log('the res after sucess of delete of members', responseJson)

        } else {
            setalert_sms(err)
            setMy_Alert(true)
        }
    }
    // list for added task
    const renderAddedTasks = ({ item }) => {
        console.log('my added task----->', item);
        return (
            <AddedTaskTab

                items={item}

                viewTaskClicks={handleViewTaskClick}
                onTaskTabClick={handleTaskTabClick}
                myUserId={myUserId}
                isEdit={groupDetails?.is_edit}
            />
        )
    }

    // navigation on taskName, routine and notes clickfv
    const handleTaskTabClick = taskData => {
        {
            taskData?.task_type === "T"
                ? props.navigation.navigate(
                    "TaskDetails",
                    { id: taskData?.id, group: groupId }
                )
                : taskData?.task_type === "R"
                    ? props.navigation.navigate(
                        "RoutineDetails",
                        { id: taskData?.id }
                    )
                    : taskData?.task_type === "N"
                        ? props.navigation.navigate("StackNavigation", {
                            screen: "NotesDetails",
                            params: { id: taskData?.id }
                        })
                        : null
        }
    }

    // function for close modal on edit group close click
    // const handleEditGroupModalClose = () => {
    //     setEditGroupNameModal(false)
    // }

    // function for submit button click on api call to edit the group name
    const handleEditGroupSubmitClick = async (editedGroupName, profileImage) => {
        if (!editedGroupName) {
            // Show a toast or handle the case where the edited group name is empty
            Toast.show({ text1: 'Please enter group name' });
            return; // Exit the function early to prevent the API call
        }

        console.log('my edit details frm the modal ----->>>', editedGroupName);
        setEditGroupNameModal(false);

        try {
            const data = new FormData();

            if (profileImage !== "") {
                const imageName = profileImage.path.slice(
                    profileImage.path.lastIndexOf("/"),
                    profileImage.path.length
                );
                data.append("image", {
                    name: imageName,
                    type: profileImage.mime,
                    uri: profileImage.path,
                });
            }

            data.append("status", "T");
            data.append("name", editedGroupName);
            var url = `http://54.153.75.225/backend/api/v1/goaccounting/my-group/`;
            var ru = groupId;
            if (ru !== undefined) {
                url = url + ru;
            }
            console.log('my url for edit', url);
            const response = await axios.put(url, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${User.token}`,
                },
            });

            if (response.status === 200) {
                console.log('console after success from edit', editedGroupName);
                getAllDetails(groupId);
                console.log('edit group name modal ----->>>>>', response.data.headers.message);
                Toast.show({ text1: response.data.headers.message });
                handleModalClose();
                // navigation.goBack();
            } else {
                console.log('Error creating post:', response.data.headers.message);
            }
        } catch (error) {
            console.error('Error in CreatePost', error);
        }
    }


    // navigation for add new task in group
    const handleAddNewTask = () => {
        props.navigation.navigate(
            "CreateTask",
            {
                flow: "AddNewTask",
                data: props?.route?.params?.data,
                groupName: groupName
            }
        )
    }

    // list for recently added members
    const renderAddedMembers = ({ item }) => {
        console.log('item for added members', item);
        return <RecentlyAddedMembersTab item={item} />
    }

    return (
        <View style={styles.container}>
            {/* header section */}
            <CustomHeader
                headerText={groupName}
                backButton={{
                    visible: true,
                    onClick: () => {
                        //    { console.log('props?.route?.params?.type == SharedGroup' ,props?.route?.params?.type == 'SharedGroups)}
                        //     props?.route?.params?.type == 'SharedGroups' ? props.navigation.navigate('SharedGroups') :

                        props.navigation.navigate('MyGroups')
                    }

                }}

            />
            {groupDetails?.groupCreatedBy == User.userid ? (
                <TouchableOpacity
                    style={styles.settingIconContainer}
                    onPress={() => {
                        setManageGroupModal(true)
                    }}
                >
                    <Image
                        resizeMode="contain"
                        source={require("../../../../assets/Remindably/settingWhite.png")} />
                </TouchableOpacity>
            ) : null}

            {/* body section */}
            {!pageLoader ? (
                <View style={styles.body}>
                    {/* group details  */}
                    <View style={styles.profileContainer}>
                        <View style={styles.nameContainer}>
                            <Text style={styles.nameText}>{groupName}</Text>

                            {/* edit icon basis of user id match*/}
                            {groupDetails?.groupCreatedBy == User.userid ? (
                                <TouchableOpacity
                                    style={styles.editIconContainer}
                                    onPress={() => {
                                        setEditGroupNameModal(true)
                                    }}
                                >
                                    <Image
                                        resizeMode="contain"
                                        source={require("../../../../assets/Remindably/editIcon.png")}
                                    />
                                </TouchableOpacity>
                            ) : null}

                            <View style={styles.direction}>
                                <Text style={styles.emailText}>Total group members:</Text>
                                <Text style={styles.emailText}>
                                    {groupDetails?.totalgroupmembers}
                                </Text>
                            </View>

                            {/* add members basis of user id match*/}
                            {groupDetails?.groupCreatedBy == User.userid ? (
                                <TouchableOpacity
                                    onPress={() => {
                                        // setMemberIdModal(true)
                                        props.navigation.navigate('MembersList',
                                            {

                                                visibleModal: memberIdModal,


                                                data: groupId
                                            }
                                        )
                                    }}
                                    style={styles.addMembersContainer}
                                >
                                    <Image
                                        resizeMode="contain"
                                        source={require("../../../../assets/Remindably/UserPlus.png")}
                                    />
                                    <Text style={styles.addMemberText}>Add Members</Text>
                                </TouchableOpacity>
                            ) : null}
                        </View>

                        {/* group image  */}
                        {groupDetails?.groupimage ? (
                            <View style={styles.groupImageContainer}>
                                <Image
                                    style={styles.image}
                                    resizeMode="cover"
                                    source={{ uri: `${groupDetails?.groupimage}` }}
                                />
                            </View>
                        ) : (
                            <View style={styles.noGroupImageContainer}>
                                <View style={styles.noGroupImage}>
                                    <Image
                                        style={{ width: "100%", height: "100%" }}
                                        resizeMode="cover"
                                        source={require("../../../../assets/Remindably/noImage.png")}
                                    />
                                </View>
                            </View>
                        )}
                    </View>

                    {/*recently added members and remove members  */}
                    <View style={styles.textDirection}>
                        <Text style={styles.preferenceText}>Added Members</Text>

                        {/* remove members basis of user id match*/}
                        {groupDetails?.groupCreatedBy == User.userid && recentlyAddedMemberList?.length > 0 ? (
                            <TouchableOpacity
                                onPress={() => {
                                    setRemoveMemberIdModal(true);
                                }}
                            >
                                <Text style={styles.addEditText}>Remove Members</Text>
                            </TouchableOpacity>
                        ) : null}
                    </View>
                    {console.log(recentlyAddedMemberList, 'recentlyAddedMemberList')}
                    {recentlyAddedMemberList?.length > 0 ? (
                        !recentlyMemberLoader ? (
                            <View style={{ height: "16%" }}>
                                <FlatList
                                    data={recentlyAddedMemberList}
                                    renderItem={renderAddedMembers}
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    keyExtractor={(item, index) => String(index)}
                                />
                            </View>
                        ) : (
                            <View style={styles.loaderContainer}>
                                <ActivityIndicator size="large" color={Mycolors.THEME_ORANGE} />
                            </View>
                        )
                    ) : (
                        <View style={styles.noMembersContainer}>
                            <Text style={styles.noMembersText}>No members added</Text>
                        </View>
                    )}

                    {/* Task section  */}
                    <View style={styles.textDirection}>
                        <Text style={styles.preferenceText}>Tasks</Text>

                        {/* add new task basis of user id match*/}
                        {groupDetails?.groupCreatedBy == User.userid ? (
                            <TouchableOpacity
                                onPress={() => {
                                    handleAddNewTask()
                                }}
                            >
                                <Text style={styles.addEditText}>Add New Task</Text>
                            </TouchableOpacity>
                        ) : null}
                    </View>

                    {allTask?.length > 0 ? (
                        <View
                            style={{
                                height: "52%",
                                paddingBottom: 10
                            }}
                        >
                            <FlatList
                                data={allTask}
                                renderItem={renderAddedTasks}
                                keyExtractor={(item, index) => String(index)}
                            />
                        </View>
                    ) : (
                        <View style={styles.noDataContainer}>
                            <Text style={styles.noDataText}>
                                No tasks added here. {"\n"}Click on  "Add New Task" to create
                                a task.
                            </Text>
                        </View>
                    )}

                    {/* edit group name  */}
                    <EditGroupNameModal
                        groupNameData={groupName}
                        groupImage={groupDetails?.groupimage}
                        visibleModal={editGroupNameModal}
                        setVisibility={setEditGroupNameModal}
                        dataa={groupId}
                        // onClose={handleEditGroupModalClose}
                        onSubmitClick={handleEditGroupSubmitClick}
                    />

                    {/* manage group modal  */}
                    <ManageGroupModal
                        visibleModal={manageGroupModal}
                        groupId={groupDetails?.id}
                        isGroupEnabled={groupDetails?.visiblegroup}
                        isEditingEnabled={groupDetails?.is_edit}
                        onClose={handleManageGroupModalClose}
                        onSubmitClick={handleManageGroupSubmitClick}
                        onDeleteClick={handleManageGroupDeleteClick}
                    />

                    {/* Member Email Id modal  */}
                    <AddMemberOnGroupModal
                        visibleModal={memberIdModal}
                        onClose={handleMemberIdModalClose}
                        onSubmitClick={handleMemberIdAddClick}
                        navigation={props.navigation}
                        data={groupId}
                    />

                    {/* Remove Member from group modal  */}
                    <RemoveGroupMemberModal
                        visibleModal={removeMemberIdModal}
                        onClose={() => {
                            setRemoveMemberIdModal(false)
                        }}
                        onSubmitClick={handleRemoveMemberIdSubmitClick}
                        navigation={props.navigation}
                        groupId={groupId}
                        myUserId={myUserId}
                    />

                    {/* Delete alert modal  */}
                    <DeleteAlertModal
                        visibleModal={deleteModal}
                        onRequestClosed={() => {
                            setDeleteModal(false)
                        }}
                        onPressRightButton={() => {
                            handleDelete()
                        }}
                        subHeading={"Are you sure you want to delete this group ?"}
                    />
                </View>
            ) : (
                <View style={styles.loaderContainer}>
                    <ActivityIndicator size="large" color={Mycolors.THEME_ORANGE} />
                </View>
            )}

            {/* toaster message for error response from API  */}
            {/* <CommonToast ref={toastRef} /> */}
        </View>


    )
}

export default GroupDetails

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    body: {
        flex: 1,
        padding: 10
    },
    profileContainer: {
        alignItems: "center",
        backgroundColor: Mycolors.WHITE,
        borderRadius: 15,
        flexDirection: "row",
        height: "auto",
        justifyContent: "space-between",
        marginVertical: 10,
        padding: 10
    },
    direction: { flexDirection: "row" },
    nameContainer: {
        justifyContent: "center",
        width: "68%",

    },
    nameText: {
        color: Mycolors.THEME_ORANGE,
        fontSize: 22,
        fontWeight: "bold",
        width: '80%'
    },
    emailText: {
        color: Mycolors.THEME_BLACK,
        fontSize: 16,
        paddingRight: 4
    },
    settingIconContainer: {
        alignItems: "center",
        backgroundColor: Mycolors.THEME_ORANGE,
        borderRadius: 50,
        height: 40,
        justifyContent: "center",
        position: "absolute",
        right: 10,
        top: 15,
        width: 40
    },
    editIconContainer: {
        alignItems: "center",
        backgroundColor: Mycolors.WHITE,
        borderRadius: 50,
        height: 50,
        justifyContent: "center",
        position: "absolute",
        right: 0,
        top: -5,
        width: 50,
    },
    addMembersContainer: {
        alignItems: "center",
        flexDirection: "row",
        paddingVertical: 5,
        width: 140
    },
    textDirection: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 10
    },
    preferenceText: {
        color: Mycolors.BLACK,
        fontSize: 17,
        fontWeight: "bold",
        letterSpacing: 0.5,
        paddingVertical: 5
    },
    addMemberText: {
        color: Mycolors.THEME_ORANGE,
        fontSize: 16,
        paddingHorizontal: 5,
        textDecorationLine: "underline",
        textDecorationStyle: "solid"
    },
    addEditText: {
        color: Mycolors.THEME_ORANGE,
        fontSize: 16
    },
    image: {
        borderRadius: 50,
        height: "100%",
        width: "100%"
    },
    groupImageContainer: {
        borderColor: Mycolors.WHITE,
        borderRadius: 50,
        borderWidth: 3,
        height: 90,
        right: 0,
        width: 90
    },
    noGroupImageContainer: {
        alignItems: "center",
        backgroundColor: Mycolors.THEME_WHITE,
        borderColor: Mycolors.WHITE,
        borderRadius: 50,
        borderWidth: 3,
        height: 90,
        justifyContent: "center",
        width: 90
    },
    noGroupImage: {
        height: 40,
        width: 35
    },
    loaderContainer: {
        alignSelf: "center",
        flex: 1,
        justifyContent: "center"
    },
    noDataContainer: {
        alignItems: "center",
        height: "52%",
        justifyContent: "center"
    },
    noDataText: {
        color: Mycolors.THEME_BLACK,
        fontSize: 20,
        fontWeight: "500",
        textAlign: "center"
    },
    noMembersContainer: {
        alignContent: "center",
        alignItems: "center",
        height: "16%",
        justifyContent: "center"
    },
    noMembersText: {
        color: Mycolors.THEME_BLACK,
        fontSize: 16,
        fontWeight: "500",
        padding: 20
    }
})
