package utez

import grails.converters.JSON

import java.text.SimpleDateFormat

class ParticipacionController {
    def index() {
        render(view: 'index')
    }

    def listaParticipaciones() {
        render([participaciones: (Participacion.getAll()).collect { definirParticipacion(it) }] as JSON)
    }

    def registrar() {}

    def consultaListas() {
        render([
                personas: (Persona.getAll()).collect { definirPersona(it) },
                cursos  : (Curso.getAll()).collect { definirCurso(it) }
        ] as JSON)
    }

    def guardar() {
        def participacionJSON = request.JSON
        def respuesta
        def persona
        def participacion
        def curso

        if (!participacionJSON.id) {
            participacion = new Participacion()

        } else {
            participacion = Participacion.get(participacionJSON.id.toLong())
        }
        persona = Persona.get(participacionJSON.persona.toLong())
        curso = Curso.get(participacionJSON.curso.toLong())

        def pattern = "yyyy-MM-dd"
        def fechaRegistro = new SimpleDateFormat(pattern).parse(participacionJSON.fechaRegistro)

        participacion.fechaRegistro = fechaRegistro
        participacion.persona = persona
        participacion.curso = curso

        if (participacion.save(flush: true)) {
            respuesta = true
        } else {
            respuesta = false
        }
        render([respuesta: respuesta] as JSON)

    }

    def editar() {}

    def obtener() {
        render([
                participacion: definirParticipacion(Participacion.get((request.JSON.id).toLong())),
                persona      : Persona.getAll(),
                curso        : Curso.getAll()
        ] as JSON)
    }

    def eliminar() {
        def participacion = Participacion.get((request.JSON.id).toLong())
        def respuesta
        try {
            participacion.delete(flush: true)
            respuesta = true
        } catch (e) {
            respuesta = false
            println e.getMessage()
        }
        render([respuesta: respuesta] as JSON)
    }

    private definirParticipacion = { objeto ->
        return objeto ? [
                id           : objeto.id,
                fechaRegistro: objeto.fechaRegistro,
                persona      : objeto.persona,
                curso        : objeto.curso

        ] : [:]
    }

    private definirPersona = { objeto ->
        return objeto ? [
                id             : objeto.id,
                nombre         : objeto.nombre,
                apellidoPaterno: objeto.apellidoPaterno,
                apellidoMaterno: objeto.apellidoMaterno
        ] : [:]
    }

    private definirCurso = { objeto ->
        return objeto ? [
                id    : objeto.id,
                nombre: objeto.nombre
        ] : [:]
    }
}
