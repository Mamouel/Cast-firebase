// @flow

export const checkStateValues = (stateValues: Array<mixed>) => {
  const allFieldsFilled = stateValues.filter(element => {
    if(element !== '') return element;
    return null;
  })
  return allFieldsFilled.length;
}