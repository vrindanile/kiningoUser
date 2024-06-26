//external imports
import {
    Animated,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native"
import LinearGradient from "react-native-linear-gradient"
import React, { useState } from "react"
//internal imports
// import { colors } from "../../constants/ColorConstant"
import { Mycolors } from "../../../utility/Mycolors"
const AddExpansesButton = ({ navigation, kk }) => {
    console.log('my routine---->>',)
    const [click, setClick] = useState(false)
    const buttonSize = new Animated.Value(1)
    const mode = new Animated.Value(0)

    // function for animation on create click
    const handleCreateClick = () => {
        Animated.sequence([
            Animated.timing(buttonSize, {
                toValue: 0.95,
                duration: 10,
                useNativeDriver: false
            }),
            Animated.timing(buttonSize, {
                toValue: 1,
                useNativeDriver: false
            }),
            Animated.timing(mode, {
                toValue: mode._value === 0 ? 1 : 0,
                useNativeDriver: false
            })
        ]).start()
    }

    const thermometerX = mode.interpolate({
        inputRange: [0, 1],
        outputRange: [-20, -60]
    })

    const thermometerY = mode.interpolate({
        inputRange: [0, 1],
        outputRange: [-50, -100]
    })

    const timeX = mode.interpolate({
        inputRange: [0, 1],
        outputRange: [-20, -90]
    })

    const timeY = mode.interpolate({
        inputRange: [0, 1],
        outputRange: [-50, -150]
    })

    const rotation = mode.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "45deg"]
    })

    const sizeStyle = {
        transform: [{ scale: buttonSize }]
    }

    // function on added budgetary click
    const handleExpenseClick = () => {
        handleCreateClick()
        navigation.navigate("AddedBudgetary")
    }

    // function on split click
    const handleSplitClick = () => {
        handleCreateClick()
        navigation.navigate("AddedSplit")
    }

    return (
        <View style={{ position: "absolute", alignItems: "center" }}>
            {/* split tab */}
            <Animated.View
                style={{ position: "absolute", left: thermometerX, top: thermometerY }}
            >
                <TouchableOpacity
                    style={styles.labelContainer}
                    onPress={() => {
                        handleSplitClick()
                    }}
                >
                    <Image
                        resizeMode="contain"
                        source={require("../../../assets/Remindably/addbillsplit.png")}
                    />
                    <Text style={styles.label}>Split Easy</Text>
                </TouchableOpacity>
            </Animated.View>

            {/* add budgetary tab  */}
            <Animated.View style={{ position: "absolute", left: timeX, top: timeY }}>
                <TouchableOpacity
                    style={styles.labelContainer}
                    onPress={() => {
                        handleExpenseClick()
                    }}
                >
                    <Image
                        resizeMode="contain"
                        source={require("../../../assets/Remindably/addbillsplit.png")}
                    />
                    <Text style={styles.label}>Add Budgetary</Text>
                </TouchableOpacity>
            </Animated.View>

            {/* create icon */}
            <TouchableOpacity
                onPress={() => {
                    handleCreateClick()
                }}
                activeOpacity={1}
                style={styles.createBox}
            >
                <Animated.View style={[styles.createTabBox, sizeStyle]}>
                    <LinearGradient
                        colors={!click ? ["#F28520", "#F5BD35"] : ["#FF0101", "#FF0101"]}
                        style={styles.createTabContainer}
                    >
                        <Animated.View style={{ transform: [{ rotate: rotation }] }}>
                            <Image
                                style={styles.tabIcon}
                                resizeMode="contain"
                                source={require("../../../assets/Remindably/Plus.png")}
                            />
                        </Animated.View>
                    </LinearGradient>
                </Animated.View>
            </TouchableOpacity>
        </View>
    )
}

export default AddExpansesButton

const styles = StyleSheet.create({
    createTabContainer: {
        alignItems: "center",
        backgroundColor: Mycolors.RED,
        borderRadius: 100,
        elevation: 5,
        justifyContent: "center",
        padding: 20,
        position: "absolute",
        shadowColor: "#000",
        top: -40
    },
    createTabBox: {
        alignItems: "center",
        borderRadius: 100,
        justifyContent: "center",
        position: "relative",
        top: -25
    },
    createBox: {
        alignItems: "center",
        borderRadius: 100,
        justifyContent: "center",
        top: -15
    },
    tabIcon: {
        height: 25,
        width: 25
    },
    labelContainer: {
        alignItems: "center",
        backgroundColor: Mycolors.lightYellow,
        borderColor: Mycolors.lightGray,
        borderRadius: 50,
        borderWidth: 1,
        elevation: 5,
        flexDirection: "row",
        height: 35,
        justifyContent: "center",
        paddingHorizontal: 5,
        position: "absolute",
        top: -25,
        width: "auto"
    },
    hideLabelContainer: {
        alignItems: "center",
        backgroundColor: Mycolors.lightYellow,
        borderColor: Mycolors.lightGray,
        borderRadius: 50,
        borderWidth: 1,
        elevation: 5,
        flexDirection: "row",
        height: 5,
        justifyContent: "center",
        paddingHorizontal: 5,
        position: "absolute",
        top: -25,
        width: 5
    },
    label: {
        color: Mycolors.THEME_BLACK,
        fontSize: 12,
        fontWeight: "500",
        padding: 5
    }
})
