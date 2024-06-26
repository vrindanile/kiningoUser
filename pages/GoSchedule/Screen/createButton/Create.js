// external imports
import {
    Animated,
    Image,
    StyleSheet,
    TouchableOpacity,
    View
} from "react-native"
import LinearGradient from "react-native-linear-gradient"
import React, { useState } from "react"
// internal imports

import { Mycolors } from "../../../../utility/Mycolors"
const Create = ({ navigation }) => {
    const [click, setClick] = useState(false)
    const buttonSize = new Animated.Value(1)
    const mode = new Animated.Value(0)

    // function for create click animation
    const handleCreateClick = () => {
        navigation.navigate("MyTask")
        // Animated.sequence([
        //     Animated.timing(buttonSize, {
        //         toValue: 0.95,
        //         duration: 100,
        //         useNativeDriver: false
        //     }),
        //     Animated.timing(buttonSize, {
        //         toValue: 1,
        //         useNativeDriver: false
        //     }),
        //     Animated.timing(mode, {
        //         toValue: mode._value === 0 ? 1 : 0,
        //         useNativeDriver: false
        //     })
        // ]).start()
    }

    const thermometerX = mode.interpolate({
        inputRange: [0, 1],
        outputRange: [-24, -100]
    })

    const thermometerY = mode.interpolate({
        inputRange: [0, 1],
        outputRange: [-50, -100]
    })

    const timeX = mode.interpolate({
        inputRange: [0, 1],
        outputRange: [-24, -24]
    })

    const timeY = mode.interpolate({
        inputRange: [0, 1],
        outputRange: [-50, -150]
    })

    const pulseX = mode.interpolate({
        inputRange: [0, 1],
        outputRange: [-24, 50]
    })

    const pulseY = mode.interpolate({
        inputRange: [0, 1],
        outputRange: [-50, -100]
    })

    const rotation = mode.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "45deg"]
    })

    const sizeStyle = {
        transform: [{ scale: buttonSize }]
    }

    // function for expense tab click
    const handleExpenseClick = () => {
        handleCreateClick()
        navigation.navigate("StackNavigation", { screen: "ExpenseManagement" })
    }

    // function for business tab click
    const handleBusinessClick = () => {
        handleCreateClick()
        navigation.navigate("StackNavigation", { screen: "BusinessCommunity" })
    }

    // function for event tab click
    const handleEventClick = () => {
        handleCreateClick()
        navigation.navigate("StackNavigation", { screen: "EventManagement" })
    }

    return (
        <View style={{ position: "absolute", alignItems: "center" }}>

            {/* <Animated.View
                style={{ position: "absolute", left: thermometerX, top: thermometerY }}
            >
                <TouchableOpacity
                    style={styles.expenseImage}
                    onPress={() => {
                        handleExpenseClick()
                    }}
                >
                    <Image
                        style={styles.image}
                        resizeMode="cover"
                        source={require("../../../../assets/Remindably/expensesIcon.png")}
                    />
                </TouchableOpacity>
            </Animated.View>

         
            <Animated.View style={{ position: "absolute", left: timeX, top: timeY }}>
                <TouchableOpacity
                    style={styles.expenseImage}
                    onPress={() => {
                        handleBusinessClick()
                    }}
                >
                    <Image
                        style={styles.image}
                        tintColor={Mycolors.THEME_ORANGE}
                        resizeMode="cover"
                        source={require("../../../../assets/Remindably/businessIcon.png")}
                    />
                </TouchableOpacity>
            </Animated.View>

          
            <Animated.View
                style={{ position: "absolute", left: pulseX, top: pulseY }}
            >
                <TouchableOpacity
                    style={styles.expenseImage}
                    onPress={() => {
                        handleEventClick()
                    }}
                >
                    <Image
                        style={styles.image}
                        resizeMode="cover"
                        source={require("../../../../assets/Remindably/eventIcon.png")}
                    />
                </TouchableOpacity>
            </Animated.View>  */}

            {/* plus icon section  */}
            <TouchableOpacity
                onPress={() => {
                    handleCreateClick()
                    // setClick(!click);
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
                                source={require("../../../../assets/Remindably/Plus.png")}
                            />
                        </Animated.View>
                    </LinearGradient>
                </Animated.View>
            </TouchableOpacity>
        </View>
    )
}

export default Create
const styles = StyleSheet.create({
    createTabContainer: {
        padding: 20,
        borderRadius: 100,
        backgroundColor: Mycolors.THEME_RED,
        top: -35,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        position: "absolute",
        alignItems: "center",
        justifyContent: "center"
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
    expenseImage: {
        alignItems: "center",
        backgroundColor: Mycolors.THEME_WHITE,
        borderRadius: 50,
        elevation: 5,
        height: 47,
        justifyContent: "center",
        padding: 5,
        position: "absolute",
        top: -25,
        width: 47
    },
    image: {
        height: 25,
        width: 25
    }
})
