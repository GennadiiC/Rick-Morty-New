import { FilterForm } from "./FilterForm"
import { useDispatch } from 'react-redux'
import { flipPage } from "../../redux/rickMortySlice"

export const PaginationFilter = ({ 
  filterparams, 
  filter, 
  display, 
  status, 
  error, 
  asyncFuncAll, 
  asyncFuncLocal, 
  name, 
  title,
  keyword,
  pageQuantity,
  page 
}) => {


  const dispatch = useDispatch()

  return (
    <>
      <h3 className='h3 text-center my-4'>{title}</h3>
      <p className="my-3 text-center">Flip through the pages... each page displays 20 {keyword}.</p>
      <p className="text-center">Filter by:</p>
      {
        filter !== '' ?
        <p className="text-center">{filter[0].toUpperCase() + filter.slice(1)} - "{name}"</p> :
        name === '' ?
        <p className="text-center">(Choose filter parameters)</p> :
        null
      }
      <div className="d-flex flex-column flex-lg-row justify-content-center">
      {
        filterparams.map((item, i) => 
          <FilterForm 
            key={i}
            filter={item}
            display={display}
            status={status}
            error={error}
            asyncFuncAll={asyncFuncAll}
            asyncFuncLocal={asyncFuncLocal}
          />
        )
      } 
      </div>
      <div className="d-flex justify-content-between input-group input-group-sm my-4">
        <button className={page === 1 ? "btn disabled" : "btn"} onClick={() => dispatch(flipPage({delta: -1, keyword}))}>Prev: {page === 1 ? 'no' : page - 1}</button>
        <span className="sm my-auto mx-auto">Page {page}</span>
        <button className={page === pageQuantity ? "btn disabled" : "btn"} onClick={() => dispatch(flipPage({delta: +1, keyword}))}>Next: {page === pageQuantity ? 'no' : page + 1}</button>
      </div>
    </>
  )
}