# Instructions: Automated Manual Test Scenario Generation

Act as a QA Automation Lead. Your task is to analyze today's commits across the codebase and generate a structured **Manual Test Scenarios Summary**. This document will be used to verify that the implemented features function correctly from a user perspective.

## 1. Commit Analysis
* **Scan Logic:** Review all commits made today. Identify changes in logic, UI components, and API endpoints.
* **Scope Identification:** Categorize changes into functional areas (e.g., Blog, Resume, UI/UX, Components, Pages).

## 2. Test Scenario Requirements
For every identified change, generate high-level manual test cases that follow these criteria:
* **Action-Oriented:** Describe the specific user action (e.g., "Navigate to blog post").
* **Edge Case Awareness:** Include scenarios for validation (e.g., "missing content," "invalid routes").
* **State Persistence:** Include checks for theme persistence and responsive behavior where applicable.
* **UI/UX Validation:** Define specific visual expectations (e.g., "Dark mode toggle works," "Responsive layout on mobile").

## 3. Mandatory Formatting
The output must be formatted as a structured list under the heading `# Manual Test Scenarios Summary`. Use the following organizational style:

### [Functional Area Name]
* **Feature Description:** Specific test action or verification point.
* **Technical Constraint:** Mention any related API authorization checks or data normalization (e.g., "Email normalization (case-insensitive)").
* **Success Criteria:** Define the expected outcome (e.g., "Verify PLU score updates").

## 4. Quality Standard
Ensure the scenarios are granular enough for a manual tester to follow without referring back to the source code. If a commit involves a "Blog filtering" or "Resume section," the test scenario must specify the exact behavior (e.g., "Tags filter correctly" or "Certifications display with proper formatting").

---
**Example Output Structure to Emulate:**
### Blog
* Navigate to blog list page and verify posts display correctly.
* Filter blog posts by tags and verify filtering works.
* Open a blog post and verify MDX content renders properly.
* Verify reading time calculation is accurate.