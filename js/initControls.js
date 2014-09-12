console.log("HELLO EXTENSION!");

// CROSSFADER MESSAGES
var crossfaderInput = document.querySelector( '#crossfader' );

crossfaderInput.addEventListener( 'input', function(event) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
                                                message: "crossfaderChange",
                                                newValueLeftSection: 1 - crossfaderInput.value/100,
                                                newValueRightSection: crossfaderInput.value/100
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

// MIDI STUFF

window.addEventListener('load', function() {   
  navigator.requestMIDIAccess().then( 
    onMIDIInit, 
    onMIDISystemError );
});

// function onMIDIInit( midi ) {
//   var list=midi.outputs();
//   console.log("onMIDIInit");

//   for (var i=0; i<list.length; i++) {
//     list[i].send( [0x90, 3, 32] );
//   }
// }

function onMIDISystemError( midi ) {
    console.log("onMIDISystemError");
}

// function onMIDIInit( midi ) {
//   for (var input of midiAccess.outputs.values())
//     input.send( [0x90, 3, 32] );
// }

// function onMIDIInit( midi ) {
//   for (var input of midiAccess.inputs.values())
//     input.onmidimessage = midiMessageReceived;
// }

function onMIDIInit( midi ) {
  var list=midi.inputs();
    console.log("onMIDIInit");

    console.log(list[0]);
    list[0].onmidimessage = midiMessageReceived;
    console.log(list[0]);
}

function midiMessageReceived( ev ) {
    // console.log(ev);
    var cmd = ev.data[0] >> 4;
    // console.log(cmd);
    var channel = ev.data[0] & 0xf;
    var noteNumber = ev.data[1];
    var velocity = 0;
    if (ev.data.length > 2)
      velocity = ev.data[2];

    // MIDI noteon with velocity=0 is the same as noteoff
    if ( cmd==8 || ((cmd==9)&&(velocity==0)) ) { // noteoff
      noteOff( noteNumber );
    } else if (cmd == 9) { // note on
      noteOn( noteNumber, velocity);
    } else if (cmd == 11) { // controller message
      controller( noteNumber, velocity);
    } else {
      // probably sysex!
    }
}

function controller(controllerNumber, value) {
    if (controllerNumber === 1) {
        crossfaderInput.value = value / 127 * 100;
        var event = new MouseEvent('input');
        crossfaderInput.dispatchEvent(event);

    } else if (controllerNumber === 5) {
        leftSectionFilterCutoffInput.value = (value > 126) ? 20000: value * 50;
        var event = new MouseEvent('input');
        leftSectionFilterCutoffInput.dispatchEvent(event);
    } else if (controllerNumber === 6) {
        rightSectionFilterCutoffInput.value = (value > 126) ? 20000: value * 50;
        var event = new MouseEvent('input');
        rightSectionFilterCutoffInput.dispatchEvent(event);
    }
}

function noteOn( noteNumber, velocity ) {
    console.log("noteON: " + noteNumber + "   " + velocity);
}

function noteOff( noteNumber ) {
    console.log("noteOFF: " + noteNumber);
}

function getFrequencyForNoteNumber( noteNumber ) {

}