# BundleBoB launch decisions

The site is product-centered and pre-pilot. Do not invent customers, client outcomes, individual identities, contact details, or implemented security controls to make it look complete.

- Confirm the business email or booking destination. Until configured, the Contact page prepares a downloadable inquiry and says nothing was sent.
- Confirm the current status of the data processing agreement, U.S. residency documentation, and entity formation. The current copy says they are in preparation or in progress; client work begins after completion.
- Review ownership language: customers own their data, mappings, configurations, and reports. BundleBoB owns and maintains the platform, integrations, and reconciliation engine. Continued operation relies on the ongoing service.
- Review the integration scoping examples against actual access capabilities. They are not presented as existing production connectors.
- Before financial data is accepted, inspect the separate data-processing workflow: authorization, least privilege, storage, encryption, retention, deletion, logs, report delivery, incident response, and backups.
- Confirm hosting plan suitability for commercial use, DNS, deployment ownership, and recovery access.
- Run the browser verification and Lighthouse against the actual deployed output. Confirm redirects and security headers there as well as locally.

The static site contains no customer-data backend. This checklist is internal documentation and is not included in the deployment output.
