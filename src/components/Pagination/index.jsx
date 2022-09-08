import React from 'react';
import ReactPaginate from "react-paginate";
import styles from './pagination.module.scss'
import {useDispatch} from "react-redux";
import {setCurrentPage} from "../../redux/slices/filterSlice";

const Pagination = () => {
    const dispatch = useDispatch()

    return (
        <ReactPaginate
            className={styles.root}
            breakLabel="..."
            nextLabel=">"
            onPageChange={i => dispatch(setCurrentPage(i.selected))}
            pageRangeDisplayed={5}
            pageCount={3}
            previousLabel="<"
            renderOnZeroPageCount={null}
        />
    );
};

export default Pagination;
