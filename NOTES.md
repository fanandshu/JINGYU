# 晶屿香疗 · 克隆笔记

## 源信息
- 原站 URL：https://xdtyto0zeq04.meoo.fun/
- 建站平台：Meoo 秒悟（站点由 Vite 打包的单页 React 应用部署，内容硬编码在 bundle 内）
- 源码获取：直接取线上部署包（`index.html` + `/assets/index-*.js|css`），非 GitHub 开源仓库
- 许可证：未声明（默认保留所有权利）→ 仅本地学习／复刻，公开部署前须替换品牌与素材，见文末风险
- 致谢：版式、文案、摄影素材版权归「晶屿 JINGYU」原作者

## 技术栈
- Vite 构建的单页应用，React + TanStack Router（单路由 `/`）+ TanStack Query + next-themes
- Tailwind CSS v4 编译产物；服务端无接口，所有内容写死在 `assets/app.js`
- 字体为系统字体栈，无 Web Font：
  - 标题 `"Songti SC", "Noto Serif SC", "Source Han Serif SC", "STSong", Georgia, serif`
  - 正文 `"PingFang SC", "Noto Sans SC", "Helvetica Neue", "Microsoft YaHei", sans-serif`
- 图片 6 张（1024×1024），来自 `conversation.cdn.meoo.host`，已全部本地化

## 复刻前预判
- 复杂度：L2（单页、纯前端、无 WebGL／无后端接口，交互为状态选择与手风琴）
- 模式：忠实复刻（直接复用线上部署包，逐字节保留结构与样式）
- 可高保真：全部版式、配色、文案、动效、响应式断点
- 不克隆：Meoo 平台注入的右下角「By Meoo 秒悟」水印、阿里云百炼安全脚本（与本设计无关）
- 主要风险：素材／文案版权；图片带 AI 生成水印

## 目录
```
index.html              交付入口（已去除 Meoo 水印与外链脚本）
assets/app.js           线上 bundle，仅改写：图片地址→本地、主题 storageKey
assets/app.css          线上样式，未改动
assets/images/*.png     6 张产品图
assets/favicon.ico
source/                 线上原始 JS/CSS 留档（原始 HTML 见 RECON/original-home.html）
RECON/                  侦察与验证证据（原始 HTML、截图、图片映射）
```

## 跑起来
```bash
python -m http.server 8123
# 打开 http://127.0.0.1:8123/
```
必须经 HTTP 打开：入口使用 ES module，`file://` 会被浏览器 CORS 拦截。

## 改了什么（对照原版）
1. 删除右下角固定悬浮的 `#meoo-brand-watermark`（“By Meoo 秒悟”卡片，含跳转 meoo.com 与关闭按钮）；`index.html` 另加首帧隐藏样式与节点清理脚本，即使平台在托管时重新注入角标也会立即移除。
2. 删除阿里云 `g.alicdn.com/sd/baxia/.../baxiaCommon.js` 安全脚本，页面不再有任何第三方运行时请求；若平台再次注入，同上的清理脚本会一并移除。
3. 6 张产品图从带 `auth_key` 的临时 CDN 地址下载到 `assets/images/`，bundle 内路径改为相对路径，避免签名过期后整页空图。
4. 资源引用改为相对路径（`assets/app.css`、`assets/app.js`、`assets/favicon.ico`），可在任意子路径预览。
5. 主题存储键 `meoo-theme` → `jingyu-theme`，清除平台品牌残留（页面无主题切换 UI，不影响表现）。
6. `source/` 保留线上原始三件套，作为逐字对照基准。

## 设计系统（取自线上 CSS 计算值，未改动）
| Token | 值 | 用途 |
|---|---|---|
| `--paper` | `oklch(96.81% 0.0074 80.72)` | 页面底色（暖白） |
| `--ink` | `oklch(22.25% 0.0041 84.59)` | 正文／标题 |
| `--mist` | `oklch(65.44% 0.0576 66.53)` | 次级文字、描边、序号 |
| `--radius` | `0.5rem` | 按钮、图片圆角 |
| `--gut` | `clamp(1.25rem, 5vw, 6rem)` | 左右留白 |
| `--screen-y` | `clamp(5.5rem, 14vh, 11rem)` | 每个 screen 区块的上下留白 |

版式语言：宋体大标题 + 无衬线正文，`screen` 区块最小一屏高，细线分隔；单一强调色即墨色，靠留白与字号建立层级。

## 页面结构（单页 6 段 + 页脚）
1. `#hero` 主张 + 6 个状态入口（入睡难／心浮气躁／午后疲惫／太阳穴发紧／经期不适／想送人）
2. `#match` 选中状态后展开对应产品（未选时为空态）
3. `#lineup` 五款：初见／夜航／晨白／拾光／守夜，各含精油、原石、规格、价格
4. `#why` 三条「为什么是水晶 + 精油」
5. `#how` 三步用法 + 安全提示
6. `#faq` 四个手风琴问答
7. 页脚：微信号 `jingyu_aroma` + 复制按钮 + 版权

## 交互
- 顶部固定导航（6 个锚点，`scroll-margin-top` 已预留 4.5rem）
- 状态选择：`aria-pressed` 切换，选中后 `#match` 以卡片动画展开对应产品，可「收起详情 / 清空 / 回上面换一个」
- FAQ 手风琴：`aria-expanded`，`grid-template-rows` 过渡
- 页脚「复制微信号」：Clipboard API，2 秒成功态
- `prefers-reduced-motion` 下关闭平滑滚动

## 原站 vs 克隆站
| 模块 | 原站表现 | 克隆实现 | 差异 / 取舍 | 证据 |
|---|---|---|---|---|
| 首屏 | 满屏留白 + 宋体大标题 + 状态入口 | 同一 bundle 渲染 | 无 | `RECON/screenshots/crop-hero.jpg` |
| 导航 | 顶部固定、锚点跳转 | 相同 | 无 | 线上 bundle `C2()` 组件 |
| 核心交互 | 状态→产品展开；FAQ 折叠 | 相同 | 未做自动化点击回放（见验证） | `assets/app.js` |
| 内容区块 | 6 段 + 页脚 | 相同 | 无 | 同上 |
| 移动端 | Tailwind 断点 420/640/1024/1280 | 相同 | 未逐档截图 | `assets/app.css` |
| 平台水印 | 右下角 By Meoo 秒悟 | 已删除（并保留运行时清理） | 本次要求的改动 | `index.html` 无该节点；内置 `#meoo-brand-watermark` 隐藏与移除逻辑 |

## 复刻评分
- 源证据：5/5（拿到线上部署包原件，非二手分析）
- 结构保真：5/5（同一 bundle，未重写）
- 视觉保真：5/5（CSS 原样）
- 动效/交互：4/5（代码同源，未做真实点击回放）
- 响应式：4/5（断点同源，未逐档截图）
- 功能完整：5/5（纯前端功能完整，无后端依赖）
- 内容替换：1/5（本任务为忠实复刻，未替换内容）
- 法务/部署风险：2/5（版权归属原品牌，见风险）
- 总评：忠实复刻达标；公开部署前需完成品牌与素材替换

## 验证
- [x] 静态检查：入口无外链、无 `{{placeholder}}`、无 TODO；6 张图片全部落地；bundle 内 0 个 `conversation.cdn.meoo.host` 引用
- [x] 整页渲染一次：1440×5471，页面正常排版，右下角无任何悬浮水印；证据 `RECON/screenshots/clone-1440.png`
- [x] 本地 HTTP 资源路径与大小写核对（`assets/app.js`、`assets/app.css`、`assets/images/*.png`）
- [ ] 交互回放：本环境浏览器自动化被沙箱拦截（spawn EPERM），未执行真实点击／滚动；交互结论来自同源 bundle 代码审阅
- [ ] 移动端逐档截图：同上，未执行
- 如实说明：整页截图由分段拼接产生，固定导航会在接缝处重复出现，属截图工具现象，不是页面布局缺陷

## 部署前须替换清单
- 品牌名「晶屿 JINGYU」、主张、全部文案
- 微信号 `jingyu_aroma`、价格、版权行
- 6 张产品图（带“AI生成 WORKBUDDY”角标）
- `assets/app.js` 内硬编码的内容对象 `Be` / `m0` / `g0` / `x2` / `_2` / `E2`
- 配色 token（`--paper` / `--ink` / `--mist`）如需换品牌色
