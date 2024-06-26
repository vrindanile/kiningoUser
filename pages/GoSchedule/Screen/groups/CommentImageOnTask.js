//external imports
import React from "react"
import { View, StyleSheet, Image } from "react-native"
//internal imports
// import { colors } from "../../constants/ColorConstant"
import { Mycolors } from "../../../../utility/Mycolors"
const CommentImageOnTask = ({ commentImages }) => {
    console.log('my commmentImages for notes--->>', commentImages?.image);
    return (
        <View style={styles.feedbackImageContainer}>
            <Image
                resizeMode="cover"
                style={styles.feedbackImage}
                source={{ uri: `${commentImages.image}` }}
            />
        </View>
    )
}

export default CommentImageOnTask

const styles = StyleSheet.create({
    feedbackImageContainer: {
        backgroundColor: Mycolors.WHITE,
        height: 180,
        marginBottom: 10,
        paddingHorizontal: 10,
        width: 395
    },
    feedbackImage: {
        borderRadius: 2,
        height: "100%",
        width: "100%"
    }
})
