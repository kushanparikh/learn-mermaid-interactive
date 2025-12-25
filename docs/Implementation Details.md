# Phase 2: Implementation Details

## Step 1: File #1 - global.css

**File Created:** `src/styles/global.css`

**Contents:**

### Tailwind Directives
The three essential imports:
```css
@tailwind base
@tailwind components
@tailwind utilities
```

### Custom Component Classes
- `.card`, `.card-header`, `.card-body` - Card components
- `.btn-primary`, `.btn-secondary`, `.btn-success` - Button styles
- `.input-field`, `.textarea-field` - Form input styles
- `.badge` variants (blue, green, purple, orange) - Badge components
- `.container-custom` - Page container

### Syntax Table Styling
- `.syntax-table` - Complete table styling with hover effects
- Styled headers, cells, and code elements
- Smooth transitions and proper borders

### Additional Useful Styles
- `.diagram-table` - For the 14 diagram types table
- `.mermaid-container` & `.mermaid-preview` - For diagram rendering
- `.code-editor` & `.editor-container` - For the interactive editor
- Base typography styles (h1-h4, p, a, body)
- Utility classes (gradient-bg, glass-effect, shadow-glow)

The file is now ready and follows Tailwind CSS best practices with proper `@layer` organization.

---

## Step 2: File #2 - BaseLayout.astro

**File Created:** `src/layouts/BaseLayout.astro`

**Purpose:** Main HTML wrapper layout for all pages in the application. Provides consistent structure, meta tags, styles, and scripts.

### Key Features

#### 1. Props Interface
```typescript
interface Props {
  title?: string;
  description?: string;
}
```
- Accepts optional `title` and `description` props
- Provides sensible defaults for SEO

#### 2. HTML Head Section
**Meta Tags:**
- Standard charset UTF-8 and viewport settings
- SEO meta tags (description, keywords, author)
- Open Graph tags for Facebook sharing
- Twitter card tags for Twitter sharing
- Favicon link

**Default Values:**
- Title: "Learn Mermaid Interactive - Master Diagram Syntax"
- Description: "Interactive learning tool for Mermaid diagrams. Explore 14+ chart types with live examples, code editors, and instant previews."

#### 3. Global Styles
- Imports `/src/styles/global.css` for Tailwind and custom styles

#### 4. Mermaid.js Integration
**CDN Import:**
- Uses Mermaid v10 from jsDelivr CDN
- Loaded as ES module for modern browser support

**Configuration:**
```javascript
mermaid.initialize({
  startOnLoad: true,
  theme: 'default',
  securityLevel: 'loose',
  fontFamily: 'Arial, sans-serif'
})
```

**Chart-Specific Settings:**
- **Flowchart:** useMaxWidth, HTML labels, basis curve
- **Sequence:** Custom margins, actor spacing, box dimensions
- **Gantt:** Title margins, bar height/gap, date format

**Global Accessibility:**
- Exposes `window.mermaid` for use in components

#### 5. Body Structure
- `min-h-screen` class ensures full viewport height
- `bg-gray-50` provides light gray background
- `<slot />` for page content injection
- Footer with copyright, credits, and GitHub link

#### 6. Footer
- Dark gray background (`bg-gray-800`)
- Credits to Astro, Tailwind CSS, and Mermaid.js
- GitHub repository link
- Responsive container with centered text
- Dynamic copyright year using `new Date().getFullYear()`

### Usage Example
```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---

<BaseLayout title="Flowchart Examples" description="Learn flowchart syntax">
  <main>
    <!-- Page content goes here -->
  </main>
</BaseLayout>
```

### File Location
`src/layouts/BaseLayout.astro` - 114 lines

---

## Step 3: File #3 - types.ts

**File Created:** `src/data/types.ts`

**Purpose:** TypeScript type definitions and interfaces for the entire application. Provides type safety, autocompletion, and clear data structure contracts.

### Core Type Definitions

#### 1. DiagramCategory Type
```typescript
export type DiagramCategory = 'flow' | 'structure' | 'timeline' | 'other';
```
**Categories:**
- `flow` - Flow-based diagrams (flowchart, sequence, user journey)
- `structure` - Structural diagrams (class, ER, state)
- `timeline` - Time-based diagrams (gantt, timeline)
- `other` - Specialized diagrams (pie, mindmap, quadrant)

#### 2. DiagramExample Interface
Represents a single code example for a diagram type.

**Properties:**
- `id: string` - Unique identifier
- `title: string` - Display name
- `description: string` - Brief description of what it demonstrates
- `code: string` - The actual Mermaid code
- `level?: 'beginner' | 'intermediate' | 'advanced'` - Difficulty level
- `tags?: string[]` - Tags for searchability

#### 3. SyntaxItem Interface
Represents a row in the syntax reference table.

**Properties:**
- `syntax: string` - The syntax pattern
- `description: string` - What this syntax does
- `example: string` - Simple code example
- `notes?: string` - Optional usage notes

#### 4. DiagramType Interface
Main data structure for each diagram type (flowchart, sequence, etc.).

**Properties:**
- `id: string` - Unique identifier (e.g., 'flowchart')
- `name: string` - Display name (e.g., 'Flowchart')
- `category: DiagramCategory` - Which category it belongs to
- `description: string` - Short description
- `detailedDescription?: string` - Long-form explanation
- `icon?: string` - Emoji or icon
- `examples: DiagramExample[]` - Array of code examples
- `syntax: SyntaxItem[]` - Syntax reference data
- `docsUrl?: string` - Official Mermaid.js docs link
- `useCases?: string[]` - Common use cases
- `tips?: string[]` - Best practices
- `status?: 'stable' | 'experimental' | 'beta'` - Stability status

#### 5. DiagramsData Interface
Collection of all diagram types.
```typescript
export interface DiagramsData {
  [key: string]: DiagramType;
}
```

### Application State Types

#### 6. LearningMode Type
```typescript
export type LearningMode = 'deep-focus' | 'balanced' | 'broad-exploration' | 'all';
```

#### 7. SliderState Interface
State for the contraction slider component.

**Properties:**
- `mode: LearningMode` - Current mode
- `exampleCount: number` - Number of examples to show
- `tension: number` - Tension level (0-100)

#### 8. UserPreferences Interface
User settings stored in localStorage.

**Properties:**
- `learningMode?: LearningMode`
- `darkMode?: boolean`
- `lastDiagramType?: string`
- `bookmarks?: string[]`
- `completedExamples?: string[]`

#### 9. EditorState Interface
State for the diagram editor React component.

**Properties:**
- `code: string` - Current code
- `isRendering: boolean` - Rendering status
- `error: string | null` - Error message
- `isDirty: boolean` - Modified flag
- `lastRender?: Date` - Last render timestamp

#### 10. ShareableState Interface
Data encoded in URL for sharing.

**Properties:**
- `diagramType: string` - Diagram type ID
- `exampleId?: string` - Example ID
- `customCode?: string` - Custom code
- `mode?: LearningMode` - Learning mode

### Helper Types and Constants

#### 11. CategoryInfo Interface
Display information for categories.

**Properties:**
- `id: DiagramCategory`
- `name: string`
- `description: string`
- `icon: string`
- `color: string` - Tailwind color class

#### 12. CATEGORY_INFO Constant
Pre-defined category information with icons and colors.

**Example:**
```typescript
flow: {
  id: 'flow',
  name: 'Flow Diagrams',
  description: 'Process flows, sequences, and user journeys',
  icon: '🔄',
  color: 'blue'
}
```

#### 13. LEARNING_MODE_INFO Constant
Configuration for each learning mode.

**Example:**
```typescript
'deep-focus': {
  name: 'Deep Focus',
  description: '1-2 examples for deep understanding',
  exampleCount: 2,
  tension: 25
}
```

### Benefits

- **Type Safety:** Catch errors at compile time
- **Autocompletion:** Better IDE support
- **Documentation:** Types serve as inline documentation
- **Refactoring:** Safe refactoring with type checking
- **Consistency:** Enforces data structure contracts

### File Location
`src/data/types.ts` - 244 lines

---

## Step 4: File #4 - flowchart.ts

**File Created:** `src/data/diagrams/flowchart.ts`

**Purpose:** Contains all flowchart examples and syntax reference data. First diagram type to be implemented, serving as a template for other diagram types.

### Structure

The file exports a complete `DiagramType` object with three main sections:

#### 1. Flowchart Examples (8 examples)
Array of `DiagramExample` objects organized by difficulty level.

**Beginner Examples (4):**
1. **Basic Flowchart** - Simple linear process (Start → Process → Decision → End)
2. **Decision Flow** - Conditional branches with Yes/No paths and loop
3. **Different Node Shapes** - Showcases 6 node shapes (rectangle, rounded, stadium, subroutine, database, circle)
4. **Flow Directions** - Demonstrates TB (Top-Bottom) and LR (Left-Right) orientations with subgraphs

**Intermediate Examples (3):**
5. **Software Development Process** - Real-world development workflow with code review and deployment
6. **Subgraphs for Organization** - API architecture with Backend subgraph grouping
7. **Styled Nodes** - Custom CSS classes for success/warning/error states with colors

**Advanced Examples (1):**
8. **E-commerce Checkout Flow** - Complex multi-path flowchart with 15+ nodes, login, shipping, payment, and error handling

**Each Example Includes:**
- `id` - Unique identifier (e.g., 'flowchart-basic')
- `title` - Display name
- `description` - What the example demonstrates
- `level` - beginner | intermediate | advanced
- `code` - Complete Mermaid syntax
- `tags` - Searchable keywords

#### 2. Flowchart Syntax Reference (20 items)
Array of `SyntaxItem` objects covering all flowchart syntax.

**Categories Covered:**
- **Direction:** flowchart TD/TB/BT/RL/LR
- **Node Shapes (11 types):**
  - Rectangle: `[Text]`
  - Rounded: `(Text)`
  - Stadium: `([Text])`
  - Subroutine: `[[Text]]`
  - Database: `[(Text)]`
  - Circle: `((Text))`
  - Diamond/Decision: `{Text}`
  - Hexagon: `{{Text}}`
  - Parallelogram: `[/Text/]` and `[\Text\]`

- **Connections (4 types):**
  - Arrow: `-->`
  - Line: `---`
  - Dotted arrow: `-.->`
  - Thick arrow: `==>`
  - Labeled arrow: `-->|label|`

- **Organization:**
  - Subgraphs: `subgraph Title...end`

- **Styling:**
  - Class definition: `classDef className`
  - Apply class: `class A,B className`
  - Inline style: `style A fill:#f00`

- **Interactivity:**
  - Click handler: `click A callback`

**Each Syntax Item Includes:**
- `syntax` - The pattern/code
- `description` - What it does
- `example` - Code example
- `notes` - Optional usage tips

#### 3. Complete DiagramType Object

**Metadata:**
- `id`: 'flowchart'
- `name`: 'Flowchart'
- `category`: 'flow'
- `icon`: '🔄'
- `status`: 'stable'

**Content:**
- `description`: Short one-liner
- `detailedDescription`: Long-form explanation with use cases
- `examples`: 8 examples array
- `syntax`: 20 syntax items array
- `docsUrl`: 'https://mermaid.js.org/syntax/flowchart.html'

**Guidance:**
- `useCases` (6 items): Algorithm visualization, business process docs, decision trees, workflows, dev processes, training
- `tips` (6 items): Best practices for creating clear flowcharts

### Example Usage

```typescript
import { flowchart } from './data/diagrams/flowchart';

// Access examples
const firstExample = flowchart.examples[0];
console.log(firstExample.code); // Mermaid code

// Access syntax reference
const syntaxTable = flowchart.syntax;

// Get metadata
console.log(flowchart.name); // "Flowchart"
console.log(flowchart.icon); // "🔄"
```

### Key Features

1. **Comprehensive Coverage** - 8 examples from basic to advanced
2. **Real-World Examples** - Software development, e-commerce checkout
3. **Complete Syntax** - 20 syntax items covering all flowchart features
4. **Type Safety** - Fully typed with interfaces from types.ts
5. **Metadata Rich** - Use cases, tips, docs URL, and detailed descriptions
6. **Template for Others** - Sets the pattern for remaining 13+ diagram types

### File Location
`src/data/diagrams/flowchart.ts` - 287 lines

---

## Step 5: File #5 - index.ts (diagrams)

**File Created:** `src/data/diagrams/index.ts`

**Purpose:** Central export point for all diagram types. Provides the main `diagrams` object and helper functions for accessing and searching diagram data.

### Structure

#### 1. Imports
```typescript
import type { DiagramType, DiagramsData, DiagramCategory } from '../types';
import { flowchart } from './flowchart';
```

#### 2. Main Diagrams Object
```typescript
export const diagrams: DiagramsData = {
  flowchart
  // TODO comments for future diagram types (13+ more)
};
```
- Currently exports only `flowchart`
- Includes TODO comments as placeholders for future diagrams:
  - sequence, classDiagram, stateDiagram, erDiagram
  - gantt, pie, quadrantChart, requirementDiagram
  - gitGraph, userJourney, timeline, mindmap, sankey

#### 3. Helper Functions (11 total)

**Basic Access Functions:**

1. **`getDiagramByType(typeId: string)`**
   - Returns specific diagram by ID
   - Returns `undefined` if not found
   - Example: `getDiagramByType('flowchart')`

2. **`getAllDiagrams()`**
   - Returns array of all diagram type objects
   - Converts object values to array
   - Example: `getAllDiagrams() // [flowchart, ...]`

3. **`getDiagramIds()`**
   - Returns array of diagram IDs as strings
   - Example: `getDiagramIds() // ['flowchart']`

4. **`hasDiagramType(typeId: string)`**
   - Returns boolean if diagram exists
   - Example: `hasDiagramType('flowchart') // true`

**Category Functions:**

5. **`getDiagramsByCategory(category: DiagramCategory)`**
   - Filters diagrams by category
   - Returns array of matching diagrams
   - Example: `getDiagramsByCategory('flow')`

6. **`getDiagramsGroupedByCategory()`**
   - Returns object with categories as keys
   - Each value is array of diagrams in that category
   - Example: `{ flow: [...], structure: [...], timeline: [...], other: [...] }`

**Search Functions:**

7. **`searchDiagrams(query: string)`**
   - Case-insensitive search
   - Searches name, description, and id fields
   - Returns array of matching diagrams
   - Example: `searchDiagrams('flow')`

**Statistics Functions:**

8. **`getDiagramCount()`**
   - Returns total number of diagram types
   - Example: `getDiagramCount() // 1` (currently)

9. **`getTotalExampleCount()`**
   - Counts all examples across all diagrams
   - Uses reduce to sum example arrays
   - Example: `getTotalExampleCount() // 8` (currently)

**Random Access Functions:**

10. **`getRandomDiagram()`**
    - Returns random diagram type
    - Returns `undefined` if no diagrams exist
    - Uses `Math.random()` for selection

11. **`getRandomExample(typeId: string)`**
    - Returns random example from specific diagram type
    - Returns `undefined` if diagram not found or no examples
    - Example: `getRandomExample('flowchart')`

#### 4. Re-exports
```typescript
// Direct diagram imports
export { flowchart } from './flowchart';

// Type re-exports for convenience
export type { DiagramType, DiagramExample, SyntaxItem, DiagramCategory } from '../types';
```

### Usage Examples

```typescript
// Import diagrams collection
import { diagrams, getDiagramByType, searchDiagrams } from './data/diagrams';

// Get specific diagram
const flowchartData = getDiagramByType('flowchart');
console.log(flowchartData?.name); // "Flowchart"

// Search diagrams
const results = searchDiagrams('flow');
console.log(results.length); // 1

// Get all diagrams
import { getAllDiagrams } from './data/diagrams';
const allDiagrams = getAllDiagrams();
allDiagrams.forEach(diagram => {
  console.log(`${diagram.icon} ${diagram.name}`);
});

// Direct import of specific diagram
import { flowchart } from './data/diagrams';
console.log(flowchart.examples[0].title);
```

### Key Features

1. **Centralized Access** - Single source of truth for all diagrams
2. **Type Safety** - Fully typed with TypeScript interfaces
3. **Convenient Helpers** - 11 utility functions for common operations
4. **Flexible Imports** - Named exports for both collection and individuals
5. **Extensible** - Easy to add new diagram types (just import and add to object)
6. **Search & Filter** - Built-in search and category filtering
7. **Statistics** - Count functions for dashboard/metrics
8. **Random Access** - Utility for random examples/diagrams

### Future Expansion

When adding new diagram types:
1. Create new file (e.g., `sequence.ts`)
2. Import in index.ts: `import { sequence } from './sequence';`
3. Add to diagrams object: `diagrams = { flowchart, sequence }`
4. Re-export: `export { sequence } from './sequence';`

All helper functions will automatically work with new diagrams!

### File Location
`src/data/diagrams/index.ts` - 148 lines

---

## Step 6: File #6 - index.astro (homepage)

**File Created:** `src/pages/index.astro`

**Purpose:** Main landing page for the application. Displays a minimal working version with flowchart data, stats, and placeholders for future Phase 4 components.

### Structure

#### 1. Frontmatter (Astro Component Script)
```typescript
import BaseLayout from '../layouts/BaseLayout.astro';
import { getAllDiagrams, getDiagramCount, getTotalExampleCount } from '../data/diagrams';

const diagrams = getAllDiagrams();
const diagramCount = getDiagramCount();
const exampleCount = getTotalExampleCount();
const flowchart = diagrams.find(d => d.id === 'flowchart');
```

**Data Fetching:**
- Imports helper functions from data layer
- Gets all diagrams, counts, and flowchart data
- All data fetched at build time (static generation)

#### 2. Hero Section
**Features:**
- Gradient background (`bg-gradient-to-r from-blue-600 to-purple-600`)
- Large title: "Learn Mermaid Interactive"
- Subtitle describing the platform
- Three stat cards showing:
  - Diagram count (currently: 1)
  - Example count (currently: 8)
  - "100% Interactive" badge

**Styling:**
- White text on gradient background
- Semi-transparent white stat cards
- Responsive container with padding

#### 3. Introduction Section
**Content:**
- Welcome message
- Phase 2 status indicator
- Checklist of completed features:
  - ✅ Project structure
  - ✅ Type-safe data layer
  - ✅ Interactive examples
  - ✅ Responsive layout

**Styling:**
- Card component with header and body
- Bulleted list with checkmarks
- Spaced paragraphs

#### 4. Flowchart Preview Section
Conditionally rendered if flowchart data exists.

**Sub-sections:**

**a) Header:**
- Icon (🔄) and name display
- Description text

**b) Stats Grid (3 columns):**
- Examples count (blue background)
- Syntax items count (purple background)
- Status indicator (green background)
- Responsive: 1 column on mobile, 3 on desktop

**c) Use Cases:**
- Displays all use cases as blue badges
- Wrapped layout for responsiveness

**d) First Example Preview:**
- Example title and description
- Code display in dark code block (`bg-gray-900`)
- Live Mermaid diagram preview using `.mermaid` class
- Mermaid.js auto-renders on page load

**e) Tips for Success:**
- Bulleted list of best practice tips
- Dynamically rendered from flowchart.tips array

#### 5. Coming Soon Section
Three placeholder cards for Phase 4 components:

**1. Learning Mode Slider:**
- Icon: 🎚️
- Description of contraction slider functionality
- "Phase 4 Component" label

**2. Diagram Types Table:**
- Icon: 📊
- Description of 14+ diagram types table
- "Phase 4 Component" label

**3. Interactive Editor:**
- Icon: ✏️
- Description of live code editor
- "Phase 4 Component (React)" label

**Styling:**
- Dashed border cards (`border-dashed`)
- Gray background to indicate "coming soon"
- Grid layout: 1 column mobile, 3 columns desktop

#### 6. Documentation Link Section
**Features:**
- Gradient background card (blue to purple)
- Call-to-action heading
- Description text
- Primary button linking to Mermaid.js official docs
- Opens in new tab (`target="_blank" rel="noopener noreferrer"`)

#### 7. Custom Styles
```css
.space-y-4 > * + * { margin-top: 1rem; }
.space-y-2 > * + * { margin-top: 0.5rem; }
```
- Utility spacing classes for consistent vertical rhythm

### Key Features

1. **Static Generation** - All data fetched at build time (Astro SSG)
2. **Responsive Design** - Mobile-first with Tailwind breakpoints
3. **Live Mermaid Rendering** - Uses `.mermaid` class for auto-rendering
4. **Type Safety** - TypeScript imports from data layer
5. **Component Reuse** - Uses BaseLayout, card classes, badges
6. **Accessibility** - Semantic HTML, proper headings hierarchy
7. **Future-Proof** - Placeholders for Phase 4 components
8. **Dynamic Content** - Maps over arrays for use cases, tips, etc.

### Data Flow

```
index.astro
  ↓
imports from '../data/diagrams'
  ↓
calls getAllDiagrams(), getDiagramCount(), etc.
  ↓
gets flowchart data
  ↓
renders sections with flowchart.examples, flowchart.tips, etc.
  ↓
Mermaid.js (from BaseLayout) renders diagrams on page load
```

### Usage Example

This is the main page at the root URL `/`. When users visit the site, they see:
1. Hero with stats
2. Introduction explaining Phase 2
3. Full flowchart preview with first example rendered
4. Placeholders for upcoming features
5. Link to official docs

### Responsive Behavior

- **Mobile (<768px):** Single column layout, stacked cards
- **Tablet (≥768px):** 2-3 column grids where appropriate
- **Desktop (≥1024px):** Full 3-column layouts for stats and placeholders

### File Location
`src/pages/index.astro` - 107 lines