const { createMachine, interpret, assign } = XState;
const { range, from } = rxjs;
const { map, filter } = rxjs.operators;

const fetchMachine = createMachine({
  id: 'API',
  initial: 'idle',
  context: {
    data: ''
  },
  states: {
    idle: {
      on: {
        FETCH: 'loading'
      }
    },
    loading: {
      invoke: {
        id: 'fetchData',
        src: (context, event) =>
          fetch('https://api.coingecko.com/api/v3/exchange_rates').then((data) =>
            data.json()
          ),
        onDone: {
          target: 'resolved',
          actions: assign({
            data: (_, event) => event.data
          })
        },
        onError: 'rejected'
      },
      on: {
        CANCEL: 'idle'
      }
    },
    resolved: {
      type: 'final'
    },
    rejected: {
      on: {
        FETCH: 'loading'
      }
    }
  }
});

const apiService = interpret(fetchMachine)
  .onTransition((state) => console.log(state.value))
  .start();

apiService.send('FETCH');

export const state$ = from(apiService)