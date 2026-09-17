# Safe screenshot checklist

Only add screenshots captured from a synthetic dataset.

Before committing an image, verify that it contains none of the following:

- real financial values or transaction descriptions;
- real client, company, counterparty, or account names;
- personal email addresses or profile photos;
- internal IDs, tenant IDs, client IDs, database IDs, or project IDs;
- private domains, browser URLs, infrastructure names, or access tokens.

Use `example_client`, `finance.user@example.com`, generic account names, and clearly fictional values. Crop browser chrome when it could reveal a private URL.

Approved public assets:

- `docs/assets/01-dashboard-overview-synthetic.png`
- `docs/assets/02-dashboard-obligations-synthetic.png`
- `docs/assets/03-dashboard-activity-synthetic.png`
- `docs/assets/04-payables-synthetic.png`
- `docs/assets/05-transactions-synthetic.png`
- `docs/assets/06-reports-synthetic.png`
- `docs/assets/07-email-alert-synthetic.png`
