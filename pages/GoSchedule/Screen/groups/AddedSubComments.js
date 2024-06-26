//external imports
import {
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native"
import React, { useCallback, useEffect, useRef, useState } from "react"
import moment from "moment"
import { get_details, requestGetApi, get_task, recent_members, task_comments, postTask_comments, group_detail, requestPostApi, getSub_comments } from '../../../../WebApi/Service'
import { useSelector, useDispatch } from 'react-redux';
import axios from "axios";
//internal imports
import AddSubCommentModal from "./AddSubCommentModal"
import AddedSubSubComments from "./AddedSubSubComments"
import Toast from 'react-native-toast-message'
import CommentImagesTab from "./CommentImagesTab"
// import CommonToast from "../../constants/CommonToast"
// import GroupServices from "../../service/GroupServices"
// import { colors } from "../../constants/ColorConstant"
import { Mycolors } from '../../../../utility/Mycolors'

const AddedSubComments = ({
    getSubSubCommentsRefresh,
    myUserId,
    onDeleteClick,
    onDeleteClickSub,
    onEditClick,
    onEditClickSub,
    subCommentData
}) => {
    const [allSubSubComments, setAllSubSubComments] = useState([])
    const [lengthMore, setLengthMore] = useState(false) //to show the "Read more & Less Line"
    const [subCommentsModal, setSubCommentsModal] = useState(false)
    const [textShown, setTextShown] = useState(false) //To show ur remaining Text
    const [viewAllCommentsVisible, setViewAllCommentsVisible] = useState(false)
    const toastRef = useRef()
    const User = useSelector(state => state.user.user_details)

    // convert time from moment
    const commentTime = moment(subCommentData?.commenttime)
        .startOf("second")
        .fromNow()

    //To toggle the show text or hide it
    const toggleNumberOfLines = () => {
        setTextShown(!textShown)
    }

    useEffect(() => {
        getSubSubComments()
    }, [subCommentData])

    // function for get all sub sub comments data on api call
    const getSubSubComment = async () => {
        const data = {
            commentid: subCommentData.id
        }

        GroupServices.postAllSubCommentsOnComment(data)
            .then(response => {
                setAllSubSubComments(response.data.allsubcomments)
            })
            .catch(error => {
                console.log(error)
            })
    }

    const getSubSubComments = async () => {
        console.log('task called fro ssuuu')
        console.log('items?.commentid', subCommentData.id);
        // setPageLoader(true)
        // setFeedbackImage([])
        // setPicker([])
        var fUrl = getSub_comments
        var urls = '?commentid=' + subCommentData.id

        console.log('mu url---------?', urls);
        console.log('my url---------->', urls)
        if (urls != undefined) {
            fUrl = fUrl + urls
        }
        const { responseJson, err } = await requestGetApi(fUrl, '', 'GET', User.token)
        // setPageLoader(false)
        // console.log('response of specific article', responseJson)
        // setMyGroupList(responseJson.body)
        if (responseJson.headers.success == 1) {
            console.log('the res after sucess of comments replyyyyyy rere rereer------------???', responseJson.body
            )
            setAllSubSubComments(responseJson.body)
            // const images = responseJson.body.taskimages.map(imageObj => imageObj.images);

            // Filter out null or empty values (images with no URL) and set the images in the state
            // setCommentsImage(images.filter(image => image));

            // Filter out null values (comments with no images) and set the images in the state
            // setCommentsImage(images.filter(image => image !== null));
            // setAllComments(responseJson.body.commentDetails[0])
            // setTaskName(responseJson.body.name)
            // setTaskComments("")
            // setCommentsImage(response.data.taskdetails.images)
            // setGroupDetails(responseJson.body)
            // setAllTask(responseJson.body)

        } else {

            setalert_sms(err)
            setMy_Alert(true)
        }
    }

    const onTextLayout = useCallback(e => {
        setLengthMore(e.nativeEvent.lines.length >= 2) //to check the text is more than 2 lines or not
    }, [])

    // function for close modal
    const handleAddSubCommentModalClose = () => {
        setSubCommentsModal(false)
    }

    // function for submit button click on api call to add comment
    const handleAddCommentSubmitClic = (subComment, subCommentImage) => {
        console.log('my images comment sumit modal',)
        setSubCommentsModal(false)
        const feedBackData = new FormData()
        if (subCommentImage !== null) {
            subCommentImage.map((e, index) => {
                feedBackData.append(`images[${index}]`, e)
            })
        }
        feedBackData.append("comment_id", subCommentData.id)
        feedBackData.append("comment", subComment)
        GroupServices.postAddSubComment(feedBackData)
            .then(response => {
                toastRef.current.getToast(response.data.message, "success")
                getSubSubCommentsRefresh() //for refresh the subComment section
            })
            .catch(error => {
                console.log(error)
            })
    }


    const handleAddCommentSubmitClick = async (subComment, subCommentImage) => {
        console.log('my reply commenetooooo------>>>>',);
        if (!subComment && (!subCommentImage || subCommentImage.length === 0)) {
            // Show a toast message when both taskComments and picker are empty
            Toast.show({ text1: 'Please enter a comment or select an image' });
            return

        }
        // Keyboard.dismiss()
        // setButtonLoader(true)
        try {
            console.log('Starting post creation...');
            const data = new FormData();
            data.append("comment_id", subCommentData.id)
            data.append("comment", subComment)
            if (subCommentImage !== null) {
                subCommentImage.map((e, index) => {
                    data.append(`files`, e)
                })
            }
            console.log('Data to be sent:', data);

            const response = await axios.post(
                'http://54.153.75.225/backend/api/v1/goaccounting/recomment',
                data,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${User.token}`,
                    },
                }
            );

            console.log('Response:', response.data);

            if (response.status === 200) {
                console.log('Post created successfully repost---????-----', response);
                handleAddSubCommentModalClose()
                Toast.show({ text1: response.data.headers.message });
                getSubSubCommentsRefresh()
                // setButtonLoader(false)
                // getData()
                // props.navigation.navigate('InventionHome');
                // Toast.show({ text1: response.data.headers.message });
            } else {
                console.log('Error creating post:', response.data.headers.message);
            }

            // Assuming you want to set loading to false after the request.

        } catch (error) {
            console.error('Error in CreatePost', error);
        }
    }

    // list for sub sub comments
    const renderAddedSubSubComments = ({ item }) => {
        console.log('item renderAddedSubSubComments', item);
        return (
            <AddedSubSubComments
                subCommentsData={item}
                onEditClickSub={onEditClickSub}
                onDeleteClickSub={onDeleteClickSub}
                myUserId={myUserId}
            />
        )
    }

    // list for comments images
    const renderAddedSubCommentsImages = ({ item }) => {
        console.log('renderAddedSubCommentsImages', item)
        return <CommentImagesTab commentImages={item} />
    }

    return (
        <View style={styles.container}>
            {/* profile image , user name and time section  */}
            <View style={styles.profileDirection}>
                <View style={styles.direction}>
                    <View style={styles.profileImageContainer}>
                        <Image
                            source={
                                subCommentData?.profileimage
                                    ? { uri: `${subCommentData.profileimage}` }
                                    : require("../../../../assets/Remindably/avatar.png")
                            }
                            resizeMode="contain"
                            style={styles.image}
                        />
                    </View>
                    <Text style={styles.userName}>{subCommentData?.username}</Text>
                </View>

                {/* display edit icon basis of customer id match  */}
                {User.userid == subCommentData?.commentuserid ? (
                    <View style={styles.direction}>
                        <TouchableOpacity
                            style={styles.editContainer}
                            onPress={() => {
                                onEditClick(subCommentData)
                            }}
                        >
                            <Image
                                resizeMode="contain"
                                source={require("../../../../assets/Remindably/editIcon.png")}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.editContainer}
                            onPress={() => {
                                onDeleteClick(subCommentData)
                            }}
                        >
                            <Image
                                resizeMode="contain"
                                source={require("../../../../assets/Remindably/Trash.png")}
                            />
                        </TouchableOpacity>
                    </View>
                ) : null}
            </View>

            <Text style={styles.commentTime}>{commentTime}</Text>

            {/* feedback sub comment image section */}
            {subCommentData?.commentimages?.length >= 0 ? (
                <FlatList
                    data={subCommentData?.commentimages}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    renderItem={renderAddedSubCommentsImages}
                    keyExtractor={(item, index) => String(index)}
                />
            ) : null}

            {/*Sub comment section on basis of read more and read less */}
            <View style={styles.commentContainer}>
                {/* quotes image section  */}
                <View style={styles.backGroundImageContainer}>
                    <Image
                        style={styles.image}
                        resizeMode="contain"
                        source={require("../../../../assets/Remindably/Quotes.png")}
                    />
                </View>

                <Text
                    style={styles.userComments}
                    onTextLayout={onTextLayout}
                    numberOfLines={textShown ? undefined : 2}
                >
                    {subCommentData?.comment}
                </Text>
                {lengthMore ? (
                    <Text onPress={toggleNumberOfLines} style={styles.readMoreText}>
                        {textShown ? "View less..." : "View more..."}
                    </Text>
                ) : null}

                <TouchableOpacity
                    style={styles.iconContainer}
                    onPress={() => {
                        setSubCommentsModal(true)
                    }}
                >
                    <Image
                        style={styles.imageStyle}
                        resizeMode="contain"
                        source={require("../../../../assets/Remindably/replyArrow.png")}
                    />
                    <Text style={styles.replyText}>Reply</Text>
                </TouchableOpacity>
            </View>

            {/* sub sub comments section with show and hide comments */}
            {allSubSubComments?.length >= 0 ? (
                <>
                    <FlatList
                        data={!viewAllCommentsVisible ? [] : allSubSubComments}
                        renderItem={renderAddedSubSubComments}
                        keyExtractor={(item, index) => String(index)}
                    />
                    {allSubSubComments?.length > 0 ? (
                        <TouchableOpacity
                            onPress={() => {
                                setViewAllCommentsVisible(!viewAllCommentsVisible)
                            }}
                            style={styles.moreReplyContainer}
                        >
                            <Text style={styles.moreReplyText}>
                                {!viewAllCommentsVisible
                                    ? "View All Replies..."
                                    : "Hide All Replies..."}
                            </Text>
                        </TouchableOpacity>
                    ) : null}
                </>
            ) : null}

            {/* add new sub sub comment tab  */}
            <AddSubCommentModal
                commentDetails={subCommentData}
                visibleModal={subCommentsModal}
                onClose={handleAddSubCommentModalClose}
                onSubmitClick={handleAddCommentSubmitClick}
            />
            {/* toaster message for error response from API  */}
            {/* <CommonToast ref={toastRef} /> */}
        </View>
    )
}

export default AddedSubComments

const styles = StyleSheet.create({
    container: {
        borderRadius: 15,
        flex: 1,
        margin: 5,
        padding: 10
    },
    direction: {
        flexDirection: "row"
    },
    image: {
        borderRadius: 15,
        height: "100%",
        width: "100%"
    },
    backGroundImageContainer: {
        height: 80,
        opacity: 0.5,
        position: "absolute",
        right: 50,
        width: 80
    },
    commentContainer: {
        paddingHorizontal: 10
    },
    profileImageContainer: {
        borderRadius: 50,
        height: 30,
        width: 30
    },
    userName: {
        color: Mycolors.THEME_BLACK,
        fontSize: 17,
        fontWeight: "700",
        paddingHorizontal: 5,
        paddingTop: 5,
        width: "78%"
    },
    commentTime: {
        color: Mycolors.textGray,
        fontSize: 15,
        fontWeight: "700",
        marginBottom: 3,
        marginLeft: 30
    },
    userComments: {
        color: Mycolors.THEME_BLACK,
        textAlign: "justify"
    },
    imageStyle: {
        height: 20,
        paddingHorizontal: 15,
        width: 20
    },
    iconContainer: {
        alignItems: "center",
        flexDirection: "row",
        height: 25,
        marginRight: 5,
        marginVertical: 5,
        width: 70
    },
    replyText: {
        color: Mycolors.THEME_BLACK,
        fontSize: 15,
        fontWeight: "400"
    },
    profileDirection: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    editContainer: {
        alignItems: "center",
        borderRadius: 50,
        justifyContent: "center",
        marginHorizontal: 3,
        padding: 3
    },
    readMoreText: {
        color: Mycolors.THEME_ORANGE,
        lineHeight: 21,
        width: "35%"
    },
    moreReplyContainer: {
        width: "60%",

    },
    moreReplyText: {
        color: Mycolors.THEME_ORANGE,
        fontSize: 15,
        fontWeight: "500"
    }
})
