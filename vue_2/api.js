export class apiRequest {
  constructor(url) {
    return fetch(url)
      .then(async (response) => {
        const data = await response.json();

        if (!response.ok) {
          const error = (data && data.message) || response.statusText;
          return Promise.reject(error);
        }
        if (typeof data === "object") {
          data.forEach((element) => {
            sessionStorage.setItem("log", JSON.stringify(element.length));
            localStorage.setItem(element.symbol, JSON.stringify(element));
          });
        } else {
          console.log(typeof data);
        }
      })
      .catch((error) => {
        this.errorMessage = error;
        console.log("Opps", error);
      });
  }
}

export class apiUSD {
  constructor() {
    fetch("https://api.exchangerate-api.com/v4/latest/USD")
      .then(async (response) => {
        const data = await response.json();

        if (!response.ok) {
          const error = (data && data.message) || response.statusText;
          return Promise.reject(error);
        }
        if (typeof data === "object") {
          sessionStorage.setItem("USD", JSON.stringify(data.rates));
        } else {
          console.log(`data is: ${typeof data}`);
        }
      })
      .catch((error) => {
        this.errorMessage = error;
        console.log("Opps", error);
      });
  }
}

// Using Thunks!!

export function fetchData(fn, url) {
  fetch(url)
    .then((response) => response.json())
    .then((json) => fn(json));
}

export const asyncThunk = function (url) {
  return fetchData((data) => data.map((x) => console.log(x)), url);
};
