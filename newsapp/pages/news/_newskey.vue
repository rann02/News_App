<template>
    <Loading v-if="$fetchState.pending" />
    <div v-else class="container single-article">
        <div class="button-group">
            <NuxtLink class="button" :to="{ name: 'index' }">Back</NuxtLink>
            <NuxtLink class="button button-light" :to="{ name: 'edit-newskey' }">Edit</NuxtLink>
        </div>
        <div class="article-info">
            <div class="article-img">
                <img :src="$store.state.article.content[0]" alt="" />
            </div>
            <div class="article-contents">
                <h1>{{ $store.state.article.title }}</h1>
                <p class="article-fact tagline">
                    <span>Categories:</span> {{ $store.state.article.categories.toString() }}
                </p>
                <p class="article-fact">
                    <span>Date:</span>
                    {{
                        new Date($store.state.article.date).toLocaleString('en-id', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric',
                        })
                    }}
                </p>
            </div>
        </div>
        <p class="article-fact news-content" v-for="(content, index) in $store.state.article.content.slice(1)" :key="index">
            <a :href="content" v-if="urlChecker(content)">click here</a>
            <span v-else>{{ content }}</span>
        </p>
    </div>
</template>

<script>
export default {
    name: 'singel-article',
    async fetch() {
        await this.$store.dispatch('getArticle', this.$route.params.newskey)
    },
    fetchDelay: 1000,
    methods: {
        urlChecker(url) {
            const regex = new RegExp(/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/)
            return (regex.test(url))
        }
    }
}
</script>

<style lang="scss" scoped>
.single-article {
    color: #fff;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 32px 16px;

    .button-group {
        display: flex;
        justify-content: space-between;
        // padding-right: 20;

        .button {
            align-self: flex-start;
            margin-bottom: 32px;
        }

    }

    .article-info {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 32px;
        color: #fff;

        @media (min-width: 800px) {
            flex-direction: row;
            align-items: flex-start;
        }

        .article-img {
            img {
                max-height: 500px;
                width: 100%;

                @media (min-width: 800px) {
                    max-height: 700px;
                    width: initial;
                }
            }
        }

        .article-contents {
            h1 {
                font-size: 56px;
                font-weight: 400;
            }

            .article-fact {
                margin-top: 12px;
                font-size: 20px;
                line-height: 1.5;

                span {
                    font-weight: 600;
                    text-decoration: underline;
                }
            }

            .tagline {
                font-style: italic;

                span {
                    font-style: normal;
                }
            }
        }

    }

    .news-content {
        margin-top: 10px;
        font-size: 20px;
    }
}
</style>