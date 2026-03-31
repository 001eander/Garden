# Conventional Commits Specification

## Overview

Conventional Commits is a specification for adding human and machine readable meaning to commit messages. This specification is inspired by, and based heavily on, the [Angular Commit Guidelines](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines).

## Specification

The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in [RFC 2119](https://www.ietf.org/rfc/rfc2119.txt).

### Commit Message Structure
```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Types
Types MUST be one of the following:

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **perf**: A code change that improves performance
- **test**: Adding missing tests or correcting existing tests
- **build**: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
- **ci**: Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)
- **chore**: Other changes that don't modify src or test files
- **revert**: Reverts a previous commit

### Scope
A scope MAY be provided after a type. A scope MUST consist of a noun describing a section of the codebase surrounded by parenthesis, e.g., `feat(parser):`

### Description
The description MUST immediately follow the colon and space after the type/scope prefix. The description is a short summary of the code changes, e.g., `fix: array parsing issue when multiple spaces were contained in string`.

### Body
The body MAY be provided after the short description. The body MUST begin one blank line after the description. The body is free-form and MAY consist of any number of newline separated paragraphs.

### Footer
The footer MAY be provided after the body, separated from the body by one blank line. The footer MUST contain additional issue references, breaking changes, and other metadata.

### Breaking Changes
A commit that has a footer `BREAKING CHANGE:`, or appends a `!` after the type/scope, introduces a breaking API change. A BREAKING CHANGE can be part of commits of any type.

## Examples

### Commit message with description and breaking change footer
```
feat: allow provided config object to extend other configs

BREAKING CHANGE: `extends` key in config file is now used for extending other config files
```

### Commit message with `!` to draw attention to breaking change
```
feat!: send an email to the customer when a product is shipped
```

### Commit message with scope and `!` to draw attention to breaking change
```
feat(api)!: send an email to the customer when a product is shipped
```

### Commit message with both `!` and BREAKING CHANGE footer
```
chore!: drop support for Node 6

BREAKING CHANGE: use JavaScript features not available in Node 6.
```

### Commit message with no body
```
docs: correct spelling of CHANGELOG
```

### Commit message with scope
```
feat(lang): add Polish language
```

### Commit message with multi-paragraph body and multiple footers
```
fix: prevent racing of requests

Introduce a request id and a reference to latest request. Dismiss
incoming responses other than from latest request.

Remove timeouts which were used to mitigate the racing issue but are
obsolete now.

Reviewed-by: Z
Refs: #123
```

## Why Use Conventional Commits?

### For Humans
- Automatically generating CHANGELOGs
- Automatically determining a semantic version bump (based on the types of commits landed)
- Communicating the nature of changes to teammates, the public, and other stakeholders
- Triggering build and publish processes
- Making it easier for people to contribute to your projects, by allowing them to explore a more structured commit history

### For Machines
- Parsing commit messages programmatically
- Generating release notes automatically
- Determining semantic version bumps
- Triggering deployment pipelines
- Analyzing commit patterns over time

## Tooling Support

### Commit Message Validation
- **commitlint**: Lint commit messages
- **husky**: Git hooks made easy
- **commitizen**: Prompt-based commit message writing

### Changelog Generation
- **conventional-changelog**: Generate a changelog from git metadata
- **standard-version**: Automatic versioning and CHANGELOG generation
- **semantic-release**: Fully automated version management and package publishing

### CI/CD Integration
- **GitHub Actions**: Automated checks on PRs
- **GitLab CI**: Pipeline validation
- **Jenkins**: Build triggers based on commit types

## Adoption Guide

### 1. Start Small
Begin with basic types: feat, fix, docs, chore

### 2. Add Tooling
Implement commitlint for validation

### 3. Generate Changelogs
Use conventional-changelog for automated changelogs

### 4. Full Automation
Implement semantic-release for complete automation

## Common Questions

### Q: What if I make a mistake in my commit message?
**A**: Use `git commit --amend` to fix the last commit's message, or `git rebase -i` for older commits.

### Q: How do I handle WIP (Work In Progress) commits?
**A**: Avoid WIP commits in main/master. Use feature branches and squash before merging.

### Q: What about merge commits?
**A**: Merge commits should follow the same format, typically: `Merge pull request #123 from branch/name`

### Q: How specific should scopes be?
**A**: Scopes should be meaningful but not overly specific. Common scopes: auth, api, ui, docs, tests, build.

## References
- [Official Specification](https://www.conventionalcommits.org/)
- [Angular Commit Guidelines](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines)
- [Commitizen](http://commitizen.github.io/cz-cli/)
- [Semantic Release](https://semantic-release.gitbook.io/)