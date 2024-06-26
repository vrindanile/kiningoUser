//external imports
import {
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native"
import React from "react"
// internal imports
import AddedTimeTab from "../groups/AddedTimeTab"
// import { colors } from "../../constants/ColorConstant"
import { Mycolors } from "../../../../utility/Mycolors"
const MyTaskTab = ({
    data,
    handleMarkComplete,
    handleMarkInComplete,
    hideClick,
    onTaskTabClick,
    unHideClick
}) => {
    { console.log('my destails fortime ser------', data) }
    // list for added time
    const renderAddedTime = ({ item }) => {
        console.log('my addede time------>>>', item)
        return <AddedTimeTab items={item} />
    }

    return (
        <>
            {data?.hidestatus == "0" ? (
                <TouchableOpacity
                    style={styles.container}
                    onPress={() => onTaskTabClick(data)}
                >
                    <Image
                        resizeMode="contain"
                        style={styles.taskIcon}
                        source={require("../../../../assets/Remindably/taskIcon.png")}
                    />
                    <View>
                        <View style={styles.hideDirection}>
                            {data?.tasktype === "T" ? (
                                <Text style={styles.groupText}>Task</Text>
                            ) : data?.tasktype === "R" ? (
                                <Text style={styles.groupText}>Routine</Text>
                            ) : null}
                        </View>

                        <Text style={styles.taskTitle}>{data.name}</Text>

                        <View style={styles.direction}>
                            <Image
                                resizeMode="contain"
                                style={styles.calendarIcon}
                                source={require("../../../../assets/Remindably/CalendarBlank.png")}
                            />
                            <Text style={styles.date}> {data?.created_date}</Text>
                        </View>

                        {/* time section  */}
                        {data?.time !== null ? (

                            <View style={{ width: 270 }}>
                                {console.log('date time task----->>>', data?.time)}
                                <FlatList
                                    horizontal={true}
                                    showsHorizontalScrollIndicator={false}
                                    data={data?.time}
                                    renderItem={renderAddedTime}
                                    keyExtractor={(item, index) => String(index)}
                                />
                            </View>
                        ) : null}

                        {data?.tasktype === "T" ? (
                            <View style={styles.direction}>
                                <Text style={styles.groupText}>Group </Text>
                                <View style={styles.dotContainer} />
                                <Text style={styles.taskTitle}> {data.groupname}</Text>
                            </View>
                        ) : null}
                    </View>

                    <View style={styles.iconContainer}>
                        {/* hide icon */}
                        <TouchableOpacity
                            style={styles.hideContainer}
                            onPress={() => {
                                hideClick(data?.id, data.time.timevalue)
                            }}
                        >
                            <Image
                                style={styles.icon}
                                resizeMode="contain"
                                source={require("../../../../assets/Remindably/hideIcon.png")}
                            />
                        </TouchableOpacity>

                        {/* complete Icon  */}
                        {data?.completestatus !== "Completed" ? (
                            <TouchableOpacity
                                style={styles.checkImageContainer}
                                onPress={() => {
                                    handleMarkComplete(data?.id, data.time.timevalue)
                                }}
                            >
                                <Image
                                    resizeMode="contain"
                                    style={styles.icon}
                                    source={require("../../../../assets/Remindably/redCircle.png")}
                                />
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity
                                style={styles.checkImageContainer}
                                onPress={() => {
                                    handleMarkInComplete(data?.id, data.time.timevalue)
                                }}
                            >
                                <Image
                                    resizeMode="contain"
                                    style={styles.icon}
                                    source={require("../../../../assets/Remindably/CheckCircle.png")}
                                />
                            </TouchableOpacity>
                        )}
                    </View>
                </TouchableOpacity>
            ) : (
                <TouchableOpacity
                    style={styles.container}
                    onPress={() => onTaskTabClick(data)}
                >
                    <Image
                        resizeMode="contain"
                        style={styles.taskIcon}
                        source={require("../../../../assets/Remindably/taskIcon.png")}
                    />
                    <View>
                        <View style={styles.hideDirection}>
                            {data?.tasktype === "T" ? (
                                <Text style={styles.groupText}>Task</Text>
                            ) : data?.tasktype === "R" ? (
                                <Text style={styles.groupText}>Routine</Text>
                            ) : null}
                        </View>

                        <Text style={styles.taskTitle}>{data.name}</Text>

                        <View style={styles.direction}>
                            <Image
                                resizeMode="contain"
                                style={styles.calendarIcon}
                                source={require("../../../../assets/Remindably/CalendarBlank.png")}
                            />
                            <Text style={styles.date}> {data?.created_date?.slice(0, 10)}</Text>
                        </View>

                        {/* time section  */}
                        {data?.time !== null ? (
                            <View style={{ width: 270 }}>
                                <FlatList
                                    horizontal={true}
                                    showsHorizontalScrollIndicator={false}
                                    data={data?.time}
                                    renderItem={renderAddedTime}
                                    keyExtractor={(item, index) => String(index)}
                                />
                            </View>
                        ) : null}

                        {data?.tasktype === "T" ? (
                            <View style={styles.direction}>
                                <Text style={styles.groupText}>Group Name : </Text>
                                {/* <View style={styles.dotContainer} /> */}
                                <Text style={styles.taskTitle} numberOfLines={1} ellipsizeMode="tail">
                                    {data.groupname}
                                </Text>
                            </View>
                        ) : null}
                    </View>

                    <View style={styles.iconContainer}>
                        {/* hide icon */}
                        {/* <TouchableOpacity
                            style={styles.hideContainer}
                            onPress={() => {
                                unHideClick(data?.id, data.time[0].timevalue)
                            }}
                        >
                            <Image
                                style={styles.icon}
                                resizeMode="contain"
                                source={require("../../../../assets/Remindably/showIcon.png")}
                            />
                        </TouchableOpacity> */}

                        {/* complete Icon  */}
                        {data?.completestatus !== "Completed" ? (
                            <TouchableOpacity
                                style={styles.checkImageContainer}
                                onPress={() => {
                                    handleMarkComplete(data?.id, data?.time?.timevalue)
                                }}
                            >
                                <Image
                                    resizeMode="contain"
                                    style={styles.icon}
                                    source={require("../../../../assets/Remindably/redCircle.png")}
                                />
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity
                                style={styles.checkImageContainer}
                                onPress={() => {
                                    handleMarkInComplete(data?.id, data?.time?.timevalue)
                                }}
                            >
                                <Image
                                    resizeMode="contain"
                                    style={styles.icon}
                                    source={require("../../../../assets/Remindably/CheckCircle.png")}
                                />
                            </TouchableOpacity>
                        )}
                    </View>
                </TouchableOpacity>
            )}
        </>
    )
}

export default MyTaskTab

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        backgroundColor: Mycolors.WHITE,
        borderRadius: 10,
        flexDirection: "row",
        margin: 10,
        padding: 10
    },
    taskIcon: {
        height: 70,
        marginRight: 10,
        width: 70
    },
    taskTitle: {
        color: Mycolors.THEME_ORANGE,
        fontSize: 14,
        fontWeight: "500",
    },
    direction: {
        alignItems: "center",
        flexDirection: "row",
        marginVertical: 8,
        // backgroundColor: 'red',
        width: '70%'
    },
    calendarIcon: {
        height: 15,
        width: 15
    },
    date: {
        color: Mycolors.textGray,
        fontSize: 12,
        fontWeight: "400"
    },
    groupText: {
        color: Mycolors.THEME_BLACK,
        fontWeight: "500",
        fontSize: 12
    },
    dotContainer: {
        backgroundColor: Mycolors.THEME_ORANGE,
        borderRadius: 50,
        height: 10,
        marginLeft: 10,
        marginTop: 3,
        width: 10,
    },
    hideDirection: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    iconContainer: {
        flexDirection: "row",
        position: "absolute",
        right: 10,
        top: 10,
        zIndex: 1
    },
    icon: {
        height: 22,
        width: 22
    },
    checkImageContainer: {
        alignItems: "center",
        borderRadius: 50,
        justifyContent: "center",
        marginHorizontal: 3
    },
    hideContainer: {
        marginHorizontal: 5
    },

})
