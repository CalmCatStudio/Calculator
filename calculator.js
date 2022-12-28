let snark = "Can't let you do that Star Fox";
const buttons = document.querySelectorAll('button');
setupButtons();


const calculatorInput = document.getElementById('calculatorInput');

let firstNumber = 0;
let secondNumber = 0;
let operator;
let answer = 0;
calculatorInput.addEventListener('click', function()
{
    if (calculatorInput.value === snark)
    {
        clearInput();
    }
})
calculatorInput.addEventListener('keypress', function(e)
{
    // TODO: Currently a user must include spaces. I think forcing a space before and after an operator is added would be a nice feature.
    let key = e.key;

    if (isEnterPressed(key))
    {
        if (tryParseInput(calculatorInput.value))
        {
            doMath();
        }
    }
})

function handleButtonPress(buttonVal)
{
    if (buttonVal === 'back')
    {
        let value = calculatorInput.value;
        value = value.substring(0, value.length - 1);
        calculatorInput.value = value;
    }
    else if (buttonVal === 'clear')
    {
        clearInput();
    }
    else if (buttonVal === '=')
    {
        if (tryParseInput(calculatorInput.value))
        {
            doMath();
        }
    }
    else if (isOperator(buttonVal))
    {
        calculatorInput.value += ` ${buttonVal} `;
    }
    else
    {
        calculatorInput.value += buttonVal;
    }
}

function doMath()
{
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
                    calculatorInput.value = snark;
                    return;
                }
            answer = firstNumber / secondNumber;
            break;
    }
    firstNumber = answer;
    calculatorInput.value = answer;
    secondNumber = 0;
}

function tryParseInput(input)
{   
    input = input.trim();
    let multiSpaceRegex = /\s+/
    let split = input.split(multiSpaceRegex);
    firstNumber = parseFloat(split[0]);
    operator = tryGetOperator(split[1]);
    secondNumber = parseFloat(split[2]);
    
    if (isNaN(firstNumber) || isNaN(secondNumber))
    {
        console.log('A number was NaN');
        console.log(split[0]);
        console.log(split[2]);
        return false;
    }
    if (operator === false)
    {
        console.log('The operator was not valid');
        return false;
    }
    return true;
}

function clearInput()
{
    calculatorInput.value = '';
    firstNumber = secondNumber = 0;
}

function tryGetOperator(key)
{
    if (key === '+' || key === '-' || key === '/')
    {
        return key;
    }
    else if (key === '*' || key === 'x' || key === 'X')
    {
        return '*';
    }
    return false;
}

function isOperator(key)
{
    if (key === '+' || key === '-' || key === '*' || key === '/')
    {
        return true;
    } // Other possible values for operators
    else if (key === 'x' || key === 'X')
    {
        return true;
    }
    return false;
}

function isEnterPressed(key) 
{
    return key === 'Enter' || key === 'ENTER';
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