import { auth, db } from '../../firebaseConfig';
import { doc, addDoc, collection, query, onSnapshot, updateDoc, deleteDoc, where } from "firebase/firestore";

export const getEstadosFirebase = async (setListaObjetos) => {
    try {
        const q = query(collection(db, 'estados'))
        onSnapshot(q, (querySnapshot) => {
            setListaObjetos(querySnapshot.docs.map(doc => ({
                id: doc.id,
                nome: doc.data().nome,
                uf: doc.data().uf,
                id_pais: doc.data().id_pais
                

            })))
        })
    } catch (err) {
        throw err;
    }
}

export const getEstadosUIDFirebase = async (uid, setListaObjetos) => {
    try {
        const colRef = collection(db, "estados");
        const q = query(colRef, where("uid", "==", uid))
        onSnapshot(q, (querySnapshot) => {
            setListaObjetos(querySnapshot.docs.map(doc => ({
                id: doc.id,
                nome: doc.data().nome,
                uf: doc.data().uf,
                id_pais: doc.data().id_pais
            })))
        })
    } catch (err) {
        throw err;
    }
}

export const deleteEstadosFirebase = async objeto => {
    try {
        const estadoDocRef = doc(db, 'estados', objeto.id)
        await deleteDoc(estadoDocRef);
    } catch (err) {
        throw err;
    }
}

export const addEstadosFirebase = async objeto => {
    try {
        let ret = await addDoc(collection(db, 'estados'),
            {
                nome: objeto.nome,
                uf: objeto.uf,
                id_pais: objeto.id_pais
            }).then(function (docRef) {
                objeto = { ...objeto, id: docRef.id };
                return objeto;
            });
        return ret;
    } catch (err) {
        throw err;
    }
}

export const updatePostFirebase = async objeto => {
    try {
        const estadoDocRef = doc(db, 'estados', objeto.id)
        await updateDoc(estadoDocRef, {
            nome: objeto.nome,
            uf: objeto.uf,
            id_pais: objeto.id_pais
            
        })
    } catch (err) {
        throw err;
    }
}