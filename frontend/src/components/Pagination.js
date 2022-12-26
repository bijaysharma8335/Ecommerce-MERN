import React, { useState } from "react";
import "./Pagination.css";
const Pagination = ({
    data,
    RenderComponent,
    title,
    pageLimit,
    dataLimit,
    tablePagination,
}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pages] = useState(Math.floor(data?.length / dataLimit) + 1);

    const getPaginatedData = () => {
        const startIndex = currentPage * dataLimit - dataLimit;
        const endIndex = startIndex + dataLimit;
        return data.slice(startIndex, endIndex);
    };

    const getPaginationGroup = () => {
        let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;

        return new Array(pageLimit).fill().map((_, idx) => start + idx + 1);
    };

    const changePage = (e) => {
        const pageNumber = Number(e.target.textContent);
        setCurrentPage(pageNumber);
    };

    const paginatedGroup = getPaginationGroup();
    const paginatedData = getPaginatedData();
    const goNextPage = () => setCurrentPage((page) => page + 1);
    const goPrevPage = () => setCurrentPage((page) => page - 1);

    return (
        <>
            {tablePagination ? (
                paginatedData.map((data, id) => (
                    <RenderComponent {...data} key={id} />
                ))
            ) : (
                <div className="dataContainer d-flex justify-content-center flex-wrap">
                    <h1>{title}</h1>
                    {paginatedData.map((data, id) => (
                        <RenderComponent {...data} key={id} />
                    ))}
                </div>
            )}

            {/* show next and previous buttons to go to the page */}

            {data.length > dataLimit && (
                <div className="pagination">
                    <button
                        onClick={goPrevPage}
                        className={`prev ${
                            currentPage === 1 ? "disabled" : ""
                        }`}
                    >
                        prev
                    </button>
                    {paginatedGroup.map((item, i) => (
                        <button
                            key={i}
                            onClick={changePage}
                            className={`paginationItem ${
                                currentPage === item ? "active" : ""
                            }`}
                        >
                            <span>{item}</span>
                        </button>
                    ))}
                    <button
                        onClick={goNextPage}
                        className={`next ${
                            currentPage >= pages ? "disabled" : ""
                        }`}
                    >
                        next
                    </button>
                </div>
            )}
        </>
    );
};

export default Pagination;
