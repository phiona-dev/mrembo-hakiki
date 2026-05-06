# ADR 003: Skip user authentication in V1

## Status
Accepted

## Context
- MVP focus is scanning not user accounts
- Authentication adds complexity (JWT, password reset, sessions)
- No need to track individual users for v1

## Decision
No login/signup in v1

## Consequences

**Easier:**
- Faster development
- No auth bugs
- Users scan immediately

**Harder:**
- Cannot track user behavior
- No personalized features

## Alternatives Considered

**JWT auth:**
**Session-based auth** 
**0Auth**

## Date
2025-05-06