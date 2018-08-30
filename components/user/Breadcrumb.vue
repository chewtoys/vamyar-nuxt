<template>
    <div>
        <v-breadcrumbs>
            <v-icon slot="divider">chevron_left</v-icon>

            <v-breadcrumbs-item
                    v-for="_item in _items"
                    :disabled="_item.disabled"
                    :key="_item.text"
            >
                {{ _item.text }}

            </v-breadcrumbs-item>
            <v-breadcrumbs-item
                    v-for="item in items"
                    :disabled="item.disabled"
                    :key="item.text"
            >

                {{ item.text }}

            </v-breadcrumbs-item>
        </v-breadcrumbs>

    </div>
</template>

<script>
    export default {
        computed: {
            _items ()  {
                return [
                    {
                        text: 'داشبورد',
                        disabled: false
                    }
                ]
            },
            items(){
                return this.$store.state.page.breadcrumb
            }
        },
        methods: {
            test(){
                console.log(this.$store.state.test)
            }
        }
    }
</script>