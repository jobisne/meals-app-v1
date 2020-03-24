import { MEALS } from "../../data/dummy-data";
import { TOGGLE_FAVORITE, SET_FILTTERS } from "../action/meals";

//create initial sttate
const initialState = {
  meals: MEALS,
  favoriteMeals: [],
  filteredMeals: MEALS
};

//create a reducer to update the store
const mealsReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_FAVORITE:
        //check if meal is already exist
      const existingFav = state.favoriteMeals.findIndex(
        meal => meal.id === action.mealId
      );
      if (existingFav >= 0) {
          //remove meal if already exist
        const updatedFav = [...state.favoriteMeals];
        updatedFav.splice(existingFav, 1);
        return { ...state, favoriteMeals: updatedFav };
      } else {
          //Add meal if does not exist
        const meal = state.meals.find(meal => meal.id === action.mealId);
        return { ...state, favoriteMeals: state.favoriteMeals.concat(meal) };
      }

      case SET_FILTTERS:
        const appliedFiltter = action.filters;
        const updatedFilteredMeal = state.meals.filter(meal => {
          if(appliedFiltter.glutenFree && !meal.isGlutenFree) {
            return false
          }
          if(appliedFiltter.vegetarianFree && !meal.isVegetarian) {
            return false
          }
          if(appliedFiltter.lactoseFree && !meal.isLactoseFree) {
            return false
          }
          if(appliedFiltter.veganFree && !meal.isVegan) {
            return false
          }

          return true;
        });
        return {...state, filteredMeals: updatedFilteredMeal}
    default:
      return state;
  }
};

export default mealsReducer;
