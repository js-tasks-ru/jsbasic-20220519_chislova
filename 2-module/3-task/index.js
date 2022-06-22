let calculator = {

  read(var1, var2) {
    this.variable1 = var1;
    this.variable2 = var2;
  },
  sum() {
    return this.variable1 + this.variable2;
  },
  mul() {
    return this.variable1 * this.variable2;
  }
};

// НЕ УДАЛЯТЬ СТРОКУ, НУЖНА ДЛЯ ПРОВЕРКИ
window.calculator = calculator; // делает ваш калькулятор доступным глобально
