from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import service.query_manager as manager
from bson.json_util import dumps

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route("/insert", methods=['POST'])
def insert():
    # prendi dati dalla request
    try:
        data = request.get_json()

        if not data or "name" not in data:
            return jsonify({"error": "Invalid request: 'song_name' required"}), 400

    except:
        return jsonify({"error": "Invalid request: JSON required"}), 400

    # chiama manager per scrivere nel db
    manager.add_to_db(data)
    return app.response_class(mimetype='application/json'), 200



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


@app.route("/query/find_most_followed_artists", methods=['POST'])
def find_most_streamed_artists():
    result = manager.find_top_50_artists()
    print(result[0])
    return app.response_class(response=dumps(result), mimetype='application/json'), 200


@app.route("/query/find_most_streamed_songs", methods=['POST'])
def find_most_streamd_songs():
    result = manager.find_most_streamed_song()
    return app.response_class(response=dumps(result), mimetype='application/json'), 200


@app.route("/query/looking_for", methods=['POST'])
@cross_origin()
def look_for_query():
    """
    {
        "nome_artista": "Drake",
         "num_streams": 8000,
         "filtro": "gt"
    }
    :return:
    """
    try:
        data = request.get_json()
    except:
        return jsonify({"error": "Invalid request"}), 400

    nome_artista = data["nome_artista"]
    num_streams = data["num_streams"]
    if type(num_streams) == str:
        num_streams = int(num_streams)
    filtro = data["filtro"]

    result = manager.looking_for_query(filtro, nome_artista, num_streams)
    print(result)
    return app.response_class(response=dumps(result), mimetype='application/json'), 200


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5010, debug=True)
