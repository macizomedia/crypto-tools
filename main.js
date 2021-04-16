import { store } from './store.js'
import { apiRequest, apiUSD } from './api.js'
const { Observable } = rxjs
const { map, concatAll } = rxjs.operators
const _u = _.noConflict()
const getArr = (o) => Object.entries(o)
const getKeys = (o) => Object.keys(o)
const feed = 'https://api.coinpaprika.com/v1/coins'
const gecko = 'https://api.coingecko.com/api/v3/exchange_rates'
const URL = 'https://api.coindesk.com/v1/bpi/currentprice.json'

function fetchData(url) {
    return Observable.create((observer) => {
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                observer.next(data)
                observer.complete()
            })
            .catch((err) => observer.error(err))
    })
}
/* VUE COMPONENTS */

const news$ = fetchData('./crypto.json')
Vue.component('currency-data', {
    props: ['name', 'unit', 'type'],
    template:
        '<p>{{ name }} is a type of {{ type }} asset, its unit is {{ unit }} </p>',
})

new Vue({
    el: '#app',
    data: {
        request: {},
        data: {},
        item: '',
        articles: null,
        currencies: [],
        currenciesList: [],
        counter: store.count,
        currency: {
            type: '',
            unit: '',
            name: '',
            value: 0,
            euro: 0,
            dolar: 0,
            pound: 0,
            yen: 0,
            franco: 0,
            versus: 0,
        },
        isLoading: true,
    },
    components: {},
    watch: {},
    beforeCreate() {
        new apiRequest(feed)
        new apiUSD()
    },
    created() {
        this.makeTuples()
        this.getInfo()
        setInterval(() => {
            this.log()
            this.counter++
        }, 8000)
    },
    mounted() {
        fetch('https://api.coingecko.com/api/v3/exchange_rates')
            .then(async (response) => {
                const data = await response.json()

                if (!response.ok) {
                    const error = (data && data.message) || response.statusText
                    return Promise.reject(error)
                }
                const object = getArr(data.rates)
                this.currenciesList = getKeys(data.rates)
                this.currencies = object
                console.log(this.currencies)
                this.log()
                this.isLoading = false
            })
            .catch((error) => {
                this.errorMessage = error
                console.error('There was an error!', error)
            }),
            news$.subscribe((x) => this.articles = x.results.flat())
    },
    computed: {
        rate: function () {
            return `${this.currency.unit} ${this.currency.value.toLocaleString(
                'en-US',
                {
                    maximumSignificantDigits: 3,
                }
            )} = 1 \u{20BF}` // jshint ignore:line
        },
        selectedCoin: function () {
            return this.data.map((x) => x.name)
        },
        listedCoin: function () {
            return `${this.currency.unit} ${this.currency.value.toLocaleString(
                'en-US',
                {
                    maximumSignificantDigits: 3,
                }
            )} = 1 \u{20BF}` // jshint ignore:line
        },
        euro: function () {
            return this.currency.euro.toLocaleString('en-US', {
                style: 'currency',
                currency: 'EUR',
            })
        },
        dolar: function () {
            return this.currency.dolar.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
            })
        },
        pound: function () {
            return this.currency.pound.toLocaleString('en-US', {
                style: 'currency',
                currency: 'GBP',
            })
        },
        yen: function () {
            return this.currency.pound.toLocaleString('en-US', {
                style: 'currency',
                currency: 'YPY',
            })
        },
        franco: function () {
            return this.currency.pound.toLocaleString('en-US', {
                style: 'currency',
                currency: 'CHF',
            })
        },
    },
    methods: {
        anAction: function () {
            const data$ = fetchData(gecko)
            data$
                .pipe(map((data) => data.rates))
                .subscribe((rate) =>
                    console.log(rate[this.currency.unit.toLowerCase()])
                )
            return console.log('hello')
        },
        log() {
            if (this.counter < this.currenciesList.length) {
                this.currency.unit = this.currencies[this.counter][1].unit
                this.currency.value = this.currencies[this.counter][1].value
                this.currency.type = this.currencies[this.counter][1].type
                this.currency.euro =
                    (1 / this.currencies[this.counter][1].value) *
                    this.currencies[25][1].value
                this.currency.dolar =
                    (1 / this.currencies[this.counter][1].value) *
                    this.currencies[11][1].value
                this.currency.pound =
                    (1 / this.currencies[this.counter][1].value) *
                    this.currencies[26][1].value
                this.currency.yen =
                    (1 / this.currencies[this.counter][1].value) *
                    this.currencies[32][1].value
                this.currency.franco =
                    (1 / this.currencies[this.counter][1].value) *
                    this.currencies[20][1].value
                this.currency.name = this.currencies[this.counter][1].name
            } else {
                this.counter = 0
            }
        },
        async getInfo() {
            const res = await fetch(
                'https://api.coingecko.com/api/v3/exchanges'
            )
            const data = await res.json()
            return (this.data = data)
        },
        makeTuples() {
            async function fetchURL() {
                let response = await fetch(URL)
                console.log(response.status) // 200
                // console.log(response.json()); // OK
                const contentType = await response.headers.get('content-type')
                if (response.status === 200) {
                    //localStorage.clear()
                    let data = await response.json()
                    //console.log(_u.at(data, ['bpi.USD.code','bpi.USD.rate']))
                    Object.entries(data.bpi).forEach((element) => {
                        for (let i = 0; i < element.length; i++) {
                            localStorage.setItem(
                                element[0],
                                _u.get(element[1], 'rate_float')
                            )
                            /* ocalStorage.setItem(element, _u.pullAt(Object.keys(element), i)) */
                        }
                    })
                    console.log(contentType)
                }
            }
            fetchURL()
        },
    },
})

/* 
const news = "https://cryptopanic.com/api/v1/posts/?auth_token=802ace79eb7cf828dbf4625250db50a92a3c60a5&currencies=BTC,ETH&public=true"
fetch(news).then((response) => {
  if (response.ok) {
    return response.json();
  } else {
    throw new Error('Something went wrong');
  }
})
.then((responseJson) => {
  console.log(responseJson)
})
.catch((error) => {
  console.log(error)
});
 */
/* 
(async function(){
  const response = await fetch(URL);
  const rb = response.body;
  const reader = rb.getReader();
  const stream = new ReadableStream({
    start(controller) {
      // The following function handles each data chunk
      function push() {
        // "done" is a Boolean and value a "Uint8Array"
        reader.read().then(({ done, value }) => {
          // If there is no more data to read
          if (done) {
            console.log('done', done);
            controller.close();
            return;
          }
          // Get the data and send it to the browser via the controller
          controller.enqueue(value);
          // Check chunks by logging to the console
          console.log(done, value);
          push();
        });
      }

      push();
    }
  });
  const result_5 = await new Response(stream, { headers: { "Content-Type": "text/html" } }).text();
  // Do things with result
  console.log(JSON.parse(result_5));
}())
 */
