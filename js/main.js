// homeWork 8-
let startBtn = document.getElementById('start'),
    budgetValue = document.getElementsByClassName('budget-value')[0],
    dayBudgetValue = document.getElementsByClassName('daybudget-value')[0],
    levelValue = document.getElementsByClassName('level-value')[0],
    expensesValue = document.getElementsByClassName('expenses-value')[0],
    optionalExpensesValue = document.getElementsByClassName('optionalexpenses-value')[0],
    incomeValue = document.getElementsByClassName('income-value')[0],
    monthSavingsValue = document.getElementsByClassName('monthsavings-value')[0],
    yearSavingsValue = document.getElementsByClassName('yearsavings-value')[0],

    inputExpenses = document.getElementsByClassName('expenses-item'),
    btnExpensesItem = document.getElementsByTagName('button')[0],
    btnOptionalExpensesItem = document.getElementsByTagName('button')[1],
    btnCountBudget = document.getElementsByTagName('button')[2],
    optionalExpensesItem = document.querySelectorAll('.optionalexpenses-item'),
    incomeItem = document.querySelector('.choose-income'),
    checkBox = document.querySelector('#savings'),
    chooseSum = document.querySelector('.choose-sum'),
    choosePercent = document.querySelector('.choose-percent'),
    yearValue = document.querySelector('.year-value'),
    monthValue = document.querySelector('.month-value'),
    dayValue = document.querySelector('.day-value');

let money, time;

btnExpensesItem.disabled = true;
btnOptionalExpensesItem.disabled = true;
btnCountBudget.disabled = true;

// Начать расчёт (кнопка старта по сути)
startBtn.addEventListener('click', function() {
  time = prompt("Введите дату в формате YYYY-MM-DD");
  money = +prompt("Ваш бюджет на месяц?");

  while(isNaN(money) || money == "" || money == null) {
    money = +prompt("Ваш бюджет на месяц?");
  }

  appData.budget = money;
  appData.timeData = time;
  budgetValue.textContent = money.toFixed();
  yearValue.value = new Date(Date.parse(time)).getFullYear(); // Так как input
  monthValue.value = new Date(Date.parse(time)).getMonth() + 1; // Потому что начинается с 0, для нормального отображения.
  dayValue.value = new Date(Date.parse(time)).getDay();

  btnExpensesItem.disabled = false;
  btnOptionalExpensesItem.disabled = false;
  btnCountBudget.disabled = false;
});

// Обязательные расходы.
btnExpensesItem.addEventListener('click', function() {
  let sum = 0;

  for (let i = 0; i < inputExpenses.length; i++) {
    let a = inputExpenses[i].value;
    let b = inputExpenses[++i].value;
  // prompt не нужен, поскольку у нас есть страница и мы получает из каждого импута значения.
    if (typeof(a) === 'string' && typeof(a) != null && typeof(a) != null && a != '' && b != '' &&  a.length < 50) {
      console.log("done");
      appData.expenses[a] = b;
      sum += +b;
    } else {
      console.log("плохо");
      i--;
    }
  }

  expensesValue.textContent = sum;
});

// Необязательные расходы.
btnOptionalExpensesItem.addEventListener('click', function() {
  for(let i=0;i < optionalExpensesItem.length;i++) {
    let question = optionalExpensesItem[i].value; // Создаём переменную со значение в полях input, там где необязательные расходы
    appData.optionalExpenses[i] = question; // Передаём в глобальный объект
    optionalExpensesValue.textContent += appData.optionalExpenses[i] + ' ';
  }
});

// Расчёт дневного бюджета.
btnCountBudget.addEventListener('click', function() {
  if(appData.budget != undefined) {
    appData.moneyPerDay = ((appData.budget - +expensesValue.textContent)/30).toFixed();
    dayBudgetValue.textContent = appData.moneyPerDay;
  
    if (appData.moneyPerDay < 100) {
      levelValue.textContent = "Минимальный уровень достатка";
    } else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
        levelValue.textContent = "Средний уровень достатка";
    } else if (appData.moneyPerDay > 2000) {
        levelValue.textContent = "Высокий уровень достатка";
    } else {
        levelValue.textContent = "Ошибка";
    }
  } else {
    dayBudgetValue.textContent = "Произошла ошибка";
  }
});

// Статья возможного дохода 
incomeItem.addEventListener('input', function() {
  let items = incomeItem.value;
  appData.income = items.split(", ");
  if (isNaN(items) || items != '') {
    appData.income = items.split(',');
    incomeValue.textContent = appData.income;
  } 
  // if(typeof(items) != 'string' || items != '' || items != null) {
  //   console.log("Вы ввели некорректные данные");
  // } else {
  //   appData.income = items.split(", ");
  // }
});

// Чек бокс
checkBox.addEventListener('click', function() {
  if(appData.savings == true) {
    appData.savings = false;
  } else {
    appData.savings = true;
  }
});

// Процентные накопления
chooseSum.addEventListener('input', function() {
  if(appData.savings == true) {
    let sum = +chooseSum.value,
        percent = +choosePercent.value;

    appData.monthIncome = sum/100/12*percent;
    appData.yearIncome = sum/100*percent; // На год

    monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
    yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
  } 
});

choosePercent.addEventListener('input', function() {
  if(appData.savings == true) {
    let sum = +chooseSum.value,
    percent = +choosePercent.value;

    appData.monthIncome = sum/100/12*percent;
    appData.yearIncome = sum/100*percent; // На год

    monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
    yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
  } 
});

var appData = {
  budget: money,
  timeData: time,
  expenses: {},
  optionalExpenses: {},
  income: [],
  savings: false
};

for(let key in appData) {
  console.log("Наша программа включает в себя данные: " + key + " - " + (appData[key]));
}
