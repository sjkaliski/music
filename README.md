# Music

A fork of the excelent `npm i -g music`, using a modified version of dronir's SpotifyControl script for 10x more awesomeness.

# All kudos do dronir and Steve Kaliski

## Installation

Get [Spotify](https://www.spotify.com/).

```
$ [sudo] npm install -g https://github.com/mrkev/music
```

## Usage

For all available commands,

```
$ music --help
```

##### Search and play

```
$ music play drake
```

Input the number of the track you'd like to hear and hit enter. Spotify will start playing the album the track is in, starting with the selected track.

##### Next, previous, play/pause

We've all used headphones with single-button controls. Same idea. Play/pause is one `.`, next is two `..`, prev is three `...`.

```
$ music ..
```

##### Options

 - `-v` [0..100] change volume
 - `-b` jump backward N seconds
 - `-j` jump to N seconds
 - `-f` jump forward N seconds
 - `-s` Toggle shuffle
 - `-r` Toggle repeat playlist

Jumps to the 60 second mark, then forward 30 seconds, then backwards 10 seconds. Toggles repeat playlist. Toggles shuffle, and then cranks up the volume to 100%.

```
$ music -j 60 -f 30 -b 10 -r -s -v 100
```



