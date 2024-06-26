//external imports
import React, { useCallback, useState } from "react"
import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native"
//internal imports
// import { colors } from "../../constants/ColorConstant"
import { Mycolors } from "../../../../utility/Mycolors"
const AddedComments = ({ data, taskId, taskType, viewTaskClick }) => {
    console.log('m data type---->>', data);
    const [textShown, setTextShown] = useState(false) //To show ur remaining Text
    const [lengthMore, setLengthMore] = useState(false) //to show the "Read more & Less Line"

    //To toggle the show text or hide it
    const toggleNumberOfLines = () => {
        setTextShown(!textShown)
    }

    const onTextLayout = useCallback(e => {
        setLengthMore(e.nativeEvent.lines.length >= 2) //to check the text is more than 2 lines or not
    }, [])

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => {
                viewTaskClick(taskId, taskType)
            }}
        >
            {console.log('my iamges for comments images for new---??', data?.commentimages.length > 0)}
            {data?.commentimages.length > 0 ? (
                <View style={styles.direction}>
                    {/* feedback image section */}
                    {console.log('my iamges for comments images---??', data)}
                    <View style={styles.feedbackImageContainer}>
                        <Image
                            style={styles.image}
                            resizeMode="contain"
                            source={{ uri: `${data?.commentimages[0]?.filepath}` }}
                        />
                    </View>

                    {/* comments background image section */}
                    <View style={styles.backGroundImageContainer}>
                        <Image
                            style={styles.image}
                            resizeMode="contain"
                            source={require("../../../../assets/Remindably/Quotes.png")}
                        />
                    </View>
                    {/* comment section on basis of read more and read less */}
                    <View style={styles.commentContainerWithImage}>
                        <Text
                            style={styles.commentText}
                            onTextLayout={onTextLayout}
                            numberOfLines={textShown ? undefined : 2}
                        >
                            {data?.comment}
                        </Text>
                        {lengthMore ? (
                            <Text onPress={toggleNumberOfLines} style={styles.readMoreText}>
                                {textShown ? "View less..." : "View more..."}
                            </Text>
                        ) : null}

                        <View style={styles.profileContainer}>
                            <Image
                                style={styles.userProfile}
                                resizeMode="contain"
                                source={
                                    data?.profileimage
                                        ? {
                                            uri: `${data.profileimage}`
                                        }
                                        : require("../../../../assets/Remindably/avatar.png")
                                }
                            />
                            <Text style={styles.userName}>{data?.username}</Text>
                        </View>
                    </View>
                </View>
            ) : (
                <View>
                    {/* comments background image section */}
                    <View style={styles.backGroundImageContainer}>
                        <Image
                            style={styles.image}
                            resizeMode="contain"
                            source={require("../../../../assets/Remindably/Quotes.png")}
                        />
                    </View>

                    {/* comment section on basis of read more and read less */}
                    <View style={styles.commentContainer}>
                        <Text
                            style={styles.commentText}
                            onTextLayout={onTextLayout}
                            numberOfLines={textShown ? undefined : 2}
                        >
                            {data?.comment}
                        </Text>
                        {lengthMore ? (
                            <Text onPress={toggleNumberOfLines} style={styles.readMoreText}>
                                {textShown ? "View less..." : "View more..."}
                            </Text>
                        ) : null}

                        <View style={styles.profileContainer}>
                            <Image
                                style={styles.userProfile}
                                resizeMode="contain"
                                source={
                                    data?.profileimage

                                        ? {
                                            uri: `${data.profileimage
                                                }`
                                        }
                                        : require("../../../../assets/Remindably/avatar.png")
                                }
                            />
                            <Text style={styles.userName}>{data?.username}</Text>
                        </View>
                    </View>
                </View>
            )}
        </TouchableOpacity>
    )
}

export default AddedComments

const styles = StyleSheet.create({
    container: {
        backgroundColor: Mycolors.WHITE,
        borderColor: Mycolors.brightGray,
        borderRadius: 15,
        borderWidth: 2,
        flex: 1,
        marginRight: 8,
        padding: 10
    },
    direction: {
        flexDirection: "row"
    },
    profileContainer: {
        alignItems: "center",
        flexDirection: "row",
        paddingVertical: 10
    },
    feedbackImageContainer: {
        borderRadius: 15,
        height: 100,
        width: 130
    },
    image: {
        borderRadius: 15,
        height: "100%",
        width: "100%"
    },
    backGroundImageContainer: {
        borderRadius: 15,
        height: 100,
        opacity: 0.5,
        position: "absolute",
        right: 50,
        width: 100,
        // backgroundColor: 'red'
    },
    commentContainerWithImage: {
        paddingHorizontal: 10,
        width: "58%"
    },
    commentContainer: {
        paddingHorizontal: 10,
        width: 300
    },
    commentText: {
        color: Mycolors.THEME_BLACK,
        fontSize: 14
    },
    userName: {
        color: Mycolors.THEME_BLACK,
        fontSize: 14,
        fontWeight: "bold",
        paddingHorizontal: 5,
        textAlign: 'left'
    },
    userProfile: {
        borderRadius: 50,
        height: 30,
        width: 30
    },
    readMoreText: {
        color: Mycolors.THEME_ORANGE,
        lineHeight: 21,
        width: "50%"
    }
})
