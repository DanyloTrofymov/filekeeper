import React from 'react';
import { useDispatch } from 'react-redux';
import './left-aside.css';
import { setSort } from '.././../../reducers/file';
const SortBox = () => {
    const dispatch = useDispatch();
    return (
        <div className="left-aside__select-sort">
            <div className="left-aside__text">Sort files by:</div>
            <fieldset className="left-aside__fieldset">
                <div>
                    <label className="left-aside__label">
                        Date
                        <input
                            type="radio"
                            onChange={() => dispatch(setSort('date'))}
                            name="sort"
                            defaultChecked
                        />
                        <span className="left-aside__radiomark"></span>
                    </label>
                    <label className="left-aside__label">
                        Type
                        <input
                            type="radio"
                            onChange={() => dispatch(setSort('type'))}
                            name="sort"
                        />
                        <span className="left-aside__radiomark"></span>
                    </label>
                    <label className="left-aside__label">
                        Name
                        <input
                            type="radio"
                            onChange={() => dispatch(setSort('name'))}
                            name="sort"
                        />
                        <span className="left-aside__radiomark"></span>
                    </label>
                    <label className="left-aside__label">
                        Size
                        <input
                            type="radio"
                            onChange={() => dispatch(setSort('size'))}
                            name="sort"
                        />
                        <span className="left-aside__radiomark"></span>
                    </label>
                </div>
            </fieldset>
        </div>
    );
};

export default SortBox;
