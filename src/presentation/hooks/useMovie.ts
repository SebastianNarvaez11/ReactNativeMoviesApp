import {useEffect, useState} from 'react';
import {getMovieByIdUseCase} from '../../core/use-cases/movie/get-by-id.use-case';
import {movieDBFetcher} from '../../config/adapters/movieDB.adapter';
import {IFullMovie} from '../../core/models/movie.model';
import {CastModel} from '../../core/models/cast.model';
import {getMovieCastUseCase} from '../../core/use-cases/movie/get-cast-.use-case';
export const useMovie = (movieId: number) => {
  const [isLoading, setIsLoading] = useState(true);
  const [movie, setMovie] = useState<IFullMovie | undefined>(undefined);
  const [cast, setCast] = useState<CastModel[]>();

  useEffect(() => {
    getMovie();
  }, []);

  const getMovie = async () => {
    setIsLoading(true);

    const [movieResponse, castsResponse] = await Promise.all([
      getMovieByIdUseCase(movieDBFetcher, movieId),
      getMovieCastUseCase(movieDBFetcher, movieId),
    ]);

    setMovie(movieResponse);
    setCast(castsResponse);
    setIsLoading(false);
  };

  return {
    movie,
    cast,
    isLoading,
  };
};
