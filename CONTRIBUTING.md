# Contributing to the Project

Please follow these guidelines to ensure a smooth development process.

## 1. Install pnpm

We use [pnpm](https://pnpm.io/) as our package manager. If you don't have pnpm installed, run:

```bash
npm install --global corepack@latest
corepack enable pnpm
```

## 2. Creating a New Branch

We use [linear.app/it-cunex](https://linear.app/it-cunex/) for issue tracking. To create a new branch for your work, use the branch name suggested by Linear (e.g., `feature/fro-34-dashboard-filter`).

```bash
git checkout -b <BRANCH_NAME_HERE>
```

Replace `<BRANCH_NAME_HERE>` with the actual branch name from Linear.

## 3. Committing Code (Conventional Commits)

All commits must follow the [Conventional Commits](https://www.conventionalcommits.org/) specification. This is enforced in the repository.

**Examples:**

- `feat: add user login page`
- `fix: correct typo in dashboard`
- `chore: update dependencies`

## 4. Opening a Pull Request (PR)

Once your changes are ready, push your branch and open a PR against the `dev` branch (not `main`).

**PR Guidelines:**

- Provide a clear title and description.
- Link the relevant Linear issue if applicable.

## 5. PR Requirements

- Every PR must have at least **one reviewer** approve before merging.
- Ensure your branch is up to date with `dev` before merging.
- Address all review comments and resolve conflicts if any.
