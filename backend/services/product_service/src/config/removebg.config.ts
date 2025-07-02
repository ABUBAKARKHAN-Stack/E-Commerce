import { ApiError } from '../utils';
import fs from 'fs'
import axios from 'axios';


import FormData from 'form-data';

export const removeBg = async (filePath: string) => {
    try {
        const formData = new FormData();
        formData.append('image_file', fs.createReadStream(filePath));
        const response = await axios.post('https://clipdrop-api.co/remove-background/v1', formData, {
            headers: {
                'x-api-key': 'f014538cb126544afe94d8cd97c2097df073c2429b28bdef98fff72b38dca94ddaa8547ca2e4741bff2876d904ebe731',
                ...formData.getHeaders(), 
            },
            responseType: 'arraybuffer' 
        });

        console.log(response.data,'res');
        
        return response.data; 
    } catch (error) {
        console.error('Background removal failed:', error);
        throw new ApiError(500,'error',error);
    }
};