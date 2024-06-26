//external imports
import {
    ActivityIndicator,
    FlatList,
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native"
import LinearGradient from "react-native-linear-gradient"
import React, { useEffect, useState, useRef } from "react"
// internal imports
import Toast from 'react-native-toast-message'
// get_listing
import { get_details, requestGetApi, get_task, recent_members, manageGroup, requestPostApi, deleteGroup, get_listing, unpin_note, pin_note, share_routine } from '../../../../WebApi/Service'
import { useSelector, useDispatch } from 'react-redux';
import CustomHeader from "../../Constants/CustomHeaader"

import PinNotesCard from "./PinNotesCard"
import ShareNotesModal from "./ShareNotesModal"
import ShareNotesSuccessModal from "./ShareNotesSuccessModal"
import UnpinNotesCard from "./UnpinNotesCard"
// import { colors } from "../../constants/ColorConstant"
import { Mycolors } from "../../../../utility/Mycolors"
const Notes = ({ navigation }) => {
    const scrollRef = useRef();
    const [buttonLoader, setButtonLoader] = useState(false)
    const [groupCount, setGroupCount] = useState(0)
    const [myNotes, setMyNotes] = useState([])
    const [noData, setNoData] = useState(false)
    const [pageLoader, setPageLoader] = useState(false)
    const [pinnedNotes, setPinnedNotes] = useState([])
    const [searchText, setSearchText] = useState("")
    const [shareNotesId, setShareNotesId] = useState(0)
    const [shareNotesModal, setShareNotesModal] = useState(false)
    const [sharedNotesSuccessModal, setSharedNotesSuccessModal] = useState(false)
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const User = useSelector(state => state.user.user_details)
    // function for open side menu
    const handleOpenDrawer = () => {
        navigation.openDrawer()
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            // setPageLoader(true)
            setSearchText("")
            getData('')
        })
        return unsubscribe
    }, [navigation])

    // function for get all note data on api call
    // const getData = () => {
    //     // NotesService.getAllNotes()
    //     //     .then(response => {
    //     //         setPageLoader(false)
    //     //         setPinnedNotes(response.data.pinnednotes)
    //     //         setMyNotes(response.data.mynotes)
    //     //     })
    //     //     .catch(error => {
    //     //         setPageLoader(false)
    //     //         console.log(error)
    //     //     })
    // }
    // const getData = async () => {
    //     // console.log('task called group_id', groupId)
    //     // setPageLoader(true)
    //     var fUrl = get_listing
    //     // var urls = '?group_id=' + groupId
    //     // console.log('my url---------->', urls)
    //     // if (urls != undefined) {
    //     //     fUrl = fUrl + urls
    //     // }
    //     console.log('furlsssssssssss->>>>>>>>>>>', fUrl)
    //     const { responseJson, err } = await requestGetApi(fUrl, '', 'GET', User.token)
    //     // setPageLoader(false)
    //     console.log('response of get notes-------->>>>>', responseJson.body)
    //     // setMyGroupList(responseJson.body)
    //     if (responseJson.headers.success == true) {
    //         console.log('the res of get notes after success--->>>', responseJson.body)
    //         // setMyNotes(responseJson.body)
    //         const pinnedNotes = responseJson.body.filter(note => note.status === 'Pinned');
    //         const unpinnedNotes = responseJson.body.filter(note => note.status === 'Unpinned');

    //         // Now you have two separate arrays based on the status
    //         console.log('Pinned Notes:', pinnedNotes);
    //         console.log('Unpinned Notes:', unpinnedNotes);
    //         setPinnedNotes(pinnedNotes)
    //         setMyNotes(unpinnedNotes)
    //         // setRecentlyMemberLoader(false)
    //         // setRecentlyAddedMemberList(responseJson.body)

    //     } else {

    //         setalert_sms(err)
    //         setMy_Alert(true)
    //     }
    // }
    const getData = async (text, getnwPage = false) => {

        const newpage = getnwPage ? page + 1 : 1;
        var fUrl = get_listing + `?page=${newpage}&limit=10`;
        var urls = '&search=' + text
        if (urls != undefined) {
            fUrl = fUrl + urls
        }

        const { responseJson, err } = await requestGetApi(fUrl, '', 'GET', User.token)
        console.log('furlsssssssssss of my notes->>>>>>>>>>>', fUrl)
        setPageLoader(true)
        if (responseJson.headers.success == 1) {
            console.log('the res of get notes after success--->>>', responseJson.body.data.status)
            const pinnedNotes = responseJson.body.data.filter(note => note.status === 'Pinned');
            const unpinnedNotes = responseJson.body.data.filter(note => note.status === 'Unpinned');
            if (!getnwPage) {
                console.log('my last page--->>>', responseJson.body.data)

                setPageLoader(false)
                setNoData(false)
                setPinnedNotes(pinnedNotes)
                setMyNotes(unpinnedNotes)
                setLastPage(responseJson.body.lastPage);

            } else {
                setPageLoader(false)
                setNoData(false)
                setPage(newpage)
                console.log('my new page in the else condition--->>', responseJson.body.data.length);
                const uuu = responseJson.body.data.filter(note => note.status === 'Pinned');
                const pined = responseJson.body.data.filter(note => note.status === 'Unpinned');
                setPinnedNotes((pinnedNotes) => [...pinnedNotes, ...uuu]);
                setMyNotes((unpinnedNotes) => [...unpinnedNotes, ...pined]);

                console.log('i have reachedd to the point');
            }
        } else {
            setPageLoader(false)
            setNoData(true)
            setMyNotes([])

            setPinnedNotes([])
            setalert_sms(err)
            setMy_Alert(true)
        }
    }
    const searchNotes = async (text) => {
        setPageLoader(true)
        var fUrl = get_listing
        var urls = '?search=' + text

        if (urls != undefined) {
            fUrl = fUrl + urls
        }
        const { responseJson, err } = await requestGetApi(fUrl, '', 'GET', User.token)
        setPageLoader(false)

        if (
            responseJson.body.length &&
            responseJson.body.length > 0
        ) {
            // console.log('comes into if block');
            // setPinnedNotes(response.data.pinnednotes)
            setMyNotes(responseJson.body)
            setPageLoader(false)
            setNoData(false)
        } else {
            // setPinnedNotes(response.data.pinnednotes)
            setMyNotes(responseJson.body)
            setPageLoader(false)
            setNoData(true)
        }
    }



    const renderPinNotesItem = ({ item }) => {
        // console.log('my pinded notrs destails---->>>>', item);
        return (
            <PinNotesCard
                items={item}
                handleView={handleViewNotes}
                handleUnpin={handleUnpinNotes}
                handleShareNote={handleShareNotes}
            />
        )
    }
    // list for all un pined notes
    const renderUnpinNotesItem = ({ item }) => {
        // console.log('my unpined details ------>>>', item)
        return (
            <UnpinNotesCard
                items={item}
                handleView={handleViewNotes}
                handlePin={handlePinNotes}
                handleShareNote={handleShareNotes}
            />
        )
    }

    // function for open modal on share icon click
    const handleShareNotes = id => {
        setShareNotesId(id)
        setShareNotesModal(true)
    }

    // function for submit button click on api call to un pin any notes
    const handleUnpinNotes = async (unpinNotesId) => {
        // console.log('does unpined get click');
        // NotesService.getUnpinNotes(unpinNotesId)
        //     .then(response => {
        //         getData() // for refresh the notes page
        //     })
        //     .catch(error => {
        //         console.log(error)
        //     })

        const { responseJson, err } = await requestPostApi(unpin_note + unpinNotesId, '', 'PUT', User.token)
        // setPageLoader(false)
        // console.log('response of pined  notes id-------->>>>>', responseJson.body)
        // setMyGroupList(responseJson.body)
        if (responseJson.headers.success == true) {
            getData('')
            // console.log('the res of get notes after success--->>>', responseJson.body)
            // setMyNotes(responseJson.body)

        } else {

            setalert_sms(err)
            setMy_Alert(true)
        }
    }


    // unpin_note


    // function for submit button click on api call to pin any notes
    const handlePinNotes = async (pinNotesId) => {
        // console.log('does pined get click');
        const { responseJson, err } = await requestPostApi(pin_note + pinNotesId, '', 'PUT', User.token)
        // setPageLoader(false)
        // console.log('response of pined  notes id-------->>>>>', responseJson.body)
        // setMyGroupList(responseJson.body)
        if (responseJson.headers.success == true) {
            getData('')
            // console.log('the res of get notes after success--->>>', responseJson.body)
            // setMyNotes(responseJson.body)

        } else {

            setalert_sms(err)
            setMy_Alert(true)
        }
    }

    // navigation for notes details on notes tab click
    const handleViewNotes = notesId => {
        // console.log('my notes id--->', notesId);
        navigation.navigate(
            "NotesDetails",
            { id: notesId }
        )
    }

    // function for close modal on share note close click
    const handleShareNotesModalClose = () => {
        setShareNotesModal(false)
    }

    // function for submit button click on api call to share notes
    const handleShareNotesSubmitClickk = list => {
        setButtonLoader(true)
        const feedBackData = new FormData()
        feedBackData.append("note_id", shareNotesId)
        list.map((e, index) => {
            feedBackData.append(`group_id[${index}]`, e)
        })
        setGroupCount(list.length)

        // NotesService.postShareNotes(feedBackData)
        //     .then(response => {
        //         setButtonLoader(false)
        //         setShareNotesModal(false)
        //         setSharedNotesSuccessModal(true)
        //     })
        //     .catch(error => {
        //         setButtonLoader(false)
        //         console.log(error)
        //     })
    }


    const handleShareNotesSubmitClick = async (list) => {
        console.log('my te,ms for succes fdimnn-->', list);
        if (list.length === 0) {
            // If the list is empty, you can handle it here (e.g., show an error message).
            Toast.show({ text1: 'Please select group' });
            return;
        }

        setButtonLoader(true)
        try {
            const data = {
                note_id: shareNotesId,
                group_id: list
            }

            setGroupCount(list.length)

            console.log('my data members??????????????', data)
            const { responseJson, err } = await requestPostApi(share_routine, data, 'POST', User.token)
            if (responseJson.headers.success == 1) {
                console.log('Post shared succesfulll---->>>>', responseJson);
                setShareNotesModal(false)
                Toast.show({ text1: responseJson.headers.message });
            }
            else {
                console.log('note not shared');
            }
            // Handle success

        } catch (error) {
            console.error('An error occurred:', error);
        }
    }

    // function for close modal on success share click
    const handleShareRoutineSuccessModalClose = () => {
        setSharedNotesSuccessModal(false)
    }

    // navigation for notes details on notes click
    const handleShareRoutineSuccessSubmitClick = () => {
        setSharedNotesSuccessModal(false)
        navigation.navigate("StackNavigation", {
            screen: "NotesDetails",
            params: { id: shareNotesId }
        })
    }
    const handleLoadMore = async () => {
        console.log('my page fo the notes--->>', page)
        if (page < lastPage) {
            console.log('page of my startup page', page < lastPage);
            await getData('', true);
            console.log('Categories function completed. Updated state:', lastPage, page);
            // Continue with any additional logic after the async operation
        } else {
            console.log('Reached last page in share modL');
            return
            // Handle the case where you've reached the last page
            // You can display a message or perform other actions here if needed
        }
    };

    return (
        <View style={styles.container}>
            {/* header section */}
            <CustomHeader
                headerText={"Notes"}
                drawerButton={{
                    visible: true,
                    onClick: () => {
                        handleOpenDrawer()
                    }
                }}
                bellButton={{
                    visible: true,
                    onClick: () => {
                        navigation.navigate(
                            "Notifications"
                        )
                    }
                }}
            />

            {/* body section */}
            <View style={styles.body}>
                {/* search box */}
                <View style={styles.searchBoxContainer}>
                    <View style={styles.inputContainer}>
                        <TextInput
                            placeholder="Search notes by name"
                            placeholderTextColor={Mycolors.textGray}
                            style={styles.searchInput}
                            value={searchText}
                            onChangeText={text => {
                                setSearchText(text)
                                // searchNotes(text)
                                getData(text)
                            }}
                        />
                    </View>
                    <View style={styles.searchContainer}>
                        <TouchableOpacity>
                            <Image
                                resizeMode="contain"
                                source={require("../../../../assets/Remindably/searchIcon.png")}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            {!pageLoader ? (
                <>
                    {/* pinned notes   */}
                    {pinnedNotes?.length > 0 ? (
                        <>
                            <Text style={styles.notesHeading}>Pinned Notes</Text>
                            <View style={styles.pinedNotesContainer}>
                                <FlatList
                                    data={pinnedNotes}
                                    renderItem={renderPinNotesItem}
                                    keyExtractor={(item, index) => String(index)}
                                />
                            </View>
                        </>
                    ) : null}

                    {/* Unpinned notes  */}
                    {console.log('my notes pagination----->>>', myNotes)}
                    {myNotes?.length || pinnedNotes?.length > 0 ? (
                        myNotes?.length > 0 ? (
                            <>
                                <Text style={styles.notesHeading}>All Notes</Text>
                                <View style={styles.unPinedNotesContainer}>
                                    <FlatList
                                        ref={scrollRef}
                                        showsHorizontalScrollIndicator={true}
                                        onEndReachedThreshold={0.9}
                                        onEndReached={
                                            handleLoadMore
                                        }
                                        data={myNotes}
                                        renderItem={renderUnpinNotesItem}
                                        keyExtractor={(item, index) => String(index)}
                                    />
                                </View>
                            </>
                        ) : null
                    ) : (
                        <View style={styles.noDataContainer}>
                            {!noData ? (
                                <Text style={styles.noDataText}>
                                    No Notes created yet. {"\n"}Click on the "Create Icon" to
                                    create a Notes.
                                </Text>
                            ) : (
                                <Text style={styles.noDataText}>No result found</Text>
                            )}
                        </View>
                    )}
                </>
            ) : (
                <View style={styles.loaderContainer}>
                    <ActivityIndicator size="large" color={Mycolors.THEME_ORANGE} />
                </View>
            )}

            {/* create notes icon  */}
            <LinearGradient
                colors={["#F28520", "#F5BD35"]}
                style={styles.createIconContainer}
            >
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate(
                            "CreateNotes"
                        )
                    }}
                >
                    <Image
                        style={styles.createIconImage}
                        resizeMode="contain"
                        source={require("../../../../assets/Remindably/Plus.png")}
                    />
                </TouchableOpacity>
            </LinearGradient>

            {/* Share Routine Modal */}
            <ShareNotesModal
                buttonLoader={buttonLoader}
                visibleModal={shareNotesModal}
                onClose={handleShareNotesModalClose}
                noteId={shareNotesId}
                onSubmitClick={handleShareNotesSubmitClick}
            />

            {/* Share Routine Success Modal */}
            <ShareNotesSuccessModal
                groupCount={groupCount}
                visibleModal={sharedNotesSuccessModal}
                onClose={handleShareRoutineSuccessModalClose}
                onSubmitClick={handleShareRoutineSuccessSubmitClick}
            />
        </View>
    )
}

export default Notes

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    body: {
        padding: 10
    },
    searchBoxContainer: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    inputContainer: {
        borderRadius: 8,
        width: "83%"
    },
    searchInput: {
        backgroundColor: Mycolors.WHITE,
        borderRadius: 8,
        color: Mycolors.BLACK,
        fontSize: 16,
        padding: 10,
        paddingLeft: 10
    },
    searchContainer: {
        alignItems: "center",
        backgroundColor: Mycolors.THEME_ORANGE,
        borderRadius: 10,
        justifyContent: "center",
        width: "14%"
    },
    notesHeading: {
        color: Mycolors.BLACK,
        fontSize: 18,
        fontWeight: "bold",
        paddingHorizontal: 20
    },
    pinedNotesContainer: {
        height: "auto",
        maxHeight: "35%",
        paddingVertical: 5
    },
    unPinedNotesContainer: {
        flex: 1,
        marginBottom: 10,
        paddingBottom: 10,
        paddingVertical: 5
    },
    createIconContainer: {
        alignItems: "center",
        backgroundColor: Mycolors.WHITE,
        borderColor: Mycolors.lightYellow,
        borderRadius: 50,
        borderWidth: 2,
        bottom: 50,
        height: 60,
        justifyContent: "center",
        position: "absolute",
        right: 10,
        width: 60,
        zIndex: 1
    },
    createIconImage: {
        borderRadius: 50,
        height: 35,
        width: 35
    },
    loaderContainer: {
        alignSelf: "center",
        flex: 1,
        justifyContent: "center"
    },
    noDataContainer: {
        alignItems: "center",
        height: "58%",
        justifyContent: "center",
        paddingHorizontal: 5
    },
    noDataText: {
        color: Mycolors.THEME_BLACK,
        fontSize: 20,
        fontWeight: "500",
        textAlign: "center"
    }
})
