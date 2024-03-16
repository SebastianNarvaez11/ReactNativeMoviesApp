import React, {FC} from 'react';
import {Dimensions, View} from 'react-native';
import {IMovieModel} from '../../../core/models/movie.model';
import {MoviePoster} from './MoviePoster';
import Carousel from 'react-native-reanimated-carousel';

interface Props {
  movies: IMovieModel[];
  height?: number;
}
export const PosterCarousel: FC<Props> = ({movies = [], height = 440}) => {
  const PAGE_WIDTH = Dimensions.get('window').width;

  return (
    <View style={{height}}>
      <Carousel
        loop
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 50,
        }}
        width={PAGE_WIDTH - 20}
        data={movies}
        renderItem={({item}) => <MoviePoster key={item.id} movie={item} />}
      />
      {/* <ScrollView horizontal>
        {movies.map(movie => (
          <MoviePoster key={movie.id} movie={movie} />
        ))}
      </ScrollView> */}
    </View>
  );
};
