(()=>{var t={333:t=>{t.exports={Project:class{constructor(t,e,s,o){this.title=t,this.description=e,this.dueDate=s,this.tasks=o}}}},997:t=>{t.exports={Task:class{constructor(t,e,s,o,r,a,i=!1){this.title=t,this.description=e,this.dueDate=s,this.priority=o,this.notes=r,this.checklist=a,this.complete=i}toggleComplete(){this.complete=!this.complete}}}}},e={};function s(o){var r=e[o];if(void 0!==r)return r.exports;var a=e[o]={exports:{}};return t[o](a,a.exports,s),a.exports}s.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return s.d(e,{a:e}),e},s.d=(t,e)=>{for(var o in e)s.o(e,o)&&!s.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:e[o]})},s.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),(()=>{"use strict";var t=s(997),e=s(333);let o=[],r=[],a=document.querySelector("#projects"),i=(document.querySelector("#tasks"),new e.Project("Todo List","A dynamic project management application.","May 10, 2021",[])),n=new t.Task("Project setup","Webpack setup and create Project and Task classes","May 6, 2021","High","Use webpack",[]);o.push(i),i.tasks.push(n),n.toggleComplete(),console.log(o),o.forEach((t=>{let e=`\n    <div className="project-card">\n      <h3>Project #1: ${t.title}</h3>\n      <p>${t.description}</p>\n      <strong>Task List</strong>\n      <ul>\n        ${t.tasks.map((t=>`<li><strong>${t.title}</strong> (<small>${t.dueDate}</small>)</li>`))}\n      </ul>\n    </div>\n  `;a.innerHTML+=e})),o.map((t=>{t.tasks.map((t=>{r.push(t.title)}))})),console.log(r)})()})();