var F=Object.defineProperty;var I=Object.getOwnPropertySymbols;var O=Object.prototype.hasOwnProperty,j=Object.prototype.propertyIsEnumerable;var D=(e,t,s)=>t in e?F(e,t,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[t]=s,T=(e,t)=>{for(var s in t||(t={}))O.call(t,s)&&D(e,s,t[s]);if(I)for(var s of I(t))j.call(t,s)&&D(e,s,t[s]);return e};import{o as l,c as u,a as o,b as _,r as w,d as B,t as p,F as N,e as P,f as U,i as q,U as H,D as K,K as J,n as W,X as z,W as X,g as Y,x as L,h as Z,T as G,A as Q,E as tt,w as h,v as g,j as A,k as et,l as y,m as st,p as ot,q as nt,s as rt}from"./vendor.8adb6f3c.js";const at=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const n of r)if(n.type==="childList")for(const a of n.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function s(r){const n={};return r.integrity&&(n.integrity=r.integrity),r.referrerpolicy&&(n.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?n.credentials="include":r.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(r){if(r.ep)return;r.ep=!0;const n=s(r);fetch(r.href,n)}};at();var m=(e,t)=>{const s=e.__vccOpts||e;for(const[i,r]of t)s[i]=r;return s};const it={name:"AppHeader",components:{},data(){return{}},created(){},methods:{goHome(){console.log("run"),this.$router.push("/")}},computed:{},unmounted(){}},ct={class:"main-header flex"},lt={class:"flex justify-between main-layout-container"},dt=o("span",{class:"clr-teal"},"just",-1),ut=_("Speak "),pt=[dt,ut];function ht(e,t,s,i,r,n){return l(),u("header",ct,[o("div",lt,[o("h1",{onClick:t[0]||(t[0]=(...a)=>n.goHome&&n.goHome(...a)),class:"logo"},pt)])])}var mt=m(it,[["render",ht]]);const kt={created(){this.$store.dispatch({type:"loadTasks"})},components:{appHeader:mt}},ft={id:"app"};function _t(e,t,s,i,r,n){const a=w("app-header"),c=w("router-view");return l(),u("div",ft,[B(a),B(c)])}var gt=m(kt,[["render",_t]]);const vt={name:"TaskPreview",props:["task"],emits:["remove","detail"],components:{},data(){return{}},created(){},methods:{removeTask(){this.$emit("remove",this.task._id)},showDetails(){this.$emit("detail",this.task._id)},editTask(){this.$router.push(`/task/edit/${this.task._id}`)}},computed:{formatPrice(){return(this.task.price+"").slice(0,1)},formatTime(){return new Date(+this.task.createdAt).toLocaleString()}},unmounted(){}},yt={class:"task flex flex-col gap-1 p-3"},bt={class:"task__txt clr-teal uppercase"},wt=o("span",{class:"fw-bold"},"Created At: ",-1),Tt={class:"btn-group actions"};function Et(e,t,s,i,r,n){return l(),u("article",yt,[o("h3",bt,p(s.task.title),1),o("p",null,[wt,_(" "+p(n.formatTime),1)]),o("div",Tt,[o("button",{class:"btn btn-primary",onClick:t[0]||(t[0]=(...a)=>n.showDetails&&n.showDetails(...a))},"details"),o("button",{class:"btn btn-info",onClick:t[1]||(t[1]=(...a)=>n.editTask&&n.editTask(...a))},"edit"),o("button",{class:"btn btn-danger",onClick:t[2]||(t[2]=(...a)=>n.removeTask&&n.removeTask(...a))},"delete")])])}var Rt=m(vt,[["render",Et]]);const xt={name:"TaskList",props:["tasks"],emits:["removed","details"],components:{taskPreview:Rt},data(){return{}},created(){},methods:{removeTask(e){this.$emit("removed",e)},taskDetails(e){this.$emit("details",e)}},computed:{},unmounted(){}},$t={class:"flex task-list items-start gap-2"};function St(e,t,s,i,r,n){const a=w("task-preview");return l(),u("main",$t,[(l(!0),u(N,null,P(s.tasks,c=>(l(),U(a,{key:c._id,task:c,onRemove:n.removeTask,onDetail:n.taskDetails},null,8,["task","onRemove","onDetail"]))),128))])}var Bt=m(xt,[["render",St]]);const E={queryData:Dt,getEntityById:Ut,saveEntity:At,removeEntity:Mt},Lt={apiKey:"AIzaSyANKZXygD24jjRHm-yYau7Ia7vMVTCWjb8",authDomain:"tasks-e7a14.firebaseapp.com",projectId:"tasks-e7a14",storageBucket:"tasks-e7a14.appspot.com",messagingSenderId:"767080706489",appId:"1:767080706489:web:8582553f201eb28a07c668"},Ct=q(Lt),It=H(Ct),b=K(It,"task");async function Dt(e){let t=b;if(e!=null&&e.txt){const s=e.txt.toLowerCase();t=J(b,X("title"),z(s),W(s+"\uF8FF"))}try{const s=await Y(t);return console.log("tasksSnapshot",s),s.docs.map(i=>T({_id:i.id},i.data()))}catch(s){console.error("Error geting documents: ",s)}}async function Ut(e){const t=L(b,e);try{const s=await Z(t);if(s.exists())return T({_id:e},s.data());console.log("No such document!")}catch(s){console.error("Error finding document: ",s)}}async function At(e){if(e._id){const t=JSON.parse(JSON.stringify(e)),s=L(b,e._id);delete t._id;try{return await G(s,t),e}catch(i){console.error("Error updating document: ",i)}}else try{const t=await Q(b,e);return T({_id:t.id},e)}catch(t){console.error("Error saving document: ",t)}}async function Mt(e){try{await tt(L(b,e))}catch(t){console.error("Error deleting document: ",t)}}function Vt(){const e={};return{on(t,s){return e[t]=e[t]?[...e[t],s]:[s],()=>{e[t]=e[t].filter(i=>i!==s)}},emit(t,s){!e[t]||e[t].forEach(i=>i(s))}}}const M=Vt(),v={query:Ft,getById:Ot,save:jt,remove:Nt,getEmptyTask:Pt};async function Ft(e={}){return E.queryData(e)}async function Ot(e){return E.getEntityById(e)}async function jt(e){return E.saveEntity(e)}async function Nt(e){return M.emit("removeTask",{txt:"removed"}),E.removeEntity(e)}function Pt(){return{title:"",description:"",importance:1,createdAt:Date.now()+"",doneAt:null,status:"",audioSrc:""}}const qt={name:"TaskEdit",components:{},data(){return{taskToEdit:null,mediaRecorder:null,chunks:null}},async created(){const e=this.taskId;if(e){const t=await this.$store.dispatch({type:"getTaskById",taskId:e});this.taskToEdit=t}else this.taskToEdit=v.getEmptyTask();this.chunks=[],this.createMedia()},methods:{async save(){await this.$store.dispatch({type:"saveTask",task:this.taskToEdit}),this.$router.push("/")},goBack(){this.$router.push("/")},createMedia(){const e={audio:!0};navigator.mediaDevices.getUserMedia(e).then(this.onSuccess,this.onError)},onSuccess(e){this.mediaRecorder=new MediaRecorder(e),this.mediaRecorder.onstop=t=>{console.log("data available after MediaRecorder.stop() called.");const s=prompt("Enter a name for your sound clip?","My unnamed clip"),i=document.createElement("article"),r=document.createElement("p"),n=document.createElement("audio"),a=document.createElement("button");i.classList.add("clip"),n.controls=!0,a.textContent="Delete",a.className="delete",s===null?r.textContent="My unnamed clip":r.textContent=s,i.appendChild(n),i.appendChild(r),i.appendChild(a),this.$refs.soundClips.appendChild(i);async function c(d){return new Promise((x,$)=>{let f=new FileReader;f.onerror=$,f.onload=S=>x(S.target.result),f.readAsDataURL(d)})}const k=new Blob(this.chunks,{type:"audio/ogg; codecs=opus"});c(k).then(d=>{console.log(d),this.taskToEdit.audioSrc=d}),this.chunks=[];const R=window.URL.createObjectURL(k);n.src=R,console.log("recorder stopped"),a.onclick=function(d){d.target.closest(".clip").remove()}},this.mediaRecorder.ondataavailable=t=>{console.log("this.chunks",this.chunks),this.chunks.push(t.data)}},onRecord(){!this.mediaRecorder||(this.mediaRecorder.start(),console.log(this.mediaRecorder.state),console.log("recorder started"),console.log("document",document))},onStop(){!this.mediaRecorder||(this.mediaRecorder.stop(),console.log(this.mediaRecorder.state),console.log("recorder stopped"))},onError(e){console.log("The following error occured: "+e)}},computed:{formTitle(){return this.taskId?"Edit task":"Add task"},taskId(){return this.$route.params.taskId}},unmounted(){}},Ht={key:0,class:"task-edit"},Kt={class:"form-control"},Jt=o("label",{for:"title",class:"form-label"}," Title ",-1),Wt={class:"form-control"},zt=o("label",{for:"description",class:"form-label"}," Description ",-1),Xt={class:"form-control"},Yt=o("label",{for:"importance",class:"form-label"}," Importance ",-1),Zt={class:"form-control"},Gt=o("label",{for:"status",class:"form-label"}," Status ",-1),Qt=o("option",null,"open",-1),te=o("option",null,"in progress",-1),ee=o("option",null,"done",-1),se=[Qt,te,ee],oe={ref:"soundClips",class:"sound-clips"},ne={class:"btn-group"};function re(e,t,s,i,r,n){return r.taskToEdit?(l(),u("section",Ht,[o("h1",null,p(r.taskToEdit._id?"Edit":"Add")+" Task",1),o("div",null,[o("div",Kt,[Jt,h(o("input",{"onUpdate:modelValue":t[0]||(t[0]=a=>r.taskToEdit.title=a),id:"title",class:"form-input",type:"text"},null,512),[[g,r.taskToEdit.title]])]),o("div",Wt,[zt,h(o("textarea",{"onUpdate:modelValue":t[1]||(t[1]=a=>r.taskToEdit.description=a),class:"form-input",type:"text",id:"description"},null,512),[[g,r.taskToEdit.description]])]),o("div",Xt,[Yt,h(o("input",{max:"3",min:"1","onUpdate:modelValue":t[2]||(t[2]=a=>r.taskToEdit.importance=a),class:"form-input",type:"number",id:"importance"},null,512),[[g,r.taskToEdit.importance]])]),o("div",Zt,[Gt,h(o("select",{id:"status",name:"status","onUpdate:modelValue":t[3]||(t[3]=a=>r.taskToEdit.status=a),class:"form-input"},se,512),[[A,r.taskToEdit.status]])]),o("section",oe,null,512)]),o("div",ne,[o("button",{onClick:t[4]||(t[4]=(...a)=>n.save&&n.save(...a)),class:"btn btn-success"},"save"),o("button",{onClick:t[5]||(t[5]=(...a)=>n.goBack&&n.goBack(...a)),class:"btn btn-danger"},"back"),o("button",{onClick:t[6]||(t[6]=(...a)=>n.onRecord&&n.onRecord(...a)),class:"btn btn-warning"},"Record"),o("button",{onClick:t[7]||(t[7]=et((...a)=>n.onStop&&n.onStop(...a),["stop"])),class:"btn btn-danger"},"Stop")])])):y("",!0)}var ae=m(qt,[["render",re]]);const ie={name:"TaskDetails",components:{},data(){return{task:null,audioURL:null,videoURL:null}},created(){this.loadTask()},mounted(){this.recording=this.$refs.recordingVideo,console.log("this.recording",this.recording)},methods:{async loadTask(){var t;const e=await this.$store.dispatch({type:"getTaskById",taskId:this.taskId});if(this.task=e,(t=this.task)!=null&&t.videoSrc){const s=this.convertDataURIToBinary(this.task.videoSrc);console.log("binary",s);const i=new Blob([s],{type:"video/webm"});this.videoURL=window.URL.createObjectURL(i)}else return},convertDataURIToBinary(e){var t=";base64,",s=e.indexOf(t)+t.length,i=e.substring(s),r=window.atob(i),n=r.length,a=new Uint8Array(new ArrayBuffer(n));for(let c=0;c<n;c++)a[c]=r.charCodeAt(c);return a},goBack(){this.$router.push("/")}},computed:{taskId(){return this.$route.params.taskId}},unmounted(){}},ce={key:0,class:"task-details gap-2"},le=o("h1",null,"Todo Details",-1),de={class:"inner-txt flex-col"},ue=o("span",{class:"fw-bold clr-teal uppercase"},"id: ",-1),pe=o("span",{class:"fw-bold clr-teal uppercase"},"title: ",-1),he=o("span",{class:"fw-bold clr-teal uppercase"},"Description: ",-1),me=o("span",{class:"fw-bold clr-teal uppercase"},"importance: ",-1),ke=o("span",{class:"fw-bold clr-teal uppercase"},"Status: ",-1),fe=["src"],_e=["src"];function ge(e,t,s,i,r,n){return r.task?(l(),u("section",ce,[le,o("div",de,[o("p",null,[ue,_(" "+p(r.task._id),1)]),o("p",null,[pe,_(" "+p(r.task.title),1)]),o("p",null,[he,_(" "+p(r.task.description),1)]),o("p",null,[me,_(" "+p(r.task.importance),1)]),o("p",null,[ke,_(" "+p(r.task.status),1)]),r.audioURL?(l(),u("audio",{key:0,controls:"",src:r.audioURL},null,8,fe)):y("",!0),r.videoURL?(l(),u("video",{key:1,ref:"recordingVideo",id:"recording",width:"160",height:"120",controls:"",src:r.videoURL},null,8,_e)):y("",!0)]),o("button",{onClick:t[0]||(t[0]=(...a)=>n.goBack&&n.goBack(...a)),class:"btn btn-warning"},"go back")])):y("",!0)}var V=m(ie,[["render",ge]]);function ve(e=5){var t="",s="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";for(let i=0;i<e;i++)t+=s.charAt(Math.floor(Math.random()*s.length));return t}function ye(e,t=300){let s;return(...i)=>{clearTimeout(s),s=setTimeout(()=>{e.apply(this,i)},t)}}function be(e,t){return e=Math.ceil(e),t=Math.floor(t),Math.floor(Math.random()*(t-e+1))+e}const we={makeId:ve,getRandomInt:be,debounce:ye},Te={name:"task-filter",emits:["filtered"],data(){return{filterBy:{txt:""},unSubscribe:null}},created(){var e;this.filterBy.txt=((e=this.$store.getters.filterBy)==null?void 0:e.txt)||"",this.setFilter=we.debounce(this.setFilter,400),console.log("runing created"),this.unSubscribe=M.on("removeTask",t=>{console.log("data",t),console.log("data.txt",t.txt)})},mounted(){this.$refs.searchInput.focus()},methods:{setFilter(){this.$emit("filtered",JSON.parse(JSON.stringify(this.filterBy)))}},unmounted(){this.unSubscribe()}},Ee={class:"filter-container flex align-center"},Re={class:"search task-filter flex align-center g-1"};function xe(e,t,s,i,r,n){return l(),u("section",Ee,[o("div",Re,[h(o("input",{type:"text",class:"input-search",ref:"searchInput","onUpdate:modelValue":t[0]||(t[0]=a=>r.filterBy.txt=a),placeholder:"Search ",onInput:t[1]||(t[1]=(...a)=>n.setFilter&&n.setFilter(...a))},null,544),[[g,r.filterBy.txt]])])])}var $e=m(Te,[["render",xe]]),Se="/firebase-vue/assets/whale.2fb17326.gif";const Be={name:"TaskApp",components:{taskList:Bt,taskEdit:ae,taskFilter:$e,taskDetails:V},data(){return{}},methods:{removeTask(e){this.$store.dispatch({type:"removeTask",id:e})},addTask(){this.$router.push("/task/edit")},showDetails(e){this.$router.push(`/task/${e}`)},setFilter(e){this.$store.dispatch({type:"filter",filterBy:e})}},computed:{tasks(){return this.$store.getters.tasks},isLoading(){return this.$store.getters.isLoading}},unmounted(){}},Le={key:0,class:"main-layout-container flex-col"},Ce={class:"flex action-container space-between"},Ie={key:1,class:"loading"},De=o("img",{src:Se,alt:""},null,-1),Ue=[De];function Ae(e,t,s,i,r,n){const a=w("task-filter"),c=w("task-list");return n.isLoading?(l(),u("div",Ie,Ue)):(l(),u("main",Le,[o("section",Ce,[B(a,{onFiltered:n.setFilter},null,8,["onFiltered"]),o("button",{onClick:t[0]||(t[0]=(...k)=>n.addTask&&n.addTask(...k)),class:"add-btn btn btn-warning"},"Add Task")]),n.tasks?(l(),U(c,{key:0,onRemoved:n.removeTask,onDetails:n.showDetails,tasks:n.tasks},null,8,["onRemoved","onDetails","tasks"])):y("",!0)]))}var Me=m(Be,[["render",Ae]]);const Ve={name:"TaskEdit",components:{},data(){return{taskToEdit:null,chunks:null,recorder:null}},async created(){const e=this.taskId;if(e){const t=await this.$store.dispatch({type:"getTaskById",taskId:e});this.taskToEdit=t}else this.taskToEdit=v.getEmptyTask();this.chunks=[],this.createMedia()},mounted(){this.preview=this.$refs.previewVideo,this.recording=this.$refs.recordingVideo,console.log("this.preview",this.preview),console.log("this.recording",this.recording)},methods:{wait(e){return new Promise(t=>setTimeout(t,e))},async startRecording(e){console.log("stream",e),this.recorder=new MediaRecorder(e);let t=[];this.recorder.ondataavailable=i=>t.push(i.data),this.recorder.start();let s=new Promise((i,r)=>{this.recorder.onstop=i,this.recorder.onerror=n=>r(n.name)});return Promise.all([s]).then(()=>t)},stop(e){e.getTracks().forEach(t=>t.stop()),console.log("stop"),this.recorder.stop()},onStopRec(){console.log("this.preview.srcObject",this.preview.srcObject),this.stop(this.preview.srcObject)},onStart(){navigator.mediaDevices.getUserMedia({video:!0,audio:!0}).then(e=>(this.preview.srcObject=e,this.preview.captureStream=this.preview.captureStream||this.preview.mozCaptureStream,new Promise(t=>this.preview.onplaying=t))).then(()=>this.startRecording(this.preview.captureStream())).then(e=>{console.log("recordedChunks",e),console.log("here");async function t(i){return new Promise((r,n)=>{let a=new FileReader;a.onerror=n,a.onload=c=>r(c.target.result),a.readAsDataURL(i)})}let s=new Blob(e,{type:"video/webm"});t(s).then(i=>{console.log(i),this.taskToEdit.videoSrc=i}),this.recording.src=URL.createObjectURL(s)}).catch(e=>{e.name==="NotFoundError"?console.log("Camera or microphone not found. Can't record."):console.log(e)})},convertDataURIToBinary(e){var t=";base64,",s=e.indexOf(t)+t.length,i=e.substring(s),r=window.atob(i),n=r.length,a=new Uint8Array(new ArrayBuffer(n));for(let c=0;c<n;c++)a[c]=r.charCodeAt(c);return a},async save(){await this.$store.dispatch({type:"saveTask",task:this.taskToEdit}),this.$router.push("/")},goBack(){this.$router.push("/")},createMedia(){const e={audio:!0};navigator.mediaDevices.getUserMedia(e).then(this.onSuccess,this.onError)},onSuccess(e){this.mediaRecorder=new MediaRecorder(e),this.mediaRecorder.onstop=t=>{console.log("data available after MediaRecorder.stop() called.");const s=prompt("Enter a name for your sound clip?","My unnamed clip"),i=document.createElement("article"),r=document.createElement("p"),n=document.createElement("audio"),a=document.createElement("button");i.classList.add("clip"),n.controls=!0,a.textContent="Delete",a.className="delete",s===null?r.textContent="My unnamed clip":r.textContent=s,i.appendChild(n),i.appendChild(r),i.appendChild(a),this.$refs.soundClips.appendChild(i);async function c(d){return new Promise((x,$)=>{let f=new FileReader;f.onerror=$,f.onload=S=>x(S.target.result),f.readAsDataURL(d)})}const k=new Blob(this.chunks,{type:"audio/ogg; codecs=opus"});c(k).then(d=>{console.log(d),this.taskToEdit.audioSrc=d}),this.chunks=[];const R=window.URL.createObjectURL(k);n.src=R,console.log("recorder stopped"),a.onclick=function(d){d.target.closest(".clip").remove()}},this.mediaRecorder.ondataavailable=t=>{console.log("this.chunks",this.chunks),this.chunks.push(t.data)}},onRecord(){!this.mediaRecorder||(this.mediaRecorder.start(),console.log(this.mediaRecorder.state),console.log("recorder started"),console.log("document",document))},onError(e){console.log("The following error occured: "+e)}},computed:{formTitle(){return this.taskId?"Edit task":"Add task"},taskId(){return this.$route.params.taskId}},unmounted(){}},Fe={key:0,class:"task-edit"},Oe={class:"form-control"},je=o("label",{for:"title",class:"form-label"}," Title ",-1),Ne={class:"form-control"},Pe=o("label",{for:"description",class:"form-label"}," Description ",-1),qe={class:"form-control"},He=o("label",{for:"importance",class:"form-label"}," Importance ",-1),Ke={class:"form-control"},Je=o("label",{for:"status",class:"form-label"}," Status ",-1),We=o("option",null,"open",-1),ze=o("option",null,"in progress",-1),Xe=o("option",null,"done",-1),Ye=[We,ze,Xe],Ze={ref:"soundClips",class:"sound-clips"},Ge={class:"left"},Qe=o("div",{id:"startButton",class:"button"},"Start Recording",-1),ts=o("h2",null,"Preview",-1),es={ref:"previewVideo",id:"preview",width:"160",height:"120",autoplay:"",muted:""},ss={class:"right"},os=o("div",{id:"stopButton",class:"button"},"Stop Recording",-1),ns=o("h2",null,"Recording",-1),rs={ref:"recordingVideo",id:"recording",width:"160",height:"120",controls:""},as={class:"btn-group"};function is(e,t,s,i,r,n){return r.taskToEdit?(l(),u("section",Fe,[o("h1",null,p(r.taskToEdit._id?"Edit":"Add")+" Task",1),o("div",null,[o("div",Oe,[je,h(o("input",{"onUpdate:modelValue":t[0]||(t[0]=a=>r.taskToEdit.title=a),id:"title",class:"form-input",type:"text"},null,512),[[g,r.taskToEdit.title]])]),o("div",Ne,[Pe,h(o("textarea",{"onUpdate:modelValue":t[1]||(t[1]=a=>r.taskToEdit.description=a),class:"form-input",type:"text",id:"description"},null,512),[[g,r.taskToEdit.description]])]),o("div",qe,[He,h(o("input",{max:"3",min:"1","onUpdate:modelValue":t[2]||(t[2]=a=>r.taskToEdit.importance=a),class:"form-input",type:"number",id:"importance"},null,512),[[g,r.taskToEdit.importance]])]),o("div",Ke,[Je,h(o("select",{id:"status",name:"status","onUpdate:modelValue":t[3]||(t[3]=a=>r.taskToEdit.status=a),class:"form-input"},Ye,512),[[A,r.taskToEdit.status]])]),o("section",Ze,null,512),o("div",Ge,[Qe,ts,o("video",es,null,512)]),o("div",ss,[os,ns,o("video",rs,null,512)])]),o("div",as,[o("button",{onClick:t[4]||(t[4]=(...a)=>n.save&&n.save(...a)),class:"btn btn-success"},"save"),o("button",{onClick:t[5]||(t[5]=(...a)=>n.goBack&&n.goBack(...a)),class:"btn btn-danger"},"back"),o("button",{onClick:t[6]||(t[6]=(...a)=>n.onStart&&n.onStart(...a)),class:"btn btn-warning"},"Record"),o("button",{onClick:t[7]||(t[7]=(...a)=>n.onStopRec&&n.onStopRec(...a)),class:"btn btn-danger"},"Stop")])])):y("",!0)}var cs=m(Ve,[["render",is]]);const ls=st({history:ot("/firebase-vue/"),routes:[{path:"/",name:"home",component:Me},{path:"/task/edit/:taskId?",component:cs},{path:"/task/:taskId",component:V}]});var ds={state:{tasks:null,filterBy:null,isLoading:!1},getters:{tasks(e){return e.tasks},isLoading(e){return e.isLoading},filterBy(e){return e.filterBy}},mutations:{setTasks(e,{tasks:t}){e.tasks=t},setIsLoading(e,{isLoading:t}){e.isLoading=t},removeTask(e,{id:t}){const s=e.tasks.findIndex(i=>i._id===t);e.tasks.splice(s,1)},saveTask(e,{task:t}){const s=e.tasks.findIndex(i=>i._id===t._id);s!==-1?e.tasks.splice(s,1,t):e.tasks.unshift(t)},setFilter(e,{filterBy:t}){e.filterBy=t}},actions:{async loadTasks({commit:e,state:t}){e({type:"setIsLoading",isLoading:!0});try{var s=await v.query(t.filterBy);e({type:"setTasks",tasks:s})}catch(i){throw console.error("Cannot Load tasks",i),i}finally{setTimeout(()=>{e({type:"setIsLoading",isLoading:!1})},500)}},async saveTask({commit:e},{task:t}){try{const s=await v.save(t);e({type:"saveTask",task:s})}catch(s){throw console.error("Cannot save task",s),s}},async removeTask({commit:e},{id:t}){try{await v.remove(t),e({type:"removeTask",id:t})}catch(s){throw console.error("Cannot remove task",s),s}},async getTaskById(e,{taskId:t}){try{return await v.getById(t)}catch(s){console.log(s)}},async filter({commit:e,dispatch:t},{filterBy:s}){e({type:"setFilter",filterBy:s}),await t({type:"loadTasks"})}}};const us=nt({strict:!0,modules:{taskStore:ds}});const C=rt(gt);C.use(ls);C.use(us);C.mount("#app");