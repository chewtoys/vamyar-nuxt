<template>
    <div>
        <v-card color="white" raised light class="mt-5 py-5 px-4">
            <v-card-title>
                <v-icon class="px-1">{{page.icon}}</v-icon>
                <h3>{{page.title}}</h3>
                <v-spacer></v-spacer>
            </v-card-title>
            <v-card-text>
                <v-layout row>

                    <v-divider class="my-3"></v-divider>
                    <v-flex xs12 md12 sm12 lg12 class="text-center">
                        <div><p>آیا می خواهید از مدیریت خارج شوید؟</p></div>
                        <div>
                            <v-btn color="error" outline round large @click="logout" :loading="loading">
                                <span>خروج و بازگشت به سایت</span></v-btn>
                        </div>
                    </v-flex>
                </v-layout>
            </v-card-text>
        </v-card>
    </div>
</template>
<script>

    const page = {title: 'خروج از مدیریت', icon: 'lock_open'}
    export default {
        meta: {
            breadcrumb: 'خروج',
            title: page.title
        },
        data(){
            return {
                loading: false,
                page
            }
        },
        layout: 'admin',
        methods: {
            logout(){
                this.loading = true;
                setTimeout(() => {
                    this.$store.dispatch('logout')
                    this.$router.push('/')
                }, 2000)
            }
        }
    }
</script>