import React, { useState } from "react";
import SearchForm from "./SearchForm";
import FilteredTracks from "./FilteredTracks";
import Playlist from "./Playlist";

const App = () => {
  const [playlist, setPlaylist] = useState([]); // Playlist durumu
  const [results, setResults] = useState([]); // Arama sonuçları

  // Playlist'e şarkı ekleme fonksiyonu
  const addToPlaylist = (track) => {
    setPlaylist((prevPlaylist) => [
      ...prevPlaylist,
      {
        name: track.name,
        embed_url: track.embed_url,
      },
    ]);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center", color: "#333" }}>Şarkı Arama</h1>

      {/* Arama Formu */}
      <SearchForm setResults={setResults} />

      {/* Filtrelenmiş şarkıları göster */}
      <FilteredTracks results={results} addToPlaylist={addToPlaylist} />

      {/* Playlist */}
      <Playlist playlist={playlist} />
    </div>
  );
};

export default App;







// import React, { useState } from "react";
// import axios from "axios";

// const SearchForm = () => {
//   const [artist, setArtist] = useState(""); // Artist ismi
//   const [album, setAlbum] = useState("");  // Albüm ismi
//   const [genre, setGenre] = useState("");  // Tür
//   const [results, setResults] = useState([]); // Arama sonuçları
//   const [loading, setLoading] = useState(false); // Yükleniyor durumu
//   const [error, setError] = useState(""); // Hata durumu
//   const [requestMethod, setRequestMethod] = useState("POST"); // GET veya POST seçimi

//   // Arama işlemi için form submit handler
//   const handleSearch = async (event) => {
//     event.preventDefault(); // Formun varsayılan davranışını engelle
//     setLoading(true); // Yükleniyor durumu başlat
//     setError(""); // Önceki hataları temizle
//     try {
//       let response;
//       if (requestMethod === "POST") {
//         // POST isteği gönder
//         response = await axios.post(
//           "http://127.0.0.1:5000/api/search",
//           {
//             artist,
//             album,
//             genre,
//           },
//           {
//             headers: {
//               "Content-Type": "application/json",
//             },
//           }
//         );
//       } else {
//         // GET isteği gönder
//         const queryParams = new URLSearchParams({
//           artist,
//           album,
//           genre,
//         }).toString();
//         response = await axios.get(`http://127.0.0.1:5000/api/search?${queryParams}`);
//       }

//       // Gelen yanıtı sonuçlara ata
//       setResults(response.data);
//     } catch (error) {
//       setError("Bir hata oluştu, lütfen tekrar deneyin."); // Hata durumunda kullanıcıya mesaj göster
//       console.error("Bir hata oluştu:", error); // Hata durumunda konsola yazdır
//     } finally {
//       setLoading(false); // Yükleniyor durumunu sonlandır
//     }
//   };

//   return (
//     <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
//       <h1 style={{ textAlign: "center", color: "#333" }}>Şarkı Arama</h1>
//       <form onSubmit={handleSearch} style={{ marginBottom: "20px" }}>
//         <div style={{ marginBottom: "10px" }}>
//           <label>
//             <strong>Artist:</strong>
//           </label>
//           <input
//             type="text"
//             name="artist"
//             value={artist}
//             onChange={(e) => setArtist(e.target.value)}
//             style={{
//               marginLeft: "10px",
//               padding: "5px",
//               borderRadius: "4px",
//               border: "1px solid #ccc",
//               width: "200px",
//             }}
//           />
//         </div>
//         <div style={{ marginBottom: "10px" }}>
//           <label>
//             <strong>Album:</strong>
//           </label>
//           <input
//             type="text"
//             name="album"
//             value={album}
//             onChange={(e) => setAlbum(e.target.value)}
//             style={{
//               marginLeft: "10px",
//               padding: "5px",
//               borderRadius: "4px",
//               border: "1px solid #ccc",
//               width: "200px",
//             }}
//           />
//         </div>
//         <div style={{ marginBottom: "10px" }}>
//           <label>
//             <strong>Genre:</strong>
//           </label>
//           <input
//             type="text"
//             name="genre"
//             value={genre}
//             onChange={(e) => setGenre(e.target.value)}
//             style={{
//               marginLeft: "10px",
//               padding: "5px",
//               borderRadius: "4px",
//               border: "1px solid #ccc",
//               width: "200px",
//             }}
//           />
//         </div>
//         <div style={{ marginBottom: "10px" }}>
//           <label>
//             <strong>Request Method:</strong>
//           </label>
//           <select
//             value={requestMethod}
//             onChange={(e) => setRequestMethod(e.target.value)}
//             style={{
//               marginLeft: "10px",
//               padding: "5px",
//               borderRadius: "4px",
//               border: "1px solid #ccc",
//             }}
//           >
//             <option value="POST">POST</option>
//             <option value="GET">GET</option>
//           </select>
//         </div>
//         <button
//           type="submit"
//           style={{
//             padding: "10px 20px",
//             borderRadius: "4px",
//             backgroundColor: "#4CAF50",
//             color: "white",
//             border: "none",
//             cursor: "pointer",
//           }}
//           disabled={loading} // Yükleniyorsa butonu devre dışı bırak
//         >
//           {loading ? "Yükleniyor..." : "Search"} {/* Yükleniyor mesajı */}
//         </button>
//       </form>

//       {/* Hata mesajı */}
//       {error && (
//         <p style={{ textAlign: "center", color: "red" }}>
//           {error}
//         </p>
//       )}

//       {/* Arama sonuçlarını göster */}
//       {results.length > 0 && (
//         <div>
//           <h2 style={{ textAlign: "center", color: "#555" }}>Sonuçlar:</h2>
//           <ul style={{ listStyleType: "none", paddingLeft: "0" }}>
//             {results.map((item, index) => (
//               <li
//                 key={index}
//                 style={{
//                   marginBottom: "10px",
//                   padding: "10px",
//                   border: "1px solid #ddd",
//                   borderRadius: "4px",
//                   backgroundColor: "#f9f9f9",
//                 }}
//               >
//                 <strong>Şarkı:</strong> {item.track_name} <br />
//                 <strong>Sanatçı:</strong> {item.artists} <br />
//                 <strong>Albüm:</strong> {item.album_name} <br />
//                 <strong>Tür:</strong> {item.track_genre} <br />
//                 {/* Spotify iframe ekleme */}
//                 {item.embed_url && (
//                   <div style={{ marginTop: "10px" }}>
//                     <iframe
//                       src={item.embed_url}
//                       width="300"
//                       height="80"
//                       frameBorder="0"
//                       allow="autoplay; encrypted-media"
//                       style={{ width: "100%", height: "80px", borderRadius: "4px" }}
//                     ></iframe>
//                   </div>
//                 )}
//                 {/* Spotify'dan URL alıp, embed yapıyoruz */}
//                 {item.track_url && (
//                   <div style={{ marginTop: "10px" }}>
//                     <strong>Dinleyin:</strong>
//                     <a
//                       href={item.track_url}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       style={{ color: "#1DB954" }}
//                     >
//                       Spotify'da Dinleyin
//                     </a>
//                   </div>
//                 )}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}

//       {/* Sonuç bulunamadı mesajı */}
//       {results.length === 0 && !loading && !error && (
//         <p style={{ textAlign: "center", color: "#777" }}>
//           Aramanıza uygun sonuç bulunamadı.
//         </p>
//       )}
//     </div>
//   );
// };

// export default SearchForm;
