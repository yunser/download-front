import Vue from 'vue'
import Router from 'vue-router'

const Home = resolve => require(['@/views/Home'], resolve)
const Patch = resolve => require(['@/views/Patch'], resolve)
const CodeGenerate = resolve => require(['@/views/CodeGenerate'], resolve)
const CodeGenerateHelp = resolve => require(['@/views/CodeGenerateHelp'], resolve)
const UrlCoding = resolve => require(['@/views/UrlCoding'], resolve)
const UrlCodingHelp = resolve => require(['@/views/UrlCodingHelp'], resolve)
const Confusion = resolve => require(['@/views/Confusion'], resolve)
const Pattern = resolve => require(['@/views/Pattern'], resolve)
const Download = resolve => require(['@/views/Download'], resolve)
const Error404 = resolve => require(['@/views/error/Error404'], resolve)

Vue.use(Router)

let routes = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/patch',
        component: Patch
    },
    {
        path: '/UrlCoding',
        component: UrlCoding
    },
    {
        path: '/UrlCoding/help',
        component: UrlCodingHelp
    },
    {
        path: '/code/generate',
        component: CodeGenerate
    },
    {
        path: '/code/generate/help',
        component: CodeGenerateHelp
    },
    {
        path: '/pattern',
        component: Pattern
    },
    {
        path: '/js/confusion',
        component: Confusion
    },
    {
        path: '/download',
        component: Download
    },
    {
        path: '*',
        component: Error404
    }
]

let router = new Router({
    mode: 'history',
    routes: routes,
    scrollBehavior (to, from, savedPosition) {
        return {
            x: 0,
            y: 0
        }
    }
})

export default router
