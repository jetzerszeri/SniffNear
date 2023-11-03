import { getStorage, ref, uploadBytes, getDownloadURL } from 'https://www.gstatic.com/firebasejs/10.3.0/firebase-storage.js';

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

//funcion para marcar algo como seleccionado sin usar un select, y usando un input hidden para guardar el valor.
function markSomethingAsSelectedWithHideInputGetting(array, input, funcion, textToDisplay, validar){
    array = document.querySelectorAll(array);
    input = document.querySelector(input);

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
                validateInput(input, 'Selecciona una opción*');
                }
            } else {
                // Si no tiene la clase, quitar 'selected' de todos los demás elementos y añadírsela a este
                array.forEach(i => i.classList.remove('selected'));
                this.classList.add('selected');
                input.value = this.dataset.value;
                console.log(input.value);

                if (textToDisplay) {
                    textToDisplay.innerHTML = this.dataset.value;
                    textToDisplay.classList.add('selected');
                }
                validateInput(input, 'Selecciona una opción*');
            }
            if (funcion){
                funcion();
            }
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
        addValidationEvent(input);
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
    } else if (input.nodeName === 'SELECT' || input.type === 'file') {
        eventToUse = 'change';
    }

    input.addEventListener(eventToUse, (e) => {
        validateInput(input, 'Este campo es obligatorio*');
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
async function postFormInfoToDB ( endpoint, datos, redirect, redirectType ) {
    try {
        createLoader();
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(datos),
        });

        const json = await response.json();
        console.log(json);
        let redirección;

        if (redirectType === 'alert') {
            redirección = redirect + '?alertId=' + json.data._id;
            console.log(redirección);
        } else {

            redirección = redirect + '?petId=' + json.pet._id;
            console.log(redirección);
        }

        

        if (response.ok) {  // Si el servidor devuelve una respuesta exitosa (códigos 200-299)
            removeLoader();
            window.location.href = redirección;  // Redireccionar al usuario 
        // console.log(redirect)
        // console.log('console del json', json)
        } else {
            console.error('Error en el registro:', json.message);
        }

    } catch (error) {
        removeLoader();
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


// funcion para cargar una imagen y previsualizarla en el html
function previewImage(imgInput, previewDiv) {
    previewDiv = document.querySelector(previewDiv);
    imgInput.addEventListener('change', function() {
        // Aquí puedes agregar código para mostrar la imagen seleccionada si lo deseas
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                previewDiv.style.backgroundImage = `url(${e.target.result})`;
                previewDiv.innerHTML = '';
            }
            reader.readAsDataURL(file);
        }
    });

    console.log('previewImage Activado');
}

function addPreviewImgOnReview(input, previewDiv){
    const file = input.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            previewDiv.style.backgroundImage = `url(${e.target.result})`;
            previewDiv.innerHTML = '';
        }
        reader.readAsDataURL(file);
    }
}


// funcion para subir una imagen a firebase
async function uploadImage(storageInstance, file, customName) {
    // Obtener la extensión del archivo
    const extension = file.name.split('.').pop();
    
    // Crear el nombre del archivo con el customName, el timestamp y la extensión
    const fileName = `${customName}_${getCurrentTimestamp()}.${extension}`;

    // Crea una referencia en Firebase Storage con el nombre personalizado
    const storageRef = ref(storageInstance, fileName);

    await uploadBytes(storageRef, file);

    // Devuelve la URL de descarga del archivo.
    return getDownloadURL(storageRef);
}


// funcion para renderizar un mapa
        //Esto es todo lo que renderiza el mapa
function renderAMap(id, lat, lng, zoom, marker){
    let map = L.map(id).setView([lat, lng], zoom);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    L.marker([lat, lng], {
        draggable: marker.drag,
        icon: L.icon({
            iconUrl: 'img/pinFind.png',
            iconSize: [32, 32],
        })
    }).addTo(map).bindPopup(marker.text).openPopup();
}



//funcion para crear un loader
function createLoader(texto){
    let loaderBack = document.createElement('div');
    loaderBack.classList.add('loadingBackground');

    let loaderContainer = document.createElement('div');
    loaderContainer.classList.add('loadingContainer');

    let loader = document.createElement('div');
    loader.classList.add('bouncer');
    loader.innerHTML = `<div></div><div></div><div></div><div></div>`
    loaderContainer.appendChild(loader);

    if (texto) {
        let loaderText = document.createElement('p');
        loaderText.innerText = texto;
        loaderContainer.appendChild(loaderText);
    }

    loaderBack.appendChild(loaderContainer);
    document.body.appendChild(loaderBack);
}

// function para remover un loader
function removeLoader(){
    let loaderBack = document.querySelectorAll('.loadingBackground');
    loaderBack.forEach(element => {
        element.remove();
    });
}


export { markSomethingAsSelectedWithHideInput, checkAndUncheckARadioInput, validateInput, addValidationEvent, calculateAge, getCurrentTimestamp, postFormInfoToDB, stepsProgressBar, markSomethingAsSelectedWithHideInputGetting, uploadImage, previewImage, addPreviewImgOnReview, renderAMap, createLoader, removeLoader};