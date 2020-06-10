// Discuss: const vs. let (vs. var), and older browsers, and [js].
// Also: node in terminal, for illustration

// "require" vs "import" vs. "requirejs"

const maxAPI = require("max-api");
const dfns = require("date-fns");

// Simple examples with lists and functional programming:
// (Javascript pretty agnostic about ints vs floats; node.script
// seems more clever about tagging its output)
maxAPI.addHandler("number", (i) => {
    maxAPI.outlet(-i);
})

maxAPI.addHandler("list", (...l) => {
    // 1. Start with simple example of list output, then do dict stuff.
    let l2 = l.map(x => x * x);
    maxAPI.outlet("squares", l2); // "squares" * dict!
});

// We can actually get by with "const" almost everywhere.
const end_of_transition = new Date(2021, 1, 1);

maxAPI.addHandler("bang", () => {
    // 2. Libraries and dictionary output.
    // Show this one in the terminal first:
    maxAPI.outlet("interval",
                  dfns.intervalToDuration({start: Date.now(), end: end_of_transition}));
});

// (Extra) Dictionary test (input), just because:

maxAPI.addHandler("dict", (d) => {
    maxAPI.post("dictionary!: " + d.red);
});
