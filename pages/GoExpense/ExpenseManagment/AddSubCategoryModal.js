//external imports
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
import React, { useEffect, useRef, useState } from "react"
import Toast from 'react-native-toast-message'
import { get_gropus, requestGetApi, add_category, requestPostApiMedia, requestPostApi, requestPostApiImages, add_subcategory } from '../../../WebApi/Service'
import { useSelector, useDispatch } from 'react-redux';
// import { Formik } from "formik"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
//internal imports
// import ExpensesManagementService from "../../service/ExpensesManagementService"
import SubmitButton from "../Constants/SubmitButton"
// import { categoryValidation } from "../../constants/SchemaValidation"
import { Mycolors } from "../../../utility/Mycolors"

const AddSubCategoryModal = ({
    categoryId,
    onClose,
    onSubmitClick,
    visibleModal
}) => {
    const User = useSelector(state => state.user.user_details)
    const [categoryName, setCategoryName] = useState('')
    // function for submit button click for api call to add sub category
    useEffect(() => {

        setCategoryName('')
    }, [visibleModal])
    const onSubmit = async () => {
        Keyboard.dismiss()
        console.log('subcategory');
        const data = {
            name: categoryName,
            categoryid: categoryId
        }
        if (!categoryName) {
            Toast.show({ text1: 'Enter sub category name' });
            return
        }
        console.log('my dat for new subcommet---->>>', data);
        const { responseJson, err } = await requestPostApi(add_subcategory, data, 'POST', User.token)
        console.log('response sub add category------>>', responseJson);
        if (responseJson.headers.success) {
            onSubmitClick(responseJson.body.subcategoryid)
        }
        else {
            console.log('there is error in adding sub category');
        }
    }

    const initialValues = {
        name: ""
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
                        <View style={[styles.modalViewGroup]}>
                            {/* cross button section  */}
                            <View style={{ marginBottom: 12, width: '100%', marginBottom: 22, }}>
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

                                <Text style={styles.cardLabel}>Add new sub category</Text>
                            </View>

                            {/* name section */}
                            <TextInput
                                placeholder="Enter sub category name"
                                placeholderTextColor={Mycolors.textGray}
                                style={[styles.textInput, { marginBottom: 20 }]} value={categoryName}
                                onChangeText={(text) => setCategoryName(text)}
                            // value={values.name}
                            // onChangeText={handleChange("name")}
                            // onBlur={() => {
                            //     handleBlur("name")
                            //     setFieldTouched("name")
                            // }}
                            />
                            {/* <Text style={styles.errorMessage}>
                                    {touched.name && errors.name}
                                </Text> */}

                            {/*save button section */}
                            <TouchableOpacity onPress={() => onSubmit()} style={{ marginBottom: 20 }}>
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

export default AddSubCategoryModal

const styles = StyleSheet.create({
    container: { flex: 1 },
    body: {
        flex: 1,
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
        paddingVertical: 40,
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
    }
})
