import React from 'react';
import { View, Text, StyleSheet, Platform, Button, FlatList, TouchableOpacity } from 'react-native';

import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import { CATEGORIES  } from '../data/dummy-data';
import CategoryGridTile from '../components/CategoryGridTile'
import Colors from '../constants/Colors';



const CategoriesScreen = props => {


    const renderGridItem = itemData => {
        return (
            <CategoryGridTile  onSelect = {() => {
                props.navigation.navigate({routeName: 'CategoryMeals',
                params: {
                   categoryId: itemData.item.id
               }})
            }}
            title={itemData.item.title}
            color={itemData.item.color}
            />
        )
    }

    CategoriesScreen.navigationOptions = (navigationData)=> {
        return {
            headerTitle: 'Meal Category',
            headerLeft: () => (
                    <HeaderButtons HeaderButtonComponent={HeaderButton}>
                        <Item title='Menu' iconName='ios-menu' onPress={() => {
                            navigationData.navigation.toggleDrawer();
                        }}/>
                    </HeaderButtons>
                )
            
        }
        
    };



    return(
        <View>
            <FlatList 
                keyExtractor={ (item, index) =>  item.id }
                data={CATEGORIES}
                renderItem={renderGridItem}
                numColumns={2}
            />
        </View>
      
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
});

export default CategoriesScreen; 