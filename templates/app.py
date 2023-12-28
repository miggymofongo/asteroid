from flask import Flask, render_template, request, send_from_directory
import os
app = Flask(__name__)

EPUBS_DIR = {
    'default': './reader/bookshelf/'


}


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/search', methods=['GET'])
def search():
    query = request.args.get('searchQuery', '').lower()
    matching_files = []
    for _, dir_path in EPUBS_DIR.items():
        all_files = [f for f in os.listdir(dir_path) if f.lower().endswith('.epub')]
        matching_files += [f for f in all_files if query in f.lower()]
    
    # Render the results as HTML
    results_html = "".join([f'<li><a href="#" onclick="loadEpubInBibi(\'/reader/bookshelf/{file}\'); return false;">{file}</a></li>' for file in matching_files])
    return results_html



@app.route('/reader/bibi/<path:subpath>')
def serve_bibi_assets(subpath):
    # This will serve all of Bibi's assets, such as JavaScript, CSS, etc.
    return send_from_directory('./reader/bibi', subpath)




@app.route('/reader/bookshelf/<filename>')
def serve_epub(filename):
    return send_from_directory('./reader/bookshelf', filename)




@app.route('/reader')
def serve_bibi_reader():
    book_path = request.args.get('book')
    # You might want to do some checks on `book_path` for security reasons.
    return send_from_directory('./reader/bibi', 'index.html')

@app.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(app.root_path, './favicon.ico'),
                               'favicon.ico', mimetype='image/vnd.microsoft.icon')

if __name__ == "__main__":
    app.run(debug=True)