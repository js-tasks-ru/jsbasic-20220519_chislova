function showSalary(users, age) {
  return users
    .filter(currentAge => currentAge.age <= age)
    .map(user => {
      return `${user.name}, ${user.balance}`;
    })
    .join('\n');
}
