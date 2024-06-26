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
import React, { useEffect, useRef, useState } from "react"
import Toast from 'react-native-toast-message'
import moment from "moment"
//internal imports
import { requestGetApi, requestPostApi, add_expenses, requestPostApiImages, get_expenses, delte_expense } from '../../../WebApi/Service'
import { useSelector, useDispatch } from 'react-redux';
import AllExpensesTab from "./AllExpensesTab"
// import CommonToast from "../pages/GoSchedule/Constants/CommonToast"
import CustomHeader from "../Constants/CustomHeader"
import DeleteAlertModal from "./DeleteAlertModal"
// import ExpensesManagementService from "../../service/ExpensesManagementService"
import FilterExpensesModal from "./FilterExpensesModal"
import { Mycolors } from "../../../utility/Mycolors"

const AllExpenses = ({ navigation }) => {
    const User = useSelector(state => state.user.user_details)
    const [allExpensesList, setAllExpensesList] = useState([])
    const [deleteModal, setDeleteModal] = useState(false)
    const [expanseId, setExpanseId] = useState(0)
    const [filterExpensesModal, setFilterExpensesModal] = useState(false)
    const [noData, setNoData] = useState(false)
    const [pageLoader, setPageLoader] = useState(false)
    const [searchText, setSearchText] = useState("")
    const [dot, setDot] = useState(false)
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const toastRef = useRef()
    const scrollRef = useRef();
    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            setSearchText("")
            // setPageLoader(true)
            getData('', '', '')
        })
        return unsubscribe
    }, [navigation])

    // function for get all expense data on api call
    const getData = async (selectedId, selectDate, text, getnwPage = false) => {
        console.log('my selected id---->>>>', selectedId,);
        setFilterExpensesModal(false);

        let date = '';
        if (selectDate !== '') {
            date = moment(selectDate).format("YYYY-MM-DD");
        }

        console.log('my uri for the epanse');
        setPageLoader(true);

        const newpage = getnwPage ? page + 1 : 1;
        var fUrl = get_expenses + `?page=${newpage}&limit=10`;

        if (text) {
            fUrl += '&searchtitle=' + text;

        }

        if (date) {
            fUrl += '&date=' + date;
            setDot(true)
        }

        if (selectedId) {
            fUrl += '&categoryid=' + selectedId;
            setDot(true)
        }

        const { responseJson, err } = await requestGetApi(fUrl, '', 'GET', User.token);
        console.log('all expanse categoryy---->>>>', responseJson.headers.success);
        if (responseJson.headers.success === 1) { // Adjust this line based on your API response structure
            if (!getnwPage) {
                console.log('my last page--->>>', responseJson.body.data.expenses, getnwPage);
                setPageLoader(false);
                setNoData(false);
                setAllExpensesList(responseJson.body.data.expenses);
                setLastPage(responseJson.body.lastPage);
            } else {
                setPageLoader(false);
                setNoData(false);
                setAllExpensesList((allExpensesList) => [...allExpensesList, ...responseJson.body.data.expenses]);
                console.log('i have reachedd to the point');
                setPage(newpage);
            }
        } else {
            setPageLoader(false);
            setNoData(false)
        }
    };


    const handleLoadMore = async () => {
        console.log('is homePAge2 is called', lastPage);
        console.log('my last page---->>', lastPage, page);
        if (page < lastPage) {
            console.log('page of my startup page');
            await getData('', '', '', true);
            console.log('Categories function completed. Updated state:', lastPage, page);
            // Continue with any additional logic after the async operation
        } else {
            console.log('Reached last page');

            // Handle the case where you've reached the last page
            // You can display a message or perform other actions here if needed
        }
    };

    // function for search all expense data on api call
    const getAllSearchExpenses = text => {
        setPageLoader(true)
        const data = {
            searchtitle: text
        }
        // ExpensesManagementService.postSearchAllUserExpenses(data)
        //     .then(response => {
        //         setPageLoader(false)
        //         if (response.data.expenses.length > 0) {
        //             setPageLoader(false)
        //             setNoData(false)
        //             setAllExpensesList(response.data.expenses)
        //         } else {
        //             setPageLoader(false)
        //             setNoData(true)
        //             setAllExpensesList(response.data.expenses)
        //         }
        //     })
        //     .catch(error => {
        //         setPageLoader(false)
        //         console.log("error", error)
        //     })
    }

    // function for filter all expense data on api call
    const handleFilterCommunityApplyClick = (selectedId, selectDate) => {
        let date = moment(selectDate).format("YYYY-MM-DD")
        const filterData = {
            categoryid: selectedId,
            date: date
        }
        setFilterExpensesModal(false)
        setPageLoader(true)

        // ExpensesManagementService.postSearchAllUserExpenses(filterData)
        //     .then(response => {
        //         if (response.data.expenses.length > 0) {
        //             setPageLoader(false)
        //             setNoData(false)
        //             setAllExpensesList(response.data.expenses)
        //         } else {
        //             setPageLoader(false)
        //             setNoData(true)
        //             setAllExpensesList(response.data.expenses)
        //         }
        //     })
        //     .catch(error => {
        //         setPageLoader(false)
        //         console.log("error", error)
        //     })
    }

    // function on reset button click to reset the data
    const handleFilterCommunityResetClick = () => {
        getData('', '', '')
        setDot(false)
    }

    // list for all expenses
    const renderGroupsItems = ({ item }) => {

        return (
            <AllExpensesTab
                items={item}
                onEditClick={handleEditClick}
                onDeleteClick={handleDeleteClick}
            />
        )
    }

    // navigation on edit click to edit expense
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

    // function for delete button click on api call to delete the expense
    const handleDelete = async () => {
        setDeleteModal(false)
        setPageLoader(true)
        const { responseJson, err } = await requestPostApi(delte_expense + expanseId, '', 'DELETE', User.token)
        console.log('i need to delete the expanse---->>>', responseJson
        );
        if (responseJson.headers.success == 1) {
            setPageLoader(false)
            Toast.show({ text1: responseJson.headers.message });
            getData('', '', '')
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

    return (
        <View style={styles.container}>
            {/* heading section */}
            <CustomHeader
                headerText={"All Expenses"}
                backButton={{
                    visible: true,
                    onClick: () => {
                        navigation.navigate(
                            "AddedBudgetary"
                        )
                    }
                }}
            />

            {/* search box and filter*/}
            <View>
                <View style={styles.searchBoxContainer}>
                    <View style={styles.inputContainer}>
                        <TextInput
                            placeholder="Search by title"
                            placeholderTextColor={Mycolors.textGray}
                            style={styles.searchInput}
                            value={searchText}
                            onChangeText={text => {
                                setSearchText(text)
                                getData('', '', text)
                            }}
                        />
                    </View>

                    {/* <TouchableOpacity
                        style={[styles.searchContainer, { flexDirection: 'row' }]}
                        onPress={() => {
                            setFilterExpensesModal(true)
                        }}>
                        <Image
                            resizeMode="contain"
                            source={require("../../../assets/Remindably/filter.png")}
                        />
                    </TouchableOpacity> */}
                    <TouchableOpacity style={{ flexDirection: 'row', width: '70%', marginLeft: 7 }} onPress={() => {
                        setFilterExpensesModal(true)
                    }}>
                        <View style={styles.searchContainer}>
                            <Image
                                resizeMode="contain"
                                source={require("../../../assets/Remindably/filter.png")}
                            />
                        </View>
                        {dot ? <View style={{ height: 15, width: 15, backgroundColor: 'red', borderRadius: 20, position: 'absolute', top: 0, left: 26 }} /> : null}
                    </TouchableOpacity>

                </View>
            </View>

            {/* body section */}
            {!pageLoader ? (
                allExpensesList?.length > 0 ? (
                    <View style={styles.body}>
                        {/* my groups list  */}
                        <View style={{ height: "90%" }}>
                            <FlatList
                                ref={scrollRef}
                                showsHorizontalScrollIndicator={true}
                                onEndReachedThreshold={0.9}
                                onEndReached={
                                    handleLoadMore
                                }
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

            {/* Filter expense Modal modal  */}
            <FilterExpensesModal
                visibleModal={filterExpensesModal}
                onClose={() => {
                    setFilterExpensesModal(false)
                }}
                onSubmitClick={getData}
                onResetClick={handleFilterCommunityResetClick}
            />

            {/* Delete alert modal for delete expense */}
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

export default AllExpenses

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
        width: "14%",
        height: 40, marginVertical: 4
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
