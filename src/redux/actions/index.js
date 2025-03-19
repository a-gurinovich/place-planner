import { ADD_ELEMENT, REMOVE_ELEMENT, IMPORT_DATA } from './../constants'

export const addElement = payload => ({
  type: ADD_ELEMENT,
  payload
})

export const removeElement = payload => ({
  type: REMOVE_ELEMENT,
  payload
})

export const importData = payload => ({
  type: IMPORT_DATA,
  payload
})
