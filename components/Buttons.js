import React from "react";
import {StyleSheet, View, TouchableOpacity, Text} from "react-native"

const CostumButton = props => {
    return (
        <TouchableOpacity style={styles.ButtonContainer}>
            <View style={{ borderRadius: 15, justifyContent: "center", alignItems: "center", backgroundColor: props.color }}><Text>{props.title}</Text></View>
        </TouchableOpacity>
    )

}

const styles = StyleSheet.create ({
    ButtonContainer: {
        width: "100%",
        borderRadius: 15
    },

    title: {
        justifyContent: "center",
        alignItems: "center"
    }


})

export default CostumButton;