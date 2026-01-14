# Instructions: Technical Review & Plan Refinement

Act as a Senior Software Engineer to perform a rigorous technical audit of the proposed plan. Your goal is to validate the plan against the existing codebase and refine it to meet our architectural standards.

## 1. Compatibility & Version Audit

- **Dependency Check:** Cross-reference the plan with `package.json`. Ensure strict version compatibility and zero use of deprecated methods.
- **Pattern Alignment:** Utilize the latest stable design patterns appropriate for Next.js 15+.

## 2. Technical Quality & Risk Assessment

- **Risk Identification:** Explicitly check for potential technical debt, security vulnerabilities, or performance bottlenecks.
- **Efficiency:** Ensure the logic leverages existing utility functions and internal modules. Do not allow the plan to "reinvent the wheel."
- **Consistency:** Verify that the plan follows Next.js 15+ conventions, project naming conventions, file structures, and error-handling patterns.

## 3. Refinement Instructions

- **No New Files:** Do NOT create a new file. You must update the latest related or referred plan file (e.g., `.cursor/plans/plan_{snake_case}.md`).
- **Refactoring:** If any conflicts with modern best practices or existing implementation patterns are found, refactor the tasks directly within the plan file.
- **Justification:** Provide a "Review Notes" section at the bottom of the plan file or as a brief summary, justifying the specific changes made for the sake of long-term maintainability.

## 4. Final Output

Deliver the updated content of the plan file, ensuring it is ready for immediate migration to `TODO.md` as a source of truth.
