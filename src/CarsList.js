import React, { useEffect, useState } from 'react'
import { Text, TouchableOpacity, Image, FlatList, SafeAreaView, StyleSheet, Dimensions, View, TextInput, Switch } from 'react-native'

import cars, { AUTOMATIC, MANUAL } from '../cars';

const CarsList = (props) => {
    const [filters, setFilters] = useState({
        visible: false,
        priceStart: 0,
        priceEnd: 499,
        aircondition: true,
        transmission: AUTOMATIC
    })

    useEffect(() => {
        props.navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={() => toggleFilters()}>
                    <Text style={styles.filterButton}>Filtres</Text>
                </TouchableOpacity>
            )
        });
    }, [])

    const toggleFilters = () => {
        setFilters({ 
            ...filters,
            visible: !filters.visible
        });
    }

    const handleChange = (event, name) => {
        setFilters({
            ...filters,
            [name]: event.nativeEvent.text
        })
    }

    const renderCarItem = (item) => {
        return (
            <TouchableOpacity
                style={styles.carItem}
                onPress={() => props.navigation.navigate('CarItem', { item })}
            >
                <Image
                    style={styles.carImage}
                    source={{ uri: item.image }}
                    resizeMode={'contain'}
                />
                <View>
                    <Text style={styles.carText}>{item.name}</Text>
                    <Text>{item.price.toLocaleString('fr-FR')}€ par jour</Text>
                </View>
            </TouchableOpacity>
        );
    }

    const renderFilters = () => {
        if (filters.visible) {
            return (
                <View style={styles.filters}>
                    <View style={styles.filter}>
                        <Text>Prix</Text>
                        <TextInput
                            style={styles.input}
                            defaultValue={filters.priceStart.toString()}
                            keyboardType="number-pad"
                            onEndEditing={(e) => handleChange(e, "priceStart")}
                        />
                        <Text>-</Text>
                        <TextInput
                            style={styles.input}
                            defaultValue={filters.priceEnd.toString()}
                            keyboardType="number-pad"
                            onEndEditing={(e) => handleChange(e, "priceEnd")}
                        />
                    </View>
                    <View style={styles.filter}>
                        <Text>Automatique</Text>
                        <Switch
                            value={filters.transmission === AUTOMATIC ? true : false}
                            onValueChange={(value) => setFilters({ ...filters, transmission: (value ? AUTOMATIC : MANUAL) })}
                        />
                        <Text>Climatisation</Text>
                        <Switch
                            value={filters.aircondition}
                            onValueChange={(value) => setFilters({ ...filters, aircondition: value })} />
                    </View>
                </View>
            );
        }
    }

    const carsFiltered = cars.filter((item) => ((item.price >= filters.priceStart) && (item.price <= filters.priceEnd) && (item.options.aircondition === filters.aircondition) && (item.options.transmission === filters.transmission)));

    return (
        <SafeAreaView>

            {renderFilters()}

            <FlatList
                data={carsFiltered}
                renderItem={({ item }) => renderCarItem(item)}
                keyExtractor={item => item.id}
                ListEmptyComponent={<View style={styles.empty}><Text>Aucun véhicule correspondant à votre recherche</Text></View>}
            />
        </SafeAreaView>
    )

}

export default CarsList;

const vw = Dimensions.get('screen').width;
const vh = Dimensions.get('screen').height;

const styles = StyleSheet.create({
    carItem: {
        flexDirection: "row",
        height: vh / 6,
        backgroundColor: "#dfdfdf",
        margin: 10,
        padding: 10,
        borderRadius: 15
    },

    carImage: {
        width: '40%',
        height: '100%'
    },

    carText: {
        fontSize: 16,
        fontWeight: "bold",
    },

    filterButton: {
        color: "white",
        padding: 10,
        fontSize: 18
    },

    filters: {
        backgroundColor: "rgba(242, 242, 242, 0.95)",
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1
    },

    filter: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        paddingTop: 20,
        paddingBottom: 15
    },

    input: {
        width: vw / 4,
        padding: 10,
        borderColor: "#2D4F6C",
        borderWidth: 1,
        borderRadius: 15
    },

    empty: {
        flex: 1,
        height: vh,
        justifyContent: "center",
        alignItems: "center"
    }
});