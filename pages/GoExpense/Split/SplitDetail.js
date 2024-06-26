//external imports
import {
    ActivityIndicator,
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
import ImagePicker from "react-native-image-crop-picker"
import React, { useEffect, useRef, useState } from "react"
import moment from "moment"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
//internal imports
import CameraGalleryModal from "./CameraGalleryModal"
import { requestGetApi, get_splitGroup, splitgroup_detil, split_comments, requestPostApiImages, edit_comments } from "../../../WebApi/Service"
import { useSelector, useDispatch } from 'react-redux';
// import CommonToast from "../../../constants/CommonToast"
import CustomHeader from "../Constants/CustomHeader"
import DeleteAlertModal from "../ExpenseManagment/DeleteAlertModal"
import EditCommentModal from "./EditCommentModal"
// import GroupServices from "../../../service/GroupServices"
import SplitBillUsers from "./SplitBillUsers"
import SplitComments from "./SplitComments"
import SplitDetailsProcess from "./SplitDetailsProcess"
// import SplitService from "../../../service/SplitService"
import UploadImageTab from "./UploadImageTab"
import { Mycolors } from "../../../utility/Mycolors"
import { useKeyboard } from '../../../pages/GoSchedule/Hooks/isKeyboardVisible'
import Toast from 'react-native-toast-message'
// "src/pages/GoSchedule/Hooks/isKeyboardVisible"

const SplitDetail = ({ navigation, route }) => {
    const User = useSelector(state => state.user.user_details)
    const [buttonLoader, setButtonLoader] = useState(false)
    const [cameraGalleryModal, setCameraGalleryModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    const [editModal, setEditModal] = useState(false)
    const [feedbackImage, setFeedbackImage] = useState([])
    const [monthlySplits, setMonthlySplits] = useState([])
    const [pageLoader, setPageLoader] = useState(false)
    const [selectedCommentId, setSelectedCommentId] = useState(0)
    const [selectedEditCommentData, setSelectedEditCommentData] = useState({})
    const [splitDetails, setSplitDetails] = useState({})
    const [splitId, setSplitId] = useState(route?.params?.data)
    const [taskComments, setTaskComments] = useState("")
    const [taskState, setTaskState] = useState(false)
    const isKeyBoardOpen = useKeyboard()
    const toastRef = useRef()

    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            setPageLoader(true)
            setSplitId(route?.params?.data)
            getData()
        })
        return unsubscribe
    }, [navigation])

    // function for get all monthly split bill data on api call
    const getData = async () => {
        setFeedbackImage([])
        const { responseJson, err } = await requestGetApi(splitgroup_detil + splitId, '', 'GET', User.token)
        console.log('my web details---->>', responseJson?.body?.monthlySplits)
        setPageLoader(false)
        setSplitDetails(responseJson?.body
        )
        setMonthlySplits(responseJson?.body?.monthlySplits)
        // SplitService.getSplitDetails(splitId)
        //     .then(response => {
        //         setPageLoader(false)
        //         setSplitDetails(response.data)
        //         setMonthlySplits(response?.data?.monthlysplits)
        //     })
        //     .catch(error => {
        //         setPageLoader(false)
        //         console.log(error)
        //     })
    }

    // function for open camera
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
            console.log("error in openLibrary", error)
        }
    }

    // function for open gallery
    const openLibrary = async () => {
        try {
            let imageList = []
            let value = await ImagePicker.openPicker({
                width: 1080,
                height: 1080,
                multiple: true,
                cropping: true,
                mediaType: "photo",
                compressImageQuality: 1,
                compressImageMaxHeight: 1080 / 2,
                compressImageMaxWidth: 1080 / 2
            }).then(image => {
                image.map(e => {
                    imageList.push({
                        name: e.path.slice(e.path.lastIndexOf("/"), e.path.length),
                        uri: e.path,
                        type: e.mime
                    })
                })
                setFeedbackImage(imageList)
                setCameraGalleryModal(false)
            })
        } catch (error) {
            setCameraGalleryModal(false)
            console.log("error in openLibrary", error)
        }
    }

    // list for uploaded images
    const renderUploadFeedbackImages = ({ item }) => {
        return <UploadImageTab commentImages={item} />
    }

    // list for added split bill users
    const renderAddedSplitBillUser = ({ item }) => {
        return <SplitBillUsers items={item} />
    }

    // list for monthly split bill progress bar
    const renderAddedSplitMonthlyProcess = ({ item }) => {
        return (
            <SplitDetailsProcess
                items={item}
                totalAmount={splitDetails?.totalamount}
            />
        )
    }

    // function for submit button click for api call to comment on split details
    const handleSubmitClick = async () => {
        Keyboard.dismiss()
        if (taskComments !== "") {
            setTaskState(false)
            setButtonLoader(true)
            const feedBackData = new FormData()
            if (feedbackImage !== null) {
                feedbackImage.map((e, index) => {
                    feedBackData.append(`files`, e)
                })
            }
            feedBackData.append("groupid", splitId)
            feedBackData.append("comment", taskComments)
            const { responseJson, err } = await requestPostApiImages(split_comments, feedBackData, 'POST', User.token)
            console.log('response of edit expanse------>>', responseJson);
            if (responseJson.headers.success == 1) {
                setButtonLoader(false)
                Toast.show({ text1: responseJson.headers.message });
                setTaskComments("")
                // navigation.replace("AllExpenses")
                getData()
            } else {
                setButtonLoader(false)
            }
            // if (responseJson.headers.success == 1) {
            //     setLoader(false)
            //     Toast.show({ text1: responseJson.headers.message });
            //     // navigation.replace("AllExpenses")
            //     // getData()
            // } else {
            //     setLoader(false)

            // }
            // SplitService.postSplitGroupComment(feedBackData)
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
    // function for open delete modal for delete comment
    const handleDeleteComment = selectedData => {
        setDeleteModal(true)
        setSelectedCommentId(selectedData?.id)
    }

    // function for delete button click for api call to delete the comment
    const deleteComment = () => {
        var data = { commentid: selectedCommentId }
        GroupServices.postDeleteComment(data)
            .then(response => {
                toastRef.current.getToast(response.data.message, "success")
                getData() //for refresh the task and comment section
            })
            .catch(error => {
                console.log(error)
            })
    }

    // function for open edit modal for edit comment
    const handleEditComment = selectedData => {
        setEditModal(true)
        setSelectedEditCommentData(selectedData)
    }

    // function for edit button click for api call to edit the comment
    const handleEditModalSubmitClick = async (
        taskComments,
        feedbackImage,
        deletedImagesId
    ) => {
        setEditModal(false)
        const commentData = new FormData()
        console.log();
        if (feedbackImage !== null) {
            feedbackImage.map((e, index) => {
                commentData.append('files', e)
            })

        }
        if (feedbackImage.length > 0) {
            commentData.append('object_type', 'C')
        }
        commentData.append("comment", taskComments)
        deletedImagesId.forEach(e => commentData.append("deletedimagesid[]", e))
        console.log('my appended data---->>>', commentData);
        const { responseJson, err } = await requestPostApiImages(edit_comments + selectedEditCommentData?.id, commentData, 'PUT', User.token)
        console.log('response of edit expanse------>>', edit_comments + selectedEditCommentData?.id);
        if (responseJson.headers.success == 1) {
            setButtonLoader(false)
            Toast.show({ text1: responseJson.headers.message });
            setTaskComments("")
            getData()
            console.log('jkjkjk comments---->>>', responseJson);
        } else {
            setButtonLoader(false)
            console.log('my errpr  comments---->>>',);
        }
        // GroupServices.postEditComment(commentData)
        //     .then(response => {
        //         toastRef.current.getToast(response.data.message, "success")
        //         getData() //for refresh the comment section after edit
        //     })
        //     .catch(error => {
        //         console.log(error)
        //     })
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            {/* header section */}
            <CustomHeader
                headerText={"Split Detail"}
                backButton={{
                    visible: true,
                    onClick: () => {
                        navigation.navigate(
                            "AddedSplit"
                        )
                    }
                }}
            />

            {/* body section */}
            <KeyboardAwareScrollView
                showsVerticalScrollIndicator={false}
                style={styles.body}
            >
                {!pageLoader ? (
                    <View style={styles.container}>
                        <View style={styles.direction}>
                            <View style={styles.titleContainer}>
                                <Text style={styles.splitTitle}>
                                    {splitDetails?.groupdetails?.groupname}
                                </Text>
                                <Text style={styles.amountText}>
                                    ${splitDetails?.totalamount}
                                </Text>
                                <Text style={styles.spendText}>Spend</Text>
                            </View>

                            <TouchableOpacity
                                style={styles.buttonContainer}
                                onPress={() => {
                                    navigation.navigate(
                                        "AddSplitBill",

                                        { data: splitId }

                                        // })
                                    )
                                }}
                            >
                                <Text style={styles.buttonText}>Add Bill</Text>
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.addedByText}>
                            Added by {splitDetails?.groupdetails?.groupusername} on
                            {moment(splitDetails?.groupdetails?.created_at).format(
                                "MMM DD, YYYY"
                            )}
                        </Text>

                        {/* user with their split amount section */}
                        <View>
                            {splitDetails?.details?.length > 0 ? (
                                <View style={{ paddingHorizontal: 8 }}>
                                    <FlatList
                                        data={splitDetails?.details}
                                        renderItem={renderAddedSplitBillUser}
                                        keyExtractor={(item, index) => String(index)}
                                    />
                                </View>
                            ) : null}

                            {/* description section */}
                            <View style={styles.descriptionContainer}>
                                <Text style={styles.textLine}>
                                    {splitDetails?.groupdetails?.groupdescription}
                                </Text>
                            </View>

                            {/* monthly process bar section */}
                            <View style={styles.processContainer}>
                                <FlatList
                                    data={monthlySplits}
                                    renderItem={renderAddedSplitMonthlyProcess}
                                    keyExtractor={(item, index) => String(index)}
                                />
                            </View>

                            {/* add more and split list button section */}
                            <View style={styles.buttonDirection}>
                                <TouchableOpacity
                                    style={styles.buttonContainer}
                                    onPress={() => {
                                        navigation.navigate(
                                            "SplitDetailViewMore",
                                            {
                                                data: splitId
                                            }
                                        )
                                    }
                                    }
                                >
                                    <Text style={styles.buttonText}>View More</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={styles.buttonContainer}
                                    onPress={() => {
                                        navigation.navigate("SplitList",
                                            {
                                                data: splitId
                                            }
                                        )
                                    }}
                                >
                                    <Text style={styles.buttonText}>Split List</Text>
                                </TouchableOpacity>
                            </View>

                            {/* comment section  */}
                            <View style={styles.buttonDirection}>
                                <Text style={styles.commentText}>Comments</Text>
                            </View>

                            {splitDetails?.groupdetails?.commentdetails?.length >= 0 ? (
                                <View style={styles.commentContainer}>
                                    <ScrollView nestedScrollEnabled={true}>
                                        {splitDetails?.groupdetails?.commentdetails?.map(item => {
                                            return (
                                                <SplitComments
                                                    items={item}
                                                    handleEditComment={handleEditComment}
                                                    handleDeleteComment={handleDeleteComment}
                                                />
                                            )
                                        })}
                                    </ScrollView>
                                </View>
                            ) : (
                                <View style={styles.noCommentContainer}>
                                    <Text style={styles.noCommentText}>No comment available</Text>
                                </View>
                            )}

                            {/* add comments section */}
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
                                                setTaskState(false)
                                                setTaskComments(text)
                                            }}
                                        />
                                        {/* error section is case of empty field  */}
                                        {taskState ? (
                                            <Text style={styles.errorText}>
                                                *Please add your comment.
                                            </Text>
                                        ) : (
                                            <Text style={styles.errorText} />
                                        )}

                                        {/* upload image section  */}
                                        {console.log('my images from tha tab--->>', feedbackImage)}
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
                                            source={require("../../../assets/Remindably/cameraIcon.png")}
                                        />
                                    </TouchableOpacity>

                                    {!buttonLoader ? (
                                        <TouchableOpacity
                                            style={styles.submitButtonContainer}
                                            onPress={() => {
                                                handleSubmitClick()
                                            }}
                                        >
                                            <Text style={styles.submitText}>Send</Text>
                                        </TouchableOpacity>
                                    ) : (
                                        <View style={styles.submitButtonContainer}>
                                            <ActivityIndicator color={Mycolors.WHITE} />
                                        </View>
                                    )}
                                </View>
                            </View>
                        </View>
                    </View>
                ) : (
                    <View style={styles.loaderContainer}>
                        <ActivityIndicator size="large" color={Mycolors.THEME_ORANGE} />
                    </View>
                )}

                {/* Camera Gallery Modal  */}
                <CameraGalleryModal
                    visibleModal={cameraGalleryModal}
                    onClose={() => {
                        setCameraGalleryModal(false)
                    }}
                    cameraClick={openCamera}
                    galleryClick={openLibrary}
                />

                {/* Edit comment modal  */}
                <EditCommentModal
                    commentDetails={selectedEditCommentData}
                    visibleModal={editModal}
                    onClose={() => {
                        setEditModal(false)
                    }}
                    onSubmitClick={handleEditModalSubmitClick}
                />

                {/* Delete alert modal  */}
                <DeleteAlertModal
                    visibleModal={deleteModal}
                    onRequestClosed={() => {
                        setDeleteModal(false)
                    }}
                    onPressRightButton={() => {
                        setDeleteModal(false)
                        deleteComment()
                    }}
                    subHeading={"Are you sure you want to delete this comment ?"}
                />

                {/* toaster message for error response from API  */}
                {/* <CommonToast ref={toastRef} /> */}
            </KeyboardAwareScrollView>
        </KeyboardAvoidingView>
    )
}

export default SplitDetail

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    body: {
        padding: 10,
        flex: 1
    },
    direction: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    titleContainer: {
        paddingHorizontal: 5,
        width: "70%"
    },
    splitTitle: {
        color: Mycolors.THEME_BLACK,
        fontSize: 18,
        fontWeight: "400"
    },
    addedByText: {
        color: Mycolors.textGray,
        fontSize: 14,
        fontWeight: "500"
    },
    amountText: {
        color: Mycolors.THEME_BLACK,
        fontSize: 18,
        fontWeight: "500"
    },
    spendText: {
        color: Mycolors.THEME_ORANGE,
        fontSize: 14,
        fontWeight: "400"
    },
    imageContainer: {
        backgroundColor: Mycolors.WHITE,
        borderRadius: 50,
        height: 30,
        width: 30
    },
    image: {
        borderRadius: 50,
        height: "100%",
        width: "100%"
    },
    textLine: {
        color: Mycolors.THEME_BLACK,
        fontSize: 14,
        fontWeight: "400",
        paddingHorizontal: 10,
        textAlign: "justify"
    },
    descriptionContainer: {
        height: "auto",
        marginVertical: 5,
        padding: 5
    },
    processContainer: { height: 120, marginVertical: 10 },
    buttonDirection: {
        flexDirection: "row",
        justifyContent: "space-between",
        margin: 5
    },
    buttonContainer: {
        alignItems: "center",
        backgroundColor: Mycolors.THEME_ORANGE,
        borderRadius: 50,
        height: 40,
        justifyContent: "center",
        width: 100
    },
    buttonText: {
        color: Mycolors.WHITE,
        fontSize: 14,
        fontWeight: "500",
        padding: 10
    },
    commentText: {
        color: Mycolors.THEME_BLACK,
        fontSize: 16,
        fontWeight: "500"
    },
    commentContainer: {
        height: 250,
        paddingBottom: 40
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
        top: -35
    },
    noCommentContainer: {
        alignItems: "center",
        height: 250,
        justifyContent: "center",
        paddingBottom: 40
    },
    noCommentText: {
        color: Mycolors.THEME_BLACK,
        fontSize: 18,
        fontWeight: "500",
        padding: 20
    },
    uploadImageContainer: {
        position: "absolute",
        top: -60
    },
    loaderContainer: {
        alignSelf: "center",
        flex: 1,
        justifyContent: "center"
    }
})
