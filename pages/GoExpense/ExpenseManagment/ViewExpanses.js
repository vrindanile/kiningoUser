//external imports
import {
    ActivityIndicator,
    FlatList,
    Image,
    StyleSheet,
    Text,
    View
} from "react-native"
import React, { useEffect, useRef, useState } from "react"
//internal imports
import AllExpensesTab from "./AllExpensesTab"
// import CommonToast from "../../constants/CommonToast"
import CustomHeader from "../Constants/CustomHeader"
import DeleteAlertModal from "./DeleteAlertModal"
// import ExpensesManagementService from "../../service/ExpensesManagementService"
import Toast from 'react-native-toast-message'
import { Mycolors } from "../../../utility/Mycolors"
import { requestGetApi, requestPostApi, add_expenses, requestPostApiImages, get_expenses, delte_expense } from '../../../WebApi/Service'
import { useSelector, useDispatch } from 'react-redux';
// get_expenses
const ViewExpanses = ({ navigation, route }) => {
    const scrollRef = useRef();
    const User = useSelector(state => state.user.user_details)
    const [allExpensesList, setAllExpensesList] = useState([])
    const [deleteModal, setDeleteModal] = useState(false)
    const [expanseId, setExpanseId] = useState(0)
    const [noData, setNoData] = useState(false)
    const [pageLoader, setPageLoader] = useState(false)
    const [spendAmount, setSpendAmount] = useState("")
    const [totalAmount, setTotalAmount] = useState("")
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const toastRef = useRef()

    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            // setPageLoader(true)
            getData()
            console.log('my suncagtegory iddd--->>', route?.params?.data);
            setLastPage(1)
            setPage(1)
        })
        return unsubscribe
    }, [navigation])

    // function for get all expense data on api call with search and filter
    const getData = async (getnwPage = false) => {
        //    set PageLoader(true)
        const newpage = getnwPage ? page + 1 : 1;
        console.log('my new page of --->>', newpage);
        var url = get_expenses
        var murl = `?user_budgetary_id=` + route?.params?.data?.budgetaryid
        var category = `&categoryid=` + route?.params?.data?.subcategoryid

        var page = `&page=${newpage}&limit=4`
        if (murl != undefined) {
            url = url + murl + category + page
        }
        setPageLoader(true)
        const { responseJson, err } = await requestGetApi(url, '', 'GET', User.token)
        console.log('i need to get all expenses---->>>', responseJson.body.data.expenses
        );
        if (responseJson.headers.success === 1) {
            setTotalAmount(responseJson.body.data.totalamount)
            setSpendAmount(responseJson.body.data.spendamount)

            // onSubmitClick(responseJson.body.categoryid)
            if (!getnwPage) {
                console.log('my last page--->>>', responseJson.body.data)
                setPageLoader(false)
                setNoData(false)
                setAllExpensesList(responseJson.body.data.expenses)

                setLastPage(responseJson.body.lastPage);

            } else {
                setPageLoader(false)
                setNoData(false)
                setAllExpensesList((allExpensesList) => [...allExpensesList, ...responseJson.body.data.expenses]);
                console.log('i have reachedd to the point');
                setPage(newpage);
            }
        }
        else {
            setPageLoader(false)
            console.log("error",)
        }
        // ExpensesManagementService.postSearchAllUserExpenses(filterData)
        //     .then(response => {
        //         if (response.data.expenses.length > 0) {
        //             setPageLoader(false)
        //             setNoData(false)
        //             setAllExpensesList(response.data.expenses)
        //             setTotalAmount(response.data.totalamount)
        //             setSpendAmount(response.data.spendamount)
        //         } else {
        //             setPageLoader(false)
        //             setAllExpensesList(response.data.expenses)
        //         }
        //     })
        //     .catch(error => {
        //         setPageLoader(false)
        //         console.log("error", error)
        //     })
    }

    // list for all expense
    const renderGroupsItems = ({ item }) => {
        return (
            <AllExpensesTab
                items={item}
                onEditClick={handleEditClick}
                onDeleteClick={handleDeleteClick}
            />
        )
    }

    // navigation on edit expense click
    const handleEditClick = data => {
        navigation.navigate(
            "EditExpanse",
            {
                data: data
            }
        )
    }

    // function for open modal on delete icon click
    const handleDeleteClick = id => {
        setDeleteModal(true)
        setExpanseId(id)
    }

    // function for delete button click on api call to delete budgetary
    const handleDelete = async () => {
        setDeleteModal(false)
        setPageLoader(true)
        const { responseJson, err } = await requestPostApi(delte_expense + expanseId, '', 'DELETE', User.token)
        console.log('i need to delete the expanse---->>>', responseJson
        );
        if (responseJson.headers.success == 1) {
            setPageLoader(false)
            Toast.show({ text1: responseJson.headers.message });
            getData()
        } else {
            setPageLoader(false)

        }
        // ExpensesManagementService.getDeleteExpanse(expanseId)
        //     .then(response => {
        //         toastRef.current.getToast(response.data.message, "success")
        //         getData()
        //     })
        //     .catch(error => {
        //         console.log(error)
        //     })
    }


    const handleLoadMore = async () => {
        console.log('my handelload more function in the expanse---->>>>', page < lastPage);
        console.log('is homePAge2 is called', lastPage, page);
        console.log('my last page---->>', lastPage, page);
        if (page < lastPage) {
            console.log('page of my startup page');
            await getData(true);
            console.log('Categories function completed. Updated state:', lastPage, page);
            // Continue with any additional logic after the async operation
        } else {
            console.log('does it comes to else condition')
            await getData(false)
            console.log('Reached last page');

            // Handle the case where you've reached the last page
            // You can display a message or perform other actions here if needed
        }
    };


    return (
        <View style={styles.container}>
            {/* header section */}
            <CustomHeader
                headerText={"Expenses List"}
                backButton={{
                    visible: true,
                    onClick: () => {
                        navigation.goBack()
                    }
                }}
            />

            {/* body section */}
            {!pageLoader ? (
                allExpensesList?.length > 0 ? (
                    <View style={styles.body}>
                        {/* spend and total amount section  */}
                        <View style={styles.textDirection}>
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

                            <View style={styles.spendContainer}>
                                <Text style={styles.spendText}>Spend Amount</Text>
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

                        {/* my groups list  */}
                        <View style={{ height: "80%" }}>
                            <FlatList
                                // ref={scrollRef}
                                // showsHorizontalScrollIndicator={true}
                                // onEndReachedThreshold={0.9}
                                // onEndReached={
                                //     handleLoadMore
                                // }
                                data={allExpensesList}
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
                            <Text style={styles.noDataText}>No Expenses added yet.</Text>
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

            {/* Delete alert modal for delete task */}
            <DeleteAlertModal
                visibleModal={deleteModal}
                onRequestClosed={() => {
                    setDeleteModal(false)
                }}
                onPressRightButton={() => {
                    handleDelete()
                }}
                subHeading={"Are you sure you want to delete this expense ?"}
            />

            {/* toaster message for error response from API  */}
            {/* <CommonToast ref={toastRef} /> */}
        </View>
    )
}

export default ViewExpanses

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    body: {
        padding: 10
    },
    textDirection: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    spendContainer: {
        backgroundColor: Mycolors.WHITE,
        borderRadius: 15,
        height: 70,
        marginVertical: 10,
        padding: 5,
        width: "48%"
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
