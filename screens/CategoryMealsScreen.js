import React from 'react';
import { View, Text, StyleSheet, Button, Platform, FlatList } from 'react-native';

import { CATEGORIES } from '../data/dummy-data';
import { useSelector } from 'react-redux';
import Colors from '../constants/Colors';
import MealList from '../components/MealList'; 
import DefaultText from '../components/DefaultText';
import { State } from 'react-native-gesture-handler';



const CategoryMealsScreen = props => {

    
    //Getting the id from the navigation
    const categoryId = props.navigation.getParam('categoryId');

    //using redux to fetch the meal
    const availableMeals = useSelector(state => state.meals.filteredMeals)

    //fetch meals that belongs to the category meal selected
    const displayMeals = availableMeals.filter(meal => meal.categoryIds.indexOf(categoryId) >= 0 );

    if(displayMeals === 0) {
        return (
            <View style={styles.content}>
                <DefaultText>No meal present. check your filter</DefaultText>
            </View>
        )
    }
    // const selectedCategory = CATEGORIES.find(cat => cat.id === categoryId);

    return <MealList dataList = {displayMeals} navigation = {props.navigation} />
};
//To access navigationOptions outside the function component
CategoryMealsScreen.navigationOptions = navigationData => {
   const categoryId =  navigationData.navigation.getParam('categoryId');
   const selectedCategory = CATEGORIES.find(cat => cat.id === categoryId);
   
   return {
       headerTitle: selectedCategory.title,
     
   }
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems:  'center';
    }
});

export default CategoryMealsScreen; 