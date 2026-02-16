---
title: "Pathom Resolver Patterns"
category: architecture
date: 2026-02-14
---

# Pathom Resolver Patterns

## Pattern: Self-Registration

Resolvers register themselves when namespace loads:

```clojure
(ns ouroboros.history
  (:require [ouroboros.resolver-registry :as registry]))

(registry/defresolver git-commits
  [_ _]
  {::pco/output [{:git/commits [:git/hash :git/subject]}]}
  {:git/commits (get-commits)})
```

Benefits:
- No central registration file
- Add resolvers by requiring namespace
- Discoverability via `(registry/list-resolvers)`

## Pattern: Nested Queries

Support nested data structures:

```clojure
(registry/defresolver project-with-details
  [_ {:keys [project/id]}]
  {::pco/input [:project/id]
   ::pco/output [:project/name
                 {:project/builders [:builder/type :builder/status]}
                 {:project/analytics [:analytics/progress]}]}
  (fetch-project-with-relations id))
```

## Pattern: Error Handling

Return errors as data, not exceptions:

```clojure
(registry/defresolver safe-operation
  [_ params]
  {::pco/output [:result/status :result/data :result/error]}
  (try
    {:result/status :success
     :result/data (perform-operation params)}
    (catch Exception e
      {:result/status :error
       :result/error (.getMessage e)})))
```

## Pattern: Batch Resolvers

Use batching for N+1 prevention:

```clojure
(registry/defresolver batch-fetch-users
  [_ user-ids]
  {::pco/input [:user/id]
   ::pco/output [:user/name :user/email]
   ::pco/batch? true}
  (fetch-users-in-batch user-ids))
```

## Anti-Patterns

1. **Resolver god objects** - One resolver for everything
2. **Deep nesting** - More than 3 levels of nesting
3. **Missing input validation** - Not checking required keys
4. **Side effects in resolvers** - Resolvers should be pure reads

## Related Documentation

- [Tool/Resolver Convergence](../tool-resolver-convergence.md)
- [Clojure Idiom Reviewer](../agents/review/clojure-idiom-reviewer.md)
