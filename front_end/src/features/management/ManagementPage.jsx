// features/management/ManagementPage.jsx
import SearchForm from "@/shared/SearchForm";
import DataTable from "@/shared/DataTable";
import ManagementActions from "./ManagementActions";
import "./ManagementPage.css";

export default function ManagementPage({
  title,
  searchFields,
  searchValues,      // ✅ 추가
  onSearchChange,    // ✅ 추가
  columns,
  data,
  options,
  actions = {},
  onSelectChange,
  onDataChange,
}) {
  return (
    <div className="page-root">
      {/* =====================
         상단 영역
         ===================== */}
      <div className="page-header">
        <h2>{title}</h2>

        {/* 🔍 검색 한 줄 영역 */}
        <div className="search-row">
          <SearchForm
            fields={searchFields}
            values={searchValues}
            onChange={onSearchChange}
          />
          <ManagementActions actions={actions.search} />
        </div>

        {/* ⚙ 관리 버튼 영역 */}
        {/* 액션 바 */}
        <div className="page-actions">
          <div className="actions-left">
            <ManagementActions actions={actions.left} />
          </div>

          <div className="actions-right">
            <ManagementActions actions={actions.primary} />
          </div>
        </div>

      </div>

      {/* =====================
         테이블 영역
         ===================== */}
      <div className="page-grid">
        <DataTable
          columns={columns}
          data={data}
          options={options}
          onChange={onDataChange}
          onSelectChange={onSelectChange}
          idKey="factoryId"   // ⭐ 이 줄 추가
        />
      </div>
    </div>
  );
}
