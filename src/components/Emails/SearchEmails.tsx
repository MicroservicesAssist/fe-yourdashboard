import React from "react";

const SearchEmails = ({ searchTerm }: { searchTerm: string }) => {
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <p>No se encontraron emails con el termino: {searchTerm}</p>
    </div>
  );
};

export default SearchEmails;
