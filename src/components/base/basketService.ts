import { Api, ApiListResponse } from './api';
import { IItem } from '../../types/index'; 
import { API_URL } from '../../utils/constants';

const api = new Api(API_URL);

export async function submit(data: any): Promise<string> {
    try {
        const response = await api.post('/order/', data);
        console.log('>>>', response)
        return (response as any).total;
    } catch (error) {
        console.error('Ошибка при сохранении заказа:', error);
        throw error; 
    }
}
