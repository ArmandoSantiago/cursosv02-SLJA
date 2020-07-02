package utez

import grails.converters.JSON

class PersonaController {
    def index() {
        render(view: 'index')
    }

    def listaPersonas() {
        render([personas: (Persona.getAll()).collect { definirPersona(it) }] as JSON)
    }

    def registrar() {}

    def guardar() {
        def personaJSON = request.JSON
        def respuesta
        def persona
        def informacionContacto

        if (!personaJSON.id) {
            persona = new Persona()
            informacionContacto = new InformacionContacto()
        } else {
            persona = Persona.get(personaJSON.id.toLong())
            informacionContacto = InformacionContacto.findByPersona(persona)
        }

        persona.nombre = personaJSON.nombre
        persona.apellidoPaterno = personaJSON.apellidoPaterno
        persona.apellidoMaterno = personaJSON.apellidoMaterno
        persona.edad = (personaJSON.edad).toInteger()

        if (persona.save(flush: true)) {
            informacionContacto.correo = personaJSON.correo
            informacionContacto.telefono = personaJSON.telefono
            informacionContacto.persona = persona

            if (informacionContacto.save(flush: true)) {
                respuesta = true
            } else {
                respuesta = false
            }
        } else {
            respuesta = false
        }
        render([respuesta: respuesta] as JSON)

    }

    def editar() {}

    def obtener() {
        render([persona: definirPersona(Persona.get((request.JSON.id).toLong()))] as JSON)
    }

    def eliminar() {
        def persona = Persona.get((request.JSON.id).toLong())
        def respuesta
        try {
            persona.delete(flush: true)
            respuesta = true
        } catch (e) {
            respuesta = false
            println e.getMessage()
        }
        render([respuesta: respuesta] as JSON)
    }

    private definirPersona = { objeto ->
        return objeto ? [
                id             : objeto.id,
                nombre         : objeto.nombre,
                apellidoPaterno: objeto.apellidoPaterno,
                apellidoMaterno: objeto.apellidoMaterno,
                edad           : objeto.edad,
                telefono       : objeto.informacion.telefono,
                correo         : objeto.informacion.correo
        ] : [:]
    }
}
