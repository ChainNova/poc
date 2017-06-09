define(["common/module","services/balance","services/coin"],function(r){var e,n;return n=angular.noop,e=CORE.api.trade,r.factory("pairServ",["ajax","$rootScope","$route","$location","$timeout","balanceServ","coinServ",function(r,e,n,a,t,u,c){var s,i,f,o,l,p,d,b,y,h,g,v,O,m;return o=c.base(),O=c.trade(),f=c.all(),b=function(r){return"fast."+r},s=function(r){var e,n;return e=b(r),n=CORE.LS.get(e),n?n.currency&&~f.indexOf(n.currency)?n:void CORE.LS.del(e):n},i=function(r,e){var n;return n=angular.copy(e),delete n.balance,delete n.total,CORE.LS.set(b(r),n)},h=function(r,e,n){return r.currency+"/"+e.currency},l={base:[],trade:[],pairs:[]},y=function(){var r,e,n,a,t,u,s,i,f,p,d,b,y,g,v,m,x,C,S;for(y=[],g=l.base,a=t=g.length-1;t>=0;a=t+=-1)S=g[a],n=S.currency,~o.indexOf(n)?y.push(n):l.base.splice(a,1);for(o.forEach(function(r){if(!~y.indexOf(r))return l.base.push(c.getGatewayByUrl(r,"pair"))}),y=[],v=l.trade,a=u=v.length-1;u>=0;a=u+=-1)S=v[a],n=S.currency,~O.indexOf(n)?y.push(n):l.trade.splice(a,1);for(O.forEach(function(r){if(!~y.indexOf(r))return l.trade.push(c.getGatewayByUrl(r,"pair"))}),b=[],m=l.base,s=0,i=m.length;s<i;s++)for(r=m[s],x=l.trade,p=0,f=x.length;p<f;p++)e=x[p],b.push(h(r,e));for(C=l.pairs,a=d=C.length-1;d>=0;a=d+=-1)S=C[a],~b.indexOf(S)||l.pairs.splice(a,1);return b.forEach(function(r){if(!~l.pairs.indexOf(r))return l.pairs.push(r)})},y(),e.$on("coins-update",function(){return t(y)}),d=function(r){return s(r)||l[r]["base"===r?0:1]},p=e.fast||(e.fast={}),p.pair="",p.base=d("base"),p.trade=d("trade"),e.$on("$locationChangeSuccess",function(){var r;return(r=function(){var r,e,a;if(e=n.current,a=e.params,r=a.base,~o.indexOf(r)&&r!==p.base.currency&&v(r,"base"),r=a.trade,~O.indexOf(r)&&r!==p.trade.currency)return v(r,"trade")})()}),g=function(r,n){return n&&angular.merge(p[r],n),e.fast.pair=h(p.base,p.trade),i(r,p[r])},e.$watchGroup(["fast.base.currency","fast.base.issuer"],function(r,e){if(r)return g("base")}),e.$watchGroup(["fast.trade.currency","fast.trade.issuer"],function(r,e){if(r)return g("trade")}),m=function(r,e){var n,a,t,u;for(u=l.base,a=0,t=u.length;a<t;a++)if(n=u[a],e.currency===n.currency)return!1;return!0},u.all(),e.$watch("Const.user.balance.ts",function(r){var e,n,a,t,u,c,s,i,f,o,d,b;if(r){for(["base","trade"].map(function(r){return Const.user.balance.all.map(function(e){var n,a;return a=angular.copy(e),n="",l[r].some(function(r,e){if(r.currency===a.currency)return n=""+e}),n?angular.merge(l[r][n],a):l[r].push(a)})}),d=[],f=l.base,a=u=0,s=f.length;u<s;a=++u)for(e=f[a],o=l.trade,c=0,i=o.length;c<i;c++)b=o[c],n=b.currency,t=b.issuer,t===e.issuer&&n===e.currency&&angular.merge(l.base[a],b),n===p.base.currency&&t===p.base.issuer&&g("base",b),n===p.trade.currency&&t===p.trade.issuer&&g("trade",b),m(e,b)&&d.push(h(e,b));return l.pairs.length=0,[].push.apply(l.pairs,d)}}),v=function(r,e,t){var u,s,i,f,o,d,b,y,h;if(i=r.currency||r,i&&(u=p["base"===e?"trade":"base"],!c.isNative(i)||!c.isNative(u.currency))){if("string"==typeof r){for(y=l[e],o=0,d=y.length;o<d;o++)if(s=y[o],s.currency===r||s.issuer===r){p[e]=s;break}}else p[e]=r;if(!t&&(h=n.current.params[e],h&&h!==i))return f=new RegExp(e+"/[^/]+"),b=a.path().replace(f,e+"/"+i),a.pushState(b)}},{fast:p,allCoins:function(){return f},tradeCoins:function(){return O},baseCoins:function(){return o},base:function(){return l.base},trade:function(){return l.trade},pairs:function(){return l.pairs},all:function(){return l},getSelected:d,switch:v}}])});