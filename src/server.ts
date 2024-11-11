import express from 'express';
import path from 'path';

const app = express();
const port = 3000;

// Serve the static files (JavaScript, CSS) from the dist folder
app.use(express.static(path.join(__dirname, 'dist')));

// Serve index.html from the dist folder for all routes (SPA behavior)
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});