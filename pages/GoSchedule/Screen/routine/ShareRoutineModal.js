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
import { get_gropus, requestGetApi } from '../../../../WebApi/Service'
import { useSelector, useDispatch } from 'react-redux';
//internal imports
// import GroupServices from "../../service/GroupServices"
import ShareRoutineModalTab from "./ShareRoutineModalTab"
import SubmitButton from "../../Constants/SubmitButton"
// import { colors } from "../../constants/ColorConstant"
import { Mycolors } from "../../../../utility/Mycolors"

const ShareRoutineModal = ({
    buttonLoader,
    onClose,
    onSubmitClick,
    routineData,
    visibleModal
}) => {
    const scrollRef = useRef();
    // 
    const [arrayList, setArrayList] = useState([])
    const [checked, setChecked] = useState(false)
    const [myGroupList, setMyGroupList] = useState([])
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);

    const User = useSelector(state => state.user.user_details)
    useEffect(() => {
        setArrayList([])
        Categories()
        console.log('my routine details------>>>', routineData?.routineid)
        // function for get all my groups data on api call
        // GroupServices.getMyGroups()
        //     .then(response => {
        //         setMyGroupList(response.data.mygroups)
        //     })
        //     .catch(error => {
        //         console.log(error)
        //     })
    }, [visibleModal])
    const Categories = async (getnwPage = false) => {
        console.log('categories called')
        // setPageLoader(true)
        const newpage = getnwPage ? page + 1 : 1;
        var fUrl = get_gropus
        var url = `?routine_id=` + routineData?.routineid
        if (url != undefined) {
            fUrl = fUrl + url
        }
        console.log('mu new url after update---->>>', fUrl);
        const { responseJson, err } = await requestGetApi(fUrl, '', 'GET', User.token)
        // setPageLoader(false)
        console.log('response afer click of items hhhhh after geting groups', responseJson.headers.success == 1)
        // setMyGroupList(responseJson.body)
        if (responseJson.headers.success == 1) {
            console.log('the res after sucess of category group ', responseJson.body)
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
    // list for all groups
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
                            Share your routine across groups your Are In..
                        </Text>

                        <View style={styles.direction}>
                            <Text style={styles.titleText}>Routine: </Text>
                            <Text style={styles.nameText}>{routineData?.title}</Text>
                        </View>

                        <FlatList

                            ref={scrollRef}
                            showsHorizontalScrollIndicator={true}
                            onEndReachedThreshold={0.9}
                            onEndReached={
                                handleLoadMore
                            }
                            data={myGroupList}
                            renderItem={renderGroupList}
                            keyExtractor={(item, index) => String(index)}
                        />

                        {/* button section */}
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

export default ShareRoutineModal

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
