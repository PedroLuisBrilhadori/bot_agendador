const express = require("express");
const app = express();
const port = 3000;
const dialog = require("dialogflow-fulfillment");
const axios = require("axios");
const sheets = 'https://sheetdb.io/api/v1/at4lvf6xtu4tt';


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

  var intentMap = new Map();

  intentMap.set("1) Informe os dados", menu)

  agent.handleRequest(intentMap);
});

app.listen(port, () => {
  console.log(`sever started in port: ${port}`);
});