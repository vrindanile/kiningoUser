// external imports
import {
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native"
import React from "react"
import moment from "moment"
// internal imports
import SplitBillUsers from "./SplitBillUsers"
import { Mycolors } from "../../../utility/Mycolors"

const SettleSplitBillTab = ({ items, onSelect, selectedList }) => {
    // list for added split group members
    const renderAddedSplitBillUser = ({ item }) => {
        return <SplitBillUsers items={item} />
    }

    return (
        <>
            {items?.settled == "Not settled" ? (
                <TouchableOpacity
                    style={
                        selectedList.includes(items?.id)
                            ? styles.containerBorder
                            : styles.container
                    }
                    onPress={() => {
                        onSelect(items?.id, items)
                    }}
                >
                    {/* select image  */}
                    {selectedList.includes(items?.id) ? (
                        <View style={styles.selectIconContainer}>
                            <Image
                                resizeMode="contain"
                                source={require("../../../assets/Remindably/CheckedIcon.png")}
                                style={styles.image}
                            />
                        </View>
                    ) : null}

                    <View style={styles.direction}>
                        <View style={styles.imageContainer}>
                            <Image
                                resizeMode="contain"
                                source={
                                    items?.images
                                        ? { uri: `${items?.images}` }
                                        : require("../../../assets/Remindably/dollar.png")
                                }
                                style={styles.image}
                            />
                        </View>

                        <View style={styles.titleContainer}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={styles.splitTitle}>{items?.title}</Text>

                            </View>
                            <Text style={styles.amountText}>
                                ${items?.amount ? items?.amount : "0"}
                            </Text>

                            <View style={styles.direction}>
                                <Text style={styles.spendText}>Spend</Text>
                                <Text style={styles.personalText}>Personal</Text>
                            </View>
                            <Text style={styles.addedByText}>
                                Added by you on{" "}
                                {moment(items?.expense_date).format("MMM DD, YYYY")}
                            </Text>
                        </View>
                    </View>

                    {/* user with their split amount section */}
                    <View>
                        {items?.details?.length > 0 ? (
                            <View style={styles.userContainer}>
                                <FlatList
                                    data={items?.details}
                                    renderItem={renderAddedSplitBillUser}
                                    keyExtractor={(item, index) => String(index)}
                                />
                            </View>
                        ) : null}
                    </View>
                </TouchableOpacity>
            ) : (
                <View style={styles.selectedContainer}>
                    <View style={styles.direction}>
                        <View style={styles.imageContainer}>
                            <Image
                                resizeMode="contain"
                                source={
                                    items?.images
                                        ? { uri: `${items?.images}` }
                                        : require("../../../assets/Remindably/dollar.png")
                                }
                                style={styles.image}
                            />
                        </View>

                        <View style={styles.titleContainer}>
                            <View style={styles.nameDirection}>
                                <Text style={styles.splitTitle}>{items?.title}</Text>
                                <Text style={styles.spendText}>{items?.settled
                                }</Text>
                            </View>
                            <Text style={styles.amountText}>
                                ${items?.amount ? items?.amount : "0"}
                            </Text>
                            <View style={styles.direction}>
                                <Text style={styles.spendText}>Spend</Text>
                                <Text style={styles.personalText}>Personal</Text>
                            </View>
                            <Text style={styles.addedByText}>
                                Added by you on{" "}
                                {moment(items?.expense_date).format("MMM DD, YYYY")}
                            </Text>
                        </View>
                    </View>

                    {/* user with their split amount section */}
                    <View>
                        {items?.details?.length > 0 ? (
                            <View style={styles.userContainer}>
                                <FlatList
                                    data={items?.details}
                                    renderItem={renderAddedSplitBillUser}
                                    keyExtractor={(item, index) => String(index)}
                                />
                            </View>
                        ) : null}
                    </View>
                </View>
            )}
        </>
    )
}

export default SettleSplitBillTab

const styles = StyleSheet.create({
    container: {
        backgroundColor: Mycolors.WHITE,
        borderColor: "transparent",
        borderRadius: 15,
        borderWidth: 2,
        elevation: 5,
        flex: 1,
        height: "auto",
        margin: 5,
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    containerBorder: {
        backgroundColor: Mycolors.WHITE,
        borderColor: Mycolors.THEME_ORANGE,
        borderRadius: 15,
        borderWidth: 2,
        elevation: 5,
        flex: 1,
        height: "auto",
        margin: 5,
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    selectedContainer: {
        backgroundColor: Mycolors.THEME_WHITE,
        borderColor: "transparent",
        borderRadius: 15,
        borderWidth: 2,
        elevation: 5,
        flex: 1,
        height: "auto",
        margin: 5,
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    selectIconContainer: {
        backgroundColor: Mycolors.WHITE,
        borderRadius: 50,
        height: 40,
        position: "absolute",
        right: 10,
        top: 10,
        width: 40,
        zIndex: 2
    },
    direction: {
        flexDirection: "row"
    },
    nameDirection: {
        alignItems: "center",
        flexDirection: "row"
    },
    titleContainer: { width: "80%", paddingHorizontal: 5, },
    splitTitle: {
        color: Mycolors.THEME_BLACK,
        fontSize: 18,
        fontWeight: "400",
        width: "80%"
    },
    addedByText: {
        color: Mycolors.textGray,
        fontSize: 14,
        fontWeight: "500"
    },
    userContainer: {
        flex: 1,
        height: "auto",
        paddingHorizontal: 10
    },
    amountText: { color: Mycolors.THEME_BLACK, fontSize: 18, fontWeight: "500" },
    spendText: {
        color: Mycolors.THEME_ORANGE,
        fontSize: 14,
        fontWeight: "400"
    },
    personalText: {
        color: Mycolors.THEME_ORANGE,
        fontSize: 14,
        fontWeight: "400",
        paddingHorizontal: 20
    },
    imageContainer: {
        backgroundColor: Mycolors.WHITE,
        borderRadius: 50,
        height: 75,
        width: 75
    },
    image: {
        borderRadius: 50,
        height: "100%",
        width: "100%"
    }
})
