var remixAtOnce = remixAtOnce || {}

remixAtOnce.setup = remixAtOnce.setup || {
    initialize: function() {
        console.log(this);
        console.log("HELLO PAGE!");

        this.initWebAudioContext();
        this.findAndInitAudioStreams();
    },
    initWebAudioContext: function() {
        console.log("audio context stub");
        remixAtOnce.context = new AudioContext();
    },
    findAndInitAudioStreams: function() {
        console.log("findAndInitAudioStreams STIB");
        var audioElements = document.querySelectorAll('audio');
        console.log(audioElements);
        remixAtOnce.audioElements = audioElements;
    }
};

