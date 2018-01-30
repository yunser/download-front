<template>
    <my-page title="代码片段生成">
        <ui-row gutter>
            <ui-col width="100" tablet="100" desktop="50">
                <div id="pageWrapper">
                    <form id="classForm" action="#" class="bs-docs-example form-horizontal" style="width:940px;margin:40px auto;padding:40px 10px;overflow:hidden;">
                        <div id="sqlBlock">
                            <h4>Sql语句
                                <ui-raised-button class="btn" label="生成类代码" primary @click="generate" />
                                <ui-raised-button class="btn" label="清空" @click="clear" />
                            </h4>
                            <textarea id="sqlcontent" v-model="sql" style="width:360px; height:300px;">CREATE TABLE `sys_user_detail` (
    `tbid` bigint(20) NOT NULL auto_increment,
    `realname` varchar(10) default NULL COMMENT '真实姓名',
    `logintime` timestamp NULL default NULL COMMENT '登录时间',
    `loginnum` int(11) default '0' COMMENT '登录次数',
    `data_flag` tinyint(4) NOT NULL default '0' COMMENT '数据标示',
    PRIMARY KEY  (`tbid`)
  ) ENGINE=InnoDB AUTO_INCREMENT=13862 DEFAULT CHARSET=utf8;
		      	</textarea>
                        </div>
                        <div id="javaBlock">
                            <h4>生成的Java类
                                <div v-html="result"></div>
                                <ui-raised-button class="btn" label="复制" @click="clear"/>
                                <input id="packageText" value="com.icode.sys" type="text"
                                       style="width:170px;margin-left:10px;">
                            </h4>
                        </div>
                    </form>
                </div>

            </ui-col>
            <ui-col width="100" tablet="100" desktop="50">
            </ui-col>
        </ui-row>

    </my-page>
</template>

<script>
    export default {
        data () {
            return {
                code: '',
                sql: `CREATE TABLE \`sys_user_detail\` (
    \`tbid\` bigint(20) NOT NULL auto_increment,
    \`realname\` varchar(10) default NULL COMMENT '真实姓名',
    \`logintime\` timestamp NULL default NULL COMMENT '登录时间',
    \`loginnum\` int(11) default '0' COMMENT '登录次数',
    \`data_flag\` tinyint(4) NOT NULL default '0' COMMENT '数据标示',
    PRIMARY KEY  (\`tbid\`)
  ) ENGINE=InnoDB AUTO_INCREMENT=13862 DEFAULT CHARSET=utf8;`,
                result: '123',
                text: '<img class="img" src="/static/img/gallery-{%d}.jpg">',
                start: 1,
                end: 3,
                images: ['http://tool2.yunser.com/asset/img/test1.jpg', 'http://tool2.yunser.com/asset/img/test2.jpg']
            }
        },
        mounted() {
            this.generate()
        },
        methods: {
            generate() {
                this.result = window.generateCode(this.sql)
                console.log(this.result)
            },
            clear() {
                this.sql = ''
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
