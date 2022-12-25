const buttons = document.querySelectorAll('button');
for (let i = 0; i < buttons.length; i++)
{
    let button = buttons[i];
    let buttonVal = button.textContent;
    button.addEventListener('click',
    function() {
        handleButtonPress(buttonVal);
    });
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
        // TODO: Implement clear
        console.log('CLEAR');
    }
    else if (buttonVal === '=')
    {
        // TODO: Implement equals
        console.log('Equals');
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

function isOperator(buttonVal)
{
    if (buttonVal === '+' || buttonVal === '-' || buttonVal === '*' || buttonVal === '/')
    {
        return true;
    }
    return false;
}

