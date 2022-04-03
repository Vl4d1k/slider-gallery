import React, {FC, memo} from "react";

import css from './images.module.scss'
import classNames from "classnames";
import config from "@client/config";
import {useHistory} from "react-router-dom";
import {ROUTES} from "@client/router";

export type TImage = {
  id: string;
  title: string;
  image: string
}

export interface IProps {
  images: TImage[] | null;
  className?: string
}

const Images: FC<IProps> = props => {
  const { images, className } = props;
  const history = useHistory();



  function handleViewImage(id: string) {
    history.push(`${ROUTES.viewImage}/${id}`)
  }

  return (
    <div className={classNames(css.card, 'card', className)}>
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
