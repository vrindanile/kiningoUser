//external imports
import React from "react"
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native"
//internal imports
import { Mycolors } from "../../../utility/Mycolors"

const AllCategoryTab = ({
    checked,
    checkedList,
    handleChecked,
    handleDelete,
    item,
    myUserId
}) => {
    return (
        <View style={styles.interestsContainer}>
            <TouchableOpacity
                style={
                    checkedList.includes(item.id)
                        ? checked
                            ? styles.interestsTabBorder
                            : styles.interestsTab
                        : styles.interestsTab
                }
                onPress={() => {
                    handleChecked(item.id)
                }}
            >
                {checkedList.includes(item.id) ? (
                    checked ? (
                        <Image
                            style={styles.checkedIcon}
                            resizeMode="contain"
                            source={require("../../../assets/Remindably/checked.png")}
                        />
                    ) : null
                ) : null}

                {/* category image section  */}
                <View style={styles.categoryContainer}>
                    <Image
                        resizeMode="contain"
                        source={
                            item?.categoryimage
                                ? { uri: `${item?.categoryimage}` }
                                : require("../../../assets/Remindably/avatar.png")
                        }
                        style={styles.categoryImage}
                    />
                </View>
                {/* user name section */}
                <Text style={styles.categoryLabel}>{item?.categoryname}</Text>
            </TouchableOpacity>

            {/* delete icon based on user id  */}
            {item?.created_user_type !== 3 ? (
                <TouchableOpacity
                    style={styles.editContainer}
                    onPress={() => {
                        handleDelete(item.id)
                    }}
                >
                    <Image
                        resizeMode="contain"
                        source={require("../../../assets/Remindably/Trash.png")}
                    />
                </TouchableOpacity>
            ) : null}
        </View>
    )
}

export default AllCategoryTab

const styles = StyleSheet.create({
    interestsContainer: {
        backgroundColor: Mycolors.WHITE,
        borderRadius: 20,
        flexDirection: "row",
        height: 105,
        margin: 5
    },
    interestsTab: {
        alignItems: "center",
        borderColor: Mycolors.brightGray,
        borderRadius: 20,
        borderWidth: 2,
        height: 105,
        justifyContent: "flex-start",
        paddingVertical: 10,
        width: 105
    },
    interestsTabBorder: {
        alignItems: "center",
        borderColor: Mycolors.THEME_ORANGE,
        borderRadius: 20,
        borderWidth: 2,
        height: 105,
        justifyContent: "flex-start",
        paddingVertical: 10,
        width: 105
    },
    checkedIcon: {
        left: 5,
        position: "absolute",
        top: 5,
        zIndex: 1
    },
    categoryContainer: {
        backgroundColor: Mycolors.WHITE,
        borderRadius: 50,
        height: 45,
        width: 45
    },
    categoryImage: {
        borderRadius: 50,
        height: "100%",
        width: "100%"
    },
    categoryLabel: {
        color: Mycolors.BLACK,
        fontSize: 16,
        textAlign: "center"
    },
    editContainer: {
        alignItems: "center",
        borderRadius: 50,
        justifyContent: "center",
        marginHorizontal: 3,
        padding: 3,
        position: "absolute",
        right: 0,
        zIndex: 1
    }
})
