// external imports
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
// import { Formik } from "formik"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
// internal imports
import AllMembersTab from "./AllMembersTab"
import { requestGetApi, get_memberList, } from '../../../WebApi/Service'
import { useSelector, useDispatch } from 'react-redux';
// import CommonToast from "../../../constants/CommonToast"
// import GroupServices from "../../../service/GroupServices"
import PlanPurchaseModal from "./PlanPurchaseModal"
import SubmitButton from "../Constants/SubmitButton"
import { Mycolors } from "../../../utility/Mycolors"
// import { searchMemberValidation } from "../../../constants/SchemaValidation"

const InviteMemberOnSplitModal = ({
    navigation,
    onClose,
    onSubmitClick,
    selectedMembersId,
    selectedMembersList,
    visibleModal
}) => {
    const User = useSelector(state => state.user.user_details)
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
    const scrollRef = useRef();
    useEffect(() => {
        getAllMembers("")
        setAllMembersData([])
        setSearchBox(false)
        setMessage("")
        if (selectedMembersId && selectedMembersList) {
            setArrayList(selectedMembersId)
            setMemberList(selectedMembersList)
        }
    }, [visibleModal])

    // function for get all members data on api call
    const getAllMembers = async (text, getnwPage = false) => {
        let data = {
            search: text.trim()
        }
        // var fUrl = get_memberList
        const newpage = getnwPage ? page + 1 : 1;
        var fUrl = get_memberList + `?page=${newpage}&limit=10`;
        var urls = '&name=' + text
        console.log('my url---------->', urls)
        if (urls != undefined) {
            fUrl = fUrl + urls
        }
        setLoader(true)
        const { responseJson, err } = await requestGetApi(fUrl, '', 'GET', User.token)
        setLoader(false)
        if (responseJson.headers.success == 1) {
            console.log('does it comes into thissucess');
            if (!getnwPage) {
                console.log('the res after sucess of specific members tasks', responseJson.body.data)
                setLoader(false);
                // setNoData(false);
                setAllMembersData(responseJson?.body?.data)
                setLastPage(responseJson.body.lastPage);
            } else {
                setLoader(false);
                // setNoData(false);
                setAllMembersData((allMembersData) => [...allMembersData, ...responseJson?.body?.data]);
                console.log('i have reachedd to the point');
                setPage(newpage);
            }

        } else {
            console.log('my no members data------>>>>>>',)
            setAllMembersData([])
            setalert_sms(err)
            setMy_Alert(true)
        }
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

    // list for all added members
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

    // function for select members click
    const handleChecked = (selectedId, selectedData) => {
        setChecked(true)

        if (arrayList.includes(selectedId)) {
            setArrayList(arrayList.filter(ids => ids !== selectedId))
        } else {
            setArrayList([...arrayList, selectedId])
        }

        // for member list
        const objWithIdIndex = memberList.findIndex(
            obj => obj.id === selectedData.id
        )

        if (objWithIdIndex > -1) {
            memberList.splice(objWithIdIndex, 1)
        } else {
            setMemberList([...memberList, selectedData])
        }
    }

    // navigation for subscription plan on plan purchase click
    const handlePlanPurchaseSubmitClick = () => {
        setPlanPurchaseVisible(false)
        navigation.navigate("StackNavigation", {
            screen: "SubscriptionPlan"
        })
    }

    // function for submit button click for api call to invite user for splits
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
            .catch(error => {
                setButtonLoader(false)
                console.log(error)
            })
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
                // onSubmit={(values, { resetForm }) => {
                //     onSubmit(values)
                //     resetForm({ values: initialValues })
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
                            onClose()
                        }}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalViewEmailId}>
                                <ScrollView showsVerticalScrollIndicator={false}>
                                    {/* cross button section  */}
                                    <TouchableOpacity
                                        style={styles.crossContainer}
                                        onPress={() => {
                                            onClose()
                                        }}
                                    >
                                        <Image
                                            style={styles.image}
                                            resizeMode="contain"
                                            source={require("../../../assets/Remindably/cross.png")}
                                        />
                                    </TouchableOpacity>

                                    {/* <View style={styles.imageContainer}>
                                        <Image
                                            resizeMode="contain"
                                            source={require("../../../assets/Remindably/memberEmailId.png")}
                                        />
                                    </View> */}

                                    {/* user invite section  */}
                                    {/* <Text style={styles.groupLabel}>Enter Member Email ID</Text>
                                    <TextInput
                                        placeholder="Johndoe@gmail.com"
                                        placeholderTextColor={Mycolors.textGray}
                                        style={styles.textInput}
                                    onChangeText={handleChange("email")}
                                    onBlur={() => {
                                        handleBlur("email")
                                        setFieldTouched("email")
                                    }}
                                    value={values.email.trim()}
                                    /> */}

                                    {/* <Text style={styles.errorMessage}>
                                        {touched.email && errors.email}
                                    </Text> */}

                                    {/* first name section  */}
                                    {/* <View style={styles.direction}>
                                        <View style={styles.nameInputContainer}>
                                            <TextInput
                                                style={styles.nameInput}
                                                placeholder="John"
                                                placeholderTextColor={Mycolors.textGray}
                                            onChangeText={handleChange("firstName")}
                                            onBlur={() => {
                                                handleBlur("firstName")
                                                setFieldTouched("firstName")
                                            }}
                                            value={values.firstName.trim()}
                                            />

                                            <Text style={styles.errorMessage}>
                                                {touched.firstName && errors.firstName}
                                            </Text>
                                        </View>

                                     
                                        <View style={styles.nameInputContainer}>
                                            <TextInput
                                                style={styles.nameInput}
                                                placeholder="Doe"
                                                placeholderTextColor={Mycolors.textGray}
                                            onChangeText={handleChange("secondName")}
                                            onBlur={() => {
                                                handleBlur("secondName")
                                                setFieldTouched("secondName")
                                            }}
                                            value={values.secondName.trim()}
                                            />

                                            <Text style={styles.errorMessage}>
                                                {touched.secondName && errors.secondName}
                                            </Text>
                                        </View>
                                    </View> */}

                                    {/* invite button section  */}
                                    {/* <View style={styles.buttonContainer}>
                                        <SubmitButton
                                            loader={buttonLoader}
                                            submitButton={() => {
                                                handleSubmit()
                                            }}
                                            buttonText={"Invite new user"}
                                        />
                                    </View> */}

                                    {/* <View>
                                        {message !== "" ? (
                                            <Text style={styles.successMessage}>{message}</Text>
                                        ) : (
                                            <Text style={styles.successMessage} />
                                        )}
                                    </View> */}

                                    {/* <Divider style={styles.divider} /> */}

                                    {/* members section */}
                                    <View style={{ marginTop: 50 }}>
                                        <View style={styles.searchLabelContainer}>
                                            <Text style={styles.addedMemberLabel}>
                                                Listed members
                                            </Text>
                                            {/* <TouchableOpacity
                                                style={styles.searchContainer}
                                                onPress={() => setSearchBox(true)}
                                            >
                                                <Image
                                                    resizeMode="contain"
                                                    source={require("../../../assets/Remindably/searchIcon.png")}
                                                />
                                            </TouchableOpacity> */}
                                        </View>
                                        <Text style={styles.addedMemberNote}>
                                            Please select members from the list to add to the
                                            routine
                                        </Text>

                                        {/* display search box on search icon click */}

                                        <TextInput
                                            placeholder="Search by member name"
                                            placeholderTextColor={Mycolors.textGray}
                                            style={[styles.textInput, { marginVertical: 12, marginTop: 20 }]}
                                            onChangeText={text => {
                                                getAllMembers(text)
                                            }}
                                        />


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

                                    {/* button section */}
                                    <TouchableOpacity style={styles.buttonContainer} onPress={() => { onSubmitClick(arrayList, memberList) }}>
                                        <SubmitButton
                                            submitButton={() => {
                                                // onSubmitClick(arrayList, memberList)
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

                        {/* toaster message for error response from API  */}
                        {/* <CommonToast ref={toastRef} /> */}
                    </Modal>
                    {/* )} */}
                </View>
            </KeyboardAwareScrollView>
        </KeyboardAvoidingView>
    )
}

export default InviteMemberOnSplitModal

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
        fontSize: 14
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
    },
    divider: {
        backgroundColor: Mycolors.GRAY,
        height: 2,
        marginVertical: 10
    }
})
