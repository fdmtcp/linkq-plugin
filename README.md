# LinkQ 플러그인

LinkQ 의 「업무」에서 「실행하기」를 누른 일을 내 컴퓨터의 Claude Code · Codex 가 받아 한 단계씩 돌리고, 단계마다 LinkQ 에 보고하는 플러그인이에요.

## Claude Code

```
/plugin marketplace add fdmtcp/linkq-plugin
/plugin install linkq@linkq
```

설치한 뒤 `/mcp` 에서 `plugin:linkq:linkq` 를 골라 LinkQ 계정으로 로그인해요. 업무는 LinkQ 에서 복사한 `/linkq:run rrun_…` 명령으로 받아요.

## Codex

```
codex plugin marketplace add fdmtcp/linkq-plugin
```

Codex 에서 `/plugins` 를 열고 LinkQ 탭에서 LinkQ 를 설치해요. 로그인 창이 뜨지 않으면 `codex mcp login linkq` 를 입력해요. 업무는 `$run` 으로 받아요.

자세한 안내는 LinkQ 문서의 「Claude · ChatGPT에 연결하기」에 있어요.
