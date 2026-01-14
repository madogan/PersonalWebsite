If task is not provided pick a new task from `TODO.md` and follow these rules:

1. Eligible tasks:
   - Not labeled `@workingon`
   - Not marked as completed
2. From the eligible tasks, choose the smallest and simplest task.

For the task:

1. Add the `@workingon` label in `TODO.md`.
2. Ask detailed clarification questions if needed for selected task.
3. Produce a precise, ordered execution plan.
4. Examine and describe the relevant parts of the codebase required to execute this plan. Ensure your plan is up to date and follows best practices.
5. Ensure that the proposed implementation fully respects the conventions of Next.js 15+. Follow the existing component patterns, server/client separation, API-handling conventions, file routes, naming approaches, design system, styles and overall Next.js project structure.

After completing the task:

1. Mark it as completed in `TODO.md` and move it to the "Completed" section.
2. Update `CHANGELOG.md` accordingly.
3. Bump the version in `package.json` and `lib/constants.ts`. Determine whether the change is patch, minor, or major. Refer to `commit.md` for guidance.
4. Commit all changes following the conventions in `commit.md`, including the appropriate scope (e.g., `feat(components): ...` or `fix(app): ...`).
