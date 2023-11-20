import { auth, db } from '../../firebaseConfig';
import { doc, addDoc, collection, query, onSnapshot, updateDoc, deleteDoc, where } from "firebase/firestore";

export const getCidadesFirebase = async (setListaObjetos) => {
    try {
        const q = query(collection(db, 'cidades'))
        onSnapshot(q, (querySnapshot) => {
            setListaObjetos(querySnapshot.docs.map(doc => ({
                id: doc.id,
                nome: doc.data().nome,
                id_estado: doc.data().id_estado
                

            })))
        })
    } catch (err) {
        throw err;
    }
}

export const getCidadesUIDFirebase = async (uid, setListaObjetos) => {
    try {
        const colRef = collection(db, "cidades");
        const q = query(colRef, where("uid", "==", uid))
        onSnapshot(q, (querySnapshot) => {
            setListaObjetos(querySnapshot.docs.map(doc => ({
                id: doc.id,
                nome: doc.data().nome,
                uf: doc.data().uf,
                id_estado: doc.data().id_estado
            })))
        })
    } catch (err) {
        throw err;
    }
}

export const deleteCidadesFirebase = async objeto => {
    try {
        const cidadeDocRef = doc(db, 'cidades', objeto.id)
        await deleteDoc(cidadeDocRef);
    } catch (err) {
        throw err;
    }
}

export const addCidadesFirebase = async objeto => {
    try {
        let ret = await addDoc(collection(db, 'cidades'),
            {
                nome: objeto.nome,
                id_estado: objeto.id_estado
            }).then(function (docRef) {
                objeto = { ...objeto, id: docRef.id };
                return objeto;
            });
        return ret;
    } catch (err) {
        throw err;
    }
}

export const updatCidadesFirebase = async objeto => {
    try {
        const cidadeDocRef = doc(db, 'cidades', objeto.id)
        await updateDoc(cidadeDocRef, {
            nome: objeto.nome,
            id_estado: objeto.id_estado
            
        })
    } catch (err) {
        throw err;
    }
}