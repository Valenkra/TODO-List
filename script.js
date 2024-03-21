const listaHTML = document.getElementById("lista_de_elementos");

let ToDoS = [
    {
        id: 'e1',
        contenido: 'Este es mi primer aloha',
        tachado: false,
        fechaYhoraCreacion: new Date(),
        fechaYhoraTachado: new Date(2024, 5, 1, 0, 0, 0, 0)
    },
    {
        id: 'e2',
        contenido: 'Terminar tarea de lengua',
        tachado: true,
        fechaYhoraCreacion: new Date(),
        fechaYhoraTachado: new Date(2024, 5, 1, 0, 0, 0, 0)
    }
];


const mostrarLista = () => {
    for (let i = 0; i < ToDoS.length; i++) {
        listaHTML.innerHTML += `
        <div class="elemento" id="${ToDoS[i].id}">
            <input type="checkbox" id="C${ToDoS[i].id}"/>
            <label>${ToDoS[i].contenido}</label>
        </div>`;
        document.getElementById(`C${ToDoS[i].id}`).checked = ToDoS[i].tachado;
        let myElement = document.getElementById(`${ToDoS[i].id}`);
        if(ToDoS[i].tachado == true) myElement.classList.add("tachado");
    }
}

const agregarALista = () => {
    let newElementContent = document.getElementById("elementContent");
    ToDoS.push({
        id: `e${(ToDoS.length + 1).toString()}`,
        contenido: newElementContent.value,
        tachado: false,
        fechaYhoraCreacion: new Date(),
        fechaYhoraTachado: false
    });
    listaHTML.innerHTML = "";
    mostrarLista();
}


const agregarElemento = document.getElementById("agregarElemento");
agregarElemento.onclick
{
    agregarALista();
}


const tareaMasRapida = (ToDoS) => {
    let times = [];
    ToDoS.forEach(element => {
        times.push(element.fechaYhoraTachado.getTime() - element.fechaYhoraCreacion.getTime());
    });
    let target = Math.min(...times);
    let index = [];
    console.log(target);
    for (let i = 0; i < times.length; i++) {
        if(times[i] == target) index.push(i);
    }
    return index;
}