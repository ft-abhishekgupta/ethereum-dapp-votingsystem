web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))
var account;
abi = JSON.parse('[{"constant":true,"inputs":[],"name":"totalVotes","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"errorMess","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"errorMessage","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"winnerCandidates","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getWinnerName","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalCandidates","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"endElection","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_name","type":"string"}],"name":"addCandidates","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"id","type":"uint256"}],"name":"getCandidateByID","outputs":[{"name":"name","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"electionName","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getWinnerCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_auth_code","type":"string"},{"name":"_can_id","type":"uint256"}],"name":"vote","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_email","type":"string"}],"name":"addVoter","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"populateWinnerList","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"latestAuthCode","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"winnerCandidateVotes","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"end","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"Result","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"latestAuth","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getCandidateList","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_name","type":"string"}],"payable":true,"stateMutability":"payable","type":"constructor"}]')
contract = new web3.eth.Contract(abi,"0x364bF7874f303E172b22fd53200F24fFE62a3747");
function addcandidateform(form) {
    var name = form.nameinput.value;
    var accnum = parseInt(form.accinput.value);
    var returnc;
    web3.eth.getAccounts().then((f) => {
        account = f[accnum];
        contract.methods.addCandidates(name).send({from: account,gas:10000000}).then((f) => {            
            contract.methods.getCandidateList().call().then((fs) => {
                var res = fs.split("\n");
                var cid = res.length-1
                document.getElementById("returncode").innerHTML = "<div class=\"alert alert-success\" style=\"padding:5px\"><div class=\"container\"><div class=\"alert-icon\"><i class=\"material-icons\"\>check</i></div><b>Candidate Registration Success</b><br><br> Name : <b>"+name+"</b><br>Candidate ID : <b>"+cid+"</b></div><div>"
            })
        })
    })
}
function stop(form) {
    var accnum = parseInt(form.accinput.value);
    var returnc;
    web3.eth.getAccounts().then((f) => {
        account = f[accnum];
        contract.methods.endElection().send({from: account,gas:10000000}).then((f) => {                 
                document.getElementById("returncode").innerHTML = "<div class=\"alert alert-success\" style=\"padding:5px\"><div class=\"container\"><div class=\"alert-icon\"><i class=\"material-icons\"\>check</i></div><b>Election Ended</b></div><div>"            
        })
    })
}
function registerform(form) {
    var email = form.emailinput.value;
    var accnum = parseInt(form.accinput.value);
    var authc;
    web3.eth.getAccounts().then((f) => {
        account = f[accnum];
        contract.methods.addVoter(email).send({from: account,gas:10000000}).then((f) => {
            contract.methods.latestAuth().call().then((fs) => {
                authc = fs;                
            document.getElementById("authcode").innerHTML = "<div class=\"alert alert-success\" style=\"padding:5px\"><div class=\"container\"><div class=\"alert-icon\"><i class=\"material-icons\"\>check</i></div><b>Registration Success</b><br><br> Authorization Code is : <b>"+authc+"</b><br>Ethereum Address is :<b>"+account+"</b></div><div>"
            })
        })
    })
}
function result(){    
    contract.methods.Result().call().then((fs) => {
        var res = fs.split("\n");
        var i,text="";
        for (i = 0; i < res.length-1; i++) {
            var res2 = res[i].split("/");
            text+="<div class=\"row\"><div class=\"col-sm-2\">"+res2[0]+"</div><div class=\"col-sm-6\">"+res2[1]+"</div><div class=\"col-sm-2\">"+res2[2]+"</div></div>"
        } 
        document.getElementById("resultcandidatelist").innerHTML = text;
    })
    web3.eth.getAccounts().then((f) => {
        account = f[0];
        contract.methods.populateWinnerList().send({from: account,gas:10000000}).then((f) => { 
            contract.methods.getWinnerName().call().then((fs) => {
                var name = fs
                var res = fs.split("\n");
                var i,text="";
                for (i = 1; i < res.length; i++) {
                    text += "<p class=\"btn btn-success btn-round disabled\" style=\"color:black;font-style:italic;margin:3px;padding:2px;font-size:16px;display:block;width:100%;\" >"+i+" : " +res[i]+"</p>";
                } 
                contract.methods.getWinnerCount().call().then((fs) => {
                    document.getElementById("winnercandidatelist").innerHTML = text
                    document.getElementById("winheader").innerHTML = "Election Winners ( Number of Votes = "+fs+" )";
                })
            })
        })
    })
}
function loadlist(form) {                        
    contract.methods.getCandidateList().call().then((fs) => {
        var res = fs.split("\n");
        var i,text="";
        for (i = 0; i < res.length-1; i++) {
            text += "<p class=\"btn btn-success btn-round disabled\" style=\"color:black;font-style:italic;margin:3px;padding:2px;font-size:16px;display:block;width:100%;\" >"+(i+1)+" : " +res[i]+"</p>";
        } 
        document.getElementById("candidatelist").innerHTML = text;
    })
    
}
function voteform(form) { 
    var auth = form.authinput.value;
    var cid = form.cidinput.value;
    var accnum = parseInt(form.accinput.value);
    web3.eth.getAccounts().then((f) => {
        account = f[accnum];
        contract.methods.vote(auth,parseInt(cid,10)).send({from: account,gas:10000000}).then((f) => {            
            contract.methods.errorMess().call().then((fs) => {
                document.getElementById("returncode").innerHTML = "<div class=\"alert alert-success\" style=\"padding:5px\"><div class=\"container\"><div class=\"alert-icon\"><i class=\"material-icons\"\>check</i></div><b>"+fs+"</b><br></div><div>"
            })
        })
    })
}

