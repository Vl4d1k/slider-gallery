import React, {FC, memo, useEffect, useState} from "react";

import css from './images.module.scss'
import classNames from "classnames";
import api from "@client/api";
import config from "@client/config";

export type TImage = {
  id: string;
  title: string;
  image: string
}

export interface IProps {
}

const Images: FC<IProps> = props => {
  const [images, setImages] = useState<null | Array<TImage>>(null)

  useEffect(() => {
    api.get<Array<TImage>>('images/preview').then(res => {
      setImages(res.data)
    })
  }, [])

  return (
    <div className={classNames(css.card, 'card w-75 mx-auto mt-5')}>
      <div className={classNames(css.cardBody, 'card-body')}>
        {
          images && images.map(({ image, id }, index) => (
            <img className={css.image} key={id} src={`${config.BASE_URL}/${image}`} alt="" />
          ))
        }
      </div>
    </div>
  )
}


export default memo(Images)
