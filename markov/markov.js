// const vs. let, and older browsers, and [js].
// Also: node in terminal, for illustration

const maxAPI = require("max-api");
const _ = require("lodash");
const S = require("total-serialism").Stochastic;

// TODO: lodash examples

let markov;

maxAPI.addHandler("melody", (...L) => {
    markov = new S.MarkovChain(L);
});

maxAPI.addHandler("train", (...L) => {
    markov.train(L);
});

maxAPI.addHandler("bang", () => {
    maxAPI.outlet("table", markov.table);
});
