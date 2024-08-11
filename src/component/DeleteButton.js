import { useState } from "react"

export default function DeleteButton({label,onDelete}){
    const [showConfirm,setShowConfirm]=useState(false);

    if(showConfirm){
        return(
            <div className="fixed bg-black/50 inset-0 flex h-full justify-center items-center h-full ">
               <div className=" bg-white p-4 rounded-lg">
                <div>Are you Sure ?</div>
                <div className="flex gap-2">
                    <button type="button" onClick={() => setShowConfirm(false)}>
                        Cancel
                    </button>
                    <button type="button" className="primary"
                        onClick={()=>{
                            onDelete();
                            setShowConfirm(false);
                        }}>
                        Yes,&nbsp;Delete!
                    </button>
                </div>
               </div> 
            </div>
           
        )
    }
    return(
        <button type="button" onClick={()=> setShowConfirm(true)}>
            {label}
        </button>
    )
}