<template>
  <img :src="image_data" :alt="img_url" class="my-5" :width="width">
</template>

<script>
import axios from 'axios';

export default {
    name: 'ImageView',
    props: ['img_url', 'width'],
    data() {
        return {
            image_data: null,
        }
    },
    computed: {
    },
    async mounted() {
        const url = process.env.VUE_APP_API_URL + `/fetchImage/${this.img_url}`
        const result = await axios.get(url, {responseType: 'blob'});
        this.image_data = URL.createObjectURL(result.data);
    }
}
</script>

<style>

</style>