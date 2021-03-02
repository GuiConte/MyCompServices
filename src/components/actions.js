import firebase from 'firebase';

export const OrdemServ = (i) => {
	return{
		type: 'idOrdem',
		id: i
	}
}

export const Services = (serv,comp,imp,red,esp) => {
	let temp = '<p><h2>Item: ' + serv.equip
	temp += 'Serviços: <br/>' + serv.itens + '</h2></p>'
	return{
		type: 'addService',
		services: temp,
		amount: serv.price,
		computador: comp,
		impressora: imp,
		rede: red,
		especifico: esp
	}
}

export const Cliente = (cli) => {
	return{
		type: 'addCliente',
		nome: cli.nome,
		endereco: cli.endereco,
		telefone: cli.telefone,
		documento: cli.documento,
		hash: cli.hash
	}
}

export const initialState = () => {
	return{
		type: 'initialState'
	}
}