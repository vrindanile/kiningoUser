// external import
import React from "react"
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native"
// internal imports
import { Mycolors } from "../../../utility/Mycolors"

const AddedSplitTab = ({ items, onViewClick }) => {
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => {
                onViewClick(items?.groupid)
            }}
        >
            <View style={styles.direction}>
                <Text style={styles.splitTitle}>{items?.name}</Text>
                <Text style={styles.dateText}>{items?.expense_date}</Text>
            </View>

            <View style={styles.direction}>
                <Text style={styles.amountText}>
                    ${items?.amount ? items?.amount : "0"}
                </Text>

                <Text style={styles.spendText}>{items?.settled}</Text>
            </View>
            <Text style={styles.spendText}>Spend</Text>

            {/* user profile section */}
            <View style={styles.imageDirection}>
                <View style={styles.imageContainer1}>
                    <Image
                        resizeMode="contain"
                        source={
                            items?.images
                                ? { uri: `${items?.images[0]?.memberimage}` }
                                : require("../../../assets/Remindably/avatar.png")
                        }
                        style={styles.profileImage}
                    />
                </View>

                <View style={styles.imageContainer2}>
                    <Image
                        resizeMode="contain"
                        source={
                            items?.images
                                ? { uri: `${items?.images[1]?.memberimage}` }
                                : require("../../../assets/Remindably/avatar.png")
                        }
                        style={styles.profileImage}
                    />
                </View>

                <View style={styles.imageContainer3}>
                    <Image
                        resizeMode="contain"
                        source={
                            items?.images
                                ? { uri: `${items?.images[2]?.memberimage}` }
                                : require("../../../assets/Remindably/avatar.png")
                        }
                        style={styles.profileImage}
                    />
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default AddedSplitTab
const styles = StyleSheet.create({
    container: {
        backgroundColor: Mycolors.WHITE,
        borderRadius: 15,
        elevation: 5,
        flex: 1,
        height: "auto",
        margin: 5,
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    direction: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    splitTitle: {
        color: Mycolors.THEME_BLACK,
        fontSize: 18,
        fontWeight: "400"
    },
    dateText: {
        color: Mycolors.textGray,
        fontSize: 14,
        fontWeight: "500"
    },
    amountText: { color: Mycolors.THEME_BLACK, fontSize: 18, fontWeight: "500" },
    spendText: {
        color: Mycolors.THEME_ORANGE,
        fontSize: 14,
        fontWeight: "500"
    },
    imageDirection: { flexDirection: "row", width: "25%", paddingVertical: 10 },
    imageContainer1: {
        backgroundColor: Mycolors.WHITE,
        borderRadius: 50,
        height: 35,
        width: 35
    },
    imageContainer2: {
        backgroundColor: Mycolors.WHITE,
        borderRadius: 50,
        height: 35,
        right: 15,
        width: 35,
        zIndex: 1
    },
    imageContainer3: {
        backgroundColor: Mycolors.WHITE,
        borderRadius: 50,
        height: 35,
        right: 30,
        width: 35,
        zIndex: 2
    },
    profileImage: {
        borderColor: Mycolors.lightGray,
        borderRadius: 50,
        borderWidth: 2,
        height: "100%",
        width: "100%"
    }
})
