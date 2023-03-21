import React, { Fragment, lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/autoplay";
import Banner from "components/banner/Banner";
import Main from "components/layout/Main";
const HomePage = lazy(() => import("pages/HomePage"));
const MovieDetailPage = lazy(() => import("pages/MovieDetailPage"));
const MoviePage = lazy(() => import("pages/MoviePage"));
const App = () => {
  return (
    <Fragment>
      <Suspense fallback={<></>}>
        <Routes>
          <Route element={<Main></Main>}>
            <Route
              path="/"
              element={
                <>
                  <Banner></Banner>
                  <HomePage></HomePage>
                </>
              }
            ></Route>
            <Route path="/movies" element={<MoviePage></MoviePage>}></Route>
            <Route
              path="/movie/:movieId"
              element={<MovieDetailPage></MovieDetailPage>}
            ></Route>
          </Route>
        </Routes>
      </Suspense>
    </Fragment>
  );
};

export default App;
