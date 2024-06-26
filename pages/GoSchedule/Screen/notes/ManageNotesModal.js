//external imports
import {
    Image,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native"
import React, { useEffect, useState } from "react"
import ToggleSwitch from "toggle-switch-react-native"
// internal imports
import SubmitButton from "../../Constants/SubmitButton"
// import { colors } from "../../constants/ColorConstant"
import { Mycolors } from "../../../../utility/Mycolors"
const ManageNotesModal = ({
    isEditingEnabled,
    onClose,
    onSubmitClick,
    visibleModal
}) => {
    const [editingEnabled, setEditingEnabled] = useState(false)

    useEffect(() => {
        console.log('my  edit new updated----->>>>')
        if (isEditingEnabled == "true") {
            setEditingEnabled(true)
        } else if (isEditingEnabled == "false") {
            setEditingEnabled(false)
        }
    }, [visibleModal])

    return (
        <View>
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
                                source={require("../../../../assets/Remindably/cross.png")}
                            />
                        </TouchableOpacity>

                        <Text style={styles.groupLabel}>Manage Note</Text>

                        {/* toggle section  */}
                        <View style={styles.toggleContainer}>
                            <Text style={styles.toggleText}>Enable Editing</Text>
                            <ToggleSwitch
                                isOn={editingEnabled}
                                onColor={Mycolors.lightOrange}
                                offColor={Mycolors.lightGray}
                                size="medium"
                                onToggle={() => setEditingEnabled(!editingEnabled)}
                            />
                        </View>

                        {/*save button section */}
                        <SubmitButton
                            buttonText={"Submit"}
                            submitButton={() => {
                                onSubmitClick(editingEnabled)
                            }}
                        />
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default ManageNotesModal

const styles = StyleSheet.create({
    centeredView: {
        backgroundColor: "rgba(0, 0, 0, 0.66)",
        flex: 1,
        justifyContent: "flex-end"
    },
    modalViewEmailId: {
        backgroundColor: Mycolors.WHITE,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        paddingHorizontal: 30,
        paddingVertical: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    groupLabel: {
        color: Mycolors.BLACK,
        fontSize: 22,
        paddingVertical: 10
    },
    toggleContainer: {
        backgroundColor: Mycolors.WHITE,
        borderColor: Mycolors.lightYellow,
        borderRadius: 8,
        borderWidth: 2,
        elevation: 20,
        flexDirection: "row",
        fontSize: 16,
        justifyContent: "space-between",
        marginBottom: 20,
        padding: 20,
        shadowColor: Mycolors.lightOrange,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1.0,
        shadowRadius: 10
    },
    toggleText: {
        color: Mycolors.BLACK,
        fontSize: 16
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
    }
})
