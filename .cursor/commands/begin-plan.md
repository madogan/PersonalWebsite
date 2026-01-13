# Instructions for Task Execution and Codebase Management

Reference the latest or specified plan files from `.cursor/plans/` directory and follow the instructions below to execute the implementation.

## 1. Plan Initialization
If the tasks from the plan are not already in `TODO.md`, create a new section in `TODO.md` under the title of the plan. Begin implementing each task sequentially, one by one.

## 2. Task Execution Loop
For each individual task, you must:

1.  **Status Tracking:** Add the `@workingon` label to the task in `TODO.md`.
2.  **Clarification:** Ask detailed clarification questions if any requirements for the selected task are ambiguous.
3.  **Execution Strategy:** Produce a precise, ordered execution plan.
4.  **Codebase Analysis:** Examine and describe the relevant parts of the codebase required to execute this plan. Ensure the plan is up to date, follows best practices, and is compatible with existing package versions.
5.  **Convention Adherence:** Ensure the proposed implementation fully respects the conventions of Next.js 15+:
    * Follow existing component patterns, server/client separation, API-handling conventions, file routes, naming approaches, design system, styles, and the overall Next.js project structure.
    * Use Server Components by default, Client Components only when needed (`'use client'`).
    * Follow App Router structure and conventions.
    * Ensure compatibility with existing package versions in `package.json`.

## 3. Completion and Documentation
After completing a task:

1.  **Update TODO:** Mark the task as completed in `TODO.md` and move it to the "Completed" section.
2.  **Update Changelog:** Update `CHANGELOG.md` accordingly with the changes made.
3.  **Versioning:** Bump the version in `package.json` and `lib/constants.ts`. Determine whether the change is a **patch**, **minor**, or **major** update by referring to the guidance in `commit.md`.
4.  **Plan Cleanup:** Remove the completed plan file from `.cursor/plans/` directory before committing.
5.  **Commitment:** Commit all changes following the conventions in `commit.md`, including the appropriate scope (e.g., `feat(components): ...` or `fix(app): ...`).