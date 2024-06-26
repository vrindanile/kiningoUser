
// external import
import React from "react"
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native"
// internal import
import { Mycolors } from "../../../utility/Mycolors"
import { useSelector, useDispatch } from 'react-redux';
const AllSubCategoryTab = ({
    checked,
    checkedList,
    handleChecked,
    handleDelete,
    items,
    myUserId
}) => {
    const User = useSelector(state => state.user.user_details)
    console.log('my user detsail-->>', User.userid);
    console.log(' items', items);
    return (
        <View style={styles.container}>
            <View style={styles.body}>
                <TouchableOpacity
                    onPress={() => {
                        handleChecked(items?.id)
                    }}
                >
                    <Text
                        style={
                            checkedList.includes(items?.id)
                                ? checked
                                    ? styles.interestsTabBorder
                                    : styles.interestsTab
                                : styles.interestsTab
                        }
                    >
                        {items.categoryname
                        }
                    </Text>
                </TouchableOpacity>
            </View>

            {/* delete icon based on user id */}
            {User.userid == items?.created_user_type
                ? (
                    <TouchableOpacity
                        style={styles.deleteContainer}
                        onPress={() => {
                            handleDelete(items?.id)
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

export default AllSubCategoryTab
const styles = StyleSheet.create({
    container: {
        flexGrow: 1
    },
    body: {
        backgroundColor: Mycolors.WHITE,
        borderRadius: 38,
        marginRight: 3
    },
    interestsTab: {
        borderRadius: 38,
        color: Mycolors.THEME_BLACK,
        fontSize: 14,
        fontWeight: "500",
        height: 40,
        paddingVertical: 10,
        textAlign: "center",
        width: 125
    },
    interestsTabBorder: {
        backgroundColor: Mycolors.THEME_ORANGE,
        borderRadius: 38,
        color: Mycolors.WHITE,
        fontSize: 14,
        fontWeight: "500",
        height: 40,
        paddingVertical: 10,
        textAlign: "center",
        width: 125
    },
    deleteContainer: {
        alignItems: "center",
        borderRadius: 50,
        justifyContent: "center",
        marginHorizontal: 3,
        padding: 3
    }
})
