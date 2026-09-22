export const content = {
  brand: 'BundleBoB',
  description: 'A current picture of job profitability. Connect your existing systems, reconcile the differences, and understand work in progress before month-end.',
  home: {
    eyebrow: 'A clearer picture of work in progress',
    title: 'Because every job\nshould add up.',
    intro: 'Connect your existing systems. See what each job is making while there’s still time to act.',
    outcomes: [
      ['01', 'Know where you stand.', 'Understand costs, commitments, and margin before the job is over.'],
      ['02', 'Catch the difference.', 'See which records disagree, and why.'],
      ['03', 'Make the next call.', 'Give finance and operations a shared starting point.'],
    ],
    capabilities: [
      ['Job profitability', 'A margin you can explain.', 'Revenue, costs, and commitments together.', 'margin'],
      ['Work in progress', 'Know what is still moving.', 'Completed work. Unbilled work. Remaining costs.', 'wip'],
      ['Reconciliation', 'Differences have a place.', 'The source, the rule, the next step.', 'reconcile'],
      ['Operational reporting', 'Less assembling. More acting.', 'Current figures. A repeatable review.', 'report'],
    ],
    steps: [
      ['Connect', 'Keep the tools your team knows.', 'Map accounting and operations to the same job. Start read-only.'],
      ['Reconcile', 'Make disagreement visible.', 'Compare nightly. Keep both values when systems disagree.'],
      ['Understand', 'Move from a number to a decision.', 'Review the picture and its sources with dedicated support.'],
    ],
  },
  industries: [
    {id:'workshops', name:'Auto & equipment shops', short:'From the bay to the books.', text:'Parts, labor, and open repair orders belong in the same picture. See which jobs are earning their keep before the invoices go out.', labels:['Repair orders','Parts & labor','Unbilled work'], example:'A parts order reaches accounting before the repair order reflects it. The job looks more profitable than it is.', icon:'workshop'},
    {id:'fabrication', name:'Fabrication & manufacturing', short:'See beyond the production floor.', text:'Bring material purchases, production hours, and job revenue together. Understand the cost of a custom order as the work progresses.', labels:['Custom orders','Material costs','Production hours'], example:'A revised specification adds material cost. Production has the change; the original estimate still drives the margin report.', icon:'fabrication'},
    {id:'field-service', name:'Field service & installation', short:'A clearer view after every visit.', text:'Connect work orders, technician time, and billing. Find completed work that has not become an invoice, and costs that have not reached the job.', labels:['Work orders','Technician time','Billing'], example:'A service visit is marked complete, but the labor entry and invoice have not caught up. The report shows exactly what is missing.', icon:'service'},
    {id:'contractors', name:'Contractors & specialty trades', short:'Current costs. Better conversations.', text:'Reconcile project activity with accounting. See approved changes, committed costs, and work in progress without rebuilding the picture in a spreadsheet.', labels:['Project costs','Approved changes','Work in progress'], example:'An approved change appears in operations before it is posted in accounting. Both values stay visible until the timing difference is resolved.', icon:'contractor'},
  ],
  comparison: [
    ['When the picture updates','When someone rebuilds it','When a record moves','Nightly reconciliation'],
    ['When systems disagree','Someone investigates','Depends on the sync rules','Both values, source, and rule'],
    ['When your process changes','Update the spreadsheet','Update the connector','Ongoing mapping and review'],
  ],
  ownership: {
    yours:['Your business data','Your cost and job mappings','Your configurations','Your reports'],
    ours:['The BundleBoB platform','The integrations','The reconciliation engine','Ongoing maintenance and upgrades'],
    explanation:'Your business information remains yours. BundleBoB owns and maintains the technology that keeps it connected. Continued service keeps the platform operating and the mappings accurate as your systems and processes change.',
  },
  compliance: {
    intro:'Client work begins after entity formation and completion of the data-handling agreement and hosting documentation.',
    items:[['Data processing agreement','In preparation','A standard agreement will define the processing purpose, responsibilities, subprocessors, and deletion requirements.'],['U.S. data residency','Documentation in progress','The hosting and data-flow documentation will identify where source records, reports, backups, and support data are processed.'],['Legal entity','Formation in progress','The contracting entity will be established before client work begins.']],
  },
  resources: [
    {id:'when-systems-disagree',category:'Field guide',title:'When two systems tell two different stories.',description:'A practical way to distinguish a missing record, a timing difference, and a mapping problem.',time:'5 minute read'},
    {id:'wip-review',category:'Checklist',title:'A better work-in-progress conversation.',description:'Five questions to take into a job review before debating the margin.',time:'3 minute read'},
    {id:'mapping-first',category:'Explainer',title:'Agree on the job before comparing the numbers.',description:'Why a shared job identifier and a written mapping come before the first useful report.',time:'4 minute read'},
  ],
  contact: {
    title:'Start with the gap.',
    intro:'Tell us where your numbers stop agreeing. A useful first conversation starts with the systems you run and the question you cannot answer.',
    privacy:'Share business contact details and a description of the problem only. Keep customer records, financial exports, passwords, and access tokens out of this inquiry.',
  },
};
