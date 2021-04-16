console.log("im here!!");
var Rx = rxjs;
const { range } = rxjs;
const { map, filter } = rxjs.operators;

var result = Rx.Observable.create((observer) => {
  fetch("https://api.exchangerate-api.com/v4/latest/USD")
    .then((response) => response.json())
    .then((data) => {
      observer.next(data);
      observer.complete();
    })
    .catch((err) => observer.error(err));
});
result.subscribe(
  (x) => console.log(x),
  (e) => console.error(e)
);

var machine = Rx.Observable.create(function subscribe(subscriber) {
  subscriber.next("arepa");
  subscriber.next("mondongo");
  setTimeout(() => {
    subscriber.next("cachapa con queso");
    subscriber.complete();
  }, 8000);
});

machine.subscribe({
  next(x) {
    console.log("got value " + x);
  },
  error(err) {
    console.error("something wrong occurred: " + err);
  },
  complete() {
    console.log("done");
  },
});
console.log("just after subscribe");
