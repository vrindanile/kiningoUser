//external imports
import {
    Image,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native"
import moment from "moment"
import CalendarPicker from "react-native-calendar-picker"
import React, { useState } from "react"
//internal imports
import SubmitButton from "../../Constants/SubmitButton"
// import { colors } from "../../constants/ColorConstant"
import { Mycolors } from "../../../../utility/Mycolors"
const RepeatCalendarModal = ({ onClose, onSubmitClick, visibleModal }) => {
    console.log('onSubmitClick------>', onSubmitClick);
    const [selectedDate, setSelectedDate] = useState("")
    console.log('selectedDate', selectedDate);

    // STYLING SUNDAYS AS RED
    const customDayHeaderStylesCallback = DayOfWeekName => {
        switch (DayOfWeekName.dayOfWeek) {
            case 7:
                return {
                    textStyle: styles.weekEnd
                }
            default:
                return {}
        }
    }

    // on date change
    const onDateChange = selectDate => {
        // onClose(selectedDate, type);
        setSelectedDate(moment(selectDate).format("YYYY-MM-DD"))
    }

    const customDatesStylesCallback = date => {
        // only weekend styling
        if (date.isoWeekday() === 7) {
            return {
                textStyle: styles.onlyWeekEnd
            }
        }
        return {}
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
                    <View style={styles.modalViewCalendar}>
                        <CalendarPicker
                            customDayHeaderStyles={customDayHeaderStylesCallback}
                            customDatesStyles={customDatesStylesCallback}
                            dayLabelsWrapper={styles.days}
                            monthTitleStyle={styles.month}
                            minDate={new Date()}
                            disabledDatesTextStyle={styles.pastDate}
                            nextComponent={
                                <View style={styles.nextBtn}>
                                    <Image
                                        resizeMode="contain"
                                        style={styles.nextImg}
                                        source={require("../../../../assets/Remindably/rightarrow.png")}
                                    />
                                </View>
                            }
                            onDateChange={onDateChange}
                            previousComponent={
                                <View style={styles.previousBtn}>
                                    <Image
                                        resizeMode="contain"
                                        style={styles.previousImg}
                                        source={require("../../../../assets/Remindably/leftarrow.png")}
                                    />
                                </View>
                            }
                            selectedDayStyle={styles.selectedDate}
                            selectedDayTextColor={Mycolors.WHITE}
                            showDayStragglers={true}
                            startFromMonday={true}
                            textStyle={styles.allTexts}
                            todayBackgroundColor={Mycolors.WHITE}
                            todayTextStyle={styles.today}
                            yearTitleStyle={styles.year}
                            onMonthChange={data => {
                                console.log("Changes", data)
                            }}
                        />

                        <View style={styles.buttonSection}>
                            {/*save button  */}
                            <TouchableOpacity onPress={() => onSubmitClick(selectedDate)}>
                                <SubmitButton
                                    buttonText={"Ok"}
                                    submitButton={() => {
                                        onSubmitClick(selectedDate)
                                    }}
                                />
                            </TouchableOpacity>

                            {/*Cancel section  */}
                            <TouchableOpacity
                                style={styles.cancelContainer}
                                onPress={() => {
                                    onClose()
                                }}
                            >
                                <Image
                                    resizeMode="contain"
                                    source={require("../../../../assets/Remindably/Trash.png")}
                                />
                                <Text style={styles.cancelText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default RepeatCalendarModal

const styles = StyleSheet.create({
    centeredView: {
        backgroundColor: "rgba(0, 0, 0, 0.66)",
        flex: 1,
        justifyContent: "flex-end"
    },
    modalViewCalendar: {
        backgroundColor: Mycolors.WHITE,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        paddingHorizontal: 30,
        paddingVertical: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    allTexts: {
        fontWeight: "600"
    },
    days: {
        borderBottomWidth: 0,
        borderTopWidth: 0
    },
    month: {
        color: Mycolors.THEME_ORANGE,
        fontSize: 20,
        fontWeight: "bold",
        marginTop: 10
    },
    nextBtn: {
        borderColor: Mycolors.lightGray,
        borderRadius: 5,
        borderWidth: 1,
        marginRight: 25,
        marginTop: 10
    },
    nextImg: {
        height: 20,
        width: 20
    },
    onlyWeekEnd: {
        color: Mycolors.RED
    },
    previousBtn: {
        borderColor: Mycolors.lightGray,
        borderRadius: 5,
        borderWidth: 1,
        marginLeft: 25,
        marginTop: 10
    },
    previousImg: {
        height: 20,
        width: 20
    },
    pastDate: {
        color: Mycolors.lightGray
    },
    selectedDate: {
        backgroundColor: Mycolors.THEME_ORANGE,
        color: Mycolors.WHITE
    },
    today: {
        alignContent: "center",
        alignItems: "center",
        alignSelf: "center",
        borderColor: Mycolors.THEME_ORANGE,
        borderRadius: 50,
        borderWidth: 2,
        height: 25,
        justifyContent: "center",
        textAlign: "center",
        width: 25
    },
    weekEnd: {
        color: Mycolors.RED
    },
    year: {
        color: Mycolors.THEME_ORANGE,
        fontSize: 20,
        fontWeight: "bold",
        marginTop: 10
    },
    buttonSection: { paddingTop: 20 },
    cancelContainer: {
        alignItems: "center",
        alignSelf: "center",
        flexDirection: "row",
        height: 50,
        justifyContent: "center"
    },
    cancelText: {
        color: Mycolors.RED,
        fontSize: 16,
        fontWeight: "bold",
        paddingLeft: 8
    }
})
