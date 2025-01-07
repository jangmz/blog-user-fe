export default function TextAreaInput({ label, name, value, onChange }) {
    return (
        <div className="mb-3">
            <label htmlFor={name} className="form-label">{label}</label>
            <textarea 
                name={name} 
                id={name} 
                value={value} 
                onChange={onChange} 
                rows="10"
                cols="55"
            ></textarea>
        </div>
    )
}