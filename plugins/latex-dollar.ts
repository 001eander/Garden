import type { Plugin } from "@opencode-ai/plugin"

const transformLatexDelimiters = (text: string) => {
    let result = ""
    let index = 0
    let inFence = false
    let inInlineCode = false

    while (index < text.length) {
        if (!inInlineCode && text.startsWith("```", index)) {
            inFence = !inFence
            result += "```"
            index += 3
            continue
        }

        if (!inFence && text[index] === "`") {
            inInlineCode = !inInlineCode
            result += "`"
            index += 1
            continue
        }

        if (!inFence && !inInlineCode && text.startsWith("\\(", index)) {
            const close = text.indexOf("\\)", index + 2)
            if (close !== -1) {
                result += `$${text.slice(index + 2, close)}$`
                index = close + 2
                continue
            }
        }

        if (!inFence && !inInlineCode && text.startsWith("\\[", index)) {
            const close = text.indexOf("\\]", index + 2)
            if (close !== -1) {
                result += `$$${text.slice(index + 2, close)}$$`
                index = close + 2
                continue
            }
        }

        result += text[index]
        index += 1
    }

    return result
}

export const LatexDollarPlugin: Plugin = async ({ client }) => {
    await client.app.log({
        body: {
            service: "latex-dollar-plugin",
            level: "info",
            message: "Latex delimiter transformer loaded",
        },
    })

    return {
        "experimental.text.complete": async (_input, output) => {
            output.text = transformLatexDelimiters(output.text)
        },
    }
}
