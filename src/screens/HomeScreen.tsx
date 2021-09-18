import React, { useContext } from 'react'
import { ActivityIndicator, Dimensions, View, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Carousel from 'react-native-snap-carousel';
import { GradientBackground } from '../components/GradientBackground';
import { HorizontalSlider } from '../components/HorizontalSlider';

import { MoviePoster } from '../components/MoviePoster';
import { useMovies } from '../hooks/useMovies';

import { getImageColors } from '../helpers/getColores';
import { GradientContext } from '../context/GradientContext';
import { useEffect } from 'react';

const { width: windowWith } = Dimensions.get('window');

export const HomeScreen = () => {

    const { nowPlaying, popular, topRated, upcoming, isLoading } = useMovies();
    const { top } = useSafeAreaInsets();
    const { setMainColors, setPrevMainColors } = useContext(GradientContext)

    const getPosterColors = async (index: number) => {
        const movie = nowPlaying[index];
        const uri = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

        const [primary = 'green', secondary = 'orange'] = await getImageColors(uri)

        setMainColors({ primary, secondary })

    }

    useEffect(() => {
        if (nowPlaying.length > 0) {
            getPosterColors(0)
        }
    }, [nowPlaying])

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
                <ActivityIndicator color="blue" size={100} />
            </View>
        )
    }

    return (

        <GradientBackground>
            <ScrollView>
                <View style={{ marginTop: top + 20 }}>

                    {/* Carousel principal */}
                    <View style={{ height: 440 }}>
                        <Carousel
                            data={nowPlaying!}
                            renderItem={({ item }: any) => <MoviePoster movie={item} />}
                            sliderWidth={windowWith}
                            itemWidth={300}
                            inactiveSlideOpacity={0.9}
                            onSnapToItem={index => getPosterColors(index)}
                        />
                    </View>

                    {/* Peliculas populares */}
                    <HorizontalSlider title="Populares" movies={popular!} />
                    <HorizontalSlider title="Más valoradas" movies={topRated!} />
                    <HorizontalSlider title="Próximas" movies={upcoming!} />
                </View>
            </ScrollView>
        </GradientBackground>
    )
}
