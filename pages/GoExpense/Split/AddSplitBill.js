// external imports
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

import React, { useEffect, useRef, useState } from "react"
import moment from "moment"
import Toast from 'react-native-toast-message'
// import { Formik } from "formik"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
// internal imports
import CameraGalleryModal from "./CameraGalleryModal"
// import CommonToast from "../../../constants/CommonToast"
import CustomHeader from "../Constants/CustomHeader"
import ExpansesImage from "./ExpansesImage"
import RepeatCalendarModal from "./RepeatCalendarModal"
// import SplitService from "../../../service/SplitService"
import SubmitButton from "../Constants/SubmitButton"
import { Mycolors } from "../../../utility/Mycolors"
// import { colors } from "../../../constants/ColorConstant"
// import { expansesValidation } from "../../../constants/SchemaValidation"

// add_splitBill
import { requestPostApiImages, add_splitBill } from '../../../WebApi/Service'
import { useSelector, useDispatch } from 'react-redux';
const AddSplitBill = ({ navigation, route }) => {
    const User = useSelector(state => state.user.user_details)

    const [calendarModal, setCalendarModal] = useState(false)
    const [cameraGalleryModal, setCameraGalleryModal] = useState(false)
    const [loader, setLoader] = useState(false)
    const [splitBillImage, setSplitBillImage] = useState([])
    const [splitId, setSplitId] = useState("")
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [ammount, setAmmount] = useState('')
    const [selectedDate, setSelectedDate] = useState(
        moment(new Date()).format("YYYY-MM-DD")
    )
    const toastRef = useRef()

    useEffect(() => {
        setSplitId(route?.params?.data)
    }, [navigation])

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
                setSplitBillImage([img])
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
                setSplitBillImage(imageList)
                setCameraGalleryModal(false)
            })
        } catch (error) {
            setCameraGalleryModal(false)
            console.log("error in openLibrary", error)
        }
    }

    // list for images
    const renderAddExpenseImages = ({ item }) => {
        console.log('my expanse images from added slpit---->>>', item);
        return <ExpansesImage expenseImage={item} />
    }

    // function for calender submit click after select date
    const handleCalendarSubmitClick = selectDate => {
        setCalendarModal(false)
        setSelectedDate(moment(selectDate).format("YYYY-MM-DD"))
    }

    // function for submit button click for api call to add split bill in split group
    const onSubmit = async () => {
        Keyboard.dismiss()
        setLoader(true)

        const data = new FormData()
        if (splitBillImage !== null) {
            splitBillImage.map((e, index) => {
                data.append('files', e)
            })
        }
        data.append("groupid", splitId)
        data.append("title", title)
        data.append("description", description)
        data.append("amount", ammount)
        data.append("date", selectedDate)
        const { responseJson, err } = await requestPostApiImages(add_splitBill, data, 'POST', User.token)
        console.log('response of edit expanse------>>', responseJson);
        if (responseJson.headers.success == 1) {
            setLoader(false)
            Toast.show({ text1: responseJson.headers.message });
            // navigation.replace("AllExpenses")
            navigation.navigate(
                "SplitList",
                {
                    data: splitId
                })
            // getData()
        } else {
            setLoader(false)

        }
        // SplitService.postAddSplitBill(data)
        //     .then(response => {
        //         setLoader(false)
        //         if (response.data.status === 1) {
        //             toastRef.current.getToast(response.data.message, "success")
        //             navigation.navigate("StackNavigation", {
        //                 screen: "SplitList",
        //                 params: {
        //                     data: splitId
        //                 }
        //             })
        //         } else if (response.data.status === 0) {
        //             toastRef.current.getToast(response.data.message, "success")
        //         }
        //     })
        //     .catch(error => {
        //         setLoader(false)
        //         console.log(error, "error")
        //     })
    }

    const initialValues = {
        amount: "",
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
                headerText={"Add Split Bill"}
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
                // validationSchema={expansesValidation}
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
                        {/* title section */}
                        <View>
                            <Text style={styles.labelText}>Title</Text>
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

                        {/*Description section */}
                        <View>
                            <Text style={styles.labelText}>Description</Text>
                            <TextInput
                                placeholder="Enter description here…"
                                placeholderTextColor={Mycolors.textGray}
                                style={styles.descriptionInput}
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

                        {/*amount section */}
                        <View>
                            <Text style={styles.labelText}>Amount</Text>
                            <TextInput
                                placeholder="Enter amount"
                                placeholderTextColor={Mycolors.textGray}
                                style={styles.textInput}
                                keyboardType={
                                    Platform.OS === "ios" ? "number-pad" : "numeric"
                                }
                                value={ammount}
                                onChangeText={(text) => {
                                    setAmmount(text)
                                }}
                            // value={values.amount}
                            // onChangeText={handleChange("amount")}
                            // onBlur={() => {
                            //     handleBlur("amount")
                            //     setFieldTouched("amount")
                            // }}
                            />

                            {/* <Text style={styles.errorMessage}>
                                {touched.amount && errors.amount}
                            </Text> */}
                        </View>

                        {/* date section */}
                        <View>
                            <Text style={styles.labelText}>Select Date</Text>
                            <View style={styles.calendarDateContainer}>
                                <TextInput
                                    editable={false}
                                    placeholder={"MM-DD-YYYY"}
                                    placeholderTextColor={Mycolors.THEME_BLACK}
                                    value={selectedDate}
                                    style={{
                                        color: Mycolors.THEME_BLACK
                                    }}
                                />
                                <TouchableOpacity
                                    onPress={() => {
                                        setCalendarModal(!calendarModal)
                                    }}
                                    style={styles.calendarIcon}
                                >
                                    <Image
                                        resizeMode="contain"
                                        tintColor={Mycolors.THEME_ORANGE}
                                        style={styles.image}
                                        source={require("../../../assets/Remindably/CalendarBlank1.png")}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* uploaded media section */}
                        {splitBillImage?.length > 0 ? (
                            <FlatList
                                data={splitBillImage}
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                renderItem={renderAddExpenseImages}
                                keyExtractor={(item, index) => String(index)}
                            />
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
                            <Text style={styles.uploadMediaText}>Upload image</Text>
                        </TouchableOpacity>

                        {/* button with loader */}
                        <TouchableOpacity style={styles.buttonContainer} onPress={() => { onSubmit() }}>
                            <SubmitButton
                                loader={loader}
                                // submitButton={handleSubmit}
                                buttonText={"Save"}
                            />
                        </TouchableOpacity>

                        {/* Camera Gallery Modal */}
                        <CameraGalleryModal
                            visibleModal={cameraGalleryModal}
                            onClose={() => {
                                setCameraGalleryModal(false)
                            }}
                            cameraClick={openCamera}
                            galleryClick={openLibrary}
                        />

                        {/* Calender modal */}
                        <RepeatCalendarModal
                            visibleModal={calendarModal}
                            onClose={() => {
                                setCalendarModal(false)
                            }}
                            onSubmitClick={handleCalendarSubmitClick}
                        />

                        {/* toaster message for error response from API */}
                        {/* <CommonToast ref={toastRef} /> */}
                    </View>
                    {/* )} */}
                </View>
            </KeyboardAwareScrollView>
        </KeyboardAvoidingView>
    )
}

export default AddSplitBill

const styles = StyleSheet.create({
    container: { flex: 1 },
    body: {
        flex: 1,
        padding: 10,
        paddingBottom: 40
    },
    image: {
        borderRadius: 50,
        height: "100%",
        width: "100%"
    },
    labelText: {
        color: Mycolors.THEME_BLACK,
        fontSize: 16,
        fontWeight: "500",
        paddingVertical: 3
    },
    textInput: {
        backgroundColor: Mycolors.WHITE,
        borderColor: Mycolors.brightGray,
        borderRadius: 10,
        borderWidth: 2,
        color: Mycolors.THEME_BLACK,
        fontSize: 16,
        padding: 10
    },
    descriptionInput: {
        backgroundColor: Mycolors.WHITE,
        borderColor: Mycolors.brightGray,
        borderRadius: 10,
        borderWidth: 2,
        color: Mycolors.THEME_BLACK,
        fontSize: 16,
        height: 100,
        padding: 10
    },
    errorMessage: {
        color: Mycolors.RED,
        fontSize: 14,
        paddingHorizontal: 5
    },
    calendarDateContainer: {
        backgroundColor: Mycolors.WHITE,
        borderColor: Mycolors.brightGray,
        borderRadius: 10,
        borderWidth: 2,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 5,
        paddingVertical: 2
    },
    calendarIcon: {
        alignItems: "center",
        alignSelf: "center",
        height: 25,
        justifyContent: "center",
        width: 25
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
        marginTop: 5
    },
    uploadImageStyle: { height: 30, width: 30, paddingHorizontal: 25 },
    uploadMediaText: {
        color: Mycolors.THEME_BLACK,
        fontSize: 14,
        fontWeight: "400"
    },
    buttonContainer: { paddingTop: 30 }
})
