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
import React, { useEffect, useState, useRef } from "react"
import { useIsFocused } from "@react-navigation/native";
//internal imports
// import CustomHeader from "../../constants/CustomHeader"
import CustomHeader from "../../Constants/CustomHeaader"
import PublishedRoutinesTab from "../community/PublishedRoutinesTab"
// import RoutineService from "../../service/RoutineService"
// getRoutines
import { requestGetApi, get_memberList, add_members, invite_user, requestPostApi, request_list, home_details, home_detailTask, taskHideUnhide, getRoutines } from '../../../../WebApi/Service'
import { useSelector, useDispatch } from 'react-redux';
import { Mycolors } from "../../../../utility/Mycolors"
const Routine = ({ navigation }) => {
    const scrollViewRef = useRef();
    const scrollRef = useRef();

    const isFocus = useIsFocused()
    const [myRoutines, setMyRoutines] = useState([])
    const [noData, setNoData] = useState(false)
    const [page, setPage] = useState(1);
    const [pageLoader, setPageLoader] = useState(false)
    const [searchText, setSearchText] = useState("")
    const [lastPage, setLastPage] = useState(1);
    const User = useSelector(state => state.user.user_details)
    // function for open side menu
    const handleOpenDrawer = () => {
        navigation.openDrawer()
    }


    useEffect(() => {

        const unsubscribe = navigation.addListener("focus", () => {

            // setSearchText("")
            // setPageLoader(true)
            getData('',)
        })
        return unsubscribe
    }, [isFocus])

    // function for search all my routine data on api call
    const getData = async (text, getnwPage = false) => {
        console.log('all memeneee')

        setPageLoader(true)
        const newpage = getnwPage ? page + 1 : 1;
        console.log('my new getnewpage', newpage);

        // Update the fUrl with the new page value
        var fUrl = getRoutines + `?page=${newpage}&limit=10`;
        var urls = '&search=' + text
        if (urls != undefined) {
            fUrl = fUrl + urls
        }
        const { responseJson, err } = await requestGetApi(fUrl, '', 'GET', User.token)
        // 
        console.log('my url for notes---->>>', fUrl);
        console.log('response of get routine', responseJson.body.lastPage)
        // setMyGroupList(responseJson.body)
        if (responseJson.headers.success == true) {
            // setPageLoader(false)
            // setMyRoutines(responseJson.body)
            if (!getnwPage) {
                console.log('for data 10', responseJson.body);
                setPageLoader(false)
                setNoData(false)
                setMyRoutines(responseJson.body.data)
                setLastPage(responseJson.body.lastPage);
            } else {
                setPageLoader(false)
                setNoData(false)
                console.log('my new page in the else condition--->>', responseJson?.body?.data.length);
                setMyRoutines((myRoutines) => [...myRoutines, ...responseJson?.body?.data]);
                setPage(newpage)
                console.log('i have reachedd to the point');
            }
        } else {
            setPageLoader(false)
            setNoData(true)
            setMyRoutines([])
            setalert_sms(err)
            setMy_Alert(true)
        }
    }
    const renderRoutineItem = ({ item }) => {
        console.log('my renderRoutineItem', item)
        return <PublishedRoutinesTab item={item} onTabClick={handleOnTabClick} />
    }

    // navigation on routine details on tab click
    const handleOnTabClick = communityId => {
        console.log('my tab clik', communityId)
        navigation.navigate(
            "RoutineDetails",
            { id: communityId, screen: "ROUTINE" }
        )
        // navigation.navigate("RoutineDetails"
        // )
    }
    //     const handleLoadMore = () => {

    //         // console.log('handel more caledd???????');
    //         getData(true)
    //         if (page < lastPage) {
    //             console.log('page of my startup page', page, lastPage);
    //             // Call HomePage2 only if page is less than or equal to lastPage
    //             HomePage2(true, selectedCategory);
    //         } else {
    //             console.log('Reached last page');
    //             // Handle the case where you've reached the last page
    //             // You can display a message or perform other actions here if needed
    //         }
    //     } else {
    //         console.log('homepage 1 is called');
    //     // No category selected, call HomePage(true)
    //     HomePage(false, true);
    // }
    //      };
    const handleLoadMore = () => {
        console.log('my page for routines', page, lastPage);
        console.log('is homePAge2 is called', page < lastPage);

        if (page < lastPage) {
            console.log('page of my startup page', page, lastPage);
            // Call HomePage2 only if page is less than or equal to lastPage
            getData('', true);
        } else {
            console.log('Reached last page');
            true
            // Handle the case where you've reached the last page
            // You can display a message or perform other actions here if needed

        }
    };

    return (
        <View style={styles.container}>
            {/* header section */}
            <CustomHeader
                headerText={"Routines"}
                drawerButton={{
                    visible: true,
                    onClick: () => {
                        handleOpenDrawer()
                    }
                }}
                bellButton={{
                    visible: true,
                    onClick: () => {
                        navigation.navigate("StackNavigation", {
                            screen: "Notifications"
                        })
                    }
                }}
            />

            {/* body section */}
            <View style={styles.body}>
                {/* routines tabs  */}
                <View style={styles.createRoutineContainer}>
                    <View style={styles.routineBox}>
                        <View style={styles.textContainer}>
                            <Text style={styles.textStyle}>Create New Routine</Text>
                            <TouchableOpacity
                                style={{ width: 35 }}
                                onPress={() => {
                                    navigation.navigate("CreateRoutine"
                                    )
                                }}
                            >
                                <Image
                                    resizeMode="contain"
                                    source={require("../../../../assets/Remindably/ArrowCircleRight.png")}
                                // ../../assets/pngImage/ArrowCircleRight.png


                                />
                            </TouchableOpacity>
                        </View>

                        <View>
                            <Image
                                style={styles.image}
                                resizeMode="contain"
                                source={require("../../../../assets/Remindably/lifestyle.png")}
                            />
                            <Image
                                style={styles.image}
                                resizeMode="contain"
                                source={require("../../../../assets/Remindably/Group.png")}
                            />
                        </View>
                    </View>

                    <View style={styles.routineBox}>
                        <View style={styles.textContainer}>
                            <Text style={styles.textStyle}>Shared Routines</Text>
                            <TouchableOpacity
                                style={{ width: 35 }}
                                onPress={() => {
                                    navigation.navigate(
                                        "SharedRoutines"
                                    )
                                }}
                            >
                                <Image
                                    resizeMode="contain"
                                    source={require("../../../../assets/Remindably/ArrowCircleRight.png")}
                                />
                            </TouchableOpacity>
                        </View>

                        <View>
                            <Image
                                style={styles.image}
                                resizeMode="contain"
                                source={require("../../../../assets/Remindably/share.png")}
                            />
                            <Image
                                style={styles.image}
                                resizeMode="contain"
                                source={require("../../../../assets/Remindably/ShareNetwork.png")}
                            />
                        </View>
                    </View>
                </View>

                {/* search box */}
                <Text style={styles.routineHeading}>My Routine</Text>
                <View style={styles.searchBoxContainer}>
                    <View style={styles.inputContainer}>
                        <TextInput
                            placeholder="Search routine by title"
                            placeholderTextColor={Mycolors.textGray}
                            style={styles.searchInput}
                            value={searchText}
                            onChangeText={text => {
                                setSearchText(text)
                                getData(text)
                                // getSearchMyRoutines(text)
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

                {/* My routines start  */
                }
                {console.log('my routnes------>>>>', myRoutines)}
                {!pageLoader ? (

                    myRoutines?.length > 0 ? (
                        <View style={styles.displayRoutines}>
                            <FlatList
                                //my pagaination data
                                ref={scrollRef}
                                showsHorizontalScrollIndicator={true}
                                onEndReachedThreshold={0.9}
                                onEndReached={
                                    handleLoadMore
                                }
                                data={myRoutines}
                                renderItem={renderRoutineItem}
                                keyExtractor={(item, index) => String(index)}
                            />
                        </View>
                    ) : (
                        <View style={styles.noDataContainer}>
                            {!noData ? (
                                <Text style={styles.noDataText}>
                                    No Routine created yet. {"\n"}Click on the "Create New
                                    Routine" to create a Routine.
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
            </View>
        </View>
    )
}

export default Routine

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    body: {
        padding: 10
    },
    searchBoxContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10
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
    createRoutineContainer: {
        alignItems: "center",
        flexDirection: "row",
        height: 120,
        justifyContent: "space-between",
        paddingHorizontal: 10
    },
    routineHeading: {
        color: Mycolors.BLACK,
        fontSize: 18,
        fontWeight: "bold",
        padding: 10
    },
    routineBox: {
        backgroundColor: Mycolors.WHITE,
        borderRadius: 30,
        flexDirection: "row",
        height: 110,
        padding: 10,
        width: "48%"
    },
    textContainer: {
        height: 100,
        marginRight: 2,
        right: 0,
        width: "60%"
    },
    textStyle: {
        color: Mycolors.BLACK,
        fontSize: 16,
        fontWeight: "bold",
        height: 60
    },
    image: { height: 60, width: 60 },
    displayRoutines: {
        height: "60%",
        paddingVertical: 10
    },
    loaderContainer: {
        alignSelf: "center",
        flex: 1,
        justifyContent: "center",
        marginTop: 100
    },
    noDataContainer: {
        alignItems: "center",
        height: "60%",
        justifyContent: "center"
    },
    noDataText: {
        color: Mycolors.THEME_BLACK,
        fontSize: 20,
        fontWeight: "500",
        textAlign: "center"
    }
})
