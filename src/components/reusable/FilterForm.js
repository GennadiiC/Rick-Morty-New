import { useForm } from "react-hook-form"
import { useEffect } from "react"
import { useDispatch } from "react-redux"

export const FilterForm = ({ filter, display, status, error, asyncFuncAll, asyncFuncLocal }) => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(asyncFuncAll())
  }, [dispatch, asyncFuncAll])

  const clearDuplicates = (array) => {
    let sorted = new Set(array)
    const sortedArr = []
    for (let value of sorted) sortedArr.push(value)
    return sortedArr
  }

  const {
    register, 
    handleSubmit,
    reset
  } = useForm()

  const onSubmit = (data) => {
    dispatch(asyncFuncLocal({ filter, name: data[filter] }))
    reset()
  }


  return (
    <form className="input-group input-group-sm my-3" onSubmit={handleSubmit(onSubmit)}>
      <select className="form-control" {...register(filter)} >
        <option label={`select ${filter}`}></option>
        { 
          status === 'loading' ?
          <option label='loading'>Loading...</option> :
          status === 'succeeded' && display ?
          clearDuplicates(display.map(item => item[filter]))
            .map((item, i) => 
              <option key={i} label={item}>{item}</option>
            ) :
          status === 'failed' && error ?
          <option label='error'>Oops, {error}</option> :
          null
        }
      </select>
      <button
        className="btn" 
        type='submit'
      >
        {filter[0].toUpperCase() + filter.slice(1)}
      </button>
    </form>
  )
}