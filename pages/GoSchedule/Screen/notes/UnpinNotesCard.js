//external imports
import {
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native"
import React, { useCallback, useState } from "react"
import moment from "moment"
// internal imports
import NotesImagesTab from "./NotesImagesTab"
// import { colors } from "../../constants/ColorConstant"
import { Mycolors } from "../../../../utility/Mycolors"
const UnpinNotesCard = ({ handlePin, handleShareNote, handleView, items }) => {
    console.log('my unpined data----->>>>', items.noteimages
    );
    const [textShown, setTextShown] = useState(false) //To show ur remaining Text
    const [lengthMore, setLengthMore] = useState(false) //to show the "Read more & Less Line"

    //To toggle the show text or hide it
    const toggleNumberOfLines = () => {
        setTextShown(!textShown)
    }

    const onTextLayout = useCallback(e => {
        setLengthMore(e.nativeEvent.lines.length >= 2) //to check the text is more than 2 lines or not
    }, [])

    // list for images on notes
    const renderUploadFeedbackImages = ({ item }) => {
        return <NotesImagesTab notesImages={item} />
    }

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => {
                handleView(items.id)
            }}
        >
            <View style={styles.titleContainer}>
                <Text style={styles.notesTitle}>{items?.notes_title}</Text>
                <Text style={styles.date}>
                    {moment(items?.creation_date).format("ddd DD")}
                </Text>
                <TouchableOpacity
                    onPress={() => {
                        handlePin(items.id)
                    }}
                    style={styles.pinIconContainer}
                >
                    <Image
                        resizeMode="contain"
                        style={styles.image}
                        source={require("../../../../assets/Remindably/unpin.png")}
                    />
                </TouchableOpacity>
            </View>
            {/* description section on basis of read more and read less */}
            <View style={styles.descriptionContainer}>
                <Text
                    style={styles.descriptionText}
                    onTextLayout={onTextLayout}
                    numberOfLines={textShown ? undefined : 2}
                >
                    {items?.notes_text}
                </Text>
                {/* {lengthMore ? (
                    <Text onPress={toggleNumberOfLines} style={styles.readMoreText}>
                        {textShown ? "View less..." : "View more..."}
                    </Text>
                ) : null} */}
            </View>

            {items?.noteimages?.length > 0 ? (
                <FlatList
                    data={items?.noteimages}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    renderItem={renderUploadFeedbackImages}
                    keyExtractor={(item, index) => String(index)}
                />
            ) : null}

            <TouchableOpacity
                onPress={() => {
                    handleShareNote(items.id)
                }}
                style={styles.shareButton}
            >
                <Image
                    resizeMode="contain"
                    source={require("../../../../assets/Remindably/ShareIcon.png")}
                />
                <Text style={styles.shareText}>Share</Text>
            </TouchableOpacity>
        </TouchableOpacity>
    )
}

export default UnpinNotesCard

const styles = StyleSheet.create({
    container: {
        backgroundColor: Mycolors.WHITE,
        borderRadius: 15,
        height: "auto",
        margin: 10,
        padding: 15
    },
    titleContainer: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    notesTitle: {
        color: Mycolors.THEME_BLACK,
        fontSize: 18,
        fontWeight: "bold",
        width: "70%"
    },
    date: {
        color: Mycolors.THEME_BLACK,
        fontSize: 14,
        width: "15%"
    },
    descriptionContainer: {
        height: "auto",
        paddingVertical: 10
    },
    descriptionText: { color: Mycolors.THEME_BLACK },
    shareButton: {
        alignItems: "center",
        borderColor: Mycolors.THEME_ORANGE,
        borderRadius: 20,
        borderWidth: 2,
        flexDirection: "row",
        height: 35,
        justifyContent: "center",
        margin: 10,
        width: 90
    },
    shareText: {
        color: Mycolors.THEME_ORANGE,
        fontSize: 16
    },
    pinIconContainer: {
        height: 25,
        width: 25
    },
    image: {
        height: "100%",
        width: "100%"
    },
    readMoreText: {
        color: Mycolors.THEME_ORANGE,
        fontWeight: "500",
        lineHeight: 21,
        width: "35%"
    }
})
