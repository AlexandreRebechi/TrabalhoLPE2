import { useContext } from "react";
import Alerta from "../../comuns/Alerta";
import PostsContext from "./PaisContext";
import CampoEntrada from "../../comuns/CampoEntrada";
import CampoSelect from "../../comuns/CampoSelect";
import CampoEntradaTexto from "../../comuns/CampoEntradaTexto";
import Dialogo from "../../comuns/Dialogo";
import { MenuItem } from "@mui/material";

function Form() {

    const { objeto, handleChange, acaoCadastrar, alerta, abreDialogo, setAbreDialogo } =
        useContext(PostsContext);

    return (
        <>
            <Dialogo id="modalEdicao" titulo="Organização"
                open={abreDialogo} setOpen={setAbreDialogo}
                acaoCadastrar={acaoCadastrar} idform="formulario"
                maxWidth="sm">
                <Alerta alerta={alerta} />
                <CampoEntrada id="txtID" label="ID"
                    tipo="text" name="id" value={objeto.id}
                    onchange={handleChange} requerido={false}
                    readonly={true} />
               <CampoEntrada id="txtNome" label="Nome"
                    tipo="text" name="nome" value={objeto.titulo}
                    onchange={handleChange} requerido={true}
                    readonly={false} maxlength={50}
                    msgvalido="Nome OK"
                    msginvalido="Informe o Nome" />
                     <CampoEntrada id="txtIdPais" label="id_pais"
                    tipo="text" name="id_pais" value={objeto.titulo}
                    onchange={handleChange} requerido={true}
                    readonly={false} maxlength={50}
                    msgvalido="id_pais OK"
                    msginvalido="Informe o id_pais" />

                <CampoSelect
                    id="selectTipo" label="Tipo"
                    idLabel="labelTipo"
                    tipo="text" name="tipo" value={objeto.tipo}
                    onchange={handleChange} requerido={false}
                    msgvalido="Tipo OK"
                    msginvalido="Informe o Tipo">
                    <MenuItem value='Pais'>Estados_Artigo</MenuItem>
                    <MenuItem value='Documentação'>Documentação</MenuItem>
                </CampoSelect>
            </Dialogo>
        </>
    )

}

export default Form;