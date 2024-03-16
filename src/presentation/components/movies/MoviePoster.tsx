import React, {FC} from 'react';
import {Image, Pressable, StyleSheet, View} from 'react-native';
import {IMovieModel} from '../../../core/models/movie.model';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParams} from '../../navigation/Navigation';

interface Props {
  movie: IMovieModel;
  height?: number;
  width?: number;
}

export const MoviePoster: FC<Props> = ({movie, height = 420, width = 400}) => {
  const navigation = useNavigation<NavigationProp<RootStackParams>>();

  return (
    <Pressable
      style={({pressed}) => ({
        width,
        height,
        opacity: pressed ? 0.9 : 1,
        paddingHorizontal: 5,
      })}
      onPress={() => navigation.navigate('DetailsScreen', {movieId: movie.id})}>
      <View style={[style.imageContainer]}>
        <Image style={style.image} source={{uri: movie.poster}} />
      </View>
    </Pressable>
  );
};

const style = StyleSheet.create({
  image: {
    flex: 1,
    borderRadius: 18,
  },
  imageContainer: {
    flex: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
