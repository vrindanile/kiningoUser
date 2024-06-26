// external imports
import React from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native"
// internal imports
import { Mycolors } from "../../../../utility/Mycolors"
const MyGroupsTab = ({ items, title, props, navigation, route }) => {

    console.log(items.group_id, 'my item sfrom ');
    // navigation on group details page on tab click
    const viewGroupDetails = async groupId => {
        console.log('my group id', groupId);
        await AsyncStorage.setItem("groupId", JSON.stringify(groupId));
        navigation.navigate(
            "GroupDetails",
            {
                data: groupId,
                type: 'SharedGroups'
                // name: items.name
            }
        )
        // navigation.reset({
        //     index: 0,
        //     routes: [{ name: "GroupDetails" }],
        //     params: { data: groupId },
        // });
    }

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => {
                viewGroupDetails(items?.group_id)
            }}
        >
            {/* group title  */}
            <View style={styles.nameContainer}>
                <Text style={styles.groupNameText}>{items?.name}</Text>
                <View style={styles.direction}>
                    <Text style={styles.groupIdText}>
                        Total group members: {items?.totalgroupmembers}
                    </Text>
                </View>

                <View style={styles.direction}>
                    <Image
                        resizeMode="contain"
                        source={require("../../../../assets/Remindably/CalendarBlank.png")}
                    />
                    <Text style={styles.date}> {items?.created_at?.slice(0, 10)}</Text>
                </View>
            </View>

            {/* group image  */}
            {items?.groupimage ? (
                <View style={styles.groupImageContainer}>
                    <Image
                        style={styles.image}
                        resizeMode="cover"
                        source={{ uri: `${items?.groupimage}` }}
                    />
                </View>
            ) : (
                <View style={styles.noGroupImageContainer}>
                    <View style={styles.noGroupImage}>
                        <Image
                            style={{ width: "100%", height: "100%" }}
                            resizeMode="cover"
                            source={require("../../../../assets/Remindably/noImage.png")}
                        />
                    </View>
                </View>
            )}
        </TouchableOpacity>
    )
}

export default MyGroupsTab

const styles = StyleSheet.create({
    container: {
        backgroundColor: Mycolors.WHITE,
        borderRadius: 15,
        flex: 1,
        flexDirection: "row",
        margin: 10,
        padding: 15
    },
    nameContainer: { width: "80%" },
    groupNameText: {
        color: Mycolors.THEME_ORANGE,
        fontSize: 20,
        fontWeight: "500"
    },
    groupIdText: {
        color: Mycolors.THEME_BLACK,
        fontSize: 16,
        paddingVertical: 3
    },
    direction: {
        alignItems: "center",
        flexDirection: "row"
    },
    date: { color: Mycolors.textGray },
    image: {
        borderRadius: 50,
        height: "100%",
        width: "100%"
    },
    groupImageContainer: {
        borderColor: Mycolors.WHITE,
        borderRadius: 50,
        borderWidth: 3,
        height: 70,
        width: 70
    },
    noGroupImageContainer: {
        alignItems: "center",
        backgroundColor: Mycolors.THEME_WHITE,
        borderColor: Mycolors.WHITE,
        borderRadius: 50,
        borderWidth: 3,
        height: 70,
        justifyContent: "center",
        width: 70
    },
    noGroupImage: {
        height: 40,
        width: 35
    }
})
