/* eslint-disable react-refresh/only-export-components */
import { ColumnFilterT, GlobalFilterT } from '@/types'
import { useState } from 'react'
import {  FilterTypes } from 'react-table'
import IUser from '@/interfaces'
// UI глобального фильтра
export const GlobalFilter: GlobalFilterT<IUser> = ({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter
}) => {
  // количество отфильтрованных строк
  const count = preGlobalFilteredRows?.length
  // локальное состояние значения фильтра
  const [value, setValue] = useState(globalFilter as string)
  // метод модификации значения фильтра
  const onChange = (value:string) => {
    setGlobalFilter?.(value || undefined)
    console.log(value)
  }

  return (
    <label>
      Search:{' '}
      <input
        type='text'
        value={value || ''}
        onChange={(e) => {
          setValue(e.target.value)
         
        }}
        placeholder={`${count} records...`}
      />
      <button onClick={()=> onChange(value)}>Найти</button>
    </label>
  )
}
export const DefaultColumnFilter: ColumnFilterT<IUser> = ({
    column: { filterValue, preFilteredRows, setFilter }
  }) => {
    const count = preFilteredRows.length
  
    return (
      <input
        type='text'
        value={filterValue || ''}
        onChange={(e) => {
          // установка фильтра в значение `undefined` приводит к удалению фильтра
          setFilter(e.target.value || undefined)
        }}
        placeholder={`${count} records...`}
      />
    )
  }
  export const filterTypes: FilterTypes<IUser> = {
    text: (rows, ids, filterVal) => {
      return rows.filter((row) => {
        return ids.some((id) => {
          const rowVal = String(row.values[id])
          return rowVal.toLowerCase().startsWith(String(filterVal).toLowerCase())
        })
      })
    }
  }