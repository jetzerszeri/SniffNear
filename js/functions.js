//funcion para marcar algo como seleccionado sin usar un select, y usando un input hidden para guardar el valor.
function markSomethingAsSelectedWithHideInput(array, input, funcion, textToDisplay){
    array.forEach(element => {
        element.addEventListener('click', function() {
            array.forEach(i => i.classList.remove('selected'));
            this.classList.add('selected');
            input.value = this.dataset.value;
            console.log(input.value);

            if (textToDisplay) {
                textToDisplay.innerHTML = this.dataset.value;
                textToDisplay.classList.add('selected');
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
function validateInput(input, textoAMostrar, variable){
    //la variable es para validar si el input es correcto o no, si es correcto es true, si no es false pero viene de arriba para poder usarlo en el submit
    const errorText = document.createElement('p');
    errorText.classList.add('errorInput');
    errorText.innerHTML = textoAMostrar;

    // Obtener el siguiente nodo hermano (puede que no sea un elemento, por ejemplo, si es un nodo de texto)
    let nextNode = input.nextSibling;

    // Si el siguiente nodo es un nodo de texto (no un elemento), saltar al siguiente nodo
    while (nextNode && nextNode.nodeType !== 1) {
        nextNode = nextNode.nextSibling;
    }

    if (!input.value.trim()) {
        input.classList.add('error');
        if (!nextNode || (nextNode && !nextNode.classList.contains('errorInput'))) {
            input.insertAdjacentElement('afterend', errorText);
        }

        if (variable) {
            variable = false;
        }
        // console.log('no hay nombre');
    } else {
        input.classList.remove('error');
        if (nextNode && nextNode.classList.contains('errorInput')) {
            nextNode.remove();
        }
        if (variable) {
            variable = true;
        }
        // console.log('hay nombre');
    }
}


export { markSomethingAsSelectedWithHideInput, checkAndUncheckARadioInput, validateInput };