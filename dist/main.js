(()=>{var t={333:t=>{t.exports={Project:class{constructor(t,e,n,o){this.title=t,this.description=e,this.dueDate=n,this.tasks=o}addTask(t){this.tasks.push(t)}removeTask(t){this.tasks.splice(t,1)}}}},997:t=>{t.exports={Task:class{constructor(t,e,n,o,r,c,a=!1){this.title=t,this.description=e,this.dueDate=n,this.priority=o,this.notes=r,this.checklist=c,this.complete=a}toggleComplete(){this.complete=!this.complete}}}}},e={};function n(o){var r=e[o];if(void 0!==r)return r.exports;var c=e[o]={exports:{}};return t[o](c,c.exports,n),c.exports}n.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return n.d(e,{a:e}),e},n.d=(t,e)=>{for(var o in e)n.o(e,o)&&!n.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:e[o]})},n.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),(()=>{"use strict";var t=n(997),e=n(333);let o=[];if(localStorage.getItem("projects")){let n=JSON.parse(localStorage.getItem("projects"));console.log(o),n.forEach((n=>{let r=[];n.tasks.forEach((e=>{let n=new t.Task(e.title,e.description,e.dueDate,e.priority,e.notes,e.checklist,e.complete);r.push(n)}));let c=new e.Project(n.title,n.description,n.dueDate,r);o.push(c)}))}let r=[],c=document.querySelector("#projects"),a=(document.querySelector("#tasks"),document.querySelector("#project-input-form button")),u=document.querySelector("#task-input-form button");function i(){localStorage.setItem("projects",JSON.stringify(o)),c.innerHTML="",o.length>0&&o.forEach(((t,e)=>{let n=`\n    <div class="project-card">\n      <h3>${t.title}<button class="btn btn-add-project-task" data-project-id="${e}"><i class="fa fa-plus"></i></button><button class="btn btn-delete-project" data-project-id="${e}"><i class="fa fa-trash"></i></button></h3>\n      <ul>`;t.tasks.length>0?n+=`${t.tasks.map(((t,n)=>`<li><div><button class="btn-complete"  data-project="${e}" data-id="${n}">O</button>${t.complete?"<del>":""}${t.title}${t.complete?"</del>":""}<small>(${t.dueDate})</small></div><div class="card-buttons"><button class="btn btn-delete" data-project="${e}" data-id="${n}"><i class="fa fa-trash"></i></button> <button class="btn btn-edit" data-project="${e}" data-id="${n}"><i class="fa fa-edit"></i></button></div></li>`)).join("")}`:n+="<li><strong>No tasks to display.</strong></li>",n+="</ul>\n    </div>\n    ",c.innerHTML+=n})),d(),function(){let t=[...document.querySelectorAll(".btn-delete")],e=[...document.querySelectorAll(".btn-edit")];[...document.querySelectorAll(".btn-complete")].forEach((t=>{t.addEventListener("click",(function(t){t.preventDefault();let e=t.target.getAttribute("data-project"),n=t.target.getAttribute("data-id");o[e].tasks[n].toggleComplete(),l(),i()}))})),t.forEach(((t,e)=>{t.addEventListener("click",(function(t){let e=t.target.getAttribute("data-project"),n=t.target.getAttribute("data-id");o[e].removeTask(n),l(),i()}))})),e.forEach(((t,e)=>{t.addEventListener("click",(function(t){t.preventDefault();let e=document.querySelector(".btn-add-task"),n=document.createElement("button");n.classList+="btn btn-edit-task",n.innerText="Edit Task",document.querySelector("#task-input-form").replaceChild(n,e);let r=t.target.getAttribute("data-project"),c=t.target.getAttribute("data-id");document.querySelector("#task-input-form input[name=title]").value=o[r].tasks[c].title.toString(),document.querySelector("#task-input-form select[name=projectId]").selectedIndex=r,document.querySelector("#task-input-form input[name=description]").value=o[r].tasks[c].description.toString(),document.querySelector("#task-input-form input[name=dueDate]").value=o[r].tasks[c].dueDate.toString(),document.querySelector("#task-input-form input[name=checklist]").value=o[r].tasks[c].checklist.toString(),document.querySelector("#task-input-form input[name=notes]").value=o[r].tasks[c].notes.toString(),document.querySelector("#task-input-form input[name=priority]").value=o[r].tasks[c].priority.toString(),m(),n.addEventListener("click",(function(t){t.preventDefault(),o[r].tasks[c].title=document.querySelector("#task-input-form input[name=title]").value,o[r].tasks[c].description=document.querySelector("#task-input-form input[name=description]").value,o[r].tasks[c].dueDate=document.querySelector("#task-input-form input[name=dueDate]").value,o[r].tasks[c].checklist=document.querySelector("#task-input-form input[name=checklist]").value,o[r].tasks[c].notes=document.querySelector("#task-input-form input[name=notes]").value,o[r].tasks[c].priority=document.querySelector("#task-input-form input[name=priority]").value,document.querySelector("#task-input-form").replaceChild(e,n),i()}))}))}))}(),p()}function l(){r=[],o.map((t=>{t.tasks.map((t=>{r.push(t.title)}))})),console.log("All tasks as combined array: "+r)}function s(t){let e=document.querySelector("select[name=projectId]");e.innerHTML="",t.length>0&&t.forEach(((t,n)=>{let o=document.createElement("option");o.setAttribute("data-id",n),o.value=n,o.innerText=t.title,e.appendChild(o),n++}))}function d(){[...document.querySelectorAll(".btn-delete-project")].forEach(((t,e)=>{t.addEventListener("click",(function(t){let e=t.target.getAttribute("data-project-id");o.splice(e,1),l(),i(),s(o)}))})),[...document.querySelectorAll(".btn-add-project-task")].forEach((t=>{t.addEventListener("click",(t=>{console.log("test, project index #"+t.target.getAttribute("data-project-id")),p(),m();let e=t.target.getAttribute("data-project-id");document.querySelector("#task-input-form select").selectedIndex=e}))}))}function p(){let t=[...document.querySelectorAll("input")],e=[...document.querySelectorAll("select")];t.forEach((t=>{t.value=""})),e.forEach((t=>{t.selectedIndex=0})),function(){let t=document.querySelector(".btn-edit-task"),e=document.createElement("button");e.classList+="btn btn-add-task",e.innerText="Add Task",t&&document.querySelector("#task-input-form").replaceChild(e,t)}()}function m(){document.querySelector("#task-input-form").style.display="block",document.querySelector("#task-input-form").setAttribute("style","position: absolute; top: 120px; left: 0; width: 320px;  "),k()}function k(){document.querySelectorAll(".btn-exit").forEach((t=>{t.addEventListener("click",(t=>{f()}))})),document.addEventListener("keydown",(t=>{"Escape"===t.key&&f()}))}function f(){p(),document.querySelector("#project-input-form").style.display="none",document.querySelector("#task-input-form").style.display="none";let t=document.querySelector(".btn-add-task"),e=document.createElement("button");e.classList+="btn btn-edit-task",e.innerText="Edit Task",document.querySelector("#task-input-form").replaceChild(t,e)}a.addEventListener("click",(function(t){t.preventDefault();let n=document.querySelector("#project-input-form input[name=title]").value,r=document.querySelector("#project-input-form input[name=description]").value,c=document.querySelector("#project-input-form input[name=dueDate]").value,a=(document.querySelector("#project-input-form input[name=tasks]").value,new e.Project(n,r,c,[]));o.push(a),d(),i(),document.querySelector("#project-input-form").style.display="none",s(o)})),u.addEventListener("click",(function(e){e.preventDefault(),document.querySelector("#task-input-form").style.display="none",function(){let e=document.querySelector("#task-input-form input[name=title]").value,n=document.querySelector("#task-input-form select[name=projectId]").value,r=document.querySelector("#task-input-form input[name=description]").value,c=document.querySelector("#task-input-form input[name=dueDate]").value,a=(document.querySelector("#task-input-form input[name=checklist]").value,document.querySelector("#task-input-form input[name=notes]").value),u=document.querySelector("#task-input-form input[name=priority]").value,s=new t.Task(e,r,c,u,a,[],!1);o[n].addTask(s),l(),i()}()})),document.querySelector("#task-input-form").style.display="none",document.querySelector("#project-input-form").style.display="none",document.querySelector(".add-tasks").addEventListener("click",m),document.querySelector(".add-projects").addEventListener("click",(function(){document.querySelector("#project-input-form").style.display="block",document.querySelector("#project-input-form").setAttribute("style","position: absolute; top: 120px; left: 0; width: 320px;  "),k()})),i(),s(o)})()})();