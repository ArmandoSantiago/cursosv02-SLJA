package utez

import grails.converters.JSON

class HabilidadController {

    def index() {
        render(view: 'index')
    }

    def listaHabilidades(){
        render([habilidades:(Habilidad.getAll()).collect{definirHabilidad(it)}] as JSON)
    }

    def registrar(){}

    def consultaPersonas(){
        render([personas:(Persona.getAll()).collect{definirPersona(it)}] as JSON)
    }

    def guardar(){
        def habilidadJSON = request.JSON
        def respuesta
        def habilidad
        def persona

        if (!habilidadJSON.id){
            habilidad=new Habilidad()
        }else{
            habilidad = Habilidad.get(habilidadJSON.id.toLong())
        }

        persona = Persona.get(habilidadJSON.persona.toLong())
        habilidad.nombre = habilidadJSON.nombre
        habilidad.persona = persona

        if (habilidad.save(flush: true)){
            respuesta = true
        }else{
            respuesta = false
        }
        render ([respuesta:respuesta] as JSON)
    }

    def editar (){}

    def obtener(){
        render([
                habilidad: definirHabilidad(Habilidad.get((request.JSON.id).toLong())),
                persona: Persona.getAll()
        ] as JSON)
    }

    def eliminar(){
        def habilidad = Habilidad.get((request.JSON.id).toLong())
        def respuesta
        try {
            habilidad.delete(flush: true)
            respuesta = true
        }catch(e){
            respuesta = false
            println e.getMessage()
        }
        render ([respuesta: respuesta] as JSON)
    }

    private definirHabilidad = { objeto ->
        return objeto?[
                id:objeto.id,
                nombre:objeto.nombre,
                persona:objeto.persona
        ]:[:]

    }

    private definirPersona = { objeto ->
        return objeto?[
                id:objeto.id,
                nombre: objeto.nombre,
                apellidoPaterno: objeto.apellidoPaterno,
                apellidoMaterno: objeto.apellidoMaterno
        ]:[:]
    }

}
