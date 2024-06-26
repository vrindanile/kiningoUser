// external imports
import React from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
// internal imports
// import { colors } from "../../constants/ColorConstant"
import { Mycolors } from "../../../../utility/Mycolors"
const AddedTimeTab = ({ items }) => {
    console.log('my time tab', items);
    return (
        <View style={styles.timeContainer}>
            <TouchableOpacity style={styles.interestsTabBorder}>
                <Text style={styles.timeText}>{items.times}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default AddedTimeTab
const styles = StyleSheet.create({
    timeContainer: {
        backgroundColor: Mycolors.WHITE,
        borderRadius: 38,
        flexGrow: 1,
        marginRight: 3
    },
    interestsTabBorder: {
        alignItems: "center",
        borderColor: Mycolors.THEME_ORANGE,
        borderRadius: 38,
        borderWidth: 1,
        height: 26,
        justifyContent: "center",
        width: 75
    },
    timeText: {
        color: Mycolors.THEME_BLACK,
        fontSize: 14,
        fontWeight: "500",
        textAlign: "center"
    }
})
