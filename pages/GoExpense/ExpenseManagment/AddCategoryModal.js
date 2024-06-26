//external imports
// import {
//     Image,
//     Keyboard,
//     KeyboardAvoidingView,
//     Modal,
//     Platform,
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
// // import ExpensesManagementService from "../../service/ExpensesManagementService"
// import SubmitButton from "../Constants/SubmitButton"
// // import { categoryValidation } from "../../constants/SchemaValidation"
// import { Mycolors } from "../../../utility/Mycolors"

// const AddCategoryModal = ({
//     mainCategory,
//     onClose,
//     onSubmitClick,
//     visibleModal
// }) => {
//     const [cameraGalleryModal, setCameraGalleryModal] = useState(false)
//     const [profileImage, setProfileImage] = useState("")

//     useEffect(() => {
//         setProfileImage("")
//     }, [visibleModal])

//     // function for submit button click for api call to add category
//     const onSubmit = values => {
//         Keyboard.dismiss()
//         const data = new FormData()
//         if (profileImage != "") {
//             const imageName = profileImage.path.slice(
//                 profileImage.path.lastIndexOf("/"),
//                 profileImage.path.length
//             )
//             data.append("categoryimage", {
//                 name: imageName,
//                 type: profileImage.mime,
//                 uri: profileImage.path
//             })
//         }
//         data.append("category_type", mainCategory)
//         // data.append("name", values.name)
//         ExpensesManagementService.postAddCategory(data)
//             .then(response => {
//                 onSubmitClick(response.data.categoryid)
//             })
//             .catch(error => {
//                 console.log(error)
//             })
//     }

//     const initialValues = {
//         name: ""
//     }

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
//                 setProfileImage(image)
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
//             let value = await ImagePicker.openPicker({
//                 width: 1080,
//                 height: 1080,
//                 cropping: true,
//                 mediaType: "photo",
//                 compressImageQuality: 1,
//                 compressImageMaxHeight: 1080 / 2,
//                 compressImageMaxWidth: 1080 / 2
//             }).then(image => {
//                 setProfileImage(image)
//                 setCameraGalleryModal(false)
//             })
//         } catch (error) {
//             setCameraGalleryModal(false)
//             console.log("error in openLibrary", error)
//         }
//     }

//     return (
//         <KeyboardAvoidingView
//             behavior={Platform.OS === "ios" ? "padding" : "height"}
//             style={styles.container}
//         >
//             <KeyboardAwareScrollView
//                 showsVerticalScrollIndicator={false}
//                 style={styles.body}
//             >
//                 <Modal
//                     animationType="fade"
//                     transparent={true}
//                     visible={visibleModal}
//                     onRequestClose={() => {
//                         onClose()
//                     }}
//                 >
//                     <View
//                     // validationSchema={categoryValidation}
//                     // initialValues={initialValues}
//                     // onSubmit={values => {
//                     //     onSubmit(values)
//                     // }}
//                     >
//                         {/* {({
//                             handleChange,
//                             handleBlur,
//                             handleSubmit,
//                             values,
//                             errors,
//                             touched,
//                             setFieldTouched
//                         }) => ( */}
//                         <View style={styles.centeredView}>
//                             <View style={styles.modalViewEmailId}>
//                                 {/* cross button section  */}
//                                 <TouchableOpacity
//                                     style={styles.crossContainer}
//                                     onPress={() => {
//                                         onClose()
//                                     }}
//                                 >
//                                     <Image
//                                         style={styles.image}
//                                         resizeMode="contain"
//                                         source={require("../../../assets/Remindably/cross.png")}
//                                     />
//                                 </TouchableOpacity>

//                                 <Text style={styles.cardLabel}>Add new category</Text>

//                                 <TextInput
//                                     placeholder="Enter category name"
//                                     placeholderTextColor={Mycolors.textGray}
//                                     style={styles.textInput}
//                                 // value={values.name}
//                                 // onChangeText={handleChange("name")}
//                                 // onBlur={() => {
//                                 //     handleBlur("name")
//                                 //     setFieldTouched("name")
//                                 // }}
//                                 />
//                                 {/* <Text style={styles.errorMessage}>
//                                     {touched.name && errors.name}
//                                 </Text> */}

//                                 {/* uploded media section  */}
//                                 {profileImage !== "" ? (
//                                     <View style={styles.uploadMediaBox}>
//                                         <Image
//                                             style={styles.imageStyle}
//                                             resizeMode="contain"
//                                             source={{ uri: `${profileImage?.path}` }}
//                                         />
//                                     </View>
//                                 ) : null}

//                                 {/* upload image section */}
//                                 <TouchableOpacity
//                                     onPress={() => setCameraGalleryModal(true)}
//                                     style={styles.uploadMediaContainer}
//                                 >
//                                     <Image
//                                         style={styles.uploadImageStyle}
//                                         resizeMode="contain"
//                                         source={require("../../../assets/Remindably/UploadMedia.png")}
//                                     />
//                                     <Text style={styles.uploadMediaText}>
//                                         Upload category image
//                                     </Text>
//                                 </TouchableOpacity>

//                                 {/*save button section */}
//                                 <SubmitButton
//                                     buttonText={"Add"}
//                                 // submitButton={() => {
//                                 //     handleSubmit()
//                                 // }}
//                                 />
//                                 {Platform.OS === "ios" ? (
//                                     <CameraGalleryModal
//                                         visibleModal={cameraGalleryModal}
//                                         onClose={() => {
//                                             setCameraGalleryModal(false)
//                                         }}
//                                         cameraClick={openCamera}
//                                         galleryClick={openLibrary}
//                                     />
//                                 ) : null}
//                             </View>
//                         </View>
//                         {/* )} */}
//                     </View>
//                 </Modal>
//                 {/* Camera Gallery Modal  */}
//                 <CameraGalleryModal
//                     visibleModal={cameraGalleryModal}
//                     onClose={() => {
//                         setCameraGalleryModal(false)
//                     }}
//                     cameraClick={openCamera}
//                     galleryClick={openLibrary}
//                 />
//             </KeyboardAwareScrollView>
//         </KeyboardAvoidingView>
//     )
// }

// export default AddCategoryModal

// const styles = StyleSheet.create({
//     container: { flex: 1, },
//     body: { flex: 1, padding: 5, },
//     centeredView: {
//         flex: 1,
//         justifyContent: "center",

//         backgroundColor: "rgba(0, 0, 0, 0.66)",

//     },
//     modalViewEmailId: {
//         backgroundColor: 'white',
//         borderRadius: 30,
//         paddingVertical: 40,
//         paddingHorizontal: 20,
//         margin: 10,
//         shadowColor: "red",
//         shadowOffset: {
//             width: 0,
//             height: 2
//         },
//         shadowOpacity: 0.25,
//         shadowRadius: 4,
//         elevation: 5
//     },
//     cardLabel: {
//         color: Mycolors.THEME_BLACK,
//         fontSize: 22,
//         fontWeight: "500",
//         paddingVertical: 10,
//         textAlign: "center"
//     },
//     crossContainer: {
//         backgroundColor: Mycolors.THEME_ORANGE,
//         borderRadius: 50,
//         height: 30,
//         position: "absolute",
//         right: 15,
//         top: 10,
//         width: 30,
//         zIndex: 1
//     },
//     image: {
//         borderRadius: 50,
//         height: "100%",
//         width: "100%"
//     },
//     textInput: {
//         backgroundColor: Mycolors.WHITE,
//         borderColor: Mycolors.brightGray,
//         borderRadius: 8,
//         borderWidth: 2,
//         color: Mycolors.THEME_BLACK,
//         fontSize: 16,
//         padding: 15
//     },
//     errorMessage: {
//         color: Mycolors.RED,
//         fontSize: 14,
//         padding: 5
//     },
//     imageStyle: {
//         height: "100%",
//         width: "100%",
//         borderRadius: 10
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
//         marginBottom: 15
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
//     uploadMediaBox: {
//         borderRadius: 10,
//         height: 90,
//         marginBottom: 10,
//         width: 130
//     }
// })








//external imports
import {
    Image,
    Keyboard,
    KeyboardAvoidingView,
    Modal,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native"

import ImagePicker from "react-native-image-crop-picker"
import React, { useEffect, useRef, useState } from "react"
import { useNavigation } from '@react-navigation/native';
import CameraGalleryModal from "./CameraGalleryModal";
// import { Fnnnormik } from "formik"
import axios from "axios"
import Toast from 'react-native-toast-message'
import PlanPurchaseModal from "../../../pages/GoSchedule/Screen/groups/PlanPurchaseModal"
// add_category

// import CustomHeader from "../../constants/CustomHeader"
// import GroupServices from "../../service/GroupServices"

import { get_gropus, requestGetApi, add_category, requestPostApiMedia, requestPostApi, requestPostApiImages } from '../../../WebApi/Service'
import { useSelector, useDispatch } from 'react-redux';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
//internal imports
// import CameraGalleryModal from "../groups/CameraGalleryModal"
//   import CommonToast from "../../constants/CommonToast"
//   import GroupServices from "../../service/GroupServices"
// import PlanPurchaseModal from "./PlanPurchaseModal"
// import SubmitButton from "../../constants/SubmitButton"
// import { colors } from "../../constants/ColorConstant"
import { Mycolors } from "../../../utility/Mycolors";
// import { name } from "../../Constants/SchemaValidation"
import SubmitButton from "../Constants/SubmitButton";
const AddCategoryModal = ({
    mainCategory,
    onClose,
    onSubmitClick,
    visibleModal,
    navigation
}) => {

    const [cameraGalleryModal, setCameraGalleryModal] = useState(false)
    const [profileImage, setProfileImage] = useState("")
    const [categoryName, setCategoryName] = useState('')
    useEffect(() => {
        setProfileImage("")
        setCategoryName('')
    }, [visibleModal])

    const User = useSelector(state => state.user.user_details)
    // function for submit button click for api call to add category
    const onSubmit = async () => {
        Keyboard.dismiss()
        if (!categoryName) {
            Toast.show({ text1: 'Enter category name' });
            return
        }
        const data = new FormData()
        if (profileImage != "") {
            const imageName = profileImage.path.slice(
                profileImage.path.lastIndexOf("/"),
                profileImage.path.length
            )
            data.append("image", {
                name: imageName,
                type: profileImage.mime,
                uri: profileImage.path
            })
        }
        data.append("category_type", mainCategory)
        data.append("name", categoryName)
        const { responseJson, err } = await requestPostApiImages(add_category, data, 'POST', User.token)
        console.log('response od add category------>>', responseJson);
        if (responseJson.headers.success) {
            onSubmitClick(responseJson.body.categoryid)
        }
        else {
            console.log('there is error in adding category');
        }
        // ExpensesManagementService.postAddCategory(data)
        //     .then(response => {
        //         onSubmitClick(response.data.categoryid)
        //     })
        //     .catch(error => {
        //         console.log(error)
        //     })
    }

    const initialValues = {
        name: ""
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
                setProfileImage(image)
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
            let value = await ImagePicker.openPicker({
                width: 1080,
                height: 1080,
                cropping: true,
                mediaType: "photo",
                compressImageQuality: 1,
                compressImageMaxHeight: 1080 / 2,
                compressImageMaxWidth: 1080 / 2
            }).then(image => {
                setProfileImage(image)
                setCameraGalleryModal(false)
            })
        } catch (error) {
            setCameraGalleryModal(false)
            console.log("error in openLibrary", error)
        }
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


                    <View style={styles.centeredView}>
                        <View style={styles.modalViewGroup}>
                            {/* cross button section  */}
                            <View >
                                <TouchableOpacity
                                    style={styles.crossContainer}
                                    onPress={() => {
                                        onClose()
                                    }}
                                >
                                    <Image
                                        style={styles.image}
                                        resizeMode="contain"
                                        source={require("../../../assets/Remindably/cross.png")}
                                    />
                                </TouchableOpacity>
                            </View>
                            <Text style={[styles.cardLabel, { marginBottom: 12 }]}>Add new category</Text>

                            <TextInput
                                placeholder="Enter category name"
                                placeholderTextColor={Mycolors.textGray}
                                style={[styles.textInput, { marginBottom: 20 }]}
                                value={categoryName}
                                onChangeText={(text) => setCategoryName(text)}

                            />

                            {/* uploded media section  */}
                            {profileImage !== "" ? (
                                <View style={styles.uploadMediaBox}>
                                    <Image
                                        style={styles.imageStyle}
                                        resizeMode="contain"
                                        source={{ uri: `${profileImage?.path}` }}
                                    />
                                </View>
                            ) : null}

                            {/* upload image section */}
                            <TouchableOpacity
                                onPress={() => setCameraGalleryModal(true)}
                                style={styles.uploadMediaContainer}
                            >
                                <Image
                                    style={styles.uploadImageStyle}
                                    resizeMode="contain"
                                    source={require("../../../assets/Remindably/UploadMedia.png")}
                                />
                                <Text style={styles.uploadMediaText}>
                                    Upload category image
                                </Text>
                            </TouchableOpacity>

                            {/*save button section */}
                            <TouchableOpacity onPress={() => {
                                // handleSubmit()
                                onSubmit()

                            }} style={{ marginBottom: 12 }}>
                                <SubmitButton
                                    buttonText={"Add"}
                                // submitButton={() => {
                                //     handleSubmit()
                                // }}
                                />
                            </TouchableOpacity>
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
                        </View>
                    </View>
                    {/* )} */}

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

                {/* Modal for purchase plan*/}
                {/* <PlanPurchaseModal
                    visibleModal={planPurchaseVisible}
                    onClose={() => {
                        setPlanPurchaseVisible(false)
                    }}
                    responseMsg={responseMsg}
                    onSubmitClick={handlePlanPurchaseSubmitClick}
                /> */}

                {/* toaster message for error response from API  */}
                {/* <CommonToast ref={toastRef} /> */}
            </KeyboardAwareScrollView>
        </KeyboardAvoidingView>
    )
}

export default AddCategoryModal

const styles = StyleSheet.create({
    container: { flex: 1 },
    body: {
        flex: 1,
        padding: 5,

    },
    centeredView: {
        backgroundColor: "rgba(0, 0, 0, 0.66)",
        flex: 1,
        justifyContent: "center"
    },
    modalViewGroup: {
        backgroundColor: 'white',
        borderRadius: 30,
        paddingVertical: 20,
        paddingHorizontal: 20,
        margin: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    imageContainer: {
        alignSelf: "center",
        height: 150,
        justifyContent: "center",
        marginBottom: 10,
        width: 190
    },
    groupLabel: {
        color: Mycolors.BLACK,
        fontSize: 18,
        paddingVertical: 10
    },
    textInput: {
        borderColor: Mycolors.brightGray,
        borderRadius: 8,
        borderWidth: 2,
        color: Mycolors.THEME_BLACK,
        fontSize: 16,
        padding: 15,
    },
    errorMessage: {
        color: Mycolors.RED,
        paddingHorizontal: 10
    },
    buttonContainer: { paddingTop: 10 },
    crossContainer: {
        backgroundColor: Mycolors.THEME_ORANGE,
        borderRadius: 50,
        height: 30,
        position: "absolute",
        right: 15,
        top: 10,
        width: 30,
        zIndex: 1
    },
    imageStyle: {
        borderRadius: 10,
        height: "100%",
        width: "100%"
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
    uploadMediaBox: {
        borderRadius: 10,
        height: 90,
        marginBottom: 10,
        width: 130
    },
    cardLabel: {
        color: Mycolors.THEME_BLACK,
        fontSize: 22,
        fontWeight: "500",
        paddingVertical: 10,
        textAlign: "center",
        width: '90%'
    },
    crossContainer: {
        backgroundColor: Mycolors.THEME_ORANGE,
        borderRadius: 50,
        height: 30,
        position: "absolute",
        right: 15,
        top: 10,
        width: 30,
        zIndex: 1
    },
    image: {
        borderRadius: 50,
        height: "100%",
        width: "100%"
    },
    textInput: {
        backgroundColor: Mycolors.WHITE,
        borderColor: Mycolors.brightGray,
        borderRadius: 8,
        borderWidth: 2,
        color: Mycolors.THEME_BLACK,
        fontSize: 16,
        padding: 15
    },
    errorMessage: {
        color: Mycolors.RED,
        fontSize: 14,
        padding: 5
    },
    imageStyle: {
        height: "100%",
        width: "100%",
        borderRadius: 10
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
        marginBottom: 15
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
    uploadMediaBox: {
        borderRadius: 10,
        height: 90,
        marginBottom: 10,
        width: 130
    }
})
