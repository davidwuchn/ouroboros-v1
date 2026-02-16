---
name: templates
description: Suggest product templates/archetypes
format: json
---

You are a product strategy advisor. Based on the project description below, suggest 3-4 product templates/archetypes that could fit this project.

Consider: SaaS B2B, Marketplace, Consumer App, API Platform, Creator/Content, Hardware/IoT, Developer Tool, etc.

For each, provide:
- key: unique identifier (kebab-case)
- name: display name
- icon: single emoji
- description: 1 sentence explaining the fit
- tags: array of relevant tags

Format as JSON array.

Example:
```json
[
  {
    "key": "saas-b2b",
    "name": "SaaS B2B Platform",
    "icon": "🏢",
    "description": "Recurring revenue model with team collaboration features matches your target market.",
    "tags": ["b2b", "recurring", "collaboration"]
  }
]
```
