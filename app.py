from flask import Flask, render_template, request, send_from_directory
import os
app = Flask(__name__)

EPUBS_DIR = {
    'default': './bookshelf/'
}


@app.route('/')
def index():
    return send_from_directory(app.root_path,'index.html')


@app.route('/search', methods=['GET'])
def search():
    query = request.args.get('searchQuery', '').lower()
    matching_files = []
    for _, dir_path in EPUBS_DIR.items():
        all_files = [f for f in os.listdir(dir_path) if f.lower().endswith('.epub')]
        matching_files += [f for f in all_files if query in f.lower()]
    
    # Render the results as HTML
    results_html = "".join([f'<li><a href="#" onclick="loadEpubInBibi(\'/bookshelf/{file}\'); return false;">{file}</a></li>' for file in matching_files])
    return results_html



@app.route('/reader/<path:subpath>')
def serve_bibi_assets(subpath):
    # This will serve all of Bibi's assets, such as JavaScript, CSS, etc.
    return send_from_directory('./reader', subpath)




@app.route('/bookshelf/<filename>')
def serve_epub(filename):
    return send_from_directory('./bookshelf', filename)




#@app.route('/reader')
#def serve_bibi_reader():
#    book_path = request.args.get('book')
    # You might want to do some checks on `book_path` for security reasons.
#    return send_from_directory('./reader', 'index.html')

@app.route('/reader')
def serve_bibi_reader():
    book_path = request.args.get('book', '')
    if book_path:
        # Check if the EPUB file exists in the bookshelf
        full_path = os.path.join('bookshelf', book_path.strip('/'))
        if os.path.exists(full_path):
            # Serve the Bibi reader's index.html
            # The book path will be handled by Bibi's JavaScript
            return send_from_directory('reader', 'index.html')
        else:
            return "EPUB file not found", 404
    return "No book specified", 400






@app.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(app.root_path, './favicon.ico'),
                               'favicon.ico', mimetype='image/vnd.microsoft.icon')

if __name__ == "__main__":
    app.run(debug=True)