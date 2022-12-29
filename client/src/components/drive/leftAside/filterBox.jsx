import React from 'react';
import { useDispatch } from 'react-redux';
import './left-aside.css';
import { setFilter } from '.././../../reducers/file';

const FilterBox = () => {
    const dispatch = useDispatch();
    return (
        <div className="left-aside__filter">
            <div className="left-aside__text">Filters for files:</div>
            <fieldset className="left-aside__fieldset">
                <div>
                    <label className="left-aside__label">
                        Documents
                        <input
                            type="checkbox"
                            onChange={() =>
                                dispatch(
                                    setFilter(
                                        event.target.name,
                                        event.target.checked,
                                    ),
                                )
                            }
                            name="doc"
                        />
                        <span className="left-aside__checkmark"></span>
                    </label>
                    <label className="left-aside__label">
                        Music
                        <input
                            type="checkbox"
                            onChange={() =>
                                dispatch(
                                    setFilter(
                                        event.target.name,
                                        event.target.checked,
                                    ),
                                )
                            }
                            name="music"
                        />
                        <span className="left-aside__checkmark"></span>
                    </label>
                    <label className="left-aside__label">
                        Photo
                        <input
                            type="checkbox"
                            onChange={() =>
                                dispatch(
                                    setFilter(
                                        event.target.name,
                                        event.target.checked,
                                    ),
                                )
                            }
                            name="pic"
                        />
                        <span className="left-aside__checkmark"></span>
                    </label>
                    <label className="left-aside__label">
                        Video
                        <input
                            type="checkbox"
                            onChange={() =>
                                dispatch(
                                    setFilter(
                                        event.target.name,
                                        event.target.checked,
                                    ),
                                )
                            }
                            name="vid"
                        />
                        <span className="left-aside__checkmark"></span>
                    </label>
                </div>
            </fieldset>
        </div>
    );
};

export default FilterBox;
