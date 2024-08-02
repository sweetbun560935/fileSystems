// Functions that javascript probably should have but doesn't

export const util = {

  isEmptyObject(obj) {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  }

}