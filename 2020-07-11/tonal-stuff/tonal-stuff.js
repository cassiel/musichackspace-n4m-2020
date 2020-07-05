const ChordDetect = require("@tonaljs/chord-detect");
const T = require("@tonaljs/tonal");
const _ = require("lodash");
const maxAPI = require("max-api");

let heldNotes = [];

maxAPI.addHandler("bang", () => {
    maxAPI.outlet(ChordDetect.detect(["D3", "F#4", "A", "C"]))
});

maxAPI.addHandler("note", (pitch, velocity) => {
    const name = T.Midi.midiToNoteName(pitch);

    if (velocity === 0) {
        _.pull(heldNotes, name);
    } else {
        heldNotes.push(name);
    };

    if (heldNotes.length > 0) {
        maxAPI.outlet("held", heldNotes);
        maxAPI.outlet("chords", ChordDetect.detect(heldNotes))
    }
});
