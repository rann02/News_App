<template>
    <div class="container edit-content">
        <span>Judul</span>
        <input type="text" v-model="content.title" />
        <span>Gambar</span>
        <input type="url" v-model="content.image" />
        <span>Content</span>
        <ckeditorNuxt v-model="content.text" class="ckeditor" />
        <div>
            <button class="button" @click="saveContent">Save</button>
            <NuxtLink class="button button-light" :to="{ name: 'index' }">Cancel</NuxtLink>
        </div>
    </div>
</template>

<script>
import CkeditorNuxt from "@/components/ckeditorNuxt";
export default {
    components: { CkeditorNuxt },
    data() {
        return {
            content: {
                title: '',
                image: '',
                text: '',
                key: this.$route.params.newskey
            }
        }
    },
    mounted() {
        if (this.content) {
            this.content.title = this.$store.state.article.title
            this.content.image = this.$store.state.article.content[0]
            this.content.text = this.$store.state.article.content.slice(1).toString()
        }
    }
    ,
    methods: {
        saveContent() {
            this.$store.commit('EDIT_ARTICLE', this.content)
            this.$router.push({
                path: '/'
            })
        }
    },
}
</script>

<style lang="scss" scoped>
.edit-content {
    display: flex;
    flex-direction: column;
    gap: 5px;
    padding-top: 100px;

    span {
        color: white;
        font-weight: 600;
    }

    input {
        width: 50%;
        height: 30px;
    }

    div {
        display: flex;
        justify-content: space-between;
        margin-top: 8px;
    }

}
</style>