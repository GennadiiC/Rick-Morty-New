import { getAllLocationsAsync, getLocationsAsync, setLocationFilter } from "../redux/rickMortySlice"
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { PaginationFilter } from "./reusable/PaginationFilter"
import { Table } from './reusable/Table'


// component to display on 'Locations' link
export const Locations = () => {

  const filterparams = ['name', 'type', 'dimension']
  const title = 'Browse locations'
  const keyword = 'locations'

  const {
    displayLocations,
    displayAllLocations,
    locationsStatus,
    allLocationsStatus,
    locationsError,
    allLocationsError, 
    filters, 
    locationsPage 
  } = useSelector(state => state.rickMorty)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getLocationsAsync({
      query: 'location', 
      page: locationsPage, 
      filter: filters.locationFilter.filter,
      name: filters.locationFilter.name
    }))
  },[dispatch, locationsPage, filters.locationFilter.filter, filters.locationFilter.name])

  return (
    <div className="container-fluid mt-5 custom-width">
      
      <PaginationFilter 
        filterparams={filterparams}
        filter={filters.locationFilter.filter}
        display={displayAllLocations}
        status={allLocationsStatus}
        error={allLocationsError}
        asyncFuncAll={getAllLocationsAsync}
        asyncFuncLocal={setLocationFilter}
        name={filters.locationFilter.name}
        title={title}
        keyword={keyword}
        pageQuantity={
          locationsStatus === 'succeeded' && displayLocations.info ? 
          displayLocations.info.pages : 
          null
        }
        page={locationsPage}
      />
      
      <Table 
        className={'table'}
        col1={'Name'}
        col2={'Type'}
        col3={'Dimension'}
        display={displayLocations}
        status={locationsStatus}
        error={locationsError}
        mapProps={{
          one: 'name',
          two: 'type',
          three: 'dimension'
        }}
      />
    </div>
  )
}