import React from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { fetcher, tmdbAPI } from "configAPI";
import { Swiper } from "swiper/react";
import { SwiperSlide } from "swiper/react";
import MovieCard from "components/movie/MovieCard";

const MovieDetailPage = () => {
  const { movieId } = useParams();
  const { data } = useSWR(tmdbAPI.getMovieDetail(movieId), fetcher);
  console.log(data);
  if (!data) return null;
  const { backdrop_path, title, genres, overview, vote_average, release_date } =
    data;
  return (
    <div className="py-10">
      <div className="w-full h-screen  mb-10">
        <img
          className="w-full h-full object-cover"
          src={tmdbAPI.imageOriginal(backdrop_path)}
          alt=""
        />
      </div>
      <div className="flex justify-center items-center gap-x-3">
        <h1 className="text-5xl font-bold">{title}</h1>
        <span>( {vote_average.toFixed(1)}⭐)</span>
      </div>
      <p className="text-center mt-1 mb-5">
        {new Date(release_date).getFullYear()}
      </p>
      {genres.length > 0 && (
        <div className="flex items-center justify-center gap-x-5 mb-10">
          {genres.map((item) => (
            <span
              className="py-2 px-4 border border-primary text-primary rounded-lg"
              key={item.id}
            >
              {item.name}
            </span>
          ))}
        </div>
      )}
      <p className="text-center text-lg leading-relaxed max-w-[600px] mx-auto mb-10">
        {overview}
      </p>
      <MovieMeta type="credits"></MovieMeta>
      <MovieMeta type="videos"></MovieMeta>
      <MovieMeta type="similar"></MovieMeta>
    </div>
  );
};
const MovieMeta = ({ type = "videos" }) => {
  const { movieId } = useParams();
  const { data } = useSWR(tmdbAPI.getMovieMeta(movieId, type), fetcher);
  if (!data) return null;
  switch (type) {
    case "credits": {
      const { cast } = data;
      if (!cast || cast.length <= 0) return null;
      return (
        <div className="py-10">
          <h2 className="text-3xl text-center mb-10">Casts</h2>
          <div className="cast-list grid grid-cols-4 gap-x-5 max-w-[800px] mx-auto">
            {cast.slice(0, 4).map((item) => (
              <div className="cast-item" key={item.id}>
                <img
                  src={tmdbAPI.imageOriginal(item.profile_path)}
                  className="w-full h-[200px] object-cover rounded-lg mb-3"
                  alt=""
                />
                <h3 className="text-lg">{item.name}</h3>
              </div>
            ))}
          </div>
        </div>
      );
    }
    case "videos": {
      const { results } = data;
      if (!results || results.length <= 0) return null;
      const filterType = results.find((item) => item.type === "Trailer");
      if (!filterType) return null;
      const { key, name } = filterType;
      return (
        <div className="py-10">
          <h2 className="text-3xl text-center mb-10">Trailer</h2>
          <div className="max-w-[800px] h-[400px] mx-auto">
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${key}`}
              title={`${name}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      );
    }
    case "similar": {
      const { results } = data;
      if (!results || results.length <= 0) return null;
      return (
        <div className="py-10">
          <h2 className="text-3xl text-center mb-10">Similar Movies</h2>
          <div className="movie-list page-container">
            <Swiper
              grabCursor={"true"}
              spaceBetween={20}
              slidesPerView={"auto"}
            >
              {results.length > 0 &&
                results.map((item) => (
                  <SwiperSlide key={item.id}>
                    <MovieCard item={item}></MovieCard>
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
        </div>
      );
    }
    default:
      return null;
  }
};
export default MovieDetailPage;
