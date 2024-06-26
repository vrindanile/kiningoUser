// external imports
import * as Progress from "react-native-progress"
import React from "react"
import { View, Text, StyleSheet } from "react-native"
// internal imports
import { Mycolors } from "../../../utility/Mycolors"

const SplitDetailsProcess = ({ items, totalAmount }) => {
    let percent = (items?.monthlyamount * 100) / totalAmount
    const percentValue = parseInt(percent.toString().split(".")[0], 10)
    const totalPercent = percentValue / 100

    return (
        <View style={styles.container}>
            <Text style={styles.monthText}>{items?.month}</Text>
            <View>
                <Progress.Bar
                    progress={totalPercent}
                    width={240}
                    color={Mycolors.THEME_ORANGE}
                />
            </View>
            <View>
                <Text style={styles.amountText}>$ {items?.monthlyamount}</Text>
            </View>
        </View>
    )
}

export default SplitDetailsProcess

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 10
    },
    monthText: {
        color: Mycolors.THEME_BLACK,
        fontSize: 14,
        fontWeight: "500",
        paddingHorizontal: 5,
        width: 50
    },
    amountText: {
        color: Mycolors.THEME_BLACK,
        fontSize: 14,
        fontWeight: "500",
        paddingHorizontal: 5,
        width: 80
    }
})
