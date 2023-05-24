import styles from "./Image.module.css"

const Image = ({url,collectionImg}) => {
  return (
        <img  className={collectionImg && styles.collectionImg} src={url} alt="ScottiemPerry_having_a_cup_of_tea_beside_cat_anime_character_f735a55b-ead1-4ec9-a989-21a1804fb7c6.png" />
  )
}

export default Image  