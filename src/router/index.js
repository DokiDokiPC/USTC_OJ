import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const PageNotFound = () => import(/* webpackChunkName: "route-page" */ "@/views/PageNotFound.vue");
const Index = () => import(/* webpackChunkName: "route-page" */ "@/views/Index.vue");
const Home = () => import(/* webpackChunkName: "route-page" */ "@/views/components/home/Home");
const Problem = () => import(/* webpackChunkName: "route-page" */ "@/views/components/problem/Problem");
const ProblemDetail = () => import(/* webpackChunkName: "route-page" */ "@/views/components/problem/ProblemDetail");
const AddProblem = () => import(/* webpackChunkName: "route-page" */ "@/views/components/problem/AddProblem");

const Contest = () => import(/* webpackChunkName: "route-page" */ "@/views/components/contest/Contest");
const ContestDetail = () => import(/* webpackChunkName: "route-page" */ "@/views/components/contest/ContestDetail");
const AddContest = () => import(/* webpackChunkName: "route-page" */ "@/views/components/contest/AddContest");

const Status = () => import(/* webpackChunkName: "route-page" */ "@/views/components/status/Status");
const StatusDetail = () => import(/* webpackChunkName: "route-page" */ "@/views/components/status/StatusDetail");

const User = () => import(/* webpackChunkName: "route-page" */ "@/views/components/user/User");
const UserDetail = () => import(/* webpackChunkName: "route-page" */ "@/views/components/user/UserDetail");
const routes = [
    {
        path: '/',
        name: 'index',
        component: Index,
        children: [
            {
                path: '/',
                name: 'home',
                component: Home,
            },
            {
                path: '/problem',
                name: 'problem',
                component: Problem,
            },
            {
                path: '/addProblem',
                name: 'addProblem',
                component: AddProblem,
            },
            {
                path: '/problem/:id',
                name: 'problemDetail',
                component: ProblemDetail,
            },

            {
                path: '/user',
                name: 'user',
                component: User,
            },
            {
                path: '/user/:id',
                name: 'userDetail',
                component: UserDetail,
            },
            {
                path: '/status',
                name: 'status',
                component: Status,
            },
            {
                path: '/status/:id',
                name: 'statusDetail',
                component: StatusDetail,
            },
            {
                path: '/contest',
                name: 'contest',
                component: Contest,
            },            {
                path: '/addContest',
                name: 'addContest',
                component: AddContest,
            },
            {
                path: '/contest/:id',
                name: 'contestDetail',
                component: ContestDetail,
            }
        ]
    },
    {
        path: '*',
        component: PageNotFound,
    }

];
const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (localStorage.getItem('token') == null) {
            next({
                name: 'login',
                query: {
                    next: to.fullPath
                }
            })
        }
    }
    next()
})

export default router;
