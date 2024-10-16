import { Api, ApiListResponse } from './api';
import { IItem } from '../../types/index'; 
import { API_URL } from '../../utils/constants';

const api = new Api(API_URL);

export async function fetchItems(): Promise<IItem[]> {
    try {
        const response = await api.get('/product/');
        return (response as ApiListResponse<IItem>).items; // Приведение ответа к типу ApiListResponse<IItem>
    } catch (error) {
        console.error('Ошибка при получении товаров:', error);
        throw error; 
    }
}
