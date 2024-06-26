// external imports
import * as React from "react"
import { View, TouchableOpacity, Image, StyleSheet } from "react-native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
// internal imports
//import Community from "../screen/community/Community"
// import Create from "../screen/createButton/Create"
import Home from "../../src/pages/GoSchedule/Screen/HomeScreen/HomeScreen"
import Community from "../../src/pages/GoSchedule/Screen/community/Community"
import Create from "../../src/pages/GoSchedule/Screen/createButton/Create"
// import Notes from "../pages/GoSchedule/Screen/notes/Notes"
import GoScheduleStack from '../navigators/GoScheduleStack'
// import HomeScren from '../pages/GoSchedule/Screen/HomeScreen'
// import Notes from "../screen/notes/Notes"
// import Notes from "../../src/pages/GoSchedule/Screen/notes/Notes"
// import Notes from "../../src/pages/GoSchedule/Screen/notes/Notes"
import Notes from "../../src/pages/GoSchedule/Screen/notes/Notes"
import Routine from "../../src/pages/GoSchedule/Screen/routine/Routine"
import { Mycolors } from "../../src/utility/Mycolors"
import MyGroups from "../../src/pages/GoSchedule/Screen/groups/MyGroups"
function BottomTabs({ descriptors, navigation, state }) {
    const focusedOptions = descriptors[state.routes[state.index].key].options
    if (focusedOptions.tabBarVisible === false) {
        return null
    }

    return (
        <View style={styles.container}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key]
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name

                const isFocused = state.index === index

                const onPress = () => {
                    const event = navigation.emit({
                        type: "tabPress",
                        target: route.key
                    })

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name)
                    }
                }

                const onLongPress = () => {
                    navigation.emit({
                        type: "tabLongPress",
                        target: route.key
                    })
                }

                return (
                    <TouchableOpacity
                        key={route.key}
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={[
                            styles.tabButtonContainer,
                            isFocused ? styles.tabActive : null
                        ]}
                    >
                        {label === "Home" ? (
                            <Image
                                style={[styles.tabIcon]}
                                resizeMode="contain"
                                source={
                                    isFocused
                                        ? require("../assets/Remindably/home.png")
                                        : require("../assets/Remindably/home1.png")
                                }
                            />
                        ) :

                            label === "Community" ? (
                                <Image
                                    style={styles.tabIcon}
                                    resizeMode="contain"
                                    source={
                                        isFocused
                                            ? require("../assets/Remindably/expensesIcon.png")
                                            : require("../assets/Remindably/expensesIcon.png")
                                    }
                                />
                            ) : label === "Create" ? (
                                <Create navigation={navigation} />
                            ) : label === "Routine" ? (
                                <Image
                                    style={styles.tabIcon}
                                    resizeMode="contain"
                                    source={
                                        isFocused
                                            ? require("../assets/Remindably/routines.png")
                                            : require("../assets/Remindably/routines1.png")
                                    }
                                />
                            ) : (
                                <Image
                                    style={styles.tabIcon}
                                    resizeMode="contain"
                                    source={
                                        isFocused
                                            ? require("../assets/Remindably/note.png")
                                            : require("../assets/Remindably/note1.png")
                                    }
                                />
                            )}
                    </TouchableOpacity>
                )
            })}
        </View>
    )
}

const Tab = createBottomTabNavigator()

export default function App() {
    return (
        //we can call stach here like GoScheduleStack if we need to show the bootm tab
        <Tab.Navigator
            initialRouteName={"Home"}
            tabBar={props => <BottomTabs {...props} />}
        >
            <Tab.Screen
                options={{ headerShown: false }}
                name="Home"
                component={Home}
            />
            <Tab.Screen
                options={{ headerShown: false }}
                name="Community"
                component={MyGroups}
            />
            <Tab.Screen
                options={{ headerShown: false }}
                name="Create"
                component={Create}
            />
            <Tab.Screen
                options={{ headerShown: false }}
                name="Routine"
                component={Routine}
            />
            <Tab.Screen
                options={{ headerShown: false }}
                name="Notes"
                component={Notes}
            />
            {/* <Tab.Screen
                options={{ headerShown: false }}
                name="Community"
                component={Community}
            />
            <Tab.Screen
                options={{ headerShown: false }}
                name="Create"
                component={Create}
            />
            <Tab.Screen
                options={{ headerShown: false }}
                name="Routine"
                component={Routine}
            />
            <Tab.Screen
                options={{ headerShown: false }}
                name="Notes"
                component={Notes}
            /> */}
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    tabButtonContainer: {
        alignItems: "center",
        flex: 1,
        height: 50,
        justifyContent: "center"
    },
    tabIcon: {
        height: 25,
        width: 25
    },
    rotateCross: {
        height: 25,
        transform: [{ rotate: "45deg" }],
        width: 25
    },
    container: {
        backgroundColor: Mycolors.WHITE,
        flexDirection: "row",
        borderTopRightRadius: 12,
        borderTopLeftRadius: 12,
        shadowColor: "#000",
        shadowOffset: {
            width: 12,
            height: 0
        },
        shadowOpacity: 0.3,
        shadowRadius: 8.0,
        elevation: 24
    },
    createTabContainer: {
        padding: 20,
        backgroundColor: "#C4C4C4",
        borderRadius: 100,
        top: -40,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        position: "absolute"
    },
    tabActive: {
        borderBottomWidth: 3,
        borderBottomColor: Mycolors.THEME_ORANGE
    },
    image: { height: "100%", width: "100%" }
})
