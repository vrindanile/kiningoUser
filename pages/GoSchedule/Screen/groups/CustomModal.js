//external imports
import {
    FlatList,
    Image,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native"
import Days from "./Days"
import React, { useEffect, useState } from "react"
//internal imports
import SubmitButton from "../../Constants/SubmitButton"
// import { colors } from "../../constants/ColorConstant"
import { Mycolors } from "../../../../utility/Mycolors"
const CustomModal = ({ daysList, onClose, onSubmitClick, visibleModal }) => {
    { console.log('my weekdays from the aapi----->', daysList) }
    const [arrayList, setArrayList] = useState([])
    const [checked, setChecked] = useState(true)

    useEffect(() => {
        // if (daysList?.length >= 1) {
        //     setArrayList(daysList)
        // }
    }, [visibleModal])

    const WEEKDAYS = [
        { id: 1, days: "M", value: "M" },
        { id: 2, days: "T", value: "T" },
        { id: 3, days: "W", value: "W" },
        { id: 4, days: "Th", value: "TH" },
        { id: 5, days: "F", value: "F" },
        { id: 6, days: "Sa", value: "SA" },
        { id: 7, days: "Su", value: "SU" }
    ]

    // list for custom days
    const renderDays = ({ item }) => {
        console.log('render daays------>>>', item);
        return (
            <Days
                item={item}
                handleChecked={handleChecked}
                checked={checked}
                checkedList={arrayList}
            />

        )
    }

    // function on select days
    const handleChecked = selectedId => {
        setChecked(true)
        if (arrayList.includes(selectedId)) {
            setArrayList(arrayList.filter(ids => ids !== selectedId))
        } else {
            setArrayList([...arrayList, selectedId])
        }
    }

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
                    <View style={styles.modalViewCustom}>
                        <Text style={styles.customText}>Custom</Text>
                        {/* days list  */}
                        <View style={styles.daysContainer}>
                            <FlatList
                                data={WEEKDAYS}
                                renderItem={renderDays}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                keyExtractor={(item, index) => String(index)}
                            />
                        </View>

                        {/*save button  */}
                        <TouchableOpacity
                            onPress={() => { onSubmitClick(arrayList) }}
                        >
                            <SubmitButton
                                buttonText={"Ok"}
                                submitButton={() => {
                                    onSubmitClick(arrayList)
                                }}
                            />
                        </TouchableOpacity>
                        {/*Cancel section  */}
                        <TouchableOpacity
                            style={styles.cancelContainer}
                            onPress={() => {
                                onClose()
                            }}
                        >
                            <Image
                                resizeMode="contain"
                                source={require("../../../../assets/Remindably/Trash.png")}
                            />
                            <Text style={styles.cancelText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>

    )
}

export default CustomModal

const styles = StyleSheet.create({
    centeredView: {
        backgroundColor: "rgba(0, 0, 0, 0.66)",
        flex: 1,
        justifyContent: "flex-end"
    },
    modalViewCustom: {
        backgroundColor: Mycolors.WHITE,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        paddingHorizontal: 30,
        paddingVertical: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    customText: {
        color: Mycolors.THEME_BLACK,
        fontSize: 22,
        paddingVertical: 15
    },
    daysContainer: {
        height: 100,
        justifyContent: "center"
    },
    cancelContainer: {
        alignItems: "center",
        alignSelf: "center",
        flexDirection: "row",
        height: 50,
        justifyContent: "center"
    },
    cancelText: {
        color: Mycolors.RED,
        fontSize: 16,
        fontWeight: "bold",
        paddingLeft: 8
    }
})
