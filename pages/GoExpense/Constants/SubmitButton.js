// external imports
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native"
import React from "react"
// internal imports
import { Mycolors } from '../../../utility/Mycolors'
const SubmitButton = ({ buttonText, loader, submitButton }) => {
    return (
        <View>
            {/* {!loader ? ( */}
            <View
                onPress={() => {
                    submitButton()
                }}
                style={styles.buttonContainer}
            >
                <Text style={styles.buttonText}>{buttonText}</Text>
            </View>
            {/* ) 
            // : (
            //     <View style={styles.loaderContainer}>
            //         <ActivityIndicator size="large" color={Mycolors.THEME_ORANGE} />
            //     </View>
            // )
            
            } */}
        </View>
    )
}

export default SubmitButton

const styles = StyleSheet.create({
    buttonContainer: {
        backgroundColor: Mycolors.THEME_ORANGE,
        borderRadius: 6,
        height: 60,
        justifyContent: "center"
    },
    buttonText: {
        color: Mycolors.WHITE,
        fontSize: 16,
        fontWeight: "bold",
        paddingVertical: 10,
        textAlign: "center"
    },
    loaderContainer: { height: 60 }
})
