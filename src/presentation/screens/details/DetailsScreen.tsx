import {StackScreenProps} from '@react-navigation/stack';
import React, {FC} from 'react';
import {ScrollView} from 'react-native';
import {RootStackParams} from '../../navigation/Navigation';
import {useMovie} from '../../hooks/useMovie';
import {MovieHeader} from '../../components/movies/MovieHeader';
import {MovieDetails} from '../../components/movies/MovieDetails';
import {FullScreenLoader} from '../../components/loader/FullScreenLoader';

interface Props extends StackScreenProps<RootStackParams, 'DetailsScreen'> {}

export const DetailsScreen: FC<Props> = ({route}) => {
  const {movieId} = route.params;

  const {isLoading, movie, cast} = useMovie(movieId);

  if (isLoading || !movie) {
    return <FullScreenLoader />;
  }

  return (
    <ScrollView>
      <MovieHeader movie={movie} />
      <MovieDetails cast={cast || []} movie={movie} />
    </ScrollView>
  );
};
