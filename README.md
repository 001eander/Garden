# Garden

<div align="center">

![OpenCode](https://img.shields.io/badge/OpenCode-Config-7C3AED?style=for-the-badge)
![Agents](https://img.shields.io/badge/Agents-Iris%20%7C%20Astra%20%7C%20Lyra-10B981?style=for-the-badge)

**一个为优雅 AI 辅助开发而打造的 OpenCode 配置花园。**

这里收纳了个人 Agent、可复用 Skills，以及接入 MCP 的工作流配置；它像一座仍在生长的小花园，持续为日常开发提供陪伴与秩序。

</div>

## 亮点

- 以 **Iris** 为中心的多 Agent 协作体系，覆盖规划、研究、审查与执行。
- 可复用的 **Skills**，用于 git commit、Jupyter Notebook 脚手架等具体任务。
- 内置 **Context7 MCP** 集成，优先用于查询最新文档。
- 针对 Git、Python 与 JavaScript 工具链给出明确而统一的工作偏好。

## 仓库结构

```text
.
├── AGENTS.md              # 全局协作约定与工程习惯
├── agents/                # 自定义 Agent 角色与职责
├── skills/                # 可复用的任务技能
├── opencode.json          # OpenCode 运行时配置
└── memory/                # 本地记忆文件（已加入 gitignore）
```

## 特色 Agents

- **Iris** —— 忠诚、细致、优雅的主助手，负责个性化协作与日常支持。
- **Astra** —— 负责规范驱动开发，从计划到审查进行全流程协调。
- **Lyra** —— 擅长科研、论文梳理、实验设计与学术分析。
- **Spec 系列 agents** —— 围绕规范文档执行计划、构建与审查。

## Astra 与 Spec-Driven Development

`Astra` 是这套配置里专门负责 **规范驱动开发（Spec-Driven Development, SDD）** 的协调者。它不只是“写代码”，而是先把需求、设计与任务拆解整理成规范，再推动实现与审查，让开发过程更可追踪，也更不容易跑偏。

一套典型流程通常分成三步：

1. **Plan**：先梳理需求，产出 `requirements.md` / `design.md` / `tasks.md`
2. **Build**：按照任务清单逐项实现，并同步更新进度
3. **Review**：对照规范审查实现，确认需求、设计与代码一致

这种方式尤其适合：

- 需求复杂、容易变形的功能开发
- 需要多人协作或长期维护的项目
- 希望把“为什么这样做”清楚记录下来的任务

在这个仓库里，Astra 会与 `spec-plan`、`spec-build`、`spec-review` 这些专职 agents 配合，把“先想清楚，再动手实现，最后回到规范审查”这条链路串起来。相比直接开始编码，这种方式更稳，也更适合沉淀长期可复用的工作方法。

## 内置 Skills

- **git-commit** —— 帮助生成清晰、规范、便于协作的提交信息。
- **jupyter-notebook** —— 快速搭建整洁的教程型或实验型 Notebook。

## 工具偏好

- **Python**：优先使用 `uv`
- **JavaScript / TypeScript**：优先使用 `fnm` + `pnpm`
- **文档查询**：优先使用 **Context7**，其次才是通用网页抓取

## 设计理念

这个仓库追求可读的提示词、可复用的工作流、低摩擦的操作体验，以及尽可能平静而稳定的开发感受。目标不只是“能用”，也包括“好用”和“好看”。

## 许可证

- 本仓库原创内容采用 **Apache License 2.0**
- 第三方组件与外部集成说明见 [`THIRD_PARTY_NOTICES.md`](./THIRD_PARTY_NOTICES.md)

---

如果你把 OpenCode 当作日常主力环境，这里就是一套持续维护中的个性化配置方案。
