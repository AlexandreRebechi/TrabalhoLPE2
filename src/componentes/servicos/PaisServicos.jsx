import { auth, db } from '../../firebaseConfig';
import { doc, addDoc, collection, query, onSnapshot, updateDoc, deleteDoc, where } from "firebase/firestore";

export const getPaisFirebase = async (setListaObjetos) => {
    try {
        const q = query(collection(db, 'pais'))
        onSnapshot(q, (querySnapshot) => {
            setListaObjetos(querySnapshot.docs.map(doc => ({
                id: doc.id,
                nome: doc.data().nome
            })))
        })
    } catch (err) {
        throw err;
    }
}

export const getPaisUIDFirebase = async (uid, setListaObjetos) => {
    try {
        const colRef = collection(db, "pais");
        const q = query(colRef, where("uid", "==", uid))
        onSnapshot(q, (querySnapshot) => {
            setListaObjetos(querySnapshot.docs.map(doc => ({
                id: doc.id,
                nome: doc.data().nome
            })))
        })
    } catch (err) {
        throw err;
    }
}

export const deletePaisFirebase = async objeto => {
    try {
        const postDocRef = doc(db, 'pais', objeto.id)
        await deleteDoc(postDocRef);
    } catch (err) {
        throw err;
    }
}

export const addPaisFirebase = async objeto => {
    try {
        let ret = await addDoc(collection(db, 'pais'),
            {
                nome: objeto.nome
            }).then(function (docRef) {
                objeto = { ...objeto, id: docRef.id };
                return objeto;
            });
        return ret;
    } catch (err) {
        throw err;
    }
}

export const updatePaisFirebase = async objeto => {
    try {
        const postDocRef = doc(db, 'pais', objeto.id)
        await updateDoc(postDocRef, {
            nome: objeto.nome
            
        })
    } catch (err) {
        throw err;
    }
}