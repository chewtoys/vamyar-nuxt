<template>
    <v-container grid-list-xs>
        <v-layout row wrap>
            <v-flex xs8>
                <input
                        type="file"
                        id="file"
                        ref="file"
                        v-on:change="handleFileUpload()"/>
                <v-btn :loading="fileLoading" :disabled="!hasFile"
                       @click="submitFile()"><span>آپلود</span>
                </v-btn>
            </v-flex>
            <v-flex xs4>
                <div v-if="url">
                    <v-btn @click="remove" fab outline small color="warning">
                        <v-icon>delete</v-icon>
                    </v-btn>
                    <img :src="'/'+url" class="full" :alt="url">
                    <input type="hidden" name="url" v-model="url"/>
                </div>
            </v-flex>
            <v-flex xs12 v-if="uploadPercentage < 100 && uploadPercentage > 0 ">
                <v-progress-linear v-model="uploadPercentage" color="success"></v-progress-linear>
            </v-flex>

        </v-layout>
        <v-divider color="black"></v-divider>
    </v-container>
</template>
<script>
    import axios from  'axios'
    export default {
        props: ['value'],
        /*
         Defines the data used by the component
         */
        data(){
            return {
                file: '',
                hasFile: false,
                url: this.value,
                fileLoading: false,
                uploadPercentage: 0
            }
        }, watch: {
            url(val) {
                this.$emit('input', val);
            }
        },
        methods: {
            /*
             Handles a change on the file upload
             */
            remove(){
                this.file = null;
                this.url = null;
            },
            handleFileUpload(){
                this.hasFile = true;
                this.file = this.$refs.file.files[0];
            },
            /*
             Submits the file to the server
             */
            submitFile: function () {

                this.fileLoading = true;
                /*
                 Initialize the form data
                 */
                let formData = new FormData();

                /*
                 Add the form data we need to submit
                 */
                formData.append('file', this.file);

                /*
                 Make the request to the POST /single-file URL
                 */
                axios.post('/api/upload',
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        },
                        onUploadProgress: function (progressEvent) {
                            this.uploadPercentage = parseInt(Math.round(( progressEvent.loaded * 100 ) / progressEvent.total));
                        }.bind(this)
                    }
                ).then(({data}) => {
                    let {url} = data;
                    this.url = url;
                    this.hasFile = false;
                    this.file = null;
                    this.fileLoading = false;
                })
                    .catch(() => {
                        this.hasFile = false;
                        this.file = null;
                        this.fileLoading = false;
                    });

            },
        }
    }
</script>