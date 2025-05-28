export class Node{
    constructor(value){
        this.value = value;
        this.hijos = [];
    }

    agregarHijo(nodo){
        this.hijos.push(nodo)
    }
}