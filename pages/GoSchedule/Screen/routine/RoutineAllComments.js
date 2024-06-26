//external imports
import {
    ActivityIndicator,
    Alert,
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
import Toast from 'react-native-toast-message'
import AsyncStorage from "@react-native-async-storage/async-storage"
import ImagePicker from "react-native-image-crop-picker"
import React, { useEffect, useRef, useState } from "react"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"

//internal imports
import axios from "axios"
import CameraGalleryModal from "../groups/CameraGalleryModal"
//   import CommonToast from "../../constants/CommonToast"
import CustomHeader from "../../Constants/CustomHeaader"
// import GroupServices from "../../service/GroupServices"
import UploadImageTab from "../groups/UploadImageTab"
import UserCommentsOnRoutine from "./UserCommentsOnRoutine"
// import { colors } from "../../constants/ColorConstant"
import { Mycolors, dimensions } from "../../../../utility/Mycolors"
import { requestGetApi, get_memberList, add_members, invite_user, requestPostApi, request_list, home_details, home_detailTask, taskHideUnhide, getRoutines, detailRoutine, group_detail } from '../../../../WebApi/Service'
import { useSelector, useDispatch } from 'react-redux';
import { useKeyboard } from "../../Hooks/isKeyBoardOpen"
import { useIsFocused } from "@react-navigation/native";
export const { width, height } = Dimensions.get("screen")

const RoutineAllComments = ({ route, navigation }) => {
    const isFocus = useIsFocused()
    const User = useSelector(state => state.user.user_details)
    const [allCommentCount, setAllCommentCount] = useState([])
    const [allComments, setAllComments] = useState([])

    const [buttonLoader, setButtonLoader] = useState(false)
    const [cameraGalleryModal, setCameraGalleryModal] = useState(false)
    const [feedbackImage, setFeedbackImage] = useState([])
    const [myUserId, setMyUserId] = useState()
    const [pageLoader, setPageLoader] = useState(false)
    const [routineId, setRoutineId] = useState('')
    // console.log('route?.params?.data all comments', route?.params?.data)
    const [taskComments, setTaskComments] = useState("")
    const [taskName, setTaskName] = useState("")
    const [picker, setPicker] = useState([])
    const isKeyBoardOpen = useKeyboard()
    const toastRef = useRef()


    useEffect(() => {

        const unsubscribe = navigation.addListener("focus", () => {
            setRoutineId(route?.params?.data)
            console.log('fow for routie---->>', route?.params?.flow);
            setTaskComments('')
            setPicker([])
            setFeedbackImage([])
            // setTaskComments("")
            // setFeedbackImage([])
            // setPageLoader(true)
            getData()

        })
        return unsubscribe
    }, [isFocus])

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
    // function for get all comments data on api call
    const getDataa = async () => {
        // user id for delete and edit icon
        const token = await AsyncStorage.getItem("userId")
        setMyUserId(token)

        setFeedbackImage([])
        const data = {
            taskid: routineId,
            tasktype: "R"
        }
        // GroupServices.postAllCommentsOnTask(data)
        //     .then(response => {
        //         setPageLoader(false)
        //         setTaskName(response.data.taskdetails.name)
        //         setAllComments(response.data.taskdetails.commentdetails)
        //         setAllCommentCount(response.data.taskdetails.commentsCount)
        //     })
        //     .catch(error => {
        //         setPageLoader(false)
        //         console.log("error", error)
        //     })
    }
    const getData = async () => {
        // console.log('mu search textttt getData for comments', text)
        var url = detailRoutine
        // var murl = text
        // if (murl != 'undefined') {
        //     var url = url + murl
        // }
        setPageLoader(true)

        const { responseJson, err } = await requestGetApi(detailRoutine + route?.params?.data, '', 'GET', User.token)
        // 

        // setMyGroupList(responseJson.body)
        if (responseJson.headers.success == 1) {


            console.log('response of detail routinesss cim comments routineAllComments my response- 1235455--??', responseJson?.body?.commentDetails)
            setTaskName(responseJson.body.title)
            // setRoutineDetails(responseJson.body)
            setAllComments(responseJson?.body?.commentDetails)
            // setMyRoutines(responseJson.body)
            setPageLoader(false)
        } else {
            setPageLoader(false)
            Alert.alert('my errror in api comments')
            setalert_sms(err)
            setMy_Alert(true)
        }
        setPageLoader(false)
    }

    // list for comments on routine
    const renderUsersComments = ({ item }) => {
        console.log('item renderUsersComments', item);
        return (
            <UserCommentsOnRoutine
                items={item}
                getRefreshComments={getData}
                myUserId={myUserId}
            />
        )
    }

    // list for upload images
    const renderUploadFeedbackImages = ({ item }) => {
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

    // function for submit button click on api call to add comment
    const handleSubmitClickk = () => {
        Keyboard.dismiss()

        if (taskComments != "" || feedbackImage?.length > 0) {
            setButtonLoader(true)

            const feedBackData = new FormData()
            if (feedbackImage !== null) {
                feedbackImage.map((e, index) => {
                    feedBackData.append(`images[${index}]`, e)
                })
            }
            feedBackData.append("object_id", routineId)
            feedBackData.append("comment", taskComments)
            feedBackData.append("comment_type", "R")

            // GroupServices.postAddComment(feedBackData)
            //     .then(response => {
            //         setButtonLoader(false)
            //         toastRef.current.getToast(response.data.message, "success")
            //         getData() //for refresh the task and comment section
            //         setTaskComments("")
            //     })
            //     .catch(error => {
            //         setButtonLoader(false)
            //         console.log("error", error)
            //     })
        }
    }

    const handleSubmitClick = async () => {
        if (!taskComments && (!picker || picker.length === 0)) {
            // Show a toast message when both taskComments and picker are empty
            Toast.show({ text1: 'Please enter a comment or select an image' });
            return

        }
        Keyboard.dismiss()
        setButtonLoader(true)
        try {
            console.log('Starting post creation...');


            const data = new FormData();

            data.append("object_id", routineId);
            data.append("comment", taskComments);
            data.append("comment_type", "R");

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
                setButtonLoader(false)
                console.log('added commentsss------->>>>', response);
                setTaskComments('')
                setPicker([])
                setFeedbackImage([])
                setButtonLoader(false)
                getData(routineId)

                // props.navigation.navigate('InventionHome');
                // Toast.show({ text1: response.data.headers.message });
            } else {
                setButtonLoader(false)
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
                        //added for navigation to diff screens 16/11/2023
                        route?.params?.flow === 'SHAREDROUTINE' ? navigation.navigate('SharedRoutineDetails', { id: routineId }) : navigation.navigate('RoutineDetails', { id: routineId })
                    }
                }}
            />

            {/* body section */}
            <KeyboardAwareScrollView
                showsVerticalScrollIndicator={false}
                style={styles.body}
            >
                <ScrollView showsVerticalScrollIndicator={false} style={{ height: dimensions.SCREEN_HEIGHT }}>
                    {/* routine name section*/}
                    <View style={styles.taskNameContainer}>
                        <Text style={styles.taskName}>{taskName}</Text>
                    </View>

                    {/* other users comments on this task*/}
                    {console.log('my routine comments check--->>>', allComments.length)}
                    {allComments?.length > 0 ? (
                        <View style={styles.commentContainer}>
                            <Text style={styles.commentCount}>
                                Comments ({allComments.length})
                            </Text>
                            <FlatList
                                data={allComments}
                                renderItem={renderUsersComments}
                                keyExtractor={(item, index) => String(index)}
                            />
                        </View>
                    ) : null}
                </ScrollView>
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

            {/* add comment section  */}
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

export default RoutineAllComments

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
        paddingVertical: 5,
        width: "95%"
    },
    commentCount: {
        color: Mycolors.THEME_BLACK,
        fontSize: 17,
        fontWeight: "500",
        padding: 8
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
        borderRadius: 5,
        flexDirection: "row",
        height: 60,
        justifyContent: "flex-end"
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
        top: -25,
        zIndex: 1
    },
    noCommentContainer: {
        alignItems: "center",
        position: 'absolute',
        top: dimensions.SCREEN_HEIGHT * 0.34,
        // bottom: "50%",
        justifyContent: "center",
        width: "100%",
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
    commentContainer: { flex: 1 },
    uploadImageContainer: { top: -60, position: "absolute" }
})

// loader part
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
