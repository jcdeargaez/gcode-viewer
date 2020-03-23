from flask import Flask, render_template, request, jsonify
from io import TextIOWrapper

from gcode import reader

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')


@app.route("/upload", methods=['POST'])
def upload():
    if 'file' not in request.files:
        return "No file!"
    f = request.files['file']
    stats, layers = reader.read(TextIOWrapper(f, 'utf-8'), f.filename)
    response = jsonify({
        'stats': stats,
        'layers': layers,
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)
