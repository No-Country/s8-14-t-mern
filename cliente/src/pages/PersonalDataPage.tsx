import { ReactElement, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Subtitle, Text } from "@tremor/react";
import { PencilIcon, PlusCircleIcon } from "@heroicons/react/outline";
import { updateUserImage } from "@/services/users";
import HeaderBackButton from "@/components/HeaderBackButton";
import Popup from "@/components/Popup";
import { useUserData } from "@/context/UserContext";



interface ListItemType {
  title: string;
  subtitle: string;
  href?: string;
}



function PersonalData(): ReactElement {
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
  const [isPopupActive, setisPopupActive] = useState(false)
  const { user, setUserData } = useUserData();



  const MENU_ITEMS: ListItemType[] = [
    {
      title: "Nombre completo",
      subtitle: `${user.firstName + ' '+ user.lastname }`,
      href: "/changename",
    },
    {
      title: "Email",
      subtitle: `${user.email }`
    },
    {
      title: "Fecha de nacimiento",
      subtitle: "24/09/1990",
    },
    {
      title: "Dni",
      subtitle: "34.989.222",
    },
    {
      title: "Dirección",
      subtitle: "Av.Cabildo 2121",
      href:`/editProfile?field=${user.firstName,user.lastname }`,
    },
    {
      title: "Teléfono",
      subtitle: "1554332345",
      href:`/editProfile?field=${user.firstName,user.lastname }`,
    },
    {
      title: "Cbu",
      subtitle:`${user.id }` ,
    },
  ];

  useEffect(() => {
    setSelectedImage(user.avatar)
  }, [selectedImage === undefined])

  
  const handleImageSelected = async (selectedImage: File | null): Promise<void> => {
    try {
      if (selectedImage) {
        const image = URL.createObjectURL(selectedImage);
        setSelectedImage(image);
        setisPopupActive(false);

        if (user.id) {
          const response = await updateUserImage({ userId: user.id, img: selectedImage });

          if (response.data) {
            setUserData({ ...user, avatar:response.data.updatedUser.avatar })
          }
          

        }
      } else {
        setSelectedImage(undefined);
        setisPopupActive(false);
      }
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <>
      <HeaderBackButton title="Datos Personales" />
      <div className="my-8 px-5 grid place-items-center grid-cols-3 ">
        {selectedImage ? (
          <div
            className="w-24 h-24 rounded-full col-start-2 border-2 border-black border-dotted bg-slate-200"
            style={{ backgroundImage: `url(${selectedImage})`, backgroundSize: 'cover' }}
          />
        ) : (
          <div className="w-24 h-24 rounded-full col-start-2 border-2 border-black border-dotted bg-slate-200" />
        )}


        <Button
          size="xs"
          icon={PlusCircleIcon}
          variant="light"
          className="whitespace-pre-wrap"
          onClick={() => setisPopupActive(true)}
        >
          Agregar <br /> Imagen
        </Button>
      </div>

      {isPopupActive && <Popup handleImageSelected={handleImageSelected} />}

      <main className="mt-1">
        <ul className="flex flex-col [&>li:not(:last-child)]:border-b-2">
          {MENU_ITEMS.map((item, i) => (
            <ListItem key={i} {...item} />
          ))}
        </ul>
      </main>
    </>
  );
}

function ListItem({ title, subtitle, href }: ListItemType): ReactElement {
  return (
    <li className="flex gap-6 items-end justify-between px-5 py-4">
      <div>
        <Text className="text-[#262727] text-base">{title}</Text>
        <Subtitle className="text-xs text-[#505152] mt-1">{subtitle}</Subtitle>
      </div>
      {href && (
        <Link to={href} className="text-xs font-medium underline mr-2">
          Editar
        </Link>
      )}
    </li>
  );
}
export default PersonalData;