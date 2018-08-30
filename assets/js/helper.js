import axios from '@nuxtjs/axios'
const Helper = {
    getLoanItems: async function (number, cursor, must) {

        // `api.vamyar.tk:808/site/adverts? cursor = 0 & number = 10 & must = advertableType = loan, verified = true`

        let method = '/site/adverts';
        let advertableType = 'loan';

        if (!number) number = 15;
        if (!cursor) cursor = 0;

        if (!must) {
            must = 'advertableType=' + advertableType + ',verified=true'
        }

        let query = {
            number,
            cursor,
            must
        };

        let result = await
            axios.get(method, {
                params: query
            });

        return result;
    }
}

export default Helper