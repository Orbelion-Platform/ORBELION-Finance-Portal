# Safe screenshot checklist

Only add screenshots captured from a synthetic dataset.

Before committing an image, verify that it contains none of the following:

- real financial values or transaction descriptions;
- real client, company, counterparty, or account names;
- personal email addresses or profile photos;
- internal IDs, tenant IDs, client IDs, database IDs, or project IDs;
- private domains, browser URLs, infrastructure names, or access tokens.

Use `example_client`, `finance.user@example.com`, generic account names, and clearly fictional values. Crop browser chrome when it could reveal a private URL.

Suggested filenames:

- `dashboard-overview-synthetic.png`
- `transactions-synthetic.png`
- `budgets-synthetic.png`
- `obligations-synthetic.png`
