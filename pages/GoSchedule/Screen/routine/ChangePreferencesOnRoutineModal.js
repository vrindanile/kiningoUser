//external imports
import {
    ActivityIndicator,
    FlatList,
    Image,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native"
import React, { useEffect, useState } from "react"
//internal imports
import Interests from "../userAuthentication/Interests"
import SubmitButton from "../../Constants/SubmitButton"
// import UserAuthService from "../../service/UserAuthService"
// import { colors } from "../../constants/ColorConstant"
import { Mycolors } from "../../../../utility/Mycolors"
import { requestGetApi, get_memberList, add_members, invite_user, requestPostApi, request_list, home_details, home_detailTask, taskHideUnhide, prefrence_list } from '../../../../WebApi/Service'
import { useSelector, useDispatch } from 'react-redux';

const ChangePreferencesOnRoutineModal = ({
    onClose,
    onSubmitClick,
    preferences,
    visibleModal
}) => {
    const [arrayList, setArrayList] = useState([])
    const [checked, setChecked] = useState(true)
    const [err, setErr] = useState(false)
    const [interest, setInterest] = useState([])
    const [loader, setLoader] = useState(false)
    const [pageLoader, setPageLoader] = useState(false)
    const [preferenceList, setPreferenceList] = useState([])
    const User = useSelector(state => state.user.user_details)
    useEffect(() => {
        // for preselected preference list
        let result = preferences.map(e => e.id)
        setArrayList(result)
        setErr(false)
        setPageLoader(true)
        getData()

        //  api call for get all preference list
        // UserAuthService.preferenceList()
        //     .then(response => {
        //         setPageLoader(false)
        //         setPreferenceList(response.data.preferences)
        //     })
        //     .catch(error => {
        //         setPageLoader(false)
        //         console.log(error.response)
        //     })
    }, [visibleModal])


    const getData = async () => {
        // setBusinessId(route?.params?.id)
        console.log('all memeneee')
        setPageLoader(true)

        const { responseJson, err } = await requestGetApi(prefrence_list, '', 'GET', User.token)
        // setPageLoader(false)
        console.log('response of prefrence list from new page', responseJson.body)
        // setMyGroupList(responseJson.body)
        if (responseJson.headers.success == true) {
            setPageLoader(false)
            setPreferenceList(responseJson.body)
            // const data = responseJson.body.map((el, index) => ({ ...el, memdId: (index + 1)?.toString() }))
            // setAllMembersData(data)
            // setGroupName(responseJson.body.name)
            // setGroupDetails(responseJson.body)

        } else {

            setalert_sms(err)
            setMy_Alert(true)
        }
    }

    // list for all preferences
    const renderInterestItem = ({ item }) => {
        return (
            <Interests
                interests={item}
                handleChecked={handleChecked}
                checked={checked}
                checkedList={arrayList}
            />
        )
    }

    // function on select preferences click
    const handleChecked = async (selectedId, interests) => {
        setErr(false)
        setChecked(true)
        setArrayList([selectedId])
        setInterest([interests])
    }

    // function for submit click
    const handleSubmit = () => {
        setLoader(true)
        if (arrayList.length > 0) {
            setLoader(false)
            setErr(false)
            onSubmitClick(arrayList, interest)
        } else {
            setErr(true)
            setLoader(false)
        }
    }

    return (
        <View>
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
                                onClose()
                            }}
                        >
                            <Image
                                style={styles.imageStyle}
                                resizeMode="contain"
                                source={require("../../../../assets/Remindably/cross.png")}
                            />
                        </TouchableOpacity>

                        <Text style={styles.groupLabel}>Select your preferences</Text>
                        {!pageLoader ? (
                            <View
                                style={{
                                    width: "100%",
                                    paddingHorizontal: 5,
                                    alignSelf: "center",
                                    height: 350
                                }}
                            >
                                <FlatList
                                    data={preferenceList}
                                    renderItem={renderInterestItem}
                                    numColumns={3}
                                    keyExtractor={(item, index) => String(index)}
                                />
                                {err ? (
                                    <Text style={styles.errorText}>
                                        Please select any preferences.
                                    </Text>
                                ) : null}
                            </View>
                        ) : (
                            <View style={styles.loaderContainer}>
                                <ActivityIndicator size="large" color={Mycolors.THEME_ORANGE} />
                            </View>
                        )}

                        {/* button with loader  */}
                        <TouchableOpacity style={styles.buttonContainer} onPress={() => handleSubmit()}>
                            <SubmitButton
                                loader={loader}
                                submitButton={handleSubmit}
                                buttonText={"Save"}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default ChangePreferencesOnRoutineModal

const styles = StyleSheet.create({
    centeredView: {
        backgroundColor: "rgba(0, 0, 0, 0.66)",
        flex: 1,
        justifyContent: "center"
    },
    modalViewGroup: {
        backgroundColor: Mycolors.THEME_WHITE,
        borderRadius: 30,
        paddingVertical: 30,
        paddingHorizontal: 10,
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
    groupLabel: {
        color: Mycolors.BLACK,
        fontSize: 18,
        fontWeight: "500",
        paddingBottom: 20
    },
    textInput: {
        backgroundColor: Mycolors.WHITE,
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
    buttonContainer: { paddingTop: 30 },
    crossContainer: {
        backgroundColor: Mycolors.THEME_ORANGE,
        borderRadius: 50,
        height: 30,
        position: "absolute",
        right: 15,
        top: 30,
        width: 30,
        zIndex: 1
    },
    imageStyle: {
        borderRadius: 10,
        height: "100%",
        width: "100%"
    },
    loaderContainer: {
        alignSelf: "center",
        height: 270,
        justifyContent: "center"
    },
    errorText: {
        color: Mycolors.RED,
        paddingHorizontal: 10
    }
})
