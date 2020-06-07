const ChordDetect = require("@tonaljs/chord-detect");
const maxAPI = require("max-api");

maxAPI.addHandler("bang", () => {
    maxAPI.outlet(ChordDetect.detect(["D", "F#", "A", "C"]));
});
