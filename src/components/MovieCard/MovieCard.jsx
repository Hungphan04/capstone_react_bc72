import React, { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import YouTube from "react-youtube";

export default function MovieCard({ movie }) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };
  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      autoplay: 1,
    },
  };
  const getVideoId = (url) => {
    const match = url.match(/(?:https?:\/\/(?:www\.)?youtube\.com\/(?:[^\/\n\s]+\/[^\n\s]+\/?|(?:v|e(?:mbed)?)\/|\S+?[?&]v=)|(?:https?:\/\/(?:www\.)?youtu\.be\/))([a-zA-Z0-9_-]{11})/);
    return match ? match[1] : null;
  };

  return (
    <div className="max-w-sm mx-auto bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <Link to={`/movie/${movie.maPhim}`}>
        <img
          className="rounded-t-lg w-full h-60 sm:h-72 md:h-80 object-cover"
          src={movie.hinhAnh}
          alt={movie.tenPhim}
        />
      </Link>
      <div className="p-5">
        <h5 className="mb-4 text-lg sm:text-xl md:text-2xl text-center font-semibold tracking-tight text-gray-900 dark:text-white truncate">
          {movie.tenPhim}
        </h5>
        <div className="flex flex-wrap justify-between space-y-4 md:space-y-0 px-8">
          <Link
            to={`/movie/${movie.maPhim}`}
            className="inline-flex items-center w-full md:w-auto justify-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Read more
            <svg
              className="rtl:rotate-180 w-3.5 h-3.5 ml-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </Link>

          <button
            onClick={() => setIsOpen(true)} 
            className="inline-flex items-center w-full md:w-auto justify-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Xem trailer
            <svg
              className="rtl:rotate-180 w-3.5 h-3.5 ml-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </button>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={() => setIsOpen(false)}
            style={customStyles}
            contentLabel="Movie Trailer"
          >
            {movie.trailer && (
              <YouTube
                videoId={getVideoId(movie.trailer)}
                opts={opts}
              />
            )}
          </Modal>
        </div>
      </div>
    </div>
  );
}
