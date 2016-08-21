export const UPDATE_PARAMS = 'UPDATE_PARAMS'

export function updateParams(params){
  return {
    category: params.category,
    lunchOrDinner: params.lunchOrDinner,
    distance: params.distance,
    priceRanges: params.priceRanges,
    type: UPDATE_PARAMS
  }
}
