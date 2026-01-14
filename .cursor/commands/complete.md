1. If task is not in `TODO.md` insert new task as completed under completed section and marked as completed.
2. If task is in `TODO.md` move to under completed section, mark as completed and remove `@workingon` label if exists.
3. Update `CHANGELOG.md`
4. Review all your changes thoroughly. Ensure that nothing is missing and that the code is error-free or issue-free.
5. If available, check the latest project plan document to confirm your changes align with it.
6. Also, verify that there are no linting errors.
7. Ensure that the proposed implementation fully respects the conventions of Next.js 15+. Follow the existing component patterns, server/client separation, API-handling conventions, file routes, naming approaches, design system, styles and overall Next.js project structure. Ensure your changes are compatible with package versions used in the project.
8. Bump the version in `package.json` and `lib/constants.ts`. Determine whether the change is patch, minor, or major. Refer to `.cursor/commands/commit.md` for guidance.
9. Commit all changes following the conventions in `.cursor/commands/commit.md`, including the appropriate scope (e.g., `feat(components): ...` or `fix(app): ...`).
