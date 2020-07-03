import axios from 'axios'
import * as vars from './propriedades'

export const autenticar = (ma, password) => {
    return new Promise((resolve, reject) => {

      const response =  axios.post(vars.servidor + 'consultar/', 
      {
        ma: ma,
        s: password,
        Banco: vars.db,
        Tabela: "",
        Filtros:
        {
          id: "%%"
        }
      })
      .then((response) => {
        /*grava os dados de retorno*/
          const dados = response.data;
          vars.usuario.ma = ma;
          vars.usuario.s = password;
          vars.usuario.nome = dados.Nome;
          vars.usuario.id_user = dados.id_user;
          vars.usuario.autenticado = dados.Status === "OK";
          vars.usuario.email = dados.Email
          vars.usuario.s = password;
          console.log("Retorno da autenticação")
          resolve(dados);
          console.log("Fim")

      }, (erro) => {
        reject(erro);
      });
  })
  }

  export const gravar_tarefas = (chave) => {
    return new Promise((resolve, reject) => {
      const response =  axios.post(vars.servidor + 'salvar/', chave
     
      )
      .then((response) => {
          const dados = response.data;
        resolve(dados);
      }, (erro) => {
        reject(erro);
      });
  })
  }
  export const atualizar_tarefas = (chave) => {
    return new Promise((resolve, reject) => {
      const response =  axios.post(vars.servidor + 'atualizar/', chave
     
      )
      .then((response) => {
          const dados = response.data;
        resolve(dados);
      }, (erro) => {
        reject(erro);
      });
  })
  }

  export const get_tarefas = () => {
    return new Promise((resolve, reject) => {
      const response =  axios.post(vars.servidor + 'consultar/', {
        ma: vars.usuario.ma,
        s: vars.usuario.s,
        Banco: vars.db,
        Tabela: "",
        Filtros:
        {
          id_recurso: vars.usuario.id_user
        }
      }
     
      )
      .then((response) => {
          const dados = response.data;
        resolve(dados);
      }, (erro) => {
        reject(erro);
      });
  })
  }
  export const getPedidos = () => {
    return new Promise((resolve, reject) => {
      const response =  axios.post(vars.servidor + 'consultar/', {
        ma: vars.usuario.ma,
        s: vars.usuario.s,
        Banco: "",
        Tabela: "",
        Filtros:
        {
          id: "%%"
        }
      }
     
      )
      .then((response) => {
          const dados = response.data;
        resolve(dados);
      }, (erro) => {
        reject(erro);
      });
  })
  }
  export const apagar_tarefa = (item) => {
    const chave = {
      ma: vars.usuario.ma,
      s: vars.usuario.s,
      Banco: vars.db,
      Tabela: "",
      Filtros:
      {
        id_recurso: vars.usuario.id_user,
        id: item.id
      }
    }
    return new Promise((resolve, reject) => {
      const response =  axios.post(vars.servidor + 'apagar/', chave)
      .then((response) => {
          const dados = response.data;
        resolve(dados);
      }, (erro) => {
        reject(erro);
      });
  })
  }