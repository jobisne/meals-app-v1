import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Platform, TouchableNativeFeedback } from 'react-native';

const CategoryGridTile = props => {

    let TouchableComp = TouchableOpacity;

    if(Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableComp = TouchableNativeFeedback
    }


    return(
        <View style={styles.gridItem}>
            <TouchableComp
                style={{ flex: 1}}
                onPress={props.onSelect}
                >
                <View style={{...styles.container, ...{backgroundColor: props.color}}} >
                    <Text style={styles.title} numberOfLines={2}> {props.title} </Text>
                </View>
            </TouchableComp>
        </View>
      
    )
}

const styles = StyleSheet.create({

    gridItem: {
        flex: 1,
        margin: 15,
        height: 150,
        borderRadius: 10,
        // controlling shape ripple effect(ie.shadow)
        overflow: Platform.OS === 
                'android' && Platform.Version >= 21 ?'hidden' : 'visible',
        elevation: 3,
    },
    container: {
        flex:1,
        borderRadius:10,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        shadowColor: 'black',
        shadowOffset:{width:0, height: 2},
        shadowRadius: 10,
        shadowOpacity: 0.26,
        padding: 15
    },
    title: {
       fontFamily: 'open-sans-bold',
        fontSize: 22,
        textAlign: 'right'
    }
});

export default CategoryGridTile