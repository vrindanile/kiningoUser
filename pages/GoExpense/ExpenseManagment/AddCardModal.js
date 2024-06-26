// external imports
import {
    Image,
    Keyboard,
    KeyboardAvoidingView,
    Modal,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native"
import React, { useState } from "react"
// import { Formik } from "formik"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
// internal imports
import SubmitButton from "../Constants/SubmitButton"
// import { card } from "../../constants/SchemaValidation"
import { Mycolors } from "../../../utility/Mycolors"

const AddCardModal = ({ onClose, onSubmitClick, visibleModal }) => {
    const [cardName, setCardName] = useState('')
    // function for submit button click
    const onSubmit = () => {
        Keyboard.dismiss()
        onSubmitClick(cardName)
    }

    const initialValues = {
        cardName: ""
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <KeyboardAwareScrollView
                showsVerticalScrollIndicator={false}
                style={styles.body}
            >
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={visibleModal}
                    onRequestClose={() => {
                        onClose()
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalViewGroup}>

                            {/* cross button section  */}
                            <View>
                                <TouchableOpacity
                                    style={styles.crossContainer}
                                    onPress={() => {
                                        onClose()
                                    }}
                                >
                                    <Image
                                        style={styles.image}
                                        resizeMode="contain"
                                        source={require("../../../assets/Remindably/cross.png")}
                                    />
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.cardLabel}>Add Card</Text>

                            <TextInput
                                placeholder="Enter bank card name"
                                placeholderTextColor={Mycolors.textGray}
                                style={[styles.textInput, { marginVertical: 18 }]}
                                value={cardName}
                                onChangeText={(text) => setCardName(text)}
                            // value={values.cardName}
                            // onChangeText={handleChange("cardName")}
                            // onBlur={() => {
                            //     handleBlur("cardName")
                            //     setFieldTouched("cardName")
                            // }}
                            />
                            {/* <Text style={styles.errorMessage}>
                                    {touched.cardName && errors.cardName}
                                </Text> */}

                            {/*save button section */}
                            <TouchableOpacity onPress={() => { onSubmit() }} style={{ marginBottom: 20 }}>
                                <SubmitButton
                                    buttonText={"Add"}
                                // submitButton={() => {
                                //     handleSubmit()
                                // }}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    {/* )} */}

                </Modal>
            </KeyboardAwareScrollView>
        </KeyboardAvoidingView >
    )
}

export default AddCardModal

const styles = StyleSheet.create({
    container: { flex: 1 },
    body: { flex: 1, padding: 5 },
    centeredView: {
        backgroundColor: "rgba(0, 0, 0, 0.66)",
        flex: 1,
        justifyContent: "center"
    },
    modalViewEmailId: {
        backgroundColor: Mycolors.WHITE,
        borderRadius: 30,
        elevation: 5,
        padding: 20
    },
    cardLabel: {
        color: Mycolors.THEME_BLACK,
        fontSize: 22,
        fontWeight: "500",
        paddingVertical: 10,
        textAlign: "center"
    },
    crossContainer: {
        backgroundColor: Mycolors.THEME_ORANGE,
        borderRadius: 50,
        height: 30,
        position: "absolute",
        right: 15,
        top: 10,
        width: 30,
        zIndex: 1
    },
    image: {
        borderRadius: 50,
        height: "100%",
        width: "100%"
    },
    textInput: {
        backgroundColor: Mycolors.WHITE,
        borderColor: Mycolors.brightGray,
        borderRadius: 8,
        borderWidth: 2,
        color: Mycolors.THEME_BLACK,
        fontSize: 16,
        padding: 15
    },
    errorMessage: {
        color: Mycolors.RED,
        fontSize: 14,
        padding: 5
    },
    centeredView: {
        backgroundColor: "rgba(0, 0, 0, 0.66)",
        flex: 1,
        justifyContent: "center"
    },
    modalViewGroup: {
        backgroundColor: 'white',
        borderRadius: 30,
        paddingVertical: 20,
        paddingHorizontal: 20,
        margin: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
})
