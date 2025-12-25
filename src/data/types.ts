/**
 * TypeScript Type Definitions for Learn Mermaid Interactive
 *
 * This file contains all the type definitions and interfaces used throughout
 * the application for type safety and better developer experience.
 */

/**
 * DiagramCategory - The four main categories of diagrams
 * Based on the original HTML implementation grouping
 */
export type DiagramCategory =
  | 'flow'        // Flow-based diagrams (flowchart, sequence, etc.)
  | 'structure'   // Structural diagrams (class, ER, state)
  | 'timeline'    // Time-based diagrams (gantt, timeline)
  | 'other';      // Other diagrams (pie, mindmap, quadrant, etc.)

/**
 * DiagramExample - Represents a single code example for a diagram type
 */
export interface DiagramExample {
  /** Unique identifier for the example */
  id: string;

  /** Display name of the example */
  title: string;

  /** Brief description of what this example demonstrates */
  description: string;

  /** The actual Mermaid code for this example */
  code: string;

  /** Difficulty level: beginner, intermediate, or advanced */
  level?: 'beginner' | 'intermediate' | 'advanced';

  /** Tags for searchability and filtering */
  tags?: string[];
}

/**
 * SyntaxItem - Represents a single row in the syntax reference table
 */
export interface SyntaxItem {
  /** The syntax pattern or element name */
  syntax: string;

  /** What this syntax does or represents */
  description: string;

  /** A simple code example demonstrating the syntax */
  example: string;

  /** Optional notes or caveats about usage */
  notes?: string;
}

/**
 * DiagramType - Complete definition for a diagram type
 * This is the main data structure for each of the 14+ diagram types
 */
export interface DiagramType {
  /** Unique identifier (e.g., 'flowchart', 'sequence', 'gantt') */
  id: string;

  /** Display name (e.g., 'Flowchart', 'Sequence Diagram') */
  name: string;

  /** Which category this diagram belongs to */
  category: DiagramCategory;

  /** Short description of what this diagram type is used for */
  description: string;

  /** Long-form explanation with use cases */
  detailedDescription?: string;

  /** Icon or emoji to represent this diagram type */
  icon?: string;

  /** Array of code examples for this diagram type */
  examples: DiagramExample[];

  /** Syntax reference table data */
  syntax: SyntaxItem[];

  /** Official Mermaid.js documentation URL */
  docsUrl?: string;

  /** Common use cases for this diagram type */
  useCases?: string[];

  /** Best practices and tips */
  tips?: string[];

  /** Whether this diagram type is experimental or stable */
  status?: 'stable' | 'experimental' | 'beta';
}

/**
 * DiagramsData - Collection of all diagram types
 */
export interface DiagramsData {
  [key: string]: DiagramType;
}

/**
 * LearningMode - The contraction slider modes
 */
export type LearningMode =
  | 'deep-focus'        // 1-2 examples, deep dive
  | 'balanced'          // 3-4 examples, balanced approach
  | 'broad-exploration' // 5+ examples, survey mode
  | 'all';              // Show all examples

/**
 * SliderState - State for the contraction slider
 */
export interface SliderState {
  /** Current mode selected */
  mode: LearningMode;

  /** Number of examples to show based on mode */
  exampleCount: number;

  /** Tension/focus level (0-100) */
  tension: number;
}

/**
 * UserPreferences - User settings stored in localStorage
 */
export interface UserPreferences {
  /** Preferred learning mode */
  learningMode?: LearningMode;

  /** Dark mode preference */
  darkMode?: boolean;

  /** Last visited diagram type */
  lastDiagramType?: string;

  /** Bookmarked examples */
  bookmarks?: string[];

  /** Completed examples */
  completedExamples?: string[];
}

/**
 * EditorState - State for the diagram editor component
 */
export interface EditorState {
  /** Current code in the editor */
  code: string;

  /** Whether the diagram is currently rendering */
  isRendering: boolean;

  /** Any error message from rendering */
  error: string | null;

  /** Whether the code has been modified from the original */
  isDirty: boolean;

  /** Timestamp of last successful render */
  lastRender?: Date;
}

/**
 * ShareableState - Data that can be encoded in URL for sharing
 */
export interface ShareableState {
  /** Diagram type ID */
  diagramType: string;

  /** Example ID (optional) */
  exampleId?: string;

  /** Custom code (optional, for shared custom examples) */
  customCode?: string;

  /** Learning mode (optional) */
  mode?: LearningMode;
}

/**
 * Helper type for category display information
 */
export interface CategoryInfo {
  id: DiagramCategory;
  name: string;
  description: string;
  icon: string;
  color: string; // Tailwind color class
}

/**
 * Constants for diagram categories
 */
export const CATEGORY_INFO: Record<DiagramCategory, CategoryInfo> = {
  flow: {
    id: 'flow',
    name: 'Flow Diagrams',
    description: 'Process flows, sequences, and user journeys',
    icon: '🔄',
    color: 'blue'
  },
  structure: {
    id: 'structure',
    name: 'Structure Diagrams',
    description: 'System architecture, relationships, and states',
    icon: '🏗️',
    color: 'purple'
  },
  timeline: {
    id: 'timeline',
    name: 'Timeline Diagrams',
    description: 'Time-based planning and historical views',
    icon: '📅',
    color: 'green'
  },
  other: {
    id: 'other',
    name: 'Other Diagrams',
    description: 'Specialized and experimental diagram types',
    icon: '✨',
    color: 'orange'
  }
};

/**
 * Constants for learning modes
 */
export const LEARNING_MODE_INFO = {
  'deep-focus': {
    name: 'Deep Focus',
    description: '1-2 examples for deep understanding',
    exampleCount: 2,
    tension: 25
  },
  'balanced': {
    name: 'Balanced',
    description: '3-4 examples for balanced learning',
    exampleCount: 4,
    tension: 50
  },
  'broad-exploration': {
    name: 'Broad Exploration',
    description: '5+ examples for comprehensive overview',
    exampleCount: 6,
    tension: 75
  },
  'all': {
    name: 'Show All',
    description: 'All available examples',
    exampleCount: Infinity,
    tension: 100
  }
} as const;
