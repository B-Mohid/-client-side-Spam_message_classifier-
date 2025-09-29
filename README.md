# 🧠 Spam Message Classifier with TensorFlow.js

This project is a machine learning-based spam message classifier. A neural network is built and trained using TensorFlow (Keras) in a Google Colab notebook to distinguish between legitimate messages ("ham") and spam.

The final model is exported into TensorFlow.js format, making it suitable for direct, client-side deployment in a web browser without needing a server-side backend.

## 📂 Project Structure

This project is divided into two main phases:

### Phase 1: Model Training (Jupyter/Colab Notebook)
The `Spam_Classifier_for_Website.ipynb` notebook contains the complete workflow for creating the machine learning model. The key steps include:
- **Data Loading**: Importing the SMSSpamCollection dataset.
- **Text Preprocessing**: Cleaning text by removing stopwords, applying stemming, and removing punctuation.
- **Data Analysis**: Analyzing message length to determine optimal padding.
- **Tokenization**: Converting text sentences into numerical sequences.
- **Model Building**: Creating a Sequential neural network with Embedding, Pooling, and Dense layers in Keras.
- **Training & Evaluation**: Training the model on the dataset and evaluating its performance with a classification report and confusion matrix.
- **Exporting**: Saving the trained model and tokenizer vocabulary into a format compatible with TensorFlow.js.

### Phase 2: Web Application (Client-Side Deployment)
_(This phase involves building the user interface to consume the trained model)._

This part of the project will use the exported files from Phase 1. It will consist of an HTML/CSS/JavaScript frontend that allows a user to input a message and get a real-time prediction of whether it is "Spam" or "Ham".

## 🚀 How to Use

### Part 1: Training Your Own Model

1.  **Clone the Repository**
    ```sh
    git clone [https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME.git](https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME.git)
    ```
2.  **Download the Dataset**
    You will need the `SMSSpamCollection` dataset. A common source is the [UCI Machine Learning Repository](https://archive.ics.uci.edu/ml/datasets/sms+spam+collection). Download the zip file, extract it, and find the `SMSSpamCollection` file.
3.  **Open in Google Colab**
    - Go to [Google Colab](https://colab.research.google.com).
    - Select `File` > `Upload notebook` and choose the `Spam_Classifier_for_Website.ipynb` file from this repository.
4.  **Upload Dataset to Colab**
    - Once the notebook is open, click the folder icon on the left sidebar.
    - Click the "Upload" button and select the `SMSSpamCollection` file you downloaded.
5.  **Run the Notebook**
    - From the top menu, select `Runtime` > `Run all` to execute all the cells.
6.  **Download the Exported Files**
    - After the notebook finishes running, a `model` folder and a `word_index.json` file will be created.
    - Download these files. They are the "brain" of your classifier and will be used in the web application.

## 🛠️ Technologies Used

- **Model Development**: Python, TensorFlow, Keras, Scikit-learn, Pandas, NLTK
- **Deployment**: TensorFlow.js
- **Web Frontend (Phase 2)**: HTML, CSS, JavaScript

## 📦 Key Output Files

The primary output from the notebook consists of the following files, which are required for the web application:

- `model/model.json`: The model's architecture.
- `model/group1-shard1of1.bin`: The trained weights of the model.
- `word_index.json`: The tokenizer's word-to-index vocabulary, necessary for preprocessing new text to match the model's input format.
