<template>
  <div>
    <AdvertTable which="user" :pageTitle="page_title" :type="type" :slug="slug"></AdvertTable>
  </div>
</template>
<script>
  import AdvertTable from "~/components/advertTable.vue"
  import Helper from "~/assets/js/helper.js"

  export default {
    data: () => ({
      slug: '',
      type: '',
      page_title: 'همه ی اگهی ها'
    }),
    async asyncData({params, app, store, $axios}) {
      let slug = params.slug;
      let type = {
        title:'همه ی آگهی ها',
        type:'adverts',
        advertType:''
      };
      const breadcrumb = Helper.getBreadcrumb(type.title),
        page_title = type.title;
      store.commit("navigation/pushMeta", {breadcrumb, title: page_title});
      store.commit("navigation/setTitle", page_title);
      try {

      } catch (err) {
        //error({statusCode: 'این صفحه فعال نمی باشد.'})
      }
      return {
        type,
        page_title,
        slug
      }
    },
    computed: {
      uri() {
        return `/user/adverts/${this.slug}`;
      }
    },
    components: {AdvertTable}
  }
</script>
