<template>
    <my-page title="代码片段生成" :page="page">
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
                <ui-raised-button label="生成代码" primary @click="compute" />
            </div>
            <div>生成的代码：</div>
            <pre><code>{{ code }}</code></pre>
            <!--<ul class="image-list">-->
            <!--<li v-for="image in images">-->
            <!--{{ image }}-->
            <!--</li>-->
            <!--</ul>-->
        </section>
    </my-page>
</template>

<script>
    export default {
        data () {
            return {
                code: '',
                text: '<img class="img" src="/static/img/gallery-{%d}.jpg">',
                start: 1,
                end: 3,
                images: [
                    'http://tool2.yunser.com/asset/img/test1.jpg',
                    'http://tool2.yunser.com/asset/img/test2.jpg'
                ],
                page: {
                    menu: [
                        {
                            type: 'icon',
                            icon: 'help',
                            to: '/code/generate/help'
                        }
                    ]
                }
            }
        },
        mounted() {
            this.compute()
        },
        methods: {
            compute: function () {
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
                let code = ''
                for (let image of this.images) {
                    code += image + '\n'
                }
                this.code = code
            },
            clear: function () {
                this.text = ''
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
