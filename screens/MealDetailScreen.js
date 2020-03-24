import React, {useEffect, useCallback } from "react";
import {
  ScrollView,
  View,
  Image,
  Text,
  StyleSheet,
  Button
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";
import { useSelector, useDispatch  } from 'react-redux';
import DefaultText from "../components/DefaultText";
import { toggleFavorite } from '../store/action/meals'

const ListItem = props => {
  return (
    <View style={styles.listItem}>
      <DefaultText>{props.children}</DefaultText>
    </View>
  );
};

const MealDetailScreen = props => {
  //
  const availableMeals = useSelector(state => state.meals.meals);
  //Getting the id from the navigation
  const mealId = props.navigation.getParam("mealId");
  //get all the favorite meals with useSelector
  const currentFavMeals = useSelector(state => state.meals.favoriteMeals);
  //check if the mealId is inthe currentFavMeals
  const isCurrentFavMeal = currentFavMeals.some(meal => meal.id === mealId);
  //selecting a particular meal
  const selectedMeal = availableMeals.find(meal => meal.id === mealId);

  //useDispatch is a function that send an action
  const dispatch = useDispatch();

  const toggleFavHandler = useCallback(() => {
    dispatch(toggleFavorite(mealId));
  }, [dispatch, mealId ]);

  useEffect( () => {
    // props.navigation.setParams({mealTitle: selectedMeal})
    props.navigation.setParams({favToggle: toggleFavHandler})
  }, [toggleFavHandler]);

  useEffect( () => {
    props.navigation.setParams({isFav: isCurrentFavMeal })
  },[isCurrentFavMeal]);

  return (
    <ScrollView>
      <Image source={{ uri: selectedMeal.imageUrl }} style={styles.image} />
      <View></View>
      <View style={styles.detail}>
        <DefaultText>{selectedMeal.duration}m</DefaultText>
        <DefaultText>{selectedMeal.complexity}</DefaultText>
        <DefaultText>{selectedMeal.affordability}</DefaultText>
      </View>
      <Text style={styles.title}>Ingredient</Text>
      {selectedMeal.ingredients.map(ingredient => 
        <ListItem key={ingredient}>{ingredient}</ListItem>
      )}
      <Text style={styles.title}>Steps</Text>
      {selectedMeal.steps.map(step => 
        <ListItem key={step}>{step}</ListItem>
      )}
    </ScrollView>
  );
};

MealDetailScreen.navigationOptions = navigationData => {
  // const mealId = navigationData.navigation.getParam("mealId");

  const togFavorite = navigationData.navigation.getParam("favToggle");

  const mealTitle = navigationData.navigation.getParam("mealTitle");

  const isfavoriteMeal = navigationData.navigation.getParam('isFav');

  // const selectedMeal = MEALS.find(meal => meal.id === mealId);

  return {
    headerTitle: mealTitle,
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Favorite"
          iconName={isfavoriteMeal ? "ios-star" : 'ios-star-outline'}
          onPress={togFavorite}
        />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  scren: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  image: {
    width: "100%",
    height: 200
  },
  detail: {
    flexDirection: "row",
    padding: 15,
    justifyContent: "space-around"
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 22,
    textAlign: "center"
  },
  listItem: {
    marginHorizontal: 20,
    marginVertical: 10,
    borderWidth: 1,
    padding: 10,
    borderColor: "#ccc"
  }
});

export default MealDetailScreen;
