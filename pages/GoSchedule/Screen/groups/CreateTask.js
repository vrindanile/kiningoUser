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
// add_task
import { requestGetApi, get_memberList, add_members, invite_user, add_task, requestPostApi, creation, } from '../../../../WebApi/Service'
import { useSelector, useDispatch } from 'react-redux';

import DatePicker from "react-native-date-picker"
import ImagePicker from "react-native-image-crop-picker"
import React, { useEffect, useRef, useState } from "react"
import ToggleSwitch from "toggle-switch-react-native"
import moment from "moment"
// import { Formik } from "formik"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
// internal imports
import axios from "axios";
import AllTimeWithCross from "./AllTimeWithCross"
import CameraGalleryModal from "./CameraGalleryModal"
import CommentImagesTab from "./CommentImagesTab"
import Toast from 'react-native-toast-message'
// import CommonToast from "../../constants/CommonToast"
import CustomHeader from "../../Constants/CustomHeaader"
import CustomModal from "./CustomModal"
// import GroupServices from "../../service/GroupServices"
import RecentlyAddedMembersTab from "./RecentlyAddedMembersTab"
import RepeatCalendarModal from "./RepeatCalendarModal"
import RepeatModal from "./RepeatModal"
import SubmitButton from '../../Constants/SubmitButton'
import TaskAssignMemberModal from "./TaskAssignMemberModal"
// import { colors } from "../../constants/ColorConstant"
import { Mycolors } from "../../../../utility/Mycolors"
// import { taskName } from "../../constants/SchemaValidation"

const CreateTask = ({ route, navigation }) => {
    const [buttonLoader, setButtonLoader] = useState(false)
    const [calendarModal, setCalendarModal] = useState(false)
    const [customModal, setCustomModal] = useState(false)
    const [picker, setPicker] = useState([])

    const [groupIdd, setGroupIdd] = useState('')
    const [daysList, setDaysList] = useState([])
    const [taskName, setTaskName] = useState('')
    const [groupId, setGroupId] = useState(
        route?.params?.groupDetails?.groupid
            ? route?.params?.groupDetails?.groupid
            : route?.params?.data
    )
    const [assignMemberModal, setAssignMemberModal] = useState(false)
    const [autoHideTask, setAutoHideTask] = useState(false)
    const [cameraGalleryModal, setCameraGalleryModal] = useState(false)
    const [date, setDate] = useState(new Date())
    const [errMsg, setErrMsg] = useState(false)
    const [feedbackImage, setFeedbackImage] = useState([])
    const [open, setOpen] = useState(false)
    const [priorityChecked, setPriorityChecked] = useState("L")
    const [repeatModal, setRepeatModal] = useState(false)
    const [repeatValue, setRepeatValue] = useState("O")
    const [selectedDate, setSelectedDate] = useState("")
    const [selectedMembersId, setSelectedMembersId] = useState([])
    const [selectedMembersList, setSelectedMembersList] = useState([])
    const [showRepeatValue, setShowRepeatValue] = useState("Once")
    const [timeList, setTimeList] = useState([])



    timeList.map((e, index) => {
        console.log(`schedule_time`, e);
    });
    const toastRef = useRef()
    const User = useSelector(state => state.user.user_details)
    console.log('User', User);
    useEffect(() => {

        // initialValue()
        setTaskName('')
        // setTimeList([])
        // setSelectedMembersId([])
        // setSelectedMembersList([])
        timeList.map((e, index) => {
            console.log(`schedule_time`, e);
        })
        let id = route?.params?.data
        console.log('my data for detail creatrTask', route?.params?.data)
        setGroupIdd(route?.params?.data?.data)
        getAllMembers()
        const unsubscribe = navigation.addListener("focus", () => {
            setFeedbackImage([])
        })
        return unsubscribe
    }, [navigation, route])
    useEffect(() => {

        const unsubscribe = navigation.addListener('blur', () => {

            setTaskName('')
            setTimeList([])
            setFeedbackImage([])
            setPicker([])
            setShowRepeatValue('Once')
            setPriorityChecked('L')
            setSelectedMembersList([])
            setSelectedMembersId([])
        });


        return unsubscribe;
    }, [navigation])
    // function for open camera
    const getAllMembers = async (text) => {
        console.log(' all meee create task')
        // setLoader(true)
        var fUrl = get_memberList
        var murl = `?group_id=` + route?.params?.data
        var urls = '&case=' + 1
        console.log('my url task details---------->', urls)
        if (urls != undefined) {
            fUrl = fUrl + murl + urls
        }
        console.log("saaaaaccc all members:::", fUrl);
        const { responseJson, err } = await requestGetApi(fUrl, '', 'GET', User.token)
        setLoader(false)
        console.log('response of', responseJson)
        setMyGroupList(responseJson.body)
        if (responseJson.headers.success == true) {
            console.log('the res after sucess of specific members tasks', responseJson)
            const data = responseJson.body.map((el, index) => ({ ...el, memdId: (index + 1)?.toString() }))
            setAllMembersData(data)
            // setGroupName(responseJson.body.name)
            // setGroupDetails(responseJson.body)

        } else {

            setalert_sms(err)
            setMy_Alert(true)
        }
    }
    const initialValue = () => {
        { setFeedbackImage([]), setSelectedMembersId([]), setTaskName(''), setSelectedMembersList([]), setTimeList([]), setDaysList([]), setTaskName('') }
    }


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
    // const openLibrary = async () => {
    //     try {
    //         let imageList = []
    //         let value = await ImagePicker.openPicker({
    //             width: 1080,
    //             height: 1080,
    //             cropping: true,
    //             multiple: true,
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
    //             console.log(image, 'image');
    //             setFeedbackImage(image)
    //             setCameraGalleryModal(false)
    //         })
    //     } catch (error) {
    //         setCameraGalleryModal(false)
    //         console.log("error in openLibrary", error)
    //     }
    // }
    // const openLibrary = async () => {
    //     console.log('picker');
    //     try {
    //         let images = await ImagePicker.openPicker({
    //             width: 1080,
    //             height: 1080,
    //             cropping: true,
    //             mediaType: 'photo',
    //             compressImageQuality: 1,
    //             compressImageMaxHeight: 1080 / 2,
    //             compressImageMaxWidth: 1080 / 2,
    //             multiple: true
    //         });
    //         const totalSelectedImages = picker.length + images.length;

    //         console.log('---------then block------->', images);
    //         setPicker([...picker, ...images]);
    //         // setcurrentSelection('image');
    //         setCameraGalleryModal(false)

    //     } catch (error) {
    //         console.log('error in openLibrary', error);
    //     }
    // };



    // const openLibrary = async () => {
    //     console.log('picker');
    //     try {
    //         let images = await ImagePicker.openPicker({
    //             width: 1080,
    //             height: 1080,
    //             cropping: true,
    //             mediaType: 'photo',
    //             compressImageQuality: 1,
    //             compressImageMaxHeight: 1080 / 2,
    //             compressImageMaxWidth: 1080 / 2,
    //             multiple: true
    //         });
    //         const totalSelectedImages = picker.length + images.length;

    //         console.log('---------then block------->', images);
    //         setPicker([...picker, ...images]);
    //         setCameraGalleryModal(false)

    //     } catch (error) {
    //         console.log('error in openLibrary', error);
    //     }
    // };



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
            } else if (text === "D") {
                setRepeatValue("D")
                setShowRepeatValue("Daily")
            } else if (text === "T") {
                setRepeatValue("T")
                setShowRepeatValue("Date")
                setCalendarModal(true)
            } else if (text === "C") {
                setRepeatValue("C")
                setShowRepeatValue("Custom")
                setCustomModal(true)
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
    // const handleCustomSubmitClick = dayList => {
    //     console.log('my custom is clicked', dayList);
    //     setCustomModal(false)
    //     setDaysList(dayList)
    // }


    const handleCustomSubmitClick = dayList => {
        console.log('my custom is clicked', dayList);

        if (dayList.length === 0) {
            // Show a toast or handle the case where dayList is empty
            Toast.show({ text1: 'Day list is empty' });
            return; // Exit the function early to prevent closing the modal and state update
        }

        setCustomModal(false);
        setDaysList(dayList);
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
        if (timeList.includes(selectedValue)) {
            setTimeList(timeList.filter(ids => ids !== selectedValue))
        } else {
            setTimeList([...timeList, selectedValue])
        }
        setErrMsg(false)
    }

    // list for comments images
    const renderAddedTaskImages = ({ item }) => {
        return <CommentImagesTab commentImages={item} />
    }

    // function for assign member for task submit click
    const handleAssignMemberSubmitClick = (memberList, userList) => {
        {
            console.log('allmemberswhich are asigned');
            console.log('memberList', memberList)
        }
        if (memberList.length > 0) {
            Toast.show({ text1: "Members invited succesfully" });
            setAssignMemberModal(false)
            setSelectedMembersId(memberList)
            setSelectedMembersList(userList)
        } else {
            Toast.show({ text1: "Please select members" });
            return
        }

    }

    // list for recently added members
    const renderAddedMembers = ({ item }) => {
        console.log('my asdedd member for tadk----???', item)
        return <RecentlyAddedMembersTab item={item} />
    }

    //  function for task submit button click api call to create task
    // const onSubmit = async () => {
    //     console.log('my submit for task creation');

    //     if (timeList.length >= 1) {
    //         setButtonLoader(true);
    //         setErrMsg(false);
    //         Keyboard.dismiss();

    //         const feedBackData = new FormData();

    //         // if (feedbackImage !== null) {
    //         //     feedbackImage.map((e, index) => {
    //         //         feedBackData.append(`files[${index}]`, e);
    //         //     });
    //         // }
    //         if (picker.length > 0) {
    //             console.log('picker gallery', picker);
    //             picker.map((item, index) => {
    //                 const imageName = item.path.slice(
    //                     item.path.lastIndexOf('/'),
    //                     item.path.length,
    //                 );
    //                 feedBackData.append(`files`, {
    //                     name: imageName,
    //                     type: item.mime,
    //                     uri: item.path,
    //                 });
    //             });
    //         }
    //         feedBackData.append("name", taskName);
    //         feedBackData.append("description", "");
    //         feedBackData.append("priority", priorityChecked);

    //         timeList.map((e, index) => {
    //             feedBackData.append(`schedule_time[${index}]`, e);
    //         });

    //         feedBackData.append("repeat", repeatValue);

    //         daysList.map((e, index) => {
    //             feedBackData.append(`custom[${index}]`, e);
    //         });

    //         feedBackData.append("date", selectedDate);
    //         feedBackData.append("editing", 1);
    //         feedBackData.append("group_id", groupId);
    //         feedBackData.append("task_type", "T");
    //         feedBackData.append("repeat_time", 0);
    //         feedBackData.append("privacy", "");
    //         feedBackData.append("preference_id", 0);
    //         feedBackData.append("autoHideTask", autoHideTask);

    //         if (selectedMembersId !== null) {
    //             selectedMembersId.map((e, index) => {
    //                 feedBackData.append(`taskassignmembers[${index}]`, e);
    //             });
    //         }

    //         console.log(feedBackData, 'feedBackData');
    //         try {
    //             const { responseJson, err } = await requestPostApi(creation, feedBackData, 'POST', User.token)

    //             console.log('response of', responseJson);

    //             if (responseJson.data.success === true) {
    //                 console.log('the res after success of addition of task', responseJson);
    //                 setAllMembersData(responseJson);
    //                 // Handle other actions on success.
    //             } else {
    //                 // Handle error response.
    //                 console.log('Error response:', responseJson);
    //                 setalert_sms(responseJson.data.message); // Assuming this contains the error message.
    //                 setMy_Alert(true);
    //             }

    //         } catch (error) {
    //             // Handle network or other errors.
    //             console.error('Error:', error);
    //         } finally {
    //             setButtonLoader(false);
    //         }
    //     } else {
    //         setErrMsg(true);
    //     }
    // };


    // final function
    const onSubmit = async () => {
        console.log(autoHideTask, 'picker check camera');
        if (!taskName) {
            // Show a toast or handle the case where the task name is empty
            Toast.show({ text1: 'Task name is empty' });
            return; // Exit the function early to prevent the API call
        }
        if (timeList.length == 0) {
            Toast.show({ text1: 'Please select schedule time' });
            return;
        }
        try {
            console.log('Starting post creation...');


            const data = new FormData();

            data.append("name", taskName);
            data.append("description", "");
            data.append("priority", priorityChecked);

            timeList.forEach((e, index) => {
                // Split the time string by space to separate the time and AM/PM
                // const parts = e.split(' ');

                // Get the time portion (the first part)
                // const time = parts[0];

                // Append to FormData with the appropriate key
                data.append(`schedule_time[${index}]`, e);
            });

            data.append("repeat", repeatValue);

            daysList.map((e, index) => {
                console.log('cus6tom time while upload', e);
                data.append(`custom[${index}]`, e);
            });

            data.append("date", selectedDate);
            data.append("editing", 1);
            data.append("group_id", groupId);
            data.append("task_type", "T");
            data.append("repeat_time", 0);
            data.append("privacy", "");
            data.append("preference_id", 0);
            data.append("autoHideTask", autoHideTask);

            if (selectedMembersId !== null) {
                selectedMembersId.map((e, index) => {
                    console.log('easisgn memen', e);
                    data.append(`taskassignmembers[${index}]`, e);
                });
            }

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
                'http://54.153.75.225/backend/api/v1/goaccounting/add-task',
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
                console.log('Post created successfully', response);
                // navigation.goBack()
                { console.log('my groupiddd after successsss------->>>', groupId); }
                navigation.navigate('GroupDetails', { data: groupId })
                // navigation.navigate(
                //     "GroupDetails",
                //     {
                //         data: groupDetails?.groupid
                //     }
                // )
                Toast.show({ text1: response.data.headers.message });
            } else {
                console.log('Error creating post:', response.data.headers.message);
            }

            // Assuming you want to set loading to false after the request.

        } catch (error) {
            console.error('Error in CreatePost', error);
        }
    }


    // const onSubmit = async () => {
    //     console.log(autoHideTask, 'picker check camera');

    //     if (!taskName) {
    //         // Show a toast or handle the case where the task name is empty
    //         Toast.show({ text1: 'Task name is empty' });
    //         return; // Exit the function early to prevent the API call
    //     }

    //     try {
    //         console.log('Starting post creation...');

    //         const data = new FormData();

    //         data.append("name", taskName);
    //         data.append("description", "");
    //         data.append("priority", priorityChecked);

    //         // ... (rest of the data appending logic)

    //         console.log('Data to be sent:', data);

    //         const response = await axios.post(
    //             'http://54.153.75.225/backend/api/v1/goaccounting/add-task',
    //             data,
    //             {
    //                 headers: {
    //                     'Content-Type': 'multipart/form-data',
    //                     Authorization: `Bearer ${User.token}`,
    //                 },
    //             }
    //         );

    //         console.log('Response:', response.data);

    //         if (response.status === 200) {
    //             console.log('Post created successfully', response);
    //             navigation.goBack();
    //             Toast.show({ text1: response.data.headers.message });
    //         } else {
    //             console.log('Error creating post:', response.data.headers.message);
    //         }

    //         //         Assuming you want to set loading to false after the request.

    //     } catch (error) {
    //         console.error('Error in CreatePost', error);
    //     }
    // }





    // const onSubmit = async () => {
    //     console.log('my submit for task creation');

    //     if (timeList.length >= 1) {
    //         setButtonLoader(true);
    //         setErrMsg(false);
    //         Keyboard.dismiss();

    //         const feedBackData = new FormData();

    //         if (feedbackImage !== null) {
    //             feedbackImage.map((e, index) => {
    //                 feedBackData.append(`files[${index}]`, e);
    //             });
    //         }

    //         feedBackData.append("name", taskName);
    //         feedBackData.append("description", "");
    //         feedBackData.append("priority", priorityChecked);

    //         timeList.map((e, index) => {
    //             feedBackData.append(`schedule_time[${index}]`, e);
    //         });

    //         feedBackData.append("repeat", repeatValue);

    //         daysList.map((e, index) => {
    //             feedBackData.append(`custom[${index}]`, e);
    //         });

    //         feedBackData.append("date", selectedDate);
    //         feedBackData.append("editing", 1);
    //         feedBackData.append("group_id", groupId);
    //         feedBackData.append("task_type", "T");
    //         feedBackData.append("repeat_time", 0);
    //         feedBackData.append("privacy", "");
    //         feedBackData.append("preference_id", 0);
    //         feedBackData.append("autoHideTask", autoHideTask);

    //         if (selectedMembersId !== null) {
    //             selectedMembersId.map((e, index) => {
    //                 feedBackData.append(`taskassignmembers[${index}]`, e);
    //             });
    //         }

    //         console.log(feedBackData, 'feedBackData');
    //         try {
    //             const responseJson = await axios.post(
    //                 'http://54.153.75.225/backend/api/v1/goaccounting/add-task',
    //                 feedBackData,
    //                 {
    //                     headers: {
    //                         'Content-Type': 'multipart/form-data',
    //                         Authorization: `Bearer ${User.token}`,
    //                     },
    //                 }
    //             );

    //             console.log('response of', responseJson);

    //             if (responseJson.data.success === true) {
    //                 console.log('the res after success of addition of task', responseJson);
    //                 setAllMembersData(responseJson.data.body);
    //                 // Handle other actions on success.
    //             } else {
    //                 // Handle error response.
    //                 console.log('Error response:', responseJson);
    //                 setalert_sms(responseJson.data.message); // Assuming this contains the error message.
    //                 setMy_Alert(true);
    //             }

    //         } catch (error) {
    //             // Handle network or other errors.
    //             console.error('Error:', error);
    //         } finally {
    //             setButtonLoader(false);
    //         }
    //     } else {
    //         setErrMsg(true);
    //     }
    // };
    const initialValues = {
        taskName: ""
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            {/* header section */}
            <CustomHeader
                headerText={"Create Task"}
                backButton={{
                    visible: true,
                    onClick: () => {
                        navigation.navigate('MyGroups')
                    }
                }}
            />

            {/* body section */}
            <KeyboardAwareScrollView
                showsVerticalScrollIndicator={false}
                style={styles.container}
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
                    <View style={styles.body}>
                        {/* task name  */}
                        <View>
                            <Text style={styles.labelText}>Task Name</Text>
                            <TextInput
                                placeholder="Enter task name"
                                placeholderTextColor={Mycolors.textGray}
                                style={styles.textInput}
                                // value={values.taskName}
                                // onChangeText={handleChange("taskName")}
                                // onBlur={() => {
                                //     handleBlur("taskName")
                                //     setFieldTouched("taskName")
                                // }}
                                value={taskName}
                                onChangeText={(text) => setTaskName(text)}
                            />
                            <Text style={styles.errorMessage}>
                                {/* {touched.taskName && errors.taskName} */}
                            </Text>
                        </View>

                        {/* choose priority  */}
                        <View>
                            <Text style={styles.labelText}>Choose Priority</Text>
                            <View style={styles.directionPriority}>
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
                        <View style={{ marginTop: 12 }}>
                            <Text style={styles.labelText}>Time</Text>

                            <DatePicker
                                modal
                                open={open}
                                date={date}
                                title={"Select Time"}
                                mode={"time"}
                                minuteInterval={15}
                                onConfirm={date => {
                                    setOpen(false)
                                    setDate(date)
                                    setErrMsg(false)

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

                            {timeList?.length > 0 ? (
                                <FlatList
                                    data={timeList}
                                    style={{
                                        marginVertical: 12, borderColor: Mycolors.brightGray,
                                        borderRadius: 10,
                                        borderWidth: 1,
                                        color: Mycolors.THEME_BLACK,
                                        fontSize: 16,
                                        padding: 15,
                                        paddingHorizontal: 0
                                    }}
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    renderItem={renderAllTimeTab}
                                    keyExtractor={(item, index) => String(index)}
                                />
                            ) : (
                                <View style={{ marginVertical: 12 }}>
                                    <Text style={styles.noTimeText}>
                                        No Time selected. Click on
                                        <Text style={styles.noTimeTextOrange}> “Add Time” </Text>
                                        to add Time.
                                    </Text>
                                </View>
                            )}

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
                                {console.log('showRepeatValue', showRepeatValue)}
                                {showRepeatValue === 'Date' ? <Text style={styles.repeatValue}>{selectedDate}</Text> : <Text style={styles.repeatValue}>{showRepeatValue}</Text>}
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

                            {/* uploaded images  */}
                            {console.log('feedbackImage?.length >= 0', feedbackImage?.length >= 0)}
                            {feedbackImage?.length >= 0 ? (
                                <FlatList

                                    data={feedbackImage}

                                    style={
                                        picker?.length >= 0
                                            ? {
                                                marginVertical: 12,
                                                borderColor: Mycolors.brightGray,
                                                borderRadius: 10,
                                                borderWidth: 1,
                                                padding: 19

                                            }
                                            : {
                                                marginVertical: 12,
                                            }}
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
                                <Text style={styles.uploadMediaText}>Upload task images</Text>
                            </View>
                            <Image
                                resizeMode="contain"
                                source={require("../../../../assets/Remindably/repeatArrow.png")}
                            />
                        </TouchableOpacity>

                        {/* task assign member section */}
                        <View style={{
                            marginTop: 10,
                        }}>
                            <Text style={styles.labelText}>Assigned Members</Text>

                            {/*recently added members  */}
                            {selectedMembersList?.length > 0 ? (
                                <FlatList
                                    data={selectedMembersList}
                                    style={{
                                        marginVertical: 12, borderRadius: 10,
                                        borderWidth: 1,
                                        borderColor: Mycolors.brightGray,
                                        borderRadius: 10,
                                        borderWidth: 1,
                                        marginVertical: 12,
                                        padding: 19
                                    }}
                                    renderItem={renderAddedMembers}
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    keyExtractor={(item, index) => String(index)}
                                />
                            ) : (
                                <View style={styles.noMembersContainer}>
                                    <Text style={styles.noMembersText}>No Members Added</Text>
                                </View>
                            )}

                            <TouchableOpacity
                                style={styles.addMembersContainer}
                                onPress={() => {
                                    setAssignMemberModal(true)
                                }}
                            >
                                <Text style={styles.addTimeText}>Assign Member</Text>
                            </TouchableOpacity>
                        </View>

                        {/* save group button  */}
                        <TouchableOpacity style={styles.buttonContainer} onPress={() => { onSubmit() }}>
                            <SubmitButton
                                loader={buttonLoader}
                                buttonText={"Submit"}
                            // submitButton={handleSubmit}
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

                        {/* Remove Member from group modal  */}
                        <TaskAssignMemberModal
                            visibleModal={assignMemberModal}
                            onClose={() => {
                                setAssignMemberModal(false)
                            }}
                            onSubmitClick={handleAssignMemberSubmitClick}
                            navigation={navigation}
                            groupId={route?.params?.data}
                        />
                    </View>
                    {/* )} */}
                </View>

                {/* toaster message for error response from API  */}
                {/* <CommonToast ref={toastRef} /> */}
            </KeyboardAwareScrollView>
        </KeyboardAvoidingView>
    )
}

export default CreateTask

const styles = StyleSheet.create({
    container: {
        backgroundColor: Mycolors.WHITE,
        flex: 1
    },
    body: {
        flex: 1,
        padding: 20,
        paddingBottom: "10%"
    },
    direction: { flexDirection: "row", marginVertical: 12, },
    directionRepeat: { flexDirection: "row", marginVertical: 12, },
    directionPriority: {
        flexDirection: "row", marginVertical: 12, backgroundColor: Mycolors.WHITE,
        borderColor: Mycolors.brightGray,
        borderRadius: 10,
        borderWidth: 1,
        color: Mycolors.THEME_BLACK,
        fontSize: 16,
        padding: 15,
        marginVertical: 12
    },
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

    },
    addTimeContainer: {
        alignItems: "center",
        alignSelf: "center",
        backgroundColor: Mycolors.THEME_ORANGE,
        borderRadius: 16,
        height: 30,
        justifyContent: "center",
        marginTop: 8,
        width: 89,
        marginTop: 15
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
        padding: 15,
        marginVertical: 12
    },
    errorMessage: {
        color: Mycolors.RED,
        paddingHorizontal: 10
    },
    priorityContainer: {
        justifyContent: "center",
        width: 97,

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
        marginTop: 18,
        paddingVertical: 10,
        borderColor: Mycolors.brightGray,
        borderRadius: 10,
        borderWidth: 1,
        padding: 10


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
        width: 128,
        marginVertical: 10
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
        marginVertical: 5,
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
    noTimeText: {
        color: Mycolors.THEME_BLACK,
        fontSize: 14,
        fontWeight: "500",
        textAlign: "center"
    },
    noTimeTextOrange: {
        color: Mycolors.THEME_ORANGE,
        fontSize: 14,
        fontWeight: "500",
        textAlign: "center"
    },
    toggleContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 8,
        marginVertical: 15,
        borderColor: Mycolors.brightGray,
        borderRadius: 10,
        borderWidth: 1,
        padding: 19,
        marginTop: 25
    },
    buttonContainer: { marginVertical: 20 }
})
