import React, { useState, useEffect } from 'react';
import { Button, Pagination, PaginationItem, PaginationLink, } from 'reactstrap';

const RmPagination = ({ showPerPage, onPaginationChange, total }) => {
    const [counter, setCounter] = useState(1);
    // const [numberOfButtons, setNumberOfButtons] = useState(
    //     Math.ceil(total / showPerPage)
    // );


    useEffect(() => {
        const value = showPerPage * counter;
        // console.log(value - showPerPage);
        // console.log(value);
        onPaginationChange(value - showPerPage, value);
    }, [counter]);

    const onButtonClick = (type) => {
        if (type === "prev") {
            if (counter === 1) {
                setCounter(1);
            } else {
                setCounter(counter - 1);
            }
        } else if (type === "next") {
            if (Math.ceil(total / showPerPage) === counter) {
                setCounter(counter);
            } else {
                setCounter(counter + 1);
            }
        }
    }

    return (
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Pagination aria-label="Page navigation example">
                <PaginationItem>
                    <PaginationLink onClick={() => onButtonClick("prev")}>Previous</PaginationLink>
                </PaginationItem>
                {
                    new Array(Math.ceil(total / showPerPage)).fill("").map((pg, index) => (
                        <PaginationItem className={`${index + 1 === counter ? "active" : null}`}>
                            <PaginationLink onClick={() => setCounter(index + 1)}>
                                {index + 1}
                            </PaginationLink>
                        </PaginationItem>
                    ))
                }
                <PaginationItem>
                    <PaginationLink onClick={() => onButtonClick("next")}>Next</PaginationLink>
                </PaginationItem>
            </Pagination>
        </div>
    )
}

export default RmPagination;