//external imports
import React from "react"
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native"
//internal imports
// import { colors } from "../../constants/ColorConstant"
import { Mycolors } from "../../../../utility/Mycolors"
const Days = ({ checked, checkedList, handleChecked, item }) => {
    return (
        <View style={styles.selectDaysContainer}>
            <TouchableOpacity
                style={
                    checkedList.includes(item.value)
                        ? checked
                            ? styles.interestsTabBorder
                            : styles.interestsTab
                        : styles.interestsTab
                }
                onPress={() => {
                    handleChecked(item.value)
                }}
            >
                {checkedList.includes(item.value) ? (
                    checked ? (
                        <Image
                            style={styles.checkedIcon}
                            resizeMode="contain"
                            source={require("../../../../assets/Remindably/checked.png")}
                        />
                    ) : null
                ) : null}

                <Text
                    style={
                        checkedList.includes(item.value)
                            ? checked
                                ? styles.interestsTabTitle
                                : styles.interestsTitle
                            : styles.interestsTitle
                    }
                >
                    {item.days}
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default Days

const styles = StyleSheet.create({
    selectDaysContainer: {
        backgroundColor: Mycolors.WHITE,
        borderRadius: 10,
        flexDirection: "row",
        height: 60,
        justifyContent: "space-between",
        margin: 5
    },
    interestsTab: {
        alignItems: "center",
        borderColor: Mycolors.GRAY,
        borderRadius: 10,
        borderWidth: 2,
        height: 60,
        justifyContent: "center",
        width: 65
    },
    interestsTabBorder: {
        alignItems: "center",
        borderColor: Mycolors.THEME_ORANGE,
        borderRadius: 10,
        borderWidth: 2,
        height: 60,
        justifyContent: "center",
        width: 65
    },
    checkedIcon: {
        position: "absolute",
        right: 5,
        top: 5,
        zIndex: 1
    },
    interestsTabTitle: {
        color: Mycolors.THEME_ORANGE,
        fontSize: 16,
        fontWeight: "500"
    },
    interestsTitle: {
        color: Mycolors.THEME_BLACK,
        fontSize: 16,
        fontWeight: "500"
    }
})
