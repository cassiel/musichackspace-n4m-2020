// const vs. let, and older browsers, and [js].

const maxAPI = require("max-api");
const _ = require("lodash");

// Dictionary test, just because:

maxAPI.addHandler(maxAPI.MESSAGE_TYPES.DICT, (d) => {
        maxAPI.post("dictionary!: " + d.red);
});

// Bang:

maxAPI.addHandler(maxAPI.MESSAGE_TYPES.BANG, () => {
    let myDict = {positions: {xs: _.range(100).map((x) => x / 100),
                              ys: _.range(100).map((x) => 0),
                              zs: _.range(100).map((x) => x % 10)
                             }
                 };

    maxAPI.outlet(myDict);
});

// maxAPI.post(`DICT is ${maxAPI.MESSAGE_TYPES.DICT}`);

/* via `addHandlers`:
maxAPI.addHandlers({
    [maxAPI.MESSAGE_TYPES.BANG]: () => {

        let myDict = {positions: {xs: _.range(100).map((x) => x / 100),
                                  ys: _.range(100).map((x) => 0),
                                  zs: _.range(100).map((x) => x % 10)
                                 }
                     };

        maxAPI.outlet(myDict);
    },

    [maxAPI.MESSAGE_TYPES.DICT]: (d) => {
        maxAPI.post("dictionary!: " + d.red);
    }
});
*/
