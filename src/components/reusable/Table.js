import { setWatchList } from "../../redux/rickMortySlice"
import { useDispatch } from 'react-redux'

export const Table = ({
  col1,
  col2,
  col3,
  col4,
  col5,
  display,
  status,
  error,
  mapProps,
  dataArr, 
  className
}) => {

  const dispatch = useDispatch()


  const removeHandler = (e) => {
    localStorage.removeItem(e.currentTarget.id)
    if (localStorage.length) {
      let arr = []
      for (let i = 0; i < localStorage.length; i++) {
        let obj = JSON.parse(localStorage.getItem(localStorage.key(i)))
        arr.push(obj)
      }
      dispatch(setWatchList(arr))
    } else {
      dispatch(setWatchList(null))
    }
  }

  const checkToggler = (e) => {
    let targetObj = JSON.parse(localStorage[e.currentTarget.id])
    targetObj.checked = !targetObj.checked
    localStorage[e.currentTarget.id] = JSON.stringify(targetObj)
    let arr = []
    for (let i = 0; i < localStorage.length; i++) {
      let obj = JSON.parse(localStorage.getItem(localStorage.key(i)))
      arr.push(obj)
    }
    dispatch(setWatchList(arr))
  }

  const Checkbox = ({ checked, id }) => {
    return (
      <div className="form-check">
        <input onChange={checkToggler} className="form-check-input" type="checkbox" value="" id={id} checked={checked} />
        <label className="form-check-label" htmlFor="flexCheckDefault">
          Done
        </label>
      </div>
    )
  }
    

  

  const displayedWithProps =
    <>
      {
        status === 'loading' ?
        <tr>
          <th scope="row">#</th>
          <td>Loading...</td>
          <td>Loading...</td>
          <td>Loading...</td>
        </tr> :
        status === 'succeeded' && display.results ?
        display.results.map((item, i) => 
        <tr key={item.id} >
          <th scope="row">{i + 1}</th>
          <td>{item[mapProps.one]}</td>
          <td>{item[mapProps.two]}</td>
          <td>{item[mapProps.three]}</td>
          {
            mapProps.four ? 
            <td>{mapProps.four}</td> :
            null
          }
        </tr> 
        ) :
        status === 'succeeded' && display.error ?
        <tr>
          <th scope="row">#</th>
          <td>Oh no!</td>
          <td>looks like</td>
          <td>{display.error.toLowerCase()}</td>
        </tr> :
        status === 'failed' && error ?
        <tr>
          <th scope="row">#</th>
          <td>Oh no!</td>
          <td>looks like</td>
          <td>{error}</td>
        </tr> :
        null
      }
    </>

  const displayedWithoutProps = 
    <>
      { 
        dataArr ?
        dataArr.map((item, i) => 
          <tr key={item.id} >
            <th scope="row">{i + 1}</th>
            <td>{item[mapProps.one]}</td>
            <td>{item[mapProps.two]}</td>
            <td>{item[mapProps.three]}</td> 
            <td onClick={removeHandler} id={item.id} className='clicker'>{mapProps.four}</td> 
            <td><Checkbox checked={item.checked} id={item.id}/></td>    
          </tr>  
        ) :
        null
      }
    </>
  

  return (
    <>
    <table className={className}>
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">{col1}</th>
          <th scope="col">{col2}</th>
          <th scope="col">{col3}</th>
          {
            col4 ?
            <th scope="col">{col4}</th> :
            null
          }
          {
            col5 ?
            <th scope="col">{col5}</th> :
            null
          }
        </tr>
      </thead>
      <tbody>
      {
        dataArr === undefined ?
        displayedWithProps :
        displayedWithoutProps
      }
      </tbody>
    </table>
    </>
  )
}