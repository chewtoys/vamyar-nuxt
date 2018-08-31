<template>
    <span>
        <v-toolbar
                color="white lighten-5"
                app
        >
            <v-toolbar-side-icon white--text @click.stop="mini = !mini"></v-toolbar-side-icon>
            <v-toolbar-title>داشبورد</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-menu left :nudge-width="100">
                <v-toolbar-title slot="activator">
                    <span class="font-12">{{welcome}}</span>
                    <v-icon dark>arrow_drop_down</v-icon>
                </v-toolbar-title>
                <v-list>
                    <v-list-tile
                            v-for="item in panel"
                            :key="item.title"
                            @click="goTo(item.to)"
                    >
                        <v-list-tile-title v-text="item.title"></v-list-tile-title>
                    </v-list-tile>
                </v-list>
            </v-menu>
        </v-toolbar>
        <v-navigation-drawer
                right
                app
                :mini-variant.sync="mini"
                permanent=""

        >
            <v-list color="second">
                <v-list-tile class="pb-2" to="/">
                    <v-list-tile-avatar>
                        <img :src="site.logo">
                    </v-list-tile-avatar>
                    <v-list-tile-title class="text-justify rtl">{{site.title}}</v-list-tile-title>
                </v-list-tile>
                <v-divider/>

                <v-list-tile>
                    <v-list-tile-title class="text-justify rtl">وام</v-list-tile-title>
                </v-list-tile>
                <v-list-tile
                        v-for="item in loans"
                        :key="item.title"
                        :to="item.to"
                >
                    <v-list-tile-action>
                        <v-icon v-text="item.icon"></v-icon>
                    </v-list-tile-action>
                    <v-list-tile-title class="text-justify rtl" v-text="item.title"></v-list-tile-title>

                </v-list-tile>
                <v-divider></v-divider>
                <v-list-tile>
                    <v-list-tile-title class="text-justify rtl">ضامن ها</v-list-tile-title>
                </v-list-tile>
                <v-list-tile
                        v-for="item in coSigner"
                        :key="item.title"
                        :to="item.to"
                >
                    <v-list-tile-action>
                        <v-icon v-text="item.icon"></v-icon>
                    </v-list-tile-action>
                    <v-list-tile-title class="text-justify rtl" v-text="item.title"></v-list-tile-title>

                </v-list-tile>
                <v-divider></v-divider>
                <v-list-tile>
                    <v-list-tile-title class="text-justify rtl">سرمایه گذاران</v-list-tile-title>
                </v-list-tile>
                <v-list-tile
                        v-for="item in finances"
                        :key="item.title"
                        :to="item.to"
                >
                    <v-list-tile-action>
                        <v-icon v-text="item.icon"></v-icon>
                    </v-list-tile-action>
                    <v-list-tile-title class="text-justify rtl" v-text="item.title"></v-list-tile-title>

                </v-list-tile>
                <v-list-group
                        v-if="false"
                        sub-group
                        value="false"
                        no-action
                >
                    <v-list-tile slot="activator">
                        <v-list-tile-title class="text-justify rtl">تیکت ها</v-list-tile-title>
                    </v-list-tile>

                    <v-list-tile
                            v-for="item in tickets"
                            :key="item.title"
                            :to="item.to"
                    >
                        <v-list-tile-action>
                            <v-icon v-text="item.icon"></v-icon>
                        </v-list-tile-action>
                        <v-list-tile-title class="text-justify rtl" v-text="item.title"></v-list-tile-title>

                    </v-list-tile>
                </v-list-group>
                <v-list-group
                        v-if="false"
                        sub-group
                        value="false"
                        no-action
                >
                    <v-list-tile slot="activator">
                        <v-list-tile-title class="text-justify rtl">پروفایل من</v-list-tile-title>
                    </v-list-tile>

                    <v-list-tile
                            v-for="item in panel"
                            :key="item.title"
                            :to="item.to"
                    >
                        <v-list-tile-action>
                            <v-icon v-text="item.icon"></v-icon>
                        </v-list-tile-action>
                        <v-list-tile-title class="text-justify rtl" v-text="item.title"></v-list-tile-title>

                    </v-list-tile>
                </v-list-group>
                <v-list-group
                        sub-group
                        value="false"
                        no-action
                        v-if="false"
                >
                    <v-list-tile slot="activator">
                        <v-list-tile-title class="text-justify rtl">دسترسی</v-list-tile-title>
                    </v-list-tile>

                    <v-list-tile
                            v-for="item in access"
                            :key="item.title"
                            :to="item.to"
                    >
                        <v-list-tile-action>
                            <v-icon v-text="item.icon"></v-icon>
                        </v-list-tile-action>
                        <v-list-tile-title class="text-justify rtl" v-text="item.title"></v-list-tile-title>

                    </v-list-tile>
                </v-list-group>


            </v-list>
        </v-navigation-drawer>
    </span>
</template>
<script>
    export default {
        data: () => ({
                drawer: true,
                mini: false,
                right: null,
                tickets: [
                    {title: 'کل تیکت های من', icon: 'inbox', to: '/user/settings'},
                    {title: 'تیکت جدید', icon: 'inbox', to: '/user/settings'},

                ], panel: [
                    {title: 'کل فاکتورها', icon: 'inbox', to: '/user/settings'},
                    {title: 'وضعیت اشتراک من', icon: 'inbox', to: '/user/settings'},
                    {title: 'صندوق پیام ها', icon: 'inbox', to: '/user/settings'},
                    {title: 'تنظیمات', icon: 'build', to: '/user/settings'},
                    {title: 'خروج', icon: 'exit_to_app', to: '/user/logout'}
                ],
                loans: [
                    {title: 'ثبت وام برای فروش و یا مشارکت', icon: 'book', to: '/user/loans/create'},
                    {title: 'درخواست وام', icon: 'book', to: '/user/loanRequests/create'}
                ],
                coSigner: [
                    {title: 'درخواست ضامن', icon: 'book', to: '/user/coSignerRequest/create'},
                    {title: 'ضامن هستم', icon: 'book', to: '/user/coSigner/create'}
                ],
                finances: [
                    {title: 'درخواست سرمایه', icon: 'book', to: '/user/finances/create'},
                    {title: 'سرمایه گذار هستم', icon: 'book', to: '/user/financeRequests/create'}
                ],
                access: [
                    {title: 'سایت', icon: 'book', to: '/user/adverts/vam'},
                    {title: 'راهنما', icon: 'book', to: '/user/adverts/zamen'},
                    {title: 'سوالات متداول', icon: 'book', to: '/user/adverts/sarmaye'}
                ]
            }
        ),
        methods: {
            goTo: function (to) {
                //if (this.$store.state.debug) alert('go to:' + to)
                this.$router.push(to);
            }
        }
        ,
        computed: {
            user: function () {
                return this.$store.state.user
            }
            , site: function () {
                return this.$store.state.site
            }
            ,
            welcome: function () {
                return this.user.fullname + ' خوش آمدید!';
            }
        }
    }
</script>
