import React, { useState } from 'react'
import { Text, View, StyleSheet, Image, Dimensions } from 'react-native';

const CarItem = (props) => {
    const [item, setItem] = useState(props.route.params.item)

    return (
        <View style={styles.container}>
            <Image
                style={styles.carImage}
                source={{ uri: item.image }}
                resizeMode={'contain'}
            />
            <View style={styles.carOptionsRow}>
                <View style={styles.carOption}>
                    <Image style={styles.carOptionIcon} source={require("../assets/icons/engine.png")} />
                    <Text>{item.options.transmission}</Text>
                </View>
                <View style={styles.carOption}>
                    <Image style={styles.carOptionIcon} source={require("../assets/icons/doors.png")} />
                    <Text>{item.options.person} personnes</Text>
                </View>
            </View>
            <View style={styles.carOptionsRow}>
                <View style={styles.carOption}>
                    <Image style={styles.carOptionIcon} source={require("../assets/icons/compass.png")} />
                    <Text>{item.options.navigation ? "GPS intégré" : "GPS non intégré"}</Text>
                </View>
                <View style={styles.carOption}>
                    <Image style={styles.carOptionIcon} source={require("../assets/icons/snow.png")} />
                    <Text>{item.options.aircondition ? "véhicule climatisé" : "véhicule non climatisé"}</Text>
                </View>
            </View>
            <Text style={styles.carPrice}>{item.price}€ par jour</Text>
        </View>
    )
}

export default CarItem;

const vw = Dimensions.get('screen').width;
const vh = Dimensions.get('screen').height;

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: "space-between",
        backgroundColor: '#f9f9f9',
    },

    carImage: {
        width: vw,
        height: vw / 1.5
    },

    carText: {
        fontSize: 16,
        fontWeight: "bold",
    },

    carOptionsRow: {
        flexDirection: "row"
    },

    carOption: {
        flex: 1,
        alignItems: "center"
    },

    carOptionIcon: {
        width: 25,
        height: 25
    },

    carPrice: {
        backgroundColor: "#2D4F6C",
        padding: 20,
        textAlign: "center",
        fontSize: 20,
        fontWeight: "bold",
        color: "white"
    }
});