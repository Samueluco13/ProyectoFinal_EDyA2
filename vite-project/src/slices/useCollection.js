import { db } from "../firebase/config";
import {collection, addDoc, query, where, updateDoc, getDoc, deleteDoc, doc, onSnapshot, orderBy} from 'firebase/firestore';
import { useState } from 'react';

export const useCollection = (table) => {
    const [results, setResults] = useState([])

    const getAll = (condition) => {
        setResults([]); //Vacía el arreglo en caso de que tenga elementos

        let q = null;
        const ordenados = [];
        const filtrados = [];
        
        if (Array.isArray(condition?.[0])) { //Si la primera posicion es un arreglo, se trata de un arreglo de arreglos
            for (const i of condition){ //Para cada item (arreglo) de la condicion
                if(i[0] === "orderBy"){ //Verifica si es una sonsulta de ordenamiento
                    //En caso de que si, aplica el ordenamiento a ese arreglo
                    ordenados.push(orderBy(i[1],i[2]));
                }else{
                    //En caso de que no, realiza la consulta normal
                    filtrados.push(where(i[0], i[1], i[2]))
                }
            }
            //Se usa ...arreglo para que en vez de poner todo el arreglo de condiciones, las ponga cada una separada
            q = query(collection(db, table), ...filtrados, ...ordenados);
        }else if (condition && condition.length === 3 && condition[0] !== "orderBy") { //Para condiciones normales
            //La query es la colección condicionada
            q = query(collection(db, table), where(condition[0], condition[1], condition[2]));
        }else{
            //La query es la colección entera
            q = query(collection(db, table));
        }
        const unsubscribe = onSnapshot(q, (snapshot) => { //onSnapshot escucha los cambios de la base de datos
            const rtData = snapshot.docs.map(doc => (
                {...doc.data(), id: doc.id}
            )) //Ingresa el arreglo de documentos en una variable
            setResults(rtData); //Settea el arreglo en el estado de results
        })
        return unsubscribe;
    }

    const getById = async (id) => {
        const document = await getDoc(doc(db, table, id));
        return {...document.data(), id: document.id}
    }
    
    const add = async (doc) => {
        try{
            //Agrega el documento a la tabla especifica y devuelve su id
            let resDoc = await addDoc(collection(db, table), doc);
            return {id: resDoc.id}
        }catch(error){
            console.log(error.message);
            return null;
        }
    }

    const update = async (id, newData) =>{
        try{
            await updateDoc(doc(db, table, id), newData);
        }catch(error){
            console.log(error.message);
            return null;
        }
    }

    const dltDoc = async (id) => {
        try{
            await deleteDoc(doc(db, table, id));
        }catch (error){
            console.log(error.message);
            return null;
        }
    }

    return {getAll, add, update, dltDoc, results, getById}
}
