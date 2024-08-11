import {useState } from "react";
import EditableImage from "@/component/layout/EditableImage"
import { useProfile } from "../UseProfile";
import AddressIputs from "./AddressInputs";


export default function UserForm({user,onSave}){
    
    const [userName,setUserName]=useState(user?.name || '') ;
    const [image, setImage] = useState(user?.image || '');
    const [phone,setPhone]=useState(user?.phone || '');
    const [streetAddress,setStreetAddress]=useState(user?.streetAddress || '');
    const [postalCode,setPostalCode]=useState(user?.postalCode || '');
    const [city,setCity]=useState(user?.city || '');
    const [country,setCountry]=useState(user?.country || '');
    const [admin,setAdmin]=useState(user?.admin || false); 
    const {data:loggedInUserData}=useProfile();

    function handleAddressChange(propName,value){
        if(propName === 'city')setCity(value);
        if(propName === 'country')setCountry(value);
        if(propName === 'phone')setPhone(value);
        if(propName === 'streetAddress')setStreetAddress(value);
        if(propName === 'postalCode')setPostalCode(value);
    }

    return(
    
        <div className="flex gap-2  ">
                    <div>
                        <div className="flex flex-col bg-gray-0 p-2 rounded-xl items-center">
                            <EditableImage link={image} setLink={setImage} />
                        </div>
                    </div>

                    <form 
                        className="grow" 
                        onSubmit={ev=>
                            onSave(ev,{name:userName,phone,streetAddress,postalCode,city,country,admin})
                        }>
                        <label> First & Last Name</label>
                        <input type="text" placeholder="first and last name" 
                            value={userName} onChange={ev=>setUserName(ev.target.value)} />
                            <label> Email</label>
                        <input type="email" disabled={true} value={user.email} />
                        <AddressIputs addressProps={{
                            phone,streetAddress,postalCode,city,country}} 
                             setAddressProps={handleAddressChange} 
                            />
                        {loggedInUserData.admin && (
                            <div> 
                            <label className="p-1 px-2 inline-flex items-center gap-2 mb-2 text-lg" 
                             htmlFor="adminCb">
                             <input id="adminCb" type="checkbox" 
                               className="mr-2" value={'1'}
                                checked={admin}
                                onClick={ev=> setAdmin(ev.target.checked)}
                               />
                             <span>Admin</span>
                            </label>
                        </div>
                        )} 
                        <button type="submit">Save</button>
                    </form>
                </div>
    )
}
