from flask import Flask, request, jsonify
import pandas as pd
import requests
import base64
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

# 🎵 Spotify API Bilgileri
CLIENT_ID = "dd3944f5c5a94e628abe0d5de46e8f50"
CLIENT_SECRET = "39c4d17d8c1645479dfd7710ef455650"
TOKEN_URL = "https://accounts.spotify.com/api/token"
SEARCH_URL = "https://api.spotify.com/v1/search"

# 📌 CSV Dosyasını Yükle ve Küçük Harfe Çevir
def load_data():
    try:
        data = pd.read_csv("dataset1.csv", sep=",")
        data.columns = data.columns.str.lower()  # Sütun adlarını küçük harfe çevir
        print("Veri setindeki sütunlar:", data.columns.tolist())  
        print("İlk 5 satır:\n", data.head())  
        print("Mevcut türler:", data['track_genre'].unique()[:10])  # İlk 10 türü yazdır
        return data
    except Exception as e:
        print(f"Veri yüklenirken hata oluştu: {e}")
        return None

# 🎫 Spotify Token Alma
def get_access_token():
    auth_str = f"{CLIENT_ID}:{CLIENT_SECRET}"
    b64_auth_str = base64.b64encode(auth_str.encode()).decode()
    headers = {"Authorization": f"Basic {b64_auth_str}"}
    data = {"grant_type": "client_credentials"}

    response = requests.post(TOKEN_URL, headers=headers, data=data)
    if response.status_code == 200:
        return response.json().get("access_token")
    else:
        print("Access token alınamadı:", response.json())
        return None

# 🔍 Spotify'da Şarkı Arama
def get_spotify_link(query, access_token):
    headers = {"Authorization": f"Bearer {access_token}"}
    params = {"q": query, "type": "track", "limit": 1}
    response = requests.get(SEARCH_URL, headers=headers, params=params)

    if response.status_code == 200:
        results = response.json()
        if results.get("tracks", {}).get("items"):
            track = results["tracks"]["items"][0]
            return {
                "spotify_url": track["external_urls"]["spotify"],
                "embed_url": f"https://open.spotify.com/embed/track/{track['id']}"
            }
    return None

# 🌍 CORS Yanıtlarını Yönet
@app.after_request
def after_request(response):
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
    return response

# 🎧 Şarkı Arama API'si
@app.route('/api/search', methods=['GET', 'POST', 'OPTIONS'])
def search():
    if request.method == 'OPTIONS':
        return jsonify({"message": "CORS preflight request successful"}), 200

    data = load_data()
    if data is None:
        return jsonify({"message": "Veri yüklenemedi. Lütfen CSV dosyanızı kontrol edin."}), 400

    # 🟢 GET ve POST Yöntemleri İçin Parametreleri Al
    if request.method == 'GET':
        artist = request.args.get('artist', "")
        album = request.args.get('album', "")
        genre = request.args.get('genre', "")
    elif request.method == 'POST':
        artist = request.json.get('artist', "")
        album = request.json.get('album', "")
        genre = request.json.get('genre', "")

    # 🛠 Filtreleme
    filtered_data = data
    if artist:
        filtered_data = filtered_data[filtered_data['artists'].str.contains(artist, case=False, na=False)]
    if album:
        filtered_data = filtered_data[filtered_data['album_name'].str.contains(album, case=False, na=False)]
    if genre:
        filtered_data = filtered_data[filtered_data['track_genre'].str.contains(genre, case=False, na=False)]

    # 🔍 Eğer Hiç Şarkı Bulunmazsa
    if filtered_data.empty:
        return jsonify({"message": "Eşleşen şarkı bulunamadı!"}), 404

    # 🔥 Hız İçin İlk 5 Sonucu Al
    filtered_data = filtered_data.head(5)

    # 🎫 Spotify Token Al
    access_token = get_access_token()
    if not access_token:
        return jsonify({"message": "Spotify token alınamadı. Lütfen API bilgilerinizi kontrol edin."}), 500

    # 📜 Sonuçları Döndür
    results = []
    for _, row in filtered_data.iterrows():
        query = f"{row['track_name']} {row['artists']}"
        spotify_link = get_spotify_link(query, access_token)
        results.append({
            "track_name": row['track_name'],
            "artists": row['artists'],
            "album_name": row['album_name'],
            "track_genre": row['track_genre'],
            "spotify_url": spotify_link["spotify_url"] if spotify_link else None,
            "embed_url": spotify_link["embed_url"] if spotify_link else None
        })

    return jsonify(results), 200

# 🚀 Flask Uygulamasını Başlat
if __name__ == '__main__':
    app.run(debug=True)
