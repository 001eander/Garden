# Semantic Versioning with Conventional Commits

## Overview

Semantic Versioning (SemVer) is a versioning scheme that conveys meaning about the underlying changes in a release. When combined with Conventional Commits, version bumps can be automated based on commit message types.

## Semantic Versioning Specification

Given a version number MAJOR.MINOR.PATCH, increment the:

1. **MAJOR** version when you make incompatible API changes
2. **MINOR** version when you add functionality in a backward compatible manner
3. **PATCH** version when you make backward compatible bug fixes

Additional labels for pre-release and build metadata are available as extensions to the MAJOR.MINOR.PATCH format.

## Mapping Commit Types to Version Bumps

### Major Version Bump (X.0.0)
Triggered by:
- Commits with `BREAKING CHANGE:` footer
- Commits with `!` after type/scope
- Type: `feat!`, `fix!`, etc. (with exclamation mark)

**Examples:**
```
feat!: remove deprecated API endpoints
fix(api)!: change response format for /users endpoint

BREAKING CHANGE: Response format changed from XML to JSON
```

### Minor Version Bump (0.X.0)
Triggered by:
- `feat` type commits (new features)
- `perf` type commits (performance improvements that are backward compatible)

**Examples:**
```
feat(auth): add social login with Google
perf(db): optimize database queries for user search
```

### Patch Version Bump (0.0.X)
Triggered by:
- `fix` type commits (bug fixes)
- `docs` type commits (documentation updates)
- `style` type commits (code style changes)
- `refactor` type commits (code refactoring)
- `test` type commits (test updates)
- `chore` type commits (maintenance tasks)

**Examples:**
```
fix(ui): resolve button alignment issue
docs(readme): update installation instructions
style(css): fix indentation in stylesheet
```

## Automated Version Bumping

### Using standard-version
```json
{
  "scripts": {
    "release": "standard-version"
  }
}
```

```bash
# Dry run to see what would happen
npm run release -- --dry-run

# Release with specific type
npm run release -- --release-as major
npm run release -- --release-as minor
npm run release -- --release-as patch

# First release
npm run release -- --first-release
```

### Using semantic-release
```json
{
  "scripts": {
    "semantic-release": "semantic-release"
  }
}
```

Configuration (`.releaserc`):
```json
{
  "branches": ["main"],
  "plugins": [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    "@semantic-release/npm",
    "@semantic-release/github"
  ]
}
```

## Release Workflow

### 1. Development Phase
```bash
# Make commits following conventional format
git commit -m "feat: add new feature"
git commit -m "fix: resolve bug"
git commit -m "docs: update documentation"
```

### 2. Pre-release Phase
```bash
# Create release candidate
npm run release -- --prerelease alpha
# Version: 1.2.3-alpha.0

# Continue development
git commit -m "fix: additional fixes for alpha"
npm run release -- --prerelease alpha
# Version: 1.2.3-alpha.1
```

### 3. Release Phase
```bash
# Final release
npm run release
# Version: 1.2.3

# Or with specific bump
npm run release -- --release-as minor
# Version: 1.3.0
```

## Changelog Generation

### Conventional Changelog Format
```markdown
# Changelog

## [1.2.3] - 2024-01-15

### Features
- Add social login with Google (#123)
- Implement dark mode toggle (#124)

### Fixes
- Resolve button alignment issue (#125)
- Fix memory leak in data processing (#126)

### Documentation
- Update API documentation (#127)
- Add migration guide (#128)

### Breaking Changes
- Remove deprecated API endpoints (#129)
```

### Customizing Changelog
Create `.versionrc`:
```json
{
  "types": [
    {"type": "feat", "section": "Features"},
    {"type": "fix", "section": "Bug Fixes"},
    {"type": "docs", "section": "Documentation"},
    {"type": "style", "section": "Styles"},
    {"type": "refactor", "section": "Code Refactoring"},
    {"type": "perf", "section": "Performance Improvements"},
    {"type": "test", "section": "Tests"},
    {"type": "build", "section": "Build System"},
    {"type": "ci", "section": "Continuous Integration"},
    {"type": "chore", "section": "Chores"},
    {"type": "revert", "section": "Reverts"}
  ]
}
```

## Pre-release Labels

### Types of Pre-releases
- **alpha**: Early testing, unstable
- **beta**: Feature complete, testing
- **rc** (release candidate): Potentially shippable

### Creating Pre-releases
```bash
# Alpha release
npm run release -- --prerelease alpha
# Version: 1.2.3-alpha.0

# Beta release
npm run release -- --prerelease beta
# Version: 1.2.3-beta.0

# Release candidate
npm run release -- --prerelease rc
# Version: 1.2.3-rc.0
```

### Promoting Pre-releases
```bash
# Promote alpha to beta
npm run release -- --prerelease beta
# Version: 1.2.3-beta.0

# Promote to final release
npm run release
# Version: 1.2.3
```

## Version Metadata

### Build Metadata
Appended with `+`:
```
1.2.3+20130313144700
1.2.3+build.123
```

### Pre-release Versions
Appended with `-`:
```
1.2.3-alpha
1.2.3-alpha.1
1.2.3-beta.2
1.2.3-rc.3
```

## Best Practices

### 1. Commit Frequently
Small, atomic commits make versioning more accurate.

### 2. Use Feature Flags
For breaking changes, use feature flags to maintain backward compatibility.

### 3. Document Breaking Changes
Clearly document breaking changes in commit messages and changelog.

### 4. Test Before Release
Always test pre-releases before final release.

### 5. Communicate Changes
Use changelog to communicate changes to users.

## Common Scenarios

### Scenario 1: Hotfix Release
```bash
# Current version: 1.2.3
git commit -m "fix: critical security patch"
npm run release -- --release-as patch
# New version: 1.2.4
```

### Scenario 2: Major Release with Breaking Changes
```bash
# Current version: 1.2.3
git commit -m "feat!: remove deprecated API"
git commit -m "feat: add new API endpoints"
npm run release -- --release-as major
# New version: 2.0.0
```

### Scenario 3: Minor Release with Features
```bash
# Current version: 1.2.3
git commit -m "feat: add user profile page"
git commit -m "feat: implement search functionality"
npm run release
# New version: 1.3.0 (automatically detects feat commits)
```

## Tool Integration

### GitHub Actions
```yaml
name: Release
on:
  push:
    branches: [main]

jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run build
      - run: npm test
      - run: npm run semantic-release
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
```

### GitLab CI
```yaml
release:
  image: node:16
  stage: release
  only:
    - main
  script:
    - npm ci
    - npm run build
    - npm test
    - npm run semantic-release
  environment:
    name: production
```

## References
- [Semantic Versioning Specification](https://semver.org/)
- [Conventional Changelog](https://github.com/conventional-changelog/conventional-changelog)
- [standard-version](https://github.com/conventional-changelog/standard-version)
- [semantic-release](https://semantic-release.gitbook.io/)