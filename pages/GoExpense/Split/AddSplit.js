// external import
import {
    FlatList,
    Image,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native"
import ImagePicker from "react-native-image-crop-picker"
import React, { useRef, useState } from "react"
// import { Formik } from "formik"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
// internal imports
import Toast from 'react-native-toast-message'
import CameraGalleryModal from "./CameraGalleryModal"
// import CommonToast from "../../../constants/CommonToast"
import CustomHeader from "../Constants/CustomHeader"
import InviteMemberOnSplitModal from "./InviteMemberOnSplitModal"
import RecentlyAddedMembersTab from "./RecentlyAddedMembersTab"
// import SplitService from "../../../service/SplitService"
import SubmitButton from "../Constants/SubmitButton"
import { Mycolors } from "../../../utility/Mycolors"
// import { splitValidation } from "../../../constants/SchemaValidation"
import { useSelector, useDispatch } from 'react-redux';
import { requestGetApi, requestPostApi, delete_notes, split_group, requestPostApiImages } from '../../../WebApi/Service'
// split_group
const AddSplit = ({ navigation }) => {
    const User = useSelector(state => state.user.user_details)
    const [addMemberModal, setAddMemberModal] = useState(false)
    const [cameraGalleryModal, setCameraGalleryModal] = useState(false)
    const [loader, setLoader] = useState(false)
    const [selectedMembersId, setSelectedMembersId] = useState([])
    const [selectedMembersList, setSelectedMembersList] = useState([])
    const [splitBillImage, setSplitBillImage] = useState({})
    const [description, setDescription] = useState({})
    const [title, setTitle] = useState({})
    const toastRef = useRef()

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
                setSplitBillImage(image)
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
                setSplitBillImage(image)
                setCameraGalleryModal(false)
            })
        } catch (error) {
            setCameraGalleryModal(false)
            console.log("error in openLibrary", error)
        }
    }

    // function for member add click to set state
    const handleMemberIdAddClick = (memberList, userList) => {
        setAddMemberModal(false)
        setSelectedMembersId(memberList)
        setSelectedMembersList(userList)
    }

    // list for recently added members
    const renderAddedMembers = ({ item }) => {
        return <RecentlyAddedMembersTab item={item} />
    }

    // function for submit button click for api call to add split group
    const onSubmit = async () => {
        Keyboard.dismiss()
        setLoader(true)

        const data = new FormData()
        if (splitBillImage?.path != null) {
            const imageName = splitBillImage?.path?.slice(
                splitBillImage?.path.lastIndexOf("/"),
                splitBillImage?.length
            )
            data.append("image", {
                name: imageName,
                type: splitBillImage?.mime,
                uri: splitBillImage?.path
            })
        }
        data.append("groupname", title)
        data.append("group_description", description)
        if (selectedMembersId?.length >= 0) {
            selectedMembersId.map((e, index) => {
                data.append(`splitMembers[]`, e)
            })
        }
        const { responseJson, err } = await requestPostApiImages(split_group, data, 'POST', User.token)
        console.log('response od creation of the group expanse------>>', responseJson);
        if (responseJson.headers.success === 1) {
            Toast.show({ text1: responseJson.headers.message });
            navigation.navigate(
                "SplitDetail",
                {
                    data: responseJson?.body?.group_id
                }
            )
        }

        // SplitService.postAddSplitGroup(data)
        //     .then(response => {
        //         setLoader(false)
        //         if (response.data.status === 1) {
        //             toastRef.current.getToast(response.data.message, "success")
        //             navigation.navigate("StackNavigation", {
        //                 screen: "SplitDetail",
        //                 params: {
        //                     data: response?.data?.splitgroups?.groupid
        //                 }
        //             })
        //         } else if (response.data.status === 0) {
        //             toastRef.current.getToast(response.data.message, "success")
        //         }
        //     })
        //     .catch(error => {
        //         setLoader(false)
        //         console.log(error, "error in catch")
        //     })
    }

    const initialValues = {
        description: "",
        title: ""
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            {/* header section */}
            <CustomHeader
                headerText={"Add Split"}
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
                style={styles.container}
            >
                <View
                // validationSchema={splitValidation}
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
                    <View style={styles.body}>
                        {/* title section  */}
                        <View>
                            <Text style={[styles.labelText, { marginVertical: 12 }]}>Title</Text>
                            <TextInput
                                placeholder="Enter title"
                                placeholderTextColor={Mycolors.textGray}
                                style={styles.textInput}
                                value={title}
                                onChangeText={(text) => {
                                    setTitle(text)
                                }}
                            // value={values.title}
                            // onChangeText={handleChange("title")}
                            // onBlur={() => {
                            //     handleBlur("title")
                            //     setFieldTouched("title")
                            // }}
                            />

                            {/* <Text style={styles.errorMessage}>
                                {touched.title && errors.title}
                            </Text> */}
                        </View>

                        {/*Description section  */}
                        <View>
                            <Text style={[styles.labelText, { marginVertical: 12 }]}>Description</Text>
                            <TextInput
                                placeholder="Enter description here…"
                                placeholderTextColor={Mycolors.textGray}
                                style={[styles.descriptionInput]}
                                // value={values.description}
                                numberOfLines={3}
                                multiline={true}
                                textAlignVertical="top"
                                value={description}
                                onChangeText={(text) => {
                                    setDescription(text)
                                }}
                            // onChangeText={handleChange("description")}
                            // onBlur={() => {
                            //     handleBlur("description")
                            //     setFieldTouched("description")
                            // }}
                            />
                            {/* <Text style={styles.errorMessage}>
                                {touched.description && errors.description}
                            </Text> */}
                        </View>

                        {/* recently added member  */}
                        <View style={[styles.direction, { marginTop: 14, }]}>
                            <Text style={styles.labelText}>Added Members</Text>
                            <TouchableOpacity onPress={() => setAddMemberModal(true)}>
                                <Text style={styles.addMemberText}>Add New Member</Text>
                            </TouchableOpacity>
                        </View>

                        {selectedMembersList?.length > 0 ? (
                            <FlatList
                                data={selectedMembersList}
                                renderItem={renderAddedMembers}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                keyExtractor={(item, index) => String(index)}
                            />
                        ) : (
                            <View style={styles.noMembersContainer}>
                                <Text style={styles.noMembersText}>No members added</Text>
                            </View>
                        )}

                        {/* uploaded media section  */}
                        {splitBillImage?.path != null ? (
                            <View style={[styles.uploadMediaBox, { marginVertical: 15 }]}>
                                <TouchableOpacity
                                    style={styles.crossContainer}
                                    onPress={() => {
                                        setSplitBillImage({})
                                    }}
                                >
                                    <Image
                                        style={styles.image}
                                        resizeMode="contain"
                                        source={require("../../../assets/Remindably/cross.png")}
                                    />
                                </TouchableOpacity>
                                <Image
                                    style={styles.imageStyle}
                                    resizeMode="contain"
                                    source={{ uri: `${splitBillImage?.path}` }}
                                />
                            </View>
                        ) : null}

                        {/* upload image section */}
                        <TouchableOpacity
                            onPress={() => setCameraGalleryModal(true)}
                            style={[styles.uploadMediaContainer]}
                        >
                            <Image
                                style={styles.uploadImageStyle}
                                resizeMode="contain"
                                source={require("../../../assets/Remindably/UploadMedia.png")}
                            />
                            <Text style={styles.uploadMediaText}>Upload image</Text>
                        </TouchableOpacity>

                        {/* button with loader  */}
                        <TouchableOpacity style={styles.buttonContainer} onPress={() => { onSubmit() }}>
                            <SubmitButton
                                loader={loader}
                                // submitButton={handleSubmit}
                                buttonText={"Save"}
                            />
                        </TouchableOpacity>

                        {/* Camera Gallery Modal  */}
                        <CameraGalleryModal
                            visibleModal={cameraGalleryModal}
                            onClose={() => {
                                setCameraGalleryModal(false)
                            }}
                            cameraClick={openCamera}
                            galleryClick={openLibrary}
                        />

                        {/* Member Email Id modal  */}
                        <InviteMemberOnSplitModal
                            visibleModal={addMemberModal}
                            onClose={() => {
                                setAddMemberModal(false)
                            }}
                            onSubmitClick={handleMemberIdAddClick}
                            navigation={navigation}
                            selectedMembersId={selectedMembersId}
                            selectedMembersList={selectedMembersList}
                        />

                        {/* toaster message for error response from API  */}
                        {/* <CommonToast ref={toastRef} /> */}
                    </View>
                    {/* )} */}
                </View>
            </KeyboardAwareScrollView>
        </KeyboardAvoidingView>
    )
}

export default AddSplit

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    body: {
        flex: 1,
        padding: 10,
        paddingBottom: 40
    },
    labelText: {
        color: Mycolors.THEME_BLACK,
        fontSize: 18,
        fontWeight: "500",
        paddingVertical: 5
    },
    addMemberText: {
        color: Mycolors.THEME_ORANGE,
        fontSize: 14,
        fontWeight: "500"
    },
    textInput: {
        backgroundColor: Mycolors.WHITE,
        borderRadius: 10,
        color: Mycolors.THEME_BLACK,
        fontSize: 16,
        padding: 15
    },
    descriptionInput: {
        backgroundColor: Mycolors.WHITE,
        borderRadius: 10,
        color: Mycolors.THEME_BLACK,
        fontSize: 16,
        height: 100,
        padding: 12
    },
    errorMessage: {
        color: Mycolors.RED,
        fontSize: 14,
        paddingHorizontal: 10
    },
    direction: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between"
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
    imageStyle: {
        height: "100%",
        borderRadius: 10,
        width: "100%"
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
    buttonContainer: { paddingTop: 30 },
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
    },
    image: {
        borderRadius: 10,
        height: "100%",
        width: "100%"
    },
    crossContainer: {
        backgroundColor: Mycolors.THEME_ORANGE,
        borderRadius: 50,
        height: 20,
        position: "absolute",
        right: 0,
        top: 0,
        width: 20,
        zIndex: 1
    }
})
