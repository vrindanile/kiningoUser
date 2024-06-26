// external imports
import React from "react"
import { View, TouchableOpacity, Text, StyleSheet } from "react-native"
// internal imports
import { Mycolors } from "../../../utility/Mycolors"

const SavedCardExpanse = ({ handleSelectCard, items, selectedCard }) => {
    return (
        <>
            <TouchableOpacity
                style={styles.radioDirection}
                onPress={() => {
                    handleSelectCard(items)
                }}
            >
                <View
                    style={
                        items === selectedCard
                            ? styles.selectedRadio
                            : styles.unSelectedRadio
                    }
                >
                    <View
                        style={items === selectedCard ? styles.selectedRadioFill : null}
                    />
                </View>
                <Text style={styles.cardName}>{items}</Text>
            </TouchableOpacity>
        </>
    )
}

export default SavedCardExpanse

const styles = StyleSheet.create({
    radioDirection: {
        alignItems: "center",
        flexDirection: "row",
        marginRight: 20
    },
    unSelectedRadio: {
        alignItems: "center",
        borderColor: Mycolors.THEME_BLACK,
        borderRadius: 12,
        borderWidth: 2,
        height: 24,
        justifyContent: "center",
        marginHorizontal: 3,
        width: 24
    },
    selectedRadio: {
        alignItems: "center",
        borderColor: Mycolors.THEME_ORANGE,
        borderRadius: 12,
        borderWidth: 2,
        height: 24,
        justifyContent: "center",
        marginHorizontal: 3,
        width: 24
    },
    selectedRadioFill: {
        alignItems: "center",
        backgroundColor: Mycolors.THEME_ORANGE,
        borderColor: Mycolors.WHITE,
        borderRadius: 12,
        borderWidth: 2,
        height: 20,
        justifyContent: "center",
        marginHorizontal: 3,
        width: 20
    },
    cardName: {
        color: Mycolors.THEME_BLACK,
        fontSize: 14,
        fontWeight: "400",
        paddingHorizontal: 5
    }
})
