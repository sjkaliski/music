-- This script was originally found at https://github.com/dronir/SpotifyControl
-- All kudos do dronir

on run argv
	if (count of argv) is equal to 0 then
		set msg to "Use the following commands:
"
		set msg to msg & "  start, play [uri]  - Start playback / play uri
"
		set msg to msg & "  pause, stop        - Stop playback
"
		set msg to msg & "  play/pause         - Toggle playback
"
		set msg to msg & "  next               - Next track
"
		set msg to msg & "  previous, prev     - Previous track
"
		set msg to msg & "  info               - Print track info
"
		set msg to msg & "  jump N             - Jump to N seconds in the song
"
		set msg to msg & "  forward N          - Jump N seconds forwards
"
		set msg to msg & "  rewind N           - Jump N seconds backwards
"
		set msg to msg & "  shuffle            - Toggle shuffle
"
		set msg to msg & "  repeat             - Toggle repeat
"
		set msg to msg & "  volume N           - Set Volume to N (0...100)
"
		return msg
	end if
	set command to item 1 of argv
	using terms from application "Spotify"
		set info to "Error."
		
		if command is equal to "play" or command is equal to "start" then
			if (count of argv) is equal to 1 then
				tell application "Spotify" to play
			else
				set uri to item 2 of argv
				tell application "Spotify" to play track uri
			end if
		
		else if command is equal to "playinalbum" then
			set uri to item 2 of argv
			set lol to item 3 of argv
			tell application "Spotify" to play track uri in context lol 

		else if command is equal to "play/pause" then
			tell application "Spotify" to playpause
			return "Toggled."
			
		else if command is equal to "pause" or command is equal to "stop" then
			tell application "Spotify" to pause
			return "Paused."
			
		else if command is equal to "next" then
			tell application "Spotify" to next track
			
		else if command is equal to "previous" or command is equal to "prev" then
			tell application "Spotify" to previous track
			
		else if command is equal to "jump" then
			set jumpTo to item 2 of argv as real
			tell application "Spotify"
				set tMax to duration of current track
				if jumpTo > tMax then
					return "Can't jump past end of track."
				else if jumpTo < 0 then
					return "Can't jump past start of track."
				end if
				set nM to round (jumpTo / 60) rounding down
				set nS to round (jumpTo mod 60) rounding down
				set newTime to ((nM as text) & "min " & nS as text) & "s"
				set player position to jumpTo
				return "Jumped to " & newTime
			end tell
			
		else if command is equal to "forward" then
			set jump to item 2 of argv as real
			tell application "Spotify"
				set now to player position
				set tMax to duration of current track
				set jumpTo to now + jump
				if jumpTo > tMax then
					return "Can't jump past end of track."
				else if jumpTo < 0 then
					set jumpTo to 0
				end if
				set nM to round (jumpTo / 60) rounding down
				set nS to round (jumpTo mod 60) rounding down
				set newTime to ((nM as text) & "min " & nS as text) & "s"
				set player position to jumpTo
				return "Jumped to " & newTime
			end tell
			
		else if command is equal to "rewind" then
			set jump to item 2 of argv as real
			tell application "Spotify"
				set now to player position
				set tMax to duration of current track
				set jumpTo to now - jump
				if jumpTo > tMax then
					return "Can't jump past end of track."
				else if jumpTo < 0 then
					set jumpTo to 0
				end if
				set nM to round (jumpTo / 60) rounding down
				set nS to round (jumpTo mod 60) rounding down
				set newTime to ((nM as text) & "min " & nS as text) & "s"
				set player position to jumpTo
				return "Jumped to " & newTime
			end tell
			
		else if command is equal to "volume" then
			set newVolume to item 2 of argv as real
			if newVolume < 0 then set newVolume to 0
			if newVolume > 100 then set newVolume to 100
			tell application "Spotify"
				set sound volume to newVolume
			end tell
			return "Changed volume to " & newVolume
			
		else if command is equal to "shuffle" then
			tell application "Spotify"
				set shuffling to not shuffling
				if shuffling
					set stat_shuff to "on."
				else
				  set stat_shuff to "off."
				end if
				return "Shuffle is now " & stat_shuff
			end tell
			
		else if command is equal to "repeat" then
			tell application "Spotify"
				set repeating to not repeating
				if repeating
					set stat_rep to "on."
				else
				  set stat_rep to "lol."
				end if
				return "Repeat is now " & stat_rep
			end tell
			
		else if command is equal to "info" then
			tell application "Spotify"
				set myTrack to name of current track
				set myArtist to artist of current track
				set myAlbum to album of current track
				set tM to round ((duration of current track) / 60) rounding down
				set tS to (duration of current track) mod 60
				set myTime to ((tM as text) & "min " & tS as text) & "s"
				set nM to round (player position / 60) rounding down
				set nS to round (player position mod 60) rounding down
				set nowAt to ((nM as text) & "min " & nS as text) & "s"
				set info to "Current track:"
				set info to info & "
 Artist:   " & myArtist
				set info to info & "
 Track:    " & myTrack
				set info to info & "
 Album:    " & myAlbum
				set info to info & "
 URI:      " & spotify url of current track
				set info to info & "
 Duration: " & myTime & " (" & duration of current track & " seconds)"
				set info to info & "
 Now at:   " & nowAt
				set info to info & "
 Player:   " & player state
				set info to info & "
 Volume:   " & sound volume
				if shuffling then set info to info & "
 Shuffle is on."
				if repeating then set info to info & "
 Repeat is on."
			end tell
			return info
		end if
		
		tell application "Spotify"
			set shuf to ""
			if shuffling then set shuf to "
[shuffle on]"
			if player state as text is equal to "playing" then
				return "Now playing: " & artist of current track & " - " & name of current track & shuf
			end if
		end tell
	end using terms from
end run

