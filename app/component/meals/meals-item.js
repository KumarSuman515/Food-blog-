import Link from 'next/link';
import Image from 'next/image';
import classes from "./meals-item.module.css";

export default function MealItem({ title, slug, image, summary, creator }) {
  const isBase64 = image && image.startsWith('data:image');

  return (
    <article className={classes.meal}>
      <header>
        <div className={classes.image}>
          {isBase64 ? (
            <img 
              src={image} 
              alt={title} 
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'cover',
                position: 'absolute',
                top: 0,
                left: 0,
                borderRadius: '8px'
              }} 
            />
          ) : (
            <Image 
              src={image} 
              alt={title} 
              fill 
              style={{ borderRadius: '8px' }}
            />
          )}
        </div>
        <div className={classes.headerText}>
          <h2>{title}</h2>
          <p>by {creator}</p>
        </div>
      </header>
      <div className={classes.content}>
        <p className={classes.summary}>{summary}</p>
        <div className={classes.actions}>
          <Link href={`/meals/${slug}`}>View Details</Link>
        </div>
      </div>
    </article>
  );
}
