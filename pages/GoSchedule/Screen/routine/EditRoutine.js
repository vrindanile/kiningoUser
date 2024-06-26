//external imports
import {
    FlatList,
    Image,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native"
import { useIsFocused } from "@react-navigation/native";
import DatePicker from "react-native-date-picker"
import React, { useEffect, useRef, useState } from "react"
import moment from "moment"
import axios from "axios"
import { useNavigation } from '@react-navigation/native';
// import { Formik } from "formik"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
//internal imports
import AllTimeWithCross from "../groups/AllTimeWithCross"
import ChangePreferencesOnRoutineModal from "./ChangePreferencesOnRoutineModal"
import CommonToast from "../../Constants/CommonToast"
import CustomHeader from "../../Constants/CustomHeaader"
import CustomModal from "../groups/CustomModal"
// import GroupServices from "../../service/GroupServices"
import InviteMemberOnRoutineModal from "./InviteMemberOnRoutineModal"
import RecentlyAddedMembersTab from "../groups/RecentlyAddedMembersTab"
import RepeatCalendarModal from "../groups/RepeatCalendarModal"
import RepeatModal from "../groups/RepeatModal"
import SubmitButton from "../../Constants/SubmitButton"
import { useSelector, useDispatch } from 'react-redux';
import { requestGetApi, get_memberList, add_members, invite_user, add_task, requestPostApi, creation, edit_myTask, delete_myTask } from '../../../../WebApi/Service'
import Toast from 'react-native-toast-message'
// import { colors } from "../../constants/ColorConstant"
// import { routineValidation } from "../../constants/SchemaValidation"
import { Mycolors } from "../../../../utility/Mycolors"
import { log } from "react-native-reanimated"
const EditRoutine = ({ route }) => {
    const isFocus = useIsFocused()
    const [buttonLoader, setButtonLoader] = useState(false)
    const navigation = useNavigation();
    const [calendarModal, setCalendarModal] = useState(false)
    const [customModal, setCustomModal] = useState(false)
    const [date, setDate] = useState(new Date())
    const [daysList, setDaysList] = useState([])
    const [errMsg, setErrMsg] = useState(false)
    const [memberIdModal, setMemberIdModal] = useState(false)
    const [open, setOpen] = useState(false)
    const [preferenceModal, setPreferenceModal] = useState(false)
    const [preferences, setPreferences] = useState([])
    const [repeatModal, setRepeatModal] = useState(false)
    const [repeatValue, setRepeatValue] = useState("O")
    const [routineId, setRoutineId] = useState(0)
    const [routineType, setRoutineType] = useState("S")
    const [selectedDate, setSelectedDate] = useState("")
    const [selectedMembersId, setSelectedMembersId] = useState([])
    const [selectedMembersList, setSelectedMembersList] = useState([])
    const [showRepeatValue, setShowRepeatValue] = useState("Once")
    const [timeChecked, setTimeChecked] = useState(true)
    const [timeList, setTimeList] = useState([])
    const [title, setTitle] = useState('')
    const [subTitle, setSubTitle] = useState('')
    const [description, setDescription] = useState('')
    const toastRef = useRef()
    const User = useSelector(state => state.user.user_details)

    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            // routine id
            console.log('my data from the params--->>>', route.params.data);
            setRoutineId(route?.params?.data?.routineid)
            console.log('route?.params?.data?.routineid', route?.params?.data?.subTitle
            );

            // for public or private type
            if (route?.params?.data?.routinetype === "Private Routine") {
                setRoutineType("S")
            } else {
                setRoutineType("P")
            }
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
            // for preferences value
            let result = []
            var obj = {
                icon: route?.params?.data?.preferenceicon,
                id: route?.params?.data?.preferenceid,
                name: route?.params?.data?.preferencename
            }
            result.push(obj)
            setPreferences(result)

            // for time list
            let time = route?.params?.data?.time?.map(e => e.times)
            setTimeList(time)

            //pre selected member list
            console.log('my members list------>>>', route?.params?.data);
            let memberIdList = route?.params?.data?.allmembers?.map(e => e.userid)
            console.log('memberIdList--->>>?', memberIdList);
            setSelectedMembersId(memberIdList)
            setSelectedMembersList(route?.params?.data?.allmembers)
            setTitle(route?.params?.data?.title)
            setSubTitle(route?.params?.data?.subtitle)
            setDescription(route?.params?.data?.description)

            // subtitle
        })
        return unsubscribe
    }, [isFocus])

    // list for time with cross button
    const renderAllTimeTab = ({ item }) => {
        return (
            <AllTimeWithCross items={item} handleChecked={handleTimeCrossCLick} />
        )
    }

    // function on selected time cross click
    const handleTimeCrossCLick = selectedValue => {
        setTimeChecked(true)
        if (timeList.includes(selectedValue)) {
            setTimeList(timeList.filter(ids => ids !== selectedValue))
        } else {
            setTimeList([...timeList, selectedValue])
        }
        setErrMsg(false)
    }

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
    }

    // function for close modal after select the custom data
    const handleCustomSubmitClick = dayList => {
        setCustomModal(false)
        setDaysList(dayList)
    }

    // function for close calender modal after select the date
    const handleCalendarModalClose = () => {
        setCalendarModal(false)
    }

    // function for close calender modal after select the date and submit click
    const handleCalendarSubmitClick = selectDate => {
        setCalendarModal(false)
        setSelectedDate(moment(selectDate).format("YYYY-MM-DD"))
    }

    // function for member modal close
    const handleMemberIdModalClose = () => {
        setMemberIdModal(false)
    }

    // function for close modal after member add
    const handleMemberIdAddClick = (memberIdList, memberList) => {
        console.log('memberIdList?????????', memberIdList, memberList)
        setMemberIdModal(false)
        setSelectedMembersId(memberIdList)
        setSelectedMembersList(memberList)
    }

    // list for time with cross icon
    const renderAddedMembers = ({ item }) => {
        return <RecentlyAddedMembersTab item={item} />
    }

    // change preference functionality
    const handlePreferenceSubmitClick = (arrayList, interest) => {
        setPreferenceModal(false)
        setPreferences(interest)
    }

    //  function for routine submit button click api call to edit routine
    const handleSubmi = async () => {
        console.log('jjjjjj my edit button', selectedDate);
        if (timeList.length == 0) {
            Toast.show({ text1: 'Please select schedule time' });
            return;
        }


        try {
            const feedBackData = new FormData();
            const type = 'R';
            console.log('my data00')
            feedBackData.append('task_type', 'R');
            feedBackData.append('taskid', '85');
            feedBackData.append('name', title);
            console.log('my data 11')
            feedBackData.append('description', description);
            // subTitle
            feedBackData.append('subtitle', subTitle);
            timeList?.map((e, index) => {
                feedBackData.append('schedule_time', e);
            });

            feedBackData.append('repeat', repeatValue);
            console.log('my data 21')
            daysList?.map((e, index) => {
                feedBackData.append(`custom[${index}]`, e);
            });

            feedBackData.append('date', selectedDate);
            feedBackData.append('repeat_time', 0);
            feedBackData.append('privacy', routineType);
            console.log('my data 31')
            feedBackData.append('preference_id', preferences[0].id);
            console.log('preference_id---->>>>', preferences[0].id);
            selectedMembersId.map((e, index) => {

                console.log('my memer for stred routie---->>', e);
                feedBackData.append(`member[]`, e)
            })
            // feedBackData.append('preference_id', preferences[0].id);

            // selectedMembersId.forEach((e, index) => {
            //     feedBackData.append(`member`, [26]);
            // });
            // console.log('selectedMembersId', selectedMembersId);
            // {
            // selectedMembersId.length > 0 ?
            //     selectedMembersId?.map((e, index) => {
            //         feedBackData.append(`member[${index}]`, JSON.parse(e));
            //     }) : null

            // console.log('selectd members lis');
            console.log('my data members??????????????', feedBackData)
            var url = 'http://54.153.75.225/backend/api/v1/goaccounting/my-task/'
            var furl = routineId
            if (furl != undefined) {
                var url = url + furl
            }
            console.log('my data final')
            const response = await axios.put(url, feedBackData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${User.token}`,
                },
            });

            console.log('Response:', response);

            if (response.status === 200) {
                console.log('Post edited successfully', response.data);
                Toast.show({ text1: response.data.headers.message });

                navigation.goBack();
                // Handle success
            } else {
                console.log('Error creating post:', response.data.headers.message);
                // Handle error
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }

    };
    // const handleSubmi = async () => {
    //     console.log('jjjjjj my edit button', selectedDate);
    //     if (timeList.length >= 1) {
    //         console.log('does it reach here');
    //         // setButtonLoader(true)
    //         // setErrMsg(false)
    //         const feedBackData = new FormData()
    //         // feedBackData.append("businessid", route?.params?.data?.businessid)
    //         const type = 'R'
    //         feedBackData.append(`task_type`, type)
    //         console.log('typeeeee', type);
    //         feedBackData.append("taskid", '85')
    //         feedBackData.append("name", title)
    //         console.log('does it reach here555');
    //         // feedBackData.append("subtitle", subTitle)
    //         feedBackData.append("description", description)

    //         console.log('does it reach here88');
    //         timeList?.map((e, index) => {
    //             feedBackData.append(`schedule_time`, e)
    //         })
    //         console.log('does it reach here8');
    //         feedBackData.append("repeat", repeatValue)
    //         daysList?.map((e, index) => {
    //             feedBackData.append(`custom[${index}]`, e)
    //         })
    //         console.log('does it reach here08');
    //         feedBackData.append("date", selectedDate)
    //         feedBackData.append("repeat_time", 0)
    //         feedBackData.append("privacy", routineType)

    //         feedBackData.append("preference_id", preferences[0].id)
    //         console.log('does it reach here000');
    //         if (selectedMembersId !== null) {
    //             selectedMembersId?.map((e, index) => {
    //                 feedBackData.append(`member[${index}]`, e)
    //             })
    //         }
    //         console.log('my edited datat----->>>', feedBackData);
    //         // const { responseJson, err } = await requestPostApi(`goaccounting/my-task/85`, feedBackData, 'PUT', User.token)
    //         // console.log('is group eidtedddd]------->>>>', responseJson);
    //         // GroupServices.postEditTask(feedBackData)
    //         //     .then(response => {
    //         //         setButtonLoader(false)
    //         //         toastRef.current.getToast(response.data.message, "success")
    //         //         navigation.replace("StackNavigation", {
    //         //             screen: "RoutineDetails",
    //         //             params: {
    //         //                 id: routineId
    //         //             }
    //         //         })
    //         //     })
    //         //     .catch(error => {
    //         //         setButtonLoader(false)
    //         //         console.log("error--", error)
    //         //     })
    //         var url = 'http://54.153.75.225/backend/api/v1/goaccounting/my-task/'
    //         var furl = '85'
    //         if (furl != undefined) {
    //             var url = url + furl
    //         }
    //         console.log('my url======????', url);
    //         const response = await axios.put(
    //             url,
    //             feedBackData,
    //             {
    //                 headers: {
    //                     'Content-Type': 'multipart/form-data',
    //                     Authorization: `Bearer ${User.token}`,
    //                 },
    //             }
    //         );

    //         console.log('Response:', response);

    //         if (response.status === 200) {
    //             console.log('Post edited succesfulllyyyyy', response.data);
    //             // Handle success
    //         } else {
    //             console.log('Error creating post:', response.data.headers.message);
    //             // Handle error
    //         }

    //     } else {
    //         // setErrMsg(true)
    //         console.log('my error in the api');
    //     }
    // }

    const initialValues = {
        description: route?.params?.data?.description,
        subTitle: route?.params?.data?.subtitle,
        title: route?.params?.data?.title
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            {/* header section */}
            <CustomHeader
                headerText={"Edit Routine"}
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
                // validationSchema={routineValidation}
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
                        {/* public and private section  */}
                        <View style={styles.routineContainer}>
                            <TouchableOpacity
                                style={
                                    routineType === "S"
                                        ? styles.selectedPublicContainer
                                        : styles.publicContainer
                                }
                                onPress={() => {
                                    setRoutineType("S")
                                }}
                            >
                                <Image
                                    resizeMode="contain"
                                    tintColor={
                                        routineType === "S"
                                            ? Mycolors.THEME_ORANGE
                                            : Mycolors.THEME_BLACK
                                    }
                                    source={require("../../../../assets/Remindably/Lock.png")}
                                />
                                <Text
                                    style={
                                        routineType === "S"
                                            ? styles.selectedPublicText
                                            : styles.publicText
                                    }
                                >
                                    Private Routine
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={
                                    routineType === "P"
                                        ? styles.selectedPublicContainer
                                        : styles.publicContainer
                                }
                                onPress={() => {
                                    setRoutineType("P")
                                }}
                            >
                                <Image
                                    resizeMode="contain"
                                    tintColor={
                                        routineType === "P"
                                            ? Mycolors.THEME_ORANGE
                                            : Mycolors.THEME_BLACK
                                    }
                                    source={require("../../../../assets/Remindably/Globe.png")}
                                />
                                <Text
                                    style={
                                        routineType === "P"
                                            ? styles.selectedPublicText
                                            : styles.publicText
                                    }
                                >
                                    Public Routine
                                </Text>
                            </TouchableOpacity>
                        </View>

                        {/* text according to public and private routine type  */}
                        {routineType === "P" ? (
                            <Text style={styles.noteText}>
                                Public Routine:- Routine will be shared in the public
                                community.
                            </Text>
                        ) : routineType === "S" ? (
                            <Text style={styles.noteText}>
                                Private Routine:- Routine can be shared with the group only.
                            </Text>
                        ) : null}

                        {/* date time section  */}
                        <View style={styles.textDirection}>
                            <Text style={styles.preferenceText}>Time</Text>
                            <TouchableOpacity
                                onPress={() => {
                                    setOpen(true)
                                }}
                            >
                                <Text style={styles.addEditText}>Add Time</Text>
                            </TouchableOpacity>

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
                        </View>
                        <FlatList
                            data={timeList}
                            renderItem={renderAllTimeTab}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={(item, index) => String(index)}
                        />

                        {errMsg ? (
                            <Text style={styles.errorMessage}>
                                Please choose repeat time
                            </Text>
                        ) : (
                            <Text style={styles.errorMessage} />
                        )}

                        {/* repeat container  */}
                        <TouchableOpacity
                            onPress={() => setRepeatModal(true)}
                            style={styles.repeatContainer}
                        >
                            <Text style={styles.preferenceText}>Select Repeat Option</Text>
                            <TouchableOpacity
                                onPress={() => setRepeatModal(true)}
                                style={styles.direction}
                            >
                                {showRepeatValue === 'Date' ? <Text style={styles.repeatValue}>{selectedDate}</Text> : <Text style={styles.repeatValue}>{showRepeatValue}</Text>}
                                <Image
                                    resizeMode="contain"
                                    source={require("../../../../assets/Remindably/repeatArrow.png")}
                                />
                            </TouchableOpacity>
                        </TouchableOpacity>

                        {/* change preference section  */}
                        <View style={styles.preferencesDirection}>
                            <View style={styles.preferenceContainer}>
                                <View style={styles.preferenceIcon}>
                                    <Image
                                        style={{ height: 25, width: 25 }}
                                        resizeMode="cover"
                                        source={{
                                            uri: `${preferences[0]?.icon}`
                                        }}
                                    />
                                </View>
                                <Text style={styles.preferenceTitle}>
                                    {preferences[0]?.name}
                                </Text>
                            </View>

                            <TouchableOpacity
                                onPress={() => {
                                    setPreferenceModal(true)
                                }}
                            >
                                <Text style={styles.addEditText}>Change preference</Text>
                            </TouchableOpacity>
                        </View>

                        {/* title section  */}
                        <View>
                            <TextInput
                                placeholder="Enter Title"
                                placeholderTextColor={Mycolors.textGray}
                                style={styles.textInput}
                                value={title}
                                onChangeText={(text) => {
                                    setTitle(text)
                                }}
                            />

                            {/* <Text style={styles.errorMessage}>
                                {touched.title && errors.title}
                            </Text> */}
                        </View>

                        {/*Sub title section  */}
                        <View>
                            <TextInput
                                placeholder="Enter Sub Title (Optional)"
                                placeholderTextColor={Mycolors.textGray}
                                style={styles.textInput}
                                value={subTitle}
                                onChangeText={(text) => {
                                    setSubTitle(text)
                                }}
                            />

                            {/* <Text style={styles.errorMessage}>
                                {touched.subTitle && errors.subTitle}
                            </Text> */}
                        </View>

                        {/*Description section  */}
                        <View>
                            <TextInput
                                placeholder="Enter Description Here…"
                                placeholderTextColor={Mycolors.textGray}
                                style={styles.textInput}
                                // value={values.description}
                                numberOfLines={3}
                                multiline={true}
                                textAlignVertical="top"
                                value={description}
                                onChangeText={(text) => {
                                    setDescription(text)
                                }}
                            />
                            {/* <Text style={styles.errorMessage}>
                                {touched.description && errors.description}
                            </Text> */}
                        </View>

                        <TouchableOpacity
                            style={styles.inviteMemberContainer}
                            onPress={() => {
                                setMemberIdModal(true)
                            }}
                        >
                            <Image
                                resizeMode="contain"
                                source={require("../../../../assets/Remindably/UserPlus.png")}
                            />
                            <Text style={styles.inviteMemberText}>Invite new user</Text>
                        </TouchableOpacity>
                        {console.log('selectedMembersList----???????', selectedMembersList)}
                        {selectedMembersList?.length > 0 ? (
                            <FlatList
                                data={selectedMembersList}
                                renderItem={renderAddedMembers}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                keyExtractor={(item, index) => String(index)}
                            />
                        ) : null}

                        {/* save group button  */}
                        <TouchableOpacity style={{ paddingVertical: 10 }} onPress={() => handleSubmi()}>
                            <SubmitButton
                                loader={buttonLoader}
                                buttonText={"Update Routine"}
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
                            daysList={daysList}
                        />

                        {/* Calender modal  */}
                        <RepeatCalendarModal
                            visibleModal={calendarModal}
                            onClose={handleCalendarModalClose}
                            onSubmitClick={handleCalendarSubmitClick}
                        />

                        {/* Member Email Id modal  */}
                        <InviteMemberOnRoutineModal
                            visibleModal={memberIdModal}
                            onClose={handleMemberIdModalClose}
                            onSubmitClick={handleMemberIdAddClick}
                            navigation={navigation}
                            selectedMembersId={selectedMembersId}
                            selectedMembersList={selectedMembersList}
                        />

                        {/* modal for change and add preference list */}
                        <ChangePreferencesOnRoutineModal
                            visibleModal={preferenceModal}
                            onClose={() => {
                                setPreferenceModal(false)
                            }}
                            onSubmitClick={handlePreferenceSubmitClick}
                            preferences={preferences}
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

export default EditRoutine

const styles = StyleSheet.create({
    container: { flex: 1 },
    body: {
        flex: 1,
        padding: 10,
        paddingBottom: "10%"
    },
    repeatContainer: {
        alignItems: "center",
        backgroundColor: Mycolors.WHITE,
        borderRadius: 8,
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 8,
        padding: 5,
        paddingVertical: 10
    },
    repeatValue: {
        color: Mycolors.THEME_BLACK,
        fontSize: 16,
        fontWeight: "400"
    },
    direction: { flexDirection: "row" },
    preferencesDirection: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    dateTimeLabel: {
        color: Mycolors.THEME_BLACK,
        fontSize: 18,
        fontWeight: "500",
        padding: 5
    },
    noteText: {
        color: Mycolors.BLACK,
        fontSize: 14,
        fontWeight: "400",
        padding: 5
    },
    preferenceText: {
        color: Mycolors.THEME_BLACK,
        fontSize: 18,
        fontWeight: "500",
        letterSpacing: 0.5,
        paddingVertical: 8
    },
    textInput: {
        backgroundColor: Mycolors.WHITE,
        borderRadius: 10,
        color: Mycolors.THEME_BLACK,
        fontSize: 16,
        padding: 12
    },
    errorMessage: {
        color: Mycolors.RED,
        paddingHorizontal: 10
    },
    inviteMemberContainer: {
        alignItems: "center",
        backgroundColor: Mycolors.WHITE,
        borderColor: Mycolors.GRAY,
        borderRadius: 30,
        borderStyle: "dotted",
        borderWidth: 2,
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: 10,
        width: "48%"
    },
    inviteMemberText: {
        color: Mycolors.THEME_BLACK,
        fontSize: 14,
        fontWeight: "500",
        paddingHorizontal: 5,
        paddingVertical: 10
    },
    routineContainer: {
        flexDirection: "row",
        justifyContent: "space-around"
    },
    publicContainer: {
        alignItems: "center",
        borderRadius: 30,
        flexDirection: "row",
        justifyContent: "center",
        width: "45%"
    },
    publicText: {
        color: Mycolors.THEME_BLACK,
        fontSize: 16,
        fontWeight: "500",
        paddingHorizontal: 5,
        paddingVertical: 15
    },
    selectedPublicContainer: {
        alignItems: "center",
        backgroundColor: Mycolors.WHITE,
        borderRadius: 30,
        flexDirection: "row",
        justifyContent: "center",
        width: "45%"
    },
    selectedPublicText: {
        color: Mycolors.THEME_ORANGE,
        fontSize: 16,
        fontWeight: "500",
        paddingHorizontal: 5,
        paddingVertical: 15
    },
    preferenceContainer: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
        marginVertical: 10
    },
    preferenceIcon: {
        alignItems: "center",
        backgroundColor: Mycolors.brightGray,
        borderRadius: 5,
        height: 33,
        justifyContent: "center",
        width: 33
    },
    preferenceTitle: {
        color: Mycolors.THEME_BLACK,
        fontSize: 16,
        fontWeight: "400",
        paddingHorizontal: 8
    },
    addEditText: {
        color: Mycolors.THEME_ORANGE,
        fontSize: 14,
        fontWeight: "400"
    },
    textDirection: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between"
    }
})
