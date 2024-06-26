// external imports
import React from "react"
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native"
import LinearGradient from "react-native-linear-gradient"
// internal imports

import { Mycolors } from "../../../utility/Mycolors"

const CustomHeader = ({ backButton, bellButton, drawerButton, headerText }) => {
    return (
        <LinearGradient colors={["#F28520", "#F5BD35"]} style={styles.container}>
            <View style={styles.body}>
                {/* drawer menu icon for side menu */}
                {drawerButton?.visible ? (
                    <TouchableOpacity
                        style={styles.iconStyle}
                        onPress={() => {
                            drawerButton?.onClick()
                        }}
                    >
                        <Image
                            resizeMode="contain"
                            source={require("../../../assets/Remindably/nav.png")}
                        />
                    </TouchableOpacity>
                ) : null}

                {/* back arrow icon for back navigation */}
                {backButton?.visible ? (
                    <TouchableOpacity
                        style={styles.iconStyle}
                        onPress={() => {
                            backButton?.onClick()
                        }}
                    >
                        <Image
                            resizeMode="contain"
                            source={require("../../../assets/Remindably/ArrowLeft.png")}
                        />
                    </TouchableOpacity>
                ) : null}

                {/* header text  */}
                <View>
                    <Text style={styles.headerText}>{headerText}</Text>
                </View>

                {/* bell button icon for notification */}
                {bellButton?.visible ? (
                    <TouchableOpacity
                        style={styles.iconStyle}
                        onPress={() => {
                            bellButton?.onClick()
                        }}
                    >
                        <Image
                            resizeMode="contain"
                            source={require("../../../assets/Remindably/bell.png")}
                        />
                    </TouchableOpacity>
                ) : (
                    <View style={styles.iconStyle} />
                )}
            </View>
        </LinearGradient>
    )
}

export default CustomHeader

const styles = StyleSheet.create({
    container: { borderBottomRightRadius: 15, borderBottomLeftRadius: 15 },
    body: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 20
    },
    iconStyle: { alignSelf: "center" },
    headerText: {
        color: Mycolors.WHITE,
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",

    }
})
