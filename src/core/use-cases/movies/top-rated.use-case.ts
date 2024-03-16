import {HttpAdapter} from '../../../config/adapters/http/http.adapter';
import {TopRatedResponse} from '../../../infrastructure/interfaces/movie-db.responses';
import {MovieMapper} from '../../../infrastructure/mappers/movie.mapper';
import {IMovieModel} from '../../models/movie.model';

export const topRatedMoviesUseCase = async (
  fetcher: HttpAdapter,
): Promise<IMovieModel[]> => {
  try {
    const {results} = await fetcher.get<TopRatedResponse>('/top_rated');

    const topRatedMovies = results.map(result =>
      MovieMapper.fromMovieDBResultToModel(result),
    );
    return topRatedMovies;
  } catch (error) {
    console.log(error);
    throw new Error('Error fetching - topRatedMovies');
  }
};
