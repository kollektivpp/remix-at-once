var remixAtOnce = remixAtOnce || {};

remixAtOnce.initialize = (function(){
    console.log("Init context and find media tags:");
    remixAtOnce.setup.initialize();
    console.log("Init audio graph make media tags accessible:");
    remixAtOnce.graph.initialize();
    console.log(remixAtOnce);
    console.log("Init communication between extension and content scripts:");
    remixAtOnce.communication.initialize();
})();
