import React from "react";
import "./FilteredTracks.css"; // CSS dosyasını dahil et

const FilteredTracks = ({ results, addToPlaylist }) => {
  return (
    <div className="filtered-tracks-container">
      {results.length > 0 ? (
        <div>
          <h2 className="results-title">Sonuçlar:</h2>
          <ul className="track-list">
            {results.map((item, index) => (
              <li key={index} className="track-item">
                <div className="track-details">
                  <p className="track-name">{item.name}</p>
                  {item.embed_url && (
                    <iframe
                      src={item.embed_url}
                      width="280"
                      height="80"
                      frameBorder="0"
                      allow="autoplay; encrypted-media"
                      className="track-iframe"
                    ></iframe>
                  )}
                </div>
                <button
                  onClick={() => addToPlaylist(item)}
                  className="add-to-playlist-btn"
                >
                  Playlist'e Ekle
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="no-results">Filtreleme sonucunda şarkı bulunamadı.</p>
      )}
    </div>
  );
};

export default FilteredTracks;
