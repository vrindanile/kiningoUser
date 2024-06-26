// external imports
import {
    ActivityIndicator,
    FlatList,
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native"
import React, { useEffect, useRef, useState } from "react"
import Slider from "@react-native-community/slider"
import Toast from 'react-native-toast-message'
// import { Formik } from "formik"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
// internal import
import AllCategoryTab from "./AllCategoryTab"
import AllSubCategoryTab from "./AllSubCategoryTab"
// import CommonToast from "../../constants/CommonToast"
import CustomHeader from "../Constants/CustomHeader"
// import ExpensesManagementService from "../../service/ExpensesManagementService"
import SubmitButton from "../Constants/SubmitButton"
// import { budgetaryValidation } from "../../constants/SchemaValidation"
import { Mycolors } from "../../../utility/Mycolors"
import { requestGetApi, get_userBugetary, get_category, edit_budgetary, requestPostApi } from '../../../WebApi/Service'
import { useSelector, useDispatch } from 'react-redux';


const EditBudgetary = ({ navigation, route }) => {
    console.log('my detail from the params---->>', route?.params?.data?.categoryname
    );
    const User = useSelector(state => state.user.user_details)
    const [allExpenseCategory, setAllExpenseCategory] = useState([])
    const [allExpenseSubCategory, setAllExpenseSubCategory] = useState([])
    const [arrayList, setArrayList] = useState([])
    const [budgetaryAmount, setBudgetaryAmount] = useState(1)
    const [checked, setChecked] = useState(true)
    const [loader, setLoader] = useState(false)
    const [mainCategory, setMainCategory] = useState("P")
    const [markEnable, setMarkEnable] = useState("0")
    const [monthYear, setMonthYear] = useState("M")
    const [pageLoader, setPageLoader] = useState(false)
    const [subCategoryChecked, setSubCategoryChecked] = useState(true)
    const [subCategoryList, setSubCategoryList] = useState([])
    const [categoryName, setCategoryName] = useState('')
    const toastRef = useRef()

    useEffect(() => {

        const unsubscribe = navigation.addListener("focus", () => {
            //for month and year
            setMonthYear(route?.params?.data?.type)

            //for recurring payment
            setMarkEnable(route?.params?.data?.is_recursive)
            console.log('did i get into the useEffct', route?.params?.data?.categorytype);
            // for main category
            if (route?.params?.data?.categorytype == "Personal") {
                setMainCategory("P")
                getData("P")
            } else if (route?.params?.data?.categorytype == "Official") {
                setMainCategory("O")
                getData("O")
            } else if (route?.params?.data?.categorytype == "Shared") {
                setMainCategory("S")
                getData("S")
            }

            // for expense category
            setArrayList([route?.params?.data?.categoryid])
            getListExpensesSubCategory(route?.params?.data?.categoryid)

            // for expense sub category
            setSubCategoryList([route?.params?.data?.subcategoryid])
            setCategoryName(route?.params?.data?.name)


            //  for set budgetary amount
            setBudgetaryAmount(parseInt(route?.params?.data?.editbudget))
        })
        return unsubscribe
    }, [navigation])

    // function for get all expense list data on api call
    const getData = async (value) => {
        console.log('my get data values from the edit---->>>', value);
        setPageLoader(true)

        // ExpensesManagementService.postListExpensesCategory(data)
        //     .then(response => {
        //         setPageLoader(false)
        //         setAllExpenseCategory(response.data.allexpensecategory)
        //     })
        //     .catch(error => {
        //         setPageLoader(false)
        //         console.log(error)
        //     })
        var url = get_category
        var furl = `?category=` + value
        furl = url + furl
        const { responseJson, err } = await requestGetApi(furl, '', 'GET', User.token)
        console.log('my new categories for edit---->>>', responseJson.headers.success);
        if (responseJson.headers.success == 1) {
            console.log('my get category data from the edit----->>', responseJson.body.data);
            setPageLoader(false)
            setAllExpenseCategory(responseJson.body.data)
        } else {
            setPageLoader(false)

            // }

        }
    }

    // list for all category
    const renderCategoryTab = ({ item }) => {
        console.log('ririr----->>>>', item)
        return (
            <AllCategoryTab
                item={item}
                handleChecked={handleChecked}
                checked={checked}
                checkedList={arrayList}
            />
        )
    }

    // function for select category
    const handleChecked = async selectedId => {
        setChecked(true)
        setArrayList([selectedId])
        getListExpensesSubCategory(selectedId) //for sub category according to category
    }

    // function for get all sub category list data on api call
    const getListExpensesSubCategory = selectedId => {
        const data = {
            categoryid: selectedId
        }
        // ExpensesManagementService.postListExpensesSubCategory(data)
        //     .then(response => {
        //         setAllExpenseSubCategory(response.data.allexpensesubcategory)
        //     })
        //     .catch(error => {
        //         console.log(error)
        //     })
    }

    // list for sub category
    const renderSubCategoryTab = ({ item }) => {
        return (
            <AllSubCategoryTab
                items={item}
                handleChecked={handleSubCategoryChecked}
                checked={subCategoryChecked}
                checkedList={subCategoryList}
            />
        )
    }

    // function for select sub category
    const handleSubCategoryChecked = selectedSubCategoryId => {
        setSubCategoryChecked(true)
        setSubCategoryList([selectedSubCategoryId])
    }

    // function for submit button click on api call to edit budgetary
    const onSubmit = async () => {
        setLoader(true)
        const data = {
            category_id: subCategoryList[0],
            type: monthYear,
            is_recursive: markEnable,
            budget: budgetaryAmount,
            budgetaryname: categoryName,
            // budgetaryid: route?.params?.data?.budgetaryid
        }

        // ExpensesManagementService.postEditBudgetaryRestriction(data)
        //     .then(response => {
        //         setLoader(false)
        //         toastRef.current.getToast(response.data.message, "success")
        //         navigation.navigate("StackNavigation", { screen: "AddedBudgetary" })
        //     })
        //     .catch(error => {
        //         setLoader(false)
        //         console.log(error)
        //     })
        const { responseJson, err } = await requestPostApi(edit_budgetary + route?.params?.data?.budgetaryid, data, 'PUT', User.token)
        console.log('my edit responsded data----->>', responseJson.headers.success);
        if (responseJson.headers.success === 1) {
            setLoader(false);
            Toast.show({ text1: responseJson.headers.message });
            navigation.navigate('AddedBudgetary');
        } else {

            setLoader(false);
            console.log('');

        }

        // edit_budgetary
    }

    const initialValues = {
        title: route?.params?.data?.name
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            {/* header section  */}
            <CustomHeader
                headerText={"Edit Budgetary"}
                backButton={{
                    visible: true,
                    onClick: () => {
                        navigation.goBack()
                    }
                }}
            />

            {/* body section */}
            <KeyboardAwareScrollView
                showsVerticalScrollIndicator={false}
                style={styles.container}
            >
                <View
                // validationSchema={budgetaryValidation}
                // initialValues={initialValues}
                // onSubmit={values => {
                //     onSubmit(values)
                // }}
                >
                    {/* {({
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        values,
                        errors,
                        touched,
                        setFieldTouched
                    }) => ( */}
                    <View style={styles.body}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            {/* main category section  */}
                            <View style={styles.categoryContainer}>
                                <TouchableOpacity
                                    onPress={() => {
                                        setMainCategory("P")
                                        getData("P")
                                    }}
                                    style={
                                        mainCategory === "P"
                                            ? styles.categoryTabBorder
                                            : styles.categoryTab
                                    }
                                >
                                    <Text style={styles.categoryText}>Personal</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => {
                                        setMainCategory("O")
                                        getData("O")
                                    }}
                                    style={
                                        mainCategory === "O"
                                            ? styles.categoryTabBorder
                                            : styles.categoryTab
                                    }
                                >
                                    <Text style={styles.categoryText}>Official</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => {
                                        setMainCategory("S")
                                        getData("S")
                                    }}
                                    style={
                                        mainCategory === "S"
                                            ? styles.categoryTabBorder
                                            : styles.categoryTab
                                    }
                                >
                                    <Text style={styles.categoryText}>Shared</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.textDirection}>
                                <Text style={styles.labelText}>Categories</Text>
                            </View>

                            {/* category tab section  */}
                            {!pageLoader ? (
                                <View style={{ height: 110 }}>
                                    <FlatList
                                        data={allExpenseCategory}
                                        renderItem={renderCategoryTab}
                                        horizontal
                                        showsHorizontalScrollIndicator={false}
                                        keyExtractor={(item, index) => String(index)}
                                    />
                                </View>
                            ) : (
                                <View style={styles.loaderContainer}>
                                    <ActivityIndicator
                                        size="large"
                                        color={Mycolors.THEME_ORANGE}
                                    />
                                </View>
                            )}

                            {allExpenseSubCategory?.length > 0 ? (
                                <>
                                    <View style={styles.textDirection}>
                                        <Text style={styles.labelText}>Expense Categories</Text>
                                    </View>

                                    {/* sub category tab section  */}
                                    <View>
                                        <FlatList
                                            data={allExpenseSubCategory}
                                            renderItem={renderSubCategoryTab}
                                            horizontal
                                            showsHorizontalScrollIndicator={false}
                                            keyExtractor={(item, index) => String(index)}
                                        />
                                    </View>
                                </>
                            ) : null}

                            {/* Budgetary Restriction section  */}
                            <View>
                                <View style={styles.textDirection}>
                                    <Text style={styles.labelText}>Budgetary Title</Text>
                                </View>
                                <TextInput
                                    placeholder="Enter title"
                                    placeholderTextColor={Mycolors.textGray}
                                    style={styles.textInput}
                                    value={categoryName}
                                    onChangeText={(text) => setCategoryName(text)}
                                // value={values.title}
                                // onChangeText={handleChange("title")}
                                // onBlur={() => {
                                //     handleBlur("title")
                                //     setFieldTouched("title")
                                // }}
                                />

                                {/* <Text style={styles.errorMessage}>
                                    {touched.title && errors.title}
                                </Text> */}
                            </View>

                            {/* Budgetary Restriction section  */}
                            <View style={styles.textDirection}>
                                <Text style={styles.labelText}>Budgetary Restriction</Text>
                            </View>

                            <View style={styles.budgetaryContainer}>
                                <Text style={styles.selectText}>Select</Text>
                                <View style={styles.monthDirection}>
                                    <TouchableOpacity
                                        style={styles.radioDirection}
                                        onPress={() => {
                                            setMonthYear("M")
                                        }}
                                    >
                                        <View
                                            style={
                                                monthYear === "M"
                                                    ? styles.selectedRadio
                                                    : styles.unSelectedRadio
                                            }
                                        >
                                            <View
                                                style={
                                                    monthYear === "M" ? styles.selectedRadioFill : null
                                                }
                                            />
                                        </View>
                                        <Text style={styles.cardName}>Monthly</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={styles.radioDirection}
                                        onPress={() => {
                                            setMonthYear("Y")
                                        }}
                                    >
                                        <View
                                            style={
                                                monthYear === "Y"
                                                    ? styles.selectedRadio
                                                    : styles.unSelectedRadio
                                            }
                                        >
                                            <View
                                                style={
                                                    monthYear === "Y" ? styles.selectedRadioFill : null
                                                }
                                            />
                                        </View>
                                        <Text style={styles.cardName}>Yearly</Text>
                                    </TouchableOpacity>
                                </View>

                                {/* price  */}
                                <View>
                                    <Text style={styles.selectText}>Price ($)</Text>
                                    <TextInput
                                        style={styles.textInput}
                                        value={
                                            budgetaryAmount > 0 ? budgetaryAmount.toString() : ""
                                        }
                                        maxLength={5}
                                        keyboardType="numeric"
                                        onChangeText={text => {
                                            setBudgetaryAmount(parseInt(text))
                                        }}
                                    />
                                </View>

                                {/* process bar section  */}
                                <View style={{ marginVertical: 10 }}>
                                    {budgetaryAmount > 0 ? (
                                        <Slider
                                            style={{ width: 330 }}
                                            minimumValue={1}
                                            maximumValue={10000}
                                            onValueChange={item => {
                                                setBudgetaryAmount(parseInt(item))
                                            }}
                                            value={budgetaryAmount}
                                            thumbTintColor={Mycolors.THEME_ORANGE}
                                            minimumTrackTintColor={Mycolors.THEME_ORANGE}
                                            maximumTrackTintColor={Mycolors.GRAY}
                                        />
                                    ) : (
                                        <Slider
                                            style={{ width: 330 }}
                                            minimumValue={1}
                                            maximumValue={10000}
                                            thumbTintColor={Mycolors.THEME_ORANGE}
                                            minimumTrackTintColor={Mycolors.THEME_ORANGE}
                                            maximumTrackTintColor={Mycolors.GRAY}
                                        />
                                    )}
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            justifyContent: "space-between",
                                            width: "96%"
                                        }}
                                    >
                                        <Text style={styles.progressText}>$1.00</Text>
                                        <Text style={styles.progressText}>$10000.00</Text>
                                    </View>
                                </View>

                                {/* mark as recurring */}
                                <View style={styles.radioDirection}>
                                    {markEnable == "0" ? (
                                        <TouchableOpacity
                                            onPress={() => {
                                                setMarkEnable("1")
                                            }}
                                            style={styles.checkBox}
                                        >
                                            <Image
                                                resizeMode="contain"
                                                style={styles.checkIcon}
                                                source={require("../../../assets/Remindably/whitechcek.png")}
                                            />
                                        </TouchableOpacity>
                                    ) : (
                                        <TouchableOpacity
                                            onPress={() => {
                                                setMarkEnable("0")
                                            }}
                                            style={styles.checkedBox}
                                        >
                                            <Image
                                                resizeMode="contain"
                                                style={styles.checkIcon}
                                                source={require("../../../assets/Remindably/whitechcek.png")}
                                            />
                                        </TouchableOpacity>
                                    )}
                                    <Text style={styles.cardName}>
                                        Mark as Recurring expense
                                    </Text>
                                </View>
                            </View>

                            {/* next button section */}
                            <TouchableOpacity style={styles.buttonContainer} onPress={() => { onSubmit() }}>
                                <SubmitButton
                                    buttonText={"Save"}
                                    // submitButton={handleSubmit}
                                    loader={loader}
                                />
                            </TouchableOpacity>
                        </ScrollView>

                        {/* toaster message for error response from API  */}
                        {/* <CommonToast ref={toastRef} /> */}
                    </View>
                    {/* )} */}
                </View>
            </KeyboardAwareScrollView>
        </KeyboardAvoidingView>
    )
}

export default EditBudgetary

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    body: {
        flex: 1,
        padding: 10
    },
    categoryContainer: {
        backgroundColor: Mycolors.WHITE,
        borderRadius: 15,
        flexDirection: "row"
    },
    categoryTab: { width: "33%" },
    categoryTabBorder: {
        borderBottomColor: Mycolors.THEME_ORANGE,
        borderBottomWidth: 3,
        width: "33%"
    },
    categoryText: {
        color: Mycolors.THEME_BLACK,
        backgroundColor: Mycolors.WHITE,
        fontSize: 16,
        fontWeight: "500",
        padding: 10,
        textAlign: "center"
    },
    textDirection: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
        paddingVertical: 3
    },
    labelText: {
        color: Mycolors.THEME_BLACK,
        fontSize: 18,
        fontWeight: "500",
        paddingVertical: 5
    },
    budgetaryContainer: {
        backgroundColor: Mycolors.WHITE,
        borderRadius: 15,
        height: "auto",
        padding: 20
    },
    selectText: {
        backgroundColor: Mycolors.WHITE,
        color: Mycolors.THEME_BLACK,
        fontSize: 16,
        fontWeight: "500",
        paddingVertical: 10
    },
    monthDirection: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "50%"
    },
    buttonContainer: { marginVertical: 20 },
    radioDirection: {
        alignItems: "center",
        flexDirection: "row"
    },
    unSelectedRadio: {
        alignItems: "center",
        borderColor: Mycolors.THEME_BLACK,
        borderRadius: 12,
        borderWidth: 2,
        height: 24,
        justifyContent: "center",
        marginHorizontal: 3,
        width: 24
    },
    selectedRadio: {
        alignItems: "center",
        borderColor: Mycolors.THEME_ORANGE,
        borderRadius: 12,
        borderWidth: 2,
        height: 24,
        justifyContent: "center",
        marginHorizontal: 3,
        width: 24
    },
    selectedRadioFill: {
        alignItems: "center",
        backgroundColor: Mycolors.THEME_ORANGE,
        borderColor: Mycolors.WHITE,
        borderRadius: 12,
        borderWidth: 2,
        height: 20,
        justifyContent: "center",
        marginHorizontal: 3,
        width: 20
    },
    cardName: {
        color: Mycolors.THEME_BLACK,
        fontSize: 14,
        fontWeight: "400",
        marginHorizontal: 5
    },
    textInput: {
        backgroundColor: Mycolors.WHITE,
        borderColor: Mycolors.lightGray,
        borderRadius: 10,
        borderWidth: 1,
        color: Mycolors.THEME_BLACK,
        fontSize: 16,
        marginBottom: 10,
        padding: 10,
        paddingLeft: 20
    },
    errorMessage: {
        color: Mycolors.RED,
        fontSize: 14,
        paddingHorizontal: 10
    },
    progressText: {
        color: Mycolors.textGray,
        fontSize: 14,
        fontWeight: "500"
    },
    checkBox: {
        alignContent: "center",
        alignItems: "center",
        backgroundColor: Mycolors.WHITE,
        borderColor: Mycolors.GRAY,
        borderRadius: 5,
        borderWidth: 2,
        height: 25,
        justifyContent: "center",
        marginRight: 5,
        width: 25
    },
    checkedBox: {
        alignContent: "center",
        alignItems: "center",
        backgroundColor: Mycolors.GREEN,
        borderRadius: 5,
        height: 25,
        justifyContent: "center",
        marginRight: 5,
        width: 25
    },
    checkIcon: {
        height: 18,
        width: 18
    },
    loaderContainer: {
        alignSelf: "center",
        flex: 1,
        justifyContent: "center"
    }
})
