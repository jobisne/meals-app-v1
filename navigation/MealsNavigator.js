import React from "react";
import { Platform, Text } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import { createDrawerNavigator } from "react-navigation-drawer";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";

import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";

//screen to use in navigation
import CategoriesScreen from "../screens/CategoriesScreen";
import CategoryMealsScreen from "../screens/CategoryMealsScreen";
import MealDetailScreen from "../screens/MealDetailScreen";
import FavouritesScreen from "../screens/FavouritesScreen";
import FiltersScreen from "../screens/FiltersScreen";

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primaryColor : ""
  },
  headerTitleStyle: {
    fontFamily: "open-sans-bold"
  },
  headerBackTitleStyle: {
    fontFamily: "open-sans"
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primaryColor,
  HeaderTitle: "A Screen"
};

// meals stack navigation

const MealsNavigator = createStackNavigator(
  {
    // you can also add navigationOptions to each route
    Categories: {
      screen: CategoriesScreen
    },
    //map a screen to identifier e.g CategoryMeals
    CategoryMeals: {
      screen: CategoryMealsScreen
    },
    MealDetail: {
      screen: MealDetailScreen
    }
  },
  {
    defaultNavigationOptions: defaultNavOptions
  }
);

//Favorites stack navigation

const FavStackNavigation = createStackNavigator(
  {
    Favorites: {
      screen: FavouritesScreen
    },
    MealDetail: MealDetailScreen
  },
  {
    defaultNavigationOptions: defaultNavOptions
  }
);

//function to configure screen tab
const screenTabConfig = {
  Meals: {
    screen: MealsNavigator,
    navigationOptions: {
      tabBarIcon: tabInfo => {
        return (
          <Ionicons name="ios-restaurant" size={25} color={tabInfo.tintColor} />
        );
      },
      tabBarColor: Colors.primaryColor,
      tabBarLabel:
        Platform.OS === "android" ? 
          <Text style={{ fontFamily: "open-sans-bold" }}>Meals</Text>
         : 
          "Meals"
        
    }
  },
  Favorite: {
    screen: FavStackNavigation,
    navigationOptions: {
      tabBarIcon: tabInfo => {
        return <Ionicons name="ios-star" size={25} color={tabInfo.tintColor} />;
      },
      tabBarColor: Colors.secondaryColor,
      tabBarLabel:
        Platform.OS === "android" ? 
          <Text style={{ fontFamily: "open-sans-bold" }}>Favorite</Text>
         : 
          "Favorite"
        
    }
  }
};

//Nested meals navigation
//createMaterialBottomTabNavigator is for android use
const MealsFavTabNavigator =
  Platform.OS === "android"
    ? createMaterialBottomTabNavigator(screenTabConfig, {
        activeColor: Colors.secondaryColor,
        shifting: true,
        barStyle: {
          backgroundColor: Colors.primaryColor
        }
      })
    : createBottomTabNavigator(screenTabConfig, {
        tabBarOptions: {
          labelStyle: {
            fontFamily: "open-sans"
          },
          activeTintColor: Colors.secondaryColor
        }
      });

const FilterNavigator = createStackNavigator(
  {
    Filters: {
      screen: FiltersScreen
    }
  },
  {
    defaultNavigationOptions: defaultNavOptions
  }
);

const MainNav = createDrawerNavigator(
  {
    MealsFavs: {
      screen: MealsFavTabNavigator,
      navigationOptions: {
        drawerLabel: "Meals"
      }
    },
    Filters: FilterNavigator
  },
  {
    contentOptions: {
      activeTintColor: Colors.secondaryColor,
      labelStyle: {
        fontFamily: "open-sans-bold"
      }
    }
  }
);

export default createAppContainer(MainNav);
