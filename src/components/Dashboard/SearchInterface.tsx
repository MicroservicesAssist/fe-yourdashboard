// src/components/Dashboard/SearchInterface.tsx
"use client";

import React, { useState } from "react";
import { Button, Tag } from "antd";
import { SearchOutlined, CloseOutlined } from "@ant-design/icons";
import Image from "next/image";
import { globalSearch } from "@/services/search/searchService";
import { IGlobalSearchResponse } from "@/interfaces/interfacesSearch";
import SearchResults from "./SearchResults";

const SearchInterface = () => {
  const [searchTerms, setSearchTerms] = useState<string[]>([]);
  const [currentInput, setCurrentInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<IGlobalSearchResponse | null>(null);

  const handleSearch = async () => {
    if (!currentInput.trim()) return;

    const newTerms = [...searchTerms, currentInput.trim()];
    setSearchTerms(newTerms);
    setCurrentInput("");
    setLoading(true);

    try {
      const searchQuery = newTerms.join(" ");
      const searchResults = await globalSearch(searchQuery);
      setResults(searchResults);
    } catch (error) {
      console.error("Error en búsqueda:", error);
      setResults({
        success: false,
        source: "error",
        searchTerm: currentInput,
        data: {
          emails: { results: [], total: 0 },
          calendar: { results: [], total: 0 },
          whatsapp: { results: [], total: 0 },
        },
        summary: {
          totalResults: 0,
          resultsPerSource: { emails: 0, calendar: 0, whatsapp: 0 },
        },
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveTag = (termToRemove: string) => {
    const newTerms = searchTerms.filter((term) => term !== termToRemove);
    setSearchTerms(newTerms);

    if (newTerms.length === 0) {
      setResults(null);
    } else {
      setLoading(true);
      const searchQuery = newTerms.join(" ");
      globalSearch(searchQuery)
        .then(setResults)
        .catch(() =>
          setResults({
            success: false,
            source: "error",
            searchTerm: searchQuery,
            data: {
              emails: { results: [], total: 0 },
              calendar: { results: [], total: 0 },
              whatsapp: { results: [], total: 0 },
            },
            summary: {
              totalResults: 0,
              resultsPerSource: { emails: 0, calendar: 0, whatsapp: 0 },
            },
          })
        )
        .finally(() => setLoading(false));
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const showingResults = results !== null || searchTerms.length > 0;

  const renderTags = () => {
    if (searchTerms.length === 0) return null;

    return (
      <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
        {searchTerms.map((term) => (
          <Tag
            key={term}
            closable
            onClose={(e) => {
              e.preventDefault();
              handleRemoveTag(term);
            }}
            closeIcon={<CloseOutlined />}
            style={{
              backgroundColor: "#E8F0FF",
              border: "1px solid #344BFF",
              color: "#344BFF",
              borderRadius: "4px",
              padding: "2px 8px",
              fontFamily: "Montserrat, sans-serif",
              fontSize: "13px",
              margin: 0,
            }}
          >
            {term}
          </Tag>
        ))}
      </div>
    );
  };

  return (
    <div style={{ padding: "40px", fontFamily: "Montserrat, sans-serif" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <h1
            style={{
              fontSize: "40px",
              fontWeight: "600",
              color: "#1F4788",
              marginBottom: "12px",
              fontFamily: "Montserrat, sans-serif",
            }}
          >
            Búsqueda Global
          </h1>
          <p
            style={{
              fontSize: "16px",
              color: "#666666",
              marginBottom: "40px",
              fontFamily: "Montserrat, sans-serif",
            }}
          >
            Busca en tus Emails, Calendario y Whatsapp desde un solo lugar
          </p>

          {!showingResults && (
            <div style={{ marginBottom: "40px" }}>
              <Image
                src="/OBJECTS.png"
                alt="Búsqueda Global"
                width={419.2901306152344}
                height={310.9997253417969}
                style={{
                  margin: "0 auto",
                  display: "block",
                  maxWidth: "100%",
                  height: "auto",
                }}
                priority
              />
            </div>
          )}
        </div>

        {/* Barra de búsqueda con tags dentro */}
        <div
          style={{
            marginBottom: "30px",
            display: "flex",
            gap: "12px",
            alignItems: "flex-start",
          }}
        >
          <div
            style={{
              flex: 1,
              border: "1px solid #d9d9d9",
              borderRadius: "8px",
              padding: "8px 12px",
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
              alignItems: "center",
              minHeight: "40px",
              backgroundColor: "#fff",
              transition: "all 0.3s",
            }}
            className="search-input-container"
          >
            <SearchOutlined style={{ color: "#999", fontSize: "16px" }} />

            {/* Tags dentro del input */}
            {renderTags()}

            {/* Input sin borde */}
            <input
              type="text"
              placeholder={
                searchTerms.length === 0
                  ? 'Buscar "Reunion de hoy" o "Factura de..."'
                  : ""
              }
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyPress={handleKeyPress}
              style={{
                border: "none",
                outline: "none",
                flex: 1,
                minWidth: "200px",
                fontFamily: "Montserrat, sans-serif",
                fontSize: "14px",
                padding: "4px 0",
              }}
            />
          </div>

          <Button
            type="primary"
            onClick={handleSearch}
            loading={loading}
            size="large"
            style={{
              backgroundColor: "#344BFF",
              borderColor: "#344BFF",
              fontFamily: "Montserrat, sans-serif",
              height: "40px",
              fontSize: "14px",
              fontWeight: "500",
              borderRadius: "8px",
              minWidth: "100px",
            }}
          >
            Buscar
          </Button>
        </div>

        {/* Resultados */}
        <SearchResults
          results={results}
          loading={loading}
          searchTerms={searchTerms}
          onRemoveTag={handleRemoveTag}
        />
      </div>

      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap");

        * {
          font-family: "Montserrat", sans-serif !important;
        }

        .search-input-container:hover {
          border-color: #344bff !important;
        }

        .search-input-container:focus-within {
          border-color: #344bff !important;
          box-shadow: 0 0 0 2px rgba(52, 75, 255, 0.1);
        }

        input::placeholder {
          color: #bfbfbf;
        }
      `}</style>
    </div>
  );
};

export default SearchInterface;
