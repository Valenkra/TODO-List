

const listaHTML = document.getElementById("lista_de_elementos");

let ToDoS = [
    {
        id: 'e1',
        contenido: 'Este es mi primer aloha',
        tachado: false,
        fechaYhoraCreacion: new Date(),
        fechaYhoraTachado: false
    },
    {
        id: 'e2',
        contenido: 'Terminar tarea de lengua',
        tachado: false,
        fechaYhoraCreacion: new Date(),
        fechaYhoraTachado: new Date(2024, 5, 1, 0, 0, 0, 0)
    }
];


const mostrarLista = () => {
    for (let i = 0; i < ToDoS.length; i++) {
        listaHTML.innerHTML += `
        <div class="pequeElemento" id="D${ToDoS[i].id}">
            <div class="elemento" id="${ToDoS[i].id}">
                <input type="checkbox" id="C${ToDoS[i].id}"/>
                <label>${ToDoS[i].contenido}</label>
            </div>
            <div class="basura">
                <img src="trash-solid.svg" id="B${ToDoS[i].id}">
            </div>
        <div>`;
        if(ToDoS[i].tachado == true) document.getElementById(`C${ToDoS[i].id}`).setAttribute("checked", "true");
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
agregarElemento.onclick = () =>
{
    if(document.getElementById("elementContent").value.length > 0){
        agregarALista();
    }
};


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

const todosElementos = document.getElementById("lista_de_elementos");
todosElementos.onmouseover = () => {
    for (let i = 0; i < ToDoS.length; i++) {
        const checkbox = document.getElementById(`C${ToDoS[i].id}`);
        checkbox.onchange = () => {
            let myElement = document.getElementById(`${ToDoS[i].id}`);
            if(checkbox.checked){
                ToDoS[i].tachado = true;
                ToDoS[i].fechaYhoraTachado = new Date();
                myElement.classList.add("tachado");
            } else {
                ToDoS[i].tachado = false;
                ToDoS[i].fechaYhoraTachado = false;
                myElement.classList.remove("tachado");
            }
        }

        const basura = document.getElementById(`B${ToDoS[i].id}`);
        basura.onclick = () => {
            console.log("Tocado!");
            ToDoS = ToDoS.splice(i, 1);
            document.getElementById(`D${ToDoS[i].id}`).removeChild(document.getElementById(`${ToDoS[i].id}`));
        }

        console.log(ToDoS);
    }
}

mostrarLista();