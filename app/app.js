const express = require("express");
const app = express();
const port = 3000;
const dialog = require("dialogflow-fulfillment");
const datasus = require("./web");
const axios = require("axios");
const sheets = 'https://sheetdb.io/api/v1/at4lvf6xtu4tt';


let dados_brasil;
let string_brasil;
let dados_mundo;
let string_mundo;
let manipulacao;
let resposta;

async function get_dados_sheets() {
  manipulacao = datasus.get_dados_sheets().then();
}


app.get("/", (req, res) => {
  res.send("sever on");
});

app.post("/", express.json(), (req, res) => {
  const agent = new dialog.WebhookClient({
    request: req,
    response: res,
  });

  function cadastrar(nome, telefone) {
  axios.post(sheets,{
      "data": {
        "nome": nome, 
        "telefone": telefone, 
      }
  });
}

function cadastrar(nome, telefone) {
  axios.post(sheets,{
      "data": {
        "nome": nome, 
        "telefone": telefone, 
      }
  });
  agent.add('Cadastrado com sucesso!');
}



async function menu(agent){
  try{
    let resposta = '';
    const nome = agent.parameters.nome;
    const telefone = agent.parameters.telefone;
    const link = `https://sheetdb.io/api/v1/at4lvf6xtu4tt/search?telefone=${telefone}`
    return axios.get(link).then( res => {
      
      const respostaObject = res.data[0];

      // let arr = res.data.find(person => {
      //   person.telefone == telefone && person.nome == nome})
      try {
        if (respostaObject.telefone == telefone){
        resposta = ("Olá " + respostaObject.nome + " encontrei seu cadastro." + "\n");}
      }
      catch{  
        resposta = ("Criando cadastro!" + "\n");
        cadastrar(nome, telefone)
      }
        proxMensagem = agent.consoleMessages[0].text
        
        agent.add( `${resposta} \n ${proxMensagem}`);
      })

    } catch(err){
    return err;
    }
  }


  // async function marcarHorario(agent){
  //   const telefone = agent.parameteres.telefone;
  //   const nome = agent.parameters.nome

  // }


  function dados_sheets() {
    agent.add('oi');
    console.log(manipulacao);
  }

  function mundo(agent) {
    agent.add("Seu telefone é : " + agent.parameters.telefone);
    console.log(agent.parameters.telefone);
  }

  function brasil(agent) {
    agent.add(string_brasil);
  }

  var intentMap = new Map();

  intentMap.set("1) Informe os dados", menu)
  // intentMap.set("2.3) Coinsultar horario", consultar)
  intentMap.set("testinho", cadastrar);
  intentMap.set("testinho2", brasil);
  // intentMap.set("testinho2", brasil);

  agent.handleRequest(intentMap);
});

app.listen(port, () => {
  console.log(`sever started in port: ${port}`);
});

/*

*/