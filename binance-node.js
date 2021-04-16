
const Binance = require('binance-api-node').default;
const API = 'YS8USQxE2XGQdrKXJFDgHi6FvzdAa9ZcJ9w17IDbwonH38eRqJMz5ZhviiAS5BKu';
let secret = 'REhlErJWxuHYQBmivoWRh72DaCMwr1wsgdKHeUTyXVB6oGIUKPOIKB78cajpoVTF';


const client = Binance({
  apiKey: API,
  apiSecret: secret,
});

const data = client.dailyStats({ symbol: 'ETHEUR' })
  

export default data