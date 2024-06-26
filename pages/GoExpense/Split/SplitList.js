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
import React, { useEffect, useRef, useState } from "react"
//internal imports
import CustomHeader from "../Constants/CustomHeader"
import SplitListTab from "./SplitListTab"
// import SplitService from "../../../service/SplitService"
import { Mycolors } from "../../../utility/Mycolors"
// get_splitBill
import { requestGetApi, get_splitBill } from "../../../WebApi/Service"
import { useSelector, useDispatch } from 'react-redux';


const SplitList = ({ navigation, route }) => {
    const User = useSelector(state => state.user.user_details)
    const [noData, setNoData] = useState(false)
    const scrollRef = useRef();
    const [pageLoader, setPageLoader] = useState(false)
    const [searchText, setSearchText] = useState("")
    const [splitBillList, setSplitBillList] = useState([])
    const [splitGroupId, setSplitGroupId] = useState(route?.params?.data)
    const [totalAmount, setTotalAmount] = useState("0")
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            setSplitGroupId(route?.params?.data)
            getData('')
        })
        return unsubscribe
    }, [navigation])

    // function for get all split bill data on api call
    const getData = async (text, getnwPage = false) => {
        // const data = {
        //     groupid: splitGroupId
        // }
        const newpage = getnwPage ? page + 1 : 1;

        var url = get_splitBill
        var murl = `?groupid=` + splitGroupId
        var ru = `&page=${newpage}&limit=10`
        url = url + murl + ru
        var search = `&search=` + text
        if (search != undefined) {
            url = url + search
        }
        setPageLoader(true)
        const { responseJson, err } = await requestGetApi(url, '', 'GET', User.token)
        console.log('my web get split detail details---->>', responseJson.headers.success == 1
        )
        if (responseJson.headers.success == 1) {
            setPageLoader(false)
            setTotalAmount(responseJson.body.data.totalamount)

            if (!getnwPage) {
                console.log('my last page--->>>', responseJson.body.data)
                setPageLoader(false)
                setNoData(false)
                setSplitBillList(responseJson.body.data.splitexpenses)
                setLastPage(responseJson.body.lastPage);

            } else {
                console.log('my data has arrived here');
                setPageLoader(false)
                setNoData(false)
                setSplitBillList((splitBillList) => [...splitBillList, responseJson?.body?.data?.splitexpenses]);
                console.log('i have reachedd to the point');
                setPage(newpage);
            }


        }
        else {
            setPageLoader(false)
            setNoData(true)
            setSplitBillList([])
        }
    }

    // function for search all split bill data on api call
    const getAllSearchSplit = text => {
        setPageLoader(true)
        const data = {
            groupid: splitGroupId,
            search: text
        }
        SplitService.postSearchSplitBillList(data)
            .then(response => {
                setPageLoader(false)
                if (response?.data?.splitexpenses?.length > 0) {
                    setPageLoader(false)
                    setNoData(false)
                    setSplitBillList(response.data.splitexpenses)
                } else {
                    setPageLoader(false)
                    setNoData(true)
                    setSplitBillList(response.data.splitexpenses)
                }
            })
            .catch(error => {
                setPageLoader(false)
                console.log("error", error)
            })
    }

    // list for split bill
    const renderAddedSplitList = ({ item }) => {
        return <SplitListTab items={item} />
    }

    return (
        <View style={styles.container}>
            {/* header section */}
            <CustomHeader
                headerText={"Split List"}
                backButton={{
                    visible: true,
                    onClick: () => {
                        navigation.navigate(
                            "SplitDetail",
                            {
                                data: splitGroupId
                            }
                        )
                    }
                }}
            />

            {/* body section */}
            <View style={styles.body}>
                <View style={styles.spendContainer}>
                    <Text style={styles.spendText}>Total Amount</Text>
                    <Text style={styles.spendAmountText}>${totalAmount}</Text>
                    <View style={styles.backgroundImageContainer}>
                        <Image
                            resizeMode="contain"
                            style={styles.image}
                            source={require("../../../assets/Remindably/CurrencyCircleDollar.png")}
                        />
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
                    splitBillList?.length > 0 ? (
                        <View style={styles.container}>
                            <FlatList
                                data={splitBillList}
                                renderItem={renderAddedSplitList}
                                keyExtractor={(item, index) => String(index)}
                            />
                        </View>
                    ) : (
                        <View style={styles.noDataContainer}>
                            {!noData ? (
                                <Text style={styles.noDataText}>
                                    No split list added yet. {"\n"}
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
            </View>
        </View>
    )
}

export default SplitList

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    body: {
        flex: 1,
        padding: 10
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
        height: 90,
        justifyContent: "center",
        paddingHorizontal: 10,
        width: "100%"
    },
    spendText: {
        color: Mycolors.THEME_ORANGE,
        fontSize: 16,
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
        height: 110,
        position: "absolute",
        right: -18,
        width: 110,
        zIndex: 1
    },
    image: {
        height: "100%",
        width: "100%"
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
