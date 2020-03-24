import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";

import { useSelector  } from 'react-redux';
import MealList from "../components/MealList";
import DefaultText from '../components/DefaultText';

const FavouritesScreen = props => {
  const FavMeals = useSelector(state => state.meals.favoriteMeals)
  //check if favMeals is empty and output text
  if(FavMeals.length === 0 || !FavMeals) {
    return (
      <View style={styles.content}>
      <DefaultText>No Favorite Meals Found. start addding some</DefaultText>
    </View>
    )
    
  }
  return <MealList dataList={FavMeals} navigation={props.navigation} />;
};

FavouritesScreen.navigationOptions = navigationData => {
  return {
    headerTitle: "Your Favorites",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName="ios-menu"
          onPress={() => {
            navigationData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  content: {
    flex : 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
export default FavouritesScreen;
