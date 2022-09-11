import React, {ChangeEventHandler, useCallback, useRef, useState} from 'react';
import debounce from 'lodash.debounce'
import styles from './search.module.scss'
import {useDispatch} from "react-redux";
import {setSearchInput} from "../../redux/slices/filterSlice";

const Search: React.FC = () => {
    const [localSearchInput, setLocalSearchInput] = useState('');
    const dispatch = useDispatch()
    const inputRef = useRef<HTMLInputElement>(null);

    const svgClickHandler = () => {
        dispatch(setSearchInput(''))
        setLocalSearchInput('')
        inputRef.current?.focus()
    }

    //todo Разобраться как это работает
    const updateSearchInput = useCallback(
        debounce((str: string) => {
            dispatch(setSearchInput(str))
        }, 300),
        []
    )

    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocalSearchInput(e.target.value)
        updateSearchInput(e.target.value)
    }

    return (
        <div className={styles.root}>
            <svg
                className={styles.icon}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <title/>
                <g data-name="Layer 2" id="Layer_2">
                    <path
                        d="M18,10a8,8,0,1,0-3.1,6.31l6.4,6.4,1.41-1.41-6.4-6.4A8,8,0,0,0,18,10Zm-8,6a6,6,0,1,1,6-6A6,6,0,0,1,10,16Z"/>
                </g>
            </svg>
            <input
                ref={inputRef}
                className={styles.input}
                placeholder={"Поиск пиццы..."}
                type="text"
                value={localSearchInput}
                onChange={inputChangeHandler}
            />
            {localSearchInput &&
            <svg
                className={styles.close}
                height="48"
                viewBox="0 0 48 48"
                width="48"
                xmlns="http://www.w3.org/2000/svg"
                onClick={svgClickHandler}
            >
                <path
                    d="M38 12.83l-2.83-2.83-11.17 11.17-11.17-11.17-2.83 2.83 11.17 11.17-11.17 11.17 2.83 2.83 11.17-11.17 11.17 11.17 2.83-2.83-11.17-11.17z"/>
                <path d="M0 0h48v48h-48z" fill="none"/>
            </svg>
            }
        </div>
    );
};

export default Search;
