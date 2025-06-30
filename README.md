# StickerShow
Sticker.Show 代码，仅限哥飞的朋友们社群成员使用

### 1. 右上角 Fork 本项目到你自己的 github 仓库

### 2. Clone你自己的仓库代码到本地

```bash
git clone (your git url)
```

### 3. 安装依赖

```bash
cd StickerShow && yarn
#or
cd StickerShow && npm install
#or
cd StickerShow && pnpm install
```

### 4. 复制 .env.example 重命名为 .env.local

修改.env.local其中的配置为你项目的配置，生产环境配置在 .env.production

### 5. 额外的配置

1) 谷歌登录认证配置 👉 [Google-Auth-Help](https://github.com/SoraWebui/SoraWebui/blob/login/help/Google-Auth.md)
2) 数据库配置 👉 Any PostgreSQL
3) 目录 /sql 下有需要的数据表，创建数据库并执行这些SQL创建数据表
4) R2的配置，为了存储生成的图片，需要去 Cloudflare 后台创建 bucket 后进行配置。项目用到了图像转换功能，通过URL来压缩图片，这个需要在 Cloudflare 的 「图像」->「转换」这里面针对具体的域名开启
5) Stripe 价格配置在 src/configs/stripeConfig.ts ，里面具体的的配置项需要你从 stripe 后台获取。
6) 对接 stripe 支付参考的是该项目👉 https://github.com/vercel/nextjs-subscription-payments
上边这个支付项目能单独运行，但它用的 supabase，当前项目是已经改成了支持任何 PostgreSQL 数据库的代码

### 6. 运行

```bash
yarn dev
#or
npm run dev
#or
pnpm dev
```

### 7. 在浏览器打开 [http://localhost](http://localhost)


## 注意！！！
### 1. 贴纸生成结果是通过接收 replicate 的回调，于是本地调试的时候，需要将 REPLICATE_WEBHOOK 这个配置成公网URL，可以配置 [ngrok](https://ngrok.com/) 来接收结果，本地就能处理生成的图片了

类似配置成：https://0123-153-121-77-112.ngrok-free.app，这个是需要你本地运行 ngrok 与 其云端服务对上后生成的，直接用这个是不会通的哈

线上时，REPLICATE_WEBHOOK 这个配置为你的线上域名就可以

### 2. 项目用到 vercel 的定时任务来将贴纸文本翻译为其他语言，线上版本时会生效，配置在 vercel.json 这个文件，设置的一分钟运行一次，免费账户有限制(应该是只能一天调用一次)，查看 vercel 的文档 https://vercel.com/docs/cron-jobs

当然，你可以删除 vercel.json 这个文件，那样就不会触发定时任务了。你可以采用别的方式来调用接口触发定时任务，比如你自己的服务器运行一个脚本定时调用接口来翻译

### 3. stripe 不激活的账号就是测试模式，就可以本地调通支付流程；对接支付参考的是这个项目👉 https://github.com/vercel/nextjs-subscription-payments

### 4. 最重要的是熟悉代码且会改代码，本项目对接 stripe 支付只是简易版本对接，各种边界条件没有考虑到。

比如本项目是支付后就无限制使用，没有对某个价格订阅的次数做限制，比如用户重复订阅的判断等等，这些需要你自己去完善。

每个人想给订阅增加的限制，无法做到通用配置，需要你自己去研究代码该怎么添加。

目前配置的是1个月付，1个年付，多个价格也可以，只是界面样式你得自己调整一下。

### 5. 本项目现有代码是能够跑通全流程的，只需将所有配置都做好。
配置项有点多，需要细心点去进行相关配置，不要遗漏。

如果上线的话，还需要配置stripe的webhook等配置。


## 有任何疑问联系 Wechat: GeFei55

