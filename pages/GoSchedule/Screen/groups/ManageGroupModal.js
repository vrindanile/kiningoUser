//external imports
import {
    Image,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native"
import Clipboard from "@react-native-community/clipboard"
import React, { useEffect, useState } from "react"
import ToggleSwitch from "toggle-switch-react-native"
import Toast from 'react-native-toast-message'
//internal imports
import SubmitButton from "../../Constants/SubmitButton"
// import { colors } from "../../constants/ColorConstant"
import { Mycolors } from "../../../../utility/Mycolors"
const ManageGroupModal = ({
    groupId,
    isEditingEnabled,
    isGroupEnabled,
    onClose,
    onDeleteClick,
    onSubmitClick,
    visibleModal
}) => {
    console.log('my ediitiingg optionsssss------->>>>', isGroupEnabled);
    const [editingEnabled, setEditingEnabled] = useState(false)
    const [groupEnabled, setGroupEnabled] = useState(true)

    useEffect(() => {
        if (isGroupEnabled == 1) {
            setGroupEnabled(true)
        } else if (isGroupEnabled == 2) {
            setGroupEnabled(false)
        }

        if (isEditingEnabled == 1) {
            setEditingEnabled(true)
        } else if (isEditingEnabled == 2) {
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

                        <Text style={styles.groupLabel}>Manage Group</Text>

                        <View style={styles.direction}>
                            <Text style={styles.emailText}>Group ID:</Text>
                            <Text style={styles.emailText}>{groupId}</Text>

                            <TouchableOpacity
                                onPress={() => {
                                    Clipboard.setString(groupId?.toString())
                                }}
                            >
                                <Image
                                    resizeMode="contain"
                                    source={require("../../../../assets/Remindably/Copy.png")}
                                />
                            </TouchableOpacity>
                        </View>

                        {/* toggle section  */}
                        <View style={styles.toggleContainer}>
                            <Text style={styles.toggleText}>Turn On Group</Text>
                            <ToggleSwitch
                                isOn={groupEnabled}
                                onColor={Mycolors.lightOrange}
                                offColor={Mycolors.lightGray}
                                size="medium"
                                onToggle={() => setGroupEnabled(!groupEnabled)}
                            />
                        </View>

                        <View style={styles.toggleContainer}>
                            <Text style={styles.toggleText}>Disable Editing</Text>
                            <ToggleSwitch
                                isOn={editingEnabled}
                                onColor={Mycolors.lightOrange}
                                offColor={Mycolors.lightGray}
                                size="medium"
                                onToggle={() => setEditingEnabled(!editingEnabled)}
                            />
                        </View>

                        {/*save button section */}
                        <TouchableOpacity onPress={() => onSubmitClick(groupEnabled, editingEnabled)}>
                            <SubmitButton
                                buttonText={"Submit"}
                                submitButton={() => {
                                    onSubmitClick(groupEnabled, editingEnabled)
                                }}
                            />
                        </TouchableOpacity>
                        {/*Cancel button section  */}
                        <TouchableOpacity
                            style={styles.cancelContainer}
                            onPress={() => {
                                onDeleteClick()
                            }}
                        >
                            <Image
                                resizeMode="contain"
                                source={require("../../../../assets/Remindably/Trash.png")}
                            />
                            <Text style={styles.cancelText}>Delete Group</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default ManageGroupModal

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
    direction: {
        flexDirection: "row",
        paddingBottom: 10
    },
    emailText: {
        color: Mycolors.THEME_BLACK,
        fontSize: 16,
        paddingRight: 4
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
    cancelContainer: {
        alignItems: "center",
        alignSelf: "center",
        flexDirection: "row",
        height: 60,
        justifyContent: "center"
    },
    cancelText: {
        color: Mycolors.RED,
        fontSize: 16,
        fontWeight: "bold",
        paddingLeft: 8
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
