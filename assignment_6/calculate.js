function calculate(event) {
    // prevent form submission
    if (event && typeof event.preventDefault === 'function') event.preventDefault();

    const lengthRaw = document.getElementById('length').value;
    const widthRaw = document.getElementById('width').value;

    const length = Number(lengthRaw);
    const width = Number(widthRaw);

    // basic validation
    if (!Number.isFinite(length) || !Number.isFinite(width)) {
        showError('Please enter valid numeric values for length and width.');
        return;
    }
    if (length < 0 || width < 0) {
        showError('Length and width must be non-negative.');
        return;
    }

    clearError();
    calculateArea(length, width, handlerArea);
    calculatePerimeter(length, width, handlerPerimeter);
}

function calculateArea(length, width, callback) {
    const area = length * width; // correct formula
    callback(area);
}

function calculatePerimeter(length, width, callback) {
    const perimeter = 2 * (length + width);
    callback(perimeter);
}

function handlerArea(result) {
    document.getElementById('areaResult').innerText = 'Area: ' + result;
}

function handlerPerimeter(result) {
    document.getElementById('perimeter').innerText = 'Perimeter: ' + result;
}

function showError(message) {
    const areaEl = document.getElementById('areaResult');
    const perEl = document.getElementById('perimeter');
    areaEl.innerText = '';
    perEl.innerText = '';
    // simple inline error display
    const form = document.querySelector('form');
    let err = document.getElementById('calcError');
    if (!err) {
        err = document.createElement('p');
        err.id = 'calcError';
        err.className = 'text-red-600 text-sm';
        form.appendChild(err);
    }
    err.innerText = message;
}

function clearError() {
    const err = document.getElementById('calcError');
    if (err) err.remove();
}
