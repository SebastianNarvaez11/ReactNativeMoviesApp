import {HttpAdapter} from '../../../config/adapters/http/http.adapter';
import {PopularResponse} from '../../../infrastructure/interfaces/movie-db.responses';
import {MovieMapper} from '../../../infrastructure/mappers/movie.mapper';
import {IMovieModel} from '../../models/movie.model';

interface Options {
  page?: number;
}

export const popularMoviesUseCase = async (
  fetcher: HttpAdapter,
  options?: Options,
): Promise<IMovieModel[]> => {
  try {
    const {results} = await fetcher.get<PopularResponse>('/popular', {
      params: {page: options?.page || 1},
    });

    const popularMovies = results.map(result =>
      MovieMapper.fromMovieDBResultToModel(result),
    );
    return popularMovies;
  } catch (error) {
    console.log(error);
    throw new Error('Error fetching - popularMovies');
  }
};
