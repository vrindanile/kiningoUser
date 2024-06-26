//external imports
import {
    FlatList,
    Image,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native"
import ImagePicker from "react-native-image-crop-picker"
import React, { useEffect, useRef, useState } from "react"
import moment from "moment"
// import { Formik } from "formik"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
//internal imports
import AddCardModal from "./AddCardModal"
import AddChequeModal from "./AddChequeModal"
import AddEftModal from "./AddEftModal"
import CalendarModal from "./CalendarModal"
import CameraGalleryModal from "./CameraGalleryModal"

import CustomHeader from "../Constants/CustomHeader"
import ExpansesImage from "./ExpansesImage"
// import ExpensesManagementService from "../../service/ExpensesManagementService"
import SavedCardExpanse from "./SavedCardExpanse"
import SavedChequeExpanse from "./SavedChequeExpanse"
import SavedEftExpanse from "./SavedEftExpanse"
import SubmitButton from "../Constants/SubmitButton"
import { Mycolors } from "../../../utility/Mycolors"
import Toast from 'react-native-toast-message'
// import { expansesValidation } from "../../constants/SchemaValidation"
// add_expenses
import { requestGetApi, requestPostApi, add_expenses, requestPostApiImages, saved_cards } from '../../../WebApi/Service'
import { useSelector, useDispatch } from 'react-redux';
import { exp } from "react-native-reanimated"
const AddExpense = ({ navigation, route }) => {
    const User = useSelector(state => state.user.user_details)
    const [accountNumber, setAccountNumber] = useState("")
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [addCardModal, setAddCardModal] = useState(false)
    const [amount, setAmount] = useState('')
    const [addChequeModal, setAddChequeModal] = useState(false)
    const [addEftModal, setAddEftModal] = useState(false)
    const [bankName, setBankName] = useState("")
    const [calendarModal, setCalendarModal] = useState(false)
    const [cameraGalleryModal, setCameraGalleryModal] = useState(false)
    const [cardName, setCardName] = useState("")
    const [cardOrCash, setCardOrCash] = useState("Card")
    const [chequeNumber, setChequeNumber] = useState("")
    const [err, setErr] = useState(false)
    const [expensesImage, setExpensesImage] = useState([])
    const [loader, setLoader] = useState(false)
    const [markEnable, setMarkEnable] = useState("0")
    const [monthYear, setMonthYear] = useState("M")
    const [savedCards, setSavedCards] = useState([])
    const [savedCheque, setSavedCheque] = useState([])
    const [savedEft, setSavedEft] = useState([])
    const [selectedDate, setSelectedDate] = useState(
        moment(new Date()).format("YYYY-MM-DD")
    )
    const toastRef = useRef()

    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            setExpensesImage([])
            getSavedCard()
            console.log('my data from the params ----->>>', route?.params?.data)
        })
        return unsubscribe
    }, [navigation, route])

    // function for open camera
    const openCamera = async () => {
        try {
            let value = await ImagePicker.openCamera({
                width: 1080,
                height: 1080,
                cropping: true,
                mediaType: "photo",
                compressImageQuality: 1,
                compressImageMaxHeight: 1080 / 2,
                compressImageMaxWidth: 1080 / 2
            }).then(image => {
                const img = {
                    name: image.path.slice(
                        image.path.lastIndexOf("/"),
                        image.path.length
                    ),
                    uri: image.path,
                    type: image.mime
                }
                setExpensesImage([img])
                setCameraGalleryModal(false)
            })
        } catch (error) {
            setCameraGalleryModal(false)
            console.log("error in openLibrary", error)
        }
    }

    // function for open gallery
    const openLibrary = async () => {
        try {
            let imageList = []
            let value = await ImagePicker.openPicker({
                width: 1080,
                height: 1080,
                cropping: true,
                multiple: true,
                mediaType: "photo",
                compressImageQuality: 1,
                compressImageMaxHeight: 1080 / 2,
                compressImageMaxWidth: 1080 / 2
            }).then(image => {
                image.map(e => {
                    imageList.push({
                        name: e.path.slice(e.path.lastIndexOf("/"), e.path.length),
                        uri: e.path,
                        type: e.mime
                    })
                })
                setExpensesImage(imageList)
                setCameraGalleryModal(false)
            })
        } catch (error) {
            setCameraGalleryModal(false)
            console.log("error in openLibrary", error)
        }
    }

    // function for get all previously saved cards on api call
    const getSavedCard = async () => {
        // saved_cards
        setLoader(true)
        const { responseJson, err } = await requestGetApi(saved_cards, '', 'GET', User.token)
        if (responseJson.headers.success === 1) {
            setLoader(false)
            console.log(responseJson, 'my saved cardssss');
            setSavedCards(responseJson?.body?.data?.allcards
            )
            setSavedCheque(responseJson?.body?.data?.cheque
            )
            setSavedEft(responseJson?.body?.data?.eft
            )
        }
        else {
            setLoader(false)
        }
        // ExpensesManagementService.getSavedCards()
        //     .then(response => {
        //         setLoader(false)
        //         setSavedCards(response.data.allcards)
        //         setSavedCheque(response.data.cheque)
        //         setSavedEft(response.data.eft)
        //     })
        //     .catch(error => {
        //         setLoader(false)
        //         console.log(error)
        //     })
    }

    // list for all saved card
    const renderAllCards = ({ item }) => {
        return (
            <SavedCardExpanse
                items={item}
                handleSelectCard={handleChecked}
                selectedCard={cardName}
            />
        )
    }

    // function for select card click
    const handleChecked = cardName => {
        setCardName(cardName)
        setErr(false)
    }

    // list for all cheque
    const renderAllCheque = ({ item }) => {
        return (
            <SavedChequeExpanse
                items={item}
                handleSelectCard={handleChequeChecked}
                selectedCard={bankName}
            />
        )
    }

    // function for select cheque
    const handleChequeChecked = data => {
        setErr(false)
        setAccountNumber(data?.accountnumber)
        setBankName(data?.bankname)
    }

    // list for all EFT
    const renderAllEft = ({ item }) => {
        return (
            <SavedEftExpanse
                items={item}
                handleSelectCard={handleEftChecked}
                selectedCard={bankName}
            />
        )
    }

    // function for select EFT
    const handleEftChecked = data => {
        setErr(false)
        setAccountNumber(data?.accountnumber)
        setBankName(data?.bankname)
    }

    // function for submit button click for add card
    const handleAddCardSubmitClick = name => {
        setAddCardModal(false)
        setErr(false)
        setSavedCards([...savedCards, name])
    }

    // function for submit button click for add cheque
    const handleAddChequeSubmitClick = (
        accountNumber,
        chequeNumber,
        bankName
    ) => {
        setAddChequeModal(false)
        setErr(false)
        setAccountNumber(accountNumber)
        setChequeNumber(chequeNumber)
        setBankName(bankName)
        const obj = {
            bankname: bankName,
            accountnumber: accountNumber
        }
        setSavedCheque([...savedCheque, obj])
    }

    // function for submit button click for add EFT
    const handleAddEftSubmitClick = (accountNumber, bankName) => {
        setAddEftModal(false)
        setErr(false)
        setAccountNumber(accountNumber)
        setBankName(bankName)
        const obj = {
            bankname: bankName,
            accountnumber: accountNumber
        }
        setSavedEft([...savedEft, obj])
    }

    // list for expense images
    const renderAddExpenseImages = ({ item }) => {
        return <ExpansesImage expenseImage={item} />
    }

    // function for calender submit click after select date
    const handleCalendarSubmitClick = selectDate => {
        setCalendarModal(false)
        setSelectedDate(moment(selectDate).format("YYYY-MM-DD"))
    }

    // function for submit button click for select payment mode
    const onSubmit = () => {
        Keyboard.dismiss()
        console.log('did i reach to the onSubmit function');
        if (cardOrCash === "Card" && cardName !== "") {
            handleCallApi()
        } else if (
            cardOrCash === "Cheque" &&
            accountNumber !== "" &&
            bankName !== ""
        ) {
            handleCallApi()
        } else if (
            cardOrCash === "EFT" &&
            accountNumber !== "" &&
            bankName !== ""
        ) {
            handleCallApi()
        } else if (cardOrCash === "Cash") {
            handleCallApi()
        } else {
            setErr(true)
        }
    }

    // function for submit button click for api call with payment mode and details to add expense
    const handleCallApi = async () => {
        console.log('did i reach to tge hanlecallApi')

        // setLoader(true)
        if (!title) {
            Toast.show({ text1: 'Please enter title' });
            return
        }
        if (!amount) {
            Toast.show({ text1: 'Please enter ammount' });
            return
        }
        const feedBackData = new FormData()
        console.log('didi come into feedack data');
        if (expensesImage !== null) {
            expensesImage.map((e, index) => {
                feedBackData.append(`files`, e)
            })
        }
        feedBackData.append("budgetaryid", route?.params?.data?.budgetaryid
        )
        feedBackData.append("categoryid", route?.params?.data?.subcategoryid
        )
        feedBackData.append("titile", title)
        console.log('description------->>>', description);
        feedBackData.append("description", description)
        feedBackData.append("amount", amount)
        feedBackData.append("paymenttype", cardOrCash)
        feedBackData.append("cardname", cardName)
        feedBackData.append("chequenumber", chequeNumber)
        feedBackData.append("bankname", bankName)
        feedBackData.append("accountnumber", accountNumber)
        feedBackData.append("date", selectedDate)
        feedBackData.append("type", monthYear)
        feedBackData.append("is_recursive", markEnable)
        console.log('my data after addition of expenses--->>', feedBackData);
        const { responseJson, err } = await requestPostApiImages(add_expenses, feedBackData, 'POST', User.token)
        console.log('response od add category------>>', responseJson);
        // ExpensesManagementService.postAddUserExpanse(feedBackData)
        //     .then(response => {
        //         setLoader(false)
        //         toastRef.current.getToast(response.data.message, "success")

        //     })
        //     .catch(error => {
        //         setLoader(false)
        //         console.log(error)
        //     })
        if (responseJson.headers.success === 1) {
            Toast.show({ text1: responseJson.headers.message });
            navigation.replace("AllExpenses")
            // onSubmitClick(responseJson.body.categoryid)
        }
        else {
            console.log('there is error in adding category');
        }
    }

    const initialValues = {
        title: "",
        description: "",
        amount: ""
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            {/* header section */}
            <CustomHeader
                headerText={"Add Expense"}
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
                // validationSchema={expansesValidation}
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
                            {/* title section  */}
                            <View>
                                <Text style={styles.labelText}>Title</Text>
                                <TextInput
                                    placeholder="Enter title"
                                    placeholderTextColor={Mycolors.textGray}
                                    style={[styles.textInput, { marginVertical: 12 }]}
                                    value={title}
                                    onChangeText={(text) => setTitle(text)}
                                // value={values.title}
                                // onChangeText={handleChange("title")}
                                // onBlur={() => {
                                //     handleBlur("title")
                                //     setFieldTouched("title")
                                // }}
                                />
                                {/* 
                                <Text style={styles.errorMessage}>
                                    {touched.title && errors.title}
                                </Text> */}
                            </View>

                            {/*Description section  */}
                            <View>
                                <Text style={[styles.labelText, { marginVertical: 12 }]}>Description</Text>
                                <TextInput
                                    placeholder="Enter description here…"
                                    placeholderTextColor={Mycolors.textGray}
                                    style={styles.descriptionInput}
                                    // value={values.description}
                                    value={description}
                                    onChangeText={(text) => setDescription(text)}
                                    numberOfLines={3}
                                    multiline={true}
                                    textAlignVertical="top"
                                // onChangeText={handleChange("description")}
                                // onBlur={() => {
                                //     handleBlur("description")
                                //     setFieldTouched("description")
                                // }}
                                />
                                {/* <Text style={styles.errorMessage}>
                                    {touched.description && errors.description}
                                </Text> */}
                            </View>

                            {/*amount section  */}
                            <View>
                                <Text style={[styles.labelText, { marginVertical: 12 }]}>Amount</Text>
                                <TextInput
                                    placeholder="Enter amount"
                                    placeholderTextColor={Mycolors.textGray}
                                    style={styles.textInput}
                                    keyboardType={
                                        Platform.OS === "ios" ? "number-pad" : "numeric"
                                    }
                                    value={amount}
                                    onChangeText={(text) => setAmount(text)}
                                // value={values.amount}
                                // onChangeText={handleChange("amount")}
                                // onBlur={() => {
                                //     handleBlur("amount")
                                //     setFieldTouched("amount")
                                // }}
                                />

                                {/* <Text style={styles.errorMessage}>
                                    {touched.amount && errors.amount}
                                </Text> */}
                            </View>

                            {/* mark as recurring */}
                            <View style={[styles.radioDirection, { marginVertical: 15 }]}>
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
                                <Text style={styles.cardName}>Mark as Recurring expense</Text>
                            </View>

                            {/* monthly and yearly type based on recurring */}
                            {markEnable == "1" ? (
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
                            ) : null}

                            {/* date section */}
                            <View style={{ marginBottom: 5 }}>
                                <Text style={[styles.labelText, { marginVertical: 12 }]}>Select Date</Text>
                                <View style={styles.calendarDateContainer}>
                                    <TextInput
                                        editable={false}
                                        placeholder={"MM-DD-YYYY"}
                                        placeholderTextColor={Mycolors.THEME_BLACK}
                                        value={selectedDate}
                                        style={{
                                            color: Mycolors.THEME_BLACK
                                        }}
                                    />
                                    <TouchableOpacity
                                        onPress={() => {
                                            setCalendarModal(!calendarModal)
                                        }}
                                        style={styles.calendarIcon}
                                    >
                                        <Image
                                            resizeMode="contain"
                                            tintColor={Mycolors.THEME_ORANGE}
                                            style={styles.image}
                                            source={require("../../../assets/Remindably/CalendarBlank1.png")}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>

                            {/* uploaded media section  */}
                            {expensesImage?.length > 0 ? (
                                <FlatList
                                    data={expensesImage}
                                    horizontal={true}
                                    showsHorizontalScrollIndicator={false}
                                    renderItem={renderAddExpenseImages}
                                    keyExtractor={(item, index) => String(index)}
                                    style={{ marginVertical: 12 }}
                                />
                            ) : null}

                            {/* upload image section */}
                            <TouchableOpacity
                                onPress={() => setCameraGalleryModal(true)}
                                style={[styles.uploadMediaContainer, { marginVertical: 15 }]}
                            >
                                <Image
                                    style={styles.uploadImageStyle}
                                    resizeMode="contain"
                                    source={require("../../../assets/Remindably/UploadMedia.png")}
                                />
                                <Text style={styles.uploadMediaText}>Upload image</Text>
                            </TouchableOpacity>

                            {/* Payment Method section  */}
                            <View style={styles.textDirection}>
                                <Text style={styles.labelText}>Select Payment Method</Text>
                            </View>

                            <View style={styles.textDirection}>
                                {/* Card section  */}
                                <TouchableOpacity
                                    style={
                                        cardOrCash === "Card"
                                            ? styles.cardContainerBorder
                                            : styles.cardContainer
                                    }
                                    onPress={() => {
                                        setCardOrCash("Card")
                                        setErr(false)
                                    }}
                                >
                                    <View style={styles.cardImage}>
                                        <Image
                                            resizeMode="contain"
                                            style={styles.image}
                                            source={require("../../../assets/Remindably/cardImage.png")}
                                        />
                                    </View>

                                    <Text style={styles.cardText}>Card</Text>
                                    {cardOrCash === "Card" ? (
                                        <View style={styles.checkedImage}>
                                            <Image
                                                resizeMode="contain"
                                                style={styles.image}
                                                source={require("../../../assets/Remindably/CheckedIcon.png")}
                                            />
                                        </View>
                                    ) : null}
                                </TouchableOpacity>

                                {/* Cash section  */}
                                <TouchableOpacity
                                    style={
                                        cardOrCash === "Cash"
                                            ? styles.cardContainerBorder
                                            : styles.cardContainer
                                    }
                                    onPress={() => {
                                        setCardOrCash("Cash")
                                        setCardName("")
                                        setAccountNumber("")
                                        setChequeNumber("")
                                        setBankName("")
                                    }}
                                >
                                    <View style={styles.cardImage}>
                                        <Image
                                            resizeMode="contain"
                                            style={styles.image}
                                            source={require("../../../assets/Remindably/cashImage.png")}
                                        />
                                    </View>
                                    <Text style={styles.cardText}>Cash</Text>
                                    {cardOrCash === "Cash" ? (
                                        <View style={styles.checkedImage}>
                                            <Image
                                                resizeMode="contain"
                                                style={styles.image}
                                                source={require("../../../assets/Remindably/CheckedIcon.png")}
                                            />
                                        </View>
                                    ) : null}
                                </TouchableOpacity>
                            </View>

                            <View style={styles.textDirection}>
                                {/* Cheque section */}
                                <TouchableOpacity
                                    style={
                                        cardOrCash === "Cheque"
                                            ? styles.cardContainerBorder
                                            : styles.cardContainer
                                    }
                                    onPress={() => {
                                        setCardOrCash("Cheque")
                                        setErr(false)
                                    }}
                                >
                                    <View style={styles.cardImage}>
                                        <Image
                                            resizeMode="contain"
                                            style={styles.image}
                                            source={require("../../../assets/Remindably/cashImage.png")}
                                        />
                                    </View>

                                    <Text style={styles.cardText}>Cheque</Text>
                                    {cardOrCash === "Cheque" ? (
                                        <View style={styles.checkedImage}>
                                            <Image
                                                resizeMode="contain"
                                                style={styles.image}
                                                source={require("../../../assets/Remindably/CheckedIcon.png")}
                                            />
                                        </View>
                                    ) : null}
                                </TouchableOpacity>

                                {/* EFT section  */}
                                <TouchableOpacity
                                    style={
                                        cardOrCash === "EFT"
                                            ? styles.cardContainerBorder
                                            : styles.cardContainer
                                    }
                                    onPress={() => {
                                        setCardOrCash("EFT")
                                        setChequeNumber("")
                                        setErr(false)
                                    }}
                                >
                                    <View style={styles.cardImage}>
                                        <Image
                                            resizeMode="contain"
                                            style={styles.image}
                                            source={require("../../../assets/Remindably/cardImage.png")}
                                        />
                                    </View>

                                    <Text style={styles.cardText}>EFT</Text>
                                    {cardOrCash === "EFT" ? (
                                        <View style={styles.checkedImage}>
                                            <Image
                                                resizeMode="contain"
                                                style={styles.image}
                                                source={require("../../../assets/Remindably/CheckedIcon.png")}
                                            />
                                        </View>
                                    ) : null}
                                </TouchableOpacity>
                            </View>

                            {/* add from previous details or add new option for card  */}
                            {cardOrCash === "Card" ? (
                                <>
                                    {/* add card section  */}
                                    <View style={styles.textDirection}>
                                        <Text style={styles.labelText}>Select</Text>
                                        <TouchableOpacity
                                            onPress={() => {
                                                setAddCardModal(true)
                                            }}
                                        >
                                            <Text style={styles.addEditText}>Add New Card</Text>
                                        </TouchableOpacity>
                                    </View>

                                    {/* card name section with radio button  */}
                                    {savedCards?.length >= 0 ? (
                                        <View>
                                            <FlatList
                                                data={savedCards}
                                                horizontal
                                                showsHorizontalScrollIndicator={false}
                                                renderItem={renderAllCards}
                                                keyExtractor={(item, index) => String(index)}
                                            />
                                        </View>
                                    ) : null}

                                    {err ? (
                                        <Text style={styles.errorMessage}>
                                            *Please select card.
                                        </Text>
                                    ) : null}
                                </>
                            ) : cardOrCash === "Cheque" ? (
                                <>
                                    {/* add from previous details or add new option for cheque  */}
                                    <View style={styles.textDirection}>
                                        <Text style={styles.labelText}>Select</Text>
                                        <TouchableOpacity
                                            onPress={() => {
                                                setAddChequeModal(true)
                                            }}
                                        >
                                            <Text style={styles.addEditText}>Add New Cheque</Text>
                                        </TouchableOpacity>
                                    </View>

                                    {/* cheque name section with radio button  */}
                                    {savedCheque?.length >= 0 ? (
                                        <View>
                                            <FlatList
                                                data={savedCheque}
                                                horizontal
                                                showsHorizontalScrollIndicator={false}
                                                renderItem={renderAllCheque}
                                                keyExtractor={(item, index) => String(index)}
                                            />
                                        </View>
                                    ) : null}

                                    {err ? (
                                        <Text style={styles.errorMessage}>
                                            *Please select cheque.
                                        </Text>
                                    ) : null}
                                </>
                            ) : cardOrCash === "EFT" ? (
                                <>
                                    {/* add from previous details or add new option for EFT  */}
                                    <View style={styles.textDirection}>
                                        <Text style={styles.labelText}>Select</Text>
                                        <TouchableOpacity
                                            onPress={() => {
                                                setAddEftModal(true)
                                            }}
                                        >
                                            <Text style={styles.addEditText}>Add New EFT</Text>
                                        </TouchableOpacity>
                                    </View>

                                    {/* EFT section with radio button  */}
                                    {savedEft?.length >= 0 ? (
                                        <View>
                                            <FlatList
                                                data={savedEft}
                                                horizontal
                                                showsHorizontalScrollIndicator={false}
                                                renderItem={renderAllEft}
                                                keyExtractor={(item, index) => String(index)}
                                            />
                                        </View>
                                    ) : null}

                                    {err ? (
                                        <Text style={styles.errorMessage}>
                                            *Please select EFT details.
                                        </Text>
                                    ) : null}
                                </>
                            ) : null}

                            {/* button with loader  */}
                            <TouchableOpacity style={styles.buttonContainer} onPress={() => { onSubmit() }}>
                                <SubmitButton
                                    loader={loader}
                                    // submitButton={handleSubmit}
                                    buttonText={"Create"}
                                />
                            </TouchableOpacity>
                        </ScrollView>

                        {/* add card modal */}
                        <AddCardModal
                            visibleModal={addCardModal}
                            onClose={() => {
                                setAddCardModal(false)
                            }}
                            onSubmitClick={handleAddCardSubmitClick}
                        />

                        {/* add cheque modal */}
                        <AddChequeModal
                            visibleModal={addChequeModal}
                            onClose={() => {
                                setAddChequeModal(false)
                            }}
                            onSubmitClick={handleAddChequeSubmitClick}
                        />

                        {/* add EFT modal */}
                        <AddEftModal
                            visibleModal={addEftModal}
                            onClose={() => {
                                setAddEftModal(false)
                            }}
                            onSubmitClick={handleAddEftSubmitClick}
                        />

                        {/* Camera Gallery Modal  */}
                        <CameraGalleryModal
                            visibleModal={cameraGalleryModal}
                            onClose={() => {
                                setCameraGalleryModal(false)
                            }}
                            cameraClick={openCamera}
                            galleryClick={openLibrary}
                        />

                        {/* Calender modal */}
                        <CalendarModal
                            visibleModal={calendarModal}
                            onClose={() => {
                                setCalendarModal(false)
                            }}
                            onSubmitClick={handleCalendarSubmitClick}
                        />

                        {/* toaster message for error response from API  */}
                        {/* <CommonToast ref={toastRef} /> */}
                    </View>
                    {/* )} */}
                </View>
            </KeyboardAwareScrollView>
        </KeyboardAvoidingView>
    )
}

export default AddExpense

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    body: {
        flex: 1,
        padding: 10,
        paddingBottom: 40
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
    addEditText: {
        color: Mycolors.THEME_ORANGE,
        fontSize: 14,
        fontWeight: "500"
    },
    cardContainer: {
        alignItems: "center",
        backgroundColor: Mycolors.WHITE,
        borderRadius: 15,
        flexDirection: "row",
        height: 60,
        padding: 3,
        width: "48%"
    },
    cardContainerBorder: {
        alignItems: "center",
        backgroundColor: Mycolors.WHITE,
        borderColor: Mycolors.THEME_ORANGE,
        borderRadius: 15,
        borderWidth: 2,
        flexDirection: "row",
        height: 60,
        padding: 3,
        width: "48%"
    },
    cardImage: {
        borderRadius: 50,
        height: 40,
        marginHorizontal: 10,
        width: 40
    },
    image: {
        height: "100%",
        width: "100%"
    },
    cardText: {
        color: Mycolors.THEME_BLACK,
        fontSize: 16,
        fontWeight: "500"
    },
    checkedImage: {
        borderRadius: 50,
        height: 30,
        position: "absolute",
        right: 10,
        width: 30,
        zIndex: 1
    },
    textInput: {
        backgroundColor: Mycolors.WHITE,
        borderColor: Mycolors.brightGray,
        borderRadius: 10,
        borderWidth: 2,
        color: Mycolors.THEME_BLACK,
        fontSize: 16,
        padding: 15
    },
    descriptionInput: {
        backgroundColor: Mycolors.WHITE,
        borderColor: Mycolors.brightGray,
        borderRadius: 10,
        borderWidth: 2,
        color: Mycolors.THEME_BLACK,
        fontSize: 16,
        height: 100,
        padding: 12
    },
    errorMessage: {
        color: Mycolors.RED,
        fontSize: 14,
        paddingHorizontal: 10
    },
    calendarDateContainer: {
        backgroundColor: Mycolors.WHITE,
        borderColor: Mycolors.brightGray,
        borderRadius: 10,
        borderWidth: 2,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 5,
        paddingVertical: 2
    },
    calendarIcon: {
        alignItems: "center",
        alignSelf: "center",
        height: 25,
        justifyContent: "center",
        width: 25
    },
    uploadMediaContainer: {
        alignItems: "center",
        backgroundColor: Mycolors.WHITE,
        borderColor: Mycolors.THEME_ORANGE,
        borderRadius: 50,
        borderStyle: "dotted",
        borderWidth: 2,
        flexDirection: "row",
        height: 60,
        justifyContent: "center"
    },
    uploadImageStyle: {
        height: 30,
        paddingHorizontal: 25,
        width: 30
    },
    uploadMediaText: {
        color: Mycolors.THEME_BLACK,
        fontSize: 14,
        fontWeight: "400"
    },
    monthDirection: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
        width: "50%"
    },
    buttonContainer: { marginVertical: 20 },
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
    radioDirection: {
        alignItems: "center",
        flexDirection: "row"
    },
    cardName: {
        color: Mycolors.THEME_BLACK,
        fontSize: 14,
        fontWeight: "400",
        marginHorizontal: 5
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
    }
})
