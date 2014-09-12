console.log("HELLO EXTENSION!");

// CROSSFADER MESSAGES
var crossfaderInput = document.querySelector( '#crossfader' );

crossfaderInput.addEventListener( 'input', function(event) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
                                                message: "crossfaderChange",
                                                newValueLeftSection: crossfaderInput.value/100,
                                                newValueRightSection: 1 - crossfaderInput.value/100
                                            });
    });
});

// LEFT SECTION 
var leftSectionFilterCutoffInput = document.querySelector( '#filter-cutoff-left-section' );

leftSectionFilterCutoffInput.addEventListener( 'input', function(event) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
                                                message: "leftSectionFilterCutoffChanged",
                                                newValue: leftSectionFilterCutoffInput.value
                                            });
    });
});

// RIGHT SECTION
var rightSectionFilterCutoffInput = document.querySelector( '#filter-cutoff-right-section' );

rightSectionFilterCutoffInput.addEventListener( 'input', function(event) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
                                                message: "rightSectionFilterCutoffChanged",
                                                newValue: rightSectionFilterCutoffInput.value
                                            });
    });
});
