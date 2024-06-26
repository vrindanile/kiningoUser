// external imports
import {
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
import axios from "axios"
import ImagePicker from "react-native-image-crop-picker"
import React, { useEffect, useRef, useState } from "react"
// import { Formik } from "formik"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message'
import { get_details, requestGetApi, get_task, recent_members } from '../../../../WebApi/Service'
import { useSelector, useDispatch } from 'react-redux';
// internal imports
import CameraGalleryModal from "./CameraGalleryModal"
import SubmitButton from "../../Constants/SubmitButton"
// import { colors } from "../../constants/ColorConstant"
//   import { name } from "../../constants/SchemaValidation"
import { useIsFocused } from "@react-navigation/native";
import { Mycolors, dimensions } from "../../../../utility/Mycolors"
const EditGroupNameModal = ({
    groupImage,
    groupNameData,
    onClose,
    onSubmitClick,
    // navigation,
    visibleModal,
    setVisibility,
    dataa
}) => {
    console.log('my editgroup groupNameData ---->>>', groupNameData);
    const isFocus = useIsFocused()
    const [cameraGalleryModal, setCameraGalleryModal] = useState(false)
    const [loader, setLoader] = useState(false)
    const [profileImage, setProfileImage] = useState("")
    const [groupName, setGroupName] = useState(groupNameData || ""); // Initialize with the groupNameData prop
    console.log('my groupname------>>>>', groupName);
    const User = useSelector(state => state.user.user_details)
    console.log('User', User);
    const navigation = useNavigation();
    // function for open camera
    const handleModalClose = () => {
        console.log('closethe modsl');

        // Close the modal using the provided function
        setVisibility(false); // or close(false), depending on the prop name
        // You can also call onClose or perform other actions here
        if (onClose) {
            onClose();
        }
    };
    useEffect(() => {
        setGroupName(groupNameData);
    }, [groupNameData]);

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

    const handleGroupNameChange = (text) => {
        // Update the groupName state when the input field changes
        setGroupName(text);
    };

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


    const handleSubmit = async () => {
        // console.log('picker check camera', data);
        // Keyboard.dismiss()
        // setButtonLoader(true)
        try {
            console.log('Starting post creation...');


            const data = new FormData();
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
            data.append("name", groupName);
            // data.append("comment", taskComments);
            data.append("status", "T");
            console.log('Data to be sent:', data);
            var url = `http://54.153.75.225/backend/api/v1/goaccounting/my-group/`
            var ru = dataa
            if (ru != undefined) {
                url = url + ru
            }
            console.log('my url for edit', url);
            const response = await axios.put(
                url,
                data,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${User.token}`,
                    },
                }
            );


            if (response.status === 200) {
                // handleModalClose()
                console.log('Post edited sucesss', response.data.headers.message);

                // navigation.goBack();
                console.log('Response for edit group:', response.data.headers.message);
                Toast.show({ text1: response.data.headers.message });
                navigation.goBack();

            } else {
                console.log('Error creating post:', response.data.headers.message);
            }

            // Assuming you want to set loading to false after the request.

        } catch (error) {
            console.error('Error in CreatePost', error);
        }
    }

    // function for submit button click
    const onSubmit = () => {
        console.log('my detail save buttonm');
        Keyboard.dismiss()
        setLoader(true)
        onSubmitClick(groupName, profileImage)
        setLoader(false)
    }

    const initialValues = {
        groupName: groupNameData ? groupNameData : ""
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
                        setGroupName(groupNameData); // Reset groupName when modal is closed
                        onClose();
                    }}
                >
                    <View
                    // validationSchema={name}
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
                                            handleModalClose()
                                        }}
                                    >
                                        <Image
                                            style={styles.imageStyle}
                                            resizeMode="contain"
                                            source={require("../../../../assets/Remindably/cross.png")}
                                        />
                                    </TouchableOpacity>
                                    <View style={styles.imageContainer}>
                                        <Image
                                            resizeMode="contain"
                                            source={require("../../../../assets/Remindably/CreateGroupImage.png")}
                                        />
                                    </View>
                                    <Text style={styles.groupLabel}>Edit Group Name</Text>
                                    <TextInput
                                        key={groupNameData} // Add a key to force re-render when groupNameData changes
                                        placeholder="Type here..."
                                        placeholderTextColor={Mycolors.textGray}
                                        style={styles.textInput}
                                        value={groupName}
                                        onChangeText={handleGroupNameChange}
                                    // value={values.groupName}
                                    // onChangeText={handleChange("groupName")}
                                    // onBlur={() => {
                                    //     handleBlur("groupName")
                                    //     // setFieldTouched("groupName")
                                    // }}
                                    />
                                    <Text style={styles.errorMessage}>
                                        {/* {touched.groupName && errors.groupName} */}
                                    </Text>

                                    {/* uploaded media section  */}
                                    {profileImage !== "" ? (
                                        <View style={styles.uploadMediaBox}>
                                            <Image
                                                style={styles.imageStyle}
                                                resizeMode="contain"
                                                source={{
                                                    uri: `${profileImage?.path}`
                                                }}
                                            />
                                        </View>
                                    ) : groupImage !== "" ? (
                                        <View style={styles.uploadMediaBox}>
                                            <Image
                                                style={styles.imageStyle}
                                                resizeMode="contain"
                                                source={{
                                                    uri: `${groupImage}`
                                                }}
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
                                            source={require("../../../../assets/Remindably/UploadMedia.png")}
                                        />
                                        <Text style={styles.uploadMediaText}>
                                            Upload group image
                                        </Text>
                                    </TouchableOpacity>

                                    {/* button with loader  */}
                                    <TouchableOpacity style={styles.buttonContainer} onPress={() => onSubmit()}>
                                        <SubmitButton
                                            loader={loader}
                                            // submitButton={handleSubmit}
                                            buttonText={"Save"}
                                        />
                                    </TouchableOpacity>
                                </ScrollView>
                            </View>
                        </View>
                        {/* )} */}
                    </View>

                    {Platform.OS === "ios" ? (
                        <CameraGalleryModal
                            visibleModal={cameraGalleryModal}
                            // onClose={() => {
                            //     setCameraGalleryModal(false)
                            // }}
                            cameraClick={openCamera}
                            galleryClick={openLibrary}
                        />
                    ) : null}
                </Modal>

                {/* Camera Gallery Modal  */}
                <CameraGalleryModal
                    visibleModal={cameraGalleryModal}
                    // onClose={() => {
                    //     setCameraGalleryModal(false)
                    // }}
                    cameraClick={openCamera}
                    galleryClick={openLibrary}
                />
            </KeyboardAwareScrollView>
        </KeyboardAvoidingView>
    )
}

export default EditGroupNameModal

const styles = StyleSheet.create({
    container: { flex: 1, },
    body: {
        flex: 1,
        padding: 5
    },
    centeredView: {
        backgroundColor: "rgba(0, 0, 0, 0.66)",
        justifyContent: 'center',
        height: dimensions.SCREEN_HEIGHT
    },
    modalViewGroup: {
        backgroundColor: Mycolors.WHITE,
        borderRadius: 30,
        paddingVertical: 40,
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
        paddingHorizontal: 10
    },
    buttonContainer: { paddingTop: 30 },
    crossContainer: {
        backgroundColor: Mycolors.THEME_ORANGE,
        borderRadius: 50,
        height: 30,
        position: "absolute",
        right: 0,
        top: 0,
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
        justifyContent: "center"
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
