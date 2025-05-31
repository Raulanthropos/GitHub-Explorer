export default function Spinner() {
  return (
    <div className="d-flex justify-content-center align-items-center my-5">
      <div
        className="spinner-border text-primary"
        role="status"
        aria-label="Loading..."
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}
