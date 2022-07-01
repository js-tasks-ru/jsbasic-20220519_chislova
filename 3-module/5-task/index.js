function getMinMax(str) {
  let strArr = str.split(' ');
  let nums = strArr
    .filter(value => !isNaN(value))
    .map(value => Number(value));

  return {
    min: Math.min(...nums),
    max: Math.max(...nums),
  };
}
