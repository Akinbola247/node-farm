// *******************FILE SYSTEM******************************

// NODE VERSION 10....THE REST OF THE CODE IS WRITTEN IN VERSION 18
// const fs = require ('fs');
// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
// console.log (textIn);
// const textOut = `This is what we know about avocado: ${textIn} \n Created on ${Date.now()}`
// fs.writeFileSync('./txt/output.txt', textOut);
// console.log('Done!')

// SYNCHRONOUS OR BLOCKING CODE WAY.
// import { readFileSync, writeFileSync } from 'node:fs';
// const readText = readFileSync('./txt/input.txt', 'utf-8');
// const textContent = `This is what we know about avocado: ${readText} \n Created on ${Date.now()}`
// writeFileSync('./txt/output.txt', textContent) 
// console.log(readText);

// ASYNCHRONOUS OR UNBLOCKING CODE WAY.
// import { readFile, writeFile } from 'node:fs';
// readFile('./txt/start.txt', 'utf-8', (err, data) => {
//     if (err) return console.log(err)
//     readFile(`./txt/${data}.txt`, 'utf-8', (err, data2) => {
//         console.log(data2);
//         readFile('./txt/append.txt', 'utf-8', (err, data3) => {
//             console.log(data3);
//             writeFile('./txt/Newoutput.txt', `${data2}\n${data3}`, err =>{
//                 console.log('file written')
//             })
//         });
//     });

// });

// console.log('reading without delay')

// *******************FILE SYSTEM******************************

// ******************SERVER************************************

        // server on nodeJS 10
// const http = requre ('http')
// const server = http.createServer ((req, res)=> {
//     res.end("Welcome to this server")
// })

// server.listen(3000, ()=>{
//     console.log('Server is running')
// })


        //  Server on node js 18 (with ES6)
import http from "http";
import { readFile, writeFile, readFileSync } from 'node:fs';
import { fileURLToPath} from 'url'
import url from "url"
import { dirname } from 'path'
import { profile } from "console";
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
import replacePlaceholders from './tempReplace.js'




// ******** This synhronous reads the file only once and renders the returns ********
const readJSON = readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const productItemJson = JSON.parse(readJSON)

const readProduct = readFileSync(`${__dirname}/templates/product.html`, 'utf-8', (err, data1)=>{
        return data1
    })  
const readOverview = readFileSync(`${__dirname}/templates/overview.html`, 'utf-8', (err, data2)=>{
        return data2
    })  
const readCard = readFileSync(`${__dirname}/templates/card.html`, 'utf-8', (err, data3)=>{
        return data3
    })  

// *********************** end ********************************** 
const server = http.createServer ((req, res)=> {
   
const {query, pathname} = url.parse(req.url, true)

// OVERVIEW PAGE
   if (pathname === "/" || pathname === '/overview'){
    res.writeHead(200, {
        'Content-type' : 'text/html'
    })
    const cardsHtml = productItemJson.map(element => replacePlaceholders(readCard, element)).join('')
    const overViewOutput = readOverview.replace('{%PRODUCTCARDS%}', cardsHtml)
    res.end(overViewOutput)

// THE API
   }else if (pathname === '/api'){
    res.writeHead(200, {'Content-type' : 'application/json'})
    res.write(JSON.stringify(productItemJson));
    res.end()
    // ********************* this Asychronous reads the file everytime a user makes a request******
    // readFile(`${__dirname}/dev-data/data.json`, 'utf-8', (err, data)=>{
    //     const productItem = JSON.parse(data)
    //     res.writeHead(200, {
    //         'Content-type' : 'application.json'
    //     })
    //     res.end(data)
    // })  
    // ************************* end ****************************
// PRODUCT PAGE
   }else if (pathname === '/product'){
    res.writeHead(200, {
        'Content-type' : 'text/html'
    })
    const products = productItemJson[query.id];
    const output = replacePlaceholders(readProduct, products);

    res.end(output)

//NOT FOUND PAGE 
   }else{
    res.writeHead(404, {
        'Content-type' : 'text/html'
    }) 
    res.end("<h1>Page not found!</h1>")
   }
    
})

server.listen(3000, () => { 
    console.log('Server is running on port 3000')
})
// ******************SERVER************************************


