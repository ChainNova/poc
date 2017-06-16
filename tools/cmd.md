1. post   http://localhost:7050/registrar
    {
      "enrollId": "lukas",
      "enrollSecret": "NPKYL39uKbkj"
    }


2. post http://localhost:7050/chaincode
    {
      "jsonrpc": "2.0",
      "method": "deploy",
      "params": {
        "type": 1,
        "chaincodeID":{
            "path":"github.com/hyperledger/fabric/examples/chaincode/go/chaincode_example02"
        },
        "ctorMsg": {
            "function":"init",
            "args":["a", "1000", "b", "2000"]
        },
        "secureContext": "lukas"
      },
      "id": "1"
    }

github.com/ChainNova/poc/chaincode/exchange-chaincode

java Chaincode（必须关闭安全选项  docker-compose-4-consensus-base.yml中）
    {
      "jsonrpc": "2.0",
      "method": "deploy",
      "params": {
        "type": 4,
        "chaincodeID":{
            "path":"/opt/gopath/src/github.com/ChainNova/poc/chaincode/SimpleSample"
        },
        "ctorMsg": {
            "function":"init",
            "args":["a", "1000", "b", "2000"]
        },
        "secureContext": "lukas"
      },
      "id": "1"
    }

3. post http://localhost:7050/chaincode
   {
      "jsonrpc": "2.0",
      "method": "invoke",
      "params": {
          "type": 1,
          "chaincodeID":{
              "name":"04233c6dd8364b9f0749882eb6d1b50992b942aa0a664182946f411ab46802a88574932ccd75f8c75e780036e363d52dd56ccadc2bfde95709fc39148d76f050"
          },
          "ctorMsg": {
             "args":["invoke", "a", "b", "100"]
          },
          "secureContext": "lukas"
      },
      "id": 3
    }

4. post  http://localhost:7050/chaincode
    {
      "jsonrpc": "2.0",
      "method": "query",
      "params": {
          "type": 1,
          "chaincodeID":{
              "name":"04233c6dd8364b9f0749882eb6d1b50992b942aa0a664182946f411ab46802a88574932ccd75f8c75e780036e363d52dd56ccadc2bfde95709fc39148d76f050"
          },
          "ctorMsg": {
             "args":["query", "a"]
          },
          "secureContext": "lukas"
      },
      "id": 5
    }

5. 删除所有容器   docker rm $(docker ps -a -q)
   同时删除fabric数据   rm -r /var/hyperledger/production/

6. 查看节点  get  http://localhost:7050/network/peers

7. // Add routes
	router.Post("/registrar", (*ServerOpenchainREST).Register)
	router.Get("/registrar/:id", (*ServerOpenchainREST).GetEnrollmentID)
	router.Delete("/registrar/:id", (*ServerOpenchainREST).DeleteEnrollmentID)
	router.Get("/registrar/:id/ecert", (*ServerOpenchainREST).GetEnrollmentCert)
	router.Get("/registrar/:id/tcert", (*ServerOpenchainREST).GetTransactionCert)

	router.Get("/chain", (*ServerOpenchainREST).GetBlockchainInfo)
	router.Get("/chain/blocks/:id", (*ServerOpenchainREST).GetBlockByNumber)

	// The /chaincode endpoint which superceedes the /devops endpoint from above
	router.Post("/chaincode", (*ServerOpenchainREST).ProcessChaincode)

	router.Get("/transactions/:id", (*ServerOpenchainREST).GetTransactionByID)

	router.Get("/network/peers", (*ServerOpenchainREST).GetPeers)

8. 查看文件句柄数 sudo lsof | wc -l

9. 加载镜像 
		docker load -i exchange-adaptor.tar
		docker load -i exchange-app.tar
		docker load -i exchange-event.tar
		docker load -i fabric-baseimage.tar		
        docker load -i fabric-ccenv.tar
		docker load -i fabric-javaenv.tar
		docker load -i fabric-membersrvc.tar
		docker load -i fabric-peer.tar
		docker load -i fabric-src.tar
		docker load -i nginx.tar
		docker load -i redis.tar

10.  hyperledger/fabric-javaenv:x86_64-0.6.2-preview-snapshot-1f14698