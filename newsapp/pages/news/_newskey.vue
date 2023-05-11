<template>
    <Loading v-if="$fetchState.pending" />
    <div v-else class="container single-movie">
        <div class="button-group">
            <NuxtLink class="button" :to="{ name: 'index' }">Back</NuxtLink>
            <NuxtLink class="button button-light" :to="{ name: 'edit-newskey' }">Edit</NuxtLink>
        </div>
        <div class="movie-info">
            <div class="movie-img">
                <img :src="article.content[0]" alt="" />
            </div>
            <div class="movie-contents">
                <h1>{{ article.title }}</h1>
                <p class="movie-fact tagline">
                    <span>Categories:</span> {{ article.categories.toString() }}
                </p>
                <p class="movie-fact">
                    <span>Date:</span>
                    {{
                        new Date(article.date).toLocaleString('en-id', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric',
                        })
                    }}
                </p>
            </div>
        </div>
        <p class="movie-fact news-content" v-for="(content, index) in article.content.slice(1)" :key="index">
            <a :href="content" v-if="urlChecker(content)">click here</a>
            <span v-else>{{ content }}</span>
        </p>
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
        },
        urlChecker(url) {
            const regex = new RegExp(/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/)
            return (regex.test(url))
        }
    }
}
</script>

<style lang="scss" scoped>
.single-movie {
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

    .movie-info {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 32px;
        color: #fff;

        @media (min-width: 800px) {
            flex-direction: row;
            align-items: flex-start;
        }

        .movie-img {
            img {
                max-height: 500px;
                width: 100%;

                @media (min-width: 800px) {
                    max-height: 700px;
                    width: initial;
                }
            }
        }

        .movie-contents {
            h1 {
                font-size: 56px;
                font-weight: 400;
            }

            .movie-fact {
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