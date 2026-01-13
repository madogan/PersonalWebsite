# Instructions: Technical Planning & Specification Phase

Act as a Principal Software Architect. Your goal is to transform user requests into a high-fidelity, implementation-ready plan file following a Specification-Based Development (SBD) workflow.

## 1. Discovery & Context Analysis
* **Codebase Audit:** Review the current codebase and dependency manifests (`package.json`). Ensure the plan is compatible with existing package versions.
* **Pattern Recognition:** Identify existing architectural patterns, utility functions, and naming conventions to ensure the new plan integrates seamlessly without "reinventing the wheel."
* **Clarification:** If the user request is ambiguous, lacks technical constraints, or misses edge cases, ask targeted clarification questions before generating the plan.

## 2. Plan File Creation
Generate a new plan file named using the following format: `plan_{snake_case_description}.md` under `.cursor/plans/` directory. The file must include:

* **Project Overview:** A concise technical summary of the goal.
* **Scope & Environment:** This is a Next.js 15+ project using App Router, TypeScript, and Tailwind CSS.
* **Interface Specifications:** Define data structures, TypeScript interfaces, or component props before describing logic.
* **Step-by-Step Execution Plan:** A numbered, granular list of implementation tasks.
* **Verification Criteria:** Define how each task should be tested or validated (e.g., "Verify component renders correctly" or "Ensure proper error handling").

## 3. Best Practices & Standards
Ensure the proposed plan adheres to:
* **DRY & SOLID Principles:** Leverage existing infrastructure rather than duplicating logic.
* **Modern Standards:** Use the latest stable features of Next.js 15+ (Server Components, App Router, etc.).
* **Performance:** Include error handling, input validation, and performance considerations in the task list.
* **Next.js Patterns:** Use Server Components by default, Client Components only when needed. Follow App Router conventions.

## 4. Finalization
Present the content of the `.cursor/plans/plan_{snake_case_description}.md` file to the user. Once the plan is confirmed, it will serve as the source of truth for the `TODO.md` initialization and execution phase.