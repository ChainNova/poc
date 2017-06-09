/*
 * ./cs.js copy, add extend for '.coffee.md', 'literate' config
 * load and compile CoffeeScript in frontend, modified on jrburke's require-cs
 * delete the node part of require-cs, and fixed some bug
 * version: 0.4.3.hack
*/

define(['/j/pub/coffeescript/1.10.0.js'],function(coffee){
	var isXDR
	// Simple Ajax Loader
	var progIds = ['Msxml2.XMLHTTP','Microsoft.XMLHTTP','Msxml2.XMLHTTP.4.0']
	var getXhr = function(){
		if(typeof window.XDomainRequest !== 'undefined'){
			isXDR = true
			return new window.XDomainRequest()
		}
		if(typeof XMLHttpRequest !== 'undefined'){
			return new XMLHttpRequest()
		}
		var xhr
		for(var i=0;i<progIds.length;i++){
			var progId = progIds[i]
			xhr = new ActiveXObject(progId)
			if(xhr){
				progIds = [progId]
				return xhr
			}
		}
	}

	// get file
	var fetchText = function(url, callback){
		var xhr = getXhr()
		xhr.open('GET', url, true)
		if(isXDR){
			xhr.onload = function(){
				callback(xhr.responseText)
			}
		}else{
			xhr.onreadystatechange = function(){
				if(xhr.readyState === 4){
					callback(xhr.responseText)
				}
			}
		}
		xhr.send(null)
	}

	return {
		load: function(name, req, load, config){
			// deal with coffee
			var path = req.toUrl(~name.search(/\.(coffee.md|litcoffee)$/)?name:name+'.coffee.md')
			fetchText(path, function(text){
				// IE will abort if not setTimeout twice
				setTimeout(function(){
					try {
						text = coffee.compile(text, {bare:true,literate:true})
					}catch(e){
						e.message = 'In ' + path + ', ' + e.message
						throw e
					}
					text += '\r\n//# sourceURL=' + path

					setTimeout(function(){

						load.fromText(name, text)
						// return result
						req([name], function(content){
							load(content)
						})

					})


				})
			})
		}
	}
})
