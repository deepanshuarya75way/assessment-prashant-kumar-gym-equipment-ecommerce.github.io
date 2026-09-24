import React, { useState } from 'react'
import { FiShoppingCart, FiArrowLeft } from 'react-icons/fi'
import { useParams, useNavigate } from 'react-router-dom'
import { getImgUrl } from '../../utils/getImgUrl'
import { useDispatch } from 'react-redux'
import { addToCart } from '../../redux/features/cart/cartSlice'
import { useFetchProductByIdQuery } from '../../redux/features/products/productsApi'
import {useDiscount} from '../../context/DiscountContext'

const SingleProduct = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { data: product, isLoading, isError } = useFetchProductByIdQuery(id)
  const dispatch = useDispatch()
  const { getDiscountedPrice } = useDiscount();

  const handleAddToCart = (item) =>{ dispatch(addToCart(item))}

  const [mainImage, setMainImage] = useState(null)

  const productImages = [
    getImgUrl(product?.coverImage),
    'https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg',
    'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg',
    'https://images.pexels.com/photos/1954524/pexels-photo-1954524.jpeg'
  ]

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-4">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-700 hover:text-gray-900">
          <FiArrowLeft /> Back
        </button>
      </div>

      {isLoading ? (
        <div className="py-20 text-center">Loading...</div>
      ) : isError ? (
        <div className="py-20 text-center text-red-500">Error happened while loading product info</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="flex flex-col items-center">
            <div className="bg-gray-100 p-4 rounded-lg w-full flex items-center justify-center mb-6">
              <img src={mainImage || productImages[0]} alt={product?.title || product?.tittle || 'Product'} className="max-h-[450px] object-contain" />
            </div>

            <div className="flex gap-4 flex-wrap justify-center">
              {productImages.slice(0, 4).map((img, index) => (
                <div
                  key={index}
                  className={`p-2 bg-gray-100 rounded-lg border cursor-pointer transition hover:scale-105 ${
                    (mainImage || productImages[0]) === img ? 'ring-2 ring-yellow-500' : ''
                  }`}
                  onClick={() => setMainImage(img)}
                >
                  <img src={img} alt={`thumb-${index}`} className="w-20 h-20 object-cover rounded-md" />
                </div>
              ))}
            </div>
          </div>

          <div className="p-4">
            <h1 className="text-3xl font-bold mb-4">{product?.title || product?.tittle || 'Untitled'}</h1>
            <p className="text-gray-700 mb-2">
              <strong>Published:</strong> {new Date(product?.createdAt).toLocaleDateString()}
            </p>
            <p className="text-gray-700 mb-2 capitalize">
              <strong>Category:</strong> {product?.category}
            </p>
            <p className="text-gray-700 mb-4">
              <strong>Description:</strong> {product?.description || ''}
            </p>

            <div className="mb-4">
              <div className="flex items-baseline gap-3">
                <div className="text-2xl font-bold text-gray-900">${ getDiscountedPrice(Number(product?.newPrice || 0).toFixed(2))}</div>
                {getDiscountedPrice(Number(product?.newPrice || 0))< Number(product?.newPrice || 0) && (
                   <div className="text-sm text-gray-500 line-through">${Number(product?.newPrice).toFixed(2)}</div>
                    )}

                {product?.oldPrice && !getDiscountedPrice(Number(product?.newPrice ||0))<Number (product?.newPrice ||0) ? 
                <div className="text-sm text-gray-500 line-through">
${Number(product?.oldPrice).toFixed(2) } </div> : null}
                     {product?.oldPrice  && product?.newPrice ?(
                  <div className="text-sm text-green-600 font-medium">
                    {Math.round(((Number(product.oldPrice) - getDiscountedPrice(Number(product.newPrice))) / Number(product.oldPrice)) * 100)}% off
                  </div>
                ) : null}
              </div>
            </div>

            <button onClick={() => handleAddToCart(product)} className="bg-yellow-400 text-black font-semibold px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-yellow-500 transition">
              <FiShoppingCart />
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default SingleProduct
