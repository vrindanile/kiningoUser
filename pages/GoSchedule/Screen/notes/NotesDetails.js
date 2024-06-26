//external imports
import {
    ActivityIndicator,
    FlatList,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,

} from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import React, { useEffect, useRef, useState } from "react"
import moment from "moment"
import { useIsFocused } from "@react-navigation/native";
//external imports
import Toast from 'react-native-toast-message'
import CommentsOnRoutine from "../routine/CommentsOnRoutine"
//   import CommonToast from "../../constants/CommonToast"
import CustomHeader from "../../Constants/CustomHeaader"
import DeleteAlertModal from "../groups/DeleteAlertModal"
// import GroupServices from "../../service/GroupServices"
import ManageNotesModal from "./ManageNotesModal"
import NotesImages from "./NotesImages"
// import NotesService from "../../service/NotesService"
import ShareNotesModal from "./ShareNotesModal"
import ShareNotesSuccessModal from "./ShareNotesSuccessModal"
import axios from "axios";
// notes_detail
import { get_details, requestGetApi, get_task, recent_members, manageGroup, requestPostApi, deleteGroup, get_listing, notes_detail, delete_notes, share_routine, remove_noteSharing } from '../../../../WebApi/Service'
import { useSelector, useDispatch } from 'react-redux';
import SharedNotesTab from "./SharedNotesTab"
// import { colors } from "../../constants/ColorConstant"
import { Mycolors, dimensions } from "../../../../utility/Mycolors"
const NotesDetails = ({ route, navigation }) => {
    const isFocus = useIsFocused()
    const User = useSelector(state => state.user.user_details)
    const [buttonLoader, setButtonLoader] = useState(false)
    const [commentCount, setCommentCount] = useState(0)
    const [deleteGroupModal, setDeleteGroupModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    const [groupCount, setGroupCount] = useState(0)
    const [groupId, setGroupId] = useState(0)
    const [manageEditModal, setManageEditModal] = useState(false)
    const [myUserId, setMyUserId] = useState()
    const [notesComments, setNotesComments] = useState([])
    const [notesDetails, setNotesDetails] = useState({})
    const [notesId, setNotesId] = useState(route?.params?.id)
    const [notesImages, setNotesImages] = useState([])
    const [pageLoader, setPageLoader] = useState(false)
    const [shareNotesModal, setShareNotesModal] = useState(false)
    const [sharedGroups, setSharedGroups] = useState([])
    const [sharedNotesSuccessModal, setSharedNotesSuccessModal] = useState(false)
    const toastRef = useRef()

    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            console.log('which id i ahe recieved in detail page--->>', route?.params?.id)
            console.log('my user data', User.userid
            );
            setNotesId(route?.params?.id)
            getData()
            getComments()
        })
        return unsubscribe
    }, [isFocus, navigation])

    // function for get all noted details data on api call
    const getDataa = async () => {
        // user id for delete and edit icon
        const token = await AsyncStorage.getItem("userId")
        setMyUserId(token)

        setPageLoader(true)
        // NotesService.getNotesDetails(notesId)
        //     .then(response => {
        //         setPageLoader(false)
        //         setNotesDetails(response.data.notesdetail)
        //         setNotesImages(response.data.notesdetail.imagedetails)
        //         setSharedGroups(response.data.notesdetail.groupdetails)
        //     })
        //     .catch(error => {
        //         setPageLoader(false)
        //         console.log(error)
        //     })

    }

    //new function

    const getData = async () => {
        console.log('task called nodes id---->>', notesId)
        // setPageLoader(true)
        var fUrl = notes_detail + route?.params?.id
        // var urls = '?group_id=' + groupId
        // console.log('my url---------->', urls)
        // if (urls != undefined) {
        //     fUrl = fUrl + urls
        // }
        console.log('furlsssssssssss->>>>>>>>>>>', fUrl)
        const { responseJson, err } = await requestGetApi(fUrl, '', 'GET', User.token)
        // setPageLoader(false)
        console.log('response of get notes-------->>>>>', responseJson.body.commentDetails)
        // setMyGroupList(responseJson.body)
        if (responseJson.headers.success == true) {

            setNotesDetails(responseJson.body)
            setNotesImages(responseJson.body.imagedetails)
            setSharedGroups(responseJson.body.groupdetails)
            setNotesComments(responseJson.body.commentDetails[0]
            )
        } else {

            setalert_sms(err)
            setMy_Alert(true)
        }
    }



    // function for get all comments data on api call
    const getComments = () => {
        const data = {
            taskid: notesId,
            tasktype: "N"
        }
        // GroupServices.postAllCommentsOnTask(data)
        //     .then(response => {
        //         setNotesComments(response.data.taskdetails.commentdetails)
        //         setCommentCount(response.data.taskdetails.commentsCount)
        //     })
        //     .catch(error => {
        //         console.log(error)
        //     })
    }

    // navigation on all comments screen on view comment click
    const handleViewCommentsClick = id => {
        navigation.navigate("StackNavigation", {
            screen: "NotesAllComments",
            params: {
                data: id,
                flow: "NOTESDETAILS"
            }
        })
    }

    // list for comments
    const renderCommentsRoutine = ({ item }) => {
        return (
            <CommentsOnRoutine
                data={item}
                viewCommentsClick={handleViewCommentsClick}
                routineId={notesId}
            />
        )
    }

    // list for images on notes
    const renderAddedNotesImages = ({ item }) => {
        console.log('my notes images from notes deatil--->', item);
        return <NotesImages notesImages={item} />
    }

    // function start for share notes in group
    const handleShareNotes = () => {
        setShareNotesModal(true)
    }

    // function for close modal on share note click
    const handleShareNotesModalClose = () => {
        setShareNotesModal(false)
    }

    // function for share click on api call to delete budgetary
    // const handleShareNotesSubmitClick = list => {
    //     setButtonLoader(true)
    //     const feedBackData = new FormData()
    //     feedBackData.append("note_id", notesId)
    //     list.map((e, index) => {
    //         feedBackData.append(`group_id[${index}]`, e)
    //     })
    //     setGroupCount(list.length)
    //     NotesService.postShareNotes(feedBackData)
    //         .then(response => {
    //             setButtonLoader(false)
    //             setShareNotesModal(false)
    //             setSharedNotesSuccessModal(true)
    //         })
    //         .catch(error => {
    //             setButtonLoader(false)
    //             console.log(error)
    //         })
    // }
    // const handleShareNotesSubmitClick = async (list) => {
    //     console.log('my te,ms for succes fdimnn-->', list);
    //     if (list.length === 0) {
    //         // If the list is empty, you can handle it here (e.g., show an error message).
    //         Toast.show({ text1: 'Please select group' });
    //         return;
    //     }

    //     setButtonLoader(true)
    //     try {
    //         const feedBackData = new FormData()
    //         feedBackData.append("note_id", route?.params?.id)
    //         // list.map((e, index) => {
    //         //     feedBackData.append(`group_id[${index}]`, e)
    //         // })
    //         list.forEach((value, index) => {
    //             feedBackData.append('group_id[]', value);
    //         })
    //         setGroupCount(list.length)
    //         // shareRoutine
    //         // RoutineService.postShareRoutine(feedBackData)
    //         //     .then(response => {
    //         //         setButtonLoader(false)
    //         //         setShareRoutineModal(false)
    //         //         setSharedRoutineSuccessModal(true)
    //         //     })
    //         //     .catch(error => {
    //         //         setButtonLoader(false)
    //         //         console.log(error)
    //         //     })
    //         console.log('my data members??????????????', feedBackData)
    //         var url = 'http://54.153.75.225/backend/api/v1/goaccounting/share-routine'

    //         console.log('my data final')
    //         const response = await axios.post(url, feedBackData, {
    //             headers: {
    //                 'Content-Type': 'multipart/form-data',
    //                 Authorization: `Bearer ${User.token}`,
    //             },
    //         });

    //         console.log('Response:', response);

    //         if (response.status === 200) {
    //             console.log('Post shared succesfulll---->>>>', response.data);
    //             setShareNotesModal(false)
    //             Toast.show({ text1: response.data.headers.message });

    //             // Handle success
    //         } else {
    //             console.log('Error creating post:', response.data.headers.message);
    //             // Handle error
    //         }
    //     } catch (error) {
    //         console.error('An error occurred:', error);
    //     }
    // }

    const handleShareNotesSubmitClick = async (list) => {
        console.log('my te,ms for succes fdimnn-->', list);
        if (list.length === 0) {
            // If the list is empty, you can handle it here (e.g., show an error message).
            Toast.show({ text1: 'Please select group' });
            return;
        }

        setButtonLoader(true)
        try {
            const data = {
                note_id: route?.params?.id,
                group_id: list
            }

            setGroupCount(list.length)

            console.log('my data members??????????????', data)
            const { responseJson, err } = await requestPostApi(share_routine, data, 'POST', User.token)
            if (responseJson.headers.success == 1) {
                console.log('Post shared succesfulll---->>>>', responseJson);
                setShareNotesModal(false)
                Toast.show({ text1: responseJson.headers.message });
            }
            else {
                console.log('note not shared');
            }
            // Handle success

        } catch (error) {
            console.error('An error occurred:', error);
        }
    }
    // function for close modal on success modal close click
    const handleShareRoutineSuccessModalClose = () => {
        setSharedNotesSuccessModal(false)
    }

    // function for close modal on success modal submit click
    const handleShareRoutineSuccessSubmitClick = () => {
        setSharedNotesSuccessModal(false)
        getData() //refresh the data
    }

    // function for submit button click on api call to edit notes
    const handleManageNotesSubmitClick = isEdit => {
        setManageEditModal(false)
        var data = {
            isedit: isEdit,
            noteid: notesId
        }

        NotesService.postManageNotes(data)
            .then(response => {
                toastRef.current.getToast(response.data.message, "success")
                getData() //refresh the page
            })
            .catch(error => {
                toastRef.current.getToast(error.response.data.message, "error")
            })
    }

    // function for submit button click on api call to delete notes
    const handleDelete = async () => {
        setDeleteModal(false)
        // NotesService.getDeleteNotes(notesId)
        //     .then(response => {
        //         toastRef.current.getToast(response.data.message, "success")
        //         navigation.goBack()
        //     })
        //     .catch(error => {
        //         console.log(error)
        //     })
        console.log('urkl delete notes----??', delete_notes + notesId);
        const { responseJson, err } = await requestPostApi(delete_notes + notesId, '', 'DELETE', User.token)
        // setPageLoader(false)
        console.log('response of delete notes-------->>>>>', responseJson)
        // setMyGroupList(responseJson.body)
        if (responseJson.headers.success == 1) {
            console.log('responseJson.headers.success', responseJson.headers.success);
            navigation.goBack()
            Toast.show({ text1: responseJson.headers.message });
        }
    }

    // list for shared notes
    const renderShareNotes = ({ item }) => {
        return <SharedNotesTab items={item} onDeleteClick={handleDeleteGroup} />
    }

    // function for open modal on delete group
    const handleDeleteGroup = id => {
        setDeleteGroupModal(true)
        setGroupId(id)
    }

    // function for delete button click on api call to delete notes
    const handleShareNotesDeleteClick = async () => {
        setDeleteGroupModal(false)
        const data = {
            note_id: notesId,
            groupid: groupId
        }
        console.log('my data to remove note from group--->>', data);
        const { responseJson, err } = await requestPostApi(remove_noteSharing, data, 'POST', User.token)
        // setPageLoader(false)
        console.log('response of remove from group notes-------->>>>>', responseJson)
        // setMyGroupList(responseJson.body)
        if (responseJson.headers.success == true) {

            // NotesService.postRemoveShareNotes(data)
            //     .then(response => {
            //         getData() //refresh the data
            //     })
            //     .catch(error => {
            //         console.log(error)
            //     })
        }
    }

    return (
        <View style={styles.container}>
            {/* header section  */}
            <CustomHeader
                headerText={"Notes Details"}
                backButton={{
                    visible: true,
                    onClick: () => {
                        navigation.goBack()
                    }
                }}
            />

            {/* display setting icon basis of customer id match  */}
            {myUserId == notesDetails?.Created_by ? (
                <TouchableOpacity
                    style={styles.settingIconContainer}
                    onPress={() => {
                        setManageEditModal(true)
                    }}
                >
                    <Image
                        resizeMode="contain"
                        source={require("../../../../assets/Remindably/settingWhite.png")}
                    />
                </TouchableOpacity>
            ) : null}

            {/* body section */}
            <View contentContainerStyle={{ flexGrow: 1, }}>
                {!pageLoader ? (
                    <View style={styles.body}>
                        <View style={styles.headerContainer}>
                            {/* notes name section  */}
                            <View style={styles.notesTitleContainer}>
                                <Text style={styles.notesTitle}>
                                    {notesDetails?.notes_title}
                                </Text>
                                <View style={styles.direction}>
                                    <Image
                                        resizeMode="contain"
                                        style={styles.imageStyle}
                                        source={require("../../../../assets/Remindably/CalendarBlank1.png")}
                                    />
                                    <Text style={styles.days}>
                                        {moment(notesDetails?.datetime).format("ddd DD")}
                                    </Text>
                                </View>

                                {/* last edit by and edit date if available */}
                                {notesDetails?.modifiedby !== "" ? (
                                    <View>
                                        <View style={styles.direction}>
                                            <Text style={styles.days}>
                                                Last modify by: {notesDetails?.modifiedby}
                                            </Text>
                                        </View>
                                        <View style={styles.direction}>
                                            <Text style={styles.days}>
                                                Last modify date: {notesDetails?.editdate}
                                            </Text>
                                        </View>
                                    </View>
                                ) : null}
                            </View>

                            {/* display share, edit and delete icon basis of customer id match  */}
                            <View style={styles.iconsContainer}>
                                {console.log('notesDetails?.Created_by', User.userid === notesDetails?.Created_by)}
                                {/* share icon */}
                                {User.userid === notesDetails?.Created_by ? (
                                    <TouchableOpacity
                                        onPress={() => {
                                            handleShareNotes()
                                        }}
                                        style={styles.editContainer}
                                    >
                                        <Image
                                            resizeMode="contain"
                                            source={require("../../../../assets/Remindably/ShareIcon.png")}
                                        />
                                    </TouchableOpacity>
                                ) : (
                                    <View style={styles.editContainer} />
                                )}

                                {/* edit icon based on user id match and isEdit true*/}
                                {notesDetails?.is_edit == "true" ? (
                                    <TouchableOpacity
                                        style={styles.editContainer}
                                        onPress={() => {
                                            navigation.navigate(
                                                "EditNotes",
                                                {
                                                    data: notesDetails
                                                }
                                            )
                                        }}
                                    >
                                        <Image
                                            resizeMode="contain"
                                            source={require("../../../../assets/Remindably/editIcon.png")}
                                        />
                                    </TouchableOpacity>
                                ) : User.userid === notesDetails?.Created_by ? (
                                    <TouchableOpacity
                                        style={styles.editContainer}
                                        onPress={() => {
                                            navigation.navigate(
                                                "EditNotes",
                                                {
                                                    data: notesDetails
                                                }
                                            )
                                        }}
                                    >
                                        <Image
                                            resizeMode="contain"
                                            source={require("../../../../assets/Remindably/editIcon.png")}
                                        />
                                    </TouchableOpacity>
                                ) : null}

                                {/* delete icon */}
                                {User.userid === notesDetails?.Created_by ? (
                                    <TouchableOpacity
                                        style={styles.editContainer}
                                        onPress={() => {
                                            setDeleteModal(true)
                                        }}
                                    >
                                        <Image
                                            resizeMode="contain"
                                            source={require("../../../../assets/Remindably/Trash.png")}
                                        />
                                    </TouchableOpacity>
                                ) : null}
                            </View>
                        </View>

                        {/* description section  */}
                        <View style={styles.descriptionContainer}>
                            <Text style={styles.descriptionText}>
                                {notesDetails?.notes_text}
                            </Text>
                        </View>

                        {/* notes image section  */}
                        {notesImages?.length >= 0 ? (
                            <View>
                                <FlatList
                                    data={notesImages}
                                    horizontal={true}
                                    showsHorizontalScrollIndicator={false}
                                    renderItem={renderAddedNotesImages}
                                    keyExtractor={(item, index) => String(index)}
                                />
                            </View>
                        ) : null}

                        {/* View notes history   ///////for future use  */}
                        {/* <TouchableOpacity
                style={{width: 90}}
                onPress={() => {
                  navigation.navigate('StackNavigation', {
                    screen: 'NotesHistory',
                    params: {
                      data: notesId,
                      flow: 'NOTESDETAILS',
                    },
                  });
                }}>
                <Text style={styles.createRoutineText}>View history</Text>
              </TouchableOpacity> */}

                        {/* shared group count section  */}
                        {notesDetails?.groupcount > 0 ? (
                            <View style={styles.commentLabelContainer}>
                                {notesDetails?.groupcount === 1 ? (
                                    <Text style={styles.sharedText}>
                                        Note shared with {notesDetails?.groupcount} group
                                    </Text>
                                ) : (
                                    <Text style={styles.sharedText}>
                                        Note shared with {notesDetails?.groupcount} groups
                                    </Text>
                                )}
                            </View>
                        ) : (
                            <Text style={styles.sharedText}>No sharing yet</Text>
                        )}

                        <View style={styles.sharedGroupList}>
                            <FlatList
                                data={sharedGroups}
                                renderItem={renderShareNotes}
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                keyExtractor={(item, index) => String(index)}
                            />
                        </View>

                        {/* Comments section */}
                        <View style={styles.commentLabelContainer}>
                            <Text style={styles.commentCount}>Comments ({notesComments?.length})</Text>
                            <TouchableOpacity
                                style={styles.createRoutineContainer}
                                onPress={() => {
                                    navigation.navigate(
                                        "NotesAllComments",
                                        {
                                            data: notesId,
                                            flow: "NOTESDETAILS"
                                        }
                                    )
                                }}
                            >
                                <View style={styles.createRoutineIcon}>
                                    <Image
                                        resizeMode="contain"
                                        style={styles.image}
                                        source={require("../../../../assets/Remindably/Plus.png")}
                                    />
                                </View>
                                <Text style={styles.createRoutineText}>Add Comment</Text>
                            </TouchableOpacity>
                        </View>

                        {/* other users comments on this task*/}
                        {console.log('notes comments--->>>', notesComments)}
                        {notesComments?.length > 0 ? (
                            <View style={styles.commentContainer}>
                                <ScrollView style={{ height: '50%', }} nestedScrollEnabled={true}>
                                    <FlatList
                                        data={notesComments}
                                        scrollEnabled={false}
                                        renderItem={renderCommentsRoutine}
                                        keyExtractor={(item, index) => String(index)}
                                        style={{}}
                                    />
                                </ScrollView>
                                {/* view all comments  */}
                                <TouchableOpacity
                                    style={{ width: 140, }}
                                    onPress={() => {
                                        navigation.navigate(
                                            "NotesAllComments",
                                            {
                                                data: notesId,
                                                flow: "NOTESDETAILS"
                                            }
                                        )
                                    }}
                                >
                                    <Text style={styles.createRoutineText}>
                                        View All Comments
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <View style={styles.noCommentContainer}>
                                <Text style={styles.noCommentText}>No Comments Available</Text>
                            </View>
                        )}
                    </View>
                ) : (
                    <View style={styles.loaderContainer}>
                        <ActivityIndicator size="large" color={Mycolors.THEME_ORANGE} />
                    </View>
                )}
            </View>

            {/* Delete alert modal for note delete*/}
            <DeleteAlertModal
                visibleModal={deleteModal}
                onRequestClosed={() => {
                    setDeleteModal(false)
                }}
                onPressRightButton={() => {
                    handleDelete()
                }}
                subHeading={"Are you sure you want to delete this note ?"}
            />

            {/* Delete alert modal for remove group sharing */}
            <DeleteAlertModal
                visibleModal={deleteGroupModal}
                onRequestClosed={() => {
                    setDeleteGroupModal(false)
                }}
                onPressRightButton={() => {
                    handleShareNotesDeleteClick()
                }}
                subHeading={"Are you sure you want to remove this group ?"}
            />

            {/* Share Routine Modal */}
            <ShareNotesModal
                buttonLoader={buttonLoader}
                visibleModal={shareNotesModal}
                onClose={handleShareNotesModalClose}
                noteId={route?.params?.id}
                onSubmitClick={handleShareNotesSubmitClick}
            />

            {/* Share Routine Success Modal */}
            <ShareNotesSuccessModal
                groupCount={groupCount}
                visibleModal={sharedNotesSuccessModal}
                onClose={handleShareRoutineSuccessModalClose}
                onSubmitClick={handleShareRoutineSuccessSubmitClick}
            />

            {/* manage group modal  */}
            <ManageNotesModal
                visibleModal={manageEditModal}
                isEditingEnabled={notesDetails?.is_edit}
                onClose={() => setManageEditModal(false)}
                onSubmitClick={handleManageNotesSubmitClick}
            />

            {/* toaster message for error response from API  */}
            {/* <CommonToast ref={toastRef} /> */}
        </View>
    )
}

export default NotesDetails

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    body: {
        margin: 10,
        padding: 10
    },
    headerContainer: {
        alignItems: "center",
        flexDirection: "row",
        height: "auto",
        justifyContent: "space-between",
        padding: 3
    },
    notesTitleContainer: { width: "73%" },
    notesTitle: {
        color: Mycolors.THEME_BLACK,
        fontSize: 18,
        fontWeight: "500"
    },
    days: {
        color: Mycolors.THEME_BLACK,
        fontWeight: "500",
        paddingHorizontal: 5
    },
    direction: { flexDirection: "row" },
    iconsContainer: {
        alignSelf: "flex-start",
        flexDirection: "row",
        width: "26%"
    },
    imageStyle: {
        height: 20,
        paddingHorizontal: 12,
        width: 20
    },
    editContainer: {
        alignItems: "center",
        borderRadius: 50,
        justifyContent: "center",
        marginHorizontal: 3,
        padding: 3
    },
    descriptionContainer: {
        height: "auto",
        marginVertical: 10,
        padding: 10
    },
    descriptionText: {
        color: Mycolors.THEME_BLACK,
        fontSize: 14,
        textAlign: "justify"
    },
    loaderContainer: {
        alignSelf: "center",
        height: "83%",
        justifyContent: "center"
    },
    commentLabelContainer: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    commentCount: {
        color: Mycolors.BLACK,
        fontSize: 16,
        fontWeight: "500",
        padding: 5
    },
    createRoutineContainer: {
        alignItems: "center",
        flexDirection: "row",
    },
    createRoutineIcon: {
        backgroundColor: Mycolors.THEME_ORANGE,
        borderRadius: 50,
        height: 20,
        marginRight: 3,
        padding: 3,
        width: 20
    },
    image: {
        borderRadius: 50,
        height: "100%",
        width: "100%"
    },
    createRoutineText: {
        color: Mycolors.THEME_ORANGE,
        fontSize: 14,
        fontWeight: "500",
        padding: 3
    },
    sharedText: {
        color: Mycolors.BLACK,
        fontSize: 16,
        fontWeight: "500",
        marginTop: 10,
        padding: 5
    },
    sharedGroupList: {
        height: "auto"
    },
    commentContainer: {
        height: "58%",
        marginTop: 10,
    },
    noCommentContainer: {
        alignContent: "center",
        alignItems: "center",
        height: "35%",
        justifyContent: "center"
    },
    noCommentText: {
        color: Mycolors.THEME_BLACK,
        fontSize: 18,
        fontWeight: "500",
        padding: 20
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
    }
})
