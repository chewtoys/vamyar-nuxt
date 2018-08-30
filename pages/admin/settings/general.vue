<template>
    <div>
        <v-card color="white" raised light class="mt-5 py-5 px-4">
            <v-card-title>
                <v-icon class="px-1">{{page.icon}}</v-icon>
                <h3>{{page.title}}</h3>
                <v-spacer></v-spacer>
                <v-btn color="success" outline round large @click="submit" :loading="loading">ثبت </v-btn>
            </v-card-title>
            <v-card-text>
                <v-layout row>
                    <v-divider class="my-3"></v-divider>
                    <v-flex xs12 md12 sm12 lg12>
                        <form>
                            <v-text-field
                                    append-icon="edit"
                                    v-validate="'required'"
                                    v-model="title"
                                    :error-messages="errors.collect('title')"
                                    label="عنوان"
                                    data-vv-name="عنوان"
                                    required
                            ></v-text-field>

                            <v-input
                                    append-icon="upload"
                                    v-validate="'file'"
                                    v-model="file"
                                    :error-messages="errors.collect('file')"
                                    label="لوگو"
                                    data-vv-name="لوگو"
                                    type="file"
                            >
                                <FileUpload v-model="url"/>
                            </v-input>
                            <v-textarea
                                    append-icon="dehaze"
                                    v-model="description"
                                    label="توضیحات متا"
                                    auto-grow
                            ></v-textarea>
                            <v-combobox
                                    append-icon="style"
                                    v-model="keywords"
                                    label="کلمات کلیدی سایت"
                                    data-vv-name="کلمات متا"
                                    required
                                    v-validate="'required'"
                                    multiple
                                    chips
                            ></v-combobox>
                            <br/>
                            <v-btn color="success" outline round large @click="submit" :loading="loading">ثبت</v-btn>
                        </form>
                    </v-flex>
                </v-layout>
            </v-card-text>
        </v-card>
    </div>
</template>
<script>

    import FileUpload from "~/components/elements/FileUploader.vue";
    const page = {title: 'تنظیمات عمومی سایت', icon: 'settings'}
    export default {
        meta: {
            breadcrumb: 'تنظیمات عمومی ',
            title: page.title
        },
        layout: 'admin',
        components: {FileUpload},
        $_veeValidate: {
            validator: 'new'
        },
        data(){
            return {
                url: null,
                file: null,
                // form
                loading: false,
                dictionary: {
                    attributes: {
                        title: 'عنوان آگهی',
                        meta: 'عنوان آگهی',
                        keywords: 'عنوان آگهی',
                        // custom attributes
                    },
                    custom: {
                        title: {
                            required: () => 'عنوان نباید خالی باشد'
                            // custom messages
                        },
                        text: {
                            required: () => 'متن توضیحات نباید خالی باشد'
                            // custom messages
                        },
                        g_type: {
                            required: 'لطفا نوع وام را انتخاب کنید'
                        }
                    }
                },
                // info
                info: {
                    title: 'لطفا قبل از پر کردن فرم نکات زیر را مد نظر داشته باشید:',
                    text: "لورم ایپسوم یا طرح‌نما (به انگلیسی: Lorem ipsum) به متنی آزمایشی و بی‌معنی در صنعت چاپ، صفحه‌آرایی و طراحی گرافیک گفته می‌شود. طراح گرافیک از این متن به عنوان عنصری از ترکیب بندی برای پر کردن صفحه و ارایه اولیه شکل ظاهری و کلی طرح سفارش گرفته شده استفاده می نماید، تا از نظر گرافیکی نشانگر چگونگی نوع و اندازه فونت و ظاهر متن باشد. معمولا طراحان گرافیک برای صفحه‌آرایی، نخست از متن‌های آزمایشی و بی‌معنی استفاده می‌کنند تا صرفا به مشتری یا صاحب کار خود نشان دهند که صفحه طراحی یا صفحه بندی شده بعد از اینکه متن در آن قرار گیرد چگونه به نظر می‌رسد و قلم‌ها و اندازه‌بندی‌ها چگونه در نظر گرفته شده‌است. از آنجایی که طراحان عموما نویسنده متن نیستند و وظیفه رعایت حق تکثیر متون را ندارند و در همان حال کار آنها به نوعی وابسته به متن می‌باشد آنها با استفاده از محتویات ساختگی، صفحه گرافیکی خود را صفحه‌آرایی می‌کنند تا مرحله طراحی و صفحه‌بندی را به پایان برند.",
                    heading: 'عنوان متن'
                }
            }
        }
        ,
        async asyncData(){

            let title = 'عنوان سایت';
            let logo = 'static/settings/logo.png';
            let description = 'متن متا دسکرپشن';
            let keywords = ['کلمات', 'کلیدی', 'سایت'];

            let slider = {
                title: 'عنوان روی هدر',
                subtitle: 'عنوان زیر هدر',
            };
            return {title, description, keywords, logo, slider, page}

        },
        mounted()
        {
            this.$validator.localize('fa', this.dictionary)
            // check if user has no access to create advert
            //let hasAccess = this.$store.state.accesses.loans ;
            let hasAccess = true;
            if (!hasAccess) {
                this.$router.push('/user/premium');
            }
        }
        ,
        methods: {
            alerrt(){
                return alert(this.url)
            },
            async sendForm()
            {
                let data = {};
                //let result = await this.$axios.$post(path, data);
                setTimeout(() => {
                    this.loading = false;
                }, 1000)
            }
            ,
            submit()
            {
                this.loading = true;
                this.$validator.validateAll().then((result) => {
                    if (result) {
                        return this.sendForm()
                    } else {
                        return null;
                    }
                }).catch((error) => {
                    return console.log(error)
                });
            }
        }
    }
</script>