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

import { requestGetApi, get_memberList, add_members, invite_user, requestPostApi, request_list } from '../../../../WebApi/Service'
// import CommonToast from "../../constants/CommonToast"
// import GroupServices from "../../service/GroupServices"
import PlanPurchaseModal from "./PlanPurchaseModal"
import SubmitButton from "../../Constants/SubmitButton"
// import { colors } from "../../constants/ColorConstant"
// import { searchMemberValidation } from "../../constants/SchemaValidation"
import { Mycolors } from "../../../../utility/Mycolors"
import { useIsFocused } from "@react-navigation/native";
import Toast from 'react-native-toast-message';
const MembersList = ({
    navigation,
    onClose,
    onSubmitClick,
    visibleModal,
    data,
    route
}) => {

    const isFocus = useIsFocused()
    console.log('my data for id module in the meber list', route?.params?.data);
    const [mygroupId, setMygroupId] = useState(route?.params?.data)
    console.log('mygroupId', mygroupId);
    const [allMembersData, setAllMembersData] = useState([])
    const [emailId, setEmailId] = useState('')
    const scrollRef = useRef();
    const [searchText, setSearchText] = useState(''); // State to manage the text input value

    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [arrayList, setArrayList] = useState([])
    const [buttonLoader, setButtonLoader] = useState(false)
    const [checked, setChecked] = useState(false)
    const [loader, setLoader] = useState(false)
    const [message, setMessage] = useState("")
    const [planPurchaseVisible, setPlanPurchaseVisible] = useState(false)
    const [invited, setInvited] = useState([])
    const [approved, setApproved] = useState([])
    const [searchBox, setSearchBox] = useState(false)
    const [modlevisual5, setmodlevisual5] = useState(false)
    const [modlevisual4, setmodlevisual4] = useState(false)
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const User = useSelector(state => state.user.user_details)
    console.log('User', User);

    useEffect(() => {
        console.log('my group id for members----->>', route?.params?.data);

        setAllMembersData([])
        setArrayList([])
        setSearchBox(false)
        setMessage("")
        requestList('')
        approvedList('')
        setSearchText('');
        getAllMembers('')
        setMygroupId(route?.params?.data)
    }, [isFocus])

    // function for get all members data on api call

    const getAllMembers = async (text, getnwPage = false) => {

        const newpage = getnwPage ? page + 1 : 1;

        var fUrl = get_memberList
        var murl = '?group_id=' + route?.params?.data
        var hurl = `&page=${newpage}&limit=10`
        fUrl = fUrl + murl + hurl
        console.log('console after pagiation--->>', fUrl);
        var urls = '&name=' + text
        console.log('my url---------->', urls)
        if (urls != undefined) {
            fUrl = fUrl + urls
        }
        setLoader(true)
        console.log("saaaaaccc::: members", fUrl);
        const { responseJson, err } = await requestGetApi(fUrl, '', 'GET', User.token)
        console.log('my url for data mmer list--->>', fUrl)
        console.log('response of', responseJson)
        // setMyGroupList(responseJson.body)
        if (responseJson.headers.success == 1) {
            console.log('the res after sucess of specific members from the screen', responseJson)
            const data = responseJson.body.data.map((el, index) => ({ ...el, memdId: (index + 1)?.toString() }))
            console.log('my member list data---->>', data);
            // setAllMembersData(data)
            if (!getnwPage) {
                console.log('my last page--->>>', responseJson.body.data)
                setLoader(false)

                // setNoData(false)
                setAllMembersData(data)
                setLastPage(responseJson.body.lastPage);

            } else {
                const da = responseJson.body.data.map((el, index) => ({ ...el, memdId: (index + 1)?.toString() }))
                setLoader(false)
                // setNoData(false)

                setAllMembersData((allMembersData) => [...allMembersData, ...responseJson.body.data]);
                console.log('i have reachedd to the point');
                setPage(newpage);
            }

        } else {
            setLoader(false)
            setAllMembersData([])
            getAllMembers('')
            setalert_sms(err)
            setMy_Alert(true)
        }
    }

    const requestList = async (text) => {
        console.log('all memeneee mygroupId', mygroupId)
        setLoader(true)
        var fUrl = request_list
        var ru = '?group_id=' + mygroupId
        var urls = '&name=' + text
        console.log('my url requestList---------->', fUrl)
        if (urls != undefined) {
            fUrl = fUrl + ru + urls
        }
        console.log("saaaaaccc request_list :::", fUrl);
        const { responseJson, err } = await requestGetApi(fUrl, '', 'GET', User.token)
        setLoader(false)

        // setMyGroupList(responseJson.body)
        if (responseJson.headers.success == true) {
            console.log('the res after requestList', responseJson.body)
            const filteredInvited = responseJson.body.data.filter((item) => item.status === '1');
            setInvited(filteredInvited);
            const data = responseJson.body.data.map((el, index) => ({ ...el, memdId: (index + 1)?.toString() }))
            // setAllMembersData(data)
            // setGroupName(responseJson.body.name)
            // setGroupDetails(responseJson.body)

        } else {

            setalert_sms(err)
            setMy_Alert(true)
        }
    }

    const approvedList = async (text) => {
        console.log('all memeneee')
        setLoader(true)
        var fUrl = request_list
        var ru = '?group_id=' + mygroupId
        var urls = '&name=' + text
        console.log('my url requestList---------->', fUrl)
        if (urls != undefined) {
            fUrl = fUrl + ru + urls
        }
        console.log("saaaaaccc request_list :::", fUrl);
        const { responseJson, err } = await requestGetApi(fUrl, '', 'GET', User.token)
        setLoader(false)

        // setMyGroupList(responseJson.body)
        if (responseJson.headers.success == true) {
            console.log('the res after requestList', responseJson.body)
            const filteredInvited = responseJson.body.data.filter((item) => item.status === '2');
            setApproved(filteredInvited);
            const data = responseJson.body.data.map((el, index) => ({ ...el, memdId: (index + 1)?.toString() }))
            // setAllMembersData(data)
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
                type={'memberlist'}
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
        console.log('does it click on submit button', mygroupId);
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
        if (responseJson.headers.success == true) {
            console.log('the res after sucess of addition members', responseJson)
            Toast.show({ text1: responseJson.headers.message });
            navigation.navigate('GroupDetails', { data: mygroupId })
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
    const handleLoadMore = async () => {
        console.log('is homePAge2 is called', lastPage);
        console.log('my last page---->>', lastPage, page);
        if (page < lastPage) {
            console.log('page of my startup page');
            await getAllMembers('', true);
            console.log('Categories function completed. Updated state:', lastPage, page);
            // Continue with any additional logic after the async operation
        } else {
            console.log('Reached last page');

            // Handle the case where you've reached the last page
            // You can display a message or perform other actions here if needed
        }
    };

    return (
        <View style={styles.centeredView}>
            <View style={styles.modalViewEmailId}>
                {/* scrollview changet to view by vrinda */}
                <View showsVerticalScrollIndicator={false} style={{ height: '80%' }}>
                    {/* cross button section  */}



                    {/* <View style={styles.imageContainer}>
                        <Image
                            resizeMode="contain"
                            source={require("../../../../assets/Remindably/memberEmailId.png")}
                        />
                    </View> */}
                    {/* user invite section  */}
                    <View>
                        <View style={styles.searchLabelContainer}>
                            <TouchableOpacity onPress={() => { navigation.navigate('GroupDetails', { data: mygroupId }) }} >
                                <Image source={require('../../../../assets/images/dating-back-arrow.png')} style={{ marginTop: 8, marginHorizontal: 2 }} />
                            </TouchableOpacity>
                            <Text style={styles.addedMemberLabel}>
                                Select members to add
                            </Text>
                            <TouchableOpacity onPress={() => setmodlevisual5(true)}>
                                <Image source={require('../../../../assets/Remindably/pending.png')} style={{ height: 23, width: 23, marginLeft: 60 }}></Image>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setmodlevisual4(true)}>
                                <Image source={require('../../../../assets/Remindably/approved.png')} style={{ height: 23, width: 23 }}></Image>
                            </TouchableOpacity>
                            {/* <TouchableOpacity
                                style={styles.searchContainer}
                                onPress={() => setSearchBox(true)}
                            >
                                <Image
                                    resizeMode="contain"
                                    source={require("../../../../assets/Remindably/searchIcon.png")}
                                />
                            </TouchableOpacity> */}
                        </View>
                        <Text style={styles.addedMemberNote}>
                            Please select members from the list to add to the group
                        </Text>
                        <View style={{ paddingTop: 15, marginVertical: 10, width: '100%' }}>

                            <TextInput
                                placeholder="Search by member name"
                                placeholderTextColor={Mycolors.textGray}
                                style={styles.textInput}
                                value={searchText}
                                onChangeText={text => {
                                    setSearchText(text);
                                    getAllMembers(mygroupId, text)
                                }}
                            />

                        </View>
                        {/* display search box on search icon click  */}
                        <View style={{ paddingBottom: 15, }}>
                            {searchBox ? (
                                <TextInput
                                    placeholder="Search by member name"
                                    placeholderTextColor={Mycolors.textGray}
                                    style={styles.textInput}
                                    onChangeText={text => {
                                        getAllMembers(text,)
                                    }}
                                />
                            ) : null}
                        </View>
                        {/*recently added members  */}
                        {console.log('allMembersData111111', allMembersData)}
                        {!loader ? (
                            allMembersData?.length > 0 ? (

                                <FlatList
                                    ref={scrollRef}
                                    showsHorizontalScrollIndicator={true}
                                    onEndReachedThreshold={0.9}
                                    onEndReached={
                                        handleLoadMore
                                    }
                                    numColumns={2}
                                    data={allMembersData}
                                    renderItem={renderAddedMembers}
                                    style={{ alignSelf: 'center', width: '100%', }}

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
                            submitButton={() => {
                                onSubmitClick(arrayList)
                            }}
                            buttonText={"Add"}
                        />

                    </TouchableOpacity> :
                        null

                    }

                </View>
            </View>
            {modlevisual5 == true ?
                <Modal
                    isVisible={modlevisual5}
                    swipeDirection="down"
                    onSwipeComplete={(e) => {
                        setmodlevisual5(false)
                    }}
                    scrollTo={() => { }}
                    onBackdropPress={() => setmodlevisual5(false)}
                    scrollOffset={1}
                    propagateSwipe={true}
                    coverScreen={false}
                    backdropColor='transparent'
                    style={{ justifyContent: 'flex-end', margin: 0, backgroundColor: 'rgba(0,0,0,0.5)' }}
                >
                    <View style={{ height: '100%', backgroundColor: '#fff', borderTopLeftRadius: 15, borderTopRightRadius: 15, padding: 20 }}>
                        <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled={true}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ color: Mycolors.Black, fontWeight: '500', fontSize: 22, textAlign: 'center' }} >Requested  Members</Text>
                                <TouchableOpacity onPress={() => (setmodlevisual5(false), requestList(''), getAllMembers(mygroupId, ''), setSearchText(''))}>
                                    <Image source={require('../../../../assets/Art/cancelfilter.png')} style={{ marginTop: 6 }} />
                                </TouchableOpacity>
                            </View>
                            <View style={{ paddingTop: 15, marginVertical: 10, width: '100%' }}>

                                <TextInput
                                    placeholder="Search by member name"
                                    placeholderTextColor={Mycolors.textGray}
                                    style={styles.textInput}

                                    // onChangeText={text => {

                                    //     requestList(text)
                                    // }}
                                    onChangeText={(e) => {
                                        console.log('my e', e);
                                        if (e === '') {
                                            console.log('my empyt text',)
                                        }
                                        requestList(e);
                                        if (e === '') {
                                            requestList('')
                                        } else { requestList(e) }
                                    }}
                                />

                            </View>
                            <View style={{ width: '100%', alignSelf: 'center', marginTop: 20, height: '100%' }}>
                                {!loader ? (
                                    invited?.length > 0 ? (
                                        <FlatList
                                            data={invited.filter((item) => item.status === '1')}
                                            // horizontal={true}
                                            // showsHorizontalScrollIndicator={false}
                                            // numColumns={2}
                                            renderItem={({ item, index }) => {
                                                console.log('item from diff categories', item);
                                                return (
                                                    <View
                                                        style={[{
                                                            width: '96%', marginHorizontal: 10, flexDirection: 'row', alignItems: 'center', borderRadius: 10, marginBottom: 20,
                                                            padding: 7,
                                                            overflow: 'hidden',
                                                            borderWidth: 1, borderColor: 'black'
                                                            // shadowColor: '#E0E0E0',
                                                            // shadowOffset: {
                                                            //     width: 0,
                                                            //     height: 3
                                                            // },
                                                            // shadowRadius: 5,
                                                            // shadowOpacity: 0.6,
                                                            // elevation: 3,
                                                        },
                                                            // selectedCategory?.name === item?.name ? styles.categorySelectedStyle : styles.categoryUnSelectedStyle


                                                        ]}
                                                    // onPress={() => {
                                                    //     // setSelectedCategory(item);

                                                    //     // HomePage2(item)

                                                    //     handleChecked(item.userid, item)

                                                    //     setmodlevisual5(false)
                                                    // }}
                                                    >
                                                        {item.profile_image ? (
                                                            <Image source={{ uri: item.profile_image }} style={{ width: '20%', height: 60, borderRadius: 120, resizeMode: 'contain' }} resizeMode='contain' ></Image>) : (
                                                            <Image
                                                                source={require('../../../../assets/blankProfile.png')}
                                                                style={{ width: '20%', height: 60, borderRadius: 80, }}
                                                            />
                                                        )}
                                                        <View style={{ justifyContent: 'center', alignItems: 'center', width: "60%" }}>
                                                            <Text style={{
                                                                fontSize: 16,
                                                                color: '#455A64',
                                                                marginTop: 5, textAlign: 'center', fontWeight: 'bold'
                                                            }}>{item?.user_name}</Text>
                                                        </View>
                                                    </View>
                                                    // <View style={{ width: 100, marginHorizontal: 5 }}>
                                                    //   <TouchableOpacity style={{ width: 100, height: 80, backgroundColor: '#F8F8F8', alignSelf: 'center' }}
                                                    //     onPress={() => { setSelectedCategory(item) }}>
                                                    //     <Image source={{ uri: item.category_image }} style={{ width: "100%", height: "100%", alignSelf: 'center', borderRadius: 7 }}></Image>
                                                    //   </TouchableOpacity>
                                                    //   <View style={{}}>
                                                    //     <Text style={{ fontSize: 11, color: (selectedCategory?.category_id === item?.category_id) ? '#835E23' : Mycolors.Black, marginTop: 5, textAlign: 'center', fontWeight: 'bold' }}>{item?.category_name}</Text>
                                                    //   </View>
                                                    // </View>
                                                )
                                            }}

                                        // keyExtractor={item => item.id}
                                        />
                                    ) : (<View style={styles.noMembersContainer}>

                                        <Text style={styles.noMembersText}>
                                            No members available
                                        </Text>
                                    </View>))

                                    : <View style={styles.loaderContainer}>
                                        <ActivityIndicator
                                            size="large"
                                            color={Mycolors.THEME_ORANGE}
                                        />
                                    </View>}
                            </View>


                            <View style={{ width: 100, height: 30 }} />
                        </ScrollView>

                    </View >
                </Modal > : null}
            {
                modlevisual4 == true ?
                    <Modal
                        isVisible={modlevisual4}
                        swipeDirection="down"
                        onSwipeComplete={(e) => {
                            setmodlevisual4(false)
                        }}
                        scrollTo={() => { }}
                        onBackdropPress={() => setmodlevisual4(false)}
                        scrollOffset={1}
                        propagateSwipe={true}
                        coverScreen={false}
                        backdropColor='transparent'
                        style={{ justifyContent: 'flex-end', margin: 0, backgroundColor: 'rgba(0,0,0,0.5)' }}
                    >
                        <View style={{ height: '100%', backgroundColor: '#fff', borderTopLeftRadius: 15, borderTopRightRadius: 15, padding: 20 }}>
                            <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled={true}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ color: Mycolors.Black, fontWeight: '500', fontSize: 22, textAlign: 'center' }} >Accepted  Members</Text>
                                    <TouchableOpacity onPress={() => (setmodlevisual4(false), requestList(''), approvedList(''), getAllMembers(mygroupId, ''), setSearchText(''))}>
                                        <Image source={require('../../../../assets/Art/cancelfilter.png')} style={{ marginTop: 6 }} />
                                    </TouchableOpacity>
                                </View>
                                <View style={{ paddingTop: 15, marginVertical: 10, width: '100%' }}>

                                    <TextInput
                                        placeholder="Search by member name"
                                        placeholderTextColor={Mycolors.textGray}
                                        style={styles.textInput}
                                        onChangeText={text => {
                                            approvedList(text)
                                        }}
                                    />

                                </View>
                                <View style={{ width: '100%', alignSelf: 'center', marginTop: 20, height: '100%' }}>

                                    {!loader ? (

                                        approved?.length > 0 ? (

                                            <FlatList
                                                data={approved}
                                                // horizontal={true}
                                                // showsHorizontalScrollIndicator={false}
                                                // numColumns={2}
                                                renderItem={({ item, index }) => {
                                                    console.log('item from diff categories', item);
                                                    return (
                                                        <View
                                                            style={[{
                                                                width: '96%', marginHorizontal: 10, flexDirection: 'row', alignItems: 'center', borderRadius: 10, marginBottom: 20,
                                                                padding: 7,
                                                                overflow: 'hidden',
                                                                borderWidth: 1, borderColor: 'black'
                                                                // shadowColor: '#E0E0E0',
                                                                // shadowOffset: {
                                                                //     width: 0,
                                                                //     height: 3
                                                                // },
                                                                // shadowRadius: 5,
                                                                // shadowOpacity: 0.6,
                                                                // elevation: 3,
                                                            },
                                                                // selectedCategory?.name === item?.name ? styles.categorySelectedStyle : styles.categoryUnSelectedStyle


                                                            ]}
                                                        // onPress={() => {
                                                        //     // setSelectedCategory(item);

                                                        //     // HomePage2(item)

                                                        //     handleChecked(item.userid, item)

                                                        //     setmodlevisual5(false)
                                                        // }}
                                                        >
                                                            {item.profile_image ? (
                                                                <Image source={{ uri: item.profile_image }} style={{ width: '20%', height: 60, borderRadius: 7, }} resizeMode='contain' ></Image>) : (<Image
                                                                    source={require('../../../../assets/blankProfile.png')}
                                                                    style={{ width: '20%', height: 60, borderRadius: 80, }}
                                                                />)}
                                                            <View style={{ justifyContent: 'center', alignItems: 'center', width: "60%" }}>
                                                                <Text style={{
                                                                    fontSize: 16,
                                                                    color: '#455A64',
                                                                    marginTop: 5, textAlign: 'center', fontWeight: 'bold'
                                                                }}>{item?.user_name}</Text>
                                                            </View>
                                                        </View>
                                                        // <View style={{ width: 100, marginHorizontal: 5 }}>
                                                        //   <TouchableOpacity style={{ width: 100, height: 80, backgroundColor: '#F8F8F8', alignSelf: 'center' }}
                                                        //     onPress={() => { setSelectedCategory(item) }}>
                                                        //     <Image source={{ uri: item.category_image }} style={{ width: "100%", height: "100%", alignSelf: 'center', borderRadius: 7 }}></Image>
                                                        //   </TouchableOpacity>
                                                        //   <View style={{}}>
                                                        //     <Text style={{ fontSize: 11, color: (selectedCategory?.category_id === item?.category_id) ? '#835E23' : Mycolors.Black, marginTop: 5, textAlign: 'center', fontWeight: 'bold' }}>{item?.category_name}</Text>
                                                        //   </View>
                                                        // </View>
                                                    )
                                                }}

                                            // keyExtractor={item => item.id}
                                            />
                                        ) : (<View style={styles.noMembersContainer}>

                                            <Text style={styles.noMembersText}>
                                                No members available
                                            </Text>
                                        </View>))

                                        : <View style={styles.loaderContainer}>
                                            <ActivityIndicator
                                                size="large"
                                                color={Mycolors.THEME_ORANGE}
                                            />
                                        </View>}
                                </View>


                                <View style={{ width: 100, height: 30 }} />
                            </ScrollView>

                        </View >
                    </Modal > : null
            }
        </View >
    )
}

export default MembersList

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: 'white', height: '100%' },

    centeredView: {
        width: '100%',
        padding: 12,
        backgroundColor: 'white',
        height: '98%',
        alignSelf: 'center'
    },
    modalViewEmailId: {
        backgroundColor: Mycolors.WHITE,
        width: '99%',
        alignSelf: 'center'
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
