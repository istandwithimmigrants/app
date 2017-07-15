import axios from 'axios'

const reducer = (state='en', action) => {
  switch (action.type) {
  case SET_LANGUAGE:
    return action.language
  }
  return state
}

const SET_LANGUAGE = 'SET_LANGUAGE'
export const setLanguage = language => ({
  type: SET_LANGUAGE, language
})

export default reducer
