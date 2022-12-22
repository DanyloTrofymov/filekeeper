import fs from 'fs'
import { File } from '../../models/File';
import { ERRORS, HttpError } from '../../utils/error';

export async function createDirService(file: File){
    const StoragePath = process.env.STORAGE_PATH
    if(!StoragePath){
        throw new HttpError(
            500,
            'Enviromental variables error',
            ERRORS.INTERNAL_ERROR,
        );
    }

    const userPath = `${StoragePath}\\${file.user}\\${file.path}`

    fs.access(userPath, err => {
        if(!err){
        throw new HttpError(
            403,
            `File ${file.name} exists`,
            ERRORS.FILE_EXISTS,
        );
      }})


    let isCreated = false;
                fs.mkdir(userPath, {recursive: true}, (err) =>{
                    err? isCreated = false : isCreated = true;
                })
                if(!isCreated){
                    throw new HttpError(
                        500,
                        `Internal server error. Try again or contact the administrator.`,
                        ERRORS.FILE_EXISTS,
                    );
                }
                return
            }

    /*rreturn new Promise((resolve, reject) => {
        try{
            if(!fs.existsSync(userPath)){
                fs.mkdirSync(userPath, {recursive: true})
                return resolve({message: 'File was created'})
            } else{
                console.log('File exists')
                return reject({status: 400, message: 'File exists'})
            }
        }catch(e){
            console.log('File error')
            return reject({status: 500, message: 'File error'})
        }
    })
*/

