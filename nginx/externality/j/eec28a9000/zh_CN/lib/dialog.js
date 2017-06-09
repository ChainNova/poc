define(["jade!tmpl/dialog/overlay","jade!tmpl/dialog/window","jade!tmpl/dialog/title","angular"],function(e,o,n){var t=(window,document.documentElement),a=angular.element(t),r=function(e,o){return angular.element(e[0].querySelector(o))};return angular.module("dialog",[]).factory("$$stackedMap",function(){return{createNew:function(){var e=[];return{add:function(o,n){e.push({key:o,value:n})},get:function(o){for(var n=0;n<e.length;n++)if(o==e[n].key)return e[n]},keys:function(){for(var o=[],n=0;n<e.length;n++)o.push(e[n].key);return o},top:function(){return e[e.length-1]},remove:function(o){for(var n=-1,t=0;t<e.length;t++)if(o==e[t].key){n=t;break}return e.splice(n,1)[0]},removeTop:function(){return e.splice(e.length-1,1)[0]},length:function(){return e.length}}}}}).directive("ngdDialogOverlay",["$dialogStack","$timeout",function(o,n){return{restrict:"EA",replace:!0,template:e,link:function(e,t,r){n(function(){e.animate=!0,a.addClass("noScroll")}),e.close=function(e){var n=o.getTop();n&&n.value.overlay&&"static"!=n.value.overlay&&(e.preventDefault(),e.stopPropagation(),n.key&&n.key.dismiss("overlay click"))}}}}]).directive("ngdDialogWindow",["$timeout",function(e){return{restrict:"EA",scope:{index:"@"},replace:!0,transclude:!0,template:o,link:function(o,n,t){o.$on("dataLoaded",function(){if(n.removeClass("pending"),t.insert){var e=r(n,"."+t.insert);e.length&&e.removeClass("pending2")}}),t.insert&&n.removeClass("pending"),e(function(){o.animate=!0})}}}]).factory("$dialogStack",["$document","$compile","$rootScope","$q","$injector","$controller","$templateCache","$http","$timeout","$$stackedMap",function(e,o,t,l,i,s,d,u,c,f){function m(){for(var e=-1,o=k.keys(),n=0;n<o.length;n++)k.get(o[n]).value.overlay&&(e=n);return e}function v(e){var o=k.get(e).value;k.remove(e),o.modalDomEl.remove(),a.removeClass("noScroll"),y&&m()==-1&&(y.remove(),y=void 0),o.modalScope.$destroy()}function p(e){return e.template?l.when(e.template):u.get(e.templateUrl,{cache:d}).then(function(e){return e.data})}function g(e){var o=[];return angular.forEach(e,function(e,n){(angular.isFunction(e)||angular.isArray(e))&&o.push(l.when(i.invoke(e)))}),o}function h(e){e.on("mousedown",E.mousedown)}var $,y,C=t.$new(!0),w=e.find("body").eq(0),k=f.createNew(),D={};t.$watch(m,function(e){C.index=e}),e.on("keydown",function(e){var o,n=angular.isDefined(e.which)?e.which:e.keyCode;if(o=k.top(),27===n&&o&&o.value.keyboard&&t.$apply(function(){o.key&&o.key.dismiss("overlay click")}),o&&8===n){var a=e.target.tagName.toLowerCase();"input"!=a&&"textarea"!=a&&(e.preventDefault(),e.stopPropagation())}});var E={downed:!1,x:null,y:null,target:null,dialog:null,tH:0,bH:0,mousedown:function(o){E.downed=!0,o.preventDefault();var n=E.target=angular.element(o.currentTarget||this),t=E.dialog=n.parent(),a=r(t,".dialogB"),l=r(t,".dialogF");E.tH=n[0].offsetHeight,E.bH=a.length>0?a[0].offsetHeight:l.length>0?l[0].offsetHeight:0,E.x=o.pageX-t[0].offsetLeft,E.y=o.pageY-t[0].offsetTop,n.css({cursor:"move"}),e.on("mousemove",E.mousemove),e.on("mouseup",E.mouseup)},mousemove:function(o){if(E.downed){o.preventDefault();var n=3,t=o.clientX-E.x,a=o.clientY-E.y,r=E.dialog[0].offsetWidth+n,l=E.dialog[0].offsetHeight+n,i=e[0].documentElement.clientWidth,s=e[0].documentElement.clientHeight;t-n<=0&&(t=n),t+r>=i&&(t=i-r),a-n<=n&&(a=n),a+l+E.bH>=s&&(a=s-l-E.bH),E.dialog.css({left:t+"px",top:a+"px",margin:"0 0 0 0"})}},mouseup:function(o){E.downed=!1,E.x=null,E.y=null,E.tH=0,E.bH=0,E.target.css({cursor:""}),o.preventDefault(),e.off("mousemove",E.mousemove),e.off("mouseup",E.mouseup)}};return D.open=function(e,t){var a=t.modalOptions,i=l.all([p(a)].concat(g(a.resolve)));i.then(function(n){var l,i={},d=1;c(function(){t.scope.$broadcast("dataLoaded")},10),a.controller&&(i.$scope=t.scope,i.$dialogInstance=e,i.$element=u,angular.forEach(a.resolve,function(e,o){i[o]=n[d++]}),l=s(a.controller,i));var f=angular.element("<div></div>");f.html(n[0]);var m=o(f)(t.scope);if(u){if(a._insertClass){var v=r(u,"."+a._insertClass);v.length?angular.element(v[0]).append(m.contents()):u.append(m.contents())}else u.append(m.contents());if(a.dragable){var p=r(u,".dialogT");p.length&&h(p)}}},function(o){t.deferred.reject(o),c(function(){e.close()},0);var n=o.data&&o.data.error_text||"载入失败，请稍后再试.";CORE.alert?alert(n):alert(n)}),i.then(function(){t.loadedDeferred.resolve(!0)},function(){t.loadedDeferred.reject(!1)}),k.add(e,{deferred:t.deferred,modalScope:t.scope,overlay:a.overlay,dragable:a.dragable,keyboard:a.keyboard}),m()>=0&&!y&&($=angular.element("<div ngd-dialog-overlay></div>"),y=o($)(C),w.append(y)),e.updateTitle=function(e){if(u){var o=r(u,".dialogT");o.length&&o.html(e)}};var d=angular.element(n).addClass(a.classname).attr("index",k.length()-1).attr("insert",a._insertClass||"");a.hideClose&&d.addClass("noClose"),a.title&&r(d,".dialogT").html(a.title);var u=o(d)(t.scope);k.top().value.modalDomEl=u,w.append(u)},D.close=function(e,o){var n=k.get(e);n&&(n.value.deferred.resolve(o),v(e))},D.dismiss=function(e,o){var n=k.get(e).value;n&&(n.deferred.reject(o),v(e))},D.show=function(e){var o=k.get(e);if(!o)return!1;var n=o.value;return n&&n.modalDomEl&&n.modalDomEl.css({opacity:"1"}),!0},D.hide=function(e){var o=k.get(e).value;o&&o.modalDomEl&&o.modalDomEl.css({opacity:"0"})},D.addClass=function(e,o){var n=k.get(e).value;n&&n.modalDomEl&&n.modalDomEl.addClass(o)},D.removeClass=function(e,o){var n=k.get(e).value;n&&n.modalDomEl&&n.modalDomEl.removeClass(o)},D.getTop=function(){return k.top()},D}]).provider("$dialog",function(){var e={options:{overlay:"static",keyboard:!0,dragable:!0,onClose:angular.noop,onConfirm:angular.noop,onDismiss:angular.noop,hideClose:!1},$get:["$rootScope","$q","$dialogStack",function(o,n,t){var a={};return a.open=function(a){var r=n.defer(),l=n.defer(),i={result:r.promise,loaded:l.promise,close:function(e){return t.close(i,e)},dismiss:function(e){!1!==a.onDismiss.call(s,s,i)&&t.dismiss(i,e)},hide:function(){return t.hide(i)},show:function(){return t.show(i)},addClass:function(e){t.addClass(i,e)},removeClass:function(e){t.removeClass(i,e)}};if(a=angular.extend({},e.options,a),a.resolve=a.resolve||{},!a.template&&!a.templateUrl)throw new Error("One of template or templateUrl options is required.");var s=(a.scope||o).$new();return s.$close=i.close,s.$dismiss=i.dismiss,s.$hide=i.hide,s.$show=i.show,s.$addClass=i.addClass,s.$removeClass=i.removeClass,s.$oclose=function(){!1!==a.onClose.call(s,s,i)&&s.$close()},s.$ok=function(){!1!==a.onConfirm.call(s,s,i)&&s.$close()},t.open(i,{scope:s,deferred:r,loadedDeferred:l,modalOptions:a}),i},a}]};return e})});