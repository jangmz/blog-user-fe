export default function FormInput({ label, name, type, required }) {
    return (
        <div className="mb-3">
            <label htmlFor={name} className="form-label">{label}</label>
            <input type={type} name={name} id={name} className="form-control" required />
        </div>
    )
}