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
import { requestGetApi, get_memberList, add_members, invite_user, requestPostApi } from '../../../../WebApi/Service'
import { useSelector, useDispatch } from 'react-redux';
import { Divider } from "react-native-paper"
// import { Formik } from "formik"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
//internal imports
import AllMembersTab from "../groups/AllMembersTab"
import CommonToast from "../../Constants/CommonToast"
// import GroupServices from "../../service/GroupServices"
import PlanPurchaseModal from "../groups/PlanPurchaseModal"
import SubmitButton from "../../Constants/SubmitButton"
// import { colors } from "../../constants/ColorConstant"
//   import { searchMemberValidation } from "../../constants/SchemaValidation"
import { Mycolors } from "../../../../utility/Mycolors"
const InviteMemberOnRoutineModal = ({
    navigation,
    onClose,
    onSubmitClick,
    selectedMembersId,
    selectedMembersList,
    visibleModal
}) => {
    const scrollRef = useRef();
    const [allMembersData, setAllMembersData] = useState([])
    const [arrayList, setArrayList] = useState([])
    const [buttonLoader, setButtonLoader] = useState(false)
    const [checked, setChecked] = useState(true)
    const [loader, setLoader] = useState(false)
    const [memberList, setMemberList] = useState([])
    const [message, setMessage] = useState("")
    const [planPurchaseVisible, setPlanPurchaseVisible] = useState(false)
    const [searchBox, setSearchBox] = useState(false)
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);

    const toastRef = useRef()
    const User = useSelector(state => state.user.user_details)
    useEffect(() => {
        getAllMembers("")
        setAllMembersData([])

        setSearchBox(false)
        setMessage("")
        if (selectedMembersId && selectedMembersList) {
            setArrayList(selectedMembersId)
            console.log('selectwe member list----->>>', selectedMembersList);
            setMemberList(selectedMembersList)
        }
    }, [visibleModal])
    // const getAllMembers = async (text) => {
    //     console.log('all memeneee')
    //     setLoader(true)
    //     var fUrl = get_memberList
    //     // var murl = `?group_id=` + 39
    //     // var urls = '&case=' + 1
    //     var nu = `?name=` + text

    //     if (nu != undefined) {
    //         fUrl = fUrl + nu
    //     }
    //     console.log("saaaaaccc:::", fUrl);
    //     const { responseJson, err } = await requestGetApi(fUrl, '', 'GET', User.token)
    //     setLoader(false)
    //     console.log('response of', responseJson)
    //     // setMyGroupList(responseJson.body)
    //     if (responseJson.headers.success == true) {
    //         console.log('the res after sucess of specific members', responseJson)
    //         setAllMembersData(responseJson.body)
    //         // setGroupName(responseJson.body.name)
    //         // setGroupDetails(responseJson.body)

    //     } else {

    //         setalert_sms(err)
    //         setMy_Alert(true)
    //     }
    // }
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
        //         setLoader(false)
        //         console.log(error)
        //     })
    }

    // list for added members
    const renderAddedMembers = ({ item }) => {
        return (
            <AllMembersTab
                item={item}
                handleChecked={handleChecked}
                checked={checked}
                checkedList={arrayList}
            />
        )
    }

    // function on select members click
    const handleChecked = (selectedId, selectedData) => {
        console.log('selectedId, selectedData', selectedData);
        setChecked(true)

        if (arrayList.includes(selectedId)) {
            setArrayList(arrayList.filter(ids => ids !== selectedId))
        } else {
            setArrayList([...arrayList, selectedId])
        }

        // for member list
        console.log('my memebr list data--->>', memberList);
        const objWithIdIndex = memberList.findIndex(
            obj => obj.id === selectedData.userid
        )

        if (objWithIdIndex > -1) {
            memberList.splice(objWithIdIndex, 1)
        } else {
            setMemberList([...memberList, selectedData])
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
            email: values.email,
            firstname: values.firstName,
            lastname: values.secondName
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
    const getAllMembers = async (text, getnwPage = false) => {
        console.log('all memeneee for the all members list')
        const newpage = getnwPage ? page + 1 : 1;

        console.log('my new getnewpage', newpage);
        var fUrl = get_memberList + `?page=${newpage}&limit=10`
        var ru = `&0name=` + text
        if (ru != undefined) {
            fUrl = fUrl + ru
        }


        console.log('my furl fr groups of all members---->>>', fUrl);
        setLoader(true)
        const { responseJson, err } = await requestGetApi(fUrl, '', 'GET', User.token)

        if (responseJson.headers.success == 1) {

            console.log('mmmm  does it reach here to routine', responseJson.headers.success);

            if (!getnwPage) {
                console.log('my last page--->>>', responseJson.body.data)
                setLoader(false)
                // setNoData(false)
                setAllMembersData(responseJson.body.data)
                setLastPage(responseJson.body.lastPage);

            } else {
                setLoader(false)
                // setNoData(false)
                setAllMembersData((allMembersData) => [...allMembersData, ...responseJson.body.data]);
                console.log('i have reachedd to the point');
                setPage(newpage);
            }

        } else {
            setLoader(false)
            setAllMembersData([])
            setNoData(true)
            setalert_sms(err)
            setMy_Alert(true)
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
                    }) =>

                    ( */}
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={visibleModal}
                        onRequestClose={() => {
                            onClose()
                        }}
                    >
                        <View style={styles.centeredView}>

                            <View style={styles.modalViewEmailId}>
                                <ScrollView showsVerticalScrollIndicator={false}>
                                    {/* cross button section  */}
                                    <View style={{ flexDirection: 'row', }}>
                                        <Text style={[styles.addedMemberLabel, { marginHorizontal: 12 }]}>
                                            Listed members
                                        </Text>
                                        <TouchableOpacity
                                            style={styles.crossContainer}
                                            onPress={() => {
                                                onClose()
                                            }}
                                        >
                                            <Image
                                                style={styles.image}
                                                resizeMode="contain"
                                                source={require("../../../../assets/Remindably/cross.png")}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                    {/* <View style={styles.imageContainer}>
                                        <Image
                                            resizeMode="contain"
                                            source={require("../../../../assets/Remindably/memberEmailId.png")}
                                        />
                                    </View> */}

                                    {/* user invite section  */}
                                    {/* <Text style={styles.groupLabel}>Enter Member Email ID</Text> */}

                                    <View style={styles.direction}>



                                    </View>

                                    {/* invite button section  */}




                                    <View style={{ marginVertical: 10 }}>
                                        <View style={styles.searchLabelContainer}>
                                            {/* <Text style={styles.addedMemberLabel}>
                                                Listed members
                                            </Text> */}
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



                                        {/* display search box on search icon click */}

                                        <TextInput
                                            placeholder="Search by member name"
                                            placeholderTextColor={Mycolors.textGray}
                                            style={styles.textInput}

                                            onChangeText={text => {
                                                getAllMembers(text)
                                            }}
                                        />

                                        <Text style={styles.addedMemberNote}>
                                            Please select members from the list to add to the
                                            routine
                                        </Text>
                                        {/*recently added members  */}
                                        {!loader ? (
                                            allMembersData?.length > 0 ? (
                                                <FlatList
                                                    ref={scrollRef}
                                                    showsHorizontalScrollIndicator={true}
                                                    onEndReachedThreshold={0.9}
                                                    onEndReached={
                                                        handleLoadMore
                                                    }
                                                    data={allMembersData}
                                                    renderItem={renderAddedMembers}
                                                    horizontal

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

                                    <TouchableOpacity style={styles.buttonContainer} onPress={() => onSubmitClick(arrayList, memberList)}>
                                        <SubmitButton
                                            submitButton={() => {
                                                onSubmitClick(arrayList, memberList)
                                            }}
                                            buttonText={"Add"}
                                        />
                                    </TouchableOpacity>
                                </ScrollView>
                            </View>

                        </View>

                        {/* Modal for purchase plan*/}
                        <PlanPurchaseModal
                            visibleModal={planPurchaseVisible}
                            onClose={() => {
                                setPlanPurchaseVisible(false)
                            }}
                            responseMsg={message}
                            onSubmitClick={handlePlanPurchaseSubmitClick}
                        />


                    </Modal>
                    {/* )} */}

                    {/* } */}
                </View>
            </KeyboardAwareScrollView>
        </KeyboardAvoidingView>
    )
}

export default InviteMemberOnRoutineModal

const styles = StyleSheet.create({
    container: { flex: 1 },
    body: { flex: 1, padding: 5 },
    centeredView: {
        backgroundColor: "rgba(0, 0, 0, 0.66)",
        flex: 1,
        justifyContent: "center"
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
        marginHorizontal: 5,
        paddingVertical: 10, marginTop: 14
    },
    buttonContainer: { marginTop: 15, marginBottom: 40 },
    searchContainer: {
        alignItems: "center",
        backgroundColor: Mycolors.THEME_ORANGE,
        borderRadius: 10,
        justifyContent: "center",
        width: "10%",

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
        borderRadius: 15,
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
        color: Mycolors.GREEN,
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
        zIndex: 1,

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
