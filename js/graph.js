var remixAtOnce = remixAtOnce || {}

remixAtOnce.graph = remixAtOnce.graph || {
    initialize: function() {
        this.setupGraph();
    },
    setupGraph: function() {
        var //oscillator  = remixAtOnce.context.createOscillator(),
            gainNodeRightSection    = remixAtOnce.context.createGain(),
            gainNodeLeftSection     = remixAtOnce.context.createGain(),
            filterNodeRightSection  = remixAtOnce.context.createBiquadFilter(),
            filterNodeLeftSection   = remixAtOnce.context.createBiquadFilter(),
            audioNodes = [];

            console.log(remixAtOnce.audioElements);
            // remixAtOnce.audioElements.forEach( function(element){
                audioNodes.push(remixAtOnce.context.createMediaElementSource(remixAtOnce.audioElements[0]));
                audioNodes.push(remixAtOnce.context.createMediaElementSource(remixAtOnce.audioElements[1]));
            // });

            audioNodes[0].connect(filterNodeLeftSection);
            audioNodes[1].connect(filterNodeRightSection);
            // console.log(audioNodes[0]);
            // oscillator.connect(gain);
            // oscillator.frequency.value = 150;
            
            filterNodeLeftSection.connect(gainNodeLeftSection);
            filterNodeRightSection.connect(gainNodeRightSection);

            filterNodeLeftSection.type = "lowpass";
            filterNodeLeftSection.frequency.value = 20000;

            filterNodeRightSection.type = "lowpass";
            filterNodeRightSection.frequency.value = 20000;

            remixAtOnce.graph.filterNodeLeftSection = filterNodeLeftSection;
            remixAtOnce.graph.filterNodeRightSection = filterNodeRightSection;

            gainNodeLeftSection.connect(remixAtOnce.context.destination);
            gainNodeRightSection.connect(remixAtOnce.context.destination);


            // gainNode.gain.value = 1.0;
            // gainNode.gain.setValueAtTime(0.8, remixAtOnce.context.currentTime + 5);
            // gainNode.gain.setValueAtTime(0.2, remixAtOnce.context.currentTime + 6);
            // gainNode.gain.setValueAtTime(0.9, remixAtOnce.context.currentTime + 7);
            // gainNode.gain.setValueAtTime(0.0, remixAtOnce.context.currentTime + 8);
            // oscillator.start();
            // 
            remixAtOnce.graph.gainNodeLeftSection = gainNodeLeftSection;
            remixAtOnce.graph.gainNodeRightSection = gainNodeRightSection;
    }
};

