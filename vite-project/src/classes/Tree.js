export class Tree{
    constructor(){
        this.raiz = null;
    }

    dfs(nodo){
        console.log(nodo.value);
        for (let hijo of nodo.hijos){
            dfs(hijo);
        }
    }

    bfs(raiz){
        const cola = [raiz];
        while (cola.length > 0){
            const actual = cola.shift();
            console.log(actual.value);
            cola.push(...actual.hijos);
        }
    }
}