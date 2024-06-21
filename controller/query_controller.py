from flask import Flask, request, jsonify
from flask_cors import CORS
import service.query_manager as manager
from bson.json_util import dumps

app = Flask(__name__)
CORS(app)


@app.route("/query/find_song_by_name", methods=['POST'])
def find_by_name():
    try:
        data = request.get_json()

        if not data or "song_name" not in data:
            return jsonify({"error": "Invalid request: 'song_name' required"}), 400

        song_name = data["song_name"]
        print(data["song_name"])
    except:
        return jsonify({"error": "Invalid request: JSON required"}), 400

    result = manager.find_song_by_name(song_name)
    print(result)

    return app.response_class(response=dumps(result), mimetype='application/json'), 200


# HomePage query
@app.route("/query/find_popular_songs", methods=['POST'])
def find_popular_songs():
    try:
        data = request.get_json()
        filtro_ordinamento = data["filtro_ordinamento"]

        if filtro_ordinamento not in ["popularity", "name", "artist_id", "highest_position"]:
            raise Exception("Filtro di ordinamento non valido")
    except:
        return jsonify({"error": "Invalid request"}), 400

    result = manager.find_popular_songs(filtro_ordinamento)

    return app.response_class(response=dumps(result), mimetype='application/json'), 200


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5010, debug=True)
