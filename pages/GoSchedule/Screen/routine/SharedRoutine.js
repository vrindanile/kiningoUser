//external imports
import {
    ActivityIndicator,
    FlatList,
    Image,
    StyleSheet,
    Text,
    TextInput,
    View
} from "react-native"
import React, { useEffect, useState, useRef } from "react"
//internal imports
import CustomHeader from "../../Constants/CustomHeaader"
// import PublishedRoutinesTab from "../community/PublishedRoutinesTab"
// shared_routinelisting
import { requestGetApi, get_memberList, add_members, invite_user, requestPostApi, request_list, home_details, home_detailTask, taskHideUnhide, getRoutines, shared_routinelisting } from '../../../../WebApi/Service'
import { useSelector, useDispatch } from 'react-redux';
import PublishedRoutinesTab from "../community/PublishedRoutinesTab"
// import RoutineService from "../../service/RoutineService"
// import { colors } from "../../constants/ColorConstant"
import { Mycolors } from "../../../../utility/Mycolors"

const SharedRoutines = ({ navigation }) => {
    const scrollRef = useRef();
    const [noData, setNoData] = useState(false)
    const [pageLoader, setPageLoader] = useState(false)
    const [searchText, setSearchText] = useState("")
    const [sharedRoutines, setSharedRoutines] = useState([])
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const User = useSelector(state => state.user.user_details)
    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            setSearchText("")
            getData('')
            setPageLoader(true)
            // function for get all shared data on api call
            // RoutineService.getAllSharedRoutines()
            //     .then(response => {
            //         setPageLoader(false)
            //         setSharedRoutines(response.data.allroutines)
            //     })
            //     .catch(error => {
            //         setPageLoader(false)
            //         console.log("error", error)
            //     })
        })
        return unsubscribe
    }, [navigation])


    const getData = async (text, getnwPage = false) => {
        console.log('shared routine api ggg', text, getnwPage)

        const newpage = getnwPage ? page + 1 : 1;
        var furl = shared_routinelisting + `?page=${newpage}&limit=10`
        var urls = '&search=' + text
        if (urls != undefined) {
            furl = furl + urls
        }
        console.log('my shared routine', furl)
        setPageLoader(true)
        const { responseJson, err } = await requestGetApi(furl, '', 'GET', User.token)

        console.log('response of shared routine---->>>', responseJson.body)
        // setMyGroupList(responseJson.body)
        if (responseJson.headers.success == true) {

            if (!getnwPage) {
                console.log('my last page--->>>', responseJson.body.data.length)
                setPageLoader(false)
                setPageLoader(false)
                setNoData(false)
                setSharedRoutines(responseJson.body.data)

            } else {
                setPageLoader(false)
                setNoData(false)
                console.log('my new page in the else condition--->>', newpage);
                setMyGroupList((sharedRoutines) => [...sharedRoutines, ...responseJson.body.data]);
                setPage(newpage)
                console.log('i have reachedd to the point');
            }
        } else {
            setPageLoader(false)
            setPageLoader(false)
            setNoData(true)
            setMyGroupList([])
            setalert_sms(err)
            setMy_Alert(true)
        }
    }


    // function for search all community data on api call
    const searchSharedRoutine = async text => {
        setPageLoader(true)
        // RoutineService.getSearchSharedRoutines(text)
        //     .then(response => {
        //         if (response.data.allroutines.length > 0) {
        //             setNoData(false)
        //             setSharedRoutines(response.data.allroutines)
        //             setPageLoader(false)
        //         } else {
        //             setSharedRoutines(response.data.allroutines)
        //             setPageLoader(false)
        //             setNoData(true)
        //         }
        //     })
        //     .catch(error => {
        //         setPageLoader(false)
        //         console.log("error", error)
        //     })
        let url = shared_routinelisting
        let murl = '?search=' + text
        if (murl != undefined) {
            url = url + murl
        }
        console.log('my shatred search-------->>>>>', url)
        const { responseJson, err } = await requestGetApi(url, '', 'GET', User.token)
        // 
        console.log('response of shared routine---->>>', responseJson.headers.success)
        // setMyGroupList(responseJson.body)
        if (responseJson.headers.success == 1) {
            if (responseJson.body > 0) {
                console.log('my dtaatttt rwacged');
                setNoData(false)
                setSharedRoutines(responseJson.body)
                setPageLoader(false)
            } else {
                setSharedRoutines(responseJson.body)
                setPageLoader(false)
                setNoData(true)
            }
        } else {

            setalert_sms(err)
            setMy_Alert(true)
        }
    }

    // list for shared routine tab
    const renderShareRoutineItem = ({ item }) => {
        return <PublishedRoutinesTab item={item} onTabClick={handleOnTabClick} />
    }

    // navigation on routine details on tab click
    const handleOnTabClick = routineId => {
        navigation.navigate(
            "SharedRoutineDetails",
            { id: routineId, screen: "SHAREDROUTINE" }
        )
    }
    const handleLoadMore = async () => {
        console.log('is homePAge2 is called', lastPage);
        console.log('my last page---->>', lastPage, page);
        if (page < lastPage) {
            console.log('page of my startup page', page < lastPage);
            await getData('', true);
            console.log('Categories function completed. Updated state:', lastPage, page);
            // Continue with any additional logic after the async operation
        } else {
            console.log('Reached last page in share modL');
            return
            // Handle the case where you've reached the last page
            // You can display a message or perform other actions here if needed
        }
    };


    return (
        <View style={styles.container}>
            {/* header section */}
            <CustomHeader
                headerText={"Shared Routines"}
                backButton={{
                    visible: true,
                    onClick: () => {
                        navigation.navigate("Home")
                    }
                }}
            />

            {/* body section */}
            <View style={styles.body}>
                <View style={styles.searchBoxContainer}>
                    <View style={styles.inputContainer}>
                        <TextInput
                            placeholder="Search routine by name"
                            placeholderTextColor={Mycolors.textGray}
                            style={styles.searchInput}
                            value={searchText}
                            onChangeText={text => {
                                setSearchText(text)
                                getData(text)
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

                {/* shared routing list  */}
                {!pageLoader ? (
                    sharedRoutines?.length > 0 ? (
                        <View style={{ height: "90%" }}>
                            <FlatList
                                data={sharedRoutines}
                                ref={scrollRef}
                                showsHorizontalScrollIndicator={true}
                                onEndReachedThreshold={0.9}
                                onEndReached={
                                    handleLoadMore
                                }
                                renderItem={renderShareRoutineItem}
                                keyExtractor={(item, index) => String(index)}
                            />
                        </View>
                    ) : (
                        <View style={styles.noDataContainer}>
                            {!noData ? (
                                <Text style={styles.noDataText}>No Routines Shared Yet.</Text>
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
            </View>
        </View>
    )
}

export default SharedRoutines

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    body: {
        padding: 10
    },
    image: {
        borderRadius: 50,
        height: "100%",
        width: "100%"
    },
    morningRoutineContainer: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "flex-end",
        marginVertical: 5,
        padding: 5
    },
    createRoutineContainer: {
        alignItems: "center",
        flexDirection: "row"
    },
    createRoutineIcon: {
        backgroundColor: Mycolors.THEME_ORANGE,
        borderRadius: 50,
        height: 20,
        padding: 5,
        width: 20
    },
    createRoutineText: {
        color: Mycolors.THEME_ORANGE,
        fontSize: 14,
        paddingLeft: 5
    },
    searchBoxContainer: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    inputContainer: {
        borderRadius: 8,
        width: "83%"
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
    noDataContainer: {
        alignItems: "center",
        height: "90%",
        justifyContent: "center"
    },
    noDataText: {
        color: Mycolors.THEME_BLACK,
        fontSize: 20,
        fontWeight: "500",
        textAlign: "center"
    },
    loaderContainer: {
        alignSelf: "center",
        flex: 1,
        justifyContent: "center",
        marginTop: 150
    }
})
