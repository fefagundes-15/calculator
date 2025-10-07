document.addEventListener('DOMContentLoaded', function () {
    const historic = document.getElementById("historic");
    const display = document.getElementById("display");
    const buttons = document.querySelectorAll("button[data-value]");

    // Dark Mode
    function toggleDarkMode() {
        const body = document.body;
        const darkModeBtn = document.querySelector('.dark-mode-btn');

        body.classList.toggle('dark-mode');

        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('darkModeEnabled', 'true');
            darkModeBtn.innerHTML = `<i class="fa-solid fa-sun"></i>`;
        } else {
            localStorage.removeItem('darkModeEnabled');
            darkModeBtn.innerHTML = `<i class="fa-solid fa-moon"></i>`;
        }
    }

    // Verifica se o modo escuro estava ativado
    function checkDarkModePreference() {
        const isDarkModeEnabled = localStorage.getItem('darkModeEnabled');
        if (isDarkModeEnabled === 'true') {
            toggleDarkMode();
        }
    }

    // Adiciona botão de Dark Mode dinamicamente
    function addDarkModeButton() {
        const darkModeBtn = document.createElement('button');
        darkModeBtn.innerHTML = `<i class="fa-solid fa-moon"></i>`;
        darkModeBtn.className = 'dark-mode-btn'; // Adiciona a classe CSS
        darkModeBtn.addEventListener('click', toggleDarkMode);
        document.body.appendChild(darkModeBtn);
    }

    // Inicializa Dark Mode
    addDarkModeButton();
    checkDarkModePreference();

    // Funções da calculadora
    function appendToDisplay(value) {
        display.value += value;
        updateHistoric();
    }

    function clearDisplay() {
        display.value = '';
        historic.value = '';
    }

    function calculate() {
        let expression = display.value;
        let result;
        try {
            result = eval(expression);
            // Atualiza o histórico com a expressão completa
            historic.value = expression + ' =';
        } catch (error) {
            result = 'Erro';
            historic.value = '';
        }
        display.value = result;
    }

    function deleteLastCharacter() {
        display.value = display.value.slice(0, -1);
        updateHistoric();
    }

    function invertSign() {
        let expression = display.value;
        let numbers = expression.split(/[\+\-\*\/]/);
        let lastNumber = numbers[numbers.length - 1];
        let lastIndex = expression.lastIndexOf(lastNumber);

        if (lastNumber.charAt(0) === '-') {
            display.value = expression.substring(0, lastIndex) + lastNumber.substring(1);
        } else if (lastIndex > 0 && expression.charAt(lastIndex - 1) === '-') {
            display.value = expression.substring(0, lastIndex - 1) + lastNumber;
        } else {
            display.value = expression.substring(0, lastIndex) + '-' + lastNumber;
        }
        updateHistoric();
    }

    function updateHistoric() {
        // Mostra a expressão atual no histórico
        historic.value = display.value;
    }

    // Event listeners para os botões
    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const value = button.getAttribute("data-value");

            switch (value) {
                case "C":
                    clearDisplay();
                    break;

                case "delete":
                    deleteLastCharacter();
                    break;

                case "=":
                    calculate();
                    break;

                case "±":
                    invertSign();
                    break;

                default:
                    appendToDisplay(value);
                    break;
            }
        });
    });

    // Suporte ao teclado
    document.addEventListener('keydown', function (event) {
        const key = event.key;

        if (key >= '0' && key <= '9') {
            appendToDisplay(key);
        } else if (key === '+' || key === '-' || key === '*' || key === '/') {
            appendToDisplay(key);
        } else if (key === '.' || key === ',') {
            appendToDisplay('.');
        } else if (key === 'Enter' || key === '=') {
            event.preventDefault();
            calculate();
        } else if (key === 'Escape' || key === 'Delete') {
            clearDisplay();
        } else if (key === 'Backspace') {
            deleteLastCharacter();
        }
    });
});