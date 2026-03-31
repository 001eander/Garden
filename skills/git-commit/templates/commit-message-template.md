# Git Commit Message Template

Use this template when writing commit messages. Copy the relevant section and fill in the details.

## Basic Template
```
<type>(<scope>): <subject>

<body>

<footer>
```

## Type Selection Guide

### Feature (New functionality)
```
feat(<scope>): <brief description>

- What feature was added
- Why it was added
- Any relevant technical details

Closes #<issue-number>
```

### Bug Fix
```
fix(<scope>): <brief description of fix>

- What was broken
- How it was fixed
- Root cause analysis if applicable

Fixes #<issue-number>
```

### Documentation
```
docs(<scope>): <brief description>

- What documentation was updated
- Why it needed updating
- Any new information added

Related to #<issue-number>
```

### Code Style
```
style(<scope>): <brief description>

- What style changes were made
- Why they were necessary
- Any tools used (prettier, eslint, etc)

No issue reference needed
```

### Refactoring
```
refactor(<scope>): <brief description>

- What was refactored
- Why refactoring was needed
- Improvements made

Refactors #<issue-number>
```

### Test
```
test(<scope>): <brief description>

- What tests were added/updated
- Why testing was needed
- Test coverage impact

Tests #<issue-number>
```

### Performance
```
perf(<scope>): <brief description>

- What performance improvement was made
- Before/after metrics if available
- Techniques used

Improves #<issue-number>
```

### Build/CI
```
build(<scope>): <brief description>

- What build/CI changes were made
- Why changes were needed
- Impact on build process

Related to #<issue-number>
```

### Chore (Maintenance)
```
chore(<scope>): <brief description>

- What maintenance task was performed
- Why it was necessary
- Any dependencies updated

No issue reference needed
```

## Scope Examples

### Frontend
- `feat(ui)`: User interface components
- `fix(button)`: Button component fixes
- `style(css)`: CSS/styling changes
- `refactor(component)`: Component refactoring

### Backend
- `feat(api)`: API endpoints
- `fix(auth)`: Authentication fixes
- `refactor(service)`: Service layer refactoring
- `perf(database)`: Database performance

### Infrastructure
- `build(docker)`: Docker configuration
- `ci(github)`: GitHub Actions workflows
- `chore(deps)`: Dependency updates

### Documentation
- `docs(readme)`: README updates
- `docs(api)`: API documentation
- `docs(guide)`: User guides

## Subject Line Examples

### Good Examples
- `feat(auth): add social login with GitHub`
- `fix(api): resolve null pointer in user endpoint`
- `docs(readme): update installation instructions`
- `refactor(utils): extract validation functions`
- `test(auth): add unit tests for login flow`

### Bad Examples
- `fixed bug` (too vague)
- `updates` (what updates?)
- `WIP` (avoid work-in-progress commits)
- `small fix` (be specific)

## Body Writing Guidelines

### Do's
- Explain **why** the change was made
- Describe the solution approach
- Mention alternatives considered
- Reference related issues/PRs
- Note any trade-offs

### Don'ts
- Don't just repeat what the code does
- Don't write novel-length explanations
- Don't include implementation details that are obvious from code
- Don't forget to mention breaking changes

## Footer Examples

### Issue References
```
Closes #123
Fixes #456
Resolves #789
Related to #101
```

### Breaking Changes
```
BREAKING CHANGE: <description of breaking change>
Migration guide: <link to migration guide>
```

### Co-authors
```
Co-authored-by: Name <email@example.com>
Co-authored-by: Another Name <another@example.com>
```

### Signed-off-by (for DCO)
```
Signed-off-by: Your Name <your.email@example.com>
```

## Complete Examples

### Example 1: Feature with Breaking Change
```
feat(api)!: migrate from REST to GraphQL

- Replace all REST endpoints with GraphQL schema
- Update client SDKs to use GraphQL queries
- Add GraphQL playground at /graphql

BREAKING CHANGE: All REST endpoints removed. Clients must migrate to GraphQL.
Migration guide: https://example.com/graphql-migration

Closes #123
Co-authored-by: Jane Doe <jane@example.com>
```

### Example 2: Bug Fix with Root Cause
```
fix(database): resolve connection pool exhaustion

- Increase connection pool size from 10 to 50
- Add connection timeout of 30 seconds
- Implement connection health checks

Root cause: Under high load, connections weren't being released properly.
Solution: Added proper connection lifecycle management.

Fixes #456
Performance impact: Reduces connection errors by 95%
```

### Example 3: Refactoring with Tests
```
refactor(auth): extract JWT validation middleware

- Move JWT validation logic from controllers to middleware
- Create reusable authenticate() middleware
- Update all protected routes to use middleware

Benefits:
- Code reuse across endpoints
- Consistent authentication behavior
- Easier testing of authentication logic

Tests: Added unit tests for authenticate middleware
Refactors #789
```

### Example 4: Documentation Update
```
docs(api): add OpenAPI specification

- Generate OpenAPI 3.0 specification from code
- Add interactive API documentation at /docs
- Include request/response examples
- Document all error responses

Tools used: Swagger UI, OpenAPI generator
Documentation available at: https://api.example.com/docs

Related to #101
```

## Special Cases

### Merge Commits
```
Merge pull request #123 from feature/social-login

feat(auth): add social login with Google and GitHub

- Implement OAuth2 flow for Google and GitHub
- Add social login buttons to UI
- Store social profiles in database

Closes #99
```

### Revert Commits
```
revert: "feat(api): add experimental caching layer"

This reverts commit abc123def456.

Reason: Caching layer causing data inconsistency issues.
Will be reimplemented with proper cache invalidation in next release.

Reverts #222
```

### Hotfix Releases
```
fix(security): patch critical XSS vulnerability

- Sanitize user input in comment system
- Add Content Security Policy headers
- Update dependencies with security fixes

Security: Critical - allows cross-site scripting attacks
CVE: CVE-2024-12345
Fixes #emergency-1
```

## Quality Checklist

Before committing, verify:
- [ ] Subject line ≤ 50 characters
- [ ] Body lines ≤ 72 characters
- [ ] Uses imperative mood in subject
- [ ] Explains why, not just what
- [ ] References related issues
- [ ] Notes breaking changes if any
- [ ] No debug code or console logs
- [ ] Tests pass
- [ ] Code follows style guide

## Quick Reference Card

### Common Commands
```bash
# Commit with message
git commit -m "type(scope): subject" -m "body"

# Amend last commit
git commit --amend

# Interactive staging
git add -p

# View commit history
git log --oneline --graph --decorate
```

### Common Types
- `feat`: New feature
- `fix`: Bug fix  
- `docs`: Documentation
- `style`: Code style
- `refactor`: Refactoring
- `test`: Tests
- `chore`: Maintenance

### Common Scopes
- `ui`: User interface
- `api`: API endpoints
- `auth`: Authentication
- `db`: Database
- `docs`: Documentation
- `build`: Build system