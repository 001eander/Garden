# Git Commit Workflow and Best Practices

## Overview

A well-defined git commit workflow ensures consistent, high-quality commits that facilitate collaboration, code review, and project maintenance. This guide outlines best practices for individual developers and teams.

## Individual Developer Workflow

### 1. Pre-Commit Phase

#### Check Current Status
```bash
# See what's changed
git status

# Review changes
git diff

# Check what would be committed
git diff --cached
```

#### Stage Changes Selectively
```bash
# Interactive staging (recommended)
git add -p

# Stage specific files
git add path/to/file.js

# Stage all changes (use with caution)
git add .
```

#### Run Local Checks
```bash
# Run tests
npm test

# Run linter
npm run lint

# Check types (if TypeScript)
npm run typecheck
```

### 2. Commit Phase

#### Write Commit Message
Follow the conventional commit format:
```
type(scope): subject

body

footer
```

#### Create Commit
```bash
# Simple commit
git commit -m "feat(auth): add social login"

# Commit with body
git commit -m "feat(auth): add social login" -m "Implement OAuth2 flow for Google and GitHub authentication"

# Use commit template
git commit
```

#### Verify Commit
```bash
# Check last commit
git log --oneline -1

# See full commit details
git show HEAD
```

### 3. Post-Commit Phase

#### Push Changes
```bash
# Push to remote
git push

# Push with upstream tracking
git push -u origin feature/social-login
```

#### Create Pull Request (if on feature branch)
- Link related issues
- Add reviewers
- Include testing instructions
- Update documentation

## Team Collaboration Workflow

### 1. Feature Branch Workflow

#### Create Feature Branch
```bash
# From main/master
git checkout main
git pull origin main
git checkout -b feature/feature-name
```

#### Develop with Regular Commits
```bash
# Make small, atomic commits
git add -p
git commit -m "feat(component): implement base structure"

# Continue development
git add -p
git commit -m "feat(component): add styling"
```

#### Keep Branch Updated
```bash
# Rebase on main regularly
git fetch origin
git rebase origin/main

# Resolve conflicts if any
# Continue rebase
git rebase --continue
```

#### Prepare for Review
```bash
# Squash commits if needed
git rebase -i origin/main

# Force push (only if not shared)
git push -f origin feature/feature-name
```

### 2. Code Review Process

#### Commit Organization for Review
- One commit per logical change
- Commits should build on each other
- Each commit should pass tests
- Include descriptive commit messages

#### PR Description Template
```markdown
## What
Brief description of changes

## Why
Reason for changes

## How
Implementation details

## Testing
- [ ] Unit tests added/updated
- [ ] Integration tests pass
- [ ] Manual testing performed

## Screenshots
If UI changes, include before/after

## Related Issues
Closes #123
```

### 3. Merge Strategies

#### Squash and Merge
- Combines all commits into one
- Clean history on main
- Use for feature branches

**Command**:
```bash
git merge --squash feature/branch
git commit -m "feat: add feature description"
```

#### Rebase and Merge
- Linear history
- Preserves individual commits
- Use for small, well-structured branches

**Command**:
```bash
git rebase main
git checkout main
git merge feature/branch --ff-only
```

#### Create Merge Commit
- Preserves branch topology
- Shows merge in history
- Use for long-lived branches

**Command**:
```bash
git merge --no-ff feature/branch
```

## Best Practices by Commit Type

### Feature Commits (`feat`)
- One feature per commit
- Include tests
- Update documentation
- Consider backward compatibility

**Example Workflow**:
```bash
# 1. Implement feature
git add -p
git commit -m "feat(auth): implement login form"

# 2. Add tests
git add -p
git commit -m "test(auth): add login form tests"

# 3. Update docs
git add -p
git commit -m "docs(auth): update authentication guide"
```

### Bug Fix Commits (`fix`)
- Include failing test first (Test-Driven Fix)
- Fix the issue
- Verify fix works

**Example Workflow**:
```bash
# 1. Add failing test
git add -p
git commit -m "test(api): add test for null pointer bug"

# 2. Fix the bug
git add -p
git commit -m "fix(api): resolve null pointer in user endpoint"

# 3. Verify fix
npm test
```

### Refactoring Commits (`refactor`)
- No behavior changes
- Include before/after if significant
- Run tests to ensure no regression

**Example**:
```bash
git commit -m "refactor(utils): extract validation functions

- Move validation logic from controllers to utils/validators.js
- Improve code reuse and testability
- No functional changes

Tests pass: All existing tests continue to pass"
```

## Advanced Workflow Patterns

### 1. Commit Squashing Strategy

#### When to Squash
- Multiple WIP commits
- Fixup commits
- Typos and minor fixes
- Before code review

#### How to Squash
```bash
# Interactive rebase
git rebase -i HEAD~5

# Mark commits as squash (s) or fixup (f)
pick abc123 feat: initial implementation
squash def456 fix: typo in variable name
squash ghi789 feat: add tests

# Write new commit message
```

### 2. Commit Splitting Strategy

#### When to Split
- Mixed concerns in one commit
- Feature and tests in same commit
- Documentation mixed with code

#### How to Split
```bash
# Reset to previous commit but keep changes
git reset HEAD~1

# Stage and commit parts separately
git add -p
git commit -m "feat: implement feature"
git add -p
git commit -m "test: add feature tests"
```

### 3. Bisect Workflow

#### Find Bug Introduction
```bash
# Start bisect
git bisect start
git bisect bad HEAD
git bisect good v1.0.0

# Test current commit
npm test

# Mark as good or bad
git bisect good  # if tests pass
git bisect bad   # if tests fail

# Continue until found
git bisect reset
```

## Quality Assurance Workflow

### 1. Pre-Commit Hooks
```bash
#!/bin/bash
# .git/hooks/pre-commit

# Run linter
npm run lint

# Run tests
npm test

# Check commit message format
# (see commit-msg hook examples)
```

### 2. CI/CD Integration

#### GitHub Actions Example
```yaml
name: CI
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run lint
      - run: npm test
      - run: npm run build
  
  commitlint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npx commitlint --from=origin/main --to=HEAD --verbose
```

### 3. Code Review Checklist

#### Commit Quality
- [ ] Follows conventional commit format
- [ ] Subject line ≤ 50 characters
- [ ] Body explains why, not what
- [ ] References related issues
- [ ] No debug code or console logs

#### Code Quality
- [ ] Tests added/updated
- [ ] No breaking changes without notice
- [ ] Documentation updated
- [ ] Follows project style guide

## Special Scenarios Workflow

### 1. Hotfix Releases

#### Workflow
```bash
# 1. Create hotfix branch
git checkout -b hotfix/critical-bug main

# 2. Fix the issue
git add -p
git commit -m "fix(security): patch critical vulnerability"

# 3. Create hotfix release
npm version patch
git push origin hotfix/critical-bug

# 4. Merge to main and develop
git checkout main
git merge hotfix/critical-bug
git checkout develop
git merge hotfix/critical-bug
```

### 2. Large Refactoring

#### Strategy
1. **Preparation**: Add tests, document current behavior
2. **Incremental changes**: Small, safe refactoring commits
3. **Feature flags**: Use toggles for risky changes
4. **Verification**: Continuous testing during refactor

#### Commit Pattern
```
refactor(module): extract component A
refactor(module): extract component B
refactor(module): reorganize module structure
feat(module): add new feature using refactored structure
```

### 3. Database Migrations

#### Workflow
```bash
# 1. Create migration
git add -p
git commit -m "feat(db): add users table migration"

# 2. Add rollback
git add -p
git commit -m "feat(db): add rollback for users table"

# 3. Update models
git add -p
git commit -m "feat(models): update User model for new schema"

# 4. Update application code
git add -p
git commit -m "feat(api): update endpoints for new user schema"
```

## Team Coordination

### 1. Commit Conventions Agreement

#### Team Agreement Document
```markdown
# Team Git Commit Convention

## Commit Types
- feat: New user-facing functionality
- fix: Bug fixes
- docs: Documentation only
- style: Code style (formatting, etc)
- refactor: Code restructuring
- test: Test additions/changes
- chore: Maintenance tasks

## Scope Examples
- ui: User interface components
- api: API endpoints
- auth: Authentication
- db: Database
- docs: Documentation

## Workflow
1. Create feature branch from main
2. Make atomic commits
3. Rebase on main regularly
4. Squash before PR review
5. Use conventional commit format
```

### 2. Regular History Cleanup

#### Monthly Cleanup
```bash
# Remove merged branches
git branch --merged main | grep -v "main" | xargs git branch -d

# Prune remote references
git fetch --prune

# Run git garbage collection
git gc
```

### 3. Documentation Updates

#### Keep Documentation in Sync
- Update README with new features
- Keep API documentation current
- Maintain changelog
- Document breaking changes

## Tools and Automation

### 1. Commitizen
```bash
# Interactive commit message writing
npm install -g commitizen
git add .
git cz
```

### 2. Husky + lint-staged
```json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged",
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
    }
  },
  "lint-staged": {
    "*.js": ["eslint --fix", "prettier --write"],
    "*.md": ["prettier --write"]
  }
}
```

### 3. Semantic Release
```json
{
  "release": {
    "branches": ["main"],
    "plugins": [
      "@semantic-release/commit-analyzer",
      "@semantic-release/release-notes-generator",
      "@semantic-release/npm",
      "@semantic-release/github"
    ]
  }
}
```

## Metrics and Improvement

### Track Commit Quality
- **Commit message compliance**: % of commits following convention
- **Atomic commits**: Average files changed per commit
- **Review time**: Time from PR creation to merge
- **Bug rate**: Bugs introduced per commit

### Continuous Improvement
1. **Regular retrospectives**: Review commit practices
2. **Tool updates**: Keep automation tools current
3. **Training**: Onboard new team members
4. **Documentation**: Keep guidelines up to date

## Emergency Procedures

### Skip Hooks (When Necessary)
```bash
# Skip pre-commit and commit-msg hooks
git commit --no-verify -m "fix: emergency security patch"

# Push with hooks skipped
git push --no-verify
```

### Revert Strategy
```bash
# Create revert commit
git revert <commit-hash>

# Or interactive revert
git revert -n <commit-hash>
# Review changes
git commit -m "revert: 'original commit message'"
```

## Summary Checklist

### Before Committing
- [ ] Code follows style guide
- [ ] Tests pass
- [ ] No debug code
- [ ] Changes are atomic
- [ ] Documentation updated if needed

### Writing Commit Message
- [ ] Follows conventional format
- [ ] Subject ≤ 50 characters
- [ ] Body explains why
- [ ] References issues
- [ ] Notes breaking changes

### After Committing
- [ ] Verify commit looks correct
- [ ] Push to remote if ready
- [ ] Create PR if on feature branch
- [ ] Update related documentation

## Resources
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Git Flow](https://nvie.com/posts/a-successful-git-branching-model/)
- [GitHub Flow](https://guides.github.com/introduction/flow/)
- [Semantic Versioning](https://semver.org/)