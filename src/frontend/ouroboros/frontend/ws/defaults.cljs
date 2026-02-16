(ns ouroboros.frontend.ws.defaults
  "Pre-filled wisdom and tip-detail content for instant display.
   Pure data -- no side effects, no dependencies.
   ~565 LOC of static content that provides value before ECA personalizes.")

;; ============================================================================
;; Default Wisdom Cache (pre-fill for instant display)
;; ============================================================================

(def default-wisdom-cache
  "Pre-filled wisdom content for instant display before ECA personalizes.
   Keyed by [phase request-type] vectors matching the cache structure.
   Provides genuinely useful content so first-time users see value immediately."
  {;; -- Empathy Phase --
   [:empathy :tips]
   "## Empathy Tips

1. **Start with observation, not assumptions** -- Watch how your target users currently solve this problem. What workarounds do they use?

2. **Listen for emotions, not features** -- When users say \"it's fine,\" dig deeper. The strongest opportunities hide behind accepted frustrations.

3. **Map the full journey** -- Don't focus only on the core task. Look at what happens before and after -- setup, cleanup, sharing results.

4. **Separate what people say from what they do** -- Interview data and behavioral data often contradict. Both are valuable signals.

5. **Find the non-consumers** -- Who *should* be using a solution but isn't? They often reveal unmet needs that current users have normalized."

   [:empathy :analysis]
   "## Empathy Analysis

### What to look for

Your empathy map captures four dimensions of your user's experience: what they **say**, **think**, **do**, and **feel**. The most valuable insights come from contradictions between these dimensions.

### Common gaps at this stage

- **Too solution-focused** -- If your pains and gains read like feature requests, go back to the human level. What job is the user trying to get done?
- **Single persona trap** -- If all your insights describe one type of user, you may be missing important segments. Try mapping a second persona.
- **Missing emotional context** -- Facts about user behavior are useful, but understanding *why* users feel frustrated, anxious, or delighted is what drives product decisions.

### Strengthening your empathy work

The best empathy maps are built from real conversations, not assumptions. Even 3-5 user interviews can dramatically shift your understanding of the problem space."

   [:empathy :suggestions]
   "## Ideas to Explore

1. **\"What's the most frustrating part of your current workflow?\"** -- Ask this to real users. The answer often reveals the core pain point your product should address.

2. **Shadow a user for 30 minutes** -- Watch someone go through their current process without interrupting. Note where they hesitate, backtrack, or express frustration.

3. **Map competing alternatives** -- List every way users currently solve this problem (including doing nothing). What does each alternative get right?

4. **Write a \"day in the life\" narrative** -- Describe a typical day for your target user. Where does your problem space fit into their priorities?"

   ;; -- Value Proposition Phase --
   [:valueprop :tips]
   "## Value Proposition Tips

1. **Start with jobs, not features** -- What is your customer trying to accomplish? Frame everything around their goal, not your solution.

2. **Rank pains by severity** -- Not all problems are equal. A pain that costs users time every day matters more than an occasional annoyance.

3. **Pain relievers beat gain creators** -- Removing a real frustration is more compelling than adding a nice-to-have improvement.

4. **Test your fit statement** -- Can you complete this sentence clearly? \"My product helps [customer] who want to [job] by [value] unlike [alternative].\"

5. **Validate with real language** -- Use the exact words your users use to describe their problems. If your value prop doesn't resonate in their vocabulary, it won't land."

   [:valueprop :analysis]
   "## Value Proposition Analysis

### Evaluating your fit

A strong value proposition connects three things: a specific customer segment, a clearly defined job-to-be-done, and a differentiated way you deliver value. Weakness in any leg makes the whole proposition fragile.

### Common gaps at this stage

- **Feature list disguised as value** -- If your gain creators are just product features, translate them into outcomes. \"Dashboard\" becomes \"see all metrics in one place without switching tools.\"
- **Weak differentiation** -- If a competitor could make the same claim, your proposition isn't specific enough. What can only *you* deliver?
- **Mismatched severity** -- The pains you're relieving should match the gains you're creating in intensity. Solving a minor annoyance with a complex solution won't work.

### Next steps

Validate your value proposition by sharing it with 3-5 potential users. If they immediately understand what you do and why it matters to them, you have product-market fit signal."

   [:valueprop :suggestions]
   "## Ideas to Explore

1. **Run a \"fake door\" test** -- Create a simple landing page describing your value proposition. Measure how many people click \"Sign Up\" or \"Learn More.\"

2. **Compare your top 3 pains against competitors** -- For each pain you address, how do existing solutions handle it? Where is the biggest gap?

3. **Try the \"5 Whys\" on your primary gain** -- Why does your user want this gain? Keep asking why to find the deeper motivation driving demand.

4. **Flip your proposition** -- What if you targeted the opposite user segment? Sometimes the best market is the one you haven't considered."

   ;; -- MVP Phase --
   [:mvp :tips]
   "## MVP Tips

1. **Cut features until it hurts, then cut one more** -- An MVP tests a hypothesis, not a product. Every extra feature delays learning.

2. **Define success metrics before you build** -- What number proves your core assumption? If you can't measure it, you can't learn from it.

3. **Focus on ONE user, ONE problem, ONE solution** -- Breadth comes later. Depth of learning comes from constraint.

4. **Time-box your build** -- Set a deadline (2-4 weeks) and ship whatever you have. The goal is feedback, not perfection.

5. **Make the manual version first** -- Before automating anything, can you deliver the value manually? A concierge MVP tests demand without engineering investment."

   [:mvp :analysis]
   "## MVP Analysis

### Evaluating your MVP plan

A good MVP is the smallest experiment that tests your riskiest assumption. It should be buildable in weeks, not months, and produce clear evidence of whether your value proposition works.

### Common gaps at this stage

- **Building too much** -- If your MVP has more than 3 core features, you're probably building a v1, not an MVP. Strip it down to one core flow.
- **Unclear success criteria** -- \"Users like it\" is not a metric. Define specific, measurable outcomes: signups, retention rate, task completion time, willingness to pay.
- **Missing the risky assumption** -- What's the one thing that must be true for your product to succeed? Your MVP should test exactly that.

### De-risking your build

Consider what you can learn *without* building software. Mockups, prototypes, landing pages, and manual processes can all validate assumptions faster and cheaper than code."

   [:mvp :suggestions]
   "## Ideas to Explore

1. **Identify your riskiest assumption** -- What single belief, if wrong, would kill this project? Design your MVP to test exactly that.

2. **Map the critical user journey** -- Draw the 3-5 steps your user takes from first touch to achieving their goal. Which step has the highest drop-off risk?

3. **Create a \"wizard of oz\" prototype** -- Build the interface but handle the backend manually. Users get the experience; you get learning without engineering cost.

4. **Set a 2-week build deadline** -- What's the most valuable thing you could ship in 14 days? That constraint often reveals the true MVP."

   ;; -- Lean Canvas Phase --
   [:canvas :tips]
   "## Lean Canvas Tips

1. **Fill Problem and Customer Segments first** -- Everything else flows from a clear understanding of who you serve and what problem you solve.

2. **Your Unfair Advantage is the hardest box** -- It's not a feature. It's something that can't be easily copied: expertise, network, data, or community.

3. **Key Metrics: pick 1-3 numbers** -- What metrics prove traction? Choose leading indicators (activation, retention) over vanity metrics (page views, downloads).

4. **Revenue streams need specifics** -- \"Subscription\" isn't enough. What price point? What billing frequency? What's the willingness-to-pay evidence?

5. **Iterate, don't perfect** -- A lean canvas is a living document. Update it as you learn. The first version is always wrong -- that's the point."

   [:canvas :analysis]
   "## Lean Canvas Analysis

### Evaluating your canvas

A complete lean canvas should tell a coherent story: a specific customer has a specific problem, your solution delivers unique value, and there's a viable path to revenue and growth.

### Common gaps at this stage

- **Disconnected boxes** -- If your Problem doesn't clearly connect to your Solution, or your Channels don't reach your Customer Segments, the canvas has internal contradictions.
- **Generic advantages** -- \"Great UX\" or \"better technology\" are not unfair advantages. What do you have that competitors genuinely cannot replicate in 12 months?
- **Missing cost structure** -- Many canvases detail revenue but skip realistic cost projections. Include customer acquisition cost, infrastructure, and team costs.

### Strengthening your canvas

The most useful exercise is sharing your canvas with someone outside your team. If they can't explain your business model back to you in 30 seconds, simplify further."

   [:canvas :suggestions]
   "## Ideas to Explore

1. **Test your pricing** -- Ask 5 potential customers: \"Would you pay $X/month for this?\" Their hesitation (or enthusiasm) is more valuable than any spreadsheet model.

2. **Map your channel strategy** -- How will your first 100 users find you? Be specific: which communities, platforms, or networks will you target?

3. **Calculate your unit economics** -- What does it cost to acquire one customer? What's their lifetime value? If LTV < CAC, the business model needs work.

4. **Review a competitor's canvas** -- Fill out a lean canvas for your strongest competitor. Where are the gaps in their model that you can exploit?"})

;; ============================================================================
;; Default Tip Detail Cache (pre-fill for instant drawer display)
;; ============================================================================

(def default-tip-detail-cache
  "Pre-written content for contextual wisdom tip drawers.
   Keyed by [phase-kw tip-title] matching the tip-detail cache structure.
   Shown instantly on first click -- ECA refreshes silently in background."
  {;; -- Empathy: Observe First --
   [:empathy "Observe First"]
   "## Why This Matters

Observation is the foundation of empathy research. When you watch real users in their natural context, you discover behaviors and workarounds that no survey or interview can reveal. People often can't articulate their own habits -- they've automated them.

## Step-by-Step Actions

1. **Choose a real context** -- Visit where your users actually work or live. Coffee shops, offices, homes. The environment shapes behavior.
2. **Be a fly on the wall** -- Resist the urge to help or suggest. Your job is to notice, not to fix.
3. **Record what surprises you** -- If something feels \"normal\" to the user but strange to you, that's a signal.
4. **Time the friction** -- Use a stopwatch on tasks. Users underestimate how long painful workflows take.
5. **Debrief within 24 hours** -- Write up your observations while they're fresh. Raw notes decay quickly.

## Common Mistakes

- **Asking instead of watching** -- Interviews are valuable, but they capture what people *think* they do, not what they *actually* do.
- **Observing too briefly** -- One session isn't enough. Patterns emerge after 3-5 observations.
- **Confirmation bias** -- You'll see what you expect to see. Bring a partner to challenge your interpretations.

## Quick Exercise

Pick one potential user. Spend 30 minutes watching them do the task your product addresses. Write down 3 things that surprised you."

   ;; -- Empathy: Find Contradictions --
   [:empathy "Find Contradictions"]
   "## Why This Matters

The gap between what people say and what they do is where the most valuable product insights hide. Users often describe their ideal behavior in interviews but revert to shortcuts and workarounds in practice. These contradictions reveal genuine needs.

## Step-by-Step Actions

1. **Compare interview data with behavioral data** -- Put what users told you side by side with what you observed. Circle the mismatches.
2. **Look for the \"yeah, but...\"** -- When a user says \"I always do X\" then immediately does Y, note the contradiction without judgment.
3. **Map stated priorities vs. time spent** -- Ask users what matters most, then track where they actually spend their time.
4. **Check for social desirability bias** -- People tell you what makes them look competent. The embarrassing workarounds are the real signal.
5. **Validate contradictions with data** -- Use analytics, logs, or usage patterns to confirm whether stated behaviors match reality.

## Common Mistakes

- **Taking user statements at face value** -- \"I love using spreadsheets\" might mean \"I don't know a better option exists.\"
- **Ignoring small contradictions** -- Small gaps often point to the same underlying unmet need.
- **Being judgmental** -- Contradictions aren't lies. They reflect the gap between intention and reality.

## Quick Exercise

Review your last 3 user interviews. For each one, find one thing the user said that conflicts with something you observed or know about their behavior."

   ;; -- Empathy: Listen to Non-Users --
   [:empathy "Listen to Non-Users"]
   "## Why This Matters

People who chose NOT to use your solution (or any solution) are an untapped goldmine. They reveal barriers to adoption, missing features, and market segments you're ignoring. Non-users often have the clearest perspective on why something doesn't work.

## Step-by-Step Actions

1. **Identify who opted out** -- Find people who evaluated your product (or category) and chose not to use it. Their reasons are specific and actionable.
2. **Ask \"what do you do instead?\"** -- The alternative they chose reveals what your product is really competing against (often it's \"nothing\").
3. **Probe for switching costs** -- What would have to change for them to try your solution? The answer reveals your real barriers.
4. **Look for \"good enough\" solutions** -- If users are satisfied with a mediocre workaround, your product needs to be dramatically better, not incrementally better.
5. **Map the decision journey** -- At what point did they decide not to use your product? The dropout point is your biggest opportunity.

## Common Mistakes

- **Only talking to fans** -- Satisfied users confirm your assumptions. Non-users challenge them.
- **Assuming non-users don't have the problem** -- They often do; they just don't believe your solution is worth the effort.
- **Treating all non-users the same** -- Some never heard of you, some evaluated and rejected, some tried and churned. Each group has different insights.

## Quick Exercise

Find 2 people who considered a solution in your space but decided against it. Ask them: \"What would it take to change your mind?\""

   ;; -- Empathy: Emotional Jobs --
   [:empathy "Emotional Jobs"]
   "## Why This Matters

Users don't just hire products for functional outcomes -- they hire them for emotional and social outcomes too. A project management tool isn't just about tracking tasks; it's about feeling in control and looking competent to your team. Understanding emotional jobs unlocks deeper product differentiation.

## Step-by-Step Actions

1. **Map the three job types** -- For each user need, identify the functional job (\"get X done\"), the emotional job (\"feel Y\"), and the social job (\"be seen as Z\").
2. **Listen for feeling words** -- When users say \"frustrated,\" \"anxious,\" \"proud,\" or \"embarrassed,\" you've found an emotional job.
3. **Identify the \"hire\" and \"fire\" moments** -- When did the user start using your product (hire)? When did they stop (fire)? The emotions at both moments are critical.
4. **Study the upgrade triggers** -- What emotional state drives someone from free to paid? From casual to power user? That emotion is your growth lever.
5. **Design for the feeling, not just the function** -- Once you know the emotional job, ask: \"Does our UI/UX make users feel this way?\"

## Common Mistakes

- **Reducing everything to features** -- \"Users want a dashboard\" is functional. \"Users want to feel confident before their Monday meeting\" is the real job.
- **Ignoring social context** -- How a user looks to their boss, team, or peers often matters more than personal preference.
- **Assuming emotions are irrational** -- Emotional jobs are real, recurring needs. They're as valid as functional requirements.

## Quick Exercise

Take your product's top use case. Write down the functional job, the emotional job, and the social job. Which one does your product serve best? Which one is underserved?"

   ;; -- Value Prop: Jobs Before Features --
   [:valueprop "Jobs Before Features"]
   "## Why This Matters

Features are solutions. Jobs are problems. When you start with features, you risk building something clever that nobody needs. When you start with customer jobs-to-be-done, every feature has a clear reason to exist -- and features that don't map to a job get cut.

## Step-by-Step Actions

1. **List your customer's top 5 jobs** -- What tasks are they trying to complete? What goals are they pursuing? Be specific and verb-driven.
2. **Rank by frequency and importance** -- A job done daily matters more than one done quarterly. A job tied to revenue matters more than a convenience.
3. **Map current solutions to each job** -- How do users currently accomplish each job? What tools, workarounds, or manual processes do they use?
4. **Identify underserved jobs** -- Where are current solutions failing? Slow, expensive, error-prone, or frustrating? Those are your opportunities.
5. **Derive features from jobs** -- For each underserved job, ask: \"What's the simplest feature that would make this job significantly easier?\"

## Common Mistakes

- **Listing features as jobs** -- \"Use our dashboard\" is not a job. \"Monitor team performance weekly\" is a job.
- **Too many jobs** -- Focus on 1-3 core jobs. A product that does 10 jobs poorly loses to one that does 1 job brilliantly.
- **Ignoring the job context** -- The same user has different jobs in different contexts. \"Prepare for a meeting\" vs. \"Review last week's results\" require different solutions.

## Quick Exercise

Write down 3 jobs your target customer is trying to accomplish. For each one, rate how well existing solutions serve that job (1-10). The lowest-rated job is your biggest opportunity."

   ;; -- Value Prop: Pain Severity Ranking --
   [:valueprop "Pain Severity Ranking"]
   "## Why This Matters

Not all pains are created equal. A pain that wastes 2 hours daily is worth solving; a minor annoyance is not. Ranking pains by severity and frequency helps you prioritize which problems to solve first -- and ensures your value proposition addresses the pains users actually care about.

## Step-by-Step Actions

1. **List all known pains** -- From your empathy research, list every pain, frustration, and obstacle your users face.
2. **Score severity (1-5)** -- How much does this pain cost the user? In time, money, stress, or missed opportunities?
3. **Score frequency (1-5)** -- How often does this pain occur? Daily? Weekly? Occasionally?
4. **Calculate pain score** -- Multiply severity x frequency. Sort by descending score.
5. **Validate the top 3** -- Take your highest-scoring pains back to users. Ask: \"If I could eliminate this problem, how much would that be worth to you?\"

## Common Mistakes

- **Equal-weighting all pains** -- Treating every complaint as equally important leads to a scattered product.
- **Trusting frequency over severity** -- A daily annoyance (severity 1 x frequency 5 = 5) is less valuable than a weekly crisis (severity 5 x frequency 3 = 15).
- **Forgetting willingness to pay** -- High pain doesn't always mean high willingness to pay. Validate that users would actually invest in a solution.

## Quick Exercise

Pick your top 5 user pains. Score each on severity (1-5) and frequency (1-5). Multiply the scores. Does the ranking match your product priorities?"

   ;; -- Value Prop: One Killer Value --
   [:valueprop "One Killer Value"]
   "## Why This Matters

A value proposition that lists 10 benefits is really saying \"I don't know what makes me special.\" Users make decisions based on ONE compelling reason, not a portfolio of nice-to-haves. Focus creates clarity -- for you and your customers.

## Step-by-Step Actions

1. **List all your value claims** -- Write down everything your product does well. Be honest about which ones are genuinely differentiated.
2. **Apply the \"10x test\"** -- For each claim, ask: \"Is this 10x better than what users do today?\" If not, it's a feature, not a killer value.
3. **Check for uniqueness** -- Can a competitor make the same claim? If yes, it's table stakes, not differentiation.
4. **Write it in one sentence** -- Your killer value should fit in: \"Only [product] lets you [specific outcome] because [unique capability].\"
5. **Test with the \"so what?\" chain** -- Tell someone your value prop. If they say \"so what?\" keep refining until they say \"tell me more.\"

## Common Mistakes

- **Confusing features with value** -- \"AI-powered\" is a feature. \"Saves you 3 hours per week on reports\" is value.
- **Multiple value props for multiple audiences** -- Pick ONE audience and ONE value. You can expand later. Trying to appeal to everyone appeals to no one.
- **Hiding behind jargon** -- If your value proposition requires a glossary, it's not clear enough.

## Quick Exercise

Complete this sentence: \"The single most important reason someone should choose my product over all alternatives is _____.\" If you can't fill it in confidently, your value proposition needs more focus."

   ;; -- Value Prop: Fit Score --
   [:valueprop "Fit Score"]
   "## Why This Matters

A fit score maps every pain reliever in your product to a specific customer pain. Features without a matching pain are waste -- they cost engineering time, add complexity, and confuse users. A high fit score means your product is tightly aligned with real needs.

## Step-by-Step Actions

1. **Create a two-column table** -- Left column: customer pains (from your empathy research). Right column: your pain relievers (features/capabilities).
2. **Draw connections** -- For each pain reliever, draw a line to the pain it addresses. Some pains may have multiple relievers; some relievers may address multiple pains.
3. **Find orphans** -- Pain relievers with no matching pain are candidates for cutting. Pains with no reliever are opportunities for new features.
4. **Score the fit (0-100%)** -- What percentage of your top pains have at least one strong pain reliever? Aim for 80%+ on your top 3 pains.
5. **Prioritize by gap** -- The biggest gap between pain severity and reliever strength is where you should invest next.

## Common Mistakes

- **Keeping unmatched features** -- It's hard to cut features you've already built or planned. But features without pain matches dilute your product.
- **Forcing connections** -- If you have to stretch to explain how a feature relieves a pain, the connection is too weak.
- **Ignoring gain creators** -- Fit scoring applies to gains too. Which gain creators map to which desired outcomes?

## Quick Exercise

List your product's top 5 features. For each one, write the specific customer pain it addresses. If you can't name the pain in one sentence, the feature may not be justified."

   ;; -- MVP: Cut Ruthlessly --
   [:mvp "Cut Ruthlessly"]
   "## Why This Matters

The purpose of an MVP is to learn, not to impress. Every feature you add delays the moment you get real user feedback. The best MVPs are embarrassingly simple -- they test one hypothesis with the minimum possible effort. Ship fast, learn fast.

## Step-by-Step Actions

1. **List every planned feature** -- Write down everything you think your MVP \"needs.\" Be exhaustive.
2. **Tag each as MUST / SHOULD / COULD / WON'T** -- Be ruthless. MUST means \"the test fails without this.\" Most features are SHOULD or COULD.
3. **Cut everything that isn't MUST** -- Physically remove SHOULD and COULD items from your scope. Put them in a \"later\" list.
4. **Cut one more MUST** -- You probably have too many. Find one \"MUST\" that's actually a SHOULD in disguise.
5. **Time-box the build** -- Set a deadline (1-2 weeks for software, 1-3 days for prototypes). Ship whatever you have when time's up.

## Common Mistakes

- **\"Just one more feature\" syndrome** -- Each small addition feels harmless, but they compound into months of delay.
- **Building for edge cases** -- Your MVP serves the core use case for the core user. Edge cases come later.
- **Confusing MVP with v1** -- An MVP is an experiment. A v1 is a product. They're different things.

## Quick Exercise

Take your current feature list and cross out half of it. Can the remaining features still test your core hypothesis? If yes, those are your real MVP features."

   ;; -- MVP: One User, One Problem --
   [:mvp "One User, One Problem"]
   "## Why This Matters

Focus is the most powerful tool in product development. When you try to serve multiple user types with multiple solutions, you end up with a diluted product that partially satisfies everyone but fully satisfies no one. One user, one problem, one solution -- then expand.

## Step-by-Step Actions

1. **Pick your primary persona** -- Which user type has the most acute version of the problem? That's your ONE user.
2. **Define their ONE problem** -- What is the single most important job-to-be-done for this persona? State it as: \"[User] needs to [job] because [motivation].\"
3. **Design ONE solution flow** -- Map the minimum path from problem to solution. It should be 3-5 steps, not 15.
4. **Validate the focus** -- Ask 3 users of this persona type: \"Is [problem] your biggest challenge?\" If they say no, reconsider.
5. **Write a one-sentence MVP description** -- \"For [user], who [problem], our MVP [solution].\" If the sentence is longer than 20 words, simplify.

## Common Mistakes

- **Multiple personas** -- Serving 3 persona types means 3x the design decisions, 3x the testing, and 3x the time.
- **Bundling problems** -- \"Users need project management AND communication AND reporting\" is three products, not one.
- **Fear of missing out** -- You're not ignoring other users forever. You're sequencing: nail one first, then expand.

## Quick Exercise

Write the name of your ONE target user and their ONE core problem on an index card. Tape it above your monitor. Every feature decision gets checked against that card."

   ;; -- MVP: Define Success First --
   [:mvp "Define Success First"]
   "## Why This Matters

Without a clear success metric, you can't tell if your MVP worked. You'll ship, get some data, and then rationalize any outcome as \"learning.\" Setting your success criteria BEFORE you build forces intellectual honesty and makes the results unambiguous.

## Step-by-Step Actions

1. **State your hypothesis** -- \"We believe [user] will [behavior] because [reason].\" This is what your MVP tests.
2. **Choose a primary metric** -- What single number proves or disproves your hypothesis? Signup rate? Task completion? Retention? Willingness to pay?
3. **Set a threshold** -- What number means success? \"If 30% of users complete the core flow, we proceed. Below 15%, we pivot.\" Be specific.
4. **Define the grey zone** -- Between your success and failure thresholds, what do you do? More testing? Iterate? Having a plan prevents endless ambiguity.
5. **Set a timeline** -- How long will you run the test? 1 week? 2 weeks? 100 users? Pre-commit to when you'll evaluate.

## Common Mistakes

- **Vanity metrics** -- Page views and signups feel good but don't prove value. Measure engagement and retention.
- **Moving the goalposts** -- If you set 30% as success and get 22%, that's a failure. Don't retroactively redefine success.
- **No failure criteria** -- If there's no number that would make you stop, you're not running an experiment -- you're just building.

## Quick Exercise

Write one sentence: \"Our MVP succeeds if [metric] reaches [threshold] within [timeframe].\" Pin it where your team can see it."

   ;; -- MVP: Test the Riskiest Bit --
   [:mvp "Test the Riskiest Bit"]
   "## Why This Matters

Every product is built on assumptions. Some are safe (people use smartphones), some are risky (people will pay for this specific feature). Your MVP should be designed to test the riskiest assumption first -- because if that assumption is wrong, nothing else matters.

## Step-by-Step Actions

1. **List your assumptions** -- Write down every assumption your product depends on. \"Users have this problem.\" \"Users will switch from their current solution.\" \"Users will pay $X/month.\"
2. **Rank by risk** -- For each assumption, ask: \"How confident am I that this is true?\" and \"How bad is it if this is wrong?\" Low confidence + high impact = highest risk.
3. **Pick the top risk** -- Choose the single assumption that, if wrong, would invalidate your entire product. That's what your MVP tests.
4. **Design the test** -- What's the simplest experiment that proves or disproves this assumption? It might not be software at all -- it could be a landing page, a manual service, or a conversation.
5. **Build only what the test requires** -- Resist adding features that don't directly test the riskiest assumption. They're distractions.

## Common Mistakes

- **Testing what's easy, not what's risky** -- Building the fun parts feels productive but doesn't de-risk the product.
- **Testing multiple assumptions at once** -- If your MVP tests 3 things and fails, you don't know which assumption was wrong.
- **Skipping the assumption audit** -- Many teams never explicitly list their assumptions. They build on invisible foundations.

## Quick Exercise

List your top 3 assumptions. For each, rate your confidence (1-10) and the impact if wrong (1-10). The assumption with the lowest confidence-to-impact ratio is what your MVP should test."

   ;; -- Canvas: Problem-Customer First --
   [:canvas "Problem-Customer First"]
   "## Why This Matters

The Lean Canvas has 9 boxes, but they're not all equal. Problem and Customer Segments are the foundation -- everything else flows from them. If you get these wrong, a brilliant solution, perfect channels, and great metrics won't save you. Start here, validate here.

## Step-by-Step Actions

1. **Write 3 specific problems** -- Not \"communication is hard\" but \"remote teams lose 5 hours/week to miscommunication about task status.\" Be concrete and measurable.
2. **Rank problems by severity** -- Which problem, if solved, would create the most value for users? Lead with that one.
3. **Define your customer segment precisely** -- Not \"businesses\" but \"Series A startups with 10-50 employees and distributed engineering teams.\"
4. **Validate problem-customer fit** -- Does your specific customer segment actually experience your specific problems? Talk to 5 people to confirm.
5. **Fill in Solution AFTER Problem and Customer** -- Resist the urge to start with your solution. Let the problem definition guide the solution design.

## Common Mistakes

- **Solution looking for a problem** -- If you wrote your Solution box first, you're working backwards. Delete it and start with Problem.
- **Too broad a customer segment** -- \"Anyone who uses email\" is not a segment. Narrow until you can name 10 specific people who fit.
- **Problems that are features in disguise** -- \"No dashboard\" is not a problem. \"Can't see team progress without asking 5 people\" is a problem.

## Quick Exercise

Write your #1 problem statement and your customer segment in one sentence each. Show them to someone outside your team. If they immediately understand both, you're on the right track."

   ;; -- Canvas: Unfair Advantage --
   [:canvas "Unfair Advantage"]
   "## Why This Matters

The Unfair Advantage box is intentionally the hardest box on the Lean Canvas. It forces you to think about defensibility -- what do you have that a well-funded competitor can't replicate in 6-12 months? If the answer is \"nothing,\" that's okay for now, but you need a plan to build one.

## Step-by-Step Actions

1. **List what's hard to copy** -- Think beyond features. Consider: proprietary data, network effects, community, brand, expertise, regulatory advantages, or switching costs.
2. **Apply the \"Google test\"** -- If Google (or your industry's gorilla) decided to build this tomorrow, what would they struggle to replicate? That's your unfair advantage.
3. **Check for compounding advantages** -- The best unfair advantages get stronger over time. More users = more data = better product = more users. Does yours compound?
4. **Be honest about what's NOT unfair** -- \"Great team\" and \"first mover\" are not unfair advantages. Competitors can hire great people and move fast too.
5. **Plan to build one** -- If you don't have an unfair advantage yet, identify which type you'll build and how. It's a roadmap item, not a prerequisite.

## Common Mistakes

- **Listing features as advantages** -- \"AI-powered\" or \"beautiful UX\" are reproducible. They're features, not moats.
- **Confusing head start with advantage** -- Being first to market is temporary. The question is: what makes you hard to displace once competitors arrive?
- **Leaving it blank and ignoring it** -- A blank Unfair Advantage box is a signal to take seriously, not to skip.

## Quick Exercise

Complete this sentence: \"Even if a competitor had $10M and 12 months, they still couldn't replicate our _____.\" If you can't fill it in, brainstorm what you could build toward."

   ;; -- Canvas: Pick 1-3 Metrics --
   [:canvas "Pick 1-3 Metrics"]
   "## Why This Matters

Metrics tell you whether your business is working. But too many metrics create noise, and wrong metrics create false confidence. The Lean Canvas asks for Key Metrics -- the 1-3 numbers that, if healthy, mean your business is on track. Everything else is secondary.

## Step-by-Step Actions

1. **Start with the pirate metrics (AARRR)** -- Acquisition, Activation, Retention, Revenue, Referral. Which stage is your biggest uncertainty?
2. **Pick one metric per stage** -- At early stage, focus on Activation (do users experience the core value?) and Retention (do they come back?).
3. **Make each metric specific** -- Not \"engagement\" but \"% of users who complete 3+ sessions in their first week.\" Specific metrics are actionable.
4. **Set a cadence** -- How often will you check each metric? Daily? Weekly? Monthly? Too frequent = noise. Too rare = slow learning.
5. **Kill vanity metrics** -- Page views, total signups, and social media followers feel good but don't measure product-market fit.

## Common Mistakes

- **Too many metrics** -- 10 KPIs means no KPIs. If everything is important, nothing is important.
- **Vanity over actionable** -- \"10,000 signups\" sounds great until you see 2% are active. Measure what matters.
- **Ignoring leading indicators** -- Revenue is a lagging indicator. Activation rate and retention predict future revenue.

## Quick Exercise

Write down your ONE most important metric right now. It should answer: \"Is our product delivering value to users?\" If you need more than one sentence to explain it, simplify."

   ;; -- Canvas: Canvas as Conversation --
   [:canvas "Canvas as Conversation"]
   "## Why This Matters

A Lean Canvas is not a one-time deliverable -- it's a living conversation between your team and reality. The best teams revisit their canvas regularly, updating it as they learn from users, experiments, and market changes. A static canvas is a dead canvas.

## Step-by-Step Actions

1. **Schedule a bi-weekly canvas review** -- Every 2 weeks, pull up your canvas and ask: \"What have we learned since last time? What needs to change?\"
2. **Track changes over time** -- Keep versioned copies. Looking back at how your canvas evolved reveals your learning trajectory.
3. **Use it in meetings** -- When debating priorities, point to the canvas. \"Which box does this feature strengthen?\" If no box, it's probably not a priority.
4. **Share it widely** -- The canvas should be visible to everyone on the team. It aligns decision-making without lengthy strategy documents.
5. **Kill your darlings** -- When evidence contradicts a box on your canvas, change the canvas. Don't defend assumptions against data.

## Common Mistakes

- **Treating it as a homework assignment** -- Filling it in once to check a box means you miss the iterative value.
- **Only the founder updates it** -- If only one person touches the canvas, it's not a team tool. Make updates a collaborative exercise.
- **Ignoring contradictions** -- When your Revenue model contradicts your Customer Segments, that's not a formatting issue -- it's a strategy issue.

## Quick Exercise

Open your current Lean Canvas. Find one box that you're least confident about. What's one thing you could do this week to increase your confidence in that box?"})
