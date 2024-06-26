// //external imports
// import {
//     FlatList,
//     Image,
//     Keyboard,
//     KeyboardAvoidingView,
//     Modal,
//     Platform,
//     ScrollView,
//     StyleSheet,
//     Text,
//     TextInput,
//     TouchableOpacity,
//     View
// } from "react-native"
// import ImagePicker from "react-native-image-crop-picker"
// import React, { useEffect, useState } from "react"
// // import { Formik } from "formik"
// import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
// //internal imports
// import CameraGalleryModal from "./CameraGalleryModal"
// import CommentImageOnEditModal from "./CommentImageOnEditModal"
// import CommentImagesTab from "./CommentImagesTab"
// import SubmitButton from "../../Constants/SubmitButton"
// // import { colors } from "../../constants/ColorConstant"
// //   import { comment } from "../../constants/SchemaValidation"
// import { Mycolors } from "../../../../utility/Mycolors"
// const EditCommentModal = ({
//     commentDetails,
//     onClose,
//     onSubmitClick,
//     visibleModal
// }) => {
//     console.log('my edit commenrssstsss------', visibleModal);
//     const [arrayList, setArrayList] = useState([])
//     const [cameraGalleryModal, setCameraGalleryModal] = useState(false)
//     const [deletedImageId, setDeletedImageId] = useState([])
//     const [feedbackImage, setFeedbackImage] = useState([])
//     const [headingTitle, setHeadingTitle] = useState('')
//     useEffect(() => {
//         setFeedbackImage([])
//         // for preselected images
//         // setMyComment(commentDetails)
//         setHeadingTitle(commentDetails?.comment)
//         if (commentDetails?.commentimages != null) {
//             let imageId = commentDetails?.commentimages.map(e => e.imageid)
//             setArrayList(imageId) //for pre selected images id
//         }
//     }, [onSubmitClick, visibleModal])

//     // function for open camera
//     const openCamera = async () => {
//         try {
//             let value = await ImagePicker.openCamera({
//                 width: 1080,
//                 height: 1080,
//                 cropping: true,
//                 mediaType: "photo",
//                 compressImageQuality: 1,
//                 compressImageMaxHeight: 1080 / 2,
//                 compressImageMaxWidth: 1080 / 2
//             }).then(image => {
//                 const img = {
//                     name: image.path.slice(
//                         image.path.lastIndexOf("/"),
//                         image.path.length
//                     ),
//                     uri: image.path,
//                     type: image.mime
//                 }
//                 setFeedbackImage([img])
//                 setCameraGalleryModal(false)
//             })
//         } catch (error) {
//             setCameraGalleryModal(false)
//             console.log("error in openLibrary", error)
//         }
//     }

//     // function for open gallery
//     const openLibrary = async () => {
//         try {
//             let imageList = []
//             let value = await ImagePicker.openPicker({
//                 width: 1080,
//                 height: 1080,
//                 cropping: true,
//                 multiple: true,
//                 mediaType: "photo",
//                 compressImageQuality: 1,
//                 compressImageMaxHeight: 1080 / 2,
//                 compressImageMaxWidth: 1080 / 2
//             }).then(image => {
//                 image.map(e => {
//                     imageList.push({
//                         name: e.path.slice(e.path.lastIndexOf("/"), e.path.length),
//                         uri: e.path,
//                         type: e.mime
//                     })
//                 })
//                 setFeedbackImage(imageList)
//                 setCameraGalleryModal(false)
//             })
//         } catch (error) {
//             setCameraGalleryModal(false)
//             console.log("error in openLibrary", error)
//         }
//     }

//     // list for images
//     const renderPreAddedSubCommentsImages = ({ item }) => {
//         console.log('item for renderPreAddedSubCommentsImages', item);
//         return (
//             <CommentImageOnEditModal
//                 commentImages={item}
//                 removeImage={handleRemoveImage}
//                 checkedList={arrayList}
//             />
//         )
//     }

//     // function on remove click on image
//     const handleRemoveImage = selectedImagesId => {
//         if (arrayList.includes(selectedImagesId)) {
//             setArrayList(arrayList.filter(ids => ids !== selectedImagesId))
//             setDeletedImageId(arrayList.filter(ids => ids == selectedImagesId))
//         }
//     }

//     // list for added comments image
//     const renderAddedSubCommentsImages = ({ item }) => {
//         return <CommentImagesTab commentImages={item} />
//     }

//     // function for submit button click
//     const onSubmit = values => {
//         Keyboard.dismiss()
//         onSubmitClick(values.commentText, feedbackImage, deletedImageId)
//     }

//     const initialValues = {
//         commentText: commentDetails.comment ? commentDetails.comment : ""
//     }

//     return (
//         /////back modal

//         // <KeyboardAvoidingView
//         //     behavior={Platform.OS === "ios" ? "padding" : "height"}
//         //     style={styles.container}
//         // >
//         //     <KeyboardAwareScrollView
//         //         showsVerticalScrollIndicator={false}
//         //         style={styles.body}
//         //     >
//         //         <Modal
//         //             animationType="fade"
//         //             transparent={true}
//         //             visible={visibleModal}
//         //             onRequestClose={() => {
//         //                 onClose()
//         //             }}
//         //         >
//         //             <View styles={styles.backupp}
//         //                 // validationSchema={comment}
//         //                 // initialValues={initialValues}
//         //                 onSubmit={values => {
//         //                     onSubmit(values)
//         //                 }}
//         //             // }}
//         //             >
//         //                 {({
//         //                     // handleChange,
//         //                     // handleBlur,
//         //                     handleSubmit,
//         //                     // values,
//         //                     // errors,
//         //                     // touched,
//         //                     // setFieldTouched
//         //                 }) => (
//         //                     // <View style={styles.centeredView}>
//         //                     //     <View style={styles.modalViewGroup}>
//         //                     //         <ScrollView showsVerticalScrollIndicator={false}>
//         //                     //             {/* cross button section  */}
//         //                     //             <TouchableOpacity
//         //                     //                 style={styles.crossContainer}
//         //                     //                 onPress={() => {
//         //                     //                     onClose()
//         //                     //                 }}
//         //                     //             >
//         //                     //                 <Image
//         //                     //                     style={styles.imageStyle}
//         //                     //                     resizeMode="contain"
//         //                     //                     source={require("../../../../assets/Remindably/cross.png")}
//         //                     //                 />
//         //                     //             </TouchableOpacity>

//         //                     //             <View style={styles.direction}>
//         //                     //                 <Text style={styles.headerText}>Edit your comment</Text>
//         //                     //             </View>
//         //                     //             <TextInput
//         //                     //                 style={styles.textInput}
//         //                     //                 value={headingTitle}
//         //                     //                 onChangeText={(e) => setHeadingTitle(e)}

//         //                     //             />

//         //                     //             <Text style={styles.errorMessage}>

//         //                     //             </Text>

//         //                     //             {/* feedback image section  */}
//         //                     //             {console.log('commentimages from my tab', commentDetails
//         //                     //             )}
//         //                     //             {commentDetails?.commentimages
//         //                     //                 ?.length >= 0 ? (
//         //                     //                 <FlatList
//         //                     //                     data={commentDetails?.commentimages
//         //                     //                     }
//         //                     //                     horizontal={true}
//         //                     //                     showsHorizontalScrollIndicator={false}
//         //                     //                     renderItem={renderPreAddedSubCommentsImages}
//         //                     //                     keyExtractor={(item, index) => String(index)}
//         //                     //                 />
//         //                     //             ) : null}

//         //                     //             {feedbackImage?.length >= 0 ? (
//         //                     //                 <View style={{ marginTop: 10 }}>
//         //                     //                     <FlatList
//         //                     //                         data={feedbackImage}
//         //                     //                         horizontal={true}
//         //                     //                         showsHorizontalScrollIndicator={false}
//         //                     //                         renderItem={renderAddedSubCommentsImages}
//         //                     //                         keyExtractor={(item, index) => String(index)}
//         //                     //                     />
//         //                     //                 </View>
//         //                     //             ) : null}

//         //                     //             <View>
//         //                     //                 <TouchableOpacity
//         //                     //                     onPress={() => setCameraGalleryModal(true)}
//         //                     //                     style={styles.uploadMediaContainer}
//         //                     //                 >
//         //                     //                     <Image
//         //                     //                         style={styles.uploadImageStyle}
//         //                     //                         resizeMode="contain"
//         //                     //                         source={require("../../../../assets/Remindably/UploadMedia.png")}
//         //                     //                     />
//         //                     //                     <Text style={styles.uploadMediaText}>Upload Media</Text>
//         //                     //                 </TouchableOpacity>

//         //                     //                 {/* save group button  */}
//         //                     //                 <SubmitButton
//         //                     //                     buttonText={"Submit"}
//         //                     //                     submitButton={handleSubmit}
//         //                     //                 />
//         //                     //             </View>
//         //                     //         </ScrollView>
//         //                     //     </View>
//         //                     // </View>
//         //                     <View>
//         //                         <Text>kkkk</Text>
//         //                     </View>
//         //                 )}
//         //             </View>

//         //             {Platform.OS === "ios" ? (
//         //                 <CameraGalleryModal
//         //                     visibleModal={cameraGalleryModal}
//         //                     onClose={() => {
//         //                         setCameraGalleryModal(false)
//         //                     }}
//         //                     cameraClick={openCamera}
//         //                     galleryClick={openLibrary}
//         //                 />
//         //             ) : null}
//         //         </Modal>

//         //         {/* Camera Gallery Modal  */}
//         //         <CameraGalleryModal
//         //             visibleModal={cameraGalleryModal}
//         //             onClose={() => {
//         //                 setCameraGalleryModal(false)
//         //             }}
//         //             cameraClick={openCamera}
//         //             galleryClick={openLibrary}
//         //         />
//         //     </KeyboardAwareScrollView>
//         // </KeyboardAvoidingView>



//         <KeyboardAvoidingView
//             behavior={Platform.OS === "ios" ? "padding" : "height"}
//             style={styles.container}
//         >
//             <KeyboardAwareScrollView
//                 showsVerticalScrollIndicator={false}
//                 style={styles.body}
//             >
//                 <View
//                 // validationSchema={searchMemberValidation}
//                 // initialValues={initialValues}
//                 // onSubmit={values => {
//                 //     onSubmit(values)
//                 // }}
//                 >
//                     {/* {({
//                      handleChange,
//                      handleBlur,
//                     handleSubmit,
//                      values,
//                      errors,
//                      touched,
//                     setFieldTouched
//                 }) => ( */}
//                     <Modal
//                         animationType="fade"
//                         transparent={true}
//                         visible={visibleModal}
//                         onRequestClose={() => {
//                             // onClose()
//                         }}
//                     >
//                         <View style={styles.centeredView}>
//                             <View style={styles.modalViewEmailId}>
//                                 <ScrollView showsVerticalScrollIndicator={false} style={{ height: '80%' }}>
//                                     {/* cross button section  */}
//                                     <TouchableOpacity
//                                         style={styles.crossContainer}
//                                         onPress={() => {
//                                             // onClose()
//                                         }}
//                                     >
//                                         <Image
//                                             style={styles.image}
//                                             resizeMode="contain"
//                                             source={require("../../../../assets/Remindably/cross.png")}
//                                         />
//                                     </TouchableOpacity>

//                                     <View style={styles.imageContainer}>
//                                         <Image
//                                             resizeMode="contain"
//                                             source={require("../../../../assets/Remindably/memberEmailId.png")}
//                                         />
//                                     </View>
//                                     {/* user invite section  */}
//                                     <View>



//                                         {/* display search box on search icon click  */}

//                                         {/*recently added members  */}
//                                         <View styles={{ alignContent: 'center', backgroundColor: 'red' }}
//                                             // validationSchema={comment}
//                                             // initialValues={initialValues}
//                                             onSubmit={values => {
//                                                 onSubmit(values)
//                                             }}
//                                         // }}
//                                         >
//                                             {({
//                                                 // handleChange,
//                                                 // handleBlur,
//                                                 // handleSubmit,
//                                                 // values,
//                                                 // errors,
//                                                 // touched,
//                                                 // setFieldTouched
//                                             }) => (
//                                                 <>
//                                                     <View style={styles.centeredView}>
//                                                         <View style={styles.modalViewGroup}>
//                                                             <ScrollView showsVerticalScrollIndicator={false}>
//                                                                 {/* cross button section  */}
//                                                                 {/* <TouchableOpacity
//                                                                     style={styles.crossContainer}
//                                                                     onPress={() => {
//                                                                         onClose()
//                                                                     }}
//                                                                 >
//                                                                     <Image
//                                                                         style={styles.imageStyle}
//                                                                         resizeMode="contain"
//                                                                         source={require("../../../../assets/Remindably/cross.png")}
//                                                                     />
//                                                                 </TouchableOpacity> */}
//                                                                 <View style={styles.direction}>
//                                                                     <Text style={styles.headerText}>Edit your comment</Text>
//                                                                 </View>
//                                                                 <TextInput
//                                                                     style={styles.textInput}
//                                                                     value={headingTitle}
//                                                                     onChangeText={(e) => setHeadingTitle(e)}

//                                                                 />

//                                                                 <Text style={styles.errorMessage}>

//                                                                 </Text>

//                                                                 {/* feedback image section  */}
//                                                                 {console.log('commentimages from my tab', commentDetails
//                                                                 )}
//                                                                 {commentDetails?.commentimages
//                                                                     ?.length >= 0 ? (
//                                                                     <FlatList
//                                                                         data={commentDetails?.commentimages
//                                                                         }
//                                                                         horizontal={true}
//                                                                         showsHorizontalScrollIndicator={false}
//                                                                         renderItem={renderPreAddedSubCommentsImages}
//                                                                         keyExtractor={(item, index) => String(index)}
//                                                                     />
//                                                                 ) : null}

//                                                                 {feedbackImage?.length >= 0 ? (
//                                                                     <View style={{ marginTop: 10 }}>
//                                                                         <FlatList
//                                                                             data={feedbackImage}
//                                                                             horizontal={true}
//                                                                             showsHorizontalScrollIndicator={false}
//                                                                             renderItem={renderAddedSubCommentsImages}
//                                                                             keyExtractor={(item, index) => String(index)}
//                                                                         />
//                                                                     </View>
//                                                                 ) : null}

//                                                                 <View>
//                                                                     <TouchableOpacity
//                                                                         onPress={() => setCameraGalleryModal(true)}
//                                                                         style={styles.uploadMediaContainer}
//                                                                     >
//                                                                         <Image
//                                                                             style={styles.uploadImageStyle}
//                                                                             resizeMode="contain"
//                                                                             source={require("../../../../assets/Remindably/UploadMedia.png")}
//                                                                         />
//                                                                         <Text style={styles.uploadMediaText}>Upload Media</Text>
//                                                                     </TouchableOpacity>

//                                                                     {/* save group button  */}
//                                                                     <SubmitButton
//                                                                         buttonText={"Submit"}
//                                                                         submitButton={handleSubmit}
//                                                                     />
//                                                                 </View>
//                                                             </ScrollView>
//                                                         </View>
//                                                     </View>
//                                                     <View>
//                                                         <Text>kkkk</Text>
//                                                     </View>
//                                                 </>
//                                             )}

//                                         </View>

//                                     </View>


//                                 </ScrollView>
//                             </View>
//                         </View>

//                         {/* Modal for purchase plan*/}

//                         {/* toaster message for error response from API  */}
//                         {/* <CommonToast ref={toastRef} /> */}
//                     </Modal>
//                     {/* )} */}
//                 </View>
//             </KeyboardAwareScrollView >
//         </KeyboardAvoidingView >




//         // <View style={{ backgroundColor: 'red', alignItems: 'center', height: '50%', width: '50%' }}>
//         //     <Text>kkkkkks</Text>
//         // </View>
//     )
// }

// export default EditCommentModal

// const styles = StyleSheet.create({
//     container: { flex: 1, },
//     body: {
//         flex: 1,
//         padding: 5,

//     },
//     centeredView: {
//         // backgroundColor: "rgba(0, 0, 0, 0.66)",
//         // flex: 1,
//         // position: 'absolute',
//         // top: 40,
//         // width: '100%'
//         backgroundColor: 'white',
//         position: 'absolute',
//         top: 100,
//         height: 500

//     },
//     modalViewGroup: {
//         backgroundColor: 'white',
//         borderRadius: 30,
//         height: 'auto',
//         paddingHorizontal: 50,
//         paddingVertical: 40,


//     },
//     textInput: {
//         borderColor: Mycolors.brightGray,
//         borderRadius: 8,
//         borderWidth: 1,
//         color: Mycolors.THEME_BLACK,
//         fontSize: 16,
//         padding: 15
//     },
//     errorMessage: {
//         color: Mycolors.RED,
//         padding: 10
//     },
//     uploadMediaContainer: {
//         alignItems: "center",
//         backgroundColor: Mycolors.WHITE,
//         borderColor: Mycolors.THEME_ORANGE,
//         borderRadius: 50,
//         borderStyle: "dotted",
//         borderWidth: 2,
//         flexDirection: "row",
//         height: 60,
//         justifyContent: "center",
//         marginVertical: 20
//     },
//     uploadImageStyle: {
//         height: 30,
//         paddingHorizontal: 25,
//         width: 30
//     },
//     uploadMediaText: {
//         color: Mycolors.THEME_BLACK,
//         fontSize: 14,
//         fontWeight: "400"
//     },
//     imageStyle: {
//         borderRadius: 10,
//         height: "100%",
//         width: "100%"
//     },
//     headerText: {
//         color: Mycolors.THEME_BLACK,
//         fontSize: 20,
//         fontWeight: "500",
//         marginBottom: 15
//     },
//     direction: {
//         flexDirection: "row",
//         justifyContent: "space-between"
//     },
//     crossContainer: {
//         backgroundColor: Mycolors.THEME_ORANGE,
//         borderRadius: 50,
//         height: 30,
//         position: "absolute",
//         right: 10,
//         top: 0,
//         width: 30,
//         zIndex: 1
//     }
// })


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
import SubmitButton from "../../Constants/SubmitButton"
import { Mycolors, dimensions } from "../../../../utility/Mycolors"
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
    console.log('my comments edit modal---->>', comments);

    useEffect(() => {
        console.log('hhhyhyhyh------>>>', commentDetails.comment
        );
        setComments(commentDetails.comment)
        setFeedbackImage([])
        // for preselected images
        if (commentDetails?.commentimages != null) {
            let imageId = commentDetails?.commentimages.map(e => e.imageid)
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
        { console.log('my renderPreAddedSubCommentsImage ', item); }
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
                                            source={require("../../../../assets/Remindably/cross.png")}
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
                                    { }
                                    {commentDetails?.commentimages?.length >= 0 ? (
                                        <FlatList

                                            data={commentDetails?.commentimages}
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
                                                source={require("../../../../assets/Remindably/UploadMedia.png")}
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
