<template>
    <no-ssr>
        <v-btn
                ripple class="elevation-2" :loading="loading" color="success" round
                v-clipboard:copy="thingToCopy"
                v-clipboard:success="handleCopyStatus(true)"
                v-clipboard:error="handleCopyStatus(false)"
                @click="copy"
        >
            <v-icon>{{icon}}</v-icon>
            <span class="px-1">{{text}}</span>
        </v-btn>
    </no-ssr>
</template>

<script>
    export default {
        data() {
            return {
                text: 'کپی آدرس صفحه',
                text1: 'کپی آدرس صفحه',
                text2: 'کپی شد',
                loading: false,
                disabled: false,
                icon: 'file_copy',
                icon1: 'file_copy',
                icon2: 'check_circle',
                copySucceeded: false,
                thingToCopy: null
            }
        },
        mounted() {
            this.thingToCopy = document.location
        },
        methods: {
            handleCopyStatus(status) {
                this.copySucceeded = status
            },
            copy(){
                this.loading = true;
                // send to API
                setTimeout(() => {
                    this.icon = this.icon2
                    this.text = this.text2
                    this.loading = false;
                }, 1000)
            }
        }
    }
</script>