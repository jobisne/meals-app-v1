//create an identifier
export const TOGGLE_FAVORITE = 'TOGGLE_FAVORITE';
export const SET_FILTTERS = 'SET_FILTERS';

//create a function that will send an action
export const toggleFavorite = (id) => {
    return {
        type: TOGGLE_FAVORITE,
        mealId: id
    }
}

//create a function that will send an action
//filterSetting is an object
export const setFilters = filterSetting => {
    return {
        type: SET_FILTTERS,
        filters: filterSetting
    }
}