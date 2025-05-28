import { useCollection } from '../slices/useCollection'
import { moveOrder } from '../slices/thunks/order/moveOrder';
import {useDispatch} from 'react-redux'

export const moveOrderTo = () => {

    const dispatch = useDispatch();

    const {update} = useCollection("pedidos")

    const handleMoveTo = async (id, clasificacion) => {
        let moved = Date.now();
        const actualizaciones = {clasificacion: clasificacion, moved}
        try{
            await update(id, actualizaciones)
            try{
                dispatch(moveOrder(clasificacion, moved));
            }catch(error){
                console.log("Error en la actualizacion de redux: ", error);
            }
        }catch(error){
            console.log("Error al actualziar desde firebase: ", error);
        }
    }

    return {handleMoveTo}
}
