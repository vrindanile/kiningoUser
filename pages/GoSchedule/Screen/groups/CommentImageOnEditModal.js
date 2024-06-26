//external imports
import React from "react"
import { View, StyleSheet, Image, TouchableOpacity } from "react-native"
//internal imports
// import { colors } from "../../constants/ColorConstant"
import { Mycolors } from "../../../../utility/Mycolors"
const CommentImageOnEditModal = ({
    checkedList,
    commentImages,
    removeImage
}) => {
    { console.log('commentImages', commentImages); }
    return (
        <>
            {checkedList.includes(commentImages?.imageid) ? (
                <View style={styles.feedbackImageContainer}>
                    {/* cross button section  */}
                    <TouchableOpacity
                        style={styles.crossContainer}
                        onPress={() => {
                            removeImage(commentImages?.imageid)
                        }}
                    >
                        <Image
                            style={styles.image}
                            resizeMode="contain"
                            source={require("../../../../assets/Remindably/cross.png")}
                        />
                    </TouchableOpacity>

                    <Image
                        style={styles.image}
                        resizeMode="contain"
                        source={{ uri: `${commentImages?.image}` }}
                    />
                </View>
            ) : null}
        </>
    )
}

export default CommentImageOnEditModal

const styles = StyleSheet.create({
    feedbackImageContainer: {
        borderColor: Mycolors.THEME_ORANGE,
        borderRadius: 8,
        borderWidth: 2,
        marginHorizontal: 3,
        height: 61,
        width: 66
    },
    image: {
        borderRadius: 8,
        height: "100%",
        width: "100%"
    },
    crossContainer: {
        backgroundColor: Mycolors.THEME_ORANGE,
        borderRadius: 50,
        height: 20,
        position: "absolute",
        right: -5,
        top: -5,
        width: 20,
        zIndex: 1
    }
})
