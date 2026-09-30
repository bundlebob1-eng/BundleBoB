import {icon} from './art.mjs';

const stages=[
 {label:'Capture',title:'Enter the details once.',copy:'The invoice and its details arrive together, with the original document attached.',icon:'document'},
 {label:'Review',title:'Keep a person in control.',copy:'A named reviewer checks the details and resolves anything that needs attention.',icon:'check'},
 {label:'Connect',title:'Give the next person a clear start.',copy:'The approved record moves to the next system, with a status your team can see.',icon:'arrow'}
];

export function workStory(){return `<section class="workflow-overview" id="work-in-motion" aria-labelledby="workflow-title"><div class="wrap" id="problem">
 <div class="workflow-heading"><div><p class="ref-eyebrow">A better working day</p><h2 id="workflow-title">Less chasing.<br>More getting things done.</h2></div><p>We work alongside your people to understand the process, then build the tools that make each handoff easier.</p></div>
 <p class="workflow-example">One example: a supplier invoice</p>
 <ol class="workflow-sequence">${stages.map((s,i)=>`<li class="workflow-step"><div class="workflow-step-label"><span>0${i+1} / ${s.label}</span>${icon(s.icon,24)}</div><h3>${s.title}</h3><p>${s.copy}</p></li>`).join('')}</ol>
 <a class="workflow-link" href="/approach">How we work with you ${icon('arrow',20)}</a>
 </div></section>`;}
