(this.webpackJsonpmessenger=this.webpackJsonpmessenger||[]).push([[0],{23:function(e,t,n){e.exports=n(41)},36:function(e,t,n){},37:function(e,t,n){},38:function(e,t,n){},39:function(e,t,n){},40:function(e,t,n){},41:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),i=n(9),s=n.n(i),o=n(1),c=n(2),l=n(4),u=n(3),d=n(5),f=n(11),h=n(7),p=n(18),m=n(19),g=n(20),v=n.n(g),b=n(10),j=n(21),w="ADD_MESSAGE",E={};var O=Object(h.c)({messagesStore:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:E,t=arguments.length>1?arguments[1]:void 0,n=t.type,a=t.payload;switch(n){case w:return Object(j.a)(Object(b.a)({},a.id,a),e);default:return e}}}),y=Object(p.createLogger)(),k=Object(h.d)(Object(h.a)(m.a,v.a,y)),F=Object(h.e)(O,k),S=(n(36),function(e){function t(){var e,n;Object(o.a)(this,t);for(var a=arguments.length,r=new Array(a),i=0;i<a;i++)r[i]=arguments[i];return(n=Object(l.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).state={imgs:[]},n}return Object(d.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"bodyMessage"},r.a.createElement("div",{className:"textMessage"},this.props.message.text,this.state.imgs))}},{key:"componentDidMount",value:function(){var e=this;this.props.message.files.forEach((function(t){var n=new FileReader;n.readAsDataURL(t),n.onloadend=function(){var a=Date.now();e.setState((function(e){return{imgs:e.imgs.concat(r.a.createElement("img",{src:n.result,className:"imageMessage",alt:"",key:t.lastModified+t.name+a}))}}))}}))}}]),t}(r.a.PureComponent)),M=(n(37),function(e){function t(){return Object(o.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"divMessageList"},Object.values(this.props.messages).map((function(e){return r.a.createElement(S,{message:e,key:e.id})})))}}]),t}(r.a.PureComponent)),D=n(22),N=(n(38),function(e){function t(){var e,n;Object(o.a)(this,t);for(var a=arguments.length,r=new Array(a),i=0;i<a;i++)r[i]=arguments[i];return(n=Object(l.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).state={text:""},n.handleChange=function(e){n.setState({text:e.target.value})},n.handleSubmit=function(e){if(e.preventDefault(),n.state.text.length||n.props.files.length){var t={text:n.state.text,id:Date.now(),files:n.props.files};n.props.addMessage(t),n.setState({text:""}),n.props.clearFiles()}},n}return Object(d.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return r.a.createElement("form",{className:"form",onSubmit:this.handleSubmit},r.a.createElement("input",{type:"file",id:"fileElem",multiple:!0,accept:"image/*",onChange:this.props.handleFiles}),r.a.createElement("label",{className:"button",htmlFor:"fileElem"},r.a.createElement("i",{className:"fa fa-paperclip",style:{fontSize:"24px"}})),r.a.createElement("input",{autoComplete:"off",className:"input",placeholder:"\u041d\u0430\u043f\u0438\u0448\u0438\u0442\u0435 \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0435...",onChange:this.handleChange,value:this.state.text}),r.a.createElement("button",{className:"send",onClick:this.handleSubmit},r.a.createElement("i",{className:"fa fa-send-o",style:{fontSize:"24px"}})))}}]),t}(r.a.PureComponent)),x=(n(39),function(e){function t(){var e,n;Object(o.a)(this,t);for(var a=arguments.length,i=new Array(a),s=0;s<a;s++)i[s]=arguments[s];return(n=Object(l.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(i)))).state={files:[],previewFiles:[]},n.handlerFunction=function(e){console.log(e),e.preventDefault()},n.handleDrop=function(e){var t=e.dataTransfer.files;n.uploadFile(t)},n.handleFiles=function(e){n.uploadFile(e.target.files),e.target.value=null},n.uploadFile=function(e){e=Object(D.a)(e),n.previewFile(e),n.setState((function(t){return{files:t.files.concat(e)}}))},n.previewFile=function(e){e.forEach((function(e){var t=new FileReader;t.readAsDataURL(e),t.onloadend=function(){var a=Date.now();n.setState((function(n){return{previewFiles:n.previewFiles.concat(r.a.createElement("img",{src:"".concat(t.result),className:"image",alt:"",key:e.lastModified+e.name+a}))}}))}}))},n.clearFiles=function(){n.setState({files:[],previewFiles:[]})},n}return Object(d.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{id:"drop-area"},r.a.createElement(N,{handleFiles:this.handleFiles,addMessage:this.props.addMessage,clearFiles:this.clearFiles,files:this.state.files}),r.a.createElement("div",{id:"gallery"},this.state.previewFiles))}},{key:"preventDefaults",value:function(e){e.preventDefault(),e.stopPropagation()}},{key:"componentDidMount",value:function(){var e=this,t=document.getElementById("drop-area");function n(){t.classList.add("highlight")}function a(){t.classList.remove("highlight")}["dragenter","dragover","dragleave","drop"].forEach((function(n){t.addEventListener(n,e.preventDefaults,!1)})),["dragenter","dragover"].forEach((function(e){t.addEventListener(e,n,!1)})),["dragleave","drop"].forEach((function(e){t.addEventListener(e,a,!1)})),t.addEventListener("drop",this.handleDrop,!1)}}]),t}(r.a.PureComponent)),C=(n(40),function(e){return function(t){t({type:w,payload:e})}}),A=function(e){function t(){return Object(o.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this.props,t=e.messagesStore,n=e.addMessage;return r.a.createElement("div",{className:"background"},r.a.createElement("header",{style:{background:"white",height:"50px"}},"\u0427\u0430\u0442"),r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"content"},r.a.createElement(M,{messages:t}),r.a.createElement(x,{addMessage:n}))))}}]),t}(r.a.Component),L=Object(f.b)((function(e){return{messagesStore:e.messagesStore}}),(function(e){return{addMessage:Object(h.b)(C,e)}}))(A),W=function(e){function t(){return Object(o.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return r.a.createElement(f.a,{store:F},r.a.createElement("link",{rel:"stylesheet",href:"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"}),r.a.createElement(L,null))}}]),t}(a.Component),P=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function R(e,t){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var n=e.installing;null!=n&&(n.onstatechange=function(){"installed"===n.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}})).catch((function(e){console.error("Error during service worker registration:",e)}))}s.a.render(r.a.createElement(W,null),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("/Messenger",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var t="".concat("/Messenger","/service-worker.js");P?(!function(e,t){fetch(e,{headers:{"Service-Worker":"script"}}).then((function(n){var a=n.headers.get("content-type");404===n.status||null!=a&&-1===a.indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):R(e,t)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(t,e),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")}))):R(t,e)}))}}()}},[[23,1,2]]]);
//# sourceMappingURL=main.09a320ed.chunk.js.map