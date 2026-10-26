import { readFileSync } from "node:fs";

/**
 * 고객용 플러그인이 LinkQ 커넥터와 같은 차례를 따르는지 잰다. LinkQ 저장소의 `apps/web/src/lib/linkqMcp.test.ts` 가 재던 것을 옮겨 왔다.
 *
 * ⚠ **run 스킬은 커넥터의 지시문과 같은 차례를 따라야 한다.** 한쪽만 고치면 승인자를 건너뛰는 길이 생긴다(INV-AGENT-11).
 * ⚠ **두 MCP 설정은 LinkQ 커넥터 하나에만 붙는다.**
 */
const CONNECTOR = "https://linkqueue.ai/api/mcp";
const problems = [];
const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

const skill = read("plugins/linkq/skills/run/SKILL.md");

for (const phrase of ["approval_status", "`items`", "이 대화의 사람에게 묻지 않는다", "돌려보내면"])
{
    if (!skill.includes(phrase))
    {
        problems.push(`run 스킬에 「${phrase}」가 없다. 승인자가 있는 단계의 차례를 지켜야 한다`);
    }
}

for (const path of ["plugins/linkq/.mcp.json", "plugins/linkq/mcp.json"])
{
    const servers = Object.values(JSON.parse(read(path)).mcpServers ?? {});

    if (servers.length !== 1 || servers[0].url !== CONNECTOR)
    {
        problems.push(`${path} 는 LinkQ 커넥터(${CONNECTOR}) 하나에만 붙어야 한다`);
    }
}

const versions = ["plugins/linkq/plugin.json", "plugins/linkq/.claude-plugin/plugin.json"].map((path) => JSON.parse(read(path)).version);

if (versions[0] !== versions[1])
{
    problems.push(`두 매니페스트의 판이 다르다: ${versions.join(" · ")}`);
}

if (problems.length > 0)
{
    console.error(problems.join("\n"));
    process.exit(1);
}

console.log("어긋난 자리 없음.");
