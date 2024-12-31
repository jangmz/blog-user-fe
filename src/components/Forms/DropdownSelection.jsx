export default function DropdownSelection({ label, name, selectValue, values }) {
    return (
        <div className="mb-3">
            <label htmlFor={name} className="form-label">{label}</label>
            <select name={name} id={name} value={selectValue} className="form-select">
                {
                    values.map(value => (
                        <option key={value} value={value}>{value}</option>
                    ))
                }
            </select>
        </div>
    )
}