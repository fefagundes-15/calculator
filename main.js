function appendToDisplay(value) {
    document.getElementById('display').value += value;
}

function clearDisplay() {
    document.getElementById('display').value = '';
}

function calculate() {
    let expression = document.getElementById('display').value;
    let result;
    try {
        result = eval(expression);
    } catch (error) {
        result = 'Erro';
    }
    document.getElementById('display').value = result;
}

// Inverter sinal
function invertSign() {
    let expression = document.getElementById('display').value;
    let numbers = expression.split(/[\+\-\*\/]/); // Divide a expressão em números usando os operadores matemáticos como delimitadores
    let lastNumber = numbers[numbers.length - 1]; // Obtém o último número da expressão
    let lastIndex = expression.lastIndexOf(lastNumber); // Encontra o índice do último número na expressão

    if (lastNumber.charAt(0) === '-') {
        // Se o número for negativo, remova o sinal negativo
        document.getElementById('display').value = expression.substring(0, lastIndex) + lastNumber.substring(1);
    } else if (lastIndex > 0 && expression.charAt(lastIndex - 1) === '-') {
        // Se o número não for negativo, mas houver um sinal negativo antes dele, remova-o
        document.getElementById('display').value = expression.substring(0, lastIndex - 1) + lastNumber;
    } else {
        // Se o número for positivo, adicione um sinal negativo
        document.getElementById('display').value = expression.substring(0, lastIndex) + '-' + lastNumber;
    }
}

// Dark mode
let darkModeEnabled = false;

function toggleDarkMode() {
    darkModeEnabled = !darkModeEnabled;
    const container = document.querySelector('body');
    if (darkModeEnabled) {
        container.classList.add('dark-mode');
    } else {
        container.classList.remove('dark-mode');
    }
}