import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, Switch, Platform } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";
import Colors from "../constants/Colors";
import { useDispatch } from 'react-redux';
import { setFilters } from '../store/action/meals';

const FilterItem = props => {
  return (
    <View style={styles.filterContainer}>
      <Text>{props.label}</Text>
      <Switch
        trackColor={{ true: Colors.primaryColor }}
        value={props.state}
        onValueChange={props.onChange}
        thumbColor={Platform.OS === "android" ? Colors.primaryColor : ""}
      />
    </View>
  );
};

const FiltersScreen = props => {
  const { navigation } = props;
  const [isGlutenFree, setIsGlutenFree] = useState(false);
  const [isLactoseFree, setIsLactoseFree] = useState(false);
  const [isVeganFree, setIsVeganFree] = useState(false);
  const [isVegetarianFree, setIsVegetarianFree] = useState(false);

  const dispatch = useDispatch()

  //To save filter
  //callBack func is cache by react it only recreate when its dependency change
  const saveFilter = useCallback(() => {
    const appliedFilters = {
      glutenFree: isGlutenFree,
      lactoseFree: isLactoseFree,
      veganFree: isVeganFree,
      vegetarianFree: isVegetarianFree,
    }
    // console.log(appliedFilters)
    dispatch(setFilters(appliedFilters));
  },[ isGlutenFree, isLactoseFree, isVeganFree, isVegetarianFree, dispatch]);
  
//the useEffect funct run whenever the saveFilter is recreated by the
//callBack  func
//setParams causes the component to rebuild because its props(the navigation prop)
//change

  useEffect( () => {
    navigation.setParams({save: saveFilter});
  }, [ saveFilter])

  return (
    <View style={styles.scren}>
      <Text style={styles.title}>Available Filter / Restriction</Text>
      
        <FilterItem
          label="Gluten-Free"
          state={isGlutenFree}
          onChange={newValue => setIsGlutenFree(newValue)}
        />
        
        
         <FilterItem
          label="Lactose-Free"
          state={isLactoseFree}
          onChange={newValue => setIsLactoseFree(newValue)}
        />
        
        
         <FilterItem
          label="Vegan"
          state={isVeganFree}
          onChange={newValue => setIsVeganFree(newValue)}
        />
        
        
         <FilterItem
          label="Vegetaran"
          state={isVegetarianFree}
          onChange={newValue => setIsVegetarianFree(newValue)}
        />
      
    </View>
  );
};

FiltersScreen.navigationOptions = navigationData => {
  return {
    headerTitle: "Filters Meals",
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
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="save"
          iconName="ios-save"
          onPress={
            //execute the function
            navigationData.navigation.getParam('save')
          }
        />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  scren: {
    flex: 1,

    alignItems: "center"
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "80%",
    marginVertical: 10
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 22,
    alignItems: "center",
    margin: 20
  }
});

export default FiltersScreen;
