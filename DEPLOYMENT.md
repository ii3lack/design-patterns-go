# 部署文档到 GitHub Pages 和 Gitee Pages

## 项目概述

本项目使用 VitePress 构建文档，文档源代码位于 `docs/` 目录，构建命令为 `pnpm run docs:build`。

## 构建文档

1. 安装依赖：
   ```bash
   pnpm install
   ```

2. 构建文档：
   ```bash
   pnpm run docs:build
   ```

3. 构建产物会输出到 `docs/.vitepress/dist/` 目录。

## GitHub Pages 配置

### 方法一：手动部署

1. 创建一个名为 `gh-pages` 的分支：
   ```bash
   git checkout -b gh-pages
   git push -u origin gh-pages
   ```

2. 构建文档：
   ```bash
   pnpm run docs:build
   ```

3. 将构建产物复制到项目根目录：
   ```bash
   cp -r docs/.vitepress/dist/* .
   ```

4. 提交并推送：
   ```bash
   git add .
   git commit -m "Deploy docs"
   git push origin gh-pages
   ```

5. 配置 GitHub Pages：
   - 进入 GitHub 仓库的 Settings 页面
   - 点击左侧栏的 "Pages"
   - 在 "Source" 部分，选择 "Deploy from a branch"
   - 选择 "gh-pages" 分支和 "/ (root)" 目录
   - 点击 "Save"

### 方法二：使用 GitHub Actions 自动化部署

1. 创建 `.github/workflows/deploy.yml` 文件：
   ```yaml
   name: Deploy Docs

   on:
     push:
       branches:
         - main

   jobs:
     deploy:
       runs-on: ubuntu-latest
       steps:
         - name: Checkout
           uses: actions/checkout@v3
           with:
             fetch-depth: 0

         - name: Setup Node.js
           uses: actions/setup-node@v3
           with:
             node-version: 18

         - name: Install pnpm
           run: npm install -g pnpm

         - name: Install dependencies
           run: pnpm install

         - name: Build docs
           run: pnpm run docs:build

         - name: Deploy to GitHub Pages
           uses: peaceiris/actions-gh-pages@v3
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: ./docs/.vitepress/dist
             force_orphan: true
   ```

2. 提交并推送配置文件：
   ```bash
   git add .github/workflows/deploy.yml
   git commit -m "Add GitHub Actions deploy workflow"
   git push origin main
   ```

3. 配置 GitHub Pages：
   - 进入 GitHub 仓库的 Settings 页面
   - 点击左侧栏的 "Pages"
   - 在 "Source" 部分，选择 "Deploy from a branch"
   - 选择 "gh-pages" 分支和 "/ (root)" 目录
   - 点击 "Save"

## Gitee Pages 配置

### 方法一：手动部署

1. 创建一个名为 `gh-pages` 的分支（与 GitHub 保持一致）：
   ```bash
   git checkout -b gh-pages
   git push -u gitee gh-pages
   ```

2. 构建文档：
   ```bash
   pnpm run docs:build
   ```

3. 将构建产物复制到项目根目录：
   ```bash
   cp -r docs/.vitepress/dist/* .
   ```

4. 提交并推送到 Gitee：
   ```bash
   git add .
   git commit -m "Deploy docs"
   git push gitee gh-pages
   ```

5. 配置 Gitee Pages：
   - 进入 Gitee 仓库的服务页面
   - 点击 "Gitee Pages"
   - 选择 "gh-pages" 分支
   - 选择 "/ (root)" 目录
   - 点击 "启动"

### 方法二：使用 Gitee Actions 自动化部署

1. 创建 `.github/workflows/gitee-deploy.yml` 文件：
   ```yaml
   name: Deploy to Gitee Pages

   on:
     push:
       branches:
         - main

   jobs:
     deploy:
       runs-on: ubuntu-latest
       steps:
         - name: Checkout
           uses: actions/checkout@v3
           with:
             fetch-depth: 0

         - name: Setup Node.js
           uses: actions/setup-node@v3
           with:
             node-version: 18

         - name: Install pnpm
           run: npm install -g pnpm

         - name: Install dependencies
           run: pnpm install

         - name: Build docs
           run: pnpm run docs:build

         - name: Deploy to Gitee
           uses: wearerequired/git-mirror-action@master
           env:
             SSH_PRIVATE_KEY: ${{ secrets.GITEE_SSH_KEY }}
           with:
             source-repo: git@github.com:ii3lack/design-patterns-go.git
             destination-repo: git@gitee.com:i3lack/design-patterns-go.git

         - name: Deploy Gitee Pages
           uses: yanglbme/gitee-pages-action@main
           with:
             gitee-username: i3lack
             gitee-password: ${{ secrets.GITEE_PASSWORD }}
             gitee-repo: i3lack/design-patterns-go
             branch: gh-pages
             directory: docs/.vitepress/dist
   ```

2. 配置 Secrets：
   - 在 GitHub 仓库的 Settings 页面，点击左侧栏的 "Secrets and variables" → "Actions"
   - 添加以下 Secrets：
     - `GITEE_SSH_KEY`：Gitee 的 SSH 私钥
     - `GITEE_PASSWORD`：Gitee 的登录密码

3. 提交并推送配置文件：
   ```bash
   git add .github/workflows/gitee-deploy.yml
   git commit -m "Add Gitee Actions deploy workflow"
   git push origin main
   ```

4. 配置 Gitee Pages：
   - 进入 Gitee 仓库的服务页面
   - 点击 "Gitee Pages"
   - 选择 "gh-pages" 分支
   - 选择 "/ (root)" 目录
   - 点击 "启动"

## 注意事项

1. 确保 VitePress 配置文件中的 `base` 字段正确设置：
   ```javascript
   // docs/.vitepress/config.mjs
   export default defineConfig({
     base: '/design-patterns-go/',
     // ...
   })
   ```

2. GitHub Pages 通常需要几分钟时间来部署，Gitee Pages 可能需要手动刷新。

3. 如果使用自定义域名，需要在 GitHub 和 Gitee 的 Pages 设置中配置，并在 DNS 服务商处添加相应的 CNAME 记录。

4. 自动化部署需要配置正确的 Secrets，确保密钥安全。

## 访问地址

- GitHub Pages：`https://ii3lack.github.io/design-patterns-go/`
- Gitee Pages：`https://i3lack.gitee.io/design-patterns-go/`
