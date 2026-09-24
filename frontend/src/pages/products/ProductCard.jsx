import React from 'react'
import {FiShoppingCart} from 'react-icons/fi'
import { getImgUrl } from '../../utils/getImgUrl'

import { Link } from'react-router-dom'
import { useDispatch } from 'react-redux'
import { addToCart } from '../../redux/features/cart/cartSlice'
import {useDiscount} from '../../context/DiscountContext'



const ProductCard = ({product}) => {
  const dispatch = useDispatch();
  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
  }
  const{getdiscountedPrice} = useDisount();

  const imageSrc = React.useMemo(() => {
    const img = product?.coverImage || ''
    if (!img) return ''
    if (typeof img === 'string' && (img.startsWith('http://') || img.startsWith('https://') || img.startsWith('/')) ) {
      return img
    }
    try {
      return getImgUrl(img)
    } catch (e) {
      return img
    }
  }, [product])
  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 h-full flex flex-col">
      {/* Image Container */}
      <div className="h-48 md:h-56 lg:h-64 w-full border-b rounded-t-lg overflow-hidden bg-gray-100">
        <Link to={`/products/${product._id}`} className="block w-full h-full">
          <img
            src={imageSrc}
            alt={product?.title || product?.tittle || ''}
            className="w-full h-full object-cover hover:scale-110 transition-transform duration-300 cursor-pointer"
          />
        </Link>
      </div>

      {/* Content Container */}
      <div className="p-4 flex-1 flex flex-col">
        <Link to={`/products/${product._id}`}>
          <h3 className="text-lg font-semibold hover:text-blue-600 mb-2 line-clamp-2 transition-colors duration-200">
            {product?.title || product?.tittle}
          </h3>
        </Link>

        <p className="text-sm text-gray-600 mb-4 line-clamp-2 flex-grow">
          {product?.description
            ? product.description.length > 50
              ? `${product.description.slice(0, 50)}...`
              : product.description
            : ''}
        </p>

        {/* Price Section */}
        <div className="mb-4 flex items-center gap-2">
          <p className="font-semibold text-lg text-indigo-600">
            ${getdiscountedPrice(product?.newPrice)}
            </p>
            {getdiscountedPrice(product?.newPrice)< product?.newPrice && (
              <span classname = " line-through text-gray-400 font-normal text-sm"> ${product?.newprice}</span>
            )}
            {product?.oldprice && getdiscountedPrice(product?.newPrice)<product?.newPrice && (
              <span className="line-through text-gray-500 font-normal text-sm ml-2">${product?.newPrice}</span>
            )}

          
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={() => handleAddToCart(product)}
          className="btn-primary w-full py-2 px-4 flex items-center justify-center gap-2 rounded hover:opacity-90 transition-opacity duration-200 font-semibold"
        >
          <FiShoppingCart className="text-lg" />
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  )
}

export default ProductCard
