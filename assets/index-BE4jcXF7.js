(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function r(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function n(e){if(e.ep)return;e.ep=!0;const t=r(e);fetch(e.href,t)}})();function p(o,s,r){const n=o.infavor+o.opposed+o.abstained,e=n+o.void;let t=!1,a="",i="";switch(e>r?i=`Too many votes counted (${e}) compared to total voters (${r})`:e<r&&(i=`Missing votes: ${r-e} votes not counted`),s){case"majority":const l=Math.floor(n/2)+1;t=o.infavor>=l,a=`Needs ${l} votes to pass`;break;case"plurality":t=o.infavor>o.opposed,a="Needs more votes in favor than opposed";break;case"unanimous":t=o.infavor===n&&n>0,a="Needs all valid votes in favor";break}return{passed:t,message:a,error:i}}function d(){const o=parseInt(document.getElementById("totalVoters").value)||0,s={infavor:parseInt(document.getElementById("infavor").value)||0,opposed:parseInt(document.getElementById("opposed").value)||0,abstained:parseInt(document.getElementById("abstained").value)||0,void:parseInt(document.getElementById("void").value)||0},r=document.querySelector(".vote-type button.active").dataset.type,{passed:n,message:e,error:t}=p(s,r,o);document.getElementById("result").innerHTML=`
    <div class="vote-summary">
      <div class="vote-counts">
        <p>Total voters<strong>${o}</strong></p>
        <p>Directors in favor<strong>${s.infavor}</strong></p>
        <p>Directors opposed<strong>${s.opposed}</strong></p>
        <p>Directors abstaining<strong>${s.abstained}</strong></p>
        <p>Void votes<strong>${s.void}</strong></p>
        ${t?`<p class="error">${t}</p>`:""}
      </div>
      ${t?"":`
        <div class="vote-result ${n?"passed":"failed"}">
          <h3>The motion was ${n?"APPROVED":"NOT APPROVED"}</h3>
          <p>${e}</p>
        </div>
      `}
    </div>
  `}document.querySelector("#app").innerHTML=`
  <div class="container">
    <h1>Board Vote Calculator</h1>
    <div class="calculator">
      <div class="vote-type">
        <button class="active" data-type="majority">Majority Vote</button>
        <button data-type="plurality">Plurality Vote</button>
        <button data-type="unanimous">Unanimous</button>
      </div>
      
      <div class="vote-inputs">
        <div class="input-group">
          <label for="totalVoters">Total Number of Voters:</label>
          <input type="number" id="totalVoters" min="0" value="0">
        </div>

        <div class="input-group">
          <label for="infavor">Votes in Favor:</label>
          <input type="number" id="infavor" min="0" value="0">
        </div>
        
        <div class="input-group">
          <label for="opposed">Votes Opposed:</label>
          <input type="number" id="opposed" min="0" value="0">
        </div>
        
        <div class="input-group">
          <label for="abstained">Votes Abstained:</label>
          <input type="number" id="abstained" min="0" value="0">
        </div>
        
        <div class="input-group">
          <label for="void">Void Votes:</label>
          <input type="number" id="void" min="0" value="0">
        </div>
      </div>

      <div id="result">
        <div class="vote-summary">
          <div class="vote-counts">
            <p>Total voters<strong>0</strong></p>
            <p>Directors in favor<strong>0</strong></p>
            <p>Directors opposed<strong>0</strong></p>
            <p>Directors abstaining<strong>0</strong></p>
            <p>Void votes<strong>0</strong></p>
          </div>
          <div class="vote-result failed">
            <h3>The motion was NOT APPROVED</h3>
            <p>Needs 1 vote to pass</p>
          </div>
        </div>
      </div>
    </div>
  </div>
`;document.querySelectorAll(".vote-type button").forEach(o=>{o.addEventListener("click",s=>{document.querySelector(".vote-type button.active").classList.remove("active"),s.target.classList.add("active"),d()})});["totalVoters","infavor","opposed","abstained","void"].forEach(o=>{document.getElementById(o).addEventListener("input",r=>{r.target.value=Math.max(0,parseInt(r.target.value)||0),d()})});d();
