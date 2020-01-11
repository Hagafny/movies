import { SET_SORTING } from '../../../actionTypes'

const initialState = 'none'

export default function sortingReducer(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
      case SET_SORTING:
        return payload
    default:
      return state
  }
}
