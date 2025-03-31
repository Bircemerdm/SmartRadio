import React from "react";

const SearchResults = ({ results, loading, error, addToPlaylist }) => {
    return (
        <div>
            {/* Arama sonuçlarını göster */}
            {results.length > 0 && (
                <div>
                    <h2 style={{ textAlign: "center", color: "#555", fontSize: "1.2em", marginBottom: "10px" }}>Sonuçlar:</h2>
                    <ul
                        style={{
                            listStyleType: "none",
                            paddingLeft: "0",
                            margin: "0",
                            width: "100%",
                            maxWidth: "500px",
                            height: "auto",
                            overflowY: "auto",
                        }}
                    >
                        {results.map((item, index) => (
                            <li
                                style={{
                                    marginBottom: "8px",
                                    padding: "8px",
                                    border: "1px solid #ddd",
                                    borderRadius: "4px",
                                    backgroundColor: "#f9f9f9",
                                    fontSize: "0.9em",
                                    lineHeight: "1.4",
                                }}
                            >
                                {/* Spotify iframe embed */}
                                {item.embed_url && (
                                    <div style={{ marginTop: "8px" }}>
                                        <iframe
                                            src={item.embed_url}
                                            width="280"
                                            height="80"
                                            frameBorder="0"
                                            allow="autoplay; encrypted-media"
                                            style={{ width: "100%", height: "90px", borderRadius: "4px" }}
                                        ></iframe>
                                    </div>
                                )}
                                <button
                                    onClick={() => addToPlaylist(item)} // Playlist'e ekle
                                    style={{
                                        marginTop: "10px",
                                        padding: "5px 15px",
                                        backgroundColor: "#1DB954",
                                        color: "white",
                                        border: "none",
                                        borderRadius: "4px",
                                        cursor: "pointer",
                                    }}
                                >
                                    Playlist'e Ekle
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Sonuç bulunamadı mesajı */}
            {results.length === 0 && !loading && !error && (
                <p style={{ textAlign: "center", color: "#777" }}>
                    Aramanıza uygun sonuç bulunamadı.
                </p>
            )}
        </div>
    );
};

export default SearchResults;
