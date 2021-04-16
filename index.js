const os = require('os')
let count = 0
setInterval(() => {
    count++
    if(count > 3){
        console.log(count)
    }
}, 3000)
/*
async function asyncFunc() {
    // fetch data from a url endpoint
    const response = await axios.get('/some_url_endpoint')
    const data = await response.json()
    
    return data
}
*/
// info about current user
const user = os.userInfo()
console.log(user)

// method returns the system uptime in seconds
console.log(`The System Uptime is ${os.uptime()} seconds`)

const currentOS = {
    name: os.type(),
    release: os.release(),
    totalMem: os.totalmem(),
    freeMem: os.freemem(),
}
console.log(currentOS)
console.log(`we are located at  ${__dirname} on  ${process.env.NODE_ENV} mode run by ${user.username}`)
console.log('server running on ...')
