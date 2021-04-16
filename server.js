// Importing necessary modules
const http = require('http')
const url = require('url')
const fs = require('fs')
const path = require('path')

const mimeType = {
    '.ico': 'image/x-icon',
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.css': 'text/css',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.wav': 'audio/wav',
    '.mp3': 'audio/mpeg',
    '.svg': 'image/svg+xml',
    '.pdf': 'application/pdf',
    '.doc': 'application/msword',
    '.eot': 'appliaction/vnd.ms-fontobject',
    '.ttf': 'aplication/font-sfnt',
}

var basePath = './'

const server = http.createServer((req, res) => {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
        'Access-Control-Max-Age': 2592000,
        'Access-Control-Allow-Headers': '*',
    }
    var resolvedBase = path.resolve(basePath)
    var safeSuffix = path.normalize(req.url).replace(/^(\.\.[\/\\])+/, '')
    var fileLoc = path.join(resolvedBase, safeSuffix)

    if (req.url === '/') {
        res.writeHead(200, { 'content-type': 'text/html' })
        fs.createReadStream('home.html').pipe(res)
    } else if (req.url.match('.css$')) {
        res.writeHead(200, { 'Content-Type': 'text/css' })
        fs.createReadStream('style.css', 'UTF-8').pipe(res)
    } else if (req.url.match('.js$')) {
        res.writeHead(200, { 'Content-Type': 'text/javascript' })
        fs.createReadStream(fileLoc, 'UTF-8').pipe(res)
    } else if (req.url.match('.js$')) {
        res.writeHead(200, { 'Content-Type': 'application/json' })
        fs.createReadStream(fileLoc, 'UTF-8').pipe(res)
    }
})

server.listen(process.env.PORT || 3000)
