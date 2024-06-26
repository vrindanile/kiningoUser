// external imports
import {
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native"
import ExpansesImage from "./ExpansesImage"
import React, { useCallback, useState } from "react"
// internal imports
import { Mycolors } from "../../../utility/Mycolors"

const AllExpensesTab = ({ items, onDeleteClick, onEditClick }) => {
    console.log('my expanses tabb----->>>>', items);
    const [textShown, setTextShown] = useState(false) //To show ur remaining Text
    const [lengthMore, setLengthMore] = useState(false) //to show the "Read more & Less Line"

    //To toggle the show text or hide it
    const toggleNumberOfLines = () => {
        setTextShown(!textShown)
    }

    const onTextLayout = useCallback(e => {
        setLengthMore(e.nativeEvent.lines.length >= 2) //to check the text is more than 2 lines or not
    }, [])

    const renderExpensesImage = ({ item }) => {
        console.log('my expanses tabb----->>>>',);
        return <ExpansesImage expenseImage={item} />
    }

    return (
        <View style={styles.container}>
            <View style={styles.amountContainer}>
                <Text style={styles.expansesName}>{items?.title}</Text>
                <Text style={styles.amountText}>${items?.amount}</Text>
                <Text style={styles.dateText}>Date : {items?.date}</Text>
                <View style={styles.direction}>
                    <Text style={styles.categoryText}>{items?.categorytype}</Text>
                    <Text style={styles.subCategoryText}>{items?.subcategoryname}</Text>
                </View>

                <View style={styles.direction}>
                    <Text style={styles.dateText}>Payment mode :</Text>
                    <Text style={styles.categoryText}> {items?.payment_type}</Text>
                </View>

                {/* edit and delete icon */}
                <View style={styles.iconContainer}>
                    <TouchableOpacity
                        style={styles.editDeleteContainer}
                        onPress={() => {
                            onEditClick(items)
                        }}
                    >
                        <Image
                            resizeMode="contain"
                            source={require("../../../assets/Remindably/editIcon.png")}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.editDeleteContainer}
                        onPress={() => {
                            onDeleteClick(items?.expenseid)
                        }}
                    >
                        <Image
                            resizeMode="contain"
                            source={require("../../../assets/Remindably/Trash.png")}
                        />
                    </TouchableOpacity>
                </View>
            </View>

            {/* expenses Image section  */}
            {console.log('my item form detial page iamges=====>>', items?.expense_image
                ?.length)}
            {items?.expense_image
                ?.length >= 0 ? (


                <FlatList
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    data={items?.expense_image}
                    renderItem={renderExpensesImage}
                    keyExtractor={(item, index) => String(index)}
                />

            ) : null}

            {/* description section on basis of read more and read less */}
            <View style={styles.descriptionContainer}>
                <Text
                    style={styles.descriptionText}
                    onTextLayout={onTextLayout}
                    numberOfLines={textShown ? undefined : 2}
                >
                    {items?.description}
                </Text>
                {lengthMore ? (
                    <Text onPress={toggleNumberOfLines} style={styles.readMoreText}>
                        {textShown ? "View less..." : "View more..."}
                    </Text>
                ) : null}
            </View>
        </View>
    )
}

export default AllExpensesTab

const styles = StyleSheet.create({
    container: {
        backgroundColor: Mycolors.WHITE,
        borderRadius: 15,
        flex: 1,
        height: "auto",
        margin: 5,
        padding: 10
    },
    direction: {
        alignItems: "center",
        flexDirection: "row"
    },
    amountContainer: { paddingHorizontal: 10 },
    expansesName: {
        color: Mycolors.THEME_BLACK,
        fontSize: 20
    },
    categoryText: {
        color: Mycolors.THEME_ORANGE,
        fontSize: 16
    },
    subCategoryText: {
        color: Mycolors.lightOrange,
        fontSize: 16,
        paddingHorizontal: 20
    },
    amountText: {
        color: Mycolors.THEME_BLACK,
        fontSize: 18,
        fontWeight: "500"
    },
    dateText: {
        color: Mycolors.GRAY,
        fontSize: 14,
        fontWeight: "500"
    },
    iconContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        position: "absolute",
        right: 5,
        width: "18%",
        zIndex: 1
    },
    editDeleteContainer: {
        alignItems: "center",
        borderRadius: 50,
        justifyContent: "center",
        padding: 3
    },
    descriptionContainer: {
        height: "auto",
        padding: 10
    },
    descriptionText: {
        color: Mycolors.THEME_BLACK,
        fontSize: 16,
        fontWeight: "400"
    },
    readMoreText: {
        color: Mycolors.THEME_ORANGE,
        fontWeight: "500",
        lineHeight: 21,
        width: "35%"
    }
})
