/**
 * Diagram Data Index
 *
 * Central export point for all diagram types.
 * Provides access to diagram data and helper functions.
 */

import type { DiagramType, DiagramsData, DiagramCategory } from '../types';
import { flowchart } from './flowchart';

/**
 * All Diagrams Collection
 * Currently contains only flowchart - more will be added in future phases
 */
export const diagrams: DiagramsData = {
  flowchart
  // TODO: Add more diagram types in future phases:
  // sequence,
  // classDiagram,
  // stateDiagram,
  // erDiagram,
  // gantt,
  // pie,
  // quadrantChart,
  // requirementDiagram,
  // gitGraph,
  // userJourney,
  // timeline,
  // mindmap,
  // sankey
};

/**
 * Get diagram by type ID
 * @param typeId - The diagram type identifier (e.g., 'flowchart')
 * @returns The diagram type object or undefined if not found
 */
export function getDiagramByType(typeId: string): DiagramType | undefined {
  return diagrams[typeId];
}

/**
 * Get all diagram types as an array
 * @returns Array of all diagram type objects
 */
export function getAllDiagrams(): DiagramType[] {
  return Object.values(diagrams);
}

/**
 * Get diagrams by category
 * @param category - The category to filter by
 * @returns Array of diagram types in that category
 */
export function getDiagramsByCategory(category: DiagramCategory): DiagramType[] {
  return getAllDiagrams().filter(diagram => diagram.category === category);
}

/**
 * Get all diagram IDs
 * @returns Array of diagram type IDs
 */
export function getDiagramIds(): string[] {
  return Object.keys(diagrams);
}

/**
 * Check if a diagram type exists
 * @param typeId - The diagram type identifier
 * @returns True if the diagram type exists
 */
export function hasDiagramType(typeId: string): boolean {
  return typeId in diagrams;
}

/**
 * Search diagrams by name or description
 * @param query - Search query string
 * @returns Array of matching diagram types
 */
export function searchDiagrams(query: string): DiagramType[] {
  const lowerQuery = query.toLowerCase();
  return getAllDiagrams().filter(diagram =>
    diagram.name.toLowerCase().includes(lowerQuery) ||
    diagram.description.toLowerCase().includes(lowerQuery) ||
    diagram.id.toLowerCase().includes(lowerQuery)
  );
}

/**
 * Get total number of diagrams
 * @returns Count of diagram types
 */
export function getDiagramCount(): number {
  return Object.keys(diagrams).length;
}

/**
 * Get total number of examples across all diagrams
 * @returns Count of all examples
 */
export function getTotalExampleCount(): number {
  return getAllDiagrams().reduce((total, diagram) => total + diagram.examples.length, 0);
}

/**
 * Get diagrams grouped by category
 * @returns Object with categories as keys and diagram arrays as values
 */
export function getDiagramsGroupedByCategory(): Record<DiagramCategory, DiagramType[]> {
  const grouped: Record<DiagramCategory, DiagramType[]> = {
    flow: [],
    structure: [],
    timeline: [],
    other: []
  };

  getAllDiagrams().forEach(diagram => {
    grouped[diagram.category].push(diagram);
  });

  return grouped;
}

/**
 * Get a random diagram type
 * @returns Random diagram type object
 */
export function getRandomDiagram(): DiagramType | undefined {
  const allDiagrams = getAllDiagrams();
  if (allDiagrams.length === 0) return undefined;
  const randomIndex = Math.floor(Math.random() * allDiagrams.length);
  return allDiagrams[randomIndex];
}

/**
 * Get a random example from a specific diagram type
 * @param typeId - The diagram type identifier
 * @returns Random example from that diagram type, or undefined if not found
 */
export function getRandomExample(typeId: string) {
  const diagram = getDiagramByType(typeId);
  if (!diagram || diagram.examples.length === 0) return undefined;
  const randomIndex = Math.floor(Math.random() * diagram.examples.length);
  return diagram.examples[randomIndex];
}

// Re-export individual diagram types for direct imports
export { flowchart } from './flowchart';

// Re-export types for convenience
export type { DiagramType, DiagramExample, SyntaxItem, DiagramCategory } from '../types';
