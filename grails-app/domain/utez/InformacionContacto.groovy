package utez

class InformacionContacto {
    String correo
    String telefono
    Persona persona

    static belongsTo = [persona: Persona]
    static mapping = {
        version false
    }
    static constraints = {
        correo email: true, unique: true, nullable: false
        telefono unique: true, nullable: false
    }
}
