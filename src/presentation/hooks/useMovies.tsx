import {useEffect, useState} from 'react';
import {IMovieModel} from '../../core/models/movie.model';
import {moviesNowPlayingUseCase} from '../../core/use-cases/movies/now-playing.use-case';
import {movieDBFetcher} from '../../config/adapters/movieDB.adapter';
import {upcomingMoviesUseCase} from '../../core/use-cases/movies/upcoming.use-case';
import {topRatedMoviesUseCase} from '../../core/use-cases/movies/top-rated.use-case';
import {popularMoviesUseCase} from '../../core/use-cases/movies/popular.use-case';

let popularNumberPage = 1;

export const useMovies = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [nowPlaying, setNowPlaying] = useState<IMovieModel[]>([]);
  const [upComing, setUpComing] = useState<IMovieModel[]>([]);
  const [topRate, setTopRate] = useState<IMovieModel[]>([]);
  const [popular, setPopular] = useState<IMovieModel[]>([]);

  useEffect(() => {
    initialLoad();
  }, []);

  const initialLoad = async () => {
    const [nowPlayingMovies, upcomingMovies, topRateMovies, popularMovies] =
      await Promise.all([
        moviesNowPlayingUseCase(movieDBFetcher),
        upcomingMoviesUseCase(movieDBFetcher),
        topRatedMoviesUseCase(movieDBFetcher),
        popularMoviesUseCase(movieDBFetcher),
      ]);

    setNowPlaying(nowPlayingMovies);
    setUpComing(upcomingMovies);
    setTopRate(topRateMovies);
    setPopular(popularMovies);

    setIsLoading(false);
  };

  return {
    isLoading,
    nowPlaying,
    upComing,
    topRate,
    popular,

    // methods
    popularGetMore: async () => {
      popularNumberPage++;
      const popularMovies = await popularMoviesUseCase(movieDBFetcher, {
        page: popularNumberPage,
      });

      setPopular([...popular, ...popularMovies]);
    },
  };
};
