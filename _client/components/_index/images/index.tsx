import React, {FC, memo, useEffect, useState} from "react";

import css from './images.module.scss'
import classNames from "classnames";
import api from "@client/api";
import config from "@client/config";
import {useHistory} from "react-router-dom";
import {ROUTES} from "@client/router";

export type TImage = {
  id: string;
  title: string;
  image: string
}

export interface IProps {
}

const Images: FC<IProps> = props => {
  const [images, setImages] = useState<null | Array<TImage>>(null)
  const history = useHistory();

  useEffect(() => {
    api.get<Array<TImage>>('images/preview').then(res => {
      setImages(res.data)
    })
  }, [])

  function handleViewImage(id: string) {
    history.push(`${ROUTES.viewImage}/${id}`)
  }

  return (
    <div className={classNames(css.card, 'card w-75 mx-auto mt-5')}>
      <div className={classNames(css.cardBody, 'card-body')}>
        {
          images && images.map(({ image, id }, index) => (
            <img className={css.image} onClick={() => handleViewImage(id)} key={id} src={`${config.BASE_URL}/${image}`} alt="" />
          ))
        }
      </div>
    </div>
  )
}


export default memo(Images)
