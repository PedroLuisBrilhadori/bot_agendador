const puppeteer = require('puppeteer');

let sheets = 'https://sheetdb.io/api/v1/f31ih85nhjue1';


async function pesquisa(telefone){
  try{
    const telefone1 = telefone;
    const pesquisa =  axios.get(`https://sheetdb.io/api/v1/f31ih85nhjue1/search?telefone=${telefone1}`)
      .then ( response => {    
          const resposta = response.data[0];
          if(typeof(resposta) == 'object'){
            console.log(resposta.nome + " que bom, encontramos seu registro. Oque deseja fazer agora?");

            console.log(resposta)
          } else
            console.log("O cadastro não existe, deseja efetuar o cadastro com os dados informados?");
      } )
  
  } catch(err) {
      return err;
  }
}





