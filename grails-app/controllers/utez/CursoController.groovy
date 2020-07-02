package utez

import grails.converters.JSON

import java.text.SimpleDateFormat

class CursoController {
    def index() {
        render(view: 'index')
    }

    def listaCursos() {
        render([cursos: (Curso.getAll()).collect { definirCurso(it) }] as JSON)
    }

    def registrar() {}

    def guardar() {
        def cursoJSON = request.JSON
        def respuesta
        def curso
        def informacionContacto

        if (!cursoJSON.id) {
            curso = new Curso()
        } else {
            curso = Curso.get(cursoJSON.id.toLong())
        }

        println('curso - fecha string ' + cursoJSON.fechaInicio)

        def pattern = "yyyy-MM-dd"
        def fechaInicio = new SimpleDateFormat(pattern).parse(cursoJSON.fechaInicio)
        def fechaFin = new SimpleDateFormat(pattern).parse(cursoJSON.fechaFin)

        curso.nombre = cursoJSON.nombre
        curso.fechaInicio = fechaInicio
        curso.fechaFin = fechaFin

        if (curso.save(flush: true)) {
            respuesta = true
        } else {
            respuesta = false
        }
        render([respuesta: respuesta] as JSON)

    }

    def editar() {}

    def obtener() {
        render([curso: definirCurso(Curso.get((request.JSON.id).toLong()))] as JSON)
    }

    def eliminar() {
        def curso = Curso.get((request.JSON.id).toLong())
        def respuesta
        try {
            curso.delete(flush: true)
            respuesta = true
        } catch (e) {
            respuesta = false
            println e.getMessage()
        }
        render([respuesta: respuesta] as JSON)
    }

    private definirCurso = { objeto ->
        return objeto ? [
                id         : objeto.id,
                nombre     : objeto.nombre,
                fechaInicio: objeto.fechaInicio,
                fechaFin   : objeto.fechaFin
        ] : [:]
    }
}
