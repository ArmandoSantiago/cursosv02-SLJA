package utez

class Habilidad {
    String nombre
    Persona persona
    static belongsTo = [Persona]

    static mapping = {
        version false
    }
    static constraints = {
        nombre blank: false, maxSize: 50, unique: ['persona']
    }

    String toString() {
        "${nombre} ${apellidoPaterno} ${apellidoMaterno}"
    }
}
