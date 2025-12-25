/**
 * Flowchart Diagram Data
 *
 * Contains examples and syntax reference for Mermaid flowchart diagrams.
 * Flowcharts visualize processes, workflows, and decision trees.
 */

import type { DiagramType, DiagramExample, SyntaxItem } from '../types';

/**
 * Flowchart Examples
 * Organized from beginner to advanced
 */
const flowchartExamples: DiagramExample[] = [
  {
    id: 'flowchart-basic',
    title: 'Basic Flowchart',
    description: 'Simple flowchart showing a linear process',
    level: 'beginner',
    code: `flowchart TD
    A[Start] --> B[Process]
    B --> C[Decision]
    C --> D[End]`,
    tags: ['basic', 'linear', 'simple']
  },
  {
    id: 'flowchart-decision',
    title: 'Decision Flow',
    description: 'Flowchart with conditional branches',
    level: 'beginner',
    code: `flowchart TD
    A[Start] --> B{Is it working?}
    B -->|Yes| C[Great!]
    B -->|No| D[Debug]
    D --> B
    C --> E[End]`,
    tags: ['decision', 'conditional', 'loop']
  },
  {
    id: 'flowchart-shapes',
    title: 'Different Node Shapes',
    description: 'Demonstrates various node shapes available',
    level: 'beginner',
    code: `flowchart LR
    A[Rectangle] --> B(Rounded)
    B --> C([Stadium])
    C --> D[[Subroutine]]
    D --> E[(Database)]
    E --> F((Circle))`,
    tags: ['shapes', 'nodes', 'styles']
  },
  {
    id: 'flowchart-development',
    title: 'Software Development Process',
    description: 'Real-world example of a development workflow',
    level: 'intermediate',
    code: `flowchart TD
    A[Write Code] --> B{Tests Pass?}
    B -->|No| C[Fix Bugs]
    C --> A
    B -->|Yes| D[Code Review]
    D --> E{Approved?}
    E -->|No| F[Address Feedback]
    F --> A
    E -->|Yes| G[Merge to Main]
    G --> H[Deploy]`,
    tags: ['workflow', 'development', 'real-world']
  },
  {
    id: 'flowchart-subgraphs',
    title: 'Subgraphs for Organization',
    description: 'Using subgraphs to group related nodes',
    level: 'intermediate',
    code: `flowchart TB
    A[User Request] --> B[API Gateway]

    subgraph Backend
        B --> C[Authentication]
        C --> D[Business Logic]
        D --> E[Database]
    end

    E --> F[Response]
    F --> A`,
    tags: ['subgraph', 'organization', 'architecture']
  },
  {
    id: 'flowchart-styling',
    title: 'Styled Nodes',
    description: 'Custom styling with CSS classes',
    level: 'intermediate',
    code: `flowchart LR
    A[Normal] --> B[Success]
    A --> C[Warning]
    A --> D[Error]

    classDef successClass fill:#90EE90,stroke:#2E7D32
    classDef warningClass fill:#FFE082,stroke:#F57C00
    classDef errorClass fill:#FFCDD2,stroke:#C62828

    class B successClass
    class C warningClass
    class D errorClass`,
    tags: ['styling', 'css', 'colors']
  },
  {
    id: 'flowchart-complex',
    title: 'E-commerce Checkout Flow',
    description: 'Complex real-world flowchart with multiple paths',
    level: 'advanced',
    code: `flowchart TD
    Start([Customer Starts Checkout]) --> Cart{Cart Empty?}
    Cart -->|Yes| End1[Show Error]
    Cart -->|No| Login{Logged In?}

    Login -->|No| Register[Register/Login]
    Register --> Login
    Login -->|Yes| Address[Enter Shipping Address]

    Address --> Shipping{Shipping Method}
    Shipping -->|Standard| Pay1[Payment]
    Shipping -->|Express| Pay2[Payment + Express Fee]

    Pay1 --> Process
    Pay2 --> Process

    Process{Payment Success?}
    Process -->|No| Retry{Retry?}
    Retry -->|Yes| Pay1
    Retry -->|No| End2[Order Cancelled]

    Process -->|Yes| Confirm[Order Confirmation]
    Confirm --> Email[Send Email]
    Email --> End3([Complete])`,
    tags: ['complex', 'ecommerce', 'real-world', 'multiple-paths']
  },
  {
    id: 'flowchart-directions',
    title: 'Flow Directions',
    description: 'Different flow orientations (TD, LR, RL, BT)',
    level: 'beginner',
    code: `flowchart LR
    subgraph TB1[Top to Bottom]
        direction TB
        A1[Top] --> A2[Bottom]
    end

    subgraph LR1[Left to Right]
        direction LR
        B1[Left] --> B2[Right]
    end

    TB1 --> LR1`,
    tags: ['direction', 'orientation', 'layout']
  }
];

/**
 * Flowchart Syntax Reference
 * Comprehensive table of syntax elements
 */
const flowchartSyntax: SyntaxItem[] = [
  {
    syntax: 'flowchart TD',
    description: 'Define flowchart direction (TD = Top Down)',
    example: 'flowchart TD',
    notes: 'Other options: TB, BT, RL, LR'
  },
  {
    syntax: 'A[Text]',
    description: 'Rectangle node with text',
    example: 'A[Process Step]',
    notes: 'Most common node shape'
  },
  {
    syntax: 'A(Text)',
    description: 'Rounded rectangle node',
    example: 'A(Rounded Process)',
    notes: 'Softer appearance'
  },
  {
    syntax: 'A([Text])',
    description: 'Stadium-shaped node',
    example: 'A([Start/End])',
    notes: 'Often used for start/end'
  },
  {
    syntax: 'A[[Text]]',
    description: 'Subroutine/subprocess node',
    example: 'A[[Subroutine]]',
    notes: 'Double vertical lines'
  },
  {
    syntax: 'A[(Text)]',
    description: 'Database/cylinder node',
    example: 'A[(Database)]',
    notes: 'For data storage'
  },
  {
    syntax: 'A((Text))',
    description: 'Circle node',
    example: 'A((Circle))',
    notes: 'For connection points'
  },
  {
    syntax: 'A{Text}',
    description: 'Diamond/decision node',
    example: 'A{Is Valid?}',
    notes: 'For yes/no decisions'
  },
  {
    syntax: 'A{{Text}}',
    description: 'Hexagon node',
    example: 'A{{Hexagon}}',
    notes: 'For preparation steps'
  },
  {
    syntax: 'A[/Text/]',
    description: 'Parallelogram (input/output)',
    example: 'A[/Input Data/]',
    notes: 'Slanted right'
  },
  {
    syntax: 'A[\\Text\\]',
    description: 'Parallelogram (alternate)',
    example: 'A[\\Output Data\\]',
    notes: 'Slanted left'
  },
  {
    syntax: 'A -->|label| B',
    description: 'Arrow with label',
    example: 'A -->|Yes| B',
    notes: 'Shows condition/action'
  },
  {
    syntax: 'A --- B',
    description: 'Line without arrow',
    example: 'A --- B',
    notes: 'Non-directional link'
  },
  {
    syntax: 'A -.-> B',
    description: 'Dotted arrow',
    example: 'A -.-> B',
    notes: 'For optional/weak connections'
  },
  {
    syntax: 'A ==> B',
    description: 'Thick arrow',
    example: 'A ==> B',
    notes: 'For emphasis'
  },
  {
    syntax: 'subgraph Title',
    description: 'Create a subgraph container',
    example: 'subgraph Backend\\n...\\nend',
    notes: 'Groups related nodes'
  },
  {
    syntax: 'classDef className',
    description: 'Define CSS class for styling',
    example: 'classDef red fill:#f00',
    notes: 'Apply with: class A className'
  },
  {
    syntax: 'class A,B className',
    description: 'Apply style class to nodes',
    example: 'class A,B redClass',
    notes: 'Multiple nodes separated by commas'
  },
  {
    syntax: 'style A fill:#f00',
    description: 'Inline style for single node',
    example: 'style A fill:#f9f,stroke:#333',
    notes: 'Direct CSS styling'
  },
  {
    syntax: 'click A callback',
    description: 'Add click interaction (web only)',
    example: 'click A "https://example.com"',
    notes: 'Requires securityLevel: loose'
  }
];

/**
 * Flowchart Diagram Type Definition
 * Export complete flowchart data
 */
export const flowchart: DiagramType = {
  id: 'flowchart',
  name: 'Flowchart',
  category: 'flow',
  icon: '🔄',
  description: 'Visualize processes, workflows, and decision trees',
  detailedDescription: `Flowcharts are diagrams that represent workflows or processes. They use different shapes to represent different types of steps and arrows to show the flow of execution. Flowcharts are ideal for documenting algorithms, business processes, troubleshooting guides, and decision-making flows.`,
  examples: flowchartExamples,
  syntax: flowchartSyntax,
  docsUrl: 'https://mermaid.js.org/syntax/flowchart.html',
  useCases: [
    'Algorithm visualization',
    'Business process documentation',
    'Decision trees and troubleshooting guides',
    'System workflows and user journeys',
    'Software development processes',
    'Onboarding and training materials'
  ],
  tips: [
    'Use consistent node shapes for similar types of steps',
    'Keep flowcharts focused - break complex flows into multiple diagrams',
    'Label decision branches clearly (Yes/No, True/False)',
    'Use subgraphs to organize related steps',
    'Consider left-to-right (LR) for wide screens',
    'Avoid crossing arrows when possible for clarity'
  ],
  status: 'stable'
};

export default flowchart;
