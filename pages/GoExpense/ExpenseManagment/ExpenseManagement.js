// external imports
import {
    ActivityIndicator,
    FlatList,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native"
import React, { useEffect, useRef, useState } from "react"
import { BarChart } from "react-native-gifted-charts"
import { useIsFocused } from "@react-navigation/native"
// internal imports
import AddExpansesButton from "./AddExpansesButton"
import AddedBudgetaryTab from "./AddedBudgetaryTab"
import AddedExpensesTab from "./AddedExpensesTab"
// import CommonToast from "../../constants/CommonToast"
import CustomHeader from "../Constants/CustomHeader"
import DeleteAlertModal from "./DeleteAlertModal"
import Toast from 'react-native-toast-message'
import { requestGetApi, recentExpanse_home, get_userBugetary, delete_userBugetry, requestPostApi } from '../../../WebApi/Service'
import { useSelector, useDispatch } from 'react-redux';
// import ExpensesManagementService from "../../service/ExpensesManagementService"
import RecentMonthData from "./RecentMonthData"
// import { colors } from "../../constants/ColorConstant"
import { Mycolors } from "../../../utility/Mycolors"
const ExpenseManagement = ({ navigation }) => {
    const [barData, setBarData] = useState([])
    console.log('my bar data---->>>', barData);
    const [budgetaryData, setBudgetaryData] = useState({})
    const [budgetaryId, setBudgetaryId] = useState(0)
    const [budgetaryRestriction, setBudgetaryRestriction] = useState([])
    const [deleteModal, setDeleteModal] = useState(false)
    const [expansesDetails, setExpansesDetails] = useState({})
    // i have done it to true change to fals
    const [pageLoader, setPageLoader] = useState(false)
    const [warningModal, setWarningModal] = useState(false)
    const isFocus = useIsFocused()
    const toastRef = useRef()
    const User = useSelector(state => state.user.user_details)
    console.log('user details----->>>>', User);
    useEffect(() => {
        // setPageLoader(true)
        getData()
        getBudgetaryData()
        return () => {
            stateBlank() // to set graph state empty
        }
    }, [isFocus == true])

    //function to set graph state empty
    const stateBlank = () => {
        setBarData([])
    }

    // function for get all expense data on api call
    const getData = async () => {
        const { responseJson, err } = await requestGetApi(recentExpanse_home, '', 'GET', User.token)
        console.log('my home get dats-->>', responseJson.body.data)

        setExpansesDetails(responseJson?.body?.data)
        // if (barData.length > 0) {
        //     console.log('my bar adata in the if condition---->>>>', barData);
        // } else {
        //     console.log('bardattaaaaaaa---->>>>>>', barData);
        //     for (let index = 0; index < 12; index++) {
        //         { console.log('does graph  habe the values', responseJson?.body?.data?.previousyeardata[index]?.label) }
        //         const pData = {
        //             value: parseFloat(responseJson?.body?.data?.previousyeardata[index]?.value),
        //             label: responseJson?.body?.data?.previousyeardata[index]?.label,
        //             spacing: 2,
        //             labelWidth: 40,
        //             labelTextStyle: { color: Mycolors.THEME_BLACK },
        //             frontColor: Mycolors.brightGray
        //         }
        //         barData.push(pData)

        //         const cData = {
        //             value: parseFloat(response?.body?.data?.currentyeardata
        //             [index]?.value),
        //             frontColor: Mycolors.THEME_ORANGE
        //         }
        //         barData.push(cData)
        //         console.log('my bardata for current year---->>', barData);
        //         setBarData([...barData])
        //     }
        // }
        // for (let index = 0; index < 12; index++) {
        //     console.log('does graph have the values', responseJson?.body?.data?.previousyeardata[index]?.label);

        //     const pData = {
        //         value: parseFloat(responseJson?.body?.data?.previousyeardata[index]?.value),
        //         label: responseJson?.body?.data?.previousyeardata[index]?.label,
        //         spacing: 2,
        //         labelWidth: 40,
        //         labelTextStyle: { color: Mycolors.THEME_BLACK },
        //         frontColor: Mycolors.brightGray
        //     };

        //     barData.push(pData);

        //     const cData = {
        //         value: parseFloat(responseJson?.body?.data?.currentyeardata[index]?.value),
        //         frontColor: Mycolors.THEME_ORANGE
        //     };

        //     barData.push(cData);

        //     console.log('my bardata for current year---->>', barData);
        // }
        for (let index = 0; index < 12; index++) {
            console.log('does graph have the values', responseJson?.body?.data?.previousyeardata[index]?.label);

            const pData = {
                value: parseFloat(responseJson?.body?.data?.previousyeardata[index]?.value),
                label: responseJson?.body?.data?.previousyeardata[index]?.label,
                spacing: 2,
                labelWidth: 40,
                labelTextStyle: { color: Mycolors.THEME_BLACK },
                frontColor: Mycolors.brightGray
            };

            barData.push(pData);

            const cData = {
                value: parseFloat(responseJson?.body?.data?.currentyeardata[index]?.value),
                frontColor: Mycolors.THEME_ORANGE
            };

            barData.push(cData);

            console.log('my bardata for current year---->>', barData);
        }

        // setBarData([...barData]);
        setBarData([...barData]);
        setPageLoader(false)

    }
    // get_detailsGoExpense
    // list for all months
    const renderRecentMonths = ({ item }) => {
        return <RecentMonthData items={item} />
    }

    // function for get all budgetary data on api call
    const getBudgetaryData = async () => {
        var fUrl = get_userBugetary + `?page=${1}&limit=10`;
        const { responseJson, err } = await requestGetApi(fUrl, '', 'GET', User.token)
        console.log('fUrl', responseJson);
        if (responseJson.headers.success == 1) {
            setPageLoader()
            setBudgetaryRestriction(responseJson?.body?.data)
        } else {
            setPageLoader(false)
        }
        // setBudgetaryRestriction([])
        // ExpensesManagementService.postListBudgetaryRestriction()
        //     .then(response => {
        //         setPageLoader(false)
        //         setBudgetaryRestriction(response.data.budgetaryrestrication)
        //     })
        //     .catch(error => {
        //         setPageLoader(false)
        //         console.log(error)
        //     })

    }

    // list for all expenses
    const renderAddedExpenses = ({ item }) => {
        return <AddedExpensesTab items={item} />
    }

    // list for all budgetary
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
        navigation.navigate(
            "EditBudgetary",
            {
                data: data
            }
        )
    }

    // function for open modal on delete icon click
    const handleDeleteClick = id => {
        setDeleteModal(true)
        setBudgetaryId(id)
    }

    // function for delete button click on api call to delete budgetary
    const handleDelete = async () => {
        setDeleteModal(false)
        // ExpensesManagementService.getDeleteBudgetaryRestriction(budgetaryId)
        //     .then(response => {
        //         toastRef.current.getToast(response.data.message, "success")
        //         getBudgetaryData()
        //     })
        //     .catch(error => {
        //         console.log(error)
        //     })
        const { responseJson, err } = await requestPostApi(delete_userBugetry + budgetaryId, '', 'DELETE', User.token)
        console.log('my delete category data----->>', responseJson);
        if (responseJson.headers.success == 1) {
            setPageLoader(false)
            Toast.show({ text1: responseJson.headers.message });
            getBudgetaryData('')
        } else {
            setPageLoader(false)

        }
    }

    return (
        <View style={styles.container}>
            {/* header section */}
            <CustomHeader
                headerText={"Expenses"}
                backButton={{
                    visible: true,
                    onClick: () => {
                        navigation.navigate("BottomNavigator", {
                            screen: "Home"
                        })
                    }

                }}
                bellButton={{
                    visible: true,
                    onClick: () => {
                        navigation.navigate(
                            "NotificationExpanse"
                        )
                    }
                }}
            />

            {/* body section */}
            {!pageLoader ? (
                <>
                    {expansesDetails !== null ? (
                        <ScrollView
                            nestedScrollEnabled={true}
                            showsVerticalScrollIndicator={false}
                            style={styles.container}
                        >
                            <View style={styles.body}>
                                <View style={styles.textDirection}>
                                    <Text style={styles.labelText}>Overview</Text>
                                </View>

                                {/* month wise data */}
                                {expansesDetails?.monthwisedata?.length > 0 ? (
                                    <View style={styles.expansesContainer}>
                                        <FlatList
                                            data={expansesDetails?.monthwisedata}
                                            renderItem={renderRecentMonths}
                                            horizontal
                                            showsHorizontalScrollIndicator={false}
                                            keyExtractor={(item, index) => String(index)}
                                        />
                                    </View>
                                ) : (
                                    <View style={styles.expansesContainer}>
                                        <Text style={styles.noExpansesText}>No data added.</Text>
                                    </View>
                                )}

                                <View style={styles.textDirection}>
                                    <Text style={styles.labelText}>Recent Expenses</Text>
                                    <TouchableOpacity
                                        onPress={() => {
                                            navigation.navigate(
                                                "AllExpenses"
                                            )
                                        }}
                                    >
                                        {console.log('expansesDetails?.expenses?.length', expansesDetails)}
                                        {expansesDetails?.expenses?.length > 0 ? (
                                            <Text style={styles.addEditText}>View All</Text>
                                        ) : null}
                                    </TouchableOpacity>
                                </View>

                                {/*recently added expanses section  */}
                                {expansesDetails?.expenses?.length > 0 ? (
                                    <View style={styles.expansesContainer}>
                                        <FlatList
                                            data={expansesDetails?.expenses}
                                            horizontal={true}
                                            showsHorizontalScrollIndicator={false}
                                            renderItem={renderAddedExpenses}
                                            keyExtractor={(item, index) => String(index)}
                                        />
                                    </View>
                                ) : (
                                    <View style={styles.expansesContainer}>
                                        <Text style={styles.noExpansesText}>
                                            No recently expenses added.
                                        </Text>
                                    </View>
                                )}

                                {/* graph section */}
                                <View style={{ marginTop: 15, paddingBottom: 20 }}>
                                    {console.log('jkjkjkikikik------>>>', barData)}
                                    {barData?.length > 0 ? (
                                        <BarChart
                                            data={barData}
                                            barWidth={10}
                                            spacing={25}
                                            roundedTop
                                            roundedBottom
                                            hideRules
                                            xAxisThickness={0}
                                            yAxisThickness={0}
                                            yAxisTextStyle={{ color: "gray" }}
                                            stepValue={2000}
                                            maxValue={10000}
                                            noOfSections={5}
                                            yAxisLabelTexts={["0", "2k", "4k", "6k", "8k", "10k"]}

                                            height={170}
                                            width={300}
                                        />
                                    ) : null}

                                    {/* current and previous year indication section */}
                                    <View style={styles.graphLabelContainer}>
                                        <View style={styles.graphDirection}>
                                            <View style={styles.graphLabelColor1} />
                                            <Text style={styles.graphLabelText}>
                                                Year {expansesDetails?.previousyear}
                                            </Text>
                                        </View>
                                        <View style={styles.graphDirection}>
                                            <View style={styles.graphLabelColor2} />
                                            <Text style={styles.graphLabelText}>
                                                Year {expansesDetails?.currentyear}
                                            </Text>
                                        </View>
                                    </View>
                                </View>

                                {budgetaryRestriction?.length > 0 ? (
                                    <>
                                        <View style={styles.textDirection}>
                                            <Text style={styles.labelText}>Recent Budgetary</Text>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    navigation.navigate(
                                                        "AddedBudgetary"
                                                    )
                                                }}
                                            >
                                                <Text style={styles.addEditText}>View All</Text>
                                            </TouchableOpacity>
                                        </View>

                                        <View style={styles.container}>
                                            <FlatList
                                                data={budgetaryRestriction}
                                                horizontal={true}
                                                showsHorizontalScrollIndicator={false}
                                                renderItem={renderAddedBudgetary}
                                                keyExtractor={(item, index) => String(index)}
                                            />
                                        </View>
                                    </>
                                ) : null}
                            </View>

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
                                    navigation.navigate(
                                        "AddExpense",
                                        {
                                            data: budgetaryData

                                        })
                                }}
                                subHeading={
                                    "You have exceed the budgetary limit. Are you sure you want add expense ?"
                                }
                            />

                            {/* toaster message for error response from API  */}
                            {/* <CommonToast ref={toastRef} /> */}
                        </ScrollView>
                    ) : (
                        <View style={styles.noDataContainer}>
                            <Text style={styles.noDataText}>
                                No budgetary data created yet. {"\n"}Click on the "+" icon to
                                create a Budgetary.
                            </Text>
                        </View>
                    )}

                    {/* create expense icon  */}
                    <View style={styles.createIconContainer}>
                        <AddExpansesButton navigation={navigation} kk={'hello'} />
                    </View>
                </>
            ) : (
                <View style={styles.loaderContainer}>
                    <ActivityIndicator size="large" color={Mycolors.THEME_ORANGE} />
                </View>
            )}
        </View>
    )
}

export default ExpenseManagement

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
    labelText: {
        color: Mycolors.THEME_BLACK,
        fontSize: 16,
        fontWeight: "500",
        paddingVertical: 5
    },
    addEditText: {
        color: Mycolors.THEME_ORANGE,
        fontSize: 14
    },
    expansesContainer: {
        alignContent: "center",
        alignItems: "center",
        alignSelf: "center",
        height: 160,
        justifyContent: "center",
        marginVertical: 5
    },
    noExpansesText: {
        color: Mycolors.THEME_BLACK,
        fontSize: 18,
        fontWeight: "500",
        padding: 20
    },
    month: {
        color: Mycolors.THEME_ORANGE,
        fontSize: 20,
        fontWeight: "bold",
        marginTop: 10
    },
    selectedDate: {
        backgroundColor: Mycolors.THEME_ORANGE,
        color: Mycolors.WHITE
    },
    createIconContainer: {
        bottom: 30,
        position: "absolute",
        right: 40,
        zIndex: 1
    },
    graphLabelContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-evenly",
        marginTop: 20
    },
    graphDirection: {
        alignItems: "center",
        flexDirection: "row"
    },
    graphLabelColor1: {
        backgroundColor: Mycolors.brightGray,
        borderRadius: 6,
        height: 12,
        marginRight: 8,
        width: 12
    },
    graphLabelColor2: {
        backgroundColor: Mycolors.THEME_ORANGE,
        borderRadius: 6,
        height: 12,
        marginRight: 8,
        width: 12
    },
    graphLabelText: {
        color: Mycolors.THEME_BLACK,
        fontSize: 14,
        paddingBottom: 5
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
    },
    loaderContainer: {
        alignSelf: "center",
        flex: 1,
        justifyContent: "center"
    }
})
