<template>
    <my-page title="图片批量下载">
        <div class="common-container container">
            <section class="input-box">
                <div>
                    <label>开始数字：</label>
                    <ui-text-field v-model.number="start" />
                </div>
                <div>
                    <label>结束数字：</label>
                    <ui-text-field v-model.number="end" />
                </div>
                <div class="tip">网址：</div>
                <ui-text-field v-model.number="text" multiLine hintText="http://" :rows="2" />
                <!--<textarea class="form-control" v-model="text" rows="2" placeholder="http://"></textarea>-->
                <div class="btns">
                    <ui-raised-button label="预览图片" primary @click="compute" />
                </div>
                <div>这是所有将要下载的图片：</div>
                <ul class="image-list">
                    <li v-for="image in images">
                        <img :src="image">
                    </li>
                </ul>
            </section>
            <ui-article class="article">
                <h2>说明</h2>
                <p>有时候需要批量下载一些地址有规律的图片（如：xxx/1.jpg、xxx/2.jpg），这个工具可以帮到你。</p>
                <p>如何下载？鼠标右键、网页另存为，保存时会生成一个文件夹，图片在生成的文件夹里面。纯前端实现，不是后台打包下载，免得你们爆了我服务器。</p>
                <p>网址中用 {%d} 表示数字，比如 image{%d} 就会生成 image1、image2 之类的图片。</p>
                <p>如果要下载 image08、image09、image10 这样的图片，请使用 {%2d}，这样的话，小于 10 的数字前面就会自动补零。</p>
                <p>同理，要下载 image008、image009、image010 这样的图片，请使用 {%3d}</p>
            </ui-article>
        </div>
    </my-page>
</template>

<script>
    export default {
        data () {
            return {
                text: 'https://download.yunser.com/static/img/test{%d}.jpg',
                start: 1,
                end: 3,
                images: ['http://tool2.yunser.com/asset/img/test1.jpg', 'http://tool2.yunser.com/asset/img/test2.jpg']
            }
        },
        mounted() {
            this.compute()
        },
        methods: {
            compute() {
                this.images = []
                let is2d = this.text.match('{%2d}')
                let is3d = this.text.match('{%3d}')
                console.log(is2d)
                let url
                for (let i = this.start; i <= this.end; i++) {
                    if (is3d) {
                        if (i < 10) {
                            url = this.text.replace('{%3d}', '00' + i)
                        } else if (i < 100) {
                            url = this.text.replace('{%3d}', '0' + i)
                        } else {
                            url = this.text.replace('{%3d}', i)
                        }
                    } else if (is2d && i < 10) {
                        url = this.text.replace('{%2d}', '0' + i)
                    } else {
                        url = this.text.replace('{%d}', i)
                    }
                    this.images.push(url)
                }
            },
            clear() {
                this.text = ''
                this.compute()
            }
        }
    }
</script>

<style lang="scss" scoped>
    /**/
    .input-box {
        .btns {
            margin-bottom: 16px;
        }
        .tip {
            margin-bottom: 16px;
            color: #999;
        }
        textarea {
            margin-bottom: 16px;
        }
    }
    .result-box .info {
        margin-bottom: 16px;
    }
    .list-common {
        padding-left: 16px;
        li {
            list-style: disc;
        }
    }
    .section h3 {
        font-size: 18px;
        margin-bottom: 16px;
    }
    .image-list {
        overflow: hidden;
        li {
            float: left;
            margin-right: 16px;
            margin-top: 16px;
        }
        img {
            width: 80px;
            height: 80px;
        }
    }
</style>
