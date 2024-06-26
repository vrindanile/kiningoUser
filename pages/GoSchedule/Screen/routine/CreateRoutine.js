//external imports
import {
    ActivityIndicator,
    FlatList,
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from "react-native"
import React, { useEffect, useState } from "react"
//internal imports
import CustomHeader from "../../Constants/CustomHeaader"
import Interests from "../userAuthentication/Interests"
import SubmitButton from "../../Constants/SubmitButton"
// import UserAuthService from "../../service/UserAuthService"
// import { colors } from "../../constants/ColorConstant"
import { Mycolors } from "../../../../utility/Mycolors"
// prefrence_list
import { requestGetApi, get_memberList, add_members, invite_user, requestPostApi, request_list, home_details, home_detailTask, taskHideUnhide, prefrence_list } from '../../../../WebApi/Service'
import { useSelector, useDispatch } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
const CreateRoutine = ({ navigation, route }) => {
    const [arrayList, setArrayList] = useState([])
    const [businessId, setBusinessId] = useState(route?.params?.id)
    const [checked, setChecked] = useState(false)
    const [err, setErr] = useState(false)
    const [loader, setLoader] = useState(false)
    const [pageLoader, setPageLoader] = useState(false)
    const [preferenceList, setPreferenceList] = useState([])
    const User = useSelector(state => state.user.user_details)
    const isFocused = useIsFocused();
    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            getData()
            console.log('route?.params?.id', route?.params?.id);
            // setBusinessId(route?.params?.id)
            // setPageLoader(true)

            //  api call for get all preference list
            // UserAuthService.preferenceList()
            //     .then(response => {
            //         setPageLoader(false)
            //         setPreferenceList(response.data.preferences)
            //     })
            //     .catch(error => {
            //         setPageLoader(false)
            //         console.log(error)
            //     })
        })
        return unsubscribe
    }, [navigation])


    const getData = async () => {
        setBusinessId(route?.params?.id)
        console.log('all memeneee')
        setPageLoader(true)

        const { responseJson, err } = await requestGetApi(prefrence_list, '', 'GET', User.token)
        // setPageLoader(false)
        console.log('response of prefrence list', responseJson.body)
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
    const handleChecked = async selectedId => {
        setChecked(true)
        setErr(false)
        setArrayList([selectedId])
    }

    // function for submit click
    const handleSubmit = () => {
        setLoader(true)
        if (arrayList.length > 0) {
            setLoader(false)
            setErr(false)

            setArrayList([])
            navigation.navigate(
                "CreateRoutineDetails",
                { preferenceId: arrayList, businessId: businessId }
            )
        } else {
            setErr(true)
            setLoader(false)
        }
    }

    return (
        <View style={styles.container}>
            {/* header section */}
            <CustomHeader
                headerText={"Create Your Routine"}
                backButton={{
                    visible: true,
                    onClick: () => {
                        navigation.goBack()
                    }
                }}
            />

            {/* body section */}
            {!pageLoader ? (
                <View style={styles.body}>
                    <Text style={styles.focusText}>Select a category:</Text>

                    <View
                        style={{
                            height: "60%",
                            alignSelf: "center"
                        }}
                    >
                        <FlatList
                            data={preferenceList}
                            renderItem={renderInterestItem}
                            numColumns={3}
                            keyExtractor={(item, index) => String(index)}
                        />
                    </View>
                    {err ? (
                        <Text style={styles.errorText}>Please select any preference.</Text>
                    ) : null}

                    <TouchableOpacity style={styles.submitButton} onPress={() => handleSubmit()}>
                        <SubmitButton
                            loader={loader}
                            submitButton={handleSubmit}
                            buttonText={"Continue"}
                        />
                    </TouchableOpacity>
                </View>
            ) : (
                <View style={styles.loaderContainer}>
                    <ActivityIndicator size="large" color={Mycolors.THEME_ORANGE} />
                </View>
            )}
        </View>
    )
}

export default CreateRoutine
const styles = StyleSheet.create({
    container: { flex: 1 },
    body: { padding: 10 },
    focusText: {
        color: Mycolors.BLACK,
        fontSize: 20,
        fontWeight: "400",
        marginBottom: 20,
        paddingVertical: 10
    },
    submitButton: {
        marginTop: 50
    },
    loaderContainer: {
        alignSelf: "center",
        flex: 1,
        justifyContent: "center"
    },
    errorText: {
        color: Mycolors.RED,
        paddingHorizontal: 10
    }
})
