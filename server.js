const exists = require("node:fs")

const express = require("express")
const app = express()
const path = require("path")
const fs = require("fs")
const port = 3000

app.use("/media", express.static(path.join(__dirname, "media")))
app.use("/static", express.static(path.join(__dirname, "static")))

// Root endpoint
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"))
})

// API endpoint to list directories in the "media" folder
app.get("/directories/:dir", (req, res) => {
  const dir = decodeURIComponent(req.params.dir)
  const mediaDir = path.join(__dirname, dir)

  // Read the contents of the media directory
  fs.readdir(mediaDir, { withFileTypes: true }, (err, files) => {
    if (err) {
      return res.status(500).json({ error: "Unable to read directory" })
    }

    // Filter the contents to get only directories
    const directories = files.map((file) => file.name) // Get the directory names

    res.json(directories) // Send the list of directories as JSON
  })
})

// API endpoint to get a specific song by name
app.get("/track/:songName", (req, res) => {
  const songName = decodeURIComponent(req.params.songName)
  const songPath = path.join(__dirname, "media", songName)
  res.sendFile(songPath)
})

// Start the server
app.listen(port, "0.0.0.0", () => {
  console.log(`Server is running at http://localhost:${port}`)
})
