const puppeteer = require('puppeteer');

let sheets = 'https://sheetdb.io/api/v1/f31ih85nhjue1';
let brasil = 'https://news.google.com/covid19/map?hl=pt-BR&gl=BR&ceid=BR%3Apt-419&mid=%2Fm%2F015fr';

/*async function get_dados_mundo(){


    try{
        let browser = await puppeteer.launch();
        let page = await browser.newPage();
        await page.goto(sheets);
    
        let dados = await page.evaluate(() => {
            let dados_arr = document.getElementsByClassName("UvMayb");
            
            return dados = {
                casos: dados_arr[0].innerHTML,
                mortes: dados_arr[2].innerHTML,
                doses_aplicadas: dados_arr[3].innerHTML,
                vacinadas: dados_arr[4].innerHTML
            }
        });
        await browser.close();
    
        return dados;
    
    } catch(err) {
        return err;
    }
}*/



async function get_dados_sheets() {
    try{
        let sheetsObject = await axios.get(sheets);
        let dados = sheetsObject.then(response => {
            return response.data;
        })
        return dados;
    } catch(err) {
        return err;
    }
}




async function get_dados_mundo(){
    try{
        let browser = await puppeteer.launch();
        let page = await browser.newPage();
        await page.goto(sheets);
    
        let dados = await page.evaluate(() => {
            let dados_arr = document.getElementsByClassName("UvMayb");
            console.log(dados_arr);
            
            return dados = {
                casos: dados_arr[0].innerHTML,
                mortes: dados_arr[2].innerHTML,
                doses_aplicadas: dados_arr[3].innerHTML,
                vacinadas: dados_arr[4].innerHTML
            }
        });
        await browser.close();
    
        return dados;
    
    } catch(err) {
        return err;
    }
}
async function get_dados_brasil(){
    try{
        let browser = await puppeteer.launch();
        let page = await browser.newPage();
        await page.goto(brasil);
    
        let dados = await page.evaluate(() => {
            let dados_arr = document.getElementsByClassName("UvMayb");
            
            console.log(dados_arr);

            return dados = {
                casos: dados_arr[0].innerHTML,
                mortes: dados_arr[1].innerHTML,
                doses_aplicadas: dados_arr[2].innerHTML,
                vacinadas: dados_arr[3].innerHTML
            }
        });
        await browser.close();
    
        return dados;
    
    } catch(err) {
        return err;
    }
}


module.exports = {
    get_dados_mundo,
    get_dados_brasil,
    get_dados_sheets
}
