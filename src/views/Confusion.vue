<template>
    <my-page title="Javascript 反混淆">
        <div class="common-container container">
            <div>开发中。。。</div>
            <ui-row gutter>
                <ui-col width="100" tablet="100" desktop="50">
                    <div id="wrap">
                        <h1>js反混淆</h1>
                        <div>
                            <fieldset id="options">
                                <h2>设置选项</h2>
                                <ul>
                                    <li><select name="tabsize" id="tabsize">
                                        <option value="1">缩进一个制表符</option>
                                        <option value="2">缩进2个空格</option>
                                        <option value="3">缩进3个空格</option>
                                        <option value="4" selected="selected">缩进4个空格</option>
                                        <option value="8">缩进8个空格</option>
                                    </select></li>
                                    <li><input type="checkbox" id="braces-on-own-line"><label for="braces-on-own-line">花括号独占一行</label><br></li>
                                    <li><input type="checkbox" id="preserve-newlines" checked="checked"><label for="preserve-newlines">保留空行</label><br></li>
                                    <li><input type="checkbox" id="detect-packers" checked="checked"><label for="detect-packers">检查是否压缩</label><br></li>
                                    <li><input type="checkbox" id="keep-array-indentation"><label for="keep-array-indentation">保留数组的压缩</label></li>
                                </ul>
                            </fieldset>
                            <fieldset id="textarea">
                                <div><textarea rows="30" cols="30" name="content" id="content"></textarea></div>
                                <button onclick="return do_js_beautify()" id="beautify">开始格式化</button>
                            </fieldset>
                        </div>
                        <div id="bottom">
                            <p>这个页面可以格式化JavaScript脚本和html代码，并且可以解压缩由JsPacker压缩过的脚本代码。
                            </p><h2>注意：虽然程序经过无数次的测试，但是建议您保存好源文档后再操作，方便维护的同时也避免不必要的损失。</h2>
                        </div>
                    </div>
                </ui-col>
                <ui-col width="100" tablet="100" desktop="50">
                    <ui-article class="article">
                        <h2>说明</h2>
                        <p>代码生成工具。</p>
                    </ui-article>
                </ui-col>
            </ui-row>
        </div>
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
                images: ['http://tool2.yunser.com/asset/img/test1.jpg', 'http://tool2.yunser.com/asset/img/test2.jpg']
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
