const maxAPI = require("max-api");
const _ = require("lodash");
const S = require("total-serialism").Stochastic;
// https://github.com/tmhglnd/total-serialism

maxAPI.addHandler("bang", () => {
    maxAPI.outlet(_.range(10).map(x => x * x * x));
    // maxAPI.outlet("hello");
});

// https://lodash.com/docs/4.17.15#groupBy

maxAPI.addHandler("group_by_floor", (...L) => {
    maxAPI.outlet("grouped", _.groupBy(L, Math.floor));
});

let markov;

maxAPI.addHandler("melody", (...L) => {
    markov = new S.MarkovChain(L);
});

maxAPI.addHandler("train", (...L) => {
    markov.train(L);
});

maxAPI.addHandler("results", () => {
    maxAPI.outlet("table", markov.table);
});
