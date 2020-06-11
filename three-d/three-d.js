// const vs. let, and older browsers, and [js].
// Also: node in terminal, for illustration

const maxAPI = require("max-api");
const _ = require("lodash");

// Positions dictionary output:

maxAPI.addHandler("bang", () => {
    let L = _.range(100);
    let myDict = {xs: L.map((x) => Math.cos(x)),
                  ys: L.map((x) => Math.sin(x)),
                  zs: L.map((x) => x / 100)
                 };

    maxAPI.outlet(myDict);
});
