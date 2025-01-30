const InputPerson = ({ valueName, valuePhone, handleChangeName, handleChangePhone }) => {
  return (
    <div>
      {/* name input field */ }
      <div>
        name: <input value={valueName} onChange={handleChangeName} />
      </div>
      {/* phone input field */}
      <div>
        phone: <input value={valuePhone} onChange={handleChangePhone} />
      </div>
    </div>
  )
}

export default InputPerson