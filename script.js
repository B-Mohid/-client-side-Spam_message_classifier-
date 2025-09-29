// This ensures our code runs only after the entire HTML page has loaded.
document.addEventListener('DOMContentLoaded', () => {

    // --- A. GRAB THE HTML ELEMENTS ---
    // We get all the elements we need to interact with and store them in variables.
    const messageInput = document.getElementById('message-input');
    const pasteBtn = document.getElementById('paste-btn');
    const analyzeBtn = document.getElementById('analyze-btn');
    const statusText = document.getElementById('status');
    const confidenceBar = document.getElementById('confidence-bar');
    const confidenceText = document.getElementById('confidence-text');

    // --- B. INITIALIZE GLOBAL VARIABLES ---
    let model = null;         // This will hold our loaded AI model.
    let word_index = null;    // This will hold our word-to-number dictionary.
    const MAX_LEN = 150;      // IMPORTANT: This must match the model's training parameters from Colab.

    // --- C. ASYNC FUNCTION TO LOAD THE AI MODEL AND DATA ---
    async function loadResources() {
        statusText.innerText = 'Status: Loading AI model... Please wait.';
        analyzeBtn.disabled = true; // Disable button while loading.

        try {
            // 1. Load the AI model from the server.
            model = await tf.loadLayersModel('/static/model/model.json');
            
            // 2. Load the word_index dictionary.
            const response = await fetch('/static/model/word_index.json');
            word_index = await response.json();
            
            // 3. Update the UI to show everything is ready.
            statusText.innerText = 'Status: AI Ready. Enter a message.';
            analyzeBtn.disabled = false;
            console.log("Model and word index loaded successfully.");

        } catch (error) {
            statusText.innerText = 'Status: Failed to load AI model. Check console.';
            console.error("Error loading resources:", error);
        }
    }

    // --- D. FUNCTION TO ANALYZE THE MESSAGE ---
    function analyzeMessage() {
        if (!model || !word_index) return; // Safety check

        const text = messageInput.value.toLowerCase().replace(/[^\w\s]/gi, '');
        if (text.trim().length === 0) return;

        // 1. Tokenization: Convert the sentence into a sequence of numbers.
        const sequence = text.split(' ').map(word => {
            return word_index[word] || 0; // Use 0 for unknown words (out-of-vocabulary).
        });

        // 2. Padding: Make the sequence exactly MAX_LEN long.
        let paddedSequence = sequence.slice(0, MAX_LEN); // Truncate if too long
        while (paddedSequence.length < MAX_LEN) {
            paddedSequence.unshift(0); // Pad with zeros at the beginning.
        }

        // 3. Prediction: Convert to a tensor and ask the model for a prediction.
        const tensor = tf.tensor2d([paddedSequence]);
        const prediction = model.predict(tensor);
        const score = prediction.dataSync()[0]; // The result is a probability (0 to 1).

        // 4. Display the result.
        displayResult(score);
    }

    // --- E. FUNCTION TO UPDATE THE UI WITH THE RESULT ---
    function displayResult(score) {
        const percentage = (score * 100).toFixed(2);
        confidenceText.innerText = `Spam Confidence Score: ${percentage}%`;

        if (score > 0.5) { // 0.5 is our threshold for calling it spam
            statusText.innerText = 'Result: This message is likely SPAM.';
            statusText.style.color = '#e74c3c'; // Red
            confidenceBar.style.backgroundColor = '#e74c3c';
        } else {
            statusText.innerText = 'Result: This message seems SAFE (Ham).';
            statusText.style.color = '#2ecc71'; // Green
            confidenceBar.style.backgroundColor = '#2ecc71';
        }
        confidenceBar.style.width = `${percentage}%`;
    }

    // --- F. ATTACH EVENT LISTENERS TO BUTTONS ---
    analyzeBtn.addEventListener('click', analyzeMessage);

    // This implements the "Paste" button functionality.
    pasteBtn.addEventListener('click', async () => {
        try {
            const text = await navigator.clipboard.readText();
            messageInput.value = text;
        } catch (err) {
            console.error('Failed to read clipboard: ', err);
            // This might fail if the browser permissions are not set correctly.
        }
    });

    // --- G. START LOADING THE MODEL WHEN THE PAGE LOADS ---
    loadResources();
});

