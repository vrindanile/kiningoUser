// external imports
import {
    Image,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native"
import React, { useEffect, useState } from "react"
// internal imports
import SubmitButton from "../Constants/SubmitButton"
import { Mycolors } from "../../../utility/Mycolors"

const SettleSplitBillCompleteModal = ({
    onClose,
    onSubmitClick,
    settleAmount,
    visibleModal
}) => {
    const [loader, setLoader] = useState(false)

    useEffect(() => { }, [visibleModal])

    const onSubmit = () => {
        setLoader(true)
        setLoader(false)
        onSubmitClick()
    }

    return (
        <View style={styles.container}>
            <Modal
                animationType="fade"
                transparent={true}
                visible={visibleModal}
                onRequestClose={() => {
                    onClose()
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalViewEmailId}>
                        {/* cross button section  */}
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

                        <Text style={styles.heading}>Settle Up Bill</Text>
                        <View style={styles.imageContainer}>
                            <Image
                                resizeMode="contain"
                                style={styles.image}
                                source={require("../../../assets/Remindably/settlebillimage.png")}
                            />
                        </View>

                        <Text style={styles.subHeading}>Amount Due to settle</Text>
                        <Text style={styles.amountText}>${settleAmount}</Text>

                        {/* button section */}
                        <TouchableOpacity style={styles.buttonContainer} onPress={() => { onSubmit() }}>
                            <SubmitButton
                                buttonText={"Settle Bill"}
                                loader={loader}
                                submitButton={() => onSubmit()}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default SettleSplitBillCompleteModal

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    centeredView: {
        backgroundColor: "rgba(0, 0, 0, 0.66)",
        flex: 1,
        justifyContent: "flex-end"
    },
    modalViewEmailId: {
        backgroundColor: Mycolors.WHITE,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 20
    },
    crossContainer: {
        backgroundColor: Mycolors.THEME_ORANGE,
        borderRadius: 50,
        height: 30,
        position: "absolute",
        right: 10,
        top: 10,
        width: 30,
        zIndex: 1
    },
    heading: {
        alignSelf: "center",
        color: Mycolors.BLACK,
        fontSize: 25,
        fontWeight: "400"
    },
    image: {
        borderRadius: 50,
        height: "100%",
        width: "100%"
    },
    imageContainer: {
        alignSelf: "center",
        height: 320,
        justifyContent: "center",
        marginBottom: 10,
        width: 230
    },
    subHeading: {
        alignSelf: "center",
        color: Mycolors.THEME_BLACK,
        fontSize: 14,
        fontWeight: "500"
    },
    amountText: {
        alignSelf: "center",
        color: Mycolors.THEME_BLACK,
        fontSize: 18,
        fontWeight: "500",
        padding: 10
    },
    buttonContainer: {
        marginVertical: 10
    }
})
