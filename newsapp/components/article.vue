<template>
    <div class="article">
        <div class="article-img">
            <img :src="article.thumb" alt="" />
            <p class="tag">{{ article.tag }}</p>
            <p class="overview">{{ article.desc }}</p>
        </div>
        <div class="info">
            <p class="title">{{ article.title.slice(0, 25) }}
                <span v-if="article.title.length > 25">...</span>
            </p>
            <p class="release">
                Date:
                {{
                    new Date(article.time).toLocaleDateString('en-id', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                    })
                }}
            </p>
            <NuxtLink class="button button-light" :to="{ name: 'news-newskey', params: { newskey: article.key } }">Read
                more
            </NuxtLink>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Article',
    props: ['article']
}
</script>

<style lang="scss" scoped>
.article {
    position: relative;
    display: flex;
    flex-direction: column;

    .article-img {
        position: relative;
        overflow: hidden;
        height: 250px;

        &:hover {
            .overview {
                transform: translateY(0);
            }
        }

        img {
            display: block;
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .tag {
            position: absolute;
            top: 0;
            left: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 60px;
            height: 40px;
            background-color: #c92502;
            color: #fff;
            border-radius: 0 0 16px 0;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
                0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }

        .overview {
            line-height: 1.5;
            position: absolute;
            bottom: 0;
            background-color: rgba(201, 38, 2, 0.9);
            padding: 12px;
            color: #fff;
            transform: translateY(100%);
            transition: 0.3s ease-in-out all;
        }
    }

    .info {
        margin-top: auto;

        .title {
            margin-top: 8px;
            color: #fff;
            font-size: 20px;
        }

        .release {
            margin-top: 8px;
            color: #c9c9c9;
        }

        .button {
            margin-top: 8px;
        }
    }
}
</style>