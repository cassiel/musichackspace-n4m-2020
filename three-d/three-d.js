// const vs. let, and older browsers, and [js].
// Also: node in terminal, for illustration

const maxAPI = require("max-api");
const _ = require("lodash");

// Positions dictionary output:

maxAPI.addHandler("positions", () => {
    let myDict = {positions: {xs: _.range(100).map((x) => x / 100),
                              ys: _.range(100).map((x) => 0),
                              zs: _.range(100).map((x) => x % 10)
                             }
                 };

    maxAPI.outlet(myDict);
});
