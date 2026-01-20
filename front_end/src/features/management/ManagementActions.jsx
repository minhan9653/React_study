// features/management/ManagementActions.jsx
import Button from "@/shared/Button";

export default function ManagementActions({ actions = [] }) {
  if (!Array.isArray(actions) || actions.length === 0) {
    return null;
  }

  return (
    <div className="action-bar">
      {actions.map(btn => (
        <Button key={btn.key} onClick={btn.onClick}>
          {btn.label}
        </Button>
      ))}
    </div>
  );
}
