<template>
    <v-jumbotron
            :gradient="gradient"
            dark
            :src="Src"
    >
        <v-container fill-height>
            <v-layout align-center>
                <v-flex text-xs-center>
                    <h1 class="font-50">وامیار</h1>
                    <div><h2 class="font-22 pt-2">سامانه‌ی پیشرفته‌‌ی تامین مالی</h2></div>
                    <div><h3 class="font-20 pt-1">تا بحال <span>{{count}}</span> کاربر به وامیار اعتماد کرده اند</h3></div>
                    <div class="mt-5 ">
                        <v-btn large to="/user" color="deep-orange lighten-2">
                            <v-icon class="pl-1">label_important</v-icon>
                            به ما ملحق شوید

                        </v-btn>
                    </div>
                </v-flex>

            </v-layout>
        </v-container>
    </v-jumbotron>
</template>
<script>
    export default {
        computed: {
            Src: () => "bg/head1.jpg",
            gradient: () => 'to top, rgba(103,71,181, .3), rgba(55,72,172, .4)',
            count: function () {
                return this.$store.state.site.users_count;
            }
        }
    }
</script>
