# AI 多媒体处理系统

一个基于 Next.js 和智谱 AI API 构建的多媒体处理系统，支持图片解析、AI 生图和 AI 生视频功能。

## 功能特点

- 🖼️ **图片解析**：上传图片 URL，智能分析图片内容
- 🎨 **AI 生图**：根据文本描述自动生成图片
- 🎬 **AI 生视频**：根据文本描述自动生成视频
- 🎯 **实时预览**：支持图片实时预览
- 🌈 **现代界面**：简约美观的用户界面
- 🌙 **深色模式**：支持明暗主题切换

## 技术栈

- Next.js 14
- TypeScript
- Tailwind CSS
- Shadcn/ui
- 智谱 AI API

## 开始使用

### 前置要求

- Node.js 18+
- pnpm
- 智谱 AI API Key（[获取方式](https://open.bigmodel.cn/)）

### 安装步骤

1. 克隆项目

```bash
git clone https://github.com/Vergil-coder/ai-multimedia-system.git
cd ai-multimedia-system
```

2. 安装依赖

```bash
pnpm install
```

3. 配置环境变量

```bash
cp .env.example .env.local
```

编辑 `.env.local` 文件，添加你的智谱 AI API 密钥：

```bash
ZHIPU_API_KEY=your_api_key
```

4. 启动开发服务器

```bash
pnpm dev
```

现在可以访问 http://localhost:3000 查看应用。

## 使用说明

### 图片解析

1. 切换到"图片解析"标签
2. 输入图片 URL
3. 点击"预览"查看图片
4. 输入分析提示（可选）
5. 点击"开始分析"获取结果

### AI 生图

1. 切换到"AI 生图"标签
2. 输入图片描述
3. 点击"开始生成"等待结果

### AI 生视频

1. 切换到"AI 生视频"标签
2. 输入视频描述
3. 点击"开始生成"等待结果
4. 生成过程可能需要几分钟，请耐心等待

## 环境变量说明

项目使用了以下环境变量：

- `ZHIPU_API_KEY`：智谱 AI 的 API 密钥，必需
  - 格式：`api_key.api_secret`
  - 获取方式：访问 [智谱 AI 开放平台](https://open.bigmodel.cn/)

⚠️ 注意：请勿在公共环境中暴露您的 API 密钥。

## 开发说明

### API 路由

- `/api/analyze`: 图片解析接口
- `/api/generate`: 图片生成接口
- `/api/generate-video`: 视频生成接口
- `/api/generate-video/status`: 视频生成状态查询接口

### 使用的模型

- 图片解析：`glm-4v-flash`
- 图片生成：`cogview-3-flash`
- 视频生成：`cogvideox-flash`

## 许可证

[MIT](LICENSE)
