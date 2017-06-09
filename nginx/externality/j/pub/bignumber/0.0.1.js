(function(e){if(typeof define==="function"&&define.amd){define([],e)}window.BN=e()})(function(){var BigNumber=function(e,r,i){var t=this,n;if(e instanceof BigNumber){for(n in{precision:0,roundType:0,_s:0,_f:0})t[n]=e[n];t._d=e._d.slice();return}t.precision=isNaN(r=Math.abs(r))?BigNumber.defaultPrecision:r;t.roundType=isNaN(i=Math.abs(i))?BigNumber.defaultRoundType:i;t._s=(e+="").charAt(0)=="-";t._f=((e=e.replace(/[^\d.]/g,"").split(".",2))[0]=e[0].replace(/^0+/,"")||"0").length;for(n=(e=t._d=(e.join("")||"0").split("")).length;n;e[--n]=+e[n]);t.round()};with({$:BigNumber,o:BigNumber.prototype}){$.ROUND_HALF_EVEN=($.ROUND_HALF_DOWN=($.ROUND_HALF_UP=($.ROUND_FLOOR=($.ROUND_CEIL=($.ROUND_DOWN=($.ROUND_UP=0)+1)+1)+1)+1)+1)+1;$.defaultPrecision=40;$.defaultRoundType=$.ROUND_HALF_UP;o.add=function(e){if(this._s!=(e=new BigNumber(e))._s)return e._s^=1,this.subtract(e);var r=new BigNumber(this),i=r._d,t=e._d,n=r._f,s=e._f,e=Math.max(n,s),_,u;n!=s&&((s=n-s)>0?r._zeroes(t,s,1):r._zeroes(i,-s,1));_=(n=i.length)==(s=t.length)?i.length:((s=n-s)>0?r._zeroes(t,s):r._zeroes(i,-s)).length;for(u=0;_;u=(i[--_]=i[_]+t[_]+u)/10>>>0,i[_]%=10);return u&&++e&&i.unshift(u),r._f=e,r.round()};o.sub=o.subtract=function(e){if(this._s!=(e=new BigNumber(e))._s)return e._s^=1,this.add(e);var r=new BigNumber(this),i=r.abs().compare(e.abs())+1,t=i?r:e,n=i?e:r,s=t._f,_=n._f,u=s,o,f;t=t._d,n=n._d,s!=_&&((_=s-_)>0?r._zeroes(n,_,1):r._zeroes(t,-_,1));for(o=(s=t.length)==(_=n.length)?t.length:((_=s-_)>0?r._zeroes(n,_):r._zeroes(t,-_)).length;o;){if(t[--o]<n[o]){for(f=o;f&&!t[--f];t[f]=9);--t[f],t[o]+=10}n[o]=t[o]-n[o]}return i||(r._s^=1),r._f=u,r._d=n,r.round()};o.mul=o.multiply=function(e){e=new BigNumber(e);if(e=="0")return e;else if(e=="1")return this;var r=new BigNumber(this),i=r._d.length>=e._d.length,t=(i?r:e)._d,n=(i?e:r)._d,s=t.length,_=n.length,u=new BigNumber,o,f,h;for(o=_;o;i&&h.unshift(i),u.set(u.add(new BigNumber(h.join("")))))for(h=new Array(_- --o).join("0").split(""),i=0,f=s;f;i+=t[--f]*n[o],h.unshift(i%10),i=i/10>>>0);return r._s=r._s!=e._s,r._f=((i=s+_-r._f-e._f)>=(f=(r._d=u._d).length)?this._zeroes(r._d,i-f+1,1).length:f)-i,r.round()};o.div=o.divide=function(e){e=new BigNumber(e);if(e=="0")return new BigNumber;else if(e=="1")return this;else if(this=="0")return new BigNumber;var r=new BigNumber(this),i=r._d,t=e._d,n=i.length-r._f,s=t.length-e._f,_=new BigNumber,u=0,o,f,h,d=1,a=0,l=0;_._s=r._s!=e._s,_.precision=Math.max(r.precision,e.precision),_._f=+_._d.pop(),n!=s&&r._zeroes(n>s?t:i,Math.abs(n-s));e._f=t.length,t=e,t._s=false,t=t.round();for(e=new BigNumber;i[0]=="0";i.shift());e:do{for(h=a=0,e=="0"&&(e._d=[],e._f=0);u<i.length&&e.compare(t)==-1;++u){(h=u+1==i.length,!d&&++a>1||(l=h&&e=="0"&&i[u]=="0"))&&(_._f==_._d.length&&++_._f,_._d.push(0));i[u]=="0"&&e=="0"||(e._d.push(i[u]),++e._f);if(l)break e;if(h&&e.compare(t)==-1&&(_._f==_._d.length&&++_._f,1)||(h=0))while(_._d.push(0),e._d.push(0),++e._f,e.compare(t)==-1);}if(d=0,e.compare(t)==-1&&!(h=0))while(h?_._d.push(0):h=1,e._d.push(0),++e._f,e.compare(t)==-1);for(f=new BigNumber,o=0;e.compare(y=f.add(t))+1&&++o;f.set(y));e.set(e.subtract(f)),!h&&_._f==_._d.length&&++_._f,_._d.push(o)}while((u<i.length||e!="0")&&_._d.length-_._f<=_.precision);return _.round()};o.mod=function(e){return this.subtract(this.divide(e).intPart().multiply(e))};o.pow=function(e){var r=new BigNumber(this),i;if((e=new BigNumber(e).intPart())==0)return r.set(1);for(i=Math.abs(e);--i;r.set(r.multiply(this)));return e<0?r.set(new BigNumber(1).divide(r)):r};o.set=function(e){return this.constructor(e),this};o.compare=function(e){var r=this,i=this._f,t=new BigNumber(e),n=t._f,s=[-1,1],_,u;if(r._s!=t._s)return r._s?-1:1;if(i!=n)return s[i>n^r._s];for(i=(r=r._d).length,n=(t=t._d).length,_=-1,u=Math.min(i,n);++_<u;)if(r[_]!=t[_])return s[r[_]>t[_]^r._s];return i!=n?s[i>n^r._s]:0};o.negate=function(){var e=new BigNumber(this);return e._s^=1,e};o.abs=function(){var e=new BigNumber(this);return e._s=0,e};o.intPart=function(){return new BigNumber((this._s?"-":"")+(this._d.slice(0,this._f).join("")||"0"))};var arr2dec=function(e,r,i){var t,n=this._d.slice(this._f).slice(0,e).join("").replace(/0+$/,"");if(i&&e&&(t=e-n.length))n+=new Array(t+1).join("0");return n?"."+n:""};o.valueOf=o.toString=function(e,r){var i=this;return(i._s?"-":"")+(i._d.slice(0,i._f).join("")||"0")+(i._f!=i._d.length?arr2dec.apply(i,arguments):"")};o.toFixed=function(e,r){var i=this;return(i._s?"-":"")+(i._d.slice(0,i._f).join("")||"0")+(i._f!=i._d.length?arr2dec.call(i,e,r,1):"")};o._zeroes=function(e,r,i){var t=["push","unshift"][i||0];for(++r;--r;e[t](0));return e};o.round=function(){if("_rounding"in this)return this;var e=BigNumber,r=this.roundType,i=this._d,t,n,s,_;for(this._rounding=true;this._f>1&&!i[0];--this._f,i.shift());for(t=this._f,n=this.precision+t,s=i[n];i.length>t&&!i[i.length-1];i.pop());_=(this._s?"-":"")+(n-t?"0."+this._zeroes([],n-t-1).join(""):"")+1;if(i.length>n){s&&(r==e.DOWN?false:r==e.UP?true:r==e.CEIL?!this._s:r==e.FLOOR?this._s:r==e.HALF_UP?s>=5:r==e.HALF_DOWN?s>5:r==e.HALF_EVEN?s>=5&&i[n-1]&1:false)&&this.add(_);i.splice(n,i.length-n)}return delete this._rounding,this}}return BigNumber});