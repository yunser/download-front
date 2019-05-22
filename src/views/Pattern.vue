<template>
    <my-page title="纹理图片">
        <div class="common-container container">
            <ul class="pattern-list">
                <li class="item" v-for="pattern in list" 
                    :style="{'background-image': 'url(/static/img/pattern/' + pattern.url + ')'}">
                    <ui-icon-button class="view" 
                        @click="view(pattern)"
                        icon="remove_red_eye" />
                    <ui-icon-button class="download" 
                        :href="'/static/img/pattern/' + pattern.url"
                        :download="pattern.url"
                        icon="file_download" />
                </li>
            </ul>
            <div class="copyright">图片来自网络，如果无意中侵犯了您的版权，请来信告知，本站将在 3 个工作日内删除。</div>
            <div class="preview" v-if="previewVisible"
                @click="previewVisible = false"
                :style="{'background-image': 'url(/static/img/pattern/' + pattern.url + ')'}"></div>
        </div>
    </my-page>
</template>

<script>
    export default {
        data () {
            return {
                list: [
                    {
                        url: '1.jpg'
                    },
                    {
                        url: '2.png'
                    },
                    {
                        url: '3.png'
                    },
                    {
                        url: '4.jpg'
                    },
                    {
                        url: '5.jpg'
                    },
                    {
                        url: '6.jpg'
                    },
                    {
                        url: '7.jpg'
                    },
                    {
                        url: '8.jpg'
                    },
                    {
                        url: '9.jpg'
                    },
                    {
                        url: '10.png'
                    },
                    {
                        url: '11.png'
                    },
                    {
                        url: '12.png'
                    }
                ],
                previewVisible: false,
                pattern: null
            }
        },
        mounted() {
            this.$http.get('/version').then(
                response => {
                    let data = response.data
                    if (data.code === 200) {
                        console.log(data)
                        this.version = data.data
                    }
                },
                response => {
                    console.log(response)
                })
        },
        methods: {
            view(pattern) {
                this.pattern = pattern
                this.previewVisible = true
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '../scss/var';

    .container {
        max-width: 1200px;
    }

    .pattern-list {
        display: flex;
        flex-wrap: wrap;
        .item {
            position: relative;
            float: left;
            width: 300px;
            height: 300px;
            margin-right: 16px;
            margin-bottom: 16px;
            box-shadow: 0 1px 6px rgba(0,0,0,.117647), 0 1px 4px rgba(0,0,0,.117647);
            &:hover {
                .download {
                    display: block;
                    opacity: 1;
                }
                .view {
                    display: block;
                    opacity: 1;
                }
            }
        }
        .download {
            // display: none;
            position: absolute;
            bottom: 8px;
            right: 8px;
            background-color: #fff;
            opacity: 0;
            transition: all .45s cubic-bezier(.23,1,.32,1);
        }
        .view {
            // display: none;
            position: absolute;
            bottom: 8px;
            right: 64px;
            background-color: #fff; 
            opacity: 0;
            transition: all .45s cubic-bezier(.23,1,.32,1);
        }
    }
    .preview {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 10000;
    }
    .copyright {
        margin: 16px 0;
        color: #999;
    }
</style>
