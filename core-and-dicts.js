// const vs. let, and older browsers, and [js].
// Also: node in terminal, for illustration

const maxAPI = require("max-api");
const dfns = require("date-fns");

const end_of_transition = new Date(2021, 1, 1);

// Simple examples with lists and functional programming:

maxAPI.addHandler("list", (...l) => {
    // (Start with simple example of list output, then do dict stuff.)
    let l2 = l.map(x => x * x);
    maxAPI.outlet("squares", l2); // "squares" * dict!
});

maxAPI.addHandler("bang", () => {
    // Show this one in the terminal first:
    maxAPI.outlet("interval",
                  dfns.intervalToDuration({start: Date.now(), end: end_of_transition}));
});

// Dictionary test (input), just because:

maxAPI.addHandler("dict", (d) => {
    maxAPI.post("dictionary!: " + d.red);
});
