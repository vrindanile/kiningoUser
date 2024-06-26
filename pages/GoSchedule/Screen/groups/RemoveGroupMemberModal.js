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
import React, { useEffect, useRef, useState } from "react"
//internal imports
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import AllMembersTab from "./AllMembersTab"
import { requestGetApi, get_memberList, add_members, invite_user, requestPostApi, recent_members, deleteGroup_member } from '../../../../WebApi/Service'
// import CommonToast from "../../constants/CommonToast"
// import GroupServices from "../../service/GroupServices"
import SubmitButton from "../../Constants/SubmitButton"
// import { colors } from "../../constants/ColorConstant"
import { Mycolors } from "../../../../utility/Mycolors"
const RemoveGroupMemberModal = ({
    groupId,
    myUserId,
    onClose,
    onSubmitClick,
    visibleModal
}) => {
    const scrollRef = useRef();
    console.log('group id---->>', groupId);
    const navigation = useNavigation();
    const [groupIdd, setGroupId] = useState(groupId)
    const [allMembersData, setAllMembersData] = useState([])
    const [arrayList, setArrayList] = useState([])
    const [checked, setChecked] = useState(false)
    const [loader, setLoader] = useState(false)
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const toastRef = useRef()
    const User = useSelector(state => state.user.user_details)
    console.log('User', User);
    useEffect(() => {
        setArrayList([])
        getRecentlyAddMembers()
        setGroupId(groupId)
    }, [visibleModal])

    // function for get all group members data on api call
    // const getAllMembers = () => {
    //     setLoader(true)
    //     const data = {
    //         group_id: groupId
    //     }

    //     setLoader(true)
    //     GroupServices.postRecentlyAddMembers(data)
    //         .then(response => {
    //             setLoader(false)
    //             setAllMembersData(response.data.users)
    //         })
    //         .catch(error => {
    //             console.log(error)
    //             setLoader(false)
    //         })
    // }

    // list fpr group members
    const renderAddedMembers = ({ item }) => {
        console.log('item from remove modal', item);
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
    const handleChecked = selectedId => {
        //in case my user id and member user id not same
        if (myUserId != selectedId) {
            setChecked(true)
            if (arrayList.includes(selectedId)) {
                setArrayList(arrayList.filter(ids => ids !== selectedId))
            } else {
                setArrayList([...arrayList, selectedId])
            }
        }
    }
    // const getRecentlyAddMembers = async () => {
    //     console.log('task called')
    //     // setPageLoader(true)
    //     var fUrl = recent_members
    //     var urls = '?group_id=' + groupIdd
    //     console.log('my url---------->', urls)
    //     if (urls != undefined) {
    //         fUrl = fUrl + urls
    //     }
    //     console.log('furlsssssssssss->>>>>>>>>>>', fUrl)
    //     const { responseJson, err } = await requestGetApi(fUrl, '', 'GET', User.token)
    //     // setPageLoader(false)
    //     console.log('response of recentMEmbers', responseJson)
    //     // setMyGroupList(responseJson.body)
    //     if (responseJson.headers.success == true) {
    //         console.log('the res after sucesful specific article modal', responseJson.body)
    //         setAllMembersData(responseJson.body.data)
    //         // setRecentlyMemberLoader(false)
    //         // setRecentlyAddedMemberList(responseJson.body)

    //     } else {

    //         setalert_sms(err)
    //         setMy_Alert(true)
    //     }
    // }

    const getRecentlyAddMembers = async (getnwPage = false) => {
        console.log('all memeneee')
        // setPageLoader(true)
        const newpage = getnwPage ? page + 1 : 1;

        console.log('my new getnewpage', newpage);
        // Update the fUrl with the new page value
        var fUrl = recent_members + `?page=${newpage}&limit=10`;


        var urls = '&group_id=' + groupIdd
        console.log('my url---------->', urls)
        if (urls != undefined) {
            fUrl = fUrl + urls
        }
        console.log('my furl fr groups remove members---->>>', fUrl);
        const { responseJson, err } = await requestGetApi(fUrl, '', 'GET', User.token)

        if (responseJson.headers.success == 1) {

            console.log('mmmm  does it reach here for remove memebers', responseJson.headers.success);

            if (!getnwPage) {
                console.log('my last page--->>>', responseJson.body.data)
                // setPageLoader(false)
                // setNoData(false)
                setAllMembersData(responseJson.body.data)
                setLastPage(responseJson.body.lastPage);

            } else {
                // setPageLoader(false)
                // setNoData(false)
                setAllMembersData((allMembersData) => [...allMembersData, ...responseJson.body.data]);
                console.log('i have reachedd to the point');
                setPage(newpage);
            }

        } else {
            // setPageLoader(false)
            setAllMembersData([])
            setNoData(true)
            setalert_sms(err)
            setMy_Alert(true)
        }
    }
    const RemoveMembers = async () => {
        console.log('does it click on submit button');
        // allMembersData?.length > 0 ? null :
        //     Toast.show({ text1: ' No members available' })
        // console.log('member valiable');
        var data = {

            groupid: groupIdd,
            deletemembers: arrayList

        }
        console.log('my array data ------->', data)
        setLoader(true)
        var fUrl = add_members
        console.log("saaaaaccc:::", fUrl);
        const { responseJson, err } = await requestPostApi(deleteGroup_member, data, 'POST', User.token)
        setLoader(false)
        console.log('response of hhhhhh gg', responseJson)
        // setMyGroupList(responseJson.body)
        if (responseJson.headers.success == true) {
            navigation.goBack();
            console.log('the res after sucess of delete of members', responseJson)
            // navigation.navigate('GroupDetails')
            // setAllMembersData(responseJson.body)
            // setGroupName(responseJson.body.name)
            // setGroupDetails(responseJson.body)

        } else {

            setalert_sms(err)
            setMy_Alert(true)
        }
    }
    const handleLoadMore = async () => {
        console.log('is homePAge2 is called', lastPage);
        console.log('my last page---->>', lastPage, page);
        if (page < lastPage) {
            console.log('page of my startup page');
            await getRecentlyAddMembers(true);
            console.log('Categories function completed. Updated state:', lastPage, page);
            // Continue with any additional logic after the async operation
        } else {
            console.log('Reached last page');

            // Handle the case where you've reached the last page
            // You can display a message or perform other actions here if needed
        }
    };
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
                    <View style={styles.modalViewEmailId}>
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
                                source={require("../../../../assets/Remindably/cross.png")}
                            />
                        </TouchableOpacity>

                        <Text style={styles.groupLabel}>Remove member from group</Text>

                        {/*recently added members  */}
                        {!loader ? (
                            allMembersData?.length >= 1 ? (
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
                                    <Text style={styles.noMembersText}>No members available</Text>
                                </View>
                            )
                        ) : (
                            <View style={styles.loaderContainer}>
                                <ActivityIndicator size="large" color={Mycolors.THEME_ORANGE} />
                            </View>
                        )}

                        <TouchableOpacity style={styles.buttonContainer} onPress={() => { onSubmitClick(arrayList) }}>
                            <SubmitButton
                                submitButton={() => {
                                    onSubmitClick(arrayList)
                                }}
                                buttonText={"Remove"}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* toaster message for error response from API  */}
            {/* <CommonToast ref={toastRef} /> */}
        </View>
    )
}

export default RemoveGroupMemberModal

const styles = StyleSheet.create({
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
    groupLabel: {
        color: Mycolors.BLACK,
        fontSize: 18,
        fontWeight: "500",
        paddingVertical: 10
    },
    buttonContainer: { marginTop: 15 },
    crossContainer: {
        backgroundColor: Mycolors.THEME_ORANGE,
        borderRadius: 50,
        height: 30,
        position: "absolute",
        right: 15,
        top: 10,
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
