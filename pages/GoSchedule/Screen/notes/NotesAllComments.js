//external imports
import {
    ActivityIndicator,
    Dimensions,
    FlatList,
    Image,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import Toast from 'react-native-toast-message'
import ImagePicker from "react-native-image-crop-picker"
import React, { useEffect, useRef, useState } from "react"
import { useIsFocused } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import axios from "axios"
//internal imports
import CameraGalleryModal from "../groups/CameraGalleryModal"
import CommentImageOnTask from "../groups/CommentImageOnTask"
// import CommonToast from "../../constants/CommonToast"
import CustomHeader from "../../Constants/CustomHeaader"
import { useSelector, useDispatch } from 'react-redux';
// import GroupServices from "../../service/GroupServices"
import UploadImageTab from "../groups/UploadImageTab"
import UserCommentsOnTaskView from "../groups/UserCommentsOnTaskView"
// import { colors } from "../../constants/ColorConstant"
import { Mycolors, dimensions } from "../../../../utility/Mycolors"
import { useKeyboard } from "../../Hooks/isKeyBoardOpen"
import { get_details, requestGetApi, get_task, recent_members, manageGroup, requestPostApi, deleteGroup, get_listing, notes_detail } from '../../../../WebApi/Service'


export const { width, height } = Dimensions.get("screen")

const NotesAllComments = ({ navigation, route }) => {
    const isFocus = useIsFocused()
    const [allCommentCount, setAllCommentCount] = useState([])
    const [allComments, setAllComments] = useState([])
    const [buttonLoader, setButtonLoader] = useState(false)
    const [cameraGalleryModal, setCameraGalleryModal] = useState(false)
    const [commentsImage, setCommentsImage] = useState([])
    const [feedbackImage, setFeedbackImage] = useState([])
    const [myUserId, setMyUserId] = useState()
    const [pageLoader, setPageLoader] = useState(false)
    const [taskComments, setTaskComments] = useState("")
    const [picker, setPicker] = useState([])
    const [taskId, setTaskId] = useState('')
    const [taskName, setTaskName] = useState("")
    const isKeyBoardOpen = useKeyboard()
    const toastRef = useRef()
    const User = useSelector(state => state.user.user_details)

    useEffect(() => {
        // setTaskComments("")
        setTaskId(route?.params?.data)
        // setFeedbackImage([])
        // setPageLoader(true)
        getData()
    }, [isFocus])
    useEffect(() => {

        const unsubscribe = navigation.addListener('blur', () => {

            setPicker([])
            setFeedbackImage([])
            setTaskComments('')
        });


        return unsubscribe;
    }, [navigation])
    // function for get all comments data on api call
    // const getData = async () => {
    //     // user id for delete and edit icon
    //     const token = await AsyncStorage.getItem("userId")
    //     setMyUserId(token)
    //     setFeedbackImage([])
    //     const data = {
    //         taskid: taskId,
    //         tasktype: "N"
    //     }
    //     GroupServices.postAllCommentsOnTask(data)
    //         .then(response => {
    //             setPageLoader(false)
    //             setTaskName(response.data.taskdetails.name)
    //             setAllComments(response.data.taskdetails.commentdetails)
    //             setCommentsImage(response.data.taskdetails.images)
    //             setAllCommentCount(response.data.taskdetails.commentsCount)
    //         })
    //         .catch(error => {
    //             setPageLoader(false)
    //             console.log(error)
    //         })
    // }

    const getData = async () => {
        console.log('task called nodes id forthe notes---->>', route?.params?.data)
        // setPageLoader(true)
        var fUrl = notes_detail + route?.params?.data
        // var urls = '?group_id=' + groupId
        // console.log('my url---------->', urls)
        // if (urls != undefined) {
        //     fUrl = fUrl + urls
        // }
        console.log('furlsssssssssss->>>>>>>>>>>', fUrl)
        const { responseJson, err } = await requestGetApi(fUrl, '', 'GET', User.token)
        // setPageLoader(false)
        console.log('response of get notes-------->>>>>', responseJson)
        // setMyGroupList(responseJson.body)
        if (responseJson.headers.success == true) {
            console.log('the res of notes detail succes--->>>', responseJson.body.Created_by

            )
            setTaskName(responseJson.body.notes_title
            )
            setAllComments(responseJson.body.commentDetails[0]
            )
            setCommentsImage(responseJson.body.imagedetails)
            // setNotesDetails(responseJson.body)
            // setNotesImages(responseJson.body.imagedetails)
            // setSharedGroups(responseJson.body.groupdetails)
        } else {

            setalert_sms(err)
            setMy_Alert(true)
        }
    }

    // list for all comments on notes
    const renderUsersComments = ({ item }) => {

        return (
            <UserCommentsOnTaskView
                items={item}
                getRefreshComments={getData}
                myUserId={myUserId}
            />
        )
    }

    // list for all images on comments
    const renderCommentsImage = ({ item }) => {

        return <CommentImageOnTask commentImages={item} />
    }

    // list for all uploaded images on comments
    const renderUploadFeedbackImages = ({ item }) => {
        console.log('y otes images----->>>', item);
        return <UploadImageTab commentImages={item} />
    }

    // function for open camera
    // const openCamera = async () => {
    //     try {
    //         let value = await ImagePicker.openCamera({
    //             width: 1080,
    //             height: 1080,
    //             cropping: true,
    //             mediaType: "photo",
    //             compressImageQuality: 1,
    //             compressImageMaxHeight: 1080 / 2,
    //             compressImageMaxWidth: 1080 / 2
    //         }).then(image => {
    //             const img = {
    //                 name: image.path.slice(
    //                     image.path.lastIndexOf("/"),
    //                     image.path.length
    //                 ),
    //                 uri: image.path,
    //                 type: image.mime
    //             }
    //             setFeedbackImage([img])
    //             setCameraGalleryModal(false)
    //         })
    //     } catch (error) {
    //         setCameraGalleryModal(false)
    //         console.log("error in openLibrary", error)
    //     }
    // }

    // // function for open gallery
    // const openLibrary = async () => {
    //     try {
    //         let imageList = []
    //         let value = await ImagePicker.openPicker({
    //             width: 1080,
    //             height: 1080,
    //             multiple: true,
    //             cropping: true,
    //             mediaType: "photo",
    //             compressImageQuality: 1,
    //             compressImageMaxHeight: 1080 / 2,
    //             compressImageMaxWidth: 1080 / 2
    //         }).then(image => {
    //             image.map(e => {
    //                 imageList.push({
    //                     name: e.path.slice(e.path.lastIndexOf("/"), e.path.length),
    //                     uri: e.path,
    //                     type: e.mime
    //                 })
    //             })
    //             setFeedbackImage(imageList)
    //             setCameraGalleryModal(false)
    //         })
    //     } catch (error) {
    //         setCameraGalleryModal(false)
    //         console.log("error in openLibrary", error)
    //     }
    // }

    const openCamera = async () => {
        try {
            let value = await ImagePicker.openCamera({
                width: 1080,
                height: 1080,
                cropping: true,
                mediaType: "photo",
                compressImageQuality: 1,
                compressImageMaxHeight: 1080 / 2,
                compressImageMaxWidth: 1080 / 2
            }).then(image => {


                console.log(image, 'camera image')
                setPicker([...picker, image]);

                const img = {
                    name: image.path.slice(
                        image.path.lastIndexOf("/"),
                        image.path.length
                    ),
                    uri: image.path,
                    type: image.mime
                }
                setFeedbackImage([img])
                setCameraGalleryModal(false)
            })
        } catch (error) {
            setCameraGalleryModal(false)
            // console.log("error in openLibrary", error)
        }
    }

    // function for open gallery
    const openLibrary = async () => {
        let imageList = []
        console.log('picker');
        try {
            let images = await ImagePicker.openPicker({
                width: 1080,
                height: 1080,
                cropping: true,
                mediaType: 'photo',
                compressImageQuality: 1,
                compressImageMaxHeight: 1080 / 2,
                compressImageMaxWidth: 1080 / 2,
                multiple: true
            });
            const totalSelectedImages = picker.length + images.length;

            console.log('---------then block------->', images);
            setPicker([...picker, ...images]);
            images.map(e => {
                imageList.push({
                    name: e.path.slice(e.path.lastIndexOf("/"), e.path.length),
                    uri: e.path,
                    type: e.mime
                })
            })
            setFeedbackImage(imageList)
            setCameraGalleryModal(false)

        } catch (error) {
            console.log('error in openLibrary', error);
        }
    };
    // function for submit button click on api call to add comments
    // const handleSubmitClick = () => {
    //     Keyboard.dismiss()
    //     if (taskComments != "" || feedbackImage?.length > 0) {
    //         setButtonLoader(true)
    //         const feedBackData = new FormData()
    //         if (feedbackImage !== null) {
    //             feedbackImage.map((e, index) => {
    //                 feedBackData.append(`images[${index}]`, e)
    //             })
    //         }
    //         feedBackData.append("object_id", taskId)
    //         feedBackData.append("comment", taskComments)
    //         feedBackData.append("comment_type", "N")

    //         GroupServices.postAddComment(feedBackData)
    //             .then(response => {
    //                 setButtonLoader(false)
    //                 toastRef.current.getToast(response.data.message, "success")
    //                 getData() //for refresh the task and comment section
    //                 setTaskComments("")
    //             })
    //             .catch(error => {
    //                 setButtonLoader(false)
    //                 console.log("error", error)
    //             })
    //     }
    // }
    const handleSubmitClick = async () => {
        console.log('taskcomments======>>', taskComments);
        if (!taskComments && (!picker || picker.length === 0)) {
            // Show a toast message when both taskComments and picker are empty
            Toast.show({ text1: 'Please enter a comment or select an image' });
            return; // Prevent further execution of the function
        }
        Keyboard.dismiss()
        setButtonLoader(true)
        try {
            console.log('Starting post creation...');
            const data = new FormData();
            data.append("object_id", taskId);
            data.append("comment", taskComments);
            data.append("comment_type", "N");

            if (picker.length > 0) {
                console.log('Uploading from gallery', picker);
                picker.forEach((item, index) => {
                    const imageName = item.path.slice(item.path.lastIndexOf('/') + 1);
                    data.append('files', {
                        name: imageName,
                        type: item.mime,
                        uri: item.path,
                    });
                });

            }

            console.log('Data to be sent:', data);

            const response = await axios.post(
                'http://54.153.75.225/backend/api/v1/goaccounting/task-comment',
                data,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${User.token}`,
                    },
                }
            );

            console.log('Response:', response.data);

            if (response.status === 200) {
                console.log('commented succesfully---->>>', response);
                setButtonLoader(false)
                getData()
                setPicker([])
                setTaskComments('')
                setFeedbackImage([])
                // props.navigation.navigate('InventionHome');
                // Toast.show({ text1: response.data.headers.message });
            } else {
                console.log('Error creating post:', response.data.headers.message);
            }

            // Assuming you want to set loading to false after the request.

        } catch (error) {
            console.error('Error in CreatePost', error);
        }
    }
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <Loader showLoader={pageLoader} />
            {/* header section */}
            <CustomHeader
                headerText={"Comments"}
                backButton={{
                    visible: true,
                    onClick: () => {
                        navigation.goBack()
                    }
                }}
            />

            {/* body section */}
            <KeyboardAwareScrollView
                showsVerticalScrollIndicator={false}
                style={styles.body}
            >
                {allComments?.length > 0 ?
                    <ScrollView showsVerticalScrollIndicator={false} style={{ height: dimensions.SCREEN_HEIGHT * 0.83 }}>
                        {/* notes name section*/}
                        <View style={styles.taskNameContainer}>
                            {/* <Text style={styles.taskTitle}>Notes Name:</Text> */}
                            <Text style={styles.taskName}>{taskName}</Text>
                        </View>

                        {/* comments Image image section  */}
                        {console.log('my commnts images---->>', commentsImage)}
                        {commentsImage?.length >= 0 ? (
                            <View>
                                <FlatList
                                    horizontal={true}
                                    showsHorizontalScrollIndicator={false}
                                    data={commentsImage}
                                    renderItem={renderCommentsImage}
                                    keyExtractor={(item, index) => String(index)}
                                />
                            </View>
                        ) : null}

                        {/* other users comments on this task*/}
                        {allComments?.length > 0 ? (
                            <View style={styles.commentContainer}>
                                <Text style={styles.commentCount}>
                                    Comments ({allComments?.length})
                                </Text>

                                <FlatList
                                    data={allComments}
                                    renderItem={renderUsersComments}
                                    keyExtractor={(item, index) => String(index)}
                                />


                            </View>
                        ) : null}
                    </ScrollView> : <>

                        <View style={styles.taskNameContainer}>
                            {/* <Text style={styles.taskTitle}>Notes Name:</Text> */}
                            <Text style={styles.taskName}>{taskName}</Text>
                        </View>

                        {/* comments Image image section  */}
                        {console.log('my commnts images---->>', commentsImage)}
                        {commentsImage?.length >= 0 ? (
                            <View>
                                <FlatList
                                    horizontal={true}
                                    showsHorizontalScrollIndicator={false}
                                    data={commentsImage}
                                    renderItem={renderCommentsImage}
                                    keyExtractor={(item, index) => String(index)}
                                />
                            </View>
                        ) : null}

                    </>}
            </KeyboardAwareScrollView>

            {allComments?.length > 0 ? null : (
                <>
                    {pageLoader ? null : (
                        <View style={styles.noCommentContainer}>
                            <Image
                                resizeMode="contain"
                                style={styles.noCommentImage}
                                source={require("../../../../assets/Remindably/noCommentImage.png")}
                            />
                            <Text style={styles.noCommentText}>No comments available!</Text>
                        </View>
                    )}
                </>
            )}

            {/* add comment section with button option */}
            <View
                style={{
                    flex: 1,
                    justifyContent: "flex-end",
                    marginBottom: isKeyBoardOpen ? "15%" : 0
                }}
            >
                <View style={styles.addCommentContainer}>
                    <View style={styles.textInputContainer}>
                        <TextInput
                            placeholder="Write a comment..."
                            placeholderTextColor={Mycolors.textGray}
                            style={styles.textInput}
                            value={taskComments}
                            onChangeText={text => {
                                setTaskComments(text)
                            }}
                        />

                        {/* upload image section  */}
                        {feedbackImage?.length >= 0 ? (
                            <View style={styles.uploadImageContainer}>
                                <FlatList
                                    data={feedbackImage}
                                    horizontal={true}
                                    showsHorizontalScrollIndicator={false}
                                    renderItem={renderUploadFeedbackImages}
                                    keyExtractor={(item, index) => String(index)}
                                />
                            </View>
                        ) : null}
                    </View>
                    <TouchableOpacity
                        style={styles.cameraIconContainer}
                        onPress={() => setCameraGalleryModal(true)}
                    >
                        <Image
                            resizeMode="contain"
                            style={{ height: 25, width: 25 }}
                            source={require("../../../../assets/Remindably/cameraIcon.png")}
                        />
                    </TouchableOpacity>
                    {!buttonLoader ? (
                        <TouchableOpacity
                            style={styles.submitButtonContainer}
                            onPress={() => {
                                handleSubmitClick()
                            }}
                        >
                            <Text style={styles.submitText}>Post</Text>
                        </TouchableOpacity>
                    ) : (
                        <View style={styles.submitButtonContainer}>
                            <ActivityIndicator color={Mycolors.WHITE} />
                        </View>
                    )}
                </View>
            </View>

            {/* Camera Gallery Modal  */}
            <CameraGalleryModal
                visibleModal={cameraGalleryModal}
                onClose={() => {
                    setCameraGalleryModal(false)
                }}
                cameraClick={openCamera}
                galleryClick={openLibrary}
            />

            {/* toaster message for error response from API  */}
            {/* <CommonToast ref={toastRef} /> */}
        </KeyboardAvoidingView>
    )
}

export default NotesAllComments

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    body: {
        height: height,
        marginBottom: 40,
        padding: 10
    },
    taskNameContainer: {
        margin: 10,
        width: "95%"
    },
    commentCount: {
        color: Mycolors.THEME_BLACK,
        fontSize: 17,
        fontWeight: "500",
        padding: 10
    },
    taskTitle: {
        color: Mycolors.THEME_BLACK,
        fontSize: 12,
        fontWeight: "400"
    },
    taskName: {
        color: Mycolors.THEME_ORANGE,
        fontSize: 16,
        fontWeight: "500",
        width: "95%"
    },
    loaderContainer: {
        alignSelf: "center",
        height: "100%",
        justifyContent: "center",
        position: "absolute",
        width: "100%"
    },
    addCommentContainer: {
        alignItems: "center",
        backgroundColor: Mycolors.WHITE,
        bottom: 0,
        flexDirection: "row",
        height: 60,
        justifyContent: "center",
        position: "absolute",
        zIndex: 1
    },
    textInputContainer: { width: "70%" },
    textInput: {
        color: Mycolors.BLACK,
        paddingLeft: 20,
        width: "100%"
    },
    cameraIconContainer: {
        alignItems: "center",
        justifyContent: "center",
        width: "10%"
    },
    submitButtonContainer: {
        alignItems: "center",
        backgroundColor: Mycolors.THEME_ORANGE,
        borderRadius: 5,
        height: 42,
        justifyContent: "center",
        padding: 7,
        width: "19%"
    },
    submitText: {
        color: Mycolors.WHITE,
        fontSize: 14,
        fontWeight: "500"
    },
    errorText: {
        color: Mycolors.RED,
        padding: 10,
        position: "absolute",
        top: -25
    },
    noCommentContainer: {
        alignItems: "center",
        bottom: "30%",
        justifyContent: "center",
        width: "100%"
    },
    noCommentImage: {
        height: 135,
        width: 135
    },
    noCommentText: {
        color: Mycolors.GRAY,
        fontSize: 18,
        fontWeight: "400",
        padding: 18
    },
    commentContainer: { flex: 1, },
    uploadImageContainer: { top: -60, position: "absolute" }
})

// loader
export const Loader = ({ showLoader = false }) => {
    return (
        <>
            {showLoader ? (
                <View style={styles.loaderContainer}>
                    <ActivityIndicator size="large" color={Mycolors.THEME_ORANGE} />
                </View>
            ) : null}
        </>
    )
}
