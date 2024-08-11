export default function MenuItemTile({onAddToCart,...item}){
    const {image,description,name,basePrice}=item;
    return(
        <div className="bg-gray-200 p-4 rounded-lg text-center hover:bg-white hover:shadow-md hover:shadow-black/25 transition-all flex flex-col justify-between">
               <div className="text-center">
               <img className="max-h-auto max-w-28 block mx-auto" src={image} alt="pizza" />
               </div>
               <h4 className="font-semibold my-3 text-xl">{name}</h4>
               <p className="text-gray-500 text-sm max-h-16  line-clamp-3">
                  {description}
               </p>
               <button 
                  onClick={onAddToCart} 
                  className="mt-4 bg-primary text-white rounded-full px-9 py-2">
                  Add to cart ${basePrice}
               </button>
          </div>
    )
}