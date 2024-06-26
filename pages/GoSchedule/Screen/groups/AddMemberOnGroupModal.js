// //external imports
// import {
//     ActivityIndicator,
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
// import React, { useEffect, useRef, useState } from "react"
// import { Divider } from "react-native-paper"
// import { useSelector, useDispatch } from 'react-redux';
// // import { Formik } from "formik"
// import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
// //internal imports
// import AllMembersTab from "./AllMembersTab"

// import {  requestGetApi, get_memberList, add_members, invite_user, requestPostApi } from '../../../../WebApi/Service'
// // import CommonToast from "../../constants/CommonToast"
// // import GroupServices from "../../service/GroupServices"
// import PlanPurchaseModal from "./PlanPurchaseModal"
// import SubmitButton from "../../Constants/SubmitButton"
// // import { colors } from "../../constants/ColorConstant"
// // import { searchMemberValidation } from "../../constants/SchemaValidation"
// import { Mycolors } from "../../../../utility/Mycolors"

// import Toast from 'react-native-toast-message';
// const AddMemberOnGroupModal = ({
//     navigation,
//     onClose,
//     onSubmitClick,
//     visibleModal,
//     data
// }) => {
//     console.log('my data for id module', data);

//     const [mygroupId, setMygroupId] = useState(data)
//     console.log('mygroupId', mygroupId);
//     const [allMembersData, setAllMembersData] = useState([])
//     const [emailId, setEmailId] = useState('')
//     const [firstname, setFirstname] = useState('')
//     const [lastname, setLastname] = useState('')
//     const [arrayList, setArrayList] = useState([])
//     const [buttonLoader, setButtonLoader] = useState(false)
//     const [checked, setChecked] = useState(false)
//     const [loader, setLoader] = useState(false)
//     const [message, setMessage] = useState("")
//     const [planPurchaseVisible, setPlanPurchaseVisible] = useState(false)
//     const [searchBox, setSearchBox] = useState(false)
//     const toastRef = useRef()
//     const User = useSelector(state => state.user.user_details)
//     console.log('User', User);

//     useEffect(() => {
//         getAllMembers('')
//         setAllMembersData([])
//         setSearchBox(false)
//         setMessage("")
//         setMygroupId(data)
//     }, [visibleModal])

//     // function for get all members data on api call
//     const getAllMember = text => {
//         let data = {
//             search: text.trim()
//         }
//         setLoader(true)
//         // GroupServices.postAllMembers(data)
//         //     .then(response => {
//         //         setLoader(false)
//         //         setAllMembersData(response.data.allmembers)
//         //     })
//         //     .catch(error => {
//         //         console.log(error)
//         //         setLoader(false)
//         //     })
//     }
//     const getAllMembers = async (text) => {
//         console.log('all memeneee')
//         setLoader(true)
//         var fUrl = get_memberList
//         var urls = '?name=' + text
//         console.log('my url---------->', urls)
//         if (urls != undefined) {
//             fUrl = fUrl + urls
//         }
//         console.log("saaaaaccc:::", fUrl);
//         const { responseJson, err } = await requestGetApi(fUrl, '', 'GET', User.token)
//         setLoader(false)
//         console.log('response of', responseJson)
//         // setMyGroupList(responseJson.body)
//         if (responseJson.headers.success == true) {
//             console.log('the res after sucess of specific members', responseJson)
//             const data = responseJson.body.map((el, index) => ({ ...el, memdId: (index + 1)?.toString() }))
//             setAllMembersData(data)
//             // setGroupName(responseJson.body.name)
//             // setGroupDetails(responseJson.body)

//         } else {

//             setalert_sms(err)
//             setMy_Alert(true)
//         }
//     }
//     // list for members tab
//     const renderAddedMembers = ({ item }) => {
//         console.log('rnderAddedMemen', item);
//         return (
//             <AllMembersTab
//                 item={item}
//                 handleChecked={handleChecked}
//                 checked={checked}
//                 checkedList={arrayList}
//             />
//         )
//     }

//     // function for select members
//     const handleChecked = selectedId => {
//         console.log('selectedId', selectedId);
//         setChecked(true)
//         if (arrayList.includes(selectedId)) {
//             setArrayList(arrayList.filter(ids => ids !== selectedId))
//         } else {
//             setArrayList([...arrayList, selectedId])
//         }
//     }

//     // navigation for subscription plan on click of purchase plan click
//     const handlePlanPurchaseSubmitClick = () => {
//         setPlanPurchaseVisible(false)
//         navigation.navigate("StackNavigation", {
//             screen: "SubscriptionPlan"
//         })
//     }

//     // function for submit button click on api call to invite user
//     const onSubmit = values => {
//         Keyboard.dismiss()
//         setButtonLoader(true)
//         var data = {
//             // email: values.email,
//             // firstname: values.firstName,
//             // lastname: values.secondName
//         }

//         // GroupServices.postInviteUser(data)
//         //     .then(response => {
//         //         setButtonLoader(false)
//         //         if (response.data.status === 0) {
//         //             setPlanPurchaseVisible(true)
//         //             setMessage(response.data.message)
//         //         } else {
//         //             setMessage(response.data.message)
//         //             getAllMembers("") //for refresh all member list
//         //             setPlanPurchaseVisible(false)
//         //         }
//         //     })
//         //     .catch(error => {
//         //         setButtonLoader(false)
//         //         console.log(error)
//         //     })
//     }

//     const handel = async () => {
//         allMembersData?.length > 0 ? null :
//             Toast.show({ text1: ' No members available' })
//         console.log('member valiable');
//         // try {
//         //     console.log('lll');
//         //     const data = {
//         //         groupid: '8',
//         //         email: emailId,
//         //         firstname: firstname,
//         //         lastname: lastname,
//         //         invitetype: 'G', // Enclose 'G' in single or double quotes
//         //     };

//         //     console.log('all memeneee', data);
//         //     setLoader(true);

//         //     const { responseJson, err } = await requestGetApi(invite_user, data, 'POST', User.token);

//         //     setLoader(false);
//         //     console.log('response of invite user', responseJson);

//         //     if (responseJson.headers.success === true) {
//         //         console.log('the res after success of specific members', responseJson);
//         //         //setAllMembersData(responseJson.body);
//         //         // Handle other successful actions here if needed
//         //     } else {
//         //         console.log('Error occurred:', err);
//         //         setalert_sms(err);
//         //         setMy_Alert(true);
//         //     }
//         // } catch (error) {
//         //     console.error('An error occurred:', error);
//         //     // Handle the error appropriately, e.g., display an error message to the user
//         // }
//     };
//     const add = async () => {
//         console.log('does it click on submit button');
//         // allMembersData?.length > 0 ? null :
//         //     Toast.show({ text1: ' No members available' })
//         // console.log('member valiable');
//         var data = {

//             group_id: mygroupId,
//             user_id: arrayList

//         }
//         console.log('my array data ------->', data)
//         setLoader(true)
//         var fUrl = add_members
//         console.log("saaaaaccc:::", fUrl);
//         const { responseJson, err } = await requestPostApi(add_members, data, 'POST', User.token)
//         setLoader(false)
//         console.log('response of hhhhhh gg', responseJson)
//         // setMyGroupList(responseJson.body)
//         if (responseJson.headers.success == true) {
//             console.log('the res after sucess of addition members', responseJson)
//             navigation.navigate('GroupDetails')
//             // setAllMembersData(responseJson.body)
//             // setGroupName(responseJson.body.name)
//             // setGroupDetails(responseJson.body)

//         } else {

//             setalert_sms(err)
//             setMy_Alert(true)
//         }
//     }
//     const initialValues = {
//         email: "",
//         firstName: "",
//         secondName: ""
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
//                 <View
//                 // validationSchema={searchMemberValidation}
//                 // initialValues={initialValues}
//                 // onSubmit={values => {
//                 //     onSubmit(values)
//                 // }}
//                 >
//                     {/* {({
//                          handleChange,
//                          handleBlur,
//                         handleSubmit,
//                          values,
//                          errors,
//                          touched,
//                         setFieldTouched
//                     }) => ( */}
//                     <Modal
//                         animationType="fade"
//                         transparent={true}
//                         visible={visibleModal}
//                         onRequestClose={() => {
//                             onClose()
//                         }}
//                     >
//                         <View style={styles.centeredView}>
//                             <View style={styles.modalViewEmailId}>
//                                 <ScrollView showsVerticalScrollIndicator={false}>
//                                     {/* cross button section  */}
//                                     <TouchableOpacity
//                                         style={styles.crossContainer}
//                                         onPress={() => {
//                                             onClose()
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
//                                         <View style={styles.searchLabelContainer}>
//                                             <Text style={styles.addedMemberLabel}>
//                                                 Listed members
//                                             </Text>

//                                             <TouchableOpacity
//                                                 style={styles.searchContainer}
//                                                 onPress={() => setSearchBox(true)}
//                                             >
//                                                 <Image
//                                                     resizeMode="contain"
//                                                     source={require("../../../../assets/Remindably/searchIcon.png")}
//                                                 />
//                                             </TouchableOpacity>
//                                         </View>
//                                         <Text style={styles.addedMemberNote}>
//                                             Please select members from the list to add to the group
//                                         </Text>

//                                         {/* display search box on search icon click  */}
//                                         <View style={{ paddingBottom: 15, paddingTop: 15 }}>
//                                             {searchBox ? (
//                                                 <TextInput
//                                                     placeholder="Search by member name"
//                                                     placeholderTextColor={Mycolors.textGray}
//                                                     style={styles.textInput}
//                                                     onChangeText={text => {
//                                                         getAllMembers(text)
//                                                     }}
//                                                 />
//                                             ) : null}
//                                         </View>
//                                         {/*recently added members  */}
//                                         {console.log('allMembersData111111', allMembersData)}
//                                         {!loader ? (
//                                             allMembersData?.length > 0 ? (

//                                                 <FlatList
//                                                     data={allMembersData}
//                                                     renderItem={renderAddedMembers}
//                                                     horizontal
//                                                     showsHorizontalScrollIndicator={false}
//                                                     keyExtractor={(item, index) => String(index)}

//                                                 />
//                                             ) : (
//                                                 <View style={styles.noMembersContainer}>

//                                                     <Text style={styles.noMembersText}>
//                                                         No members available
//                                                     </Text>
//                                                 </View>
//                                             )
//                                         ) : (
//                                             <View style={styles.loaderContainer}>
//                                                 <ActivityIndicator
//                                                     size="large"
//                                                     color={Mycolors.THEME_ORANGE}
//                                                 />
//                                             </View>
//                                         )}
//                                     </View>

//                                     {allMembersData?.length > 0 ? <TouchableOpacity style={styles.buttonContainer} onPress={() => add()}>

//                                         <SubmitButton
//                                             submitButton={() => {
//                                                 onSubmitClick(arrayList)
//                                             }}
//                                             buttonText={"Add"}
//                                         />

//                                     </TouchableOpacity> :
//                                         null

//                                     }
//                                     <View style={{ height: 200 }}>
//                                         <Text>lllll</Text>
//                                     </View>
//                                 </ScrollView>
//                             </View>
//                         </View>

//                         {/* Modal for purchase plan*/}
//                         <PlanPurchaseModal
//                             visibleModal={planPurchaseVisible}
//                             onClose={() => {
//                                 setPlanPurchaseVisible(false)
//                             }}
//                             responseMsg={message}
//                             onSubmitClick={handlePlanPurchaseSubmitClick}
//                         />

//                         {/* toaster message for error response from API  */}
//                         {/* <CommonToast ref={toastRef} /> */}
//                     </Modal>
//                     {/* )} */}
//                 </View>
//             </KeyboardAwareScrollView >
//         </KeyboardAvoidingView >
//     )
// }

// export default AddMemberOnGroupModal

// const styles = StyleSheet.create({
//     container: { flex: 1 },
//     body: { padding: 5 },
//     centeredView: {
//         backgroundColor: "rgba(0, 0, 0, 0.66)",
//         position: 'absolute',
//         top: 100
//     },
//     modalViewEmailId: {
//         backgroundColor: Mycolors.WHITE,
//         borderRadius: 30,
//         padding: 20,
//         margin: 10,
//         shadowColor: "#000",
//         shadowOffset: {
//             width: 0,
//             height: 2
//         },
//         shadowOpacity: 0.25,
//         shadowRadius: 4,
//         elevation: 5
//     },
//     imageContainer: {
//         alignSelf: "center",
//         height: 150,
//         justifyContent: "center",
//         marginBottom: 10,
//         width: 190
//     },
//     groupLabel: {
//         color: Mycolors.BLACK,
//         fontSize: 18,
//         fontWeight: "500",
//         paddingVertical: 10
//     },
//     textInput: {
//         backgroundColor: Mycolors.WHITE,
//         borderColor: Mycolors.brightGray,
//         borderRadius: 8,
//         borderWidth: 2,
//         color: Mycolors.THEME_BLACK,
//         fontSize: 16,
//         padding: 10
//     },
//     direction: {
//         flexDirection: "row",
//         justifyContent: "space-between",
//         paddingVertical: 5
//     },
//     nameInputContainer: {
//         borderRadius: 8,
//         height: 50,
//         width: "48%"
//     },
//     nameInput: {
//         backgroundColor: Mycolors.WHITE,
//         borderColor: Mycolors.brightGray,
//         borderRadius: 8,
//         borderWidth: 2,
//         color: Mycolors.THEME_BLACK,
//         fontSize: 16,
//         padding: 10
//     },
//     addedMemberLabel: {
//         color: Mycolors.THEME_BLACK,
//         fontSize: 18,
//         fontWeight: "500",
//         paddingVertical: 5
//     },
//     addedMemberNote: {
//         color: Mycolors.THEME_BLACK,
//         fontSize: 14,
//         paddingTop: 8
//     },
//     buttonContainer: { marginTop: 15 },
//     searchContainer: {
//         alignItems: "center",
//         backgroundColor: Mycolors.THEME_ORANGE,
//         borderRadius: 10,
//         justifyContent: "center",
//         width: "10%"
//     },
//     searchLabelContainer: {
//         flexDirection: "row",
//         justifyContent: "space-between",
//         paddingVertical: 3
//     },
//     errorMessage: {
//         color: Mycolors.RED
//     },
//     inviteUserContainer: {
//         alignSelf: "center",
//         backgroundColor: Mycolors.THEME_ORANGE,
//         borderRadius: 10,
//         justifyContent: "center",
//         width: "28%"
//     },
//     inviteUserText: {
//         color: Mycolors.WHITE,
//         fontSize: 15,
//         fontWeight: "500",
//         paddingVertical: 5,
//         textAlign: "center"
//     },
//     successMessage: {
//         color: Mycolors.GREEN_THEME,
//         fontSize: 16,
//         fontWeight: "500",
//         padding: 5,
//         textAlign: "center",
//         width: "100%"
//     },
//     crossContainer: {
//         backgroundColor: Mycolors.THEME_ORANGE,
//         borderRadius: 50,
//         height: 30,
//         position: "absolute",
//         right: 0,
//         top: 0,
//         width: 30,
//         zIndex: 1
//     },
//     image: {
//         borderRadius: 50,
//         height: "100%",
//         width: "100%"
//     },
//     loaderContainer: {
//         alignSelf: "center",
//         height: 50,
//         justifyContent: "center"
//     },
//     noMembersContainer: {
//         alignContent: "center",
//         alignItems: "center",
//         justifyContent: "center"
//     },
//     noMembersText: {
//         color: Mycolors.THEME_BLACK,
//         fontSize: 16,
//         fontWeight: "500",
//         padding: 20
//     }
// })
//external imports
import {
    ActivityIndicator,
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
import React, { useEffect, useRef, useState } from "react"
import { Divider } from "react-native-paper"
import { useSelector, useDispatch } from 'react-redux';
// import { Formik } from "formik"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
//internal imports
import AllMembersTab from "./AllMembersTab"

import { requestGetApi, get_memberList, add_members, invite_user, requestPostApi } from '../../../../WebApi/Service'
// import CommonToast from "../../constants/CommonToast"
// import GroupServices from "../../service/GroupServices"
import PlanPurchaseModal from "./PlanPurchaseModal"
import SubmitButton from "../../Constants/SubmitButton"
// import { colors } from "../../constants/ColorConstant"
// import { searchMemberValidation } from "../../constants/SchemaValidation"
import { Mycolors } from "../../../../utility/Mycolors"
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
const AddMemberOnGroupModal = ({
    // navigation,
    // onClose,
    onSubmitClick,
    visibleModal,
    data
}) => {
    console.log('my data for id module', data);
    const navigation = useNavigation();
    const [mygroupId, setMygroupId] = useState(data)
    console.log('mygroupId', mygroupId);
    const [allMembersData, setAllMembersData] = useState([])
    const [emailId, setEmailId] = useState('')
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [arrayList, setArrayList] = useState([])
    const [buttonLoader, setButtonLoader] = useState(false)
    const [checked, setChecked] = useState(false)
    const [loader, setLoader] = useState(false)
    const [message, setMessage] = useState("")
    const [planPurchaseVisible, setPlanPurchaseVisible] = useState(false)
    const [searchBox, setSearchBox] = useState(false)
    const toastRef = useRef()
    const User = useSelector(state => state.user.user_details)
    console.log('User', User);

    useEffect(() => {
        getAllMembers('')
        setAllMembersData([])
        setSearchBox(false)
        setMessage("")
        setMygroupId(data)
    }, [])

    // function for get all members data on api call
    const getAllMember = text => {
        let data = {
            search: text.trim()
        }
        setLoader(true)
        // GroupServices.postAllMembers(data)
        //     .then(response => {
        //         setLoader(false)
        //         setAllMembersData(response.data.allmembers)
        //     })
        //     .catch(error => {
        //         console.log(error)
        //         setLoader(false)
        //     })
    }
    const getAllMembers = async (text) => {
        console.log('all memeneee')
        setLoader(true)
        var fUrl = get_memberList
        var murl = `?group_id=` + mygroupId
        var urls = '&name=' + text
        console.log('my url---------->', urls)
        if (urls != undefined) {
            fUrl = fUrl + murl + urls
        }
        console.log("saaaaaccc:::", fUrl);
        const { responseJson, err } = await requestGetApi(fUrl, '', 'GET', User.token)
        setLoader(false)
        console.log('response of', responseJson)
        // setMyGroupList(responseJson.body)
        if (responseJson.headers.success == true) {
            console.log('the res after sucess of specific members', responseJson)
            const data = responseJson.body.map((el, index) => ({ ...el, memdId: (index + 1)?.toString() }))
            setAllMembersData(data)
            // setGroupName(responseJson.body.name)
            // setGroupDetails(responseJson.body)

        } else {

            setalert_sms(err)
            setMy_Alert(true)
        }
    }
    // list for members tab
    const renderAddedMembers = ({ item }) => {
        console.log('rnderAddedMemen', item);
        return (
            <AllMembersTab
                item={item}
                handleChecked={handleChecked}
                checked={checked}
                checkedList={arrayList}
            />
        )
    }

    // function for select members
    const handleChecked = selectedId => {
        console.log('selectedId', selectedId);
        setChecked(true)
        if (arrayList.includes(selectedId)) {
            setArrayList(arrayList.filter(ids => ids !== selectedId))
        } else {
            setArrayList([...arrayList, selectedId])
        }
    }

    // navigation for subscription plan on click of purchase plan click
    const handlePlanPurchaseSubmitClick = () => {
        setPlanPurchaseVisible(false)
        navigation.navigate("StackNavigation", {
            screen: "SubscriptionPlan"
        })
    }

    // function for submit button click on api call to invite user
    const onSubmit = values => {
        Keyboard.dismiss()
        setButtonLoader(true)
        var data = {
            // email: values.email,
            // firstname: values.firstName,
            // lastname: values.secondName
        }

        // GroupServices.postInviteUser(data)
        //     .then(response => {
        //         setButtonLoader(false)
        //         if (response.data.status === 0) {
        //             setPlanPurchaseVisible(true)
        //             setMessage(response.data.message)
        //         } else {
        //             setMessage(response.data.message)
        //             getAllMembers("") //for refresh all member list
        //             setPlanPurchaseVisible(false)
        //         }
        //     })
        //     .catch(error => {
        //         setButtonLoader(false)
        //         console.log(error)
        //     })
    }

    const handel = async () => {
        allMembersData?.length > 0 ? null :
            Toast.show({ text1: ' No members available' })
        console.log('member valiable');
        // try {
        //     console.log('lll');
        //     const data = {
        //         groupid: '8',
        //         email: emailId,
        //         firstname: firstname,
        //         lastname: lastname,
        //         invitetype: 'G', // Enclose 'G' in single or double quotes
        //     };

        //     console.log('all memeneee', data);
        //     setLoader(true);

        //     const { responseJson, err } = await requestGetApi(invite_user, data, 'POST', User.token);

        //     setLoader(false);
        //     console.log('response of invite user', responseJson);

        //     if (responseJson.headers.success === true) {
        //         console.log('the res after success of specific members', responseJson);
        //         //setAllMembersData(responseJson.body);
        //         // Handle other successful actions here if needed
        //     } else {
        //         console.log('Error occurred:', err);
        //         setalert_sms(err);
        //         setMy_Alert(true);
        //     }
        // } catch (error) {
        //     console.error('An error occurred:', error);
        //     // Handle the error appropriately, e.g., display an error message to the user
        // }
    };
    const add = async () => {
        console.log('does it click on submit button');
        // allMembersData?.length > 0 ? null :
        //     Toast.show({ text1: ' No members available' })
        // console.log('member valiable');
        var data = {

            group_id: mygroupId,
            user_id: arrayList

        }
        console.log('my array data ------->', data)
        setLoader(true)
        var fUrl = add_members
        console.log("saaaaaccc:::", fUrl);
        const { responseJson, err } = await requestPostApi(add_members, data, 'POST', User.token)
        setLoader(false)
        console.log('response of hhhhhh gg', responseJson)
        // setMyGroupList(responseJson.body)
        navigation.goBack();
        if (responseJson.headers.success == true) {
            console.log('the res after sucess of addition members', responseJson)
            // navigation.navigate('GroupDetails')
            // setAllMembersData(responseJson.body)
            // setGroupName(responseJson.body.name)
            // setGroupDetails(responseJson.body)

        } else {

            setalert_sms(err)
            setMy_Alert(true)
        }
    }
    const initialValues = {
        email: "",
        firstName: "",
        secondName: ""
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
                <View
                // validationSchema={searchMemberValidation}
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
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={visibleModal}
                        onRequestClose={() => {
                            // onClose()
                        }}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalViewEmailId}>
                                <ScrollView showsVerticalScrollIndicator={false} style={{ height: '80%' }}>
                                    {/* cross button section  */}
                                    <TouchableOpacity
                                        style={styles.crossContainer}
                                        onPress={() => {
                                            // onClose()
                                        }}
                                    >
                                        <Image
                                            style={styles.image}
                                            resizeMode="contain"
                                            source={require("../../../../assets/Remindably/cross.png")}
                                        />
                                    </TouchableOpacity>

                                    <View style={styles.imageContainer}>
                                        <Image
                                            resizeMode="contain"
                                            source={require("../../../../assets/Remindably/memberEmailId.png")}
                                        />
                                    </View>
                                    {/* user invite section  */}
                                    <View>
                                        <View style={styles.searchLabelContainer}>
                                            <Text style={styles.addedMemberLabel}>
                                                Listed members
                                            </Text>

                                            <TouchableOpacity
                                                style={styles.searchContainer}
                                                onPress={() => setSearchBox(true)}
                                            >
                                                <Image
                                                    resizeMode="contain"
                                                    source={require("../../../../assets/Remindably/searchIcon.png")}
                                                />
                                            </TouchableOpacity>
                                        </View>
                                        <Text style={styles.addedMemberNote}>
                                            Please select members from the list to add to the group
                                        </Text>

                                        {/* display search box on search icon click  */}
                                        <View style={{ paddingBottom: 15, paddingTop: 15 }}>
                                            {searchBox ? (
                                                <TextInput
                                                    placeholder="Search by member name"
                                                    placeholderTextColor={Mycolors.textGray}
                                                    style={styles.textInput}
                                                    onChangeText={text => {
                                                        getAllMembers(text)
                                                    }}
                                                />
                                            ) : null}
                                        </View>
                                        {/*recently added members  */}
                                        {console.log('allMembersData111111', allMembersData)}
                                        {!loader ? (
                                            allMembersData?.length > 0 ? (

                                                <FlatList
                                                    data={allMembersData}
                                                    renderItem={renderAddedMembers}
                                                    horizontal
                                                    showsHorizontalScrollIndicator={false}
                                                    keyExtractor={(item, index) => String(index)}

                                                />
                                            ) : (
                                                <View style={styles.noMembersContainer}>

                                                    <Text style={styles.noMembersText}>
                                                        No members available
                                                    </Text>
                                                </View>
                                            )
                                        ) : (
                                            <View style={styles.loaderContainer}>
                                                <ActivityIndicator
                                                    size="large"
                                                    color={Mycolors.THEME_ORANGE}
                                                />
                                            </View>
                                        )}
                                    </View>

                                    {allMembersData?.length > 0 ? <TouchableOpacity style={styles.buttonContainer} onPress={() => add()}>

                                        <SubmitButton
                                            // submitButton={() => {
                                            //     onSubmitClick(arrayList)
                                            // }}
                                            buttonText={"Add"}
                                        />

                                    </TouchableOpacity> :
                                        null

                                    }
                                    <View style={styles.searchLabelContainer}>
                                        <Text style={styles.addedMemberLabel}>
                                            Listed members
                                        </Text>

                                        <TouchableOpacity
                                            style={styles.searchContainer}
                                            onPress={() => setSearchBox(true)}
                                        >
                                            <Image
                                                resizeMode="contain"
                                                source={require("../../../../assets/Remindably/searchIcon.png")}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </ScrollView>
                            </View>
                        </View>

                        {/* Modal for purchase plan*/}
                        <PlanPurchaseModal
                            visibleModal={planPurchaseVisible}
                            // onClose={() => {
                            //     setPlanPurchaseVisible(false)
                            // }}
                            responseMsg={message}
                            onSubmitClick={handlePlanPurchaseSubmitClick}
                        />

                        {/* toaster message for error response from API  */}
                        {/* <CommonToast ref={toastRef} /> */}
                    </Modal>
                    {/* )} */}
                </View>
            </KeyboardAwareScrollView >
        </KeyboardAvoidingView >
    )
}

export default AddMemberOnGroupModal

const styles = StyleSheet.create({
    container: { flex: 1 },
    body: { padding: 5 },
    centeredView: {
        backgroundColor: "rgba(0, 0, 0, 0.66)",
        position: 'absolute',
        top: 100
    },
    modalViewEmailId: {
        backgroundColor: Mycolors.WHITE,
        borderRadius: 30,
        padding: 20,
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
        fontWeight: "500",
        paddingVertical: 10
    },
    textInput: {
        backgroundColor: Mycolors.WHITE,
        borderColor: Mycolors.brightGray,
        borderRadius: 8,
        borderWidth: 2,
        color: Mycolors.THEME_BLACK,
        fontSize: 16,
        padding: 10
    },
    direction: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 5
    },
    nameInputContainer: {
        borderRadius: 8,
        height: 50,
        width: "48%"
    },
    nameInput: {
        backgroundColor: Mycolors.WHITE,
        borderColor: Mycolors.brightGray,
        borderRadius: 8,
        borderWidth: 2,
        color: Mycolors.THEME_BLACK,
        fontSize: 16,
        padding: 10
    },
    addedMemberLabel: {
        color: Mycolors.THEME_BLACK,
        fontSize: 18,
        fontWeight: "500",
        paddingVertical: 5
    },
    addedMemberNote: {
        color: Mycolors.THEME_BLACK,
        fontSize: 14,
        paddingTop: 8
    },
    buttonContainer: { marginTop: 15 },
    searchContainer: {
        alignItems: "center",
        backgroundColor: Mycolors.THEME_ORANGE,
        borderRadius: 10,
        justifyContent: "center",
        width: "10%"
    },
    searchLabelContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 3
    },
    errorMessage: {
        color: Mycolors.RED
    },
    inviteUserContainer: {
        alignSelf: "center",
        backgroundColor: Mycolors.THEME_ORANGE,
        borderRadius: 10,
        justifyContent: "center",
        width: "28%"
    },
    inviteUserText: {
        color: Mycolors.WHITE,
        fontSize: 15,
        fontWeight: "500",
        paddingVertical: 5,
        textAlign: "center"
    },
    successMessage: {
        color: Mycolors.GREEN_THEME,
        fontSize: 16,
        fontWeight: "500",
        padding: 5,
        textAlign: "center",
        width: "100%"
    },
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
    image: {
        borderRadius: 50,
        height: "100%",
        width: "100%"
    },
    loaderContainer: {
        alignSelf: "center",
        height: 50,
        justifyContent: "center"
    },
    noMembersContainer: {
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center"
    },
    noMembersText: {
        color: Mycolors.THEME_BLACK,
        fontSize: 16,
        fontWeight: "500",
        padding: 20
    }
})
