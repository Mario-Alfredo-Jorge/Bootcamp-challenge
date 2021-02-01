import { call, put, all, takeLatest, select} from 'redux-saga/effects'

import api from  '../../../services/api';
import { addToCartSUCCESS, updateAmount } from './action';
import { formatPrice } from '../../../lib/uteis'
import { toast } from 'react-toastify'

function* addToCart({ id }){

    const productExist = yield select(state => state.cart.find(p => p.id === id));

    const stock = yield call(api.get, `/stock/${id}`);
    console.tron.log(stock.data)
    const stockAmount = stock.data.amount;

    const currentAmount = productExist ? productExist.amount : 0;

    const amount = currentAmount + 1;

    if(amount > stockAmount){
        toast.warn('Quantidade solicitada, fora do stock')
        return ;
    }


    if(productExist){
        const amount = productExist.amount + 1;
        yield put(updateAmount(id, amount));
    }
    else {
        const response = yield call(api.get, `products/${id}`);

        const data = {
            ...response.data,
            amount: 1,
            formatedprice: formatPrice(response.data.price),
        }
        yield put(addToCartSUCCESS(data));
    }
}

export default all([takeLatest('@cart/ADD_REQUEST', addToCart)])
