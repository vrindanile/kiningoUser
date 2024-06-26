//external imports
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native"
import React from "react"
//internal imports
// import { colors } from "../../constants/ColorConstant"
import { Mycolors } from "../../../../utility/Mycolors"
const GroupTab = ({ items, tabPress }) => {
    console.log('item from the group tab detail', items);
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => {
                tabPress(items?.title)
            }}
        >
            {/* image section */}
            <View style={styles.imageContainer}>
                {items?.title == "My Groups" ? (
                    <Image
                        style={styles.image}
                        resizeMode="contain"
                        source={require("../../../../assets/Remindably/expensesIcon.png")}
                    />
                ) : items?.title == "Shared Groups" ? (
                    <Image
                        style={styles.image}
                        resizeMode="contain"
                        source={require("../../../../assets/Remindably/expensesIcon.png")}
                    />
                ) : items?.title == "My Routines" ? (
                    <Image
                        style={styles.image}
                        resizeMode="contain"
                        source={require("../../../../assets/Remindably/routineIcon.png")}
                    />
                ) : items?.title == "Shared Routines" ? (
                    <Image
                        style={styles.image}
                        resizeMode="contain"
                        source={require("../../../../assets/Remindably/sharedRoutineIcon.png")}
                    />
                ) : <Image
                    style={styles.image}
                    resizeMode="contain"
                    source={require("../../../../assets/Remindably/expensesIcon.png")}
                />}
            </View>

            {/* count and title section */}
            <View style={styles.countTitleContainer}>
                <Text style={styles.countText}>{items?.groupcount}</Text>
                <Text style={styles.titleText}>{items?.title}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default GroupTab

const styles = StyleSheet.create({
    container: {
        backgroundColor: Mycolors.WHITE,
        borderRadius: 30,
        flex: 1,
        flexDirection: "row",
        height: 104,
        marginHorizontal: 8,
        marginVertical: 5,
        padding: 15,
        width: "105%"
    },
    imageContainer: {
        height: 46,
        marginTop: 6,
        width: 46
    },
    image: {
        height: "100%",
        width: "100%"
    },
    countTitleContainer: { marginLeft: 10 },
    countText: {
        color: Mycolors.THEME_ORANGE,
        fontSize: 35,
        fontWeight: "700"
    },
    titleText: {
        color: Mycolors.THEME_BLACK,
        fontSize: 12,
        fontWeight: "400"
    }
})
