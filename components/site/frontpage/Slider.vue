<template>
    <v-container fluid>
        <v-card class="full">
            <no-ssr>
                <siema auto-play ref="siema" class="siema" :options="options">
                    <v-card class="slide" v-for="item in 9" :key="item">
                        <v-card-media
                                height="200px"
                                :src="img"
                        >
                        </v-card-media>
                        <v-card-title>
                            <h3>عنوان آگهی</h3>
                        </v-card-title>
                        <v-card-text>
                            <p>Hi, I'm slide {{item}}</p>
                        </v-card-text>
                    </v-card>
                </siema>
            </no-ssr>
        </v-card>
    </v-container>
</template>
<script>

    export default {
        mounted(){

        },
        data(){
            return {

                img: 'http://placehold.it/2000x1000',
                options: {
                    draggable: true,
                    loop: true,
                    duration: 200,
                    easing: 'ease-out',
                    perPage: 3,
                    startIndex: 0,
                    multipleDrag: true,
                    threshold: 20,
                    rtl: true,
                }
            }
        }
    }

</script>

<style>
    .wrp {
        max-width: 100%;
        margin-left: auto;
        margin-right: auto;
    }

    .slide {
        max-height: 600px;
        background: #ccc;
    }

</style>