# Git Hook Examples for Commit Validation

## Overview

Git hooks are scripts that run automatically when certain Git events occur. They can be used to enforce commit message conventions, run tests, check code style, and more.

## Hook Locations

- **Local hooks**: `.git/hooks/` in each repository
- **Shared hooks**: Can be configured via `git config core.hooksPath`

## Essential Hooks for Commit Quality

### 1. commit-msg Hook

Validates commit message format.

**Location**: `.git/hooks/commit-msg`

```bash
#!/bin/bash

# commit-msg hook to validate conventional commit format

COMMIT_MSG_FILE=$1
COMMIT_MSG=$(cat "$COMMIT_MSG_FILE")

# Check if message follows conventional format
if ! echo "$COMMIT_MSG" | head -1 | grep -qE "^(feat|fix|docs|style|refactor|test|chore|perf|build|ci|revert)(\([^)]+\))?: .{1,50}$"; then
    echo "❌ ERROR: Commit message does not follow conventional format"
    echo ""
    echo "Expected: type(scope): subject"
    echo "Example: feat(auth): add social login"
    echo ""
    echo "Your message:"
    echo "$COMMIT_MSG" | head -1
    echo ""
    echo "Allowed types: feat, fix, docs, style, refactor, test, chore, perf, build, ci, revert"
    exit 1
fi

# Check subject line length
SUBJECT_LINE=$(echo "$COMMIT_MSG" | head -1)
SUBJECT_LENGTH=${#SUBJECT_LINE}
if [ "$SUBJECT_LENGTH" -gt 50 ]; then
    echo "❌ ERROR: Subject line too long ($SUBJECT_LENGTH characters)"
    echo "Keep subject line under 50 characters"
    echo ""
    echo "Your subject: $SUBJECT_LINE"
    exit 1
fi

# Check body line length (if body exists)
if [ $(echo "$COMMIT_MSG" | wc -l) -gt 1 ]; then
    BODY_START=2
    while IFS= read -r line; do
        if [ ${#line} -gt 72 ]; then
            echo "❌ ERROR: Body line too long (${#line} characters)"
            echo "Keep body lines under 72 characters"
            echo ""
            echo "Problem line: $line"
            exit 1
        fi
    done < <(tail -n +$BODY_START "$COMMIT_MSG_FILE")
fi

echo "✅ Commit message validation passed"
exit 0
```

### 2. pre-commit Hook

Runs before commit is created. Good for linting and tests.

**Location**: `.git/hooks/pre-commit`

```bash
#!/bin/bash

# pre-commit hook to run linting and tests

echo "🚀 Running pre-commit checks..."

# Check for unstaged changes that should be staged
UNSTAGED_FILES=$(git diff --name-only)
if [ -n "$UNSTAGED_FILES" ]; then
    echo "⚠️  Warning: You have unstaged changes:"
    echo "$UNSTAGED_FILES"
    echo ""
    echo "Consider using 'git add -p' to stage changes selectively"
fi

# Run linter if available
if command -v eslint &> /dev/null && [ -f .eslintrc.js ] || [ -f .eslintrc.json ]; then
    echo "📝 Running ESLint..."
    if ! npx eslint --fix --quiet .; then
        echo "❌ ESLint failed. Fix errors before committing."
        exit 1
    fi
fi

# Run formatter if available
if command -v prettier &> /dev/null && [ -f .prettierrc ] || [ -f .prettierrc.json ]; then
    echo "🎨 Running Prettier..."
    if ! npx prettier --write --loglevel error .; then
        echo "❌ Prettier failed. Fix formatting before committing."
        exit 1
    fi
fi

# Run tests if available
if [ -f package.json ] && grep -q '"test"' package.json; then
    echo "🧪 Running tests..."
    if ! npm test -- --passWithNoTests; then
        echo "❌ Tests failed. Fix tests before committing."
        exit 1
    fi
fi

# Check for debug statements
echo "🔍 Checking for debug statements..."
if git diff --cached --name-only | xargs grep -n "console\.log\|debugger\|TODO\|FIXME" 2>/dev/null; then
    echo "⚠️  Warning: Found debug statements or TODOs in staged files"
    echo "Remove or comment them before committing"
    # Uncomment next line to make this a hard failure
    # exit 1
fi

echo "✅ All pre-commit checks passed!"
exit 0
```

### 3. prepare-commit-msg Hook

Can be used to generate commit message templates.

**Location**: `.git/hooks/prepare-commit-msg`

```bash
#!/bin/bash

# prepare-commit-msg hook to provide commit message template

COMMIT_MSG_FILE=$1
COMMIT_SOURCE=$2
SHA1=$3

# Only add template for new commits, not for amend or merge
if [ -z "$COMMIT_SOURCE" ] || [ "$COMMIT_SOURCE" = "message" ]; then
    cat > "$COMMIT_MSG_FILE" << 'EOF'
# <type>(<scope>): <subject>
# |<----  Using a Maximum Of 50 Characters  ---->|
#
# Explain why this change is being made
# |<----   Try To Limit Each Line to 72 Characters   ---->|
#
# Provide links or references to any relevant tickets, articles or other resources
# --- COMMIT END ---
EOF
fi
```

### 4. pre-push Hook

Runs before pushing to remote. Good for integration tests.

**Location**: `.git/hooks/pre-push`

```bash
#!/bin/bash

# pre-push hook to run integration tests

echo "🚀 Running pre-push checks..."

# Get current branch
CURRENT_BRANCH=$(git symbolic-ref --short HEAD)

# Skip checks for certain branches
if [ "$CURRENT_BRANCH" = "main" ] || [ "$CURRENT_BRANCH" = "master" ]; then
    echo "⚠️  Pushing to $CURRENT_BRANCH - running additional checks..."
    
    # Run integration tests
    if [ -f package.json ] && grep -q '"test:integration"' package.json; then
        echo "🧪 Running integration tests..."
        if ! npm run test:integration; then
            echo "❌ Integration tests failed. Fix before pushing to $CURRENT_BRANCH."
            exit 1
        fi
    fi
    
    # Check for WIP commits
    echo "🔍 Checking for WIP commits..."
    if git log --oneline origin/$CURRENT_BRANCH..HEAD | grep -i "wip\|work in progress"; then
        echo "❌ Found WIP commits. Remove or fix before pushing to $CURRENT_BRANCH."
        exit 1
    fi
fi

# Run build if available
if [ -f package.json ] && grep -q '"build"' package.json; then
    echo "🔨 Running build..."
    if ! npm run build; then
        echo "❌ Build failed. Fix before pushing."
        exit 1
    fi
fi

echo "✅ All pre-push checks passed!"
exit 0
```

## Language-Specific Hooks

### Python Project Hooks

**pre-commit for Python**:
```bash
#!/bin/bash

echo "🐍 Running Python pre-commit checks..."

# Check Python syntax
echo "🔍 Checking Python syntax..."
if ! python -m py_compile $(git diff --cached --name-only --diff-filter=ACM | grep '\.py$'); then
    echo "❌ Python syntax errors found"
    exit 1
fi

# Run black formatter
if command -v black &> /dev/null; then
    echo "🎨 Running black..."
    black $(git diff --cached --name-only --diff-filter=ACM | grep '\.py$')
fi

# Run isort
if command -v isort &> /dev/null; then
    echo "📦 Running isort..."
    isort $(git diff --cached --name-only --diff-filter=ACM | grep '\.py$')
fi

# Run flake8
if command -v flake8 &> /dev/null; then
    echo "📝 Running flake8..."
    if ! flake8 $(git diff --cached --name-only --diff-filter=ACM | grep '\.py$'); then
        echo "❌ Flake8 errors found"
        exit 1
    fi
fi

# Run mypy if available
if command -v mypy &> /dev/null && [ -f pyproject.toml ] || [ -f mypy.ini ]; then
    echo "🔍 Running mypy..."
    if ! mypy $(git diff --cached --name-only --diff-filter=ACM | grep '\.py$'); then
        echo "❌ Mypy type errors found"
        exit 1
    fi
fi

echo "✅ Python checks passed!"
```

### Node.js/JavaScript Project Hooks

**pre-commit for Node.js**:
```bash
#!/bin/bash

echo "⬢ Running Node.js pre-commit checks..."

# Check for package.json changes that need lockfile update
if git diff --cached --name-only | grep -q package.json && ! git diff --cached --name-only | grep -q package-lock.json; then
    echo "⚠️  Warning: package.json changed but package-lock.json not updated"
    echo "Run 'npm install' to update lockfile"
    # exit 1  # Uncomment to make this a hard requirement
fi

# Run TypeScript compiler if available
if [ -f tsconfig.json ]; then
    echo "📘 Running TypeScript compiler..."
    if ! npx tsc --noEmit; then
        echo "❌ TypeScript compilation failed"
        exit 1
    fi
fi

# Run Jest tests
if [ -f package.json ] && grep -q '"jest"' package.json || [ -f jest.config.js ]; then
    echo "🧪 Running Jest tests..."
    if ! npx jest --passWithNoTests; then
        echo "❌ Jest tests failed"
        exit 1
    fi
fi

echo "✅ Node.js checks passed!"
```

## Advanced Hook Examples

### 1. Commit Message with JIRA Integration

**commit-msg with JIRA**:
```bash
#!/bin/bash

COMMIT_MSG_FILE=$1
COMMIT_MSG=$(cat "$COMMIT_MSG_FILE")

# Extract JIRA ticket from branch name
BRANCH_NAME=$(git branch --show-current)
JIRA_TICKET=$(echo "$BRANCH_NAME" | grep -oE '[A-Z]+-[0-9]+')

if [ -n "$JIRA_TICKET" ]; then
    # Check if JIRA ticket is already in commit message
    if ! echo "$COMMIT_MSG" | grep -q "$JIRA_TICKET"; then
        # Add JIRA ticket to commit message
        echo "[$JIRA_TICKET] $COMMIT_MSG" > "$COMMIT_MSG_FILE"
        echo "✅ Added JIRA ticket $JIRA_TICKET to commit message"
    fi
fi

# Continue with conventional commit validation
# ... (rest of validation logic)
```

### 2. Automated Changelog Entry

**post-commit hook**:
```bash
#!/bin/bash

# post-commit hook to update changelog draft

COMMIT_MSG=$(git log -1 --pretty=%B)
CHANGELOG_DRAFT="CHANGELOG.draft.md"

# Parse commit type
if echo "$COMMIT_MSG" | head -1 | grep -q "^feat"; then
    TYPE="✨ Features"
elif echo "$COMMIT_MSG" | head -1 | grep -q "^fix"; then
    TYPE="🐛 Bug Fixes"
elif echo "$COMMIT_MSG" | head -1 | grep -q "^docs"; then
    TYPE="📚 Documentation"
else
    TYPE="🔧 Other Changes"
fi

# Extract subject
SUBJECT=$(echo "$COMMIT_MSG" | head -1 | sed 's/^[^:]*: //')

# Append to draft changelog
echo "- $SUBJECT" >> "$CHANGELOG_DRAFT"

echo "📝 Added entry to $CHANGELOG_DRAFT"
```

### 3. Branch Name Validation

**pre-commit with branch validation**:
```bash
#!/bin/bash

# Validate branch naming convention

BRANCH_NAME=$(git branch --show-current)

# Allowed branch patterns
if [[ ! "$BRANCH_NAME" =~ ^(main|master|develop|feature/[a-z0-9-]+|bugfix/[a-z0-9-]+|hotfix/[a-z0-9-]+|release/[0-9]+\.[0-9]+\.[0-9]+)$ ]]; then
    echo "❌ Invalid branch name: $BRANCH_NAME"
    echo ""
    echo "Allowed branch patterns:"
    echo "  - feature/feature-name"
    echo "  - bugfix/bug-description"
    echo "  - hotfix/urgent-fix"
    echo "  - release/1.2.3"
    echo "  - main, master, develop"
    echo ""
    echo "Rename branch: git branch -m <new-name>"
    exit 1
fi

echo "✅ Branch name '$BRANCH_NAME' is valid"
```

## Installation and Setup

### 1. Make Hooks Executable
```bash
chmod +x .git/hooks/commit-msg
chmod +x .git/hooks/pre-commit
chmod +x .git/hooks/pre-push
```

### 2. Share Hooks Across Team
Create a `git-hooks/` directory in your project:
```bash
mkdir -p git-hooks
cp .git/hooks/* git-hooks/
```

Configure team members to use shared hooks:
```bash
git config core.hooksPath git-hooks
```

### 3. Using Husky (Node.js projects)
```json
{
  "scripts": {
    "prepare": "husky install"
  },
  "devDependencies": {
    "husky": "^8.0.0",
    "lint-staged": "^13.0.0",
    "@commitlint/cli": "^17.0.0",
    "@commitlint/config-conventional": "^17.0.0"
  }
}
```

**.husky/pre-commit**:
```bash
#!/bin/bash
. "$(dirname "$0")/_/husky.sh"

npx lint-staged
```

**.husky/commit-msg**:
```bash
#!/bin/bash
. "$(dirname "$0")/_/husky.sh"

npx --no -- commitlint --edit "$1"
```

**lint-staged.config.js**:
```javascript
module.exports = {
  '*.{js,jsx,ts,tsx}': ['eslint --fix', 'prettier --write'],
  '*.{json,md,yml,yaml}': ['prettier --write'],
  '*.py': ['black', 'isort', 'flake8']
};
```

## Best Practices

### 1. Keep Hooks Fast
- Hooks should run quickly (< 30 seconds)
- Use caching where possible
- Run only necessary checks

### 2. Provide Clear Error Messages
- Tell users what went wrong
- Explain how to fix it
- Provide examples

### 3. Allow Overrides
- Use environment variables to skip hooks
- `git commit --no-verify` for emergencies
- Document override procedures

### 4. Test Hooks
- Test hooks in CI/CD pipeline
- Ensure they work for all team members
- Update hooks when tools change

### 5. Version Control Hooks
- Store hooks in repository
- Include installation instructions
- Keep hooks up to date

## Troubleshooting

### Common Issues

**Hook not running**:
```bash
# Check if hook is executable
ls -la .git/hooks/

# Make executable
chmod +x .git/hooks/pre-commit
```

**Hook too slow**:
- Cache results where possible
- Run only on changed files
- Consider async execution

**False positives**:
- Adjust validation rules
- Add allowlists for special cases
- Provide override mechanism

### Debugging Hooks
```bash
# Run hook manually
.git/hooks/pre-commit

# See what hooks are configured
git config --get core.hooksPath

# Skip hooks for one command
git commit --no-verify -m "Emergency fix"
```

## References
- [Git Hooks Documentation](https://git-scm.com/docs/githooks)
- [Husky](https://typicode.github.io/husky/)
- [pre-commit](https://pre-commit.com/)
- [lint-staged](https://github.com/okonet/lint-staged)