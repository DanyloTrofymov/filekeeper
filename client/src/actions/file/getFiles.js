import axios from 'axios';
import { setFiles } from '../../reducers/file';

export function getFiles(dirId){
    return async (dispatch) =>{
        try{
            const params = dirId ? `?parent=${dirId}` : '';
            const URL = process.env.REACT_APP_API_URL + 'drive'+ params;
            const token = localStorage.getItem('token')
            const response = await axios.get(URL, {
                headers: {Authorization: `Bearer ${token}`}
            })
           dispatch(setFiles(response.data.data.files))

        }
        catch(e) {
            alert(e.response.data.message)
        }
    }
}
