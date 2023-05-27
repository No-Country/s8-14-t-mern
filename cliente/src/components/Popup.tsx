import { Card, Grid, Icon, Text } from '@tremor/react'
import React, { useState } from 'react'
import { CameraIcon, PhotographIcon } from "@heroicons/react/solid";
import Loader from './Loader';

export default function Popup() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isLoaderImage, setIsLoaderImage] = useState<boolean>(false);

  const handleOpenCamera = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.capture = 'none'; // Abre la galería de imágenes

    input.onchange = (event: any) => {
      if (event.target instanceof HTMLInputElement && event.target.files && event.target.files.length > 0) {
        const file = event.target.files[0];
        setSelectedImage(URL.createObjectURL(file));
      }
    };

    input.click();
    setIsLoaderImage(true)
    setTimeout(() => {
      setIsLoaderImage(false)
      console.log("listo");
      
    }, 400);
  };

  return (
    <Grid
      className=' 
    absolute
    top-0
    left-0
    w-full
    h-full
    bg-transparent
    flex
    items-end
    justify-end
    z-50
    bg-opacity-50
    bg-slate-500
    '
    >
      <Card
        className='
        border-t-transparent 
        rounded-t-3xl
        h-52
        '>
        <div className='w-full flex justify-center'>
          <div className='bg-slate-400 w-12 h-[4px] rounded-3xl'></div>
        </div>
        {isLoaderImage ?
          <div className='w-full text-center h-full flex flex-col justify-center gap-7'>
            <Text className='text-lg'>
              Cambiando imagen
            </Text>
            <Loader />
          </div>
          :
          <>
            <button
              onClick={handleOpenCamera}
              className='flex justify-center items-center cursor-pointer'
            >
              Tomar una foto
              <Icon size="xl" color='gray' icon={CameraIcon} />
            </button>

            <button
              onClick={handleOpenCamera}
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
