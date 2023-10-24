
const alert_find = document.querySelector('.alert_find');

const btnAlertFind = document.querySelector('.btnContinuar');
const info_contact= document.querySelector('.info_contact');
const info_pet = document.querySelector('#find_1');
btnAlertFind.addEventListener('click',(e)=>{
    e.preventDefault();
    info_pet.style.display="none";
    info_contact.style.display="block"
})

const send_alert = document.querySelector(".send_alert")
send_alert.addEventListener('click',(e)=>{
    e.preventDefault();
    info_contact.style.display="none"
    const section_success = document.createElement('div');
    const div_success = document.createElement('div');
    const p_succes = document.createElement('p')
    div_success.classList.add("divSuccess");
    section_success.classList.add("sectionSuccess");
    //SVG
        const svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svgElement.setAttribute("width", "124");
        svgElement.setAttribute("height", "102");
        svgElement.setAttribute("viewBox", "0 0 124 102");
        svgElement.setAttribute("fill", "none");
 
        const pathElement = document.createElementNS("http://www.w3.org/2000/svg", "path");
        pathElement.setAttribute("d", "M104.512 3.44712C108.97 -1.14904 116.198 -1.14904 120.656 3.44712C125.06 7.98692 125.114 15.3128 120.818 19.9209L60.0516 98.2296C59.9639 98.3426 59.8702 98.4505 59.7709 98.5529C55.3127 103.149 48.0844 103.149 43.6262 98.5529L3.34368 57.024C-1.11456 52.4278 -1.11456 44.976 3.34367 40.3798C7.80191 35.7836 15.0301 35.7836 19.4884 40.3798L51.3546 73.232L104.209 3.79918C104.303 3.67569 104.404 3.55812 104.512 3.44712Z");
        pathElement.setAttribute("fill", "#006667");
        svgElement.appendChild(pathElement);

        p_succes.textContent ="Alerta publicada.";

    //Append
    section_success.appendChild(div_success);
    div_success.appendChild(svgElement);
    div_success.appendChild(p_succes);
    alert_find.appendChild(section_success);
})
