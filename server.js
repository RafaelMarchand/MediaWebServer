const express = require('express');
const app = express();
const path = require('path');
const port = 3000;

app.use('/media', express.static(path.join(__dirname, 'media')));
app.use('/static', express.static(path.join(__dirname, 'static')));

// Root endpoint
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// API endpoint to list directories in the "media" folder
app.get('/api/directories', (req, res) => {
    const mediaDir = path.join(__dirname, 'media');

    // Read the contents of the media directory
    fs.readdir(mediaDir, { withFileTypes: true }, (err, files) => {
        if (err) {
            return res.status(500).json({ error: 'Unable to read directory' });
        }

        // Filter the contents to get only directories
        const directories = files
            .filter(file => file.isDirectory())  // Only include directories
            .map(file => file.name);             // Get the directory names

        res.json(directories);  // Send the list of directories as JSON
    });
});

// API endpoint to get a specific song by name
app.get('/api/song/:songName', (req, res) => {
    const songName = req.params.songName;
    const songPath = path.join(__dirname, 'media', songName + '.mp3');

    // Check if the song exists
    fs.exists(songPath, (exists) => {
        if (!exists) {
            return res.status(404).json({ error: 'Song not found' });
        }

        // Serve the song file
        res.sendFile(songPath);
    });
});

// Start the server
app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running at http://localhost:${port}`);
});