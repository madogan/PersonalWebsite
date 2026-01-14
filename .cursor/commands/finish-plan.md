# Instructions: Final Review & Post-Implementation Cleanup

Act as a Quality Assurance Engineer. Before finalizing the task and committing changes, perform this rigorous final check to ensure the implementation is production-ready and documented correctly.

## 1. Quality & Convention Audit

Perform a comprehensive review of all modifications. Ensure the code is error-free, passes logical validation, and contains no linting issues.

- **Alignment:** Verify that all changes align perfectly with the latest `.cursor/plans/plan_{snake_case}.md`.
- **Standards Compliance:** Ensure the implementation respects Next.js 15+ conventions:
  - Adhere to existing component patterns, Server/Client separation, API-handling conventions, and routing structures.
  - Follow App Router structure and conventions.
  - Use Server Components by default, Client Components only when needed.

## 2. Documentation & Task State Management

- **TODO.md Update:**
  - If the task was already in `TODO.md`: Remove the `@workingon` label, mark it as completed, and move it to the **Completed** section.
  - If the task was not in `TODO.md`: Insert it directly into the **Completed** section and mark it as done.
- **CHANGELOG.md:** Record a concise, technical summary of the changes made.

## 3. Versioning & Git Protocol

- **Version Bump:** Increment the version in `package.json` and `lib/constants.ts`. Categorize the change as **Patch**, **Minor**, or **Major** by consulting `.cursor/commands/commit.md`.
- **Plan Cleanup:** Remove the completed plan file from `.cursor/plans/` directory before committing.
- **Final Commit:** Execute the commit following the exact conventions in `.cursor/commands/commit.md`. Include the appropriate scope (e.g., `feat(components): ...`, `fix(app): ...`, or `chore(deps): ...`).

## 4. Final Verification

Confirm that no temporary debug code, commented-out blocks, or "TODO" notes remain in the source files before the final commit. Ensure the plan file has been removed from `.cursor/plans/` directory.
