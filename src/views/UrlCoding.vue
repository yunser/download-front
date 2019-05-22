<template>
    <my-page title="下载地址加密解密" :page="page">
        <div class="common-container container">
            <div class="form-group">
                <label class="control-label">输入要加密的网址或要解密的迅雷、快车、旋风、电驴下载URL:</label>
                <div>
                    <ui-text-field  v-model="url" />
                    <!-- <input class="form-control" type="text" id="input" v-model="url" onclick="this.select();" onkeydown="if(event.keyCode===13){Encryption();}"> -->
                </div>
            </div>
            <div class="btns">
                <ui-raised-button class="btn" label="加密 URL" primary @click="Encryption" />
                <ui-raised-button class="btn" label="解密 URL" secondary @click="Decryption" />
            </div>
            <ui-article>
                <table class="table table-bordered" v-if="show == 1">
                    <tr>
                        <th width="160">迅雷地址</th>
                        <td><a target="_blank" :href="encodeUrl.thunder">{{ encodeUrl.thunder }}</a></td>
                    </tr>
                    <tr>
                        <th>快车地址</th>
                        <td><a target="_blank" :href="encodeUrl.flashget">{{ encodeUrl.flashget }}</a></td>
                    </tr>
                    <tr>
                        <th>旋风地址</th>
                        <td><a target="_blank" :href="encodeUrl.xuanfeng">{{ encodeUrl.xuanfeng }}</a></td>
                    </tr>
                </table>
                <table class="table table-bordered" v-if="show == 2">
                    <tr>
                        <th width="160">原始地址</th>
                        <td><a target="_blank" :href="decodeUrl.url">{{ decodeUrl.url }}</a></td>
                    </tr>
                </table>
                <div if="error">{{ error }}</div>
            </ui-article>
        </div>
    </my-page>
</template>

<script>
    /* eslint-disable */
    export default {
        data () {
            return {
                url: '',
                show: 0,
                encodeUrl: {
                    thunder: '',
                    flashget: '',
                    xuanfeng: ''
                },
                decodeUrl: {
                    url: ''
                },
                error: '',
                page: {
                    menu: [
                        {
                            type: 'icon',
                            icon: 'help',
                            to: '/urlCoding/help'
                        }
                    ]
                }
            }
        },
        mounted() {
        },
        methods: {
            Encryption() {
                var str = this.url.replace(/ +$/g, "");
                if (str.search(/^thunder|^flashget/i) == -1) {
                    var thunder = "AA" + str + "ZZ";
                    thunder = "thunder://" + encode64(strUnicode2Ansi(thunder));
                    var flashget = "[FLASHGET]" + str + "[FLASHGET]";
                    flashget = "flashget://" + encode64(strUnicode2Ansi(flashget)) + "&abc";
                    var xuanfeng = "qqdl://" + encode64(strUnicode2Ansi(str));

                    this.show = 1;
                    this.encodeUrl = {
                        thunder: thunder,
                        flashget: flashget,
                        xuanfeng: xuanfeng
                    };
                }
            },
            Decryption() {
                var str = this.url.replace(/ +$|\/$/g, "");
                if (str.search(/^thunder/i) != -1) {
                    str = str.replace("thunder://", "");
                    str = strAnsi2Unicode(decode64(str)).replace(/^AA|ZZ$/gi, "");

                    this.show = 2;
                    this.decodeUrl = {
                        url: str
                    };
                } else if (str.search(/^flashget/i) != -1) {
                    str = str.replace("flashget://", "");
                    str = str.replace(/&.*$/, "");
                    str = strAnsi2Unicode(decode64(str)).replace(/^\[FLASHGET\]|\[FLASHGET\]$/gi, "");

                    this.show = 2;
                    this.decodeUrl = {
                        url: str
                    };
                } else if (str.search(/^qqdl/i) != -1) {
                    str = str.replace("qqdl://", "");
                    str = strAnsi2Unicode(decode64(str));

                    this.show = 2;
                    this.decodeUrl = {
                        url: str
                    };
                } else {
                    this.error = '地址格式不正确，无法解密。'
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .btns {
        margin-top: 16px;
        margin-bottom: 16px;
        .btn {
            margin-right: 8px;
        }
    }
</style>
