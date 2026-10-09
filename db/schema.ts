/**
 * Canonical shape for the D1-backed editor table.
 *
 * The app deliberately keeps the portfolio payload as JSON so the existing
 * project model remains the source of truth for structure and media. D1 only
 * stores author edits and publication state.
 */
export const portfolioRevisions = {
  table: 'portfolio_revisions',
  columns: {
    id: 'id',
    status: 'status',
    payload: 'payload',
    updatedAt: 'updated_at',
    publishedAt: 'published_at',
  },
} as const;

export type PortfolioRevisionStatus = 'draft' | 'published';
