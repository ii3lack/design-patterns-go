import {defineConfig} from 'vitepress'

export default defineConfig({
    title: 'Go设计模式精要',
    description: '22种设计模式的Go语言实现',
    base: '/design-patterns-go/',
    theme: './theme/index.mjs',
    themeConfig: {
        logo: '/logo.svg',
        nav: [
            {text: '首页', link: '/'},
            {text: 'GitHub', link: 'https://github.com/ii3lack/design-patterns-go.git'},
            {text: 'Gitee', link: 'https://gitee.com/i3lack/design-patterns-go.git'}
        ],
        sidebar: [
            {
                text: '创建型模式',
                collapsible: true,
                items: [
                    {text: '工厂方法', link: '/patterns/creational/factory-method'},
                    {text: '抽象工厂', link: '/patterns/creational/abstract-factory'},
                    {text: '单例', link: '/patterns/creational/singleton'},
                    {text: '建造者', link: '/patterns/creational/builder'},
                    {text: '原型', link: '/patterns/creational/prototype'}
                ]
            },
            {
                text: '结构型模式',
                collapsible: true,
                items: [
                    {text: '适配器', link: '/patterns/structural/adapter'},
                    {text: '桥接', link: '/patterns/structural/bridge'},
                    {text: '组合', link: '/patterns/structural/composite'},
                    {text: '装饰器', link: '/patterns/structural/decorator'},
                    {text: '外观', link: '/patterns/structural/facade'},
                    {text: '享元', link: '/patterns/structural/flyweight'},
                    {text: '代理', link: '/patterns/structural/proxy'}
                ]
            },
            {
                text: '行为型模式',
                collapsible: true,
                items: [
                    {text: '责任链', link: '/patterns/behavioral/chain-of-responsibility'},
                    {text: '命令', link: '/patterns/behavioral/command'},
                    {text: '解释器', link: '/patterns/behavioral/interpreter'},
                    {text: '迭代器', link: '/patterns/behavioral/iterator'},
                    {text: '中介者', link: '/patterns/behavioral/mediator'},
                    {text: '备忘录', link: '/patterns/behavioral/memento'},
                    {text: '观察者', link: '/patterns/behavioral/observer'},
                    {text: '状态', link: '/patterns/behavioral/state'},
                    {text: '策略', link: '/patterns/behavioral/strategy'},
                    {text: '模板方法', link: '/patterns/behavioral/template-method'},
                    {text: '访问者', link: '/patterns/behavioral/visitor'}
                ]
            }
        ],
        socialLinks: [
            {icon: 'github', link: 'https://github.com/yourusername/design-patterns-go'}
        ],
        footer: {
            message: '基于MIT许可发布',
            copyright: 'Copyright © 2023-present Your Name'
        }
    }
})