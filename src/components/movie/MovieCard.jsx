import React from "react";
import { useNavigate } from "react-router-dom";
import { tmdbAPI } from "configAPI";
import Button from "components/button/Button";
import PropTypes from "prop-types";
import { withErrorBoundary } from "react-error-boundary";
import LoadingSkeleton from "components/loading/LoadingSkeleton";
const MovieCard = ({ item }) => {
  const { title, vote_average, release_date, poster_path, id } = item;
  const navigate = useNavigate();
  return (
    <div className="movie-card flex flex-col rounded-lg p-3 bg-slate-800 text-white h-full select-none">
      <img
        src={tmdbAPI.imageOriginal(poster_path)}
        alt=""
        className="w-full h-[250px] object-center rounded-lg mb-5"
      />
      <div className="flex flex-col flex-1">
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <div className="flex items-center justify-between text-sm opacity-50 mb-10">
          <span>{new Date(release_date).getFullYear()}</span>
          <span>{vote_average}</span>
        </div>
        <Button onClick={() => navigate(`/movie/${id}`)} bgColor="secondary">
          Watch now
        </Button>
      </div>
    </div>
  );
};
MovieCard.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string,
    vote_average: PropTypes.number,
    release_date: PropTypes.string,
    poster_path: PropTypes.string,
    id: PropTypes.number,
  }),
};
const FallbackComponent = () => {
  return (
    <p className="text-red-500 bg-red-50  ">
      Something went wrong in this component
    </p>
  );
};
export default withErrorBoundary(MovieCard, {
  FallbackComponent,
});
export const MovieCardSkeleton = () => {
  return (
    <div className="movie-card flex flex-col rounded-lg p-3 bg-slate-800 text-white h-full select-none">
      <LoadingSkeleton className="w-full h-[250px] rounded-lg mb-5"></LoadingSkeleton>
      <div className="flex flex-col flex-1">
        <h3 className="text-xl font-bold mb-3">
          <LoadingSkeleton className="w-full h-[20px]"></LoadingSkeleton>
        </h3>
        <div className="flex items-center justify-between text-sm opacity-50 mb-10">
          <span>
            <LoadingSkeleton className="w-[50px] h-[10px]"></LoadingSkeleton>
          </span>
          <span>
            <LoadingSkeleton className="w-[30px] h-[10px]"></LoadingSkeleton>
          </span>
        </div>
        <LoadingSkeleton className="w-full h-[45px] rounded-lg"></LoadingSkeleton>
      </div>
    </div>
  );
};
