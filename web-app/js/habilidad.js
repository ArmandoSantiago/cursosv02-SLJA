let URL = "http://localhost:8080/cursosv02-SLJA/habilidad/"

function listarHablidad(){
    fetch(URL+'listaHabilidades')
        .then(function (response) {
            return response.json()
        }).then(function (data) {

        let lista = data.habilidades;
        let habilidades = "";

        for(let i=0; i < lista.length; i++){
            habilidades +=
                `<tr> 
                <td>${i+1}</td> 
                <td>${lista[i].nombre}</td>
                <td>${lista[i].persona.nombre} ${lista[i].persona.apellidoPaterno} ${lista[i].persona.apellidoMaterno}</td>
              
                <td><button id="btnEditar" onclick="editarHabilidad(${lista[i].id});">Editar</button></td>
                <td><button id="btnEliminar" onclick="eliminarHabilidad(${lista[i].id});">Eliminar</button></td>
                </tr>`
        }
        let contenido = document.getElementById("habilidades");
        contenido.innerHTML= habilidades
    })
}

function indexHabilidad() {
    window.location.href = URL + "index"
}

function guardarHabilidad(evento, accion) {
    evento.preventDefault();
    var habilidad, mensaje, error;
    let id = document.getElementById("id").value;
    let nombre = document.getElementById("nombre").value;
    let persona = document.getElementById("persona").value;

    habilidad = {
        id : id !== "" ? id : null,
        nombre : nombre,
        persona : persona
    }

    if (accion=="registrar"){
        mensaje = "Registro exitoso";
        error= "Error al registrar"
    }else{
        mensaje = "Actualización exitosa";
        error= "Error al actualizar"
    }

    fetch(URL + 'guardar', {
        method: 'POST',
        body: JSON.stringify(habilidad)
    })
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            if (data.respuesta){
                alert(mensaje);
                indexHabilidad();
            }else{
                alert(error)
            }
        })
}

function editarHabilidad(id) {
    fetch(URL+'obtener', {
        method: 'POST',
        body: JSON.stringify({id: id})
    })
        .then(function (response) {
            return response.json()

        })
        .then(function (data) {
            localStorage.setItem('habilidad', JSON.stringify(data.habilidad));
            localStorage.setItem('persona', JSON.stringify(data.persona));
            window.location.href = URL + 'editar'
        })
}

function cargarHabilidad() {
    let habilidad = JSON.parse(localStorage.getItem('habilidad'));
    let lista = JSON.parse(localStorage.getItem('persona'));

    let id = document.getElementById('id');
    let nombre = document.getElementById('nombre');

    let contenido = document.getElementById("persona");

    for(let i=0; i < lista.length; i++){
        var opt = document.createElement('option');
        opt.value = lista[i].id;
        opt.text = lista[i].nombre +' '+lista[i].apellidoPaterno +' '+lista[i].apellidoMaterno;
        opt.selected = habilidad.persona.id === lista[i].id
        contenido.add(opt);
    }

    id.value=habilidad.id;
    nombre.value = habilidad.nombre;
}

function cargarPersonas() {
    fetch(URL+'consultaPersonas')
        .then(function (response) {
            return response.json()
        }).then(function (data) {

        let lista = data.personas;
        let contenido = document.getElementById("persona");

        for(let i=0; i < lista.length; i++){
            var opt = document.createElement('option');
            opt.value = lista[i].id;
            opt.textContent = lista[i].nombre +' '+lista[i].apellidoPaterno +' '+lista[i].apellidoMaterno;
            contenido.add(opt);
        }
    })
}

function eliminarHabilidad(id) {
    let confirmacion = confirm('¿Desea eliminar el elemento seleccionado?')
    if (confirmacion === true ){
        fetch(URL + 'eliminar', {
            method: 'POST',
            body: JSON.stringify({id: id})
        })
            .then(function (response) {
                return response.json()
            })
            .then(function (data) {
                if(data.respuesta === true){
                    indexHabilidad()
                }else{
                    alert("Error al eliminar")
                }
            })
    }
}
