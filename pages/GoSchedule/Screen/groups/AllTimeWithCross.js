//external imports
import React from "react"
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native"
//internal imports
// import { colors } from "../../constants/ColorConstant"
import { Mycolors } from "../../../../utility/Mycolors"
const AllTimeWithCross = ({ handleChecked, items }) => {
    return (
        <View style={styles.timeContainer}>
            <View style={styles.interestsTab}>
                <Text style={styles.timeText}>{items}</Text>

                {/* cross section */}
                <TouchableOpacity
                    style={styles.crossContainer}
                    onPress={() => {
                        handleChecked(items)
                    }}
                >
                    <Image
                        style={styles.imageStyle}
                        resizeMode="contain"
                        source={require("../../../../assets/Remindably/cross.png")}
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default AllTimeWithCross
const styles = StyleSheet.create({
    timeContainer: {
        backgroundColor: Mycolors.WHITE,
        borderRadius: 38,
        margin: 3,
        width: 105
    },
    interestsTab: {
        alignItems: "center",
        backgroundColor: Mycolors.WHITE,
        borderColor: Mycolors.THEME_ORANGE,
        borderRadius: 38,
        borderWidth: 2,
        flexDirection: "row",
        height: 32,
        justifyContent: "space-between",
        paddingHorizontal: 5,
        width: 105
    },
    timeText: {
        color: Mycolors.THEME_BLACK,
        fontSize: 14,
        fontWeight: "500",
        textAlign: "center"
    },
    crossContainer: {
        backgroundColor: Mycolors.THEME_ORANGE,
        borderRadius: 50,
        height: 25,
        width: 25,
        zIndex: 1
    },
    imageStyle: {
        borderRadius: 10,
        height: "100%",
        width: "100%"
    }
})
