<template>
    <div>
        <Loading v-if="$fetchState.pending" />
        <div v-else class="container single-movie">
            <h1>{{ article.title }}</h1>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'singel-article',
    data() {
        return {
            article: null,
        }
    },
    async fetch() {
        await this.getArticle()
    },
    fetchDelay: 1000,
    methods: {
        async getArticle() {
            try {
                const { data } = await axios.get(`http://localhost:3001/api/detail/${this.$route.params.newskey}`)
                this.article = data.results
                console.log(data);
            } catch (error) {
                console.log(error);
            }
        }
    }
}
</script>

<style lang="scss" scoped></style>