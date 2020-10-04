import React, { useState, useEffect } from 'react';
import { Button, Pagination, PaginationItem, PaginationLink, } from 'reactstrap';

const RmPagination = ({ showPerPage, onPaginationChange, total }) => {
    const [counter, setCounter] = useState(1);

    useEffect(() => {
        const value = showPerPage * counter;
        // console.log("start value per page: ", value - showPerPage);
        // console.log("end value per page: ", value);

        //change of contents
        onPaginationChange(value - showPerPage, value);
    }, [counter]);

    // state of page,
    // ketika sudah memasukkin halaman 1, klik button prev berkali-kali akan tetap di halaman 1,
    // ketika sudah memasukkin halaman terakhir, klik button next berkali-kali akan tetap di halaman terakhir
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
                    <PaginationLink onClick={() => onButtonClick("prev")}><i className="pe-7s-prev" /></PaginationLink>
                </PaginationItem>
                {
                    new Array(Math.ceil(total / showPerPage) <= 3 ? Math.ceil(total / showPerPage) : 3 ).fill("").map((pg, index) => (
                        <PaginationItem className={`${index + 1 === counter || (counter > 3 && index + counter - 2 === counter)? "active" : null}`}>
                            <PaginationLink onClick={() => setCounter(counter <= 3 ? index + 1 : index + counter - 2)}>
                                {counter <= 3 ? index + 1 : index + counter - 2}
                            </PaginationLink>
                        </PaginationItem>
                    ))
                }
                <PaginationItem>
                    <PaginationLink onClick={() => onButtonClick("next")}><i className="pe-7s-next" /></PaginationLink>
                </PaginationItem>
            </Pagination>
        </div>
    )
}

export default RmPagination;