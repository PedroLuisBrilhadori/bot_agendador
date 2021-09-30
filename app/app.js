const express = require('express');
const app = express();
const port = 3000;
const dialog = require('dialogflow-fulfillment');
const datasus = require('./web');

let dados_brasil;
let string_brasil;
let dados_mundo;
let string_mundo;


async function get_dados_mundo() {
    dados_mundo = await datasus.get_dados_mundo().then();
    string_mundo = "Os dados atuais, no mundo são: \n\n" + "Total de casos: " + dados_mundo.casos + "\nmortes: " + dados_mundo.mortes;
    string_mundo += "\nTotal de doses aplicadas: " + dados_mundo.doses_aplicadas + "\nPessoas totalmente vacinadas: " + dados_mundo.vacinadas;
}

async function get_dados_brasil() {
    dados_brasil = await datasus.get_dados_brasil().then();
    string_brasil = "Os dados atuais, no Brasil são: \n\n" + "Total de casos: " + dados_brasil.casos + "\nmortes: " + dados_brasil.mortes;
    string_brasil += "\nTotal de doses aplicadas: " + dados_brasil.doses_aplicadas + "\nPessoas totalmente vacinadas: " + dados_brasil.vacinadas;
}

get_dados_mundo();
get_dados_brasil();

app.get('/', (req, res) => {
    res.send("sever on");
});

app.post('/', express.json(), (req, res) => {
    const agent = new dialog.WebhookClient({
        request: req,
        response: res
    });
    
    function mundo(agent){    
        agent.add(string_mundo);
    }

    function brasil (agent){
        agent.add(string_brasil);
    }

    var intentMap = new Map();

    intentMap.set('dados covid mundo', mundo);
    intentMap.set('dados covid brasil', brasil);

    agent.handleRequest(intentMap);

    get_dados_mundo();
    get_dados_brasil();
});

app.listen(port, () => {console.log( `sever started in port: ${port}`)});