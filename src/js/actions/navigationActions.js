import {
  NAVIGATION_PUSH,
  NAVIGATION_REPLACE,
  NAVIGATION_GO_BACK,
  NAVIGATION_LOCATION_CHANGE,
} from 'consts/actionTypes'

/**
 * @function push
 * @description Экшен, добавляющий в стек истории новую запись (роутер)
 * @param {string} hash
 * @return {Object}
 */
export const push = hash => ({
  type: NAVIGATION_PUSH,
  route: hash,
})
/**
 * @function replace
 * @description Экшен, заменяющий в стеке истории текущую запись (роутер)
 * @param {string} hash
 * @return {Object}
 */
export const replace = hash => ({
  type: NAVIGATION_REPLACE,
  route: hash,
})

/**
 * @function goBack
 * @description Экшен, вызывающий переход на предпоследний объект в стеке (роутер)
 * @return {Object}
 */
export const goBack = () => ({
  type: NAVIGATION_GO_BACK,
})

/**
 * @function locationChange
 * @description Экшен (роутер)
 * @param {string} hash
 * @return {Object}
 */
export const locationChange = hash => ({
  type: NAVIGATION_LOCATION_CHANGE,
  route: hash,
})

export const navigationActions = { push, replace, goBack, locationChange }
