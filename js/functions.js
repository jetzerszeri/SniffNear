//funcion para marcar algo como seleccionado sin usar un select, y usando un input hidden para guardar el valor.
function markSomethingAsSelectedWithHideInput(array, input, funcion, textToDisplay, validar){
    array.forEach(element => {
        element.addEventListener('click', function() {
            // Verificar si el elemento ya tiene la clase 'selected'
            if (this.classList.contains('selected')) {
                // Si ya tiene la clase, quitársela
                this.classList.remove('selected');
                input.value = "";
                if (textToDisplay) {
                    textToDisplay.innerHTML = "Pequeño, mediano o grande";
                    textToDisplay.classList.remove('selected');
                }
                if (validar){
                validateInput(input, 'Selecciona una opción');
                }
            } else {
                // Si no tiene la clase, quitar 'selected' de todos los demás elementos y añadírsela a este
                array.forEach(i => i.classList.remove('selected'));
                this.classList.add('selected');
                input.value = this.dataset.value;

                if (textToDisplay) {
                    textToDisplay.innerHTML = this.dataset.value;
                    textToDisplay.classList.add('selected');
                }
                validateInput(input, 'Selecciona una opción');
            }
            funcion();
        });
    });
}


// funcion para poder marcar y desmarcar un radio input
function checkAndUncheckARadioInput(inputs){
    inputs.forEach(input => {
        let wasChecked = false;
    
        input.addEventListener('click', function() {
            if (wasChecked) {
                this.checked = false;
                wasChecked = false;
            } else {
                wasChecked = this.checked;
            }
        });
    });
}



// funcion para validar un input, si no valida agregarle el texto de error
function validateInput(input, textoAMostrar, variable) {
    const errorText = document.createElement('p');
    errorText.classList.add('errorInput');
    errorText.innerHTML = textoAMostrar;

    let valueToCheck = input.value.trim();

    let targetForError = input;

    let nextNode = targetForError.nextSibling;
    while (nextNode && nextNode.nodeType !== 1) {
        nextNode = nextNode.nextSibling;
    }

    if (!valueToCheck) {
        targetForError.classList.add('error');
        if (!nextNode || (nextNode && !nextNode.classList.contains('errorInput'))) {
            targetForError.insertAdjacentElement('afterend', errorText);
        }
        if (variable !== undefined) {
            variable = false;
        }
    } else {
        targetForError.classList.remove('error');
        if (nextNode && nextNode.classList.contains('errorInput')) {
            nextNode.remove();
        }
        if (variable !== undefined) {
            variable = true;
        }
    }

    return variable; // Podrías retornar el valor de variable para usarlo después
}

function addValidationEvent(input) {
    let eventToUse = 'keyup'; // por defecto

    if (input.type === 'date') {
        eventToUse = 'input';
    } else if (input.nodeName === 'SELECT') {
        eventToUse = 'change';
    }

    input.addEventListener(eventToUse, (e) => {
        validateInput(input, 'Este campo es obligatorio');
    });
}



export { markSomethingAsSelectedWithHideInput, checkAndUncheckARadioInput, validateInput, addValidationEvent };