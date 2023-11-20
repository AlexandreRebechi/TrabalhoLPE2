import { useState, useEffect } from "react";
import PostsContext from "./PaisContext";
import Tabela from "./Tabela";
import Form from "./Form";
import Carregando from "../../comuns/Carregando";
import {auth} from "../../../firebaseConfig";
import {useAuthState} from "react-firebase-hooks/auth";
import { addPaisFirebase, updatePaisFirebase, getPaisFirebase, deletePaisFirebase} from "../../servicos/PaisServicos";


function Pais() {

    const [user, loading, error] = useAuthState(auth);

    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);
    const [editar, setEditar] = useState(false);
    const [objeto, setObjeto] = useState({
        id: '',
        nome: ''
    });
    const [carregando, setCarregando] = useState(true);
    const [abreDialogo, setAbreDialogo] = useState(false);

    const novoObjeto = () => {
        setEditar(false);
        setAlerta({ status: "", message: "" });
        setObjeto({
            id: '',
            nome: ''
        });
        setAbreDialogo(true)
    }

    const editarObjeto = async (objeto) => {
        setObjeto(objeto);
        setAbreDialogo(true);
        setEditar(true);
        setAlerta({ status: "", message: "" });
    }

    const acaoCadastrar = async e => {
        e.preventDefault();
        if (editar) {

            try {
                await updatePaisFirebase(objeto)
                setAlerta({ status: "success", message: "Pais atualizado com sucesso" });
            } catch (err) {
                setAlerta({ status: "error", message: "Erro ao atualizar o Pais:" + err });
            }
        } else { // novo 
            try {

                setObjeto(await addPaisFirebase(objeto))
                setEditar(true);
                setAlerta({ status: "success", message: "Pais criado com sucesso" });
            } catch (err) {
                setAlerta({ status: "error", message: "Erro ao criar o Pais:" + err });
            }
        }
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setObjeto({ ...objeto, [name]: value });
    }

    const remover = async (objeto) => {
        if (window.confirm("Remover este objeto?")) {
            try {
                deletePaisFirebase(objeto)
                setAlerta({ status: "success", message: "Pais removido com sucesso!" });
            } catch (err) {
                setAlerta({ status: "error", message: "Erro ao  remover: " + err });
            }
        }
    }

    useEffect(() => {
        setCarregando(true);
        if (user?.uid != null) {
            const uid = user?.uid;
            getPostsUIDFirebase(uid, setListaObjetos);
        }
        
        setCarregando(false);
    }, [user]);

    return (
        <PostsContext.Provider value={{
            alerta, setAlerta,
            listaObjetos, setListaObjetos,
            remover,
            objeto, setObjeto,
            editarObjeto, novoObjeto, acaoCadastrar,
            handleChange, abreDialogo, setAbreDialogo
        }}>
            <Carregando carregando={carregando}>
                <Tabela />
            </Carregando>
            <Form />
        </PostsContext.Provider>
    )

}

export default Pais;