define(["lib/coin"],function(n){var e;return e=function(e,r){var t,c,u,a,o,l;for(t=r.userInfo,t&&(delete Const.user.inactive,angular.extend(Const.user,t)),u=[],l=r.assets,a=0,o=l.length;a<o;a++)c=l[a],u.push({name:c.currency,currency:c.currency.toUpperCase(),total:new BN(c.count).add(c.lockCount).toString(),balance:c.count,precision:n.getPrecision(c.currency||2)});return e.all.length=0,[].push.apply(e.all,u),e},{all:e}});