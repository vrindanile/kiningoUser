//external imports
import {
    ActivityIndicator,
    FlatList,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native"
import React, { useEffect, useState } from "react"
import moment from "moment"
//internal imports
import AddedTimeTab from "../groups/AddedTimeTab"
import CommentsOnRoutine from "./CommentsOnRoutine"
import CustomHeader from "../../Constants/CustomHeaader"
import { get_gropus, requestGetApi, get_memberList, add_members, invite_user, requestPostApi, request_list, home_details, home_detailTask, taskHideUnhide, getRoutines, detailRoutine, markasComplete, markasincomplete, delete_myTask, shareRoutine } from '../../../../WebApi/Service'
import { useIsFocused } from "@react-navigation/native";
import { useSelector, useDispatch } from 'react-redux';
// import RoutineService from "../../service/RoutineService"
// import { colors } from "../../constants/ColorConstant"
import { Mycolors, dimensions } from "../../../../utility/Mycolors"

const SharedRoutineDetails = ({ navigation, route }) => {
    const isFocus = useIsFocused()
    const [commentCount, setCommentCount] = useState(0)
    const [pageLoader, setPageLoader] = useState(false)
    const [routineComments, setRoutineComments] = useState([])
    const [routineDetails, setRoutineDetails] = useState({})
    const [routineId, setRoutineId] = useState('')
    const User = useSelector(state => state.user.user_details)

    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            console.log('my new routines shared----->>>', route?.params?.id)
            getDetails()
            getComments()
            setRoutineId(route?.params?.id)
        })
        return unsubscribe
    }, [isFocus])

    // function for get routine details data on api call
    const getDetails = async () => {
        let data = {
            routineid: routineId
        }
        setPageLoader(true)
        console.log('my url---->>', detailRoutine + route?.params?.id);
        const { responseJson, err } = await requestGetApi(detailRoutine + route?.params?.id, '', 'GET', User.token)
        // 
        console.log('response of detail routinesss for shared routine---??', responseJson.body
        )
        setPageLoader(false)
        setRoutineDetails(responseJson.body)
        setRoutineComments(responseJson.body.commentDetails[0])
            // RoutineService.postRoutineDetails(data)
            //     .then(response => {
            //         setPageLoader(false)
            //         setRoutineDetails(response.data.routines)
            //     })
            .catch(error => {
                setPageLoader(false)
                console.log(error)
            })
    }

    // function for get all comments data on api call
    const getComments = () => {
        let data = {
            routineid: routineId
        }
        // RoutineService.postAllCommentOnRoutine(data)
        //     .then(response => {
        //         setRoutineComments(response.data.commentdetails)
        //         setCommentCount(response.data.commentsCount)
        //     })
        //     .catch(error => {
        //         console.log(error)
        //     })
    }

    // navigation on routine comments page on view click
    const handleViewCommentsClick = id => {
        navigation.navigate("StackNavigation", {
            screen: "RoutineAllComments",
            params: {
                data: id,
                flow: "SHAREDROUTINE"
            }
        })
    }

    // list for comments on routine
    const renderCommentsRoutine = ({ item }) => {
        return (
            <CommentsOnRoutine
                data={item}
                viewCommentsClick={handleViewCommentsClick}
                routineId={routineDetails?.routineid}
            />
        )
    }

    // list for added time
    const renderAddedTime = ({ item }) => {
        return <AddedTimeTab items={item} />
    }

    return (
        <View style={styles.container}>
            {/* header section */}
            <CustomHeader
                headerText={"Routine Details"}
                backButton={{
                    visible: true,
                    onClick: () => {
                        navigation.goBack()
                    }
                }}
            />

            {/* body section */}
            {!pageLoader ? (
                <View style={styles.body}>
                    {/* details container */}
                    <View style={styles.detailsContainer}>
                        {/* preference section */}
                        <View style={styles.preferenceContainer}>
                            <View style={styles.preferenceIcon}>
                                {console.log('my preferce icon----->>>', routineDetails)}
                                {routineDetails?.preferenceicon ? (
                                    <Image
                                        style={{ height: 45, width: 45 }}
                                        resizeMode="contain"
                                        source={{
                                            uri: `${routineDetails?.preferenceicon}`
                                        }}
                                    />
                                ) : null}
                            </View>
                            <View style={styles.nameContainer}>
                                <Text style={styles.preferenceTitle}>
                                    {routineDetails?.preferencename}
                                </Text>

                                {/* routine type */}
                                <Text style={styles.routineType}>
                                    ({routineDetails?.routinetype})
                                </Text>
                            </View>
                        </View>

                        {/* title and sub title container  */}
                        <View style={styles.titleContainer}>
                            <Text style={styles.routineTitle}>{routineDetails?.title}</Text>
                            <Text style={styles.routineSubTitle}>
                                {routineDetails?.subtitle}
                            </Text>
                        </View>

                        {/* date time section  */}
                        <View style={styles.dateTimeContainer}>
                            <View style={styles.direction}>
                                <Image
                                    resizeMode="contain"
                                    tintColor={Mycolors.GRAY}
                                    style={{ height: 15, width: 15 }}
                                    source={require("../../../../assets/Remindably/CalendarBlank.png")}
                                />
                                <Text style={styles.date}>
                                    {moment(routineDetails?.createddate).format("ddd Do MMM")}
                                </Text>
                            </View>

                            {/* time section  */}
                            {routineDetails?.time !== null ? (
                                <FlatList
                                    horizontal={true}
                                    showsHorizontalScrollIndicator={false}
                                    data={routineDetails?.time}
                                    renderItem={renderAddedTime}
                                    keyExtractor={(item, index) => String(index)}
                                />
                            ) : null}
                        </View>

                        {/* description section  */}
                        <View style={styles.descriptionContainer}>
                            <ScrollView nestedScrollEnabled={true}>
                                <Text style={styles.descriptionText}>
                                    {routineDetails?.description}
                                </Text>
                            </ScrollView>
                        </View>
                    </View>

                    {/* Comments section */}
                    <View style={styles.commentLabelContainer}>
                        <Text style={styles.commentCount}>Comments ({commentCount})</Text>
                        <TouchableOpacity
                            style={styles.createRoutineContainer}
                            onPress={() => {
                                navigation.navigate(
                                    "RoutineAllComments",
                                    {
                                        data: routineDetails?.routineid,
                                        flow: "SHAREDROUTINE"
                                    }
                                )
                            }}
                        >
                            <Text style={styles.createRoutineText}>Add Comment</Text>
                            <View style={styles.createRoutineIcon}>
                                <Image
                                    resizeMode="contain"
                                    style={styles.image}
                                    source={require("../../../../assets/Remindably/editIcon.png")}
                                />
                            </View>
                        </TouchableOpacity>
                    </View>

                    {/* other users comments on this task*/}
                    {routineComments?.length > 0 ? (
                        <View style={styles.commentContainer}>
                            <ScrollView style={{ height: '60%' }}>
                                <FlatList
                                    data={routineComments}
                                    scrollEnabled={false}
                                    renderItem={renderCommentsRoutine}
                                    keyExtractor={(item, index) => String(index)}
                                />
                            </ScrollView>
                            {/* view all comments  */}
                            <TouchableOpacity
                                style={{
                                    alignItems: "center",
                                    backgroundColor: Mycolors.THEME_ORANGE,
                                    borderRadius: 20,
                                    flexDirection: "row",
                                    height: 32,
                                    justifyContent: "center",
                                    width: 127,
                                    marginVertical: 20,
                                }}
                                onPress={() => {
                                    navigation.navigate(
                                        "RoutineAllComments",
                                        {
                                            data: routineDetails?.routineid,
                                            flow: "SHAREDROUTINE"
                                        }
                                    )
                                }}
                            >
                                <Text style={styles.createRoutineText}>View All Comments</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <View style={styles.noCommentContainer}>
                            <Image
                                resizeMode="contain"
                                style={styles.noCommentImage}
                                source={require("../../../../assets/Remindably/noCommentImage.png")}
                            />
                            <Text style={styles.noCommentText}>No comments available!</Text>
                        </View>
                    )}
                </View>
            ) : (
                <View style={styles.loaderContainer}>
                    <ActivityIndicator size="large" color={Mycolors.THEME_ORANGE} />
                </View>
            )}
        </View>
    )
}
export default SharedRoutineDetails

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    body: {
        backgroundColor: Mycolors.WHITE,
        margin: 10,
        padding: 10,
        height: dimensions.SCREEN_HEIGHT
    },
    detailsContainer: {
        backgroundColor: Mycolors.WHITE,
        borderRadius: 15,
        marginBottom: 10,
        padding: 10
    },
    direction: {
        flexDirection: "row"
    },
    preferenceContainer: {
        alignItems: "center",
        flexDirection: "row",
        height: 65
    },
    preferenceIcon: {
        alignItems: "center",
        backgroundColor: Mycolors.brightGray,
        borderRadius: 50,
        height: 63,
        justifyContent: "center",
        width: 63
    },
    nameContainer: {
        paddingHorizontal: 8,
        width: "63%"
    },
    preferenceTitle: {
        color: Mycolors.THEME_ORANGE,
        fontSize: 16,
        fontWeight: "500",
        paddingBottom: 5
    },
    routineType: {
        color: Mycolors.GRAY,
        fontSize: 12,
        fontWeight: "400"
    },
    titleContainer: {
        height: "auto",
        paddingVertical: 10,
        width: "100%"
    },
    routineTitle: {
        color: Mycolors.THEME_ORANGE,
        fontSize: 14,
        fontWeight: "500"
    },
    routineSubTitle: {
        color: Mycolors.THEME_BLACK,
        fontSize: 12,
        fontWeight: "400"
    },
    dateTimeContainer: {
        width: "95%"
    },
    date: {
        color: Mycolors.GRAY,
        fontSize: 12,
        marginBottom: 5,
        paddingLeft: 5
    },
    descriptionContainer: {
        height: "auto",
        marginVertical: 5,
        maxHeight: 180,
        padding: 5
    },
    descriptionText: {
        color: Mycolors.THEME_BLACK,
        fontSize: 14,
        textAlign: "justify"
    },
    commentLabelContainer: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",

    },
    commentCount: {
        color: Mycolors.THEME_BLACK,
        fontSize: 14,
        fontWeight: "400",
        paddingVertical: 10
    },
    createRoutineContainer: {
        alignItems: "center",
        backgroundColor: Mycolors.THEME_ORANGE,
        borderRadius: 20,
        flexDirection: "row",
        height: 32,
        justifyContent: "center",
        width: 127,
        backgroundColor: 'red'
    },
    createRoutineIcon: {
        backgroundColor: Mycolors.WHITE,
        borderRadius: 50,
        height: 24,
        padding: 3,
        width: 24
    },
    image: {
        borderRadius: 50,
        height: "100%",
        width: "100%"
    },
    createRoutineText: {
        color: 'white',
        fontSize: 12,
        fontWeight: "400",
        paddingRight: 5
    },
    commentContainer: { height: "50%", },
    noCommentContainer: {
        alignContent: "center",
        alignItems: "center",
        height: "28%",
        justifyContent: "center"
    },
    noCommentImage: {
        height: 135,
        width: 135
    },
    noCommentText: {
        color: Mycolors.THEME_BLACK,
        fontSize: 18,
        fontWeight: "500",
        padding: 20
    },
    submitButtonContainer: { marginVertical: 20 },
    loaderContainer: {
        alignSelf: "center",
        height: "83%",
        justifyContent: "center"
    }
})
