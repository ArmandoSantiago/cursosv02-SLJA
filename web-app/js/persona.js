let URL = "http://localhost:8080/cursosv02/persona/"

function listar() {
    fetch(URL + 'listaPersonas')
        .then(function (response) {
            return response.json()
        }).then(function (data) {

        let lista = data.personas;
        let personas = "";

        for (let i = 0; i < lista.length; i++) {
            personas += `<tr> 
                <td>${i + 1}</td> 
                <td>${lista[i].nombre} ${lista[i].apellidoPaterno} ${lista[i].apellidoMaterno}</td>
                <td>${lista[i].edad}</td>
                <td>${lista[i].correo}</td>
                <td>${lista[i].telefono}</td>
                <td><button id="btnEditar" onclick="editar(${lista[i].id});">Editar</button></td>
                <td><button id="btnEliminar" onclick="eliminar(${lista[i].id});">Eliminar</button></td>
                </tr>`
        }
        let contenido = document.getElementById("personas");
        contenido.innerHTML = personas
    })
}

function index() {
    window.location.href = URL + "index"
}

function guardar(evento, accion) {
    evento.preventDefault();
    var persona, mensaje, error;
    let id = document.getElementById("id").value;
    let nombre = document.getElementById("nombre").value;
    let apellidoPaterno = document.getElementById("apellidoPaterno").value;
    let apellidoMaterno = document.getElementById("apellidoMaterno").value;
    let edad = document.getElementById("edad").value;
    let correo = document.getElementById("correo").value;
    let telefono = document.getElementById("telefono").value;

    persona = {
        id: id !== "" ? id : null,
        nombre: nombre,
        apellidoPaterno: apellidoPaterno,
        apellidoMaterno: apellidoMaterno,
        edad: edad,
        correo: correo,
        telefono: telefono
    }

    if (accion == "registrar") {
        mensaje = "Registro exitoso";
        error = "Error al registrar"
    } else {
        mensaje = "Actualización exitosa";
        error = "Error al actualizar"
    }

    fetch(URL + 'guardar', {
        method: 'POST',
        body: JSON.stringify(persona)
    })
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            if (data.respuesta === true) {
                alert(mensaje);
                index();
            } else {
                alert(error)
            }
        })
}

function editar(id) {
    fetch(URL + 'obtener', {
        method: 'POST',
        body: JSON.stringify({id: id})
    })
        .then(function (response) {
            return response.json()

        })
        .then(function (data) {
            localStorage.setItem('persona', JSON.stringify(data.persona));
            window.location.href = URL + 'editar'
        })
}

function cargarPersona() {
    let persona = JSON.parse(localStorage.getItem('persona'));
    let id = document.getElementById('id');
    let nombre = document.getElementById('nombre');
    let apellidoPaterno = document.getElementById('apellidoPaterno');
    let apellidoMaterno = document.getElementById('apellidoMaterno');
    let edad = document.getElementById('edad');
    let correo = document.getElementById('correo');
    let telefono = document.getElementById('telefono');

    id.value = persona.id;
    nombre.value = persona.nombre;
    apellidoMaterno.value = persona.apellidoMaterno;
    apellidoPaterno.value = persona.apellidoPaterno;
    edad.value = persona.edad;
    correo.value = persona.correo;
    telefono.value = persona.telefono
}

function eliminar(id) {
    let confirmacion = confirm('¿Desea eliminar el elemento seleccionado?')

    if (confirmacion === true) {
        fetch(URL + 'eliminar', {
            method: 'POST',
            body: JSON.stringify({id: id})
        })
            .then(function (response) {
                return response.json()
            })
            .then(function (data) {
                if (data.respuesta === true) {
                    index()
                } else {
                    alert("Error al eliminar")
                }
            })
    }
}
