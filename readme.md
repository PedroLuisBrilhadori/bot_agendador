# Bot - Agendador

Bot para agendar consultas ou vendas pelo telegram.  


## Dialog-Flow e Firebase 

O Dialog-Flow tem um papel muito importante que é de criar o bot e faze-lo entender a linguagem natural. 

Já o firebase é quem guarda as informações de seu negocio. 

Ele passa informações sobre dias e horários disponiveis, e também consegue marcar um horário para seu cliente.  


## Como rodar o back end 

para executar é necessário um arquivo de configuração que está disponivel nas configurações do firebase. 

é necessário instalar o firebase para isso, digite em seu powershell: 

```shell 
    npm install firebase-admin --save
```

**Para gerar um arquivo de chave privada da conta de serviço, siga estas etapas:**

1. No Console do Firebase, abra Configurações > Contas de serviço.

2. Clique em Gerar nova chave privada e selecione Gerar chave para confirmar.

3. Armazene com segurança o arquivo JSON que contém a chave.

e depois configure uma variável em seu powershell:

```shell
    $env:GOOGLE_APPLICATION_CREDENTIALS="C:\Users\username\Downloads\service-account-file.json"
 ```    

para linux ou macOS: 
 
```shell
export GOOGLE_APPLICATION_CREDENTIALS="/home/user/Downloads/service-account-file.json"
 ```


 Com isso, suas configurções já foram importadas, basta digitar a databaseURL na linha 5 do arquivo "index.js"
 no meu caso, a url é essa "https://bot-si-9udq-default-rtdb.firebaseio.com/".