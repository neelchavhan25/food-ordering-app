import Image from "next/image";
import toast from "react-hot-toast";

export default function EditableImage({link,setLink}){

    async function handleFileChange(ev) {
        const files = ev.target.files;
        if (files?.length === 1) {
          const data = new FormData;
          data.set('file', files[0]);
    
          const uploadPromise = fetch('/api/upload', {
            method: 'POST',
            body: data,
          }).then(response => {
            if (response.ok) {
              return response.json().then(link => {
                setLink(link);
              })
            }
            throw new Error('Something went wrong');
          });
    
          await toast.promise(uploadPromise, {
            loading: 'Uploading...',
            success: 'Upload complete',
            error: 'Upload error',
          });
        }
      }
    return(
        <>
            {link && (
                <Image className=" rounded-lg" src={link} width={80}
                height={80} alt="avatar" />
            )}
            {!link && (
                <div className="bg-gray-200 text-center p-4 text-gray-500 rounded-lg mb-1">
                    No Image
                </div>
            )}
            
            <label>
                <input type="file" className=" hidden" onChange={handleFileChange} />
                <span className="border p-1 mt-1 rounded-lg flex items-center justify-center gap-2 cursor-pointer">
                    <h1>Edit</h1>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                    </svg>
                </span>
            </label> 
        </>
    )
}