// Importing necessary modules
const http = require('http')
const url = require('url')
const fs = require('fs')
const path = require('path')
const { hostname } = require('os')
let port = process.env.PORT || 3000
var basePath = './'

const server = http.createServer((req, res) => {

    reqPath = req.url

    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
        'Access-Control-Max-Age': 2592000,
        'Access-Control-Allow-Headers': '*',
        'content-type': 'text/html',
    }
    var resolvedBase = path.resolve(basePath)
    var safeSuffix = path.normalize(req.url).replace(/^(\.\.[\/\\])+/, '')
    var fileLoc = path.join(resolvedBase, safeSuffix)

    if (reqPath.split('.').length <= 2) {
        if (req.url === '/') {
            res.writeHead(200, headers)
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
        } else {
            fs.readFile(__dirname + req.url, function (err, data) {
                if (err) {
                    res.writeHead(404)
                    res.end(JSON.stringify(err))
                    return
                }
                res.writeHead(200)
                res.end(data)
            })
        }
    } else {
        res.writeHead(403, { 'Content-Type': 'text/plain' })
        res.write('403 ERROR: FORBIDDEN.')
        res.end()
    }
})

server.listen(port, hostname, () => {
    console.log(`Listening on http://${hostname}:${port}`)
})
