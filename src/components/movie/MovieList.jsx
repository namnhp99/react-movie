import React from "react";
import { SwiperSlide, Swiper } from "swiper/react";
import MovieCard, { MovieCardSkeleton } from "components/movie/MovieCard";
import useSWR from "swr";
import { fetcher, tmdbAPI } from "configAPI";
import PropTypes from "prop-types";
import { withErrorBoundary } from "react-error-boundary";

const MovieList = ({ type }) => {
  const { data, error } = useSWR(tmdbAPI.getMovieList(type), fetcher);
  const isLoading = !data && !error;
  const movies = data?.results || [];
  return (
    <div className="movie-list">
      {isLoading && (
        <Swiper grabCursor={"true"} spaceBetween={20} slidesPerView={"auto"}>
          <SwiperSlide>
            <MovieCardSkeleton></MovieCardSkeleton>
          </SwiperSlide>
          <SwiperSlide>
            <MovieCardSkeleton></MovieCardSkeleton>
          </SwiperSlide>
          <SwiperSlide>
            <MovieCardSkeleton></MovieCardSkeleton>
          </SwiperSlide>
          <SwiperSlide>
            <MovieCardSkeleton></MovieCardSkeleton>
          </SwiperSlide>
        </Swiper>
      )}
      {!isLoading && (
        <Swiper grabCursor={"true"} spaceBetween={20} slidesPerView={"auto"}>
          {movies.length > 0 &&
            movies.map((item) => (
              <SwiperSlide key={item.id}>
                <MovieCard item={item}></MovieCard>
              </SwiperSlide>
            ))}
        </Swiper>
      )}
    </div>
  );
};
MovieList.propTypes = {
  type: PropTypes.string.isRequired,
};
const FallbackComponent = () => {
  return (
    <p className="text-red-500 bg-red-50  ">
      Something went wrong in this component
    </p>
  );
};
export default withErrorBoundary(MovieList, {
  FallbackComponent,
});
