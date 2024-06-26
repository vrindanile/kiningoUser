//external imports
import {
    ActivityIndicator,
    FlatList,
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native"
import LinearGradient from "react-native-linear-gradient"
import React, { useEffect, useRef, useState } from "react"
//internal imports
// import CommonToast from "../../constants/CommonToast"
import CustomHeader from "../../Constants/CustomHeaader"
// import GroupServices from "../../service/GroupServices"
import MyGroupsTab from "./MyGroupsTab"
// shared_groups
// import ShareGroupIdModal from "./ShareGroupIdModal"
import { requestGetApi, get_memberList, add_members, invite_user, requestPostApi, request_list, home_details, home_detailTask, taskHideUnhide, markasincomplete, markasComplete, shared_groups } from '../../../../WebApi/Service'
import { useSelector, useDispatch } from 'react-redux';
import { Mycolors } from "../../../../utility/Mycolors"

const SharedGroups = ({ navigation }) => {
    const User = useSelector(state => state.user.user_details)

    const [myGroupList, setMyGroupList] = useState([])
    const [noData, setNoData] = useState(false)
    const [pageLoader, setPageLoader] = useState(false)
    const [searchText, setSearchText] = useState("")
    const [shareIdGroupVisible, setShareIdGroupVisible] = useState(false)
    const toastRef = useRef()

    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            setSearchText("")
            setPageLoader(true)
            getData()
        })
        return unsubscribe
    }, [navigation])

    // function for get all shared group data on api call
    const getData = async () => {
        // GroupServices.getSharedGroups()
        //     .then(response => {
        //         setPageLoader(false)
        //         setMyGroupList(response.data.mygroups)
        //     })
        //     .catch(error => {
        //         setPageLoader(false)
        //         console.log(error)
        //     })
        const { responseJson, err } = await requestGetApi(shared_groups, '', 'GET', User.token)

        console.log('response of counts of difftabs', responseJson)
        // setMyGroupList(responseJson.body)
        if (responseJson.headers.success == true) {
            console.log('shared groups', responseJson.body);
            setPageLoader(false)
            setMyGroupList(responseJson.body)
            // setGroupList(responseJson.body.groupList)
            // setPostCount(response?.data?.postcount)
            // setEventCount(response?.data?.nearbyeventcounts)
            // console.log('the res after sucess of specific members from the screen', responseJson)
            // const data = responseJson.body.map((el, index) => ({ ...el, memdId: (index + 1)?.toString() }))
            // setAllMembersData(data)
            // setGroupName(responseJson.body.name)
            // setGroupDetails(responseJson.body)

        } else {

            setalert_sms(err)
            setMy_Alert(true)
        }
    }

    // function for search all shared group data on api call
    const searchGroup = async (text) => {
        setPageLoader(true)
        // GroupServices.getSearchSharedGroups(text)
        //     .then(response => {
        //         if (response.data.mygroups.length > 0) {
        //             setNoData(false)
        //             setMyGroupList(response.data.mygroups)
        //             setPageLoader(false)
        //         } else {
        //             setMyGroupList(response.data.mygroups)
        //             setPageLoader(false)
        //             setNoData(true)
        //         }
        //     })
        //     .catch(error => {
        //         console.log(error)
        //     })
        var furl = shared_groups
        var url = `?name=` + text
        if (url != undefined) {
            furl = furl + url
        }
        const { responseJson, err } = await requestGetApi(furl, '', 'GET', User.token)

        console.log('my response of search shared group----->>', responseJson);


        if (responseJson.body.length > 0) {
            console.log('does i', responseJson.body);
            setNoData(false)
            setMyGroupList(responseJson.body)
            setPageLoader(false)
        } else {
            console.log('does i', responseJson.body);
            setMyGroupList(responseJson.body)
            setPageLoader(false)
            setNoData(true)
        }
    }
    // list for shared groups
    const renderGroupsItems = ({ item }) => {
        return (
            <MyGroupsTab
                items={item}
                navigation={navigation}
                title={"SHAREDGROUPS"}
            />
        )
    }

    // function for close modal on close shared group click
    const onSharedGroupIdCloseClick = () => {
        setShareIdGroupVisible(!shareIdGroupVisible)
    }

    // function for share group successfully
    const onShareGroupIdSubmitClick = msg => {
        setShareIdGroupVisible(!shareIdGroupVisible)
        toastRef.current.getToast(msg, "success")
        getData()
    }

    return (
        <View style={styles.container}>
            {/* header section */}
            <CustomHeader
                headerText={"Shared Groups"}
                backButton={{
                    visible: true,
                    onClick: () => {
                        navigation.navigate("Home")
                    }
                }}
            />
            {/* search box */}
            <View style={styles.searchBoxContainer}>
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="Search group by name"
                        placeholderTextColor={Mycolors.textGray}
                        style={styles.searchInput}
                        value={searchText}
                        onChangeText={text => {
                            setSearchText(text)
                            searchGroup(text)
                        }}
                    />
                </View>
                <View style={styles.searchContainer}>
                    <TouchableOpacity>
                        <Image
                            resizeMode="contain"
                            source={require("../../../../assets/Remindably/searchIcon.png")}
                        />
                    </TouchableOpacity>
                </View>
            </View>

            {/* body section */}
            {!pageLoader ? (
                myGroupList?.length > 0 ? (
                    <View style={styles.body}>
                        {/* my groups list  */}
                        <View style={{ height: "90%" }}>
                            <FlatList
                                data={myGroupList}
                                scrollEnabled={true}
                                renderItem={renderGroupsItems}
                                listKey={"myGroupList"}
                                keyExtractor={(item, index) => String(index)}
                            />
                        </View>
                    </View>
                ) : (
                    <View style={styles.noDataContainer}>
                        {!noData ? (
                            <Text style={styles.noDataText}>No Shared Group</Text>
                        ) : (
                            <Text style={styles.noDataText}>No result found</Text>
                        )}
                    </View>
                )
            ) : (
                <View style={styles.loaderContainer}>
                    <ActivityIndicator size="large" color={Mycolors.THEME_ORANGE} />
                </View>
            )}

            {/* share id icon  */}
            {/* <LinearGradient
                colors={["#F28520", "#F5BD35"]}
                style={styles.createIconContainer}
            >
                <TouchableOpacity
                    onPress={() => {
                        // handleCreateClick();
                        setShareIdGroupVisible(!shareIdGroupVisible)
                    }}
                >
                    <Image
                        style={styles.createIconImage}
                        resizeMode="contain"
                        source={require("../../../../assets/Remindably/Plus.png")}
                    />
                </TouchableOpacity>
            </LinearGradient> */}

            {/* Modal for create group */}
            {/* <ShareGroupIdModal
                visibleModal={shareIdGroupVisible}
                onClose={() => {
                    onSharedGroupIdCloseClick()
                }}
                onSubmitClick={onShareGroupIdSubmitClick}
            /> */}
            {/* toaster message for error response from API  */}
            {/* <CommonToast ref={toastRef} /> */}
        </View>
    )
}

export default SharedGroups

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    body: {
        padding: 10
    },
    searchBoxContainer: {
        flexDirection: "row",
        height: 65,
        justifyContent: "space-between",
        padding: 10
    },
    inputContainer: {
        borderRadius: 8,
        width: "84%"
    },
    searchInput: {
        backgroundColor: Mycolors.WHITE,
        borderRadius: 8,
        color: Mycolors.BLACK,
        fontSize: 16,
        padding: 10,
        paddingLeft: 10
    },
    searchContainer: {
        alignItems: "center",
        backgroundColor: Mycolors.THEME_ORANGE,
        borderRadius: 10,
        justifyContent: "center",
        width: "14%"
    },
    createIconContainer: {
        alignItems: "center",
        backgroundColor: Mycolors.WHITE,
        borderRadius: 100,
        bottom: 60,
        height: 60,
        justifyContent: "center",
        padding: 20,
        position: "absolute",
        right: 25,
        width: 60,
        zIndex: 1
    },
    createIconImage: {
        borderRadius: 100,
        height: 25,
        width: 25
    },
    loaderContainer: {
        alignSelf: "center",
        flex: 1,
        justifyContent: "center"
    },
    noDataContainer: {
        alignItems: "center",
        flex: 1,
        justifyContent: "center"
    },
    noDataText: {
        color: Mycolors.THEME_BLACK,
        fontSize: 20,
        fontWeight: "500",
        textAlign: "center"
    }
})
