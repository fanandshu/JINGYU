# 克隆审计 · 晶屿香疗

审计范围：交付文件 `index.html`、`assets/app.js`、`assets/app.css`、`assets/images/*`、`assets/favicon.ico`。  
`source/` 为线上原始文件留档（含平台水印与外链），`RECON/` 为侦察证据，均不参与部署。

## 1. 追踪脚本 / 第三方运行时
- 交付页面：**0 个**第三方脚本。已删除阿里云 `baxiaCommon.js`。
- `assets/app.js` 内仅有 React 错误文档字符串 `https://react.dev/errors/` 与 `http://localhost` 判断逻辑，均为惰性代码，不发起请求。
- 无 Google Analytics / GTM / 像素 / 热图。

## 2. 平台品牌残留
- 已删除 `#meoo-brand-watermark`（“By Meoo 秒悟”悬浮卡片）与 `meoo-logo.png` 引用。
- `index.html` 内置兜底：首帧 CSS 隐藏匹配节点，并用 `MutationObserver` 在平台重新注入时立即移除（含 `#meoo-baxia-web-security`），避免托管环境把角标加回来。
- 主题存储键已由 `meoo-theme` 改为 `jingyu-theme`。
- 交付文件渲染文本检索 `meoo` / `秒悟`：**0 处**；仅 `index.html` 的清理脚本包含 `meoo-*` 选择器，用于拦截平台重新注入，不显示任何品牌内容。
- `RECON/original-home.html` 为线上原始 HTML 证据，保留原始水印，不部署。

## 3. 字体
- 原站未使用 Web Font，无 `@font-face`、无字体 CDN。
- 标题宋体栈、正文黑体栈原样保留（`Songti SC / Noto Serif SC / STSong` 与 `PingFang SC / Microsoft YaHei`），不构成“系统字体近似”问题。

## 4. 图片
- 6 张产品图全部下载至 `assets/images/`，命名语义化：`chujian / yehang / chenbai / shiguang / shouye / sishilihe`。
- 原 CDN 链接带 `auth_key` 签名，会过期；交付文件中 **0 个** `conversation.cdn.meoo.host` 引用。
- 图片原始比例 1:1（1024×1024），页面按 `aspect-square` 呈现，未裁切变形；每张均有中文 alt。
- 注意：原图右下角带“AI生成 WORKBUDDY”角标，属原始素材，未做修改。

## 5. 颜色与视觉
- 配色直接取自线上 CSS：`--paper: oklch(96.81% .0074 80.72)`、`--ink: oklch(22.25% .0041 84.59)`、`--mist: oklch(65.44% .0576 66.53)`。
- 未新增任何色值、渐变或装饰。

## 6. 交互与可访问性
- 状态按钮 `aria-pressed`、FAQ `aria-expanded`、复制按钮成功态、导航锚点均保留原实现。
- 存在 `:focus-visible` 规则（15 处），按钮最小高度 44px（`min-h-11`）。
- 未验证：真实点击 / 键盘 Tab 序列 / 移动端断点截图（本环境浏览器自动化被沙箱拦截）。

## 7. 外部依赖 / 链接
- 交付页面无外链、无远程字体、无远程图片、无 iframe。
- 页脚 copy 中仅微信号与版权文字。

## 8. 结论
交付文件可离线运行（需 HTTP 服务，勿用 `file://`）。  
**不建议公开部署**：文案、品牌与产品图版权归原站，许可证未声明；上线前按 `NOTES.md` 的替换清单完成品牌化。
