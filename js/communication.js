var remixAtOnce = remixAtOnce || {}

remixAtOnce.communication = remixAtOnce.communication || {
    initialize: function() {
        chrome.runtime.onMessage.addListener(
            function(request, sender, sendResponse) {
                if (request.message == "crossfaderChange") {
                    // console.log(this);
                    remixAtOnce.communication.updateCrossfader(request);
                }
                if (request.message == "leftSectionFilterCutoffChanged") {
                    remixAtOnce.communication.updateLeftSectionFilterCutoff(request);
                }
                if (request.message == "rightSectionFilterCutoffChanged") {
                    remixAtOnce.communication.updateRightSectionFilterCutoff(request);
                }
            // console.log(sender.tab ?
            //         "from a content script:" + sender.tab.url :
            //         "from the extension");
            // if (request.greeting == "hello")
            // sendResponse({farewell: "goodbye"});
        });
    },

    updateCrossfader: function(data) {
        // console.log(remixAtOnce);
        remixAtOnce.graph.gainNodeLeftSection.gain.value = data.newValueLeftSection;
        remixAtOnce.graph.gainNodeRightSection.gain.value = data.newValueRightSection;
        // console.log(remixAtOnce.graph.gainNode.gain.value);
        // console.log(request.newValue); 
    },
    updateLeftSectionFilterCutoff: function(data) {
        remixAtOnce.graph.filterNodeLeftSection.frequency.value = data.newValue;
    },
    updateRightSectionFilterCutoff: function(data) {
        remixAtOnce.graph.filterNodeRightSection.frequency.value = data.newValue;
    }
};


    