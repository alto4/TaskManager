(()=>{var t={333:t=>{t.exports={Project:class{constructor(t,e,n,o){this.title=t,this.description=e,this.dueDate=n,this.tasks=o}addTask(t){this.tasks.push(t)}removeTask(t){this.tasks.splice(t,1)}}}},997:t=>{t.exports={Task:class{constructor(t,e,n,o,r,a,c=!1){this.title=t,this.description=e,this.dueDate=n,this.priority=o,this.notes=r,this.checklist=a,this.complete=c}toggleComplete(){this.complete=!this.complete}}}}},e={};function n(o){var r=e[o];if(void 0!==r)return r.exports;var a=e[o]={exports:{}};return t[o](a,a.exports,n),a.exports}n.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return n.d(e,{a:e}),e},n.d=(t,e)=>{for(var o in e)n.o(e,o)&&!n.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:e[o]})},n.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),(()=>{"use strict";var t=n(997),e=n(333);let o=[],r=[],a=document.querySelector("#projects"),c=(document.querySelector("#tasks"),document.querySelector("#project-input-form button")),u=document.querySelector("#task-input-form button"),i=new e.Project("Todo List","A dynamic project management application.","May 10, 2021",[],!1),s=new t.Task("Project setup","Webpack setup and create Project and Task classes","May 6, 2021","High","Use webpack",[]),l=new t.Task("Project 2","Webpack setup and create Project and Task classes","May 6, 2021","High","Use webpack",[],!0),d=new t.Task("Project 3","Webpack setup and create Project and Task classes","May 6, 2021","High","Use webpack",[],!0);function p(){a.innerHTML="",o.forEach(((t,e)=>{let n=`\n    <div class="project-card">\n      <h3>${t.title}<button class="btn btn-delete-project" data-project-id="${e}"><i class="fa fa-trash"></i></button></h3>\n      <ul>`;t.tasks.length>0?n+=`${t.tasks.map(((t,n)=>`<li><div><button class="btn-complete"  data-project="${e}" data-id="${n}">O</button>${t.complete?"<del>":""}${t.title}${t.complete?"</del>":""}(<small>${t.dueDate}</small>)</div><div class="card-buttons"><button class="btn btn-delete" data-project="${e}" data-id="${n}"><i class="fa fa-trash"></i></button> <button class="btn btn-edit" data-project="${e}" data-id="${n}"><i class="fa fa-edit"></i></button></div></li>`)).join("")}`:n+="<li><strong>No tasks to display.</strong></li>",n+="</ul>\n    </div>\n    ",a.innerHTML+=n})),f(),function(){let t=[...document.querySelectorAll(".btn-delete")],e=[...document.querySelectorAll(".btn-edit")];[...document.querySelectorAll(".btn-complete")].forEach((t=>{t.addEventListener("click",(function(t){t.preventDefault();let e=t.target.getAttribute("data-project"),n=t.target.getAttribute("data-id");o[e].tasks[n].toggleComplete(),m(),p()}))})),t.forEach(((t,e)=>{t.addEventListener("click",(function(t){let e=t.target.getAttribute("data-project"),n=t.target.getAttribute("data-id");o[e].removeTask(n),m(),p()}))})),e.forEach(((t,e)=>{t.addEventListener("click",(function(t){t.preventDefault();let e=document.querySelector(".btn-add-task");e.innerText="Edit Task";let n=t.target.getAttribute("data-project"),r=t.target.getAttribute("data-id");document.querySelector("#task-input-form input[name=title]").value=o[n].tasks[r].title.toString(),document.querySelector("#task-input-form select[name=projectId]").selectedIndex=n,document.querySelector("#task-input-form input[name=description]").value=o[n].tasks[r].description.toString(),document.querySelector("#task-input-form input[name=dueDate]").value=o[n].tasks[r].dueDate.toString(),document.querySelector("#task-input-form input[name=checklist]").value=o[n].tasks[r].checklist.toString(),document.querySelector("#task-input-form input[name=notes]").value=o[n].tasks[r].notes.toString(),document.querySelector("#task-input-form input[name=priority]").value=o[n].tasks[r].priority.toString(),e.addEventListener("click",(function t(a){a.preventDefault(),o[n].tasks[r].title=document.querySelector("#task-input-form input[name=title]").value,o[n].tasks[r].title=document.querySelector("#task-input-form input[name=title]").value,e.removeEventListener("click",t),e.innerText="Add Task",p()}))}))}))}(),function(){let t=[...document.querySelectorAll("input")],e=[...document.querySelectorAll("select")];t.forEach((t=>{t.value=""})),e.forEach((t=>{t.selectedIndex=0}))}()}function m(){r=[],o.map((t=>{t.tasks.map((t=>{r.push(t.title)}))})),console.log("All tasks as combined array: "+r)}function k(t){let e=document.querySelector("select[name=projectId]");e.innerHTML="",t.forEach(((t,n)=>{let o=document.createElement("option");o.setAttribute("data-id",n),o.value=n,o.innerText=t.title,e.appendChild(o),n++}))}function f(){[...document.querySelectorAll(".btn-delete-project")].forEach(((t,e)=>{t.addEventListener("click",(function(t){let e=t.target.getAttribute("data-project-id");o.splice(e,1),m(),p(),k(o)}))}))}o.push(i),i.addTask(s),i.addTask(l),l.toggleComplete(),l.toggleComplete(),i.addTask(d),c.addEventListener("click",(function(t){t.preventDefault();let n=document.querySelector("#project-input-form input[name=title]").value,r=document.querySelector("#project-input-form input[name=description]").value,a=document.querySelector("#project-input-form input[name=dueDate]").value,c=(document.querySelector("#project-input-form input[name=tasks]").value,new e.Project(n,r,a,[]));o.push(c),f(),p(),document.querySelector("#project-input-form").style.display="none",k(o)})),u.addEventListener("click",(function(e){e.preventDefault(),document.querySelector("#task-input-form").style.display="none",function(){let e=document.querySelector("#task-input-form input[name=title]").value,n=document.querySelector("#task-input-form select[name=projectId]").value,r=document.querySelector("#task-input-form input[name=description]").value,a=document.querySelector("#task-input-form input[name=dueDate]").value,c=(document.querySelector("#task-input-form input[name=checklist]").value,document.querySelector("#task-input-form input[name=notes]").value),u=document.querySelector("#task-input-form input[name=priority]").value,i=new t.Task(e,r,a,u,c,[],!1);o[n].addTask(i),m(),p()}()})),document.querySelector("#task-input-form").style.display="none",document.querySelector("#project-input-form").style.display="none",document.querySelector(".add-tasks").addEventListener("click",(()=>{document.querySelector("#task-input-form").style.display="block",document.querySelector("#task-input-form").setAttribute("style","position: absolute; top: 120px; left: 100px; width: 350px;  ")})),document.querySelector(".add-projects").addEventListener("click",(()=>{document.querySelector("#project-input-form").style.display="block",document.querySelector("#project-input-form").setAttribute("style","position: absolute; top: 120px; left: 100px; width: 350px;  ")})),p(),k(o)})()})();