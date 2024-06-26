//external imports
import {
    ActivityIndicator,
    FlatList,
    Image,
    Modal,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native"
import React, { useEffect, useRef, useState } from "react"
//internal imports
import { useIsFocused } from "@react-navigation/native";
import AllMembersTab from "./AllMembersTab"
import { useSelector, useDispatch } from 'react-redux';
import { requestGetApi, get_memberList, add_members, invite_user, requestPostApi } from '../../../../WebApi/Service'


// import CommonToast from "../../constants/CommonToast"
// import GroupServices from "../../service/GroupServices"
import SubmitButton from "../../Constants/SubmitButton"
// import { colors } from "../../constants/ColorConstant"
import { Mycolors } from "../../../../utility/Mycolors"
const TaskAssignMemberModal = ({
    groupId,
    navigation,
    onClose,
    onSubmitClick,
    visibleModal
}) => {
    const scrollRef = useRef();
    const [allMembersData, setAllMembersData] = useState([])
    const isFocus = useIsFocused()
    const [arrayList, setArrayList] = useState([])
    console.log('arrayList------>', arrayList);
    const [checked, setChecked] = useState(true)
    const [loader, setLoader] = useState(false)
    const [memberList, setMemberList] = useState([])
    const [noData, setNoData] = useState(false)
    const [searchText, setSearchText] = useState("")
    const [selectVisible, setSelectVisible] = useState(false)
    const toastRef = useRef()
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const User = useSelector(state => state.user.user_details)
    useEffect(() => {
        setSearchText("")
        //setArrayList([])
        getAllMembers('')

    }, [isFocus])

    // function for get all members data on api call
    const getAllMember = () => {
        setLoader(true)

        const data = {
            group_id: groupId
        }

        setLoader(true)
    }
    // const getAllMembers = async (text) => {
    //     console.log('this is called when user list is shown', groupId)
    //     setLoader(true)
    //     var fUrl = get_memberList
    //     var murl = `?group_id=` + groupId
    //     var urls = '&case=' + 2
    //     var urlss = '&name=' + text

    //     console.log('my url task details---------->', urls)
    //     if (urlss != undefined) {
    //         fUrl = fUrl + murl + urls + urlss
    //     }
    //     console.log("saaaaaccc create task:::", fUrl);
    //     const { responseJson, err } = await requestGetApi(fUrl, '', 'GET', User.token)
    //     setLoader(false)
    //     console.log('response of', responseJson)
    //     // setMyGroupList(responseJson.body)
    //     if (responseJson.headers.success == true) {
    //         console.log('the res after sucess of specific members agter the assign members', responseJson)
    //         setAllMembersData(responseJson.body.data)
    //         // setGroupName(responseJson.body.name)
    //         // setGroupDetails(responseJson.body)

    //     } else {

    //         setalert_sms(err)
    //         setMy_Alert(true)
    //     }
    // }
    const getAllMembers = async (text, getnwPage = false) => {
        console.log('all memeneee for the all members list')
        const newpage = getnwPage ? page + 1 : 1;

        console.log('my new getnewpage', newpage);
        var fUrl = get_memberList
        console.log('my intial step for the url');
        var murl = `&group_id=` + groupId
        console.log('my second2  step for the url');
        var ru = `?page=${newpage}&limit=10`
        console.log('my second3  step for the url');
        console.log('my second3  step for the url');
        var urls = '&case=' + 2
        console.log('my second step for the url');
        var urlss = '&name=' + text
        console.log('does it reach here in the urls of listing');

        console.log('my url task details---------->', urls)
        fUrl = fUrl + ru + murl + urls
        console.log('my url is there for the new furl----->>', fUrl);
        if (urlss != undefined) {
            fUrl = fUrl + urlss
        }
        console.log('my furl fr groups of all members---->>>', fUrl);
        setLoader(true)
        const { responseJson, err } = await requestGetApi(fUrl, '', 'GET', User.token)

        if (responseJson.headers.success == 1) {

            console.log('mmmm  does it reach here', responseJson.headers.success);

            if (!getnwPage) {
                console.log('my last page--->>>', responseJson.body.data)
                setLoader(false)
                setNoData(false)
                setAllMembersData(responseJson.body.data)
                setLastPage(responseJson.body.lastPage);

            } else {
                setLoader(false)
                setNoData(false)
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


    // list for all members
    const renderAddedMembers = ({ item }) => {
        console.log('renderAddedMembers', item);
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
        console.log('does handel select id called');
        console.log(selectedId, 'selectedId-------------->>>??');
        setChecked(true)
        console.log('before the includes', arrayList);
        if (arrayList.includes(selectedId)) {
            console.log('ccl agter includes');
            setArrayList(arrayList.filter(userid => userid !== selectedId))
        } else {
            console.log('arrayList--->>', arrayList);
            setArrayList([...arrayList, selectedId])
        }

        // for member list
        const objWithIdIndex = memberList.findIndex(
            obj => obj.id === selectedData.userid
        )

        if (objWithIdIndex > -1) {
            memberList.splice(objWithIdIndex, 1)
        } else {
            setMemberList([...memberList, selectedData])
        }
    }

    // function for search all member data on api call
    const getSearchMember = text => {
        if (text !== "") {
            let data = {
                groupid: groupId,
                search: text
            }

            // GroupServices.postSearchMembers(data)
            //     .then(response => {
            //         setAllMembersData(response.data.users)
            //         setNoData(true)
            //     })
            //     .catch(error => {
            //         console.log(error)
            //     })
        } else {
            getAllMembers('')
        }
    }
    const getSearchMembers = async (text) => {
        console.log('all memeneee')
        setLoader(true)
        var fUrl = get_memberList
        var urls = '?name=' + text
        console.log('my url---------->', urls)
        if (urls != undefined) {
            fUrl = fUrl + urls
        }
        console.log("saaaaaccc:::", fUrl);
        const { responseJson, err } = await requestGetApi(fUrl, '', 'GET', User.token)
        setLoader(false)
        console.log('response of', responseJson)
        // setMyGroupList(responseJson.body)
        if (responseJson.headers.success == true) {
            console.log('the res after sucess of specific members', responseJson)
            setAllMembersData(responseJson.body)
            // setGroupName(responseJson.body.name)
            // setGroupDetails(responseJson.body)

        } else {

            setalert_sms(err)
            setMy_Alert(true)
        }
    }
    // function on select all member click
    const handleSelectAll = () => {
        setSelectVisible(true)
        console.log('all members data after filtering--->>', allMembersData.map(e => e.userid));
        let membersId = allMembersData.map(e => e.userid)
        console.log('memeverrrrr', membersId, allMembersData);
        setArrayList(membersId)
        setMemberList(allMembersData)
    }

    // function on unselect all member click
    const handleUnSelectAll = () => {
        setSelectVisible(false)
        setArrayList([])
        setMemberList([])
    }
    //function add members
    const handelSave = async () => {
        console.log('all memeneee')
        var data = {

            group_id: groupId,
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
            setAllMembersData(responseJson.body)
            setGroupName(responseJson.body.name)
            setGroupDetails(responseJson.body)

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
        <View>
            <Modal
                animationType="fade"
                transparent={true}
                visible={visibleModal}
                onShow={() => { getAllMembers('') }}
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

                        <Text style={styles.groupLabel}>
                            Select member from group to assign this task
                        </Text>

                        {/* search member section  */}
                        <TextInput
                            placeholder="Search by member name"
                            placeholderTextColor={Mycolors.textGray}
                            style={styles.textInput}
                            value={searchText}
                            onChangeText={text => {
                                setSearchText(text)
                                getAllMembers(text)
                            }}
                        />

                        {/*recently added members  */}
                        {!loader ? (
                            allMembersData?.length >= 1 ? (
                                <>
                                    {/* select and unSelect section  */}
                                    {!selectVisible ? (
                                        <TouchableOpacity
                                            style={{ width: 80 }}
                                            onPress={() => {
                                                handleSelectAll()
                                            }}
                                        >
                                            <Text style={styles.selectText}>Select All</Text>
                                        </TouchableOpacity>
                                    ) : (
                                        <TouchableOpacity
                                            style={{ width: 95 }}
                                            onPress={() => {
                                                handleUnSelectAll()
                                            }}
                                        >
                                            <Text style={styles.selectText}>Unselect All</Text>
                                        </TouchableOpacity>
                                    )}

                                    {/* all members list  */}
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
                                </>
                            ) : (
                                <>
                                    {!noData ? (
                                        <View style={styles.noMembersContainer}>
                                            <Text style={styles.noMembersText}>
                                                No members available
                                            </Text>
                                        </View>
                                    ) : (
                                        <View style={styles.noMembersContainer}>
                                            <Text style={styles.noMembersText}>No Results Found </Text>
                                        </View>
                                    )}
                                </>
                            )
                        ) : (
                            <View style={styles.loaderContainer}>
                                <ActivityIndicator size="large" color={Mycolors.THEME_ORANGE} />
                            </View>
                        )}

                        <TouchableOpacity style={styles.buttonContainer} onPress={() => {
                            setSelectVisible(false)
                            onSubmitClick(arrayList, memberList)
                        }}>
                            <SubmitButton
                                submitButton={() => {
                                    setSelectVisible(false)
                                    onSubmitClick(arrayList, memberList)
                                }}
                                buttonText={"Submit"}
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

export default TaskAssignMemberModal

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
        marginVertical: 15,
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
        zIndex: 1,

    },
    image: {
        borderRadius: 50,
        height: "100%",
        width: "100%",
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
        fontSize: 20,
        fontWeight: "500",
        padding: 20
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
    selectText: {
        color: Mycolors.THEME_ORANGE,
        fontSize: 16,
        fontWeight: "500",
        padding: 2
    }
})
