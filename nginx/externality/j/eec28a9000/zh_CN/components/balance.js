define(["common/module","jade!tmpl/balance","services/balance"],function(e,n){return e.directive("ngdBalance",["$location","balanceServ",function(e,a){return{restrict:"E",transclude:!0,template:n,link:function(e,n,t,c){return e.balanceData=a.all()}}}])});