package utez

class Curso {
    String nombre
    Date fechaInicio
    Date fechaFin
    static hasMany = [participaciones: Participacion]

    static mapping = {
        version false
        participaciones cascade: 'all-delete-orphan'
    }
    static constraints = {
        nombre blank: false, maxSize: 150, unique: ['fechaInicio', 'fechaFin']
    }


}
