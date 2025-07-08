# 项目目录结构说明

本文档详细描述了项目的目录结构及各文件/文件夹的主要作用，方便后续开发和维护。

## 项目根目录 (/freeins-website)

| 文件/文件夹 | 类型 | 作用 |
|------------|------|------|
| .gitignore | 文件 | Git版本控制忽略文件配置 |
| Dockerfile | 文件 | 容器化配置文件，用于构建Docker镜像 |
| README.md | 文件 | 项目说明文档 |
| eslint.config.mjs | 文件 | ESLint配置文件，用于代码规范检查 |
| next.config.js | 文件 | Next.js框架配置文件 |
| nginx.conf | 文件 | Nginx服务器配置文件 |
| package-lock.json | 文件 | 依赖版本锁定文件 |
| package.json | 文件 | 项目依赖及脚本配置 |
| postcss.config.mjs | 文件 | PostCSS配置文件，用于CSS处理 |
| tsconfig.json | 文件 | TypeScript配置文件 |
| public/ | 文件夹 | 静态资源目录，存放可直接访问的文件 |
| src/ | 文件夹 | 源代码目录 |

## public/ 目录

| 文件/文件夹 | 类型 | 作用 |
|------------|------|------|
| file.svg | 文件 | 文件图标 |
| globe.svg | 文件 |  globe图标 |
| images/ | 文件夹 | 图片资源目录 |
| next.svg | 文件 | Next.js官方图标 |
| sitemap.xml | 文件 | 网站地图 |
| vercel.svg | 文件 | Vercel图标 |
| window.svg | 文件 | 窗口图标 |

## src/ 目录

| 文件/文件夹 | 类型 | 作用 |
|------------|------|------|
| app/ | 文件夹 | Next.js 13+ App Router目录，包含页面和路由 |
| components/ | 文件夹 | 可复用UI组件目录 |
| i18n/ | 文件夹 | 国际化配置目录 |
| lib/ | 文件夹 | 工具函数和库目录 |
| messages/ | 文件夹 | 多语言翻译文件目录 |
| middleware.ts | 文件 | Next.js中间件，用于请求处理和路由控制 |

## src/messages/ 目录

存放各语言翻译文件，如：
- ar.json (阿拉伯语)
- fr.json (法语)
- vi.json (越南语)

每个文件包含对应语言的翻译键值对，用于国际化支持。