---
name: page-resolver-pattern
domain: frontend
φ: 0.85
e: use-page-resolver-plus-route-deferred
λ: when.new-fulcro-page or when.route-data-loading
Δ: 0.02
source: learning-md-clojurescript-frontend
evidence: 7
access-count: 0
last-accessed: never
timeframe: long-term
---

# Fulcro Page Resolver Pattern

Standard pattern for adding new pages in Fulcro: backend page resolver + frontend route-deferred + component query.

## λ(e): Action

**1. Backend Page Resolver**
```clojure
;; query.clj - page-level resolver
(pco/defresolver page-dashboard [_]
  {::pco/output [:page/id :system/healthy? :auth/user-count ...]}
  {:page/id :dashboard
   :system/healthy? (engine/healthy?)
   :auth/user-count (count @auth/users)
   :telemetry/total-events (telemetry/total-events)})
```

**2. Frontend Route Loading**
```clojure
;; pages/dashboard.cljs
(defsc DashboardPage [this props]
  {:query [:page/id :system/healthy? :auth/user-count ...]
   :ident (fn [] [:page/id :dashboard])
   :route-segment ["dashboard"]
   :will-enter (fn [app route-params]
                 (dr/route-deferred [:page/id :dashboard]
                   #(df/load! app [:page/id :dashboard] DashboardPage
                      {:post-mutation `dr/target-ready
                       :post-mutation-params {:target [:page/id :dashboard]}})))}
  ...)
```

**3. Component Query**
```clojure
;; Child components declare data needs
(defsc UserList [this {:keys [auth/users]}]
  {:query [{:auth/users (comp/get-query User)}]
   :ident (fn [] [:component/id :user-list])}
  ...)

;; Parent composes child queries
(defsc DashboardPage [this props]
  {:query [:system/healthy?
           {:auth/users (comp/get-query User)}
           {:telemetry/events (comp/get-query TelemetryEvent)}]
   ...}
  ...)
```

## λ(φ): Why

**Why page resolvers:**
- Single entry point for all page data
- Pathom optimizes query (parallel resolution, deduplication)
- Consistent loading states across pages
- Self-documenting: query shows exactly what page needs

**Why route-deferred:**
- Page renders immediately with loading state
- Data loads in background
- No blocking navigation
- Error boundaries can catch load failures

**Why component queries:**
- Declarative data requirements
- Fulcro normalizes data automatically
- Components can be moved without changing data logic

## λ(λ): When to Apply

**Trigger conditions:**
- Adding new page to Fulcro app
- Page needs data from backend
- Want consistent loading/error states

**Pattern applies to:**
- Dashboard pages
- Detail pages (project, user)
- Builder pages (empathy, value-prop, mvp, canvas)
- List pages with filters

**Does NOT apply to:**
- Pure UI components (no data)
- Modal/dialog content (use local state)
- Static pages (no backend data)

## λ(Δ): Evolution

- **Validated**: φ += 0.02 (7 pages using pattern successfully)
- **Corrected**: φ -= 0.01 (if over-fetching data)

## Implementation Checklist

```clojure
;; 1. Define page resolver on backend
(pco/defresolver page-my-page [_]
  {::pco/output [:page/id :my/data :my/other-data]}
  {:page/id :my-page
   :my/data (fetch-data)
   :my/other-data (fetch-other)})

;; 2. Register resolver
(registry/register-resolvers! [page-my-page])

;; 3. Create page component
(defsc MyPage [this {:keys [my/data]}]
  {:query [:page/id :my/data :my/other-data]
   :ident (fn [] [:page/id :my-page])
   :route-segment ["my-route"]
   :will-enter (fn [app _]
                 (dr/route-deferred [:page/id :my-page]
                   #(df/load! app [:page/id :my-page] MyPage
                      {:post-mutation `dr/target-ready
                       :post-mutation-params {:target [:page/id :my-page]}})))}
  (dom/div
    (if data
      (render-content data)
      (ui-skeleton))))  ; Loading state

;; 4. Add to router
(defrouter RootRouter [_ _]
  {:router-targets [DashboardPage MyPage ...]}
  ...)
```

## Key Details

**Mutation Result Keys:**
Pathom returns mutation results with symbol keys:
```clojure
;; Query pattern
(let [result (q `[{(webux/create-project! params) [:project/id]}])
      ;; Extract using symbol key
      project (get result 'ouroboros.webux/create-project!)]
  ...)
```

**Loading States:**
```clojure
;; Skeleton placeholder while loading
(defsc MyPage [this {:keys [my/data]}]
  ...
  (if data
    (render-content data)
    (ui-skeleton {:lines 5})))
```

## Context

- **Applies to**: Fulcro applications with backend data
- **Avoid for**: Static sites, simple SPAs without backend
- **Related instincts**: fulcro-render-scheduling, resolver-registry-pattern
- **See also**: [LEARNING.md#clojurescriptfulcro-frontend](LEARNING.md#clojurescriptfulcro-frontend)

## Evidence Log

| Date | Scenario | Result | φ Change |
|------|----------|--------|----------|
| 2026-02 | Dashboard page | Consistent loading state | +0.05 |
| 2026-02 | 4 builder pages | All use same pattern | +0.05 |
| 2026-02 | Project detail | Data loads correctly | +0.03 |
| 2026-01 | Telemetry page | Real-time updates work | +0.02 |
