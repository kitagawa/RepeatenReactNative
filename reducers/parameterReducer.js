import { UPDATE_PARAMS } from './../actions/paramsAction'
import Constants from './../assets/constants.json'

const PRICE_RANGES = Constants.priceRanges;
const LUNCH_OR_DINNER = Constants.lunchOrDinner;

const initialState = {
  category: {
    label: null,
    value: null
  },
  lunchOrDinner: {
    label: null,
    value: null
  },
  distance: {
    label: null,
    value: null
  },
  priceRanges: {
    label: null,
    value: [1,2,3,4,5,6,7]
  },
}

export default function params(state = initialState, action){
  switch(action.type){
    case UPDATE_PARAMS:
      // 金額を指定する場合はランチ/ディナーを指定する必要があるので強制的に変更
      var _lunchOrDinner = action.priceRanges.length != PRICE_RANGES.length &&
        action.lunchOrDinner.value == null ? LUNCH_OR_DINNER[0] :action.lunchOrDinner

      return Object.assign({},state,{
        category: action.category,
        lunchOrDinner: _lunchOrDinner,
        distance: action.distance,
        priceRanges: action.priceRanges,
      })
    default:
      return state
  }
}
