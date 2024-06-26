//external imports
import React from "react"
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native"
//internal imports
// import { colors } from "../../constants/ColorConstant"
import { Mycolors } from "../../../../utility/Mycolors"
const ShareRoutineModalTab = ({
    checked,
    checkedList,
    handleChecked,
    items
}) => {
    console.log('items for listing------>>>', items);
    return (
        <TouchableOpacity
            style={
                checkedList.includes(items.group_id)
                    ? checked
                        ? styles.selectedContainer
                        : styles.container
                    : styles.container
            }
            onPress={() => {
                handleChecked(items.group_id)
            }}
        >
            <View style={styles.direction}>
                <Text style={styles.titleText}>Group Name: </Text>
                <Text style={styles.nameText}>{items.name}</Text>
            </View>

            {/* checked circle section */}
            {checkedList.includes(items.group_id) ? (
                checked ? (
                    <View style={styles.imageContainer}>
                        <Image
                            resizeMode="contain"
                            style={styles.image}
                            source={require("../../../../assets/Remindably/CheckedIcon.png")}
                        />
                    </View>
                ) : null
            ) : null}
        </TouchableOpacity>
    )
}

export default ShareRoutineModalTab

const styles = StyleSheet.create({
    container: {
        backgroundColor: Mycolors.WHITE,
        borderColor: Mycolors.brightOrange,
        borderRadius: 15,
        borderStyle: "solid",
        borderWidth: 1,
        marginVertical: 5,
        padding: 15
    },
    selectedContainer: {
        backgroundColor: Mycolors.WHITE,
        borderColor: Mycolors.THEME_ORANGE,
        borderRadius: 15,
        borderStyle: "solid",
        borderWidth: 1,
        marginVertical: 5,
        padding: 15
    },
    direction: {
        flexDirection: "row"
    },
    titleText: {
        color: Mycolors.THEME_ORANGE,
        fontSize: 16,
        fontWeight: "500",
        paddingVertical: 5
    },
    nameText: {
        color: Mycolors.THEME_BLACK,
        fontSize: 16,
        fontWeight: "500",
        paddingVertical: 5,
        width: "70%"
    },
    imageContainer: {
        borderRadius: 50,
        height: 35,
        position: "absolute",
        right: 10,
        top: 10,
        width: 35
    },
    image: {
        borderRadius: 50,
        height: "100%",
        width: "100%"
    }
})
