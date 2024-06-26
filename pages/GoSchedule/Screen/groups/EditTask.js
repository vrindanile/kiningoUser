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

import DatePicker from "react-native-date-picker"
import ImagePicker from "react-native-image-crop-picker"
import React, { useEffect, useRef, useState } from "react"
import Toast from 'react-native-toast-message'
import moment from "moment"
import axios from "axios";
// import { Formik } from "formik"
import { useSelector, useDispatch } from 'react-redux';
import { requestGetApi, requestPostApi, delete_notes } from '../../../../WebApi/Service'
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { useNavigation } from '@react-navigation/native';
//internal imports
import AllTimeWithCross from "./AllTimeWithCross"
import CameraGalleryModal from "./CameraGalleryModal"
import CommentImageOnEditModal from "./CommentImageOnEditModal"
import CommentImagesTab from "./CommentImagesTab"
// import CommonToast from "../../constants/CommonToast"
import CustomHeader from "../../Constants/CustomHeaader"
import CustomModal from "./CustomModal"
// import GroupServices from "../../service/GroupServices"
import RepeatCalendarModal from "./RepeatCalendarModal"
import RepeatModal from "./RepeatModal"
import SubmitButton from "../../Constants/SubmitButton"
// import { colors } from "../../constants/ColorConstant"
import { Mycolors, dimensions } from "../../../../utility/Mycolors"
// import { taskName } from "../../constants/SchemaValidation"
import ToggleSwitch from "toggle-switch-react-native"
// import { get_gropus, requestGetApi, get_memberList, add_members, invite_user, requestPostApi, request_list, home_details, home_detailTask, taskHideUnhide, prefrence_list } from '../../../../WebApi/Service'
import { pick } from "react-native-document-picker"

const EditTask = ({ route }) => {
    const [arrayList, setArrayList] = useState([])
    const [autoHideTask, setAutoHideTask] = useState(false)
    const [buttonLoader, setButtonLoader] = useState(false)
    const [calendarModal, setCalendarModal] = useState(false)
    const [cameraGalleryModal, setCameraGalleryModal] = useState(false)
    const [customModal, setCustomModal] = useState(false)
    const [date, setDate] = useState(new Date())
    console.log('my date after selection', date);
    const [daysList, setDaysList] = useState([])
    const [deletedImageId, setDeletedImageId] = useState([])
    const [errMsg, setErrMsg] = useState(false)
    const [feedbackImage, setFeedbackImage] = useState([])
    console.log('feedbackImages', feedbackImage);
    const [groupId, setGroupId] = useState(0)
    const [open, setOpen] = useState(false)
    const [priorityChecked, setPriorityChecked] = useState("L")
    const [repeatModal, setRepeatModal] = useState(false)
    const [repeatValue, setRepeatValue] = useState("O")
    const [selectedDate, setSelectedDate] = useState("")
    const [showRepeatValue, setShowRepeatValue] = useState("Once")
    const [taskId, setTaskId] = useState(0)
    const [timeChecked, setTimeChecked] = useState(true)
    const [timeList, setTimeList] = useState([])
    const [taskname, setTaskname] = useState('')
    const [picker, setPicker] = useState([])
    const navigation = useNavigation();
    console.log('my picker value', picker);

    const toastRef = useRef()
    const User = useSelector(state => state.user.user_details)
    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            setSelectedDate(moment(selectedDate).format("YYYY-MM-DD"))
            console.log('my task name dit', route?.params.group);
            setTaskname(route?.params?.data?.name)
            // task id
            setTaskId(route?.params?.data?.id)
            // group id
            setGroupId(route?.params.group)

            // for repeat type
            if (route?.params?.data?.repeattype === "Once") {
                setRepeatValue("O")
                setShowRepeatValue("Once")
            } else if (route?.params?.data?.repeattype === "Daily") {
                setRepeatValue("D")
                setShowRepeatValue("Daily")
            } else if (route?.params?.data?.repeattype === "Date") {
                setRepeatValue("T")
                setShowRepeatValue("Date")
                setSelectedDate(route?.params?.data?.repeatdate) //for pre selected repeat date
            } else if (route?.params?.data?.repeattype === "Custom") {
                setRepeatValue("C")
                setShowRepeatValue("Custom")
                let days = route?.params?.data?.repeatdays?.map(e => e.day)
                setDaysList(days) //for pre selected custom days
            } else {
                setRepeatValue("")
                setShowRepeatValue("")
            }

            // for time list
            let time = route?.params?.data?.time?.map(e => e.times)
            setTimeList(time)

            // for priority check
            setPriorityChecked(route?.params?.data?.priority)

            // for preselected images
            if (route?.params?.data?.taskimages != null) {
                let imageId = route?.params?.data?.taskimages?.map(e => e.imageid)
                setArrayList(imageId) //for pre selected images id
            }

            // for hide unHide task status
            setAutoHideTask(route?.params?.data?.autoHideTask)
        })
        return unsubscribe
    }, [navigation, route])

    const handleSubm = () => {
        console.log('my handelfunction');
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
                let imageList = []
                image?.map(e => {
                    imageList.push({
                        name: e.path.slice(e.path.lastIndexOf("/"), e.path.length),
                        uri: e.path,
                        type: e.mime
                    })
                })

                setFeedbackImage(imageList)

                setFeedbackImage([img])
                setCameraGalleryModal(false)
            })
        } catch (error) {
            setCameraGalleryModal(false)
            console.log("error in openLibrary", error)
        }
    }


    const openLibrary = async () => {
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
            let imageList = []
            images?.map(e => {
                imageList.push({
                    name: e.path.slice(e.path.lastIndexOf("/"), e.path.length),
                    uri: e.path,
                    type: e.mime
                })
            })
            //  setPicker([...picker, ...value]);
            setFeedbackImage(imageList)
            setCameraGalleryModal(false)
            setCameraGalleryModal(false)

        } catch (error) {
            console.log('error in openLibrary', error);
        }
    };
    // function for close modal after select the repeat data
    const handleRepeatModalClose = text => {
        setRepeatModal(false)

        if (text === "" && repeatValue == "") {
            setRepeatValue("O")
            setShowRepeatValue("Once")
        } else {
            if (text === "O") {
                setRepeatValue("O")
                setShowRepeatValue("Once")
                setDaysList([]) //empty felid in case user select different repeat option
                setSelectedDate("") //empty felid in case user select different repeat option
            } else if (text === "D") {
                setRepeatValue("D")
                setShowRepeatValue("Daily")
                setDaysList([]) //empty felid in case user select different repeat option
                setSelectedDate("") //empty felid in case user select different repeat option
            } else if (text === "T") {
                setRepeatValue("T")
                setShowRepeatValue("Date")
                setCalendarModal(true)
                setDaysList([]) //empty felid in case user select different repeat option
            } else if (text === "C") {
                setRepeatValue("C")
                setShowRepeatValue("Custom")
                setCustomModal(true)
                setSelectedDate("") //empty felid in case user select different repeat option
            }
        }
    }

    // function for close modal after select the once data
    const handleCustomModalClose = () => {
        setCustomModal(false)
        setRepeatValue("O")
        setShowRepeatValue("Once")
    }

    // function for close modal after select the custom data
    const handleCustomSubmitClick = dayList => {
        if (dayList.length === 0) {
            // Show a toast or handle the case where dayList is empty
            Toast.show({ text1: 'Day list is empty' });
            return; // Exit the function early to prevent closing the modal and state update
        }
        setCustomModal(false)
        setDaysList(dayList)
    }

    // function for close calender modal after select the date
    const handleCalendarModalClose = () => {
        setCalendarModal(false)
        setRepeatValue("O")
        setShowRepeatValue("Once")
    }

    // function for close calender modal after select the date and submit click
    const handleCalendarSubmitClick = selectDate => {
        setCalendarModal(false)
        console.log('selectDate', selectDate);
        setSelectedDate(moment(selectDate).format("YYYY-MM-DD"))
    }

    // list for time with cross icon
    const renderAllTimeTab = ({ item }) => {
        return (
            <AllTimeWithCross items={item} handleChecked={handleTimeCrossCLick} />
        )
    }

    // function for cross click on time
    const handleTimeCrossCLick = selectedValue => {
        setTimeChecked(true)
        if (timeList.includes(selectedValue)) {
            setTimeList(timeList.filter(ids => ids !== selectedValue))
        } else {
            setTimeList([...timeList, selectedValue])
        }
        setErrMsg(false)
    }

    const renderPreAddedTaskImages = ({ item }) => {
        return (
            <CommentImageOnEditModal
                commentImages={item}
                removeImage={handleRemoveImage}
                checkedList={arrayList}
            />
        )
    }

    // function for cross click on time
    const handleRemoveImage = selectedImagesId => {
        if (arrayList.includes(selectedImagesId)) {
            setArrayList(arrayList.filter(ids => ids !== selectedImagesId));
            const matchingIds = arrayList.filter(ids => ids == selectedImagesId);
            setDeletedImageId(prevDeletedImageIds => [...prevDeletedImageIds, ...matchingIds]);
        }
    }
    // edit_myTask
    // list for comments images
    const renderAddedTaskImages = ({ item }) => {
        console.log('item renderAddedTaskImages', item);
        return <CommentImagesTab commentImages={item} />
    }

    const handleSubmi = async () => {
        try {
            console.log('Starting post creation...', taskId);
            if (!taskname) {
                Toast.show({ text1: 'Please enter name' });
                return;

            }
            if (timeList.length == 0) {
                Toast.show({ text1: 'Please select schedule time' });
                return;
            }
            const feedBackData = new FormData();
            // Append data to the FormData object
            feedBackData.append("taskid", taskId)
            feedBackData.append("name", taskname)
            feedBackData.append("description", "")
            feedBackData.append("priority", priorityChecked)
            timeList?.map((e, index) => {
                feedBackData.append(`schedule_time`, e)
            })
            feedBackData.append("repeat", repeatValue)
            daysList?.map((e, index) => {
                feedBackData.append(`custom`, e)
            })
            feedBackData.append("date", selectedDate)
            feedBackData.append("editing", 1)
            feedBackData.append("group_id", groupId)
            feedBackData.append("task_type", "T")
            feedBackData.append("repeat_time", 0)
            feedBackData.append("privacy", "")
            feedBackData.append("preference_id", 0)
            { console.log('deleted iamgesss id----->>>', deletedImageId); }
            deletedImageId.forEach(e => feedBackData.append(`deleteimagesid[]`, e))
            if (picker.length > 0) {
                console.log('Uploading from gallery', picker);
                picker.forEach((item, index) => {
                    const imageName = item.path.slice(item.path.lastIndexOf('/') + 1);
                    feedBackData.append('files', {
                        name: imageName,
                        type: item.mime,
                        uri: item.path,
                    });
                });

            }
            console.log('Data to be sent:', feedBackData);
            var url = 'http://54.153.75.225/backend/api/v1/goaccounting/my-task/'
            var furl = taskId
            if (furl != undefined) {
                var url = url + furl
            }
            console.log('my url======????', url);
            const response = await axios.put(
                url,
                feedBackData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${User.token}`,
                    },
                }
            );
            console.log('Response:', response);
            if (response.status === 200) {
                setPicker([])
                setFeedbackImage([])
                navigation.goBack();
                console.log('Post edited succesfulllyyyyy', response.data.headers.message);
                Toast.show({ text1: response.data.headers.message });


                // Handle success
            } else {
                console.log('Error creating post:', response.data.headers.message);
                // Handle error
            }
            // Assuming you want to set loading to false after the request.
        } catch (error) {
            console.error('Error in CreatePost', error);
            console.log('Axios Error:', error.response);
            // Handle Axios error (e.g., show an error message to the user)
        }
    };



    const initialValues = {
        taskName: route?.params?.data?.name
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            {/* header section */}
            <CustomHeader
                headerText={"Edit Task"}
                backButton={{
                    visible: true,
                    onClick: () => {
                        navigation.navigate('TaskDetails', { id: route?.params?.data?.id, group: route?.params?.group })
                    }
                }}
            />

            {/* body section */}
            <KeyboardAwareScrollView
                showsVerticalScrollIndicator={false}
                style={styles.body}
            >
                <View
                // validationSchema={taskName}
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
                    <>
                        {/* task name  */}
                        <View>
                            <Text style={styles.labelText}>Task Name</Text>
                            <TextInput
                                placeholder="Enter task name"
                                placeholderTextColor={Mycolors.textGray}
                                style={styles.textInput}
                                value={taskname}
                                onChangeText={(text) => {
                                    setTaskname(text)
                                }}
                            // value={taskName}
                            // onChangeText={handleChange("taskName")}
                            // onBlur={() => {
                            //     handleBlur("taskName")
                            //     setFieldTouched("taskName")
                            // }}
                            />

                            <Text style={styles.errorMessage}>
                                {/* {touched.taskName && errors.taskName} */}
                            </Text>
                        </View>

                        {/* choose priority  */}
                        <View>
                            <Text style={styles.labelText}>Choose Priority</Text>
                            <View style={styles.direction}>
                                <TouchableOpacity
                                    style={
                                        priorityChecked === "L"
                                            ? styles.selectedPriorityContainer
                                            : styles.priorityContainer
                                    }
                                    onPress={() => setPriorityChecked("L")}
                                >
                                    <Text
                                        style={
                                            priorityChecked === "L"
                                                ? styles.selectPriorityText
                                                : styles.priorityText
                                        }
                                    >
                                        Low
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={
                                        priorityChecked === "M"
                                            ? styles.selectedPriorityContainer
                                            : styles.priorityContainer
                                    }
                                    onPress={() => {
                                        setPriorityChecked("M")
                                    }}
                                >
                                    <Text
                                        style={
                                            priorityChecked === "M"
                                                ? styles.selectPriorityText
                                                : styles.priorityText
                                        }
                                    >
                                        Medium
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={
                                        priorityChecked === "H"
                                            ? styles.selectedPriorityContainer
                                            : styles.priorityContainer
                                    }
                                    onPress={() => setPriorityChecked("H")}
                                >
                                    <Text
                                        style={
                                            priorityChecked === "H"
                                                ? styles.selectPriorityText
                                                : styles.priorityText
                                        }
                                    >
                                        High
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* choose time  */}
                        <View>
                            <Text style={styles.labelText}>Time</Text>
                            <DatePicker
                                modal
                                open={open}
                                date={date}
                                title={"Select Time"}
                                mode={"time"}
                                minuteInterval={15}
                                onConfirm={date => {
                                    console.log('yyyyyy', date)
                                    setOpen(false)
                                    setDate(date)
                                    // setErrMsg(false)

                                    let selectedTime = moment(date).format("hh:mm A")
                                    if (timeList.includes(selectedTime)) {
                                    } else {
                                        setTimeList([...timeList, selectedTime])
                                    }
                                }}
                                onCancel={() => {
                                    setOpen(false)
                                }}
                            />

                            <FlatList
                                data={timeList}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                renderItem={renderAllTimeTab}
                                keyExtractor={(item, index) => String(index)}
                            />

                            {errMsg ? (
                                <Text style={styles.errorMessage}>Please choose time</Text>
                            ) : null}

                            <TouchableOpacity
                                style={styles.addTimeContainer}
                                onPress={() => {
                                    setOpen(true)
                                }}
                            >
                                <Text style={styles.addTimeText}>Add Time</Text>
                            </TouchableOpacity>
                        </View>

                        {/* repeat container */}
                        <TouchableOpacity
                            onPress={() => setRepeatModal(true)}
                            style={styles.repeatContainer}
                        >
                            <Text style={styles.labelText}>Select Repeat Option</Text>
                            <TouchableOpacity
                                onPress={() => setRepeatModal(true)}
                                style={styles.direction}
                            >
                                <Text style={styles.repeatValue}>{showRepeatValue}</Text>
                                <Image
                                    resizeMode="contain"
                                    source={require("../../../../assets/Remindably/repeatArrow.png")}
                                />
                            </TouchableOpacity>
                        </TouchableOpacity>

                        {/* auto fill event create details toggle section */}
                        <View style={styles.toggleContainer}>
                            <Text style={styles.labelText}>Hide Task</Text>
                            <ToggleSwitch
                                isOn={autoHideTask}
                                onColor={Mycolors.lightOrange}
                                offColor={Mycolors.lightGray}
                                size="medium"
                                onToggle={() => setAutoHideTask(!autoHideTask)}
                            />
                        </View>

                        {/* upload media section */}
                        <View style={{ marginTop: 10 }}>
                            <Text style={styles.labelText}>Upload media</Text>

                            {/* pre selected image section  */}
                            {route?.params?.data?.taskimages?.length >= 0 ? (
                                <FlatList
                                    data={route?.params?.data?.taskimages}
                                    horizontal={true}
                                    showsHorizontalScrollIndicator={false}
                                    renderItem={renderPreAddedTaskImages}
                                    keyExtractor={(item, index) => String(index)}
                                />
                            ) : null}
                        </View>

                        {/* uploaded images  */}
                        <View style={{ marginVertical: 5 }}>
                            {feedbackImage?.length >= 0 ? (
                                <FlatList
                                    data={feedbackImage}
                                    horizontal={true}
                                    showsHorizontalScrollIndicator={false}
                                    renderItem={renderAddedTaskImages}
                                    keyExtractor={(item, index) => String(index)}
                                />
                            ) : null}
                        </View>

                        {/* upload image section */}
                        <TouchableOpacity
                            onPress={() => setCameraGalleryModal(true)}
                            style={styles.uploadMediaContainer}
                        >
                            <View style={{ alignItems: "center", flexDirection: "row" }}>
                                <Image
                                    style={styles.uploadImageStyle}
                                    resizeMode="contain"
                                    source={require("../../../../assets/Remindably/UploadMedia.png")}
                                />
                                <Text style={styles.uploadMediaText}>Upload task image</Text>
                            </View>
                            <Image
                                resizeMode="contain"
                                source={require("../../../../assets/Remindably/repeatArrow.png")}
                            />
                        </TouchableOpacity>

                        {/* save group button  */}
                        <TouchableOpacity style={styles.buttonContainer} onPress={() => handleSubmi()}>
                            <SubmitButton
                                loader={buttonLoader}
                                buttonText={"Submit"}
                                submitButton={handleSubmi}
                            />
                        </TouchableOpacity>

                        {/* repeat modal  */}
                        <RepeatModal
                            visibleModal={repeatModal}
                            onClose={handleRepeatModalClose}
                            repeatValue={repeatValue}
                        />

                        {/* Custom modal  */}
                        <CustomModal
                            visibleModal={customModal}
                            onClose={handleCustomModalClose}
                            onSubmitClick={handleCustomSubmitClick}
                        />

                        {/* Calender modal  */}
                        <RepeatCalendarModal
                            visibleModal={calendarModal}
                            onClose={handleCalendarModalClose}
                            onSubmitClick={handleCalendarSubmitClick}
                        />

                        {/* Camera Gallery Modal  */}
                        <CameraGalleryModal
                            visibleModal={cameraGalleryModal}
                            onClose={() => {
                                setCameraGalleryModal(false)
                            }}
                            cameraClick={openCamera}
                            galleryClick={openLibrary}
                        />
                    </>
                    {/* )} */}
                </View>

                {/* toaster message for error response from API  */}
                {/* <CommonToast ref={toastRef} /> */}
            </KeyboardAwareScrollView>
        </KeyboardAvoidingView>
    )
}

export default EditTask

const styles = StyleSheet.create({
    container: {
        backgroundColor: Mycolors.WHITE,
        flex: 1
    },
    body: {
        flex: 1,
        padding: 20
    },
    direction: { flexDirection: "row" },
    profileImage: {
        borderRadius: 50,
        height: 80,
        marginRight: 10,
        width: 80
    },
    copyImage: { marginTop: 5 },
    textDirection: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    labelText: {
        color: Mycolors.THEME_BLACK,
        fontSize: 14,
        fontWeight: "500",
        paddingVertical: 8
    },
    addTimeContainer: {
        alignItems: "center",
        alignSelf: "center",
        backgroundColor: Mycolors.THEME_ORANGE,
        borderRadius: 16,
        height: 30,
        justifyContent: "center",
        marginTop: 8,
        width: 89
    },
    addTimeText: {
        color: Mycolors.WHITE,
        fontSize: 12
    },
    textInput: {
        backgroundColor: Mycolors.WHITE,
        borderColor: Mycolors.brightGray,
        borderRadius: 10,
        borderWidth: 1,
        color: Mycolors.THEME_BLACK,
        fontSize: 16,
        padding: 15
    },
    errorMessage: {
        color: Mycolors.RED,
        paddingHorizontal: 10
    },
    priorityContainer: {
        justifyContent: "center",
        width: 124,

        width: dimensions.SCREEN_WIDTH * 0.29
    },
    selectedPriorityContainer: {
        backgroundColor: Mycolors.THEME_ORANGE,
        borderRadius: 23,
        justifyContent: "center",
        width: 124
    },
    priorityText: {
        alignSelf: "center",
        color: Mycolors.THEME_BLACK,
        fontSize: 14,
        fontWeight: "400",
        paddingVertical: 15,
        textAlign: "center"
    },
    selectPriorityText: {
        alignSelf: "center",
        color: Mycolors.WHITE,
        fontSize: 14,
        fontWeight: "500",
        paddingVertical: 15,
        textAlign: "center"
    },
    repeatContainer: {
        alignItems: "center",
        backgroundColor: Mycolors.WHITE,
        borderRadius: 8,
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 5,
        paddingVertical: 10
    },
    repeatValue: {
        color: Mycolors.THEME_ORANGE,
        fontSize: 14,
        fontWeight: "500",
        marginRight: 5
    },
    loaderContainer: {
        alignSelf: "center",
        flex: 1,
        justifyContent: "center"
    },
    addMembersContainer: {
        alignItems: "center",
        alignSelf: "center",
        backgroundColor: Mycolors.THEME_ORANGE,
        borderRadius: 16,
        height: 35,
        justifyContent: "center",
        marginTop: 8,
        width: 128
    },
    noMembersContainer: {
        alignContent: "center",
        alignItems: "center",
        flex: 1,
        justifyContent: "center"
    },
    noMembersText: {
        color: Mycolors.THEME_BLACK,
        fontSize: 16,
        fontWeight: "500",
        padding: 20
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
        justifyContent: "space-between",
        marginVertical: 8,
        paddingHorizontal: 5
    },
    uploadImageStyle: {
        height: 30,
        paddingHorizontal: 25,
        width: 30
    },
    uploadMediaText: {
        color: Mycolors.THEME_BLACK,
        fontSize: 14
    },
    toggleContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 8,
        marginVertical: 15
    },
    buttonContainer: { marginVertical: 20 }
})
