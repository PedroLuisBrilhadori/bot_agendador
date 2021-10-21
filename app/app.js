const express = require("express");
const app = express();
const port = 3000;

const dialog = require("dialogflow-fulfillment");
const axios = require("axios");
const sheets = "https://sheetdb.io/api/v1/1au7vxesdoci5";

app.get("/", (req, res) => {
  res.send("sever on");
});

app.post("/", express.json(), (req, res) => {
  const agent = new dialog.WebhookClient({
    request: req,
    response: res,
  });

  function init(agent){
    agent.add("Digite 'menu' para voltar ao início da conversa.")
  }

  function cadastrar(nome, telefone) {
    axios.post(sheets, {
      data: {
        nome: nome,
        telefone: telefone,
      },
    });
    agent.add("Cadastrado com sucesso!");
  }

  async function menu(agent) {
    try {
      let resposta = "";
      const nome = agent.parameters.nome;
      const telefone = agent.parameters.telefone;
      usuarioAtual = {
        nome: nome,
        telefone: telefone,
      };
      const link = `https://sheetdb.io/api/v1/1au7vxesdoci5/search?telefone=${telefone}`;
      return axios.get(link).then((res) => {
        const respostaObject = res.data[0];

        try {
          if (respostaObject.telefone == telefone) {
            resposta =
              "Olá " + respostaObject.nome + " encontrei seu cadastro." + "\n";
          }
        } catch {
          cadastrar(nome, telefone);
        }
        proxMensagem = agent.consoleMessages[0].text;

        agent.add(`${resposta} \n ${proxMensagem}`);
      });
    } catch (err) {
      return err;
    }
  }

  async function marcarHorario(agent) {
    let telefone = agent.contexts[0].parameters.telefone;
    const link = `https://sheetdb.io/api/v1/1au7vxesdoci5/search?telefone=${telefone}`;
    const sheets = `https://sheetdb.io/api/v1/1au7vxesdoci5/telefone/${telefone}`;
    
    let hora = new Date(`${agent.parameters.hora}`);
    let data = new Date(`${agent.parameters.data}`);

    data = `${data.getDate()}/${data.getMonth() + 1}`;

    if (hora.getMinutes() < 10) {
      hora = `${hora.getHours()}:0${hora.getMinutes()}`;
    } else {
      hora = `${hora.getHours()}:${hora.getMinutes()}`;
    }

    let resposta = "";
    const horarioAgendado = `Data: ${data} às: ${hora} horas`;

    return axios.get(link).then((res) => {
      
      const respostaObject = res.data[0];
      try{
        if (respostaObject.agendamento == "") {
          axios.patch(sheets, {
              data: { agendamento: horarioAgendado },
            })    
            resposta = `Agendamento concluído! para: ${horarioAgendado}`;
            
          }else{
            resposta = `Você já possui um agendamento para: ${respostaObject.agendamento}`;
            
          }
      }
      catch {
        resposta = `Oh! Tivemos um problema, por favor, digite 'oi' para reiniciar seu atendimento`;
      }
      agent.add(resposta);
      init(agent);
    });

  }

  async function desmarcarHorario(agent) {
    telefone = agent.contexts[1].parameters.telefone;
    const link = `https://sheetdb.io/api/v1/1au7vxesdoci5/search?telefone=${telefone}`;
    let resposta = "";
    
    return axios.get(link).then((res) => {
      const respostaObject = res.data[0];

      if (respostaObject.agendamento == "") {
        resposta = `Você não possui consultas agendadas`;
      } else {
        resposta = `Você deseja deletar sua consulta marcada, para: ${respostaObject.agendamento}?`;
      }

      agent.add(resposta);

    });
  }

  async function confirmaDesmarcarHorario(agent) {
    const telefone = agent.contexts[1].parameters.telefone;
    const link = `https://sheetdb.io/api/v1/1au7vxesdoci5/search?telefone=${telefone}`;
    const sheets = `https://sheetdb.io/api/v1/1au7vxesdoci5/telefone/${telefone}`;
    
    return axios.get(link).then((res) => {
      axios.patch(sheets, {
        data: {
          agendamento: ""
        },
      });

      proxMensagem = agent.consoleMessages[0].text;
      agent.add(proxMensagem);
      init(agent);
    });
  }


  async function consultarHorario(agent) {
    telefone = agent.contexts[0].parameters.telefone;
    const link = `https://sheetdb.io/api/v1/1au7vxesdoci5/search?telefone=${telefone}`;
    let resposta = "";
    return axios.get(link).then((res) => {
      const respostaObject = res.data[0];

      try{
        if (respostaObject.agendamento == "") {
        resposta = `Você não possui consultas agendadas`;
        }else {
          resposta = `Você tem uma consulta marcada, para: ${respostaObject.agendamento}`;
        }
      }
      catch{
       resposta = `Oh! Tivemos um problema, por favor, digite 'oi' para reiniciar seu atendimento`;
      }
      agent.add(resposta);
      init(agent);
   });
 }
  

  var intentMap = new Map();

  intentMap.set("1) Informe os dados", menu);
  intentMap.set("2.1) Marcar horário", marcarHorario);
  intentMap.set("2.2) Desmarcar Horário", desmarcarHorario);
  intentMap.set("2.2.1) Desmarcar Horário - yes", confirmaDesmarcarHorario);
  intentMap.set("2.3) Consultar agendamento", consultarHorario);
  

  agent.handleRequest(intentMap);
});

app.listen(port, () => {
  console.log(`O servidor está funcionando! Na porta: ${port}`);
});
