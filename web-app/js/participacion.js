let URL = "http://localhost:8080/cursosv02-SLJA/participacion/"

function listarParticipacion() {

    fetch(URL + 'listaParticipaciones')
        .then(function (response) {
            return response.json()
        }).then(function (data) {

        let lista = data.participaciones;
        let participaciones = "";

        for (let i = 0; i < lista.length; i++) {
            const dateRegister = new Date(lista[i].fechaRegistro)

            participaciones += `<tr> 
                <td>${i + 1}</td> 
                <td>${dateRegister.getDate()}-${dateRegister.getMonth() + 1}-${dateRegister.getFullYear()}</td>
                <td>${lista[i].persona.nombre} ${lista[i].persona.apellidoPaterno} ${lista[i].persona.apellidoMaterno}</td>
                <td>${lista[i].curso.nombre}</td>
               
                <td><button id="btnEditar" onclick="editarParticipacion(${lista[i].id});">Editar</button></td>
                <td><button id="btnEliminar" onclick="eliminarParticipacion(${lista[i].id});">Eliminar</button></td>
                </tr>`
        }
        let contenido = document.getElementById("participaciones");
        contenido.innerHTML = participaciones
    })
}

function indexParticipacion() {
    window.location.href = URL + "index"
}

function guardarParticipacion(evento, accion) {
    evento.preventDefault();
    var participacion, mensaje, error;
    let id = document.getElementById("id").value;
    let fechaRegistro = document.getElementById("fechaRegistro").value;
    let persona = document.getElementById("persona").value;
    let curso = document.getElementById("curso").value;

    participacion = {
        id: id !== "" ? id : null,
        fechaRegistro: fechaRegistro,
        persona: persona,
        curso: curso
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
        body: JSON.stringify(participacion)
    })
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            if (data.respuesta) {
                alert(mensaje);
                indexParticipacion();
            } else {
                alert(error)
            }
        })
}

function editarParticipacion(id) {
    fetch(URL + 'obtener', {
        method: 'POST',
        body: JSON.stringify({id: id})
    })
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            localStorage.setItem('participacion', JSON.stringify(data.participacion));
            localStorage.setItem('persona', JSON.stringify(data.persona));
            localStorage.setItem('curso', JSON.stringify(data.curso));
            window.location.href = URL + 'editar'
        })
}

function cargarParticipacion() {
    let participacion = JSON.parse(localStorage.getItem('participacion'));
    let listaPersonas = JSON.parse(localStorage.getItem('persona'));
    let listaCursos = JSON.parse(localStorage.getItem('curso'));

    let id = document.getElementById('id');
    let fechaRegistro = document.getElementById('fechaRegistro');

    let personaSelect = document.getElementById('persona');
    let cursoSelect = document.getElementById('curso');

    let dateRegister = new Date(participacion.fechaRegistro);

    for (let i = 0; i < listaPersonas.length; i++) {
        var opt = document.createElement('option');
        opt.value = listaPersonas[i].id;
        opt.text = listaPersonas[i].nombre + ' ' + listaPersonas[i].apellidoPaterno + ' ' + listaPersonas[i].apellidoMaterno;
        opt.selected = participacion.persona.id == listaPersonas[i].id ? true : false
        personaSelect.add(opt);
    }

    for (let i = 0; i < listaCursos.length; i++) {
        var opt = document.createElement('option');
        opt.value = listaCursos[i].id;
        opt.text = listaCursos[i].nombre;
        opt.selected = participacion.curso.id == listaCursos[i].id ? true : false
        cursoSelect.add(opt);
    }

    id.value = participacion.id;
    fechaRegistro.value = dateRegister.toJSON().slice(0, 10);
}

function cargarListas() {
    fetch(URL + 'consultaListas')
        .then(function (response) {
            return response.json()
        }).then(function (data) {

        let lista = data.personas;
        let lista2 = data.cursos;

        let contenidoPer = document.getElementById("persona");
        let contenidoCur = document.getElementById("curso");

        for (let i = 0; i < lista.length; i++) {
            var opt = document.createElement('option');
            opt.value = lista[i].id;
            opt.text = lista[i].nombre + ' ' + lista[i].apellidoPaterno + ' ' + lista[i].apellidoMaterno;
            console.log(contenidoPer)
            contenidoPer.add(opt);
        }

        for (let i = 0; i < lista2.length; i++) {
            var opt2 = document.createElement('option');
            opt2.value = lista2[i].id;
            opt2.text = lista2[i].nombre;
            contenidoCur.add(opt2);
        }
    })
}

function eliminarParticipacion(id) {
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
                if (data.respuesta) {
                    indexParticipacion()
                } else {
                    alert("Error al eliminar")
                }
            })
    }
}
