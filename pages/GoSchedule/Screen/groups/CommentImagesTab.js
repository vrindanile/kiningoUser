//external imports
import { View, StyleSheet, Image } from "react-native"
import React from "react"

const CommentImagesTab = ({ commentImages }) => {

    console.log('comment images for notes----->>>>', commentImages?.image);
    return (
        <View style={styles.feedbackImageContainer}>

            {commentImages.image ? (
                <Image
                    style={styles.image}
                    resizeMode="contain"
                    source={{ uri: commentImages?.image }}
                />) : (<Image
                    style={styles.image}
                    resizeMode="contain"
                    source={{ uri: commentImages?.uri }}
                />)
            }
        </View>
    )
}

export default CommentImagesTab

const styles = StyleSheet.create({
    feedbackImageContainer: {
        borderRadius: 8,
        height: 61,
        marginHorizontal: 3,
        //original width
        // width: 66
        //width changed on 17/11/2023
        width: 60
    },
    image: {
        borderRadius: 8,
        height: "100%",
        width: "100%"
    }
})
