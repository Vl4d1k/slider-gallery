import React, { memo, useState, useEffect } from "react";
import { useInstance } from "react-ioc";
import { useLocation, useParams } from "react-router-dom";
import { Range, getTrackBackground } from "react-range";
import ViewSlider from 'react-view-slider'
import api from "@client/api";
import config from "@client/config";

import Store from "@store";

import "../styles/App.scss";


const ViewImage = () => {
    const { app } = useInstance(Store);
    const location = useLocation();
    const { id } = useParams();

    console.log(id);

    const STEP = 1;
    const MIN = 0;

    const [MAX, setMaxCount] = useState(100);
    const [values, setValues] = useState([0]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [images, setImages] = useState([]);

    useEffect(() => {
        api.get(`images/${id}`).then((res) => {
            console.log(res.data);
            setImages(res?.data?.images.length > 0 ? res?.data?.images : []);
            setMaxCount(res?.data?.images?.length ?? 0);
            setValues([res?.data?.images?.length ?? 0]);
        });
    }, []);

    const renderView = ({index, key, ref, style, className, active, transitionState}) => (
        <div key={key} ref={ref} style={style} className={className}>
            <div class="text-center">
                <img src={config.BASE_URL + '/' + images[index]} className="rounded" alt="img"/>
            </div>
        </div>
      )

    return (
        <>
            {images.length > 0
                ?
                <ViewSlider
                    renderView={renderView}
                    numViews={images.length}
                    activeView={activeIndex}
                    animateHeight
                />
                : 'There`re no images'
            }
            
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    flexWrap: "wrap",
                    margin: "2em",
                }}
            >
                <Range
                    values={values}
                    step={STEP}
                    min={MIN}
                    max={MAX}
                    onChange={(values) => { setActiveIndex(values[0]); setValues(values) }}
                    renderTrack={({ props, children }) => (
                        <div
                            onMouseDown={props.onMouseDown}
                            onTouchStart={props.onTouchStart}
                            style={{
                                ...props.style,
                                height: "36px",
                                display: "flex",
                                width: "100%",
                            }}
                        >
                            <div
                                ref={props.ref}
                                style={{
                                    height: "5px",
                                    width: "100%",
                                    borderRadius: "4px",
                                    background: getTrackBackground({
                                        values: values,
                                        colors: ["#548BF4", "#ccc"],
                                        min: MIN,
                                        max: MAX,
                                    }),
                                    alignSelf: "center",
                                }}
                            >
                                {children}
                            </div>
                        </div>
                    )}
                    renderThumb={({ props, isDragged }) => (
                        <div
                            {...props}
                            style={{
                                ...props.style,
                                height: "42px",
                                width: "42px",
                                borderRadius: "4px",
                                backgroundColor: "#FFF",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                boxShadow: "0px 2px 6px #AAA",
                            }}
                        >
                            <div
                                style={{
                                    height: "16px",
                                    width: "5px",
                                    backgroundColor: isDragged
                                        ? "#548BF4"
                                        : "#CCC",
                                }}
                            />
                        </div>
                    )}
                />
                <output style={{ marginTop: "30px" }} id="output">
                    {values[0]}
                </output>
            </div>
        </>
    );
};

export default memo(ViewImage);
