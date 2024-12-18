 // List of songs
 const songs = [
    { name: "Song 1", file: "/media/song1.mp3" },
    { name: "Song 2", file: "/media/song2.mp3" },
    { name: "Song 3", file: "/media/song3.mp3" }
];

// Get references to the audio player and song list
const audioPlayer = document.getElementById('audioPlayer');
const audioSource = document.getElementById('audioSource');
const songList = document.getElementById('songList');
console.log(songList)

// Populate the song list
songs.forEach((song, index) => {
    const li = document.createElement('li');
    const button = document.createElement('button');
    button.textContent = song.name;
    button.addEventListener('click', () => {
        playSong(song.file);
    });
    li.appendChild(button);
    songList.appendChild(li);
});

// Function to play a selected song
function playSong(file) {
    audioSource.src = file;
    audioPlayer.load(); // Reload the audio element with the new source
    audioPlayer.play(); // Play the song
}