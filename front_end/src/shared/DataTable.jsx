import { useEffect, useState } from "react";
import "./DataTable.css";

export default function DataTable({
  columns = [],
  data = [],
  options = {},
  onChange,
  onSelectChange,
}) {
  const [editing, setEditing] = useState({ rowKey: null, colKey: null });
  const [tableData, setTableData] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);

  /* =========================
     데이터 동기화
     ========================= */
  useEffect(() => {
    setTableData(Array.isArray(data) ? data : []);
    setSelectedIds([]);
  }, [data]);

  useEffect(() => {
    onSelectChange && onSelectChange(selectedIds);
  }, [selectedIds, onSelectChange]);

  /* =========================
     공통 rowKey (⭐ 핵심)
     ========================= */
  function getRowKey(row, index) {
    return row.plantId ?? row._tempKey ?? `ROW_${index}`;
  }

  function closeEdit() {
    setEditing({ rowKey: null, colKey: null });
  }

  function hasGroupedColumns(cols) {
    return Array.isArray(cols) && cols.some(col => Array.isArray(col.children));
  }

  /* =========================
     체크박스
     ========================= */
  function toggleRow(rowKey) {
    setSelectedIds(prev =>
      prev.includes(rowKey)
        ? prev.filter(v => v !== rowKey)
        : [...prev, rowKey]
    );
  }

  function toggleAll() {
    if (selectedIds.length === tableData.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(tableData.map(getRowKey));
    }
  }

  /* =========================
     수정 처리
     ========================= */
  function handleValueChange(rowKey, key, value) {
    const updated = tableData.map((row, index) =>
      getRowKey(row, index) === rowKey
        ? { ...row, [key]: value }
        : row
    );
    setTableData(updated);
    onChange && onChange(updated);
  }

  /* =========================
     셀 렌더링
     ========================= */
  function getDisplayValue(value, optionList) {
    if (!Array.isArray(optionList)) return value ?? "";
    const found = optionList.find(opt => opt.value === value);
    return found ? found.label : "";
  }

  function renderCell(row, col, rowKey) {
    const isEditing =
      editing.rowKey === rowKey && editing.colKey === col.key;

    const optionList =
      col.optionKey && Array.isArray(options[col.optionKey])
        ? options[col.optionKey]
        : null;

    if (!col.editable || !isEditing) {
      return optionList
        ? getDisplayValue(row[col.key], optionList)
        : row[col.key] ?? "";
    }

    if (optionList) {
      return (
        <select
          value={row[col.key] ?? ""}
          onChange={e =>
            handleValueChange(rowKey, col.key, e.target.value)
          }
          onBlur={closeEdit}
          autoFocus
        >
          <option value="">선택</option>
          {optionList.map(opt => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      );
    }

    return (
      <input
        value={row[col.key] ?? ""}
        onChange={e =>
          handleValueChange(rowKey, col.key, e.target.value)
        }
        onBlur={closeEdit}
        autoFocus
      />
    );
  }

  function renderColumns(cols, row, rowKey) {
    return cols.flatMap(col => {
      if (Array.isArray(col.children)) {
        return renderColumns(col.children, row, rowKey);
      }

      return (
        <td
          key={`${rowKey}-${col.key}`}   // ✅ row + col 조합 key
          onClick={() =>
            col.editable &&
            setEditing({ rowKey, colKey: col.key })
          }
          style={{ cursor: col.editable ? "pointer" : "default" }}
        >
          {renderCell(row, col, rowKey)}
        </td>
      );
    });
  }

  /* =========================
     헤더
     ========================= */
  function renderHeader(cols) {
    return cols.map(col =>
      Array.isArray(col.children) ? (
        <th
          key={`group-${col.group}`}
          colSpan={col.children.length}
        >
          {col.group}
        </th>
      ) : (
        <th key={`col-${col.key}`}>{col.label}</th>
      )
    );
  }

  function renderSubHeader(cols) {
    return cols.flatMap((col, colIndex) =>
      Array.isArray(col.children)
        ? col.children.map((child, childIndex) => (
            <th
              key={`sub-${colIndex}-${childIndex}-${child.key}`}
            >
              {child.label}
            </th>
          ))
        : []
    );
  }

  /* =========================
     렌더
     ========================= */
  return (
    <div className="data-table-container">
      <table className="data-table">
        <thead>
          <>
            <tr className="group-header">
              <th className="checkbox-cell">
                <input
                  type="checkbox"
                  checked={
                    tableData.length > 0 &&
                    selectedIds.length === tableData.length
                  }
                  onChange={toggleAll}
                />
              </th>
              {renderHeader(columns)}
            </tr>

            {hasGroupedColumns(columns) && (
              <tr className="sub-header" key="sub-header-row">
                <th className="checkbox-cell" />
                {renderSubHeader(columns)}
              </tr>
            )}
          </>
        </thead>

        <tbody>
          {tableData.map((row, index) => {
            const rowKey = getRowKey(row, index);

            return (
              <tr
                key={rowKey}   // ✅ 핵심
                className={
                  selectedIds.includes(rowKey)
                    ? "row-selected"
                    : ""
                }
              >
                <td className="checkbox-cell">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(rowKey)}
                    onChange={() => toggleRow(rowKey)}
                  />
                </td>
                {renderColumns(columns, row, rowKey)}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
