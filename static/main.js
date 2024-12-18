const audioPlayer = document.getElementById("audioPlayer")
const audioSource = document.getElementById("audioSource")
const songList = document.getElementById("songList")

const home = document.getElementById("home")
const button = document.createElement("button")
button.textContent = "Home"
button.addEventListener("click", () => {
  loadFolders()
})
home.appendChild(button)

function playTrack(songName) {
  const songUrl = `/track/${encodeURIComponent(songName)}`

  console.log(songUrl)
  fetch(songUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Song not found")
      }
      // Set the song URL and play it
      audioSource.src = songUrl
      audioPlayer.load() // Reload the audio element with the new source
      audioPlayer.play() // Play the song
    })
    .catch((error) => {
      console.error("Error fetching the song:", error)
    })
}

loadFolders()

function navigateToTracks(folder) {
  const data = fetchDirectoryContents("media/" + folder)
  data.then((data) => {
    songList.innerHTML = ""
    data.forEach((entry) => {
      const li = document.createElement("li")
      const button = document.createElement("button")
      button.textContent = entry
      button.addEventListener("click", () => {
        playTrack(`${folder}/${entry}`)
      })
      li.appendChild(button)
      songList.appendChild(li)
    })
  })
}

function loadFolders() {
  const data = fetchDirectoryContents("media")
  data.then((data) => {
    songList.innerHTML = ""
    data.forEach((entry) => {
      const li = document.createElement("li")
      const button = document.createElement("button")
      button.textContent = entry
      button.addEventListener("click", () => {
        navigateToTracks(entry)
      })
      li.appendChild(button)
      songList.appendChild(li)
    })
  })
}

async function fetchDirectoryContents(dir = "") {
  const url = `/directories/${encodeURIComponent(dir)}`
  const data = await fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error fetching directory: ${response.statusText}`)
      }
      return response.json()
    })
    .catch((error) => {
      console.error("Error:", error)
    })
  return data
}
