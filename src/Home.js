import React from 'react';
import { StyleSheet, Text, View, FlatList, ImageBackground, Dimensions, ScrollView, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

// import cars from '../cars';

const Home = (props) => {

    // function getCars(id) {
    //     const cars = fetch (`http://localhost:5501/cars/${id}`);
    //     cars = data;
    // }

    const cars = fetch ('http://localhost:5501/cars/').then(response => response.json());

    // hello-hooks (exemple projet)
    // use effect remplace componentdidmount()


    console.log(cars);

    const renderMostReservedItem = (item) => {
        return (
            <View style={styles.carItem}>
                <Image
                    style={styles.carImage}
                    source={{ uri: item.image }}
                    resizeMode={'contain'}
                />
                <View>
                    <Text style={styles.carText}>{item.name}</Text>
                    <Text>{item.price.toLocaleString('fr-FR')}€ par jour</Text>
                    <TouchableOpacity onPress={() => props.navigation.navigate('CarItem', { item })}>
                        <Text style={styles.bookButton}>Réserver</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    const carsMostReserved = cars.sort((itemA, itemB) => itemB.reservations - itemA.reservations).slice(0, 5);

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.heroContainer}
                    onPress={() => props.navigation.navigate('CarsList')}
                >
                    <ImageBackground
                        source={require('../assets/hero.jpg')}
                        style={styles.hero}
                        imageStyle={{ borderRadius: 15 }}
                    >
                        <LinearGradient
                            colors={['transparent', '#000']}
                            style={styles.heroTextContainer}
                        >
                            <Text style={styles.heroText}>{cars.length} Véhicules à découvrir</Text>
                        </LinearGradient>
                    </ImageBackground>
                </TouchableOpacity>

                <View style={styles.mostReservedContainer}>
                    <Text style={styles.sectionTitle}>Les plus réservés</Text>

                    <FlatList
                        data={carsMostReserved}
                        renderItem={({ item }) => renderMostReservedItem(item)}
                        keyExtractor={item => item.id}
                        numColumns="2"
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Home;

const vw = Dimensions.get('screen').width;
const vh = Dimensions.get('screen').height;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f9f9f9',
        padding: 20
    },

    heroContainer: {
        marginBottom: 20
    },

    hero: {
        height: vh / 4,
        justifyContent: "flex-end"
    },

    heroTextContainer: {
        borderRadius: 15
    },

    heroText: {
        fontSize: 20,
        color: 'white',
        padding: 10,
        marginStart: 5
    },

    mostReservedContainer: {
        height: vh / 1.85,
        marginTop: 10
    },

    sectionTitle: {
        color: "#2D4F6C",
        fontSize: 20,
        textAlign: "center",
        marginBottom: 10
    },

    carItem: {
        flex: 1,
        height: vh / 3.75,
        backgroundColor: "#e9e9e9",
        padding: 10,
        margin: 5,
        borderRadius: 15
    },

    carImage: {
        width: '100%',
        height: "65%"
    },

    carText: {
        fontSize: 16,
        fontWeight: "bold",
    },

    bookButton: {
        fontSize: 18,
        color: "#147EFB",
        textAlign: "center",
        padding: 10
    }
}
);