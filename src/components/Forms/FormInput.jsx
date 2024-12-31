export default function FormInput({ label, name, type, value, required, onChange }) {
    return (
        <div className="mb-3">
            <label htmlFor={name} className="form-label">{label}</label>
            <input type={type} name={name} id={name} value={value} onChange={onChange} className="form-control" required />
        </div>
    )
}