import React, { memo, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Range, getTrackBackground } from "react-range";
import ViewSlider from 'react-view-slider'
import api from "@client/api";
import config from "@client/config";

import "../styles/App.scss";
import css from './view-image.module.scss';
import {ROUTES} from "@client/router";
import classNames from "classnames";

const MAX = 10;
const MIN = 0;
const STEP = 1;
const ViewImage = () => {
    const { id } = useParams();

    const [values, setValues] = useState(null);
    const [gifUrl, setGifUrl] = useState(null);
    const [images, setImages] = useState([]);

    function fetch() {
      return api.get(`images/${id}`).then((res) => {
        setImages(res?.data?.images.length > 0 ? res?.data?.images : []);
        setValues([res?.data?.images?.length - 1]);

        return res?.data?.images.length;
      })
    }

    function fetchGif() {
      return api.get(`gif/${id}`).then((res) => {

        setGifUrl(res?.data)
      })
    }

    useEffect(() => {
      const interval = setInterval(() => {
        fetch().then().then(count => {
          if (count === MAX) {
            clearInterval(interval)
          }
        })
      }, 5000)

      fetch().then(count => {
        if (count === MAX) {
          fetchGif()
        }
      })

      return () => {
        clearInterval(interval)
      }
    }, []);

    const renderView = ({index, key, ref, style, className,}) => {
      return (
        <div key={key} ref={ref} style={style} className={className}>
          <div class="text-center">
            <img src={config.BASE_URL + '/' + images[index]} className={css.img} alt="img"/>
          </div>
        </div>
      )

    }
    return (
      <div className="w-75 mx-auto mt-5">
        <div className="mb-3">
          <Link to={`${ROUTES.index}`} className="link">Назад</Link>
        </div>
        {
          values && (
            <div className="card ">
              <div className="card-body">
                <div className="">
                  {images.length > 0
                    ?
                    <ViewSlider
                      renderView={renderView}
                      numViews={images.length - 1}
                      activeView={values[0]}
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
                      max={images.length - 1}
                      onChange={(values) => setValues(values)}
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
                                colors: ["gray", "lightgray"],
                                min: MIN,
                                max: images.length - 1,
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
                    <output >
                      {values[0] + 1}
                    </output>
                  </div>
                </div>
              </div>
            </div>
          )
        }
        {
          gifUrl && (
            <div className="card mt-3">
              <div className="card-body">
                <img className={classNames(css.gif, 'mx-auto d-block')} src={`${config.BASE_URL}/${gifUrl}`} />
              </div>
            </div>
          )
        }
      </div>
    );
};

export default memo(ViewImage);
