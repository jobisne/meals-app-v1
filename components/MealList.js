import React from 'react';
import { View, StyleSheet, FlatList} from 'react-native';
import MealItem from './MealItem';
import { useSelector } from 'react-redux';

const MealList = props => {
    //get all favorite meals
    const favorite = useSelector(state => state.meals.favoriteMeals); 

    const renderMealItem= itemData => {
        //check if true the meal is in favorite
        const isFavorite = favorite.some(meal => meal.id === itemData.item.id); 
        return <MealItem 
                    title={itemData.item.title}
                    image={itemData.item.imageUrl} 
                    duration={itemData.item.duration}
                    complexity={itemData.item.complexity.toUpperCase()}
                    affordability={itemData.item.affordability.toUpperCase()}
                    onSelectMeal={() => {
                        props.navigation.navigate({routeName: 'MealDetail',
                        params: {
                            mealId : itemData.item.id,
                            mealTitle: itemData.item.title,
                            isFav: isFavorite
                        }
                    })
                    }} 
                />
    }

    return (
        <View style={styles.list}>
            <FlatList 
                data={props.dataList}
                keyExtractor={(item, index) => item.id}
                renderItem={renderMealItem}
                style={{ width: '100%'}}
            />
        </View>
       
    )
};

const styles = StyleSheet.create({
    list: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15
    }
});

export default MealList;