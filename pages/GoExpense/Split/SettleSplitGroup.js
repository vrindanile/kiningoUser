// external imports
import {
    ActivityIndicator,
    FlatList,
    Image,
    StyleSheet,
    Text,
    TextInput,
    View
} from "react-native"
import React, { useEffect, useRef, useState } from "react"
//internal imports
import AddedSplitTab from "./AddedSplitTab"
import CustomHeader from "../Constants/CustomHeader"
import { Mycolors } from "../../../utility/Mycolors"
import { requestGetApi, get_splitGroup } from "../../../WebApi/Service"
import { useSelector, useDispatch } from 'react-redux';

const SettleSplitGroup = ({ navigation }) => {
    const User = useSelector(state => state.user.user_details)
    const scrollRef = useRef();
    const [noData, setNoData] = useState(false)
    const [pageLoader, setPageLoader] = useState(false)
    const [searchText, setSearchText] = useState("")
    const [splitList, setSplitList] = useState([])
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const toastRef = useRef()

    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            getData('')
        })
        return unsubscribe
    }, [navigation])

    // function for get all split group on api call
    const getData = async (text, getnwPage = false) => {
        const newpage = getnwPage ? page + 1 : 1;
        setPageLoader(true)
        var url = get_splitGroup
        var ru = `?page=${newpage}&limit=10`
        url = url + ru
        var search = `&name=` + text
        if (search != undefined) {
            url = url + search
        }
        const { responseJson, err } = await requestGetApi(url, '', 'GET', User.token)
        console.log('my get spit details details---->>', responseJson)
        if (responseJson?.headers?.success == 1) {

            if (!getnwPage) {
                console.log('my last page--->>>', responseJson.body.data)
                setPageLoader(false)
                setNoData(false)
                setSplitList(responseJson?.body?.data?.mygroups)
                setLastPage(responseJson.body.lastPage);

            } else {
                console.log('my data has arrived here');
                setPageLoader(false)
                setNoData(false)
                setSplitList((splitList) => [...splitList, responseJson?.body?.data?.mygroups]);
                console.log('i have reachedd to the point');
                setPage(newpage);
            }

        } else {
            setPageLoader(false)
            setNoData(true)
            setSplitList([])
            // console.log(error)
        }
        // SplitService.postSplitGroupList()
        //     .then(response => {
        //         setPageLoader(false)
        //         setSplitList(response.data.mygroups)
        //     })
        //     .catch(error => {
        //         setPageLoader(false)
        //         console.log(error)
        //     })
    }
    const handleLoadMore = async () => {
        console.log('does it come to handelloadmore')

        console.log('is homePAge2 is called', lastPage);
        console.log('my last page---->>', lastPage, page);
        if (page < lastPage) {
            console.log('page of my startup page');
            await getData('', true);
            console.log('Categories function completed. Updated state:', lastPage, page);
            // Continue with any additional logic after the async operation
        } else {
            console.log('Reached last page');

            // Handle the case where you've reached the last page
            // You can display a message or perform other actions here if needed
        }
    };
    // function for search all split group data on api call
    const getAllSearchSplit = text => {
        setPageLoader(true)
        const data = {
            search: text
        }
        SplitService.postSearchSplitGroupList(data)
            .then(response => {
                setPageLoader(false)
                if (response.data.mygroups.length > 0) {
                    setPageLoader(false)
                    setNoData(false)
                    setSplitList(response.data.mygroups)
                } else {
                    setPageLoader(false)
                    setNoData(true)
                    setSplitList(response.data.mygroups)
                }
            })
            .catch(error => {
                setPageLoader(false)
                console.log("error", error)
            })
    }

    // list for added split group
    const renderAddedSplit = ({ item }) => {
        return <AddedSplitTab items={item} onViewClick={handleViewDetailsClick} />
    }

    // navigation for settle bill on click
    const handleViewDetailsClick = id => {
        navigation.navigate(
            "SettleSplitBill",
            {
                data: id
            })

    }

    return (
        <View style={styles.container}>
            {/* header section */}
            <CustomHeader
                headerText={"Split Groups"}
                backButton={{
                    visible: true,
                    onClick: () => {
                        navigation.goBack()
                    }
                }}
            />

            {/* body section */}
            <View style={styles.body}>
                {/* search field  */}
                <View style={styles.searchBoxContainer}>
                    <View style={styles.inputContainer}>
                        <TextInput
                            placeholder="Search Split by title"
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
                            source={require("../../../assets/Remindably/searchIcon.png")}
                        />
                    </View>
                </View>

                {/* all added split section  */}
                {!pageLoader ? (
                    splitList?.length > 0 ? (
                        <View style={styles.container}>
                            <FlatList
                                showsHorizontalScrollIndicator={true}
                                onEndReachedThreshold={0.9}
                                onEndReached={
                                    handleLoadMore
                                }
                                data={splitList}
                                renderItem={renderAddedSplit}
                                keyExtractor={(item, index) => String(index)}
                            />
                        </View>
                    ) : (
                        <View style={styles.noDataContainer}>
                            {!noData ? (
                                <Text style={styles.noDataText}>
                                    No split created yet. {"\n"}Click on the "Add split" to create
                                    split.
                                </Text>
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

                {/* toaster message for error response from API  */}
                {/* <CommonToast ref={toastRef} /> */}
            </View>
        </View>
    )
}

export default SettleSplitGroup

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    body: {
        padding: 10,
        flex: 1
    },
    searchBoxContainer: {
        flexDirection: "row",
        height: 65,
        justifyContent: "space-between",
        paddingVertical: 10
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
