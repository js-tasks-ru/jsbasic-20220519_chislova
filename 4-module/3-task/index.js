function highlight(table) {

  // available/unavailable в зависимости от значения атрибута data-available у ячейки Status
  // hidden, если атрибута data-available нет вообще
  for (let i = 1; i < table.rows.length; i++) {
    if (table.rows[i].cells[3].getAttribute('data-available') === 'true') {
      table.rows[i].className += ' available';
    } else if (table.rows[i].cells[3].getAttribute('data-available') === 'false') {
      table.rows[i].className += ' unavailable';
    } else { table.rows[i].hidden = true; }
  }

  //класс male/female в зависимости от содержимого ячейки Gender
  for (let i = 1; i < table.rows.length; i++) {
    if (table.rows[i].cells[2].innerHTML === 'm') {
      table.rows[i].className += ' male';
    } else if (table.rows[i].cells[2].innerHTML === 'f') {
      table.rows[i].className += ' female';
    }
  }

  //inline-стиль,  если значение ячейки Age меньше 18
  for (let i = 1; i < table.rows.length; i++) {
    if (table.rows[i].cells[1].innerHTML < 18) {
      table.rows[i].style.textDecoration = 'line-through';
    }
  }
}
