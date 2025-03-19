import { Image } from 'react-konva';
import useImage from 'use-image';

const URLImage = ({ image, ...rest }) => {
    const [img] = useImage(image.src);

    return (
      <Image
        id={image.id}
        image={img}
        x={image.x}
        y={image.y}
        height={50}
        width={50}
        // I will use offset to set origin to the center of the image
        offsetX={img ? img.width / 4 : 0}
        offsetY={img ? img.height / 4 : 0}
        draggable
        {...rest}
      />
    );
  };

  export default URLImage;