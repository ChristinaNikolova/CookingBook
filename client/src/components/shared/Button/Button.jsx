export default function Button({ text, disabled = true }) {
  return (
    <button className="btn from-btn" type="sumbit" disabled={disabled}>
      {text}
    </button>
  );
}
