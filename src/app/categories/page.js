'use client'
import { useEffect, useState } from "react"
import UserTabs from "../../component/layout/UserTabs" 
import {useProfile} from "../../component/UseProfile"
import DeleteButton from "../../component/DeleteButton"
import toast from "react-hot-toast" 

export default function CategoriesPage(){
   
    const [categoryName,setCategoryName]=useState('');
    const [categories,setCategories]=useState([]);
    const {loading:profileLoading ,data:profileData} = useProfile();
    const [editedCategory,setEditedCategory]=useState(null);

    useEffect(()=>{
        fetchCategories();
    },[])
    function fetchCategories(){
        fetch('/api/categories').then(res=>{
            res.json().then(categories=>{
               setCategories(categories)     
            })
        })
    }
    async function handleCategorySubmit(ev){
        ev.preventDefault();
        const creationPromise=new Promise(async (resolve,reject)=>{
            const data={name:categoryName};
            if(editedCategory){
                data._id=editedCategory._id;
            }
            const response =await fetch('/api/categories',{
                method: editedCategory ? 'PUT':'POST',
                headers:{'Content-Type': 'application/json'},
                body : JSON.stringify(data),
            });
            setCategoryName('');
            fetchCategories();
            setEditedCategory(null);
            if(response.ok){
                resolve();
            }
            else{
                reject();
            }
        }) 
       await toast.promise(creationPromise,{
            loading:editedCategory?'Updating Category...':'Creating new category',
            success:editedCategory?'Category Updated':'Category created',
            error:"Error..."
        })
    }

    async function handleDeleteClick(_id){
        const promise=new Promise(async(resolve,reject)=>{
            const response=await fetch('/api/categories?_id='+_id,{
                method:'DELETE',
            })
            if(response.ok){
                resolve();
            }
            else{
                reject();
            }
        })
        await toast.promise(promise,{
            loading:'Deleting...',
            success:'Deleted',
            error:'Error',
        })
        fetchCategories(); 
    }

    if(profileLoading){
        return 'Loading user info...'
    }
    if(!profileData.admin){
        return 'Not an Admin';
    }
    return (
        <section className="mt-8 max-w-xl mx-auto">
        
            <UserTabs isAdmin={true}/> 
            <form className="mt-8" onSubmit={handleCategorySubmit}> 
                <div className="flex gap-2 items-end">
                    <div className="grow">
                        <label>{editedCategory ? 'Update category' : 'New Category Name'}</label>
                        <input type="text"
                          value={categoryName} 
                          onChange={ev=>setCategoryName(ev.target.value)}
                         />
                    </div>
                    <div className="pb-2 flex gap-2">
                        <button className="border" type="submit">
                            {editedCategory ? 'Update' : 'Create'}
                        </button>
                        <button type="button" onClick={()=>{
                            setEditedCategory(null);
                            setCategoryName('')
                        }}>
                            Cancel</button>
                    </div>
                </div>
             
            </form>
            <div>
                <h2 className="mt-8 text-sm text-gray-500">Existing Category</h2>
                {categories?.length>0 && categories.map(c=>(
                    <div 
                      className="bg-gray-100 flex rounded-xl p-2 px-4 mb-2 gap-1 items-center"> 
                        <div
                        className="grow " >
                        {c.name}</div>
                        <div className="flex gap-1">
                            <button type="button"
                                onClick={() => {
                                    setCategoryName(c.name)
                                    setEditedCategory(c)
                                }}>
                                Edit
                            </button>
                         <DeleteButton label={'Delete'} onDelete={()=>handleDeleteClick(c._id)}/>
                        </div> 
                    </div>
                ))}
            </div>
        </section>
    )
}