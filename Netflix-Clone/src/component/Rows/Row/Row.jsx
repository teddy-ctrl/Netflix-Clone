// import React, { useEffect, useState } from 'react'
// import axios from '../../../utils/axios';

// const Row = ({title, fetchUrl, isLargeRow}) => {
//   const [movies, setMovie] = useState('');
//   const [trailerUrl, setTrailerUrl] = useState('');

//   const base_url = 'https://image.tmdb.org/t/p/original';

//   useEffect(() => {
//     (async () => {
//       try {
//         console.log(fetchUrl)
//         const request = await axios.get(`http://localhost:4000/api/${fetchUrl}`);
//         console.log(request)
//         setMovie(request.data.results);
//       } catch (error) {
//         console.log('error:', error)
//       }
//     }) ()
//   }, [fetchUrl]);

//   const handleClick = (movie) => {
//     if (trailerUrl) {
//       setTrailerUrl('')
//     } else {
//       movieTrailer(movie?.title || movie?.name || movie?.original_name)
//       .than((url) => {
//         console.log(url)
//         const urlParams = new URLSearchParams(new URL(url).search)
//         console.log(urlParams)
//         console.log(urlParams.get('v'))
//         setTrailerUrl(urlParams.get('v'))
//       })
//     }
//   }

//   const opts = {
//     height: '390',
//     width: '640',
//     playerVars: {
//       autoplay: 1
//     }
//   }
//   return (
//     <>
//       <div className='row'>
//         <h1>{title}</h1>
//         <div className='row_poster'>
//           {movie?.map((movie, index) => (
//             <img 
//               onClick = {() => handleClick(movie)} 
//               key = {index} src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} alt={movie.name} className={`row_poster ${isLargeRow && 'row_posterLarge'}`} />
//           ))}
//         </div>
//           <div style={{padding: '40px'}}>
//             {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
//           </div>
//       </div>
//     </>
//   )
// }

// export default Row


import React, { useEffect, useState } from 'react';
import axios from '../../../utils/axios';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';
import './Row.css';

const Row = ({ title, fetchUrl, isLargeRow }) => {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState('');

  const base_url = 'https://image.tmdb.org/t/p/original';

  useEffect(() => {
    async function fetchData() {
      try {
        const request = await axios.get(fetchUrl);
        setMovies(request.data.results);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    }
    fetchData();
  }, [fetchUrl]);

  const handleClick = async (movie) => {
    if (trailerUrl) {
      setTrailerUrl('');
    } else {
      try {
        const url = await movieTrailer(movie?.title || movie?.name || movie?.original_name || '');
        const urlParams = new URLSearchParams(new URL(url).search);
        setTrailerUrl(urlParams.get('v'));
      } catch (error) {
        console.error('Error fetching trailer:', error);
      }
    }
  };

  const opts = {
    height: '461px',
    width: '800px',
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <div className="app-container">
      <div className={`content ${trailerUrl ? 'content--blurred' : ''}`}>
        <div className="row">
          <h1 className="title">{title}</h1>
          <div className="row_posters">
            {movies?.map((movie) => (
              movie.poster_path && (
                <img
                  onClick={() => handleClick(movie)}
                  key={movie.id}
                  src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                  alt={movie.title || movie.name || movie.original_name}
                  className={`row_poster ${isLargeRow ? 'row_posterLarge' : ''}`}
                />
              )
            ))}
          </div>
        </div>
      </div>
      {trailerUrl && (
        <div className="trailer-modal" onClick={() => setTrailerUrl('')}>
          <div className="trailer-modal-content">
            <YouTube videoId={trailerUrl} opts={opts} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Row;