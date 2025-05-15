import React, { useEffect, useState, useRef } from 'react';
import axios from '../../../utils/axios'; 
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';
import './Row.css'; 

const Row = ({ title, fetchUrl, isLargeRow }) => {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState('');

  const base_url = 'https://image.tmdb.org/t/p/original';

  // Default aspect ratio based on your 1200x761 preferred size
  const PLAYER_ASPECT_RATIO = 761 / 1200;
  const PLAYER_MAX_WIDTH = 1200; // Max width you want the player to reach

  const [playerOpts, setPlayerOpts] = useState({
    height: '390', // Initial default, will be overridden
    width: '100%', // Player will take 100% width of its container
    playerVars: {
      autoplay: 1,
    },
  });

  const playerContainerRef = useRef(null); // Ref for the player's immediate container

  useEffect(() => {
    async function fetchData() {
      try {
        const request = await axios.get(fetchUrl);
        setMovies(request.data.results);
      } catch (error) {
        console.error(`Error fetching movies for ${title}:`, error);
      }
    }
    fetchData();
  }, [fetchUrl, title]);

  // Effect to calculate and update player dimensions for responsiveness
  useEffect(() => {
    const updatePlayerSize = () => {
      if (playerContainerRef.current) {
        // Get the width of the container that will hold the YouTube player
        const containerWidth = playerContainerRef.current.offsetWidth;
        
        // Calculate width, ensuring it doesn't exceed PLAYER_MAX_WIDTH
        const newWidth = Math.min(containerWidth, PLAYER_MAX_WIDTH);
        
        // Calculate height based on aspect ratio
        const newHeight = Math.round(newWidth * PLAYER_ASPECT_RATIO);

        setPlayerOpts(prevOpts => ({
          ...prevOpts,
          // The 'width' in opts for react-youtube can be '100%' 
          // if its direct wrapper controls the actual pixel width.
          // The height needs to be in pixels.
          height: String(newHeight), 
          // width: String(newWidth) // Alternatively, set pixel width here too
        }));
      }
    };

    // Call it when trailerUrl is set (modal becomes visible) and on resize
    if (trailerUrl) {
      updatePlayerSize(); // Initial calculation when modal opens
      window.addEventListener('resize', updatePlayerSize);
    }

    return () => {
      window.removeEventListener('resize', updatePlayerSize);
    };
  }, [trailerUrl, PLAYER_ASPECT_RATIO, PLAYER_MAX_WIDTH]); // Rerun if trailerUrl changes

  const handleClick = async (movie) => {
    if (trailerUrl) {
      setTrailerUrl('');
    } else {
      try {
        const movieTitle = movie?.title || movie?.name || movie?.original_name || '';
        if (!movieTitle) {
          console.log('No title available to search for trailer.');
          return;
        }
        const url = await movieTrailer(movieTitle);
        if (url) {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get('v'));
        } else {
          console.log(`No trailer found for "${movieTitle}"`);
          // Consider setting state to show a "No trailer found" message
        }
      } catch (error) {
        console.error('Error fetching trailer:', error);
        // Consider setting state to show an error message
      }
    }
  };

  const closePlayer = () => {
    setTrailerUrl('');
  };

  return (
    <div className="row-component-container"> {/* Changed from app-container to avoid potential global conflicts */}
      <div className={`content-area ${trailerUrl ? 'content--blurred' : ''}`}>
        <div className="row">
          <h1 className="title">{title}</h1>
          <div className="row_posters">
            {movies?.map((movie) => (
              // Ensure movie and necessary image path exist
              (movie && (isLargeRow ? movie.poster_path : movie.backdrop_path)) && (
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
        <div className="trailer-modal" onClick={closePlayer}>
          {/*
            Assign ref to the element that will directly contain the YouTube player
            or whose width dictates the player's width.
          */}
          <div 
            ref={playerContainerRef}
            className="trailer-modal-content" 
            onClick={(e) => e.stopPropagation()} // Prevent modal close on player click
          >
            {/* Optional: Add a close button explicitly */}
            <button className="close-trailer-button" onClick={closePlayer} aria-label="Close trailer">×</button>
            <YouTube 
              videoId={trailerUrl} 
              opts={playerOpts} 
              containerClassName="youtube-player-iframe-wrapper" // Class for the div react-youtube creates
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Row;