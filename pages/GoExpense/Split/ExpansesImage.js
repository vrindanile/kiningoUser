// external imports
import React from "react"
import { View, StyleSheet, Image } from "react-native"

const ExpansesImage = ({ expenseImage }) => {
    console.log('my expanse images---->>', expenseImage);
    return (
        <View style={styles.feedbackImageContainer}>
            <Image
                resizeMode="cover"
                style={styles.feedbackImage}
                source={{
                    uri: `${expenseImage.uri}`
                }}
            />
        </View>
    )
}

export default ExpansesImage

const styles = StyleSheet.create({
    feedbackImageContainer: {
        borderRadius: 15,
        height: 100,
        margin: 3,
        width: 110
    },
    feedbackImage: {
        borderRadius: 15,
        height: "100%",
        width: "100%"
    }
})
