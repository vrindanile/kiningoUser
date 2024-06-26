//external imports
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Image,
    TextInput,
    ActivityIndicator
} from "react-native"
import React, { useEffect, useRef, useState } from "react"
//internal imports
import AddedBudgetaryTab from "./AddedBudgetaryTab"
import Toast from 'react-native-toast-message'
// import CommonToast from "../../constants/CommonToast"
import CustomHeader from "../Constants/CustomHeader"
import DeleteAlertModal from "./DeleteAlertModal"
import { requestGetApi, get_userBugetary, delete_userBugetry, requestPostApi } from '../../../WebApi/Service'
import { useSelector, useDispatch } from 'react-redux';
// import ExpensesManagementService from "../../service/ExpensesManagementService"
import { Mycolors } from "../../../utility/Mycolors"
const AddedBudgetary = ({ navigation }) => {
    const scrollRef = useRef();
    const User = useSelector(state => state.user.user_details)
    const [budgetaryData, setBudgetaryData] = useState({})
    const [budgetaryId, setBudgetaryId] = useState(0)
    const [budgetaryRestriction, setBudgetaryRestriction] = useState([])
    const [deleteModal, setDeleteModal] = useState(false)
    const [noData, setNoData] = useState(false)
    const [pageLoader, setPageLoader] = useState(false)
    const [searchText, setSearchText] = useState("")
    const [warningModal, setWarningModal] = useState(false)
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const toastRef = useRef()

    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            setPage(1)
            setLastPage(1)
            getData('')
        })
        return unsubscribe
    }, [navigation])

    // function for get all budgetary data on api call
    const getData = async (text, getnwPage = false) => {
        const newpage = getnwPage ? page + 1 : 1;
        console.log('my new getnewpage', newpage);
        // Update the fUrl with the new page value
        var fUrl = get_userBugetary + `?page=${newpage}&limit=10`;
        var murl = `&search=` + text
        if (murl != undefined) {
            fUrl = fUrl + murl
        }
        setPageLoader(true)
        const { responseJson, err } = await requestGetApi(fUrl, '', 'GET', User.token)
        console.log('my get user restriction data----->>', fUrl);
        if (responseJson.headers.success == 1) {

            if (!getnwPage) {
                console.log('my last page--->>>', responseJson.body.data)
                setPageLoader(false)
                setNoData(false)
                setBudgetaryRestriction(responseJson.body.data)
                setLastPage(responseJson.body.lastPage);

            } else {
                setPageLoader(false)
                setNoData(false)
                setBudgetaryRestriction((budgetaryRestriction) => [...budgetaryRestriction, ...responseJson.body.data]);
                console.log('i have reachedd to the point');
                setPage(newpage);
            }
        } else {
            setPageLoader(false)
            setNoData(true)
            setBudgetaryRestriction([])
            console.log('error in get user restriction budegetry data');
        }

    }

    // function for search all budgetary data on api call
    const getAllSearchBudgetary = text => {
        setPageLoader(true)
        const data = {
            search: text
        }
        ExpensesManagementService.postSearchBudgetaryRestriction(data)
            .then(response => {
                setPageLoader(false)
                if (response.data.budgetaryrestrication.length > 0) {
                    setPageLoader(false)
                    setNoData(false)
                    setBudgetaryRestriction(response.data.budgetaryrestrication)
                } else {
                    setPageLoader(false)
                    setNoData(true)
                    setBudgetaryRestriction(response.data.budgetaryrestrication)
                }
            })
            .catch(error => {
                setPageLoader(false)
                console.log("error", error)
            })
    }

    // list for pre added budgetary list
    const renderAddedBudgetary = ({ item }) => {
        return (
            <AddedBudgetaryTab
                items={item}
                addExpensesClick={handleAddExpensesClick}
                viewDetailsClick={handleViewDetailsClick}
                onEditClick={handleEditClick}
                onDeleteClick={handleDeleteClick}
            />
        )
    }

    // navigation on add expense click
    const handleAddExpensesClick = item => {
        if (item?.percentage >= 100) {
            setWarningModal(true)
            setBudgetaryData(item)
        } else {
            navigation.navigate(
                "AddExpense",
                {
                    data: item
                }
            )
        }
    }

    // navigation on view expense click
    const handleViewDetailsClick = item => {
        navigation.navigate(
            "ViewExpanses",
            {
                data: item
            }
        )
    }

    // navigation on edit budgetary click
    const handleEditClick = data => {
        console.log('my edited data---->>>', data);
        navigation.navigate(
            "EditBudgetary",
            {
                data: data
            }
        )
    }

    // open modal on delete icon click for budgetary
    const handleDeleteClick = id => {
        setDeleteModal(true)
        setBudgetaryId(id)
    }

    // function for delete button click for api call to delete the budgetary
    const handleDelete = async () => {
        setDeleteModal(false)
        const { responseJson, err } = await requestPostApi(delete_userBugetry + budgetaryId, '', 'DELETE', User.token)
        console.log('my delete category data----->>', responseJson);
        if (responseJson.headers.success == 1) {
            setPageLoader(false)
            Toast.show({ text1: responseJson.headers.message });
            getData('')
        } else {
            setPageLoader(false)

        }
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
                headerText={"Added Budgetary"}
                backButton={{
                    visible: true,
                    onClick: () => {
                        navigation.navigate(
                            "ExpenseManagement"
                        )
                    }
                }}
            />

            {/* search field  */}
            <View style={styles.searchBoxContainer}>
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="Search budgetary by title"
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

            {/* body section */}
            <View style={styles.body}>
                {/* add budgetary and all expense section  */}
                <View style={[styles.textDirection, { marginBottom: 15, marginTop: 12 }]}>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate(
                                "AddBudgetary"
                            )
                        }}
                    >
                        <Text style={styles.addEditText}>Add Budgetary</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate(
                                "AllExpenses"
                            )
                        }}
                    >
                        <Text style={styles.addEditText}>All Expenses</Text>
                    </TouchableOpacity>
                </View>

                {/* all added budgetary section  */}
                {!pageLoader ? (
                    budgetaryRestriction?.length > 0 ? (
                        <View style={styles.container}>
                            <FlatList
                                ref={scrollRef}
                                showsHorizontalScrollIndicator={true}
                                onEndReachedThreshold={0.9}
                                onEndReached={
                                    handleLoadMore
                                }
                                data={budgetaryRestriction}
                                renderItem={renderAddedBudgetary}
                                keyExtractor={(item, index) => String(index)}
                            />
                        </View>
                    ) : (
                        <View style={styles.noDataContainer}>
                            {!noData ? (
                                <Text style={styles.noDataText}>
                                    No budgetary list created yet. {"\n"}Click on the "Add
                                    Budgetary" to set budgetary.
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

                {/* Delete alert modal for delete budgetary */}
                <DeleteAlertModal
                    visibleModal={deleteModal}
                    onRequestClosed={() => {
                        setDeleteModal(false)
                    }}
                    onPressRightButton={() => {
                        handleDelete()
                    }}
                    subHeading={"Are you sure you want to delete this budgetary ?"}
                />

                {/* Delete alert modal for limit cross alert*/}
                <DeleteAlertModal
                    visibleModal={warningModal}
                    onRequestClosed={() => {
                        setWarningModal(false)
                    }}
                    onPressRightButton={() => {
                        setWarningModal(false)
                        navigation.navigate("AddExpense",
                            {
                                data: budgetaryData
                            }
                        )
                    }}
                    subHeading={
                        "You have exceed the budgetary limit. Are you sure you want add expense ?"
                    }
                />

                {/* toaster message for error response from API  */}
                {/* <CommonToast ref={toastRef} /> */}
            </View>
        </View>
    )
}

export default AddedBudgetary

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
    addEditText: {
        color: Mycolors.THEME_ORANGE,
        fontSize: 16,
        fontWeight: "500",
        textDecorationColor: Mycolors.THEME_ORANGE,
        textDecorationLine: "underline"
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
