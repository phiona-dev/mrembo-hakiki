# ADR 002: Use rule based counterfeit detection(Not AI)

## Status
Accepted

## Context
- Goal is to understand how rule based detection systems are built rather than calling an API that hides the logic.
- Also users need explainable verdicts they can trust and verify. Rule-based system provides deterministic and auditable results.(//reason still vague. explain more later)

## Decision
Rule bsed scoring matrix with evidence display

## Consequences

**Easier:**
- Explainable
- No API costs
- works offline

**Harder:**
- Must manually define rules
- Limited to seeded products

## Alternatives Considered

**OpenAI API: ** Rejected because API costs scale with usage and responses are non-deterministic
**TensorFlow model**  Rejected because training requires large dataset of known counterfeits(not readily available)
**Third party verification API** Rejected because adds external dependency and ongoing costs

## Date
2025-05-06