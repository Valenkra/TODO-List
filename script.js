

const listaHTML = document.getElementById("lista_de_elementos");
let ToDoS = [
    {
        id: 'e1',
        contenido: 'Aprobar EFSI',
        tachado: false,
        fechaYhoraCreacion: new Date(),
        fechaYhoraTachado: false
    },
    {
        id: 'e2',
        contenido: 'Terminar tarea de lengua',
        tachado: false,
        fechaYhoraCreacion: new Date(),
        fechaYhoraTachado: false
    },
    {
        id: 'e3',
        contenido: 'Estudiar matemática',
        tachado: false,
        fechaYhoraCreacion: new Date(),
        fechaYhoraTachado: false
    }
];


let siguienteID = ToDoS.length;

const mostrarLista = () => {
    listaHTML.innerHTML = "";
    for (let i = 0; i < ToDoS.length; i++) {
        listaHTML.innerHTML += `
        <div class="pequeElemento" id="D${ToDoS[i].id}">
            <div class="elemento" id="${ToDoS[i].id}">
                <input type="checkbox" class="myCheckbox" id="C${ToDoS[i].id}" onclick="tachar(${i})"/>
                <label>${ToDoS[i].contenido}</label>
            </div>
            <div class="basura">
                <img src="trash-solid.svg" id="B${ToDoS[i].id}" onclick="borrar(D${ToDoS[i].id}, ${i})">
            </div>
        <div>`;
        if(ToDoS[i].tachado == true) document.getElementById(`C${ToDoS[i].id}`).setAttribute("checked", "true");
        let myElement = document.getElementById(`${ToDoS[i].id}`);
        if(ToDoS[i].tachado == true) myElement.classList.add("tachado");
        if(i % 2 == 0) document.getElementById(`D${ToDoS[i].id}`).classList.add("fondo-oscuro");
    }
}

const agregarALista = () => {
    let newElementContent = document.getElementById("elementContent");
    ToDoS.push({
        id: `e${(siguienteID + 1).toString()}`,
        contenido: newElementContent.value,
        tachado: false,
        fechaYhoraCreacion: new Date(),
        fechaYhoraTachado: false
    });
    listaHTML.innerHTML = "";
    siguienteID++;
    mostrarLista();
}

const agregarElemento = document.getElementById("agregarElemento");
agregarElemento.onclick = () =>
{
    if(document.getElementById("elementContent").value.length > 0){
        agregarALista();
    }
};


const tareaMasRapida = () => {
    let times = [];
    ToDoS.forEach(element => {
        times.push(element.fechaYhoraTachado - element.fechaYhoraCreacion);
    });
    let target = Math.min(...(times.filter(num => num > 0)));
    let index = [];
    for (let i = 0; i < times.length; i++) {
        if(times[i] == target){
            index.push(i);
        } 
    }
    return index;
}

const verTareaMasRapida = document.getElementById("mostrarTarea");
const mostrarTareaMasRapida = document.getElementById("showTarea");
verTareaMasRapida.onclick = () => {
    let index = tareaMasRapida();
    for (let i = 0; i < index.length; i++) {
        mostrarTareaMasRapida.innerHTML = `
        <div class="elemento">
            <label>${ToDoS[index[i]].contenido} - ${ToDoS[index[i]].fechaYhoraTachado - ToDoS[index[i]].fechaYhoraCreacion}/s</label>
        </div>
        `
    }
    if(index.length == 0){
        mostrarTareaMasRapida.innerHTML = `
        <div class="elemento">
            <label style="color:#515151">ADVERTENCIA: ¡¡No hay ningun elemento tachado!!</label>
        </div>
        `
    }
}

const tachar = (indexElemento) => {
    const elemento = ToDoS[indexElemento];
    const checkbox = document.getElementById(`C${elemento.id}`);
    checkbox.onchange = () => {
        const myElement = document.getElementById(`${elemento.id}`);
        if(checkbox.checked){
            ToDoS[indexElemento].tachado = true;
            ToDoS[indexElemento].fechaYhoraTachado = new Date();
            myElement.classList.add("tachado");
        } else {
            ToDoS[indexElemento].tachado = false;
            ToDoS[indexElemento].fechaYhoraTachado = false;
            myElement.classList.remove("tachado");
        }
    }
}


const borrar = (littleElement, i) => {
    console.log(i);
    console.log(ToDoS[i]);
    ToDoS.splice(i, 1);
    document.getElementById("lista_de_elementos").removeChild(document.getElementById(littleElement.id));
    mostrarLista();
}

mostrarLista();