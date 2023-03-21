import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { fetcher, tmdbAPI } from "configAPI";
import MovieCard, { MovieCardSkeleton } from "components/movie/MovieCard";
import useDebounce from "hooks/useDebounce";
import ReactPaginate from "react-paginate";
import { v4 } from "uuid";
const itemsPerPage = 20;
const MoviePage = () => {
  const [nextPage, setNextPage] = useState(1);
  const [query, setQuery] = useState("");
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [url, setURL] = useState(tmdbAPI.getMovieList("popular"));
  const { data, error } = useSWR(url, fetcher);
  const loading = !data && !error;
  const queryDebounce = useDebounce(query, 500);
  const movies = data?.results || [];
  useEffect(() => {
    if (queryDebounce) {
      setURL(tmdbAPI.searchMovie(queryDebounce, nextPage));
    } else {
      setURL(tmdbAPI.getMovieList("popular", nextPage));
    }
  }, [queryDebounce, nextPage]);
  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };
  useEffect(() => {
    if (!data || !data.total_results) return;
    setPageCount(Math.ceil(data.total_results / itemsPerPage));
  }, [data, itemOffset]);
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.total_results;
    setItemOffset(newOffset);
    setNextPage(event.selected + 1);
  };
  return (
    <div className="py-10 page-container">
      <div className="flex mb-10">
        <div className="flex-1 ">
          <input
            className="w-full p-4 bg-slate-800 text-white border-0 outline-none"
            type="text"
            placeholder="Type here to search..."
            value={query}
            onChange={handleInputChange}
          />
        </div>
        <button className="p-4 bg-primary text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </button>
      </div>
      {loading && (
        <div className="grid grid-cols-4 gap-10">
          {new Array(itemsPerPage).fill(0).map(() => (
            <MovieCardSkeleton key={v4()}></MovieCardSkeleton>
          ))}
        </div>
      )}
      {!loading && (
        <div className="grid grid-cols-4 gap-10">
          {movies.length > 0 &&
            movies.map((item) => (
              <MovieCard key={item.id} item={item}></MovieCard>
            ))}
        </div>
      )}
      <div className="mt-10">
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          className="pagination"
        />
      </div>
    </div>
  );
};

export default MoviePage;
