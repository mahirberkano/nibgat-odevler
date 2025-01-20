const clearDisplay = () => {
    document.getElementById('input-display').value = '';
}

let calculated = false;

const appendToDisplay = (value) => {
    let display = document.getElementById('input-display');
    let currentValue = display.value;
    // display'e islem semboluyle baslanmamasını saglamak
    if (currentValue === '' && ['/', '*', '-', '+', '.'].includes(value)) {
        return;
    }

    if (currentValue === 'Error' || calculated) {
        display.value = value;
        calculated = false;
    } else {
        // display'de islem sembolunun tekrarlanmaması
        const lastChar = currentValue[currentValue.length - 1];
        if (['/', '*', '-', '+', '.'].includes(lastChar) && ['/', '*', '-', '+', '.'].includes(value)) {
            return;
        }
        display.value += value;
    }
}

const calculateResult = () => {
    let display = document.getElementById('input-display');
    try {
        if (!calculated) {
            let result = eval(display.value);
            if (isNaN(result) || result === Infinity) {
                display.value = "Error";
            } else {
                saveCalculation(display.value, result);
                display.value = result;
                calculated = true;
            }
        }
    } catch (e) {
        display.value = "Error";
    }
}

async function saveCalculation(expression, result) {
    const response = await fetch('/api/history', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ expression, result })
    });
}