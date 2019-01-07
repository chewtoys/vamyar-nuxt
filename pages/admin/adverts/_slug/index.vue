<template>
  <div>
    <AdvertTable which="admin" :pageTitle="page_title" :type="type" :slug="slug"></AdvertTable>
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
      let type = Helper.getTypeByAlias(slug);
      const breadcrumb = Helper.getBreadcrumb(type.title),
        page_title = Helper.getPageTitle(type.title);

      try {
        store.commit("navigation/pushMeta", {breadcrumb, title: page_title});
        store.commit("navigation/setTitle", page_title);
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
        return `/admin/adverts/${this.slug}`;
      }
    },
    components: {AdvertTable}
  }
</script>
