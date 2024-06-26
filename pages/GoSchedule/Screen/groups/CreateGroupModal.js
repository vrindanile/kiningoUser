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
import Toast from 'react-native-toast-message'
import ImagePicker from "react-native-image-crop-picker"
import React, { useEffect, useRef, useState } from "react"
import { useNavigation } from '@react-navigation/native';

// import { Formik } from "formik"
import axios from "axios"
import { useSelector, useDispatch } from 'react-redux';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
//internal imports
import CameraGalleryModal from "../groups/CameraGalleryModal"
//   import CommonToast from "../../constants/CommonToast"
//   import GroupServices from "../../service/GroupServices"
import PlanPurchaseModal from "./PlanPurchaseModal"
// import SubmitButton from "../../constants/SubmitButton"
// import { colors } from "../../constants/ColorConstant"
import { Mycolors } from "../../../../utility/Mycolors"
import { name } from "../../Constants/SchemaValidation"
import SubmitButton from "../../Constants/SubmitButton"
const CreateGroupModal = ({

    onClose,
    onCreateClick,
    visibleModal,
    setVisibility,
    close,
    data
}) => {
    console.log('my visible modal000000', data);
    const navigation = useNavigation();
    const [cameraGalleryModal, setCameraGalleryModal] = useState(false)
    const [loader, setLoader] = useState(false)
    const [planPurchaseVisible, setPlanPurchaseVisible] = useState(false)
    const [profileImage, setProfileImage] = useState("")
    const [groupName, setGroupName] = useState('')
    const [responseMsg, setResponseMsg] = useState("")
    const toastRef = useRef()
    const User = useSelector(state => state.user.user_details)
    console.log('User', User.token);
    useEffect(() => {
        setProfileImage("")
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
    const handleCreateGroup = (item) => {
        // Perform any necessary actions, and then call onCreateClick
        const groupDetails = { name: groupName, image: profileImage, groupid: item };
        onCreateClick(groupDetails);
    };
    // navigation for subscription plan on click of purchase plan click
    const handlePlanPurchaseSubmitClick = () => {
        setPlanPurchaseVisible(false)
        navigation.navigate("StackNavigation", {
            screen: "SubscriptionPlan"
        })
    }
    const handleModalClose = () => {
        console.log('closethe modsl');
        // Close the modal using the provided function
        setVisibility(false); // or close(false), depending on the prop name
        // You can also call onClose or perform other actions here
        if (onClose) {
            onClose();
        }
    };
    // function for submit button click on api call to create group
    const onSubmit = async () => {
        console.log('on submitttt');
        try {
            Keyboard.dismiss();

            if (!groupName) {
                // Check if the group name is empty
                Toast.show({ text1: 'Group name is required.' });
                return; // Stop the function if validation fails
            }

            if (!profileImage) {
                // Check if the profile image is empty
                Toast.show({ text1: 'Group Image is required.' });
                return; // Stop the function if validation fails
            }

            const data = new FormData();
            const imageName = profileImage.path.slice(
                profileImage.path.lastIndexOf("/") + 1
            );
            data.append("image", {
                name: imageName,
                type: profileImage.mime,
                uri: profileImage.path
            });
            data.append("name", groupName);

            console.log('my append data for roup', data);
            setLoader(true);

            const response = await axios.post(
                'http://54.153.75.225/backend/api/v1/goaccounting/add-group',
                data,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${User.token}`,
                    },
                }
            );
            console.log(response.data.headers.message
                , 'my response add group');

            if (response.data.headers.success
                === 1) {
                handleCreateGroup(response.data.body.group_id)
                // handleModalClose()
                // setVisibility(false)
                Toast.show({ text1: response.data.headers.message });
                setGroupName('')
                setProfileImage('')
                // navigation.navigate(
                //     "GroupDetails",
                //     // {
                //     //     data: groupDetails?.groupid
                //     // }
                // )
                // handleModalClose()
                // setVisibility(false)
                // Toast.show({ text1: response.data.headers.message });
            } else if (response.data.status === 0) {
                // Handle other cases if needed
            }

            setLoader(false);
        } catch (error) {
            console.error('Error in onSubmit:', error);
        } finally {
            setLoader(false);
        }
    };


    const initialValues = {
        groupName: ""
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
                            <TouchableOpacity
                                style={styles.crossContainer}
                                onPress={() => {
                                    onClose();
                                }}>
                                <Image
                                    style={styles.imageStyle}
                                    resizeMode="contain"
                                    source={require('../../../../assets/Remindably/cross.png')}
                                />
                            </TouchableOpacity>

                            <View style={styles.imageContainer}>
                                <Image
                                    resizeMode="contain"
                                    source={require('../../../../assets/Remindably/CreateGroupImage.png')}
                                />
                            </View>

                            <Text style={styles.groupLabel}>Enter Group Name</Text>
                            <TextInput
                                maxLength={25}
                                placeholder="Enter Group Name"
                                placeholderTextColor={Mycolors.textGray}
                                style={styles.textInput}
                                value={groupName}
                                onChangeText={(text) => setGroupName(text)} // Update the state with user input
                            />
                            <Text style={styles.errorMessage}>
                                {/* {touched.groupName && errors.groupName} */}
                            </Text>

                            {/* uploded media section  */}
                            {profileImage !== '' ? (
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
                                style={styles.uploadMediaContainer}>
                                <Image
                                    style={styles.uploadImageStyle}
                                    resizeMode="contain"
                                    source={require('../../../../assets/Remindably/UploadMedia.png')}
                                />
                                <Text style={styles.uploadMediaText}>
                                    Upload Group Image
                                </Text>
                            </TouchableOpacity>

                            {/* button with loader  */}
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity onPress={() => {

                                    // handleCreateGroup()
                                    onSubmit()
                                }}>
                                    <SubmitButton
                                        //loader={loader}
                                        // submitButton={handleSubmit}
                                        buttonText={'Create Group'}
                                    />

                                    <View>

                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
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

                {/* Modal for purchase plan*/}
                <PlanPurchaseModal
                    visibleModal={planPurchaseVisible}
                    onClose={() => {
                        setPlanPurchaseVisible(false)
                    }}
                    responseMsg={responseMsg}
                    onSubmitClick={handlePlanPurchaseSubmitClick}
                />

                {/* toaster message for error response from API  */}
                {/* <CommonToast ref={toastRef} /> */}
            </KeyboardAwareScrollView>
        </KeyboardAvoidingView>
    )
}

export default CreateGroupModal

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
