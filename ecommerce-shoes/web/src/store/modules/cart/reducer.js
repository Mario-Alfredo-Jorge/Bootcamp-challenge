import produce from 'immer';

export default function cart(state = [], action){
    console.log(state);

    switch(action.type){
        case '@cart/ADD_SUCCESS':
            return produce(state, draft => {
                const { product } = action;
                draft.push(product);
            })

            case '@cart/REMOVE':
                return produce(state, draft => {
                    const index = draft.findIndex(p => p.id === action.id);

                    if(index >= 0)
                        draft.splice(index, 1);
                })

            case '@cart/UPDATE_AMOUNT': {
                if(action.amount <= 0){
                    return state;
                }

                return produce(state, draft => {
                    const index = draft.findIndex(p => p.id === action.id);

                    if(index >= 0)
                        draft[index].amount = Number(action.amount);
                })
            }
        default:
            return state;
    }
}

/*
Como todos os reducer sao activados pelo dispatch,
entao estou dizendo que este reducer so vai executar uma actionse ele,
for exatamente do mesmo tipo que eu estou infomando,
caso contrario ele retornara o state, que armazena o estado anterior a action.
*/
