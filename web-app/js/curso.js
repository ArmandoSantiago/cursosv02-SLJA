let URL = "http://localhost:8080/cursosv02-SLJA/curso/"

function listarCursos() {
    fetch(URL + 'listaCursos')
        .then(function (response) {
            return response.json()
        }).then(function (data) {

        let lista = data.cursos;
        let cursos = "";

        for (let i = 0; i < lista.length; i++) {
            const dateInicio = new Date(lista[i].fechaInicio)
            const dateFin = new Date(lista[i].fechaFin)
            cursos += `<tr> 
                <td>${i + 1}</td> 
                <td>${lista[i].nombre}</td>
                <td>${dateInicio.getDate()}-${dateInicio.getMonth() + 1}-${dateInicio.getFullYear()}</td>
                <td>${dateFin.getDate()}-${dateFin.getMonth() + 1}-${dateFin.getFullYear()}</td>
                
                <td><button id="btnEditar" onclick="editarCurso(${lista[i].id});">Editar</button></td>
                <td><button id="btnEliminar" onclick="eliminarCurso(${lista[i].id});">Eliminar</button></td>
                </tr>`
        }
        let contenido = document.getElementById("cursos");
        contenido.innerHTML = cursos
    })
}

function indexCursos() {
    window.location.href = URL + "index"
}

function guardarCurso(evento, accion) {
    evento.preventDefault();
    var curso, mensaje, error;
    let id = document.getElementById("id").value;
    let nombre = document.getElementById("nombre").value;
    let fechaInicio = document.getElementById("fechaInicio").value;
    console.log("fechaInicio" + fechaInicio);
    let fechaFin = document.getElementById("fechaFin").value;

    curso = {
        id: id !== "" ? id : null,
        nombre: nombre,
        fechaInicio: fechaInicio,
        fechaFin: fechaFin
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
        body: JSON.stringify(curso)
    })
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            if (data.respuesta === true) {
                alert(mensaje);
                indexCursos();
            } else {
                alert(error)
            }
        })
}

function editarCurso(id) {
    fetch(URL + 'obtener', {
        method: 'POST',
        body: JSON.stringify({id: id})
    })
        .then(function (response) {
            return response.json()

        })
        .then(function (data) {
            localStorage.setItem('curso', JSON.stringify(data.curso));
            window.location.href = URL + 'editar'
        })
}

function cargarCurso() {
    let curso = JSON.parse(localStorage.getItem('curso'));
    let id = document.getElementById('id');
    let nombre = document.getElementById('nombre');
    let fechaInicio = document.getElementById('fechaInicio');
    let fechaFin = document.getElementById('fechaFin');
    let dateInicio = new Date(curso.fechaInicio);
    let dateFin = new Date(curso.fechaFin);

    id.value = curso.id;
    nombre.value = curso.nombre;
    fechaInicio.value = dateInicio.toJSON().slice(0, 10);
    fechaFin.value = dateFin.toJSON().slice(0, 10);
}

function eliminarCurso(id) {
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
                    indexCursos()
                } else {
                    alert("Error al eliminar")
                }
            })
    }
}
