document.getElementById("novoContato").addEventListener("click",novoContato);
document.getElementById("listaContatos").addEventListener("click",listarContatos);

function novoContato(){
	document.getElementById("principal").style.display = "none";
	document.getElementById("novo").style.display = "block";
	document.getElementById("salvar").addEventListener("click",criarContato);
}

function criarContato(){
	var nome = document.querySelector("#nome");
	var fone = document.querySelector("#fone");
	var nomeTxt = ( nome.value != '') ? nome.value : "Usuario Teste";
	var foneTxt = ( fone.value != '') ? fone.value : "917-555-5432";

	var novoContato = navigator.contacts.create({"displayName": nomeText});
	var telefones = [];
	telefones[1] = new ContactField('mobile', foneTxt, true);
	novoContato.phoneNumbers = telefones;
	novoContato.save(ok, erro);

	function ok(){
		alert("Contato Salvo!");
		nome.value = "";
		fone.value = "";
		listarContatos();
	}

	function erro(message){
		alert('falha: ' + message);
	}
}

function listarContatos(){
	document.getElementById("principal").style.display = "block";
	document.getElementById("novo").style.display = "none";

	var options = new ContactFindOptions();
	options.filter = "";
	options.multiple = true;

	fields = ["displayName", "phoneNumbers"];
	navigator.contacts.find(fields, sucesso, falha, options);

	contatoDiv = document.querySelector("#contato");
	contatoDiv.innerHTML = "";
	function sucesso(contacts){
		for (var i = 0; i < contacts.length; i++){
			contatoDiv.innerHTML += "<b>" + contacts[i].displayName + "</b> "
						+ contacts[i].phoneNumbers[0].value
						+ "  <button onclick='removerContato(\"" + contacts[i].displayName + "\");'>Remover</button>"
						+ "<br/>";
		}
	}
	
	function falha(message){
		alert('Falha: ' + message);
	}
}

function removerContato(nome){
	var options = new ContactFindOptions();
	options.filter = nome;
	options.multiple = false;
	fields = ["displayName"];

	navigator.contacts.find(fields, buscarContatoOk, buscarContatoErro, options);

	function buscarContatoOk(contacts){
		var contact = contacts[0];
		contact.remove(removerContatoOk, removerContatoErro);

		function removerContatoOk(contact){
			alert("Contato excluido!");
			listarContatos();
		}

		function removerContatoErro(message){
			alert('Falha: ' + message);
		}
	}

	function buscarContatoErro(message){
		alert('Falha: ' + message);
	}
}

function listarContatosDup(){
	document.getElementById("principal").style.display = "block";
	document.getElementById("novo").style.display = "none";

	var cont = 0;
	var options = new ContactFindOptions();
	options.filter = "";
	options.multiple = true;

	fields = ["displayName", "phoneNumbers"];
	navigator.contacts.find(fields, sucesso, falha, options);

	contatoDiv = document.querySelector("#contato");
	contatoDiv.innerHTML = "";
	function sucesso(contacts){
		for (var i = 0; i < contacts.length; i++){
			cont = 0;
			for (var j = 0; j < contacts.length; j++){
				if (contacts[i].displayName == contacts[j].displayName){
					cont++;
				}
			}
			if (cont > 1){
				contatoDiv.innerHTML += "<b>" + contacts[i].displayName + "</b>  "
							+ contacts[i].phoneNumbers[0].value
							+ "  <button onclick='removerContato(\"" + contacts[i].displayName + "\");'>Remover</button>
							+ "<br/>";
			}
		}
	}

	function falha(message){
		alert('Falha: ' + message;
	}
}
