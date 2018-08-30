<template>
    <v-card class="frontpage categories pt-5 pb-5 px-2">

        <v-container fluid grid-list-sm>
            <v-layout align-center justify-center column fill-height>
                <v-flex xs12 sm12 class="pa-3 align-content-center">
                    <h1 class="full text-xs-center">
                        {{title}}
                    </h1>
                </v-flex>
            </v-layout>
            <v-layout align-center justify-center row wrap>
                <v-flex xs6 sm4 class="py-5 px-4" justify-center v-for="item in items" :key="item.title">
                    <v-card class="text-xs-center elevation-24">
                        <v-card-media
                                class="text-xs-center"
                                :src="item.img"
                                height="200px"
                        >
                        </v-card-media>
                        <v-card-title primary-title>
                            <div>
                                <h3 class="deep-orange--text font-17 farsi">{{item.title}}</h3>
                                <div class="grey--text farsi"><h6 class="font-13">{{item.subtitle}}</h6></div>
                            </div>
                        </v-card-title>
                        <v-card-text>
                            <div class=" grey--text text-justify">
                                {{item.desc}}
                            </div>
                        </v-card-text>
                        <div class="full text-xs-right">
                            <v-btn
                                    color="orange darken-1"
                                    class="white--text"
                                    round
                                    bottom
                                    fab
                                    @click="'#'"
                            >
                                <v-icon class="font-38" dark>list</v-icon>
                            </v-btn>
                        </div>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </v-card>
</template>
<script>

    export default{

        computed: {
            title: function () {
                return 'دسته بندی خدمات'
            },
            items: function () {
                return [
                    {
                        img: 'https://randomuser.me/api/portraits/men/64.jpg',
                        title: 'عنوان اول',
                        subtitle: 'شعار اول',
                        desc: "لورم ساز، تولید کننده لورم ایپسوم فارسی و انگلیسی برای طراحان وب و گرافیست ها همراه با امکان ایجاد تگ و جملات اتفاقی."
                    },
                    {
                        img: 'https://randomuser.me/api/portraits/men/99.jpg',
                        title: 'عنوان دوم',
                        subtitle: 'شعار دوم',
                        desc: "لورم ساز، تولید کننده لورم ایپسوم فارسی و انگلیسی برای طراحان وب و گرافیست ها همراه با امکان ایجاد تگ و جملات اتفاقی."
                    },
                    {
                        img: 'https://randomuser.me/api/portraits/men/51.jpg',
                        title: 'عنوان سوم',
                        subtitle: 'شعار سوم',
                        desc: "لورم ساز، تولید کننده لورم ایپسوم فارسی و انگلیسی برای طراحان وب و گرافیست ها همراه با امکان ایجاد تگ و جملات اتفاقی."
                    }, {
                        img: 'https://randomuser.me/api/portraits/men/64.jpg',
                        title: 'عنوان چهارم',
                        subtitle: 'شعار چهارم',
                        desc: "لورم ساز، تولید کننده لورم ایپسوم فارسی و انگلیسی برای طراحان وب و گرافیست ها همراه با امکان ایجاد تگ و جملات اتفاقی."
                    },
                    {
                        img: 'https://randomuser.me/api/portraits/men/99.jpg',
                        title: 'عنوان پنجم',
                        subtitle: 'شعار پنجم',
                        desc: "لورم ساز، تولید کننده لورم ایپسوم فارسی و انگلیسی برای طراحان وب و گرافیست ها همراه با امکان ایجاد تگ و جملات اتفاقی."
                    },
                    {
                        img: 'https://randomuser.me/api/portraits/men/51.jpg',
                        title: 'عنوان ششم',
                        subtitle: 'شعار ششم',
                        desc: "لورم ساز، تولید کننده لورم ایپسوم فارسی و انگلیسی برای طراحان وب و گرافیست ها همراه با امکان ایجاد تگ و جملات اتفاقی."
                    }
                ]
            }
        }
    }
</script>