// shared/SearchForm.jsx
import "./SearchForm.css";

export default function SearchForm({
  fields = [],
  values = {},
  onChange,
}) {
  function handleChange(name, value) {
    onChange?.({
      ...values,
      [name]: value,
    });
  }

  return (
    <div className="search-bar">
      <div className="search-fields">
        {fields.map(f => (
          <div className="search-item" key={f.name}>
            <label>{f.label}</label>

            {f.type === "select" ? (
              <select
                value={values[f.name] ?? ""}
                onChange={e =>
                  handleChange(f.name, e.target.value)
                }
              >
                {(f.options ?? []).map(o => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            ) : (
              <input
                value={values[f.name] ?? ""}
                onChange={e =>
                  handleChange(f.name, e.target.value)
                }
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
