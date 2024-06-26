

//external imports
import {
    FlatList,
    Image,
    Keyboard,
    KeyboardAvoidingView,
    Modal,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native"
import ImagePicker from "react-native-image-crop-picker"
import React, { useEffect, useState } from "react"
// import { Formik } from "formik"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
//internal imports
import CameraGalleryModal from "./CameraGalleryModal"
import CommentImageOnEditModal from "./CommentImageOnEditModal"
import CommentImagesTab from "./CommentImagesTab"
import SubmitButton from "../Constants/SubmitButton"
import { Mycolors, dimensions } from '../../../utility/Mycolors'

//   import { comment } from "../../constants/SchemaValidation"

const EditCommentModal = ({
    commentDetails,
    onClose,
    onSubmitClick,
    visibleModal
}) => {
    const [arrayList, setArrayList] = useState([])
    const [cameraGalleryModal, setCameraGalleryModal] = useState(false)
    const [deletedImageId, setDeletedImageId] = useState([])
    const [feedbackImage, setFeedbackImage] = useState([])
    const [comments, setComments] = useState(commentDetails.comment)
    console.log('my comments edit modal---->>', commentDetails
    );

    useEffect(() => {
        console.log('hhhyhyhyh------>>>', commentDetails?.commentImage
        );
        setComments(commentDetails.comment)
        setFeedbackImage([])
        setDeletedImageId([])
        // for preselected images
        if (commentDetails?.commentImage
            != null) {
            let imageId = commentDetails?.commentImage
                .map(e => e.imageid)
            setArrayList(imageId) //for pre selected images id
        }
    }, [visibleModal])

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
                cropping: true,
                multiple: true,
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

    // list for images
    const renderPreAddedSubCommentsImages = ({ item }) => {
        { console.log('my renderPreAddedSubCommentsImage', item); }
        return (
            <CommentImageOnEditModal
                commentImages={item}
                removeImage={handleRemoveImage}
                checkedList={arrayList}
            />
        )
    }

    // function on remove click on image
    const handleRemoveImage = selectedImagesId => {
        if (arrayList.includes(selectedImagesId)) {
            setArrayList(arrayList.filter(ids => ids !== selectedImagesId))
            setDeletedImageId(arrayList.filter(ids => ids == selectedImagesId))
        }
    }

    // list for added comments image
    const renderAddedSubCommentsImages = ({ item }) => {
        return <CommentImagesTab commentImages={item} />
    }

    // function for submit button click
    const onSubmit = () => {
        Keyboard.dismiss()
        onSubmitClick(comments, feedbackImage, deletedImageId)
    }

    const initialValues = {
        commentText: commentDetails.comment ? commentDetails.comment : ""
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <KeyboardAwareScrollView
                showsVerticalScrollIndicator={false}
                style={styles.body}
            >
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={visibleModal}
                    onRequestClose={() => {
                        onClose()
                    }}
                >
                    <View
                    // validationSchema={comment}
                    // initialValues={initialValues}
                    // onSubmit={values => {
                    //     onSubmit(values)
                    // }}
                    >
                        {/* {({
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            values,
                            errors,
                            touched,
                            setFieldTouched
                        }) => ( */}
                        <View style={styles.centeredView}>
                            <View style={styles.modalViewGroup}>
                                <ScrollView showsVerticalScrollIndicator={false}>
                                    {/* cross button section  */}
                                    <TouchableOpacity
                                        style={styles.crossContainer}
                                        onPress={() => {
                                            onClose()
                                        }}
                                    >
                                        <Image
                                            style={styles.imageStyle}
                                            resizeMode="contain"
                                            source={require("../../../assets/Remindably/cross.png")}
                                        />
                                    </TouchableOpacity>

                                    <View style={styles.direction}>
                                        <Text style={styles.headerText}>Edit your comment</Text>
                                    </View>
                                    <TextInput
                                        style={styles.textInput}
                                        value={comments}
                                        onChangeText={(text) => {
                                            setComments(text)
                                        }}
                                    // onChangeText={handleChange("commentText")}
                                    // onBlur={() => {
                                    //     handleBlur("commentText")
                                    //     setFieldTouched("commentText")
                                    // }}
                                    />

                                    <Text style={styles.errorMessage}>
                                        {/* {touched.commentText && errors.commentText} */}
                                    </Text>

                                    {/* feedback image section  */}
                                    {console.log('tytytyt bhbhbhb----..>>>', commentDetails?.commentImage)}
                                    {commentDetails?.commentImage?.length >= 0 ? (
                                        <FlatList

                                            data={commentDetails?.commentImage}
                                            horizontal={true}
                                            showsHorizontalScrollIndicator={false}
                                            renderItem={renderPreAddedSubCommentsImages}
                                            keyExtractor={(item, index) => String(index)}
                                        />
                                    ) : null}

                                    {feedbackImage?.length >= 0 ? (
                                        <View style={{ marginTop: 10 }}>
                                            <FlatList
                                                data={feedbackImage}
                                                horizontal={true}
                                                showsHorizontalScrollIndicator={false}
                                                renderItem={renderAddedSubCommentsImages}
                                                keyExtractor={(item, index) => String(index)}
                                            />
                                        </View>
                                    ) : null}

                                    <View>
                                        <TouchableOpacity
                                            onPress={() => setCameraGalleryModal(true)}
                                            style={styles.uploadMediaContainer}
                                        >
                                            <Image
                                                style={styles.uploadImageStyle}
                                                resizeMode="contain"
                                                source={require("../../../assets/Remindably/UploadMedia.png")}
                                            />
                                            <Text style={styles.uploadMediaText}>Upload Media</Text>
                                        </TouchableOpacity>

                                        {/* save group button  */}
                                        <TouchableOpacity onPress={() => onSubmit()}>
                                            <SubmitButton
                                                buttonText={"Post"}
                                            // submitButton={handleSubmit}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </ScrollView>
                            </View>
                        </View>
                        {/* )} */}
                    </View>

                    {Platform.OS === "ios" ? (
                        <CameraGalleryModal
                            visibleModal={cameraGalleryModal}
                            onClose={() => {
                                setCameraGalleryModal(false)
                            }}
                            cameraClick={openCamera}
                            galleryClick={openLibrary}
                        />
                    ) : null}
                </Modal>

                {/* Camera Gallery Modal  */}
                <CameraGalleryModal
                    visibleModal={cameraGalleryModal}
                    onClose={() => {
                        setCameraGalleryModal(false)
                    }}
                    cameraClick={openCamera}
                    galleryClick={openLibrary}
                />
            </KeyboardAwareScrollView>
        </KeyboardAvoidingView>
    )
}

export default EditCommentModal

const styles = StyleSheet.create({
    container: { flex: 1 },
    body: {
        flex: 1,
        padding: 5
    },
    centeredView: {
        backgroundColor: "rgba(0, 0, 0, 0.66)",
        justifyContent: 'center',

        width: '100%',
        height: dimensions.SCREEN_HEIGHT
    },
    modalViewGroup: {
        backgroundColor: Mycolors.WHITE,
        borderRadius: 30,
        height: 'auto',
        paddingHorizontal: 20,
        paddingVertical: 40,

    },
    textInput: {
        borderColor: Mycolors.brightGray,
        borderRadius: 8,
        borderWidth: 1,
        color: Mycolors.THEME_BLACK,
        fontSize: 16,
        padding: 15
    },
    errorMessage: {
        color: Mycolors.RED,
        padding: 10
    },
    uploadMediaContainer: {
        alignItems: "center",
        backgroundColor: Mycolors.WHITE,
        borderColor: Mycolors.THEME_ORANGE,
        borderRadius: 50,
        borderStyle: "dotted",
        borderWidth: 2,
        flexDirection: "row",
        height: 60,
        justifyContent: "center",
        marginVertical: 20
    },
    uploadImageStyle: {
        height: 30,
        paddingHorizontal: 25,
        width: 30
    },
    uploadMediaText: {
        color: Mycolors.THEME_BLACK,
        fontSize: 14,
        fontWeight: "400"
    },
    imageStyle: {
        borderRadius: 10,
        height: "100%",
        width: "100%"
    },
    headerText: {
        color: Mycolors.THEME_BLACK,
        fontSize: 20,
        fontWeight: "500",
        marginBottom: 15
    },
    direction: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    crossContainer: {
        backgroundColor: Mycolors.THEME_ORANGE,
        borderRadius: 50,
        height: 30,
        position: "absolute",
        right: 10,
        top: 0,
        width: 30,
        zIndex: 1
    }
})
