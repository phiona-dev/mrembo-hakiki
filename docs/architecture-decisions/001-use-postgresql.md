# ADR 001: Use PostgreSQL as Primary Database

## Status
Accepted

## Context
Mrembo Hakiki needs to store product data, ingredient lists, and counterfeit evidence. Key requirements:
- Match ingredients against reference lists (array operations)
- Ensure data integrity (counterfeit flags must reference real products)
- Support future features like price history and user reports

The project is a learning exercise focused on software engineering best practices.

## Decision
Use PostgreSQL as the primary database.

## Consequences

**Easier:**
- Complex ingredient matching using PostgreSQL array operators and GIN indexes
- Data integrity through foreign key constraints
- Learning valuable SQL skills for portfolio

**Harder:**
- Schema changes require migrations (more planning)
- Initial setup takes longer than MongoDB
- Must think about schema design before coding

## Alternatives Considered

**MongoDB:** Rejected because document validation is weaker and ingredient matching across documents is less efficient. Also wanted to learn relational databases.

**MySQL:** Rejected because PostgreSQL has better support for array operations and JSON queries, which may be useful for ingredient data.

## Date
2025-05-06