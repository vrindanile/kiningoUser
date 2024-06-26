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
import axios from "axios"
import Toast from 'react-native-toast-message'
// internal imports
import AddSubCommentModal from "./AddSubCommentModal"
import AddedSubComments from "./AddedSubComments"
import CommentImagesTab from "./CommentImagesTab"
// import CommonToast from "../../constants/CommonToast"
import DeleteAlertModal from "./DeleteAlertModal"
import EditCommentModal from "./EditCommentModal"
import { get_details, requestGetApi, get_task, recent_members, task_comments, postTask_comments, group_detail, requestPostApi, getSub_comments, delete_groupComments, } from '../../../../WebApi/Service'
import { useSelector, useDispatch } from 'react-redux';
// import GroupServices from "../../service/GroupServices"
// import { colors } from "../../constants/ColorConstant"
import { Mycolors } from "../../../../utility/Mycolors"
const UserCommentsOnTaskView = ({ getRefreshComments, items, myUserId }) => {
    console.log('items for commens detail page gggg otes', items);
    const [allSubComment, setAllSubComment] = useState([])
    const [deleteModal, setDeleteModal] = useState(false)
    const [editModal, setEditModal] = useState(false)
    const [lengthMore, setLengthMore] = useState(false) //to show the "Read more & Less Line"
    const [selectedCommentId, setSelectedCommentId] = useState(0)
    const [selectedEditCommentData, setSelectedEditCommentData] = useState({})
    const [subCommentsModal, setSubCommentsModal] = useState(false)
    const [picker, setPicker] = useState([])
    const [textShown, setTextShown] = useState(false) //To show ur remaining Text
    const [viewAllCommentsVisible, setViewAllCommentsVisible] = useState(false)
    const toastRef = useRef()
    const User = useSelector(state => state.user.user_details)
    // convert time from moment
    const commentTime = moment(items?.created_date)
        .startOf("second")
        .fromNow()

    //To toggle the show text or hide it
    const toggleNumberOfLines = () => {
        setTextShown(!textShown)
    }

    const onTextLayout = useCallback(e => {
        setLengthMore(e.nativeEvent.lines.length >= 2) //to check the text is more than 2 lines or not
    }, [])

    useEffect(() => {
        getSubComments()
    }, [items])

    // function for get all sub comments data on api call
    const getSubComment = async () => {
        const data = {
            commentid: items?.commentid
        }

        // GroupServices.postAllSubCommentsOnComment(data)
        //     .then(response => {
        //         setAllSubComment(response.data.allsubcomments)
        //     })
        //     .catch(error => {
        //         toastRef.current.getToast(error.response.data.message, "error")
        //     })
    }
    const getSubComments = async () => {
        console.log('task called fro ssuuu')
        console.log('items?.commentid for group', items);
        // setPageLoader(true)
        // setFeedbackImage([])
        // setPicker([])
        var fUrl = getSub_comments
        var urls = '?commentid=' + items?.id

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
            console.log('the res after sucess of comments replyyyyyy rere------------???', responseJson.body
            )
            setAllSubComment(responseJson.body)
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
    // function for close sub comments modal
    const handleAddSubCommentModalClose = () => {
        console.log('my function get called or not');
        setSubCommentsModal(false)
    }

    // function for add comments button click on api call
    const handleAddCommentSubmitClic = (subComment, subCommentImage) => {
        setSubCommentsModal(false)
        const feedBackData = new FormData()

        if (subCommentImage !== null) {
            subCommentImage.map((e, index) => {
                feedBackData.append(`images[${index}]`, e)
            })
        }
        feedBackData.append("comment_id", items.commentid)
        feedBackData.append("comment", subComment)

        // GroupServices.postAddSubComment(feedBackData)
        //     .then(response => {
        //         toastRef.current.getToast(response.data.message, "success")
        //         getRefreshComments() //for refresh the Comment section
        //     })
        //     .catch(error => {
        //         console.log("error-", error)
        //     })
    }
    // const handleAddCommentSubmitClick = async (subComment, subCommentImage) => {
    //     console.log('my reply commenet', subCommentImage);
    //     // Keyboard.dismiss()
    //     // setButtonLoader(true)
    //     if (!subComment) {
    //         Toast.show({ text1: 'Please provide comment' });
    //         return;
    //     }
    //     try {
    //         console.log('Starting post creation...');


    //         const data = new FormData();

    //         data.append("comment_id", items.id
    //         )
    //         data.append("comment", subComment)

    //         // if (subCommentImage.length > 0) {
    //         //     console.log('Uploading from gallery', subCommentImage);
    //         //     subCommentImage.forEach((item, index) => {
    //         //         const imageName = item.path.slice(item.path.lastIndexOf('/') + 1);
    //         //         data.append('files', {
    //         //             name: imageName,
    //         //             type: item.mime,
    //         //             uri: item.path,
    //         //         });
    //         //     });

    //         // }
    //         if (subCommentImage !== null) {
    //             subCommentImage.map((e, index) => {
    //                 data.append(`files`, e)
    //             })
    //         }
    //         console.log('Data to be sent:', data);

    //         const response = await axios.post(
    //             'http://54.153.75.225/backend/api/v1/goaccounting/recomment',
    //             data,
    //             {
    //                 headers: {
    //                     'Content-Type': 'multipart/form-data',
    //                     Authorization: `Bearer ${User.token}`,
    //                 },
    //             }
    //         );

    //         console.log('Response:', response.data);

    //         if (response.status === 200) {
    //             console.log('Post created successfully replyyyyyy', response);
    //             getRefreshComments()
    //             // setButtonLoader(false)
    //             getData()
    //             // props.navigation.navigate('InventionHome');
    //             // Toast.show({ text1: response.data.headers.message });
    //         } else {
    //             console.log('Error creating post:', response.data.headers.message);
    //         }

    //         // Assuming you want to set loading to false after the request.

    //     } catch (error) {
    //         console.error('Error in CreatePost', error);
    //     }
    // }
    // list for all sub comments


    const handleAddCommentSubmitClick = async (subComment, subCommentImage) => {
        console.log('my reply comment ');

        // Keyboard.dismiss()
        // setButtonLoader(true)
        if (!subComment && (!subCommentImage || subCommentImage.length === 0)) {
            // Show a toast message when both taskComments and picker are empty
            Toast.show({ text1: 'Please enter a comment or select an image' });
            return

        }
        console.log('does it reach here a subcomment comment or an image');
        try {
            console.log('Starting post creation...');

            const data = new FormData();

            data.append("comment_id", items.id);
            data.append("comment", subComment);

            if (subCommentImage !== null) {
                subCommentImage.map((e, index) => {
                    data.append(`files`, e);
                });
            }

            console.log('Data to be sent:', data);

            if (subComment || subCommentImage) {
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
                    console.log('Post created successfully replyyyyyy', response);

                    handleAddSubCommentModalClose()
                    getRefreshComments();
                    setButtonLoader(false)

                    getData();
                    // props.navigation.navigate('InventionHome');
                    // Toast.show({ text1: response.data.headers.message });
                } else {
                    console.log('Error creating post:', response.data.headers.message);
                }
            } else {
                console.log('Neither subComment nor subCommentImage provided.');
            }
        } catch (error) {
            console.error('Error in CreatePost', error);
        }

    };

    const renderAddedSubComments = ({ item }) => {
        return (
            <AddedSubComments
                subCommentData={item}
                onEditClick={handleEditComment}
                onDeleteClick={handleDeleteComment}
                onEditClickSub={handleEditComment}
                onDeleteClickSub={handleDeleteComment}
                getSubSubCommentsRefresh={getRefreshComments}
                myUserId={myUserId}
            />
        )
    }

    // list for comments images
    const renderAddedSubCommentsImages = ({ item }) => {
        return <CommentImagesTab commentImages={item} />
    }

    // function for open modal on delete comment click
    const handleDeleteComment = selectedData => {
        setDeleteModal(true)
        setSelectedCommentId(
            selectedData?.commentid ? selectedData?.commentid : selectedData?.id
        )
    }

    // function for delete button click on api call to delete comment
    const deleteCommen = () => {
        var data = { commentid: selectedCommentId }
        // GroupServices.postDeleteComment(data)
        //     .then(response => {
        //         toastRef.current.getToast(response.data.message, "success")
        //         getRefreshComments()
        //     })
        //     .catch(error => {
        //         console.log(error)
        //     })
    }
    const deleteComment = async () => {
        console.log('task called fro ssuuu')
        console.log('delete_groupComments + selectedCommentId', delete_groupComments + selectedCommentId);

        const { responseJson, err } = await requestGetApi(delete_groupComments + selectedCommentId, '', 'DELETE', User.token)
        console.log('the res after sucess  delte of commentrere------------???', responseJson
        )
        if (responseJson.headers.success == 1) {
            console.log('the res after sucess  delte of commentrere------------???', responseJson.headers.message
            )
            Toast.show({ text1: responseJson.headers.message })
            getRefreshComments()
            // setAllSubComment(responseJson.body)


        } else {

            setalert_sms(err)
            setMy_Alert(true)
        }
    }

    // function for open modal on edit comment click
    const handleEditComment = selectedData => {
        setEditModal(true)
        setSelectedEditCommentData(selectedData)
    }

    // function for close modal on edit comment click
    const handleEditModalClose = () => {
        setEditModal(false)
    }

    // function for edit button click on api call to edit comment
    const handleEditModalSubmitClick = async (

        taskComments,
        feedbackImage,
        deletedImagesId
    ) => {
        // setEditModal(false)
        console.log('my data for commets------>>>>>>', taskComments);
        if (!taskComments && (!feedbackImage || feedbackImage.length === 0)) {
            // Show a toast message when both taskComments and picker are empty
            Toast.show({ text1: 'Please enter a comment or select an image' });
            return; // Prevent further execution of the function
        }
        try {
            const commentData = new FormData()

            if (feedbackImage !== null) {
                feedbackImage.map((e, index) => {
                    commentData.append(`files`, e)
                })
            }
            // commentData.append(
            //     "commentid",
            //     selectedEditCommentData?.commentid
            //         ? selectedEditCommentData?.commentid
            //         : selectedEditCommentData?.id
            // )
            commentData.append("comment", taskComments)
            deletedImagesId.forEach(e => commentData.append("deletedimagesid[]", e))

            // GroupServices.postEditComment(commentData)
            //     .then(response => {
            //         toastRef.current.getToast(response.data.message, "success")
            //         getRefreshComments() //for refresh the comment section after edit
            //     })
            //     .catch(error => {
            //         console.log(error)
            //     })
            // commentData.append("comment", taskComments)
            deletedImagesId.forEach(e => commentData.append(`deletedimagesid[]`, e))
            console.log('my ppended data-->', commentData);
            // const { responseJson, err } = await requestPostApi(furl, commentData, 'PUT', User.token)

            var url = `http://54.153.75.225/backend/api/v1/goaccounting/edit-comment/${selectedEditCommentData?.id}`

            console.log('my data final', url)
            const response = await axios.put(url, commentData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${User.token}`,
                },
            });

            console.log('Response:', response);

            if (response.status === 200) {
                console.log('Post edited successfully', response.data);
                // Handle success
                handleEditModalClose()
                getRefreshComments();
                // setButtonLoader(false)

                getData()
            } else {
                console.log('Error creating post:', response.data.headers.message);
                // Handle error
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    }

    return (
        <View style={styles.container}>
            {/* profile image , user name and time section  */}
            <View style={styles.profileDirection}>
                <View style={styles.direction}>
                    <View style={styles.profileImageContainer}>
                        {console.log('profile image of comments details--??', items?.profileimage
                        )}
                        <Image
                            source={
                                items?.profileimage

                                    ? {
                                        uri: `${items.profileimage

                                            }`
                                    }
                                    : require("../../../../assets/Remindably/avatar.png")
                            }
                            resizeMode="contain"
                            style={{
                                borderRadius: 50,
                                height: "100%",
                                width: "100%",
                            }}
                        />
                    </View>
                    <Text style={styles.userName}>{items.username}</Text>
                </View>

                {/* display edit icon basis of customer id match  */}
                {console.log(items, 'my edit button checlk')}
                {User.userid == items?.commentuserid ? (
                    <View style={styles.direction}>
                        <TouchableOpacity
                            style={styles.editContainer}
                            onPress={() => {
                                handleEditComment(items)
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
                                handleDeleteComment(items)
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

            <Text style={styles.commentTime}>{items?.difference}</Text>

            {/* feedback comment image section */}
            {console.log('items?.commentimages', items?.commentimages)}
            {items?.commentimages?.length >= 0 ? (

                <FlatList
                    data={items?.commentimages}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    renderItem={renderAddedSubCommentsImages}
                    keyExtractor={(item, index) => String(index)}
                />
            ) : null}

            {/* comment section  */}
            <View style={styles.commentContainer}>
                {/* quotes image section  */}
                <View style={styles.backGroundImageContainer}>
                    <Image
                        style={styles.image}
                        resizeMode="contain"
                        source={require("../../../../assets/Remindably/Quotes.png")}
                    />
                </View>

                {/* comment section on basis of read more and read less */}
                <Text
                    style={styles.userComments}
                    onTextLayout={onTextLayout}
                    numberOfLines={textShown ? undefined : 2}
                >
                    {items?.comment}
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

                {/* sub comments section with show and hide comments*/}
                {allSubComment?.length >= 0 ? (
                    <>
                        <FlatList
                            data={!viewAllCommentsVisible ? [] : allSubComment}
                            renderItem={renderAddedSubComments}
                            keyExtractor={(item, index) => String(index)}
                        />

                        {allSubComment?.length > 0 ? (
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
            </View>

            {/* add new sub comment tab  */}
            {console.log('item for reply modal taskkkkk', items)}
            <AddSubCommentModal
                commentDetails={items}
                visibleModal={subCommentsModal}
                onClose={handleAddSubCommentModalClose}
                onSubmitClick={handleAddCommentSubmitClick}
            />

            {/* Edit comment modal  */}
            <EditCommentModal
                commentDetails={selectedEditCommentData}
                visibleModal={editModal}
                onClose={handleEditModalClose}
                onSubmitClick={handleEditModalSubmitClick}
            />

            {/* Delete alert modal  */}
            <DeleteAlertModal
                visibleModal={deleteModal}
                onRequestClosed={() => {
                    setDeleteModal(!deleteModal)
                }}
                onPressRightButton={() => {
                    setDeleteModal(false)
                    deleteComment()
                }}
                subHeading={"Are you sure you want to delete this comment ?"}
            />

            {/* toaster message for error response from API  */}
            {/* <CommonToast ref={toastRef} /> */}
        </View>
    )
}

export default UserCommentsOnTaskView
const styles = StyleSheet.create({
    // container: {
    //     borderRadius: 25,
    //     flex: 1,
    //     margin: 3,
    //     paddingHorizontal: 10,
    //     paddingTop: 10
    // },

    //new container style 16/11/2023
    container: {
        borderRadius: 25,
        flex: 1,
        margin: 10,
        padding: 15,
        // backgroundColor: Mycolors.brightGray,
        borderColor: Mycolors.brightGray,
        borderWidth: 2,
        borderRadius: 15,
        marginBottom: 20
    },

    direction: { flexDirection: "row" },
    profileImageContainer: {
        borderRadius: 50,
        height: 30,
        width: 30
    },
    image: {
        borderRadius: 50,
        height: "100%",
        width: "100%",
        tintColor: Mycolors.THEME_ORANGE
    },
    userName: {
        color: Mycolors.THEME_BLACK,
        fontSize: 16,
        fontWeight: "700",
        paddingHorizontal: 5,
        paddingTop: 5,
        width: "70%"
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
    commentContainer: {
        paddingHorizontal: 10
    },
    backGroundImageContainer: {
        height: 80,
        opacity: 0.5,
        position: "absolute",
        right: 50,
        width: 80
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
        padding: 3,
    },
    readMoreText: {
        color: Mycolors.THEME_ORANGE,
        lineHeight: 21,
        width: "35%"
    },
    moreReplyContainer: {
        width: "40%",

    },
    moreReplyText: {
        color: Mycolors.THEME_ORANGE,
        fontSize: 16,
        fontWeight: "500"
    }
})
