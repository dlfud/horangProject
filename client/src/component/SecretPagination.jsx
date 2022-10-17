
function SecretPagination({ total, limit, secretPage, setSecretPage }) {
    const numPages = Math.ceil(total / limit);
  
    return (
      <>
        <div  className="items-center">
          <button onClick={() => setSecretPage(secretPage - 1)} disabled={secretPage === 1}>
            &lt;
          </button>
          {Array(numPages)
            .fill()
            .map((_, i) => (
              <button
                key={i + 1}
                onClick={() => setSecretPage(i + 1)}
                aria-current={secretPage === i + 1 ? "secretPage" : null}
                className="m-2"
              >
                {i + 1}
              </button>
            ))}
          <button className="btn"onClick={() => setSecretPage(secretPage + 1)} disabled={secretPage === numPages}>
            &gt;
          </button>
        </div>
      </>
    );
  }
  
  export default SecretPagination;
  