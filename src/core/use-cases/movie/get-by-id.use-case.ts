import {HttpAdapter} from '../../../config/adapters/http/http.adapter';
import {FullMovieResponse} from '../../../infrastructure/interfaces/movie-db.responses';
import {MovieMapper} from '../../../infrastructure/mappers/movie.mapper';
import {IFullMovie} from '../../models/movie.model';

export const getMovieByIdUseCase = async (
  fetcher: HttpAdapter,
  movieId: number,
): Promise<IFullMovie> => {
  try {
    const movie = await fetcher.get<FullMovieResponse>(`/${movieId}`);

    return MovieMapper.fromMovieDBResultToFullMovieModel(movie);
  } catch (error) {
    console.log(error);
    throw new Error('Error fetching - getMovieByIdUseCase');
  }
};
