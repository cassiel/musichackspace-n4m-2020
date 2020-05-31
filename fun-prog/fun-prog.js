const maxAPI = require("max-api");

maxAPI.addHandlers({
    [maxAPI.MESSAGE_TYPES.BANG]: () => {
        var myDict = {a: [1, 2, 3, 4, 5]};

        maxAPI.outlet(myDict);
    }
});
