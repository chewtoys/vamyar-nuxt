<template>
    <v-card class="frontpage whyus pt-5 pb-5 px-2">
        <v-container fluid>
            <v-layout align-center justify-center column fill-height>
                <v-flex xs12 sm12 class="pa-3 align-content-center">
                    <h1 class="full text-xs-center">
                        {{title}}
                    </h1>
                </v-flex>
            </v-layout>
            <v-layout align-center justify-center row>
                <v-flex xs12 sm3  v-for="item in items" :key="item.title">
                    <div class="text-xs-center">
                        <v-card-media
                                class="text-xs-center circle"
                                :src="item.img"
                                style="height:100px;width:100px;margin: 10px auto">
                        </v-card-media>
                        <div class="deep-purple--text text-xs-center">
                            <h3>{{item.title}}</h3>
                        </div>
                        <div class="grey--text text-xs-center">
                            {{item.desc}}

                        </div>
                    </div>
                </v-flex>
            </v-layout>
        </v-container>
    </v-card>
</template>
<script>
    export default{
        computed: {
            title: function () {
                return 'چرا ما؟'
            },
            items: function () {
                return [
                    {
                        img: 'https://randomuser.me/api/portraits/men/64.jpg',
                        title: 'عنوان اول',
                        desc: "لورم ساز، تولید کننده لورم ایپسوم فارسی و انگلیسی برای طراحان وب و گرافیست ها همراه با امکان ایجاد تگ و جملات اتفاقی."
                    },
                    {
                        img: 'https://randomuser.me/api/portraits/men/99.jpg',
                        title: 'عنوان دوم',
                        desc: "لورم ساز، تولید کننده لورم ایپسوم فارسی و انگلیسی برای طراحان وب و گرافیست ها همراه با امکان ایجاد تگ و جملات اتفاقی."
                    },
                    {
                        img: 'https://randomuser.me/api/portraits/men/51.jpg',
                        title: 'عنوان سوم',
                        desc: "لورم ساز، تولید کننده لورم ایپسوم فارسی و انگلیسی برای طراحان وب و گرافیست ها همراه با امکان ایجاد تگ و جملات اتفاقی."
                    },
                ]
            }
        }
    }
</script>