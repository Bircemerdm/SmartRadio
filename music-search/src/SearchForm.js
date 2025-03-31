import React, { useState } from "react";
import axios from "axios";
import "./SearchForm.css"; // CSS dosyasını dahil et

const SearchForm = ({ setResults }) => {
    const [artist, setArtist] = useState("");
    const [album, setAlbum] = useState("");
    const [genre, setGenre] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSearch = async (event) => {
        event.preventDefault(); // Formun varsayılan davranışını engelle
        setLoading(true); // Yükleniyor durumunu başlat
        setError(""); // Önceki hataları temizle

        try {
            // API isteği
            const response = await axios.post(
                "http://127.0.0.1:5000/api/search",
                { artist, album, genre },
                { headers: { "Content-Type": "application/json" } }
            );

            // Arama sonuçlarını üst bileşene ilet
            setResults(response.data);
        } catch (error) {
            setError("Bir hata oluştu, lütfen tekrar deneyin.");
        } finally {
            setLoading(false); // Yükleniyor durumu bitti
        }
    };

    return (
        <div className="search-form-container">
            <h2>Şarkı Arama</h2>

            {/* Hata mesajı */}
            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSearch}>
                <div className="form-group">
                    <label htmlFor="artist">Sanatçı</label>
                    <input
                        type="text"
                        id="artist"
                        placeholder="Sanatçı adı girin"
                        value={artist}
                        onChange={(e) => setArtist(e.target.value)}

                    />
                </div>

                <div className="form-group">
                    <label htmlFor="album">Albüm</label>
                    <input
                        type="text"
                        id="album"
                        placeholder="Albüm adı girin"
                        value={album}
                        onChange={(e) => setAlbum(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="genre">Tür</label>
                    <input
                        type="text"
                        id="genre"
                        placeholder="Tür girin"
                        value={genre}
                        onChange={(e) => setGenre(e.target.value)}
                    />
                </div>

                <div className="submit-container">
                    <button type="submit" disabled={loading}>
                        {loading ? "Yükleniyor..." : "Ara"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SearchForm;
