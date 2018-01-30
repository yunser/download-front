import Vue from 'vue'
import Router from 'vue-router'

const Home = resolve => require(['@/views/Home'], resolve)
const About = resolve => require(['@/views/About'], resolve)
const CodeGenerate = resolve => require(['@/views/CodeGenerate'], resolve)
const CodeGenerate2 = resolve => require(['@/views/CodeGenerate2'], resolve)
const Confusion = resolve => require(['@/views/Confusion'], resolve)
const Error404 = resolve => require(['@/views/error/Error404'], resolve)

Vue.use(Router)

let routes = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/about',
        component: About
    },
    {
        path: '/code/generate',
        component: CodeGenerate
    },
    {
        path: '/code/generate2',
        component: CodeGenerate2
    },
    {
        path: '/js/confusion',
        component: Confusion
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
