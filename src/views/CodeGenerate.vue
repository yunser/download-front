<template>
    <my-page title="代码片段生成" :page="page">
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
                <div class="tip">代码：</div>
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
        </div>
    </my-page>
</template>

<script>
    /* eslint-disable */
    export default {
        data () {
            return {
                code: '',
                text: '<img class="img" src="/static/img/gallery-{%d}.jpg">',
                // text: 'www.example.com/{h-c}.png',
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
                            href: 'https://project.yunser.com/products/9b0962309a5211e9a1ab97c6b9c075bb',
                            target: '_blank'
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
                let match = this.text.match(/\{(\w)-(\w)\}/)
                if (match) {
                    console.log('匹配', match)
                    let letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
                    let firstIndex = letters.indexOf(match[1])
                    let lastIndex = letters.indexOf(match[2])
                    let dire = firstIndex < lastIndex ? 1 : -1
                    console.log('firstIndex', firstIndex, lastIndex)
                    if (firstIndex < lastIndex) {
                        for (let i = firstIndex; i <= lastIndex; i++) {
                            this.images.push(this.text.replace(match[0], letters.charAt(i)))
                            console.log(this.text.replace(match[0], letters.charAt(i)))
                            console.log(letters.charAt(i))
                        }
                    } else {
                        for (let i = firstIndex; i >= lastIndex; i--) {
                            this.images.push(this.text.replace(match[0], letters.charAt(i)))
                            console.log(this.text.replace(match[0], letters.charAt(i)))
                            console.log(letters.charAt(i))
                        }
                    }
                    this.code = this.images.join('\n')

                //     let code = ''
                // for (let image of this.images) {
                //     code += image + '\n'
                // }
                // this.code = code
                    return
                }

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
