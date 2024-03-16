import {HttpAdapter} from '../../../config/adapters/http/http.adapter';
import {UpComingResponse} from '../../../infrastructure/interfaces/movie-db.responses';
import {MovieMapper} from '../../../infrastructure/mappers/movie.mapper';
import {IMovieModel} from '../../models/movie.model';

export const upcomingMoviesUseCase = async (
  fetcher: HttpAdapter,
): Promise<IMovieModel[]> => {
  try {
    const {results} = await fetcher.get<UpComingResponse>('/upcoming');

    const updcomingMovies = results.map(result =>
      MovieMapper.fromMovieDBResultToModel(result),
    );
    return updcomingMovies;
  } catch (error) {
    console.log(error);
    throw new Error('Error fetching - upcomingMovies');
  }
};
