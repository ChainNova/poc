importScripts("/j/pub/moment/2.14.1.locales.js"),importScripts("/j/pub/bignumber/2.4.0.js");var BN=BigNumber,ratio=1e6,Native="CFQ",NativeF="CFQ",natives=[Native,NativeF],isNative=function(e){return~natives.indexOf(e.toUpperCase())},RTS=function(e,r){var t=moment.utc("2000-01-01T00:00:00-08:00").add(1e3*e);return r?t.format(r):t},valid_tx=function(e,r){var t=e.base.issuer+e.trade.issuer,n=e.base.currency+e.trade.currency,u=[r.payCurr[0]+r.getCurr[0],r.getCurr[0]+r.payCurr[0],r.payCurr[1]+r.getCurr[1],r.getCurr[1]+r.payCurr[1]];return~u.indexOf(t)||~u.indexOf(n)},jobs={};jobs.books=function(e){var r={create:null,cancel:null,dealt:[],reduced:[],insert:[],topn:[]};return parse_tx(e.Tx,e.Pair,function(e){switch(e.reduced&&r.reduced.unshift(e.reduced),e.insert&&r.insert.unshift(e.insert),e.humanType){case"cancel":return r.cancel=e,!0;case"create":return void(r.create=e);default:if(e.overflow||r.dealt.unshift(e),e.overflow||!e.inCurrentPair)return;var t=[e.time,e.price,e.payAmnt,e.getAmnt,e.Account,e.counterparty,e.tx_hash,e.ledger_index];"ask"==e.dir&&(t[2]=e.getAmnt,t[3]=e.payAmnt),r.topn.unshift(t)}}),r.topn.length&&r.topn.unshift(["time","price","baseAmount","counterAmount","account","counterparty","tx_hash","amount"]),r},jobs.offers_held=function(e){return e.reverse().map(function(e){takerPayCurrency=null,takerPayAmount=0,takerGetCurrency=null,takerGetAmount=0,e.isBuyAll?(takerPayCurrency=e.srcCurrency,takerPayAmount=e.srcCount,takerGetCurrency=e.desCurrency,takerGetAmount=e.desCount):(takerPayCurrency=e.desCurrency,takerPayAmount=e.desCount,takerGetCurrency=e.srcCurrency,takerGetAmount=e.srcCount),e._price=new BN(takerPayAmount).div(takerGetAmount).toNumber(),e._priceCurrency=takerPayCurrency,e._amount=+takerGetAmount,e._amountCurrency=takerGetCurrency}),e},jobs.offers_dealt=function(e){return e.map(function(e){e.date=moment.utc(e.finishedTime).format("YYYY-MM-DD HH:mm:ss"),e._unitprice=new BN(e.finalCost).div(e.desCount).toNumber(),e.isBuyAll?(e._price=+e.srcCount,e._priceCurrency=e.srcCurrency,e._amount=+e.desCount,e._amountCurrency=e.desCurrency):(e._price=+e.desCount,e._priceCurrency=e.desCurrency,e._amount=+e.srcCount,e._amountCurrency=e.srcCurrency)}),e};var onmessage=function(e){var r=e.data;postMessage({type:r.type,data:jobs[r.type](r.data),id:r.id})};