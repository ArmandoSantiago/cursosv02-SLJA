package utez

class Persona {
    String nombre
    String apellidoPaterno
    String apellidoMaterno
    int edad

    static hasOne = [informacion: InformacionContacto]
    static hasMany = [habilidades: Habilidad, participaciones: Participacion]
    static mapping = {

        informacion cascade: 'delete'
        habilidades cascade: 'all-delete-orphan'
        participaciones cascade: 'all-delete-orphan'
        apellidoPaterno column: 'ap', sqlType: 'text'
        apellidoMaterno column: 'am'
        version false
    }
    static constraints = {
        informacion unique: true, nullable: true
        nombre blank: false, maxSize: 50
        edad range: 12..60
        habilidades nullable: true
        participaciones nullable: true
    }

    String toString() {
        return "${nombre} ${apellidoPaterno} ${apellidoMaterno}"
    }
}
