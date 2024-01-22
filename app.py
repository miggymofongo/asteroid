from flask import Flask, request, send_from_directory
import os

# Initialize Flask app
app = Flask(__name__)

# Directory containing EPUB files
RESUME_DIR = './resumes/'

@app.route('/')
def index():
    # Serve the main HTML page
    return send_from_directory(app.root_path, 'index.html')

@app.route('/search', methods=['GET'])
def search():
    # Get the search query parameter and convert it to lowercase for case-insensitive matching
    query = request.args.get('searchQuery', '').lower()

    # List to store filenames of matching EPUB files
    matching_files = []

    # Fetch all EPUB files from the directory and filter them based on the search query
    all_files = [f for f in os.listdir(RESUME_DIR) if f.lower().endswith('.epub')]
    matching_files += [f for f in all_files if query in f.lower()]
    
    # Generate HTML for the list of matching files
    results_html = "".join([f'<li><a href="#" onclick="loadEpubInBibi(\'/bookshelf/{file}\'); return false;">{file}</a></li>' for file in matching_files])
    return results_html

@app.route('/bookshelf/<filename>')
def serve_epub(filename):
    # Serve an EPUB file from the bookshelf directory
    return send_from_directory(EPUBS_DIR, filename)

@app.route('/reader/<path:subpath>')
def serve_bibi_assets(subpath):
    # Serve assets for the Bibi EPUB reader (JavaScript, CSS, etc.)
    return send_from_directory('./reader', subpath)

@app.route('/favicon.ico')
def favicon():
    # Serve the favicon
    return send_from_directory(os.path.join(app.root_path, 'favicon.ico'), 'favicon.ico', mimetype='image/vnd.microsoft.icon')

if __name__ == "__main__":
    app.run(debug=True)
