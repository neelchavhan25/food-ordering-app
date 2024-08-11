import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import uniqid from 'uniqid';

export async function POST(req){
    const data=await req.formData();
    console.log('naaaa',data);
    if(data.get('file')){
        console.log('we have a file',data.get('file'))
        const file=data.get('file');
        const s3Client=new S3Client({
            region:'eu-north-1',
            credentials:{
                accessKeyId:process.env.AWS_ACCESS_KEY,
                secretAccessKey:process.env.AWS_SECRET_KEY,
            },
        })
        const ext=file.name.split('.').slice(-1)[0];
        const newFileName=uniqid()+'.'+ext;

        const chunks =[];
        for await (const chunk of file.stream()){
            chunks.push(chunk);
        }
        const buffer=Buffer.concat(chunks);

        await s3Client.send(new PutObjectCommand({
            Bucket:'food-ordeing-app',
            Key:newFileName,
            ACL:'public-read',
            ContentType:file.type,
            Body:buffer
        }))     
        
        return Response.json('https://food-ordeing-app.s3.eu-north-1.amazonaws.com/'+newFileName);

    }
     return Response.json(true);
}