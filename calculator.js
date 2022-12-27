const buttons = document.querySelectorAll('button');
setupButtons();


const firstNumberInput = document.getElementById('firstNumber');
const operatorInput = document.getElementById('operator');
const secondNumberInput = document.getElementById('secondNumber');
let firstNumber = firstNumberInput.value;
let secondNumber = secondNumberInput.value;
let operator = '+';
let answer = 0;
let isFirstNegativeNumber = false;
firstNumberInput.addEventListener('keypress', function(e)
{
    let key = e.keyCode;
    if (key == 'ENTER')
    {
        secondNumberInput.focus();
    }
    else if (isOperator(key))
    {
        // This is to allow negative numbers in the textbox
        if (key === 45 && firstNumberInput.value.length === 0 && isFirstNegativeNumber === false)
        {
            isFirstNegativeNumber = true;
            return;
        }
        setOperator(key);
        if (firstNumberInput.value !== '')
        {
            console.log(firstNumberInput.value)
            secondNumberInput.focus();
        }

        e.preventDefault();
        return;
    }
})

secondNumberInput.addEventListener('keypress', function(e)
{
    let key = e.keyCode;
    if (isEnterPressed(key))
    {
        doMath();
    }
    else if (isOperator(key))
    {
        // Don't accept operator input unless its a MINUS symbol
        // This is to allow negative numbers in the textbox
        if (key !== 45)
        {
            e.preventDefault();
        }     
    }
})

function setOperator(key)
{
    if (key === 43)
    {
        operator = '+';
        operatorInput.value = 'plus';
    }
    else if (key === 45)
    {
        operator = '-';
        operatorInput.value = 'minus';
    }
    else if (key === 47)
    {
        operator - '/';
        operatorInput.value = 'divide';
    }
    else
    {
        operator = '*';
        operatorInput.value = 'multiply';
    }
}

function handleButtonPress(buttonVal)
{
    if (buttonVal === 'back')
    {
        // TODO: Implement backspace
        console.log('BACKSPACE');
    }
    else if (buttonVal === 'clear')
    {
        clearInput();
    }
    else if (buttonVal === '=')
    {
        doMath();
    }
    else if (isOperator(buttonVal))
    {
        // TODO: Implement Operator
        console.log('Operator'); 
    }
    else
    {
        // TODO: Enter number into equation.
        console.log('number');
    }
}

function doMath()
{
    firstNumber = parseFloat(firstNumberInput.value);
    secondNumber = parseFloat(secondNumberInput.value);

    switch (operator)
    {
        case '+':
            answer = firstNumber + secondNumber;
            break;
        case '-':
            answer = firstNumber - secondNumber;
            break;
        case '*':
            answer = firstNumber * secondNumber;
            break;
        case '/':
            if (firstNumber === 0 ||
                secondNumber === 0)
                {
                    // TODO: Snarky message
                    break;
                }
            answer = firstNumber / secondNumber;
            break;
    }
    firstNumber = answer;
    firstNumberInput.value = answer;
    secondNumberInput.value = '';
    secondNumber = 0;
}

function clearInput()
{
    firstNumberInput.value = secondNumberInput.value = '';
    firstNumber = secondNumber = 0;
}

function isOperator(buttonVal)
{
    if (buttonVal === '+' || buttonVal === '-' || buttonVal === '*' || buttonVal === '/')
    {
        return true;
    } // The ascii codes for each symbol AND the letters X and x.
    else if (buttonVal === 43 || buttonVal === 45 || buttonVal === 47 || buttonVal === 42 || buttonVal === 88 || buttonVal === 120)
    {
        return true;
    }
    return false;
}

function isEnterPressed(buttonVal) 
{
    return buttonVal == 13;
}

function setupButtons()
{
    for (let i = 0; i < buttons.length; i++)
    {
        let button = buttons[i];
        let buttonVal = button.textContent;
        button.addEventListener('click',
        function() {
            handleButtonPress(buttonVal);
        });
    }
}