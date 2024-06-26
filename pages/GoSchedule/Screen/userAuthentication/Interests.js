//external imports
import React from "react"
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native"
//internal imports
// import { colors } from "../../constants/ColorConstant"
import { Mycolors } from "../../../../utility/Mycolors"

const Interests = ({ checked, checkedList, handleChecked, interests }) => {
    return (
        <View style={styles.interestsContainer}>
            <TouchableOpacity
                style={
                    checkedList?.includes(interests?.id)
                        ? checked
                            ? styles.interestsTabBorder
                            : styles.interestsTab
                        : styles.interestsTab
                }
                onPress={() => {
                    handleChecked(interests?.id, interests)
                }}
            >
                {checkedList?.includes(interests?.id) ? (
                    checked ? (
                        <Image
                            style={styles.checkedIcon}
                            resizeMode="contain"
                            source={require("../../../../assets/Remindably/checked.png")}
                        />
                    ) : null
                ) : null}
                <Image
                    style={styles.image}
                    resizeMode="contain"
                    source={{ uri: `${interests?.icon}` }}
                />
                <Text style={styles.interestsLabel}>{interests?.name}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Interests

const styles = StyleSheet.create({
    interestsContainer: {
        backgroundColor: Mycolors.WHITE,
        borderRadius: 20,
        flexDirection: "row",
        height: 105,
        justifyContent: "space-between",
        margin: 5
    },
    interestsTab: {
        alignItems: "center",
        borderColor: Mycolors.WHITE,
        borderRadius: 20,
        borderWidth: 2,
        height: 105,
        justifyContent: "center",
        width: 105
    },
    interestsTabBorder: {
        alignItems: "center",
        borderColor: Mycolors.THEME_ORANGE,
        borderRadius: 20,
        borderWidth: 2,
        height: 105,
        justifyContent: "center",
        width: 105
    },
    interestsLabel: {
        color: Mycolors.BLACK
    },
    checkedIcon: {
        position: "absolute",
        right: 5,
        top: 5,
        zIndex: 1
    },
    image: { height: 40, width: 40 }
})
