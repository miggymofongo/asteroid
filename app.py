from flask import Flask, request, send_from_directory
import os

# Initialize Flask app
app = Flask(__name__)

# Directory containing resumes 
RESUME_DIR = './resumes/'

@app.route('/')
def index():
    # Serve the main HTML page
    return send_from_directory(app.root_path, 'index.html')

@app.route('/search', methods=['GET'])
def search():
    # Get the search query parameter and convert it to lowercase for case-insensitive matching
    query = request.args.get('searchQuery', '').lower()

    # List to store filenames of matching PDF files
    matching_files = []

    # Fetch all resumes from the directory and filter them based on the search query
    all_files = [f for f in os.listdir(RESUME_DIR) if f.lower().endswith('.pdf')]
    matching_files += [f for f in all_files if query in f.lower()]
    
    # Generate HTML for the list of matching files
    results_html = "".join([f'<li><a href="/resumes/{file}">{file}</a></li>' for file in matching_files])
    return results_html

@app.route('/resumes/<filename>')
def serve_resume(filename):
    # Serve a resume from the resumes directory
    return send_from_directory(RESUME_DIR, filename)

@app.route('/favicon.ico')
def favicon():
    # Serve the favicon
    return send_from_directory(os.path.join(app.root_path, 'favicon.ico'), 'favicon.ico', mimetype='image/vnd.microsoft.icon')

if __name__ == "__main__":
    app.run(debug=True)
