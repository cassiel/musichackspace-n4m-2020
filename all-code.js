// const vs. let, and older browsers, and [js].
// Also: node in terminal, for illustration

const maxAPI = require("max-api");
const _ = require("lodash");
const dfns = require("date-fns");

const end_of_transition = new Date(2021, 1, 1);

maxAPI.addHandler("bang", () => {
    // Show this one in the terminal first:
    maxAPI.outlet(dfns.intervalToDuration({start: Date.now(), end: end_of_transition}));
});

// Dictionary test (input), just because:

maxAPI.addHandler(maxAPI.MESSAGE_TYPES.DICT, (d) => {
        maxAPI.post("dictionary!: " + d.red);
});

// Simple examples with lists and functional programming:

maxAPI.addHandler(maxAPI.MESSAGE_TYPES.LIST, (l) => {
    maxAPI.output(l);
});

// Positions dictionary output:

maxAPI.addHandler("positions", () => {
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
