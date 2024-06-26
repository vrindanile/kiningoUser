//external imports
import React from "react"
import { View, StyleSheet, Image } from "react-native"
//internal imports

import { Mycolors } from "../../../../utility/Mycolors"
const NotesImagesTab = ({ notesImages }) => {
    console.log('my notes images tab---->>>>', notesImages);
    return (
        <View style={styles.feedbackImageContainer}>
            <Image
                style={styles.image}
                resizeMode="contain"
                source={{
                    uri: `${notesImages?.image}`
                }}
            />
        </View>
    )
}

export default NotesImagesTab

const styles = StyleSheet.create({
    feedbackImageContainer: {
        backgroundColor: Mycolors.WHITE,
        borderRadius: 10,
        height: 50,
        marginHorizontal: 2,
        width: 60
    },
    image: {
        borderRadius: 10,
        height: "100%",
        width: "100%"
    }
})
