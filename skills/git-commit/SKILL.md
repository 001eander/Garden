---
name: git-commit
description: Write professional git commits using conventional format for clear communication and automated workflows.
---

# Git Commit Skill

Write meaningful git commits using conventional commit format to improve collaboration, enable automation, and maintain clean project history.

## Commit Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Commit Types
- **feat**: New feature for users
- **fix**: Bug fix for users  
- **docs**: Documentation changes
- **style**: Code style (formatting, etc)
- **refactor**: Code restructuring
- **test**: Test additions/modifications
- **chore**: Maintenance tasks
- **perf**: Performance improvements
- **build**: Build system changes
- **ci**: CI configuration changes
- **revert**: Revert previous commit

### Subject Line Rules
- Use imperative mood: "Add feature" not "Added feature"
- First letter capitalized, no period at end
- Max 50 characters
- Describe what the commit does

### Body Guidelines
- Explain **why** the change was made
- Use bullet points for multiple changes
- Reference related issues: `Closes #123`, `Fixes #456`
- Max 72 characters per line

### Footer Elements
- Breaking changes: `BREAKING CHANGE: description`
- Issue references: `Closes #123`, `Fixes #456`
- Co-authors: `Co-authored-by: name <email>`

## Examples

**Feature with issue reference:**
```
feat(auth): add OAuth2 support

Implement Google and GitHub authentication with JWT tokens.
Add social login buttons to UI.

Closes #123
```

**Bug fix with explanation:**
```
fix(api): resolve null pointer in user endpoint

Add null check for user object before accessing properties.
Root cause: Missing validation in user lookup function.

Fixes #456
```

**Documentation update:**
```
docs(readme): update installation instructions

Add Docker installation option.
Document required environment variables.
```

## Workflow

1. **Stage selectively**: `git add -p`
2. **Review changes**: `git diff --cached`
3. **Write message**: Follow conventional format
4. **Commit**: `git commit -m "type(scope): subject" -m "body"`
5. **Verify**: `git log --oneline -1`

## Automation Tools

### Commitizen
Interactive commit message writing:
```bash
git add . && git cz
```

### commitlint
Validate commit messages:
```javascript
// commitlint.config.js
module.exports = {extends: ['@commitlint/config-conventional']}
```

### Conventional Changelog
Generate changelog from commits:
```bash
conventional-changelog -p angular -i CHANGELOG.md -s
```

### Semantic Release
Automated versioning based on commit types.

## Git Hooks

### commit-msg Hook
Validate commit message format in `.git/hooks/commit-msg`.

### pre-commit Hook  
Run tests and linting before commit:
```bash
npm test && npm run lint
```

## Best Practices

- Make atomic commits - one logical change per commit
- Write meaningful subject lines
- Explain reasoning in body, not just what changed
- Reference related issues
- Note breaking changes clearly
- Use interactive staging: `git add -p`
- Rebase for clean history: `git rebase -i HEAD~5`
- Sign important commits: `git commit -S`

## Quick Reference

### Common Commands
```bash
git commit -m "type(scope): subject"
git commit --amend
git add -p
git rebase -i HEAD~5
git log --oneline --graph --decorate
```

### Common Scopes
- `auth` - Authentication
- `api` - API endpoints  
- `ui` - User interface
- `db` - Database
- `docs` - Documentation

## Templates & References

See `templates/` directory for:
- `commit-message-template.md` - Complete commit templates
- `git-hook-examples.md` - Git hook implementations

See `references/` directory for:
- `conventional-commits.md` - Specification details
- `semantic-versioning.md` - Version bump mapping  
- `workflow-best-practices.md` - Team workflows