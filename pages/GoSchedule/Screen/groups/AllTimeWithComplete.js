//external imports
import React from "react"
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native"
// internal imports
// import { colors } from "../../constants/ColorConstant"
import { Mycolors } from "../../../../utility/Mycolors"
const AllTimeWithComplete = ({
    handleMarkComplete,
    handleMarkInComplete,
    items
}) => {
    console.log('handleMarkComplete', items);
    return (
        <View style={styles.timeContainer}>
            {items?.completestatus !== "Completed" ? (
                <View style={styles.interestsTab}>
                    <Text style={styles.timeText}>{items?.times}</Text>
                    <TouchableOpacity
                        style={styles.checkMarkContainer}
                        onPress={() => {
                            handleMarkComplete(items.timevalue)
                        }}
                    >
                        <Image
                            style={styles.imageStyle}
                            resizeMode="contain"
                            source={require("../../../../assets/Remindably/redCircle.png")}
                        />
                    </TouchableOpacity>
                </View>
            ) : (
                <View style={styles.interestsTab}>
                    <Text style={styles.timeText}>{items?.times}</Text>
                    <TouchableOpacity
                        style={styles.checkMarkContainer}
                        onPress={() => {
                            handleMarkInComplete(items.timevalue)
                        }}
                    >
                        <Image
                            style={styles.imageStyle}
                            resizeMode="contain"
                            source={require("../../../../assets/Remindably/CheckCircle.png")}
                        />
                    </TouchableOpacity>
                </View>
            )}
        </View>
    )
}

export default AllTimeWithComplete
const styles = StyleSheet.create({
    timeContainer: {
        backgroundColor: Mycolors.WHITE,
        borderRadius: 38,
        margin: 3,
        width: 120
    },
    interestsTab: {
        alignItems: "center",
        backgroundColor: Mycolors.WHITE,
        borderColor: Mycolors.THEME_ORANGE,
        borderRadius: 38,
        borderWidth: 2,
        flexDirection: "row",
        height: 35,
        justifyContent: "space-between",
        paddingHorizontal: 10,
        width: 110
    },
    timeText: {
        color: Mycolors.THEME_BLACK,
        fontSize: 12,
        fontWeight: "500",
        textAlign: "center"
    },
    checkMarkContainer: {
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
