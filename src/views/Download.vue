<template>
    <my-page title="下载">
        <div class="common-container container">
            <ui-raised-button label="下载" primary @click="download" />
        </div>
    </my-page>
</template>

<script>
    const saveAs = window.saveAs

    export default {
        data () {
            return {
            }
        },
        mounted() {
        },
        methods: {
            download() {
                if (!window.intent) {
                    return
                }
                if (window.intent.type.includes('text')) {
                    let extras = window.intent.action.extras
                    let fileName = '未命名.txt'
                    if (extras && extras.fileName) {
                        fileName = extras.fileName
                    }
                    let blob = new Blob([window.intent.data], {type: 'text/plain;charset=utf-8'})
                    saveAs(blob, fileName)
                }
            }
        }
    }
</script>

<style scoped>
</style>
