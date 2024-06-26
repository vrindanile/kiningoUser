//external imports
import React from "react"
import { View, Text, StyleSheet, Image } from "react-native"
//internal imports
// import { colors } from "../../constants/ColorConstant"
import { Mycolors } from "../../../../utility/Mycolors"
const RecentlyAddedMembersTab = ({ item }) => {
    console.log('addeded members list-----?????', item);
    return (
        <View style={styles.interestsContainer}>
            <View style={styles.interestsTab}>
                <Image
                    style={styles.checkedIcon}
                    resizeMode="contain"
                    tintColor={item?.joinedstatus == 1 ? Mycolors.RED : Mycolors.THEME_ORANGE}
                    source={require("../../../../assets/Remindably/checked.png")}
                />
                <View style={styles.allMemberContainer}>
                    <Image
                        resizeMode="contain"
                        source={
                            item?.profile_image
                                ? { uri: `${item?.profile_image}` }
                                : require("../../../../assets/Remindably/avatar.png")
                        }
                        style={styles.addedMemberImage}
                    />
                </View>
                <Text style={styles.addedMemberLabel}>
                    {item.user_name || item.name || item.username || null}
                </Text>
            </View>
        </View>
    )
}

export default RecentlyAddedMembersTab

const styles = StyleSheet.create({
    interestsContainer: {
        backgroundColor: Mycolors.WHITE,
        borderRadius: 20,
        flexDirection: "row",
        justifyContent: "flex-start",
        margin: 5
    },
    interestsTab: {
        alignItems: "center",
        borderColor: Mycolors.brightGray,
        borderRadius: 20,
        borderWidth: 2,
        height: "auto",
        justifyContent: "flex-start",
        padding: 5,
        width: 105
    },
    checkedIcon: {
        position: "absolute",
        right: 5,
        top: 5,
        zIndex: 1
    },
    allMemberContainer: {
        alignContent: "center",
        alignSelf: "center",
        backgroundColor: Mycolors.WHITE,
        borderRadius: 50,
        height: 45,
        width: 45
    },
    addedMemberImage: {
        borderRadius: 50,
        height: "100%",
        width: "100%"
    },
    addedMemberLabel: {
        bottom: 0,
        color: Mycolors.BLACK,
        fontSize: 16,
        textAlign: "center"
    }
})
