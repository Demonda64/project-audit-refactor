# Workflow – Solo Consultant

main is always stable and presentable.
All changes go through short-lived branches and pull requests.

## Branches

- main: stable, deployable
- dev: optional, only if needed

## Branch naming

feat/`<slug>`
fix/`<slug>`
docs/`<slug>`
chore/`<slug>`
perf/`<slug>`

## Pull Requests

All non-trivial changes require a PR (even solo).
Squash & merge recommended.

## Definition of Done

- Build OK
- Tests OK (if any)
- Docs updated if needed
- No secrets
- ADR added if architecture changed

## Hotfix

Use hotfix/`<slug>`, merge to main, tag patch version.
