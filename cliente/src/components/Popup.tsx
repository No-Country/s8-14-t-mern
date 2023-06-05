
import { Card, Grid, Icon, Text } from '@tremor/react'
import { ReactElement, useState } from 'react'
import { CameraIcon, PhotographIcon } from "@heroicons/react/solid";
import Loader from './Loader';


interface PopupProps {
  handleImageSelected: (selectedImage: File | null) => void;
}


export default function Popup({ handleImageSelected }: PopupProps): ReactElement {

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isLoaderImage, setIsLoaderImage] = useState<boolean>(false);

  const haldleImage = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {


    setIsLoaderImage(true)
    let input = document.createElement('input');
    input.type = 'file';
    input.capture = 'none'

    // Aqui permito usar la camara trasera
    if (event.target instanceof HTMLButtonElement && event.target.id === 'camare') {
      input.capture = 'environment';
    }

    let isCancelled = false;

    input.oninput = (event: Event): void => {
      const target = event.target as HTMLInputElement;
      if (target.files && target.files.length > 0) {
        const file = target.files[0];
        setSelectedImage(file);
        handleImageSelected(file);
        setIsLoaderImage(false)
      }

    }
    input.click();
    input.addEventListener('cancel', () => {
      setIsLoaderImage(false)
      handleImageSelected(null);
      isCancelled = true;
    })


    setTimeout(() => {
      if (isCancelled) {
        console.log('El usuario canceló la selección de archivo');
      }
    }, 100);

  };

  return (
    <Grid
      className="fixed top-0 left-0 w-full h-full overflow-y-hidden  flex items-center justify-center bg-opacity-50 bg-black z-50"
    >
      <Card className=" absolute top-2/3 h-72 w-full  overflow-y-hidden bg-white rounded-lg">
        <div className='w-full  flex justify-center'>
          <div className='bg-slate-400 w-12 h-[4px] rounded-3xl'></div>
        </div>
        {isLoaderImage ?
          <div className='w-full text-center  flex flex-col justify-center gap-7'>
            <Text className='text-lg'>
              Cambiando imagen
            </Text>
            <Loader />
          </div>
          :
          <>
            <button
              id='camare'
              onClick={haldleImage}
              className='flex justify-center items-center cursor-pointer'
            >
              Tomar una foto
              <Icon size="xl" color='gray' icon={CameraIcon} />
            </button>

            <button
              onClick={haldleImage}
              className='flex justify-center items-center cursor-pointer'
            >
              Elegir imagen de galeria
              <Icon size="xl" color='gray' icon={PhotographIcon} />
            </button>
          </>
        }
      </Card>
    </Grid>
  )
}