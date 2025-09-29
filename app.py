from flask import Flask, render_template

# Initialize the Flask application. This is standard practice.
app = Flask(__name__)

# This is the main route. When a user goes to "http://127.0.0.1:5000/",
# this function will run.
@app.route('/')
def home():
    # This tells Flask to find 'index.html' in the 'templates' folder
    # and send it to the user's browser.
    return render_template('index.html')

# This block makes the server run when you execute "python app.py" in the terminal.
# debug=True is helpful during development as it automatically reloads the server on changes.
if __name__ == '__main__':
    app.run(debug=True)

