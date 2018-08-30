<template>
    <v-container fluid grid-list-lg>
        <div>
            <v-card-title>
                <v-label><h3 class="mr-4 font-18 font-weight-bold">آخرین درخواست های وام ثبت شده در وامیار</h3>
                </v-label>
                <v-spacer></v-spacer>
                <v-btn outline to="/categories/loan-requests" color="info ml-2" round><v-icon class="pl-1">list</v-icon><span>همه ی درخواست ها</span></v-btn>
            </v-card-title>
        </div>
        <div class="full">
            <v-layout row wrap fluid>
                <v-flex sm4 lg3 xs6 v-for="j in items" :key="j">
                    <LoanRequest :item="item"></LoanRequest>
                </v-flex>
            </v-layout>
        </div>
    </v-container>
</template>
<script>
    import LoanRequest from '~/components/site/adverts/LoanRequest.vue'
    export default {
        components: {LoanRequest},
        computed: {
            items: function () {
                return 12;
            }, item() {
                return this.$store.state.temp.loan.item
            }
        }
    }
</script>