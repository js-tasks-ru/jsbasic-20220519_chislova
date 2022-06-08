function camelize(str) {
  return str
    .split('-')
    .map((str, id) => {
      if (id === 0) {
        return str;
      } else {
        return str[0].toUpperCase() + str.slice(1);
      }
    })
    .join('');
}
