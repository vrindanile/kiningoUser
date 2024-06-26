// // external imports
// import {
//     ActivityIndicator,
//     FlatList,
//     Image,
//     StyleSheet,
//     Text,
//     TextInput,
//     TouchableOpacity,
//     View
// } from "react-native"
// import React, { useEffect, useState } from "react"
// // internal imports
// import CustomHeader from "../../Constants/CustomHeaader"
// // import FilterCommunityModal from "./FilterCommunityModal"
// // import PublishedRoutinesTab from "./PublishedRoutinesTab"
// // import RoutineService from "../../service/RoutineService"

// import { Mycolors } from '../../../../../src/utility/Mycolors'
// const Community = ({ navigation }) => {
//     const [communityRoutines, setCommunityRoutines] = useState([])
//     const [filterCommunityModal, setFilterCommunityModal] = useState(false)
//     const [noData, setNoData] = useState(false)
//     const [pageLoader, setPageLoader] = useState(false)
//     const [searchText, setSearchText] = useState("")

//     useEffect(() => {
//         const unsubscribe = navigation.addListener("focus", () => {
//             getData()
//             setSearchText("")
//         })
//         return unsubscribe
//     }, [navigation])

//     const handleOpenDrawer = () => {
//         navigation.openDrawer()
//     }

//     // function for get all my community data api call
//     const getData = () => {
//         setPageLoader(true)
//         RoutineService.getAllCommunityRoutines()
//             .then(response => {
//                 setPageLoader(false)
//                 setCommunityRoutines(response.data.communityroutines)
//             })
//             .catch(error => {
//                 setPageLoader(false)
//                 console.log("error", error)
//             })
//     }

//     // function for get all my community routine data api call
//     const getAllSearchCommunityRoutines = text => {
//         setPageLoader(true)
//         RoutineService.getAllSearchCommunityRoutines(text)
//             .then(response => {
//                 setPageLoader(false)
//                 if (response.data.communityroutines.length > 0) {
//                     setCommunityRoutines(response.data.communityroutines)
//                     setPageLoader(false)
//                     setNoData(false)
//                 } else {
//                     setCommunityRoutines(response.data.communityroutines)
//                     setPageLoader(false)
//                     setNoData(true)
//                 }
//             })
//             .catch(error => {
//                 setPageLoader(false)
//                 console.log("error", error)
//             })
//     }

//     // function for filter community routine api call
//     const handleFilterCommunityApplyClick = (selectDate, selectedId) => {
//         const filterData = {
//             preference_id: selectedId,
//             publish_date: selectDate
//         }

//         setFilterCommunityModal(false)
//         setPageLoader(true)

//         RoutineService.postFilterCommunityRoutines(filterData)
//             .then(response => {
//                 if (response.data.communityroutines.length > 0) {
//                     setNoData(false)
//                     setCommunityRoutines(response.data.communityroutines)
//                     setPageLoader(false)
//                 } else {
//                     setCommunityRoutines(response.data.communityroutines)
//                     setPageLoader(false)
//                     setNoData(true)
//                 }
//             })
//             .catch(error => {
//                 setPageLoader(false)
//                 console.log("error", error)
//             })
//     }

//     // function for filter click
//     const handleFilterCommunityResetClick = () => {
//         setFilterCommunityModal(false)
//         getData()
//     }

//     // list for routine tab
//     const renderRoutineItem = ({ item }) => {
//         return <PublishedRoutinesTab item={item} onTabClick={handleOnTabClick} />
//     }

//     // navigation for community details page
//     const handleOnTabClick = communityId => {
//         navigation.navigate("StackNavigation", {
//             screen: "CommunityDetails",
//             params: { id: communityId }
//         })
//     }

//     return (
//         <View style={styles.container}>
//             {/* header section */}
//             <CustomHeader
//                 headerText={"Community"}
//                 drawerButton={{
//                     visible: true,
//                     onClick: () => {
//                         handleOpenDrawer()
//                     }
//                 }}
//                 bellButton={{
//                     visible: true,
//                     onClick: () => {
//                         navigation.navigate("StackNavigation", {
//                             screen: "Notifications"
//                         })
//                     }
//                 }}
//             />

//             {/* body section */}
//             <View style={styles.body}>
//                 <View>
//                     <View style={styles.searchBoxContainer}>
//                         <View style={styles.inputContainer}>
//                             <TextInput
//                                 placeholder="Search by title, sub title and description"
//                                 placeholderTextColor={Mycolors.textGray}
//                                 style={styles.searchInput}
//                                 value={searchText}
//                                 onChangeText={text => {
//                                     setSearchText(text)
//                                     getAllSearchCommunityRoutines(text)
//                                 }}
//                             />
//                         </View>
//                         <TouchableOpacity
//                             style={styles.searchContainer}
//                             onPress={() => {
//                                 setFilterCommunityModal(true)
//                             }}
//                         >
//                             {/* <Image
//                                 resizeMode="contain"
//                                 source={require("../../assets/pngImage/filter.png")}
//                             /> */}
//                         </TouchableOpacity>
//                     </View>
//                 </View>

//                 <View style={styles.publishedRoutineContainer}>
//                     <Text style={styles.publishedRoutineTitle}>Published Routines</Text>
//                     <TouchableOpacity
//                         style={styles.createContainer}
//                         onPress={() => {
//                             navigation.navigate("StackNavigation", {
//                                 screen: "CreateRoutine"
//                             })
//                         }}
//                     >
//                         {/* <Image
//                             resizeMode="contain"
//                             source={require("../../assets/pngImage/Add.png")}
//                         /> */}
//                         <Text style={styles.createTitle}>Create Routine</Text>
//                     </TouchableOpacity>
//                 </View>

//                 {/* body section  */}
//                 {!pageLoader ? (
//                     communityRoutines?.length > 0 ? (
//                         <View style={styles.publishedRoutinesBox}>
//                             <FlatList
//                                 data={communityRoutines}
//                                 renderItem={renderRoutineItem}
//                                 keyExtractor={(item, index) => String(index)}
//                             />
//                         </View>
//                     ) : (
//                         <View style={styles.noDataContainer}>
//                             {!noData ? (
//                                 <Text style={styles.noDataText}>
//                                     No Routine created yet. {"\n"}Click on the "+ Create Routine"
//                                     to create a Routine.
//                                 </Text>
//                             ) : (
//                                 <Text style={styles.noDataText}>No result found</Text>
//                             )}
//                         </View>
//                     )
//                 ) : (
//                     <View style={styles.loaderContainer}>
//                         <ActivityIndicator size="large" color={Mycolors.THEME_ORANGE} />
//                     </View>
//                 )}
//             </View>

//             {/* FilterCommunityModal modal  */}
//             <FilterCommunityModal
//                 visibleModal={filterCommunityModal}
//                 onClose={() => {
//                     setFilterCommunityModal(false)
//                 }}
//                 onSubmitClick={handleFilterCommunityApplyClick}
//                 onResetClick={handleFilterCommunityResetClick}
//             />
//         </View>
//     )
// }

// export default Community

// const styles = StyleSheet.create({
//     container: {
//         flex: 1
//     },
//     body: {
//         padding: 10
//     },
//     publishedRoutineContainer: {
//         flexDirection: "row",
//         justifyContent: "space-between",
//         paddingVertical: 10
//     },
//     publishedRoutineTitle: {
//         color: Mycolors.BLACK,
//         fontSize: 18,
//         fontWeight: "500"
//     },
//     createContainer: {
//         alignItems: "center",
//         flexDirection: "row"
//     },
//     createTitle: {
//         color: Mycolors.THEME_ORANGE,
//         fontSize: 14,
//         paddingLeft: 5
//     },
//     publishedRoutinesBox: {
//         height: "83%",
//         paddingBottom: 10
//     },
//     loaderContainer: {
//         alignSelf: "center",
//         height: "83%",
//         justifyContent: "center"
//     },
//     noDataContainer: {
//         alignItems: "center",
//         height: "83%",
//         justifyContent: "center"
//     },
//     noDataText: {
//         color: Mycolors.THEME_BLACK,
//         fontSize: 20,
//         fontWeight: "500",
//         textAlign: "center"
//     },
//     searchBoxContainer: {
//         flexDirection: "row",
//         justifyContent: "space-between"
//     },
//     inputContainer: {
//         borderRadius: 8,
//         width: "83%"
//     },
//     searchInput: {
//         backgroundColor: Mycolors.WHITE,
//         borderRadius: 8,
//         color: Mycolors.BLACK,
//         fontSize: 14,
//         padding: 10,
//         paddingLeft: 10
//     },
//     searchContainer: {
//         alignItems: "center",
//         backgroundColor: Mycolors.THEME_ORANGE,
//         borderRadius: 10,
//         justifyContent: "center",
//         width: "14%"
//     }
// })
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
// import CreateGroupModal from "./CreateGroupModal"
import CreateGroupModal from "../groups/CreateGroupModal"
import { useSelector, useDispatch } from 'react-redux';
// import CustomHeader from "../../constants/CustomHeader"
// import GroupServices from "../../service/GroupServices"
import MyGroupsTab from "../groups/MyGroupsTab"
import { get_gropus, requestGetApi } from '../../../../WebApi/Service'
// import { colors } from "../../constants/ColorConstant"
import { Mycolors } from "../../../../utility/Mycolors"
import CustomHeader from "../../Constants/CustomHeaader"
const MyGroups = ({ navigation }) => {
    const [createGroupVisible, setCreateGroupVisible] = useState(false)
    const [myGroupList, setMyGroupList] = useState([{ id: 1, title: 'uuuuu' }])
    const [noData, setNoData] = useState(false)
    const [pageLoader, setPageLoader] = useState(false)
    const [searchText, setSearchText] = useState("")
    const toastRef = useRef()
    const User = useSelector(state => state.user.user_details)
    console.log('User', User.token);
    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            Categories()
            // setSearchText("")
            // setPageLoader(true)
            // function for get all my group data on api call
            // GroupServices.getMyGroups()
            //     .then(response => {
            //         setPageLoader(false)
            //         setMyGroupList(response.data.mygroups)
            //     })
            //     .catch(error => {
            //         setPageLoader(false)
            //         console.log(error)
            //     })
        })
        return unsubscribe
    }, [navigation])

    // function for search all my group data on api call
    const searchGroup = text => {
        setPageLoader(true)

        GroupServices.getSearchMyGroups(text)
            .then(response => {
                if (response.data.mygroups.length > 0) {
                    setNoData(false)
                    setMyGroupList(response.data.mygroups)
                    setPageLoader(false)
                } else {
                    setMyGroupList(response.data.mygroups)
                    setPageLoader(false)
                    setNoData(true)
                }
            })
            .catch(error => {
                console.log(error)
            })
    }

    // function for close modal on create group close click
    const onGroupCloseClick = () => {
        setCreateGroupVisible(!createGroupVisible)
    }

    // navigation on group details page after create group
    const onGroupCreateClick = groupDetails => {
        setCreateGroupVisible(!createGroupVisible)
        navigation.navigate("StackNavigation", {
            screen: "GroupDetails",
            params: {
                data: groupDetails?.groupid
            }
        })
    }

    // list for my group
    const renderGroupsItems = ({ item }) => {
        return (
            <MyGroupsTab items={item} navigation={navigation} title={"MYGROUPS"} />
        )
    }
    const Categories = async () => {
        console.log('categories called')
        setPageLoader(true)
        var fUrl = get_gropus

        const { responseJson, err } = await requestGetApi(fUrl, '', 'GET', User.token)
        setPageLoader(false)
        console.log('response afer click of items', responseJson)
        if (responseJson.headers.success == 1) {
            console.log('the res after sucess of category', responseJson.body)

        } else {

            setalert_sms(err)
            setMy_Alert(true)
        }
    }
    return (
        <View style={styles.container}>
            {/* header section */}
            <CustomHeader
                headerText={"My Groups"}
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
                    <Image
                        resizeMode="contain"
                        source={require("../../../../assets/Remindably/searchIcon.png")}
                    />
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
                            <Text style={styles.noDataText}>
                                No Group created yet. {"\n"}Click on the "+" icon to create a
                                Group.
                            </Text>
                        ) : (
                            <Text style={styles.noDataText}>No Results Found</Text>
                        )}
                    </View>
                )
            ) : (
                <View style={styles.loaderContainer}>
                    <ActivityIndicator size="large" color={Mycolors.THEME_ORANGE} />
                </View>
            )}

            {/* create notes icon  */}
            <LinearGradient
                colors={["#F28520", "#F5BD35"]}
                style={styles.createIconContainer}
            >
                <TouchableOpacity
                    onPress={() => {
                        // handleCreateClick();
                        setCreateGroupVisible(!createGroupVisible)
                    }}
                >
                    <Image
                        style={styles.createIconImage}
                        resizeMode="contain"
                        source={require("../../../../assets/Remindably/Plus.png")}
                    />
                </TouchableOpacity>
            </LinearGradient>

            {/* Modal for create group */}
            <CreateGroupModal
                visibleModal={createGroupVisible}
                onClose={() => {
                    onGroupCloseClick()
                }}
                onCreateClick={groupDetails => {
                    onGroupCreateClick(groupDetails)
                }}
                navigation={navigation}
            />

            {/* toaster message for error response from API  */}
            {/* <CommonToast ref={toastRef} /> */}
        </View>
    )
}

export default MyGroups

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
