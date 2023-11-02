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
        // if (variable !== undefined) {
        //     variable = false;
        // }
        return false;
    } else {
        targetForError.classList.remove('error');
        if (nextNode && nextNode.classList.contains('errorInput')) {
            nextNode.remove();
        }
        // if (variable !== undefined) {
        //     variable = true;
        // }
        return true;
    }

    // return variable; // Podrías retornar el valor de variable para usarlo después
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


function calculateAge(isoDate) {
    const birthDate = new Date(isoDate);
    const currentDate = new Date();

    let years = currentDate.getFullYear() - birthDate.getFullYear();
    let months = currentDate.getMonth() - birthDate.getMonth();

    // Si el mes actual es menor que el mes de nacimiento, disminuye un año y suma 12 a los meses
    if (months < 0) {
        years--;
        months += 12;
    }

    // Si estamos en el mismo mes pero el día actual es menor que el día de nacimiento, disminuye un mes
    if (currentDate.getMonth() === birthDate.getMonth() && currentDate.getDate() < birthDate.getDate()) {
        months--;
    }

    // return {
    //     years: years,
    //     months: months
    // };

    let texto = `${years} años`;
    switch (years) {
        case 0:
            texto = `${months} meses`;
            break;
        case 1:
            if (months === 0) {
                texto = `${years} año`;
            } else {
                texto = `${years} año y ${months} meses`;
            }
            break;
        default:
            if (months === 0) {
                texto = `${years} años`;
            } else {
                texto = `${years} años y ${months} meses`;
            }
            break;
    }

    return texto;
}

function getCurrentTimestamp() {
    const now = new Date();
    return `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}_${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}${String(now.getSeconds()).padStart(2, '0')}`;
}


// funcion para agregar datos a la base de datos
async function postFormInfoToDB ( endpoint, datos, redirect ) {
    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(datos),
        });

        const json = await response.json();
        console.log(json);

        let redirección = redirect + '?petId=' + json.pet._id;
        console.log(redirección);

        if (response.ok) {  // Si el servidor devuelve una respuesta exitosa (códigos 200-299)

            window.location.href = redirección;  // Redireccionar al usuario 
        // console.log(redirect)
        // console.log('console del json', json)
        } else {
            console.error('Error en el registro:', json.message);
        }

    } catch (error) {
        console.error('Error:', error);
    }
}


// funcion para marcador del indicador de pasos en un formulario miltistep
function stepsProgressBar(arrayProgressIndicator, counter){
    arrayProgressIndicator.forEach((step, index) => {
        step.classList.remove('active');
        if (index < counter) {
            step.classList.add('active');
        }
    });
}



export { markSomethingAsSelectedWithHideInput, checkAndUncheckARadioInput, validateInput, addValidationEvent, calculateAge, getCurrentTimestamp, postFormInfoToDB, stepsProgressBar };