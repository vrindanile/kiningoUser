// external imports
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
import React, { useEffect, useRef, useState } from "react"
// internal imports
import CustomHeader from "../Constants/CustomHeader"
import SettleSplitBillCompleteModal from "./SettleSplitBillCompleteModal"
import SettleSplitBillTab from "./SettleSplitBillTab"
// import SplitService from "../../../service/SplitService"
import { Mycolors } from "../../../utility/Mycolors"
// goaccounting/split-bill
import { requestGetApi, get_splitGroup, get_splitBill, settle_bill } from "../../../WebApi/Service"
import { useSelector, useDispatch } from 'react-redux';
import Toast from 'react-native-toast-message'

const SettleSplitBill = ({ navigation, route }) => {
    const User = useSelector(state => state.user.user_details)
    const scrollRef = useRef();
    const [arrayList, setArrayList] = useState([])
    const [memberList, setMemberList] = useState([])
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [noData, setNoData] = useState(false)
    const [pageLoader, setPageLoader] = useState(false)
    const [searchText, setSearchText] = useState("")
    const [selectedData, setSelectedData] = useState([])
    const [settleAmount, setSettleAmount] = useState(0)
    const [settleModal, setSettleModal] = useState(false)
    const [settleSplitBillList, setSettleSplitBillList] = useState([])
    const [splitGroupId, setSplitGroupId] = useState(route?.params?.data)
    const [totalAmount, setTotalAmount] = useState("")
    const toastRef = useRef()

    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            setSplitGroupId(route?.params?.data)
            setArrayList([])
            getData('')
        })
        return unsubscribe
    }, [navigation])

    // function for get all split bill data on api call
    // const getData = () => {
    //     const data = {
    //         groupid: splitGroupId
    //     }
    //     setPageLoader(true)
    //     // SplitService.postSettleSplitBillList(data)
    //     //     .then(response => {
    //     //         setPageLoader(false)
    //     //         setTotalAmount(response.data.totalamount)
    //     //         setSettleSplitBillList(response.data.splitexpenses)
    //     //     })
    //     //     .catch(error => {
    //     //         setPageLoader(false)
    //     //         console.log(error)
    //     //     })
    // }

    const getData = async (text, getnwPage = false) => {
        const newpage = getnwPage ? page + 1 : 1;
        setPageLoader(true)
        var url = get_splitBill
        var murl = `?groupid=` + splitGroupId
        var ru = `&page=${newpage}&limit=10`
        url = url + murl + ru
        var search = `&search=` + text
        if (search != undefined) {
            url = url + search
        }
        const { responseJson, err } = await requestGetApi(url, '', 'GET', User.token)
        if (responseJson.headers.success == 1) {
            console.log('my web details settleSplitBill---->>', responseJson)
            setPageLoader(false)

            setTotalAmount(responseJson.body.data.totalamount)
            if (!getnwPage) {
                console.log('my last page--->>>', responseJson.body.data)
                setPageLoader(false)
                setNoData(false)
                setSettleSplitBillList(responseJson?.body?.data?.splitexpenses
                )
                setLastPage(responseJson.body.lastPage);

            } else {
                console.log('my data has arrived here');
                setPageLoader(false)
                setNoData(false)
                setSettleSplitBillList((settleSplitBillList) => [...settleSplitBillList, responseJson?.body?.data?.splitexpenses]);
                console.log('i have reachedd to the point');
                setPage(newpage);
            }
        }
        else {
            setPageLoader(false)
            setNoData(true)
            setSettleSplitBillList([])
        }

        // setMonthlySplits(responseJson?.body?.monthlySplits)
        // SplitService.getSplitDetails(splitId)
        //     .then(response => {
        //         setPageLoader(false)
        //         setSplitDetails(response.data)
        //         setMonthlySplits(response?.data?.monthlysplits)
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
    // function for search all split bill data on api call
    const getAllSearchSplit = text => {
        setPageLoader(true)
        const data = {
            groupid: splitGroupId,
            search: text
        }
        // SplitService.postSearchSettleSplitBillList(data)
        //     .then(response => {
        //         setPageLoader(false)
        //         if (response.data.splitexpenses.length > 0) {
        //             setPageLoader(false)
        //             setNoData(false)
        //             setSettleSplitBillList(response.data.splitexpenses)
        //         } else {
        //             setPageLoader(false)
        //             setNoData(true)
        //             setSettleSplitBillList(response.data.splitexpenses)
        //         }
        //     })
        //     .catch(error => {
        //         setPageLoader(false)
        //         console.log("error", error)
        //     })
    }

    // list for added split bill
    const renderAddedSettleSplit = ({ item }) => {
        console.log('my settle bill split----->>>>>', item);
        return (
            <SettleSplitBillTab
                items={item}
                onSelect={handleSelect}
                selectedList={arrayList}
            />
        )
    }

    // function for select split bill on click
    const handleSelect = (selectedId, item) => {
        if (arrayList.includes(selectedId)) {
            setArrayList(arrayList.filter(ids => ids !== selectedId))
        } else {
            setArrayList([...arrayList, selectedId])
        }

        // for member list
        const objWithIdIndex = memberList.findIndex(
            obj => obj.id === selectedData.id
        )

        const index = selectedData.findIndex(e => e.id === item.id)
        if (index > -1) {
            const filter = selectedData.filter(e => e.id !== item.id)
            setSelectedData(filter)
            const FinalAmount = settleAmount - parseFloat(item.amount)
            setSettleAmount(FinalAmount)
        } else {
            setSelectedData([...selectedData, item])
            const FinalAmount = settleAmount + parseFloat(item.amount)
            setSettleAmount(FinalAmount)
        }
    }

    // function for submit button click for api call to settle split bill
    const handleSettleSplitBill = async () => {
        console.log('did i reach here or not')
        const data = new FormData()
        var url = settle_bill

        var murl = `?billid=` + arrayList.map((e, index) => {
            return e; // Return each element
        }).join(',');
        if (murl != undefined) {
            url = url + murl
        }
        console.log('my url recieb', url);
        const { responseJson, err } = await requestGetApi(url, '', 'GET', User.token)
        console.log('my data for handel split---????', responseJson);
        if (responseJson.headers.success == 1) {
            setSettleModal(false)
            Toast.show({ text1: responseJson.headers.message });
            setSettleAmount([])
            setArrayList([])
            getData(''
            )
        }


        // SplitService.postMarkSettleSplitBill(data)
        //     .then(response => {
        //         setSettleModal(false)
        //         toastRef.current.getToast(response.data.message, "success")
        //         setSettleAmount([])
        //         setArrayList([])
        //         getData()
        //     })
        //     .catch(error => {
        //         console.log(error)
        //     })
    }

    return (
        <View style={styles.container}>
            {/* header section */}
            <CustomHeader
                headerText={"Settle Split Bill"}
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
                <View style={styles.spendContainer}>
                    <View style={styles.direction}>
                        <View>
                            <Text style={styles.spendText}>Amount Due to settle</Text>
                            <Text style={styles.spendAmountText}>${totalAmount}</Text>
                        </View>

                        {arrayList?.length > 0 ? (
                            <TouchableOpacity
                                style={styles.settleContainer}
                                onPress={() => {
                                    setSettleModal(true)
                                }}
                            >
                                <Text style={styles.settleText}>Settle Bill</Text>
                            </TouchableOpacity>
                        ) : (
                            <View style={styles.settleContainerDisable}>
                                <Text style={styles.settleText}>Settle Bill</Text>
                            </View>
                        )}
                    </View>

                    <View style={styles.backgroundImageContainer}>
                        <Image
                            resizeMode="contain"
                            style={styles.image}
                            source={require("../../../assets/Remindably/CurrencyCircleDollar.png")}
                        />
                    </View>
                </View>

                {/* search field */}
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
                    settleSplitBillList?.length > 0 ? (
                        <View style={styles.container}>
                            <FlatList
                                ref={scrollRef}
                                showsHorizontalScrollIndicator={true}
                                onEndReachedThreshold={0.9}
                                onEndReached={
                                    handleLoadMore
                                }
                                data={settleSplitBillList}
                                renderItem={renderAddedSettleSplit}
                                keyExtractor={(item, index) => String(index)}
                            />
                        </View>
                    ) : (
                        <View style={styles.noDataContainer}>
                            {!noData ? (
                                <Text style={styles.noDataText}>
                                    No Split bill for settle yet.
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

            {/* modal for settle bill modal  */}
            <SettleSplitBillCompleteModal
                visibleModal={settleModal}
                onClose={() => {
                    setSettleModal(false)
                }}
                onSubmitClick={handleSettleSplitBill}
                settleAmount={settleAmount}
            />

            {/* toaster message for error response from API  */}
            {/* <CommonToast ref={toastRef} /> */}
        </View>
    )
}

export default SettleSplitBill

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    body: {
        height: "90%",
        padding: 10
    },
    direction: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 5
    },
    spendContainer: {
        backgroundColor: Mycolors.WHITE,
        borderRadius: 15,
        padding: 5,
        paddingHorizontal: 20,
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
        height: 90,
        position: "absolute",
        right: -18,
        width: 90,
        zIndex: 1
    },
    image: {
        height: "100%",
        width: "100%"
    },
    settleContainer: {
        backgroundColor: Mycolors.THEME_ORANGE,
        borderRadius: 30,
        zIndex: 2
    },
    settleText: {
        color: Mycolors.WHITE,
        fontSize: 13,
        fontWeight: "500",
        paddingHorizontal: 15,
        paddingVertical: 6
    },
    settleContainerDisable: {
        backgroundColor: Mycolors.textGray,
        borderRadius: 30,
        zIndex: 2
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
        height: "90%",
        justifyContent: "center"
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
    }
})
