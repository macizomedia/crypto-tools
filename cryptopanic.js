'use strict';

const fs = require('fs');

let rawdata = fs.readFileSync('crypto.json');
let news= JSON.parse(rawdata);
console.log(news);

const news = "https://cryptopanic.com/api/v1/posts/?auth_token=802ace79eb7cf828dbf4625250db50a92a3c60a5&kind=news"
axios.get(news).then(res => console.log(res)) 
