function factorial(n) {
  let sum = 1;

  for (let i = 1; i <= n; i++) {
    if (n <= 0) {
      return sum;
    } sum *= i;
  }
  return sum;
}
