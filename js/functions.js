//funcion para marcar algo como seleccionado sin usar un select, y usando un input hidden para guardar el valor.
function markSomethingAsSelectedWithHideInput(array, input, textToDisplay){
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
            // checkButtonState();
        });
    });
}


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


export { markSomethingAsSelectedWithHideInput, checkAndUncheckARadioInput };