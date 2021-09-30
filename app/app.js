const express = require('express');
const app = express();
const port = 3000;
const dialog = require('dialogflow-fulfillment');

app.get('/', (req, res) => {
    res.send("sever on");
});

app.post('/', express.json(), (req, res) => {
    const agent = new dialog.WebhookClient({
        request: req,
        response: res
    });
    function demo(agent){
        agent.add("596 mil pessoas morreram no Brasil");
    }

    var intentMap = new Map();

    intentMap.set('teste', demo);

    agent.handleRequest(intentMap);
});

app.listen(port, () => {console.log( `sever started in port: ${port}`)});