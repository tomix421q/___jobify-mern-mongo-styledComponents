function FormRowSelect({ name, labelText, list, defaultValue = '', onChange }) {
  return (
    <div className='form-row'>
      <label htmlFor='jobStatus' className='form-label'>
        {labelText || name}
      </label>
      <select name={name} id={name} className='form-select' defaultValue={defaultValue} onChange={onChange}>
        {list.map((value, index) => {
          return (
            <option value={value} key={index}>
              {value}
            </option>
          )
        })}
      </select>
    </div>
  )
}
export default FormRowSelect
