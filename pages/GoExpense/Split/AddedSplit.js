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
// internal imports
import AddSplitButton from "./AddSplitButton"
import AddedSplitTab from "./AddedSplitTab"
// import CommonToast from "../../../constants/CommonToast"
// import CustomHeader from "../../../constants/CustomHeader"
import CustomHeader from "../Constants/CustomHeader"
import { requestGetApi, get_splitGroup } from "../../../WebApi/Service"
import { useSelector, useDispatch } from 'react-redux';
import { Mycolors } from "../../../utility/Mycolors"
// get_splitGroup

const AddedSplit = ({ navigation }) => {
    const User = useSelector(state => state.user.user_details)
    const scrollRef = useRef();
    const [noData, setNoData] = useState(false)
    const [pageLoader, setPageLoader] = useState(false)
    const [searchText, setSearchText] = useState("")
    const [spendAmount, setSpendAmount] = useState("0")
    const [splitList, setSplitList] = useState([])
    const [totalAmount, setTotalAmount] = useState("0")
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const toastRef = useRef()

    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            getData('')
        })
        return unsubscribe
    }, [navigation])

    // function for get all split group data on api call
    const getData = async (text, getnwPage = false) => {
        const newpage = getnwPage ? page + 1 : 1;
        console.log('my new getnewpage', newpage);
        console.log('is get data caleedddd----->', get_splitGroup);
        var fUrl = get_splitGroup + `?page=${newpage}&limit=10`;
        var murl = `&name=` + text
        if (murl != undefined) {
            fUrl = fUrl + murl
        }
        setPageLoader(true)
        const { responseJson, err } = await requestGetApi(fUrl, '', 'GET', User.token)
        if (responseJson.headers.success == 1) {
            setPageLoader(false)
            setTotalAmount(responseJson.body.data.totalamount)
            setSpendAmount(responseJson.body.data.spendamount)
            if (!getnwPage) {
                console.log('my last page--->>>', responseJson.body.data)
                setPageLoader(false)
                setNoData(false)
                setSplitList(responseJson.body.data.mygroups)
                setLastPage(responseJson.body.lastPage);

            } else {
                console.log('my data has arrived here');
                setPageLoader(false)
                setNoData(false)
                setSplitList((splitList) => [...splitList, ...responseJson.body.data.mygroups]);
                console.log('i have reachedd to the point');
                setPage(newpage);

            }
        } else {
            setPageLoader(false)
            setNoData(true)
            setSplitList([])

        }
    }

    // function for search all split group data on api call
    const getAllSearchSplit = text => {
        setPageLoader(true)
        const data = {
            search: text
        }
        // SplitService.postSearchSplitGroupList(data)
        //     .then(response => {
        //         setPageLoader(false)
        //         if (response.data.mygroups.length > 0) {
        //             setPageLoader(false)
        //             setNoData(false)
        //             setSplitList(response.data.mygroups)
        //         } else {
        //             setPageLoader(false)
        //             setNoData(true)
        //             setSplitList(response.data.mygroups)
        //         }
        //     })
        //     .catch(error => {
        //         setPageLoader(false)
        //         console.log("error", error)
        //     })
    }

    // list for added split
    const renderAddedBudgetary = ({ item }) => {
        return <AddedSplitTab items={item} onViewClick={handleViewDetailsClick} />
    }

    // navigation for split details page on view click
    const handleViewDetailsClick = id => {
        navigation.navigate(
            "SplitDetail",
            {
                data: id
            }
        )
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
    return (
        <View style={styles.container}>
            {/* header section */}
            <CustomHeader
                headerText={"Added Split"}
                backButton={{
                    visible: true,
                    onClick: () => {
                        navigation.goBack()
                    }
                }}
            />

            {/* body section */}
            <View style={styles.body}>
                {/* spend and total amount section  */}
                <View style={styles.textDirection}>
                    <View style={styles.spendContainer}>
                        <Text style={styles.spendText}>Spend Amount</Text>
                        <Text style={styles.spendAmountText}>${totalAmount}</Text>
                        <View style={styles.backgroundImageContainer}>
                            <Image
                                resizeMode="contain"
                                style={styles.image}
                                source={require("../../../assets/Remindably/CurrencyCircleDollar.png")}
                            />
                        </View>
                    </View>

                    <View style={styles.spendContainer}>
                        <Text style={styles.spendText}>Amount to be collected</Text>
                        <Text style={styles.spendAmountText}>${spendAmount}</Text>
                        <View style={styles.backgroundImageContainer}>
                            <Image
                                resizeMode="contain"
                                style={styles.image}
                                source={require("../../../assets/Remindably/CurrencyCircleDollar.png")}
                            />
                        </View>
                    </View>
                </View>

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
                                getData(text,)
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
                                ref={scrollRef}
                                showsHorizontalScrollIndicator={true}
                                onEndReachedThreshold={0.9}
                                onEndReached={
                                    handleLoadMore
                                }
                                data={splitList}
                                renderItem={renderAddedBudgetary}
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

                {/* create notes icon  */}
                <View style={styles.createIconContainer}>
                    <AddSplitButton navigation={navigation} />
                </View>

                {/* toaster message for error response from API  */}
                {/* <CommonToast ref={toastRef} /> */}
            </View>
        </View>
    )
}

export default AddedSplit

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    body: {
        flex: 1,
        padding: 10
    },
    textDirection: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 3
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
    spendContainer: {
        backgroundColor: Mycolors.WHITE,
        borderRadius: 15,
        height: "auto",
        padding: 5,
        width: "48%"
    },
    spendText: {
        color: Mycolors.THEME_ORANGE,
        fontSize: 14,
        fontWeight: "400",
        padding: 5,
        zIndex: 2
    },
    spendAmountText: {
        color: Mycolors.THEME_BLACK,
        fontSize: 18,
        fontWeight: "500",
        paddingHorizontal: 5
    },
    backgroundImageContainer: {
        borderRadius: 50,
        bottom: -18,
        height: 80,
        position: "absolute",
        right: -18,
        width: 80,
        zIndex: 1
    },
    image: {
        height: "100%",
        width: "100%"
    },
    createIconContainer: {
        bottom: 30,
        position: "absolute",
        right: 40,
        zIndex: 1
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
