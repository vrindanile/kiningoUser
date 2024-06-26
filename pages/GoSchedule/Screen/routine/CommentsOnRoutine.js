//external imports
import React, { useCallback, useState } from "react"
import moment from "moment"
import { View, Image, Text, StyleSheet, FlatList } from "react-native"
//internal imports
import CommentImagesTab from "../groups/CommentImagesTab"
// import { colors } from "../../constants/ColorConstant"
import { Mycolors } from "../../../../utility/Mycolors"
const CommentsOnRoutine = ({ data, routineId, viewCommentsClick }) => {
    console.log('CommentsOnRoutine', data);
    const [textShown, setTextShown] = useState(false) //To show ur remaining Text
    const [lengthMore, setLengthMore] = useState(false) //to show the "Read more & Less Line"

    // convert time from moment
    const commentTime = moment(data?.created_date)
        .startOf("second")
        .fromNow()

    //To toggle the show text or hide it
    const toggleNumberOfLines = () => {
        setTextShown(!textShown)
    }

    const onTextLayout = useCallback(e => {
        setLengthMore(e.nativeEvent.lines.length >= 2) //to check the text is more than 2 lines or not
    }, [])

    // list for comment image
    const renderAddedSubCommentsImages = ({ item }) => {
        return <CommentImagesTab commentImages={item} />
    }
    const renderItem = ({ item }) => (
        <View style={styles.container}>
            {console.log('item comments flatList----??', item.comment)}
            <View>
                {/* profile image, user name, and time section */}
                <View style={styles.direction}>
                    <View style={styles.profileImageContainer}>
                        <Image
                            source={
                                item.profileimage
                                    ? { uri: item.profileimage }
                                    : require("../../../../assets/Remindably/avatar.png")
                            }
                            resizeMode="contain"
                            style={styles.image}
                        />
                    </View>
                    <Text style={styles.userName}>{item.username}</Text>
                    <Text style={styles.commentTime}>{item.difference}</Text>
                </View>

                {/* feedback comment image section */}
                {item.commentimages?.length >= 0 ? (
                    <FlatList
                        data={item.commentimages}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        renderItem={renderAddedSubCommentsImages}
                        keyExtractor={(commentImage, index) => String(index)}
                    />
                ) : null}

                {/* comment section on the basis of read more and read less */}
                <View style={styles.commentContainer}>
                    <Text
                        style={styles.commentText}
                        onTextLayout={onTextLayout}
                        numberOfLines={textShown ? undefined : 2}
                    >
                        {item.comment}
                    </Text>
                    {console.log('my lenght more', lengthMore)}
                    {lengthMore ? (
                        <Text onPress={toggleNumberOfLines} style={styles.readMoreText}>
                            {textShown ? "View less..." : "View more..."}
                        </Text>
                    ) : null}
                </View>
            </View>
        </View>
    );
    return (
        <View style={styles.container}>
            {/* profile image , user name and time section  */}
            <View style={{ height: 'auto', borderRadius: 15, borderColor: Mycolors.brightGray, borderWidth: 2, padding: 20 }}>
                <View style={styles.direction}>
                    <View style={styles.profileImageContainer}>
                        <Image
                            source={
                                data?.profileimage
                                    ? { uri: `${data?.profileimage}` }
                                    : require("../../../../assets/Remindably/avatar.png")
                            }
                            resizeMode="contain"
                            style={styles.image}
                        />
                    </View>
                    <Text style={styles.userName}>{data?.username
                    }</Text>
                    <Text style={styles.commentTime}>{data?.difference
                    }</Text>
                </View>

                {/* feedback comment image section */}
                {data?.commentimages?.length >= 0 ? (
                    <FlatList
                        data={data?.commentimages}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        renderItem={renderAddedSubCommentsImages}
                        keyExtractor={(item, index) => String(index)}
                    />
                ) : null}

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
                </View>
            </View>
        </View>
        // <FlatList
        //     data={data} // Pass the data as a single-item array
        //     keyExtractor={(item, index) => String(index)}
        //     renderItem={renderItem}
        // />
    )
}

export default CommentsOnRoutine

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,


    },
    direction: {
        flexDirection: "row",
        paddingVertical: 5,


    },
    profileImageContainer: {
        borderRadius: 50,
        height: 30,
        width: 30,

    },
    image: {
        borderRadius: 50,
        height: "100%",
        width: "100%"
    },
    userName: {
        color: Mycolors.THEME_BLACK,
        fontSize: 16,
        fontWeight: "500",
        padding: 5,
        width: "58%"
    },
    commentTime: {
        color: Mycolors.textGray,
        fontSize: 15,
        fontWeight: "500",
        paddingVertical: 5,

        textAlign: 'right',
        width: '35%'



    },
    commentContainer: {
        paddingHorizontal: 10
    },
    commentText: {
        color: Mycolors.THEME_BLACK,
        fontSize: 14
    },
    readMoreText: {
        color: Mycolors.THEME_ORANGE,
        lineHeight: 21,
        width: "50%"
    }
})
