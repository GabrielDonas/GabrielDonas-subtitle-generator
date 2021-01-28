//$.write(app.project.activeSequence.projectItem);

activeSequence = app.project.activeSequence
audioTracks = activeSequence.audioTracks
videoTracks = activeSequence.videoTracks

activeSequence.clone()

for(i=0; i < videoTracks.numTracks; i++){
    videoTracks[i].setMute(1)
    audioTracks[i].setMute(1)
    $.write("\nvideo track: " + i)
    $.write("\naudio track: " + i)
}

audioTracks[0].setMute(0)

app.project.exportTimeline("Media")