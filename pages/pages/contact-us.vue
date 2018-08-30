<template>
    <v-container grid-list>
        <v-layout row wrap reverse>
            <v-flex xs12 md6 fill>
                <v-card dark color="gray">
                    <v-card-title>
                        <h2>
                            <v-icon class="pb-2 pl-1">email</v-icon>
                            <span>پیشنهادات، شکایات و انتقادات</span></h2>
                    </v-card-title>
                    <v-card-text>
                        <div>{{lorem}}</div>
                        <br>
                        <divider />
                        <br>
                        <form>
                            <v-text-field
                                    box
                                    dark
                                    v-validate="'required|max:10'"
                                    v-model="name"
                                    :counter="10"
                                    :error-messages="errors.collect('name')"
                                    label="نام"
                                    data-vv-name="name"
                                    required
                            ></v-text-field>
                            <v-text-field
                                    box
                                    dark
                                    v-validate="'required|email'"
                                    v-model="email"
                                    :error-messages="errors.collect('email')"
                                    label="پست الکترونیک"
                                    data-vv-name="email"
                                    required
                            ></v-text-field>
                            <v-textarea
                                    box
                                    dark
                                    solo
                                    label="متن خود را اینجا بنویسید"
                                    v-model="text"
                            ></v-textarea>
                            <v-btn @click="submit">
                                <v-icon class="pl-1">send</v-icon>
                                ثبت
                            </v-btn>
                        </form>
                    </v-card-text>
                </v-card>
            </v-flex>
            <v-flex xs12 md6>
                <v-card>
                    <v-card-title>
                        <h2>
                            <v-icon class="pb-2">location_on</v-icon>
                            <span>ارتباط با ما</span>
                        </h2>
                    </v-card-title>
                    <v-card-text>
                        <div>{{lorem}}</div>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
    export default {
        meta: {
            title: 'درباره‌ی ما'
        },
        layout: 'site',
        computed: {
            lorem(){
                return this.$store.state.temp.lorem
            }
        },
        $_veeValidate: {
            validator: 'new'
        },
        data: () => ({
            text: '',
            name: '',
            email: '',
            checkbox: null,
            dictionary: {
                attributes: {
                    email: 'E-mail Address'
                    // custom attributes
                },
                custom: {
                    name: {
                        required: () => 'Name can not be empty',
                        max: 'The name field may not be greater than 10 characters'
                        // custom messages
                    },
                    select: {
                        required: 'Select field is required'
                    }
                }
            }
        }),
        mounted () {
            this.$validator.localize('en', this.dictionary)
        },
        methods: {
            submit () {
                this.$validator.validateAll()
            },
            clear () {
                this.name = ''
                this.email = ''
                this.select = null
                this.checkbox = null
                this.$validator.reset()
            }
        }
    }
</script>