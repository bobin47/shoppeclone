import AsideFilter from './components/AsideFilter'
import SortProductList from './components/SortProductList'
import Product from './components/Product'
import { useQuery } from '@tanstack/react-query'
import productApi from '../../api/product.api'
import categoryApi from '../../api/category.api'
import { ProductListConfig } from '../../types/product.type'
import Paginate from '../../components/Pagination/Pagination'
import useQueryConfig from '../../hooks/useQueryConfig'

export default function ProductList() {
  const queryConfig = useQueryConfig()

  const { data: products, isLoading } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => productApi.getProducts(queryConfig as ProductListConfig),
    keepPreviousData: true
  })

  const { data: categoriesData } = useQuery({
    queryKey: ['categories'],
    queryFn: () => {
      return categoryApi.getCategories()
    },
    keepPreviousData: true
  })

  return (
    <div className='bg-gray-200 py-6'>
      <div className='container'>
        <div className='grid grid-cols-12 gap-6'>
          <div className='col-span-3'>
            {categoriesData && <AsideFilter queryConfig={queryConfig} categories={categoriesData?.data.data} />}
          </div>
          {products && (
            <div className='col-span-9'>
              <SortProductList pageSize={10} queryConfig={queryConfig} />
              {isLoading ? (
                <div>loading</div>
              ) : (
                <div className='mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
                  {products.data.data.products.map((product) => (
                    <div className='col-span-1' key={product._id}>
                      <Product product={product} />
                    </div>
                  ))}
                </div>
              )}
              <Paginate queryConfig={queryConfig} pageSize={products.data.data.pagination.page_size} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
