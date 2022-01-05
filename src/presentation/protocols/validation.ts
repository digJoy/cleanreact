export interface Validation {
    // método que recebe um objeto e retorna uma string de erro
    validate (fieldName: string, fieldValue: string): string 
}