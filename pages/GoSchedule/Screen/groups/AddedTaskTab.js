// external imports
import {
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native"
import React, { useRef } from "react"
// internal imports
// import { colors } from "../../constants/ColorConstant"
import { useSelector, useDispatch } from 'react-redux';
import { Mycolors } from "../../../../utility/Mycolors"
import AddedComments from "./AddedComments"
// import CommonToast from "../../constants/CommonToast"
import AddedTimeTab from "./AddedTimeTab"

const AddedTaskTab = ({
    isEdit,
    items,
    myUserId,
    onTaskTabClick,
    viewTaskClicks
}) => {
    console.log('items-------> from detaling page', items);
    const toastRef = useRef()
    const User = useSelector(state => state.user.user_details)

    console.log('my added tasks tab', items);
    // list for added comments
    const renderAddedComments = ({ item }) => {
        return (
            <AddedComments
                data={item}
                viewTaskClick={viewTaskClicks}
                taskId={items?.id}
                taskType={items?.task_type}
            />
        )
    }

    // list for added time
    const renderAddedTime = ({ item }) => {

        return <AddedTimeTab items={item} />
    }

    return (
        <>
            <TouchableOpacity
                style={styles.container}
                onPress={() => onTaskTabClick(items)}
            >
                <Text style={styles.taskType}>
                    {items?.task_type === "T"
                        ? "Task"
                        : items?.task_type === "R"
                            ? "Routine"
                            : items?.task_type === "N"
                                ? "Notes"
                                : null}
                </Text>

                {/* repeat type section  */}

                <Text style={styles.taskTitle}>{items?.name}</Text>
                {/* {items?.task_type != "N" ? ( */}
                {/* <Text style={styles.repeatType}>({items?.frequency
                })</Text> */}
                <Text style={styles.repeatType}>
                    {items?.frequency === "O"
                        ? "Once"
                        : items?.task_type === "D"
                            ? "Daily"
                            : items?.task_type === "C" ? "Custom"
                                : items?.task_type === "C" ? "Repeat"
                                    : items?.task_type === "T"
                                        ? "date"
                                        : null}
                </Text>
                {/* ) : null} */}

                {/* date and priority section  */}
                <View style={styles.direction}>
                    <View style={styles.dateTimeContainer}>
                        <Image
                            style={styles.imageStyle}
                            resizeMode="contain"
                            source={require("../../../../assets/Remindably/CalendarBlank1.png")}
                        />
                        <Text style={styles.dateTime}>
                            {/* {items?.schedule_startdate} */}
                            {items?.date}
                        </Text>
                    </View>

                    {/* priority section  */}
                    {items?.task_type == "T" ? (
                        <View style={styles.priorityContainer}>
                            <Image
                                style={styles.imageStyle}
                                resizeMode="contain"
                                source={require("../../../../assets/Remindably/WarningCircle.png")}
                            />
                            {items.priority == "H" ? (
                                <Text style={styles.priority}>High</Text>
                            ) : items.priority == "M" ? (
                                <Text style={styles.priority}>Medium</Text>
                            ) : (
                                <Text style={styles.priority}>Low</Text>
                            )}
                        </View>
                    ) : null}
                </View>

                {/* time section  */}
                {items?.time !== null ? (
                    <FlatList
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        data={items?.time}
                        renderItem={renderAddedTime}
                        keyExtractor={(item, index) => String(index)}
                    />
                ) : null}

                {/* comment section basis of user id and editable on  */}
                {isEdit == "false" ? (
                    <>
                        {/* icons container  */}
                        <View style={styles.iconContainer}>
                            <TouchableOpacity
                                style={styles.iconStyle}
                                onPress={() => {
                                    viewTaskClicks(items?.id, items?.task_type)
                                }}
                            >
                                <Image
                                    style={styles.imageStyle}
                                    resizeMode="contain"
                                    source={require("../../../../assets/Remindably/ChatCenteredText.png")}
                                />
                            </TouchableOpacity>
                        </View>

                        {/* comments section  */}
                        {items?.commentdetails !== null ? (
                            <FlatList
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                data={items?.commentdetails}
                                renderItem={renderAddedComments}
                                keyExtractor={(item, index) => String(index)}
                            />
                        ) : null}
                    </>
                ) : items?.created_by == User.userid ? (
                    <>
                        {/* icons container  */}
                        <View style={styles.iconContainer}>
                            <TouchableOpacity
                                style={styles.iconStyle}
                                onPress={() => {
                                    viewTaskClicks(items?.id, items?.task_type)
                                }}
                            >
                                <Image
                                    style={styles.imageStyle}
                                    resizeMode="contain"
                                    source={require("../../../../assets/Remindably/ChatCenteredText.png")}
                                />
                            </TouchableOpacity>
                        </View>

                        {/* comments section  */}
                        {items?.commentdetails !== null ? (
                            <FlatList
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                data={items?.commentdetails}
                                renderItem={renderAddedComments}
                                keyExtractor={(item, index) => String(index)}
                            />
                        ) : null}
                    </>
                ) : null}

                {/* toaster message for error response from API  */}
                {/* <CommonToast ref={toastRef} /> */}
            </TouchableOpacity>
        </>
    )
}

export default AddedTaskTab

const styles = StyleSheet.create({
    container: {
        backgroundColor: Mycolors.WHITE,
        borderRadius: 15,
        flex: 1,
        marginVertical: 5,
        padding: 20
    },
    taskType: {
        color: Mycolors.THEME_ORANGE,
        fontSize: 18,
        fontWeight: "500",
        paddingRight: 10,
        width: "100%"
    },
    taskTitle: {
        color: Mycolors.THEME_BLACK,
        fontSize: 18,
        fontWeight: "500",
        width: "90%"
    },
    repeatType: {
        color: Mycolors.THEME_ORANGE,
        fontSize: 16
    },
    dateTimeContainer: {
        alignItems: "center",
        flexDirection: "row",
        paddingVertical: 10,
        width: "65%"
    },
    direction: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    iconContainer: {
        alignItems: "center",
        flexDirection: "row",
        marginBottom: 10
    },
    dateTime: {
        color: Mycolors.THEME_BLACK,
        fontSize: 16,
        marginHorizontal: 3
    },
    imageStyle: { height: 20, width: 20, paddingHorizontal: 12 },
    priorityContainer: {
        alignItems: "center",
        flexDirection: "row",
        width: "26%"
    },
    priority: {
        color: Mycolors.lightOrange,
        fontSize: 16
    },
    iconStyle: {
        alignItems: "center",
        backgroundColor: Mycolors.WHITE,
        borderRadius: 50,
        elevation: 5,
        height: 40,
        justifyContent: "center",
        marginRight: 5,
        shadowColor: Mycolors.GRAY,
        shadowRadius: 4,
        width: 40
    }
})
