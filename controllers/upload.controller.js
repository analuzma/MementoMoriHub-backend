const cloudinary = require("cloudinary")

exports.uploadProcess = async (req,res,next)=>{

    const uploads = (file,folder) => {
        return new Promise( resolve => {
            cloudinary.uploader.upload(file,(result)=>{
                resolve({
                  url: result.url,
                  id: result.original_filename
                },{
                    resource_type:"auto",
                    folder
                })
            })
        })
    };

const uploader = async ( path ) => uploads(path,"images")

    if(req.method === "POST"){
        const urls = [];
        const files = req.files;

        if(!req.file){ 
            for(const file  of files ){
                const {path} = file
                const newPath =  await uploader(path)
                urls.push({uri:newPath.url, id:newPath.id, name:file.originalname })
            }

            res.status(200).json({urls,successMessage:"Saved images"})
        }else{
            const {path} = req.file
            const newPath =  await uploader(path)
            const url = {uri:newPath.url, id:newPath.id, name:req.file.originalname }
            res.status(200).json({url,successMessage:"Saved image"})
        }
    }else{
        res.status(400).json({errorMessage:`${req.method} no permitido!`})

    }
}


exports.deleteImage = (req,res,next)=>{
    const {name} = req.params

   cloudinary.v2.uploader.destroy(`mementoMori-images/${name}`, (error,result)=>{
     if(error){
        return res.status(400).json({errorMessage:"Something happened while attempting to delete", error})
     }

     res.status(200).json({successMessage:`File ${name} deleted`})
   }) 
}