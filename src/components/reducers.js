import { combineReducers } from 'redux';
const INITIAL_STATE = {
	services: '',
	amount: 0,
	nome: '',
	endereco: '',
	telefone: '',
	documento: '',
	hash: '',
	id: '',
	computador: 0,
	impressora: 0,
	rede: 0,
	especifico: 0
}

export default combineReducers({
	main: (state = INITIAL_STATE, action) => {
		if(action.type == 'addService'){
			if(action.computador == 1){
				return{						
					...state,
					services: state.services + action.services,
					amount: state.amount + action.amount,
					computador: state.computador + 1
				}
			}
			if(action.impressora == 1){
				return{						
					...state,
					services: state.services + action.services,
					amount: state.amount + action.amount,
					impressora: state.impressora + 1
				}
			}
			if(action.rede == 1){
				return{						
					...state,
					services: state.services + action.services,
					amount: state.amount + action.amount,
					rede: state.rede + 1
				}
			}
			if(action.especifico == 1){
				return{						
					...state,
					services: state.services + action.services,
					amount: state.amount + action.amount,
					especifico: state.especifico + 1
				}
			}
		}
		if(action.type == 'addCliente'){
			return{						
				...state,
				nome: action.nome,
				endereco: action.endereco,
				telefone: action.telefone,
				documento: action.documento,
				hash: action.hash,
			}
		}
		if(action.type == 'idOrdem'){
			return{						
				...state,
				id: action.id,
			}
		}
		if(action.type == 'initialState'){
			return{						
				services: '',
				amount: 0,
				nome: '',
				endereco: '',
				telefone: '',
				documento: '',
				hash: '',
				id: '',
				computador: 0,
				impressora: 0,
				rede: 0,
				especifico: 0
			}
		}
		return state;
	}
	
});