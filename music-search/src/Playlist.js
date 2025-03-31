import React from "react";

const Playlist = ({ playlist }) => {
    return (
        <div>
            {playlist.length > 0 && (
                <div>
                    <h2>Playlist:</h2>
                    <ul>
                        {playlist.map((item, index) => (
                            <li key={index}>
                                <strong>{item.name}</strong>
                                <iframe
                                    src={item.embed_url}
                                    width="280"
                                    height="80"
                                    frameBorder="0"
                                    allow="autoplay; encrypted-media"
                                ></iframe>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Playlist;
