// const vs. let, and older browsers, and [js].
// Also: node in terminal, for illustration

const maxAPI = require("max-api");
const _ = require("lodash");

// Positions dictionary output:

const L = _.range(100);

maxAPI.addHandler("bang", () => {
    let myDict = {xs: L.map((x) => Math.cos(x / 5)),
                  ys: L.map((x) => Math.sin(x / 5)),
                  zs: L.map((x) => x / 100),
                  rs: L.map((x) => Math.random()),
                  gs: L.map((x) => Math.random()),
                  bs: L.map((x) => Math.random())
                 };

    maxAPI.outlet(myDict);
});

// Perhaps a bit too slow to be an exemplar.
// (Example of the Node<->Max/dictionary bridge being an overhead.)
maxAPI.addHandler("number", (n) => {
    let myDict = {xs: L.map((x) => Math.cos(x + n / 100)),
        ys: L.map((x) => Math.sin(x + n / 80)),
        zs: L.map((x) => x / 100)
       };

    maxAPI.outlet(myDict);
});
