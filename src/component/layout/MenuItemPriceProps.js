import { useState } from "react";
import Trash from "@/component/icons/Trash"
import Up from "@/component/icons/Up"
import Down from "@/component/icons/Down"
export default function MenuItePriceProps({name,addLabel,props,setProps}){ 

  const [isOpen ,setIsOpen]=useState(false);

    function addProp(){
        setProps(oldProps=>{
          return [...oldProps,{name:'',price:0}];
        })
      }
  
      function editProp(ev,index,prop){
        const newValue=ev.target.value;
        setProps(prevSizes=>{
          const newSizes=[...prevSizes];
          newSizes[index][prop]=newValue;
          return newSizes;
        })
      }
  
      function removeProp(index){
        setProps(prev=>prev.filter((v,i)=>i!==index))
      }

    return(
        <div className="bg-gray-300 p-2 rounded-md mb-2 "> 
          <button type="button" onClick={()=> setIsOpen(prev=> !prev)}
            className=" inline-flex p-1 justify-start gap-2">

          {isOpen && (
            <Up/>
          )}
            {!isOpen && (
              <Down/>
            )}
            <span>{name}</span>
            <span>({props?.length})</span>
          </button>
          <div className={isOpen ?'block':'hidden'}>
          {props?.length > 0 && props.map((size, index) => (
            <div key={index} className="flex gap-2 items-end">
              <div>
                <label>Name</label>
                <input type="text" placeholder="Size name"
                  value={size.name}
                  onChange={ev => editProp(ev, index, 'name')}
                />
              </div>
              <div>
                <label>Extra Price</label>
                <input type="text" placeholder="Extra Price"
                  value={size.price}
                  onChange={ev => editProp(ev, index, 'price')}
                />
              </div>
              <div>
                <button
                  type="button"
                  onClick={() => removeProp(index)}
                  className="bg-white mb-2 px-2">
                  <Trash />
                </button>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={addProp}
            className="bg-white">{addLabel}</button>
        </div>
      </div>  
        
    )
}