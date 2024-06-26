//external imports
import {
    FlatList,
    Image,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native"
import React, { useEffect, useState, useRef } from "react"
//internal imports
// import GroupServices from "../../service/GroupServices"

import { get_gropus, requestGetApi } from '../../../../WebApi/Service'
import { useSelector, useDispatch } from 'react-redux';
import ShareRoutineModalTab from "../routine/ShareRoutineModalTab"
import SubmitButton from "../../Constants/SubmitButton"
// import { colors } from "../../constants/ColorConstant"
import { Mycolors } from "../../../../utility/Mycolors"
const ShareNotesModal = ({
    buttonLoader,
    onClose,
    onSubmitClick,
    visibleModal,
    noteId
}) => {
    const scrollRef = useRef();
    const [arrayList, setArrayList] = useState([])
    const [checked, setChecked] = useState(false)
    const [myGroupList, setMyGroupList] = useState([])
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const User = useSelector(state => state.user.user_details)
    useEffect(() => {
        console.log('my notes id---->>>', noteId)
        setArrayList([])
        Categories()
        console.log();
        // GroupServices.getMyGroups()
        //     .then(response => {
        //         setMyGroupList(response.data.mygroups)
        //     })
        //     .catch(error => {
        //         console.log(error)
        //     })
    }, [visibleModal, onClose, onSubmitClick])

    // list for shared routine
    const renderGroupList = ({ item }) => {
        return (
            <ShareRoutineModalTab
                items={item}
                handleChecked={handleChecked}
                checked={checked}
                checkedList={arrayList}
            />
        )
    }

    // function on select group click
    const handleChecked = selectedId => {
        setChecked(true)
        if (arrayList.includes(selectedId)) {
            setArrayList(arrayList.filter(ids => ids !== selectedId))
        } else {
            setArrayList([...arrayList, selectedId])
        }
    }
    // const Categories = async () => {
    //     console.log('categories called')
    //     // setPageLoader(true)
    //     var fUrl = get_gropus
    //     var url = `?note_id=` + noteId
    //     if (url != undefined) {
    //         fUrl = fUrl + url
    //     }
    //     console.log('mu new url after update---->>>', fUrl);
    //     const { responseJson, err } = await requestGetApi(fUrl, '', 'GET', User.token)
    //     // setPageLoader(false)
    //     console.log('response afer click of items hhhhh', responseJson.body.data.length)
    //     setMyGroupList(responseJson.body.data)
    //     if (responseJson.headers.success == 1) {
    //         console.log('the res after sucess of category', responseJson.body)

    //     } else {

    //         setalert_sms(err)
    //         setMy_Alert(true)
    //     }
    // }


    const Categories = async (getnwPage = false) => {
        console.log('all memeneee for teh group listin')
        // setPageLoader(true)
        console.log('my page ------>>>', page);
        console.log('my gt new page---->>>', getnwPage);
        const newpage = getnwPage ? page + 1 : 1;
        console.log('my new getnewpage', getnwPage ? page + 1 : 1);
        // Update the fUrl with the new page value
        // var fUrl = get_gropus
        var fUrl = get_gropus;
        var url = `?note_id=` + noteId
        var murl = `&page=${newpage}&limit=10`
        if (url != undefined) {
            fUrl = fUrl + url + murl
        }
        // console.log('my furl fr groups---->>>', fUrl);
        const { responseJson, err } = await requestGetApi(fUrl, '', 'GET', User.token)

        if (responseJson.headers.success == 1) {
            console.log('mmmmmmm');
            if (!getnwPage) {
                console.log('my last page--->>>', responseJson.body.data)
                // setPageLoader(false)
                setMyGroupList(responseJson.body.data)
                setLastPage(responseJson.body.lastPage);

            } else {
                // setPageLoader(false)
                console.log('my new page in the else condition--->>', newpage);
                setMyGroupList((myGroupList) => [...myGroupList, ...responseJson.body.data]);
                setPage(newpage)
                console.log('i have reachedd to the point');
            }
            return
            if (!getnwPage) {
                console.log('for data 10', responseJson.body);
                setPageLoader(false)
                console.log('response afer click of items my task', responseJson.body.lastPage)
                setMyGroupList(responseJson.body.data)
                setLastPage(responseJson.body.lastPage);
            } else {
                console.log('does i rach in the else block');
                console.log('for data 4', responseJson.body.data);
                console.log('does it reach to yyyyyy');
                setPageLoader(false)

                setMyGroupList((myGroupList) => [...myGroupList, ...responseJson.body.data]);
                // setMyGroupList(responseJson.body.data)
                // Check if responseJson.body.articles is not undefined or empty before updating the page state

            }
        } else {

            setalert_sms(err)
            setMy_Alert(true)
        }
    }

    const handleLoadMore = async () => {
        console.log('is homePAge2 is called', lastPage);
        console.log('my last page---->>', lastPage, page);
        if (page < lastPage) {
            console.log('page of my startup page', page < lastPage);
            await Categories(true);
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
        <View>
            <Modal
                animationType="fade"
                transparent={true}
                visible={visibleModal}
                onRequestClose={() => {
                    onClose()
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalViewRepeat}>
                        {/* cross button section  */}
                        <TouchableOpacity
                            style={styles.crossContainer}
                            onPress={() => {
                                onClose()
                            }}
                        >
                            <Image
                                style={styles.imageStyle}
                                resizeMode="contain"
                                source={require("../../../../assets/Remindably/cross.png")}
                            />
                        </TouchableOpacity>

                        <Text style={styles.heading}>Great!</Text>
                        <Text style={styles.title}>
                            Share your notes across groups your Are In..
                        </Text>

                        <FlatList
                            data={myGroupList}
                            ref={scrollRef}
                            showsHorizontalScrollIndicator={true}
                            onEndReachedThreshold={0.9}
                            onEndReached={
                                handleLoadMore
                            }
                            renderItem={renderGroupList}
                            keyExtractor={(item, index) => String(index)}
                        />
                        <TouchableOpacity onPress={() => onSubmitClick(arrayList)}>
                            <SubmitButton
                                loader={buttonLoader}
                                buttonText={"Share"}
                                submitButton={() => {
                                    onSubmitClick(arrayList)
                                }}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default ShareNotesModal

const styles = StyleSheet.create({
    centeredView: {
        backgroundColor: "rgba(0, 0, 0, 0.66)",
        flex: 1,
        justifyContent: "flex-end"
    },
    modalViewRepeat: {
        backgroundColor: Mycolors.WHITE,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        elevation: 5,
        height: 500,
        padding: 20,
        shadowColor: "#000"
    },
    heading: {
        color: Mycolors.THEME_ORANGE,
        fontSize: 25,
        fontWeight: "400",
        paddingTop: 10
    },
    title: {
        color: Mycolors.THEME_BLACK,
        fontSize: 16,
        fontWeight: "400"
    },
    direction: {
        flexDirection: "row"
    },
    titleText: {
        color: Mycolors.THEME_ORANGE,
        fontSize: 18,
        fontWeight: "500",
        paddingVertical: 5
    },
    nameText: {
        color: Mycolors.THEME_BLACK,
        fontSize: 18,
        fontWeight: "500",
        paddingVertical: 5,
        width: "70%"
    },
    crossContainer: {
        backgroundColor: Mycolors.THEME_ORANGE,
        borderRadius: 50,
        height: 30,
        position: "absolute",
        right: 15,
        top: 20,
        width: 30,
        zIndex: 1
    },
    imageStyle: {
        borderRadius: 10,
        height: "100%",
        width: "100%"
    }
})
