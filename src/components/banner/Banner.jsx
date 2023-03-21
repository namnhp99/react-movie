import React from "react";
import useSWR from "swr";
import { SwiperSlide, Swiper } from "swiper/react";
import { Navigation, Autoplay } from "swiper";
import { fetcher, tmdbAPI } from "configAPI";
import Button from "components/button/Button";
import { useNavigate } from "react-router-dom";
const Banner = () => {
  const { data } = useSWR(tmdbAPI.getMovieList("upcoming"), fetcher);
  const movies = data?.results || [];
  return (
    <section className="banner h-[800px] page-container mb-20 overflow-hidden">
      <Swiper
        modules={[Navigation, Autoplay]}
        grabCursor={"false"}
        slidesPerView={"auto"}
        loop={true}
        navigation
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
      >
        {movies.length > 0 &&
          movies.map((item) => (
            <SwiperSlide key={item.id}>
              <BannerItem item={item}></BannerItem>
            </SwiperSlide>
          ))}
      </Swiper>
    </section>
  );
};
const BannerItem = ({ item }) => {
  const navigate = useNavigate();
  const { title, poster_path, id } = item;
  const { data } = useSWR(tmdbAPI.getMovieDetail(id), fetcher);
  if (!data) return null;
  const { genres } = data;
  if (!genres || genres.length <= 0) return null;
  return (
    <div
      className=" rounded-lg w-full h-full relative cursor-pointer"
      onClick={() => navigate(`/movie/${id}`)}
    >
      <div className="overlay absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0.5)] rounded-lg"></div>
      <img
        src={tmdbAPI.imageOriginal(poster_path)}
        alt=""
        className="w-full h-full object-contain rounded-lg"
      />
      <div className="content text-white absolute left-5 bottom-5 w-full">
        <h2 className="text-3xl font-bold mb-5">{title}</h2>
        <div className="flex items-center gap-x-3 mb-8">
          {genres &&
            genres.length > 0 &&
            genres.map((item) => (
              <span
                key={item.id}
                className="border border-gray-300 px-4 py-2 rounded-lg"
              >
                {item.name}
              </span>
            ))}
        </div>
        <Button onClick={() => navigate(`/movie/${id}`)}>Watch</Button>
      </div>
    </div>
  );
};

export default Banner;
