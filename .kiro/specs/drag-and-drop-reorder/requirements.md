# Requirements Document

## Introduction

This feature replaces the manually-typed `displayOrder` number field with an interactive drag-and-drop reorder experience in the Admin panel. Admins will be able to grab a drag handle on any row and drag it to a new position within the list. The new order is then persisted to the backend via the existing `/reorder` API endpoints. The feature applies to three pages: **Projects**, **Services**, and **FAQs**.

The backend already exposes `PUT /admin/projects/reorder`, `PUT /admin/services/reorder`, and `PUT /admin/faqs/reorder` endpoints, so no new backend routes are required. The primary work is on the Admin frontend (React + Vite + Tailwind CSS).

---

## Glossary

- **Admin**: The React + Vite web application used to manage portfolio content.
- **DragHandle**: The draggable grip icon rendered on each list row that the user grabs to initiate a drag operation.
- **DnD_Library**: The third-party drag-and-drop library installed in the Admin app to manage pointer/touch events, drag state, and drop targets. Expected to be `@dnd-kit/core` and `@dnd-kit/sortable`.
- **ReorderPayload**: The JSON body sent to the backend reorder endpoint — an array of `{ id, displayOrder }` objects representing the full new order.
- **Optimistic_Update**: A technique where the UI reflects the new order immediately after a drop, before the server confirms the save.
- **Reorder_Endpoint**: Any of the three existing authenticated `PUT /reorder` routes for Projects, Services, and FAQs.
- **ProjectsPage**: The `/projects` route in the Admin app.
- **ServicesPage**: The `/services` route in the Admin app.
- **FaqPage**: The `/faqs` route in the Admin app.
- **SortableList**: A reusable component that wraps a list of items with drag-and-drop sorting capability.

---

## Requirements

### Requirement 1: Install Drag-and-Drop Library

**User Story:** As a developer, I want a well-supported drag-and-drop library installed, so that I have reliable pointer and touch event primitives to build the reorder UI on top of.

#### Acceptance Criteria

1. THE Admin SHALL have `@dnd-kit/core` and `@dnd-kit/sortable` added as pinned-version dependencies in `package.json`.
2. WHEN the Admin app is built, THE Admin SHALL bundle without errors or peer-dependency conflicts related to the DnD_Library.

---

### Requirement 2: Drag Handle on Each Row

**User Story:** As an admin, I want a visible drag handle on every row, so that I can clearly identify where to grab an item to reorder it.

#### Acceptance Criteria

1. THE Admin SHALL render a DragHandle icon in each row of the ProjectsPage, ServicesPage, and FaqPage lists.
2. WHEN the admin hovers over a DragHandle, THE Admin SHALL change the cursor to a grab cursor (`cursor-grab`).
3. WHILE the admin is actively dragging an item, THE Admin SHALL change the cursor to a grabbing cursor (`cursor-grabbing`).
4. THE DragHandle SHALL be visually distinguishable from action buttons (edit, delete) and SHALL use a grip/dots icon consistent with the existing Tailwind CSS design system.
5. WHEN the ProjectsPage is displaying paginated results (more than one page), THE Admin SHALL render the DragHandle on every visible row.

---

### Requirement 3: Drag-and-Drop Reorder on ProjectsPage

**User Story:** As an admin, I want to drag projects into a new order on the Projects page, so that I can control which projects appear first without typing numbers.

#### Acceptance Criteria

1. WHEN the admin drags a project row to a new position and releases it, THE Admin SHALL reorder the visible list to reflect the drop position immediately (Optimistic_Update).
2. WHEN a drop completes, THE Admin SHALL send a ReorderPayload to `PUT /admin/projects/reorder` containing all visible projects with their new `displayOrder` values (0-indexed or 1-indexed, matching the backend contract).
3. IF the reorder API call fails, THEN THE Admin SHALL revert the list to the order it had before the drag and display a toast error message.
4. WHILE a reorder API call is in-flight, THE Admin SHALL disable further drag interactions on the ProjectsPage list to prevent concurrent reorder conflicts.
5. WHEN the reorder API call succeeds, THE Admin SHALL invalidate the `['projects']` React Query cache so that subsequent page loads reflect the saved order.
6. WHEN filters or search are active on the ProjectsPage, THE Admin SHALL hide the DragHandle and disable drag-and-drop, as partial reordering of a filtered subset is not supported.

---

### Requirement 4: Drag-and-Drop Reorder on ServicesPage

**User Story:** As an admin, I want to drag services into a new order on the Services page, so that I can control the sequence of services displayed on the portfolio.

#### Acceptance Criteria

1. WHEN the admin drags a service card to a new position and releases it, THE Admin SHALL reorder the visible list to reflect the drop position immediately (Optimistic_Update).
2. WHEN a drop completes, THE Admin SHALL send a ReorderPayload to `PUT /admin/services/reorder` containing all services with their new `displayOrder` values.
3. IF the reorder API call fails, THEN THE Admin SHALL revert the list to the order it had before the drag and display a toast error message.
4. WHILE a reorder API call is in-flight, THE Admin SHALL disable further drag interactions on the ServicesPage list.
5. WHEN the reorder API call succeeds, THE Admin SHALL invalidate the `['services']` React Query cache.

---

### Requirement 5: Drag-and-Drop Reorder on FaqPage

**User Story:** As an admin, I want to drag FAQ items into a new order, so that the most important questions appear first without manually editing display order numbers.

#### Acceptance Criteria

1. WHEN the admin drags a FAQ row to a new position and releases it, THE Admin SHALL reorder the visible list to reflect the drop position immediately (Optimistic_Update).
2. WHEN a drop completes, THE Admin SHALL send a ReorderPayload to `PUT /admin/faqs/reorder` containing all FAQs with their new `displayOrder` values.
3. IF the reorder API call fails, THEN THE Admin SHALL revert the list to the order it had before the drag and display a toast error message.
4. WHILE a reorder API call is in-flight, THE Admin SHALL disable further drag interactions on the FaqPage list.
5. WHEN the reorder API call succeeds, THE Admin SHALL invalidate the `['faqs']` React Query cache.

---

### Requirement 6: Drag-and-Drop Accessibility

**User Story:** As an admin, I want to reorder items using only a keyboard, so that the feature remains accessible without relying on mouse or pointer input.

#### Acceptance Criteria

1. THE DnD_Library SHALL support keyboard-driven reordering so that each DragHandle is focusable via the Tab key.
2. WHEN a DragHandle has keyboard focus, THE Admin SHALL display a visible focus ring consistent with the existing Tailwind CSS focus styles.
3. WHEN a DragHandle has focus and the admin presses Space, THE Admin SHALL activate drag mode for that item.
4. WHILE an item is in keyboard drag mode, THE Admin SHALL move the item up or down the list when the admin presses the ArrowUp or ArrowDown key.
5. WHEN the admin presses Space or Enter while an item is in keyboard drag mode, THE Admin SHALL confirm the drop and trigger the same save flow as a pointer drop.
6. WHEN the admin presses Escape while an item is in keyboard drag mode, THE Admin SHALL cancel the drag and restore the item to its original position.

---

### Requirement 7: Visual Drag Feedback

**User Story:** As an admin, I want clear visual cues while dragging, so that I can see where an item will land before releasing it.

#### Acceptance Criteria

1. WHILE an item is being dragged, THE Admin SHALL render a drop placeholder (ghost row) at the current insertion point to indicate the landing position.
2. WHILE an item is being dragged, THE Admin SHALL visually distinguish the dragged item from other rows (e.g., reduced opacity or elevated shadow).
3. WHILE an item is being dragged, THE Admin SHALL NOT alter the dimensions or layout of other rows in the list.

---

### Requirement 8: Remove Manual Display Order Field

**User Story:** As an admin, I want the manual display order number input removed from the FAQ form, so that the interface is not confusing when drag-and-drop is the primary ordering mechanism.

#### Acceptance Criteria

1. THE FaqPage modal form SHALL NOT render the `displayOrder` number input field after this feature is implemented.
2. THE Admin SHALL continue to submit and persist `displayOrder` values to the backend, but exclusively through the drag-and-drop reorder flow, not through a manual input field.
3. WHERE the ProjectsPage or ServicesPage forms include a `displayOrder` input field, THE Admin SHALL remove those fields from their respective forms.
