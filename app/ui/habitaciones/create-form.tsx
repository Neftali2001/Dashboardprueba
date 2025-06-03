'use client';

import Link from 'next/link';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon, // Podría no ser necesaria, pero la dejo por si acaso
  UserCircleIcon,   // Podría no ser necesaria
  PhotoIcon,        // Para imágenes
  TagIcon,          // Para IDs de habitación
  BuildingOfficeIcon, // Para tipo de habitación
  EyeIcon,          // Para tipo de vista
  ArrowsPointingOutIcon, // Para tamaño
  UsersIcon,        // Para capacidad
  LanguageIcon,     // Para campos multilingües
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
// DEBERÁS CREAR ESTA ACCIÓN Y AJUSTAR EL TIPO State SI ES NECESARIO
import { createInvoice, State } // Asume que has creado una acción createRoom similar a createInvoice
from '@/app/lib/actions'; // La ruta a tus acciones, ajústala si es necesario
import { useActionState } from 'react';
import { useState, ChangeEvent, FormEvent } from 'react';

// Podrías definir tipos para las opciones de select si vienen de la BD
// export type RoomTypeOption = { id: string; name: string; };
// export type ViewTypeOption = { id: string; name: string; };

// Props del formulario (ejemplo: si pasas tipos de habitación o vistas)
// interface AddRoomFormProps {
//   roomTypes: RoomTypeOption[];
//   viewTypes: ViewTypeOption[];
// }

export default function AddRoomForm(/* { roomTypes, viewTypes }: AddRoomFormProps */) {
  const initialState: State = { message: null, errors: {} };
  // USA LA NUEVA ACCIÓN createRoom
  const [state, formAction] = useActionState(createInvoice, initialState);

  // Estados para campos complejos que necesitan manejo en el cliente
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [primaryImageIndex, setPrimaryImageIndex] = useState<number | null>(null);
  const [roomIdentifiers, setRoomIdentifiers] = useState<string[]>(['']); // Para los IDs de habitación
  const [identicalRoomsCount, setIdenticalRoomsCount] = useState<number>(1);
  const [allowsMinors, setAllowsMinors] = useState<boolean>(true);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      setImageFiles(files);
      const previews = files.map(file => URL.createObjectURL(file));
      setImagePreviews(previews);
      setPrimaryImageIndex(null); // Resetea la imagen principal al cambiar las imágenes
    }
  };

  const handleSetPrimaryImage = (index: number) => {
    setPrimaryImageIndex(index);
  };

  const handleIdenticalRoomsCountChange = (e: ChangeEvent<HTMLInputElement>) => {
    let count = parseInt(e.target.value, 10);
    if (isNaN(count) || count < 1) count = 1;
    setIdenticalRoomsCount(count);
    // Ajusta el array de roomIdentifiers al nuevo conteo
    setRoomIdentifiers(currentIdentifiers => {
        const newIdentifiers = [...currentIdentifiers];
        if (count > newIdentifiers.length) {
            for (let i = newIdentifiers.length; i < count; i++) {
                newIdentifiers.push('');
            }
        } else if (count < newIdentifiers.length) {
            return newIdentifiers.slice(0, count);
        }
        return newIdentifiers;
    });
  };

  const handleRoomIdentifierChange = (index: number, value: string) => {
    const newIdentifiers = [...roomIdentifiers];
    newIdentifiers[index] = value;
    setRoomIdentifiers(newIdentifiers);
  };


  // Al usar useActionState, Next.js se encarga de FormData.
  // Solo necesitas asegurarte de que los inputs tengan 'name'.
  // Para campos dinámicos o archivos, a veces se necesita un onSubmit manual
  // para construir FormData, pero intentemos con la forma estándar primero.
  // Si `formAction` no maneja bien los archivos o el estado dinámico,
  // se podría necesitar un `onSubmit` personalizado que construya `FormData`.

  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">

        {/* Imágenes de la Habitación */}
        <div className="mb-4">
          <label htmlFor="images" className="mb-2 block text-sm font-medium">
            Imágenes de la Habitación
          </label>
          <div className="relative">
            <input
              id="images"
              name="roomImages" // Server action necesitará manejar múltiples archivos con este nombre
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 px-3 text-sm outline-2 placeholder:text-gray-500"
              aria-describedby="images-error"
            />
            <PhotoIcon className="pointer-events-none absolute right-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          {imagePreviews.length > 0 && (
            <div className="mt-2">
              <p className="text-sm font-medium">Previsualización (selecciona la principal):</p>
              <div className="mt-1 flex flex-wrap gap-2">
                {imagePreviews.map((src, index) => (
                  <div key={index} className="relative">
                    <img
                      src={src}
                      alt={`Preview ${index + 1}`}
                      className={`h-24 w-24 rounded-md object-cover border-2 ${primaryImageIndex === index ? 'border-blue-500 ring-2 ring-blue-500' : 'border-gray-300'}`}
                    />
                    <button
                      type="button"
                      onClick={() => handleSetPrimaryImage(index)}
                      className="absolute bottom-1 right-1 rounded bg-black bg-opacity-50 px-1.5 py-0.5 text-xs text-white hover:bg-opacity-75"
                    >
                      {primaryImageIndex === index ? 'Principal' : 'Hacer Principal'}
                    </button>
                  </div>
                ))}
              </div>
              {/* Campo oculto para enviar el índice de la imagen principal o su nombre */}
              {primaryImageIndex !== null && imageFiles[primaryImageIndex] && (
                 <input type="hidden" name="primaryImageName" value={imageFiles[primaryImageIndex].name} />
              )}
            </div>
          )}
          
          <div id="images-error" aria-live="polite" aria-atomic="true">
              {/* @ts-ignore */}
            {/* {state.errors?.roomImages &&
              state.errors.roomImages.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))} */}
          </div>
        </div>

        {/* Título (Español e Inglés) */}
        <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="title_es" className="mb-2 block text-sm font-medium">
              Título (Español)
            </label>
            <div className="relative">
              <input
                id="title_es"
                name="title_es"
                type="text"
                placeholder="Ej: Suite Deluxe con Vista al Mar"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                required
                aria-describedby="title_es-error"
              />
              <LanguageIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
            <div id="title_es-error" aria-live="polite" aria-atomic="true">
                {/* @ts-ignore */}
                {state.errors?.title_es && state.errors.title_es.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>{error}</p>
                ))}
            </div>
          </div>
          <div>
            <label htmlFor="title_en" className="mb-2 block text-sm font-medium">
              Título (Inglés)
            </label>
            <div className="relative">
              <input
                id="title_en"
                name="title_en"
                type="text"
                placeholder="Ej: Deluxe Suite with Ocean View"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                required
                aria-describedby="title_en-error"
              />
              <LanguageIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
             <div id="title_en-error" aria-live="polite" aria-atomic="true">
                {/* @ts-ignore */}
                {state.errors?.title_en && state.errors.title_en.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>{error}</p>
                ))}
            </div>
          </div>
        </div>

        {/* Descripción (Español e Inglés) */}
        <div className="mb-4">
            <label htmlFor="description_es" className="mb-2 block text-sm font-medium">Descripción (Español)</label>
            <textarea
                id="description_es"
                name="description_es"
                rows={3}
                className="peer block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2 placeholder:text-gray-500"
                placeholder="Describa la habitación en español..."
                required
                aria-describedby="description_es-error"
            ></textarea>
            <div id="description_es-error" aria-live="polite" aria-atomic="true">
                {/* @ts-ignore */}
                {state.errors?.description_es && state.errors.description_es.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>{error}</p>
                ))}
            </div>
        </div>
        <div className="mb-4">
            <label htmlFor="description_en" className="mb-2 block text-sm font-medium">Descripción (Inglés)</label>
            <textarea
                id="description_en"
                name="description_en"
                rows={3}
                className="peer block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2 placeholder:text-gray-500"
                placeholder="Describe the room in English..."
                required
                aria-describedby="description_en-error"
            ></textarea>
            <div id="description_en-error" aria-live="polite" aria-atomic="true">
                {/* @ts-ignore */}
                {state.errors?.description_en && state.errors.description_en.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>{error}</p>
                ))}
            </div>
        </div>

        {/* Tipo de Habitación, Número de Habitaciones, Tipo de Vista, Tamaño */}
        <div className="mb-4 grid grid-cols-1 gap-x-4 gap-y-2 md:grid-cols-2 lg:grid-cols-4">
            <div>
                <label htmlFor="roomType" className="mb-2 block text-sm font-medium">Tipo de Habitación</label>
                <div className="relative">
                    <select
                        id="roomType"
                        name="roomType"
                        className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                        defaultValue=""
                        required
                        aria-describedby="roomType-error"
                    >
                        <option value="" disabled>Seleccione tipo</option>
                        <option value="sencilla">Sencilla</option>
                        <option value="doble">Doble</option>
                        <option value="suite_junior">Suite Junior</option>
                        <option value="suite_presidencial">Suite Presidencial</option>
                        {/* Deberías cargar estos datos dinámicamente si es posible */}
                        {/* {roomTypes.map(type => <option key={type.id} value={type.id}>{type.name}</option>)} */}
                    </select>
                    <BuildingOfficeIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                </div>
                <div id="roomType-error" aria-live="polite" aria-atomic="true">
                    {/* @ts-ignore */}
                    {state.errors?.roomType && state.errors.roomType.map((error: string) => (
                        <p className="mt-2 text-sm text-red-500" key={error}>{error}</p>
                    ))}
                </div>
            </div>
             <div>
                <label htmlFor="identicalRoomsCount" className="mb-2 block text-sm font-medium">Nº de Habitaciones (iguales)</label>
                <input
                    id="identicalRoomsCount"
                    name="identicalRoomsCount"
                    type="number"
                    min="1"
                    value={identicalRoomsCount}
                    onChange={handleIdenticalRoomsCountChange}
                    className="peer block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2 placeholder:text-gray-500"
                    required
                />
                 <div id="identicalRoomsCount-error" aria-live="polite" aria-atomic="true">
                    {/* @ts-ignore */}
                    {state.errors?.identicalRoomsCount && state.errors.identicalRoomsCount.map((error: string) => (
                        <p className="mt-2 text-sm text-red-500" key={error}>{error}</p>
                    ))}
                </div>
            </div>
            <div>
                <label htmlFor="viewType" className="mb-2 block text-sm font-medium">Tipo de Vista</label>
                <div className="relative">
                    <select
                        id="viewType"
                        name="viewType"
                        className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                        defaultValue=""
                        required
                        aria-describedby="viewType-error"
                    >
                        <option value="" disabled>Seleccione vista</option>
                        <option value="mar">Al Mar</option>
                        <option value="ciudad">A la Ciudad</option>
                        <option value="jardin">Al Jardín</option>
                        <option value="interior">Interior</option>
                        {/* {viewTypes.map(type => <option key={type.id} value={type.id}>{type.name}</option>)} */}
                    </select>
                    <EyeIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                </div>
                 <div id="viewType-error" aria-live="polite" aria-atomic="true">
                    {/* @ts-ignore */}
                    {state.errors?.viewType && state.errors.viewType.map((error: string) => (
                        <p className="mt-2 text-sm text-red-500" key={error}>{error}</p>
                    ))}
                </div>
            </div>
            <div>
                <label htmlFor="size_m2" className="mb-2 block text-sm font-medium">Tamaño (m²)</label>
                <div className="relative">
                    <input
                        id="size_m2"
                        name="size_m2"
                        type="number"
                        step="0.1"
                        placeholder="Ej: 25.5"
                        className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                        required
                        aria-describedby="size_m2-error"
                    />
                    <ArrowsPointingOutIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                </div>
                 <div id="size_m2-error" aria-live="polite" aria-atomic="true">
                    {/* @ts-ignore */}
                    {state.errors?.size_m2 && state.errors.size_m2.map((error: string) => (
                        <p className="mt-2 text-sm text-red-500" key={error}>{error}</p>
                    ))}
                </div>
            </div>
        </div>

        {/* Identificadores de Habitación (si identicalRoomsCount > 0) */}
        {identicalRoomsCount > 0 && (
            <div className="mb-4">
                <label className="mb-2 block text-sm font-medium">
                    Números de Identificación de cada Habitación ({identicalRoomsCount})
                </label>
                <div className={`grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5`}>
                {roomIdentifiers.map((id, index) => (
                    <div key={index} className="relative">
                        <input
                            type="text"
                            name={`roomIdentifiers[${index}]`} // Para que el backend reciba un array
                            value={id}
                            onChange={(e) => handleRoomIdentifierChange(index, e.target.value)}
                            placeholder={`ID Hab. ${index + 1}`}
                            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            required
                            aria-describedby={`roomIdentifier-${index}-error`}
                        />
                        
                        <TagIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                       
                         <div id={`roomIdentifier-${index}-error`} aria-live="polite" aria-atomic="true">
                          
                            {/* Asume que los errores para roomIdentifiers vienen como un array de strings o un objeto */}
                             {/* @ts-ignore */}
                            {state.errors?.roomIdentifiers && typeof state.errors.roomIdentifiers === 'object' && (state.errors.roomIdentifiers as any)[index] &&
                            
                                ((state.errors as any)[index] as string[]).map((error: string) => (
                                <p className="mt-1 text-xs text-red-500" key={error}>{error}</p>
                            ))}
                        </div>
                    </div>
                ))}
                </div>
                {/* @ts-ignore */}
                {typeof state.errors?.roomIdentifiers === 'string' && (
                  
                      <p className="mt-2 text-sm text-red-500"></p>
                )}
            </div>
        )}


        {/* Sección de Capacidad */}
        <fieldset className="mb-4">
            <legend className="mb-2 block text-sm font-medium">Configuración de Capacidad</legend>
            <div className="rounded-md border border-gray-200 bg-white p-4">
                <div className="mb-4">
                    <label htmlFor="totalCapacity" className="mb-2 block text-sm font-medium">Capacidad Total (Adultos)</label>
                    <div className="relative">
                        <input
                            id="totalCapacity"
                            name="totalCapacity"
                            type="number"
                            min="1"
                            defaultValue="2"
                            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            required
                            aria-describedby="totalCapacity-error"
                        />
                        <UsersIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                    </div>
                     <div id="totalCapacity-error" aria-live="polite" aria-atomic="true">
                        {/* @ts-ignore */}
                        {state.errors?.totalCapacity && state.errors.totalCapacity.map((error: string) => (
                            <p className="mt-2 text-sm text-red-500" key={error}>{error}</p>
                        ))}
                    </div>
                </div>

                <div className="mb-2 flex items-center">
                    <input
                        id="allowsMinors"
                        name="allowsMinors"
                        type="checkbox"
                        checked={allowsMinors}
                        onChange={(e) => setAllowsMinors(e.target.checked)}
                        className="h-4 w-4 cursor-pointer rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor="allowsMinors" className="ml-2 text-sm font-medium">
                        ¿Permitir menores en esta habitación?
                    </label>
                </div>

                {allowsMinors && (
                    <div className="mt-2 grid grid-cols-1 gap-4 rounded-md border border-gray-100 bg-gray-50 p-3 md:grid-cols-2">
                        <div>
                            <label htmlFor="minorsCapacity" className="mb-1 block text-xs font-medium">Capacidad de Menores (adicional)</label>
                            <input
                                id="minorsCapacity"
                                name="minorsCapacity"
                                type="number"
                                min="0"
                                defaultValue="0"
                                className="peer block w-full rounded-md border border-gray-200 py-1.5 px-2 text-sm outline-2 placeholder:text-gray-500"
                                aria-describedby="minorsCapacity-error"
                            />
                            <div id="minorsCapacity-error" aria-live="polite" aria-atomic="true">
                                {/* @ts-ignore */}
                                {state.errors?.minorsCapacity && state.errors.minorsCapacity.map((error: string) => (
                                    <p className="mt-1 text-xs text-red-500" key={error}>{error}</p>
                                ))}
                            </div>
                        </div>
                        <div>
                            <label htmlFor="minAgeAllowed" className="mb-1 block text-xs font-medium">Edad Mínima Permitida (Menores)</label>
                            <input
                                id="minAgeAllowed"
                                name="minAgeAllowed"
                                type="number"
                                min="0"
                                defaultValue="0"
                                className="peer block w-full rounded-md border border-gray-200 py-1.5 px-2 text-sm outline-2 placeholder:text-gray-500"
                                aria-describedby="minAgeAllowed-error"
                            />
                            <div id="minAgeAllowed-error" aria-live="polite" aria-atomic="true">
                                {/* @ts-ignore */}
                                {state.errors?.minAgeAllowed && state.errors.minAgeAllowed.map((error: string) => (
                                    <p className="mt-1 text-xs text-red-500" key={error}>{error}</p>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </fieldset>

        {/* Mensaje general de error del formulario */}
        {state.message && (
          <div aria-live="polite" className="my-2 text-sm text-red-500">
            <p>{state.message}</p>
          </div>
        )}

      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/habitaciones" // Asume que esta es la página donde se listan las habitaciones
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancelar
        </Link>
        <Button type="submit">Agregar Habitación</Button>
      </div>
    </form>
  );
}

