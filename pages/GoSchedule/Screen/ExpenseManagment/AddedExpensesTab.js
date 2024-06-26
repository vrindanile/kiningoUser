//external imports
import React from "react"
import { View, Image, Text, StyleSheet } from "react-native"
//internal imports
import { Mycolors } from "src/utility/Mycolors"

const AddedExpensesTab = ({ items }) => {
    return (
        <View style={styles.container}>
            <View style={styles.amountContainer}>
                <Text style={styles.expenseName}>{items?.title}</Text>

                {/* date  */}
                <View style={styles.direction}>
                    <Image
                        resizeMode="contain"
                        style={{ width: 15, height: 15 }}
                        source={require("../../assets/pngImage/CalendarBlank.png")}
                    />
                    <Text style={styles.dateText}>{items?.date}</Text>
                </View>

                {/* category and subcategory */}
                <View style={styles.direction}>
                    <Text style={styles.categoryText}>{items?.categorytype}</Text>
                    <View style={styles.direction}>
                        <View style={styles.dotContainer} />
                        <Text style={styles.subCategoryText}>{items?.subcategoryname}</Text>
                    </View>
                </View>
                <View style={styles.direction}>
                    <Text style={styles.categoryText}>Payment mode</Text>
                    <View style={styles.direction}>
                        <View style={styles.dotContainer} />
                        <Text style={styles.subCategoryText}>{items?.payment_type}</Text>
                    </View>
                </View>
                <Text style={styles.amountText}>${items?.amount}</Text>
            </View>

            {/* dollar image section */}
            <View style={styles.imageContainer}>
                {/* <Image
                    resizeMode="contain"
                    style={styles.image}
                    source={
                        items?.images
                            ? { uri: `${items?.images[0]?.image}` }
                            : require("../../assets/pngImage/expanseDollar.png")
                    }
                /> */}
            </View>
        </View>
    )
}

export default AddedExpensesTab

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.WHITE,
        borderRadius: 15,
        flex: 1,
        flexDirection: "row",
        height: 140,
        justifyContent: "space-between",
        marginHorizontal: 5,
        padding: 10,
        width: 298
    },
    direction: {
        alignItems: "center",
        flexDirection: "row",
        paddingTop: 3
    },
    amountContainer: { paddingHorizontal: 10 },
    dotContainer: {
        backgroundColor: Mycolors.THEME_ORANGE,
        borderRadius: 50,
        height: 10,
        width: 10
    },
    expenseName: {
        color: Mycolors.THEME_BLACK,
        fontSize: 15,
        fontWeight: "500",
        paddingBottom: 3
    },
    dateText: {
        color: colors.lightGray,
        fontSize: 12,
        fontWeight: "400",
        paddingHorizontal: 5
    },
    categoryText: {
        color: Mycolors.THEME_BLACK,
        fontSize: 12,
        fontWeight: "400",
        paddingRight: 20
    },
    subCategoryText: {
        color: Mycolors.THEME_ORANGE,
        fontSize: 14,
        fontWeight: "400",
        paddingHorizontal: 3
    },
    amountText: {
        color: Mycolors.THEME_ORANGE,
        fontSize: 20,
        fontWeight: "500",
        paddingVertical: 3
    },
    imageContainer: {
        borderRadius: 50,
        height: 72,
        top: -10,
        width: 72
    },
    image: {
        height: "100%",
        width: "100%"
    }
})