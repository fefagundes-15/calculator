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

// Função para alternar entre os modos claro e escuro
function toggleDarkMode() {
    const body = document.body;
    const darkModeBtn = document.querySelector('.dark-mode-btn');
    const calculator = document.querySelector('.calculator');
    const button = document.querySelector('button');

    // Verifica se o modo escuro está ativado atualmente
    const isDarkMode = body.classList.contains('dark-mode');

    // Alterna a classe do corpo para alternar entre o modo escuro e claro
    body.classList.toggle('dark-mode');

    // Verifica se o modo escuro foi ativado ou desativado e armazena essa preferência
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('darkModeEnabled', 'true');
    } else {
        localStorage.removeItem('darkModeEnabled');
    }

    // Altera o texto do botão de acordo com o modo atual
    darkModeBtn.textContent = isDarkMode ? 'Dark Mode' : 'Light Mode';

    // Altera as cores de fundo dependendo do modo
    if (body.classList.contains('dark-mode')) {
        calculator.style.backgroundColor = '#5a5a5a';
    } else {
        calculator.style.backgroundColor = '#f1f1f1';
        button.style.backgroundColor = '#e4e4e4';
    }
}

// Verifica se o modo escuro estava ativado antes e aplica-o ao carregar a página
window.addEventListener('DOMContentLoaded', () => {
    const isDarkModeEnabled = localStorage.getItem('darkModeEnabled');
    if (isDarkModeEnabled === 'true') {
        toggleDarkMode();
    }
});
